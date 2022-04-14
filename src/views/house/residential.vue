<template>
    <div class="routineresidentialhouse">
        <page-main>
            <div>
                <div>
                    <el-row :gutter="10">
                        <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
                            <el-input v-model="data_search.obj.name" class="head-btn" placeholder="小区名称" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
                            <el-input v-model="data_search.obj.addr" class="head-btn" placeholder="地址" clearable />
                        </el-col>
                        <!-- <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
                            <el-input v-model="data_search.obj.china_code" class="head-btn" placeholder="所在区域code" clearable />
                        </el-col> -->
                        <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
                            <div class="head-btn">
                                <el-date-picker
                                    v-model="data_search.obj.time_pro_setup"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="立项时间"
                                    end-placeholder="立项时间"
                                    style="width: 100%;"
                                    value-format="YYYY-MM-DD"
                                />
                            </div>
                        </el-col> -->
                        <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
                            <div class="head-btn">
                                <el-date-picker
                                    v-model="data_search.obj.time_build_start"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开工时间"
                                    end-placeholder="开工时间"
                                    style="width: 100%;"
                                    value-format="YYYY-MM-DD"
                                />
                            </div>
                        </el-col> -->
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
                        <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
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
                        </el-col> -->
                        <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
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
                        </el-col> -->
                        <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
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
                        </el-col> -->
                        <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
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
                        </el-col> -->
                        <el-col :xs="12" :sm="8" :md="6" :lg="2" :xl="3">
                            <el-button class="head-btn" type="primary" @click="searchFunc">搜索</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div v-show="switch_search" class="search-tips">
                    <el-button style="margin-right: 10px;" @click="refreshFunc">重置</el-button>
                    *搜索到相关结果共{{ total }}条。
                </div>
                <div>
                    <el-row :gutter="20" class="bottom-btn-box-2">
                        <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                            <el-button class="head-btn" type="primary" @click="addResidentialFunc">添加小区</el-button>
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
                        <el-table-column prop="area_floor" label="总占地面积" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.area_floor }} m²</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="area_build" label="总建筑面积" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.area_build }} m²</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="area_support" label="配套用房总面积" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.area_support }} m²</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cnt_building" label="楼栋数" width="140">
                            <template #default="scope">
                                <el-link style="margin-left: 10px" type="primary">
                                    <router-link style="text-decoration: inherit; color: inherit;" :to="{name: 'houseResidentialBuilding',query:{ zone_id: scope.row.id }}">{{ scope.row.cnt_building }} 栋</router-link>
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cnt_live" label="住房总套数" width="140">
                            <template #default="scope">
                                <el-link style="margin-left: 10px" type="primary" @click="showHouseFunc(scope.row)">
                                    {{ scope.row.cnt_live }} 套
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cnt_support" label="配套用房总套数" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.cnt_support }} 套</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="company_build" label="建设单位名称" width="140" />
                        <el-table-column prop="time_use" label="投用时间" width="140" />
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
                >
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label="名称" prop="name" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                <el-input
                                    v-model="from_examine.item.name"
                                    placeholder=""
                                />
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
                            <el-form-item label="总占地面积" prop="area_floor" :error="from_error.msg&&from_error.msg.area_floor?from_error.msg.area_floor[0]:''">
                                <el-input
                                    v-model="from_examine.item.area_floor"
                                    placeholder=""
                                >
                                    <template #append>m²</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="总建筑面积" prop="area_build" :error="from_error.msg&&from_error.msg.area_build?from_error.msg.area_build[0]:''">
                                <el-input
                                    v-model="from_examine.item.area_build"
                                    placeholder=""
                                >
                                    <template #append>m²</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="配套用房总面积" prop="area_support" :error="from_error.msg&&from_error.msg.area_support?from_error.msg.area_support[0]:''">
                                <el-input
                                    v-model="from_examine.item.area_support"
                                    placeholder=""
                                >
                                    <template #append>m²</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="楼栋数" prop="cnt_building" :error="from_error.msg&&from_error.msg.cnt_building?from_error.msg.cnt_building[0]:''">
                                <el-input
                                    v-model="from_examine.item.cnt_building"
                                    placeholder=""
                                >
                                    <template #append>栋</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="住房总套数" prop="cnt_live" :error="from_error.msg&&from_error.msg.cnt_live?from_error.msg.cnt_live[0]:''">
                                <el-input
                                    v-model="from_examine.item.cnt_live"
                                    placeholder=""
                                >
                                    <template #append>套</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="配套用房总套数" prop="cnt_support" :error="from_error.msg&&from_error.msg.cnt_support?from_error.msg.cnt_support[0]:''">
                                <el-input
                                    v-model="from_examine.item.cnt_support"
                                    placeholder=""
                                >
                                    <template #append>套</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="建设单位名称" prop="company_build" :error="from_error.msg&&from_error.msg.company_build?from_error.msg.company_build[0]:''">
                                <el-input
                                    v-model="from_examine.item.company_build"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="竣工时间" prop="time_build_end" :error="from_error.msg&&from_error.msg.time_build_end?from_error.msg.time_build_end[0]:''">
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
                            <el-form-item label="开工时间" prop="time_build_start" :error="from_error.msg&&from_error.msg.time_build_start?from_error.msg.time_build_start[0]:''">
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
                            <el-form-item label="立项时间" prop="time_pro_setup" :error="from_error.msg&&from_error.msg.time_pro_setup?from_error.msg.time_pro_setup[0]:''">
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
                            <el-form-item label="移交时间" prop="time_turn" :error="from_error.msg&&from_error.msg.time_turn?from_error.msg.time_turn[0]:''">
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
                            <el-form-item label="投用时间" prop="time_use" :error="from_error.msg&&from_error.msg.time_use?from_error.msg.time_use[0]:''">
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
                            <el-form-item label="所在区域code" prop="china_code" :error="from_error.msg&&from_error.msg.china_code?from_error.msg.china_code[0]:''">
                                <el-input
                                    v-model="from_examine.item.china_code"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item label="备注" prop="remark" :error="from_error.msg&&from_error.msg.remark?from_error.msg.remark[0]:''">
                                <el-input
                                    v-model="from_examine.item.remark"
                                    :autosize="{ minRows: 2, maxRows: 6 }"
                                    type="textarea"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item label="模型简介" :error="from_error.msg&&from_error.msg['addition.desc']?from_error.msg['addition.desc'][0]:''">
                                <el-input
                                    v-model="from_examine.item.addition.desc"
                                    :autosize="{ minRows: 2, maxRows: 6 }"
                                    type="textarea"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <div style="margin-bottom: 10px;">
                                <el-button style="margin-right: 10px;" @click="addServiceFunc">添加服务名称和电话</el-button>
                            </div>
                            <div v-for="(item,i) in from_examine.item.addition.extra.convenience" class="serve-box">
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
                    <div class="left">名称</div>
                    <div class="right">{{ data_details.item.name }}</div>
                </div>
                <div class="item">
                    <div class="left">地址</div>
                    <div class="right">{{ data_details.item.addr }}</div>
                </div>
                <div class="item">
                    <div class="left">总占地面积</div>
                    <div class="right">{{ data_details.item.area_floor }} m²</div>
                </div>
                <div class="item">
                    <div class="left">总建筑面积</div>
                    <div class="right">{{ data_details.item.area_build }} m²</div>
                </div>
                <div class="item">
                    <div class="left">配套用房总面积</div>
                    <div class="right">{{ data_details.item.area_support }} m²</div>
                </div>
                <div class="item">
                    <div class="left">楼栋数</div>
                    <div class="right">{{ data_details.item.cnt_building }} 栋</div>
                </div>
                <div class="item">
                    <div class="left">住房总套数</div>
                    <div class="right">{{ data_details.item.cnt_live }} 套</div>
                </div>
                <div class="item">
                    <div class="left">配套用房总套数</div>
                    <div class="right">{{ data_details.item.cnt_support }} 套</div>
                </div>
                <div class="item">
                    <div class="left">建设单位名称</div>
                    <div class="right">{{ data_details.item.company_build }}</div>
                </div>
                <div class="item">
                    <div class="left">竣工时间</div>
                    <div class="right">{{ data_details.item.time_build_end }}</div>
                </div>
                <div class="item">
                    <div class="left">开工时间</div>
                    <div class="right">{{ data_details.item.time_build_start }}</div>
                </div>
                <div class="item">
                    <div class="left">立项时间</div>
                    <div class="right">{{ data_details.item.time_pro_setup }}</div>
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
                    <div class="left">所在区域code</div>
                    <div class="right">{{ data_details.item.china_code }}</div>
                </div>
                <div class="item">
                    <div class="left">备注</div>
                    <div class="right">{{ data_details.item.remark }}</div>
                </div>
                <div>
                    <div class="item">
                        <div class="left">便民服务</div>
                        <div class="right">
                            <div style="font-size: #666666;font-size: 14px;margin-bottom: 10px;">
                                *{{ data_details.item.addition.desc }}
                            </div>
                            <div
                                v-for="(item,i) in data_details.item.addition.extra.convenience"
                                class="convenience-item"
                                style="display: flex;margin-bottom: 10px;border-bottom: 1px solid #eee;padding-bottom: 8px;"
                            >
                                <div class="conve-left" style="flex:1;">
                                    <span
                                        style="color: #000000;"
                                    >服务名称：</span>{{ item.title }}
                                </div>
                                <div class="conve-right" style="flex:1;">
                                    <span
                                        style="color: #000000;"
                                    >联系方式：</span>{{ item.phone }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
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
        >
            <div style="width: 100%;height: 60vh;overflow: auto;">
                <House :tree_item="tree_item.obj" />
            </div>
        </el-dialog>
    </div>
</template>
<script setup>
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
/* ----------------------------------------------------------------------------------------------------------------------- */
// 数据
import House from '@/components/House/index.vue'
const tree_item = reactive({
    obj: {}
})
const edit_house = ref(false)
const showHouseFunc = val => {
    tree_item.obj = {
        id: val.id,
        name: val.name,
        next_type: 'building',
        type: 'region'
    }
    edit_house.value = true
}

// 搜索
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
let page = ref(1)
// 添加，修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {
        'name': '',
        'addr': '',
        'area_floor': '',
        'area_build': '',
        'area_support': '',
        'cnt_building': 0,
        'cnt_live': 0,
        'cnt_support': 0,
        'company_build': '',
        'time_build_end': '',
        'time_build_start': '',
        'time_pro_setup': '',
        'time_turn': '',
        'time_use': '',
        'china_code': '',
        'remark': '',
        'addition': {
            'extra': {
                'convenience': []
            },
            'desc': ''
        }
    }
})

