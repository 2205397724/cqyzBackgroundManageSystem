<template>
    <div class="keep-on-record">
        <page-main style="padding: 0;">
            <div class="tit-box">
                <div class="tit">企业备案</div>
            </div>
            <div class="tit-box">
                <div class="tit">待审备案</div>
            </div>
        </page-main>
        <page-main>
            <div>
                <div>
                    <el-row :gutter="10">
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-cascader v-model="data.search.place"
                                :props="{value:'value',label:'label',children:'children'}"
                                :options="data.search.options" @change="handleChange" size="default" placeholder="地区">
                            </el-cascader>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-select class="head-btn" v-model="data.search.committee" placeholder="业委会" clearable>
                                <el-option label="未成立" :value="0"></el-option>
                                <el-option label="已成立" :value="1"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-select class="head-btn" v-model="data.search.company" placeholder="物业公司" clearable>
                                <el-option label="无" :value="0"></el-option>
                                <el-option label="有" :value="1"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-select class="head-btn" v-model="data.search.type" placeholder="类别" clearable>
                                <el-option label="按ID" :value="0"></el-option>
                                <el-option label="按名称" :value="1"></el-option>
                                <el-option label="按地址" :value="2"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
                            <el-input class="head-btn" v-model="data.search.keyword" placeholder="关键字" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-button class="head-btn" type="primary">搜索</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div>
                    <el-row :gutter="20" class="bottom-btn-box-2">
                        <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                            <el-button class="head-btn" type="primary">添加小区</el-button>
                        </el-col>
                        <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                            <el-button class="head-btn" type="success">更新缓存</el-button>
                        </el-col>
                        <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                            <el-button class="head-btn" type="warning">导出数据</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div style="width: 100%; overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;">
                    <el-table :data="data.table_list"
                        :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                        style="width: 100%">
                        <el-table-column prop="name" label="备案企业" width="220" />
                        <el-table-column prop="residential" label="备案小区" width="180" />
                        <el-table-column prop="time" label="服务时间" width="240" />
                        <el-table-column prop="place" label="物业服务区域" width="240" />
                        <el-table-column prop="contract" label="物业服务合同" width="240" />
                        <el-table-column prop="applicant" label="申请人" width="90" />
                        <el-table-column prop="state" label="状态" width="90" />
                        <!-- <el-table-column fixed="right" label="操作" width="140">
                            <template #default>
                                <el-button type="success" size="small">产权</el-button>
                                <el-button type="primary" size="small">修改</el-button>
                            </template>
                        </el-table-column> -->
                        <el-table-column />
                    </el-table>
                </div>
                <div style="padding-top: 20px;">
                    <el-pagination layout="total,prev,pager,next,jumper," :total="150" :page-size="15" background
                        hide-on-single-page></el-pagination>
                </div>
            </div>
        </page-main>
    </div>
</template>
<script setup>
    import {
        reactive
    } from 'vue'
    const data = reactive({
        search: {
            application: '',
            property: '',
            binding: '',
            type: '',
            keyword: ''
        },
        table_list: ''
    })

    // 表格
    data.table_list = [{
            name: '重庆经典物业管理有限公司',
            residential: '春天花园',
            time: '2021-10-15 至 2024-10-14',
            place: '',
            contract: '',
            applicant: '张三',
            state: 1
        },
        {
            name: '重庆经典物业管理有限公司',
            residential: '春天花园',
            time: '2021-10-15 至 2024-10-14',
            place: '',
            contract: '',
            applicant: '张三',
            state: 1
        },
        {
            name: '重庆经典物业管理有限公司',
            residential: '春天花园',
            time: '2021-10-15 至 2024-10-14',
            place: '',
            contract: '',
            applicant: '张三',
            state: 1
        },
        {
            name: '重庆经典物业管理有限公司',
            residential: '春天花园',
            time: '2021-10-15 至 2024-10-14',
            place: '',
            contract: '',
            applicant: '张三',
            state: 1
        },
        {
            name: '重庆经典物业管理有限公司',
            residential: '春天花园',
            time: '2021-10-15 至 2024-10-14',
            place: '',
            contract: '',
            applicant: '张三',
            state: 1
        },
        {
            name: '重庆经典物业管理有限公司',
            residential: '春天花园',
            time: '2021-10-15 至 2024-10-14',
            place: '',
            contract: '',
            applicant: '张三',
            state: 1
        },
        {
            name: '重庆经典物业管理有限公司',
            residential: '春天花园',
            time: '2021-10-15 至 2024-10-14',
            place: '',
            contract: '',
            applicant: '张三',
            state: 1
        },
        {
            name: '重庆经典物业管理有限公司',
            residential: '春天花园',
            time: '2021-10-15 至 2024-10-14',
            place: '',
            contract: '',
            applicant: '张三',
            state: 1
        },
        {
            name: '重庆经典物业管理有限公司',
            residential: '春天花园',
            time: '2021-10-15 至 2024-10-14',
            place: '',
            contract: '',
            applicant: '张三',
            state: 1
        },
        {
            name: '重庆经典物业管理有限公司',
            residential: '春天花园',
            time: '2021-10-15 至 2024-10-14',
            place: '',
            contract: '',
            applicant: '张三',
            state: 1
        },
        {
            name: '重庆经典物业管理有限公司',
            residential: '春天花园',
            time: '2021-10-15 至 2024-10-14',
            place: '',
            contract: '',
            applicant: '张三',
            state: 1
        },
        {
            name: '重庆经典物业管理有限公司',
            residential: '春天花园',
            time: '2021-10-15 至 2024-10-14',
            place: '',
            contract: '',
            applicant: '张三',
            state: 1
        },
        {
            name: '重庆经典物业管理有限公司',
            residential: '春天花园',
            time: '2021-10-15 至 2024-10-14',
            place: '',
            contract: '',
            applicant: '张三',
            state: 1
        },
        {
            name: '重庆经典物业管理有限公司',
            residential: '春天花园',
            time: '2021-10-15 至 2024-10-14',
            place: '',
            contract: '',
            applicant: '张三',
            state: 1
        },
        {
            name: '重庆经典物业管理有限公司',
            residential: '春天花园',
            time: '2021-10-15 至 2024-10-14',
            place: '',
            contract: '',
            applicant: '张三',
            state: 1
        }
    ]
</script>
<style lang="scss">
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

        .bottom-btn-box-2 {
            margin-bottom: 10px;

            .head-btn {
                width: 100%;
                margin: 10px 0 10px 0;
            }
        }
        
        .tit-box{
            height: 60px;
            line-height: 60px;
        }
    }
</style>
