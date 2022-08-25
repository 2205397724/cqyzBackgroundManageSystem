<template>
    <div class="keep-on-record">
        <page-main class="hidden">
            <el-table
                :data="data_applyList.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                class="tab_1"
            >
                <el-table-column prop="name" label="企业名称" />
                <el-table-column prop="type" label="企业类型">
                    <template #default="scope">
                        <span class="m-l-10">{{ getOptVal(opts_all.obj.enterprise_type,scope.row.type) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="处理状态">
                    <template #default="scope">
                        <el-tag v-if="scope.row.process_status == 10" type="warning" round size="small" effect="dark" @click="detailsFunc_1(scope.row)">{{ getOptVal(opts_all.obj.enterpriseStatus,scope.row.process_status) }}</el-tag>
                        <el-tag v-if="scope.row.process_status == 15" type="primary" round size="small">{{ getOptVal(opts_all.obj.enterpriseStatus,scope.row.process_status) }}</el-tag>
                        <el-tag v-if="scope.row.process_status == 20" type="success" round size="small">{{ getOptVal(opts_all.obj.enterpriseStatus,scope.row.process_status) }}</el-tag>
                        <el-tag v-if="scope.row.process_status == 30" type="danger" round size="small">{{ getOptVal(opts_all.obj.enterpriseStatus,scope.row.process_status) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="申请时间">
                    <template #default="scope">
                        <span class="m-l-10">{{ scope.row.created_at }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template #default="scope">
                        <!-- <el-button
                            v-if="scope.row.status == 10" type="primary"
                            size="small"
                            @click="examineFunc(scope.row)"
                        >
                            审核
                        </el-button> -->
                        <el-button
                            size="small"
                            @click="detailsFunc_1(scope.row)"
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
        <!-- 申请详情 -->
        <el-dialog
            v-model="switch_details_1"
            title="申请详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item-hd">企业相关信息：</div>
                <div style="background-color: #fafafa;">
                    <div class="item">
                        <div class="left">企业名称</div>
                        <div class="right">{{ apply_details.obj.name }} </div>
                    </div>
                    <div class="item">
                        <div class="left">企业类型</div>
                        <div class="right">{{ getOptVal(opts_all.obj.enterprise_type,apply_details.obj.type) }} </div>
                    </div>
                    <div class="item">
                        <div class="left">营业执照</div>
                        <div class="right">
                            <img :src="apply_details.obj.content.biz_lic" alt="" style="width: 120px;">
                        </div>
                    </div>
                    <div class="item">
                        <div class="left">社会信用代码</div>
                        <div class="right">{{ apply_details.obj.content.social_code }} </div>
                    </div>
                    <div class="item">
                        <div class="left">法人</div>
                        <div class="right">{{ apply_details.obj.content.legal }} </div>
                    </div>
                    <div class="item">
                        <div class="left">地址</div>
                        <div class="right">{{ apply_details.obj.content.com_addr }} </div>
                    </div>
                    <div class="item">
                        <div class="left">处理状态</div>
                        <div class="right">
                            <el-tag v-if="apply_details.obj.process_status == 10" type="warning" round size="small" effect="dark" @click="examineFunc">{{ getOptVal(opts_all.obj.enterpriseStatus,apply_details.obj.process_status) }}</el-tag>
                            <el-tag v-if="apply_details.obj.process_status == 15" type="primary" round size="small">{{ getOptVal(opts_all.obj.enterpriseStatus,apply_details.obj.process_status) }}</el-tag>
                            <el-tag v-if="apply_details.obj.process_status == 20" type="success" round size="small">{{ getOptVal(opts_all.obj.enterpriseStatus,apply_details.obj.process_status) }}</el-tag>
                            <el-tag v-if="apply_details.obj.process_status == 30" type="danger" round size="small">{{ getOptVal(opts_all.obj.enterpriseStatus,apply_details.obj.process_status) }}</el-tag>
                        </div>
                    </div>
                    <div v-if="apply_details.obj.status == 10" class="item">
                        <!-- <div class="item"> -->
                        <div class="left_1" />
                        <div class="right">
                            <el-button type="primary" @click="examineFunc">审核</el-button>
                        </div>
                    </div>
                </div>
                <div v-if="user.item" class="item-hd">申请人相关信息：</div>
                <div v-if="user.item" style="background-color: #fafafa;">
                    <div class="item">
                        <div class="left">申请人</div>
                        <div class="right">{{ user.item.username }} </div>
                    </div>
                    <div class="item">
                        <div class="left">申请人身份证号</div>
                        <div class="right">{{ user.item.id_card }} </div>
                    </div>
                    <div class="item">
                        <div class="left">申请人手机号</div>
                        <div class="right">{{ user.item.mobile }} </div>
                    </div>
                </div>
                <div v-if="apply_details.obj.process_by" class="item-hd">处理人相关信息：</div>
                <div v-if="apply_details.obj.process_by" style="background-color: #fafafa;">
                    <div class="item">
                        <div class="left">处理人姓名</div>
                        <div class="right">{{ apply_details.obj.process_by.name ? apply_details.obj.process_by.name:apply_details.obj.process_by.nickname ? apply_details.obj.process_by.nickname : apply_details.obj.process_by.username }} </div>
                    </div>
                    <div class="item">
                        <div class="left">处理人手机号</div>
                        <div class="right">{{ apply_details.obj.process_by.mobile }} </div>
                    </div>
                    <div class="item">
                        <div class="left">处理意见</div>
                        <div class="right">{{ apply_details.obj.reply }} </div>
                    </div>
                    <div class="item">
                        <div class="left">处理日期</div>
                        <div class="right">{{ apply_details.obj.updated_at }} </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details_1 = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 审核  -->
        <el-dialog
            v-model="switch_examine_1"
            title="审核申请"
            width="40%"
        >
            <div>
                <el-form
                    :model="from_add.obj"
                >
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="审核状态"
                                label-width="80px"
                                :error="err_add.obj&&err_add.obj.contact?err_add.obj.contact[0]:''"
                            >
                                <el-select v-model="examine_item.obj.process_status" class="head-btn" placeholder="" clearable>
                                    <el-option v-for="item in opts_all.obj.examine_status" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label="回复"
                                label-width="80px"
                            >
                                <el-input
                                    v-model="examine_item.obj.reply"
                                    :autosize="{ minRows: 4, maxRows: 6 }"
                                    type="textarea"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div class="footer">
                    <el-button @click="switch_examine_1=false">取消</el-button>
                    <el-button type="primary" @click="postFunc_2">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
const search_str = reactive({
    obj: {}
})
const switch_search = ref(false)
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(1)
watch(page, () => {
    getEnterpriseApplyList()
})
const refreshFunc = () => {
    search_str.obj = {}
    switch_search.value = false
    getEnterpriseApplyList()
}
const VITE_APP_FOLDER_SRC = ref(import.meta.env.VITE_APP_FOLDER_SRC)
// 选择用户名
const userData = reactive({
    arr: []
})
import {
    APIgetUserList
} from '@/api/custom/custom.js'
const getNameFunc = (arr, key) => {
    for (let i in arr) {
        if (arr[i].id == key) {
            return arr[i]
        }
    }
}
// 企业申请
const data_applyList = reactive({
    arr: []
})
const switch_replay = ref(false)
import {
    APIgetEnterpriseApplyDetails,
    APIgetEnterpriseApplyList,
    APIpostEnterpriseExamine
} from '@/api/custom/custom.js'
const getEnterpriseApplyList = () => {
    let params = {
        page: page.value,
        per_page: per_page.value,
        tyle: 1
    }
    APIgetEnterpriseApplyList(params).then(res => {
        console.log(res)
        data_applyList.arr = res.data
        switch_replay.value = true
        let btnNext = document.querySelector('.btn-next')
        if (res.data.length <= per_page.value) {
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
const switch_details_1 = ref(false)
const apply_details = reactive({
    obj: {}
})
const examine_item = reactive({
    obj: {}
})
const user = reactive({
    item: {}
})
const switch_examine_1 = ref(false)
const detailsFunc_1 = row => {
    APIgetEnterpriseApplyDetails(row.id).then(res => {
        console.log(res)
        apply_details.obj = res.data
        switch_details_1.value = true
        apply_details.obj.content.biz_lic = import.meta.env.VITE_APP_FOLDER_SRC + apply_details.obj.content.biz_lic
        APIgetUserList().then(res => {
            if (res.status == 200) {
                userData.arr = res.data
                console.log(userData.arr)
                user.item = getNameFunc(userData.arr, apply_details.obj.user_id)
                console.log(user.item)
            }
        })
    })
}
const examineFunc = () => {
    switch_examine_1.value = true
}
const postFunc_2 = () => {
    APIpostEnterpriseExamine(apply_details.obj.id, examine_item.obj).then(res => {
        ElMessage.success('审核成功')
        switch_examine_1.value = false
    })
}
refreshFunc()
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['enterprise_type', 'enterpriseStatus', 'examine_status', 'toushu_return_type', 'group_user_region_type', 'group_user_flg']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
::v-deep .el-table__header-wrapper tr th.el-table-fixed-column--right {
    z-index: 1;
}
.item-hd {
    font-size: 14px;
    margin: 10px 0 5px;
    font-weight: 700;
}
.left_1 {
    color: #999;
    box-sizing: border-box;
    width: 160px;
    white-space: nowrap;
    margin-right: 20px;
    text-align: right;
}
</style>
