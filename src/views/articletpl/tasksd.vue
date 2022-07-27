<template>
    <div class="articletpletasksd">
        <page-main>
            <el-row :gutter="10">
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <Cascaders v-model="data_search.obj.from" />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-select v-model="data_search.obj.tolv" class="head-btn" placeholder="指定单位" clearable>
                        <!-- <el-option v-if="data_search.obj.from" v-show="data_search.obj.from.length<=6" label="街道" :value="4" />
                        <el-option v-if="data_search.obj.from" v-show="data_search.obj.from.length<=9" label="社区" :value="5" />
                        <el-option v-if="data_search.obj.from" v-show="data_search.obj.from.length<=12" label="小区" :value="6" /> -->
                        <el-option v-for="item in opts_all.obj.article_lv" :key="item.key" :label="item.val" :value="item.key" />
                    </el-select>
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <CascaderType v-model="data_search.obj.cid" />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-select v-model="data_search.obj.isactive" class="head-btn" placeholder="是否启用" clearable>
                        <el-option v-for="(item,i) in opts_all.obj.tasksd_use" :key="item.key" :label="item.val" :value="item.key" />
                    </el-select>
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-date-picker
                        v-model="data_search.obj.runat"
                        type="date"
                        value-format="YYYY-MM-DD"
                        placeholder="执行时间"
                        style="width: 100%;"
                        :default-value="new Date()"
                    />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="2" :xl="3">
                    <el-button class="head-btn" type="primary" @click="searchFunc">搜索</el-button>
                </el-col>
            </el-row>
            <div v-show="switch_search" class="search-tips">
                <el-button style="margin-right: 10px;" @click="refreshFunc">重置</el-button>
                *搜索到相关结果共{{ total }}条。
            </div>
            <el-row :gutter="20" class="bottom-btn-box-2">
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                    <el-button class="head-btn" type="primary" @click="addResidentialFunc">制定计划</el-button>
                </el-col>
            </el-row>
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
                <el-table-column label="接收单位" width="120">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ getOptVal(opts_all.obj.article_lv,scope.row.tolv ) }}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="计划发布分类" width="250">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.cate.name }}</span>
                    </template>
                </el-table-column> -->
                <el-table-column label="计划发布周期" width="160">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ getOptVal(opts_all.obj.article_rate,scope.row.per ) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="开始执行时间" width="140">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.runat }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="是否启用" width="90">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ getOptVal(opts_all.obj.tasksd_use,scope.row.isactive ) }}</span>
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
        >
            <el-form
                ref="ruleFormRef"
                :model="from_examine.item"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="指定范围"
                            label-width="100px"
                            :error="from_error.msg&&from_error.msg.from?from_error.msg.from[0]:''"
                        >
                            <Cascaders v-model="from_examine.item.from" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="接收单位"
                            label-width="100px"
                            :error="from_error.msg&&from_error.msg.tolv?from_error.msg.tolv[0]:''"
                        >
                            <el-select v-model="from_examine.item.tolv" class="head-btn" placeholder="" clearable>
                                <!-- <el-option v-if="from_examine.item.from" v-show="from_examine.item.from.length<=6" label="街道" :value="4" />
                                <el-option v-if="from_examine.item.from" v-show="from_examine.item.from.length<=9" label="社区" :value="5" />
                                <el-option v-if="from_examine.item.from" v-show="from_examine.item.from.length<=12" label="小区" :value="6" /> -->
                                <el-option v-for="item in opts_all.obj.article_lv" :key="item.key" :label="item.val" :value="item.key" />
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
                            <CascaderType v-model="from_examine.item.cid" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="开始执行时间"
                            label-width="100px"
                            :error="from_error.msg&&from_error.msg.runat?from_error.msg.runat[0]:''"
                        >
                            <el-date-picker
                                v-model="from_examine.item.runat"
                                type="date"
                                value-format="YYYY-MM-DD"
                                placeholder="开始执行时间"
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
                            <el-select v-model="from_examine.item.isactive" class="head-btn" placeholder="是否启用" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.tasksd_use" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
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
                    <div class="left">指定范围</div>
                    <div class="right">{{ data_details.item.from }}</div>
                </div>
                <div class="item">
                    <div class="left">接收单位</div>
                    <div class="right">{{ getOptVal(opts_all.obj.article_lv,data_details.item.tolv) }}</div>
                </div>
                <div class="item">
                    <div class="left">计划发布周期</div>
                    <div class="right">{{ getOptVal(opts_all.obj.article_rate,data_details.item.per ) }}</div>
                </div>
                <div class="item">
                    <div class="left">计划发布分类ID</div>
                    <div class="right">{{ data_details.item.cid }}</div>
                </div>
                <div class="item">
                    <div class="left">开始执行时间</div>
                    <div class="right">{{ data_details.item.runat }}</div>
                </div>
                <div class="item">
                    <div class="left">是否启用</div>
                    <div class="right">{{ getOptVal(opts_all.obj.tasksd_use,data_details.item.isactive ) }}</div>
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
    item: {}
})
const str_title = ref('添加计划')
const from_error = reactive({
    msg: {}
})
import {
    APIgetChinaRegion
} from '@/api/custom/custom.js'
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
                    ElMessage.success(res.msg)
                    switch_examine.value = false
                }).catch(err => {
                    from_error.msg = err.data
                })
            } else {
                APIpostTasksd(from_examine.item).then(res => {
                    refreshFunc()
                    ElMessage.success(res.msg)
                    switch_examine.value = false
                }).catch(err => {
                    from_error.msg = err.data
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
// 删除
const deleteFunc = val => {
    APIdeleteTasksd(val.id).then(res => {
        refreshFunc()
        ElMessage.success(res.msg)
    })
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
        should_bind_house: ''
    }
    switch_examine.value = true
}
// 修改
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改计划'
    APIgetTasksdDetails(val.id).then(res => {
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
const opts_all = reactive({
    obj: {}
})
getOpts(['article_lv', 'tasksd_use', 'article_rate']).then(res => {
    opts_all.obj = res
})

</script>
<style lang="scss">
    .articletpletasksd {
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
</style>
<style lang="scss" scoped>
    .search-tips {
        color: #aaa;
        font-size: 14px;
        margin-bottom: 20px;
    }

</style>
