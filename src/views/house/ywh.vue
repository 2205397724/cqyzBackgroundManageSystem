<template>
    <div>
        <div class="p-20" style="box-sizing: border-box;min-height: calc(100vh - 50px);">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                    <div class="p-20 bg-color-white" style="box-sizing: border-box;min-height: calc(100vh - 90px);">
                        <div v-if="flow.item">
                            <p class="font-grey size-base">
                                <span class="strong size-lg">业委会名称： {{ flow.item.name }}</span>
                            </p>
                            <p>
                                <el-tag v-if="flow.item.active == 1" type="success" size="small" round>已启用</el-tag>
                                <el-tag v-if="flow.item.active == 0" type="info" size="small" round>已禁用</el-tag>
                            </p>
                        </div>
                        <div style="text-align: center;">
                            <el-button
                                type="primary"
                                @click="addResidentialFunc(data_details.item)"
                            >
                                业委会换届
                            </el-button>
                            <el-popconfirm
                                title="确定要取消当前业委会么?" cancel-button-type="info"
                                @confirm="cancelYwhFunc(data_details.item,0)"
                            >
                                <template #reference>
                                    <el-button
                                        v-if="data_details.item.isbindzone"
                                        type="danger"
                                    >
                                        取消业委会
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                        <el-tabs model-value="first" @tab-click="handleClick">
                            <el-tab-pane label="业委会成员" name="first">
                                <el-button
                                    type="primary" class="m-b-10"
                                    @click="addflowFunc(data_details.item)"
                                >
                                    添加成员
                                </el-button>
                                <el-table
                                    v-loading="tabloading"
                                    :data="flow_data.arr"
                                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                                    class="tab_1"
                                >
                                    <el-table-column label="用户名">
                                        <template #default="scope">
                                            <span>{{ scope.row.username }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="手机号">
                                        <template #default="scope">
                                            <span>{{ scope.row.mobile }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="职位">
                                        <template #default="scope">
                                            <span>{{ getOptVal(opts_all.obj.group_user_flg,scope.row.flg ) }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="职位描述">
                                        <template #default="scope">
                                            {{ scope.row.post }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" width="150">
                                        <template #default="scope">
                                            <el-button
                                                type="primary" size="small"
                                                @click="modifyFlowFunc(scope.row)"
                                            >
                                                修改
                                            </el-button>
                                            <el-popconfirm
                                                title="确定要删除当前项么?" cancel-button-type="info"
                                                @confirm="deleteFunc2(scope.row)"
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
                                <el-pagination
                                    v-model:current-page="page_1"
                                    style="float: right;"
                                    layout="prev,next,jumper,"
                                    :total="50"
                                    :page-size="per_page_1"
                                    background
                                    prev-text="上一页"
                                    next-text="下一页"
                                    hide-on-single-page
                                />
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                    <div class="p-20 bg-color-white" style="box-sizing: border-box;min-height: calc(100vh - 90px);">
                        <el-tabs model-value="first" @tab-click="handleClick">
                            <el-tab-pane label="历届业委会" name="first" style=" cursor: pointer;">
                                <el-table
                                    v-loading="loading_tab"
                                    :data="data_tab.arr"
                                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                                    height="calc(100vh - 240px)"
                                    class="size-sm tab_1"
                                    @row-click="rowClickFunc"
                                >
                                    <el-table-column prop="name" label="业委会名称">
                                        <template #default="scope">
                                            <span>{{ scope.row.name }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="name" label="状态" width="80">
                                        <template #default="scope">
                                            <el-popconfirm
                                                :title="scope.row.active == 1 ? '确定要禁用当前业委会么?' : '确定要启用当前业委会么?'" cancel-button-type="info"
                                                @confirm="activeYwhFunc(scope.row)"
                                            >
                                                <template #reference>
                                                    <div @click.stop="()=>{}">
                                                        <el-button v-if="scope.row.active==1" type="success" size="small">已启用</el-button>
                                                        <el-button v-if="scope.row.active==0" type="info" size="small">已禁用</el-button>
                                                    </div>
                                                </template>
                                            </el-popconfirm>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="操作" width="150">
                                        <template #default="scope">
                                            <div @click.stop="()=>{}">
                                                <!-- <el-button
                                                    v-if="scope.row.active"
                                                    type="success" size="small"
                                                >
                                                    生效
                                                </el-button>

                                                        <el-button
                                                            v-if="!scope.row.isbindzone"
                                                            type="info" size="small"
                                                        >
                                                            失效
                                                        </el-button>
                                                     -->
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
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-pagination
                                    v-model:current-page="page"
                                    class="btnClass"
                                    style="float: right;"
                                    layout="prev,next,jumper,"
                                    :total="50"
                                    :page-size="per_page"
                                    background
                                    prev-text="上一页"
                                    next-text="下一页"
                                    hide-on-single-page
                                />
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 业委会修改添加 -->
        <el-dialog
            v-model="switch_examine"
            :title="str_title"
            width="50%"
        >
            <el-form
                ref="ruleFormRef"
                :model="from_examine.item"
                label-position="right"
            >
                <el-row :gutter="10">
                    <el-col :md="12" :lg="12">
                        <el-form-item
                            label="业委会名称"
                            prop="name"
                            label-width="110px"
                            :error="
                                from_error.msg && from_error.msg.name
                                    ? from_error.msg.name[0]
                                    : ''
                            "
                        >
                            <el-input v-model="from_examine.item.name" placeholder="" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="str_title=='添加'" :gutter="10">
                    <el-col :md="12" :lg="12">
                        <el-form-item
                            label="状态"
                            prop="region_val"
                            label-width="110px"
                            :error="
                                from_error.msg && from_error.msg.name
                                    ? from_error.msg.name[0]
                                    : ''
                            "
                        >
                            <!-- <el-input
                                    v-model="from_examine.item.region_val"
                                    placeholder=""
                                /> -->
                            <el-radio-group v-model="radio" class="ml-4">
                                <el-radio label="1" size="large">启用</el-radio>
                                <el-radio label="2" size="large">禁用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="footer">
                    <el-button @click="switch_examine=false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc(ruleFormRef)">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 修改添加 -->
        <el-dialog
            v-model="switch_examine2"
            :title="str_title2"
            width="50%"
            @closed="dialogClosed"
        >
            <div>
                <el-form ref="ruleFormRef" :model="from_examine2.item" label-width="80px">
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label="用户名" prop="id">
                                <div class="searchUserGroup">
                                    <SearchUser ref="V_1" v-model:name="userName" @checkName="checkUsersNameFunc" />
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label="职位" prop="flg">
                                <el-select
                                    v-model="from_examine2.item.flg"
                                    @change="type_change"
                                >
                                    <el-option
                                        v-for="item in opts_all.obj.group_user_flg"
                                        :key="item.key"
                                        :value="item.key"
                                        :label="item.val"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label="职位描述" prop="post">
                                <el-input v-model="from_examine2.item.post" placeholder="" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div class="footer">
                    <el-button @click="switch_examine2=false">取消</el-button>
                    <el-button type="primary" @click="flowUpdataFunc">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import SearchUser from '@/components/SearchUser/index.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import {
    APIgetGroupList,
    APIgetGroupUserList,
    APIgetGroupDetails,
    APIpostGroup,
    APIdeleteGroup
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
let data_search = reactive({ })
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
    item: {}
})
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(1)
// 添加，修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {}
})
const str_title = ref('添加')
const from_error = reactive({
    msg: {}
})
/* ----------------------------------------------------------------------------------------------------------------------- */
// 方法
// 刷新
const refreshFunc = () => {
    data_search.name = ''
    getTabListFunc()
}

// 业委会成员
const detailsFunc = val => {
    let params = {
        page: page_1.value,
        per_page: per_page_1.value
    }
    APIgetGroupUserList(val.id, params).then(res => {
        console.log(res)
        flow_data.arr = res.data
        let btnNext = document.querySelector('.btn-next')
        console.log(btnNext)
        if (res.data.length < per_page_1.value) {
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
// 监听分页
watch(page, () => {
    getTabListFunc()
})
// watch(page_1, () => {
//     detailsFunc()
// })
// 同意拒绝提交
const dialogExamineCloseFunc = formEl => {
    from_error.msg = {}
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            if (radio.value == '1') {
                from_examine.item.active = 1
            } else {
                from_examine.item.active = 0
            }
            from_examine.item.region_val = route.query.zid
            from_examine.item.region_type = 2
            from_examine.item.type = 7
            from_examine.item.region_cc = route.query.china_code
            for (let key in from_examine.item) {
                if (from_examine.item[key] !== null) {
                    if (from_examine.item[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (from_examine.item[key] !== 0 || from_examine.item[key] !== false)) {
                        delete from_examine.item[key]
                    }
                }
            }
            if (str_title.value == '修改') {
                APIputGroup(from_examine.item.id, from_examine.item).then(res => {
                    if (res.status == 200) {
                        refreshFunc()
                        ElMessage.success('修改成功')
                        switch_examine.value = false
                    }
                }).catch(err => {
                    from_error.msg = err.data
                })
            } else {
                APIpostGroup(from_examine.item).then(res => {
                    if (res.status == 200) {
                        refreshFunc()
                        ElMessage.success('添加成功')
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
const page_1 = ref(1)
const per_page_1 = ref(15)
// 获取列表api请求
const getTabListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value,
        region_type: 2,
        region_val: route.query.zid,
        type: 7
    }
    for (let key in data_search) {
        if (data_search[key] || data_search[key] === 0) {
            if (data_search[key] instanceof Array && data_search[key].length <= 0) {
                continue
            }
            params[key] = data_search[key]
        }
    }
    loading_tab.value = true
    APIgetGroupList(params).then(res => {
        console.log(res)
        loading_tab.value = false
        data_tab.arr = res.data
        if (data_tab.arr.length > 0) {
            rowClickFunc(data_tab.arr[0])
        }
        let btnNext1 = document.querySelector('.btnClass')
        let btnNext2 = btnNext1.children[1]
        console.log(btnNext1.children[1])
        if (res.data.length < per_page.value) {
            btnNext2.classList.add('not_allowed')
            btnNext2.setAttribute('disabled', true)
            btnNext2.setAttribute('aria-disabled', true)
        } else {
            btnNext2.classList.remove('not_allowed')
            btnNext2.removeAttribute('disabled')
            btnNext2.setAttribute('aria-disabled', false)
        }
    })
}
const flag = ref(false)
// 删除
const deleteFunc = val => {
    APIdeleteGroup(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
const radio = ref('1')
// 添加
const addResidentialFunc = () => {
    console.log(route.query)
    radio.value = '1'
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {}
    switch_examine.value = true
}
// 修改
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    APIgetGroupDetails(val.id).then(res => {
        from_examine.item = res.data
        delete from_examine.item.ref
        switch_examine.value = true
    })
}

/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()

/* ----------------------------------------------------------------------------------------------------------------------- */
import {
    APIputGroupUser,
    APIpostGroupUser,
    APIdeleteGroupUser
} from '@/api/custom/custom.js'
var flow_id = ''
const flow_data = reactive({
    arr: []
})
const tabloading = ref(false)
const switch_examine2 = ref(false)
const str_title2 = ref('')
const from_examine2 = reactive({ item: {  } })
const from_error2 = reactive({ msg: {} })
const hide_id = ref(false)
const modifyFlowFunc = val => {
    hide_id.value = true
    str_title2.value = '修改'
    from_examine2.item = { ...val }
    from_error2.msg = {}
    switch_examine2.value = true
    userName.value = val.username
}

const deleteFunc2 = val => {
    APIdeleteGroupUser(flow_id, val.user_id).then(res => {
        detailsFunc(flow.item)
        ElMessage.success('删除成功')
    })
}
// const openStepFunc = val => {
//     flow_id = val.id
//     refreshFunc2()
// }
// const refreshFunc2 = () => {
//     tabloading.value = true
//     APIgetListYwhUser(flow_id).then(res => {
//         flow_data.arr = res.data
//         tabloading.value = false
//     })
// }
const checkUsersNameFunc = val => {
    console.log(val)
    from_examine2.item.user_id = val.id
}
const V_1 = ref(null)
const userName = ref('')
const dialogClosed = () => {
    V_1.value.clearFunc()
    userName.value = ''
}
const addflowFunc = () => {
    hide_id.value = false
    str_title2.value = '添加'
    from_examine2.item = { }
    from_error2.msg = {}
    switch_examine2.value = true
}
const flowUpdataFunc = () => {
    console.log(from_examine2.item)
    from_error2.msg = {}
    // for (let key in from_examine2.item) {
    //     if (from_examine.item2[key] !== null) {
    //         if (from_examine.item2[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (from_examine.item2[key] !== 0 || from_examine.item2[key] !== false)) {
    //             delete from_examine.item2[key]
    //         }
    //     }
    // }
    if (str_title2.value == '修改') {
        APIputGroupUser(flow_id, from_examine2.item.user_id, from_examine2.item).then(res => {
            detailsFunc(flow.item)
            ElMessage.success('修改成功')
            switch_examine2.value = false
        }).catch(err => {
            ElMessage.error('修改失败')
        })
    } else {
        APIpostGroupUser(flow_id, from_examine2.item).then(res => {
            detailsFunc(flow.item)
            ElMessage.success('添加成功')
            switch_examine2.value = false
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    }
}
const flow = reactive({
    item: {}
})
const rowClickFunc = (row, column, event) => {
    detailsFunc(row)
    flow_id = row.id
    flow.item = row
    // openStepFunc(row)
}
const active = ref('')
import { APIputGroup } from '@/api/custom/custom.js'
const activeYwhFunc = val => {
    if (val.active == 1) {
        val.active = 0
    } else {
        val.active = 1
    }
    delete val.ref
    APIputGroup(val.id, val).then(res => {
        refreshFunc()
    })
}
// // 取消激活
// const cancelYwhFunc = (val, v) => {
//     activeYwhFunc(val, v)
// }
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['type_type', 'gender', 'group_user_flg']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
:deep .el-form-item--default .el-form-item__label {
    line-height: 39px;
    margin-right: 17px;
}
</style>
