<template>
   <div class="userRoles">
      <page-main>
        <el-row>
            <el-col>
                <el-button type="primary" @click="addRolesFun" class="m-b-20">添加用户组角色</el-button>
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
                    <el-table-column prop="name" label="角色名称" width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="角色ID" width="230px">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.id }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="group_id" label="所属用户组" width="230px">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ find_groupid_name(scope.row.group_id)  }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="spec" label="特有标识" width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.spec }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="270">
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
                        style="float: right;"
                        v-model:current-page="page"
                        layout="prev,next,jumper"
                        :page-size="per_page"
                        :total="50"
                        background
                        @next-click="next_click_page"
                        @prev-click="prev_click_page"
                    />
            </div>
        <!-- 添加修改 -->
         <el-dialog :title="add_or_post_text" v-model="switch_add_post" show-close width="40%" @close="close_post_put">
            <el-form :model="from_data.item" label-width="90px" label-position="left" ref="ruleFormRef">
                <el-row :gutter="5">
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <el-form-item label="角色名称" prop="name">
                        <el-input v-model="from_data.item.name"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="5">
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <el-form-item label="特有标识" prop="spec">
                        <el-input v-model="from_data.item.spec"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="5">
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <el-form-item label="所属用户组" prop="group_id">
                        <el-input v-model="from_data.item.group_id"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_add_post=false">取消</el-button>
                    <el-button type="primary" @click="add_post_submit(ruleFormRef)">确定</el-button>
                </div>
            </template>
         </el-dialog>
         <!-- 角色获取权限 -->
         <el-dialog v-model="switch_roles_perms" title="角色拥有权限" width="60%">
            <el-button type="primary" @click="post_roles_perms">给角色赋权限</el-button>
            <el-input class="m-tb-20" v-model="from_post_roles_perms.item.perm_ids[0]">
                <template #prepend>
                    权限ID
                </template>
            </el-input>
            <el-table
                    v-loading="loading_tab"
                    :data="data_tab_roles_perms.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    default-expand-all
                    row-key="id"
                    :tree-props="{ children: 'children' }"
                    style="width: 100%;min-height: 300px;"
                >
                    <el-table-column prop="name" label="权限名称" width="180">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="权限ID" style="min-width: 230px;">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.id }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="utype" label="utype" width="180">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.utype }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="desc" label="权限描述" width="180">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.desc }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
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
import {
APIgetRolesList,
APIgetRolesDetail,
APIpostRoles,
APIputRoles,
APIDeleteRoles,
payRoles_perms,
deleteRoles_perms,
APIgetRoles_perms,
APIpostRoles_perms,
APIdeleteRoles_perms,
APIgetGroupList
} from '@/api/custom/custom.js'
const page=ref(1)
const per_page=ref(10)
const switch_add_post=ref(false)
const loading_tab=ref(false)
const add_or_post_text=ref("添加")
const ruleFormRef=ref("")
const from_data=reactive({
    item:{}
})
const from_post_roles_perms=reactive({
    item:{
        perm_ids:[""]
    }
})
const switch_roles_perms=ref(false)
const data_tab=reactive({
    arr:[]
})
const data_tab_roles_perms=reactive({
    arr:[]
})
const refreshFunc=()=>{
    page.value=1
    per_page.value=10
    switch_add_post.value=false
    getTabListFunc()
}
const current_roles_perms=reactive({
    id:""
})
//分页板块
watch(page,()=>{
    getTabListFunc
})
//给角色赋予权限
const post_roles_perms=()=>{
    if(from_post_roles_perms.item.perm_ids[0]==""){
        ElMessage.error("请输入信息")
        return
    }
    APIpostRoles_perms(current_roles_perms.id,{perm_ids:[from_post_roles_perms.item.perm_ids[0]]}).then(res=>{
        if(res.status==200){
            ElMessage.success("赋予权限成功")
            from_post_roles_perms.item.perm_ids[0]=""
        }
    })
}
//根据用户组ID找到对应name
const find_groupid_name=(val)=>{
    APIgetGroupList().then(res=>{
        let name=""
        res.data.forEach((item)=>{
            for(let key in item){
                if(key=='id'&&item['id']==val){
                    name=item.name
                }
            }
        })
        return name
    })
}
//关闭dialog事件
const close_post_put=()=>{
    from_data.item={}
}
//获取角色权限
const getRoles_permsFun=(val)=>{
    switch_roles_perms.value=true
    current_roles_perms.id=val.id
    APIgetRoles_perms(val.id).then(res=>{
        console.log(res)
        data_tab_roles_perms.arr=res.data
    })
}
//删除角色
const deleteRoles=(val)=>{
    APIDeleteRoles(val.id).then(res=>{
        if(res.status===200){
            ElMessage.success("删除角色成功")
            refreshFunc()
        }else{
            ElMessage.error("删除失败")
        }
    })
}
//修改角色
const postRolesFun=(val)=>{
    switch_add_post.value=true
    add_or_post_text.value="修改"
    APIgetRolesDetail(val.id).then(res=>{
        if(res.status===200){
            console.log(res)
            from_data.item=res.data
        }
    })
}
//添加角色
const addRolesFun=()=>{
    switch_add_post.value=true
    add_or_post_text.value="添加"
}
//添加修改submit
const add_post_submit=formEl=>{
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            if (add_or_post_text.value == '修改') {
                loading_tab.value=true
                APIputRoles(from_data.item.id, from_data.item).then(res => {
                    if (res.status===200) {
                        loading_tab.value=false
                        refreshFunc()
                        ElMessage.success('修改成功')
                        switch_add_post.value = false
                    }
                }).catch(err => {
                    loading_tab.value=false
                })
            } else {
                console.log(from_data.item)
                loading_tab.value=true
                APIpostRoles(from_data.item).then(res => {
                    if (res.status===200) {
                        loading_tab.value=false
                        refreshFunc()
                        ElMessage.success("添加成功")
                        switch_add_post.value = false
                    }
                }).catch(err => {
                   loading_tab.value=false
                })
            }
        }
})
}
//获取角色列表
const getTabListFunc=()=>{
    let params={
        page:page.value,
        per_page:per_page.value
    }
    APIgetRolesList(params).then(res=>{
        data_tab.arr=res.data
        console.log(res)
    })
}
refreshFunc()
</script>


