<template>
    <div class="routinebuilding">
        <page-main>
            <div>
                <el-row :gutter="10">
                    <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
                        <el-select v-model="data_search.obj.type_construct" class="head-btn" placeholder="结构形式" clearable>
                            <el-option v-for="(item,i) in opts_all.obj.build_type_construct" :key="item.key" :label="item.val" :value="item.key" />
                        </el-select>
                    </el-col>
                    <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
                        <el-select v-model="data_search.obj.type_water" class="head-btn" placeholder="供水方式" clearable>
                            <el-option v-for="(item,i) in opts_all.obj.build_type_water" :key="item.key" :label="item.val" :value="item.key" />
                        </el-select>
                    </el-col>
                    <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
                        <el-input v-model="data_search.obj.sno" class="head-btn" placeholder="楼栋编号号" clearable />
                    </el-col>
                    <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
                        <el-input v-model="data_search.obj.name" class="head-btn" placeholder="楼栋名称" clearable />
                    </el-col>
                    <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
                        <el-input v-model="data_search.obj.report_name" class="head-btn" placeholder="楼栋报建名" clearable />
                    </el-col>
                    <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
                        <el-input v-model="data_search.obj.addr" class="head-btn" placeholder="地址" clearable />
                    </el-col>
                    <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
                        <el-input v-model="data_search.obj.sync_china_code" class="head-btn" placeholder="区域code" clearable />
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
                        <div class="head-btn">
                            <el-date-picker
                                v-model="data_search.obj.time_build_end"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="竣工时间"
                                end-placeholder="竣工时间"
                                style="width: 100%;"
                                value-format="YYYY-MM-DD"
                            />
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
                        <div class="head-btn">
                            <el-date-picker
                                v-model="data_search.obj.time_use"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="投用时间"
                                end-placeholder="投用时间"
                                style="width: 100%;"
                                value-format="YYYY-MM-DD"
                            />
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
                        <div class="head-btn">
                            <el-date-picker
                                v-model="data_search.obj.time_turn"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="移交时间"
                                end-placeholder="移交时间"
                                style="width: 100%;"
                                value-format="YYYY-MM-DD"
                            />
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
                        <div class="head-btn">
                            <el-date-picker
                                v-model="data_search.obj.created_at"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="创建时间"
                                end-placeholder="创建时间"
                                style="width: 100%;"
                                value-format="YYYY-MM-DD"
                            />
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
                        <div class="head-btn">
                            <el-date-picker
                                v-model="data_search.obj.updated_at"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="更新时间"
                                end-placeholder="更新时间"
                                style="width: 100%;"
                                value-format="YYYY-MM-DD"
                            />
                        </div>
                    </el-col>
                    <el-col :xs="12" :sm="8" :md="6" :lg="2" :xl="3">
                        <el-button class="head-btn" type="primary" @click="searchFunc">搜索</el-button>
                    </el-col>
                </el-row>
                <div v-show="switch_search" class="search-tips">
                    <el-button style="margin-right: 10px;" @click="refreshFunc">重置</el-button>
                    *搜索到相关结果共{{ total }}条。
                </div>
                <div>
                    <el-row :gutter="20" class="bottom-btn-box-2">
                        <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                            <el-button class="head-btn" type="primary" @click="addResidentialFunc">添加楼栋</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div style="width: 100%; overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;">
                    <el-table
                        v-loading="loading_tab"
                        :data="data_tab.arr"
                        :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                        style="width: 100%;min-height: 300px;"
                    >
                        <el-table-column prop="name" label="名称" width="180" />
                        <el-table-column prop="addr" label="地址" width="220" />
                        <el-table-column prop="area_live" label="住宅总面积" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.area_live }} m²</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="area_build" label="总建筑面积" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.area_build }} m²</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="area_live_not" label="非住宅面积" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.area_live_not }} m²</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cnt_floor" label="楼层数" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.cnt_floor }} 层</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cnt_unit" label="单元数" width="140">
                            <template #default="scope">
                                <el-link style="margin-left: 10px" type="primary">
                                    <router-link style="text-decoration: inherit; color: inherit;" :to="{name: 'houseResidentialBuildingUnit',query:{ building_id: scope.row.id }}">{{ scope.row.cnt_unit }} 个</router-link>
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cnt_live" label="住宅总套数" width="140">
                            <template #default="scope">
                                <el-link style="margin-left: 10px" type="primary">
                                    <router-link style="text-decoration: inherit; color: inherit;" :to="{name: 'houseResidentialBuildingHouse',query:{ sync_building_id: scope.row.id, houseable_type: 'buildings' }}">{{ scope.row.cnt_live }} 套</router-link>
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column prop="by_build_owner" label="建设业主单位" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.by_build_owner }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="time_build_end" label="建成时间" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.time_build_end }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="time_turn" label="移交时间" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.time_turn }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="time_use" label="投用时间" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.time_use }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="type_water" label="供水方式" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ getOptValFunc(opts_all.obj.build_type_water,scope.row.type_water) }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="type_construct" label="结构形式" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ getOptValFunc(opts_all.obj.build_type_construct,scope.row.type_construct) }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cnt_lift" label="电梯数" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.cnt_lift }} 台</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cnt_live_not" label="非住宅面积" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.cnt_live_not }} m²</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="by_build" label="建设单位" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.by_build }} </span>
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
                                <el-popconfirm
                                    title="确定要删除当前项么?" cancel-button-type="info"
                                    @confirm="deleteFunc(scope.row)"
                                >
                                    <template #reference>
                                        <el-button type="danger" size="small">
                                            删除
                                        </el-button>
                                    </template>
                                </el-popconfirm>
                            </template>
                        </el-table-column>
                        <el-table-column />
                    </el-table>
                </div>
                <div style="padding-top: 20px;">
                    <el-pagination
                        v-model:current-page="page"
                        layout="total,prev,pager,next,jumper,"
                        :total="total"
                        :page-size="per_page"
                        background
                        hide-on-single-page
                    />
                </div>
            </div>
        </page-main>
        <!-- 修改添加 -->
        <el-dialog
            v-model="switch_examine"
            :title="str_title"
            width="50%"
        >
            <div>
                <el-form
                    ref="ruleFormRef"
                    :model="from_examine.item"
                    :rules="rule_examine"
                >
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="所属小区ID" prop="zone_id"
                                :error="from_error.msg&&from_error.msg.zone_id?from_error.msg.zone_id[0]:''"
                            >
                                <!-- <el-input
                                    v-model="from_examine.item.zone_id"
                                    placeholder=""
                                /> -->
                                <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                    <SearchResidential v-model:str="from_examine.item.zone_id" />
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="地址" prop="addr" :error="from_error.msg&&from_error.msg.addr?from_error.msg.addr[0]:''">
                                <el-input
                                    v-model="from_examine.item.addr"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="住宅总面积" prop="area_live"
                                :error="from_error.msg&&from_error.msg.area_live?from_error.msg.area_live[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.area_live"
                                    placeholder=""
                                >
                                    <template #append>m²</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="总建筑面积" prop="area_build"
                                :error="from_error.msg&&from_error.msg.area_build?from_error.msg.area_build[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.area_build"
                                    placeholder=""
                                >
                                    <template #append>m²</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="非住宅面积" prop="area_live_not"
                                :error="from_error.msg&&from_error.msg.area_live_not?from_error.msg.area_live_not[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.area_live_not"
                                    placeholder=""
                                >
                                    <template #append>m²</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="楼层数" prop="cnt_floor"
                                :error="from_error.msg&&from_error.msg.cnt_floor?from_error.msg.cnt_floor[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.cnt_floor"
                                    placeholder=""
                                >
                                    <template #append>层</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="单元数" prop="cnt_unit"
                                :error="from_error.msg&&from_error.msg.cnt_unit?from_error.msg.cnt_unit[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.cnt_unit"
                                    placeholder=""
                                >
                                    <template #append>个</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="住宅总套数" prop="cnt_live"
                                :error="from_error.msg&&from_error.msg.cnt_live?from_error.msg.cnt_live[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.cnt_live"
                                    placeholder=""
                                >
                                    <template #append>套</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="建设业主单位" prop="by_build_owner"
                                :error="from_error.msg&&from_error.msg.by_build_owner?from_error.msg.by_build_owner[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.by_build_owner"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="建成时间" prop="time_build_end"
                                :error="from_error.msg&&from_error.msg.time_build_end?from_error.msg.time_build_end[0]:''"
                            >
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
                            <el-form-item
                                label="移交时间" prop="time_turn"
                                :error="from_error.msg&&from_error.msg.time_turn?from_error.msg.time_turn[0]:''"
                            >
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
                            <el-form-item
                                label="投用时间" prop="time_use"
                                :error="from_error.msg&&from_error.msg.time_use?from_error.msg.time_use[0]:''"
                            >
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
                        <el-col :md="24" :lg="12">
                            <el-form-item label="楼栋编号" prop="sno" :error="from_error.msg&&from_error.msg.sno?from_error.msg.sno[0]:''">
                                <el-input
                                    v-model="from_examine.item.sno"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="楼栋报建名" prop="report_name"
                                :error="from_error.msg&&from_error.msg.report_name?from_error.msg.report_name[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.report_name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="楼栋名称" prop="name"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="供水方式" prop="type_water"
                                :error="from_error.msg&&from_error.msg.type_water?from_error.msg.type_water[0]:''"
                            >
                                <el-select v-model="from_examine.item.type_water" class="head-btn" placeholder="供水方式" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.build_type_water" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="结构形式" prop="type_construct"
                                :error="from_error.msg&&from_error.msg.type_construct?from_error.msg.type_construct[0]:''"
                            >
                                <el-select v-model="from_examine.item.type_construct" class="head-btn" placeholder="结构形式" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.build_type_construct" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="电梯数" prop="cnt_lift"
                                :error="from_error.msg&&from_error.msg.cnt_lift?from_error.msg.cnt_lift[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.cnt_lift"
                                    placeholder=""
                                >
                                    <template #append>台</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="非住宅面积" prop="cnt_live_not"
                                :error="from_error.msg&&from_error.msg.cnt_live_not?from_error.msg.cnt_live_not[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.cnt_live_not"
                                    placeholder=""
                                >
                                    <template #append>m²</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="建设单位" prop="by_build"
                                :error="from_error.msg&&from_error.msg.by_build?from_error.msg.by_build[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.by_build"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label="备注" prop="remark"
                                :error="from_error.msg&&from_error.msg.remark?from_error.msg.remark[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.remark"
                                    :autosize="{ minRows: 2, maxRows: 6 }"
                                    type="textarea"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col v-if="from_examine.item&&from_examine.item.addition" :md="24" :lg="24">
                            <el-form-item
                                label="模型简介" prop="addition.desc"
                                :error="from_error.msg&&from_error.msg['addition.desc']?from_error.msg['addition.desc'][0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.addition.desc"
                                    :autosize="{ minRows: 2, maxRows: 6 }"
                                    type="textarea"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
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
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">所属小区ID</div>
                    <div class="right">{{ data_details.item.zone_id }}</div>
                </div>
                <div class="item">
                    <div class="left">地址</div>
                    <div class="right">{{ data_details.item.addr }}</div>
                </div>
                <div class="item">
                    <div class="left">住宅总面积</div>
                    <div class="right">{{ data_details.item.area_live }} m²</div>
                </div>
                <div class="item">
                    <div class="left">总建筑面积</div>
                    <div class="right">{{ data_details.item.area_build }} m²</div>
                </div>
                <div class="item">
                    <div class="left">非住宅面积</div>
                    <div class="right">{{ data_details.item.area_live_not }} m²</div>
                </div>
                <div class="item">
                    <div class="left">楼栋数</div>
                    <div class="right">{{ data_details.item.cnt_building }} 栋</div>
                </div>
                <div class="item">
                    <div class="left">单元数</div>
                    <div class="right">{{ data_details.item.cnt_unit }} 个</div>
                </div>
                <div class="item">
                    <div class="left">住宅总套数</div>
                    <div class="right">{{ data_details.item.cnt_live }} 套</div>
                </div>
                <div class="item">
                    <div class="left">建设业主单位</div>
                    <div class="right">{{ data_details.item.by_build_owner }}</div>
                </div>
                <div class="item">
                    <div class="left">建成时间</div>
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
                    <div class="left">楼栋编号</div>
                    <div class="right">{{ data_details.item.sno }}</div>
                </div>
                <div class="item">
                    <div class="left">楼栋报建名</div>
                    <div class="right">{{ data_details.item.report_name }}</div>
                </div>
                <div class="item">
                    <div class="left">楼栋名称</div>
                    <div class="right">{{ data_details.item.name }}</div>
                </div>
                <div class="item">
                    <div class="left">供水方式</div>
                    <div class="right">{{ getOptValFunc(opts_all.obj.build_type_water,data_details.item.type_water) }}</div>
                </div>
                <div class="item">
                    <div class="left">结构形式</div>
                    <div class="right">{{ getOptValFunc(opts_all.obj.build_type_construct,data_details.item.type_construct) }}</div>
                </div>
                <div class="item">
                    <div class="left">电梯数</div>
                    <div class="right">{{ data_details.item.cnt_lift }} 台</div>
                </div>
                <div class="item">
                    <div class="left">非住宅面积</div>
                    <div class="right">{{ data_details.item.cnt_live_not }} m²</div>
                </div>
                <div class="item">
                    <div class="left">建设单位</div>
                    <div class="right">{{ data_details.item.by_build }}</div>
                </div>
                <div class="item">
                    <div class="left">备注</div>
                    <div class="right">{{ data_details.item.remark }}</div>
                </div>
                <div v-if="data_details.item.addition&&data_details.item.addition.desc" class="item">
                    <div class="left">模型简介</div>
                    <div class="right">{{ data_details.item.addition?data_details.item.addition.desc:'' }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import SearchResidential from '@/components/SearchResidential/index.vue'
import {
    APIgetBuildListHouse,
    APIgetBuildDetailsHouse,
    APIdeleteBuildHouse,
    APIputBuildHouse,
    APIpostBuildHouse
} from '@/api/custom/custom.js'
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
/* ----------------------------------------------------------------------------------------------------------------------- */
// 数据
// 搜索
let switch_search = ref(false)
let data_search = reactive({
    obj: {}
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
let page = ref(1)
// 添加，修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {
        'zone_id': '62174812e2f596482a1db206',
        'addr': '四川省 巴中市 恩阳区',
        'area_live': '489463.6',
        'area_build': '6981.6',
        'area_live_not': '198720.6',
        'cnt_floor': 32,
        'cnt_unit': 98,
        'cnt_live': 57,
        'by_build_owner': '形革快织象之按道听总',
        'time_build_end': '1991-10-16',
        'time_turn': '1984-09-01',
        'time_use': '1992-07-17',
        'sno': 24,
        'report_name': '调二开题几',
        'name': '建法感东见',
        'type_water': '100',
        'type_construct': '100',
        'cnt_lift': 95,
        'cnt_live_not': 88,
        'by_build': '体色时收养领研',
        'remark': '',
        'addition': {
            'desc': '决世非单程决今加千便度温更。把取办明部开边任器示研广增按所。统格活从律到除海在率内却把出当且。都已亲许也公品她装运干明矿非或管放。史结以造思运很最加来党包共电气。'
        }
    }
})
let rule_examine = {
    // reply: [{
    //     required: true,
    //     message: '请输入理由！',
    //     trigger: 'blur'
    // }]
}
const str_title = ref('添加')
const from_error = reactive({
    msg: {}
})
/* ----------------------------------------------------------------------------------------------------------------------- */
// 方法
// 搜索
const searchFunc = () => {
    page.value = 1
    switch_search.value = true
    getTabListFunc()
}
// 刷新
const refreshFunc = () => {
    page.value = 1
    switch_search.value = false
    data_search.obj = {}
    getTabListFunc()
}

