<template>
    <div class="setupgroup">
        <page-main class="tit-box-box">
            <div class="tit-box " :class="{'on':tab_index==0}" @click="tab_index=0">
                <div class="tit">流程管理</div>
                <!-- <div v-if="tab_tips" class="tips">{{ tab_tips }}</div> -->
            </div>
            <div class="tit-box" :class="{'on':tab_index==1}" @click="tab_index=1;flowRefreshFunc()">
                <div class="tit">制定流程</div>
                <!-- <div v-if="tab_tips" class="tips">{{ tab_tips }}</div> -->
            </div>
        </page-main>
        <page-main>
            <div v-if="tab_index==0">
                123
            </div>
            <!-- ************************************************************************************************************** -->
            <div v-if="tab_index==1">
                <div>
                    <el-input v-model="flow.search.name" class="input-b-r" placeholder="流程名称" clearable />
                    <el-button class="btn-b-r" type="primary" @click="()=>{flow.page=1;flow.switch_search=true;getFuncFlowList();}">搜索</el-button>
                </div>
                <div v-show="flow.switch_search" class="search-tips">
                    <el-button style="margin-right: 10px;" @click="()=>{flowRefreshFunc();}">重置</el-button>
                    *搜索到相关结果共{{ flow.total }}条。
                </div>
                <div>
                    <el-button class="head-btn" type="primary" @click="()=>{flow.title='添加';flow.form={};flow.error={};flow.switch_pop=true;}">添加流程</el-button>
                </div>
                <el-table
                    :data="flow.list"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    style="width: 100%;min-height: 300px;overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
                >
                    <el-table-column label="流程名称" width="180">
                        <template #default="scope">
                            <span>{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="终端类型" width="180">
                        <template #default="scope">
                            <span>{{ getOptVal(opts_all.obj.terminal_num,scope.row.eqtype) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" width="180">
                        <template #default="scope">
                            <span>{{ scope.row.created_at }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="更新时间" width="180">
                        <template #default="scope">
                            <span>{{ scope.row.updated_at }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="260">
                        <template #default="scope">
                            <el-button
                                type="primary" size="small"
                                @click="()=>{flow.title='修改';flow.form={...scope.row};flow.error={};flow.switch_pop=true;}"
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
                                title="确定要删除当前项么?"
                                cancel-button-type="info"
                                @confirm="deleteFlowFunc(scope.row)"
                            >
                                <template #reference>
                                    <el-button
                                        type="danger"
                                        size="small"
                                    >
                                        删除
                                    </el-button>
                                </template>
                            </el-popconfirm>
                            <el-button
                                size="small"
                                @click="()=>{step.active_flow=scope.row;step.switch_list = true;stepRefreshFunc();}"
                            >
                                步骤
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column />
                </el-table>
                <el-pagination
                    v-model:current-page="flow.page"
                    style="padding-top: 20px;"
                    layout="total,prev,pager,next,jumper,"
                    :total="flow.total"
                    :page-size="flow.per_page"
                    background
                    hide-on-single-page
                />
            </div>
        </page-main>
        <!-- 修改添加 -->
        <el-dialog
            v-model="flow.switch_pop"
            :title="flow.title"
            width="50%"
        >
            <el-form
                ref="ruleFormRef"
                :model="flow.form"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="流程名称"
                            :error="flow.error&&flow.error.name?flow.error.name[0]:''"
                        >
                            <el-input
                                v-model="flow.form.name"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="终端类型"
                            :error="flow.error&&flow.error.eqtype?flow.error.eqtype[0]:''"
                        >
                            <el-select v-model="flow.form.eqtype" class="head-btn" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.terminal_num" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="分类"
                            :error="flow.error&&flow.error.cid?flow.error.cid[0]:''"
                        >
                            <CascaderType v-model="flow.form.cid" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="启用状态"
                            :error="flow.error&&flow.error.active?flow.error.active[0]:''"
                        >
                            <el-select v-model="flow.form.active" class="head-btn" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.flow_active" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="flow.switch_pop=false">取消</el-button>
                    <el-button type="primary" @click="addAndModifyFlowFunc">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog
            v-model="flow.switch_details"
            title="详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">流程名称</div>
                    <div class="right">{{ flow.details.name }}</div>
                </div>
                <div class="item">
                    <div class="left">终端类型</div>
                    <div class="right">{{ getOptVal(opts_all.obj.terminal_num,flow.details.eqtype) }}</div>
                </div>
                <div class="item">
                    <div class="left">分类</div>
                    <div class="right">
                        <CascaderType v-model="flow.details.cid" :text="true" />
                    </div>
                </div>
                <div class="item">
                    <div class="left">启用状态</div>
                    <div class="right">{{ getOptVal(opts_all.obj.flow_active,flow.details.active) }}</div>
                </div>
                <div class="item">
                    <div class="left">创建时间</div>
                    <div class="right">{{ flow.details.created_at }}</div>
                </div>
                <div class="item">
                    <div class="left">更新时间</div>
                    <div class="right">{{ flow.details.updated_at }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="flow.switch_details = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 步骤 -->
        <el-dialog
            v-model="step.switch_list"
            title="步骤"
            width="70%"
        >
            <div>
                <el-button class="head-btn" type="primary" @click="()=>{step.title='添加';step.form={};step.error={};step.switch_pop=true;}">添加步骤</el-button>
            </div>
            <el-table
                :data="step.list"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
            >
                <el-table-column label="步骤名称" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="前一个节点" width="120">
                    <template #default="scope">
                        <span>{{ scope.row.prev }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="当前节点" width="120">
                    <template #default="scope">
                        <span>{{ scope.row.step }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="后一个节点" width="120">
                    <template #default="scope">
                        <span>{{ scope.row.next }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作用户级" width="160">
                    <template #default="scope">
                        <span>{{ getOptArr(opts_all.obj.article_lv,scope.row.forlv) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="内置议题类型" width="120">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.step_yt_type,scope.row.topictype) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="返回步骤操作" width="120">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.step_back,scope.row.canback) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.created_at }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="更新时间" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.updated_at }} </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="210">
                    <template #default="scope">
                        <el-button
                            type="primary" size="small"
                            @click="()=>{step.title='修改';step.form={...scope.row};step.error={};step.switch_pop=true;}"
                        >
                            修改
                        </el-button>
                        <el-button
                            size="small"
                            @click="getFuncStepDetails(scope.row)"
                        >
                            详情
                        </el-button>
                        <el-popconfirm
                            title="确定要删除当前项么?"
                            cancel-button-type="info"
                            @confirm="deleteStepFunc(scope.row)"
                        >
                            <template #reference>
                                <el-button
                                    type="danger"
                                    size="small"
                                >
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
                <el-table-column />
            </el-table>
        </el-dialog>
        <!-- 修改添加 -->
        <el-dialog
            v-model="step.switch_pop"
            :title="step.title"
            width="50%"
        >
            <el-form
                ref="ruleFormRef"
                :model="step.form"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="步骤名称"
                            :error="step.error&&step.error.name?step.error.name[0]:''"
                        >
                            <el-input
                                v-model="step.form.name"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="前一个节点"
                            :error="step.error&&step.error.prev?step.error.prev[0]:''"
                        >
                            <el-select v-model="step.form.prev" class="head-btn" clearable>
                                <el-option label="无前一个节点" :value="0" />
                                <el-option v-for="(item,i) in step.list" :key="item.id" :label="item.name" :value="item.step" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="当前节点"
                            :error="step.error&&step.error.step?step.error.step[0]:''"
                        >
                            <el-input
                                v-model="step.form.step"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="后一个节点"
                            :error="step.error&&step.error.next?step.error.next[0]:''"
                        >
                            <el-select v-model="step.form.next" class="head-btn" clearable>
                                <el-option v-for="(item,i) in step.list" :key="item.id" :label="item.name" :value="item.step" />
                                <el-option label="无后一个节点" :value="0" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="操作用户级"
                            :error="step.error&&step.error.forlv?step.error.forlv[0]:''"
                        >
                            <el-select v-model="step.form.forlv" multiple class="head-btn" placeholder="" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.article_lv" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="内置议题类型"
                            :error="step.error&&step.error.topictype?step.error.topictype[0]:''"
                        >
                            <el-select v-model="step.form.topictype" class="head-btn" placeholder="" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.step_yt_type" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="返回步骤操作"
                            :error="step.error&&step.error.canback?step.error.canback[0]:''"
                        >
                            <el-select v-model="step.form.canback" class="head-btn" placeholder="" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.step_back" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="step.switch_pop=false">取消</el-button>
                    <el-button type="primary" @click="stepClickTrue">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog
            v-model="step.switch_details"
            title="详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">步骤名称</div>
                    <div class="right">{{ step.details.name }}</div>
                </div>
                <div class="item">
                    <div class="left">前一个节点</div>
                    <div class="right">{{ getListText(step.list,step.details.prev) }}</div>
                </div>
                <div class="item">
                    <div class="left">当前节点</div>
                    <div class="right">{{ step.details.step }}</div>
                </div>
                <div class="item">
                    <div class="left">后一个节点</div>
                    <div class="right">{{ getListText(step.list,step.details.next) }}</div>
                </div>
                <div class="item">
                    <div class="left">操作用户级</div>
                    <div class="right">{{ getOptArr(opts_all.obj.article_lv,step.details.forlv) }}</div>
                </div>
                <div class="item">
                    <div class="left">内置议题类型</div>
                    <div class="right">{{ getOptVal(opts_all.obj.step_yt_type,step.details.topictype) }}</div>
                </div>
                <div class="item">
                    <div class="left">返回步骤操作</div>
                    <div class="right">{{ getOptVal(opts_all.obj.step_back,step.details.canback) }}</div>
                </div>
                <div class="item">
                    <div class="left">创建时间</div>
                    <div class="right">{{ step.details.created_at }}</div>
                </div>
                <div class="item">
                    <div class="left">更新时间</div>
                    <div class="right">{{ step.details.updated_at }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="step.switch_details = false">取消</el-button>
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
const tab_index = ref(1)

const flow = reactive({
    list: [],
    page: 1,
    total: 0,
    per_page: 15,
    search: {},
    switch_search: false,
    switch_pop: false,
    title: '添加',
    form: {},
    error: {},
    switch_details: false,
    details: ''
})
// 获取列表
const getFuncFlowList = () => {
    let data = {
        page: flow.page,
        per_page: flow.per_page
    }
    if (flow.search.name) {
        data.name = flow.search.name
    }
    APIgetFlowList(data).then(res => {
        flow.list = res.data.items
        flow.total = res.data.aggregation.total_cnt
    })
}
watch(() => flow.page, val => {
    getFuncFlowList()
}, { immediate: true, deep: true })
// 修改和添加
const addAndModifyFlowFunc = () => {
    if (flow.title == '添加') {
        APIpostFlow(flow.form).then(res => {
            flowRefreshFunc()
            flow.switch_pop = false
        }).catch(err => {
            flow.error = err.data
        })
    } else if (flow.title == '修改') {
        APIputFlow(flow.form.id, flow.form).then(res => {
            getFuncFlowList()
            flow.switch_pop = false
        }).catch(err => {
            flow.error = err.data
        })
    }
}
const detailsFunc = val => {
    APIgetFlowDetails(val.id).then(res => {
        flow.details = res.data
        flow.switch_details = true
    })
}
const deleteFlowFunc = val => {
    APIdeleteFlow(val.id).then(res => {
        getFuncFlowList()
    })
}
/* ----------------------------------------------------------------------------------------------------------------------- */
import {
    APIgetStepList,
    APIgetStepDetails,
    APIdeleteStep,
    APIputStep,
    APIpostStep
} from '@/api/custom/custom.js'
const step = reactive({
    switch_list: false,
    search: {},
    switch_search: false,
    list: '',
    active_flow: '',
    switch_pop: false,
    title: '添加',
    form: {},
    error: {},
    switch_details: false,
    details: ''
})
const getFuncStepList = () => {
    APIgetStepList(step.active_flow.id).then(res => {
        step.list = res.data
    })
}
const stepClickTrue = () => {
    if (step.title == '添加') {
        APIpostStep(step.active_flow.id, step.form).then(res => {
            stepRefreshFunc()
            step.switch_pop = false
        }).catch(err => {
            step.error = err.data
        })
        return false
    }
    if (step.title == '修改') {
        APIputStep(step.active_flow.id, step.form.id, step.form).then(res => {
            getFuncStepList()
            step.switch_pop = false
        }).catch(err => {
            step.error = err.data
        })
    }
}
const deleteStepFunc = val => {
    APIdeleteStep(step.active_flow.id, val.id).then(res => {
        getFuncStepList()
    })
}
const getFuncStepDetails = val => {
    APIgetStepDetails(val.id).then(res => {
        step.details = res.data
        step.switch_details = true
    })
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 刷新
const flowRefreshFunc = () => {
    flow.search = {}
    flow.page = 1
    flow.switch_search = false
    getFuncFlowList()
}
const stepRefreshFunc = () => {
    getFuncStepList()
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// // 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['terminal_num', 'type_type', 'flow_active', 'article_lv', 'step_yt_type', 'step_back']).then(res => {
    opts_all.obj = res
})
const getOptArr = (opts, arr) => {
    let list = ''
    for (let i in arr) {
        list += ',' + getOptVal(opts, arr[i])
    }
    return list.substring(1)
}
const getListText = (list, val) => {
    for (let i in list) {
        if (list[i].step == val) {
            return list[i].name
        }
    }
    return val
}
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
