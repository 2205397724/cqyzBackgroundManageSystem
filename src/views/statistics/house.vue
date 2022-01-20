<template>
    <div>
        <page-main style="padding: 0;">
            <div class="tree-box">
                <div class="tree-item">
                    <position-tree :data="place_list" @myClick="placeClick" @nullClick="placeNullClick"></position-tree>
                </div>
                <div class="tree-item">
                    <position-tree :data="house_list" @myClick="houseClick" @nullClick="houseNullClick"></position-tree>
                </div>
                <div class="tree-details">
                    <div class="tit">
                        <div style="min-width: 80px;">你选择的是：</div>
                        <div class="breadCrumb" v-if="(BreadCrumb.house&&BreadCrumb.house.length>0)&&(BreadCrumb.place&&BreadCrumb.place.length>0)">
                            <span v-for="(item,i) in BreadCrumb.place" :key="'BreadCrumbPlace'+i">{{item}}</span>
                            <span v-for="(item,i) in BreadCrumb.house" :key="'BreadCrumbPlace'+i">{{item}}</span>
                        </div>
                        <div class="breadCrumb" v-else>
                            <span>左边选择“区域”“小区”！</span>
                        </div>
                    </div>
                    <div class="num-box">
                        <div class="num-box-item" v-for="i in 2">
                            <div class="box-tit">数量统计：</div>
                            <div class="flexs">
                                <div class="flex-item" v-for="j in 2">
                                    <div class="item-num">26</div>
                                    <div class="item-tit">小区总数</div>
                                </div>
                            </div>
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
    const place_list = reactive({
        tit: '选择区域',
        default_expanded: ['50', '5001'],
        data: [{
                id: '50',
                label: '重庆市',
                children: [{
                    id: '5001',
                    label: '万州区',
                }, ],
            }
        ]
    })
    const house_list = reactive({
        tit: '选择小区',
        default_expanded: ['50', '5001'],
        data: [
            {
                id: '30',
                label: '安徽省',
            }
        ]
    })
    const BreadCrumb = reactive({place:'',house:''})
    const clickData = reactive({place:'',house:''})
    const placeClick = (data)=>{
        BreadCrumb.place = data.breadCrumb
        clickData.place = data.item
        placeNullClick()
        house_list.data = [{
                id: '30',
                label: '安徽省',
            }]
    }
    const houseClick = (data)=>{
        BreadCrumb.house = data.breadCrumb
        clickData.house = data.item
    }
    const placeNullClick = (data)=>{
        house_list.data = []
        houseNullClick()
    }
    const houseNullClick = (data)=>{

    }

</script>
<style lang="scss" scoped>
    .tree-box{
        display: flex;
        .tree-item{
            min-width: 200px;
            width: 200px;
        }
        .tree-details{
            flex-grow: 1;
            .tit{
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
                span{
                    color: #333333;
                    font-size: 14px;
                }
                span::after{
                    content: '>';
                    display: inline-block;
                    margin: 0 6px;
                }
                span:last-child::after{
                    display: none;
                }
            }

            .num-box{
                padding: 20px;
                box-sizing: border-box;
                .num-box-item{
                    .box-tit{
                        border-bottom: 1px solid rgba(233, 233, 233, 1);
                        box-sizing: border-box;
                    }
                    .flexs{
                        .flex-item{
                            .item-num{

                            }
                            .item-tit{

                            }
                        }
                    }
                }
            }
        }
    }
    .num-box{

    }
</style>
