<template>
    <div>
        <page-main class="hidden">
            <el-button-group class="btn m-b-20">
                <!-- <el-badge :value="index == 0 ? total : ''" class="item" :hidden="flag"> -->
                <el-button :type="index == 0 ? 'primary' : ''" @click="StatusFunk(0)">全部</el-button>
                <!-- </el-badge> -->
                <!-- <el-badge :value="index == 10 ? total : ''" class="item" :hidden="flag1"> -->
                <el-button :type="index == 10 ? 'primary' : ''" @click="StatusFunk(10)">未处理</el-button>
                <!-- </el-badge> -->
                <!-- <el-badge :value="index == 20 ? total : ''" class="item" :hidden="flag2"> -->
                <el-button :type="index == 20 ? 'primary' : ''" @click="StatusFunk(20)">审核成功</el-button>
                <!-- </el-badge> -->
                <!-- <el-badge :value="index == 30 ? total : ''" class="item" :hidden="flag3"> -->
                <el-button :type="index == 30 ? 'primary' : ''" @click="StatusFunk(30)">审核失败</el-button>
                <!-- </el-badge> -->
            </el-button-group>
            <el-table
                v-loading="loading_tab"
                :data="data.list"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                class="tab_1"
            >
                <el-table-column prop="name" label="审核活动">
                    <template #default="scope">
                        <div v-if="scope.row.tgt_type=='announce'">
                            <span class="el-tag m-r-10" size="small">公示</span>
                            <router-link v-if="scope.row.auditable" style="text-decoration: none;" :to="{name: 'announceDetail',query:{ id : scope.row.tgt_id }}">
                               <el-link :underline="false" type="primary">{{ scope.row.auditable.title }}</el-link>
                            </router-link>
                        </div>
                        <div v-if="scope.row.tgt_type=='survey'">
                            <div v-if="scope.row.auditable?.type===1">
                                <span class="el-tag m-r-10" size="small">问卷</span>
                                <router-link v-if="scope.row.auditable" style="text-decoration: none;" :to="{name: 'surveyDetail',query:{ id : scope.row.tgt_id }}">
                                    <el-link :underline="false" type="primary">{{ scope.row.auditable.name }}</el-link>
                                </router-link>
                            </div>
                            <div v-else-if="scope.row.auditable?.type===2">
                                <span class="el-tag m-r-10" size="small">选举</span>
                                <router-link v-if="scope.row.auditable" style="text-decoration: none;" :to="{name: 'electDetail',query:{ id : scope.row.tgt_id }}">
                                    <el-link :underline="false" type="primary">{{ scope.row.auditable.name }}</el-link>
                                </router-link>
                            </div>
                            <div v-else-if="scope.row.auditable?.type===3">
                                <span class="el-tag m-r-10" size="small">表决</span>
                                <router-link v-if="scope.row.auditable" style="text-decoration: none;" :to="{name: 'voteDetail',query:{ id : scope.row.tgt_id }}">
                                    <el-link :underline="false" type="primary">{{ scope.row.auditable.name }}</el-link>
                                </router-link>
                            </div>
                            <div v-else-if="scope.row.auditable?.type===4">
                                <span class="el-tag m-r-10" size="small">联名</span>
                                <router-link v-if="scope.row.auditable" style="text-decoration: none;" :to="{name: 'jointlyDetail',query:{ id : scope.row.tgt_id }}">
                                    <el-link :underline="false" type="primary">{{ scope.row.auditable.name }}</el-link>
                                </router-link>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="reply" label="审核回执内容"></el-table-column>
                <el-table-column prop="updated_at" label="发布时间" width="180"></el-table-column>
                <el-table-column label="状态" align="center" width="120">
                    <template #default="scope">
                        <el-tag v-if="scope.row.status== 10" type="warning" effect="dark" size="small" @click="examineListFunc(scope.row)">
                            未处理
                        </el-tag>
                        <el-tag v-if="scope.row.status == 20" type="success" size="small">
                            审核通过
                        </el-tag>
                        <el-tag v-if="scope.row.status == 30" type="danger" size="small">
                            审核失败
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="180">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="examineListFunc(scope.row)">审核</el-button>
                        <el-button  size="small" @click="detailsFunc(scope.row)">详情</el-button>
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
        </page-main>
        <!-- 审核 -->
        <el-dialog
            v-model="switch_pass"
            title="审核"
            width="600px"
        >
            <el-form
                ref="ruleFormRef"
                :model="from_pass.obj"
            >
                <!-- <div v-if="examine_status== 20 || examine_status== 30" class="pass">
                    当前公示已审核完成
                </div> -->
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label="审核状态"
                            label-width="100px"
                        >
                            <el-switch
                                v-model="from_pass.obj.status"

                                style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                                active-text="通过"
                                inactive-text="失败"
                                :active-value="20"
                                :inactive-value="30"
                                class="switchStyle"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="100px"
                            label="审核回执内容"
                        >
                            <el-input
                                v-model="from_pass.obj.reply"
                                :autosize="{ minRows: 3, maxRows: 10 }"
                                type="textarea"
                                placeholder="审核回执内容"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="footer">
                    <el-button @click="switch_pass=false">取消</el-button>
                    <el-button type="primary" @click="passToAuditFunc">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog
            v-model="switch_details"
            title="详情"
            width="70%"
        >
            <div class="details-box">
                <div class="size-lg">
                    {{ data_details.item.auditable?.title ? data_details.item.auditable?.title :data_details.item.auditable?.name }}
                </div>
                <div class="p-t-10 font-grey size-sm">发起时间：{{ data_details.item.created_at }}</div>
                <div class="item">
                    <el-tag v-show="data_details.item.status == 10" type="warning" @click="modifyHouseBindFunc">未处理 </el-tag>
                    <el-tag v-show="data_details.item.status == 20" type="success">审核成功</el-tag>
                    <el-tag v-show="data_details.item.status == 30" type="danger">审核失败</el-tag>
                </div>
                <div style="background-color: #fafafa;">
                    <div v-if="data_details.item.group" class="item">
                        <div class="left">审核单位</div>
                        <div class="right">{{ data_details.item.group.name }}</div>
                    </div>
                    <div v-if="data_details.item.auditor" class="item">
                        <div class="left">审核人</div>
                        <div class="right">
                            <span>姓名：{{ data_details.item.auditor?.name ? data_details.item.auditor?.name: data_details.item.auditor?.nickname ? data_details.item.auditor?.nickname : data_details.item.auditor?.username ? data_details.item.auditor?.username:'' }}</span>
                            <span class="inline-block m-l-30 m-r-30">电话：{{ data_details.item.auditor?.mobile }}
                            </span>
                            <span>时间：{{ data_details.item.updated_at }}</span>
                        </div>
                    </div>
                    <div v-if="data_details.item.reply" class="item">
                        <div class="left">审核回执内容</div>
                        <div class="right">{{ data_details.item.reply }}</div>
                    </div>
                </div>
                <div class="item-hd p-t-20 p-b-10">详细信息</div>
                <div v-if="data_details.item.tgt_type=='announce'" style="background-color: #fafafa;">
                    <div class="item">
                        <div class="left">公示文号</div>
                        <div class="right">{{ data_details.item.auditable?.proof }}</div>
                    </div>
                    <div v-if="data_details.item.auditable?.totype" class="item">
                        <div class="left">公示区域类型</div>
                        <div class="right">{{ getOptVal(opts_all.obj.article_lv,data_details.item.auditable?.totype) }}</div>
                    </div>
                    <div class="item">
                        <div class="left">发布人</div>
                        <div class="right">
                            <span>{{ data_details.item.auditable?.uinfo?.name?data_details.item.auditable?.uinfo?.name:data_details.item.auditable?.uinfo?.nickname? data_details.item.auditable?.uinfo?.nickname:data_details.item.auditable?.uinfo?.username }}</span>
                            <span class="m-l-20 size-sm">{{ data_details.item.auditable?.uinfo?.mobile }}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="left">状态</div>
                        <div class="right">
                            <el-tag v-show="data_details.item.auditable?.status == 1" class="btnNone" type="primary" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.auditable?.status) }} </el-tag>
                            <el-tag v-show="data_details.item.auditable?.status == 2" class="btnNone noDeal" type="warning" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.auditable?.status) }} </el-tag>
                            <el-tag v-show="data_details.item.auditable?.status == 3" class="btnNone" type="warning" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.auditable?.status) }} </el-tag>
                            <el-tag v-show="data_details.item.auditable?.status == 4" class="btnNone" type="success" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.auditable?.status) }} </el-tag>
                            <el-tag v-show="data_details.item.auditable?.status == 5" class="btnNone" type="info" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.auditable?.status) }} </el-tag>
                            <el-tag v-show="data_details.item.auditable?.status == 6" class="btnNone" type="info" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.auditable?.status) }} </el-tag>
                            <el-tag v-show="data_details.item.auditable?.status == 7" class="btnNone" type="info" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.auditable?.status) }} </el-tag>
                        </div>
                    </div>
                    <!-- <div class="item">
                                <div class="left">附件名称</div>
                                <div class="right">{{ data_details.item.affix.title }}</div>
                            </div> -->
                    <div class="item">
                        <div class="left">附件</div>
                        <div class="right">
                            <div v-for="(item,i) in data_details.item.auditable?.affix" :key="i" class="inline-block m-r-10">
                                <el-tag type="success">
                                    <el-link type="success" class="link" :href="data_details.item.auditable?.affixs" target="_blank">{{ item.title }}</el-link>
                                </el-tag>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="left">公示内容</div>
                        <div class="right" v-html="data_details.item.auditable?.content" />
                    </div>
                    <div v-if="data_details.item.status == 10" class="item">
                        <div class="left_1" />
                        <div class="right">
                            <el-button type="primary" class="m-t-10" @click="examineListFunc">审核</el-button>
                        </div>
                    </div>
                </div>
                <div v-if="data_details.item.tgt_type=='survey'" style="background-color: #fafafa;">
                    <div class="item">
                        <div class="left">总票数</div>
                        <div class="right">
                            <span>{{ data_details.item.auditable?.ticketall }}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="left">总面积数</div>
                        <div class="right">
                            <span>{{ data_details.item.auditable?.areaall }}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="left">发布人</div>
                        <div class="right">
                            <span>{{ data_details.item.auditable?.uinfo?.name?data_details.item.auditable?.uinfo?.name:data_details.item.auditable?.uinfo?.nickname? data_details.item.auditable?.uinfo?.nickname:data_details.item.auditable?.uinfo?.username }}</span>
                            <span class="m-l-20 size-sm">{{ data_details.item.auditable?.uinfo?.mobile }}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="left">状态</div>
                        <div class="right">
                            <el-tag v-show="data_details.item.auditable?.status == 1" class="btnNone" type="primary" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.auditable?.status) }} </el-tag>
                            <el-tag v-show="data_details.item.auditable?.status == 2" class="btnNone noDeal" type="warning" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.auditable?.status) }} </el-tag>
                            <el-tag v-show="data_details.item.auditable?.status == 3" class="btnNone" type="warning" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.auditable?.status) }} </el-tag>
                            <el-tag v-show="data_details.item.auditable?.status == 4" class="btnNone" type="success" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.auditable?.status) }} </el-tag>
                            <el-tag v-show="data_details.item.auditable?.status == 5" class="btnNone" type="info" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.auditable?.status) }} </el-tag>
                            <el-tag v-show="data_details.item.auditable?.status == 6" class="btnNone" type="info" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.auditable?.status) }} </el-tag>
                            <el-tag v-show="data_details.item.auditable?.status == 7" class="btnNone" type="info" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.auditable?.status) }} </el-tag>
                        </div>
                    </div>
                    <div class="item">
                        <div class="left">内容</div>
                        <div class="right" v-html="data_details.item.auditable?.content" />
                    </div>
                    <div v-if="data_details.item.status == 10" class="item">
                        <div class="left_1" />
                        <div class="right">
                            <el-button type="primary" class="m-t-10" @click="examineListFunc">审核</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup >
