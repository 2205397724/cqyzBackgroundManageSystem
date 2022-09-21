<template>
    <div class="routineresidentialhouse">
        <div class="tree-box" style="height: 100%;">
            <div class="tree-item" style="background-color: white;">
                <div style="height: calc(100% - 60px);">
                    <position-tree-second
                        :tree_item="tree_item_1.arr"
                        :type="no_zone"
                        @checkFunc="checkFunc"
                    />
                </div>
            </div>
            <!-- <div class="tree-details" style="display: flex; flex-direction: column;">
                <div style="height: 100%;">
                    <div :style="{'height':!active_obj.obj.name||active_obj.obj.type=='region'||active_obj.obj.type=='zone'?'calc(100% - 60px)':'100%'}" style="position: relative;display: flex; flex-direction: column;  }"> -->
            <div class="tree-details" style="display: flex; flex-direction: column;">
                <div style="height: 100%;">
                    <div
                        :style="{'height':!active_obj.obj.name||active_obj.obj.type=='region'||active_obj.obj.type=='zone'?'calc(100% - 60px)':'100%'}"
                        style="box-sizing: border-box;"
                        class="p-20 flex-colmun"
                    >
                        <div class="m-b-20">
                            <el-button
                                type="primary" :icon="Plus" size="large"
                                @click="addResidentialFunc"
                            >
                                添加小区
                            </el-button>
                        </div>
                        <div class="search" style="background-color: white;">
                            <el-row>
                                <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                                    <el-row>
                                        <el-col :sm="4" :xs="6" :md="8" class="search_th">
                                            小区名称：
                                        </el-col>
                                        <el-col :sm="20" :xs="18" :md="16">
                                            <el-input v-model="data_search.obj.name" class="search_tb" placeholder="小区名称" clearable />
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                                    <el-row>
                                        <el-col :sm="4" :xs="6" :md="8" class="search_th">
                                            地址：
                                        </el-col>
                                        <el-col :sm="20" :xs="18" :md="16">
                                            <el-input v-model="data_search.obj.addr" class="search_tb" placeholder="地址" clearable />
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :xs="0" :sm="4" :md="3" :lg="2" />
                                <el-col :xs="24" :sm="20" :md="21" :lg="22">
                                    <el-button type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                                    <el-button v-show="switch_search == true" class="m-l-20 m-r-10" :icon="Loading" @click="refreshFunc_1">重置</el-button>
                                    <span v-show="switch_search == true" class="size-base">
                                        *共搜索到{{ total }}条。
                                    </span>
                                </el-col>
                            </el-row>
                        </div>
                        <div style="background-color: white;" class="hidden">
                            <el-table
                                v-loading="loading_tab"
                                :data="data_tab.arr"
                                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                                class="tab_1"
                            >
                                <el-table-column prop="name" label="名称" />
                                <el-table-column prop="addr" label="地址" />
                                <!-- <el-table-column prop="china_code" label="所在区域" width="180" /> -->
                                <!-- <el-table-column prop="area_floor" label="总占地面积" width="140">
                                    <template #default="scope">
                                        <span>{{ scope.row.area_floor }} m²</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="area_build" label="总建筑面积" width="140">
                                    <template #default="scope">
                                        <span>{{ scope.row.area_build }} m²</span>
                                    </template>
                                </el-table-column> -->
                                <!-- <el-table-column prop="area_support" label="配套用房总面积" width="140">
                            <template #default="scope">
                                <span>{{ scope.row.area_support }} m²</span>
                            </template>
                        </el-table-column> -->
                                <el-table-column prop="cnt_building" label="楼栋数">
                                    <template #default="scope">
                                        <el-link :underline="false" type="primary">
                                            <router-link class="el-button" style="text-decoration: inherit; color: inherit;padding: 0 10px;" :to="{name: 'houseResidentialBuilding',query:{ zone_id: scope.row.id }}">{{ scope.row.cnt_building }} 栋</router-link>
                                        </el-link>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="cnt_live" label="住房总套数">
                                    <template #default="scope">
                                        <el-link :underline="false" type="primary">
                                            <router-link class="el-button" style="text-decoration: inherit; color: inherit;padding: 0 10px;" :to="{name: 'houseResidentialBuildingHouse',query:{ sync_zone_id: scope.row.id }}">{{ scope.row.cnt_live }} 套</router-link>
                                        </el-link>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="cnt_live" label="业委会">
                                    <template #default="scope">
                                        <el-link :underline="false" type="primary">
                                            <router-link class="el-button" style="text-decoration: inherit; color: inherit;padding: 0 10px;" :to="{name: 'houseResidentialYwh',query:{ zid: scope.row.id,china_code: scope.row.china_code }}">业委会</router-link>
                                        </el-link>
                                    </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="操作" width="200">
                                    <template #default="scope">
                                        <el-button
                                            type="primary" size="small"
                                            @click="modifyResidentialFunc(scope.row)"
                                        >
                                            修改
                                        </el-button>
                                        <el-button
                                            size="small"
                                            @click="detailsFunc(scope.row)"
                                        >
                                            详情
                                        </el-button>
                                        <el-popconfirm title="确定要删除当前项么?" cancel-button-type="info" @confirm="deleteFunc(scope.row)">
                                            <template #reference>
                                                <el-button type="danger" size="small">
                                                    删除
                                                </el-button>
                                            </template>
                                        </el-popconfirm>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                v-model:current-page="page"
                                style="float: right;"
                                layout="prev,next,jumper,"
                                :total="50"
                                :page-size="per_page"
                                background
                                prev-text="上一页"
                                next-text="下一页"
                                hide-on-single-page
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 修改添加 -->
        <el-dialog
            v-model="switch_examine"
            :title="str_title"
            width="50%"
            draggable
        >
            <div>
                <el-scrollbar style="height: 400px;">
                    <div class="details-box p-lr-10">
                        <el-form
                            ref="ruleFormRef"
                            :model="from_examine.item"
                        >
                            <el-row :gutter="10">
                                <el-col :xs="24"><div class="details-tit-sm m-b-10">基础信息</div></el-col>
                                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                    <el-form-item label="小区名称" label-width="120px" prop="name" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                        <el-input
                                            v-model="from_examine.item.name"
                                            placeholder=""
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col :md="24" :lg="12">
                                    <el-form-item label="地址" label-width="120px" prop="addr" :error="from_error.msg&&from_error.msg.addr?from_error.msg.addr[0]:''">
                                        <el-input
                                            v-model="from_examine.item.addr"
                                            placeholder=""
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col v-if="!china_code" :md="24" :lg="12">
                                    <el-form-item label="所在区域" label-width="120px" prop="china_code" :error="from_error.msg&&from_error.msg.china_code?from_error.msg.china_code[0]:''">
                                        <!-- <Cascaders v-model="from_examine.item.china_code" /> -->
                                        <div
                                            style="
                                                                                                                                                                width: 100%;
                                                                                                                                                                height: 32px;
                                                                                                                                                                border: 1px solid #dcdfe6;
                                                                                                                                                                border-radius: 4px;
