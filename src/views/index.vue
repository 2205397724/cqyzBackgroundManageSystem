<template>
    <div>
        <page-main>
            <el-row>
                <el-col :xs="24" :sm="24" :lg="18">
                    <el-row>
                        <el-col :xs="24" :sm="24" :lg="4" class="flex-row flex-center">
                            <image-preview :src="VITE_APP_FOLDER_SRC + user_info.avatar" style="border-radius: 50%;height: 90px;width: 90px;" />
                        </el-col>
                        <el-col :xs="24" :sm="24" :lg="18" class="flex-column flex-around">
                            <div class="size-ls strong">
                                欢迎你 {{ user_info.name || user_info.nickname || user_info.username }}
                            </div>
                            <div style="color: #666;font-weight: 400;">
                                <div style="font-size: 14px;">{{ user_info.address }} {{ user_info.department }} {{
                                        user_info.job
                                }}</div>
                                <div style="font-size: 12px;">
                                    手机号码：{{ user_info.mobile }} &nbsp;&nbsp;&nbsp; 最后更新：{{ user_info.updated_at }}
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
        <div class="m-lr-20">
        <el-row :gutter="20" class="icontitbox">
            <el-col :xs="24" :sm="12" :md="6">
                <!-- 小区 -->
                <div v-if="count_data.obj.zone_stat" class="icontitcolbox">
                    <div class="icontit">
                        <div class="img">
                            <svg-icon class="svg" name="u719" />
                            <!-- <svg-icon v-if="i==1" class="svg" name="u726" />
                                <svg-icon v-if="i==2" class="svg" name="u731" />
                                <svg-icon v-if="i==3" class="svg" name="u736" />
                                <svg-icon v-if="i==4" class="svg" name="u741" /> -->
                        </div>
                        <div class="font-grey">小区</div>
                    </div>
                    <div class="item-bottom">
                        <div>
                            总数：<span class="tit">{{ count_data.obj.zone_stat?.z_tot }}</span>
                        </div>
                        <div>
                            今日：<span class="num">{{ count_data.obj.zone_stat?.z_today_cnt }}</span>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
                <!-- 楼栋 -->
                <div v-if="count_data.obj.building_stat" class="icontitcolbox" >
                    <div class="icontit">
                        <div class="img">
                            <svg-icon class="svg" name="u726" />
                            <!-- <svg-icon v-if="i==0" class="svg" name="u719" />
                                <svg-icon v-if="i==1" class="svg" name="u726" />
                                <svg-icon v-if="i==2" class="svg" name="u731" />
                                <svg-icon v-if="i==3" class="svg" name="u736" />
                                <svg-icon v-if="i==4" class="svg" name="u741" /> -->
                        </div>
                        <div class="font-grey">楼栋</div>
                    </div>
                    <div class="item-bottom">
                        <div>
                            总数：<span class="tit">{{ count_data.obj.building_stat?.b_tot }}</span>
                        </div>
                        <div>
                            今日：<span class="num">{{ count_data.obj.building_stat?.b_today_cnt }}</span>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
                <!-- 单元 -->
                <div v-if="count_data.obj.house_stat" class="icontitcolbox">
                    <div class="icontit">
                        <div class="img">
                            <svg-icon class="svg" name="u731" />
                            <!-- <svg-icon v-if="i==0" class="svg" name="u719" />
                                <svg-icon v-if="i==1" class="svg" name="u726" />
                                <svg-icon v-if="i==2" class="svg" name="u731" />
                                <svg-icon v-if="i==3" class="svg" name="u736" />
                                <svg-icon v-if="i==4" class="svg" name="u741" /> -->
                        </div>
                        <div class="font-grey">单元</div>
                    </div>
                    <div class="item-bottom">
                        <div>
                            总数：<span class="tit">{{ count_data.obj.unit_stat?.u_tot }}</span>
                        </div>
                        <div>
                            今日：<span class="num">{{ count_data.obj.unit_stat?.u_today_cnt }}</span>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
                <!-- 房屋 -->
                <div v-if="count_data.obj.house_stat" class="icontitcolbox">
                    <div class="icontit">
                        <div class="img">
                            <svg-icon class="svg" name="u736" />
                            <!-- <svg-icon v-if="i==0" class="svg" name="u719" />
                                <svg-icon v-if="i==1" class="svg" name="u726" />
                                <svg-icon v-if="i==2" class="svg" name="u731" />
                                <svg-icon v-if="i==3" class="svg" name="u736" />
                                <svg-icon v-if="i==4" class="svg" name="u741" /> -->
                        </div>
                        <div class="font-grey">房屋</div>
                    </div>
                    <div class="item-bottom">
                        <div>
                            总数：<span class="tit">{{ count_data.obj.house_stat?.h_tot }}</span>
                        </div>
                        <div>
                            今日：<span class="num">{{ count_data.obj.house_stat?.h_today_cnt }}</span>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        </div>
        <el-row :gutter="20" style="margin: 10px 10px -10px;">
            <!-- 公示 -->
            <el-col :sm="12" :md="12" :lg="8" :xl="8">
                <div class="comStatus" style="margin: 10px 0;">
                    <div class="flex-row flex-between">
                        <div>
                            <router-link style="text-decoration: none;" :to="{name: 'announceIndex'}">
                                <el-link :underline="false" class="size-lg font-primary strong">公示</el-link>
                            </router-link>
                        </div>
                        <div class="size-base font-grey">总数({{ count_data.obj.announce_stat?.a_tot }})</div>
                    </div>
                    <div class="numname p-t-20">
                        <div v-for="(child, j) in count_data.obj.announce_stat?.a_status_cnt" :key="j">
                            <div class="num">{{ child.cnt }}</div>
                            <div v-if="child.status == 1" class="name">审核失败</div>
                            <div v-if="child.status == 2" class="name">未处理</div>
                            <div v-if="child.status == 4" class="name">审核通过</div>
                        </div>
                    </div>
                </div>
            </el-col>
            <!-- 活动 -->
            <el-col v-for="(item, i) in count_data.obj.survey_stat" :key="'eventnum' + i" :sm="12" :md="12" :lg="8"
                :xl="8">
                <div class="comStatus" style="margin: 10px 0;">
                    <div class="flex-row flex-between">
                        <text v-if="item.type == 1">
                            <router-link style="text-decoration: none;" :to="{name: 'surveyIndex'}">
                                <el-link :underline="false" class="size-lg font-primary strong">问卷</el-link>
                            </router-link>
                        </text>
                        <text v-if="item.type == 2">
                            <router-link style="text-decoration: none;" :to="{name: 'electIndex'}">
                                <el-link :underline="false" class="size-lg font-primary strong">选举</el-link>
                            </router-link>
                        </text>
                        <text v-if="item.type == 3">
                            <router-link style="text-decoration: none;" :to="{name: 'voteIndex'}">
                                <el-link :underline="false" class="size-lg font-primary strong">表决</el-link>
                            </router-link>
                        </text>
                        <text v-if="item.type == 4">
                            <router-link style="text-decoration: none;" :to="{name: 'jointlyIndex'}">
                                <el-link :underline="false" class="size-lg font-primary strong">联名</el-link>
                            </router-link>
                        </text>
                        <div class="size-base font-grey">总数({{ item.stat.s_audit_tot }})</div>
                    </div>
                    <div class="numname p-t-20">
                        <div v-for="(child, j) in item.stat.s_audit_status_cnt" :key="j">
                            <div class="num">{{ child.cnt }}</div>
                            <div v-if="child.status == 10" class="name">未处理</div>
                            <div v-if="child.status == 20" class="name">审核通过</div>
                            <div v-if="child.status == 30" class="name">审核失败</div>
                        </div>
                    </div>
                </div>
            </el-col>
            <!-- 设施设备 -->
            <el-col :sm="12" :md="12" :lg="8" :xl="8">
                <div class="comStatus" style="margin: 10px 0;">
                    <div class="flex-row flex-between">
                        <router-link style="text-decoration: none;" :to="{name: 'deviceIndex'}">
                            <el-link :underline="false" class="size-lg font-primary strong">设施设备</el-link>
                        </router-link>
                        <div class="size-base font-grey">总数({{ count_data.obj.device_stat?.d_tot }})</div>
                    </div>
                    <div class="numname p-t-20">
                        <div v-for="(child, j) in count_data.obj.device_stat?.d_status_cnt" :key="j">
                            <div class="num">{{ child.cnt }}</div>
                            <div v-if="child.status == 1" class="name">正常</div>
                            <div v-if="child.status == 2" class="name">故障</div>
                            <div v-if="child.status == 3" class="name">维修中</div>
                        </div>
                    </div>
                </div>
            </el-col>
            <!-- 民生投诉 -->
            <el-col v-for="(item, i) in count_data.obj.complaint_stat" :key="'eventnum' + i" :sm="12" :md="12" :lg="8" :xl="8">
                <div v-if="item.kind == 1" class="comStatus m-tb-10">
                    <div v-if="item.kind == 1" class="flex-row flex-between">
                        <router-link style="text-decoration: none;" :to="{name: 'illegalIndex'}">
                            <el-link :underline="false" class="size-lg font-primary strong">违建</el-link>
                        </router-link>
                        <div class="size-base font-red" v-if="item.stat.c_allot_tot">待审({{ item.stat.c_allot_tot }})</div>
                        <div class="size-base font-grey">总数({{ item.stat.c_tot }})</div>
                    </div>
                    <div class="numname p-t-20">
                        <div v-for="(child, j) in item.stat.c_status_cnt" :key="j">
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
                    <!-- <div class="numname">
                        <div v-for="(child, j) in item.stat.c_allot_status_cnt" :key="j">
                            <div class="num">{{ child.cnt }}</div>
                            <div v-if="child.status == 0" class="name">未审核</div>
                            <div v-if="child.status == 1" class="name">已审核</div>
                        </div>
                    </div> -->
                </div>
                <div v-if="item.kind == 2" class="comStatus m-tb-10" title="投诉">
                    <div v-if="item.kind == 2" class="flex-row flex-between">
                        <router-link style="text-decoration: none;" :to="{name: 'complaintIndex'}">
                            <el-link :underline="false" class="size-lg font-primary strong">投诉</el-link>
                        </router-link>
                        <div class="size-base font-red" v-if="item.stat.c_allot_tot">待审({{ item.stat.c_allot_tot }})</div>
                        <div class="size-base font-grey">总数({{ item.stat.c_tot }})</div>
                    </div>
                    <div class="numname p-t-20">
                        <div v-for="(child, j) in item.stat.c_status_cnt" :key="j">
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
                    <!-- <div class="numname p-t-20">
                        <div v-for="(child, j) in item.stat.c_allot_status_cnt" :key="j">
                            <div class="num">{{ child.cnt }}</div>
                            <div v-if="child.status == 0" class="name">未审核</div>
                            <div v-if="child.status == 1" class="name">已审核</div>
                        </div>
                    </div> -->
                </div>
                <div v-if="item.kind == 3" class="comStatus m-tb-10">
                    <div v-if="item.kind == 3" class="flex-row flex-between">
                        <router-link style="text-decoration: none;" :to="{name: 'repairIndex'}">
                            <el-link :underline="false" class="size-lg font-primary strong">报修</el-link>
                        </router-link>
                        <div class="size-base font-red" v-if="item.stat.c_allot_tot">待审({{ item.stat.c_allot_tot }})</div>
                        <div class="size-base font-grey">总数({{ item.stat.c_tot }})</div>
                    </div>
                    <div class="numname p-t-20">
                        <div v-for="(child, j) in item.stat.c_status_cnt" :key="j">
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
                    <!-- <div class="numname">
                        <div v-for="(child, j) in item.stat.c_allot_status_cnt" :key="j">
                            <div class="num">{{ child.cnt }}</div>
                            <div v-if="child.status == 0" class="name">未审核</div>
                            <div v-if="child.status == 1" class="name">已审核</div>
                        </div>
                    </div> -->
                </div>
            </el-col>
        </el-row>
        <!-- <page-main v-if="data.echarts.length>0" class="picbox">
            <el-row :gutter="20">
                <el-col v-for="(item,i) in data.echarts" :key="'echarts'+i" :sm="24" :md="data.echarts.length==1?24:12" :lg="data.echarts.length==1?24:data.echarts.length==2?12:8">
                    <my-echarts :data="item" />
                </el-col>
            </el-row>
        </page-main> -->
        <page-main v-if="comment_list.arr.length>0">
            <div class="m-b-20">
                <el-button type="primary" @click="modifyCommentStatusList(20)">批量通过</el-button>
                <el-button type="danger" @click="modifyCommentStatusList(30)">批量拒绝</el-button>
            </div>
            <el-table
                :data="comment_list.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                class="tab_1"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="uname" label="评论人"/>
                <el-table-column prop="content" label="评论内容"/>
                <el-table-column prop="ip" label="评论IP"/>
                <el-table-column label="审核操作" width="280">
                    <template #default="scope">
                        <el-button size="small" @click="getCommentDetails(scope.row.id)">
                            详情
                        </el-button>
                        <el-popconfirm
                            title="确定审核通过当前项么?"
                            cancel-button-type="info"
                            @confirm="modifyComment(scope.row.id,20)"
                        >
                            <template #reference>
                                <el-button type="primary" size="small">审核通过</el-button>
                            </template>
                        </el-popconfirm>
                        <el-popconfirm
                            title="确定审核拒绝当前项么?"
                            cancel-button-type="info"
                            @confirm="modifyComment(scope.row.id,30)"
                        >
                            <template #reference>
                                <el-button type="danger" size="small">审核失败</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-model:current-page="page"
                style="text-align: right;"
                layout="prev,next,jumper,"
                :total="Infinity"
                :page-size="per_page"
                background
                prev-text="上一页"
                next-text="下一页"
                hide-on-single-page
            />
        </page-main>
         <!-- 详情 -->
         <el-dialog v-model="commentDetails.switch" title="详情" width="50%" :append-to-body="true">
            <div class="flex-row p-10">
                <div>
                    <el-avatar :size="50" :src="commentDetails.details.uavatar" />
                </div>
                <div class="p-l-10">
                    <div class="flex-row">
                        <span>{{ commentDetails.details.uname }}</span>
                        <span class="p-l-20">用户ID：{{ commentDetails.details.uid }}</span>
                        <el-tag v-if="commentDetails.details.status == 10" type="waring" roung>未审核</el-tag>
                        <el-tag v-if="commentDetails.details.status == 20" type="success" round>已审核</el-tag>
                        <el-tag v-if="commentDetails.details.status == 30" type="danger" round>审核失败</el-tag>
                    </div>
                    <div class="size-base p-tb-10">{{ commentDetails.details.content }}</div>
                    <div class="font-grey size-sm">
                        <span>时间：{{ commentDetails.details.created_at }}</span>
                        <span class="p-l-20">区域：{{ commentDetails.details.loc }}</span>
                        <span class="p-l-20">IP：{{ commentDetails.details.ip }}</span>
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="commentDetails.switch = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import {
    APIgetAggregate,
    APIgetEventnum,
    APIgetEchartsHome,
    APIgetCommentList,
    APIputComment,
    APIgetCommentDetails,
} from '@/api/custom/custom.js'
import { reactive, onMounted, watch } from 'vue'
import PageMain from '@/components/PageMain/index.vue'
import { ElMessage } from 'element-plus'
const VITE_APP_FOLDER_SRC = ref(import.meta.env.VITE_APP_FOLDER_SRC)
const { proxy } = getCurrentInstance()
const user_info = ref(JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_info')))

onMounted(() => {
    getAggregate()
})
const page = ref(1)
const per_page = ref(15)

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
    if (JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_group'))) {
        data.gid = JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_group')).id
    }
    APIgetAggregate(data).then(res => {
        // console.log(res)
        count_data.obj = res
        count_data.arr = res.complaint_stat
    }).catch(error => {
        console.log(error)
    })
}
const comment_list = reactive({
    arr:[]
})
//获取未审评论列表
const getCommentList = () => {
    let data = {
        page: page.value,
        per_page: per_page.value,
        status: 10,//未处理
    }
    APIgetCommentList(data).then(res=>{
        // console.log("comment",res)
        comment_list.arr = res
        let btnNext = document.querySelector('.btn-next')
        if (res.length < per_page.value) {
            btnNext.classList.add('not_allowed')
            btnNext.setAttribute('disabled', true)
            btnNext.setAttribute('aria-disabled', true)
        } else {
            btnNext.classList.remove('not_allowed')
            btnNext.removeAttribute('disabled')
            btnNext.setAttribute('aria-disabled', false)
        }
    })
}
//获取评论详情
const commentDetails = reactive({
    switch: false,
    details: {
        reply:[]
    }
})
const getCommentDetails = id => {
    APIgetCommentDetails(id).then(res => {
        commentDetails.details = res
        commentDetails.details.uavatar = res.uavatar ? import.meta.env.VITE_APP_FOLDER_SRC + res.uavatar : 'https://app.cqyezhuapp.com/appdown/logo.png'
        commentDetails.switch = true
    })
}
// 修改评论（审核评论）
const modifyComment = (id,status) => {
    APIputComment(id, {'status':status}).then(res => {
        ElMessage.success('修改成功')
        getCommentList()
    }).catch(err => {
        ElMessage.error('修改失败')
    })
}
// 批量修改评论（审核通过评论）
const comment_modify_list = reactive({
    arr:[]
})
const modifyCommentStatusList = (status) => {
    comment_modify_list.arr.map(id => {
        console.log(id)
        APIputComment(id, {'status':status}).then(res => {
        })
    })
    getCommentList()
}
const handleSelectionChange = (val) => {
    comment_modify_list.arr = []
    for(let i in val) {
        comment_modify_list.arr.push(val[i].id)
    }
}
watch(page, () => {
    getCommentList()
}, { immediate: true, deep: true })
// APIgetEventnum().then(res => {
//     // console.log(res)
//     data.eventnum = res
// }).catch(error => {
//     console.log(error)
// })
// 图表
// APIgetEchartsHome().then(res => {
//     // console.log(res)
//     data.echarts = res
// }).catch(error => {
//     console.log(error)
// })
</script>

<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
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
    flex-direction: row;
    color: #999;
    font-size: 14px;
    text-align: center;
    >div {
        flex: 1;
        white-space: nowrap;
        .tit {
            font-size: 18px;
            color: #333;
            font-weight: 600;
        }
        .num {
            font-size: 18px;
            color: #ea2929;
            font-weight: 600;
        }
    }
    div {
        margin: 0 10px;
    }
}
.icontitbox {
    display: flex;
    justify-content: space-between;
}
.icontitbox .icontit {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    >.img {
        >.svg {
            width: 40px;
            height: 20px;
            margin: 0 10px;
        }
    }
}
.icontitbox .icontitcolbox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 30px 20px;
}
.icontitbox .icontitcolbox:nth-child(1) .icontit {
    color: #fff;
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
    height: 150px;
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
