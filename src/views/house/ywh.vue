<template>
    <div>
        <div style="display: flex;padding: 20px;box-sizing: border-box;min-height: calc(100vh - 50px);">
            <div style="width: calc(40% - 10px);margin-right: 10px;padding:20px;background-color: #ffffff;display: flex;justify-content: center;flex-direction: column;overflow-x: none;overflow-y: auto;">
                <div style="text-align: center;width: 80%;margin: 0 auto;margin-bottom: 30px;">
                    <div style="display: inline-block;text-align: left;">
                        <div v-if="data_details.item&&JSON.stringify(data_details.item)!='{}'">
                            <p>名称：{{ data_details.item.name }}</p>
                            <p>届次：第{{ data_details.item.period }}届</p>
                            <p>状态：{{ data_details.item.isbindzone?'有效':'失效' }}</p>
                            <p>创建时间：{{ data_details.item.created_at }}</p>
                            <p>更新时间：{{ data_details.item.updated_at }}</p>
                            <p>描述：{{ data_details.item.desc }}</p>
                        </div>
                        <div style="text-align: center;">
                            <el-button
                                type="primary"
                                @click="addResidentialFunc(data_details.item)"
                            >
                                添加业委会
                            </el-button>
                            <el-button
                                v-if="data_details.item&&JSON.stringify(data_details.item)!='{}'"
                                type="primary"
                                @click="addflowFunc(data_details.item)"
                            >
                                添加成员
                            </el-button>
                            <el-button
                                v-if="data_details.item.isbindzone"
                                type="danger"
                                @click="cancelYwhFunc(data_details.item,0)"
                            >
                                取消当前业委会
                            </el-button>
                        </div>
                    </div>
                </div>
                <el-table
                    v-if="data_details.item&&JSON.stringify(data_details.item)!='{}'"
                    v-loading="tabloading"
                    :data="flow_data.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    style="width: 100%;border: 1px solid #ebeef5;border-radius: 6px;box-sizing: border-box;"
                >
                    <el-table-column label="用户名" width="180">
                        <template #default="scope">
                            <span>{{ scope.row.user.username }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="手机号" width="180">
                        <template #default="scope">
                            <span>{{ scope.row.user.mobile }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="真实姓名" width="180">
                        <template #default="scope">
                            <span>{{ scope.row.user.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="信息描述" width="180">
                        <template #default="scope">
                            <span>{{ scope.row.desc }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="160">
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
                    <el-table-column />
                </el-table>
            </div>
            <div style="width: calc(60% - 10px);margin-left: 10px;background-color: #ffffff">
                <div style="color: #aaa; font-size: 14px; padding: 10px;">
                    *点击列表切换当前业委会内容。
                </div>
                <div style="padding: 0 10px;box-sizing: border-box;">
                    <el-table
                        v-loading="loading_tab"
                        :data="data_tab.arr"
                        :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                        style="width: 100%;border: 1px solid #ebeef5;border-radius: 6px;box-sizing: border-box;"
                        @row-click="rowClickFunc"
                    >
                        <el-table-column prop="name" label="业委会名称" width="180">
                            <template #default="scope">
                                <span>{{ scope.row.name }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="届次" width="180">
                            <template #default="scope">
                                <span>第{{ scope.row.period }}届</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="isbindzone" label="状态" width="90">
                            <template #default="scope">
                                <span>{{ data_details.item.isbindzone?'有效':'失效' }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="created_at" label="创建时间" width="180">
                            <template #default="scope">
                                <span>{{ scope.row.created_at }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="updated_at" label="更新时间" width="180">
                            <template #default="scope">
                                <span>{{ scope.row.updated_at }} </span>
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
                                <el-popconfirm
                                    title="确定要激活当前业委会么?" cancel-button-type="info"
                                    @confirm="activeYwhFunc(scope.row,1)"
                                >
                                    <template #reference>
                                        <el-button
                                            type="success" size="small"
                                            :disabled="data_details.item.isbindzone"
                                        >
                                            激活
                                        </el-button>
                                    </template>
                                </el-popconfirm>
                            </template>
                        </el-table-column>
                        <el-table-column />
                    </el-table>
                </div>
                <el-pagination
                    v-model:current-page="page"
                    layout="total,prev,pager,next,jumper,"
                    :total="total"
                    :page-size="per_page"
                    background
                    hide-on-single-page
                    style="padding-top: 20px;"
                />
            </div>
        </div>
        <!-- 修改添加 -->
        <el-dialog
            v-model="switch_examine"
            :title="str_title"
            width="50%"
        >
            <el-form
                ref="ruleFormRef"
                :model="from_examine.item"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="业委会名称" prop="name"
                            :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                        >
                            <el-input
                                v-model="from_examine.item.name"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="届次" prop="period"
                            :error="from_error.msg&&from_error.msg.period?from_error.msg.period[0]:''"
                        >
                            <el-input
                                v-model="from_examine.item.period"
                                placeholder="填整数类型"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label="描述" prop="desc"
                            :error="from_error.msg&&from_error.msg.desc?from_error.msg.desc[0]:''"
                        >
                            <el-input
                                v-model="from_examine.item.desc"
                                :autosize="{ minRows: 2, maxRows: 10 }"
                                type="textarea"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_examine=false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc(ruleFormRef)">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 成员 -->
        <el-dialog
            v-model="show_dialog_flow"
            title="成员"
            width="70%"
        >
            <el-row :gutter="20">
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                    <el-button class="head-btn" type="primary" @click="addflowFunc">添加业委会成员</el-button>
                </el-col>
            </el-row>
            <el-table
                v-loading="tabloading"
                :data="flow_data.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;"
            >
                <el-table-column label="用户名" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.user.username }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="手机号" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.user.mobile }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="真实姓名" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.user.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="信息描述" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.desc }} </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="160">
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
                <el-table-column />
            </el-table>
        </el-dialog>
        <!-- 步骤 修改添加 -->
        <el-dialog
            v-model="switch_examine2"
            :title="str_title2"
            width="50%"
        >
            <div>
                <el-form
                    :model="from_examine2.obj"
                >
                    <el-row :gutter="10">
                        <el-col v-if="!hide_id" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="用户" prop="uid"
                                :error="from_error2.msg&&from_error2.msg.uid?from_error2.msg.uid[0]:''"
                            >
                                <div style="height: 100%;width: 100%;">
                                    <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;font-size: 14px;">
                                        <SearchUser v-model:str="from_examine2.item.uid" />
                                    </div>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item
                                label="信息描述" prop="desc"
                                :error="from_error2.msg&&from_error2.msg.desc?from_error2.msg.desc[0]:''"
                            >
                                <el-input
                                    v-model="from_examine2.item.desc"
                                    :autosize="{ minRows: 2, maxRows: 10 }"
                                    type="textarea"
                                    placeholder="审核回执内容"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
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
    APIgetListYwh,
    APIgetDetailsYwh,
    APIdeleteYwh,
    APIputYwh,
    APIpostYwh
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
    page.value = 1
    data_search.name = ''
    getTabListFunc()
}

// 详情
const detailsFunc = val => {
    data_dialog.obj = val
    APIgetDetailsYwh(val.id).then(res => {
        if (!res.code) {
            data_details.item = res.data
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
            from_examine.item.zid = route.query.zid
            if (str_title.value == '修改') {
                APIputYwh(from_examine.item.id, from_examine.item).then(res => {
                    if (!res.code) {
                        refreshFunc()
                        ElMessage.success(res.msg)
                        switch_examine.value = false
                    }
                }).catch(err => {
                    from_error.msg = err.data
                })
            } else {
                APIpostYwh(from_examine.item).then(res => {
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
        per_page: per_page.value,
        zid: route.query.zid
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
    APIgetListYwh(params).then(res => {
        if (res.code === 0) {
            loading_tab.value = false
            data_tab.arr = res.data.items
            total.value = res.data.aggregation.total_cnt
            if (data_tab.arr.length > 0) {
                rowClickFunc(data_tab.arr[0])
            }
        }
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteYwh(val.id).then(res => {
        if (res.code === 0) {
            refreshFunc()
            ElMessage.success(res.msg)
        }
    })
}
// 添加
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        property_owners: [],
        house_id: '',
        time_deal: '',
        code_property: '',
        code_room: '',
        should_bind_house: ''
    }
    switch_examine.value = true
}
// 修改
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    APIgetDetailsYwh(val.id).then(res => {
        if (!res.code) {
            from_examine.item = res.data
            switch_examine.value = true
        }
    })
}

/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()

/* ----------------------------------------------------------------------------------------------------------------------- */
import {
    APIgetListYwhUser,
    APIdeleteYwhUser,
    APIputYwhUser,
    APIpostYwhUser
} from '@/api/custom/custom.js'
var flow_id = ''
const flow_data = reactive({
    arr: []
})
const show_dialog_flow = ref(false)
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
}

const deleteFunc2 = val => {
    APIdeleteYwhUser(flow_id, val.uid).then(res => {
        refreshFunc2()
        ElMessage.success(res.msg)
    })
}
const openStepFunc = val => {
    flow_id = val.id
    refreshFunc2()
}
const refreshFunc2 = () => {
    tabloading.value = true
    APIgetListYwhUser(flow_id).then(res => {
        flow_data.arr = res.data
        tabloading.value = false
    })
}
const addflowFunc = () => {
    hide_id.value = false
    str_title2.value = '添加'
    from_examine2.item = { }
    from_error2.msg = {}
    switch_examine2.value = true
}
const flowUpdataFunc = () => {
    from_error2.msg = {}
    if (str_title2.value == '修改') {
        APIputYwhUser(flow_id, from_examine2.item.uid, from_examine2.item).then(res => {
            if (!res.code) {
                refreshFunc2()
                ElMessage.success(res.msg)
                switch_examine2.value = false
            }
        }).catch(err => {
            from_error2.msg = err.data
        })
    } else {
        APIpostYwhUser(flow_id, from_examine2.item).then(res => {
            if (!res.code) {
                refreshFunc2()
                ElMessage.success(res.msg)
                switch_examine2.value = false
            }
        }).catch(err => {
            from_error2.msg = err.data
        })
    }
}

const rowClickFunc = (row, column, event) => {
    detailsFunc(row)
    openStepFunc(row)
}
import { APIputYwhActive } from '@/api/custom/custom.js'
const activeYwhFunc = val => {
    APIputYwhActive(val.id, { isbind: 1 }).then(res => {
        refreshFunc()
    })
}
// 取消激活
const cancelYwhFunc = val => {
    activeYwhFunc(val, 0)
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['type_type']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss">
    .setupgroup {
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

</style>
