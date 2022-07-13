<template>
    <div class="setupAPP">
        <page-main>
            <el-button class="head-btn" type="primary" @click="addresidentialFunc">添加App版本</el-button>
            <div style="width: 100%;overflow: auto;border: 1px solid #ebeef4; box-sizing: border-box; max-height: 400px; max-height: 500px;">
                <el-table v-loading="loading_tab" :data="data_tab.arr" :head-cell-style="{background:'#fbfbfb',color: '#9999','font-size': '12px'}"  default-expand-all row-key="id" :tree-props="{children: 'children'}" style="width: 100%;min-height: 300px;">
                <el-table-column prop="type" label="app类别" width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ getOptVal(opts_all.obj.sys_is_type,scope.row.type) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="version" label="版本号" width="160">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.version }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="version_name" label="版本名称" width="160">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.version_name}} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="force" label="是否强制更新" width="160">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ getOptVal(opts_all.obj.sys_is_force,scope.row.force) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="url" label="下载地址">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.url}} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态" width="160">
                        <template #default="scope">
                            <el-switch
                                    v-model="scope.row.status"
                                    class="switch"

                                    inline-prompt
                                    style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                                    active-text="开启"
                                    inactive-text="关闭"
                                    :active-value="1"
                                    :inactive-value="0"
                                    @change="switchFunk(scope.row.status)"
                                />
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
                </el-table>
            <!-- 修改添加 -->
            <el-dialog
            v-model="switch_examine"
            :title="str_title"
            width="50%"

        >
            <div>
                <el-form
                    ref="ruleFormRef"
                    :model="addMenuForm.item"
                >
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="APP类别" prop="type"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-select v-model="addMenuForm.item.type" class="head-btn" placeholder="APP类别" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.sys_is_type" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="appid" prop="应用id"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="addMenuForm.item.appid"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="版本号" prop="version"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="addMenuForm.item.version"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="版本名称" prop="version_name"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="addMenuForm.item.version_name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="更新说明" prop="content"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="addMenuForm.item.content"
                                    type="textarea"
                                    rows="4"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="是否强制更新" prop="force"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-select v-model="addMenuForm.item.force" class="head-btn" placeholder="" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.sys_is_force" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="下载地址" prop="url"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="addMenuForm.item.url"
                                    type=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="状态" prop="status" label-width="120px"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                    <el-switch
                                    v-model="addMenuForm.item.status"
                                    class="switch"

                                    inline-prompt
                                    style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                                    active-text="开启"
                                    inactive-text="关闭"
                                    :active-value="1"
                                    :inactive-value="0"
                                    @change="switchFunk(addMenuForm.item.status)"
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
            </div>
        </page-main>
    </div>
</template>
<script setup>
    import {
        APIgetAppVersionList,
        APIputAppVersion,
        APIpostAppVersion,
        APIdeleteAppVersion
    } from '@/api/custom/custom.js'
    import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
    let data_tab = reactive({
        arr: []
    })
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(1)
let loading_tab=ref(false)
let switch_examine=ref(false)
let from_error=ref({})
const str_title = ref('添加')
let statusText=ref('')
let switch_details=ref(false)
// 详情
const data_details = reactive({
    item: ''
})
let addMenuForm=reactive({
    item:{
    "appid":"",
    "version":0,
    "version_name":"",
    "content":"",
    "force":1,
    "type":1,//整数
    "url":"",
    "status":1
    }
})
// let addMenuForm=reactive({
//     item:{
//     china_code:"",
//     name:"",
//     logo:"",
//     content:"",
//     status:1,//整数
//     }
// })
/* ----------------------------------------------------------------------------------------------------------------------- */
// 方法
// 监听类别
watch(page, () => {
    refreshFunc()
})
const statusFunk=(row)=>{
    return statusText.value= row.status === 1 ? '已开启': '已关闭'
}
// 刷新
const refreshFunc = () => {
    page.value = 1
    getTabListFunc()
}
// 获取列表
const params = {
        page: page.value,
        per_page: per_page.value,
        appid: "50010",
        type: 1,
        status: 1
    }
const getTabListFunc = () => {

    loading_tab.value = true
    APIgetAppVersionList(params).then(res => {
        console.log(res)
            loading_tab.value = false
            data_tab.arr = res
            total.value = res.length
    })
}
refreshFunc()
// 同意拒绝提交
const dialogExamineCloseFunc = formEl => {
    // from_error.msg = {}
    // if (!formEl) return
    // formEl.validate(valid => {
    //     if (valid) {
            if (str_title.value == '修改') {
                APIputAppVersion(addMenuForm.item.id, addMenuForm.item).then(res => {
                        refreshFunc()
                        ElMessage.success('修改成功')
                        switch_examine.value = false
                }).catch(err => {
                    ElMessage.success('修改失败')
                })
            } else {
                console.log(addMenuForm.item)
                APIpostAppVersion(addMenuForm.item).then(res => {
                        refreshFunc()
                        ElMessage.success('添加成功')
                        switch_examine.value = false
                }).catch(err => {
                    ElMessage.success('添加失败')
                })
            }
    //     } else {
    //         return false
    //     }
    // })
}
// 添加
const addresidentialFunc=()=>{
    from_error.msg = {}
    str_title.value = '添加'
    addMenuForm.item = {}
    switch_examine.value = true
}
// 修改
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    APIgetAppVersionList(params).then(res => {
        console.log(res)
            addMenuForm.item = res[0]
            switch_examine.value = true
    })
    switch_examine.value = true
}
//删除
const deleteFunc = val => {
        APIdeleteAppVersion(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
// //APP菜单管理
// const MenuItemsFunc=()=>{

// }
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['sys_is_status','sys_is_force','sys_is_type']).then(res => {
    opts_all.obj = res
})
</script>
