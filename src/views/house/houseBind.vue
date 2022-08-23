<template>
    <div class="routine-house">
        <page-main style="overflow: hidden;">
            <el-table
                v-loading="loading_tab"
                :data="housebind_list.arr"
                :header-cell-style="{
                    background: '#fbfbfb',
                    color: '#999999',
                    'font-size': '12px',
                }"
                style="width: 100%; min-height: 400px;"
                @select="handleSelectionChange"
            >
                <el-table-column prop="name" label="申请人姓名">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="申请绑定的房屋">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ getHouseNameFunc(allHouse_list.arr,scope.row.hid) }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="类型">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ getOptVal(opts_all.obj.house_bind,scope.row.type) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="申请状态">
                    <template #default="scope">
                        <el-tag v-show="scope.row.status == 10" class="btnNone m-l-5" type="warning" effect="dark" size="large">{{ getOptVal(opts_all.obj.houseBindStatus,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 20" class="btnNone " type="success" effect="dark" size="large">{{ getOptVal(opts_all.obj.houseBindStatus,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 30" class="btnNone" type="danger" effect="dark" size="large">{{ getOptVal(opts_all.obj.houseBindStatus,scope.row.status) }} </el-tag>
                    </template>
                </el-table-column>
                <el-table-column />
                <el-table-column label="操作" width="200px" fixed="right">
                    <template #default="scope">
                        <el-button
                            type="primary"
                            size="small"
                            @click="modifyHouseBindFunc(scope.row)"
                        >
                            审核
                        </el-button>
                        <el-button size="small" @click="getHouseBindDetails(scope.row)">
                            详情
                        </el-button>
                        <el-popconfirm
                            title="确定要删除当前项么?"
                            cancel-button-type="info"
                            @confirm="DeleteHouseBindFunc(scope.row)"
                        >
                            <template #reference>
                                <el-button type="danger" size="small"> 删除 </el-button>
                            </template>
                        </el-popconfirm>
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
        <!-- 修改 -->
        <el-dialog
            v-model="switch_PosthouseBind"
            title="审核"
            width="50%"
        >
            <div>
                <el-form
                    ref="ruleFormRef"
                    :model="houseBind.item"
                >
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="审核状态" prop="hid"
                                label-width="80px"
                            >
                                <el-switch
                                    v-model="houseBind.item.status"

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
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label="回复" prop="reply"
                                label-width="80px"
                            >
                                <el-input
                                    v-model="houseBind.item.reply"
                                    placeholder=""
                                    type="textarea"
                                    :autosize="{minRows: 2,maxRows: 8}"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_PosthouseBind=false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc_2()">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog
            v-model="switch_HouseBinddetails"
            title="详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">申请人姓名</div>
                    <div class="right">{{ data_details.item.name }}</div>
                </div>
                <div class="item">
                    <div class="left">申请绑定的房屋ID</div>
                    <div class="right">{{ data_details.item.hid }}</div>
                </div>
                <div class="item">
                    <div class="left">申请人身份证号</div>
                    <div class="right">{{ data_details.item.id_card }}</div>
                </div>
                <div class="item">
                    <div class="left">类型</div>
                    <div class="right">{{ getOptVal(opts_all.obj.house_bind,data_details.item.type) }}</div>
                </div>
                <div class="item">
                    <div class="left">申请状态</div>
                    <div class="right">
                        <el-tag v-show="data_details.item.status == 10" class="btnNone" type="warning" effect="dark" size="large">未处理 </el-tag>
                        <el-tag v-show="data_details.item.status == 20" class="btnNone " type="success" effect="dark" size="large">审核成功</el-tag>
                        <el-tag v-show="data_details.item.status == 30" class="btnNone" type="danger" effect="dark" size="large">审核失败</el-tag>
                    </div>
                </div>
                <div v-if="data_details.item.affixs&&data_details.item.affixs.length>0" class="item">
                    <div class="left">附件</div>
                    <div class="right">
                        <!-- 两种模式任君选择 -->
                        <el-image
                            v-for="(item,i) in data_details.item.affixs" :key="i" :preview-src-list="data_details.item.affixs" class="wh_100p m-r-10" :src="item" fit="cover"
                        />
                    <!-- <div v-for="(item,i) in data_1.details_data.affixs">
                            <el-link type="success" :href="item" target="_blank">{{ item }}</el-link>
                        </div> -->
                    </div>
                </div>
                <div class="item">
                    <div class="left">申请时间</div>
                    <div class="right">{{ data_details.item.created_at }}</div>
                </div>
                <div class="item">
                    <div class="left">更新时间</div>
                    <div class="right">{{ data_details.item.updated_at }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_HouseBinddetails = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
const VITE_APP_UPLOAD = ref(import.meta.env.VITE_APP_UPLOAD)
import {
    APIgetHouseBind,
    APIputHouseBind,
    APIgetHouseBindDetails,
    APIgetHouseListHouse,
    APIdeleteHouseBind
} from '@/api/custom/custom.js'
const loading_tab = ref(true)
const housebind_list = reactive({
    arr: []
})
let per_page = ref(15)
let page = ref(1)
const allHouse_list = reactive({
    arr: []
})
const getHouseBindListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    loading_tab.value = true
    APIgetHouseBind(params).then(res => {
        console.log(res)
        housebind_list.arr = res
        loading_tab.value = false
        let btnNext = document.querySelector('.btn-next')
        if (res.length <= per_page.value) {
            btnNext.classList.add('not_allowed')
            btnNext.setAttribute('disabled', true)
            btnNext.setAttribute('aria-disabled', true)
        } else {
            btnNext.classList.remove('not_allowed')
            btnNext.removeAttribute('disabled')
            btnNext.setAttribute('aria-disabled', false)
        }
    })
    let params_1 = {
        page: page.value,
        per_page: per_page.value
    }
    APIgetHouseListHouse(params_1).then(res => {
        allHouse_list.arr = res
    })
}
const getHouseNameFunc = (arr, key) => {
    for (let i in arr) {
        if (arr[i].id == key) {
            return arr[i].name
        }
    }
    return ''
}
const switch_HouseBinddetails = ref(false)
const switch_PosthouseBind = ref(false)
const houseBind = reactive({
    item: {}
})
const data_details = reactive({
    item: {}
})
// 审核
const modifyHouseBindFunc = val => {
    switch_PosthouseBind.value = true
    houseBind.item.id = val.id
}
// 详情
const getHouseBindDetails = val => {
    APIgetHouseBindDetails(val.id).then(res => {
        res.affixs = []
        for (let i in res.affix) {
            res.affixs.push(import.meta.env.VITE_APP_FOLDER_SRC + res.affix[i])
        }
        data_details.item = res
        switch_HouseBinddetails.value = true
    })
}
// 同意拒绝提交
const dialogExamineCloseFunc_2 = () => {
    APIputHouseBind(houseBind.item.id, houseBind.item).then(res => {
        ElMessage.success('已审核')
        refreshFunc()
        switch_PosthouseBind.value = false
        houseBind.item = {}
    }).catch(err => {
        // ElMessage.error('修改失败')
    })
}
const DeleteHouseBindFunc = val => {
    APIdeleteHouseBind(val.id).then(res => {
        ElMessage.success('删除成功')
        refreshFunc()
    })
}
// 刷新
const refreshFunc = () => {
    page.value = 1
    getHouseBindListFunc()
}
// 执行
refreshFunc()
// 监听分页
watch(page, () => {
    getHouseBindListFunc()
})
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['houseBindStatus', 'house_bind']).then(res => {
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
</style>
