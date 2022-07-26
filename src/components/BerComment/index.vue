<template>
    <div style="display: inline-block;">
        <el-button
            size="small" style="margin-left: 12px;" @click="refreshFn"
        >
            评论
        </el-button>
        <!-- 详情 -->
        <el-dialog
            v-model="popup1.switch"
            title="评论管理"
            width="70%"
            :append-to-body="true"
        >
            <div style="display: flex;align-items: center;">
                <span>是否开启评论：</span>
                <el-switch
                    v-model="popup1.using"
                    inline-prompt
                    active-text="开"
                    inactive-text="关"
                    @change="switchFnUse"
                />
                <div style="margin-left: 20px;display: inline-block;">
                    <el-radio-group v-model="popup1.scoreper" :disabled="!popup1.using" @change="switchFnUse(true)">
                        <el-radio v-for="(item,i) in opts_all.obj.comment_scoreper" :key="item.key" :label="item.key" size="large">{{ item.val }}</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div>
                <el-button
                    class="head-btn" type="primary"
                    @click="()=>{
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
                style="max-height: calc(85vh - 50px - 40px - 54px - 42px - 50px - 40px);width: 100%;overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
            >
                <el-table-column label="评论内容" width="250">
                    <template #default="scope">
                        <span>{{ scope.row.content }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="评论人" width="110">
                    <template #default="scope">
                        <span>{{ scope.row.uname|| 'null' }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="110">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.comment_status,scope.row.status ) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="评论时间" width="250">
                    <template #default="scope">
                        <span>{{ scope.row.created_at }} </span>
                    </template>
                </el-table-column>
                <el-table-column />
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
                        <el-popconfirm
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
                        </el-popconfirm>
                        <el-button
                            size="small"
                            @click="popup2FnReply(scope.row)"
                        >
                            回复
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column />
            </el-table>
            <el-pagination
                v-model:current-page="data_1.page"
                style="padding-top: 20px;"
                layout="total,prev,pager,next,jumper,"
                :total="data_1.total"
                :page-size="data_1.per_page"
                background
                hide-on-single-page
            />
            <!-- <template #footer>
                <span class="dialog-footer">
                    <el-button @click="popup1.switch = false">取消</el-button>
                </span>
            </template> -->
        </el-dialog>
        <!-- 修改添加 -->
        <el-dialog
            v-model="popup2.switch"
            :title="popup2.title"
            width="50%"
            :append-to-body="true"
        >
            <el-form
                :model="popup2.form"
            >
                <el-row :gutter="10">
                    <el-col v-if="popup2.title == '修改'" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="状态"
                            :error="popup2.error&&popup2.error.status?popup2.error.status[0]:''"
                        >
                            <el-select v-model="popup2.form.status" class="head-btn" placeholder="" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.comment_status" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col v-if="popup2.title == '回复'" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
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
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="popup2.switch=false">取消</el-button>
                    <el-button type="primary" @click="popup2FnAdd">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog
            v-model="popup3.switch"
            title="详情"
            width="50%"
            :append-to-body="true"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">评论人</div>
                    <div class="right">{{ popup3.details.uname }}</div>
                </div>
                <div class="item">
                    <div class="left">评论时间</div>
                    <div class="right">{{ popup3.details.created_at }}</div>
                </div>
                <div class="item">
                    <div class="left">评论内容</div>
                    <div class="right">{{ popup3.details.content }}</div>
                </div>
                <div class="item">
                    <div class="left">评状态</div>
                    <div class="right">{{ getOptVal(opts_all.obj.comment_status,popup3.details.status) }}</div>
                </div>
                <div class="item">
                    <div class="left">评论人IP</div>
                    <div class="right">{{ popup3.details.ip }}</div>
                </div>
                <div class="item">
                    <div class="left">所在网络</div>
                    <div class="right">{{ popup3.details.loc }}</div>
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
import {
    defineProps,
    // defineEmits,
    watch,
    reactive,
    toRefs
} from 'vue'
import {
    ElMessage
} from 'element-plus'
const props = defineProps(['id'])
// const emits = defineEmits(['update:zid'])
// emits('update:cid', data.id)
const {
    id
} = toRefs(props)
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
const popup1 = reactive({
    switch: false,
    using: false,
    scoreper: 0
})
import {
    APIgetCommentconfig,
    APIpostCommentconfig,
    APIdeleteCommentconfig
} from '@/api/custom/custom.js'
const switchFnUse = val => {
    if (val) {
        APIpostCommentconfig(id.value, { scoreper: popup1.scoreper }).then(res => {
            ElMessage.success(res.msg)
        })
        return false
    }
    APIdeleteCommentconfig(id.value).then(res => {
        ElMessage.success(res.msg)
    })
}
const switchFnStatus = () => {
    APIgetCommentconfig(id.value).then(res => {
        popup1.using = false
        if (res.data) {
            popup1.using = true
            popup1.scoreper = res.data.scoreper
        }
    })
}
const data_1 = reactive({
    list: [],
    page: 1,
    total: 0,
    per_page: 15
})
import {
    APIgetCommentList,
    APIgetCommentDetails,
    // APIdeleteComment,
    APIputComment,
    APIpostComment
} from '@/api/custom/custom.js'
const data1FnGetList = () => {
    let data = {
        page: data_1.page,
        per_page: data_1.per_page
    }
    APIgetCommentList(id.value, data).then(res => {
        data_1.list = res.data.items
        data_1.total = res.data.aggregation.total_cnt
    })
}
watch(() => data_1.page, new_val => {
    data1FnGetList()
})
const popup2 = reactive({
    switch: false,
    title: '添加',
    error: {},
    form: {}
})
const popup2FnAdd = () => {
    popup2.error = {}
    if (popup2.title == '添加' || popup2.title == '回复') {
        APIpostComment(id.value, popup2.form).then(res => {
            ElMessage.success(res.msg)
            popup2.switch = false
            data1FnGetList()
        }).catch(err => {
            popup2.error = err.data
        })
    } else if (popup2.title == '修改') {
        APIputComment(popup2.form.id, popup2.form).then(res => {
            ElMessage.success(res.msg)
            popup2.switch = false
            data1FnGetList()
        }).catch(err => {
            popup2.error = err.data
        })
    }
}
const popup2FnModify = val => {
    popup2.error = {}
    popup2.title = '修改'
    APIgetCommentDetails(val.id).then(res => {
        popup2.form = {
            id: res.data.id,
            content: res.data.content,
            status: res.data.status
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
        popup3.details = res.data
        popup3.switch = true
    })
}

// const data1FnDelete = id => {
//     APIdeleteComment(id).then(res => {
//         data1FnGetList()
//     })
// }
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
const refreshFn = () => {
    popup1.switch = true
    switchFnStatus()
    data_1.page = 1
    data1FnGetList()
}
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['comment_scoreper', 'comment_status']).then(res => {
    opts_all.obj = res
})

</script>
