<template>
    <div class="vote">
        <page-main>
            <div>
                <el-input v-model="data_1.search.name" class="input-b-r" placeholder="流程名称" clearable />
                <el-button
                    class="btn-b-r" type="primary"
                    @click=""
                >
                    搜索
                </el-button>
            </div>
            <div v-show="data_1.switch_search" style="margin-bottom: 10px;">
                <el-button style="margin-right: 10px;" @click="">重置</el-button>
                *搜索到相关结果共{{ data_1.total }}条。
            </div>
            <div>
                <el-button
                    class="head-btn" type="primary"
                    @click="()=>{data_1.add_form={};data_1.add_error={};data_1.add_switch=true;}"
                >
                    添加流程
                </el-button>
            </div>
            <el-table
                :data="data_1.list"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
            >
                <el-table-column label="流程名称" width="300">
                    <template #default="scope">
                        <span>{{ scope.row.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="终端类型" width="180">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.terminal_num,scope.row.eqtype) }} </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="260">
                    <template #default="scope">
                        <el-button
                            type="primary" size="small"
                        >
                            修改
                        </el-button>
                        <el-button
                            size="small"
                        >
                            详情
                        </el-button>
                        <el-popconfirm
                            title="确定要删除当前项么?"
                            cancel-button-type="info"
                            @confirm=""
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
                        >
                            步骤
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column />
            </el-table>
            <el-pagination
                v-model:current-page="data_1.page"
                style="padding-top: 20px;"
                layout="total,prev,pager,next,jumper,"
                :total="data_1.total"
                :page-size="data_1.per_page"
                background
                hide-on-single-page
            />
        </page-main>
        <!-- 修改添加 -->
        <el-dialog
            v-model="data_1.add_switch"
            :title="data_1.add_title"
            width="50%"
        >
            <el-form
                :model="data_1.add_form"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="投票类别"
                            :error="data_1.add_error&&data_1.add_error.type?data_1.add_error.type[0]:''"
                        >
                            <el-select v-model="data_1.add_form.type" class="head-btn" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.vote_type" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="步骤名称"
                            :error="data_1.add_error&&data_1.add_error.name?data_1.add_error.name[0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.name"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="步骤名称"
                            :error="data_1.add_error&&data_1.add_error.name?data_1.add_error.name[0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.name"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="步骤名称"
                            :error="data_1.add_error&&data_1.add_error.name?data_1.add_error.name[0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.name"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="步骤名称"
                            :error="data_1.add_error&&data_1.add_error.name?data_1.add_error.name[0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.name"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="步骤名称"
                            :error="data_1.add_error&&data_1.add_error.name?data_1.add_error.name[0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.name"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="步骤名称"
                            :error="data_1.add_error&&data_1.add_error.name?data_1.add_error.name[0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.name"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="步骤名称"
                            :error="data_1.add_error&&data_1.add_error.name?data_1.add_error.name[0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.name"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="步骤名称"
                            :error="data_1.add_error&&data_1.add_error.name?data_1.add_error.name[0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.name"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="data_1.add_switch=false">取消</el-button>
                    <el-button type="primary" @click="">确定</el-button>
                </div>
            </template>
        </el-dialog>
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
import {
    APIgetVoteList,
    APIgetVoteDetails,
    APIdeleteVote,
    APIputVote,
    APIpostVote
} from '@/api/custom/custom.js'
const data_1 = reactive({
    search: {},
    switch_search: false,
    page: 1,
    total: 0,
    per_page: 15,
    list: [],
    add_switch: false,
    add_title: '添加',
    add_form: {},
    add_error: {}
})
const getFuncVoteList = () => {
    let data = {
        page: data_1.page,
        per_page: data_1.per_page
    }
    for (let key in data_1.search) {
        let item = data_1.search[key]
        if (item || item === 0) {
            data[key] = item
        }
    }
    APIgetVoteList(data).then(res => {
        data_1.total = res.data.aggregation.total_cnt
        data_1.list = res.data.items
    })
}
/* ----------------------------------------------------------------------------------------------------------------------- */
const refreshFunc = () => {
    data_1.search = {}
    data_1.switch_search = false
    data_1.page = 1
    getFuncVoteList()
}
refreshFunc()
/* ----------------------------------------------------------------------------------------------------------------------- */
// // 配置项
import {
    getOpts,
    getOptVal
} from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['vote_type']).then(res => {
    opts_all.obj = res
})

</script>
<style lang="scss" scoped>
	.vote {

    }
</style>
