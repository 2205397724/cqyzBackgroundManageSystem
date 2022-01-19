<template>
    <div>
        <page-main>
            <el-row>
                <el-col :xs="24" :sm="24" :lg="18">
                    <el-row>
                        <el-col :xs="24" :sm="24" :lg="4"
                            style="display: flex;justify-content: center;align-items: center;box-sizing: border-box;padding-right: 20px;min-width: 135px;">
                            <image-preview src="http://www.baidu.com" width="90px" height="90px"
                                style="border-radius: 50%;" />
                        </el-col>
                        <el-col :xs="24" :sm="24" :lg="18"
                            style="display: flex;flex-direction: column;justify-content:space-between;">
                            <div style="color: #333333;font-weight: 650;font-size: 24px;">欢迎你 李先生</div>
                            <div style="color: #666666;font-weight: 400;">
                                <div style="font-size: 14px;">重庆市万州区 运营部 管理员</div>
                                <div style="font-size: 12px;">手机号码：158****6584 最后登录：2021-12-21 11:26:45
                                    登录IP：121.123.43.54</div>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="6" style="display: flex;justify-content: flex-end;align-items: center;">
                    <el-button circle>
                        <svg-icon name="chat" />
                    </el-button>
                    <el-button circle>
                        <svg-icon name="phone" />
                    </el-button>
                    <el-button circle>
                        <svg-icon name="key" />
                    </el-button>
                </el-col>
            </el-row>
        </page-main>
        <el-row :gutter="20" style="margin: -10px 10px;" class="icontitbox">
            <el-col class="icontitcolbox" :sm="12" :md="8" :lg="6" :xl="{span:'4-8'}" v-for="(iten,i) in 5">
                <page-main style="margin: 10px 0;">
                    <div class="icontit">
                        <div class="img">
                            <svg-icon v-if="i==0" class="svg" name="u719" />
                            <svg-icon v-if="i==1" class="svg" name="u726" />
                            <svg-icon v-if="i==2" class="svg" name="u731" />
                            <svg-icon v-if="i==3" class="svg" name="u736" />
                            <svg-icon v-if="i==4" class="svg" name="u741" />
                        </div>
                        <div>用户</div>
                    </div>
                    <div class="item-bottom">
                        <div>
                            总数：<span class="tit">547142</span>
                        </div>
                        <div>
                            今日：<span class="num">457</span>
                        </div>
                    </div>
                </page-main>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin: 10px 10px -10px 10px;">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" v-for="i in 3">
                <page-main style="margin: 10px 0;" title="投诉">
                    <div class="numname">
                        <div v-for="j in 5">
                            <div class="num">56</div>
                            <div class="name">待处理</div>
                        </div>
                    </div>
                </page-main>
            </el-col>
        </el-row>
        <page-main class="picbox">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="18" :lg="10" >
                    <div class="pic-item">
                        <div class="pictit">用户注册统计</div>
                        <div class="pic" id="echart1" style="height: 300px;"></div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="6" :lg="4" >
                    <div class="pic-item">
                        <div class="pictit" >用户实名认证</div>
                        <div class="pic" id="echart2" style="height: 300px;display: flex;justify-content: center;"></div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="10" >
                    <div class="pic-item">
                        <div class="pictit">用户活跃统计</div>
                        <div class="pic" id="echart3" style="height: 300px;"></div>
                    </div>
                </el-col>
            </el-row>
        </page-main>
    </div>
</template>
<script setup>
    import {
        inject,
        onMounted
    } from "vue";
    let echarts = inject("ec");
    onMounted(() => {
        let myChart1 = echarts.init(document.getElementById("echart1"));
        // 绘制图表
        myChart1.setOption({
            title: {
                text: ""
            },
            tooltip: {},
            xAxis: {
                data: ["1", "5", "10", "15", "20", "25", "30"],
            },
            yAxis: {},
            series: [{
                name: "用户量",
                type: "line",
                data: [5, 20, 36, 10, 10, 20, 30],
            }, ],
        });

        let myChart2 = echarts.init(document.getElementById("echart2"),'light');
        // 绘制图表
        myChart2.setOption({
            series: [{
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                data: [{
                        value: 235,
                        name: '已认证'
                    },
                    {
                        value: 374,
                        name: '未认证'
                    }
                ],
                roseType: 'angle'
            }],
        });

        let myChart3 = echarts.init(document.getElementById("echart3"));
        // 绘制图表
        myChart3.setOption({
            title: {
                text: ""
            },
            tooltip: {},
            xAxis: {
                data: ["1", "5", "10", "15", "20", "25", "30"],
            },
            yAxis: {},
            series: [{
                name: "用户量",
                type: "line",
                data: [5, 20, 36, 10, 10, 20, 30],
            }, ],
        });
    });
</script>

<style lang="scss" scoped>
    @media only screen and (min-width: 1700px) {
        .el-col-xl-4-8 {
            max-width: 20%;
        }

        .el-col-xl-offset-4-8 {
            margin-left: 20%;
        }

        .el-col-xl-pull-4-8 {
            position: relative;
            right: 20%;
        }

        .el-col-xl-push-4-8 {
            position: relative;
            left: 20%;
        }
    }

    .list-icon {
        display: inline-block;
        margin: 10px;

        i {
            font-size: 32px;
            color: #606266;
        }
    }

    .item-bottom {
        display: flex;
        color: #999999;
        font-size: 14px;

        >div {
            flex: 1;
            white-space: nowrap;

            .tit {
                font-size: 18px;
                color: #333333;
            }

            .num {
                font-size: 18px;
                color: #EA2929;
            }
        }
    }

    .icontitbox .icontit {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;

        >.img {
            >.svg {
                width: 40px;
                height: 20px;
                margin: 0 10px;
            }
        }
    }

    .icontitbox .icontitcolbox:nth-child(1) .icontit {
        color: #42C493;
    }

    .icontitbox .icontitcolbox:nth-child(2) .icontit {
        color: #48B9FD;
    }

    .icontitbox .icontitcolbox:nth-child(3) .icontit {
        color: #5CCED4;
    }

    .icontitbox .icontitcolbox:nth-child(4) .icontit {
        color: #BF5CD4;
    }

    .icontitbox .icontitcolbox:nth-child(5) .icontit {
        color: #D79A25;
    }

    .numname {
        display: flex;
        justify-content: space-between;

        >div {
            text-align: center;
        }

        >div:nth-child(1) .num {
            color: #E88301;
        }

        >div:nth-child(2) .num {
            color: #48B9FD;
        }

        >div:nth-child(3) .num {
            color: #42C493;
        }

        >div:nth-child(4) .num {
            color: #48B9FD;
        }

        >div:nth-child(5) .num {
            color: #6C6C6C;
        }

        .num {
            font-size: 22px;
        }

        .name {
            font-size: 14px;
            color: #666666;
        }
    }

    .picbox {
        .pic-item {
            margin-bottom: 20px;

            .pictit {
                font-size: 14px;
                color: #666666;
            }

            .pic {
                // background-color: #F2F2F2;
            }
        }
    }
</style>
