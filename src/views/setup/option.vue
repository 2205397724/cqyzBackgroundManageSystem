<template>
    <div class="setupoption">
        <page-main>
            <div class="m-b-20">
                <el-button
                    size="large"
                    type="primary"
                    :icon="Plus"
                    @click="addResidentialFunc"
                >
                    添加配置
                </el-button>
            </div>
            <div class="search">
                <el-row>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="8" class="search_th">
                                选项配置标签：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="16">
                                <el-input v-model="data_search.label" class="search_tb" placeholder="配置标签" clearable />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="8" class="search_th">
                                是否系统级别：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="16">
                                <el-select v-model="data_search.is_sys" class="search_tb" placeholder="是否系统级别" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.app_show" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="8" class="search_th">
                                启用状态：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="16">
                                <el-select v-model="data_search.is_active" class="search_tb" placeholder="启用状态" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.sys_is_active" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="0" :sm="4" :md="3" :lg="2" />
                    <el-col :xs="24" :sm="20" :md="21" :lg="22">
                        <el-button type="primary" :icon="Search" @click="searchFunc">
                            筛选
                        </el-button>
                        <el-button
                            v-if="switch_search == true"
                            class="m-l-20 m-r-10"
                            :icon="Loading"
                            @click="refreshFunc()"
                        >
                            重置
                        </el-button>
                        <span v-show="switch_search == true" class="size-base">
                            *搜索到相关结果共{{ total }}条。
                        </span>
                    </el-col>
                </el-row>
            </div>
            <div class="hidden">
                <el-table
                    v-loading="loading_tab"
                    :data="data_tab.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    class="tab_1"
                >
                    <el-table-column prop="name" label="配置名称" />
                    <el-table-column prop="label" label="配置标签" />
                    <el-table-column prop="is_sys" label="是否系统级别">
                        <template #default="scope">
                            <span>{{ getOptVal(opts_all.obj.app_show,scope.row.is_sys) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_active" label="启用状态">
                        <template #default="scope">
                            <span>
                                <el-tag v-if="scope.row.is_active == 1" type="success" size="small" round>开启</el-tag>
                                <el-tag v-if="scope.row.is_active == 0" type="danger" size="small" round>关闭</el-tag>
                            </span>
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
                                @click="optValFunc(scope.row)"
                            >
                                配置
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
                    :page-size="per_page"
                    style="float: right;"
                    background
                    layout="prev,next,jumper"
                    :total="Infinity"
                    prev-text="上一页"
                    next-text="下一页"
                    hide-on-single-page
                />
            </div>
            <div style="padding-top: 20px;">
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
                    :rules="rule_examine"
                >
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="配置名称" prop="name" label-width="100px"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="配置标签" prop="label" label-width="100px"
                                :error="from_error.msg&&from_error.msg.label?from_error.msg.label[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.label"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="是否系统级别" prop="is_sys" label-width="100px"
                                :error="from_error.msg&&from_error.msg.is_sys?from_error.msg.is_sys[0]:''"
                            >
                                <el-select v-model="from_examine.item.is_sys" class="head-btn" placeholder="是否系统级别" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.app_show" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="启用状态" prop="is_active" label-width="100px"
                                :error="from_error.msg&&from_error.msg.is_active?from_error.msg.is_active[0]:''"
                            >
                                <el-select v-model="from_examine.item.is_active" class="head-btn" placeholder="启用状态" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.sys_is_active" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label="备注" prop="desc" label-width="100px"
                                :error="from_error.msg&&from_error.msg.desc?from_error.msg.desc[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.desc"
                                    :autosize="{ minRows: 2, maxRows: 6 }"
                                    type="textarea"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_examine=false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc(ruleFormRef)">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 配置 -->
        <!-- 修改添加 -->
        <el-dialog
            v-model="switch_opt_val"
            :title="`“${item_opt.obj.name}”配置项`"
            width="70%"
        >
            <div class="m-b-20">
                <el-button
                    size="large"
                    type="primary"
                    :icon="Plus"
                    @click="optValAddFunc"
                >
                    添加配置项
                </el-button>
            </div>
            <div class="search">
                <el-row>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="7" class="search_th">
                                选项键值：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="17">
                                <el-input v-model="opt_search.key" class="search_tb" placeholder="选项键值" clearable />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="7" class="search_th">
                                选项名称：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="17">
                                <el-input v-model="opt_search.val" class="search_tb" placeholder="选项名称" clearable />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="7" class="search_th">
                                启用状态：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="17">
                                <el-select v-model="opt_search.is_active" class="search_tb" placeholder="启用状态" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.sys_is_active" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="0" :sm="4" :md="3" :lg="2" />
                    <el-col :xs="24" :sm="20" :md="21" :lg="22">
                        <el-button type="primary" :icon="Search" @click="optValSearchFunc">
                            筛选
                        </el-button>
                        <el-button
                            v-if="switch_opt_val_search == true"
                            class="m-l-20 m-r-10"
                            :icon="Loading"
                            @click="optValRefreshFunc()"
                        >
                            重置
                        </el-button>
                        <span v-show="switch_opt_val_search == true" class="size-base">
                            *搜索到相关结果共{{ opt_total }}条。
                        </span>
                    </el-col>
                </el-row>
            </div>
            <el-table
                v-loading="opt_loading"
                :data="opt_tab.arr"
                :default-sort="{ prop: 'key', order: 'ascending' }"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;margin-bottom: 10px;border: 1px solid #ebeef5;border-radius: 6px;"
                max-height="400"
            >
                <el-table-column prop="val" label="选项名称" />
                <el-table-column prop="key" label="选项键值" sortable />
                <el-table-column prop="is_sys" label="是否系统级别">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.app_show,scope.row.is_sys) }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="is_active" label="启用状态" width="100">
                    <template #default="scope">
                        <span>
                            <el-tag v-if="scope.row.is_active == 1" type="success" size="small" round>开启</el-tag>
                            <el-tag v-if="scope.row.is_active == 0" type="danger" size="small" round>关闭</el-tag>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="160">
                    <template #default="scope">
                        <el-button
                            type="primary" size="small"
                            @click="optValModifyFunc(scope.row)"
                        >
                            修改
                        </el-button>
                        <el-popconfirm
                            title="确定要删除当前项么?" cancel-button-type="info"
                            @confirm="optValDeleteFunc(scope.row)"
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
                v-model:current-page="opt_page"
                layout="total,prev,pager,next,jumper,"
                :total="opt_total"
                :page-size="opt_per_page"
                background
                hide-on-single-page
            />
        </el-dialog>
        <!-- 配置项修改添加 -->
        <el-dialog
            v-model="switch_opt_val_add"
            :title="str_opt_val_title"
            width="50%"
        >
            <div>
                <el-form
                    ref="ruleFormRef"
                    :model="from_opt_val.obj"
                >
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="选项键值" prop="key"
                                label-width="110px"
                                :error="err_opt.msg&&err_opt.msg.key?err_opt.msg.key[0]:''"
                            >
                                <el-input
                                    v-model="from_opt_val.obj.key"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="选项名称" prop="val"
                                label-width="110px"
                                :error="err_opt.msg&&err_opt.msg.val?err_opt.msg.val[0]:''"
                            >
                                <el-input
                                    v-model="from_opt_val.obj.val"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="是否系统级别" prop="is_sys"
                                label-width="110px"
                                :error="err_opt.msg&&err_opt.msg.is_sys?err_opt.msg.is_sys[0]:''"
                            >
                                <el-select v-model="from_opt_val.obj.is_sys" class="head-btn" placeholder="是否系统级别" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.app_show" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="启用状态" prop="is_active"
                                label-width="110px"
                                :error="err_opt.msg&&err_opt.msg.is_active?err_opt.msg.is_active[0]:''"
                            >
                                <el-select v-model="from_opt_val.obj.is_active" class="head-btn" placeholder="启用状态" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.sys_is_active" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="排序" prop="sort"
                                label-width="110px"
                                :error="err_opt.msg&&err_opt.msg.sort?err_opt.msg.sort[0]:''"
                            >
                                <el-input
                                    v-model="from_opt_val.obj.sort"
                                    placeholder="(数值越大，等级越高)"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label="备注" prop="desc" label-width="110px"
                                :error="err_opt.msg&&err_opt.msg.desc?err_opt.msg.desc[0]:''"
                            >
                                <el-input
                                    v-model="from_opt_val.obj.desc"
                                    :autosize="{ minRows: 2, maxRows: 6 }"
                                    type="textarea"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_opt_val_add=false">取消</el-button>
                    <el-button type="primary" @click="dialogOptValFunc">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import {
    APIgetOptsList,
    APIdeleteOpts,
    APIputOpts,
    APIpostOpts
} from '@/api/custom/custom.js'
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
import { Loading, Search, Plus } from '@element-plus/icons-vue'
/* ----------------------------------------------------------------------------------------------------------------------- */
// 数据
// 搜索
let switch_search = ref(false)
let data_search = reactive({
    label: '',
    is_sys: '',
    is_active: ''
})

