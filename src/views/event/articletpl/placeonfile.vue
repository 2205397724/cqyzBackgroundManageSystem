<template>
    <div class="articletplplaceonfile">
        <page-main>
            <div>
                <div>
                    <el-row :gutter="10">
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-input v-model="data_search.mobile" class="head-btn" placeholder="手机号" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-input v-model="data_search.username" class="head-btn" placeholder="用户名" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-input v-model="data_search.id_card" class="head-btn" placeholder="身份证号" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-input v-model="data_search.name" class="head-btn" placeholder="真实姓名" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-select v-model="data_search.gender" class="head-btn" placeholder="性别" clearable>
                                <el-option label="男" value="F" />
                                <el-option label="女" value="M" />
                                <el-option label="未设置" value="U" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-select v-model="data_search.status_cert" class="head-btn" placeholder="认证状态" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.status_cert" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-select v-model="data_search.house_id" class="head-btn" placeholder="终端类型" clearable>
                                <el-option label="总平台" value="pt" />
                                <el-option label="区域平台" value="ptr" />
                                <el-option label="企业端" value="pm" />
                                <el-option label="行政管理端" value="gov" />
                                <el-option label="业主端" value="mbr" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-select v-model="data_search.oauth_type" class="head-btn" placeholder="第三方登录类型" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.other_auth" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-cascader
                                v-model="data_search.region" class="head-btn"
                                placeholder="区域"
                                :props="cascader_props"
                                collapse-tags
                                collapse-tags-tooltip
                                clearable
                                :show-all-levels="false"
                            />
                        </el-col>
                        <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="el-cascader-box-my">
                            <div class="head-btn">
                                <el-date-picker
                                    v-model="data_search.updated_at"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="更新时间"
                                    end-placeholder="更新时间"
                                    style="width: 100%;"
                                    value-format="YYYY-MM-DD"
                                />
                            </div>
                        </el-col> -->
                        <el-col :xs="12" :sm="8" :md="6" :lg="2" :xl="3">
                            <el-button class="head-btn" type="primary" @click="searchFunc">搜索</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div v-show="switch_search" class="search-tips">
                    <el-button style="margin-right: 10px;" @click="refreshFunc">重置</el-button>
                    *搜索到相关结果共{{ total }}条。
                </div>
                <div>
                    <el-row :gutter="20" class="bottom-btn-box-2">
                        <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                            <el-button class="head-btn" type="primary" @click="addResidentialFunc">添加用户</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div style="width: 100%; overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;">
                    <el-table
                        v-loading="loading_tab"
                        :data="data_tab.arr"
                        :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                        style="width: 100%;min-height: 300px;"
                    >
                        <el-table-column prop="username" label="用户名" width="180">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.username }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="mobile" label="手机号" width="180">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.mobile }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="id_card" label="身份证号" width="220">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.id_card }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="gender" label="性别" width="90">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ getOptValFunc([{val:'男',key:'F'},{val:'女',key:'M'},{val:'未设置',key:'U'}],scope.row.gender) }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status_cert" label="认证状态" width="120">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ getOptValFunc(opts_all.obj.status_cert,scope.row.status_cert) }} </span>
                            </template>
                        </el-table-column>

                        <el-table-column />
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
                                :error="from_error.msg&&from_error.msg.auth_type?from_error.msg.auth_type[0]:''"
                            >
                                <el-select v-model="from_examine.item.auth_type" class="head-btn" placeholder="终端类型" clearable>
                                    <el-option label="总平台" value="pt" />
                                    <el-option label="区域平台" value="ptr" />
                                    <el-option label="企业端" value="pm" />
                                    <el-option label="行政管理端" value="gov" />
                                    <el-option label="业主端" value="mbr" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="手机号" prop="mobile"
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
                                label="密码" prop="password"
                                :error="from_error.msg&&from_error.msg.password?from_error.msg.password[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.password"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="所属区域" prop="region"
                                :error="from_error.msg&&from_error.msg.region?from_error.msg.region[0]:''"
                            >
                                <el-cascader
                                    v-model="from_examine.item.region" class="head-btn"
                                    :props="cascader_props2"
                                    collapse-tags
                                    collapse-tags-tooltip
                                    clearable
                                    :show-all-levels="false"
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
                    <div class="left">用户ID</div>
                    <div class="right">{{ data_details.item.id }}</div>
                </div>
                <div class="item">
                    <div class="left">用户名</div>
                    <div class="right">{{ data_details.item.username }}</div>
                </div>
                <div class="item">
                    <div class="left">真实姓名</div>
                    <div class="right">{{ data_details.item.name }}</div>
                </div>
                <div class="item">
                    <div class="left">手机号</div>
                    <div class="right">{{ data_details.item.mobile }}</div>
                </div>
                <div class="item">
                    <div class="left">身份证号</div>
                    <div class="right">{{ data_details.item.id_card }}</div>
                </div>
                <div class="item">
                    <div class="left">性别</div>
                    <div class="right">{{ getOptValFunc([{val:'男',key:'F'},{val:'女',key:'M'},{val:'未设置',key:'U'}],data_details.item.gender) }}</div>
                </div>
                <div class="item">
                    <div class="left">认证状态</div>
                    <div class="right">{{ getOptValFunc(opts_all.obj.status_cert,data_details.item.status_cert) }}</div>
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
/* ----------------------------------------------------------------------------------------------------------------------- */
// 数据
// 搜索
let switch_search = ref(false)
let data_search = reactive({ })
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
const str_title = ref('添加')
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
            resolve(res.data)
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
            resolve(res.data)
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
    data_search.mobile = ''
    data_search.username = ''
    data_search.id_card = ''
    data_search.name = ''
    data_search.gender = ''
    data_search.status_cert = ''
    data_search.house_id = ''
    data_search.oauth_type = ''
    data_search.region = ''
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
// 同意拒绝提交
const dialogExamineCloseFunc = formEl => {
    from_error.msg = {}
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            if (str_title.value == '修改') {
                APIputUser(from_examine.item.id, from_examine.item).then(res => {
                    if (!res.code) {
                        refreshFunc()
                        ElMessage.success(res.msg)
                        switch_examine.value = false
                    }
                }).catch(err => {
                    from_error.msg = err.data
                })
            } else {
                APIpostUser(from_examine.item).then(res => {
                    if (!res.code) {
                        refreshFunc()
                        ElMessage.success(res.msg)
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
        if (res.code === 0) {
            loading_tab.value = false
            data_tab.arr = res.data.items
            total.value = res.data.aggregation.total_cnt
        }
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteUser(val.id).then(res => {
        if (res.code === 0) {
            refreshFunc()
            ElMessage.success(res.msg)
        }
    })
}
// 添加用户
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加'
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
    str_title.value = '修改'
    APIgetUserDetails(val.id).then(res => {
        if (!res.code) {
            from_examine.item = res.data
            switch_examine.value = true
        }
    })
}

/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import {
    APIpostGetOpts
} from '@/api/custom/custom.js'
const opts_all = reactive({
    obj: {}
})
APIpostGetOpts({ lab: ['status_cert', 'other_auth'] }).then(res => {
    opts_all.obj = res.data
})
const getOptValFunc = (arr, key) => {
    for (let i in arr) {
        if (arr[i].key == key) {
            return arr[i].val
        }
    }
    return ''
}
</script>
<style lang="scss">
	.articletplplaceonfile {
		.el-cascader-box-my {
			.el-cascader {
				width: 100% !important;
				margin-bottom: 10px;
			}
		}

		.serve-box {
			border: 1px solid #eeeeee;
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
				background-color: #ffffff;
			}
		}
	}
</style>
<style lang="scss" scoped>
	.articletplplaceonfile {
		.head-btn {
			width: 100%;
			margin-bottom: 10px;
		}
	}

	.search-tips {
		color: #aaaaaa;
		font-size: 14px;
		margin-bottom: 20px;
	}

	.details-box {
		.item {
			display: flex;
			color: #333333;
			font-size: 16px;
			margin-bottom: 20px;
			border-bottom: 1px solid #eee;
			padding-bottom: 10px;

			.left {
				box-sizing: border-box;
				width: 160px;
				white-space: nowrap;
				margin-right: 20px;
				text-align: right;
				font-weight: 600;
			}

			.left::after {
				content: '：';
			}

			.right {
				width: 100%;
				color: #666666;
			}
		}

		.item:last-child {
			border-style: none;
		}
	}
</style>
