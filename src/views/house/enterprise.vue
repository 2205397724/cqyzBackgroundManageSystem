<template>
    <div class="keep-on-record">
        <page-main class="tit-box-box">
            <div class="tit-box" :class="{'on':data.tit_on==0}" @click="data.tit_on=0">
                <div class="tit">
                    <div>企业备案</div>
                    <div v-if="data.tit_tips&&data.tit_tips.record>0" class="tips">{{ data.tit_tips.record }}</div>
                </div>
            </div>
            <div class="tit-box" :class="{'on':data.tit_on==1}" @click="data.tit_on=1">
                <div class="tit">待审备案</div>
                <div v-if="data.tit_tips&&data.tit_tips.pending>0" class="tips">{{ data.tit_tips.pending }}</div>
            </div>
        </page-main>
        <page-main>
            <div>
                <div>
                    <el-row :gutter="10">
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-cascader
                                v-model="data.search.place"
                                :props="{value:'value',label:'label',children:'children'}"
                                :options="data.search.options" size="default" placeholder="地区" @change="handleChange"
                            />
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
                            <el-button class="head-btn" type="primary">搜索</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="data.tit_on==0">
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
                <div :style="data.tit_on!=0?'margin-top:10px':''" style="width: 100%; overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;">
                    <el-table
                        :data="data.table_list"
                        :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                        style="width: 100%"
                    >
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
                    <el-pagination
                        v-model:current-page="data.pagination.current_page"
                        layout="total,prev,pager,next,jumper,"
                        :total="data.pagination.total"
                        :page-size="data.pagination.page_size"
                        background
                        hide-on-single-page
                    />
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
        keyword: '',
        options: ''
    },
    table_list: '',
    tit_on: 0,
    tit_tips: {
        record: 0,
        pending: 3
    },
    pagination: {
        total: 150,
        page_size: 15,
        current_page: 2
    }
})
data.search.options = [{
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
        .tit-box-box{
            display: flex;
            padding: 0;
            .tit-box{
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

                .tips{
                    position: absolute;
                    right: 0;
                    top: 8px;
                    box-sizing: border-box;
                    padding: 0 8px;
                    border-radius: 14px;
                    font-size: 12px;
                    color: #FFFFFF;
                    background-color: #e55055;
                }
            }
            .tit-box.on{
                border-bottom: 2px solid rgba(2, 167, 240, 1);
            }
            .tit-box:last-child{
                margin-right: 0;
            }
        }
    }
</style>
