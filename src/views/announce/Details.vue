<template>
    <div class="articletplarticle">
        <page-main>
            <div>
                <div class="size-lx">{{ dataForm.item.title }}</div>
                <p class="size-sm sno">
                    文号：{{ dataForm.item.proof }}
                    <el-tag
                        v-show="dataForm.item.status == 1" class="m-t-10 m-l-10 btnNone" type="primary"
                        size="small"
                    >
                        {{ getOptVal(opts_all.obj.announce_status,dataForm.item.status) }}
                    </el-tag>
                    <el-tag
                        v-show="dataForm.item.status == 2" class="m-t-10 m-l-10 btnNone noDeal" type="warning"
                        size="small"
                    >
                        {{ getOptVal(opts_all.obj.announce_status,dataForm.item.status) }}
                    </el-tag>
                    <el-tag
                        v-show="dataForm.item.status == 3" class="m-t-10 m-l-10 btnNone" type="warning"
                        size="small"
                    >
                        {{ getOptVal(opts_all.obj.announce_status,dataForm.item.status) }}
                    </el-tag>
                    <el-tag
                        v-show="dataForm.item.status == 4" class="m-t-10 m-l-10 btnNone" type="success"
                        size="small"
                    >
                        {{ getOptVal(opts_all.obj.announce_status,dataForm.item.status) }}
                    </el-tag>
                    <el-tag v-show="dataForm.item.status == 5" class="m-t-10 m-l-10 btnNone" type="info" size="small">
                        {{
                            getOptVal(opts_all.obj.announce_status,dataForm.item.status) }}
                    </el-tag>
                    <el-tag v-show="dataForm.item.status == 6" class="m-t-10 m-l-10 btnNone" type="info" size="small">
                        {{
                            getOptVal(opts_all.obj.announce_status,dataForm.item.status) }}
                    </el-tag>
                    <el-tag v-show="dataForm.item.status == 7" class="m-t-10 m-l-10 btnNone" type="info" size="small">
                        {{
                            getOptVal(opts_all.obj.announce_status,dataForm.item.status) }}
                    </el-tag>
                </p>
            </div>
            <div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="公示信息" name="1">
                        <div class="details-box">
                            <div class="details-tit-sm">基础信息</div>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left">公示内容</div>
                                        <div class="right" v-html="dataForm.item.content" />
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <div v-if="dataForm.item.affix&&dataForm.item.affix.length>0" class="item">
                                        <div class="left">附件</div>
                                        <div class="right">
                                            <div
                                                v-for="(item,i) in dataForm.item.affix" :key="i"
                                                class="inline-block m-r-10"
                                            >
                                                <el-tag type="success">
                                                    <el-link
                                                        type="success" class="link" :href="dataForm.item.affixs"
                                                        target="_blank"
                                                    >
                                                        {{ item.title }}
                                                    </el-link>
                                                </el-tag>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left">公示分类</div>
                                        <div class="right">{{ dataForm.item.cate?.name }}</div>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left">公示区域类型</div>
                                        <div class="right">
                                            {{ getOptVal(opts_all.obj.article_lv,dataForm.item.totype) }}
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div v-if="dataForm.item.toval_name" class="item">
                                        <div class="left">公示区域</div>
                                        <div class="right">{{ dataForm.item.toval_name }}</div>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left">发布单位</div>
                                        <div class="right">{{ dataForm.item.authorgroup?.name }}</div>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left">发布人</div>
                                        <div class="right">
                                            <span>{{
                                                dataForm.item.uinfo?.name?dataForm.item.uinfo?.name:dataForm.item.uinfo?.nickname?
                                                    dataForm.item.uinfo?.nickname:dataForm.item.uinfo?.username }}</span>
                                            <span class="m-l-20 size-sm">{{ dataForm.item.uinfo?.mobile }}</span>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col v-for="(item, i) in dataForm.item.custom" :key="i" :span="8">
                                    <div class="item">
                                        <div class="left">{{ item.label }}</div>
                                        <div class="right">{{ item.val }}</div>
                                    </div>
                                </el-col>
                            </el-row>
                            <div class="details-tit-sm">其他信息</div>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left">公示ID</div>
                                        <div class="right">{{ dataForm.item.id }}</div>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left">开始时间</div>
                                        <div class="right">{{ dataForm.item.start_at }}</div>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left">结束时间</div>
                                        <div class="right">{{ dataForm.item.end_at }}</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="审核记录" name="2">
                        <div>
                            <el-timeline>
                                <el-timeline-item
                                    v-for="(item,index) in article_tab.arr" :key="index"
                                    :timestamp="item.created_at" placement="top" :type="index==0? 'primary':''"
                                >
                                    <el-card>
                                        <div class="details-box">
                                            <div class="item">
                                                <div class="left">公示</div>
                                                <div class="right">{{ item.auditable?.title }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">处理人</div>
                                                <div class="right">
                                                    {{ item.auditor?.name?
                                                        item.auditor?.name:item.auditor?.nickname?item.auditor?.nickname:item.auditor?.username
                                                    }}
                                                </div>
                                            </div>
                                            <div v-if="item.reply" class="item">
                                                <div class="left">回复内容</div>
                                                <div class="right">{{ item.reply }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">状态</div>
                                                <div class="right">
                                                    <el-tag v-if="item.status== 10" type="warning" size="small">
                                                        未处理
                                                    </el-tag>
                                                    <el-tag v-if="item.status == 20" type="success" size="small">
                                                        审核通过
                                                    </el-tag>
                                                    <el-tag v-if="item.status == 30" type="danger" size="small">
                                                        审核失败
                                                    </el-tag>
                                                </div>
                                            </div>
                                        </div>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                        <div v-show="article_tab.arr.length <= 0" class="size-lg">此公式无审核信息</div>
                    </el-tab-pane>
                    <el-tab-pane label="业主评论" name="3" class="hidden">
                        <div style="display: flex;align-items: center;">
                            <span>是否开启评论：</span>
                            <el-switch
                                v-model="popup1.using" inline-prompt active-text="开" inactive-text="关"
                                @change="switchFnUse"
                            />
                            <div style="margin-left: 20px;display: inline-block;">
                                <el-radio-group
                                    v-model="popup1.scoreper" :disabled="!popup1.using"
                                    @change="switchFnUse(true)"
                                >
                                    <el-radio
                                        v-for="(item,i) in opts_all.obj.comment_scoreper" :key="item.key"
                                        :label="item.key" size="large"
                                    >
                                        {{ item.val }}
                                    </el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div>
                            <el-button
                                class="m-b-20 m-t-5" type="primary" :icon="Plus"
                                :disabled="popup1.using ? false:true" @click="()=>{
                                    popup2.form = {};
                                    popup2.error = {};
                                    popup2.title = '添加';
                                    popup2.switch = true;
                                }"
                            >
                                添加
                            </el-button>
                        </div>
                        <el-table
                            :data="data_1.list"
                            :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                            class="tab_1"
                        >
                            <el-table-column label="评论内容">
                                <template #default="scope">
                                    <span>{{ scope.row.content }} </span>
                                </template>
                            </el-table-column>
                            <el-table-column v-if="data_1.list.uname">
                                <template #default="scope">
                                    <span>{{ scope.row.uname|| 'null' }} </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="评分" width="80">
                                <template #default="scope">
                                    <span>{{ scope.row.score }} </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="状态" align="center">
                                <template #default="scope">
                                    <!-- <span>{{ getOptVal(opts_all.obj.comment_status,scope.row.status ) }} </span> -->
                                    <el-tag v-if="scope.row.status == 10" type="waring" roung>未审核</el-tag>
                                    <el-tag v-if="scope.row.status == 20" type="success" round>已审核</el-tag>
                                    <el-tag v-if="scope.row.status == 30" type="danger" round>审核失败</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column label="评论时间">
                                <template #default="scope">
                                    <span>{{ scope.row.created_at }} </span>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="260">
                                <template #default="scope">
                                    <el-button type="primary" size="small" @click="popup2FnModify(scope.row)">
                                        修改
                                    </el-button>
                                    <el-button size="small" @click="popup3FnDetails(scope.row.id)">
                                        详情
                                    </el-button>
                                    <!-- <el-popconfirm
                            title="确定要删除当前项么?"
                            cancel-button-type="info"
                            @confirm="data1FnDelete(scope.row.id)"
                        >
                            <template #reference>
                                <el-button
                                    type="danger"
                                    size="small"
                                >
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm> -->
                                    <el-button type="primary" size="small" @click="popup2FnReply(scope.row)">
                                        回复
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                            v-model:current-page="data_1.page" style="float: right;"
                            layout="prev,next,jumper," :total="50" :page-size="data_1.per_page" background
                            prev-text="上一页" next-text="下一页" hide-on-single-page
                        />
                    </el-tab-pane>
                    <el-tab-pane label="访问记录" name="4">
                        <el-table
                            :data="data_2.list"
                            :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                            class="tab_1"
                        >
                            <el-table-column label="访问者">
                                <template #default="scope">
                                    <span>{{ scope.row.uinfo?.name?scope.row.uinfo?.name:scope.row.uinfo?.nickname?scope.row.uinfo?.nickname:scope.row.uinfo?.username }} </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="访问时间">
                                <template #default="scope">
                                    <span>{{ scope.row.created_at }} </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="ip地址" align="center">
                                <template #default="scope">
                                    <span>{{ scope.row.ip }} </span>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column label="评论时间" width="200">
                                <template #default="scope">
                                    <span>{{ scope.row.created_at }} </span>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="260">
                                <template #default="scope">
                                    <el-button
                                        type="primary" size="small"
                                        @click="popup2FnModify(scope.row)"
                                    >
                                        修改
                                    </el-button>
                                    <el-button
                                        size="small"
                                        @click="popup3FnDetails(scope.row.id)"
                                    >
                                        详情
                                    </el-button>
                                    <el-button
                                        type="primary"
                                        size="small"
                                        @click="popup2FnReply(scope.row)"
                                    >
                                        回复
                                    </el-button>
                                </template>
                            </el-table-column> -->
                        </el-table>
                        <el-pagination
                            v-model:current-page="data_2.page"
                            style="float: right;"
                            class="btnClass"
                            layout="prev,next,jumper,"
                            :total="50"
                            :page-size="data_2.per_page"
                            background
                            prev-text="上一页"
                            next-text="下一页"
                            hide-on-single-page
                        />
                    </el-tab-pane>
                </el-tabs>
            </div>
        </page-main>
        <!-- 修改添加 -->
        <el-dialog v-model="popup2.switch" :title="popup2.title" width="50%" :append-to-body="true">
            <el-form :model="popup2.form">
                <el-row :gutter="10">
                    <el-col v-if="popup2.title == '修改'" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px" label="状态"
                            :error="popup2.error&&popup2.error.status?popup2.error.status[0]:''"
                        >
                            <el-select v-model="popup2.form.status" class="head-btn" placeholder="" clearable>
                                <el-option
                                    v-for="(item,i) in opts_all.obj.comment_status" :key="item.key"
                                    :label="item.val" :value="item.key"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col v-if="popup2.title == '回复'" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px" label="打分"
                            :error="popup2.error&&popup2.error.score?popup2.error.score[0]:''"
                        >
                            <el-input-number v-model="popup2.form.score" :step="1" :max="popup1.scoreper" :min="0" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="70px" label="内容"
                            :error="popup2.error&&popup2.error.content?popup2.error.content[0]:''"
                        >
                            <el-input
                                v-model="popup2.form.content" :autosize="{ minRows: 2, maxRows: 6 }"
                                type="textarea" placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="popup2.switch=false">取消</el-button>
                    <el-button type="primary" @click="popup2FnAdd">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog v-model="popup3.switch" title="详情" width="50%" :append-to-body="true">
            <div class="details-box">
                <div v-if="popup3.details.uname" class="item">
                    <div class="left">评论人</div>
                    <div class="right">{{ popup3.details.uname }}</div>
                </div>
                <div class="item">
                    <div class="left">评论内容</div>
                    <div class="right">{{ popup3.details.content }}</div>
                </div>
                <div class="item">
                    <div class="left">评论状态</div>
                    <div class="right">
                        <el-tag v-if="popup3.details.status == 10" type="waring" roung>未审核</el-tag>
                        <el-tag v-if="popup3.details.status == 20" type="success" round>已审核</el-tag>
                        <el-tag v-if="popup3.details.status == 30" type="danger" round>审核失败</el-tag>
                    </div>
                </div>
                <div class="item">
                    <div class="left">所在地址</div>
                    <div class="right">{{ popup3.details.loc }}</div>
                </div>
                <div class="item">
                    <div class="left">评论人IP</div>
                    <div class="right">{{ popup3.details.ip }}</div>
                </div>
                <div class="item">
                    <div class="left">评论时间</div>
                    <div class="right">{{ popup3.details.created_at }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="popup3.switch = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
// console.log(route.params)
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
/* ----------------------------------------------------------------------------------------------------------------------- */
import {
    // APIgetComplaintList
    APIgetEventArticleDetails,
    APIgetListArchiveAudit
} from '@/api/custom/custom.js'
const dataForm = reactive({
    item: {
        uinfo: {
            name: ''
        },
        zone: { name: '' }
    }
})
const activeName = ref('1')
const article_tab = reactive({
    arr: []
})
// 详情
const getComplaintDetailsFunc = () => {
    APIgetEventArticleDetails(route.query.id).then(res => {
        console.log(res)
        res.affixs = []
        for (let i in res.affix) {
            res.affixs.push(import.meta.env.VITE_APP_FOLDER_SRC + res.affix[i].file)
        }
        dataForm.item = res
    })
}
// 审核
import { Plus } from '@element-plus/icons-vue'
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
const popup1 = reactive({
    switch: false,
    using: false,
    scoreper: 0
})
const getListArchiveFunc = () => {
    let params = {
        tgt_id: route.query.id,
        tgt_type: 'announce'
    }
    APIgetListArchiveAudit(params).then(res => {
        console.log(res)
        article_tab.arr = res
    })
}
import {
    APIgetCommentconfig,
    APIpostCommentconfig,
    APIdeleteCommentconfig
} from '@/api/custom/custom.js'
const switchFnUse = val => {
    console.log(val)
    if (val) {
        APIpostCommentconfig(route.query.id, { scoreper: popup1.scoreper }).then(res => {
            // ElMessage.success('已开启')
        })
        return false
    }
    APIdeleteCommentconfig(route.query.id).then(res => {
        // ElMessage.success('已开启')
    })
}
// const switchFnStatus = () => {
//     APIgetCommentconfig(route.query.id).then(res => {
//         console.log(res)
//         popup1.using = false
//         if (res) {
//             popup1.using = true
//             popup1.scoreper = res.scoreper
//         }
//     })
// }
const data_1 = reactive({
    list: [],
    page: 1,
    total: 50,
    per_page: 15
})
const data_2 = reactive({
    list: [],
    page: 1,
    total: 50,
    per_page: 15
})
import {
    APIgetCommentList,
    APIgetCommentDetails,
    // APIdeleteComment,
    APIputComment,
    APIpostComment,
    APIRecordList
} from '@/api/custom/custom.js'
const data1FnGetList = () => {
    let data = {
        page: data_1.page,
        per_page: data_1.per_page,
        tgtid: route.query.id
    }
    APIgetCommentList(data).then(res => {
        data_1.list = res
        data_1.total = res.length
        let btnNext = document.querySelector('.btn-next')
        if (res.length < data_1.per_page) {
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
// 获取访问记录
const getRecordListunc = () => {
    let params = {
        page: data_2.page,
        per_page: data_2.per_page,
        tgt_id: route.query.id
    }
    APIRecordList(params).then(res => {
        console.log(res)
        data_2.list = res
        data_2.total = res.length
        let btnNext1 = document.querySelector('.btnClass')
        let btnNext2 = btnNext1.children[1]
        console.log(btnNext1.children[1])
        if (res.length < data_2.per_page) {
            btnNext2.classList.add('not_allowed')
            btnNext2.setAttribute('disabled', true)
            btnNext2.setAttribute('aria-disabled', true)
        } else {
            btnNext2.classList.remove('not_allowed')
            btnNext2.removeAttribute('disabled')
            btnNext2.setAttribute('aria-disabled', false)
        }
    })
}
watch(() => data_1.page, new_val => {
    // console.log(data_2.page)
    data1FnGetList()
    // getRecordListunc()
}, { immediate: true, deep: true })
watch(() => data_2.page, new_val => {
    // console.log(data_2.page)
    // data1FnGetList()
    getRecordListunc()
}, { immediate: true, deep: true })
const popup2 = reactive({
    switch: false,
    title: '添加',
    error: {},
    form: {}
})
const popup2FnAdd = () => {
    popup2.error = {}
    for (let key in popup2.form) {
        if (popup2.form[key] !== null) {
            if (popup2.form[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (popup2.form[key] !== 0 || popup2.form[key] !== false)) {
                delete popup2.form[key]
            }
        }
    }
    if (popup2.title == '添加' || popup2.title == '回复') {
        APIpostComment(route.query.id, popup2.form).then(res => {
            ElMessage.success('添加成功')
            popup2.switch = false
            data1FnGetList()
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    } else if (popup2.title == '修改') {
        APIputComment(popup2.form.id, popup2.form).then(res => {
            ElMessage.success('修改成功')
            popup2.switch = false
            data1FnGetList()
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    }
}
const popup2FnModify = val => {
    popup2.error = {}
    popup2.title = '修改'
    APIgetCommentDetails(val.id).then(res => {
        popup2.form = {
            id: res.id,
            content: res.content,
            status: res.status
        }
        popup2.switch = true
    })
}
const popup2FnReply = val => {
    popup2.error = {}
    popup2.title = '回复'
    popup2.form = {
        content: '',
        atuid: val.uid,
        atutype: val.utype,
        score: 0,
        tagid: val.id

    }
    popup2.switch = true
}
const popup3 = reactive({
    switch: false,
    details: {}
})
const popup3FnDetails = id => {
    APIgetCommentDetails(id).then(res => {
        popup3.details = res
        popup3.switch = true
    })
}
/* ----------------------------------------------------------------------------------------------------------------------- */
const refreshFunc = () => {
    // getFuncCommentList()
    // APIgetComplaintDetails(route.query.id || dataForm.item.id, { log: 'all' })
    getComplaintDetailsFunc()
    getListArchiveFunc()
}
const handleClick = () => {
    if (activeName.value == '2') {
        data1FnGetList()
    }
    if (activeName.value == '4') {
        getRecordListunc()
    }
}
refreshFunc()
// watch(() => {
//     getComplaintDetailsFunc()
// }, { immediate: true, deep: true })
// const score = ref(10)
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {
        status_all: []
    }
})
getOpts(['article_lv', 'announce_status', 'comment_scoreper', 'comment_status']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
.sno {
    color: #b7b1b1;
}
.switchStyle ::v-deep .el-switch__label {
    position: absolute !important;
    display: none !important;
    color: #fff !important;
    width: 80px;
}
.switchStyle ::v-deep .el-switch__label--left {
    z-index: 9 !important;
    left: 17px !important;
}
.switchStyle ::v-deep .el-switch__label--right {
    z-index: 9 !important;
    left: -5px !important;
}
.switchStyle ::v-deep .el-switch__label.is-active {
    display: block !important;
}
.switchStyle.el-switch ::v-deep .el-switch__core,
.switchStyle ::v-deep .el-switch__label {
    width: 60px !important;
}
</style>
