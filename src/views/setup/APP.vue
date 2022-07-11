<template>
    <div class="setupAPP">
        <page-main>
            <el-button class="head-btn" type="primary" @click="addresidentialFunc">添加App</el-button>
            <div style="width: 100%;overflow: auto;border: 1px solid #ebeef4; box-sizing: border-box;">
                <el-table v-loading="loading_tab" :data="data_tab.arr" :head-cell-style="{background:'#fbfbfb',color: '#9999','font-size': '12px'}"  default-expand-all row-key="id" :tree-props="{children: 'children'}" style="width: 100%;min-height: 300px;">
                <el-table-column prop="name" label="APP名称" width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="level" label="ID" width="140">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.appid }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="url" label="跳转地址" width="140">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.url}} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="china_code" label="区域id" width="140">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.china_code}} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="place" label="菜单位置" width="140">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.place}} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="icon" label="图标地址" width="140">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.icon}} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="跳转方式" width="140">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.type}} </span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="APP相关" width="200">
                        <template #default="scope">
                            <el-button
                                 size="large"
                                @click="modifyResidentialFunc(scope.row)"
                            >
                                APP菜单管理
                            </el-button>
                            <el-button
                                size="large"
                                @click="addResidentialFunc(scope.row)"
                            >
                                APP版本管理
                                </el-button>
                        </template>
                    </el-table-column> -->
                    <!-- <el-table-column prop="id" label="APP 相关" width="250">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ addMenuForm. }} </span>
                        </template>
                    </el-table-column> -->
                    <!-- <el-table-column prop="kind" label="状态
                    " width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ getOptVal(opts_all.obj.type_type,scope.row.kind) }} </span>
                        </template>
                    </el-table-column> -->

                    <el-table-column fixed="right" label="操作" width="200">
                        <template #default="scope">
                            <el-button
                                type="primary" size="small"
                                @click="modifyResidentialFunc(scope.row)"
                            >
                                修改
                            </el-button>
                            <el-button
                                type="primary" size="small"
                                @click="addResidentialFunc(scope.row)"
                            >
                                添加
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
                                label="应用id" prop="appid"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="addMenuForm.item.appid"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col  :md="24" :lg="12">
                            <el-form-item
                                label="区域ID" prop="china_code"
                                :error="from_error.msg&&from_error.msg.pid?from_error.msg.pid[0]:''"
                            >
                                <el-input
                                    v-model="addMenuForm.item.china_code"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="菜单名称" prop="name"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="addMenuForm.item.name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="菜单位置" prop="place"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="addMenuForm.item.place"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="图片地址" prop="icon"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="addMenuForm.item.icon"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="跳转方式" prop="type"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="addMenuForm.item.type"
                                    type="number"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="跳转地址" prop="url"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="addMenuForm.item.url"
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
                    <el-button type="primary" @click="submit_addMenuForm">确定</el-button>
                </div>
            </template>
        </el-dialog>
            </div>
        </page-main>
    </div>
</template>
<script setup>
    import {
        APIgetAPPList,
    //     APIdeleteAPP,
        APIputAPP,
        APIpostAPP
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
let addMenuForm=reactive({
    item:{
    appid:"",
    china_code:"",
    name:"",
    place:"",
    icon:"",
    type:-1,//整数
    url:""
    }
})
/* ----------------------------------------------------------------------------------------------------------------------- */
// 方法
// 监听类别
watch(page, () => {
    refreshFunc()
})
// 刷新
const refreshFunc = () => {
    page.value = 1
    getTabListFunc()
}
// 获取列表-
const getTabListFunc = () => {
    let params = {
        appid: "62cb90667d7cf91d2b4624c3",
        china_code: "500101",
        place: 1
    }
    loading_tab.value = true
    APIgetAPPList(params).then(res => {
        console.log(res)
            loading_tab.value = false
            data_tab.arr = res
            total.value = res.length
    })
}
refreshFunc()
// 添加
const addresidentialFunc=()=>{
    from_error.msg = {}
    str_title.value = '添加'
    addMenuForm.item = {}
    switch_examine.value = true
}
const submit_addMenuForm=()=>{
    console.log(addMenuForm)
    APIpostAPP(addMenuForm.item).then(res=>{
        console.log(res)
    })
}
// 修改
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    APIputAPP(val.id,data_tab.arr).then(res => {
        console.log(res)
        if (res.status == 200) {
            addMenuForm.item = res.data
            switch_examine.value = true
        }
    })
    switch_examine.value = true
}
</script>
