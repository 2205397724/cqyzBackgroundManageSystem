<template>
    <div>
        <page-main>
            <div>
                <el-row :gutter="20" class="bottom-btn-box-1">
                    <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                        <el-button class="m-b-20" type="primary" :icon="Plus" size="large" @click="addResidentialFunc()">
                            添加表决
                        </el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="search">
                <el-row>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                标题名称：
                            </el-col>
                            <el-input v-model="data_search.obj.name" class="search_tb" placeholder="标题名称" clearable />
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                所在区域：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18" class="search_tb">
                                <div
                                    class="selecZone"
                                    @click="switch_choose_zone = true"
                                >
                                    <span v-if="!selectedZone_id" class="selecChina_1">区域</span>
                                    <span class="selecChina_1" style="color: #606266;">{{ selectedZone_id }}</span>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <!-- <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                状态：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-select v-model="data_search.obj.status" class="search_tb" placeholder="状态">
                                    <el-option v-for="item in opts_all.obj.announce_status" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col> -->
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                是否公开：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-select v-model="data_search.obj.pub" class="search_tb" placeholder="是否公开">
                                    <el-option v-for="item in opts_all.obj.toushu_pub" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="0" :sm="4" :md="3" :lg="2" />
                    <el-col :xs="24" :sm="20" :md="21" :lg="22">
                        <el-button type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                        <el-button v-show="switch_search == true" class="m-l-20 m-r-10" :icon="Loading" @click="refreshFunc">重置</el-button>
                        <span v-show="switch_search == true" class="size-base">
                            *共搜索到{{ total }}条。
                        </span>
                    </el-col>
                </el-row>
            </div>
            <el-radio-group v-model="activeName" size="large" class="m-b-20" @change="handleClick">
                <el-radio-button label="全部" />>
                <el-radio-button label="筹备中" />>
                <el-radio-button label="待审" />>
                <el-radio-button label="未开始" />>
                <el-radio-button label="进行中" />>
                <el-radio-button label="暂停" />>
                <el-radio-button label="终止" />>
                <el-radio-button label="已结束" />>
            </el-radio-group>
            <!-- 选举列表 -->
            <div class="hidden">
                <el-table
                    v-loading="loading_tab" :data="data_tab.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    style="width: 100%;min-height: 300px;overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
                >
                    <el-table-column prop="name" label="表决标题" />
                    <el-table-column prop="author_cc_name" label="所在区域" width="120"/>
                    <el-table-column prop="ticketall" label="总票数" align="center" width="100"/>
                    <el-table-column label="表决状态" align="center" width="80">
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
                    <el-table-column label="是否公开" align="center" width="80">
                        <template #default="scope">
                            <el-tag v-show="scope.row.pub == 0" class="btnNone" type="danger" size="small">关闭</el-tag>
                            <el-tag v-show="scope.row.pub == 1" class="btnNone noDeal" type="success" size="small">开放</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="通知" align="center" width="80">
                        <template #default="scope">
                            <el-tag class="btnNone" type="danger" size="small" @click="sentNotice(scope.row)">通知</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" width="250px" label="操作">
                        <template #default="scope">
                            <el-button type="primary" size="small" @click="modifySurvey(scope.row)">
                                修改
                            </el-button>
                            <el-link :underline="false" type="primary">
                                <router-link class="el-button details" :to="{name: 'voteDetail',query:{ id : scope.row.id }}">详情</router-link>
                            </el-link>
                            <el-popconfirm
                                title="确定要删除当前项么?" cancel-button-type="info"
                                @confirm="deleteFunc(scope.row)"
                            >
                                <template #reference>
                                    <el-button type="danger" size="small">
                                        删除
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    v-model:current-page="page"
                    style="float: right;"
                    layout="prev,next,jumper,"
                    :total="Infinity"
                    :page-size="per_page"
                    background
                    prev-text="上一页"
                    next-text="下一页"
                    hide-on-single-page
                />
            </div>
            <!-- 修改添加 -->
            <el-dialog v-model="switch_examine" :title="str_title" width="70%" @closed="dialogClosed">
                <el-steps v-if="str_title== '添加'" :active="active" finish-status="success" space="30%" align-center>
                    <el-step title="填写表决信息">
                    </el-step>
                    <el-step v-if="str_title== '添加'" title="发起审核申请" />
                    <el-step v-if="str_title== '添加'" title="完成" />
                </el-steps>
                <div>
                    <el-scrollbar>
                        <div class="details-box p-lr-10 m-t-40 m-b-20">
                            <el-form v-if="active == 0" ref="ruleFormRef" :model="from_examine.item">
                                <el-row :gutter="10">
                                    <div class="width-100 m-b-20 p-b-10 display" style="border-bottom: solid 1px #e4e7ed;">
                                        <span class="size-base strong" style="color: #409eff;flex: 1;">基本信息</span>
                                    </div>
                                    <el-col :md="24" :lg="12">
                                        <el-form-item label="标题" label-width="80px" prop="name" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                            <el-input
                                                v-model="from_examine.item.name"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                        <el-form-item
                                            label="所在区域"
                                            prop="region_val"
                                            label-width="80px"
                                            :error="
                                                from_error.msg && from_error.msg.name? from_error.msg.name[0]: ''"
                                        >
                                            <div class="selecZone" @click="click_add_group_zone_id">
                                                <span v-if="!selectedZone_id" class="selecChina">区域</span>
                                                <span style="margin-left: 11px;">{{ selectedZone_id }}</span>
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="24" :lg="12">
                                        <el-form-item label="总票数" label-width="80px" prop="areaall" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                            <el-input
                                                v-model="from_examine.item.ticketall"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="24" :lg="12">
                                        <el-form-item label="总面积" label-width="80px" prop="areaall" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                            <el-input
                                                v-model="from_examine.item.areaall"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                        <el-form-item
                                            label-width="80px"
                                            label="是否公开"
                                        >
                                            <el-select v-model="from_examine.item.pub" class="head-btn" clearable>
                                                <el-option v-for="(item,i) in opts_all.obj.toushu_pub" :key="i" :label="item.val" :value="item.key" />
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="24" :lg="12">
                                        <el-form-item label="状态" label-width="80px" prop="status" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                            <el-select v-model="from_examine.item.status" class="head-btn" clearable>
                                                <el-option v-for="(item,i) in opts_all.obj.announce_status" :key="i" :label="item.val" :value="item.key" />
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="24" :lg="12">
                                        <el-form-item label="开始时间" label-width="80px" prop="author_tgt" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                            <el-date-picker
                                                v-model="from_examine.item.startat"
                                                type="datetime"
                                                :placeholder="开始时间"
                                                format="YYYY-MM-DD hh:mm:ss"
                                                value-format="YYYY-MM-DD hh:mm:ss"
                                                style="width: 100%;"
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="24" :lg="12">
                                        <el-form-item label="结束时间" label-width="80px" prop="endat" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                            <el-date-picker
                                                v-model="from_examine.item.endat"
                                                type="datetime"
                                                :placeholder="结束时间"
                                                format="YYYY-MM-DD hh:mm:ss"
                                                value-format="YYYY-MM-DD hh:mm:ss"
                                                style="width: 100%;"
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <div class="width-100 m-b-10 display flex-row flex-between" style="border-bottom: solid 1px #e4e7ed;">
                                        <span class="size-base strong" style="color: #409eff;flex: 1;">投票规则</span>
                                        <el-button class="m-b-10" type="primary" size="small" @click="addrules()">添加规则</el-button>
                                    </div>
                                    <div v-for="(rule,r) in from_examine.item.vrule" :key="r" class="width-100">
                                        <el-row :gutter="10">
                                            <el-col :span="8">
                                                <el-form-item label="选项名" label-width="80px" prop="areaall">
                                                    <el-input
                                                        v-model="from_examine.item.vrule[r].voptext"
                                                        placeholder=""
                                                        type="text"
                                                    />
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="6">
                                                <el-form-item label="最少投几项" label-width="90px" prop="areaall">
                                                    <el-input
                                                        v-model="from_examine.item.vrule[r].vmin"
                                                        placeholder=""
                                                        type="number"
                                                    />
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="6">
                                                <el-form-item label="最多投几项" label-width="90px" prop="areaall">
                                                    <el-input
                                                        v-model="from_examine.item.vrule[r].vmax"
                                                        placeholder=""
                                                        type="number"
                                                    />
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="4">
                                                <el-popconfirm
                                                    title="确定要删除当前项么?" cancel-button-type="info"
                                                    @confirm="from_examine.item.vrule.splice(r,1)"
                                                >
                                                    <template #reference>
                                                        <el-button type="danger">
                                                            删除
                                                        </el-button>
                                                    </template>
                                                </el-popconfirm>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <div class="width-100 m-b-20 p-b-10 display" style="border-bottom: solid 1px #e4e7ed;">
                                        <span class="size-base strong" style="color: #409eff;flex: 1;">详细说明</span>
                                    </div>
                                    <el-col :md="24" :lg="24">
                                        <el-form-item label="内容" label-width="80px" prop="content" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                            <editor v-model="from_examine.item.content" class="w_100" />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                            <el-form
                                v-if="active == 1 && str_title== '添加'"
                                ref="ruleFormRef"
                                :model="from_pass.obj"
                            >
                                <el-row :gutter="10">
                                    <el-col :xs="12" :sm="12">
                                        <el-form-item
                                            label="审核部门" label-width="120px"
                                            :error="from_error.msg && from_error.msg['extra.' + i + '.val'] ? from_error.msg['extra.' + i + '.val'][0] : ''"
                                        >
                                            <div class="wh_100">
                                                <div class="searchUserGroup">
                                                    <SearchUserGroup ref="V" v-model:name="userGroupName_1" @checkName="checkNameFunc_1" />
                                                </div>
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                    </el-scrollbar>
                </div>
                <el-button v-if="active !== 2 && str_title== '添加'" style="position: absolute; right: 33px; bottom: 14px;" size="largr" type="primary" @click="next">下一步</el-button>
                <el-button v-if="active == 2" style="position: absolute; right: 33px; bottom: 14px;" size="largr" type="primary" @click="next">完成</el-button>
                <template #footer>
                    <div v-if="str_title== '修改'" class="footer">
                        <el-button @click="switch_examine=false">取消</el-button>
                        <el-button type="primary" @click="dialogExamineCloseFunc()">确定</el-button>
                    </div>
                </template>
            </el-dialog>
            <!-- 详情 -->
            <el-dialog v-model="switch_details" :title="data_details.item.name" width="80%" destroy-on-close="true">
                <Detail :id="data_details.item.id" />
                <template #footer>
                    <el-button type="warning" plain @click="switch_details = false">取消</el-button>
                </template>
            </el-dialog>
            <el-dialog v-model="switch_choose_zone" title="选择区域">
                <el-scrollbar height="250px">
                    <position-tree
                        :tree_item="tree_item.arr"
                        :check_type="true"
                        :no_buildings="true"
                        @checkChangeFunc="checkChangeFunc"
                        @checkFuncDate="checkFunc"
                    />
                </el-scrollbar>
            </el-dialog>
            <SendNotice></SendNotice>
        </page-main>
    </div>
