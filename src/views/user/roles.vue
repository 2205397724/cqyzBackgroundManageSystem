<template>
    <div class="userRoles">
        <page-main>
            <el-row class="m-b-20">
                <el-col>
                    <el-button type="primary" size="large" :icon="Plus" @click="addRolesFun">添加用户组角色</el-button>
                </el-col>
            </el-row>
            <div>
                <el-table
                    v-loading="loading_tab"
                    :data="data_tab.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    default-expand-all
                    row-key="id"
                    :tree-props="{ children: 'children' }"
                    class="tab_1"
                >
                    <el-table-column prop="name" label="角色名称">
                        <template #default="scope">
                            <span>{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>

                    <!-- <el-table-column prop="group_id" label="所属用户组">
                        <template #default="scope">
                            <span>{{ find_groupid_name(scope.row.group_id) }} </span>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="spec" label="特有标识">
                        <template #default="scope">
                            <span>{{ getOptVal(opts_all.obj.rolesSpec,scope.row.spec) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="角色ID" width="250px">
                        <template #default="scope">
                            <span>{{ scope.row.id }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="200px">
                        <template #default="scope">
                            <el-button
                                type="primary" size="small"
                                @click="postRolesFun(scope.row)"
                            >
                                修改
                            </el-button>
                            <el-button
                                size="small"
                                @click="getRoles_permsFun(scope.row)"
                            >
                                权限
                            </el-button>
                            <el-popconfirm
                                title="确定要删除当前项么?" cancel-button-type="info"
                                @confirm="deleteRoles(scope.row)"
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
                    :total="50"
                    background
                    prev-text="上一页"
                    next-text="下一页"
                    hide-on-single-page
                    @next-click="next_click_page"
                    @prev-click="prev_click_page"
                />
            </div>
            <!-- 添加修改 -->
            <el-dialog v-model="switch_add_post" :title="add_or_post_text" show-close width="40%" @close="close_post_put">
                <el-form
                    ref="ruleFormRefAddPut" :model="from_data.item"
                    label-width="90px"
                    :rules="addPutRules" label-position="left"
                >
                    <el-row :gutter="5">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                            <el-form-item label="角色名称" prop="name">
                                <el-input v-model="from_data.item.name" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="5">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                            <el-form-item label="特有标识" prop="spec">
                                <el-input v-model="from_data.item.spec" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                            <el-form-item label-width="90px" label="用户组">
                                <GroupListTabs
                                    :placeholder="'请选择用户组'"
                                    @change="
                                        (val) => {
                                            from_data.item.group_id = val.id;
                                        }
                                    "
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <template #footer>
                    <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                        <el-button @click="switch_add_post=false">取消</el-button>
                        <el-button type="primary" @click="add_post_submit">确定</el-button>
                    </div>
                </template>
            </el-dialog>
            <!-- 角色获取权限 -->
            <el-dialog v-model="switch_roles_perms" title="角色拥有权限" width="60%">
                <el-button class="m-b-20" type="primary" @click="getGroup_perms">给角色赋权限</el-button>
                <!-- <el-input v-model="from_post_roles_perms.item.perm_ids[0]" class="m-tb-20">
                    <template #prepend>
                        权限ID
                    </template>
                </el-input> -->
                <el-table
                    v-loading="loading_tab"
                    :data="data_tab_roles_perms.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    default-expand-all
                    row-key="id"
                    :tree-props="{ children: 'children' }"
                    class="tab_1"
                >
                    <el-table-column prop="name" label="权限名称">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="desc" label="权限描述" width="180px">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.desc }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="utype" label="权限所属" width="150px">
                        <template #default="scope">
                            <span class="m-l-10">{{ getOptVal(opts_all.obj.put_perms_utype,scope.row.utype) }} </span>
                        </template>
                    </el-table-column>

                    <!-- <el-table-column prop="id" label="权限ID" width="240px">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.id }} </span>
                        </template>
                    </el-table-column> -->
                    <el-table-column fixed="right" label="操作" width="100px">
                        <template #default="scope">
                            <el-popconfirm
                                title="确定要删除当前项么?" cancel-button-type="info"
                                @confirm="deleteRoles_perms(scope.row)"
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
        </page-main>
        <!-- 组权限 -->
        <el-dialog
            v-model="switch_group_perms"
            title="用户组权限"
            width="60%"
            @closed="group_perms_close"
        >
            <el-tabs>
                <el-tab-pane label="管理端权限">
                    <!-- <el-checkbox-group v-model="data_tab_group_perms_selected_gov.arr"> -->
                    <div v-for="item in all_perms_list.arr" :key="item.id">
                        <el-checkbox
                            v-if="item.utype == 'gov'"
                            :label="item.name"
                            :true-label="item.id"
                            :checked="
                                data_tab_group_perms_selected_gov.arr.indexOf(item.id) == -1
                                    ? false
                                    : true
                            "
                            @change="(val) => group_perms_selectFun_gov(val, item.id)"
                        />
                    </div>
                <!-- </el-checkbox-group> -->
                </el-tab-pane>
                <el-tab-pane label="物业端权限">
                    <div v-for="item in all_perms_list.arr" :key="item.id">
                        <el-checkbox
                            v-if="item.utype == 'pm'"
                            :label="item.name"
                            :true-label="item.id"
                            :checked="
                                data_tab_group_perms_selected_pm.arr.indexOf(item.id) == -1
                                    ? false
                                    : true
                            "
                            @change="(val) => group_perms_selectFun_pm(val, item.id)"
                        />
                    </div>
                </el-tab-pane>
                <el-tab-pane label="业主端权限">
                    <div v-for="item in all_perms_list.arr" :key="item.id">
                        <el-checkbox
                            v-if="item.utype == 'mbr'"
                            :label="item.name"
                            :true-label="item.id"
                            :checked="
                                data_tab_group_perms_selected_mbr.arr.indexOf(item.id) == -1
                                    ? false
                                    : true
                            "
                            @change="(val) => group_perms_selectFun_mbr(val, item.id)"
                        />
                    </div>
                </el-tab-pane>
            </el-tabs>
            <template #footer>
                <el-button type="primary" @click="post_all_group_perms">确认</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import {
    APIgetRolesList,
    APIgetRolesDetail,
    APIpostRoles,
    APIputRoles,
    APIDeleteRoles,
    APIdeleteRoles_perms,
    APIgetRoles_perms,
    APIpostRoles_perms,
    APIgetPermsList,
    APIgetGroupList
} from '@/api/custom/custom.js'
const page = ref(1)
const per_page = ref(10)
const switch_add_post = ref(false)
const loading_tab = ref(false)
const add_or_post_text = ref('添加')
const ruleFormRef = ref('')
const from_data = reactive({
    item: {}
})
const from_post_roles_perms = reactive({
    item: {
        perm_ids: ['']
    }
})
const switch_roles_perms = ref(false)
const data_tab = reactive({
    arr: []
})
const data_tab_roles_perms = reactive({
    arr: []
})
const refreshFunc = () => {
    switch_add_post.value = false
    getTabListFunc()
}
const current_roles_perms = reactive({
    item: {}
})
// 表单校验
// const addPutRules=reactive({
//     name:[
//         {require:true,message:"请输入角色名称",triggerL:'blur'},
//     ],
//     spec:[
//         {require:true,message:"请输入角色d标识",triggerL:'blur'},
//     ],
//     group_id:[
//         {require:true,message:"请输入角色名称",triggerL:'blur'},
//     ]
// })
// 分页板块
watch(page, () => {
    getTabListFunc
})
// 给角色赋予权限
const post_roles_perms = () => {
    if (from_post_roles_perms.item.perm_ids[0] == '') {
        ElMessage.error('请输入信息')
        return
    }
    APIpostRoles_perms(current_roles_perms.item.id, { perm_ids: [from_post_roles_perms.item.perm_ids[0]] }).then(res => {
        if (res.status == 200) {
            ElMessage.success('赋予权限成功')
            from_post_roles_perms.item.perm_ids[0] = ''
        }
    })
}
// 根据用户组ID找到对应name
const groupList = reactive({ arr: [] })
const getGroupList = () => {
    APIgetGroupList().then(res => {
        groupList.arr = res.data
    })
}
getGroupList()
const find_groupid_name = val => {
    let name = ''
    groupList.arr.forEach(item => {
        if (item['id'] == val) {
            name = item.name
        }
    })
    return name
}

// 关闭dialog事件
const close_post_put = () => {
    from_data.item = {}
}
// 获取角色权限
const getRoles_permsFun = val => {
    switch_roles_perms.value = true
    current_roles_perms.item = val
    APIgetRoles_perms(val.id).then(res => {
        console.log(res)
        data_tab_roles_perms.arr = res.data
    })
}
// 删除角色
const deleteRoles = val => {
    APIDeleteRoles(val.id).then(res => {
        if (res.status === 200) {
            ElMessage.success('删除角色成功')
            refreshFunc()
        } else {
            ElMessage.error('删除失败')
        }
    })
}
// 修改角色
const postRolesFun = val => {
    switch_add_post.value = true
    add_or_post_text.value = '修改'
    APIgetRolesDetail(val.id).then(res => {
        if (res.status === 200) {
            console.log(res)
            from_data.item = res.data
        }
    })
}
// 添加角色
const addRolesFun = () => {
    switch_add_post.value = true
    add_or_post_text.value = '添加'
}
// 添加修改submit
const add_post_submit = () => {
    if (from_data.item.name && from_data.item.spec && from_data.item.group_id) {
        if (add_or_post_text.value == '修改') {
            loading_tab.value = true
            APIputRoles(from_data.item.id, from_data.item).then(res => {
                if (res.status === 200) {
                    loading_tab.value = false
                    refreshFunc()
                    ElMessage.success('修改成功')
                    switch_add_post.value = false
                }
            }).catch(err => {
                loading_tab.value = false
            })
        } else {
            console.log(from_data.item)
            loading_tab.value = true
            APIpostRoles(from_data.item).then(res => {
                if (res.status === 200) {
                    loading_tab.value = false
                    refreshFunc()
                    ElMessage.success('添加成功')
                    switch_add_post.value = false
                }
            }).catch(err => {
                loading_tab.value = false
            })
        }
    } else {
        ElMessage.error('请输入完整信息')
    }
}
const flag = ref(false)
// 获取角色列表
const getTabListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    APIgetRolesList(params).then(res => {
        data_tab.arr = res.data
        console.log(res)
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
const switch_group_perms = ref(false)
const data_tab_group_perms_selected_gov = reactive({
    arr: []
})
const data_tab_group_perms_selected_pm = reactive({
    arr: []
})
const data_tab_group_perms_selected_mbr = reactive({
    arr: []
})
const all_perms_list = reactive({
    arr: []
})
// 获取角色权限弹窗
const getGroup_perms = () => {
    APIgetPermsList().then(res => {
        all_perms_list.arr = res.data
    })
    APIgetRoles_perms(current_roles_perms.item.id).then(res => {
        // tab_group_all_perms.arr=res.data
        data_tab_group_perms_selected_gov.arr = []
        data_tab_group_perms_selected_pm.arr = []
        data_tab_group_perms_selected_mbr.arr = []
        for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].utype == 'gov') {
                data_tab_group_perms_selected_gov.arr.push(res.data[i].id)
                console.log(data_tab_group_perms_selected_gov.arr)
            }
            if (res.data[i].utype == 'pm') {
                data_tab_group_perms_selected_pm.arr.push(res.data[i].id)
                console.log(data_tab_group_perms_selected_pm.arr)
            }
            if (res.data[i].utype == 'mbr') {
                data_tab_group_perms_selected_mbr.arr.push(res.data[i].id)
                console.log(data_tab_group_perms_selected_mbr.arr)
            }
        }
        switch_group_perms.value = true
    })
}
// 三种权限进行判断
const group_perms_selectFun_gov = (val, id) => {
    if (
        data_tab_group_perms_selected_gov.arr.indexOf(id) !== -1 &&
        val == false
    ) {
        let index = data_tab_group_perms_selected_gov.arr.indexOf(id)
        data_tab_group_perms_selected_gov.arr.splice(index, 1)
    }
    if (val != false && data_tab_group_perms_selected_gov.arr.indexOf(id) == -1) {
        data_tab_group_perms_selected_gov.arr.push(id)
    }
    console.log(data_tab_group_perms_selected_gov.arr)
}
const group_perms_selectFun_pm = (val, id) => {
    if (data_tab_group_perms_selected_pm.arr.indexOf(id) !== -1 && val == false) {
        let index = data_tab_group_perms_selected_pm.arr.indexOf(id)
        data_tab_group_perms_selected_pm.arr.splice(index, 1)
    }
    if (val != false && data_tab_group_perms_selected_gov.arr.indexOf(id) == -1) {
        data_tab_group_perms_selected_pm.arr.push(id)
    }
    console.log(data_tab_group_perms_selected_pm.arr)
}
const group_perms_selectFun_mbr = (val, id) => {
    if (
        data_tab_group_perms_selected_mbr.arr.indexOf(id) !== -1 &&
        val == false
    ) {
        let index = data_tab_group_perms_selected_mbr.arr.indexOf(id)
        data_tab_group_perms_selected_mbr.arr.splice(index, 1)
    }
    if (val != false && data_tab_group_perms_selected_mbr.arr.indexOf(id) == -1) {
        data_tab_group_perms_selected_mbr.arr.push(id)
    }
    console.log(data_tab_group_perms_selected_mbr.arr)
}
// 添加角色权限
const post_all_group_perms = () => {
    APIpostRoles_perms(current_roles_perms.item.id, {
        perm_ids: [
            ...data_tab_group_perms_selected_gov.arr,
            ...data_tab_group_perms_selected_pm.arr,
            ...data_tab_group_perms_selected_mbr.arr
        ]
    }).then(res => {
        if (res.status == 200) {
            ElMessage.success('添加角色权限成功')
            getRoles_permsFun(current_roles_perms.item)
            switch_group_perms.value = false

        }
    })
}
// 删除权限
const deleteRoles_perms = val => {
    let perm_ids = []
    perm_ids.push(val.id)
    APIdeleteRoles_perms(current_roles_perms.item.id, { data: { perm_ids: perm_ids } }).then(res => {
        ElMessage.success('删除权限成功')
        getRoles_permsFun(current_roles_perms.item)

    })
}
refreshFunc()
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['rolesSpec', 'put_perms_utype']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
</style>

