<template>
    <div class="usergroup">
        <page-main>
            <el-row :gutter="20" class="bottom-btn-box-2">
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                    <el-button class="head-btn" type="primary" @click="addResidentialFunc">添加用户组</el-button>
                </el-col>
                <!-- <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-cascader
                        v-model="region_code" class="head-btn"
                        placeholder="区域"
                        :props="cascader_props"
                        collapse-tags
                        collapse-tags-tooltip
                        :show-all-levels="false"
                    />
                </el-col> -->
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
                    <el-table-column prop="name" label="用户组名称" width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="用户组ID" width="300">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.id }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="类型" width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ getOptVal(opts_all.obj.toushu_return_type,scope.row.type) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="region_type" label="区域类型" width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ getOptVal(opts_all.obj.group_user_region_type,scope.row.region_type) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="region_val" label="区域类型对应值" width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.region_val }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="region_cc" label="最小区域代码" width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.region_cc }} </span>
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
                    <el-table-column fixed="right" label="操作" width="320">
                        <template #default="scope">
                            <el-button
                                type="primary" size="small"
                                @click="modifyResidentialFunc(scope.row)"
                            >
                                修改
                            </el-button>
                            <el-button
                                size="small"
                                @click="getGroup_perms(scope.row)"
                            >
                                权限
                            </el-button>
                            <el-button
                                type="success"
                                size="small"
                                @click="getGroupRolesFun(scope.row)"
                            >
                                角色
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
                    label-position="left"
                >
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="用户组名称" prop="name" label-width="110px"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="类型" prop="type" label-width="110px"
                            >
                            <el-select v-model="from_examine.item.type" @change="type_change">
                              <el-option
                                v-for="item in opts_all.obj.toushu_return_type" :key="item.key"
                                :value="item.key" :label="item.val"
                              />
                            </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="区域类型" prop="region_type" label-width="110px"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-select v-model="from_examine.item.region_type">
                                    <el-option
                                        v-for="item in opts_all.obj.group_user_region_type" :key="item.key"
                                        :value="item.key" :label="item.val"
                                    />
                            </el-select>

                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="区域类型对应值" prop="region_val" label-width="110px"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.region_val"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="最小区域代码" prop="region_cc" label-width="110px"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.region_cc"
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
                <el-table-column prop="group_id" label="用户组ID" width="300">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.group_id }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="user_id" label="用户ID" width="300">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.user_id}} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="flg" label="职位" width="90">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.flg }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="post" label="职位描述" width="300">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.post }} </span>
                    </template>
                </el-table-column>
                <el-table-column />
                <el-table-column  label="操作" width="280px" fixed="right">
                    <template #default="scope">
                        <el-button
                            type="primary" size="small"
                            @click="optValModifyFunc(scope.row)"
                        >
                            修改
                        </el-button>
                        <el-button
                            type="info" size="small"
                            @click="groupUserRolesFun(scope.row)"
                        >
                            角色
                        </el-button>
                        <el-button
                                type="success"
                                size="small"
                                @click="getGroupUser_permsFun(scope.row)"
                            >
                                权限
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
                    label-width="80px"
                >
                    <el-row :gutter="10">
                        <el-col  :md="24" :lg="12">
                            <el-form-item
                                label="用户ID" prop="id" label-width="250px"

                            >
                                <div style="height: 100%;width: 100%;box-sizing: border-box;padding-bottom: 10px;">
                                    <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;font-size: 14px;">
                                        <SearchUser v-model:str="from_opt_val.obj.user_id" />
                                    </div>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="职位" prop="flg"

                            >
                                <el-input
                                    v-model="from_opt_val.obj.flg"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="职位描述" prop="post"

                            >
                                <el-input
                                    v-model="from_opt_val.obj.post"
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
        <!-- 角色部分 -->
        <el-dialog v-model="switch_roles" title="角色信息" center width="65%">
            <el-button type="primary" @click="addGroupRoles" class="m-b-10">添加角色</el-button>
            <el-input class="p-b-10" v-model="from_addRoles.item.role_ids[0]">
                <template #prepend>角色ID集</template>
            </el-input>
           <el-table  :data="data_tab_roles.arr" v-loading="loading_tab">
             <el-table-column label="角色名称" prop="name">
                <template #default="scope">
                    <span style="margin-left: 10px;">{{ scope.row.name}} </span>
                </template>
             </el-table-column>
             <el-table-column label="角色ID" prop="id" width="250px">
                <template #default="scope">
                    <span style="margin-left: 10px;">{{ scope.row.id}} </span>
                </template>
             </el-table-column>
             <el-table-column label="角色所属" prop="group_id" width="250px">
                <template #default="scope">
                    <span style="margin-left: 10px;">{{ scope.row.group_id}} </span>
                </template>
             </el-table-column>
             <el-table-column label="标识" prop="spec">
                <template #default="scope">
                    <span style="margin-left: 10px;">{{ scope.row.spec}} </span>
                </template>
             </el-table-column>
             <el-table-column fixed="right" label="操作" width="80">
                            <template #default="scope">
                                <el-popconfirm
                                    title="确定要删除当前项么?" cancel-button-type="info"
                                    @confirm="deleteGroup_roles(scope.row)"
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
        </el-dialog>
        <!-- 成员角色部分 -->
        <el-dialog v-model="switch_group_roles" title="成员角色">
            <el-button type="primary" @click="addGroupUser_rolesFun">添加角色</el-button>
            <el-input class="p-tb-10" v-model="from_addGroupUser_Roles.item.role_ids[0]">
                    <template #prepend>角色ID</template>
            </el-input>
            <el-table  :data="data_tab_user_roles.arr" v-loading="loading_tab">
             <el-table-column label="角色名称" prop="name">
                <template #default="scope">
                    <span style="margin-left: 10px;">{{ scope.row.name}} </span>
                </template>
             </el-table-column>
             <el-table-column label="角色ID" prop="id" width="250px">
                <template #default="scope">
                    <span style="margin-left: 10px;">{{ scope.row.id}} </span>
                </template>
             </el-table-column>
             <el-table-column label="角色所属" prop="group_id" width="250px">
                <template #default="scope">
                    <span style="margin-left: 10px;">{{ scope.row.group_id}} </span>
                </template>
             </el-table-column>
             <el-table-column label="标识" prop="spec">
                <template #default="scope">
                    <span style="margin-left: 10px;">{{ scope.row.spec}} </span>
                </template>
             </el-table-column>
             <el-table-column fixed="right" label="操作" width="80">
                            <template #default="scope">
                                <el-popconfirm
                                    title="确定要删除当前项么?" cancel-button-type="info"
                                    @confirm="deleteGroupUser_roles(scope.row)"
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
        </el-dialog>
        <!-- 组成员权限 -->
        <el-dialog v-model="switch_group_user_perms" title="成员权限">
            <el-button type="primary" @click="addGroupUser_permsFun">添加权限</el-button>
            <el-input class="p-tb-10" v-model="from_addGroupUser_perms.item.perm_ids[0]">
                    <template #prepend>权限ID</template>
            </el-input>
            <el-table  :data="data_tab_user_perms.arr" v-loading="loading_tab">
             <el-table-column label="权限名称" prop="name">
                <template #default="scope">
                    <span style="margin-left: 10px;">{{ scope.row.name}} </span>
                </template>
             </el-table-column>
             <el-table-column label="权限ID" prop="id" width="250px">
                <template #default="scope">
                    <span style="margin-left: 10px;">{{ scope.row.id}} </span>
                </template>
             </el-table-column>
             <el-table-column label="权限端" prop="group_id">
                <template #default="scope">
                    <span style="margin-left: 10px;">{{ scope.row.utype}} </span>
                </template>
             </el-table-column>
             <el-table-column label="权限秒速" prop="spec">
                <template #default="scope">
                    <span style="margin-left: 10px;">{{ scope.row.desc}} </span>
                </template>
             </el-table-column>
             <el-table-column fixed="right" label="操作" width="80">
                            <template #default="scope">
                                <el-popconfirm
                                    title="确定要删除当前项么?" cancel-button-type="info"
                                    @confirm="deleteGroupUser_perms(scope.row)"
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
        </el-dialog>
        <!-- 组权限 -->
        <el-dialog v-model="switch_group_perms" title="用户组权限" width="60%">
            <el-button type="primary" @click="addGroup_permsFun">添加权限</el-button>
            <el-input class="p-tb-10" v-model="from_addGroup_perms.item.perm_ids[0]">
                    <template #prepend>权限ID</template>
            </el-input>
            <el-table  :data="data_tab_group_perms.arr" v-loading="loading_tab">
             <el-table-column label="权限名称" prop="name">
                <template #default="scope">
                    <span style="margin-left: 10px;">{{ scope.row.name}} </span>
                </template>
             </el-table-column>
             <el-table-column label="权限ID" prop="id" width="250px">
                <template #default="scope">
                    <span style="margin-left: 10px;">{{ scope.row.id}} </span>
                </template>
             </el-table-column>
             <el-table-column label="权限端" prop="group_id">
                <template #default="scope">
                    <span style="margin-left: 10px;">{{ scope.row.utype}} </span>
                </template>
             </el-table-column>
             <el-table-column label="权限描述" prop="spec">
                <template #default="scope">
                    <span style="margin-left: 10px;">{{ scope.row.desc}} </span>
                </template>
             </el-table-column>
             <el-table-column fixed="right" label="操作" width="80">
                            <template #default="scope">
                                <el-popconfirm
                                    title="确定要删除当前项么?" cancel-button-type="info"
                                    @confirm="deleteGroup_perms(scope.row)"
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
        </el-dialog>
    </div>