// 列表
let ruleFormRef = ref('')
let loading_tab = ref(false)
let data_tab = reactive({
    arr: []
})

// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(1)
// 添加，修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {
        'name': '',
        'label': '',
        'is_active': 0,
        'is_sys': 0,
        'desc': ''
    }
})
let rule_examine = {
    // reply: [{
    //     required: true,
    //     message: '请输入理由！',
    //     trigger: 'blur'
    // }]
}
const str_title = ref('添加')
const from_error = reactive({
    msg: {}
})

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
    data_search.label = ''
    data_search.is_sys = ''
    data_search.is_active = []
    getTabListFunc()
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
            if (str_title.value == '修改') {
                APIputOpts(from_examine.item.id, from_examine.item).then(res => {
                    console.log(res)
                    if (!res.code) {
                        refreshFunc()
                        ElMessage.success('修改成功')
                        switch_examine.value = false
                    }
                }).catch(err => {
                    ElMessage.error('修改失败')
                })
            } else {
                APIpostOpts(from_examine.item).then(res => {
                    console.log(res)
                    // if (!res.code) {
                    refreshFunc()
                    ElMessage.success('添加成功')
                    switch_examine.value = false
                    // }
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
    for (let key in data_search) {
        if (data_search[key] || data_search[key] === 0) {
            if (data_search[key] instanceof Array && data_search[key].length <= 0) {
                continue
            }
            params[key] = data_search[key]
        }
    }
    loading_tab.value = true
    APIgetOptsList(params).then(res => {
        console.log(res)
        loading_tab.value = false
        data_tab.arr = res
        total.value = res.length
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
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteOpts(val.id).then(res => {
        // if (res.code === 0) {
        refreshFunc()
        ElMessage.error('删除成功')
        // }
    })
}
// 添加楼栋
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        'name': '',
        'label': '',
        'is_active': 0,
        'is_sys': 0,
        'desc': ''
    }
    switch_examine.value = true
}
// 修改
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    from_examine.item = {
        ...val
    }
    switch_examine.value = true
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()

/* *********************************************************************************************************************** */
/* *********************************************************************************************************************** */
import {
    APIgetOptsValList,
    APIdeleteOptsVal,
    APIputOptsVal,
    APIpostOptsVal
} from '@/api/custom/custom.js'
// 配置选项
const switch_opt_val = ref(false)
const item_opt = reactive({
    obj: {}
})
const opt_search = reactive({
    'key': '',
    'val': '',
    'is_sys': '',
    'is_active': ''
})
const opt_loading = ref(false)
const opt_tab = reactive({
    arr: []
})
const opt_page = ref(1)
const opt_total = ref(120)
const opt_per_page = ref(15)
const switch_opt_val_add = ref(false)
const str_opt_val_title = ref('添加')
const from_opt_val = reactive({
    obj: {
        'key': 0,
        'val': '',
        'desc': '',
        'is_sys': 0,
        'is_active': 0,
        'sort': 0
    }
})
const err_opt = reactive({
    msg: {}
})
const switch_opt_val_search = ref(false)
/* ----------------------------------------------------------------------------------------------------------------------- */
// 提交
const dialogOptValFunc = () => {
    from_opt_val.obj.opt_id = item_opt.obj.id
    for (let key in from_opt_val.obj) {
        if (from_opt_val.obj[key] !== null) {
            if (from_opt_val.obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (from_opt_val.obj[key] !== 0 || from_opt_val.obj[key] !== false)) {
                delete from_opt_val.obj[key]
            }
        }
    }
    if (str_opt_val_title.value == '修改') {
        APIputOptsVal(from_opt_val.obj.id, from_opt_val.obj).then(res => {
            console.log(res)
            // if (!res.code) {
            optValRefreshFunc()
            ElMessage.success('修改成功')
            switch_opt_val_add.value = false
            // }
        }).catch(err => {
            ElMessage.error('修改失败')
        })
    } else {
        APIpostOptsVal(from_opt_val.obj).then(res => {
            // if (!res.code) {
            optValRefreshFunc()
            ElMessage.success('添加成功')
            switch_opt_val_add.value = false
            // }
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    }
}
// 监听分页
watch(opt_page, () => {
    getOptValListFunc()
})
// 添加
const optValAddFunc = () => {
    err_opt.msg = {}
    str_opt_val_title.value = '添加'
    from_opt_val.obj = {}
    switch_opt_val_add.value = true
}
// 修改
const optValModifyFunc = val => {
    err_opt.msg = {}
    str_opt_val_title.value = '修改'
    from_opt_val.obj = {
        ...val
    }
    switch_opt_val_add.value = true
}
// 删除
const optValDeleteFunc = val => {
    APIdeleteOptsVal(val.id).then(res => {
        optValRefreshFunc()
    })
}
// 搜索
const optValSearchFunc = () => {
    opt_page.value = 1
    switch_opt_val_search.value = true
    getOptValListFunc()
}
// 重置
const optValRefreshFunc = () => {
    opt_page.value = 1
    switch_opt_val_search.value = false
    opt_search.key = ''
    opt_search.val = ''
    opt_search.is_sys = ''
    opt_search.is_active = ''
    getOptValListFunc()
}
// 获取列表
const getOptValListFunc = () => {
    let params = {
        opt_id: item_opt.obj.id,
        page: opt_page.value,
        per_page: opt_per_page.value
    }
    for (let key in opt_search) {
        if (opt_search[key] || opt_search[key] === 0) {
            if (opt_search[key] instanceof Array && opt_search[key].length <= 0) {
                continue
            }
            params[key] = opt_search[key]
        }
    }
    opt_loading.value = true
    APIgetOptsValList(params).then(res => {
        console.log(res)
        opt_loading.value = false
        opt_tab.arr = res
        opt_total.value = res.length
    })
}
// 打开配置选项
const optValFunc = val => {
    item_opt.obj = val
    switch_opt_val.value = true
    optValRefreshFunc()
}

/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['sys_is_sys', 'sys_is_active', 'app_show']).then(res => {
    opts_all.obj = res
})

</script>
<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
.setupoption {
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
        .el-form-item {
            margin: 0;
        }
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
