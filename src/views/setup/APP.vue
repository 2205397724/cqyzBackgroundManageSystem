<template>
    <div class="setupAPP">
        <page-main>
            <el-button class="m-b-20" type="primary" size="large" :icon="Plus" @click="addresidentialFunc">添加App</el-button>
            <div>
                <el-table
                    v-loading="loading_tab" :data="data_tab.arr" :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    row-key="id"
                    :tree-props="{ children: 'children' }"
                    class="tab_1"
                >
                    <el-table-column prop="logo" label="图标" width="100">
                        <template #default="scope">
                            <el-image :src="VITE_APP_FOLDER_SRC+scope.row.logo" alt="" style="width: 50px; height: 50px;" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="APP名称">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="china_code" label="区域代码">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.china_code }} </span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="id" label="appid" width="260">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.id }} </span>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="status" label="状态">
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
                                @change="(val) => switchRecordFun(val, scope.row)"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="APP相关" width="300">
                        <template #default="scope">
                            <el-link :underline="false" type="primary" style="padding-right: 10px;">
                                <router-link class="el-button" style="text-decoration: inherit; color: inherit;padding: 0 10px;" :to="{name: 'SetupAppMenu',query:{ appid: scope.row.id }}">APP菜单管理</router-link>
                            </el-link>
                            <el-link :underline="false" type="primary">
                                <router-link class="el-button" style="text-decoration: inherit; color: inherit;padding: 0 10px;" :to="{name: 'SetupAppVersion',query:{ id: scope.row.id }}">APP版本管理</router-link>
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
                                @click="addResidentialFunc(scope.row)"
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
                                        label="APP名称" prop="name" label-width="80px"
                                        :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                                    >
                                        <el-input
                                            v-model="addMenuForm.item.name"
                                            placeholder=""
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col :md="24" :lg="12">
                                    <!-- <el-form-item
                                label="服务区域" prop="china_code"
                                :error="from_error.msg&&from_error.msg.pid?from_error.msg.pid[0]:''"
                            >
                                <el-input
                                    v-model="addMenuForm.item.china_code"
                                    placeholder=""
                                />
                            </el-form-item> -->
                                    <el-form-item label="服务区域" label-width="80px" prop="china_code" :error="from_error.msg&&from_error.msg.china_code?from_error.msg.china_code[0]:''">
                                        <Cascaders v-model="addMenuForm.item.china_code" />
                                    </el-form-item>
                                </el-col>
                                <el-col v-show="str_title == '修改'" :md="24" :lg="12">
                                    <el-form-item
                                        label="appid" prop="id" label-width="80px"
                                        :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                                    >
                                        <el-input
                                            v-model="addMenuForm.item.id"
                                            placeholder=""
                                            disabled
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col :md="24" :lg="24">
                                    <el-form-item
                                        label="图标地址" prop="logo" label-width="80px"
                                        :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                                    >
                                        <el-upload
                                            action="***"
                                            :auto-upload="false"
                                            :file-list="fileListFn(addMenuForm.item.logo)"
                                            :on-change="(file,files)=>{
                                                addMenuForm.item.logo = file
                                            }"
                                            :on-remove="(file,files)=>{
                                                addMenuForm.item.logo = file
                                            }"
                                        >
                                            <el-button type="primary" class="m-b-10">选择</el-button>
                                        </el-upload>
                                        <el-input
                                            v-model="logoName"
                                            placeholder=""
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col :md="24" :lg="24">
                                    <el-form-item
                                        label="状态" prop="status" label-width="80px"
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
                                <el-col :md="24" :lg="24">
                                    <el-form-item
                                        label="内容" prop="content" label-width="80px"
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
                    destroy-on-close
                >
                    <div class="details-box">
                        <div class="item">
                            <div class="left">APP名称</div>
                            <div class="right">{{ data_details.item.name }} </div>
                        </div>
                        <div class="item">
                            <div class="left">区域代码</div>
                            <div class="right">{{ data_details.item.china_code }} </div>
                        </div>
                        <!-- <div class="item">
                            <div class="left">图标地址</div>
                            <div class="right">{{ data_details.item.logo }} </div>
                        </div> -->
                        <div class="item">
                            <div class="left">内容</div>
                            <div class="right">{{ data_details.item.content }} </div>
                        </div>
                        <div class="item">
                            <div class="left">APPID</div>
                            <div class="right">{{ data_details.item.id }} </div>
                        </div>
                        <div class="item">
                            <div class="left">创建时间</div>
                            <div class="right">{{ data_details.item.created_at }}</div>
                        </div>
                        <div class="item">
                            <div class="left">修改时间</div>
                            <div class="right">{{ data_details.item.updated_at }}</div>
                        </div>
                        <!-- <div class="item">
                    <div class="left">状态</div>
                        <el-switch
                                    v-model="data_details.item.status"
                                    class="right"
                                    inline-prompt
                                    style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                                    active-text="启用"
                                    inactive-text="禁用"
                                    :active-value="1"
                                    :inactive-value="0"
                                    ></el-switch>
                </div> -->
                    </div>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="switch_details = false">取消</el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
        </page-main>
    </div>
