<template>
    <div class="routinebuilding">
        <page-main class="hidden">
            <div class="m-b-20">
                <el-button
                    type="primary" :icon="Plus" size="large"
                    @click="addResidentialFunc"
                >
                    添加楼栋
                </el-button>
            </div>
            <div class="search">
                <el-row>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                楼栋名称：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-input v-model="data_search.obj.name" class="search_tb" placeholder="楼栋名称" clearable />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                楼栋编号：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-input v-model="data_search.obj.sno" class="search_tb" placeholder="楼栋编号" clearable />
                            </el-col>
                        </el-row>
                    </el-col>

                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                地址：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-input v-model="data_search.obj.addr" class="search_tb" placeholder="地址" clearable />
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="0" :sm="4" :md="3" :lg="2" />
                    <el-col :xs="24" :sm="20" :md="21" :lg="22">
                        <el-button type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                        <el-button v-show="switch_search == true" class="m-l-20 m-r-10" :icon="Loading" @click="refreshFunc">重置</el-button>
                        <span v-show="switch_search == true" class="size-base">
                            *共搜索到{{ total }}条。
                        </span>
                    </el-col>
                </el-row>
            </div>
            <!-- <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
                        <el-input v-model="data_search.obj.addr" class="head-btn" placeholder="地址" clearable />
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
                    </el-col> -->
            <el-table
                v-loading="loading_tab"
                :data="data_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                class="tab_1"
            >
                <el-table-column prop="name" label="名称" width="180" />
                <el-table-column prop="addr" label="地址" width="220" />
                <el-table-column prop="area_live" label="住宅总面积" width="140">
                    <template #default="scope">
                        <span>{{ scope.row.area_live }} m²</span>
                    </template>
                </el-table-column>
                <el-table-column prop="area_build" label="总建筑面积" width="140">
                    <template #default="scope">
                        <span>{{ scope.row.area_build }} m²</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cnt_floor" label="楼层数" width="140">
                    <template #default="scope">
                        <span>{{ scope.row.cnt_floor }} 层</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cnt_unit" label="单元数" width="140">
                    <template #default="scope">
                        <el-link :underline="false" type="primary">
                            <router-link class="el-button" style="text-decoration: inherit; color: inherit;" :to="{name: 'zonesBuildingUnit',query:{ building_id: scope.row.id }}">{{ scope.row.cnt_unit }} 个</router-link>
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="cnt_live" label="住宅总套数" width="140">
                    <template #default="scope">
                        <el-link class="el-button" :underline="false" style="padding: 0 10px;" type="primary" @click="showHouseFunc(scope.row)">
                            {{ scope.row.cnt_live }} 套
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
            <el-pagination
                v-model:current-page="page"
                style="float: right;"
                layout="prev,next,jumper,"
                :total="Infinity"
                :page-size="per_page"
                background
                prev-text="上一页"
                next-text="下一页"
                hide-on-single-page
            />
        </page-main>
        <!-- 修改添加 -->
        <el-dialog
            v-model="switch_examine"
            :title="str_title"
            width="50%"
        >
            <el-scrollbar style="height: 400px;">
                <div class="details-box p-lr-10">
                    <el-form
                        ref="ruleFormRef"
                        :model="from_examine.item"
                    >
                        <el-row :gutter="10">
                            <el-col :xs="24"><div class="details-tit-sm m-b-10">基础信息</div></el-col>
                            <el-col :md="24" :lg="12">
                                <el-form-item
                                    label="楼栋名称" prop="name" label-width="100px"
                                    :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                                >
                                    <el-input
                                        v-model="from_examine.item.name"
                                        placeholder=""
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :md="24" :lg="12">
                                <el-form-item label="楼栋编号" prop="sno" label-width="100px" :error="from_error.msg&&from_error.msg.sno?from_error.msg.sno[0]:''">
                                    <el-input
                                        v-model="from_examine.item.sno"
                                        placeholder=""
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :md="24" :lg="12">
                                <el-form-item label="楼栋地址" prop="addr" label-width="100px" :error="from_error.msg&&from_error.msg.addr?from_error.msg.addr[0]:''">
                                    <el-input
                                        v-model="from_examine.item.addr"
                                        placeholder=""
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :md="24" :lg="12">
                                <el-form-item
                                    label="供水方式" prop="type_water" label-width="100px"
                                    :error="from_error.msg&&from_error.msg.type_water?from_error.msg.type_water[0]:''"
                                >
                                    <el-select v-model="from_examine.item.type_water" class="head-btn" placeholder="供水方式" clearable>
                                        <el-option v-for="(item,i) in opts_all.obj.build_type_water" :key="item.key" :label="item.val" :value="item.key" />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :md="24" :lg="12">
                                <el-form-item
                                    label="建筑结构" prop="type_construct" label-width="100px"
                                    :error="from_error.msg&&from_error.msg.type_construct?from_error.msg.type_construct[0]:''"
                                >
                                    <el-select v-model="from_examine.item.type_construct" class="head-btn" placeholder="建筑结构" clearable>
                                        <el-option v-for="(item,i) in opts_all.obj.build_type_construct" :key="item.key" :label="item.val" :value="item.key" />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24"><div class="details-tit-sm m-b-10">面积/数量</div></el-col>
                            <el-col :md="24" :lg="12">
                                <el-form-item
                                    label="楼层数" prop="cnt_floor" label-width="100px"
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
                                    label="单元数" prop="cnt_unit" label-width="100px"
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
                                    label="电梯数" prop="cnt_lift" label-width="100px"
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
                            <el-col :md="24" :lg="12" />
                            <el-col :md="24" :lg="12">
                                <el-form-item
                                    label="总建筑面积" prop="area_build" label-width="100px"
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
                                    label="总专有面积" prop="area_exc" label-width="100px"
                                    :error="from_error.msg&&from_error.msg.area_exc?from_error.msg.area_exc[0]:''"
                                >
                                    <el-input
                                        v-model="from_examine.item.area_exc"
                                        placeholder=""
                                    >
                                        <template #append>m²</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :md="24" :lg="12">
                                <el-form-item
                                    label="住宅总套数" prop="cnt_live" label-width="100px"
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
                                    label="住宅总面积" prop="area_live" label-width="100px"
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
                                    label="非住宅套数" prop="cnt_live_not" label-width="100px"
                                    :error="from_error.msg&&from_error.msg.cnt_live_not?from_error.msg.cnt_live_not[0]:''"
                                >
                                    <el-input
                                        v-model="from_examine.item.cnt_live_not"
                                        placeholder=""
                                    >
                                        <template #append>套</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :md="24" :lg="12">
                                <el-form-item
                                    label="非住宅面积" prop="area_live_not" label-width="100px"
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
                            <el-col :xs="24"><div class="details-tit-sm m-b-10">其它信息</div></el-col>
                            <el-col :md="24" :lg="12">
                                <el-form-item
                                    label="建设业主单位" prop="by_build_owner" label-width="100px"
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
                                    label="建设单位" prop="by_build" label-width="100px"
                                    :error="from_error.msg&&from_error.msg.by_build?from_error.msg.by_build[0]:''"
                                >
                                    <el-input
                                        v-model="from_examine.item.by_build"
                                        placeholder=""
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :md="24" :lg="12">
                                <el-form-item
                                    label="楼栋报建名" prop="report_name" label-width="100px"
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
                                    label="建成时间" prop="time_build_end" label-width="100px"
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
                                    label="移交时间" prop="time_turn" label-width="100px"
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
                                    label="投用时间" prop="time_use" label-width="100px"
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
                            <el-col :md="24" :lg="24">
                                <el-form-item
                                    label="备注" prop="remark" label-width="100px"
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
                                    label="简介" prop="addition.desc" label-width="100px"
                                    :error="from_error.msg&&from_error.msg['addition.desc']?from_error.msg['addition.desc'][0]:''"
                                >
                                    <!-- <el-input
                                        v-model="from_examine.item.addition.desc"
                                        :autosize="{ minRows: 2, maxRows: 6 }"
                                        type="textarea"
                                        placeholder=""
                                    /> -->
                                    <editor v-model="from_examine.item.addition.desc" class="w-100" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-scrollbar>

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
            <!-- <el-tabs v-model="activeName" @tab-click="handleClick"> -->
            <!-- <el-tab-pane label="基础信息" name="1"> -->
            <el-scrollbar height="400px">
                <div class="details-box">
                    <div class="details-tit-sm">楼栋信息</div>
                    <div class="item">
                        <div class="left">楼栋名称</div>
                        <div class="right">{{ data_details.item.name }}</div>
                    </div>
                    <div class="item">
                        <div class="left">楼栋编号</div>
                        <div class="right">{{ data_details.item.sno }}</div>
                    </div>
                    <div class="item">
                        <div class="left">所属小区</div>
                        <div class="right">{{ data_details.item.zone_id }}</div>
                    </div>
                    <div class="item">
                        <div class="left">楼栋地址</div>
                        <div class="right">{{ data_details.item.addr }}</div>
                    </div>
                    <div class="item">
                        <div class="left">供水方式</div>
                        <div class="right">{{ getOptVal(opts_all.obj.build_type_water,data_details.item.type_water) }}</div>
                    </div>
                    <div class="item">
                        <div class="left">建筑结构</div>
                        <div class="right">{{ getOptVal(opts_all.obj.build_type_construct,data_details.item.type_construct) }}</div>
                    </div>

                    <div class="details-tit-sm">数量/面积信息</div>
                    <div class="item">
                        <div class="left">楼层数</div>
                        <div class="right">{{ data_details.item.cnt_floor }} 层</div>
                    </div>
                    <div class="item">
                        <div class="left">单元个数</div>
                        <div class="right">{{ data_details.item.cnt_unit }} 个</div>
                    </div>
                    <div class="item">
                        <div class="left">电梯数</div>
                        <div class="right">{{ data_details.item.cnt_lift }} 台</div>
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
                        <div class="left">住宅总套数</div>
                        <div class="right">{{ data_details.item.cnt_live }} 套</div>
                    </div>
                    <div class="item">
                        <div class="left">住宅总面积</div>
                        <div class="right">{{ data_details.item.area_live }} m²</div>
                    </div>
                    <div class="item">
                        <div class="left">非住宅套数</div>
                        <div class="right">{{ data_details.item.cnt_live_not }} 套</div>
                    </div>
                    <div class="item">
                        <div class="left">非住宅面积</div>
                        <div class="right">{{ data_details.item.area_live_not }} m²</div>
                    </div>
                    <div class="details-tit-sm">建设信息</div>
                    <div class="item">
                        <div class="left">楼栋报建名</div>
                        <div class="right">{{ data_details.item.report_name }}</div>
                    </div>
                    <div class="item">
                        <div class="left">建设业主单位</div>
                        <div class="right">{{ data_details.item.by_build_owner }}</div>
                    </div>
                    <div class="item">
                        <div class="left">建设单位</div>
                        <div class="right">{{ data_details.item.by_build }}</div>
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
                        <div class="left">备注</div>
                        <div class="right">{{ data_details.item.remark }}</div>
                    </div>
                    <div v-if="data_details.item.addition&&data_details.item.addition.desc" class="item">
                        <div class="left">简介</div>
                        <div class="right" v-html="data_details.item.addition?data_details.item.addition.desc:''" />
                    </div>
                </div>
            </el-scrollbar>
            <!-- </el-tab-pane> -->
            <!-- <el-tab-pane label="档案信息" name="2">
                    <el-scrollbar height="400px" />
                </el-tab-pane> -->
            <!-- </el-tabs> -->
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
            width="80%"
        >
            <div style="overflow: auto;">
                <House :tree_item="tree_item.arr" />
            </div>
        </el-dialog>
    </div>
