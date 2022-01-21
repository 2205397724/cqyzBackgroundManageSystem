<template>
    <div class="residential-box">
        <page-main>
            <div>
                <el-row :gutter="10">
                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                        <el-cascader v-model="data.search.place" :props="{value:'value',label:'label',children:'children'}"
                            :options="data.search.options" @change="handleChange" size="default" placeholder="地区"></el-cascader>
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
                <el-row :gutter="20" class="bottom-btn-box-2">
                    <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                        <el-button class="head-btn" type="primary">添加小区</el-button>
                    </el-col>
                    <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                        <el-button class="head-btn" type="success">跟新缓存</el-button>
                    </el-col>
                    <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                        <el-button class="head-btn" type="warning">导出数据</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="list-box">
                <el-row :gutter="20">
                    <el-col :md="24" :lg="12" :xl="8" v-for="(item,i) in 12" :key="''+i">
                        <div class="list-item">
                            <div class="tit">春天花园</div>
                            <div class="address">
                                <div>地址：万州区乌龙池123号</div>
                                <div>ID：123454512</div>
                            </div>
                            <div class="bottom-btn">
                                <div class="bottom-btn-tit" v-for="i in 6">
                                    <div class="num">2222</div>
                                    <div class="name">物业公司</div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div style="padding-top: 20px;">
                    <el-pagination
                    layout="total,prev,pager,next,jumper,"
                    :total="150"
                    :page-size="12"
                    background
                    hide-on-single-page
                    ></el-pagination>
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
            place: '',
            options: '',
            type: '',
            committee: '',
            company: '',
            keyword:''
        },
        house_list: ''
    })
    data.search.value = ['0', '002']
    data.search.options = [{
        value: '0',
        label: 'Guide',
        children: [{
                value: '001',
                label: 'Disciplines',
            },
            {
                value: '002',
                label: '11111',
            }
        ]
    }]

    const handleChange = (val) => {
        // console.log(val)
    }
</script>
<style lang="scss">
    .residential-box{
        .el-cascader-box-my{
            .el-cascader{
                width: 100%;
                margin-bottom: 10px;
            }
        }
        .head-btn{
            width: 100%;
            margin-bottom: 10px;
        }
        .bottom-btn-box-2{
            .head-btn{
                width: 100%;
                margin: 10px 0 20px 0;
            }
        }
        .list-box{
            .list-item{
                border: 1px solid rgba(234, 234, 234, 1);
                box-sizing: border-box;
                padding: 20px;
                margin-bottom: 20px;
                .tit{
                    color: #333333;
                    font-size: 18px;
                    padding-bottom: 6px;
                    box-sizing: border-box;
                }
                .address{
                    color: #999999;
                    font-size: 14px;
                    display: flex;
                    flex-wrap: wrap;
                    >div{
                        flex: 16;
                        white-space: nowrap;
                    }
                    >div:last-child{
                        flex: 8;
                    }
                }
                .bottom-btn{
                    box-sizing: border-box;
                    padding-top: 14px;
                    display: flex;
                    .bottom-btn-tit{
                        font-size: 14px;
                        color: #999999;
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        max-width: 20%;
                        .num{
                            color: #1890FF;
                        }
                        .name{
                        }
                    }
                }
            }
        }
    }
</style>
