<template>
    <div class="propertypropertylist">
        <page-main>
            <div>
                <el-button
                    class="head-btn" type="primary" :icon="Plus"
                    @click="addResidentialFunc"
                >
                    添加事件
                </el-button>
            </div>
            <div class="search">
                <el-row :gutter="10">
                    <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">事件名称：</div>
                            <el-input v-model="data_search.obj.name" class="head-btn search_tb" placeholder="事件名称" clearable />
                        </div>
                    </el-col>
                    <!-- <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">
                                区域类型：
                            </div>
                            <el-select v-model="data_search.obj.status" class="head-btn search_tb" placeholder="区域类型" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.group_user_region_type" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </div>
                    </el-col> -->
                    <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">
                                是否显示：
                            </div>
                            <el-select v-model="data_search.obj.show" class="head-btn search_tb" placeholder="是否显示" clearable>
                                <el-option v-for="item, in opts_all.obj.device_show" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="m-t-20">
                    <el-col :xs="12" :md="6" :lg="10">
                        <div class="flx">
                            <div class="w_30%">
                                <el-button class="m-l-20" type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                            </div>
                            <div v-show="switch_search == true" class="w_70% m-l-30">
                                <el-button class="m-r-10" @click="refreshFunc">重置</el-button>
                                *搜索到相关结果共{{ total }}条。
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-table
                    v-loading="loading_tab"
                    :data="data_tab.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    class="tab"
                >
                    <el-table-column prop="house_id" label="事件名称" width="180">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="code_property" label="事件id" width="250">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.id }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="code_room" label="所在区域" width="160">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.region_cc }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="code_room" label="区域类型" width="160">
                        <template #default="scope">
                            <span class="m-l-10">{{ getOptVal(opts_all.obj.group_user_region_type,scope.row.region_type) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="time_deal" label="是否显示" width="140px">
                        <template #default="scope">
                            <span class="m-l-10">{{ getOptVal(opts_all.obj.device_show,scope.row.show) }} </span>
                        </template>
                    </el-table-column>

                    <el-table-column />
                    <el-table-column fixed="right" label="操作" width="240">
                        <template #default="scope">
                            <!-- <el-button
                                size="small" type="success"
                                @click="activityEventFunc(scope.row)"
                            >
                                事件活动
                            </el-button> -->
                            <el-button
                                type="primary" size="small"
                                @click="modifyResidentialFunc(scope.row)"
                            >
                                修改
                            </el-button>
                            <!-- <el-button
                                size="small"
                                @click="detailsFunc(scope.row)"
                            >
                                详情
                            </el-button> -->
                            <el-link :underline="false" type="primary">
                                <router-link class="el-button details" :to="{name: 'eventDetails',query:{ id : scope.row.id }}" style="width: 53px;height: 25px;">详情</router-link>
                            </el-link>
                            <el-popconfirm title="确定要删除当前项么?" cancel-button-type="info" @confirm="deleteFunc(scope.row)">
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
            </div>
            <div class="p-t-20">
                <el-pagination
                    v-model:current-page="page"
                    layout="total,prev,pager,next,jumper,"
                    :total="total"
                    :page-size="per_page"
                    background
                    hide-on-single-page
                />
            </div>
        </page-main>
        <!-- 修改添加 -->
        <el-dialog
            v-model="switch_examine"
            :title="str_title"
            width="50%"
        >
            <div>
                <el-form
                    ref="ruleFormRef"
                    :model="from_examine.item"
                >
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label-width="70px" label="事件名称" prop="name" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                <el-input
                                    v-model="from_examine.item.name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label-width="70px" label="区域类型" prop="region_type" :error="from_error.msg&&from_error.msg.region_type?from_error.msg.region_type[0]:''">
                                <el-select v-model="from_examine.item.region_type" class="head-btn search_tb" placeholder="区域类型" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.group_user_region_type" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="所在区域"
                                prop="region_val"
                                label-width="70px"
                                :error="
                                    from_error.msg && from_error.msg.name? from_error.msg.name[0]: ''"
                            >
                                <div class="selecZone" @click="click_add_group_zone_id">
                                    <span v-if="!selectedZone_id" class="selecChina">区域</span>
                                    <span style="margin-left: 11px;">{{ selectedZone_id }}</span>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label-width="70px" label="是否显示" prop="device_show" :error="from_error.msg&&from_error.msg.show?from_error.msg.show[0]:''">
                                <el-select v-model="from_examine.item.show" class="head-btn search_tb" placeholder="是否显示" clearable>
                                    <el-option v-for="item, in opts_all.obj.device_show" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item label-width="70px" label="简介" prop="desc" :error="from_error.msg&&from_error.msg.desc?from_error.msg.desc[0]:''">
                                <el-input
                                    v-model="from_examine.item.desc"
                                    type="textarea"
                                    :autosize="{ minRows: 3, maxRows: 6 }"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div class="footer">
                    <el-button @click="switch_examine=false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc(ruleFormRef)">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="switch_choose_zone" title="选择小区">
            <el-scrollbar height="250px">
                <position-tree-fourth
                    :tree_item="tree_item"
                    @checkChangeFunc="checkChangeFunc"
                    @checkFuncDate="checkFunc"
                />
            </el-scrollbar>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog
            v-model="switch_details"
            title="详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">事件名称</div>
                    <div class="right">{{ data_details.item.name }}</div>
                </div>
                <div class="item">
                    <div class="left">事件id</div>
                    <div class="right">{{ data_details.item.id }}</div>
                </div>
                <div class="item">
                    <div class="left">所在区域</div>
                    <div class="right">{{ data_details.item.region_cc }}</div>
                </div>
                <div class="item">
                    <div class="left">区域类型</div>
                    <div class="right">{{ getOptVal(opts_all.obj.group_user_region_type,data_details.item.region_type) }}</div>
                </div>
                <div class="item">
                    <div class="left">是否显示</div>
                    <div class="right">{{ getOptVal(opts_all.obj.device_show,data_details.item.show) }}</div>
                </div>
                <div class="item">
                    <div class="left">创建时间</div>
                    <div class="right">{{ data_details.item.created_at }}</div>
                </div>
                <div class="item">
                    <div class="left">修改时间</div>
                    <div class="right">{{ data_details.item.updated_at }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 事件活动 -->
        <el-dialog
            v-model="switch_activity"
            title="事件活动"
            width="50%"
        >
            <el-row :gutter="20" class="bottom-btn-box-2">
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                    <el-button class="head-btn" type="primary" @click="addArchiveFunc">添加活动</el-button>
                </el-col>
            </el-row>
            <el-table
                :data="activity_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                class="tab_1"
            >
                <el-table-column label="事项ID" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.id }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="目标id" width="250">
                    <template #default="scope">
                        <span>{{ scope.row.tgt_id }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="目标类型" width="250">
                    <template #default="scope">
                        <span>{{ scope.row.tgt_type }} </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="160">
                    <template #default="scope">
                        <!-- <el-button
                        size="small"
                        @click="lookDetails(scope.row)"
                    >
                        详情
                    </el-button> -->
                        <el-popconfirm
                            title="确定要删除当前项么?" cancel-button-type="info"
                            @confirm="deleteFuncDialog(scope.row)"
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
                v-model:current-page="page2"
                layout="total,prev,pager,next,jumper,"
                :total="total2"
                :page-size="per_page2"
                background
                hide-on-single-page
                class="p-t-20"
            />
        </el-dialog>
        <!-- 活动添加 -->
        <el-dialog
            v-model="switch_add"
            title="添加事件活动"
            width="50%"
        >
            <el-form
                ref="ruleFormRef"
                :model="from_add.obj"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="活动类型"
                        >
                            <el-select v-model="from_add.obj.tgt_type" class="head-btn search_tb" placeholder="活动类型" clearable>
                                <el-option v-for="item in opts_all.obj.activityEvent_type" :key="item.key" :label="item.leb" :value="item.val" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="选择活动"
                        >
                            <div class="wh_100">
                                <div class="searchUserGroup">
                                    <!-- <SearchArchive v-model:str="from_add.obj.article_id" /> -->
                                    <SearchArchive v-if="from_add.obj.tgt_type == 'announce'" @checkUserNameFunc="checkUserNameFunc" />
                                    <SearchActivities v-if="from_add.obj.tgt_type == 'survey'" @checkActivityFunc="checkActivityFunc" />
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="footer">
                    <el-button @click="switch_add=false">取消</el-button>
                    <el-button type="primary" @click="addPostFunc">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import {
    APIgetActivityEventList,
    APIgetActivityEventDetails,
    APIdeleteActivityEvent,
    APIputActivityEvent,
    APIpostActivityEvent
} from '@/api/custom/custom.js'
// import { showForm } from '@/util/form'
import {
    reactive,
    ref,
    watch
} from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Plus } from '@element-plus/icons-vue'
/* ----------------------------------------------------------------------------------------------------------------------- */
// 数据
// 搜索
let switch_search = ref(false)
let data_search = reactive({
    obj: {}
})
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
    item: { }
})
// 添加弹出框选择小区
const tree_item = ref({
    id: '50',
    name: '测试',
    next_type: 'region',
    type: 'region'
})
import { APIgetChinaRegion } from '@/api/custom/custom.js'
APIgetChinaRegion().then(res => {
    console.log(res)
    tree_item.value.id = res.data[0].code
    tree_item.value.name = res.data[0].name
    tree_item.value.next_type = 'region'
    tree_item.value.type = 'region'
})
const click_add_group_zone_id = () => {
    switch_choose_zone.value = true
}
const switch_choose_zone = ref(false)
const checkFunc = val => {
    console.log(val)
    selectedZone_id.value = val.name
    if (val.type == 'region') {
        from_examine.item.region_type = 1
        from_examine.item.region_val = val.china_code || val.id
        from_examine.item.region_cc = val.china_code || val.id
    }
    if (val.type == 'zone') {
        from_examine.item.region_type = 2
        from_examine.item.region_val = val.id
        from_examine.item.region_cc = val.china_code
    }
    console.log(val)
}
const checkChangeFunc = val => {
    // console.log(val)
    switch_choose_zone.value = false
}
const str_title = ref('添加')
const selectedZone_id = ref('')
const from_error = reactive({ msg: {} })
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

