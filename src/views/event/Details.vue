<template>
    <div class="vote">
        <page-main>
            <div class="size-lx">{{ dataForm.item.title }}</div>
            <p class="size-sm sno">
                受理编号：{{ dataForm.item.sno }}
                <el-button round type="success" class="m-10 btn1" size="small">{{ getOptVal(opts_all.obj.toushu_status,dataForm.item.status) }}</el-button>
            </p>
            <div class="btn2">
                <!-- <el-button-group> -->
                <el-button v-if="dataForm.item.status == 0" type="primary" class="btn3" @click="examine_switch= true">
                    审核
                </el-button>
                <el-button v-if="dataForm.item.status == 1" type="primary" class="btn3" @click="replyFunk">
                    回复
                </el-button>
                <el-button v-if="dataForm.item.status !== 0" type="warning" class="btn3" @click="TransferFunk">
                    转办
                </el-button>
                <el-button v-if="dataForm.item.status !== 0 && dataForm.item.status !== 8" type="success" class="btn3" @click="setting_switch= true">
                    结案
                </el-button>
            </div>
            <div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="基础信息" name="1">
                        <el-scrollbar height="800px">
                            <div class="details-box">
                                <div class="item">
                                    <div class="left content">内容</div>
                                    <div class="right">{{ dataForm.item.content }}</div>
                                </div>
                                <div v-if="dataForm.item.affix&&dataForm.item.affix.length>0" class="item">
                                    <div class="left content">附件</div>
                                    <div class="right">
                                        <!-- 两种模式任君选择 -->
                                        <el-image v-for="(item,i) in dataForm.item.affixs" :key="i" :preview-src-list="dataForm.item.affixs" class="image" :src="item" fit="cover" />
                                    <!-- <div v-for="(item,i) in data_1.details_data.affixs">
                            <el-link type="success" :href="item" target="_blank">{{ item }}</el-link>
                        </div> -->
                                    </div>
                                </div>
                                <div class="box">
                                    <div>
                                        <div class="item">
                                            <div class="left">是否公开</div>
                                            <div class="right">{{ getOptVal(opts_all.obj.toushu_pub,dataForm.item.pub) }}</div>
                                        </div>
                                        <div class="item">
                                            <div class="left">小区id</div>
                                            <div class="right">{{ dataForm.item.zid }}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="item">
                                            <div class="left">是否匿名</div>
                                            <div class="right">{{ getOptVal(opts_all.obj.toushu_ano,dataForm.item.ano) }}</div>
                                        </div>
                                        <div v-if="dataForm.item.catpro" class="item">
                                            <div class="left">问题分类</div>
                                            <div class="right">{{ newcatpro.item.name }}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="item">
                                            <div class="left">分类</div>
                                            <div class="right">{{ getOptVal(opts_all.obj.tousu_type_kind,dataForm.item.kind) }}</div>
                                        </div>
                                        <div v-if="dataForm.item.catob" class="item">
                                            <div class="left">投诉对象</div>
                                            <div class="right">{{ newcatob.item.name }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-scrollbar>
                    </el-tab-pane>
                    <el-tab-pane label="处理记录" name="2">
                        <el-scrollbar height="800px">
                            <div>
                                <el-timeline>
                                    <el-timeline-item v-for="(item,index) in dataForm.item.totlogs" :key="index" :timestamp="item.created_at" placement="top" :type="index == 0 ? 'primary' : ''">
                                        <el-card>
                                            <div>
                                                <div>
                                                    <div class="sno m-b-10">
                                                        <span>操作人员: {{ Name }}</span>
                                                        <span class="m-l-60">事件：{{ item.content }}</span>
                                                    </div>
                                                </div>
                                                <div class="m-b-10">
                                                    {{ item.logable.content }}
                                                </div>
                                                <div>
                                                    <el-image v-for="(item,i) in dataForm.item.affixs" :key="i" :preview-src-list="dataForm.item.affixs" class="image" :src="item" fit="cover" />
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-timeline-item>
                                </el-timeline>
                            </div>
                        </el-scrollbar>
                        <!-- <div v-show="data_archive.arr.length <= 0" class="size-lx">此设备无档案信息</div> -->
                    </el-tab-pane>
                    <el-tab-pane label="业主评论" name="3">
                        <el-scrollbar height="800px">
                            <!-- <comment-switch :id="route.query.id" /> -->
                            <div class="isComment">
                                <span>是否开启评论：</span>
                                <el-switch
                                    v-model="popup1.using"
                                    style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                                    inline-prompt
                                    active-text="开"
                                    inactive-text="关"
                                    @change="switchFnUse"
                                />
                                <div class="radioGroup">
                                    <el-radio-group v-model="popup1.scoreper" :disabled="!popup1.using" @change="switchFnUse(true)">
                                        <el-radio v-for="(item,i) in opts_all.obj.comment_scoreper" :key="item.key" :label="item.key" size="large">{{ item.val }}</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div>
                                <el-table
                                    ref="multipleTableRef"
                                    :data="tableData.arr"
                                    style="width: 100%;"
                                    @selection-change="handleSelectionChange"
                                >
                                    <el-table-column type="selection" width="50" />
                                    <el-table-column label="评论内容" width="200" show-overflow-tooltip="true">
                                        <template #default="scope">
                                            <span>{{ scope.row.content }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column v-if="tableData.arr.uname" label="评论人" width="110">
                                        <template #default="scope">
                                            <span>{{ scope.row.uname|| 'null' }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="状态" width="150">
                                        <template #default="scope">
                                            <el-tag v-show="scope.row.status == 10" class="btnNone" type="warning" effect="dark" size="large">{{ getOptVal(opts_all.obj.comment_status,scope.row.status) }} </el-tag>
                                            <el-tag v-show="scope.row.status == 20" class="btnNone" type="success" effect="dark" size="large">{{ getOptVal(opts_all.obj.comment_status,scope.row.status) }} </el-tag>
                                            <el-tag v-show="scope.row.status == 30" class="btnNone" type="danger" effect="dark" size="large">{{ getOptVal(opts_all.obj.comment_status,scope.row.status) }} </el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="评分" width="100">
                                        <template #default="scope">
                                            <span>{{ scope.row.score }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="评论时间">
                                        <template #default="scope">
                                            <span>{{ scope.row.created_at }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column fixed="right" label="操作" with="200">
                                        <template #default="scope">
                                            <el-button
                                                v-show="scope.row.status == 10"
                                                type="primary" size="small"
                                                @click="toggleSelection(scope.row)"
                                            >
                                                审核
                                            </el-button>
                                            <el-button
                                                v-if="scope.row.status == 20 || scope.row.status == 30"
                                                type="success" size="small"
                                                @click="toggleSelection(scope.row)"
                                            >
                                                修改
                                            </el-button>
                                            <el-button
                                                size="small"
                                                @click="clickFuncDetail(scope.row)"
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
                                            <!-- <el-button
                                                type="danger" size="small"
                                                @click="toggleDelete(scope.row)"
                                            >
                                                删除
                                            </el-button> -->
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-scrollbar>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="评分" name="4">
                        <div>
                            <el-rate
                                v-model="score"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value} 分"
                            />
                        </div>
                    </el-tab-pane> -->
                </el-tabs>
            </div>
        </page-main>
        <!-- 修改添加 -->
        <el-dialog
            v-model="popup2.switch"
            title="回复"
            width="50%"
            :append-to-body="true"
        >
            <el-form
                :model="popup2.form"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="打分"
                            :error="popup2.error&&popup2.error.score?popup2.error.score[0]:''"
                        >
                            <el-input-number v-model="popup2.form.score" :step="1" :max="popup1.scoreper" :min="0" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="70px"
                            label="内容"
                            :error="popup2.error&&popup2.error.content?popup2.error.content[0]:''"
                        >
                            <el-input
                                v-model="popup2.form.content"
                                :autosize="{ minRows: 2, maxRows: 6 }"
                                type="textarea"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="closed">
                    <el-button @click="popup2.switch=false">取消</el-button>
                    <el-button type="primary" @click="popup2FnAdd">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 回复 -->
        <el-dialog
            v-model="popup_3.switch"
            :title="popup_3.title"
            width="40%"
        >
            <el-form
                :model="replayLogable.item"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="处理对象" prop="name"
                            :error="popup_3.msg&&popup_3.msg.type?popup_3.msg.type[0]:''"
                        >
                            <el-select v-model="popup_3.form.type" class="head-btn" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.toushu_return_type" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="标记"
                            :error="popup_3.msg&&popup_3.msg.flg?popup_3.msg.flg[0]:''"
                        >
                            <el-select v-model="popup_3.form.flg" class="head-btn" clearable placeholder="">
                                <el-option v-for="(item,i) in opts_all.obj.flg_type" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="70px"
                            label="回复附件"
                            :error="popup_3.msg&&popup_3.msg.affix?popup_3.msg.affix[0]:''"
                        >
                            <el-upload
                                ref="uploadRef"
                                action="***"
                                :auto-upload="false"
                                :file-list="file_list3"
                                :on-change="(file,files)=>{
                                    file_list3 = files
                                }"
                                :on-remove="(file,files)=>{
                                    file_list3 = files
                                }"
                            >
                                <el-button type="primary">选择附件</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="70px"
                            label="回复内容"
                            :error="popup_3.msg&&popup_3.msg.content?popup_3.msg.content[0]:''"
                        >
                            <el-input
                                v-model="popup_3.form.content"
                                class="head-btn"
                                :autosize="{ minRows: 2, maxRows: 6 }"
                                type="textarea"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="closed">
                    <el-button @click="popup_3.switch=false">取消</el-button>
                    <el-button type="primary" @click="popupFuncAdd3">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 转办  -->
        <el-dialog
            v-model="popup_1.switch"
            title="转办"
            width="400px"
        >
            <el-form
                :model="popup_1.form"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24">
                        <el-form-item
                            label="投诉转办对象" prop="name"
                            :error="popup_1.msg&&popup_1.msg.type?popup_1.msg.type[0]:''"
                        >
                            <el-select v-model="popup_1.form.type" class="head-btn" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.toushu_return_type" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="closed">
                    <el-button @click="popup_1.switch=false">取消</el-button>
                    <el-button type="primary" @click="popupFuncAdd">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!--审核 /修改 -->
        <el-dialog
            v-model="data_1.add_switch"
            :title="data_1.add_title"
            width="50%"
        >
            <el-form
                :model="tableData.arr"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="状态"
                            :error="data_1.add_error&&data_1.add_error.status?data_1.add_error.status[0]:''"
                        >
                            <el-select v-model="data_1.add_form.status" class="head-btn" clearable>
                                <el-option v-for="(item) in opts_all.obj.comment_status" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="投诉内容"
                            :error="data_1.add_error&&data_1.add_error.title?data_1.add_error.title[0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.content"
                                class="head-btn"
                                :autosize="{ minRows: 4, maxRows: 8 }"
                                type="textarea"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="closed">
                    <el-button @click="data1_switch=false">取消</el-button>
                    <el-button type="primary" @click="clickFuncAddVote">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog
            v-model="comment.switch_details"
            title="详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">评分</div>
                    <div class="right">{{ data_1.add_form.score }}</div>
                </div>
                <div class="item">
                    <div class="left">评论状态</div>
                    <div class="right">{{ getOptVal(opts_all.obj.comment_status,data_1.add_form.status) }}</div>
                </div>
                <div class="item">
                    <div class="left">评论时间</div>
                    <div class="right">{{ data_1.add_form.created_at }}</div>
                </div>
                <div class="item">
                    <div class="left">修改时间</div>
                    <div class="right">{{ data_1.add_form.updated_at }}</div>
                </div>
                <div class="item">
                    <div class="left">评论内容</div>
                    <div class="right">{{ data_1.add_form.content }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="comment.switch_details = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 投诉回复 -->
        <el-dialog
            v-model="examine_switch"
            title="回复"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">是否确认审核</div>
                    <div class="right">
                        <el-radio v-model="statusValue" label="1">是</el-radio>
                        <el-radio v-model="statusValue" label="0">否</el-radio>
                    </div>
                </div>
                <div class="item">
                    <div class="left">留言</div>
                    <!-- <div class="right">{{ dataForm.item.content }}</div> -->
                    <el-input v-model="dataForm.item.content" :autosize="{ minRows: 2, maxRows: 6 }" type="textarea" class="right" />
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="examine_switch = false">取消</el-button>
                    <el-button @click="examineSure">确定</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 投诉结案 -->
        <el-dialog
            v-model="setting_switch"
            title="结案"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">是否确认结案</div>
                    <div class="right">
                        <el-radio v-model="statusValue_1" label="8">是</el-radio>
                        <el-radio v-model="statusValue_1" label="0">否</el-radio>
                    </div>
                </div>
                <div class="item">
                    <div class="left">留言</div>
                    <!-- <div class="right">{{ dataForm.item.content }}</div> -->
                    <el-input v-model="dataForm.item.content" :autosize="{ minRows: 2, maxRows: 6 }" type="textarea" class="right" />
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="setting_switch = false">取消</el-button>
                    <el-button @click="settingSure">确定</el-button>
                </span>
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
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
/* ----------------------------------------------------------------------------------------------------------------------- */
import {
    // APIgetComplaintList
    APIgetComplaintDetails,
    APIgetCommentList,
    // APIpostComment,
    APIgetCommentDetails,
    APIputComplaint
    // APIpostComplaint
} from '@/api/custom/custom.js'
const dataForm = reactive({
    item: {
        uinfo: {
            name: ''
        }
    }
})
const popup_3 = reactive({
    switch: false,
    form: {},
    msg: {},
    title: '进行回复'
})
const Name = ref('')
const activeName = ref('1')
const replayTotlogs = reactive({
    item: {}
})
const replayLogable = reactive({
    item: ''
})
// 投诉详情
APIgetComplaintDetails(route.query.id, { log: 'all' }).then(res => {
    console.log(res)

    dataForm.item = res
    // console.log(res.totlogs)
    console.log(dataForm.item)
    console.log(dataForm.item.totlogs)
    res.affixs = []
    for (let i in res.affix) {
        res.affixs.push(import.meta.env.VITE_APP_FOLDER_SRC + res.affix[i])
    }
    for (let i in res.totlogs) {
        res.totlogs[i].logable.affixs = []
        for (let j in res.totlogs[i].logable.affix) {
            res.totlogs[i].logable.affixs.push(import.meta.env.VITE_APP_FOLDER_SRC + res.totlogs[i].logable.affix[j])
        }
    }
    Name.value = dataForm.item.uinfo.name
    replayTotlogs.item = dataForm.item.totlogs
    replayLogable.item = replayTotlogs.item.logable
    console.log(replayTotlogs.item)
})
const data = {
    content: '对方能够代加工',
    score: 9,
    atutype: 1,
    tagid: '34kgkfoiik12ffbvfg24dufj',
    atuid: '34kgkfoiik12ffbvfg24dufj',
    status: 3
}
import { APIputComment, APIpostDealAdd } from '@/api/custom/custom.js'
// 投诉审核
const examine_switch = ref(false)
// const examineFunk = () => {
//     examine_switch.value = true
// }
// 投诉审核确认
const statusValue = ref('')
const examineSure = () => {
    dataForm.item.status = parseInt(statusValue.value)
    if (dataForm.item.status == 1) {
        APIputComplaint(route.query.id, dataForm.item).then(res => {
            ElMessage.success('已审核成功！')
        })
    } else {}
    examine_switch.value = false
}
// 投诉回复
const replyFunk = () => {
    console.log(replayLogable.item)
    dataForm.item.status = 1
    popup_3.msg = {}
    popup_3.tid = ''
    popup_3.form = {
        caid: replayLogable.item.id,
        content: replayLogable.item.content,
        affix: replayLogable.item.affix,
        type: replayLogable.item.type,
        flg: replayLogable.item.flg
    }
    popup_3.switch = true
    let arr = []
    for (let i in replayLogable.item.affix) {
        if (replayLogable.item.affix[i]) {
            arr.push({
                name: replayLogable.item.affix[i]
            })
        }
    }
    file_list3.value = arr
}
// 投诉转办
const popup_1 = reactive({
    switch: false,
    form: {},
    msg: {}
})
const TransferFunk = () => {
    popup_1.msg = {}
    popup_1.form = {
        id: route.query.id
    }
    popup_1.switch = true
}
import {
    APIpostAllot
} from '@/api/custom/custom.js'
const popupFuncAdd = val => {
    popup_1.msg = {}
    APIpostAllot(popup_1.form.id, { type: popup_1.form.type }).then(res => {
        console.log(res)

        ElMessage.success('转办成功')
        popup_1.switch = false
        refreshFunc()
    }).catch(err => {
        ElMessage.error('转办失败')
    })
}
// 投诉结案
const setting_switch = ref(false)
// const settleFunk = () => {
//     dataForm.item.status = 8
//     APIputComplaint(route.query.id, dataForm.item).then(res => {
//         ElMessage.success('已结案！')
//     })
// }
// 投诉结案确认
const statusValue_1 = ref('')
const settingSure = () => {
    dataForm.item.status = parseInt(statusValue_1.value)
    if (dataForm.item.status == 8) {
        APIputComplaint(route.query.id, dataForm.item).then(() => {
            ElMessage.success('已结案！')
        })
    } else {}
    setting_switch.value = false
}
const file_list3 = ref([])
import { getFilesKeys } from '@/util/files.js'
const popupFuncAdd3 = () => {
    let files = []
    let file_key = []
    if (file_list3.value.length > 0) {
        for (let i in file_list3.value) {
            if (!file_list3.value[i].raw) {
                file_key.push(file_list3.value[i].name)
            } else {
                files.push(file_list3.value[i].raw)
            }
        }
    }
    let data = {
        caid: popup_3.form.caid,
        content: popup_3.form.content,
        affix: file_key,
        type: popup_3.form.type,
        flg: popup_3.form.flg,
        tgt: 'ab'
    }
    popup_3.msg = {}
    getFilesKeys(files, 'folder').then(arr => {
        data.affix = file_key.concat(arr)
        APIpostDealAdd(route.query.id, data).then(res => {
            ElMessage.success(res.msg)
            popup_3.switch = false
            APIgetComplaintDetails(route.query.id).then()
        })
    })
    return false
    // dealFuncAddPut(data)
}
const tableData = reactive({
    arr: []
})
// 删除评论
// const toggleDelete = () => {
//     console.log(selectArray.arr[0].tgtid)
//     APIdeleteAdComment(route.query.id).then(res => {
//         console.log(res)
//         getFuncCommentList()
//     })
// }
// 审核
// 是否开启评论
const popup1 = reactive({
    switch: false,
    using: false,
    scoreper: 0
})
import {
    APIgetCommentconfig,
    APIpostCommentconfig,
    APIdeleteCommentconfig,
    APIpostComment
} from '@/api/custom/custom.js'
const switchFnUse = val => {
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
const popup2 = reactive({
    switch: false,
    error: {},
    form: {}
})
const popup2FnReply = val => {
    popup2.error = {}
    popup2.form = {
        content: '',
        atuid: val.uid,
        atutype: val.utype,
        score: 0,
        tagid: val.id

    }
    popup2.switch = true
}
const popup2FnAdd = () => {
    popup2.error = {}
    APIpostComment(route.query.id, popup2.form).then(res => {
        ElMessage.success('回复成功')
        popup2.switch = false
        getFuncCommentList()
    }).catch(err => {
        ElMessage.error('回复失败')
    })
}
// 评论审核
const status = ref(0)
const data_1 = reactive({
    search: {},
    switch_search: false,
    page: 1,
    total: 0,
    per_page: 15,
    list: [],
    add_switch: false,
    add_title: '审核',
    add_form: {},
    add_error: {},
    details_data: {},
    details_switch: false
})
const toggleSelection = val => {
    // console.log(selectArray.arr[0].status)
    // status.value = selectArray.arr[0].status
    // status.value = 20
    // APIputComment(selectArray.arr[0].id, { status: status.value }).then(res => {
    //     console.log(res)
    //     getFuncCommentList()
    //     data_1.add_switch = true
    // })
    data_1.add_error = {}
    data_1.add_title = '修改'
    // data_1.add_switch

    APIgetCommentDetails(val.id).then(res => {
        console.log(res)
        data_1.add_form = res
        let arr = []
        for (let i in res.affix) {
            if (res.affix[i]) {
                arr.push({
                    name: res.affix[i]
                })
            }
        }
        // file_list.value = arr
        // data_1.add_switch = true
    })
    data_1.add_switch = true
}
// 审核确认
const clickFuncAddVote = () => {
    parseInt(data_1.add_form.score)
    console.log(data_1.add_form.score)
    APIputComment(data_1.add_form.id, data_1.add_form).then(res => {
        console.log(res)
        getFuncCommentList()
        data_1.add_switch = false
        if (data_1.add_form == 30) {
            ElMessage.error('审核失败')
        } else {
            ElMessage.success('审核成功 ')
        }
    }).catch(err => {
        ElMessage.error('审核失败 ')
    })
}
// 详情
const comment = reactive({
    switch_details: false
})
const clickFuncDetail = val => {
    APIgetCommentDetails(val.id).then(res => {
        console.log(res)
        data_1.add_form = res
        let arr = []
        for (let i in res.affix) {
            if (res.affix[i]) {
                arr.push({
                    name: res.affix[i]
                })
            }
        }
        comment.switch_details = true
    })
}
// const clickFuncDetail = val => {}
const selectArray = reactive({
    arr: []
})
const handleSelectionChange = select => {
    console.log(select)
    selectArray.arr = select
}
const score = ref(3)
// 添加评论
// APIpostComment(route.query.id, data).then(res => {
//     console.log(tableData.arr)
// })
// 获取评论列表
const getFuncCommentList = () => {
    let params = {
        tgtid: route.query.id
    }
    APIgetCommentList(params).then(res => {
        console.log(res)
        tableData.arr = res
    })
}
// APIgetCommentDetails('62d65e613c8a28343964288c').then(res => {
//     console.log(res)
//     // score.value = res.score
//     // console.log(score.value)
// })
/* ----------------------------------------------------------------------------------------------------------------------- */
const refreshFunc = () => {
    getFuncCommentList()
}
watch(() => {
    refreshFunc()
}, { immediate: true, deep: true })
// const score = ref(10)
// // 配置项
import {
    getOpts,
    getOptVal
} from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
const newcatpro = reactive({
    item: {}
})
const newcatob = reactive({
    item: {}
})
import {
    APIgetTypeList
} from '@/api/custom/custom.js'
getOpts(['flg_type', 'tousu_type_kind', 'toushu_status', 'toushu_ano', 'toushu_pub', 'kind', 'toushu_return_type', 'toushu_illegal', 'illegal_type', 'illegal_user', 'comment_status', 'comment_scoreper']).then(res => {
    opts_all.obj = res
    APIgetTypeList(opts_all.obj.kind[1].key).then(res => {
        console.log(res)
        opts_all.obj.problem_type = res
        // let newArray = []
        console.log(dataForm.item.catob)
        opts_all.obj.problem_type.forEach(item => {
            if (item.id == dataForm.item.catpro) {
                newcatpro.item = item
            }
        })
    })
    APIgetTypeList(opts_all.obj.kind[2].key).then(res => {
        opts_all.obj.toushu_user_type = res
        opts_all.obj.toushu_user_type.forEach(item => {
            if (item.id == dataForm.item.catob) {
                newcatob.item = item
            }
        })
    })
})
import { Delete, Edit } from '@element-plus/icons-vue'
</script>
<style scoped>
    .sno {
        color: #b7b1b1;
    }
    .btn1 {
        cursor: default;
    }
    .btn2 {
        margin: 0 50px 30px 0;
    }
    .content {
        margin-left: -33px;
    }
    .btn3 {
        margin-right: 20px;
    }
    .box {
        display: flex;
        justify-content: space-between;
    }
    .el-table th:first-child .cell {
        display: none;
    }
    .el-button + .el-button {
        margin-left: 0;
    }
    .el-button {
        margin-right: 20px;
    }
    .closed {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
    }
    .radioGroup {
        margin-left: 20px;
        display: inline-block;
    }
    .isComment {
        display: flex;
        align-items: center;
        margin: 10px 0 15px;
    }
    .image {
        width: 100px;
        height: 100px;
        margin-right: 10px;
    }

    /* .el-button--primary {
        margin-right: 20px;
    } */
</style>