// 详情
const detailsFunc = val => {
    data_dialog.obj = val
    APIgetBuildDetailsHouse(val.id).then(res => {
        if (!res.code) {
            data_details.item = res.data
            switch_details.value = true
        }
    })
}
// 监听分页
watch(page, () => {
    getTabListFunc()
})
// 同意拒绝提交
const dialogExamineCloseFunc = formEl => {
    from_error.msg = {}
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            if (str_title.value == '修改') {
                APIputBuildHouse(from_examine.item.id, from_examine.item).then(res => {
                    if (!res.code) {
                        refreshFunc()
                        ElMessage.success(res.msg)
                        switch_examine.value = false
                    }
                }).catch(err => {
                    from_error.msg = err.data
                })
            } else {
                APIpostBuildHouse(from_examine.item).then(res => {
                    if (!res.code) {
                        refreshFunc()
                        ElMessage.success(res.msg)
                        switch_examine.value = false
                    }
                }).catch(err => {
                    from_error.msg = err.data
                })
            }
        } else {
            return false
        }
    })
}
import { useRoute } from 'vue-router'
const route = useRoute()
// 获取列表api请求
const getTabListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    if (route.query.zone_id) {
        params.zone_id = route.query.zone_id
    }
    for (let key in data_search.obj) {
        if (data_search.obj[key] || data_search.obj[key] === 0) {
            if (data_search.obj[key] instanceof Array && data_search.obj[key].length <= 0) {
                continue
            }
            params[key] = data_search.obj[key]
        }
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
    APIgetBuildListHouse(params).then(res => {
        if (res.code === 0) {
            loading_tab.value = false
            data_tab.arr = res.data.items
            total.value = res.data.aggregation.total_cnt
        }
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteBuildHouse(val.id).then(res => {
        if (res.code === 0) {
            refreshFunc()
            ElMessage.success(res.msg)
        }
    })
}
// 添加楼栋
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        'zone_id': '',
        'addr': '',
        'area_live': '',
        'area_build': '',
        'area_live_not': '',
        'cnt_floor': 0,
        'cnt_unit': 0,
        'cnt_live': 0,
        'by_build_owner': '',
        'time_build_end': '',
        'time_turn': '',
        'time_use': '',
        'sno': 0,
        'report_name': '',
        'name': '',
        'type_water': '',
        'type_construct': '',
        'cnt_lift': 0,
        'cnt_live_not': 0,
        'by_build': '',
        'remark': '',
        'addition': {
            'desc': ''
        }
    }
    switch_examine.value = true
}
// 修改
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    APIgetBuildDetailsHouse(val.id).then(res => {
        if (!res.code) {
            from_examine.item = res.data
            switch_examine.value = true
        }
    })
}