</template>
<script setup>
import {
    APIgetGroupList,
    APIdeleteGroup,
    APIputGroup,
    APIpostGroup,
    APIgetGroupRolesList,
    APIpostGroupRoles,
    APIdeleteGroupRoles,
    APIgetGroupDetails,
    APIgetGroupUser_Roles,
    APIpostGroupUser_Roles,
    APIdeleteGroupUser_Roles,
    APIgetGroupUser_perms,
    APIpostGroupUser_perms,
    APIdeleteGroupUser_perms,
    APIgetGroupPerms,
    APIpostGroupPerms,
    APIdeleteGroupPerms
} from '@/api/custom/custom.js'
import {
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
/* ----------------------------------------------------------------------------------------------------------------------- */
// 数据
// 分类种类
// 列表
let loading_tab = ref(false)
let data_tab = reactive({
    arr: []
})
const data_tab_user_roles=reactive({
    arr:[]
})
const from_addGroupUser_Roles=reactive({
    item:{
        group_id:"",
        user_id:"",
        role_ids:[""]
    }
})
let data_tab_group_perms=reactive({
    arr:[]
})
let from_addGroup_perms=reactive({
    item:{
        perm_ids:[""]
    }
})
let switch_group_perms=ref(false)
// 添加，修改
let switch_examine = ref(false)
let switch_roles=ref(false)
let data_tab_roles=reactive({
    arr:[]
})
let switch_group_roles=ref(false)
let from_examine = reactive({
    item:{
        name:"",
        type:3,
        region_type:0,
        region_val:"",
        region_cc:"",
        group:""
    }
})
let from_addRoles=reactive({
    item:{
        group:"",
        role_ids:[""],
        name:"",

    }
})
let from_addGroupUser_perms=reactive({
    item:{
        perm_ids:[""]
    }
})
let data_tab_user_perms=reactive({
    arr:[]
})
const switch_group_user_perms=ref(false)
const str_title = ref('添加')
const from_error = reactive({
    msg: {}
})
const current_group_perms=reactive({
    item:{}
})
const current_user_perms=reactive({
    item:{}
})
const type_change=(val)=>{
    for(let i=0;i<opts_all.item.toushu_return_type.length;i++){
        if(opts_all.item.toushu_return_type[i].val===val){
                from_examine.item.type=opts_all.item.toushu_return_type[i].key
        }
    }
}
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
//删除组权限
const deleteGroup_perms=(val)=>{
    APIdeleteGroupPerms(current_group_perms.id,{data:{perm_ids:[val.id]}}).then(res=>{
        if(res.status=200){
            ElMessage.success("删除成功")
            switch_group_perms.value=false
        }else{
            ElMessage.error("删除失败")
        }
    })
}
//添加组权限
const addGroup_permsFun=()=>{
    if(from_addGroup_perms.item.perm_ids[0]==""){
        ElMessage.error("请填入数据")
        return
    }
    console.log(from_addGroup_perms.item.perm_ids[0])
    APIpostGroupPerms(current_group_perms.item.id,{perm_ids:[from_addGroup_perms.item.perm_ids[0]]}).then(res=>{
        if(res.status==200){
            ElMessage.success("添加角色成功")
            switch_group_perms.value=false
        }else{
            ElMessage.error("添加失败")
        }
    })
}
//获取组权限
const getGroup_perms=(val)=>{
    current_group_perms.item=val
    APIgetGroupPerms(val.id).then(res=>{
        data_tab_group_perms.arr=res.data
        switch_group_perms.value=true
    })
}
//添加成员权限
const addGroupUser_permsFun=()=>{
    if(from_addGroupUser_perms.item.perm_ids[0]==""){
        ElMessage.error("请填入数据")
        return
    }
    APIpostGroupUser_perms(current_user_perms.item.group_id,current_user_perms.item.user_id,
    {perm_ids:[from_addGroupUser_perms.item.perm_ids[0]]}).then(res=>{
        if(res.status==200){
            ElMessage.success("添加权限成功")
            switch_group_user_perms.value=false
            from_addGroupUser_perms.item.perm_ids[0]=""
        }
    })
}
//删除成员权限
const deleteGroupUser_perms=(val)=>{
    APIdeleteGroupUser_perms(current_user_perms.item.group_id,current_user_perms.item.user_id,{data:{perm_ids:[val.id]}}).then(res=>{
        if(res.status==200){
            switch_group_user_perms.value=false
            ElMessage.success("删除成功")
        }
    })
}
//获取组成员权限
const getGroupUser_permsFun=(val)=>{
    current_user_perms.item=val
    switch_group_user_perms.value=true
    APIgetGroupUser_perms(val.group_id,val.user_id).then(res=>{
        console.log(res)
        data_tab_user_perms.arr=res.data
    })
}
//删除用户组成员角色
const deleteGroupUser_roles=(val)=>{
    APIdeleteGroupUser_Roles(from_addGroupUser_Roles.item.group_id,from_addGroupUser_Roles.item.user_id,{data:{role_ids:[val.id]}}).then(res=>{
        if(res.status===200){
            ElMessage.success("删除角色成功")
            switch_group_roles.value=false
        }else{
            ElMessage.success("删除角色失败")
            switch_group_roles.value=false
        }
    })
}
//用户组成员角色
const groupUserRolesFun=(val)=>{
    switch_group_roles.value=true
    from_addGroupUser_Roles.item.group_id=val.group_id
    from_addGroupUser_Roles.item.user_id=val.user_id
    APIgetGroupUser_Roles(val.group_id,val.user_id).then(res=>{
        console.log(res)
        data_tab_user_roles.arr=res.data
    })
}
const addGroupUser_rolesFun=()=>{
    if(from_addGroupUser_Roles.item.role_ids[0]==""){
        ElMessage.error("请添加角色ID")
        return
    }
    APIpostGroupUser_Roles(from_addGroupUser_Roles.item.group_id,
    from_addGroupUser_Roles.item.user_id,{role_ids:[from_addGroupUser_Roles.item.role_ids[0]]}).then(res=>{
        if(res.status===200){
            switch_group_roles.value=false
            ElMessage.success("添加角色成功")
            from_addGroupUser_Roles.item.role_ids[0]=""
        }else{
            switch_group_roles.value=false
            ElMessage.error("添加角色失败")
        }
    })
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 方法
// 监听类别

// 刷新
const refreshFunc = () => {
    getTabListFunc()
}
// 同意拒绝提交
const dialogExamineCloseFunc = () => {
    from_error.msg = {}
    if (str_title.value == '修改') {
        APIputGroup(from_examine.item.id, from_examine.item).then(res => {
                 if(res.status===200){
                    refreshFunc()
                    ElMessage.success('修改成功')
                    switch_examine.value = false
                }
        }).catch(err => {
            from_error.msg = err.data
        })
    } else {
        APIpostGroup( from_examine.item).then(res => {
                if(res.status===200){
                    refreshFunc()
                    ElMessage.success('添加成功')
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
    APIgetGroupList().then(res => {
            console.log(res)
            loading_tab.value = false
            data_tab.arr = res.data
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteGroup(val.id).then(res => {
        if (res.status === 200) {
            refreshFunc()
            ElMessage.success('删除成功')
        }
    })
}
//用户组角色列表
const getGroupRolesFun=(val)=>{
    switch_roles.value=true
    from_addRoles.item.group=val.id
    loading_tab.value = true
    APIgetGroupRolesList(val.id).then(res=>{
        loading_tab.value = false
        data_tab_roles.arr=res.data
    })
}
//删除用户组角色
const deleteGroup_roles=val=>{
    let params={data:{role_ids:[val.id]}}
    console.log(params)
    APIdeleteGroupRoles(val.group_id,params).then(res=>{
        if(res.status===200){
            ElMessage.success("删除成功")
            switch_roles.value=false
        }
    })
}
//添加用户组角色
const addGroupRoles=()=>{
    console.log(from_addRoles.item.role_ids[0])
    if(from_addRoles.item.role_ids[0]==""){
        ElMessage.error("请输入角色ID")
        return
    }
    APIpostGroupRoles(from_addRoles.item.group,from_addRoles.item.role_ids[0]).then(res=>{
        if(res.status===200){
            ElMessage.success('添加角色成功')

        }
    })
}
// 添加
const addResidentialFunc = val => {
    from_examine.item = {}
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
        APIputGroupUser(from_opt_val.obj.group_id,from_opt_val.obj.user_id,from_opt_val.obj).then(res => {
                if(res.status===200){
                    optValRefreshFunc()
                    ElMessage.success('修改成功')
                    switch_opt_val_add.value = false
                }
        }).catch(err => {
            err_opt.msg = err.data
        })
    } else {
        APIpostGroupUser(item_opt.obj.id, from_opt_val.obj).then(res => {
               if(res.status===200){
                 optValRefreshFunc()
                 ElMessage.success('添加成功')
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
    switch_opt_val_add.value = true
}
// 删除
const optValDeleteFunc = val => {
    console.log(val)
    APIdeleteGroupUser(val.group_id,val.user_id).then(res => {
        if (res.status === 200) {
            optValRefreshFunc()
            ElMessage.success('删除成功')
        }else{
            ElMessage.error("删除失败请重试")
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
           if(res.status===200){
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
getOpts(['status_all','toushu_return_type','group_user_flg','group_user_region_type']).then(res => {
    opts_all.obj = res
    console.log(res)
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
.search-tips {
    color: #aaa;
    font-size: 14px;
    margin-bottom: 20px;
}

</style>
