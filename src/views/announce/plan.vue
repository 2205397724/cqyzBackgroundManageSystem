<template>
    <div class="articletpletasksd">
        <page-main style="overflow: hidden;">
            <div class="m-b-20">
                <el-button
                    type="primary" :icon="Plus" size="large"
                    @click="addResidentialFunc"
                >
                    制定计划
                </el-button>
            </div>
            <div class="search">
                <el-row>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="10" class="search_th">
                                任务派发单位：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="14">
                                <div class="searchUserGroup">
                                    <SearchUserGroup ref="V_1" @checkName="checkNameFunc" />
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="10" class="search_th">
                                计划发布分类：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="14">
                                <CascaderAnnounce v-model="data_search.obj.cid" />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="10" class="search_th">
                                是否启用：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="14">
                                <el-select v-model="data_search.obj.isactive" class="search_tb_1" placeholder="是否启用" clearable>
                                    <el-option v-for="item in opts_all.obj.flow_active" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row v-if="btnClick==true">
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="10" class="search_th">
                                是否启用：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="14">
                                <el-select v-model="data_search.obj.isactive" class="search_tb" placeholder="是否启用" clearable>
                                    <el-option v-for="(item) in opts_all.obj.tasksd_use" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="10" class="search_th">
                                下次执行时间：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="14">
                                <el-date-picker
                                    v-model="data_search.obj.runat"
                                    type="date"
                                    value-format="YYYY-MM-DD"
                                    placeholder="下次执行时间"
                                    class="search_tb"
                                    :default-value="new Date()"
                                />
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="0" :sm="4" :md="3" :lg="2" />
                    <el-col :xs="24" :sm="20" :md="21" :lg="22">
                        <el-button type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                        <el-button v-show="switch_search == true" class="m-l-20 m-r-10" :icon="Loading" @click="refreshFunc_1">重置</el-button>
                        <span v-show="switch_search == true" class="size-base">
                            *共搜索到{{ total }}条。
                        </span>
                    </el-col>
                </el-row>
                <el-row>
                    <div class="searchPlay" @click="btnClickFunc">
                        <!-- <el-icon :size="20"><ArrowUpBold /></el-icon> -->
                        <el-button v-if="btnClick==false" :icon="CaretTop" class="searchDeal" size="small">展开</el-button>
                        <el-button v-if="btnClick==true" :icon="CaretBottom" class="searchDeal" size="small">收起</el-button>
                    </div>
                </el-row>
            </div>
            <el-table
                v-loading="loading_tab"
                :data="data_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                class="tab_1"
            >
                <el-table-column label="任务派发单位">
                    <template #default="scope">
                        <span class="m-l-10">{{ scope.row.fromgroup?.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="接收单位等级" width="120">
                    <template #default="scope">
                        <span class="m-l-10">{{ getOptVal(opts_all.obj.article_lv_1,scope.row.tolv ) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="计划发布分类" width="120">
                    <template #default="scope">
                        <span class="m-l-10">{{ scope.row?.cate?.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="计划发布周期" width="120">
                    <template #default="scope">
                        <span class="m-l-10">{{ getOptVal(opts_all.obj.article_rate,scope.row.per ) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="下次执行时间">
                    <template #default="scope">
                        <span class="m-l-10">{{ scope.row.runat }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="是否启用" width="80">
                    <template #default="scope">
                        <el-switch
                            v-model="scope.row.isactive"

                            style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                            active-text="是"
                            inactive-text="否"
                            :active-value="1"
                            :inactive-value="0"
                            inline-prompt
                            @change="SwitchFunc(scope.row)"
                        />
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="200">
                    <template #default="scope">
                        <el-button
                            type="primary" size="small"
                            @click="modifyResidentialFunc(scope.row)"
                        >
                            修改
                        </el-button>
                        <el-button
                            size="small"
                            @click="detailsFunc(scope.row)"
                        >
                            详情
                        </el-button>
                        <el-popconfirm
                            title="确定要删除当前项么?" cancel-button-type="info"
                            @confirm="deleteFunc(scope.row)"
                        >
                            <template #reference>
                                <el-button type="danger" size="small">
                                    删除
                                </el-button>
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
        <!-- 修改添加 -->
        <el-dialog
            v-model="switch_examine"
            :title="str_title"
            width="50%"
            @closed="add_dialog_close"
        >
            <el-form
                ref="ruleFormRef"
                :model="from_examine.item"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="任务派发单位"
                            label-width="100px"
                            :error="from_error.msg&&from_error.msg.from?from_error.msg.from[0]:''"
                        >
                            <div class="searchUserGroup">
                                <SearchUserGroup ref="V" :name="userGroupName" @checkName="checkNameFunc" />
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="接收单位等级"
                            label-width="100px"
                            :error="from_error.msg&&from_error.msg.tolv?from_error.msg.tolv[0]:''"
                        >
                            <el-select v-model="from_examine.item.tolv" class="head-btn" placeholder="" clearable>
                                <el-option v-for="item in opts_all.obj.article_lv_1" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="计划发布周期"
                            label-width="100px"
                            :error="from_error.msg&&from_error.msg.per?from_error.msg.per[0]:''"
                        >
                            <el-select v-model="from_examine.item.per" class="head-btn" placeholder="计划发布周期" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.article_rate" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="计划发布分类"
                            label-width="100px"
                            :error="from_error.msg&&from_error.msg.cid?from_error.msg.cid[0]:''"
                        >
                            <CascaderAnnounce v-model="from_examine.item.cid" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="下次执行时间"
                            label-width="100px"
                            :error="from_error.msg&&from_error.msg.runat?from_error.msg.runat[0]:''"
                        >
                            <el-date-picker
                                v-model="from_examine.item.runat"
                                type="date"
                                value-format="YYYY-MM-DD"
                                placeholder="执行时间"
                                class="w_100"
                                :default-value="new Date()"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="是否启用"
                            label-width="100px"
                            :error="from_error.msg&&from_error.msg.isactive?from_error.msg.isactive[0]:''"
                        >
                            <el-switch
                                v-model="from_examine.item.isactive"

                                style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                                active-text="是"
                                inactive-text="否"
                                :active-value="1"
                                :inactive-value="0"
                                inline-prompt
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="footer">
                    <el-button @click="switch_examine=false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc(ruleFormRef)">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog
            v-model="switch_details"
            title="详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">任务派发单位</div>
                    <!-- <div class="right">{{ getNameFunc(userData.arr,data_details.item.from) }}</div> -->
                    <div class="right">{{ data_details.item.fromgroup?.name }}</div>
                </div>
                <div class="item">
                    <div class="left">任务接收单位等级</div>
                    <div class="right">{{ getOptVal(opts_all.obj.article_lv_1,data_details.item.tolv) }}</div>
                </div>
                <div class="item">
                    <div class="left">计划发布周期</div>
                    <div class="right">{{ getOptVal(opts_all.obj.article_rate,data_details.item.per ) }}</div>
                </div>
                <div class="item">
                    <div class="left">计划发布分类</div>
                    <!-- <div class="right">{{ data_details.item?.cate?.name }}</div> -->
                    <div class="right">{{ data_details.item.cate?.name }}</div>
                </div>
                <div class="item">
                    <div class="left">下次执行时间</div>
                    <div class="right">{{ data_details.item.runat }}</div>
                </div>
                <div class="item">
                    <div class="left">是否启用</div>
                    <div class="right">
                        <el-tag v-if=" data_details.item.isactive == 1" type="success" effect="dark" round class="btnNone">启用</el-tag>
                        <el-tag v-if="data_details.item.isactive == 0" type="danger" effect="dark" round class="btnNone">不启用</el-tag>
                    </div>
                </div>
                <div class="item">
                    <div class="left">任务ID</div>
                    <div class="right">{{ data_details.item.id }}</div>
                </div>
                <div class="item">
                    <div class="left">创建时间</div>
                    <div class="right">{{ data_details.item.created_at }}</div>
                </div>
                <div class="item">
                    <div class="left">更新时间</div>
                    <div class="right">{{ data_details.item.updated_at }}</div>
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
<script setup>
import Cascaders from '@/components/Cascaders/index.vue'
import {
    APIgetTasksdList,
    APIgetTasksdDetails,
    APIdeleteTasksd,
    APIputTasksd,
    APIpostTasksd
} from '@/api/custom/custom.js'
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
import { Loading, Search, Plus, CaretTop, CaretBottom } from '@element-plus/icons-vue'
import { useUserOutsideStore } from '@/store/modules/user'
/* ----------------------------------------------------------------------------------------------------------------------- */
// 数据
// 搜索
let switch_search = ref(false)
let data_search = reactive({
    obj: {}
})
let btnClick = ref(false)
// 详情
let switch_details = ref(false)
// 列表
let ruleFormRef = ref('')
let loading_tab = ref(false)
let data_tab = reactive({
    arr: []
})
// 操作事件 列表单个行数据
let data_dialog = reactive({
    obj: {}
})
// 详情
const data_details = reactive({
    item: ''
})
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(1)
// 添加，修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {}
})
const str_title = ref('添加计划')
const from_error = reactive({
    msg: {}
})

const isSearch3 = ref(false)
const isSearch2 = ref(true)
const btnClickFunc = () => {
    btnClick.value = !btnClick.value
    isSearch3.value = !isSearch3.value
    isSearch2.value = !isSearch2.value
}
// const style1 = ref({})
// // style1.value={height: 200px}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 方法
// 搜索
const searchFunc = () => {
    page.value = 1
    switch_search.value = true
    getTabListFunc()
}
// 刷新
const refreshFunc = () => {
    switch_search.value = false
    data_search.obj = {}
    getTabListFunc()
}
const V_1 = ref(null)
const refreshFunc_1 = () => {
    V_1.value.clearFunc()
    refreshFunc()
}
// 详情
const detailsFunc = val => {
    data_dialog.obj = val
    APIgetTasksdDetails(val.id).then(res => {
        data_details.item = res
        switch_details.value = true
    })
}
// 监听分页
watch(page, () => {
    getTabListFunc()
})
// 同意拒绝提交
const dialogExamineCloseFunc = formEl => {
    from_error.msg = {}
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            for (let key in from_examine.item) {
                if (from_examine.item[key] !== null) {
                    if (from_examine.item[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (from_examine.item[key] !== 0 || from_examine.item[key] !== false)) {
                        delete from_examine.item[key]
                    }
                }
            }
            if (str_title.value == '修改计划') {
                APIputTasksd(from_examine.item.id, from_examine.item).then(res => {
                    refreshFunc()
                    ElMessage.success('修改成功')
                    switch_examine.value = false
                }).catch(err => {
                    ElMessage.error('修改失败')
                })
            } else {
                APIpostTasksd(from_examine.item).then(res => {
                    refreshFunc()
                    ElMessage.success('添加成功')
                    switch_examine.value = false
                }).catch(err => {
                    ElMessage.error('添加失败')
                })
            }
        } else {
            return false
        }
    })
}
// 获取列表api请求
const getTabListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    for (let key in data_search.obj) {
        if (data_search.obj[key] || data_search.obj[key] === 0) {
            if (data_search.obj[key] instanceof Array && data_search.obj[key].length <= 0) {
                continue
            }
            params[key] = data_search.obj[key]
        }
    }
    loading_tab.value = true
    APIgetTasksdList(params).then(res => {
        console.log(res)
        loading_tab.value = false
        data_tab.arr = res
        total.value = res.length
        let btnNext = document.querySelector('.btn-next')
        if (res.length <= per_page.value) {
            flag.value = true
            btnNext.classList.add('not_allowed')
            btnNext.setAttribute('disabled', true)
            btnNext.setAttribute('aria-disabled', true)
        } else {
            flag.value = false
            btnNext.classList.remove('not_allowed')
            btnNext.removeAttribute('disabled')
            btnNext.setAttribute('aria-disabled', false)
        }
    })
}
const flag = ref(false)
// switch 状态改变事件
const SwitchFunc = row => {
    console.log(row)
    from_examine.item = row
    APIputTasksd(from_examine.item.id, from_examine.item)
}
// 删除
const deleteFunc = val => {
    APIdeleteTasksd(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
const V = ref(null)
const add_dialog_close = () => {
    V.value.clearFunc()
    userGroupName.value = ''
}
// 添加
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加计划'
    from_examine.item = {
        property_owners: [],
        house_id: '',
        time_deal: '',
        code_property: '',
        code_room: '',
        should_bind_house: '',
        isactive: 0
    }
    switch_examine.value = true
}
// 修改
const userGroupName = ref('')
const modifyResidentialFunc = val => {
    // V.value.rowClickFunc()
    from_error.msg = {}
    str_title.value = '修改计划'
    APIgetTasksdDetails(val.id).then(res => {
        from_examine.item = res
        switch_examine.value = true
        userGroupName.value = from_examine.item.fromgroup?.name
    })
}
// dialog关闭回调
// const V = ref(null)
// const add_dialog_close = () => {
//     if (str_title.value == '添加计划') {
//         V.value.clearFunc()
//     }
// }
// 选择用户组name
const checkNameFunc = val => {
    console.log(val)
    data_search.obj.from = val.id
    from_examine.item.from = val.id
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['article_lv_1', 'tasksd_use', 'article_rate', 'flow_active']).then(res => {
    opts_all.obj = res
})

</script>
<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
</style>
