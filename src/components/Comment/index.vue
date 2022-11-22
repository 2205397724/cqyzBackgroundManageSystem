<template>
    <div>
        <div>
            <el-button
                class="m-b-20 m-t-5" type="primary" :icon="Plus" size="large" @click="setComment"
            >
                评论设置
            </el-button>
            <el-button
                class="m-b-20 m-t-5" type="primary" :icon="Plus" size="large"
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
        <div class="m-b-20">
            <el-row :gutter="20">
                <el-col v-for="(item,i) in popup4.arr" :key="i" :span="4">
                    <div style="border-radius: 20px; height: 60px;display: flex; flex-direction: column;">
                        <div style="background-color: #d1fadb;flex: 50%;text-align: center;line-height: 30px; border-top-left-radius: 20px;border-top-right-radius: 20px;">{{ item.cnt }}</div>
                        <div style="background-color: #96df93; flex: 50%; text-align: center;line-height: 30px; border-bottom-left-radius: 20px;border-bottom-right-radius: 20px;">{{ item.title }}</div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-table
            :data="data_1.list" :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
            class="tab_1" style="margin-top: 0;"
        >
            <el-table-column label="评论内容" prop="content">
            </el-table-column>
            <el-table-column label="用户">
                <template #default="scope">
                    <span>{{ scope.row.uname|| 'null' }} </span>
                </template>
            </el-table-column>
            <el-table-column label="点赞">
                <template #default="scope">
                    <div class="flex-row font-grey size-sm">
                        <span>赞:{{ scope.row.zan }} </span>
                        <span class="p-l-10">踩:{{ scope.row.cai }} </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="评分" width="80">
                <template #default="scope">
                    <span>{{ scope.row.score }} </span>
                </template>
            </el-table-column>
            <el-table-column label="回复" width="80">
                <template #default="scope">
                    <span>{{ scope.row.reply.length }} </span>
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
            v-model:current-page="data_1.page" style="float: right;" layout="prev,next,jumper," :total="Infinity"
            :page-size="data_1.per_page" background prev-text="上一页" next-text="下一页" hide-on-single-page
        />
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
        <!-- 评论设置 -->
        <el-dialog v-model="popup4.switch" title="评论设置" width="60%" :append-to-body="true">
            <div class="isComment">
                <span>是否开启评论：</span>
                <el-switch
                    v-model="popup1.using" inline-prompt active-text="开" inactive-text="关"
                    @change="switchFnUse"
                />
                <div style="margin-left: 20px;display: inline-block;">
                    <el-radio-group v-model="popup1.scoreper" :disabled="!popup1.using" @change="switchFnUse(true)">
                        <el-radio
                            v-for="(item,i) in opts_all.obj.comment_scoreper" :key="item.key" :label="item.key"
                            size="large"
                        >
                            {{ item.val }}
                        </el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div style="margin: 10px 0 15px;font-size: 14px; padding: 0 20px;">
                <span>是否开启点评：</span>
                <el-switch
                    v-model="popup4.using" inline-prompt active-text="开" inactive-text="关"
                    @change="switchFnUse_1"
                />
                <el-button class="m-l-20" type="primary" :disabled="popup4.using ? false: true" @click="addOpinions">添加观点</el-button>
            </div>
            <div style="margin-left: 120px;">
                <el-row v-if="flag" :gutter="20" class="m-b-5">
                    <el-col :span="3">排序</el-col>
                    <el-col :span="15">观点内容</el-col>
                </el-row>
                <el-row v-for="(item,i) in popup4.arr" :key="i" :gutter="20" class="m-b-10">
                    <el-col :span="3">
                        <el-input v-model="item.sort" type="number" />
                    </el-col>
                    <el-col :span="15">
                        <el-input v-model="item.title" type="text" />
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" @click="addSureFunc(item,i)">确定</el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="danger" @click="deleteFunc(item,i)">删除</el-button>
                    </el-col>
                </el-row>
            </div>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="popup2.switch=false">取消</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog v-model="popup3.switch" title="详情" width="50%" :append-to-body="true">
            <div class="flex-row p-10">
                <div>
                    <el-avatar :size="50" src="https://app.cqyezhuapp.com/appdown/logo.png" />
                </div>
                <div class="p-l-10">
                    <div class="flex-row">
                        <span>{{ popup3.details.uname }}</span>
                        <span class="p-l-20">用户ID：{{ popup3.details.uid }}</span>
                        <el-tag v-if="popup3.details.status == 10" type="waring" roung>未审核</el-tag>
                        <el-tag v-if="popup3.details.status == 20" type="success" round>已审核</el-tag>
                        <el-tag v-if="popup3.details.status == 30" type="danger" round>审核失败</el-tag>
                    </div>
                    <div class="size-base p-tb-10">{{ popup3.details.content }}</div>
                    <div class="font-grey size-sm">
                        <span>时间：{{ popup3.details.created_at }}</span>
                        <span class="p-l-20">区域：{{ popup3.details.loc }}</span>
                        <span class="p-l-20">IP：{{ popup3.details.ip }}</span>
                    </div>
                </div>
            </div>
            <div class="details-box p-l-30">
                <div class="flex-row p-10" v-for="(reply,i) in popup3.details.reply" :key="i">
                    <div>
                        <el-avatar :size="50" src="https://app.cqyezhuapp.com/appdown/logo.png" />
                    </div>
                    <div class="p-l-10">
                        <div class="flex-row">
                            <span class="size-sm">{{reply.uname }}</span>
                            <span class="p-l-20 size-sm">用户ID：{{ reply.uid }}</span>
                            <el-tag v-if="reply.status == 10" type="waring" roung>未审核</el-tag>
                            <el-tag v-if="reply.status == 20" type="success" round>已审核</el-tag>
                            <el-tag v-if="reply.status == 30" type="danger" round>审核失败</el-tag>
                        </div>
                        <div class="size-base p-tb-10">{{ reply.content }}</div>
                        <div class="font-grey size-sm">
                            <span>时间：{{ reply.created_at }}</span>
                            <span class="p-l-20">区域：{{ reply.loc }}</span>
                            <span class="p-l-20">IP：{{ reply.ip }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="popup4.switch = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import {
    ref,
    defineProps
} from 'vue'
const props = defineProps(['id'])
const id = ref(props.id)
const data_list = ref(0)
import {
    APIgetCommentList,
    APIgetCommentDetails,
    APIputComment,
    APIgetCommentOpinions,
    APIpostCommentOpinions,
    APIputCommentOpinions,
    APIpostCommentStatistic
} from '@/api/custom/custom.js'
import { ElMessage } from 'element-plus'
// const data_list = ref(props.data_list)
const switchFunk = () => {
    console.log(id)
    // row.comment == 1
    console.log(data_list)
    if (data_list.value == 1) {
        APIpostCommentconfig(props.id, { scoreper: 10 }).then(res => {
            console.log(res)
        })
    } else {
        APIdeleteCommentconfig(props.id).then(res => {
            console.log(res)
        })
    }
}
// 业主评论
let comment_list = reactive([])
const ownerComment = () => {
    let params = {
        tgtid: props.id
    }
    APIgetCommentList(params)
        .then(res => {
            // console.log(res)
            comment_list.length = 0
            res.forEach(element => {
                comment_list.push(element)
            })
            console.log(comment_list)
        })
        .catch(err => {
            from_error.msg = err.data
        })
}
// 修改评论
const modify = reactive({
    Id: ''
})
const comment_details = reactive({
    item: ''
})
const modifyComment = id => {
    modify.Id = id
    switch_comment.value = true
    APIgetCommentDetails(id)
        .then(res => {
            console.log(res)
            comment_details.item = res
            comment_details.item.status += ''
        })
        .catch(err => {
            from_error.msg = err.data
        })
}
// 评论详情
const getCommentDetail = id => {
    switch_comment_detail.value = true
    comment_details.length = 0
    APIgetCommentDetails(id)
        .then(res => {
            console.log(res)
            comment_details.item = res
        })
        .catch(err => {
            from_error.msg = err.data
        })
}
// 提交评论修改
const dialogModifyComment = (content, status) => {
    console.log(modify.Id)
    APIputComment(modify.Id, { content: content, status: status })
        .then(res => {
            console.log(res)
            ElMessage.success('修改成功')
        })
        .catch(err => {
            ElMessage.error('提交失败')
        })
    switch_comment.value = false
    ownerComment()
}
import { Plus } from '@element-plus/icons-vue'
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
const popup1 = reactive({
    switch: false,
    using: false,
    scoreper: 0
})
import {
    APIpostComment,
    APIpostCommentconfig,
    APIdeleteCommentconfig
} from '@/api/custom/custom.js'
const switchFnUse = val => {
    console.log(val)
    if (val) {
        APIpostCommentconfig(props.id, { scoreper: popup1.scoreper }).then(res => {
            // ElMessage.success('已开启')
        })
        return false
    }
    APIdeleteCommentconfig(props.id).then(res => {
        // ElMessage.success('已开启')
    })
}
// const switchFnStatus = () => {
//     APIgetCommentconfig(props.id).then(res => {
//         console.log(res)
//         popup1.using = false
//         if (res) {
//             popup1.using = true
//             popup1.scoreper = res.scoreper
//         }
//     })
// }
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
        APIpostComment(popup2.form.tagid, popup2.form).then(res => {
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
    details: {
        reply:[]
    }
})
const popup3FnDetails = id => {
    APIgetCommentDetails(id).then(res => {
        popup3.details = res
        popup3.switch = true
        let data = {
            page: data_1.page,
            per_page: data_1.per_page,
            tgtid: res.id
        }
        APIgetCommentList(data).then(rep => {
            popup3.details.reply = rep
        })
    })
}
const data_1 = reactive({
    list: [],
    page: 1,
    total: 50,
    per_page: 15
})
const data1FnGetList = () => {
    let data = {
        page: data_1.page,
        per_page: data_1.per_page,
        tgtid: props.id
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
data1FnGetList()
// 评论设置
const popup4 = reactive({
    switch: false,
    using: false,
    item: {},
    arr: [{
        sort: '',
        title: ''
    }]
})
const flag = ref(false)
const addOpinions = () => {
    let data = {
        'sort': '',
        'title': ''
    }
    popup4.arr.push(data)
    flag.value = true
}
const compare = attr => {
    return function(a, b) {
        var value1 = a[attr]
        var value2 = b[attr]
        return value1 - value2
    }
}
const setComment = () => {
    popup4.switch = true
    console.log(popup4.arr)
    // APIgetCommentOpinions(props.id).then(res => {
    //     console.log(res)
    //     popup4.arr = res.sort(compare('sort'))
    // })
    // APIpostCommentStatistic({ tgt_id: props.id }).then(res => {
    //     console.log(res)
    // })
}
const switchFnUse_1 = () => {
    if (popup4.using == false) {
        flag.value = false
        popup4.arr = []
    }
}
const getCommentOpinions = () => {
    APIgetCommentOpinions(props.id).then(res => {
        console.log(res)
        popup4.arr = res.sort(compare('sort'))
        console.log(popup4.arr)
    })
    APIpostCommentStatistic({ tgt_id: props.id }).then(res => {
        console.log(res)
        let comStatstic = {}
        res.forEach((item, i) => {
            comStatstic[item.tagid] = item.cnt
        })
        popup4.arr.forEach((item, i) => {
            item.cnt = comStatstic[item.id] || 0
        })
    })
}
getCommentOpinions()
const addSureFunc = (item, index) => {
    APIgetCommentOpinions(props.id).then(res => {
        console.log(res)
        console.log(popup4.arr[index])
        if (res.length > 0) {
            if (res.some(items => items.id == popup4.arr[index].id)) {
                APIputCommentOpinions(popup4.arr[index].id, popup4.arr[index]).then(res => {
                    console.log('修改', res)
                    ElMessage.success('修改成功')
                })
            } else {
                APIpostCommentOpinions(props.id, item).then(res => {
                    console.log(res)
                    popup4.arr[index] = res
                    console.log(popup4.arr)
                    ElMessage.success('添加成功')
                }).catch(() => {
                    ElMessage.error('添加失败')
                })
            }

        } else {
            console.log(item)
            APIpostCommentOpinions(props.id, item).then(res => {
                console.log(res)
                popup4.arr[index] = res
                console.log(popup4.arr)
                ElMessage.success('添加成功')
            }).catch(() => {
                ElMessage.error('添加失败')
            })
        }

    })

}
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {
        status_all: []
    }
})
getOpts(['comment_scoreper', 'comment_status']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss" scoped>
.isComment {
    display: flex;
    align-items: center;
    margin: 10px 0 15px;
    font-size: 14px;
    background-color: #fafafa;
    padding: 0 20px;
}
</style>
