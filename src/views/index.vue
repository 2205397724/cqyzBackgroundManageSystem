<template>
    <div>
        <page-main>
            <el-row>
                <el-col :xs="24" :sm="24" :lg="18">
                    <el-row>
                        <el-col
                            :xs="24" :sm="24" :lg="4"
                            style="display: flex;justify-content: center;align-items: center;box-sizing: border-box;padding-right: 20px;min-width: 135px;"
                        >
                            <image-preview
                                :src="VITE_APP_FOLDER_SRC+user_info.avatar" width="90px" height="90px"
                                style="border-radius: 50%;height: 90px;width: 90px;"
                            />
                        </el-col>
                        <el-col
                            :xs="24" :sm="24" :lg="18"
                            style="display: flex;flex-direction: column;justify-content: space-between;"
                        >
                            <div style="color: #333;font-weight: 650;font-size: 24px;">欢迎你 {{ user_info.name || user_info.nickname || user_info.username }}</div>
                            <div style="color: #666;font-weight: 400;">
                                <div style="font-size: 14px;">{{ user_info.address }} {{ user_info.department }} {{ user_info.job }}</div>
                                <div style="font-size: 12px;">
                                    手机号码：{{ user_info.mobile }} &nbsp;&nbsp;&nbsp; 最后登录：{{ user_info.updated_at }}
                                </div>
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
            <!-- 小区 -->
            <el-col v-if="count_data.obj.zone_stat" class="icontitcolbox" :sm="12" :md="8" :lg="6" :xl="{span:'4-8'}">
                <page-main style="margin: 10px 0;">
                    <div class="icontit">
                        <div class="img">
                            <!-- <svg-icon v-if="i==0" class="svg" name="u719" />
                            <svg-icon v-if="i==1" class="svg" name="u726" />
                            <svg-icon v-if="i==2" class="svg" name="u731" />
                            <svg-icon v-if="i==3" class="svg" name="u736" />
                            <svg-icon v-if="i==4" class="svg" name="u741" /> -->
                        </div>
                        <div>小区</div>
                    </div>
                    <div class="item-bottom">
                        <div>
                            总数：<span class="tit">{{ count_data.obj.zone_stat?.z_tot }}</span>
                        </div>
                        <div>
                            今日：<span class="num">{{ count_data.obj.zone_stat?.z_today_cnt }}</span>
                        </div>
                    </div>
                </page-main>
            </el-col>
            <!-- 楼栋 -->
            <el-col v-if="count_data.obj.building_stat" class="icontitcolbox" :sm="12" :md="8" :lg="6" :xl="{span:'4-8'}">
                <page-main style="margin: 10px 0;">
                    <div class="icontit">
                        <div class="img">
                            <!-- <svg-icon v-if="i==0" class="svg" name="u719" />
                            <svg-icon v-if="i==1" class="svg" name="u726" />
                            <svg-icon v-if="i==2" class="svg" name="u731" />
                            <svg-icon v-if="i==3" class="svg" name="u736" />
                            <svg-icon v-if="i==4" class="svg" name="u741" /> -->
                        </div>
                        <div>楼栋</div>
                    </div>
                    <div class="item-bottom">
                        <div>
                            总数：<span class="tit">{{ count_data.obj.building_stat?.b_tot }}</span>
                        </div>
                        <div>
                            今日：<span class="num">{{ count_data.obj.building_stat?.b_today_cnt }}</span>
                        </div>
                    </div>
                </page-main>
            </el-col>
            <!-- 单元 -->
            <el-col v-if="count_data.obj.house_stat" class="icontitcolbox" :sm="12" :md="8" :lg="6" :xl="{span:'4-8'}">
                <page-main style="margin: 10px 0;">
                    <div class="icontit">
                        <div class="img">
                            <!-- <svg-icon v-if="i==0" class="svg" name="u719" />
                            <svg-icon v-if="i==1" class="svg" name="u726" />
                            <svg-icon v-if="i==2" class="svg" name="u731" />
                            <svg-icon v-if="i==3" class="svg" name="u736" />
                            <svg-icon v-if="i==4" class="svg" name="u741" /> -->
                        </div>
                        <div>单元</div>
                    </div>
                    <div class="item-bottom">
                        <div>
                            总数：<span class="tit">{{ count_data.obj.unit_stat?.u_tot }}</span>
                        </div>
                        <div>
                            今日：<span class="num">{{ count_data.obj.unit_stat?.u_today_cnt }}</span>
                        </div>
                    </div>
                </page-main>
            </el-col>
            <!-- 房屋 -->
            <el-col v-if="count_data.obj.house_stat" class="icontitcolbox" :sm="12" :md="8" :lg="6" :xl="{span:'4-8'}">
                <page-main style="margin: 10px 0;">
                    <div class="icontit">
                        <div class="img">
                            <!-- <svg-icon v-if="i==0" class="svg" name="u719" />
                            <svg-icon v-if="i==1" class="svg" name="u726" />
                            <svg-icon v-if="i==2" class="svg" name="u731" />
                            <svg-icon v-if="i==3" class="svg" name="u736" />
                            <svg-icon v-if="i==4" class="svg" name="u741" /> -->
                        </div>
                        <div>房屋</div>
                    </div>
                    <div class="item-bottom">
                        <div>
                            总数：<span class="tit">{{ count_data.obj.house_stat?.h_tot }}</span>
                        </div>
                        <div>
                            今日：<span class="num">{{ count_data.obj.house_stat?.h_today_cnt }}</span>
                        </div>
                    </div>
                </page-main>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin: 10px 10px -10px;">
            <el-col v-for="(item,i) in count_data.obj.complaint_stat" :key="'eventnum'+i" :sm="12" :md="12" :lg="8" :xl="8">
                <div v-if="item.kind == 1" class="comStatus" style="margin: 10px 0;">
                    <div v-if="item.kind == 1" class="title-container">违建</div>
                    <div class="title-container-1 size-base">状态({{ item.stat.c_tot }})</div>
                    <div class="numname">
                        <div v-for="(child,j) in item.stat.c_status_cnt" :key="j">
                            <div class="num">{{ child.cnt }}</div>
                            <div v-if="child.status == 0" class="name">未处理</div>
                            <div v-if="child.status == 1" class="name">已审核</div>
                            <div v-if="child.status == 2" class="name">已确认</div>
                            <div v-if="child.status == 3" class="name">已受理</div>
                            <div v-if="child.status == 5" class="name">已转办</div>
                            <div v-if="child.status == 6" class="name">已回复</div>
                            <div v-if="child.status == 7" class="name">已办完</div>
                            <div v-if="child.status == 8" class="name">已追问</div>
                            <div v-if="child.status == 99" class="name">已结案</div>
                        </div>
                    </div>
                    <div class="title-container-1 size-base" style="margin-top: 10px;">审核状态({{ item.stat.c_allot_tot }})</div>
                    <div class="numname">
                        <div v-for="(child,j) in item.stat.c_allot_status_cnt" :key="j">
                            <div class="num">{{ child.cnt }}</div>
                            <div v-if="child.status == 0" class="name">未审核</div>
                            <div v-if="child.status == 1" class="name">已审核</div>
                        </div>
                    </div>
                </div>
                <div v-if="item.kind == 2" class="comStatus" style="margin: 10px 0;" title="投诉">
                    <div v-if="item.kind == 2" class="title-container">投诉</div>
                    <div class="title-container-1 size-base">状态({{ item.stat.c_tot }})</div>
                    <div class="numname">
                        <div v-for="(child,j) in item.stat.c_status_cnt" :key="j">
                            <div class="num">{{ child.cnt }}</div>
                            <div v-if="child.status == 0" class="name">未处理</div>
                            <div v-if="child.status == 1" class="name">已审核</div>
                            <div v-if="child.status == 2" class="name">已确认</div>
                            <div v-if="child.status == 3" class="name">已受理</div>
                            <div v-if="child.status == 5" class="name">已转办</div>
                            <div v-if="child.status == 6" class="name">已回复</div>
                            <div v-if="child.status == 7" class="name">已办完</div>
                            <div v-if="child.status == 8" class="name">已追问</div>
                            <div v-if="child.status == 99" class="name">已结案</div>
                        </div>
                    </div>
                    <div class="title-container-1 size-base" style="margin-top: 10px;">审核状态({{ item.stat.c_allot_tot }})</div>
                    <div class="numname">
                        <div v-for="(child,j) in item.stat.c_allot_status_cnt" :key="j">
                            <div class="num">{{ child.cnt }}</div>
                            <div v-if="child.status == 0" class="name">未审核</div>
                            <div v-if="child.status == 1" class="name">已审核</div>
                        </div>
                    </div>
                </div>
                <div v-if="item.kind == 3" class="comStatus" style="margin: 10px 0;">
                    <div v-if="item.kind == 3" class="title-container">报修</div>
                    <div class="title-container-1 size-base">状态({{ item.stat.c_tot }})</div>
                    <div class="numname">
                        <div v-for="(child,j) in item.stat.c_status_cnt" :key="j">
                            <div class="num">{{ child.cnt }}</div>
                            <div v-if="child.status == 0" class="name">未处理</div>
                            <div v-if="child.status == 1" class="name">已审核</div>
                            <div v-if="child.status == 2" class="name">已确认</div>
                            <div v-if="child.status == 3" class="name">已受理</div>
                            <div v-if="child.status == 5" class="name">已转办</div>
                            <div v-if="child.status == 6" class="name">已回复</div>
                            <div v-if="child.status == 7" class="name">已办完</div>
                            <div v-if="child.status == 8" class="name">已追问</div>
                            <div v-if="child.status == 99" class="name">已结案</div>
                        </div>
                    </div>
                    <div class="title-container-1 size-base" style="margin-top: 10px;">审核状态({{ item.stat.c_allot_tot }})</div>
                    <div class="numname">
                        <div v-for="(child,j) in item.stat.c_allot_status_cnt" :key="j">
                            <div class="num">{{ child.cnt }}</div>
                            <div v-if="child.status == 0" class="name">未审核</div>
                            <div v-if="child.status == 1" class="name">已审核</div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <page-main v-if="data.echarts.length>0" class="picbox">
            <el-row :gutter="20">
                <el-col v-for="(item,i) in data.echarts" :key="'echarts'+i" :sm="24" :md="data.echarts.length==1?24:12" :lg="data.echarts.length==1?24:data.echarts.length==2?12:8">
                    <my-echarts :data="item" />
                </el-col>
            </el-row>
        </page-main>
    </div>
