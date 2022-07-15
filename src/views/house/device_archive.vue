<template>
    <div class="articletparticletpl">
        <page-main>
            <div>
                <div>
                    <el-row :gutter="10">
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-input v-model="data_search.obj.did" class="head-btn" placeholder="设备ID" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-input v-model="data_search.obj.title" class="head-btn" placeholder="档案名称" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-select v-model="data_search.obj.show" class="head-btn" placeholder="是否显示" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.device_show" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
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
                            <el-button class="head-btn" type="primary" @click="addResidentialFunc">添加</el-button>
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
                        <el-table-column prop="id" label="档案名称" width="120">
                            <template #default="scope">
                                <span>{{ scope.row.title }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="id" label="档案id">
                            <template #default="scope">
                                <span>{{ scope.row.id }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="id" label="设备id">
                            <template #default="scope">
                                <span>{{ scope.row.did }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="id" label="是否显示" width="100">
                            <template #default="scope">
                                <span>{{ getOptVal(opts_all.obj.device_show,scope.row.show) }} </span>
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
                            <el-form-item
                                label="设备ID"
                                label-width="70px"
                                :error="from_error.msg&&from_error.msg.did?from_error.msg.did[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.did"
                                    class="head-btn"
                                />
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
                            <div style="margin-bottom: 10px;">
                                <el-button type="primary" plain @click="addServiceFunc">添加档案内容</el-button>
                            </div>
                            <div v-for="(item,i) in from_examine.item.content" class="serve-box" :key="i">
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
                    <div class="left">档案名称</div>
                    <div class="right">{{ data_details.item.title }}</div>
                </div>
                <div class="item">
                    <div class="left">档案id</div>
                    <div class="right">{{ data_details.item.id}}</div>
                </div>
                <div class="item">
                    <div class="left">设备id</div>
                    <div class="right">{{ data_details.item.did }}</div>
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
        did:"",
        title:"",
        id:""
    }
})
const str_title = ref('添加')
const from_error = reactive({
    msg: {}
})

import {
    APIgetTypeList
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
const formFnUpload = () =>{
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
                ElMessage.success('添加失败')
                switch_examine.value = false
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    }
}
const dialogExamineCloseFunc = () => {
    from_error.msg = {}
    let obj = {}
    for(let i in from_examine.item.content){
        if(typeof from_examine.item.content[i].key != 'string'){
            obj[i] = from_examine.item.content[i].key
        }
    }
    let files = []
    for(let i in obj){
        files.push(obj[i].raw)
    }
    if(files.length>0){
        getFilesKeys(files, 'folder').then(arr => {
            let o = 0
            for(let i in obj){
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
            loading_tab.value = false
            data_tab.arr = res
            total.value = res.data?.length
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteDeviceArchive(val.id).then(res => {
            refreshFunc()
<<<<<<< HEAD
            ElMessage.success(res.msg)
=======
            ElMessage.success('删除成功')
>>>>>>> admin2
    })
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
// 修改
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    APIgetDeviceArchiveDetails(val.id).then(res => {
<<<<<<< HEAD
            console.log(res)
=======
>>>>>>> admin2
            from_examine.item = res
            switch_examine.value = true
    })
}
// 删除 服务名称和联系方式
const deleteServiceFunc = index => {
    from_examine.item.content.splice(index, 1)
}
// 添加 服务名称和联系方式
const addServiceFunc = index => {
    let data = {
        "name":'',
        "type":'',
        "key":''
    }
    from_examine.item.content.push(data)
}
const fileListFn = (val) => {
    if(!val){
        return []
    }
    if(typeof val == 'string') {
        return [{
            name:val,
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