</template>

<script setup>
import {
    APIgetSurvey,
    APIaddSurvey,
    APIdeleteSurvey,
    APImodifySurvey,
    APImodifySurveyStatus,
    APIgetSurveyDetails
} from '@/api/custom/custom.js'
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
import { Loading, Search, Plus } from '@element-plus/icons-vue'
const { proxy } = getCurrentInstance()
// 搜索
let switch_search = ref(false)
let data_search = reactive({
    obj: {}
})
// 标签页
const activeName = ref('全部')
// 列表
let ruleFormRef = ref('')
// 是否加载中（element UI）
let loading_tab = ref(false)
let data_tab = reactive({
    arr: []
})
// 详情
const data_details = reactive({
    item: ''
})
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(Number(sessionStorage.getItem('vote_currentPage')) || 1)
// 详情
let switch_details = ref(false)
// 添加 修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {}
})
// 开始结束时间
const value1 = ref('')
const value2 = ref('')
// 修改弹出框的标题
const str_title = ref('添加')
const from_error = reactive({
    msg: {}
})
// 刷新
const refreshFunc = () => {
    data_search.obj = {}
    selectedZone_id.value = ''
    switch_search.value = false
    getTabListFunc()
    getChinaName()
}
// 添加弹出框选择小区
const tree_item = reactive({
    arr: []
})

