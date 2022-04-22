<template>
    <div>
        <div class="p-20" style="box-sizing: border-box;min-height: calc(100vh - 50px);">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                    <div class="p-20 bg-color-white" style="box-sizing: border-box;min-height: calc(100vh - 90px);">
                        <div v-if="data_details.item&&JSON.stringify(data_details.item)!='{}'">
                            <p>
                                <span class="strong size-lg">{{ data_details.item.name }}</span>
                                <el-tag v-if="data_details.item.isbindzone" type="success" effect="dark" round>有效</el-tag><el-tag v-if="!data_details.item.isbindzone" type="danger" effect="dark" round>失效</el-tag>
                            </p>
                            <p class="font-grey size-base">届次：第{{ data_details.item.period }}届</p>
                            <p class="font-grey size-base">创建时间：{{ data_details.item.created_at }}</p>
                            <p class="font-grey size-base">更新时间：{{ data_details.item.updated_at }}</p>
                            <p class="font-grey size-base">描述：{{ data_details.item.desc }}</p>
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
                                    v-if="data_details.item&&JSON.stringify(data_details.item)!='{}'"
                                    type="primary"
                                    @click="addflowFunc(data_details.item)"
                                >
                                    添加成员
                                </el-button>
                                <el-table
                                    v-loading="tabloading"
                                    :data="flow_data.arr"
                                    class="size-sm"
                                >
                                    <el-table-column label="真实姓名">
                                        <template #default="scope">
                                            <span>{{ scope.row.user.name }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="手机号" width="120">
                                        <template #default="scope">
                                            <span>{{ scope.row.user.mobile }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="注册名">
                                        <template #default="scope">
                                            <span>{{ scope.row.user.username }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="职务" width="100">
                                        <template #default="scope">
                                            <span>无 </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作">
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
                                    @row-click="rowClickFunc"
                                >
                                    <el-table-column prop="name" label="业委会名称">
                                        <template #default="scope">
                                            <span>{{ scope.row.name }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="name" label="届次" width="80">
                                        <template #default="scope">
                                            <span>第{{ scope.row.period }}届</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="操作">
                                        <template #default="scope">
                                            <div @click.stop="()=>{}">
                                                <el-button
                                                    v-if="scope.row.isbindzone"
                                                    type="success" size="small"
                                                >
                                                    生效
                                                </el-button>
                                                <el-popconfirm
                                                    title="确定要激活当前业委会么?" cancel-button-type="info"
                                                    @confirm="activeYwhFunc(scope.row,1)"
                                                >
                                                    <template #reference>
                                                        <el-button
                                                            v-if="!scope.row.isbindzone"
                                                            type="info" size="small"
                                                        >
                                                            失效
                                                        </el-button>
                                                    </template>
                                                </el-popconfirm>
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
                                    layout="total,prev,pager,next,jumper,"
                                    :total="total"
                                    :page-size="per_page"
                                    background
                                    hide-on-single-page
                                    style="padding-top: 20px;"
                                />
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
            </el-row>
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
                            label="业委会名称" prop="name" label-width="120px"
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
                            label="届次" prop="period" label-width="120px"
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
                            label="描述" prop="desc" label-width="120px"
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
                                label="选择用户" prop="uid" label-width="100px"
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
                                label="工作描述" prop="desc" label-width="100px"
                                :error="from_error2.msg&&from_error2.msg.desc?from_error2.msg.desc[0]:''"
                            >
                                <el-input
                                    v-model="from_examine2.item.desc"
                                    :autosize="{ minRows: 2, maxRows: 10 }"
                                    type="textarea"
                                    placeholder="工作职责描述"
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
const activeYwhFunc = (val, v) => {
    APIputYwhActive(val.id, { isbind: v }).then(res => {
        refreshFunc()
    })
}
// 取消激活
const cancelYwhFunc = (val, v) => {
    activeYwhFunc(val, v)
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
<style lang="scss" scoped>

</style>
