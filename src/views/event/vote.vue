<template>
    <div class="vote">
        <page-main>
            <div>
                <el-input v-model="data_1.search.name" class="input-b-r" placeholder="标题名称" clearable />
                <el-select v-model="data_1.search.status" class="input-b-r" clearable placeholder="状态">
                    <el-option v-for="(item,i) in opts_all.obj.vote_status" :key="item.key" :label="item.val" :value="item.key" />
                </el-select>
                <el-select v-model="data_1.search.type" class="input-b-r" clearable placeholder="事项类型">
                    <el-option v-for="(item,i) in opts_all.obj.vote_type" :key="item.key" :label="item.val" :value="item.key" />
                </el-select>
                <el-button
                    class="btn-b-r" type="primary"
                    @click="()=>{
                        data_1.switch_search = true;
                        data_1.page = 1;
                        getFuncVoteList()
                    }"
                >
                    搜索
                </el-button>
            </div>
            <div v-show="data_1.switch_search" style="margin-bottom: 10px;">
                <el-button style="margin-right: 10px;" @click="refreshFunc()">重置</el-button>
                *搜索到相关结果共{{ data_1.total }}条。
            </div>
            <div>
                <el-button
                    class="head-btn" type="primary"
                    @click="()=>{
                        data_1.add_form={status:opts_all.obj.vote_status[0].key};
                        data_1.add_error={};
                        data_1.add_switch=true;
                        data_1.add_title = '添加'
                    }"
                >
                    添加事项
                </el-button>
            </div>
            <el-table
                :data="data_1.list"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
            >
                <el-table-column label="事项名称" width="250">
                    <template #default="scope">
                        <span>{{ scope.row.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="90">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.vote_status,scope.row.status) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="开始时间" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.startat }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="结束时间" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.endat }} </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="320">
                    <template #default="scope">
                        <el-button
                            type="primary" size="small"
                            @click="clickFuncModify(scope.row)"
                        >
                            修改
                        </el-button>
                        <el-button
                            size="small"
                            @click="clickFuncDeteails(scope.row)"
                        >
                            详情
                        </el-button>
                        <el-popconfirm
                            title="确定要删除当前项么?"
                            cancel-button-type="info"
                            @confirm="clickFuncDeleteVote(scope.row)"
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
                            @click="()=>{
                                vote_opts.opts_voteid=scope.row.id;
                                vote_opts.opts_switch=true;
                            }"
                        >
                            选项
                        </el-button>
                        <el-button
                            size="small"
                            @click="()=>{
                                vote_house.house_voteid = scope.row.id;
                                vote_house.house_switch = true;
                            }"
                        >
                            房屋
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
                            label-width="70px"
                            label="事项类别"
                            :error="data_1.add_error&&data_1.add_error.type?data_1.add_error.type[0]:''"
                        >
                            <el-select v-model="data_1.add_form.type" class="head-btn" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.vote_type" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="小区"
                            :error="data_1.add_error&&data_1.add_error.zid?data_1.add_error.zid[0]:''"
                        >
                            <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                <SearchResidential v-model:str="data_1.add_form.zid" />
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="标题名称"
                            :error="data_1.add_error&&data_1.add_error.name?data_1.add_error.name[0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.name"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="投几项"
                            :error="data_1.add_error&&data_1.add_error.vmax?data_1.add_error.vmax[0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.vmax"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="开始时间"
                            :error="data_1.add_error&&data_1.add_error.startat?data_1.add_error.startat[0]:''"
                        >
                            <el-date-picker
                                v-model="data_1.add_form.startat"
                                type="datetime"
                                value-format="YYYY-MM-DD HH:hh:ss"
                                placeholder=""
                                style="width: 100%;"
                                :default-value="new Date()"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="结束时间"
                            :error="data_1.add_error&&data_1.add_error.endat?data_1.add_error.endat[0]:''"
                        >
                            <el-date-picker
                                v-model="data_1.add_form.endat"
                                type="datetime"
                                value-format="YYYY-MM-DD HH:hh:ss"
                                placeholder=""
                                style="width: 100%;"
                                :default-value="new Date()"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="状态"
                            :error="data_1.add_error&&data_1.add_error.status?data_1.add_error.status[0]:''"
                        >
                            <el-select v-model="data_1.add_form.status" class="head-btn" clearable placeholder="">
                                <el-option v-for="(item,i) in opts_all.obj.vote_status" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="参与类型"
                            :error="data_1.add_error&&data_1.add_error.opttype?data_1.add_error.opttype[0]:''"
                        >
                            <el-select v-model="data_1.add_form.opttype" class="head-btn" clearable placeholder="">
                                <el-option v-for="(item,i) in opts_all.obj.opttype_type" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="70px"
                            label="内容"
                            :error="data_1.add_error&&data_1.add_error.content?data_1.add_error.content[0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.content"
                                :autosize="{ minRows: 2, maxRows: 6 }"
                                type="textarea"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="data_1.add_switch=false">取消</el-button>
                    <el-button type="primary" @click="clickFuncAddVote">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog
            v-model="data_1.details_switch"
            title="详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">事项类别</div>
                    <div class="right">{{ getOptVal(opts_all.obj.vote_type,data_1.details_data.type) }}</div>
                </div>
                <div class="item">
                    <div class="left">步骤名称</div>
                    <div class="right">{{ data_1.details_data.name }}</div>
                </div>
                <div class="item">
                    <div class="left">事项内容</div>
                    <div class="right">{{ data_1.details_data.content }}</div>
                </div>
                <div class="item">
                    <div class="left">开始时间</div>
                    <div class="right">{{ data_1.details_data.startat }}</div>
                </div>
                <div class="item">
                    <div class="left">结束时间</div>
                    <div class="right">{{ data_1.details_data.endat }}</div>
                </div>
                <div class="item">
                    <div class="left">小区ID</div>
                    <div class="right">{{ data_1.details_data.zid }}</div>
                </div>
                <div class="item">
                    <div class="left">投几项</div>
                    <div class="right">{{ data_1.details_data.vmax }}</div>
                </div>
                <div class="item">
                    <div class="left">状态</div>
                    <div class="right">{{ getOptVal(opts_all.obj.vote_status,data_1.details_data.status) }}</div>
                </div>
                <div class="item">
                    <div class="left">选项类型</div>
                    <div class="right">{{ getOptVal(opts_all.obj.opttype_type,data_1.details_data.opttype) }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="data_1.details_switch = false">取消</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 投票选项 -->
        <VoteOpts :id="vote_opts.opts_voteid" v-model:dialog_switch="vote_opts.opts_switch" />
        <!-- 投票房屋 -->
        <VoteHouse :id="vote_house.house_voteid" v-model:dialog_switch="vote_house.house_switch" />
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
    add_error: {},
    details_data: {},
    details_switch: false
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
watch(() => data_1.page, new_val => {
    getFuncVoteList()
}, { immediate: true, deep: true })
const clickFuncAddVote = () => {
    data_1.add_error = {}
    if (data_1.add_title == '添加') {
        APIpostVote(data_1.add_form).then(res => {
            refreshFunc()
            data_1.add_switch = false
            ElMessage.success(res.msg)
        }).catch(err => {
            data_1.add_error = err.data
        })
    } else {
        APIputVote(data_1.add_form.id, data_1.add_form).then(res => {
            getFuncVoteList()
            data_1.add_switch = false
            ElMessage.success(res.msg)
        }).catch(err => {
            data_1.add_error = err.data
        })
    }
}
const clickFuncModify = val => {
    data_1.add_error = {}
    data_1.add_title = '修改'
    data_1.add_switch
    APIgetVoteDetails(val.id).then(res => {
        data_1.add_form = res.data
        data_1.add_switch = true
    })
}
const clickFuncDeleteVote = val => {
    APIdeleteVote(val.id).then(res => {
        getFuncVoteList()
        ElMessage.success(res.msg)
    })
}
const clickFuncDeteails = val => {
    APIgetVoteDetails(val.id).then(res => {
        data_1.details_data = res.data
        data_1.details_switch = true
    })
}
/* ----------------------------------------------------------------------------------------------------------------------- */
const vote_opts = reactive({
    opts_switch: false,
    opts_voteid: ''
})
const vote_house = reactive({
    house_switch: false,
    house_voteid: ''
})
/* ----------------------------------------------------------------------------------------------------------------------- */
const refreshFunc = () => {
    data_1.search = {}
    data_1.switch_search = false
    data_1.page = 1
    getFuncVoteList()
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// // 配置项
import {
    getOpts,
    getOptVal
} from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['vote_type', 'vote_status', 'opttype_type']).then(res => {
    opts_all.obj = res
})

</script>
<style lang="scss" scoped>
	.vote {

    }
</style>