"
                                            @click="click_add_group_zone_id"
                                        >
                                            <span v-if="!selectedZone_id" style="margin-left: 11px; color: #ccc;">请选择区域</span>
                                            <span style="margin-left: 11px;">{{ selectedZone_id }}</span>
                                        </div>
                                    </el-form-item>
                                </el-col>
                                <!-- <el-col :md="24" :lg="12">
                                    <el-form-item label="地图位置" label-width="120px" prop="">
                                        <el-input
                                            placeholder=""
                                        />
                                    </el-form-item>
                                </el-col> -->
                                <el-col :xs="24"><div class="details-tit-sm m-b-10">面积/数量</div></el-col>
                                <el-col :md="24" :lg="12">
                                    <el-form-item label="楼栋数" label-width="120px" prop="cnt_building" :error="from_error.msg&&from_error.msg.cnt_building?from_error.msg.cnt_building[0]:''">
                                        <el-input
                                            v-model="from_examine.item.cnt_building"
                                            placeholder=""
                                        >
                                            <template #append>栋</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :md="24" :lg="12">
                                    <el-form-item label="总占地面积" label-width="120px" prop="area_floor" :error="from_error.msg&&from_error.msg.area_floor?from_error.msg.area_floor[0]:''">
                                        <el-input
                                            v-model="from_examine.item.area_floor"
                                            placeholder=""
                                        >
                                            <template #append>m²</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :md="24" :lg="12">
                                    <el-form-item label="总建筑面积" label-width="120px" prop="area_build" :error="from_error.msg&&from_error.msg.area_build?from_error.msg.area_build[0]:''">
                                        <el-input
                                            v-model="from_examine.item.area_build"
                                            placeholder=""
                                        >
                                            <template #append>m²</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :md="24" :lg="12">
                                    <el-form-item label="总专有面积" label-width="120px" prop="area_exc" :error="from_error.msg&&from_error.msg.area_exc?from_error.msg.area_exc[0]:''">
                                        <el-input
                                            v-model="from_examine.item.area_exc"
                                            placeholder=""
                                        >
                                            <template #append>m²</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :md="24" :lg="12">
                                    <el-form-item label="配套用房总套数" label-width="120px" prop="cnt_support" :error="from_error.msg&&from_error.msg.cnt_support?from_error.msg.cnt_support[0]:''">
                                        <el-input
                                            v-model="from_examine.item.cnt_support"
                                            placeholder=""
                                        >
                                            <template #append>套</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :md="24" :lg="12">
                                    <el-form-item label="配套用房总面积" label-width="120px" prop="area_support" :error="from_error.msg&&from_error.msg.area_support?from_error.msg.area_support[0]:''">
                                        <el-input
                                            v-model="from_examine.item.area_support"
                                            placeholder=""
                                        >
                                            <template #append>m²</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :md="24" :lg="12">
                                    <el-form-item label="住房总套数" label-width="120px" prop="cnt_live" :error="from_error.msg&&from_error.msg.cnt_live?from_error.msg.cnt_live[0]:''">
                                        <el-input
                                            v-model="from_examine.item.cnt_live"
                                            placeholder=""
                                        >
                                            <template #append>套</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :md="24" :lg="12">
                                    <el-form-item label="住房总面积" label-width="120px" prop="area_live" :error="from_error.msg&&from_error.msg.area_live?from_error.msg.area_live[0]:''">
                                        <el-input
                                            v-model="from_examine.item.area_live"
                                            placeholder=""
                                        >
                                            <template #append>m²</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :md="24" :lg="12">
                                    <el-form-item label="车位总个数" label-width="120px" prop="cnt_part" :error="from_error.msg&&from_error.msg.cnt_part?from_error.msg.cnt_part[0]:''">
                                        <el-input
                                            v-model="from_examine.item.cnt_part"
                                            placeholder=""
                                        >
                                            <template #append>个</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :md="24" :lg="12">
                                    <el-form-item label="车位总面积" label-width="120px" prop="area_part" :error="from_error.msg&&from_error.msg.area_part?from_error.msg.area_part[0]:''">
                                        <el-input
                                            v-model="from_examine.item.area_part"
                                            placeholder=""
                                        >
                                            <template #append>m²</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24"><div class="details-tit-sm m-b-10">其它</div></el-col>
                                <el-col :md="24" :lg="12">
                                    <el-form-item label="建设单位名称" label-width="120px" prop="company_build" :error="from_error.msg&&from_error.msg.company_build?from_error.msg.company_build[0]:''">
                                        <el-input
                                            v-model="from_examine.item.company_build"
                                            placeholder=""
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col :md="24" :lg="12">
                                    <el-form-item label="立项时间" label-width="120px" prop="time_pro_setup" :error="from_error.msg&&from_error.msg.time_pro_setup?from_error.msg.time_pro_setup[0]:''">
                                        <el-date-picker
                                            v-model="from_examine.item.time_pro_setup"
                                            type="date"
                                            value-format="YYYY-MM-DD"
                                            placeholder=""
                                            style="width: 100%;"
                                            :default-value="new Date()"
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col :md="24" :lg="12">
                                    <el-form-item label="开工时间" label-width="120px" prop="time_build_start" :error="from_error.msg&&from_error.msg.time_build_start?from_error.msg.time_build_start[0]:''">
                                        <el-date-picker
                                            v-model="from_examine.item.time_build_start"
                                            type="date"
                                            value-format="YYYY-MM-DD"
                                            placeholder=""
                                            style="width: 100%;"
                                            :default-value="new Date()"
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col :md="24" :lg="12">
                                    <el-form-item label="竣工时间" label-width="120px" prop="time_build_end" :error="from_error.msg&&from_error.msg.time_build_end?from_error.msg.time_build_end[0]:''">
                                        <el-date-picker
                                            v-model="from_examine.item.time_build_end"
                                            type="date"
                                            value-format="YYYY-MM-DD"
                                            placeholder=""
                                            style="width: 100%;"
                                            :default-value="new Date()"
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col :md="24" :lg="12">
                                    <el-form-item label="移交时间" label-width="120px" prop="time_turn" :error="from_error.msg&&from_error.msg.time_turn?from_error.msg.time_turn[0]:''">
                                        <el-date-picker
                                            v-model="from_examine.item.time_turn"
                                            type="date"
                                            value-format="YYYY-MM-DD"
                                            placeholder=""
                                            style="width: 100%;"
                                            :default-value="new Date()"
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col :md="24" :lg="12">
                                    <el-form-item label="投用时间" label-width="120px" prop="time_use" :error="from_error.msg&&from_error.msg.time_use?from_error.msg.time_use[0]:''">
                                        <el-date-picker
                                            v-model="from_examine.item.time_use"
                                            type="date"
                                            value-format="YYYY-MM-DD"
                                            placeholder=""
                                            style="width: 100%;"
                                            :default-value="new Date()"
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col :md="24" :lg="24">
                                    <el-form-item label="备注" label-width="120px" prop="remark" :error="from_error.msg&&from_error.msg.remark?from_error.msg.remark[0]:''">
                                        <el-input
                                            v-model="from_examine.item.remark"
                                            :autosize="{ minRows: 2, maxRows: 6 }"
                                            type="textarea"
                                            placeholder=""
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col :md="24" :lg="24">
                                    <el-form-item label="简介" label-width="120px" :error="from_error.msg&&from_error.msg['addition.desc']?from_error.msg['addition.desc'][0]:''">
                                        <editor v-model="from_examine.item.addition.desc" class="w-100" />
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24"><div class="details-tit-sm m-b-10">便民信息</div></el-col>
                                <el-col :md="24" :lg="24">
                                    <div style="margin-bottom: 10px;">
                                        <el-button type="primary" plain @click="addServiceFunc">添加服务名称和电话</el-button>
                                    </div>
                                    <div v-if="from_examine.item.addition">
                                        <div v-for="(item,i) in from_examine.item.addition.extra.convenience" :key="i" class="serve-box">
                                            <el-row :gutter="10">
                                                <el-col :xs="12" :sm="12">
                                                    <el-form-item label="服务名称" :error="from_error.msg&&from_error.msg['addition.extra.convenience.'+i+'.title']?from_error.msg['addition.extra.convenience.'+i+'.title'][0]:''">
                                                        <el-input
                                                            v-model="item.title"
                                                            placeholder=""
                                                        />
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :xs="12" :sm="12">
                                                    <el-form-item label="联系方式" :error="from_error.msg&&from_error.msg['addition.extra.convenience.'+i+'.phone']?from_error.msg['addition.extra.convenience.'+i+'.phone'][0]:''">
                                                        <el-input
                                                            v-model="item.phone"
                                                            placeholder=""
                                                        />
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                            <div class="delete-service" @click="deleteServiceFunc(i)">
                                                <el-icon :size="20" color="#F56C6C">
                                                    <el-icon-circle-close />
                                                </el-icon>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                                <!-- <el-col :xs="24"><div class="details-tit-sm m-b-10">小区档案</div></el-col> -->
                                <!-- <el-col :md="24" :lg="24" class="file-2022">
                                    <div style="margin-bottom: 10px;">
                                        <el-button type="primary" plain>添加文件</el-button>
                                    </div>
                                    <div class="serve-box">
                                        <el-row :gutter="10">
                                            <el-col :xs="12" :sm="12">
                                                <el-form-item label="文件名称">
                                                    <el-input
                                                        v-model="file_obj.obj.name"
                                                        placeholder=""
                                                    />
                                                </el-form-item>
                                            </el-col>
                                            <el-col :xs="12" :sm="12">
                                                <el-form-item label="文件分类">
                                                    <el-input
                                                        v-model="file_obj.obj.ftype"
                                                        placeholder=""
                                                    />
                                                </el-form-item>
                                            </el-col>
                                            <el-col :xs="12" :sm="12">
                                                <el-form-item label="资源类型">
                                                    <el-input
                                                        v-model="file_obj.obj.rtype"
                                                        placeholder=""
                                                    />
                                                </el-form-item>
                                            </el-col>
                                            <el-col :xs="24" :sm="24">
                                                <el-form-item label="">
                                                    <el-upload
                                                    style="width: 100%;"
                                                      action=""
                                                      :auto-upload="false"
                                                      :on-change="handleChange"
                                                      :file-list="fileList"
                                                    >
                                                      <el-button type="primary">选择文件</el-button>
                                                    </el-upload>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <div class="delete-service">
                                            <el-icon :size="20" color="#F56C6C">
                                                <el-icon-circle-close />
                                            </el-icon>
                                        </div>
                                    </div>
                                </el-col> -->
                            </el-row>
                        </el-form>
                    </div>
                </el-scrollbar>
            </div>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_examine=false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc(ruleFormRef)">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog
            v-model="switch_details"
            title="详情"
            width="50%"
            draggable
        >
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="基础信息" name="1">
                    <el-scrollbar height="400px">
                        <div class="details-box">
                            <div class="details-tit-sm">小区信息</div>
                            <div class="item">
                                <div class="left">小区名称</div>
                                <div class="right">{{ data_details.item.name }}</div>
                            </div>
                            <div class="item">
                                <div class="left">所在区域code</div>
                                <div class="right">{{ data_details.item.china_code }}</div>
                            </div>
                            <div class="item">
                                <div class="left">小区地址</div>
                                <div class="right">{{ data_details.item.addr }}</div>
                            </div>
                            <div class="item">
                                <div class="left">小区ID</div>
                                <div class="right">{{ data_details.item.id }}</div>
                            </div>
                            <div class="item">
                                <div class="left">地图位置</div>
                                <div class="right">无</div>
                            </div>
                            <div class="details-tit-sm">数量/面积信息</div>
                            <div class="item">
                                <div class="left">总占地面积</div>
                                <div class="right">{{ data_details.item.area_floor }} m²</div>
                            </div>
                            <div class="item">
                                <div class="left">总建筑面积</div>
                                <div class="right">{{ data_details.item.area_build }} m²</div>
                            </div>
                            <div class="item">
                                <div class="left">总专有面积</div>
                                <div class="right">{{ data_details.item.area_exc }} m²</div>
                            </div>
                            <div class="item">
                                <div class="left">楼栋数</div>
                                <div class="right">{{ data_details.item.cnt_building }} 栋</div>
                            </div>
                            <div class="item">
                                <div class="left">配套用房总套数</div>
                                <div class="right">{{ data_details.item.cnt_support }} 套</div>
                            </div>
                            <div class="item">
                                <div class="left">配套用房总面积</div>
                                <div class="right">{{ data_details.item.area_support }} m²</div>
                            </div>
                            <div class="item">
                                <div class="left">住房总套数</div>
                                <div class="right">{{ data_details.item.cnt_live }} 套</div>
                            </div>
                            <div class="item">
                                <div class="left">住房总面积</div>
                                <div class="right">{{ data_details.item.area_live }} m²</div>
                            </div>
                            <div class="item">
                                <div class="left">车位总个数</div>
                                <div class="right">{{ data_details.item.cnt_part }} 个</div>
                            </div>
                            <div class="item">
                                <div class="left">车位总面积</div>
                                <div class="right">{{ data_details.item.area_part }} m²</div>
                            </div>
                            <div class="details-tit-sm">其它信息</div>
                            <div class="item">
                                <div class="left">建设单位名称</div>
                                <div class="right">{{ data_details.item.company_build }}</div>
                            </div>
                            <div class="item">
                                <div class="left">立项时间</div>
                                <div class="right">{{ data_details.item.time_pro_setup }}</div>
                            </div>
                            <div class="item">
                                <div class="left">开工时间</div>
                                <div class="right">{{ data_details.item.time_build_start }}</div>
                            </div>
                            <div class="item">
                                <div class="left">竣工时间</div>
                                <div class="right">{{ data_details.item.time_build_end }}</div>
                            </div>
                            <div class="item">
                                <div class="left">移交时间</div>
                                <div class="right">{{ data_details.item.time_turn }}</div>
                            </div>
                            <div class="item">
                                <div class="left">投用时间</div>
                                <div class="right">{{ data_details.item.time_use }}</div>
                            </div>
                            <div class="item">
                                <div class="left">备注</div>
                                <div class="right">{{ data_details.item.remark }}</div>
                            </div>
                            <div class="item">
                                <div class="left">简介</div>
                                <div v-if="data_details.item.addition" class="right" v-html="data_details.item.addition.desc" />
                                <div v-else class="right">~无简介信息</div>
                            </div>
                            <div class="details-tit-sm">便民信息</div>
                            <div class="item">
                                <div v-if="data_details.item.addition" class="right">
                                    <div v-for="(item,i) in data_details.item.addition.extra.convenience" :key="i" class="flex-row p-t-10">
                                        <div>
                                            <span>服务名称：</span>{{ item.title }} , <span>联系方式：</span>{{ item.phone }}
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="right">~无信息</div>
                            </div>
                        </div>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="档案信息" name="2">
                    <el-scrollbar height="400px">
                        小区档案待完善
                    </el-scrollbar>
                </el-tab-pane>
            </el-tabs>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="modifyResidentialFunc(data_details.item)">修改</el-button>
                    <el-button @click="switch_details = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 房屋 -->
        <el-dialog
            v-model="edit_house"
            title="房屋"
            width="70%"
            center
            draggable
        >
            <div style="width: 100%;height: 60vh;overflow: auto;">
                <House :tree_item="tree_item.obj" />
            </div>
        </el-dialog>
        <el-dialog v-model="switch_choose_zone" title="选择区域">
            <el-scrollbar height="250px">
                <position-tree-fourth
                    :tree_item="tree_item_1.arr"
                    @checkChangeFunc="checkChangeFunc"
                    @checkFunc="checkFunc_1"
                />
            </el-scrollbar>
        </el-dialog>
    </div>
