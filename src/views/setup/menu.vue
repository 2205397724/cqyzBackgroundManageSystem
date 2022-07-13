<template>
    <div class="setupAPP">
        <page-main>
            <el-button class="head-btn" type="primary" @click="addresidentialFunc">添加App菜单</el-button>
            <div style="width: 100%;overflow: auto;border: 1px solid #ebeef4; box-sizing: border-box; max-height: 400px;">
                <el-table v-loading="loading_tab" :data="data_tab.arr" :head-cell-style="{background:'#fbfbfb',color: '#9999','font-size': '12px'}"  default-expand-all row-key="id" :tree-props="{children: 'children'}" style="width: 100%;min-height: 300px;">
                    <el-table-column prop="icon" label="图标" width="80">
                        <template #default="scope">
                            <img :src="scope.row.icon" alt="" style="width: 50%; height: 50%;">
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="菜单名称" width="120">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="appid" label="APPID" width="240">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.appid }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="china_code" label="区域id" width="140">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.china_code}} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="url" label="跳转地址" >
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.url}} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="place" label="菜单位置">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ getOptVal(opts_all.obj.sele_menu,scope.row.place)}} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="跳转方式">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.type}} </span>
                        </template>
                    </el-table-column>
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

                    <el-table-column fixed="right" label="操作">
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
                                label="菜单名称" prop="name" label-width="120px"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="addMenuForm.item.name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col  :md="24" :lg="12">
                            <el-form-item label="服务区域" label-width="120px" prop="china_code" :error="from_error.msg&&from_error.msg.china_code?from_error.msg.china_code[0]:''">
                                        <Cascaders v-model="addMenuForm.item.china_code" />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12" v-show="str_title == '修改'">
                            <el-form-item
                                label="appid" prop="appid" label-width="120px"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="addMenuForm.item.appid"
                                    placeholder=""
                                    disabled
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="菜单位置" prop="place" label-width="120px"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-select v-model="addMenuForm.item.place" class="head-btn" placeholder="" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.sele_menu" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="图标地址" prop="icon" label-width="120px"
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
                                label="跳转方式" prop="type" label-width="120px"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-select v-model="addMenuForm.item.type" class="head-btn" placeholder="" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.sele_type" :key="item.key" :label="item.val" :value="item.val" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="跳转地址" prop="url" label-width="120px"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="addMenuForm.item.url"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="gh_id" prop="ghid" label-width="120px"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="addMenuForm.item.ghid"
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
            </div>
        </page-main>
    </div>
</template>
<script setup>
    import {
        APIgetAppMenuList,
        APIputAppMenu,
        APIpostAppMenu,
        APIdeleteAppMenu
    } from '@/api/custom/custom.js'
    import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
import { useRoute } from 'vue-router'
const route = useRoute()
    let data_tab = reactive({
        arr: []
    })
// 分页
let total = ref(100)
// let per_page = ref(15)
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
    "appid": route.query.appid,
    "china_code":"",
    "name":"",
    "place":"",
    "icon":"",
    "type":"",//整数
    "url":""
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
const getTabListFunc = () => {
    let params = {
        appid: route.query.appid,
        china_code: "500101",
        place: 1
    }
    loading_tab.value = true
    APIgetAppMenuList(params).then(res => {
        console.log(res)
            loading_tab.value = false
            data_tab.arr = res
            total.value = res.length
    })
}
const switchFunk = row => {
        console.log(row)
        addMenuForm.item.status = row

}
refreshFunc()
// 同意拒绝提交
const dialogExamineCloseFunc = formEl => {
    // console.log(formEl)
    // from_error.msg = {}
    // if (!formEl) return
    // formEl.validate(valid => {
    //     if (valid) {
        addMenuForm.item.appid= route.query.appid
            if (str_title.value == '修改') {
                switchFunk()
                APIputAppMenu(addMenuForm.item.id, addMenuForm.item).then(res => {
                    console.log(res)
                        refreshFunc()
                        ElMessage.success('修改成功')
                        switch_examine.value = false
                }).catch(err => {
                    ElMessage.success('修改失败')
                })
            } else {
                switchFunk()
                console.log(addMenuForm.item)
                APIpostAppMenu(addMenuForm.item).then(res => {
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
    APIgetAppMenuList({"appid": route.query.appid ,"place": 1,"china_code":"500101"}).then(res => {
        console.log(res)
            addMenuForm.item = res[0]
            switch_examine.value = true
    })
    switch_examine.value = true
}
//删除
const deleteFunc = val => {
        APIdeleteAppMenu(val.id).then(res => {
        console.log(res)
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
getOpts(['sys_is_status','sele_menu','sele_type']).then(res => {
    opts_all.obj = res
})
</script>
