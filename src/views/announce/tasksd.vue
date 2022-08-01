<template>
    <div class="articletpletasksd">
        <page-main>
            <div>
                <el-button
                    class="head-btn" type="primary" :icon="Plus"
                    @click="addResidentialFunc"
                >
                    制定计划
                </el-button>
            </div>
            <div :class="{search1: isSearch1,search2: isSearch2}">
                <el-row :gutter="10">
                    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
                        <div class="search_th">发布人用户组：</div>

                        <div class="searchUser search_tb">
                            <div class="searchUserGroup">
                                <SearchUserGroup ref="V-1" @checkName="checkNameFunc" />
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
                        <div class="search_th">任务接收对象等级：</div>
                        <el-select v-model="data_search.obj.tolv" class="head-btn search_tb_1" placeholder="指定单位" clearable>
                            <el-option v-for="item in opts_all.obj.article_lv_1" :key="item.key" :label="item.val" :value="item.key" />
                        </el-select>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
                        <div class="search_th">公示分类：</div>
                        <div class="search_tb">
                            <CascaderAnnounce v-model="data_search.obj.cid" />
                        </div>
                    </el-col>
                </el-row>
                <el-row v-if="btnClick==true">
                    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
                        <div class="search_th">是否启用：</div>
                        <el-select v-model="data_search.obj.isactive" class="head-btn search_tb" placeholder="是否启用" clearable>
                            <el-option v-for="(item,i) in opts_all.obj.tasksd_use" :key="item.key" :label="item.val" :value="item.key" />
                        </el-select>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
                        <div class="search_th">下次执行时间：</div>
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
                <el-row class="m-t-10">
                    <el-col :xs="12" :sm="8" :md="6" :lg="3" :xl="8">
                        <el-button class="m-l-20" type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                    </el-col>
                    <el-col v-show="switch_search" class="" :xs="12" :sm="8" :md="6" :lg="21" :xl="8">
                        <el-button class="m-r-10" @click="refreshFunc_1">重置</el-button>
                        *搜索到相关结果共{{ total }}条。
                    </el-col>
                </el-row>
                <el-row>
                    <div style="margin: auto; margin-top: 20px;" @click="btnClickFunc">
                        <!-- <el-icon :size="20"><ArrowUpBold /></el-icon> -->
                        <el-button v-if="btnClick==false" :icon="CaretTop" style="border: none;background-color: #fafafa;">展开</el-button>
                        <el-button v-if="btnClick==true" :icon="CaretBottom" style="border: none;background-color: #fafafa;">收起</el-button>
                    </div>
                </el-row>
            </div>
            <el-table
                v-loading="loading_tab"
                :data="data_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;border: 1px solid #ebeef4;box-sizing: border-box;"
            >
                <!-- <el-table-column label="指定范围" width="160">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.fromchina.name }} </span>
                    </template>
                </el-table-column> -->
                <el-table-column label="任务派发单位" width="150">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ getNameFunc(userData.arr,scope.row.from) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="接收单位" width="150">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ getOptVal(opts_all.obj.article_lv_1,scope.row.tolv ) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="公示分类" width="150">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ getNameFunc(data_1.arr,scope.row.cid) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="计划发布周期">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ getOptVal(opts_all.obj.article_rate,scope.row.per ) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="下次执行时间" width="120">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.runat }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="是否启用" width="90">
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
                <el-table-column />
            </el-table>
            <el-pagination
                v-model:current-page="page"
                style="padding-top: 20px;"
                layout="total,prev,pager,next,jumper,"
                :total="total"
                :page-size="per_page"
                background
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
                            <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;font-size: 14px;">
                                <SearchUserGroup ref="V" :name="userId" @checkName="checkNameFunc" />
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="任务接收单位"
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
                                style="width: 100%;"
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
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
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
                    <div class="left">任务ID</div>
                    <div class="right">{{ data_details.item.id }}</div>
                </div>
                <div class="item">
                    <div class="left">任务派发单位</div>
                    <div class="right">{{ getNameFunc(userData.arr,data_details.item.from) }}</div>
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
                    <div class="left">公示分类</div>
                    <div class="right">{{ getNameFunc(data_1.arr,data_details.item.cid) }}</div>
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
import { Search, Plus, CaretTop, CaretBottom } from '@element-plus/icons-vue'
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
import {
    APIgetChinaRegion
} from '@/api/custom/custom.js'
const isSearch1 = ref(false)
const isSearch2 = ref(true)
const btnClickFunc = () => {
    btnClick.value = !btnClick.value
    isSearch1.value = !isSearch1.value
    isSearch2.value = !isSearch2.value
}
// const style1 = ref({})
// // style1.value={height: 200px}
const cascader_props = {
    multiple: false,
    emitPath: false,
    lazy: true,
    value: 'code',
    label: 'name',
    checkStrictly: true,
    lazyLoad(node, resolve) {
        const {
            data
        } = node
        APIgetChinaRegion({ 'p_code': data.code }).then(res => {
            resolve(res)
        })
    }
}
const cascader_props2 = {
    multiple: true,
    emitPath: false,
    lazy: true,
    value: 'code',
    label: 'name',
    checkStrictly: true,
    lazyLoad(node, resolve) {
        const {
            data
        } = node
        APIgetChinaRegion({ 'p_code': data.code }).then(res => {
            resolve(res)
        })
    }
}
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
    page.value = 1
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
    })
}

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
const userId = ref('')
const modifyResidentialFunc = val => {
    // V.value.rowClickFunc()
    from_error.msg = {}
    str_title.value = '修改计划'
    APIgetTasksdDetails(val.id).then(res => {
        from_examine.item = res
        userId.value = from_examine.item.from
        switch_examine.value = true
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
const userName = ref('')
const userData = reactive({
    arr: []
})
const checkNameFunc = val => {
    console.log(val)
    data_search.obj.from = val.id
    from_examine.item.from = val.id
}
import {
    APIgetGroupList
} from '@/api/custom/custom.js'
APIgetGroupList().then(res => {
    if (res.status == 200) {
        console.log(res)
        loading_tab.value = false
        userData.arr = res.data
    }
})
const getNameFunc = (arr, key) => {
    for (let i in arr) {
        if (arr[i].id == key) {
            return arr[i].name
        }
    }
}
// 获取类别名称
let data_1 = reactive({
    arr: []
})
import {
    APIgetTypeList
} from '@/api/custom/custom.js'
// 获取公式列表api请求
const main_type = ref('announce')
APIgetTypeList(main_type.value).then(res => {
    console.log(res)
    data_1.arr = res
})
/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['article_lv_1', 'tasksd_use', 'article_rate']).then(res => {
    opts_all.obj = res
})

</script>
