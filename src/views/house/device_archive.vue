<template>
    <div class="articletparticletpl">
        <page-main>
            <div>
                <el-button class="head-btn" type="primary" :icon="Plus" @click="addResidentialFunc">添加档案</el-button>
            </div>
            <div class="search">
                <el-row :gutter="10">
                    <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">
                                设备：
                            </div>
                            <div class="search_tb">
                                <div class="searchUserGroup">
                                    <DeviceCategory ref="V" @checkName="checkUsersNameFunc" />
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">
                                档案名称：
                            </div>
                            <el-input v-model="data_search.obj.title" class="search_tb" placeholder="档案名称" clearable />
                        </div>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">是否显示：</div>
                            <el-select v-model="data_search.obj.show" class="search_tb" placeholder="是否显示" clearable>
                                <el-option v-for="item, in opts_all.obj.device_show" :key="item.key" :label="item.val" :value="item.key" />
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
                                <el-button class="m-r-10" @click="refreshFunc_1">重置</el-button>
                                <div class="searchDetail">
                                    *搜索到相关结果共{{ total }}条。
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-table
                    v-loading="loading_tab"
                    :data="data_tab.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    class="tab"
                >
                    <el-table-column prop="id" label="档案名称">
                        <template #default="scope">
                            <span>{{ scope.row.title }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="设备">
                        <template #default="scope">
                            <span>{{ getDeviceName(device_list.arr, scope.row.did) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="是否显示" width="100">
                        <template #default="scope">
                            <span>{{ getOptVal(opts_all.obj.device_show,scope.row.show) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="创建时间" width="200">
                        <template #default="scope">
                            <span>{{ scope.row.created_at }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column />
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
            @closed="dialogClosed"
        >
            <div>
                <el-form
                    ref="ruleFormRef"
                    :model="from_examine.item"
                >
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="设备"
                                label-width="70px"
                                :error="from_error.msg&&from_error.msg.did?from_error.msg.did[0]:''"
                            >
                                <div class="wh_100">
                                    <div class="searchUserGroup">
                                        <DeviceCategory ref="V_1" v-model:name="deviceName" @checkName="checkUsersNameFunc_1" />
                                    </div>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="档案名称"
                                label-width="70px"
                                :error="from_error.msg&&from_error.msg.title?from_error.msg.title[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.title"
                                    class="head-btn"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="是否显示"
                                label-width="70px"
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
                        <el-col :xs="24"><div class="details-tit-sm m-b-10">档案内容</div></el-col>
                        <el-col :md="24" :lg="24">
                            <div class="m-b-10">
                                <el-button type="primary" plain @click="addServiceFunc">添加档案内容</el-button>
                            </div>
                            <div>
                                <el-scrollbar :height="from_examine.item.content.length>= 3? '200px': ''">
                                    <div v-for="(item,i) in from_examine.item.content" :key="i" class="serve-box">
                                        <el-row :gutter="10">
                                            <el-col :xs="24" :sm="24">
                                                <el-form-item label-width="70px" label="附件" :error="from_error.msg&&from_error.msg['content.'+i+'.key']?from_error.msg['content.'+i+'.key'][0]:''">
                                                    <el-upload
                                                        action="***"
                                                        :auto-upload="false"
                                                        :file-list="fileListFn(item.key)"
                                                        :on-change="(file,files)=>{
                                                            item.key = file
                                                        }"
                                                        :on-remove="(file,files)=>{
                                                            item.key = file
                                                        }"
                                                    >
                                                        <el-button type="primary">选择附件</el-button>
                                                    </el-upload>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :xs="12" :sm="12">
                                                <el-form-item label-width="70px" label="文件类型" :error="from_error.msg&&from_error.msg['content.'+i+'.type']?from_error.msg['content.'+i+'.type'][0]:''">
                                                    <el-input
                                                        v-model="item.type"
                                                        placeholder=""
                                                    />
                                                </el-form-item>
                                            </el-col>
                                            <el-col :xs="12" :sm="12">
                                                <el-form-item label-width="70px" label="文件名" :error="from_error.msg&&from_error.msg['content.'+i+'.name']?from_error.msg['content.'+i+'.name'][0]:''">
                                                    <el-input
                                                        v-model="item.name"
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
                                </el-scrollbar>
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
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">档案名称</div>
                    <div class="right">{{ data_details.item.title }}</div>
                </div>
                <div class="item">
                    <div class="left">档案id</div>
                    <div class="right">{{ data_details.item.id }}</div>
                </div>
                <div class="item">
                    <div class="left">设备</div>
                    <div class="right">{{ getDeviceName(device_list.arr, data_details.item.did) }}</div>
                </div>
                <div class="item">
                    <div class="left">是否显示</div>
                    <div class="right">{{ getOptVal(opts_all.obj.device_show,data_details.item.show) }}</div>
                </div>
                <div v-if="data_details.item.content&&data_details.item.content.length>0" class="item">
                    <div class="left">附件</div>
                    <div class="right">
                        <div v-for="(item,i) in data_details.item.content" :key="i">
                            <el-link type="success" :href="VITE_APP_FOLDER_SRC+item.key" target="_blank">{{ item.name }}</el-link>
                        </div>
                    </div>
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
    APIgetDeviceArchiveList,
    APIgetDeviceArchiveDetails,
    APIdeleteDeviceArchive,
    APIputDeviceArchive,
    APIpostDeviceArchive
} from '@/api/custom/custom.js'
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
import { Search, Plus } from '@element-plus/icons-vue'

/* ----------------------------------------------------------------------------------------------------------------------- */
const VITE_APP_FOLDER_SRC = import.meta.env.VITE_APP_FOLDER_SRC
import { getFilesKeys } from '@/util/files.js'
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
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(1)
// 添加，修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {
        content: [],
        did: '',
        title: '',
        id: ''
    }
})
const str_title = ref('添加')
const from_error = reactive({
    msg: {}
})

