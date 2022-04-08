<template>
    <div class="residential-box">
        <page-main>
            <div>
                <!-- <el-row :gutter="10">
                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                        <el-cascader
                            v-model="data.search.place" :props="{value:'value',label:'label',children:'children'}"
                            :options="data.search.options" size="default" placeholder="地区" @change="handleChange"
                        />
                    </el-col>
                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                        <el-select v-model="data.search.committee" class="head-btn" placeholder="业委会" clearable>
                            <el-option label="未成立" :value="0" />
                            <el-option label="已成立" :value="1" />
                        </el-select>
                    </el-col>
                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                        <el-select v-model="data.search.company" class="head-btn" placeholder="物业公司" clearable>
                            <el-option label="无" :value="0" />
                            <el-option label="有" :value="1" />
                        </el-select>
                    </el-col>
                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                        <el-select v-model="data.search.type" class="head-btn" placeholder="类别" clearable>
                            <el-option label="按ID" :value="0" />
                            <el-option label="按名称" :value="1" />
                            <el-option label="按地址" :value="2" />
                        </el-select>
                    </el-col>
                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
                        <el-input v-model="data.search.keyword" class="head-btn" placeholder="关键字" clearable />
                    </el-col>
                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                        <el-button class="head-btn" type="primary">搜索</el-button>
                    </el-col>
                </el-row> -->
                <el-row :gutter="20" class="bottom-btn-box-2">
                    <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                        <el-button class="head-btn" type="primary">添加小区</el-button>
                    </el-col>
                    <!-- <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                        <el-button class="head-btn" type="success">更新缓存</el-button>
                    </el-col>
                    <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                        <el-button class="head-btn" type="warning">导出数据</el-button>
                    </el-col> -->
                </el-row>
            </div>
            <div class="list-box">
                <el-row :gutter="20">
                    <el-col v-for="(item,i) in data_tab.arr" :key="''+i" :md="24" :lg="12" :xl="8">
                        <div class="list-item">
                            <div class="tit">{{ item.name }}</div>
                            <div class="address">
                                <div class="arrd arrd1">地址：{{ item.addr }}</div>
                                <div class="arrd arrd2">ID：{{ item.id }}</div>
                            </div>
                            <div class="bottom-btn">
                                <div class="bottom-btn-tit">
                                    <div class="num">{{ item.cnt_building }}</div>
                                    <div class="name">楼栋数</div>
                                </div>
                                <div class="bottom-btn-tit">
                                    <div class="num">{{ item.cnt_live }}</div>
                                    <div class="name">住房总套数</div>
                                </div>
                                <div class="bottom-btn-tit">
                                    <div class="num">{{ item.cnt_support }}</div>
                                    <div class="name">配套用房总套数</div>
                                </div>
                                <div class="bottom-btn-tit">
                                    <div class="num">{{ item.area_floor }}㎡</div>
                                    <div class="name">总占地面积</div>
                                </div>
                                <div class="bottom-btn-tit">
                                    <div class="num">{{ item.area_build }}㎡</div>
                                    <div class="name">总建筑面积</div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
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
    </div>
</template>
<script setup>
import {
    APIgetResidentialListHouse
} from '@/api/custom/custom.js'
import {
    ref,
    reactive,
    watch
} from 'vue'
const data_tab = reactive({
    arr: []
})
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(1)
// 监听分页
watch(page, () => {
    getTabListFunc()
})
// 获取列表
const getTabListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    APIgetResidentialListHouse(params).then(res => {
        if (res.code === 0) {
            data_tab.arr = res.data.items
            total.value = res.data.aggregation.total_cnt
        }
    })
}
getTabListFunc()
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
                    width: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                    box-sizing: border-box;
                    text-overflow: ellipsis;
                    -o-text-overflow:ellipsis;
                }
                .address{
                    color: #999999;
                    font-size: 14px;
                    display: flex;
                    .arrd{
                        flex: 1;
                        white-space: nowrap;
                        overflow: hidden;
                        box-sizing: border-box;
                        text-overflow: ellipsis;
                        -o-text-overflow:ellipsis;
                    }
                    .arrd1{
                        padding-right: 20px;
                    }
                    .arrd2{
                        padding-left: 20px;
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
                        overflow: hidden;
                        box-sizing: border-box;
                        padding: 0 6px;
                        .num{
                            color: #1890FF;
                            width: 100%;
                            text-align: center;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -o-text-overflow:ellipsis;
                        }
                        .name{
                            text-align: center;
                            width: 100%;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -o-text-overflow:ellipsis;
                        }
                    }
                }
            }
        }
    }
</style>