const selectedZone_id = ref('')
import { APIgetChinaRegion } from '@/api/custom/custom.js'
const getChinaName = () => {
    tree_item.arr = []
    let params = {}
    if (localStorage.getItem('utype') == 'pt') {
        params = {
            p_code: localStorage.getItem('china_code')
        }
    } else if (JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_group'))) {
        params = {
            p_code: JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_group')).region_cc,
            w:3
        }
    } else {
        params = {}
    }
    APIgetChinaRegion(params).then(res => {
        for (let i in res) {
            if (res[i].level < 5) {
                tree_item.arr.push({ name: res[i].name, type: 'region', next_type: 'region', id: res[i].code })
            } else {
                tree_item.arr.push({ name: res[i].name, type: 'region', next_type: 'zone', id: res[i].code })
            }
        }
    })
}
const click_add_group_zone_id = () => {
    switch_choose_zone.value = true
}
const switch_choose_zone = ref(false)
const checkFunc = val => {
    data_search.obj = {}
    selectedZone_id.value = val.name
    if (val.type == 'region') {
        from_examine.item.author_type = 1
        data_search.obj.author_cc = val.china_code || val.id
        from_examine.item.author_tgt = val.china_code || val.id
        from_examine.item.author_cc = val.china_code || val.id
    }
    if (val.type == 'zone') {
        data_search.obj.author_type = 2
        data_search.obj.author_tgt = val.id
        data_search.obj.author_cc = val.china_code
    }
}
const checkChangeFunc = val => {
    //
    switch_choose_zone.value = false
}
// Tabs标签页点击切换事件,切换显示不同状态的表决
// 切换标签后，根据label的值进行if判断，切换不同状态表决
const index = ref(0)
const handleClick = tab => {
    page.value = 1
    // tab未label的值
    if (tab === '筹备中') {
        index.value = 1
    } else if (tab === '待审') {
        index.value = 2
    } else if (tab === '未开始') {
        index.value = 3
    } else if (tab === '进行中') {
        index.value = 4
    } else if (tab === '暂停') {
        index.value = 5
    } else if (tab === '终止') {
        index.value = 6
    } else if (tab === '已结束') {
        index.value = 7
    } else {
        index.value = 0
    }
    getTabListFunc()
}
// 监听分页
watch(page, () => {
    sessionStorage.setItem('vote_currentPage', page.value)
    getTabListFunc()
})
import { onBeforeRouteLeave } from 'vue-router'
onBeforeRouteLeave((to, from) => {
    if (to.meta.title == '表决详情') {
        return true
    } else {
        sessionStorage.removeItem('vote_currentPage')
    }
})
const surveyId = ref('')
// 同意拒绝提交
const dialogExamineCloseFunc = () => {
    // 使用element UI的时间处理器，要将修改的时间传给要提交的对象，因为placeholder绑定了旧值，最新的时间数据绑定value1
    from_examine.item.startat = value1.value._value ? value1.value._value : from_examine.item.startat
    from_examine.item.endat = value2.value._value ? value2.value._value : from_examine.item.endat
    from_error.msg = {}
    from_examine.item.type = 3
    if (str_title.value == '修改') {
        APImodifySurvey(from_examine.item.id, from_examine.item).then(res => {
            refreshFunc()
            ElMessage.success('修改成功')
            switch_examine.value = false
            APImodifySurveyStatus(from_examine.item.id, { 'status': from_examine.item.status }).then(res => {
                refreshFunc()
            })
        })
    } else {
        APIaddSurvey(from_examine.item).then(res => {
            surveyId.value = res.id
            refreshFunc()
            // 添加成功再进入下一步
            active.value = 1
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    }
}
// 获取列表api请求
const getTabListFunc = () => {
    // 请求信息
    let params = {
        page: page.value,
        per_page: per_page.value,
        type: 3,
        status: index.value,
        w:3
    }
    if (index.value == 0) {
        delete params.status
    }
    if (JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_group')) && localStorage.getItem('utype') != 'pt') {
        params.author_cc = JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_group')).region_cc
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
    APIgetSurvey(params).then(res => {
        loading_tab.value = false
        data_tab.arr = res
        total.value = res.length
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

    }).catch(err => {
        from_error.msg = err.data
    })
}
// 添加表决
const addResidentialFunc = () => {
    getChinaName()
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        vrule:[{
            vmin:'',
            vmax:''
        }]
    }
    switch_examine.value = true
}
// 删除
const deleteFunc = val => {
    APIdeleteSurvey(val.id).then(res => {
        refreshFunc()
        // ElMessage.success(res.statusText)
        ElMessage.success('删除成功')
    }).catch(err => {
        from_error.msg = err.data
    })
}
// 修改表决
const modifySurvey = val => {
    active.value = 0
    getChinaName()
    from_error.msg = {}
    str_title.value = '修改'
    APIgetSurveyDetails(val.id).then(res => {
        //
        if(!res.vrule) {
            res.vrule = [{
                vmin:'',
                vmax:''
            }]
        }
        from_examine.item = res
        selectedZone_id.value = res.author_cc_name
        switch_examine.value = true
    }).catch(err => {
        from_error.msg = err.data
    })
}
const dialogClosed = () => {
    selectedZone_id.value = ''
}
// 搜索
const searchFunc = () => {
    page.value = 1
    switch_search.value = true
    getTabListFunc()
}
import {
    APIpostArchiveAudit
} from '@/api/custom/custom.js'
const active = ref(0)
const next = () => {
    if (active.value == 0) {
        dialogExamineCloseFunc()
        // active.value = 1
    } else if (active.value == 1) {
        if (str_title.value == '添加') {
            passToAuditFunc()
        }
        active.value = 2
    } else {
        active.value = 0
        ElMessage.success('添加成功')
        switch_examine.value = false
    }
}
const from_pass = reactive({
    obj: {}
})
const userGroupName_1 = ref('')
const checkNameFunc_1 = val => {
    from_pass.obj.group_id = val.id
    userGroupName_1.value = val.name
}
const passToAuditFunc = () => {
    from_pass.obj.tgt_type = 'survey'
    from_pass.obj.tgt_id = surveyId
    APIpostArchiveAudit(from_pass.obj).then(res => {
        refreshFunc()
    }).catch(err => {
        ElMessage.success('申请失败')
    })
}
refreshFunc()
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {
        status_all: []
    }
})
getOpts(['announce_status', 'toushu_pub']).then(res => {
    opts_all.obj = res
})
const addrules = () => {
    from_examine.item.vrule.push(
        {
            'voptext': '',
            'vmax':'',
            'vmin':''
        }
    )
}
const sentNotice = (item)=>{
    proxy.$eventBus.emit('noticeData',[item,'elect'])
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
.selecZone {
    width: 100%;
    height: 32px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fff;
    .selecChina {
        margin-left: 11px;
        color: #aaa;
    }
    .selecChina_1 {
        margin-left: 11px;
        font-size: 14px;
        line-height: 29px;
        color: #c0c4d5;
    }
}
</style>
