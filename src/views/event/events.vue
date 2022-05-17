<template>
    <div class="setupgroup">
        <page-main>
            <div>
                <el-input v-model="flowwork.search.name" class="input-b-r" placeholder="流程名称" clearable />
                <CascaderType v-model="flowwork.search.cid" class="input-b-r" style="width: 200px;" />
                <el-input v-model="flowwork.search.baseval" class="input-b-r" placeholder="对象id" clearable />
                <el-button class="btn-b-r" type="primary" @click="()=>{flowwork.page=1;flowwork.switch_search=true;getFuncFlowworkList();}">搜索</el-button>
            </div>
            <div v-show="flowwork.switch_search" class="search-tips">
                <el-button style="margin-right: 10px;" @click="()=>{flowworkRefreshFunc();}">重置</el-button>
                *搜索到相关结果共{{ flowwork.total }}条。
            </div>
            <div>
                <el-button class="head-btn" type="primary" @click="()=>{flowwork.title='添加';flowwork.form={};flowwork.error={};flowwork.switch_pop=true;}">发起流程</el-button>
            </div>
            <el-table
                :data="flowwork.list"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
            >
                <el-table-column label="用户级" width="180">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.article_lv,scope.row.baselv) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="用户级id" width="250">
                    <template #default="scope">
                        <span>{{ scope.row.baseval }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="步骤" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.step }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="180">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.status_all,scope.row.status) }} </span>
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
                <el-table-column fixed="right" label="操作" width="400">
                    <template #default="scope">
                        <el-button
                            type="success" size="small"
                            @click="flowworkFuncEventSaveFunc(scope.row)"
                        >
                            保存
                        </el-button>
                        <el-popconfirm
                            title="确定要提交当前项么?"
                            cancel-button-type="info"
                            @confirm="clickFuncUpdate(scope.row)"
                        >
                            <template #reference>
                                <el-button
                                    type="primary"
                                    size="small"
                                >
                                    提交
                                </el-button>
                            </template>
                        </el-popconfirm>
                        <el-button
                            size="small"
                            type="warning"
                            @click="flowevent.switch_back=true;flowwork.active = scope.row;getOptBZListFunc(scope.row)"
                        >
                            返回
                        </el-button>
                        <el-button
                            size="small"
                            @click="detailsFlowworkFunc(scope.row)"
                        >
                            详情
                        </el-button>
                        <el-button
                            type="primary"
                            size="small"
                            @click="flowworkFuncEventList(scope.row)"
                        >
                            事项
                        </el-button>
                        <el-popconfirm
                            title="确定要删除当前项么?"
                            cancel-button-type="info"
                            @confirm="deleteFlowworkFunc(scope.row)"
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
            <el-pagination
                v-model:current-page="flowwork.page"
                style="padding-top: 20px;"
                layout="total,prev,pager,next,jumper,"
                :total="flowwork.total"
                :page-size="flowwork.per_page"
                background
                hide-on-single-page
            />

            <!-- 发起流程 -->
            <el-dialog
                v-model="flowwork.switch_pop"
                title="发起流程"
                width="50%"
            >
                <el-form
                    ref="ruleFormRef"
                    :model="flowwork.form"
                >
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="70px"
                                label="选择流程"
                                :error="flowwork.error&&flowwork.error.baselv?flowwork.error.baselv[0]:''"
                            >
                                <div style="height: 100%;box-sizing: border-box;padding-bottom: 10px;width: 100%;">
                                    <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;font-size: 14px;">
                                        <SearchFlow v-model:str="flowwork.form.flow" />
                                    </div>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="70px"
                                label="用户级"
                                :error="flowwork.error&&flowwork.error.baselv?flowwork.error.baselv[0]:''"
                            >
                                <el-select v-model="flowwork.form.baselv" class="head-btn" placeholder="" clearable @change="flowwork.form.baseval= ''">
                                    <el-option v-for="(item,i) in opts_all.obj.article_lv" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="70px"
                                label="用户级id"
                                :error="flowwork.error&&flowwork.error.baselv?flowwork.error.baselv[0]:''"
                            >
                                <div v-if="flowwork.form.baselv==6" style="height: 100%;box-sizing: border-box;padding-bottom: 10px;width: 100%;">
                                    <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;font-size: 14px;">
                                        <SearchResidential v-model:str="flowwork.form.baseval" />
                                    </div>
                                </div>
                                <Cascaders v-else v-model="flowwork.form.baseval" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <template #footer>
                    <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                        <el-button @click="flowwork.switch_pop=false">取消</el-button>
                        <el-button type="primary" @click="addAndModifyFlowworkFunc">确定</el-button>
                    </div>
                </template>
            </el-dialog>
            <!-- 详情 -->
            <el-dialog
                v-model="flowwork.switch_details"
                title="详情"
                width="50%"
            >
                <div class="details-box">
                    <div class="item">
                        <div class="left">用户级</div>
                        <div class="right">{{ getOptVal(opts_all.obj.article_lv,flowwork.details.baselv) }}</div>
                    </div>
                    <div class="item">
                        <div class="left">用户级id</div>
                        <div class="right">{{ flowwork.details.baseval }}</div>
                    </div>
                    <div class="item">
                        <div class="left">步骤</div>
                        <div class="right">{{ flowwork.details.step }}</div>
                    </div>
                    <div class="item">
                        <div class="left">状态</div>
                        <div class="right">{{ getOptVal(opts_all.obj.status_all,flowwork.details.status) }}</div>
                    </div>
                    <div class="item">
                        <div class="left">创建时间</div>
                        <div class="right">{{ flowwork.details.created_at }}</div>
                    </div>
                    <div class="item">
                        <div class="left">更新时间</div>
                        <div class="right">{{ flowwork.details.updated_at }}</div>
                    </div>
                </div>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="flowwork.switch_details = false">取消</el-button>
                    </span>
                </template>
            </el-dialog>
            <!-- 事项 -->
            <el-dialog
                v-model="flowevent.switch_list"
                title="事项"
                width="70%"
            >
                <el-table
                    :data="flowevent.list"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    style="width: 100%;min-height: 300px;overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
                >
                    <el-table-column label="事项id" width="250">
                        <template #default="scope">
                            <span>{{ scope.row.id }} </span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="wid" width="250">
                    <template #default="scope">
                        <span>{{ scope.row.wid }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="forval" width="250">
                    <template #default="scope">
                        <span>{{ scope.row.forval }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="douid" width="250">
                    <template #default="scope">
                        <span>{{ scope.row.douid }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="doutype" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.doutype }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="douser" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.douser }} </span>
                    </template>
                </el-table-column> -->
                    <el-table-column label="议题" width="180">
                        <template #default="scope">
                            <span>{{ scope.row.topictype }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="议题对象" width="250">
                        <template #default="scope">
                            <CascaderType v-model="scope.row.topicid" :text="true" />
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

                    <el-table-column />
                </el-table>
            </el-dialog>
            <!-- 保存 -->
            <el-dialog
                v-model="flowevent.switch_save"
                title="保存当前事项进度"
                width="50%"
            >
                <el-form
                    ref="ruleFormRef"
                    :model="flowevent.form_save"
                >
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="70px"
                                label="议题"
                                :error="flowevent.error_save&&flowevent.error_save.topictype?flowevent.error_save.topictype[0]:''"
                            >
                                <el-select v-model="flowevent.form_save.topictype" class="head-btn" placeholder="" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.step_yt_type" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="70px"
                                label="议题对象"
                                :error="flowevent.error_save&&flowevent.error_save.forval?flowevent.error_save.forval[0]:''"
                            >
                                <CascaderType v-model="flowevent.form_save.forval" />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="70px"
                                label="对象ID"
                                :error="flowevent.error_save&&flowevent.error_save.topicid?flowevent.error_save.topicid[0]:''"
                            >
                                <!-- 行政端为 区域代码、企业端和业主端为 小区ID -->
                                <!-- <div style="height: 100%;box-sizing: border-box;padding-bottom: 10px;width: 100%;">
                                <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;font-size: 14px;">
                                    <SearchResidential v-model:str="flowevent.form_save.topicid" />
                                </div>
                            </div> -->
                                <Cascaders v-model="flowevent.form_save.topicid" />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <div style="margin-bottom: 10px;">
                                <el-button type="primary" plain @click="addServiceFuncSave">添加自定义字段</el-button>
                            </div>
                            <div v-for="(item,i) in flowevent.form_save.extra" class="serve-box">
                                <el-row :gutter="10">
                                    <el-col :xs="12" :sm="12">
                                        <el-form-item label="自定义字段名" :error="flowevent.error_save&&flowevent.error_save[`extra.${i}.label`]?flowevent.error_save[`extra.${i}.label`][0]:''">
                                            <el-input
                                                v-model="item.label"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="12" :sm="12">
                                        <el-form-item label="自定义值" :error="flowevent.error_save&&flowevent.error_save[`extra.${i}.type`]?flowevent.error_save[`extra.${i}.type`][0]:''">
                                            <el-input
                                                v-model="item.val"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="12" :sm="12">
                                        <el-form-item label="自定义类型" :error="flowevent.error_save&&flowevent.error_save[`extra.${i}.type`]?flowevent.error_save[`extra.${i}.type`][0]:''">
                                            <el-input
                                                v-model="item.type"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <div class="delete-service" @click="deleteServiceFuncSave(i)">
                                    <el-icon :size="20" color="#F56C6C">
                                        <el-icon-circle-close />
                                    </el-icon>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
                <template #footer>
                    <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                        <el-button @click="flowevent.switch_save=false">取消</el-button>
                        <el-button type="primary" @click="flowworkFuncEventSaveFuncUpdata">确定</el-button>
                    </div>
                </template>
            </el-dialog>
            <!-- 保存 -->
            <el-dialog
                v-model="flowevent.switch_back"
                title="返回事件进度"
                width="50%"
            >
                <el-form
                    ref="ruleFormRef"
                    :model="flowevent.form_back"
                >
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="70px"
                                label="步骤节点"
                                :error="flowevent.error_back&&flowevent.error_back.topictype?flowevent.error_back.topictype[0]:''"
                            >
                                <el-select v-model="flowevent.form_back.step" class="head-btn" placeholder="" clearable>
                                    <el-option v-for="(item,i) in opt_bz.obj" :key="item.key" :label="item.name" :value="item.step" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <template #footer>
                    <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                        <el-button @click="flowevent.switch_back=false">取消</el-button>
                        <el-button type="primary" @click="flowworkFuncEventSaveFuncEvent">确定</el-button>
                    </div>
                </template>
            </el-dialog>
        </page-main>
    </div>
</template>
<script setup>
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
/* ----------------------------------------------------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------------------------------------------------- */
import {
    APIgetFlowworkList,
    APIgetFlowworkDetails,
    APIdeleteFlowwork,
    APIpostFlowwork
} from '@/api/custom/custom.js'
const flowwork = reactive({
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
    details: '',
    active: ''
})
const getFuncFlowworkList = () => {
    let data = {
        page: flowwork.page,
        per_page: flowwork.per_page
    }
    if (flowwork.search.name) {
        data.name = flowwork.search.name
    }
    if (flowwork.search.cid) {
        data.cid = flowwork.search.cid
    }
    if (flowwork.search.baseval) {
        data.baseval = flowwork.search.baseval
    }
    APIgetFlowworkList(data).then(res => {
        flowwork.list = res.data.items
        flowwork.total = res.data.aggregation.total_cnt
    })
}
watch(() => flowwork.page, val => {
    getFuncFlowworkList()
}, { immediate: true, deep: true })
const detailsFlowworkFunc = val => {
    flowwork.active = val
    APIgetFlowworkDetails(val.id).then(res => {
        flowwork.details = res.data
        flowwork.switch_details = true
    })
}
const deleteFlowworkFunc = val => {
    APIdeleteFlowwork(val.id).then(res => {
        getFuncFlowworkList()
    })
}
const addAndModifyFlowworkFunc = () => {
    APIpostFlowwork(flowwork.form.flow, flowwork.form).then(res => {
        flowworkRefreshFunc()
        flowwork.switch_pop = false
    }).catch(err => {
        flowwork.error = err.data
    })
}

import {
    APIgetFlowworkEventList,
    APIpostFlowworkEventSave,
    APIpostFlowworkEventUpdate,
    APIpostFlowworkEventSpeed
} from '@/api/custom/custom.js'
const flowevent = reactive({
    switch_list: false,
    list: [],
    error_save: {},
    form_save: {},
    switch_save: false,
    error_back: {},
    form_back: {},
    switch_back: false
})
const flowworkFuncEventList = val => {
    // val.id = '626b835da8adce40560707f4'
    flowwork.active = val
    APIgetFlowworkEventList(flowwork.active.id).then(res => {
        flowevent.list = res.data
        flowevent.switch_list = true
    })
}
const flowworkFuncEventSaveFunc = val => {
    flowwork.active = val
    flowevent.error_save = {}
    flowevent.form_save = {}
    flowevent.switch_save = true
}
const flowworkFuncEventSaveFuncUpdata = val => {
    flowevent.error_save = {}
    APIpostFlowworkEventSave(flowwork.active.id, flowevent.form_save).then(res => {
        flowworkFuncEventList(flowwork.active.id)
        flowevent.switch_save = false
    }).catch(err => {
        flowevent.error_save = err.data
    })
}
// 添加字段
const addServiceFuncSave = index => {
    let data = {
        'label': '',
        'type': '',
        'val': ''
    }
    if (!flowevent.form_save.extra) {
        flowevent.form_save.extra = []
    }
    flowevent.form_save.extra.push(data)
}
// 删除
const deleteServiceFuncSave = index => {
    flowevent.form_save.extra.splice(index, 1)
}
const clickFuncUpdate = val => {
    flowwork.active = val
    APIpostFlowworkEventUpdate(flowwork.active.id).then(res => {
        flowworkFuncEventList(flowwork.active.id)
    })
}
const flowworkFuncEventSaveFuncEvent = val => {
    APIpostFlowworkEventSpeed(flowwork.active.id, flowevent.form_back).then(res => {
        flowworkFuncEventList(flowwork.active.id)
        flowevent.switch_back = false
    }).catch(err => {
        flowevent.error_back = err.data
    })
}
/* ----------------------------------------------------------------------------------------------------------------------- */
import {
    APIgetStepList
} from '@/api/custom/custom.js'
const opt_bz = reactive({
    obj: []
})
const getOptBZListFunc = val => {
    APIgetStepList(val.fid).then(res => {
        opt_bz.obj = res.data
    })
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 刷新
const flowworkRefreshFunc = () => {
    flowwork.search = {}
    flowwork.page = 1
    flowwork.switch_search = false
    getFuncFlowworkList()
}

/* ----------------------------------------------------------------------------------------------------------------------- */
// // 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['terminal_num', 'type_type', 'flow_active', 'article_lv', 'step_yt_type', 'step_back', 'status_all']).then(res => {
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
