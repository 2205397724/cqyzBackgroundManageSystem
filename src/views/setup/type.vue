<template>
    <div class="routine-residential">
        <page-main>
            <el-row :gutter="20" class="bottom-btn-box-2">
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                    <el-button class="head-btn" type="primary" @click="addResidentialFunc">添加分类</el-button>
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-select v-model="main_type" class="head-btn" placeholder="分类种类" clearable>
                        <el-option
                            v-for="(item,i) in opts_all.obj.main_type" :key="item.key" :label="item.val"
                            :value="item.key"
                        />
                    </el-select>
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
                            <span style="margin-left: 10px">{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="level" label="级别" width="140">
                        <template #default="scope">
                            <span style="margin-left: 10px">{{ scope.row.level }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="类别ID" width="250">
                        <template #default="scope">
                            <span style="margin-left: 10px">{{ scope.row.id }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="kind" label="分类种类" width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px">{{ getOptValFunc(opts_all.obj.main_type,scope.row.kind) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="pid" label="pid" width="250">
                        <template #default="scope">
                            <span style="margin-left: 10px">{{ scope.row.pid }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sort" label="排序" width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px">{{ scope.row.sort }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="created_at" label="创建时间" width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px">{{ scope.row.created_at }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="updated_at" label="更新时间" width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px">{{ scope.row.updated_at }} </span>
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
                                type="primary" size="small"
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
                                label="上级ID" prop="pid"
                                :error="from_error.msg&&from_error.msg.pid?from_error.msg.pid[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.pid"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="排序" prop="sort"
                                :error="from_error.msg&&from_error.msg.sort?from_error.msg.sort[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.sort"
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
    </div>
</template>
<script setup>
import {
    APIgetTypeList,
    APIdeleteType,
    APIputType,
    APIpostType
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
const main_type = ref(101)
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

/* ----------------------------------------------------------------------------------------------------------------------- */
// 方法
// 监听类别
watch(main_type, () => {
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
        APIputType(main_type.value, from_examine.item.id, from_examine.item).then(res => {
            if (!res.code) {
                refreshFunc()
                ElMessage.success(res.msg)
                switch_examine.value = false
            }
        }).catch(err => {
            from_error.msg = err.data
        })
    } else {
        APIpostType(main_type.value, from_examine.item).then(res => {
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
    APIgetTypeList(main_type.value).then(res => {
        console.log(res)
        if (res.code === 0) {
            loading_tab.value = false
            data_tab.arr = res.data
        }
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteType(main_type.value, val.id).then(res => {
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

/* ----------------------------------------------------------------------------------------------------------------------- */
// 分类项
import {
    APIpostGetOpts
} from '@/api/custom/custom.js'
const opts_all = reactive({
    obj: {}
})
APIpostGetOpts({
    lab: ['main_type']
}).then(res => {
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
    .routine-residential {
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

            .el-form-item {
                margin: 0;
            }

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
    .routine-residential {
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