</template>
<script setup>
import {
    APIgetAggregate,
    APIgetEventnum,
    APIgetEchartsHome
} from '@/api/custom/custom.js'
import { reactive, onMounted } from 'vue'
import PageMain from '@/components/PageMain/index.vue'
const VITE_APP_FOLDER_SRC = ref(import.meta.env.VITE_APP_FOLDER_SRC)
const { proxy } = getCurrentInstance()

const user_info = ref(JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_info')))

onMounted(() => {

})

// 数据
const data = reactive({
    userinfo: '',
    tipsnum: {
        announce_stat: {},
        building_stat: {},
        complaint_stat: [{
            kind: '',
            stat: {
                c_status_cnt: []
            }
        }],
        device_stat: {},
        house_stat: {
            h_tot: 0,
            h_today_cnt: 0
        },
        survey_stat: [],
        unit_stat: {},
        vein_stat: {},
        zone_stat: {}
    },
    eventnum: '',
    echarts: ''
})
const count_data = reactive({
    obj: {},
    arr: []
})
const getAggregate = () => {
    let data = { module: 'all' }
    if (JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_groupChinaCode'))) {
        data.gid = JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_groupChinaCode')).id
    }
    APIgetAggregate(data).then(res => {
        console.log(res)
        count_data.obj = res
        count_data.arr = res.complaint_stat
        // console.log(data.tipsnum)
    }).catch(error => {
        console.log(error)
    })
}
APIgetEventnum().then(res => {
    // console.log(res)
    data.eventnum = res
}).catch(error => {
    console.log(error)
})
// 图表
APIgetEchartsHome().then(res => {
    // console.log(res)
    data.echarts = res
}).catch(error => {
    console.log(error)
})
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
        color: #999;
        font-size: 14px;
        text-align: center;
        >div {
            flex: 1;
            white-space: nowrap;
            .tit {
                font-size: 18px;
                color: #333;
            }
            .num {
                font-size: 18px;
                color: #ea2929;
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
        color: #42c493;
    }
    .icontitbox .icontitcolbox:nth-child(2) .icontit {
        color: #48b9fd;
    }
    .icontitbox .icontitcolbox:nth-child(3) .icontit {
        color: #5cced4;
    }
    .icontitbox .icontitcolbox:nth-child(4) .icontit {
        color: #bf5cd4;
    }
    .icontitbox .icontitcolbox:nth-child(5) .icontit {
        color: #d79a25;
    }
    .numname {
        display: flex;
        justify-content: space-between;
        >div {
            text-align: center;
        }
        >div:nth-child(1) .num {
            color: #e88301;
        }
        >div:nth-child(2) .num {
            color: #48b9fd;
        }
        >div:nth-child(3) .num {
            color: #42c493;
        }
        >div:nth-child(4) .num {
            color: #48b9fd;
        }
        >div:nth-child(5) .num {
            color: #6c6c6c;
        }
        .num {
            font-size: 22px;
        }
        .name {
            font-size: 12px;
            color: #666;
        }
    }
    .picbox {
        .pic-item {
            margin-bottom: 20px;
            .pictit {
                font-size: 14px;
                color: #666;
            }
            .pic {
                // background-color: #F2F2F2;
            }
        }
    }
    .cityBox {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        .city {
            text-align: center;
            margin-right: 20px;
            height: 50px;
            padding: 15px;
            cursor: pointer;
            border: 1px solid #ccc;
        }
        .city:hover {
            border: none;
            color: #67c23a;
            background-color: #f0f9eb;
        }
        .city:visited {
            border: none;
            color: #67c23a;
            background-color: #f0f9eb;
        }
    }
    .comStatus {
        // width: 450px;
        position: relative;
        padding: 20px;
        background-color: #fff;
    }
    .title-container {
        width: calc(100% + 40px);
        padding: 14px 20px;
        margin-left: -20px;
        margin-top: -20px;
        margin-bottom: 20px;
        // border-bottom: 1px solid #eee;
        font-weight: 700;
    }
    .title-container-1 {
        color: #aaa;
        width: calc(100% + 40px);
        padding: 6px 20px;
        margin-left: -20px;
        margin-top: -20px;
        margin-bottom: 10px;
        // border-bottom: 1px solid #eee;
    }
</style>