</template>
<script setup>
import {
    APIgetAPPList,
    APIdeleteAPP,
    APIgetAPPListDetails,
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
import {  Plus } from '@element-plus/icons-vue'
let data_tab = reactive({
    arr: []
})
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(Number(sessionStorage.getItem('currentPage')) || 1)
let loading_tab = ref(false)
let switch_examine = ref(false)
let from_error = ref({})
const str_title = ref('添加')
let statusText = ref('')
let switch_details = ref(false)
// 详情
const data_details = reactive({
    item: ''
})
// let addMenuForm=reactive({
//     item:{
//     appid:"",
//     china_code:"",
//     name:"",
//     place:"",
//     icon:"",
//     type:-1,//整数
//     url:""
//     }
// })
let addMenuForm = reactive({
    item: {
        china_code: '',
        name: '',
        logo: '',
        content: '',
        status: 1 // 整数
    }
})
/* ----------------------------------------------------------------------------------------------------------------------- */
// 方法
// 监听类别
watch(page, () => {
    sessionStorage.setItem('currentPage', page.value)
    refreshFunc()
})
import { onBeforeRouteLeave } from 'vue-router'
onBeforeRouteLeave((to, from) => {
    console.log(to)
    if (to.meta.title == 'APP菜单管理' || to.meta.title == 'APP版本管理') {
        return true
    } else {
        sessionStorage.removeItem('currentPage')
    }
})
const statusFunk = row => {
    return statusText.value = row.status === 1 ? '已开启' : '已关闭'
}
// 刷新
const refreshFunc = () => {
    getTabListFunc()
}
// 获取列表-
const getTabListFunc = () => {
    let params = {
        appid: '62cb90667d7cf91d2b4624c3',
        china_code: '500101',
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
const switchFunk = row => {
    console.log(row)

}
// switch开关
const switchRecordFun = (status, val) => {
    let params = {}
    for (let key in val) {
        if (val[key] !== null) {
            console.log(key)
            params[key] = val[key]
        }
    }
    params.status = status
    APIputAPP(val.id, params).then()
}
refreshFunc()
// 添加
const addresidentialFunc = () => {
    from_error.value.msg = {}
    str_title.value = '添加'
    addMenuForm.item = {
        logo: ''
    }
    switch_examine.value = true
}
import { getFilesKeys } from '@/util/files.js'
// 同意拒绝提交
const dialogExamineCloseFunc = ()  => {
    let obj = {}
    // for (let i in addArchive.item.content) {
    if (typeof addMenuForm.item.logo != 'string') {
        obj = addMenuForm.item.logo
    }
    console.log(addMenuForm.item.logo)
    console.log(obj)
    let files = []
    // for (let i in obj) {
    files.push(obj.raw)
    // }
    console.log(files)
    for (let key in addMenuForm.item) {
        if (addMenuForm.item[key] !== null) {
            if (addMenuForm.item[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (addMenuForm.item[key] !== 0 || addMenuForm.item[key] !== false)) {
                delete addMenuForm.item[key]
            }
        }
    }
    if (files.length > 0) {
        getFilesKeys(files, 'APP').then(arr => {
            // let o = 0
            // for (let i in obj) {
            //     addMenuForm.item.logo = arr[o]
            //     o++
            // }
            console.log(arr)
            addMenuForm.item.logo = arr[0]

            if (str_title.value == '修改') {
                switchFunk(addMenuForm.item.status)
                APIputAPP(addMenuForm.item.id, addMenuForm.item).then(res => {
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
                APIpostAPP(addMenuForm.item).then(res => {
                    // console.log(from_examine.item)
                    refreshFunc()
                    ElMessage.success('添加成功')
                    switch_examine.value = false
                }).catch(err => {
                    ElMessage.success('添加失败')
                })
            }
        })
        return false
    }
    if (str_title.value == '修改') {
        switchFunk(addMenuForm.item.status)
        APIputAPP(addMenuForm.item.id, addMenuForm.item).then(res => {
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
        APIpostAPP(addMenuForm.item).then(res => {
            // console.log(from_examine.item)
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
const VITE_APP_FOLDER_SRC = ref(import.meta.env.VITE_APP_FOLDER_SRC)
// 修改
const modifyResidentialFunc = val => {
    from_error.value.msg = {}
    str_title.value = '修改'
    APIgetAPPListDetails(val.id).then(res => {
        addMenuForm.item = res

        console.log(logoName.value)
        switch_examine.value = true
    })
    switch_examine.value = true
}
const logoName = ref('')
const fileListFn = val => {
    console.log(val)
    if (str_title.value == '修改' && typeof val == 'string') {
        logoName.value = VITE_APP_FOLDER_SRC.value + val
    } else {
        logoName.value = val.name
    }
    return []
    // }
    // if (typeof val == 'string') {
    //     return [{
    //         name: val
    //     }]
    // }
    // return [val]
}
// 详情
const addResidentialFunc = val => {
    switch_details.value = true
    APIgetAPPListDetails(val.id).then(res => {
        console.log(res)
        data_details.item = res
        switch_details.value = true
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteAPP(val.id).then(res => {
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
getOpts(['sys_is_status']).then(res => {
    opts_all.obj = res
})
</script>
