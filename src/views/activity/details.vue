<template>
    <div class="vote">
        <page-main>
            <div class="size-lx ">{{ dataForm.item.name }}</div>
            <p v-if="dataForm.item.desc">
                {{ dataForm.item.desc }}
            </p>
            <div class="m-t-20 m-b-30">
                <!-- <el-button-group> -->
                <el-button type="primary" :icon="Plus" size="large" style="width: 150px;" @click="addActiviesFunc">
                    添加关联活动
                </el-button>
            </div>
            <div style="margin-left: -40px;">
                <el-timeline>
                    <el-timeline-item v-for="(item,index) in activity_tab.arr" :key="index" :timestamp="item.docable.created_at" placement="top" :type="index == 0 ? 'primary':''">
                        <!-- <el-popconfirm
                            title="确定要删除当前项么?" cancel-button-type="info"
                            @confirm="deleteActivityFunc(item)"
                        > -->
                        <!-- <template #reference> -->
                        <!-- <div class="serve-box"> -->
                        <div class="delete-service" @click="deleteActivityFunc_1(item)">
                            <el-icon :size="20" color="#F56C6C">
                                <el-icon-circle-close />
                            </el-icon>
                        </div>
                        <!-- </div> -->
                        <div v-if="item.tgt_type == 'survey'" style="width: 97%;height: 133px;position: absolute;" @click="activitydetailsFunc(item)" />
                        <AnnounceDetails v-if="item.tgt_type == 'announce'" :id="item.docable.id" :name="activeName_1" />

                        <!-- </template> -->
                        <!-- </el-popconfirm> -->
                        <!-- <el-card @click="activitydetailsFunc(item)"> -->
                        <el-card>
                            <div>
                                <div v-if="item.docable.hasOwnProperty('title')" class="size-lg">{{ item.docable.title }}</div>
                                <div class="size-lg" else>{{ item.docable.name }}</div>
                                <div class="m-t-10 m-b-10">
                                    <el-tag v-if="item.tgt_type == 'announce'" round size="large">公示</el-tag>
                                    <el-tag v-if="item.docable.type == 1" round size="large">联名活动</el-tag>
                                    <el-tag v-if="item.docable.type == 2" round size="large">表决活动</el-tag>
                                    <el-tag v-if="item.docable.type == 3" round size="large">选举活动</el-tag>
                                    <el-tag v-if="item.docable.type == 4" round size="large">问卷活动</el-tag>
                                </div>
                                <div v-if="item.docable.hasOwnProperty('uinfo') && item.docable.uinfo">
                                    <span style="color: #b7b1b1;">操作人员: {{ item.docable.uinfo.name ? item.docable.uinfo.name: item.docable.uinfo.nickname ? item.docable.uinfo.nickname : item.docable.uinfo.username }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </page-main>
        <el-dialog
            v-model="switch_list"
            title="添加活动"
            width="70%"
        >
            <div class="search">
                <el-row>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="8" class="search_th">
                                标题名称：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="16">
                                <el-input v-model="data_search.obj.title" class="search_tb" placeholder="标题名称" clearable />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="8" class="search_th">
                                起始时间：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="16">
                                <el-date-picker
                                    v-model="data_search.obj.created_at"
                                    type="date"
                                    value-format="YYYY-MM-DD"
                                    placeholder="起始时间"
                                    class="search_tb"
                                    :default-value="new Date()"
                                />
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="0" :sm="4" :md="3" :lg="2" />
                    <el-col :xs="24" :sm="20" :md="21" :lg="22">
                        <el-button type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                        <el-button
                            v-show="switch_search == true" class="m-l-20 m-r-10" :icon="Loading"
                            @click="refreshFunc_1"
                        >
                            重置
                        </el-button>
                        <span v-show="switch_search == true" class="size-base">
                            *共搜索到{{ total }}条。
                        </span>
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="公示" name="5">
                        <el-scrollbar height="500px">
                            <el-table
                                v-loading="loading_tab"
                                :data="data_announce.arr"
                                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                                class="tab_1 pointer"
                                @row-click="rowClickFunc"
                            >
                                <el-table-column label="公示主题">
                                    <template #default="scope">
                                        <span>{{ scope.row.title }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="公示分类">
                                    <template #default="scope">
                                        <span>{{ getNameFunc(data_1.arr,scope.row.cid) }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="公示区域类型">
                                    <template #default="scope">
                                        <span>{{ getOptVal(opts_all.obj.article_lv,scope.row.totype) }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="发布单位">
                                    <template #default="scope">
                                        <span>{{ getNameFunc(userData.arr,scope.row.groupid) }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="状态">
                                    <template #default="scope">
                                        <el-tag v-show="scope.row.status == 1" class="btnNone" type="primary" effect="dark" size="small">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-tag>
                                        <el-tag v-show="scope.row.status == 2" class="btnNone noDeal" type="warning" effect="dark" size="small">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-tag>
                                        <el-tag v-show="scope.row.status == 3" class="btnNone" type="warning" size="small">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-tag>
                                        <el-tag v-show="scope.row.status == 4" class="btnNone" type="success" size="small">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-tag>
                                        <el-tag v-show="scope.row.status == 5" class="btnNone" type="info" size="small">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-tag>
                                        <el-tag v-show="scope.row.status == 6" class="btnNone" type="info" size="small">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-tag>
                                        <el-tag v-show="scope.row.status == 7" class="btnNone" type="info" size="small">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-tag>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-scrollbar>
                    </el-tab-pane>
                    <el-tab-pane label="联名" name="1">
                        <el-scrollbar height="300px">
                            <el-table
                                v-loading="loading_tab"
                                :data="data_tab.arr"
                                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                                class="tab_1 pointer"
                                @row-click="rowClickFunc"
                            >
                                <el-table-column prop="name" label="标题名称" />
                                <el-table-column label="所在区域">
                                    <template #default="scope">
                                        <span>{{ scope.row.author_cc_name }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="区域类型" width="150">
                                    <template #default="scope">
                                        <span>{{ getOptVal(opts_all.obj.group_user_region_type,scope.row.author_type) }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="起始时间">
                                    <template #default="scope">
                                        <span>{{ scope.row.created_at }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="状态" width="150">
                                    <template #default="scope">
                                        <el-tag v-if="scope.row.status == '1'" size="small" round effect="dark">筹备阶段</el-tag>
                                        <el-tag v-if="scope.row.status == '2'" size="small" type="primary" round effect="dark">待审</el-tag>
                                        <el-tag v-if="scope.row.status == '3'" size="small" type="info" round>未开始</el-tag>
                                        <el-tag v-if="scope.row.status == '4'" size="small" type="success" round>进行中</el-tag>
                                        <el-tag v-if="scope.row.status == '5'" size="small" type="warning" round>暂停</el-tag>
                                        <el-tag v-if="scope.row.status == '6'" size="small" type="warning" round>终止</el-tag>
                                        <el-tag v-if="scope.row.status == '7'" size="small" type="danger">已结束</el-tag>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-scrollbar>
                    </el-tab-pane>
                    <el-tab-pane label="表决" name="2">
                        <el-scrollbar height="300px">
                            <el-table
                                v-loading="loading_tab"
                                :data="data_tab.arr"
                                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                                class="tab_1 pointer"
                                @row-click="rowClickFunc"
                            >
                                <el-table-column prop="name" label="标题名称" />
                                <el-table-column label="所在区域">
                                    <template #default="scope">
                                        <span>{{ scope.row.author_cc_name }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="区域类型" width="150">
                                    <template #default="scope">
                                        <span>{{ getOptVal(opts_all.obj.group_user_region_type,scope.row.author_type) }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="起始时间">
                                    <template #default="scope">
                                        <span>{{ scope.row.created_at }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="状态" width="150">
                                    <template #default="scope">
                                        <el-tag v-if="scope.row.status == '1'" size="small" round effect="dark">筹备阶段</el-tag>
                                        <el-tag v-if="scope.row.status == '2'" size="small" type="primary" round effect="dark">待审</el-tag>
                                        <el-tag v-if="scope.row.status == '3'" size="small" type="info" round>未开始</el-tag>
                                        <el-tag v-if="scope.row.status == '4'" size="small" type="success" round>进行中</el-tag>
                                        <el-tag v-if="scope.row.status == '5'" size="small" type="warning" round>暂停</el-tag>
                                        <el-tag v-if="scope.row.status == '6'" size="small" type="warning" round>终止</el-tag>
                                        <el-tag v-if="scope.row.status == '7'" size="small" type="danger">已结束</el-tag>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-scrollbar>
                    </el-tab-pane>
                    <el-tab-pane label="选举" name="3">
                        <el-scrollbar height="300px">
                            <el-table
                                v-loading="loading_tab"
                                :data="data_tab.arr"
                                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                                class="tab_1 pointer"
                                @row-click="rowClickFunc"
                            >
                                <el-table-column prop="name" label="标题名称" />
                                <el-table-column label="所在区域">
                                    <template #default="scope">
                                        <span>{{ scope.row.author_cc_name }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="区域类型" width="150">
                                    <template #default="scope">
                                        <span>{{ getOptVal(opts_all.obj.group_user_region_type,scope.row.author_type) }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="起始时间">
                                    <template #default="scope">
                                        <span>{{ scope.row.created_at }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="状态" width="150">
                                    <template #default="scope">
                                        <el-tag v-if="scope.row.status == '1'" size="small" round effect="dark">筹备阶段</el-tag>
                                        <el-tag v-if="scope.row.status == '2'" size="small" type="primary" round effect="dark">待审</el-tag>
                                        <el-tag v-if="scope.row.status == '3'" size="small" type="info" round>未开始</el-tag>
                                        <el-tag v-if="scope.row.status == '4'" size="small" type="success" round>进行中</el-tag>
                                        <el-tag v-if="scope.row.status == '5'" size="small" type="warning" round>暂停</el-tag>
                                        <el-tag v-if="scope.row.status == '6'" size="small" type="warning" round>终止</el-tag>
                                        <el-tag v-if="scope.row.status == '7'" size="small" type="danger">已结束</el-tag>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-scrollbar>
                    </el-tab-pane>
                    <el-tab-pane label="问卷" name="4">
                        <el-scrollbar height="300px">
                            <el-table
                                v-loading="loading_tab"
                                :data="data_tab.arr"
                                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                                class="tab_1 pointer"
                                @row-click="rowClickFunc"
                            >
                                <el-table-column prop="name" label="标题名称" />
                                <el-table-column label="所在区域">
                                    <template #default="scope">
                                        <span>{{ scope.row.author_cc_name }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="区域类型" width="150">
                                    <template #default="scope">
                                        <span>{{ getOptVal(opts_all.obj.group_user_region_type,scope.row.author_type) }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="起始时间">
                                    <template #default="scope">
                                        <span>{{ scope.row.created_at }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="状态" width="150">
                                    <template #default="scope">
                                        <el-tag v-if="scope.row.status == '1'" size="small" round effect="dark">筹备阶段</el-tag>
                                        <el-tag v-if="scope.row.status == '2'" size="small" type="primary" round effect="dark">待审</el-tag>
                                        <el-tag v-if="scope.row.status == '3'" size="small" type="info" round>未开始</el-tag>
                                        <el-tag v-if="scope.row.status == '4'" size="small" type="success" round>进行中</el-tag>
                                        <el-tag v-if="scope.row.status == '5'" size="small" type="warning" round>暂停</el-tag>
                                        <el-tag v-if="scope.row.status == '6'" size="small" type="warning" round>终止</el-tag>
                                        <el-tag v-if="scope.row.status == '7'" size="small" type="danger">已结束</el-tag>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-scrollbar>
                    </el-tab-pane>
                </el-tabs>
            </div>
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
        </el-dialog>
        <el-dialog
            v-model="switch_sure"
            title="确认"
            width="30%"
        >
            <div>
                <!-- <img src="../../assets/images/xth.png"/> -->
                是否确认添加 <span class="ac_name"> "{{ currentActivity.item.title?currentActivity.item.title:currentActivity.item.name }}"</span> 活动！
            </div>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_sure=false">取消</el-button>
                    <el-button type="primary" @click="clickFuncAddVote">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog
            v-model="switch_deleteSure"
            title="确认"
            width="30%"
        >
            <div>
                <!-- <img src="../../assets/images/xth.png"/> -->
                是否确认删除当前项？
            </div>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_deleteSure=false">取消</el-button>
                    <el-button type="primary" @click="deleteActivityFunc">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog v-model="switch_survey" :title="data_details_1.item.name" width="80%" destroy-on-close="true">
            <Detail :id="data_details_1.item.id" />
            <template #footer>
                <el-button type="warning" plain @click="switch_survey = false">取消</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.query.id)
// console.log(route.params)
import {
    reactive,
    ref,
    watch,
    computed
} from 'vue'
import {
    ElMessage
} from 'element-plus'
import { Loading, Search, Plus } from '@element-plus/icons-vue'
/* ----------------------------------------------------------------------------------------------------------------------- */
import {
    APIgetActivityEventDetails,
    APIgetCommentList,
    // APIpostComment,
    APIgetCommentDetails,
    APIputComplaint
    // APIpostComplaint
} from '@/api/custom/custom.js'
const page = ref(1)
const total = ref(0)
const per_page = ref(15)
const dataForm = reactive({
    item: {}
})
const data_announce = reactive({
    arr: []
})
const activeName_1 = ref('活动')
const data_tab = reactive({
    arr: []
})
const activity_tab = reactive({
    arr: [{
        docable: {
            uinfo: {
                name: ''
            }
        }
    }]
})
const switch_list = ref(false)
const activeName = ref('5')
const data_search = reactive({
    obj: {}
})
const switch_sure = ref(false)
const loading_tab = ref(false)
const currentActivity = reactive({
    item: {}
})
// 详情
APIgetActivityEventDetails(route.query.id).then(res => {
    console.log(res)
    dataForm.item = res
})
// 搜索
const switch_search = ref(false)
const searchFunc = () => {
    switch_search.value = true
    data_search.obj.name = name
    // if (activeName.value == '5') {
    getTabListFunc()
    // } else {
    getSurveyListFunc(activeName.value)
    getUserGroupList()
    getAnnounceType()
    // }
}
// :disabled="activeName !== '5' ? true : false"
// 刷新
const refreshFunc = () => {
    getActivitiesEventList()
}
const refreshFunc_1 = () => {
    getTabListFunc()
    getSurveyListFunc(activeName.value)
    data_search.obj = {}
    switch_search.value = false
    getUserGroupList()
    getAnnounceType()
}
import {
    APIgetSurvey,
    APIgetEventArticleList,
    APIgetActivitiesEventList,
    APIpostActivitiesEvent,
    APIdeleteActivitiesEvent } from '@/api/custom/custom.js'
const getActivitiesEventList = () => {
    APIgetActivitiesEventList(route.query.id).then(res => {
        console.log(res)
        activity_tab.arr = res
    })
}
// 获取列表
const getTabListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    for (let key in data_search.obj) {
        if (data_search.obj[key] || data_search.obj[key] === 0) {
            if (data_search.obj[key] instanceof Array && data_search.obj[key].length <= 0) {
                continue
            }
            params[key] = data_search.obj[key]
        }
    }
    loading_tab.value = true
    APIgetEventArticleList(params).then(res => {
        console.log(res)
        loading_tab.value = false
        data_announce.arr = res
        total.value = res.length
    })
}
const getSurveyListFunc = val => {
    if (val !== '5') {
        console.log('成功')
        let params_1 = {
            page: page.value,
            per_page: per_page.value,
            type: parseInt(val)
        }
        for (let key in data_search.obj) {
            if (data_search.obj[key] || data_search.obj[key] === 0) {
                if (data_search.obj[key] instanceof Array && data_search.obj[key].length <= 0) {
                    continue
                }
                params_1[key] = data_search.obj[key]
            }
        }
        loading_tab.value = true
        APIgetSurvey(params_1).then(res => {
            console.log(res)
            if (res.status === 200) {
                loading_tab.value = false
                data_tab.arr = res.data
                total.value = res.data.length
            }
        })
    }
}
const handleClick = () => {
    console.log(activeName.value)
    getSurveyListFunc(activeName.value)
}
const name = computed(() => {
    return data_search.obj.title
})
// 添加活动
const addActiviesFunc = () => {
    switch_list.value = true
    activeName.value = '5'
    data_search.obj = {}
    getTabListFunc()
    getSurveyListFunc(activeName.value)
    getUserGroupList()
    getAnnounceType()
    switch_search.value = false
}
const rowClickFunc = row => {
    console.log(row)
    currentActivity.item = row
    switch_sure.value = true
}
const getNameFunc = (arr, key) => {
    for (let i in arr) {
        if (arr[i].id == key) {
            return arr[i].name
        }
    }
}
// 获取类别名称
let data_1 = reactive({
    arr: []
})
import {
    APIgetTypeList
} from '@/api/custom/custom.js'
// 获取公式列表api请求
const main_type = ref('announce')
const getAnnounceType = () => {
    APIgetTypeList(main_type.value).then(res => {
        console.log(res)
        data_1.arr = res
    })
}
// 选择用户组name
const userData = reactive({
    arr: []
})
import {
    APIgetGroupList
} from '@/api/custom/custom.js'
const getUserGroupList = () => {
    APIgetGroupList().then(res => {
        if (res.status == 200) {
            console.log(res)
            loading_tab.value = false
            userData.arr = res.data
        }
    })
}
// 确认添加
const clickFuncAddVote = () => {
    let data = {
        tgt_id: currentActivity.item.id,
        tgt_type: ''
    }
    if (activeName.value == '5') {
        data.tgt_type = 'announce'
        APIpostActivitiesEvent(route.query.id, data).then(() => {
            getActivitiesEventList()
            switch_sure.value = false
            ElMessage.success('添加成功')
        }).catch(() => {
            ElMessage.error('添加失败')
        })
        activity_tab.created_at = currentActivity.item.created_at
    } else {
        data.tgt_type = 'survey'
        APIpostActivitiesEvent(route.query.id, data).then(() => {
            getActivitiesEventList()
            switch_sure.value = false
            ElMessage.success('添加成功')
        }).catch(() => {
            ElMessage.error('添加失败')
        })
    }
    switch_list.value = false
}
// 删除活动事件
const deleteActivityFunc = () => {
    // console.log(val)
    APIdeleteActivitiesEvent(activity.item.vid, { data: { tgt_id: activity.item.tgt_id, tgt_type: activity.item.tgt_type } }).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
        switch_deleteSure.value = false
    })
}
const switch_deleteSure = ref(false)
const activity = reactive({
    item: {}
})
const deleteActivityFunc_1 = item => {
    activity.item = item
    switch_deleteSure.value = true
}
// 公示详情
const switch_survey = ref(false)
const data_details_1 = reactive({
    item: {}
})
const activitydetailsFunc = item => {
    // if (item.tgt_type == 'announce') {
    //     switch_announce.value = true
    //     item.docable.affixs = []
    //     for (let i in item.docable.affix) {
    //         item.docable.affixs.push(import.meta.env.VITE_APP_FOLDER_SRC + item.docable.affix[i].file)
    //     }
    //     data_details.item = item.docable
    //     console.log(item.docable)
    // } else {
    switch_survey.value = true
    data_details_1.item = item.docable
    // }
}
// 监听分页
watch(page, () => {
    getActivitiesEventList()
})
// 执行
refreshFunc()
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['activity_type', 'activityStatus', 'announce_status', 'article_lv', 'group_user_region_type']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss" scoped>
::v-deep .el-button + .el-button {
    margin-bottom: 5px;
}
.delete-service {
    position: absolute;
    right: -5px;
    top: 18px;
    z-index: 99;
    cursor: pointer;
    background-color: #fff;
    border-radius: 15px;
}
.noDeal {
    margin-left: 6px;
}
.ac_name {
    display: inline-block;
    font-size: 18px;
    color: #00c701;
    padding: 0 10px;
}
.el-timeline :deep .el-timeline-item__content {
    cursor: pointer;
}
</style>