</template>
<script setup>
import Cascaders from '@/components/Cascaders/index.vue'
import {
    APIgetResidentialListHouse,
    APIgetResidentialDetailsHouse,
    APIdeleteResidentialHouse,
    APIputResidentialHouse,
    APIpostResidentialHouse
} from '@/api/custom/custom.js'
import {
    reactive,
    ref,
    watch
} from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Plus } from '@element-plus/icons-vue'
/* ----------------------------------------------------------------------------------------------------------------------- */
// 数据
import House from '@/components/House/index.vue'
// const tree_item = reactive({
//     obj: {}
// })
const activeName = ref('1')
const edit_house = ref(false)

const active_obj = reactive({
    obj: {}
})
// const treeDetail = reactive({
//     arr: {}
// })
const china_code = ref('')
const checkFunc = val => {
    active_obj.obj = val
    console.log(val)
    china_code.value = val.id
    let cur = active_obj.obj.name || ''
    if (cur.includes('社区') || cur.includes('街道') || cur.includes('镇') || cur.includes('区') || cur.includes('县')) {
        APIgetResidentialListHouse({ page: 1, per_page: 5, china_code: active_obj.obj.id }).then(res => {
            console.log(res)
            data_tab.arr = res
        })
    }

}
// 搜索
let no_zone = ref(false)
let switch_search = ref(false)
let data_search = reactive({
    obj: ''
})
// 详情
let switch_details = ref(false)
// 列表
let ruleFormRef = ref('')
let loading_tab = ref(false)
let data_tab = reactive({
    arr: []
})
// 操作事件 列表单个行数据
let data_dialog = reactive({
    obj: {}
})
// 详情
const data_details = reactive({
    item: ''
})
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(Number(sessionStorage.getItem('currentPage')) || 1)
// 添加，修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {
        'addition': {
            'extra': {
                'convenience': [],
                'geo': {
                    'lat': 0,
                    'lon': 0
                }
            },
            'desc': '',
            'created_at': '',
            'id': '',
            'updated_at': ''
        }
    }
})
const switch_choose_zone = ref(false)
const click_add_group_zone_id = () => {
    switch_choose_zone.value = true
    console.log('成功')
}
const str_title = ref('添加')
const from_error = reactive({ msg: {} })
const checkFunc_1 = val => {
    selectedZone_id.value = val.name
    from_examine.item.china_code = val.china_code

}
const checkChangeFunc = val => {
    switch_choose_zone.value = false
}
const selectedZone_id = ref('')
import {
    APIgetChinaRegion
} from '@/api/custom/custom.js'
const tree_item_1 = reactive({
    arr: []
})
// APIgetChinaRegion().then(res => {

