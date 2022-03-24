<template>
    <div class="keep-on-record">
        <page-main>
            <div>
                <div>
                    <el-row :gutter="10">
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-cascader
                                v-model="data.search.place"
                                :props="{value:'value',label:'label',children:'children'}"
                                :options="data.opts.place" size="default" placeholder="地区" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-select v-model="data.search.type" class="head-btn" placeholder="类别" clearable>
                                <el-option label="按ID" :value="0" />
                                <el-option label="按企业名称" :value="1" />
                                <el-option label="按小区地址" :value="2" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
                            <el-input v-model="data.search.keyword" class="head-btn" placeholder="关键字" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="2" :xl="3">
                            <el-button class="head-btn" type="primary" @click="getListFunc">搜索</el-button>
                        </el-col>
                    </el-row>
                </div>
                <!-- <div  class="search-tips"> -->
                <div v-show="search_tips" class="search-tips">
                    <el-button @click="refreshFunc" style="margin-right: 10px;">重置</el-button>
                    *搜索到相关结果共{{data.table_list.length}}条。
                </div>
                <div style="width: 100%; overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;">
                    <el-table
                        v-loading="loading"
                        :data="data.table_list"
                        :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                        style="width: 100%;min-height: 300px;">
                        <el-table-column prop="name" label="名称" width="220" />
                        <el-table-column prop="type" label="类型" width="90" />
                        <el-table-column prop="reply" label="理由" width="180" />
                        <el-table-column prop="process_status" label="状态" width="90" />
                        <el-table-column prop="content.biz_lic" label="商业编码" width="180" />
                        <el-table-column prop="content.social_code" label="社会编码" width="180" />
                        <el-table-column prop="created_at" label="创建时间" width="180" />
                        <el-table-column prop="updated_at" label="更新时间" width="180" />
                        <el-table-column fixed="right" label="操作" width="140">
                            <template #default="scope">
                                <el-button type="primary" size="small"
                                    @click="()=>{dialogExamine=true;data.examine_item = scope.row}">审批</el-button>
                                <el-button type="primary" size="small"
                                    @click="getDetailsFunc(scope.row)">详情</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column />
                    </el-table>
                </div>
                <div style="padding-top: 20px;">
                    <el-pagination
                        v-model:current-page="data.pagination.page"
                        layout="total,prev,pager,next,jumper,"
                        :total="data.pagination.total"
                        :page-size="data.pagination.per_page"
                        background
                        hide-on-single-page />
                </div>
            </div>
        </page-main>
        <!-- 审核 -->
        <el-dialog
            v-model="dialogExamine"
            title="审核"
            width="50%">
            <div>
                <el-form
                    ref="ruleFormRef"
                    :model="ruleForm"
                    :rules="rules"
                    label-width="80px">
                    <el-form-item label="审批理由" prop="examine_reply">
                        <el-input
                            v-model="ruleForm.examine_reply"
                            :autosize="{ minRows: 2, maxRows: 10 }"
                            type="textarea"
                            placeholder="请输入相关理由" />
                    </el-form-item>
                    <el-form-item>
                        <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                            <el-button @click="examineFunc(ruleFormRef,'200')">拒绝</el-button>
                            <el-button type="primary" @click="examineFunc(ruleFormRef,'300')">同意</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog
            v-model="dialogDetails"
            title="详情"
            width="50%">
            <div class="details-box">
                <div class="item">
                    <div class="left">名称</div>
                    <div class="right">{{details_item.item.name}}</div>
                </div>
                <div class="item">
                    <div class="left">类型</div>
                    <div class="right">{{details_item.item.type}}</div>
                </div>
                <div class="item">
                    <div class="left">理由</div>
                    <div class="right">{{details_item.item.reply}}</div>
                </div>
                <div class="item">
                    <div class="left">状态</div>
                    <div class="right">{{details_item.item.process_status}}</div>
                </div>
                <div class="item">
                    <div class="left">商业编码</div>
                    <div class="right">{{details_item.item.content.biz_lic}}</div>
                </div>
                <div class="item">
                    <div class="left">社会编码</div>
                    <div class="right">{{details_item.item.content.social_code}}</div>
                </div>
                <div class="item">
                    <div class="left">创建时间</div>
                    <div class="right">{{details_item.item.created_at}}</div>
                </div>
                <div class="item">
                    <div class="left">更新时间</div>
                    <div class="right">{{details_item.item.updated_at}}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogDetails = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
    import {
        reactive,
    } from 'vue'
    let loading = ref(true)
    let search_tips = ref(false)
    const data = reactive({
        search: {
            type: '',
            keyword: '',
            place: []
        },
        table_list: [],
        pagination: {
            total: 150,
            per_page: 15,
            page: 1
        },
        opts: {
            place: []
        },
        // 弹窗数据
        examine_item: {}
    })
    data.opts.place = [{
        value: '0',
        label: 'Guide',
        children: [{
                value: '001',
                label: 'Disciplines'
            },
            {
                value: '002',
                label: '11111'
            }
        ]
    }]
    // 列表
    import {
        APIgetPlatformList,
        APIgetPlatformDetails,
        APIputPlatform,
    } from '@/api/custom/custom.js'
    const getListFunc = () => {
        var params = {
            page: data.pagination.page,
            per_page: data.pagination.per_page
        }
        for (let key in data.search) {
            if (data.search[key]) {
                if (data.search[key] instanceof Array && data.search[key].length <= 0) {
                    continue
                }
                params[key] = data.search[key]
                search_tips.value = true
            }
        }

        loading.value = true
        APIgetPlatformList(params).then(res => {
            if (res.code === 0) {
                loading.value = false
                data.table_list = res.data.items
                data.pagination.total = res.data.aggregation.total_cnt
            }
        })
    }
    // 刷新列表
    const refreshFunc = () => {
        for (let key in data.search) {
            data.search[key] = ''
        }
        data.pagination.page  = 1
        search_tips.value = false
        getListFunc()
    }
    refreshFunc()
    // 同意拒绝 审核弹窗
    let dialogExamine = ref(false)
    // 拒绝同意理由
    let ruleForm = reactive({
        examine_reply: ''
    })
    let ruleFormRef = ref('')
    let rules = reactive({
        examine_reply: [{
            required: true,
            message: '请输入理由！',
            trigger: 'blur'
        }]
    })
    const examineFunc = (formEl, status) => {
        if (!formEl) return
        formEl.validate((valid) => {
            console.log(valid)
            if (valid) {
                let putdata = {
                    process_status: status,
                    reply: ruleForm.examine_reply
                }
                APIputPlatform(data.examine_item.id, putdata).then((res) => {
                    if (!res.code) {
                        ruleForm.examine_reply = ''
                        dialogExamine.value = false
                        refreshFunc()
                    }
                })
            } else {
                console.log('error submit!')
                return false
            }
        })
    }
    // 详情
    let dialogDetails = ref(false)
    let  details_item = reactive({})
    const getDetailsFunc = (val) => {
        APIgetPlatformDetails(val.id).then((res) => {
            if (!res.code) {
                details_item.item = res.data
                dialogDetails.value = true
            }
        })
    }
    // 分页



</script>
<style lang="scss">
    // 不能加 scoped el-cascader样式需要覆盖
    .keep-on-record {
        .el-cascader-box-my {
            .el-cascader {
                width: 100%;
                margin-bottom: 10px;
            }
        }

        .head-btn {
            width: 100%;
            margin-bottom: 10px;
        }
    }

    .search-tips {
        color: #aaaaaa;
        font-size: 14px;
        margin-bottom: 20px;
    }

    .details-box{
        .item{
            display: flex;
            color: #333333;
            font-size: 16px;
            margin-bottom: 20px;
            .left{
                box-sizing: border-box;
                width: 100px;
                white-space: nowrap;
                margin-right: 20px;
                text-align: right;
                font-weight: 600;
            }
            .left::after{
                content: '：';
            }
            .right{
                width: 100%;
                color: #666666;
            }
        }
    }
</style>
