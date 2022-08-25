<template>
    <div class="routine-house">
        <page-main style="overflow: hidden;">
            <el-button-group class="btn">
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
                <el-table-column prop="name" label="申请人身份证号" width="250">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.id_card }} </span>
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
                        <el-tag v-show="scope.row.status == 10" class="btnNone m-l-5" type="warning" effect="dark" size="small" @click="getHouseBindDetails(scope.row)">{{ getOptVal(opts_all.obj.houseBindStatus,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 20" class="btnNone " type="success" size="small">{{ getOptVal(opts_all.obj.houseBindStatus,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 30" class="btnNone" type="danger" size="small">{{ getOptVal(opts_all.obj.houseBindStatus,scope.row.status) }} </el-tag>
                    </template>
                </el-table-column>
                <el-table-column />
                <el-table-column label="操作" width="200px" fixed="right">
                    <template #default="scope">
                        <!-- <el-button
                            type="primary"
                            size="small"
                            @click="modifyHouseBindFunc(scope.row)"
                        >
                            审核
                        </el-button> -->
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
            width="40%"
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
                                label="审核意见" prop="reply"
                                label-width="80px"
                            >
                                <el-input
                                    v-model="houseBind.item.reply"
                                    placeholder=""
                                    type="textarea"
                                    :autosize="{minRows: 3,maxRows: 8}"
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
            width="70%"
        >
            <div class="detail_hd">
                <div class="left">申请人信息</div>
                <div class="right">房屋产权信息</div>
            </div>
            <div class="Box">
                <div class="detailBigBox">
                    <div class="details-box">
                        <div class="item">
                            <div class="left">申请人姓名</div>
                            <div class="right">{{ data_details.item.name }}</div>
                        </div>
                        <div class="item">
                            <div class="left">申请类型</div>
                            <div class="right">
                                <el-tag :type="data_details.item.type==1? 'success' : 'warning'">{{ getOptVal(opts_all.obj.house_bind,data_details.item.type) }}</el-tag>
                            </div>
                        </div>
                        <div class="item">
                            <div class="left">申请人身份证号</div>
                            <div class="right">{{ data_details.item.id_card }}</div>
                        </div>
                        <div class="item">
                            <div class="left">申请时间</div>
                            <div class="right">{{ data_details.item.created_at }}</div>
                        </div>
                        <div class="item">
                            <div class="left">申请状态</div>
                            <div class="right">
                                <el-tag v-show="data_details.item.status == 10" class="btnNone" type="warning" effect="dark" @click="modifyHouseBindFunc">未处理 </el-tag>
                                <el-tag v-show="data_details.item.status == 20" class="btnNone " type="success">审核成功</el-tag>
                                <el-tag v-show="data_details.item.status == 30" class="btnNone" type="danger">审核失败</el-tag>
                            </div>
                        </div>
                        <div v-if="data_details.item.affixs&&data_details.item.affixs.length>0" class="item">
                            <div class="left">佐证材料</div>
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
                        <div v-if="data_details.item.reply != ''" class="item">
                            <div class="left">审核意见</div>
                            <div class="right">{{ data_details.item.reply }}</div>
                        </div>
                        <div v-if="data_details.item.audit_user" class="item">
                            <div class="left">审核人</div>
                            <div class="right">
                                <span>姓名：{{ data_details.item.audit_user.name ? data_details.item.audit_user.name: data_details.item.audit_user.nickname ? data_details.item.audit_user.nickname : data_details.item.audit_user.username ? data_details.item.audit_user.username:'' }}</span>
                                <span class="inline-block m-l-30 m-r-30">电话：{{ data_details.item.audit_user.mobile }}
                                </span>
                                <span style="font-size: 13px;">时间：{{ data_details.item.updated_at }}</span>
                            </div>
                        </div>
                        <div v-if="data_details.item.status == 10" class="item">
                            <div class="left_1" />
                            <div class="right">
                                <el-button type="primary" class="m-t-10" @click="modifyHouseBindFunc">审核</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detailBigBox_1">
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
import { APIgetSurveyTopicDetail } from '@/api/custom/custom'
const VITE_APP_UPLOAD = ref(import.meta.env.VITE_APP_UPLOAD)
import {
    APIgetHouseBind,
    APIputHouseBind,
    APIgetHouseBindDetails,
    APIgetHouseListHouse,
    APIdeleteHouseBind,
    APIgetPropertyList
} from '@/api/custom/custom.js'
const loading_tab = ref(true)
const housebind_list = reactive({
    arr: []
})
let per_page = ref(15)
let page = ref(1)
const total = ref(50)
const allHouse_list = reactive({
    arr: []
})
const data_details_1 = reactive({
    item: {
        owners: []
    }
})
const getHouseBindListFunc = val => {
    let params = {
        page: page.value,
        per_page: per_page.value,
        status: val
    }
    if (val == 0) {
        delete params.status
    }
    loading_tab.value = true
    APIgetHouseBind(params).then(res => {
        console.log(res)
        housebind_list.arr = res
        total.value = res.length
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
// 待处理点击事件
const index = ref(0)
const noDeal = val => {
    index.value = val
    getHouseBindListFunc(val)
}
const flag = ref(true)
const flag1 = ref(true)
const flag2 = ref(true)
const flag3 = ref(true)
const StatusFunk = val => {
    noDeal(val)
    flag.value = false
    flag1.value = false
    flag2.value = false
    flag3.value = false
    console.log(flag.value)
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
    item: {
        house: {
            name: '',
            addr: '',
            floor_alias: ''
        },
        audit_user: {
            name: '',
            nickname: '',
            username: '',
            mobile: ''
        }
    }
})
// 审核
const modifyHouseBindFunc = () => {
    switch_PosthouseBind.value = true
    houseBind.item.id = data_details.item.id
}
// 详情
const getHouseBindDetails = val => {
    APIgetHouseBindDetails(val.id).then(res => {
        console.log(res)
        res.affixs = []
        for (let i in res.affix) {
            res.affixs.push(import.meta.env.VITE_APP_FOLDER_SRC + res.affix[i])
        }
        data_details.item = res
        switch_HouseBinddetails.value = true
    })
    let params = {
        page: page.value,
        per_page: per_page.value,
        house_id: val.hid
    }
    APIgetPropertyList(params).then(res => {
        console.log(res)
        data_details_1.item = res[0]
        let detailBigBox = document.querySelector('.detailBigBox')
        // if (!data_details_1.item) {
        //     detailBigBox.style.width = '100%'
        //     console.log(detailBigBox)
        // } else {
        //     detailBigBox.style.width = '50%'
        // }
        console.log(res[0])
    })
}
// 同意拒绝提交
const dialogExamineCloseFunc_2 = () => {
    APIputHouseBind(houseBind.item.id, houseBind.item).then(res => {
        ElMessage.success('已审核')
        refreshFunc()
        switch_PosthouseBind.value = false
        switch_HouseBinddetails.value = false
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
:deep .el-badge {
    --el-badge-size: 38px;
}
:deep .el-badge__content.is-fixed {
    height: 24px;
}
:deep .el-badge__content {
    line-height: 23px;
}
.btn {
    margin-bottom: 15px;
}
.btn button {
    padding: 20px 40px;
}
.Box {
    display: flex;
    .detailBigBox {
        width: 50%;
        padding: 10px;
        background-color: #ecf5ff;
        margin-right: 20px;
    }
    .detailBigBox_1 {
        width: 50%;
        padding: 10px;
        background-color: #fafafa;
    }
}
.detail_hd {
    font-weight: 700;
    margin-bottom: 5px;
    display: flex;
    .left {
        width: 50%;
        margin-bottom: 10px;
        margin-right: 20px;
    }
    .right {
        width: 50%;
        margin-bottom: 10px;
    }
}
.owners {
    display: flex;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
    flex-wrap: wrap;
    div {
        width: 50%;
        margin-bottom: 5px;
        span {
            color: #000;
        }
    }
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
