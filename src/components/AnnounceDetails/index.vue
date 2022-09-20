<template>
    <div class="inline-block">
        <!-- <span v-if="props.name == '公式'" @click="detailsFunc">详情</span> -->
        <el-tag v-if="props.name == '公示'" type="success" size="small" class="btnNone" effect="dark" @click="detailsFunc">
            已完成
        </el-tag>
        <el-tag v-if="props.name == '查看'" type="warning" size="small" class="btnNone m-l-10" effect="dark" @click="detailsFunc">
            查看公示
        </el-tag>
        <div v-if="props.name == '活动'" style="width: 97%;height: 133px;position: absolute;" @click="detailsFunc" />
        <!-- <div style="width: 97%;height: 133px;background-color: #ccc;position: absolute;" @click="detailsFunc" /> -->
        <el-dialog
            v-model="switch_details"
            title="详情"
            width="60%"
            :append-to-body="true"
        >
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="公示信息" name="1" height="400px">
                    <el-scrollbar height="500px">
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
                                <div class="left">公示文号</div>
                                <div class="right">{{ data_details.item.proof }}</div>
                            </div>
                            <div v-if="data_details.item.toval_name" class="item">
                                <div class="left">公示区域</div>
                                <div class="right">{{ data_details.item.toval_name }}</div>
                            </div>
                            <div v-if="data_details.item.totype" class="item">
                                <div class="left">公示区域类型</div>
                                <div class="right">{{ getOptVal(opts_all.obj.article_lv,data_details.item.totype) }}</div>
                            </div>
                            <div class="item">
                                <div class="left">发布单位</div>
                                <div class="right">{{ data_details.item.authorgroup?.name }}</div>
                            </div>
                            <div class="item">
                                <div class="left">发布人</div>
                                <div class="right">
                                    <span>{{ data_details.item.uinfo?.name?data_details.item.uinfo?.name:data_details.item.uinfo?.nickname? data_details.item.uinfo?.nickname:data_details.item.uinfo?.username }}</span>
                                    <span class="m-l-20 size-sm">{{ data_details.item.uinfo?.mobile }}</span>
                                </div>
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
                            <div
                                v-for="(item, i) in data_details.item.custom" v-if="data_details.item.custom" :key="i"
                                class="item"
                            >
                                <div class="left">{{ item.label }}</div>
                                <div class="right">{{ item.val }}</div>
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
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="审核记录" name="2">
                    <el-scrollbar height="500px">
                        <div>
                            <el-timeline v-for="(item,index) in article_tab.arr" :key="index">
                                <el-timeline-item :timestamp="item.created_at" placement="top">
                                    <el-card>
                                        <div class="details-box">
                                            <div class="item">
                                                <div class="left">公示</div>
                                                <div class="right">{{ item.auditable?.title }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">处理人</div>
                                                <div class="right">{{ item.auditor?.name? item.auditor?.name:item.auditor?.nickname?item.auditor?.nickname:item.auditor?.username }}</div>
                                            </div>
                                            <div v-if="item.reply" class="item">
                                                <div class="left">回复内容</div>
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

