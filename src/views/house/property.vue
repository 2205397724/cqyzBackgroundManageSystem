<template>
    <div>
        <page-main style="padding: 0;">
            <div class="tree-box">
                <div class="tree-item">
                    <position-tree tit="选择区域" :data="data.place_list" @myClick="placeClick" @nullClick="placeNullClick">
                    </position-tree>
                </div>
                <div class="tree-item">
                    <position-tree tit="选择小区" :data="data.house_list" @myClick="houseClick" @nullClick="houseNullClick">
                    </position-tree>
                </div>
                <div class="tree-details">
                    <div>
                        <el-row :gutter="10">
                            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="3">
                                <el-select class="head-btn" v-model="data.search.application" placeholder="类型"
                                    clearable>
                                    <el-option label="住宅" :value="0"></el-option>
                                    <el-option label="车位" :value="1"></el-option>
                                    <el-option label="商业" :value="2"></el-option>
                                    <el-option label="商服" :value="3"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="3">
                                <el-select class="head-btn" v-model="data.search.property" placeholder="产权" clearable>
                                    <el-option label="无" :value="0"></el-option>
                                    <el-option label="有" :value="1"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="3">
                                <el-select class="head-btn" v-model="data.search.binding" placeholder="绑定" clearable>
                                    <el-option label="未绑" :value="0"></el-option>
                                    <el-option label="已绑" :value="1"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="3">
                                <el-select class="head-btn" v-model="data.search.type" placeholder="类别" clearable>
                                    <el-option label="按姓名" :value="0"></el-option>
                                    <el-option label="按房号" :value="1"></el-option>
                                    <el-option label="按电话" :value="2"></el-option>
                                    <el-option label="按ID" :value="3"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="4">
                                <el-input class="head-btn" v-model="data.search.keyword" placeholder="关键字" clearable />
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="3">
                                <el-button class="head-btn" type="primary">搜索</el-button>
                            </el-col>
                        </el-row>
                    </div>
                    <div>
                        <el-row :gutter="20" class="bottom-btn-box-2">
                            <el-col :xs="12" :sm="8" :md="8" :lg="5" :xl="2">
                                <el-button class="head-btn" type="warning">添加小区</el-button>
                            </el-col>
                            <el-col :xs="12" :sm="8" :md="8" :lg="5" :xl="2">
                                <el-button class="head-btn" type="primary">更新缓存</el-button>
                            </el-col>
                            <el-col :xs="12" :sm="8" :md="8" :lg="5" :xl="2">
                                <el-button class="head-btn" type="success">导出数据</el-button>
                            </el-col>
                        </el-row>
                    </div>
                    <div style="width: 100%; overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;">
                        <el-table :data="data.table_list" :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}" style="width: 100%">
                            <el-table-column prop="id" label="房屋 ID" width="140" />
                            <el-table-column prop="unit" label="单元" width="90" />
                            <el-table-column prop="level" label="楼层" width="90" />
                            <el-table-column prop="room_number" label="房号" width="90" />
                            <el-table-column prop="name" label="名称" width="200" />
                            <el-table-column prop="area" label="面积" width="90" />
                            <el-table-column prop="type" label="类型" width="90" />
                            <el-table-column prop="owner" label="业主" width="90" />
                            <el-table-column prop="user" label="使用人" width="90" />
                            <el-table-column fixed="right" label="操作" width="140">
                                <template #default>
                                    <el-button type="success" size="small">产权</el-button>
                                    <el-button type="primary" size="small">修改</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column />
                        </el-table>
                    </div>
                    <div style="padding-top: 20px;">
                        <el-pagination
                        layout="total,prev,pager,next,jumper,"
                        :total="150"
                        :page-size="15"
                        background
                        hide-on-single-page
                        ></el-pagination>
                    </div>
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
        place_list: '',
        house_list: '',
        search: {
            application: '',
            property: '',
            binding: '',
            type: '',
            keyword: ''
        },
        table_list: ''
    })

    // 区域
    import {
        APIgetHousePlace,
        APIgetHouseHouse
    } from '@/api/custom/custom.js'
    APIgetHousePlace().then(res => {
        if (res.status == 1) {
            data.place_list = res.data
        }
    }).catch(error => {
        console.log(error)
    })
    const getHouseFunc = (params) => {
        APIgetHouseHouse(params).then(res => {
            if (res.status == 1) {
                data.house_list = res.data
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const clickData = reactive({
        place: '',
        house: ''
    })
    const placeClick = (res) => {
        clickData.place = res.item
        getHouseFunc({
            id: res.item.id
        })
        houseNullClick()
    }
    const placeNullClick = () => {
        data.house_list = ''
        clickData.place = ''
        houseNullClick()
    }
    const houseClick = (res) => {
        clickData.house = res.item
    }
    const houseNullClick = () => {
        clickData.house = ''
    }

    // 表格
    data.table_list = [{
            id: 564124561231,
            unit: '吞吞吐吐',
            level: 6,
            room_number: 1001,
            name: '鸿鸥·未来城A栋6层1# ',
            area: 110.26,
            type: '住宅',
            owner: '张三',
            user: '李四'
        },
        {
            id: 564124561231,
            unit: 1,
            level: 6,
            room_number: 1001,
            name: '鸿鸥·未来城A栋6层1# ',
            area: 110.26,
            type: '住宅',
            owner: '张三',
            user: '李四'
        },
        {
            id: 564124561231,
            unit: 1,
            level: 6,
            room_number: 1001,
            name: '鸿鸥·未来城A栋6层1# ',
            area: 110.26,
            type: '住宅',
            owner: '张三',
            user: '李四'
        },
        {
            id: 564124561231,
            unit: 1,
            level: 6,
            room_number: 1001,
            name: '鸿鸥·未来城A栋6层1# ',
            area: 110.26,
            type: '住宅',
            owner: '张三',
            user: '李四'
        },
        {
            id: 564124561231,
            unit: 1,
            level: 6,
            room_number: 1001,
            name: '鸿鸥·未来城A栋6层1# ',
            area: 110.26,
            type: '住宅',
            owner: '张三',
            user: '李四'
        },
        ,
        {
            id: 564124561231,
            unit: 1,
            level: 6,
            room_number: 1001,
            name: '鸿鸥·未来城A栋6层1# ',
            area: 110.26,
            type: '住宅',
            owner: '张三',
            user: '李四'
        },
        ,
        {
            id: 564124561231,
            unit: 1,
            level: 6,
            room_number: 1001,
            name: '鸿鸥·未来城A栋6层1# ',
            area: 110.26,
            type: '住宅',
            owner: '张三',
            user: '李四'
        },
        ,
        {
            id: 564124561231,
            unit: 1,
            level: 6,
            room_number: 1001,
            name: '鸿鸥·未来城A栋6层1# ',
            area: 110.26,
            type: '住宅',
            owner: '张三',
            user: '李四'
        },
        ,
        {
            id: 564124561231,
            unit: 1,
            level: 6,
            room_number: 1001,
            name: '鸿鸥·未来城A栋6层1# ',
            area: 110.26,
            type: '住宅',
            owner: '张三',
            user: '李四'
        },
        ,
        {
            id: 564124561231,
            unit: 1,
            level: 6,
            room_number: 1001,
            name: '鸿鸥·未来城A栋6层1# ',
            area: 110.26,
            type: '住宅',
            owner: '张三',
            user: '李四'
        },
        ,
        {
            id: 564124561231,
            unit: 1,
            level: 6,
            room_number: 1001,
            name: '鸿鸥·未来城A栋6层1# ',
            area: 110.26,
            type: '住宅',
            owner: '张三',
            user: '李四'
        },
        ,
        {
            id: 564124561231,
            unit: 1,
            level: 6,
            room_number: 1001,
            name: '鸿鸥·未来城A栋6层1# ',
            area: 110.26,
            type: '住宅',
            owner: '张三',
            user: '李四'
        },
        ,
        {
            id: 564124561231,
            unit: 1,
            level: 6,
            room_number: 1001,
            name: '鸿鸥·未来城A栋6层1# ',
            area: 110.26,
            type: '住宅',
            owner: '张三',
            user: '李四'
        },
        ,
        {
            id: 564124561231,
            unit: 1,
            level: 6,
            room_number: 1001,
            name: '鸿鸥·未来城A栋6层1# ',
            area: 110.26,
            type: '住宅',
            owner: '张三',
            user: '李四'
        },
        ,
        {
            id: 564124561231,
            unit: 1,
            level: 6,
            room_number: 1001,
            name: '鸿鸥·未来城A栋6层1# ',
            area: 110.26,
            type: '住宅',
            owner: '张三',
            user: '李四'
        }
    ]
</script>
<style lang="scss" scoped>
    .tree-box {
        display: flex;

        .tree-item {
            min-width: 200px;
            width: 200px;
        }

        .tree-details {
            padding: 20px;
            flex-grow: 1;
            max-width: calc(100% - 400px);
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
        }
    }
</style>
