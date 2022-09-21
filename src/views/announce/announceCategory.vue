<template>
    <div class="articletpletasksd">
        <page-main>
            <div class="m-b-20">
                <el-button
                    type="primary" :icon="Plus" size="large"
                    @click="addResidentialFunc"
                >
                    添加分类
                </el-button>
            </div>
            <el-table
                v-loading="loading_tab"
                :data="data_tab.arr"
                :default-sort="{ prop: 'sort', order: 'ascending' }"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                row-key="id"
                :tree-props="{ children: 'children' }"
                class="tab_1"
            >
                <el-table-column prop="name" label="分类名称">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="level" label="级别">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.level }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" width="250">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.id }} </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="pid" label="上级ID" width="250">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.pid }} </span>
                    </template>
                </el-table-column> -->
                <el-table-column prop="sort" label="排序" sortable>
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.sort }} </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="created_at" label="创建时间" width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.created_at }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="updated_at" label="更新时间" width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.updated_at }} </span>
                        </template>
                    </el-table-column> -->
                <el-table-column fixed="right" label="操作" width="240">
                    <template #default="scope">
                        <el-button
                            type="success" size="small"
                            @click="addResidentialFunc(scope.row)"
                        >
                            添加子分类
                        </el-button>
                        <el-button
                            type="primary" size="small"
                            @click="modifyResidentialFunc(scope.row)"
                        >
                            修改
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
                        <el-col v-if="!show_pid" :md="24" :lg="12">
                            <el-form-item
                                label="分类名称" prop="name" label-width="100px"
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
                                label="子分类名称" prop="name" label-width="100px"
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
                                label="上级ID" prop="pid" label-width="100px"
                                :error="from_error.msg&&from_error.msg.pid?from_error.msg.pid[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.pid"
                                    placeholder=""
                                    disabled
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="排序" prop="sort" label-width="100px"
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
import { Search, Plus } from '@element-plus/icons-vue'
/* ----------------------------------------------------------------------------------------------------------------------- */
// 数据
const show_pid = ref(false)
let data_search = reactive({})
// 分类种类
const main_type = ref('announce')
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
    data_search.name = ''
    data_search.sort = 0
}
console.log(main_type)
// 同意拒绝提交
const dialogExamineCloseFunc = () => {
    from_error.msg = {}
    for (let key in from_examine.item) {
        if (from_examine.item[key] == '') {
            delete from_examine.item[key]
        }
    }
    if (str_title.value == '修改') {
        APIputType(main_type.value, from_examine.item.id, from_examine.item).then(res => {
            // if (!res.code) {
            refreshFunc()
            ElMessage.success('修改成功')
            switch_examine.value = false
            // }
        }).catch(err => {
            ElMessage.success('修改成功')
        })
    } else {
        APIpostType(main_type.value, from_examine.item).then(res => {
            // if (!res.code) {
            refreshFunc()
            ElMessage.success('添加成功')
            switch_examine.value = false
            // }-
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    }
}
// 获取列表api请求
const getTabListFunc = () => {
    loading_tab.value = true
    APIgetTypeList(main_type.value).then(res => {
        console.log(res)
        loading_tab.value = false
        data_tab.arr = res
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteType(main_type.value, val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
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
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['kind']).then(res => {
    console.log(res)
    opts_all.obj = res
})

</script>
