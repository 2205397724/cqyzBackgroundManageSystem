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
                        <Comment :id="route.query.id" />
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
const getcomplaintDetailFunc = () => {
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
const data_2 = reactive({
    list: [],
    page: 1,
    total: 50,
    per_page: 15
})
import {
    APIRecordList
} from '@/api/custom/custom.js'
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
watch(() => data_2.page, new_val => {
    // console.log(data_2.page)
    // data1FnGetList()
    getRecordListunc()
}, { immediate: true, deep: true })
/* ----------------------------------------------------------------------------------------------------------------------- */
const refreshFunc = () => {
    // getFuncCommentList()
    // APIgetcomplaintDetail(route.query.id || dataForm.item.id, { log: 'all' })
    getcomplaintDetailFunc()

}
const handleClick = () => {
    if (activeName.value == '2') {
        getListArchiveFunc()
    }
    if (activeName.value == '4') {
        getRecordListunc()
    }
}
refreshFunc()
// watch(() => {
//     getcomplaintDetailFunc()
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
.isComment {
    display: flex;
    align-items: center;
    margin: 10px 0 15px;
    font-size: 14px;
    background-color: #fafafa;
    padding: 0 20px;
}
.el-timeline {
    margin-left: -37px;
}
</style>