import {
    ref,
    reactive,
    watch
} from 'vue'
import {
    APIgetListArchiveAudit,
    APIputArchiveAudit,
    APIgetDetailsArchiveAudit
} from '@/api/custom/custom.js'
import {
    ElMessage
} from 'element-plus'
import { Search, Plus, Loading } from '@element-plus/icons-vue'
const data = reactive({
    list: []
})
const page = ref(1)
const per_page = ref(15)
const loading_tab = ref(false)
watch(page, () => {
    getActivityViewList()
})

const flag = ref(true)
const flag1 = ref(true)
const flag2 = ref(true)
const flag3 = ref(true)
const index = ref(0)
const StatusFunk = val => {
    page.value = 1
    index.value = val
    getActivityViewList()
    flag.value = false
    flag1.value = false
    flag2.value = false
    flag3.value = false
    console.log(flag.value)
}
const getActivityViewList = () => {
    let params = {
        page: page.value,
        per_page: per_page.value,
        status: index.value
    }
    if (index.value == 0) {
        delete params.status
    }
    if (JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_group')) && localStorage.getItem('utype') != 'pt') {
        params.group_id = JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_group')).id
    }
    loading_tab.value = true
    APIgetListArchiveAudit(params).then(res => {
        // console.log("111",res)
        data.list = res
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
        // console.log('aaaaa')
        loading_tab.value = false
        // console.log('bbbbb')

    })
}
const from_pass = reactive({
    obj: {}
})
const examine_id = ref('')
const switch_pass = ref(false)
const examineListFunc = val => {
    if (val) {
        examine_id.value = val.id
    } else {
        examine_id.value = data_details.item.id
    }
    from_pass.obj = {}
    switch_pass.value = true
}

const refreshFunc = () => {
    getActivityViewList()
}
const passToAuditFunc = () => {
    console.log(from_pass.obj)
    APIputArchiveAudit(examine_id.value, from_pass.obj).then(res => {
        ElMessage.success('审核成功')
        refreshFunc()
    })
    switch_pass.value = false
    switch_details.value = false
}
const data_details = reactive({
    item: {}
})
const switch_details = ref(false)
const detailsFunc = row => {
    APIgetDetailsArchiveAudit(row.id).then(res => {
        console.log(res)
        if (res.auditable) {
            for (let i in res.auditable.affix) {
                res.auditable.affixs = []
                res.auditable.affixs.push(import.meta.env.VITE_APP_FOLDER_SRC + res.auditable.affix[i].file)
            }
        }
        data_details.item = res
        switch_details.value = true
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
getOpts(['article_lv', 'announce_status']).then(res => {
    opts_all.obj = res
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
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
.left_1 {
    color: #999;
    box-sizing: border-box;
    width: 160px;
    white-space: nowrap;
    margin-right: 20px;
    text-align: right;
}
.btn button {
    padding: 20px 40px;
}
</style>