import {
    APIgetTypeList,
    APIgetDeviceList
} from '@/api/custom/custom.js'
const options = reactive({ arr: [] })
APIgetTypeList('announce').then(res => {
    options.arr = res.data
})
/* ----------------------------------------------------------------------------------------------------------------------- */
// 方法
// 搜索
const searchFunc = () => {
    page.value = 1
    switch_search.value = true
    getTabListFunc()
}
const V = ref(null)
// 刷新
const refreshFunc = () => {
    switch_search.value = false
    data_search.obj = {}
    getTabListFunc()
}
const refreshFunc_1 = () => {
    V.value.clearFunc()
    refreshFunc()
}
const checkUsersNameFunc = row => {
    data_search.obj.did = row.id
}
// 详情
const detailsFunc = val => {
    getDeviceList()
    data_dialog.obj = val
    APIgetDeviceArchiveDetails(val.id).then(res => {
        data_details.item = res
        switch_details.value = true
    })
}
// 监听分页
watch(page, () => {
    getTabListFunc()
})
// 同意拒绝提交
const formFnUpload = () => {
    for (let key in from_examine.item) {
        if (from_examine.item[key] == '') {
            delete from_examine.item[key]
        }
    }
    if (str_title.value == '修改') {
        APIputDeviceArchive(from_examine.item.id, from_examine.item).then(res => {
            refreshFunc()
            ElMessage.success('修改成功')
            switch_examine.value = false
        }).catch(err => {
            ElMessage.error('修改失败')
        })
    } else {
        APIpostDeviceArchive(from_examine.item).then(res => {
            refreshFunc()
            ElMessage.success('添加成功')
            switch_examine.value = false
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    }
}
const dialogExamineCloseFunc = () => {
    from_error.msg = {}
    let obj = {}
    for (let i in from_examine.item.content) {
        if (typeof from_examine.item.content[i].key != 'string') {
            obj[i] = from_examine.item.content[i].key
        }
    }
    let files = []
    for (let i in obj) {
        files.push(obj[i].raw)
    }
    if (files.length > 0) {
        getFilesKeys(files, 'folder').then(arr => {
            let o = 0
            for (let i in obj) {
                from_examine.item.content[i].key = arr[o]
                o++
            }
            formFnUpload()
        })
        return false
    }
    formFnUpload()
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
    APIgetDeviceArchiveList(params).then(res => {
        console.log(res)
        loading_tab.value = false
        data_tab.arr = res
        total.value = res.length
    })
    getDeviceList()
}
// 删除
const deleteFunc = val => {
    APIdeleteDeviceArchive(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
const checkUsersNameFunc_1 = row => {
    from_examine.item.did = row.id
}
const V_1 = ref(null)
const dialogClosed = () => {
    V_1.value.clearFunc()
    deviceName.value = ''
}
const device_list = reactive({
    arr: []
})
const getDeviceList = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    loading_tab.value = true
    APIgetDeviceList(params).then(res => {
        loading_tab.value = false
        device_list.arr = res
    })
}
const getDeviceName = (arr, key) => {
    for (let i in arr) {
        if (arr[i].id == key) {
            return arr[i].name
        }
    }
    return ''
}
// 添加模板
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        content: []
    }
    switch_examine.value = true
}
const deviceName = ref('')
// 修改
const modifyResidentialFunc = val => {
    getDeviceList()
    from_error.msg = {}
    str_title.value = '修改'
    APIgetDeviceArchiveDetails(val.id).then(res => {
        from_examine.item = res
        switch_examine.value = true
        deviceName.value = getDeviceName(device_list.arr, from_examine.item.did)
    })
}
// 删除 服务名称和联系方式
const deleteServiceFunc = index => {
    from_examine.item.content.splice(index, 1)
}
// 添加 服务名称和联系方式
const addServiceFunc = index => {
    let data = {
        'name': '',
        'type': '',
        'key': ''
    }
    from_examine.item.content.push(data)
}
const fileListFn = val => {
    if (!val) {
        return []
    }
    if (typeof val == 'string') {
        return [{
            name: val
        }]
    }
    return [val]
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
import DeviceCategory from '@/components/DeviceCategory/index.vue'
const opts_all = reactive({
    obj: {}
})
getOpts(['illegal_user', 'illegal_type', 'device_status', 'device_type', 'device_show']).then(res => {
    opts_all.obj = res
})
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
            padding: 10px;
            margin-bottom: 10px;
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

</style>
