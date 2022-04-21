<template>
    <div class="usergroup">
        <page-main>
            <el-row :gutter="20" class="bottom-btn-box-2">
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                    <el-button class="head-btn" type="primary" @click="addResidentialFunc">添加用户组</el-button>
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-cascader
                        v-model="region_code" class="head-btn"
                        placeholder="区域"
                        :props="cascader_props"
                        collapse-tags
                        collapse-tags-tooltip
                        :show-all-levels="false"
                    />
                </el-col>
            </el-row>
            <div style="width: 100%; overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;">
                <el-table
                    v-loading="loading_tab"
                    :data="data_tab.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    default-expand-all
                    row-key="id"
                    :tree-props="{ children: 'children' }"
                    style="width: 100%;min-height: 300px;"
                >
                    <el-table-column prop="name" label="名称" width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="ID" width="250">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.id }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="上级ID" width="250">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.pid }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="等级" width="90">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.level }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="created_at" label="创建时间" width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.created_at }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="updated_at" label="更新时间" width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.updated_at }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column />
                    <el-table-column fixed="right" label="操作" width="270">
                        <template #default="scope">
                            <el-button
                                type="primary" size="small"
                                @click="modifyResidentialFunc(scope.row)"
                            >
                                修改
                            </el-button>
                            <el-button
                                size="small"
                                @click="addResidentialFunc(scope.row)"
                            >
                                添加
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

                            <el-button
                                type="info" size="small"
                                @click="optValFunc(scope.row)"
                            >
                                成员
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="名称" prop="name"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col v-if="show_pid" :md="24" :lg="12">
                            <el-form-item
                                label="上级" prop="pid"
                                :error="from_error.msg&&from_error.msg.pid?from_error.msg.pid[0]:''"
                            >
                                <div style="height: 100%;width: 100%;box-sizing: border-box;padding-bottom: 10px;">
                                    <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;font-size: 14px;">
                                        <SearchUserGroup v-model:str="from_examine.item.pid" />
                                    </div>
                                </div>
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
        <!-- 成员 -->
        <!-- 列表 -->
        <el-dialog
            v-model="switch_opt_val"
            :title="`“${item_opt.obj.name}”所有成员`"
            width="70%"
        >
            <el-row :gutter="20" class="bottom-btn-box-2">
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                    <el-button class="head-btn" type="primary" @click="optValAddFunc">添加成员</el-button>
                </el-col>
            </el-row>
            <el-table
                v-loading="opt_loading"
                :data="opt_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;margin-bottom: 10px;border: 1px solid #ebeef5;border-radius: 6px;"
                max-height="400"
            >
                <el-table-column prop="username" label="用户名" width="120">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.username }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="gender" label="性别" width="90">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ getOptVal([{val:'男',key:'F'},{val:'女',key:'M'},{val:'未设置',key:'U'}],scope.row.gender) }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="pivot.lv" label="等级" width="90">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.pivot.lv }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="电话" width="140">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.mobile }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="id_card" label="身份证号" width="210">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.id_card }} 500101111111111111</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status_cert" label="认证状态" width="120">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ getOptVal(opts_all.obj.status_all,scope.row.status_cert) }} </span>
                    </template>
                </el-table-column>

                <el-table-column />
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
        <!-- 修改添加 -->
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
                        <el-col v-if="!hide_uid" :md="24" :lg="12">
                            <el-form-item
                                label="用户" prop="uid"
                                :error="err_opt.msg&&err_opt.msg.uid?err_opt.msg.uid[0]:''"
                            >
                                <div style="height: 100%;width: 100%;box-sizing: border-box;padding-bottom: 10px;">
                                    <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;font-size: 14px;">
                                        <SearchUser v-model:str="from_opt_val.obj.uid" />
                                    </div>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="等级" prop="lv"
                                :error="err_opt.msg&&err_opt.msg.lv?err_opt.msg.lv[0]:''"
                            >
                                <el-input
                                    v-model="from_opt_val.obj.lv"
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
import SearchUserGroup from '@/components/SearchUserGroup/index.vue'
import SearchUser from '@/components/SearchUser/index.vue'
import {
    APIgetGroupList,
    APIdeleteGroup,
    APIputGroup,
    APIpostGroup
    // APIgetGroupDetails,

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
const show_pid = ref(false)
// 分类种类
const region_code = ref(500101)
// 列表
let loading_tab = ref(false)
let data_tab = reactive({
    arr: []
})
// 添加，修改
let switch_examine = ref(false)
let from_examine = reactive({})
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
/* ----------------------------------------------------------------------------------------------------------------------- */
// 方法
// 监听类别
watch(region_code, () => {
    refreshFunc()
})
// 刷新
const refreshFunc = () => {
    getTabListFunc()
}
// 同意拒绝提交
const dialogExamineCloseFunc = () => {
    from_error.msg = {}
    if (str_title.value == '修改') {
        APIputGroup(region_code.value, from_examine.item.id, from_examine.item).then(res => {
            if (!res.code) {
                refreshFunc()
                ElMessage.success(res.msg)
                switch_examine.value = false
            }
        }).catch(err => {
            from_error.msg = err.data
        })
    } else {
        APIpostGroup(region_code.value, from_examine.item).then(res => {
            if (!res.code) {
                refreshFunc()
                ElMessage.success(res.msg)
                switch_examine.value = false
            }
        }).catch(err => {
            from_error.msg = err.data
        })
    }
}
// 获取列表api请求
const getTabListFunc = () => {
    loading_tab.value = true
    APIgetGroupList(region_code.value).then(res => {
        console.log(res)
        if (res.code === 0) {
            loading_tab.value = false
            data_tab.arr = res.data
        }
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteGroup(region_code.value, val.id).then(res => {
        if (res.code === 0) {
            refreshFunc()
            ElMessage.success(res.msg)
        }
    })
}
// 添加
const addResidentialFunc = val => {
    from_examine.item = {}
    if (val.id) {
        from_examine.item.pid = val.id
        show_pid.value = true
    } else {
        show_pid.value = false
    }
    from_error.msg = {}
    str_title.value = '添加'
    switch_examine.value = true
}
// 修改
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    from_examine.item = {
        ...val
    }
    if (from_examine.item.pid) {
        show_pid.value = true
    } else {
        show_pid.value = false
        delete from_examine.item.pid
    }
    switch_examine.value = true
}

/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()

/* *********************************************************************************************************************** */
/* *********************************************************************************************************************** */
// 成员操作
import {
    APIgetGroupUserList,
    APIdeleteGroupUser,
    APIputGroupUser,
    APIpostGroupUser
    // APIgetGroupUserDetails
} from '@/api/custom/custom.js'
// 配置选项
const switch_opt_val = ref(false)
const item_opt = reactive({
    obj: {}
})
const opt_loading = ref(false)
const opt_tab = reactive({
    arr: []
})
const switch_opt_val_add = ref(false)
const str_opt_val_title = ref('添加')
const from_opt_val = reactive({
    obj: {}
})
const err_opt = reactive({
    msg: {}
})
const hide_uid = ref(false)
/* ----------------------------------------------------------------------------------------------------------------------- */
// 提交
const dialogOptValFunc = () => {
    if (str_opt_val_title.value == '修改') {
        console.log(item_opt)
        APIputGroupUser(from_opt_val.obj.pivot.gid, from_opt_val.obj.pivot.uid, { lv: from_opt_val.obj.lv }).then(res => {
            if (!res.code) {
                optValRefreshFunc()
                ElMessage.success(res.msg)
                switch_opt_val_add.value = false
            }
        }).catch(err => {
            err_opt.msg = err.data
        })
    } else {
        APIpostGroupUser(item_opt.obj.id, from_opt_val.obj).then(res => {
            if (!res.code) {
                optValRefreshFunc()
                ElMessage.success(res.msg)
                switch_opt_val_add.value = false
            }
        }).catch(err => {
            err_opt.msg = err.data
        })
    }
}
// 添加
const optValAddFunc = () => {
    err_opt.msg = {}
    hide_uid.value = false
    str_opt_val_title.value = '添加'
    from_opt_val.obj = { }
    switch_opt_val_add.value = true
}
// 修改
const optValModifyFunc = val => {
    err_opt.msg = {}
    str_opt_val_title.value = '修改'
    hide_uid.value = true
    from_opt_val.obj = {
        ...val
    }
    from_opt_val.obj.lv = from_opt_val.obj.pivot.lv
    switch_opt_val_add.value = true
}
// 删除
const optValDeleteFunc = val => {
    APIdeleteGroupUser(val.pivot.gid, val.pivot.uid).then(res => {
        if (res.code === 0) {
            optValRefreshFunc()
            ElMessage.success(res.msg)
        }
    })
}
// 重置
const optValRefreshFunc = () => {
    getOptValListFunc()
}
// 获取列表
const getOptValListFunc = () => {
    console.log(item_opt.obj)
    opt_loading.value = true
    APIgetGroupUserList(item_opt.obj.id).then(res => {
        if (res.code === 0) {
            opt_loading.value = false
            opt_tab.arr = res.data
        }
    }).catch(err => {
        opt_loading.value = false
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
getOpts(['status_all']).then(res => {
    opts_all.obj = res
})

</script>
<style lang="scss">
    .usergroup {
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
    .usergroup {

    }
    .search-tips {
        color: #aaa;
        font-size: 14px;
        margin-bottom: 20px;
    }
    .details-box {
        .item {
            display: flex;
            color: #333;
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
                content: "：";
            }
            .right {
                width: 100%;
                color: #666;
            }
        }
        .item:last-child {
            border-style: none;
        }
    }
</style>