const str_title = ref('添加')
const from_error = reactive({ msg: {} })
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
    APIgetResidentialDetailsHouse(val.id).then(res => {
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
                APIputResidentialHouse(from_examine.item.id, from_examine.item).then(res => {
                    if (!res.code) {
                        refreshFunc()
                        ElMessage.success(res.msg)
                        switch_examine.value = false
                    }
                }).catch(err => {
                    from_error.msg = err.data
                })
            } else {
                APIpostResidentialHouse(from_examine.item).then(res => {
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
    APIgetResidentialListHouse(params).then(res => {
        if (res.code === 0) {
            loading_tab.value = false
            data_tab.arr = res.data.items
            total.value = res.data.aggregation.total_cnt
        }
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteResidentialHouse(val.id).then(res => {
        if (res.code === 0) {
            refreshFunc()
            ElMessage.success(res.msg)
        }
    })
}
// 添加小区
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        'name': '',
        'addr': '',
        'area_floor': '',
        'area_build': '',
        'area_support': '',
        'cnt_building': 0,
        'cnt_live': 0,
        'cnt_support': 0,
        'company_build': '',
        'time_build_end': '',
        'time_build_start': '',
        'time_pro_setup': '',
        'time_turn': '',
        'time_use': '',
        'china_code': '',
        'remark': '',
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
    from_error.msg = {}
    str_title.value = '修改'
    APIgetResidentialDetailsHouse(val.id).then(res => {
        if (!res.code) {
            from_examine.item = res.data
            switch_examine.value = true
        }
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
// 执行
refreshFunc()
</script>
<style lang="scss">
    .routineresidentialhouse {
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
    .routineresidentialhouse {
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
