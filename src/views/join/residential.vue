<template>
    <div class="join-platform">
        待完成，不知道数据结构
        <page-main>
            <div>
                <div>
                    <el-row :gutter="10">
                        <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
                            <el-select v-model="data_search.obj.type" class="head-btn" placeholder="类型" clearable>
                                <el-option
                                    v-for="(item,i) in opts_all.obj.enterprise_type" :key="item.key"
                                    :label="item.val" :value="item.key"
                                />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
                            <el-select
                                v-model="data_search.obj.process_status" class="head-btn" placeholder="状态"
                                clearable
                            >
                                <el-option
                                    v-for="(item,i) in opts_all.obj.status_all" :key="item.key" :label="item.val"
                                    :value="item.key"
                                />
                            </el-select>
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
                <div style="width: 100%; overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;">
                    <el-table
                        v-loading="loading_tab"
                        :data="data_tab.arr"
                        :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                        style="width: 100%;min-height: 300px;"
                    >
                        <el-table-column prop="name" label="名称" width="220" />
                        <el-table-column prop="reply" label="理由" width="180" />
                        <el-table-column prop="type" label="类型" width="120">
                            <template #default="scope">
                                <span
                                    style="margin-left: 10px;"
                                >{{ getOptVal(opts_all.obj.enterprise_type,scope.row.type) }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="process_status" label="状态" width="90">
                            <template #default="scope">
                                <span
                                    style="margin-left: 10px;"
                                >{{ getOptVal(opts_all.obj.status_all,scope.row.process_status) }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="content.biz_lic" label="商业编码" width="180" />
                        <el-table-column prop="content.social_code" label="社会编码" width="180" />
                        <el-table-column prop="created_at" label="创建时间" width="180" />
                        <el-table-column prop="updated_at" label="更新时间" width="180" />
                        <el-table-column fixed="right" label="操作" width="140">
                            <template #default="scope">
                                <el-button
                                    type="primary" size="small"
                                    @click="examineFunc(scope.row)"
                                >
                                    审批
                                </el-button>
                                <el-button
                                    type="primary" size="small"
                                    @click="detailsFunc(scope.row)"
                                >
                                    详情
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
        <!-- 审核 -->
        <el-dialog
            v-model="switch_examine"
            title="审核"
            width="50%"
        >
            <div>
                <el-form
                    :model="from_examine"
                    label-width="80px"
                >
                    <el-form-item
                        label="审批"
                        :error="err_msg.obj&&err_msg.obj['process_status']?err_msg.obj['process_status'][0]:''"
                    >
                        <el-select v-model="from_examine.process_status" class="head-btn" placeholder="同意或拒绝" clearable>
                            <el-option
                                v-for="(item,i) in opts_all.obj.process_status" :key="item.key" :label="item.val"
                                :value="item.key"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="审批理由"
                        :error="err_msg.obj&&err_msg.obj['reply']?err_msg.obj['reply'][0]:''"
                    >
                        <el-input
                            v-model="from_examine.reply"
                            :autosize="{ minRows: 2, maxRows: 10 }"
                            type="textarea"
                            placeholder="请输入相关理由"
                        />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_examine = false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc">提交</el-button>
                </span>
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
                    <div class="left">名称</div>
                    <div class="right">{{ data_details.item.name }}</div>
                </div>
                <div class="item">
                    <div class="left">理由</div>
                    <div class="right">{{ data_details.item.reply }}</div>
                </div>
                <div class="item">
                    <div class="left">类型</div>
                    <div class="right">{{ getOptVal(opts_all.obj.enterprise_type, data_details.item.type) }}</div>
                </div>
                <div class="item">
                    <div class="left">状态</div>
                    <div class="right">{{ getOptVal(opts_all.obj.status_all, data_details.item.process_status) }}</div>
                </div>
                <div class="item">
                    <div class="left">商业编码</div>
                    <div class="right">{{ data_details.item.content.biz_lic }}</div>
                </div>
                <div class="item">
                    <div class="left">社会编码</div>
                    <div class="right">{{ data_details.item.content.social_code }}</div>
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
    </div>
</template>
<script setup>
import {
    APIgetPlatformList,
    APIgetPlatformDetails,
    APIputPlatform
} from '@/api/custom/custom.js'
import {
    reactive,
    ref,
    watch
} from 'vue'
/* ----------------------------------------------------------------------------------------------------------------------- */
// 数据
// 搜索
let switch_search = ref(false)
let data_search = reactive({
    obj: {}
})
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
// 审核
let switch_examine = ref(false)
let from_examine = reactive({
    reply: '',
    process_status: ''
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
    data_search.obj = {}
    getTabListFunc()
}
// 审核
const examineFunc = val => {
    from_examine.reply = ''
    from_examine.process_status = ''
    err_msg.obj = {}
    data_dialog.obj = val
    switch_examine.value = true
}
// 详情
const detailsFunc = val => {
    data_dialog.obj = val
    APIgetPlatformDetails(val.id).then(res => {
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
const err_msg = reactive({
    obj: {}
})
// 同意拒绝提交
const dialogExamineCloseFunc = () => {
    let putdata = {
        process_status: from_examine.process_status,
        reply: from_examine.reply
    }
    APIputPlatform(data_dialog.obj.id, putdata).then(res => {
        if (!res.code) {
            switch_examine = false
            refreshFunc()
        }
    }).catch(err => {
        err_msg.obj = err.data
    })
}
// 获取列表api请求
const getTabListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    for (let key in data_search.obj) {
        if (data_search.obj[key] || data_search.obj[key] === 0) {
            if (data_search.obj[key] instanceof Array && data_search.obj[key].length <= 0) {
                continue
            }
            params[key] = data_search.obj[key]
        }
    }
    loading_tab.value = true
    APIgetPlatformList(params).then(res => {
        if (res.code === 0) {
            loading_tab.value = false
            data_tab.arr = res.data.items
            total.value = res.data.aggregation.total_cnt
        }
    })
}

/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()

/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import {
    getOpts,
    getOptVal
} from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['enterprise_type', 'status_all', 'process_status']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss">
    .join-platform {
        .el-cascader-box-my {
            .el-cascader {
                width: 100% !important;
                margin-bottom: 10px;
            }
        }
    }
</style>
<style lang="scss" scoped>
    .join-platform {
        .el-cascader-box-my {
            .el-cascader {
                width: 100%;
                margin-bottom: 10px;
            }
        }
    }
    .search-tips {
        color: #aaa;
        font-size: 14px;
        margin-bottom: 20px;
    }
    .details-box {
        .item {
            display: flex;
            color: #333;
            font-size: 16px;
            margin-bottom: 20px;
            .left {
                box-sizing: border-box;
                width: 100px;
                white-space: nowrap;
                margin-right: 20px;
                text-align: right;
                font-weight: 600;
            }
            .left::after {
                content: "：";
            }
            .right {
                width: 100%;
                color: #666;
            }
        }
    }
</style>
