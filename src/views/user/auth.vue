<template>
    <div>
        <page-main>
            <div :gutter="20" class="bottom-btn-box-2">
                <el-row class="m-b-20">
                    <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                        <el-button type="primary" size="large" :icon="Plus" @click="addPerms">添加权限</el-button>
                    </el-col>
                </el-row>
            </div>
            <div style="width: 100%; overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;">
                <el-table
                    v-loading="loading_tab"
                    :data="data_tab_list.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    default-expand-all
                    row-key="id"
                    :tree-props="{ children: 'children' }"
                    style="width: 100%;min-height: 300px;"
                >
                    <el-table-column prop="name" label="权限名称">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="desc" label="权限描述">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.desc }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="utype" label="权限所属" width="200px">
                        <template #default="scope">
                            <span class="m-l-10">{{ getOptVal(opts_all.obj.put_perms_utype,scope.row.utype) }} </span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="id" label="权限ID" width="250px">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.id }} </span>
                        </template>
                    </el-table-column> -->
                    <el-table-column fixed="right" label="操作" width="320">
                        <template #default="scope">
                            <el-button
                                type="primary" size="small"
                                @click="postPermsFun(scope.row)"
                            >
                                修改
                            </el-button>
                            <el-button
                                type="success" size="small"
                                @click="showPermsRolesFun(scope.row)"
                            >
                                拥有角色
                            </el-button>
                            <el-button
                                type="success" size="small"
                                @click="postPerms_rolesFun(scope.row)"
                            >
                                授予角色
                            </el-button>
                            <el-popconfirm
                                title="确定要删除当前项么?" cancel-button-type="info"
                                @confirm="deletePermsFun(scope.row)"
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
            <!-- 添加权限弹窗 -->
            <el-dialog v-model="switch_add_perms" title="添加权限">
                <el-form :model="from_add_perms.item">
                    <el-row>
                        <el-col :xs="8" :sm="12" :md="12" :lg="24">
                            <el-form-item label="权限名称" prop="name">
                                <el-input v-model="from_add_perms.item.name" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :xs="8" :sm="23" :md="23" :lg="24">
                            <el-form-item label="权限描述" prop="desc">
                                <el-input v-model="from_add_perms.item.desc" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :xs="8" :sm="12" :md="12" :lg="24">
                            <el-form-item label="权限类型" prop="utype">
                                <el-select v-model="from_add_perms.item.utype">
                                    <el-option v-for="item in opts_all.obj.put_perms_utype" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <template #footer>
                    <el-button type="primary" @click="addPerms_submit">确认</el-button>
                </template>
            </el-dialog>
            <!-- 修改弹窗 -->
            <el-dialog v-model="switch_put_perms" title="修改权限" show-close width="40%" @close="close_put_perms">
                <el-form ref="ruleFormRef" :model="from_add_perms.item" label-width="90px" label-position="left">
                    <el-row :gutter="5">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                            <el-form-item label="权限名称" prop="name">
                                <el-input v-model="from_add_perms.item.name" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="5">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                            <el-form-item label="权限描述" prop="desc">
                                <el-input v-model="from_add_perms.item.desc" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="5">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                            <el-form-item label="权限所属" prop="utype">
                                <el-select v-model="from_add_perms.item.utype">
                                    <el-option v-for="item in opts_all.obj.put_perms_utype" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <template #footer>
                    <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                        <el-button @click="switch_put_perms=false">取消</el-button>
                        <el-button type="primary" @click="put_perms_submit()">确定</el-button>
                    </div>
                </template>
            </el-dialog>
            <!-- 权限对于角色 -->
            <el-dialog v-model="switch_perms_roles" title="角色拥有权限" width="70%">
                <el-table
                    v-loading="loading_tab"
                    :data="data_tab_perms_roles.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    default-expand-all
                    row-key="id"
                    :tree-props="{ children: 'children' }"
                    style="width: 100%;min-height: 300px;"
                >
                    <el-table-column prop="name" label="角色名称" width="180">
                        <template #default="scope">
                            <span>{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="角色ID" width="240px">
                        <template #default="scope">
                            <span>{{ scope.row.id }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="group_id" label="所属用户组" width="240px">
                        <template #default="scope">
                            <span>{{ scope.row.group_id }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="spec" label="特有标识" width="180">
                        <template #default="scope">
                            <span>{{ scope.row.spec }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template #default="scope">
                            <el-popconfirm
                                title="确定要删除当前项么?" cancel-button-type="info"
                                @confirm="deletePerms_roles(scope.row)"
                            >
                                <template #reference>
                                    <el-button type="danger" size="small">
                                        删除权限
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
            <!-- 添加权限给角色 -->
            <el-dialog
                v-model="switch_post_perms_roles" title="赋予角色权限"
                @close="closePostPermsRoles"
            >
                <el-input v-model="from_post_perms_roles.item.role_ids[0]">
                    <template #prepend>角色ID</template>
                </el-input>
                <template #footer>
                    <el-button>取消</el-button>
                    <el-button type="primary" @click="postPerms_roles">确认</el-button>
                </template>
            </el-dialog>
        </page-main>
    </div>
</template>

<script setup>
import {
    ref, reactive, watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import {
    APIgetPermsList,
    APIgetPermsDetail,
    APIpostPerms,
    APIputPerms,
    APIdeletePerms,
    APIgetPerms_Roles,
    APIpostPerms_Roles,
    APIdeletePerms_Roles
} from '@/api/custom/custom'
const loading_tab = ref(false)
const page = ref(1)
const per_page = ref(15)
const switch_put_perms = ref(false)
const switch_perms_roles = ref(false)
const current_perms_id = ref('')
const switch_post_perms_roles = ref(false)
const from_post_perms_roles = reactive({
    item: {
        role_ids: ['']
    }
})
const total = ref(50)
watch(page, () => {
    getTabListFun()
})
// 展示权限拥有的角色
const showPermsRolesFun = val => {
    current_perms_id.value = val.id
    switch_perms_roles.value = true
    APIgetPerms_Roles(val.id).then(res => {
        console.log(res)
        data_tab_perms_roles.arr = res
    })
}
const data_tab_list = reactive({
    arr: []
})
const data_tab_perms_roles = reactive({
    arr: []
})
const switch_show_roles = ref(false)
const switch_add_perms = ref(false)
const from_add_perms = reactive({
    item: {
        name: '',
        utype: '',
        desc: '',
        id: ''
    }
})
const refreshFunc = () => {
    getTabListFun()
}
// 分页功能板块
const current_page_change = page => {
    page.value++
}
const prev_click = val => {
    page.value = page.value++
}
const next_click = val => {
    page.value = page.value++
}
const current_per_page_change = per_page => {
    per_page.value = per_page
}
// 关闭修改弹窗，清除表单数据
const close_put_perms = () => {
    from_add_perms.item.name = ''
    from_add_perms.item.utype = ''
    from_add_perms.item.desc = ''
}
//
const closePostPermsRoles = () => {
    from_post_perms_roles.item.role_ids[0] = ''
}
//
const addPerms_submit = () => {
    let params = {
        name: from_add_perms.item.name,
        desc: from_add_perms.item.desc,
        utype: from_add_perms.item.utype
    }
    APIpostPerms(params).then(res => {
        refreshFunc()
        ElMessage.success('添加权限成功')
        switch_add_perms.value = false
    })
}
// 赋予角色权限1
const postPerms_rolesFun = val => {
    switch_post_perms_roles.value = true
    current_perms_id.value = val.id
}
// 赋予角色权限2
const postPerms_roles = () => {
    if (from_post_perms_roles.item.role_ids[0] == '') {
        ElMessage.error('请输入信息')
        return
    }
    APIpostPerms_Roles(current_perms_id, { role_ids: [from_post_perms_roles.item.role_ids[0]] }).then(res => {
        switch_post_perms_roles.value = false
        ElMessage.success('授权成功')
        from_post_perms_roles.item.role_ids[0] = ''
    })
}
// 修改权限
const postPermsFun = val => {
    from_add_perms.item.id = val.id
    switch_put_perms.value = true
    APIgetPermsDetail(val.id).then(res => {
        from_add_perms.item = res
    })
}

// 删除角色拥有的角色
const deletePerms_roles = val => {
    APIdeletePerms_Roles(current_perms_id.value, { data: { role_ids: [val.id] } }).then(res => {
        ElMessage.success('删除角色成功')
        switch_perms_roles.value = false
    })
}
// 添加权限
const addPerms = () => {
    from_add_perms.item = {}
    switch_add_perms.value = true
}
// 修改提交
const put_perms_submit = () => {
    for (let key in from_add_perms.item) {
        if (from_add_perms.item[key] !== null) {
            if (from_add_perms.item[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (from_add_perms.item[key] !== 0 || from_add_perms.item[key] !== false)) {
                delete from_add_perms.item[key]
            }
        }
    }
    APIputPerms(from_add_perms.item.id, from_add_perms.item).then(res => {
        ElMessage.success('修改成功')
        switch_put_perms.value = false
        refreshFunc()
    })
}
// 删除权限
const deletePermsFun = val => {
    APIdeletePerms(val.id).then(res => {
        ElMessage.success('删除成功')
        refreshFunc()
    })
}
const flag = ref(false)
const getTabListFun = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    /*     APIgetPermsList().then(res=>{
        total.value=res
    }) */
    APIgetPermsList(params).then(res => {
        data_tab_list.arr = res
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
import { getOptVal, getOpts } from '@/util/opts'
const opts_all = reactive({
    obj: {}
})
getOpts(['terminal_perms', 'put_perms_utype']).then(res => {
    opts_all.obj = res
    console.log(res)
})
refreshFunc()
</script>
<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
</style>

