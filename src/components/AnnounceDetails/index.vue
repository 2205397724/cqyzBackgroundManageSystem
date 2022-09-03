<template>
    <div>
        <span v-if="props.name == '公式'" @click="detailsFunc">详情</span>
        <div v-if="props.name == '活动'" style="width: 97%;height: 133px;position: absolute;" @click="detailsFunc" />
        <!-- <div style="width: 97%;height: 133px;background-color: #ccc;position: absolute;" @click="detailsFunc" /> -->
        <el-dialog
            v-model="switch_details"
            title="详情"
            width="50%"
            :append-to-body="true"
        >
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="公示信息" name="1">
                    <!-- <el-scrollbar height="400px"> -->
                    <div class="details-box">
                        <div class="details-tit-sm">基础信息</div>
                        <div class="item">
                            <div class="left">公示主题</div>
                            <div class="right">{{ data_details.item.title }}</div>
                        </div>

                        <div class="item">
                            <div class="left">公示分类</div>
                            <div class="right">{{ cateName }}</div>
                        </div>
                        <div class="item">
                            <div class="left">公示区域</div>
                            <div class="right">{{ data_details.item.toval }}</div>
                        </div>
                        <div class="item">
                            <div class="left">公示区域类型</div>
                            <div class="right">{{ getOptVal(opts_all.obj.article_lv,data_details.item.totype) }}</div>
                        </div>
                        <div class="item">
                            <div class="left">发布单位</div>
                            <div class="right">{{ data_details.item.authorgroup?.name }}</div>
                        </div>
                        <div class="item">
                            <div class="left">状态</div>
                            <div class="right">
                                <el-tag v-show="data_details.item.status == 1" class="btnNone" type="primary" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.status) }} </el-tag>
                                <el-tag v-show="data_details.item.status == 2" class="btnNone noDeal" type="warning" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.status) }} </el-tag>
                                <el-tag v-show="data_details.item.status == 3" class="btnNone" type="warning" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.status) }} </el-tag>
                                <el-tag v-show="data_details.item.status == 4" class="btnNone" type="success" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.status) }} </el-tag>
                                <el-tag v-show="data_details.item.status == 5" class="btnNone" type="info" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.status) }} </el-tag>
                                <el-tag v-show="data_details.item.status == 6" class="btnNone" type="info" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.status) }} </el-tag>
                                <el-tag v-show="data_details.item.status == 7" class="btnNone" type="info" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.status) }} </el-tag>
                            </div>
                        </div>
                        <!-- <div class="item">
                                <div class="left">附件名称</div>
                                <div class="right">{{ data_details.item.affix.title }}</div>
                            </div> -->
                        <div class="item">
                            <div class="left">附件</div>
                            <div class="right">
                                <div v-for="(item,i) in data_details.item.affix" :key="i" class="inline-block m-r-10">
                                    <el-tag type="success">
                                        <el-link type="success" class="link" :href="data_details.item.affixs" target="_blank">{{ item.title }}</el-link>
                                    </el-tag>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="left">公示内容</div>
                            <div class="right" v-html="data_details.item.content" />
                        </div>
                        <div class="details-tit-sm">其他信息</div>
                        <div class="item">
                            <div class="left">公示ID</div>
                            <div class="right">{{ data_details.item.id }}</div>
                        </div>
                        <div class="item">
                            <div class="left">开始时间</div>
                            <div class="right">{{ data_details.item.start_at }}</div>
                        </div>
                        <div class="item">
                            <div class="left">结束时间</div>
                            <div class="right">{{ data_details.item.end_at }}</div>
                        </div>
                    </div>
                <!-- </el-scrollbar> -->
                </el-tab-pane>
                <el-tab-pane label="审核记录" name="2">
                    <el-scrollbar :height="article_tab.arr.length >= 2 ? '500px': '300px'">
                        <div>
                            <el-timeline v-for="(item,index) in article_tab.arr" :key="index">
                                <el-timeline-item :timestamp="item.created_at" placement="top">
                                    <el-card>
                                        <div class="details-box">
                                            <div class="item">
                                                <div class="left">ID</div>
                                                <div class="right">{{ item.id }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">公示ID</div>
                                                <div class="right">{{ item.tgt_id }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">发布对象</div>
                                                <div class="right">{{ getNameFunc(userData.arr,item.group_id) }}</div>
                                            </div>
                                            <div v-if="article_tab.arr.reply" class="item">
                                                <div class="left">答复</div>
                                                <div class="right">{{ item.reply }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">状态</div>
                                                <div class="right">
                                                    <el-tag v-if="item.status== 10" type="warning" size="small">未处理</el-tag>
                                                    <el-tag v-if="item.status == 20" type="success" size="small">审核通过</el-tag>
                                                    <el-tag v-if="item.status == 30" type="danger" size="small">审核失败</el-tag>
                                                </div>
                                            </div>
                                            <div v-if="item.remark" class="item">
                                                <div class="left">备注</div>
                                                <div class="right">{{ item.remark }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">修改时间</div>
                                                <div class="right">{{ item.updated_at }}</div>
                                            </div>
                                        </div>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                        <div v-show="article_tab.arr.length <= 0" class="size-lg">此公式无审核信息</div>
                    </el-scrollbar>
                <!-- </el-tab-pane>
                <el-tab-pane label="附件" name="3">
                    <el-scrollbar height="400px">
                        <div class="details-box">
                            <div v-for="(item,i) in data_details.item.affix" :key="item.file" class="item">
                                <div class="left">附件{{ i }}</div>
                                <div class="right">{{ VITE_APP_FOLDER_SRC + item.file }}</div>
                                <div class="right">
                                    <el-link :href="`${VITE_APP_FOLDER_SRC+item.file}`" target="_blank" type="danger" style="margin-left: 10px;">{{ item.title }} </el-link>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </el-tab-pane> -->
                </el-tab-pane>
            </el-tabs>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script  setup>
import {
    APIgetEventArticleDetails
} from '@/api/custom/custom.js'
const VITE_APP_FOLDER_SRC = ref(import.meta.env.VITE_APP_FOLDER_SRC)
import {
    reactive,
    ref,
    defineProps,
    onMounted
} from 'vue'
const props = defineProps(['id', 'name'])
const data_details = reactive({
    item: ''
})
const activeName = ref('1')
const switch_details = ref(false)
const page = ref(1)
const per_page = ref(15)
const article_tab = reactive({
    arr: []
})
const cateName = ref('')
const detailsFunc = () => {
    console.log(props.id)
    activeName.value = '1'
    switch_details.value = true
    APIgetEventArticleDetails(props.id).then(res => {
        console.log(res)
        cateName.value = res.cate.name
        res.affixs = []
        for (let i in res.affix) {
            res.affixs.push(import.meta.env.VITE_APP_FOLDER_SRC + res.affix[i].file)
        }
        data_details.item = res
        // AudioContext.value = data_details.item.content.replace(/<[^>]+>|&[^>]+;/g, '').trim()
        console.log(data_details.item)
        getListArchiveFunc()
        getUserGroupListFunc()
    })
}
import {
    APIgetListArchiveAudit
} from '@/api/custom/custom.js'
const getListArchiveFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value,
        tgt_id: props.id,
        tgt_type: 'announce'
    }
    APIgetListArchiveAudit(params).then(res => {
        console.log(res)
        article_tab.arr = res
    })
}
// 获取类别名称
const getNameFunc = (arr, key) => {
    for (let i in arr) {
        if (arr[i].id == key) {
            return arr[i].name
        }
    }
}
const userData = reactive({
    arr: []
})
import {
    APIgetGroupList
} from '@/api/custom/custom.js'
const getUserGroupListFunc = () => {
    APIgetGroupList().then(res => {
        if (res.status == 200) {
            console.log(res)
            userData.arr = res.data
        }
    })
}
// defineExpose({
//     getAnnounceDetailsFunc
// })

// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {
        status_all: []
    }
})
getOpts(['article_lv', 'announce_status']).then(res => {
    opts_all.obj = res
})
</script>

