<template>
    <div>
        <page-main class="hidden">
            <div class="m-b-20">
                <el-button type="primary" :icon="Plus" size="large" @click="addResidentialFunc">
                    添加种类
                </el-button>
            </div>

            <el-table
                v-loading="loading_tab" :data="data.list"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}" class="tab_1"
            >
                <el-table-column prop="id" label="种类名称">
                    <template #default="scope">
                        <span>{{ scope.row.title }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="简介" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.desc }} </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="name" label="归档内容数量" width="180">
                    <span> {{ total2 }} </span>
                </el-table-column> -->

                <el-table-column prop="created_at" label="状态">
                    <template #default="scope">
                        <el-tag v-if="scope.row.active == 1" size="small" type="success">启用</el-tag>
                        <el-tag v-if="scope.row.active == 0" size="small" type="danger">禁用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间">
                    <template #default="scope">
                        <span>{{ scope.row.created_at }} </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="220">
                    <template #default="scope">
                        <el-button type="success" size="small" @click="addUserGroupFunc(scope.row.id)">
                            办理部门
                        </el-button>
                        <el-button type="primary" size="small" @click="examineListFunc(scope.row)">
                            修改
                        </el-button>

                        <el-popconfirm title="确定要删除当前项么?" cancel-button-type="info" @confirm="deleteFunc(scope.row)">
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
        <el-dialog v-model="switch_examine" :title="str_title" width="50%">
            <div>
                <el-form ref="ruleFormRef" :model="from_examine.item">
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="种类名称" label-width="90px"
                                :error="from_error.msg && from_error.msg.title ? from_error.msg.title[0] : ''"
                            >
                                <el-input v-model="from_examine.item.title" class="head-btn" />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="是否启用" label-width="90px"
                                :error="from_error.msg && from_error.msg.active ? from_error.msg.active[0] : ''"
                            >
                                <el-select v-model="from_examine.item.active" class="head-btn" placeholder="" clearable>
                                    <el-option
                                        v-for="item in opts_all.obj.flow_active" :key="item.key"
                                        :label="item.val" :value="item.key"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label="简介" prop="adesc"
                                :error="from_error.msg&&from_error.msg['desc']?from_error.msg['desc'][0]:''"
                                label-width="90px"
                            >
                                <el-input
                                    v-model="from_examine.item.desc" :autosize="{ minRows: 2, maxRows: 6 }"
                                    type="textarea" placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div class="footer">
                    <el-button @click="switch_examine = false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc(ruleFormRef)">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="data.switch" title="办理部门" width="50%" @closed="dialogClosed">
            <div>
                <el-form ref="ruleFormRef" :model="data.item">
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item
                                label="部门"
                                :error="from_error.msg && from_error.msg.title ? from_error.msg.title[0] : ''"
                            >
                                <div class="searchUserGroup">
                                    <SearchUserGroup ref="V" @checkName="checkNameFunc" />
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-button type="primary" @click="dialogExamineCloseFunc_1">添加</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <el-table
                v-loading="loading_tab" :data="data.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}" class="tab_1"
            >
                <el-table-column prop="id" label="部门名称">
                    <template #default="scope">
                        <span>{{ scope.row.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="类型" width="180">
                    <template #default="scope">
                        <span v-if="scope.row.type == 3">住建</span>
                        <span v-if="scope.row.type == 4">街道</span>
                        <span v-if="scope.row.type == 5">社区</span>
                        <span v-if="scope.row.type == 6">业委会</span>
                        <span v-if="scope.row.type == 7">物业</span>
                        <span v-if="scope.row.type == 99">其他</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="name" label="归档内容数量" width="180">
                    <span> {{ total2 }} </span>
                </el-table-column> -->

                <el-table-column prop="created_at" label="状态">
                    <template #default="scope">
                        <el-tag v-if="scope.row.active == 1" size="small" type="success">启用</el-tag>
                        <el-tag v-if="scope.row.active == 0" size="small" type="danger">禁用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template #default="scope">
                        <el-popconfirm title="确定要删除当前项么?" cancel-button-type="info" @confirm="deleteFunc_1(scope.row)">
                            <template #reference>
                                <el-button type="danger" size="small">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <template #footer>
                <div class="footer">
                    <el-button @click="data.switch = false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc_1">确定</el-button>
                </div>
            </template> -->
        </el-dialog>
    </div>
</template>
<script setup >
import {
    ref,
    reactive,
    watch
} from 'vue'
import {
    APIgetShareCategoryList,
    APIdeleteShareCategory,
    APIputShareCategory,
    APIpostShareCategory,
    APIpostShareCategoryUserGroup,
    APIdeleteShareCategoryUserGroup,
    APIgetShareCategoryUserGroupList
} from '@/api/custom/custom.js'
import {
    ElMessage
} from 'element-plus'
import { Search, Plus, Loading } from '@element-plus/icons-vue'
const loading_tab = ref(false)
const data = reactive({
    list: [],
    switch: false,
    item: {},
    arr: []
})
const page = ref(1)
const per_page = ref(15)
const getShareCategory = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    loading_tab.value = true
    APIgetShareCategoryList(params).then(res => {
        console.log(res)
        data.list = res
        loading_tab.value = false
    })
}
const refreshFunc = () => {
    getShareCategory()
}
refreshFunc()
const from_error = reactive({
    msg: {}
})
const from_examine = reactive({
    item: {}
})
const switch_examine = ref(false)
const str_title = ref('添加')
const addResidentialFunc = () => {
    str_title.value = '添加'
    from_examine.item = {}
    switch_examine.value = true
}
// 同意拒绝提交
const dialogExamineCloseFunc = () => {
    // console.log(formEl)
    // from_error.msg = {}
    // if (!formEl) return
    // formEl.validate(valid => {
    //     if (valid) {
    for (let key in from_examine.item) {
        if (from_examine.item[key] !== null) {
            if (from_examine.item[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (from_examine.item[key] !== 0 || from_examine.item[key] !== false)) {
                delete from_examine.item[key]
            }
        }
    }
    if (str_title.value == '修改') {
        console.log(from_examine.item)
        APIputShareCategory(from_examine.item.id, from_examine.item).then(res => {
            refreshFunc()
            ElMessage.success('修改成功')
            switch_examine.value = false
        }).catch(err => {
            ElMessage.error('修改失败')
        })
    } else {
        APIpostShareCategory(from_examine.item).then(res => {
            refreshFunc()
            ElMessage.success('添加成功')
            switch_examine.value = false
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    }
    //     } else {
    //         return false
    //     }
    // })
}
const examineListFunc = val => {
    str_title.value = '修改'
    switch_examine.value = true
    from_examine.item = val
}
const deleteFunc = val => {
    APIdeleteShareCategory(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
const addUserGroupFunc = id => {
    data.item.kid = id
    data.switch = true
    APIgetShareCategoryUserGroupList({ kid: id }).then(res => {
        console.log(res)
        data.arr = res
    })
}
const V = ref(null)
const dialogClosed = () => {
    V.value.clearFunc()
}
const checkNameFunc = val => {
    console.log(val)
    data.item.gid = val.id
}
const dialogExamineCloseFunc_1 = () => {
    APIpostShareCategoryUserGroup(data.item).then(res => {
        addUserGroupFunc(data.item.kid)
        ElMessage.success('添加部门成功')
    }).catch(() => {
        ElMessage.error('添加部门失败')
    })
}
const deleteFunc_1 = val => {
    APIdeleteShareCategoryUserGroup({ gid: val.id, kid: data.item.kid }).then(res => {
        addUserGroupFunc(data.item.kid)
        ElMessage.success('删除部门成功')
    })
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['flow_active', 'card_type', 'toushu_return_type']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss" scoped>
.btn button {
    padding: 20px 40px;
}
</style>
