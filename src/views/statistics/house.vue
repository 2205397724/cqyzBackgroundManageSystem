<template>
    <div>
        <page-main style="padding: 0;">
            <div class="tree-box">
                <div class="tree-item">
                    <position-tree tit="选择区域" :data="data.place_list" @myClick="placeClick" @nullClick="placeNullClick" />
                </div>
                <div class="tree-item">
                    <position-tree tit="选择小区" :data="data.house_list" @myClick="houseClick" @nullClick="houseNullClick" />
                </div>
                <div class="tree-details">
                    <div class="tit">
                        <div style="min-width: 80px;">你选择的是：</div>
                        <div
                            v-if="(breadCrumb.house&&breadCrumb.house.length>0)&&(breadCrumb.place&&breadCrumb.place.length>0)"
                            class="breadCrumb"
                        >
                            <span v-for="(item,i) in breadCrumb.place" :key="'breadCrumbPlace'+i">{{ item }}</span>
                            <span v-for="(item,i) in breadCrumb.house" :key="'breadCrumbPlace'+i">{{ item }}</span>
                        </div>
                        <div v-else class="breadCrumb">
                            <span>左边选择“区域”“小区”！</span>
                        </div>
                    </div>
                    <div v-if="!data.nums_arr||!data.nums_arr.length>0" style="color: #909399;font-size: 14px;text-align: center;height: 60px;line-height: 60px;">
                        暂无数据
                    </div>
                    <div class="num-box">
                        <div v-for="(item,i) in data.nums_arr" :key="'nums_arr'+i" class="num-box-item">
                            <div class="box-tit">{{ item.tit }}</div>
                            <div class="flexs">
                                <div v-for="(child,j) in item.data" :key="'nums_arrchild'+j" class="flex-item">
                                    <div class="item-num">{{ child.num }}</div>
                                    <div class="item-tit">{{ child.name }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="houseechart">
                        <div v-for="(item,i) in data.echarts_arr" :key="'houseechart'+i">
                            <my-echarts :data="item" />
                        </div>
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
    echarts_arr: '',
    place_list: '',
    house_list: '',
    nums_arr: ''
})

// 图表
import {
    APIgetEchartsStatistics
} from '@/api/custom/custom.js'
const getEchartsFunc = params => {
    APIgetEchartsStatistics(params).then(res => {
        if (res.code == 0) {
            data.echarts_arr = res.data
        }
    }).catch(error => {
        console.log(error)
    })
}

// 总数统计
import {
    APIgetHouseNums
} from '@/api/custom/custom.js'
const getNumsFunc = params => {
    APIgetHouseNums(params).then(res => {
        if (res.code == 0) {
            data.nums_arr = res.data
        }
    }).catch(error => {
        console.log(error)
    })
}

// 统计数据
import {
    APIgetHousePlace,
    APIgetHouseHouse
} from '@/api/custom/custom.js'
APIgetHousePlace().then(res => {
    if (res.code == 0) {
        data.place_list = res.data
    }
}).catch(error => {
    console.log(error)
})
const getHouseFunc = params => {
    APIgetHouseHouse(params).then(res => {
        if (res.code == 0) {
            data.house_list = res.data
        }
    }).catch(error => {
        console.log(error)
    })
}

const breadCrumb = reactive({
    place: '',
    house: ''
})
const clickData = reactive({
    place: '',
    house: ''
})
const placeClick = res => {
    breadCrumb.place = res.breadCrumb
    clickData.place = res.item
    getHouseFunc({ id: res.item.id })
    houseNullClick()
}
const placeNullClick = () => {
    data.house_list = ''
    breadCrumb.place = ''
    clickData.place = ''
    houseNullClick()
}
const houseClick = res => {
    breadCrumb.house = res.breadCrumb
    clickData.house = res.item
    getNumsFunc({ id: res.item.id })
    getEchartsFunc({ id: res.item.id })
}
const houseNullClick = () => {
    breadCrumb.house = ''
    clickData.house = ''
    data.nums_arr = ''
    data.echarts_arr = ''
}
</script>
<style lang="scss" scoped>
    .tree-box {
        display: flex;

        .tree-item {
            min-width: 200px;
            width: 200px;
        }

        .tree-details {
            flex-grow: 1;

            .tit {
                height: 60px;
                box-sizing: border-box;
                border-bottom: 1px solid rgba(233, 233, 233, 1);
                font-size: 13px;
                color: #999999;
                padding-left: 20px;
                padding-right: 20px;
                box-sizing: border-box;
                display: flex;
                justify-content: left;
                align-items: center;

                span {
                    color: #333333;
                    font-size: 14px;
                }

                span::after {
                    content: '>';
                    display: inline-block;
                    margin: 0 6px;
                }

                span:last-child::after {
                    display: none;
                }
            }

            .num-box {
                padding: 20px;
                box-sizing: border-box;

                .num-box-item {
                    border-bottom: 1px solid rgba(233, 233, 233, 1);
                    box-sizing: border-box;
                    padding-top: 20px;
                    padding-bottom: 20px;

                    .box-tit {
                        box-sizing: border-box;
                        padding-bottom: 40px;
                        color: #999999;
                        font-size: 12px;
                    }

                    .flexs {
                        display: flex;

                        .flex-item {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            align-items: center;

                            .item-num {
                                color: #333333;
                                font-size: 24px;
                            }

                            .item-tit {
                                color: #999999;
                                font-size: 14px;
                            }
                        }
                    }
                }
            }

            .houseechart {
                box-sizing: border-box;
                padding: 20px;
            }
        }
    }

    .num-box {}
</style>