</template>
<script setup>
import House from '@/components/House/index.vue'
const tree_item = reactive({
    arr: []
})
const activeName = ref('1')
const edit_house = ref(false)
const showHouseFunc = val => {
    tree_item.arr = [{
        id: val.id,
        name: val.name,
        next_type: 'units',
        type: 'buildings'
    }]
    edit_house.value = true
}
import { Loading, Search, Plus } from '@element-plus/icons-vue'
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
let page = ref(Number(sessionStorage.getItem('building_currentPage')) || 1)
// 添加，修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {
        'addition': {
            'desc': ''
        }
    }
})
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
    switch_search.value = false
    data_search.obj = {}
    getTabListFunc()
}

// 详情
const detailsFunc = val => {
    data_dialog.obj = val
    APIgetBuildDetailsHouse(val.id).then(res => {
        console.log(res)
        data_details.item = res
        switch_details.value = true
    })
}
// 监听分页
watch(page, () => {
    sessionStorage.setItem('building_currentPage', page.value)
    getTabListFunc()
})
import { onBeforeRouteLeave } from 'vue-router'
onBeforeRouteLeave((to, from) => {
    console.log(to)
    if (to.meta.title == '单元') {
        return true
    } else {
        sessionStorage.removeItem('building_currentPage')
    }
})
// 同意拒绝提交
const dialogExamineCloseFunc = formEl => {
    from_error.msg = {}
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            from_examine.item.zone_id = route.query.zone_id
            for (let key in from_examine.item) {
                if (from_examine.item[key] !== null) {
                    if (from_examine.item[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (from_examine.item[key] !== 0 || from_examine.item[key] !== false)) {
                        delete from_examine.item[key]
                    }
                }
            }
            if (str_title.value == '修改') {
                APIputBuildHouse(from_examine.item.id, from_examine.item).then(res => {
                    refreshFunc()
                    ElMessage.success('修改成功')
                    switch_examine.value = false
                }).catch(err => {
                    ElMessage.success('修改失败')
                })
            } else {
                APIpostBuildHouse(from_examine.item).then(res => {
                    refreshFunc()
                    ElMessage.success('添加成功')
                    switch_examine.value = false
                }).catch(err => {
                    ElMessage.success('添加失败')

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
        console.log(res)
        loading_tab.value = false
        data_tab.arr = res
        total.value = res.length
        let btnNext = document.querySelector('.btn-next')
        if (res.length < per_page.value) {
            btnNext.classList.add('not_allowed')
            btnNext.setAttribute('disabled', true)
            btnNext.setAttribute('aria-disabled', true)
        } else {
            btnNext.classList.remove('not_allowed')
            btnNext.removeAttribute('disabled')
            btnNext.setAttribute('aria-disabled', false)
        }
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteBuildHouse(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
// 添加楼栋
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        addition: {
            desc: ''
        }
    }
    switch_examine.value = true
}
// 修改
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    APIgetBuildDetailsHouse(val.id).then(res => {
        from_examine.item = res
        switch_examine.value = true
    })
}

/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()

/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['build_type_water', 'build_type_construct']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
.routinebuilding {
    .el-cascader-box-my {
        .el-cascader {
            width: 100% !important;
            margin-bottom: 10px;
        }
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
.search-tips {
    color: #aaa;
    font-size: 14px;
    margin-bottom: 20px;
}
</style>