import md5 from 'md5'
const getChinaRegionunc = () => {
    let params = {}
    if (localStorage.getItem('utype') == md5('pt')) {
        params = {
            p_code: localStorage.getItem('china_code')
        }
    } else if (sessionStorage.getItem('groupChinaCode')) {
        params = {
            p_code: sessionStorage.getItem('groupChinaCode')
        }
    } else {
        params = {}
    }
    APIgetChinaRegion(params).then(res => {
        console.log(res)
        for (let i in res.data) {
            if (res.data[i].level < 5) {
                tree_item_1.arr.push({ name: res.data[i].name, type: 'region', next_type: 'region', id: res.data[i].code })
            } else {
                tree_item_1.arr.push({ name: res.data[i].name, type: 'region', next_type: 'zone', id: res.data[i].code })
            }
        }
    // tree_item.value.id = res.data[0].code
    // tree_item.value.name = res.data[0].name
    // tree_item.value.next_type = 'region'
    // tree_item.value.type = 'region'
    // tree_item_1.arr = res
    })
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 方法
// 搜索
const searchFunc = () => {
    page.value = 1
    switch_search.value = true
    getTabListFunc()
}
const refreshFunc_1 = () => {
    switch_search.value = false
    data_search.obj = {}
    getTabListFunc()
}
// 刷新
const refreshFunc = () => {
    switch_search.value = false
    data_search.obj = {}
    getTabListFunc()
    getChinaRegionunc()
}

// 详情
const detailsFunc = val => {

    data_dialog.obj = val
    APIgetResidentialDetailsHouse(val.id).then(res => {
        console.log(res)
        data_details.item = res
        switch_details.value = true
    })
}
// 监听分页
watch(page, () => {
    sessionStorage.setItem('currentPage', page.value)
    getTabListFunc()
})
import { onBeforeRouteLeave } from 'vue-router'
onBeforeRouteLeave((to, from) => {
    console.log(to)
    if (to.meta.title == '楼栋' || to.meta.title == '单元' || to.meta.title == '房屋') {
        return true
    } else {
        sessionStorage.removeItem('currentPage')
    }
})
// 同意拒绝提交
const dialogExamineCloseFunc = formEl => {
    from_error.msg = {}
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            if (str_title.value == '修改') {
                APIputResidentialHouse(from_examine.item.id, from_examine.item).then(res => {
                    refreshFunc()
                    ElMessage.success('修改成功')
                    switch_examine.value = false
                }).catch(err => {
                    ElMessage.error('修改失败')
                })
            } else {
                if (china_code.value) {
                    from_examine.item.china_code = china_code.value
                }
                from_examine.item.addition.desc = `${from_examine.item.addition.desc}`
                APIpostResidentialHouse(from_examine.item).then(res => {
                    refreshFunc()
                    ElMessage.success('添加成功')
                    switch_examine.value = false
                }).catch(err => {
                    ElMessage.error('添加失败')
                })
            }
        } else {
            return false
        }
    })
}
// 获取列表api请求
const getTabListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    for (let key in data_search.obj) {
        if (data_search.obj[key] || data_search.obj[key] === 0) {
            if (data_search.obj[key] instanceof Array && data_search.obj[key].length <= 0) {
                continue
            }
            params[key] = data_search.obj[key]
        }
    }
    if (params.time_pro_setup) {
        let created_str = ''
        for (let i in params.time_pro_setup) {
            created_str += ',' + params.time_pro_setup[i]
        }
        params.time_pro_setup = created_str.substring(1)
    }
    if (params.time_build_start) {
        let created_str = ''
        for (let i in params.time_build_start) {
            created_str += ',' + params.time_build_start[i]
        }
        params.time_build_start = created_str.substring(1)
    }
    if (params.time_build_end) {
        let created_str = ''
        for (let i in params.time_build_end) {
            created_str += ',' + params.time_build_end[i]
        }
        params.time_build_end = created_str.substring(1)
    }
    if (params.time_use) {
        let created_str = ''
        for (let i in params.time_use) {
            created_str += ',' + params.time_use[i]
        }
        params.time_use = created_str.substring(1)
    }
    if (params.time_turn) {
        let created_str = ''
        for (let i in params.time_turn) {
            created_str += ',' + params.time_turn[i]
        }
        params.time_turn = created_str.substring(1)
    }
    if (params.created_at) {
        let created_str = ''
        for (let i in params.created_at) {
            created_str += ',' + params.created_at[i]
        }
        params.created_at = created_str.substring(1)
    }
    if (params.updated_at) {
        let created_str = ''
        for (let i in params.updated_at) {
            created_str += ',' + params.updated_at[i]
        }
        params.updated_at = created_str.substring(1)
    }
    loading_tab.value = true
    console.log(params)
    APIgetResidentialListHouse(params).then(res => {
        console.log(res)
        // if (res.status === 200) {
        loading_tab.value = false
        data_tab.arr = res
        total.value = data_tab.arr.length
        let btnNext = document.querySelector('.btn-next')
        if (res.length <= per_page.value) {
            btnNext.classList.add('not_allowed')
            btnNext.setAttribute('disabled', true)
            btnNext.setAttribute('aria-disabled', true)
        } else {
            btnNext.classList.remove('not_allowed')
            btnNext.removeAttribute('disabled')
            btnNext.setAttribute('aria-disabled', false)
        }
        // }
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteResidentialHouse(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
// 添加小区
const addResidentialFunc = () => {
    selectedZone_id.value = ''
    from_error.msg = {}
    str_title.value = '添加小区'
    from_examine.item = {
        'addition': {
            'extra': {
                'convenience': []
            },
            'desc': ''
        }
    }
    switch_examine.value = true
}
// 修改
const modifyResidentialFunc = val => {
    selectedZone_id.value = ''
    from_error.msg = {}
    str_title.value = '修改'
    APIgetResidentialDetailsHouse(val.id).then(res => {
        console.log(res)
        from_examine.item = res
        switch_examine.value = true
    })
}
// 删除 服务名称和联系方式
const deleteServiceFunc = index => {
    from_examine.item.addition.extra.convenience.splice(index, 1)
}
// 添加 服务名称和联系方式
const addServiceFunc = index => {
    let data = {
        'title': '',
        'phone': ''
    }
    from_examine.item.addition.extra.convenience.push(data)
}

/* ----------------------------------------------------------------------------------------------------------------------- */
// 文件名称
const file_obj = reactive({
    obj: {
        rtype: '',
        rid: '',
        name: '',
        ftype: '',
        key: []
    }
})
const fileList = ref([])
const handleChange = (uploadFile, uploadFiles) => {
    // console.log(uploadFile)
    // console.log(uploadFiles)
    fileList.value = uploadFiles
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()
</script>
<style lang="scss">
.routineresidentialhouse {
    height: calc(100vh - 50px);
    .tree-box {
        border-top: 1px solid #efefef;
        display: flex;
    }
    .tree-item {
        min-width: 300px;
        width: 300px;
        border-right: 1px solid #e9e9e9;
    }
    .tree-details {
        flex-grow: 1;
        max-width: calc(100% - 300px);
    }
    .el-cascader {
        width: 100% !important;
        margin-bottom: 10px;
    }
    .serve-box {
        border: 1px solid #eee;
        box-sizing: border-box;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 6px;
        position: relative;
        .el-form-item {
            margin: 0;
        }
        .delete-service {
            position: absolute;
            right: 0;
            top: 0;
            z-index: 999999;
            cursor: pointer;
            background-color: #fff;
        }
    }
}
.file-2022 {
    .el-form-item {
        margin-bottom: 18px !important;
    }
}
</style>
<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
.search-tips {
    color: #aaa;
    font-size: 14px;
    margin-bottom: 20px;
}
:deep .el-tree {
    --el-tree-node-hover-bg-color: #e9f4ff;
}
</style>