/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()

// 配置项
import {
    APIpostGetOpts
} from '@/api/custom/custom.js'
const opts_all = reactive({
    obj: {}
})
APIpostGetOpts({ lab: ['build_type_water', 'build_type_construct'] }).then(res => {
    opts_all.obj = res.data
})
const getOptValFunc = (arr, key) => {
    for (let i in arr) {
        if (arr[i].key == key) {
            return arr[i].val
        }
    }
    return ''
}
</script>
<style lang="scss">
    .routinebuilding {
        .el-cascader-box-my {
            .el-cascader {
                width: 100% !important;
                margin-bottom: 10px;
            }
        }

        .serve-box {
            border: 1px solid #eeeeee;
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
                background-color: #ffffff;
            }
        }
    }
</style>
<style lang="scss" scoped>
    .routinebuilding {
        .head-btn {
            width: 100%;
            margin-bottom: 10px;
        }
    }

    .search-tips {
        color: #aaaaaa;
        font-size: 14px;
        margin-bottom: 20px;
    }

    .details-box {
        .item {
            display: flex;
            color: #333333;
            font-size: 16px;
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;

            .left {
                box-sizing: border-box;
                width: 160px;
                white-space: nowrap;
                margin-right: 20px;
                text-align: right;
                font-weight: 600;
            }

            .left::after {
                content: '：';
            }

            .right {
                width: 100%;
                color: #666666;
            }
        }

        .item:last-child {
            border-style: none;
        }
    }
</style>
