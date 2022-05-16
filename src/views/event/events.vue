<template>
    <div class="setupgroup">
        <page-main class="tit-box-box">
            <div class="tit-box on">
                <div class="tit">
                    <div>所有议事</div>
                </div>
            </div>
            <div class="tit-box">
                <div class="tit">待审</div>
                <div v-if="total" class="tips">{{ total }}</div>
            </div>
        </page-main>
        <page-main>
            <div>
                <div>
                    <el-row :gutter="10">
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-input v-model="data_search.name" class="head-btn" placeholder="议事主题" clearable />
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
                            <el-button class="head-btn" type="primary" @click="addResidentialFunc">添加流程</el-button>
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
                        <el-table-column prop="name" label="流程名称" width="180">
                            <template #default="scope">
                                <span style="margin-left: 10px;">{{ scope.row.name }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="id" label="流程ID" width="250">
                            <template #default="scope">
                                <span style="margin-left: 10px;">{{ scope.row.id }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="created_at" label="创建时间" width="180">
                            <template #default="scope">
                                <span style="margin-left: 10px;">{{ scope.row.created_at }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="updated_at" label="更新时间" width="180">
                            <template #default="scope">
                                <span style="margin-left: 10px;">{{ scope.row.updated_at }} </span>
                            </template>
                        </el-table-column>

                        <el-table-column />
                        <el-table-column fixed="right" label="操作" width="260">
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
                                <el-button
                                    size="small"
                                    type="info"
                                    @click="openStepFunc(scope.row)"
                                >
                                    步骤
                                </el-button>
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
                                label="流程名称" prop="name"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.name"
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
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">流程ID</div>
                    <div class="right">{{ data_details.item.id }}</div>
                </div>
                <div class="item">
                    <div class="left">流程名称</div>
                    <div class="right">{{ data_details.item.name }}</div>
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
        <!-- 步骤 -->
        <el-dialog
            v-model="show_dialog_flow"
            title="步骤"
            width="70%"
        >
            <el-row :gutter="20" class="bottom-btn-box-2">
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                    <el-button class="head-btn" type="primary" @click="addflowFunc">添加流程</el-button>
                </el-col>
            </el-row>
            <el-table
                v-loading="tabloading"
                :data="flow_data.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;"
            >
                <el-table-column prop="name" label="步骤名称" width="180">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="prev" label="前一个步骤节点" width="180">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.prev }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="step" label="当前步骤节点" width="180">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.step }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="next" label="下一个步骤节点" width="180">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.next }} </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="220">
                    <template #default="scope">
                        <el-button
                            type="primary" size="small"
                            @click="modifyFlowFunc(scope.row)"
                        >
                            修改
                        </el-button>
                        <el-button
                            size="small"
                            @click="detailsFlowFunc(scope.row)"
                        >
                            详情
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
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="步骤名称" prop="name"
                                label-width="110px"
                                :error="from_error2.msg&&from_error2.msg.name?from_error2.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="from_examine2.item.name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="前一个步骤节点" prop="prev"
                                label-width="110px"
                                :error="from_error2.msg&&from_error2.msg.prev?from_error2.msg.prev[0]:''"
                            >
                                <el-input
                                    v-model="from_examine2.item.prev"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="当前步骤节点" prop="step"
                                label-width="110px"
                                :error="from_error2.msg&&from_error2.msg.step?from_error2.msg.step[0]:''"
                            >
                                <el-input
                                    v-model="from_examine2.item.step"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="步骤动作代码" prop="do"
                                label-width="110px"
                                :error="from_error2.msg&&from_error2.msg.do?from_error2.msg.do[0]:''"
                            >
                                <el-select v-model="from_examine2.item.do" class="head-btn" placeholder="步骤动作代码" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.step_type" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="用户组集" prop="for."
                                label-width="110px"
                                :error="from_error2.msg&&from_error2.msg['for.group']?from_error2.msg['for.group'][0]:''"
                            >
                                <div style="height: 100%;width: 100%;">
                                    <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;font-size: 14px;">
                                        <SearchUserGroup v-model:str="from_examine2.item.for.group" :checkbox="true" />
                                    </div>
                                </div>
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
        <!--步骤 详情 -->
        <el-dialog
            v-model="switch_details2"
            title="详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">流程名称</div>
                    <div class="right">{{ data_details2.obj.name }}</div>
                </div>
            </div>
            <div class="details-box">
                <div class="item">
                    <div class="left">流程ID</div>
                    <div class="right">{{ data_details2.obj.id }}</div>
                </div>
            </div>
            <div class="details-box">
                <div class="item">
                    <div class="left">步骤动作代码</div>
                    <div class="right">{{ data_details2.obj.do }}</div>
                </div>
            </div>
            <div v-if="data_details2.obj.for" class="details-box">
                <div class="item">
                    <div class="left">用户组集</div>
                    <div class="right">{{ data_details2.obj.for.group }}</div>
                </div>
            </div>

            <div class="details-box">
                <div class="item">
                    <div class="left">前一个步骤节点</div>
                    <div class="right">{{ data_details2.obj.prev }}</div>
                </div>
            </div>
            <div class="details-box">
                <div class="item">
                    <div class="left">当前步骤节点</div>
                    <div class="right">{{ data_details2.obj.step }}</div>
                </div>
            </div>
            <div class="details-box">
                <div class="item">
                    <div class="left">下一个步骤节点</div>
                    <div class="right">{{ data_details2.obj.next }}</div>
                </div>
            </div>
            <div class="details-box">
                <div class="item">
                    <div class="left">创建时间</div>
                    <div class="right">{{ data_details2.obj.created_at }}</div>
                </div>
            </div>
            <div class="details-box">
                <div class="item">
                    <div class="left">更新实现</div>
                    <div class="right">{{ data_details2.obj.updated_at }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details2 = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import SearchUserGroup from '@/components/SearchUserGroup/index.vue'
import {
    APIgetFlowList,
    APIgetFlowDetails,
    APIdeleteFlow,
    APIputFlow,
    APIpostFlow
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
let switch_search = ref(false)
let data_search = reactive({ })
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
    item: {}
})
const str_title = ref('添加')
const from_error = reactive({
    msg: {}
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
    data_search.name = ''
    getTabListFunc()
}

// 详情
const detailsFunc = val => {
    data_dialog.obj = val
    APIgetFlowDetails(val.id).then(res => {
        if (!res.code) {
            data_details.item = res.data
            switch_details.value = true
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
            if (str_title.value == '修改') {
                APIputFlow(from_examine.item.id, from_examine.item).then(res => {
                    if (!res.code) {
                        refreshFunc()
                        ElMessage.success(res.msg)
                        switch_examine.value = false
                    }
                }).catch(err => {
                    from_error.msg = err.data
                })
            } else {
                APIpostFlow(from_examine.item).then(res => {
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
        per_page: per_page.value
    }
    for (let key in data_search) {
        if (data_search[key] || data_search[key] === 0) {
            if (data_search[key] instanceof Array && data_search[key].length <= 0) {
                continue
            }
            params[key] = data_search[key]
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
    APIgetFlowList(params).then(res => {
        if (res.code === 0) {
            loading_tab.value = false
            data_tab.arr = res.data.items
            total.value = res.data.aggregation.total_cnt
        }
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteFlow(val.id).then(res => {
        if (res.code === 0) {
            refreshFunc()
            ElMessage.success(res.msg)
        }
    })
}
// 添加流程
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
    APIgetFlowDetails(val.id).then(res => {
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
    APIgetStepList,
    APIgetFlowStepDetails,
    APIdeleteFlowStep,
    APIputFlowStep,
    APIpostFlowStep
} from '@/api/custom/custom.js'
var flow_id = ''
const flow_data = reactive({
    arr: []
})
const show_dialog_flow = ref(false)
const tabloading = ref(false)
const switch_examine2 = ref(false)
const str_title2 = ref('')
const from_examine2 = reactive({ item: { for: {} } })
const from_error2 = reactive({ msg: {} })

const modifyFlowFunc = val => {
    APIgetFlowStepDetails(flow_id, val.id).then(res => {
        str_title2.value = '修改步骤'
        from_examine2.item = { ...res.data }
        from_examine2.item.for.group = from_examine2.item.for.group
        from_error2.msg = {}
        switch_examine2.value = true
    })
}
const data_details2 = reactive({
    obj: {}
})
const switch_details2 = ref(false)
const detailsFlowFunc = val => {
    APIgetFlowStepDetails(flow_id, val.id).then(res => {
        data_details2.obj = { ...res.data }
        switch_details2.value = true
    })
}

const deleteFunc2 = val => {
    APIdeleteFlowStep(flow_id, val.id).then(res => {
        refreshFunc2()
        ElMessage.success(res.msg)
    })
}
const openStepFunc = val => {
    flow_id = val.id
    show_dialog_flow.value = true
    refreshFunc2()
}
const refreshFunc2 = () => {
    tabloading.value = true
    APIgetStepList(flow_id).then(res => {
        flow_data.arr = res.data
        tabloading.value = false
    })
}
const addflowFunc = () => {
    str_title2.value = '添加步骤'
    from_examine2.item = { for: { group: [] } }
    from_error2.msg = {}
    switch_examine2.value = true
}
const flowUpdataFunc = () => {
    from_error2.msg = {}
    if (str_title2.value == '修改步骤') {
        APIputFlowStep(flow_id, from_examine2.item.id, from_examine2.item).then(res => {
            if (!res.code) {
                refreshFunc2()
                ElMessage.success(res.msg)
                switch_examine2.value = false
            }
        }).catch(err => {
            from_error2.msg = err.data
        })
    } else {
        APIpostFlowStep(flow_id, from_examine2.item).then(res => {
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
/* ----------------------------------------------------------------------------------------------------------------------- */
// // 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['step_type']).then(res => {
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
    .setupgroup {

    }
    .search-tips {
        color: #aaa;
        font-size: 14px;
        margin-bottom: 20px;
    }
    .tit-box-box {
        display: flex;
        padding: 0;
        .tit-box {
            height: 60px;
            box-sizing: border-box;
            margin-right: 30px;
            padding: 0 20px;
            font-size: 13px;
            color: #8c8c8c;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            position: relative;
            .tips {
                position: absolute;
                right: 0;
                top: 8px;
                box-sizing: border-box;
                padding: 0 8px;
                border-radius: 14px;
                font-size: 12px;
                color: #fff;
                background-color: #e55055;
            }
        }
        .tit-box.on {
            border-bottom: 2px solid #409eff;
        }
        .tit-box:last-child {
            margin-right: 0;
        }
    }
</style>
