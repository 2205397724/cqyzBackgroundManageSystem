<template>
    <div>
        <page-main class="hidden">
            <el-table
                v-loading="loading_tab"
                :data="data.list"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                class="tab_1"
            >
                <el-table-column prop="id" label="审核活动">
                    <template #default="scope">
                        <span>{{ scope.row.auditable?.title ? scope.row.auditable?.title:scope.row.auditable?.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="审核活动类型" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.tgt_type }} </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="name" label="归档内容数量" width="180">
                    <span> {{ total2 }} </span>
                </el-table-column> -->

                <el-table-column prop="created_at" label="审核回执内容">
                    <template #default="scope">
                        <span>{{ scope.row.reply }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="updated_at" label="状态" align="center">
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
                        <!-- <el-button
                        type="primary" size="small"
                        @click="examineListFunc(scope.row)"
                    >
                        审核
                    </el-button> -->
                        <el-button
                            type="primary" size="small"
                            @click="detailsFunc(scope.row)"
                        >
                            详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-model:current-page="page"
                style="float: right;"
                layout="prev,next,jumper,"
                :total="50"
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
            <!-- <div class="detail_hd">
                <div class="left">审核活动信息</div>
                <div class="right">其他信息</div>
            </div>
            <div class="Box">
                <div class="detailBigBox"> -->
            <div class="details-box">
                <!-- <div class="item-hd">企业相关信息：</div> -->
                <div style="background-color: #fafafa;">
                    <div class="item">
                        <div class="left">审核活动</div>
                        <div class="right">{{ data_details.item.auditable?.title ? data_details.item.auditable?.title :data_details.item.auditable?.name }}</div>
                    </div>
                    <div class="item">
                        <div class="left">审核活动类型</div>
                        <div class="right">{{ data_details.item.tgt_type }}</div>
                    </div>
                    <div v-if="data_details.item.reply" class="item">
                        <div class="left">审核回执内容</div>
                        <div class="right">{{ data_details.item.reply }}</div>
                    </div>
                    <div class="item">
                        <div class="left">审核状态</div>
                        <div class="right">
                            <el-tag v-show="data_details.item.status == 10" class="btnNone" type="warning" effect="dark" @click="modifyHouseBindFunc">未处理 </el-tag>
                            <el-tag v-show="data_details.item.status == 20" class="btnNone " type="success">审核成功</el-tag>
                            <el-tag v-show="data_details.item.status == 30" class="btnNone" type="danger">审核失败</el-tag>
                        </div>
                    </div>
                    <div class="item">
                        <div class="left">创建时间</div>
                        <div class="right">{{ data_details.item.created_at }}</div>
                    </div>
                    <div v-if="data_details.item.auditor" class="item">
                        <div class="left">审核单位</div>
                        <div class="right">
                            <span>姓名：{{ data_details.item.auditor?.name ? data_details.item.auditor?.name: data_details.item.auditor?.nickname ? data_details.item.auditor?.nickname : data_details.item.auditor?.username ? data_details.item.auditor?.username:'' }}</span>
                            <span class="inline-block m-l-30 m-r-30">电话：{{ data_details.item.auditor?.mobile }}
                            </span>
                            <span style="font-size: 13px;">时间：{{ data_details.item.updated_at }}</span>
                        </div>
                    </div>
                    <div v-if="data_details.item.status == 10" class="item">
                        <div class="left" />
                        <div class="right">
                            <el-button type="primary" class="m-t-10" @click="examineListFunc">审核</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- </div> -->
            <!-- <div class="detailBigBox_1">
                    <div class="details-box">
                        <div class="item">
                            <div class="left">房屋名称</div>
                            <div class="right">{{ data_details.item.house.name }}</div>
                        </div>
                        <div class="item">
                            <div class="left">房屋地址</div>
                            <div class="right">{{ data_details.item.house.addr }}</div>
                        </div>
                        <div class="item">
                            <div class="left">产权证号</div>
                            <div v-if="data_details_1.item" class="right">{{ data_details_1.item.code_property }}</div>
                            <div v-if="!data_details_1.item" class="right" />
                        </div>
                        <div class="item">
                            <div class="left">地房籍号</div>
                            <div v-if="data_details_1.item" class="right">{{ data_details_1.item.code_room }}</div>
                            <div v-if="!data_details_1.item" class="right" />
                        </div>
                        <div class="item">
                            <div class="left">交易时间</div>
                            <div v-if="data_details_1.item" class="right">{{ data_details_1.item.time_deal }}</div>
                            <div v-if="!data_details_1.item" class="right" />
                        </div>
                        <div>
                            <div class="item">
                                <div class="left">产权人</div>
                                <div v-if="data_details_1.item && data_details_1.item.owners" class="right">
                                    <el-scrollbar :height="data_details_1.item.owners.length >= 3 ? '300px' : ''">
                                        <div
                                            v-for="(item,i) in data_details_1.item.owners" :key="i"
                                            class="owners"
                                        >
                                            <div>
                                                <span>姓名：</span>{{ item.name }}
                                            </div>
                                            <div>
                                                <span>证件类型：</span>{{ item.type_id_card }}
                                            </div>
                                            <div>
                                                <span>面积：</span>{{ item.area }} ㎡
                                            </div>
                                            <div>
                                                <span>联系方式：</span>{{ item.mobile }}
                                            </div>
                                            <div style="width: 100%;">
                                                <span>证件号：</span>{{ item.id_card }}
                                            </div>
                                        </div>
                                    </el-scrollbar>
                                </div>
                                <div v-if="!data_details_1.item" class="right" />
                            </div>
                        </div>
                    </div>
                </div> -->
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
import md5 from 'md5'
const data = reactive({
    list: []
})
const page = ref(1)
const per_page = ref(15)
const loading_tab = ref(false)
watch(page, () => {
    getActivityViewList()
})
const getActivityViewList = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    if (sessionStorage.getItem('groupChinaCode') && localStorage.getItem('utype') != md5('pt')) {
        params.group_id = sessionStorage.getItem('groupChinaCode')
    }
    loading_tab.value = true
    APIgetListArchiveAudit(params).then(res => {
        console.log(res)
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
        loading_tab.value = false
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
        data_details.item = res
        switch_details.value = true
    })
}
refreshFunc()
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
</style>
