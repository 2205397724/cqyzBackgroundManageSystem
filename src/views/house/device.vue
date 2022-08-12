<template>
    <div class="articletparticletpl">
        <page-main>
            <div>
                <el-button class="head-btn" type="primary" :icon="Plus" @click="addResidentialFunc">添加设备</el-button>
            </div>
            <div :class="{search3: isSearch3,search2: isSearch2}">
                <el-row :gutter="10">
                    <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">
                                设备名称：
                            </div>
                            <el-input v-model="data_search.obj.name" class="search_tb" placeholder="设备名称" clearable />
                        </div>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">设备类型：</div>
                            <el-select v-model="data_search.obj.type" class="search_tb" placeholder="类型" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.device_type" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">状态：</div>
                            <el-select v-model="data_search.obj.status" class="search_tb" placeholder="状态" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.device_status" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
                <el-row v-if="btnClick==true" class="m-t-20" :gutter="10">
                    <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">是否启用：</div>
                            <el-select v-model="data_search.obj.show" class="search_tb" placeholder="是否显示" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.device_show" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="m-t-20">
                    <el-col :xs="24" :md="24" :lg="10">
                        <div class="flx">
                            <div class="w_30">
                                <el-button class="m-l-20" type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                            </div>
                            <div v-show="switch_search == true" class="w_70 m-l-30">
                                <el-button class="m-r-10" @click="refreshFunc">重置</el-button>
                                <div class="searchDetail">
                                    *搜索到相关结果共{{ total }}条。
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <div class="searchPlay" @click="btnClickFunc">
                        <!-- <el-icon :size="20"><ArrowUpBold /></el-icon> -->
                        <el-button v-if="btnClick==false" :icon="CaretBottom" class="searchDeal">展开</el-button>
                        <el-button v-if="btnClick==true" :icon="CaretTop" class="searchDeal">收起</el-button>
                    </div>
                </el-row>
            </div>
            <div>
                <el-table
                    v-loading="loading_tab"
                    :data="data_tab.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    class="tab"
                >
                    <el-table-column prop="id" label="设备名称" width="180">
                        <template #default="scope">
                            <span>{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="设备编号">
                        <template #default="scope">
                            <span>{{ scope.row.sno }} </span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="id" label="所在位置">
                        <template #default="scope">
                            <span>{{ scope.row.zoneinfo.name }} {{ scope.row.buildinginfo.name }} {{ scope.row.unitinfo.name }} </span>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="cid" label="类型" width="90">
                        <template #default="scope">
                            <span>{{ getOptVal(opts_all.obj.device_type,scope.row.type) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="是否显示" width="90">
                        <template #default="scope">
                            <span>{{ getOptVal(opts_all.obj.device_show,scope.row.show) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cid" label="状态" width="90">
                        <template #default="scope">
                            <el-tag v-show="scope.row.status == 1" class="btnNone" type="success" effect="dark">正常</el-tag>
                            <el-tag v-show="scope.row.status == 2" class="btnNone noDeal" type="danger" effect="dark"> 故障</el-tag>
                            <el-tag v-show="scope.row.status == 3" class="btnNone" type="warning" effect="dark">维修</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="档案" width="90">
                        <template #default="scope">
                            <div class="archive" @click="deviceArchive(scope.row)">档案</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="维保记录" width="120">
                        <template #default="scope">
                            <div class="archive" @click="deviceRepair(scope.row)">维保记录</div>
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
            <div class="p-t-20">
                <el-pagination
                    v-model:current-page="page"
                    layout="total,prev,pager,next,jumper,"
                    :total="total"
                    :page-size="per_page"
                    background
                    hide-on-single-page
                />
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
                            <el-form-item
                                label="设备名称"
                                label-width="90px"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.name"
                                    class="head-btn"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="所属位置"
                                label-width="90px"
                                :error="from_error.msg&&from_error.msg.zone?from_error.msg.zone[0]:''"
                            >
                                <BerZone v-model:zid="from_examine.item.zone" v-model:bid="from_examine.item.building" v-model:uid="from_examine.item.unit" v-model:name="chinaName" :disabled="[0,1,2,3,4,5]" :code="''" />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="所在地址"
                                label-width="90px"
                                :error="from_error.msg&&from_error.msg.addr?from_error.msg.addr[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.addr"
                                    class="head-btn"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="编号"
                                label-width="90px"
                                :error="from_error.msg&&from_error.msg.sno?from_error.msg.sno[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.sno"
                                    class="head-btn"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="品牌"
                                label-width="90px"
                                :error="from_error.msg&&from_error.msg.brand?from_error.msg.brand[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.brand"
                                    class="head-btn"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="提醒信息"
                                label-width="90px"
                                :error="from_error.msg&&from_error.msg.warn?from_error.msg.warn[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.warn"
                                    class="head-btn"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="设备类型"
                                label-width="90px"
                                :error="from_error.msg&&from_error.msg.type?from_error.msg.type[0]:''"
                            >
                                <el-select v-model="from_examine.item.type" class="head-btn" placeholder="" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.device_type" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="设备状态"
                                label-width="90px"
                                :error="from_error.msg&&from_error.msg.status?from_error.msg.status[0]:''"
                            >
                                <el-select v-model="from_examine.item.status" class="head-btn" placeholder="" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.device_status" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="是否显示"
                                label-width="90px"
                                :error="from_error.msg&&from_error.msg.show?from_error.msg.show[0]:''"
                            >
                                <el-switch
                                    v-model="from_examine.item.show"
                                    class="head-btn"
                                    inline-prompt
                                    :active-value="1"
                                    :inactive-value="0"
                                    active-text="是"
                                    inactive-text="否"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24"><div class="details-tit-sm m-b-10">自定义字段</div></el-col>
                        <el-col :md="24" :lg="24">
                            <div class="m-b-10">
                                <el-button type="primary" plain @click="addServiceFunc">添加自定义字段</el-button>
                            </div>
                            <div v-for="(item,i) in from_examine.item.extra" :key="i" class="serve-box">
                                <el-row :gutter="10" class="p-t-20">
                                    <el-col :xs="12" :sm="12">
                                        <el-form-item label="字段名" :error="from_error.msg&&from_error.msg['extra.'+i+'.lab']?from_error.msg['extra.'+i+'.lab'][0]:''">
                                            <el-input
                                                v-model="item.lab"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="12" :sm="12">
                                        <el-form-item label="字段内容" :error="from_error.msg&&from_error.msg['extra.'+i+'.val']?from_error.msg['extra.'+i+'.val'][0]:''">
                                            <el-input
                                                v-model="item.val"
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
                <div class="footer">
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
            @closed="closeDialog"
        >
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="基础信息" name="1">
                    <el-scrollbar height="400px">
                        <div class="details-box">
                            <div class="item">
                                <div class="left">设备名称</div>
                                <div class="right">{{ data_details.item.name }}</div>
                            </div>
                            <div class="item">
                                <div class="left">小区>楼栋>单元</div>
                                <div class="right">{{ zoneName.name }} {{ buildingName.name }} {{ unitName.name }}</div>
                            </div>
                            <div class="item">
                                <div class="left">所在地址</div>
                                <div class="right">{{ data_details.item.addr }}</div>
                            </div>
                            <div class="item">
                                <div class="left">编号</div>
                                <div class="right">{{ data_details.item.sno }}</div>
                            </div>
                            <div class="item">
                                <div class="left">品牌</div>
                                <div class="right">{{ data_details.item.brand }}</div>
                            </div>
                            <div class="item">
                                <div class="left">提醒信息</div>
                                <div class="right">{{ data_details.item.warn }}</div>
                            </div>
                            <div class="item">
                                <div class="left">类型</div>
                                <div class="right">{{ getOptVal(opts_all.obj.device_type,data_details.item.type) }}</div>
                            </div>
                            <div class="item">
                                <div class="left">状态</div>
                                <div class="right">
                                    <el-tag v-show="data_details.item.status == 1" class="btnNone" type="success" effect="dark">正常</el-tag>
                                    <el-tag v-show="data_details.item.status == 2" class="btnNone noDeal" type="danger" effect="dark"> 故障</el-tag>
                                    <el-tag v-show="data_details.item.status == 3" class="btnNone" type="warning" effect="dark">维修</el-tag>
                                </div>
                            </div>
                            <div class="item">
                                <div class="left">是否显示</div>
                                <div class="right">{{ getOptVal(opts_all.obj.device_show,data_details.item.show) }}</div>
                            </div>
                            <div class="item">
                                <div class="left">创建时间</div>
                                <div class="right">{{ data_details.item.created_at }}</div>
                            </div>
                            <div class="item">
                                <div class="left">更新时间</div>
                                <div class="right">{{ data_details.item.updated_at }}</div>
                            </div>
                        </div>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="档案信息" name="2">
                    <el-scrollbar height="400px">
                        <div>
                            <el-timeline v-for="(item,index) in data_archive.arr" :key="index">
                                <el-timeline-item :timestamp="item.created_at" placement="top">
                                    <el-card>
                                        <div class="details-box">
                                            <div class="item">
                                                <div class="left">档案名称</div>
                                                <div class="right">{{ item.title }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">档案id</div>
                                                <div class="right">{{ item.id }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">设备id</div>
                                                <div class="right">{{ item.did }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">是否显示</div>
                                                <div class="right">{{ getOptVal(opts_all.obj.device_show,item.show) }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">更新时间</div>

                                                <div class="right">{{ item.updated_at }}</div>
                                            </div>
                                        </div>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                        <div v-show="data_archive.arr.length <= 0" class="size-lx">此设备无档案信息</div>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="维保记录" name="3">
                    <el-scrollbar height="400px">
                        <div>
                            <el-timeline v-for="(item,index) in data_repair.arr" :key="index">
                                <el-timeline-item :timestamp="item.created_at" placement="top">
                                    <el-card>
                                        <div class="details-box">
                                            <div class="item">
                                                <div class="left">维保名称</div>
                                                <div class="right">{{ item.title }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">维保id</div>
                                                <div class="right">{{ item.id }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">设备id</div>
                                                <div class="right">{{ item.did }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">详细记录</div>
                                                <div class="right">{{ item.content }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">类型</div>
                                                <div class="right">{{ getOptVal(opts_all.obj.repair_type,item.type) }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">是否显示</div>
                                                <div class="right">{{ getOptVal(opts_all.obj.device_show,item.show) }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">更新时间</div>
                                                <div class="right">{{ item.updated_at }}</div>
                                            </div>
                                        </div>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                        <div v-show="data_repair.arr.length <= 0" class="size-lx">此设备无维保记录</div>
                    </el-scrollbar>
                </el-tab-pane>
            </el-tabs>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import {
    APIgetDeviceList,
    APIgetDeviceDetails,
    APIdeleteDevice,
    APIputDevice,
    APIpostDevice
} from '@/api/custom/custom.js'
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
import { Search, Plus, CaretTop, CaretBottom } from '@element-plus/icons-vue'
/* ----------------------------------------------------------------------------------------------------------------------- */
// 数据
// 搜索
let switch_search = ref(false)
let data_search = reactive({ obj: {} })
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
const data_archive = reactive({
    arr: []
})
const data_repair = reactive({
    arr: []
})
const zoneName = ref('')
const buildingName = ref('')
const unitName = ref('')
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(1)
// 添加，修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {
        extra: []
    }
})
const str_title = ref('添加')
const from_error = reactive({
    msg: {}
})
const switch_repair = ref(false)
const switch_archive = ref(false)
const activeName = ref('1')
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['illegal_user', 'illegal_type', 'device_status', 'device_type', 'device_show', 'kind', 'repair_type', 'device_show']).then(res => {
    console.log(res)
    opts_all.obj = res
})
import {
    APIgetTypeList
} from '@/api/custom/custom.js'
const options = reactive({ arr: [] })
APIgetTypeList('announce').then(res => {
    options.arr = res
})
/* ----------------------------------------------------------------------------------------------------------------------- */
// 方法
let btnClick = ref(false)
const isSearch3 = ref(false)
const isSearch2 = ref(true)
const btnClickFunc = () => {
    btnClick.value = !btnClick.value
    isSearch3.value = !isSearch3.value
    isSearch2.value = !isSearch2.value
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
    if (params.time_deal) {
        let updated_str = ''
        for (let i in params.time_deal) {
            updated_str += ',' + params.time_deal[i]
        }
        params.time_deal = updated_str.substring(1)
    }
    if (params.created_at) {
        let updated_str = ''
        for (let i in params.created_at) {
            updated_str += ',' + params.created_at[i]
        }
        params.created_at = updated_str.substring(1)
    }
    if (params.updated_at) {
        let updated_str = ''
        for (let i in params.updated_at) {
            updated_str += ',' + params.updated_at[i]
        }
        params.updated_at = updated_str.substring(1)
    }
    loading_tab.value = true
    APIgetDeviceList(params).then(res => {
        console.log(res)
        loading_tab.value = false
        data_tab.arr = res
        total.value = res.length
    })
}
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
const getDetailsFunc = val => {
    data_dialog.obj = val
    APIgetDeviceDetails(val.id).then(res => {
        data_details.item = res
        switch_details.value = true
        console.log(data_details.item)
        zoneName.value = data_details.item.zoneinfo
        buildingName.value = data_details.item.buildinginfo
        unitName.value = data_details.item.unitinfo
    })
    let params = {
        page: page.value,
        per_page: per_page.value,
        did: val.id

    }
    APIgetDeviceArchiveList(params).then(res => {
        console.log(res)
        data_archive.arr = res
        switch_details.value = true
    })
    let params1 = {
        page: page.value,
        per_page: per_page.value,
        did: val.id
    }
    APIgetDeviceRepairList(params1).then(res => {
        console.log(res)
        data_repair.arr = res
        switch_details.value = true
    })

}
const detailsFunc = val => {
    getDetailsFunc(val)
}
// 关闭详情对话框
const closeDialog = () => {
    activeName.value = '1'
}
import {
    APIgetDeviceArchiveList
} from '@/api/custom/custom.js'
// 档案信息
const deviceArchive = val => {
    activeName.value = '2'
    getDetailsFunc(val)
}
import {
    APIgetDeviceRepairList

} from '@/api/custom/custom.js'
// 维保记录
const deviceRepair = val => {
    activeName.value = '3'
    getDetailsFunc(val)
}
// 监听分页
watch(page, () => {
    refreshFunc()
}, { immediate: true, deep: true })
// 同意拒绝提交
const dialogExamineCloseFunc = formEl => {
    from_error.msg = {}
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            if (str_title.value == '修改') {
                console.log(from_examine.item)
                APIputDevice(from_examine.item.id, from_examine.item).then(res => {
                    refreshFunc()
                    ElMessage.success('修改成功')
                    switch_examine.value = false
                }).catch(err => {
                    ElMessage.error('修改失败')
                })
            } else {
                APIpostDevice(from_examine.item).then(res => {
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
// 删除
const deleteFunc = val => {
    APIdeleteDevice(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
const chinaName = ref('')
// 添加模板
const addResidentialFunc = () => {
    chinaName.value = '请选择区域'
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        extra: []
    }
    switch_examine.value = true
}
// 修改
const modifyResidentialFunc = val => {
    chinaName.value = '请点击选择区域'
    from_error.msg = {}
    str_title.value = '修改'
    APIgetDeviceDetails(val.id).then(res => {
        from_examine.item = res
        switch_examine.value = true
    })
}
// 删除 服务名称和联系方式
const deleteServiceFunc = index => {
    from_examine.item.extra.splice(index, 1)
}
// 添加 服务名称和联系方式
const addServiceFunc = index => {
    let data = {
        'lab': '',
        'val': ''
    }
    from_examine.item.extra.push(data)
}
/* ----------------------------------------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------------------------------------- */
</script>
<style lang="scss">
    .articletparticletpl {
        .el-cascader {
            width: 100% !important;
            margin-bottom: 10px;
        }
        .serve-box {
            border: 1px solid #eee;
            box-sizing: border-box;
            margin-bottom: 10px;
            padding: 0 10px;
            border-radius: 6px;
            position: relative;
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
</style>
<style lang="scss" scoped>
    .search-tips {
        color: #aaa;
        font-size: 14px;
        margin-bottom: 20px;
    }
    .archive {
        color: #00daff;
        font-weight: bold;
        cursor: pointer;
    }
</style>
