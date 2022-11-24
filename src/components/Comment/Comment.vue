<template>
    <div>
        <div class="m-t-5 m-b-20">
            <el-button type="primary" :icon="Setting" size="large" @click="()=>{ settingPopup.switch=true }">评论设置</el-button>
            <el-button type="primary" :icon="Plus" size="large"
                :disabled="settingPopup.using ? false:true"
                @click="()=>{
                    editaddPopup.form = {};
                    editaddPopup.error = {};
                    editaddPopup.title = '添加';
                    editaddPopup.switch = true;
                }"
            > 添加 </el-button>
        </div>
        <div class="m-b-20" v-if="settingPopup.tagarr.length>0">
            <el-row :gutter="20">
                <el-col v-for="(item,i) in settingPopup.tagarr" :key="i" :span="4">
                    <div style="height: 60px;display: flex; flex-direction: column;">
                        <div style="background-color: #edfaf0;color: #59a34d;flex: 50%;text-align: center;line-height: 30px; border-top-left-radius: 8px;border-top-right-radius: 8px;">{{ item.cnt }}</div>
                        <div style="background-color: #cce9d8;font-size: 14px; color: #599d5d;flex: 50%; text-align: center;line-height: 30px; border-bottom-left-radius: 8px;border-bottom-right-radius: 8px;">{{ item.title }}</div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-table :data="commentData.list" :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}" class="tab_1">
            <el-table-column label="评论内容" prop="content"></el-table-column>
            <el-table-column label="用户" prop="uname"></el-table-column>
            <el-table-column label="点赞">
                <template #default="scope">
                    <div class="flex-row font-grey size-sm">
                        <span>赞:{{ scope.row.zan }} </span>
                        <span class="p-l-10">踩:{{ scope.row.cai }} </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="评分" width="80" prop="score"></el-table-column>
            <el-table-column label="回复" width="80">
                <template #default="scope">
                    <span>{{ scope.row.reply.length }} </span>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
                <template #default="scope">
                    <el-tag v-if="scope.row.status == 10" type="waring" roung>未审核</el-tag>
                    <el-tag v-if="scope.row.status == 20" type="success" round>已审核</el-tag>
                    <el-tag v-if="scope.row.status == 30" type="danger" round>审核失败</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="评论时间" prop="created_at"></el-table-column>
            <el-table-column fixed="right" label="操作" width="260">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="editaddPopupModifyOpen(scope.row)">
                        修改
                    </el-button>
                    <el-button size="small" @click="getCommentDetails(scope.row.id)">
                        详情
                    </el-button>
                    <el-popconfirm
                        title="确定要删除当前项么?"
                        cancel-button-type="info"
                        @confirm="delCommentDetails(scope.row)"
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
                    <el-button type="primary" size="small" @click="editaddPopupReplyOpen(scope.row)">
                        回复
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="page" style="float: right;margin-top: 15px;"
            layout="prev,next,jumper,"
            :total="Infinity"
            :page-size="per_page"
            prev-text="上一页"
            next-text="下一页"
            background
            hide-on-single-page
        />
        <!-- 修改添加 -->
        <el-dialog v-model="editaddPopup.switch" :title="editaddPopup.title" width="50%" :append-to-body="true">
            <el-form :model="editaddPopup.form">
                <el-row :gutter="10">
                    <el-col v-if="editaddPopup.title == '修改'" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item label-width="70px" label="状态"
                            :error="editaddPopup.error&&editaddPopup.error.status?editaddPopup.error.status[0]:''"
                        >
                            <el-radio-group v-model="editaddPopup.form.status">
                                <el-radio v-for="(item,i) in opts_all.obj.comment_status" :key="i"
                                    :label="item.key" :value="item.key">{{item.val}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col v-if="editaddPopup.title == '回复'" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item label-width="70px" label="打分"
                            :error="editaddPopup.error&&editaddPopup.error.score?editaddPopup.error.score[0]:''"
                        >
                            <el-input-number v-model="editaddPopup.form.score" :step="1" :max="settingPopup.scoreper" :min="0" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label-width="70px" label="内容"
                            :error="editaddPopup.error&&editaddPopup.error.content?editaddPopup.error.content[0]:''"
                        >
                            <el-input
                                v-model="editaddPopup.form.content" :autosize="{ minRows: 2, maxRows: 6 }"
                                type="textarea" placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="editaddPopup.switch=false">取消</el-button>
                    <el-button type="primary" @click="editaddSubmit">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 评论设置 -->
        <el-dialog v-model="settingPopup.switch" title="评论设置" width="60%" :append-to-body="true">
            <div class="isComment">
                <span>是否开启评论：</span>
                <el-switch v-model="settingPopup.using" inline-prompt active-text="开" inactive-text="关" @change="switchFnUse"/>
                <div style="margin-left: 20px;display: inline-block;">
                    <el-radio-group v-model="settingPopup.scoreper" :disabled="!settingPopup.using" @change="switchFnUse(true)">
                        <el-radio v-for="(item,i) in opts_all.obj.comment_scoreper" :key="i" :label="item.key" size="large">
                            {{ item.val }}
                        </el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div style="margin: 10px 0 15px;font-size: 14px; padding: 0 20px;">
                <span>是否开启点评：</span>
                <el-switch v-model="settingPopup.tag" inline-prompt active-text="开" inactive-text="关" @change="switchFnUse_1"/>
                <el-button class="m-l-20" type="primary" :disabled="settingPopup.tag ? false: true" @click="addOpinionsTag">添加观点</el-button>
            </div>
            <div style="margin-left: 120px;">
                <el-row :gutter="20" class="m-b-5">
                    <el-col :span="3">排序</el-col>
                    <el-col :span="15">观点内容</el-col>
                </el-row>
                <el-row v-for="(item,i) in settingPopup.tagarr" :key="i" :gutter="20" class="m-b-10">
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
                        <el-button type="danger" @click="deletetagFunc(item,i)">删除</el-button>
                    </el-col>
                </el-row>
            </div>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="settingPopup.switch=false">取消</el-button>
                </div>
            </template>
        </el-dialog>
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
                        <el-popconfirm
                            title="确定要删除当前项么?"
                            cancel-button-type="info"
                            @confirm="delCommentDetails(commentDetails.details)"
                        >
                            <template #reference>
                                <el-button class="m-l-10"
                                    type="danger"
                                    size="small"
                                >
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </div>
                    <div class="size-base p-tb-10">{{ commentDetails.details.content }}</div>
                    <div class="font-grey size-sm">
                        <span>时间：{{ commentDetails.details.created_at }}</span>
                        <span class="p-l-20">区域：{{ commentDetails.details.loc }}</span>
                        <span class="p-l-20">IP：{{ commentDetails.details.ip }}</span>
                    </div>
                </div>
            </div>
            <div class="details-box p-l-30">
                <div class="flex-row p-10" v-for="(reply,i) in commentDetails.details.reply" :key="i">
                    <div>
                        <el-avatar :size="50" :src="reply.uavatar" />
                    </div>
                    <div class="p-l-10">
                        <div class="flex-row">
                            <span class="size-sm">{{reply.uname }}</span>
                            <span class="p-l-20 size-sm">用户ID：{{ reply.uid }}</span>
                            <el-tag v-if="reply.status == 10" type="waring" roung>未审核</el-tag>
                            <el-tag v-if="reply.status == 20" type="success" round>已审核</el-tag>
                            <el-tag v-if="reply.status == 30" type="danger" round>审核失败</el-tag>
                            <el-popconfirm
                                title="确定要删除当前项么?"
                                cancel-button-type="info"
                                @confirm="delCommentDetails(reply)"
                            >
                                <template #reference>
                                    <el-button class="m-l-10"
                                        type="danger"
                                        size="small"
                                    >
                                        删除
                                    </el-button>
                                </template>
                            </el-popconfirm>
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
                    <el-button @click="commentDetails.switch = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup name="Comment">
import { ref, defineProps,onMounted } from 'vue'
import {
    APIgetCommentList,
    APIgetCommentDetails,
    APIputComment,
    APIgetCommentOpinions,
    APIpostCommentOpinions,
    APIputCommentOpinions,
    APIpostCommentStatistic,
    APIdelCommentStatistic,
    APIdeleteAdComment,
    APIpostComment,
    APIgetCommentconfig,
    APIpostCommentconfig,
    APIdeleteCommentconfig
} from '@/api/custom/custom.js'
import { ElMessage } from 'element-plus'
import { Plus,Setting } from '@element-plus/icons-vue'
import { getOpts, getOptVal } from '@/util/opts.js'
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
const props = defineProps(['id'])
const page = ref(1)
const per_page = ref(15)
const opts_all = reactive({
    obj: {
        status_all: []
    }
})
const commentData = reactive({
    list: [],
})
const editaddPopup = reactive({
    switch: false,
    title: '添加',
    error: {},
    form: {}
})
const settingPopup = reactive({
    switch: false,
    using: false,
    scoreper:0,
    tag:false,
    tagarr: [{
        sort: '',
        title: ''
    }]
})
const commentDetails = reactive({
    switch: false,
    details: {
        reply:[]
    }
})

//拉取配置
const getOptions = ()=>{
    getOpts(['comment_scoreper', 'comment_status']).then(res => {
        opts_all.obj = res
    })
}
//拉取评论列表
const getList = () => {
    let data = {
        page: page.value,
        per_page: per_page.value,
        tgtid: props.id
    }
    APIgetCommentList(data).then(res => {
        commentData.list = res
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
//添加修改回复提交方法
const editaddSubmit = () => {
    editaddPopup.error = {}
    for (let key in editaddPopup.form) {
        if (editaddPopup.form[key] !== null) {
            if (editaddPopup.form[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (editaddPopup.form[key] !== 0 || editaddPopup.form[key] !== false)) {
                delete editaddPopup.form[key]
            }
        }
    }
    if (editaddPopup.title == '添加') {
        APIpostComment(props.id, editaddPopup.form).then(res => {
            ElMessage.success('添加成功')
            editaddPopup.switch = false
            getList()
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    }else if(editaddPopup.title == '回复'){
        APIpostComment(editaddPopup.form.tagid, editaddPopup.form).then(res => {
            ElMessage.success('回复成功')
            editaddPopup.switch = false
            getList()
        }).catch(err => {
            ElMessage.error('回复失败')
        })
    } else if (editaddPopup.title == '修改') {
        APIputComment(editaddPopup.form.id, editaddPopup.form).then(res => {
            ElMessage.success('修改成功')
            editaddPopup.switch = false
            getList()
        }).catch(err => {
            ElMessage.error('修改失败')
        })
    }
}
//排序算法
const compare = attr => {
    return function(a, b) {
        var value1 = a[attr]
        var value2 = b[attr]
        return value1 - value2
    }
}
//拉取评论设置
const getCommentOpinions = () => {
    APIgetCommentconfig(props.id).then(res => {
        if(res.tgtid == props.id){
            settingPopup.using = true
            settingPopup.scoreper = res.scoreper
        }
    })
    APIgetCommentOpinions(props.id).then(res => {
        if(res.length>0){
            settingPopup.tag = true
        }
        settingPopup.tagarr = res.sort(compare('sort'))
    })
    APIpostCommentStatistic({ tgt_id: props.id }).then(res => {
        let comStatstic = {}
        res.forEach((item, i) => {
            comStatstic[item.tagid] = item.cnt
        })
        settingPopup.tagarr.forEach((item, i) => {
            item.cnt = comStatstic[item.id] || 0
        })
    })
}
//打开修改弹窗
const editaddPopupModifyOpen = val => {
    editaddPopup.error = {}
    editaddPopup.title = '修改'
    APIgetCommentDetails(val.id).then(res => {
        editaddPopup.form = {
            id: res.id,
            content: res.content,
            status: res.status
        }
        editaddPopup.switch = true
    })
}
//打开回复弹窗
const editaddPopupReplyOpen = val => {
    editaddPopup.error = {}
    editaddPopup.title = '回复'
    editaddPopup.form = {
        content: '',
        atuid: val.uid,
        atutype: val.utype,
        score: 0,
        tagid: val.id

    }
    editaddPopup.switch = true
}
//评论开关
const switchFnUse = val => {
    if (val) {
        APIpostCommentconfig(props.id, { scoreper: settingPopup.scoreper }).then(res => {
            // ElMessage.success('已开启')
        })
        return false
    }
    APIdeleteCommentconfig(props.id).then(res => {
        // ElMessage.success('已开启')
    })
}
//观点开关
const switchFnUse_1 = () => {
    if (settingPopup.using == false) {
        settingPopup.tagarr = []
    }
}
//添加观点标签按钮
const addOpinionsTag = () => {
    let data = {
        'sort': '',
        'title': ''
    }
    settingPopup.tagarr.push(data)
}
//添加或修改观点
const addSureFunc = (item, index) => {
    APIgetCommentOpinions(props.id).then(res => {
        if (res.length > 0) {
            if (res.some(items => items.id == settingPopup.tagarr[index].id)) {
                APIputCommentOpinions(settingPopup.tagarr[index].id, settingPopup.tagarr[index]).then(res => {
                    ElMessage.success('修改成功')
                })
            } else {
                APIpostCommentOpinions(props.id, item).then(res => {
                    settingPopup.tagarr[index] = res
                    ElMessage.success('添加成功')
                }).catch(() => {
                    ElMessage.error('添加失败')
                })
            }
        } else {
            APIpostCommentOpinions(props.id, item).then(res => {
                settingPopup.tagarr[index] = res
                ElMessage.success('添加成功')
            }).catch(() => {
                ElMessage.error('添加失败')
            })
        }
    })
}
//删除观点
const deletetagFunc = (item,index) =>{
    APIdelCommentStatistic(item.id).then(res=>{
        settingPopup.tagarr.splice(index,1)
    })
}
//获取评论详情
const getCommentDetails = id => {
    APIgetCommentDetails(id).then(res => {
        commentDetails.details = res
        commentDetails.details.uavatar = res.uavatar ? import.meta.env.VITE_APP_FOLDER_SRC + res.uavatar : 'https://app.cqyezhuapp.com/appdown/logo.png'
        commentDetails.switch = true
        let data = {
            page: page.value,
            per_page: per_page.value,
            tgtid: res.id
        }
        APIgetCommentList(data).then(rep => {
            rep.map(item=>{
                item.uavatar = item.uavatar ? import.meta.env.VITE_APP_FOLDER_SRC + item.uavatar : 'https://app.cqyezhuapp.com/appdown/logo.png'
            })
            commentDetails.details.reply = rep
        })
    })
}
//删除评论
const delCommentDetails = (item)=>{
    APIdeleteAdComment(item.id).then(res=>{
        getList()
        if(commentDetails.switch){
           getCommentDetails(item.tgtid)
        }
    })
}
// 监听分页
watch(page, () => {
    if(page.value>0){
        getList()
    }
})
onMounted(() => {
    getOptions()
    getList()
    getCommentOpinions()
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
