<template>
  <div>
    <page-main>
        <div :gutter="20" class="bottom-btn-box-2">
            <el-row>
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                  <el-button @click="addPerms" type="primary" class="m-b-10">添加权限</el-button>
                </el-col>
            </el-row>
            <el-dialog v-model="switch_add_perms" title="添加权限">
                <el-row>
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                  <el-input style="min-width: 500px;" class="m-tb-10" v-model="from_add_perms.item.name">
                    <template #prepend>
                        权限名称
                    </template>
                  </el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                  <el-input style="min-width: 500px;" class="m-b-10" v-model="from_add_perms.item.utype" placeholder="gov管理端、pm物业端、mbr业主端">
                    <template #prepend>
                        权限所属
                    </template>
                  </el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                  <el-input style="min-width: 500px;" v-model="from_add_perms.item.desc" class="m-b-20">
                    <template #prepend>
                        权限描述
                    </template>
                  </el-input>
                </el-col>
            </el-row>
            <template #footer>
                <el-button type="primary" @click="addPerms_submit">确认</el-button>
            </template>
            </el-dialog>
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
                    <el-table-column prop="name" label="权限名称" width="150px">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="utype" label="权限所属" width="80">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.utype }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="权限ID" width="250px">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.id }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="desc" label="权限描述" >
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.desc }} </span>
                        </template>
                    </el-table-column>
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
                                赋予角色
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
                 layout="prev,next"
                :total="30"
                @size-change="current_per_page_change"
                @prev-click="prev_click"
                @next-click="next_click"
  />
            </div>
            <!-- 修改弹窗 -->
         <el-dialog title="修改权限" v-model="switch_put_perms" show-close width="40%" @close="close_put_perms">
            <el-form :model="from_add_perms.item" label-width="90px" label-position="left" ref="ruleFormRef">
                <el-row :gutter="5">
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <el-form-item label="权限名称" prop="name">
                        <el-input v-model="from_add_perms.item.name"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="5">
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <el-form-item label="权限描述" prop="desc">
                        <el-input v-model="from_add_perms.item.desc"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="5">
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <el-form-item label="权限所属" prop="utype">
                        <el-input v-model="from_add_perms.item.utype"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_add_post=false">取消</el-button>
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
                            <span class="m-l-10">{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="角色ID"  style="min-width: 230px;">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.id }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="group_id" label="所属用户组"  style="min-width: 230px;">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.group_id }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="spec" label="特有标识" width="180">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.spec }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
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
         <el-dialog v-model="switch_post_perms_roles" title="赋予角色权限"
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
    ref,reactive,watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
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
const loading_tab=ref(false)
const page=ref(1)
const per_page=ref(10)
const switch_put_perms=ref(false)
const switch_perms_roles=ref(false)
const current_perms_id=ref("")
const switch_post_perms_roles=ref(false)
const from_post_perms_roles=reactive({
    item:{
        role_ids:[""]
    }
})
const total=ref(50)
watch(page,()=>{
    getTabListFun()
})
//展示权限拥有的角色
const showPermsRolesFun=(val)=>{
    current_perms_id.value=val.id
    switch_perms_roles.value=true
    APIgetPerms_Roles(val.id).then(res=>{
        console.log(res)
        data_tab_perms_roles.arr=res.data
    })
}
const data_tab_list=reactive({
    arr:[]
})
const data_tab_perms_roles=reactive({
    arr:[]
})
const switch_show_roles=ref(false)
const switch_add_perms=ref(false)
const from_add_perms=reactive({
    item:{
        name:"",
        utype:"",
        desc:"",
        id:""
    }
})
const refreshFunc=()=>{
    page.value=1
    per_page.value=10
    getTabListFun()
}
//分页功能板块
const current_page_change=(page)=>{
    page.value++
}
const prev_click=(val)=>{
    page.value=page.value++
}
const next_click=(val)=>{
    page.value=page.value++
}
const current_per_page_change=(per_page)=>{
   per_page.value=per_page
}
//关闭修改弹窗，清除表单数据
const close_put_perms=()=>{
    from_add_perms.item.name=""
    from_add_perms.item.utype=""
    from_add_perms.item.desc=""
}
//
const closePostPermsRoles=()=>{
    from_post_perms_roles.item.role_ids[0]=""
}
//
const addPerms_submit=()=>{
    let params={
        name:from_add_perms.item.name,
        desc:from_add_perms.item.desc,
        utype:from_add_perms.item.utype,
    }
    APIpostPerms(params).then(res=>{
        if(res.status==200){
            refreshFunc()
            ElMessage.success("添加权限成功")
            switch_add_perms.value=false
        }
    })
}
//赋予角色权限1
const postPerms_rolesFun=(val)=>{
    switch_post_perms_roles.value=true
    current_perms_id.value=val.id
}
//赋予角色权限2
const postPerms_roles=()=>{
    if(from_post_perms_roles.item.role_ids[0]==""){
        ElMessage.error("请输入信息")
        return
    }
    APIpostPerms_Roles(current_perms_id,{role_ids:[from_post_perms_roles.item.role_ids[0]]}).then(res=>{
        if(res.status===200){
            switch_post_perms_roles.value=false
            ElMessage.success("授权成功")
            from_post_perms_roles.item.role_ids[0]=""
        }else{
            ElMessage.error("授权失败")
        }
    })
}
//修改权限
const postPermsFun=(val)=>{
    from_add_perms.item.id=val.id
    switch_put_perms.value=true
    APIgetPermsDetail(val.id).then(res=>{
        from_add_perms.item=res.data
    })
}
//删除角色拥有的角色
const deletePerms_roles=(val)=>{
    APIdeletePerms_Roles(current_perms_id.value,{data:{role_ids:[val.id]}}).then(res=>{
        if(res.status===200){
            ElMessage.success("删除角色成功")
            switch_perms_roles.value=false
        }else{
            ElMessage.error("删除失败")
        }
    })
}
//添加权限
const addPerms=()=>{
    switch_add_perms.value=true
}
//修改提交
const put_perms_submit=()=>{
    APIputPerms(from_add_perms.item.id,from_add_perms.item).then(res=>{
        if(res.status===200){
            ElMessage.success("修改成功")
            switch_put_perms.value=false
            refreshFunc()
        }
    })
}
//删除权限
const deletePermsFun=(val)=>{
    APIdeletePerms(val.id).then(res=>{
        if(res.status===200){
            ElMessage.success("删除成功")
            refreshFunc()
        }else{
            ElMessage.error("删除失败!")
        }
    })
}
const getTabListFun=()=>{
    let params={
        page:page.value,
        per_page:per_page.value
    }
/*     APIgetPermsList().then(res=>{
        total.value=res.data
    }) */
    APIgetPermsList(params).then(res=>{
        data_tab_list.arr=res.data
    })
}
refreshFunc()
</script>