// 详情
const detailsFunc = val => {
    data_dialog.obj = val
    APIgetActivityEventDetails(val.id).then(res => {
        console.log(res)
        data_details.item = res
        switch_details.value = true
        if (res.status === 404) {
            ElMessage.error('改产权信息不存在')
        }
    })
}
// 事件活动
const page2 = ref(1)
const total2 = ref(1)
const per_page2 = ref(15)
const switch_activity = ref(false)
const activity_tab = reactive({
    obj: {}
})
const activities_item = reactive({
    obj: {}
})
import {
    APIgetActivitiesEventList,
    APIpostActivitiesEvent } from '@/api/custom/custom.js'
const getActivitiesEventList = () => {
    APIgetActivitiesEventList(activities_item.obj.id).then(res => {
        console.log(res)
        activity_tab.arr = res
        switch_activity.value = true
    })
}
const switch_add = ref(false)
const from_add = reactive({
    obj: {}
})
const addArchiveFunc = () => {
    switch_add.value = true
    from_add.obj = {}
}
const activityEventFunc = val => {
    activities_item.obj = val
    switch_activity.value = true
    getActivitiesEventList()
}
const addPostFunc = () => {
    APIpostActivitiesEvent(activities_item.obj.id, from_add.obj).then(() => {
        getActivitiesEventList()
        switch_add.value = false
        ElMessage.success('添加成功')
    }).catch(() => {
        ElMessage.error('添加失败')
    })
}
// 选择用户组name
const checkUserNameFunc = val => {
    from_add.obj.tgt_id = val.id
}
const checkActivityFunc = val => {
    from_add.obj.tgt_id = val.id
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
            if (str_title.value == '修改') {
                console.log(from_examine.item)
                APIputActivityEvent(from_examine.item.id, from_examine.item).then(res => {
                    refreshFunc()
                    ElMessage.success('修改成功')
                    switch_examine.value = false
                }).catch(err => {
                    ElMessage.error('修改失败')
                })
            } else {
                APIpostActivityEvent(from_examine.item).then(res => {
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
    if (params.created_at) {
        let updated_str = ''
        for (let i in params.created_at) {
            updated_str += ',' + params.created_at[i]
        }
        params.created_at = updated_str.substring(1)
    }
    if (params.updated_at) {
        let updated_str = ''
        for (let i in params.updated_at) {
            updated_str += ',' + params.updated_at[i]
        }
        params.updated_at = updated_str.substring(1)
    }
    loading_tab.value = true
    APIgetActivityEventList(params).then(res => {
        console.log(res)
        loading_tab.value = false
        data_tab.arr = res
        total.value = data_tab.arr.length
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteActivityEvent(val.id).then(() => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
// 添加产权
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {}
    switch_examine.value = true
}
// 修改
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    APIgetActivityEventDetails(val.id).then(res => {
        from_examine.item = res
        switch_examine.value = true
    })
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()

/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
import SearchActivities from '../../components/SearchActivities/index.vue'
const opts_all = reactive({
    obj: {}
})
getOpts(['device_show', 'group_user_region_type', 'activityEvent_type']).then(res => {
    opts_all.obj = res
})

</script>
<style lang="scss">
.propertypropertylist {
    .el-cascader-box-my {
        .el-cascader {
            width: 100% !important;
            margin-bottom: 10px;
        }
    }
    .serve-box {
        border: 1px solid #eee;
        box-sizing: border-box;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 6px;
        position: relative;
        .delete-service {
            position: absolute;
            right: 0;
            top: 0;
            z-index: 999999;
            cursor: pointer;
            background-color: #fff;
        }
    }
}
.selecZone {
    width: 100%;
    height: 32px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    .selecChina {
        margin-left: 11px;
        color: #aaa;
    }
}
</style>
<style lang="scss" scoped>
    .search-tips {
        color: #aaa;
        font-size: 14px;
        margin-bottom: 20px;
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
    .details {
        text-decoration: inherit;
        font-size: small;
        margin: 0 10px;
    }
</style>
