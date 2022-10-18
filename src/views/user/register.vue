<template>
    <div class="userregister">
        <page-main>
            <div class="m-b-20">
                <el-button type="primary" size="large" :icon="Plus" @click="addResidentialFunc">添加用户</el-button>
                <el-select v-model="main_type" class="m-l-10" placeholder="用户端类型" style="width: 200px;">
                    <el-option
                        v-for="(item,i) in opts_all.obj.terminal" :key="item.key" :label="item.val"
                        :value="item.key"
                    />
                </el-select>
            </div>
            <div class="search">
                <el-row>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                用户名：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-input v-model="data_search.obj.username" class="search_tb" placeholder="用户名" clearable />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                手机号：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-input v-model="data_search.obj.mobile" class="search_tb" placeholder="手机号" clearable />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                身份证号：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-input v-model="data_search.obj.id_card" class="search_tb" placeholder="身份证号" clearable />
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row v-if="btnClick == true">
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                性别：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-select v-model="data_search.obj.gender" class="search_tb" placeholder="性别" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.gender" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                认证状态：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-select v-model="data_search.obj.status_cert" class="search_tb" placeholder="认证状态" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.status_all" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                终端类型：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-select v-model="data_search.obj.auth_type" class="search_tb" placeholder="终端类型" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.terminal" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="0" :sm="4" :md="3" :lg="2" />
                    <el-col :xs="24" :sm="20" :md="21" :lg="22">
                        <el-button type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                        <el-button v-show="switch_search == true" class="m-l-20 m-r-10" :icon="Loading" @click="refreshFunc">重置</el-button>
                        <span v-show="switch_search == true" class="size-base">
                            *搜索到相关结果共{{ total }}条。
                        </span>
                    </el-col>
                </el-row>
                <el-row>
                    <div class="searchPlay" @click="btnClickFunc">
                        <!-- <el-icon :size="20"><ArrowUpBold /></el-icon> -->
                        <el-button v-if="btnClick==false" :icon="CaretBottom" class="searchDeal">展开</el-button>
                        <el-button v-if="btnClick==true" :icon="CaretTop" class="searchDeal">收起</el-button>
                    </div>
                </el-row>
            </div>
            <div style="width: 100%; overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;">
                <el-table
                    v-loading="loading_tab"
                    :data="data_tab.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    style="width: 100%;min-height: 300px;"
                >
                    <el-table-column prop="username" label="用户名">
                        <template #default="scope">
                            <span>{{ scope.row.username }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mobile" label="手机号" width="150">
                        <template #default="scope">
                            <span>{{ scope.row.mobile }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id_card" label="身份证号" width="200">
                        <template #default="scope">
                            <span>{{ scope.row.id_card }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="gender" label="性别">
                        <template #default="scope">
                            <span>{{ getOptVal([{val:'男',key:'F'},{val:'女',key:'M'},{val:'未设置',key:'U'}],scope.row.gender) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status_cert" label="认证状态">
                        <template #default="scope">
                            <el-tag v-if="scope.row.status_cert==10" type="warning" round size="small">{{ getOptVal(opts_all.obj.status_all,scope.row.status_cert) }}</el-tag>
                            <el-tag v-if="scope.row.status_cert==15" type="primary" round size="small">{{ getOptVal(opts_all.obj.status_all,scope.row.status_cert) }}</el-tag>
                            <el-tag v-if="scope.row.status_cert==20" type="success" round size="small">{{ getOptVal(opts_all.obj.status_all,scope.row.status_cert) }}</el-tag>
                            <el-tag v-if="scope.row.status_cert==30" type="danger" round size="small">{{ getOptVal(opts_all.obj.status_all,scope.row.status_cert) }}</el-tag>
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
                    layout="prev,next,jumper"
                    :page-size="per_page"
                    :total="150"
                    background
                    prev-text="上一页"
                    next-text="下一页"
                    hide-on-single-page
                    @next-click="next_click_page"
                    @prev-click="prev_click_page"
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
                            <el-form-item
                                label="终端类型" prop="auth_type"
                                label-width="70px"
                                :error="from_error.msg&&from_error.msg.auth_type?from_error.msg.auth_type[0]:''"
                            >
                                <el-select v-model="from_examine.item.authType" class="head-btn" placeholder="终端类型" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.terminal" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="手机号" prop="mobile"
                                label-width="70px"
                                :error="from_error.msg&&from_error.msg.mobile?from_error.msg.mobile[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.mobile"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="用户名" prop="username"
                                label-width="70px"
                                :error="from_error.msg&&from_error.msg.username?from_error.msg.username[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.username"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="真实姓名" prop="username"
                                label-width="70px"
                                :error="from_error.msg&&from_error.msg.username?from_error.msg.username[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="性别" prop="gender"
                                label-width="70px"
                                :error="from_error.msg&&from_error.msg.username?from_error.msg.username[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.gender"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="身份证号" prop="id_card"
                                label-width="70px"
                                :error="from_error.msg&&from_error.msg.username?from_error.msg.username[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.id_card"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="密码" prop="password"
                                label-width="70px"
                                :error="from_error.msg&&from_error.msg.password?from_error.msg.password[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.password"
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
        <!-- 详情 -->
        <el-dialog
            v-model="switch_details"
            title="详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">用户名</div>
                    <div class="right">{{ data_details.item.username }}</div>
                </div>
                <div v-if="data_details.item.name" class="item">
                    <div class="left">真实姓名</div>
                    <div class="right">{{ data_details.item.name }}</div>
                </div>
                <div class="item">
                    <div class="left">手机号</div>
                    <div class="right">{{ data_details.item.mobile }}</div>
                </div>
                <div v-if="data_details.item.id_card" class="item">
                    <div class="left">身份证号</div>
                    <div class="right">{{ data_details.item.id_card }}</div>
                </div>
                <div class="item">
                    <div class="left">性别</div>
                    <div class="right">{{ getOptVal([{val:'男',key:'F'},{val:'女',key:'M'},{val:'未设置',key:'U'}],data_details.item.gender) }}</div>
                </div>
                <div class="item">
                    <div class="left">认证状态</div>
                    <div class="right">
                        <el-tag v-if="data_details.item.status_cert==10" type="warning" round size="small">{{ getOptVal(opts_all.obj.status_all,data_details.item.status_cert) }}</el-tag>
                        <el-tag v-if="data_details.item.status_cert==15" type="primary" round size="small">{{ getOptVal(opts_all.obj.status_all,data_details.item.status_cert) }}</el-tag>
                        <el-tag v-if="data_details.item.status_cert==20" type="success" round size="small">{{ getOptVal(opts_all.obj.status_all,data_details.item.status_cert) }}</el-tag>
                        <el-tag v-if="data_details.item.status_cert==30" type="danger" round size="small">{{ getOptVal(opts_all.obj.status_all,data_details.item.status_cert) }}</el-tag>
                    </div>
                </div>
                <div class="item">
                    <div class="left">用户ID</div>
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
import { Delete, Edit, Search, Share, Upload, Plus } from '@element-plus/icons-vue'
import {
    APIgetUserList,
    APIgetUserDetails,
    APIdeleteUser,
    APIputUser,
    APIpostUser
} from '@/api/custom/custom.js'
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
import { Loading, CaretTop, CaretBottom } from '@element-plus/icons-vue'
/* ----------------------------------------------------------------------------------------------------------------------- */
// 数据
// 方法
const main_type = ref('gov')
let btnClick = ref(false)
const isSearch3 = ref(false)
const isSearch2 = ref(true)
const btnClickFunc = () => {
    btnClick.value = !btnClick.value
    isSearch3.value = !isSearch3.value
    isSearch2.value = !isSearch2.value
}
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
/* const next_click_page=()=>{
    page.value=page.value+1
}
const prev_click_page=()=>{
    if(page>1){
        page.value=page.value-1
    }
} */
// 添加，修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {}
})
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
const searchMore = () => {
    searchVisible.value = !searchVisible.value
}
// 刷新
const refreshFunc = () => {
    switch_search.value = false
    data_search.obj = {}
    getTabListFunc()
}

// 详情
const detailsFunc = val => {
    data_dialog.obj = val
    APIgetUserDetails(val.id).then(res => {
        if (!res.code) {
            data_details.item = res.data
            switch_details.value = true
        }
    })
}
// 监听分页
watch(page, () => {
    getTabListFunc()
})
watch(main_type, () => {
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
                APIputUser(from_examine.item.id, from_examine.item).then(res => {
                    if (res.status === 200) {
                        refreshFunc()
                        ElMessage.success('修改成功')
                        switch_examine.value = false
                    }
                }).catch(err => {
                    from_error.msg = err.data
                })
            } else {
                console.log(from_examine.item)
                APIpostUser(from_examine.item.authType, from_examine.item).then(res => {
                    if (res.status === 200) {
                        refreshFunc()
                        ElMessage.success('添加成功')
                        switch_examine.value = false
                    }
                }).catch(err => {
                    from_error.msg = err.data
                })
            }
        } else {
            return false
        }
    })
}
const flag = ref(false)
// 获取列表api请求
const getTabListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value,
        auth_type: main_type.value
    }
    for (let key in data_search.obj) {
        if (data_search.obj[key] || data_search.obj[key] === 0) {
            if (data_search.obj[key] instanceof Array && data_search.obj[key].length <= 0) {
                continue
            }
            params[key] = data_search.obj[key]
        }
    }
    if (params.time_deal) {
        let updated_str = ''
        for (let i in params.time_deal) {
            updated_str += ',' + params.time_deal[i]
        }
        params.time_deal = updated_str.substring(1)
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
    APIgetUserList(params).then(res => {
        console.log(res)
        loading_tab.value = false
        data_tab.arr = res.data
        total.value = res.data.length
        let btnNext = document.querySelector('.btn-next')
        if (res.data.length < per_page.value) {
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
// 删除
const deleteFunc = val => {
    APIdeleteUser(main_type.value, val.id).then(res => {
        if (res.status === 200) {
            refreshFunc()
            ElMessage.success('删除成功')
        }
    })
}
// 添加用户
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
    APIgetUserDetails(val.id).then(res => {
        from_examine.item = res.data
        switch_examine.value = true
    })
}
// 删除 服务名称和联系方式
const deleteServiceFunc = index => {
    from_examine.item.property_owners.splice(index, 1)
}
// 添加 服务名称和联系方式
const addServiceFunc = index => {
    let data = {}
    from_examine.item.property_owners.push(data)
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
getOpts(['status_all', 'other_auth', 'gender', 'terminal', 'login_type']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss">
    .userregister {
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
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
.search-tips {
    color: #aaa;
    font-size: 14px;
    margin-bottom: 20px;
}
</style>
