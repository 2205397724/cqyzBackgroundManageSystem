<template>
    <div class="usergroup">
        <page-main>
            <div class="m-b-20">
                <el-button
                    size="large"
                    type="primary"
                    :icon="Plus"
                    @click="addResidentialFunc"
                >
                    添加用户组
                </el-button>
            </div>
            <div class="search">
                <el-row>
                    <!-- <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="8" class="search_th">
                                用户组名称：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="16">
                                <el-input v-model="data_search.item.name" class="search_tb" placeholder="用户组名称" />
                            </el-col>
                        </el-row>
                    </el-col> -->
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                所在区域：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-cascader
                                    v-model="data_search.item.region_cc"
                                    class="search_tb"
                                    placeholder="区域"
                                    :props="cascader_props"
                                    collapse-tags
                                    collapse-tags-tooltip
                                    :show-all-levels="false"
                                />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                类型：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-select
                                    v-model="data_search.item.type"
                                    placeholder="请选择类型"
                                    class="search_tb"
                                >
                                    <el-option
                                        v-for="item in opts_all.obj.toushu_return_type"
                                        :key="item.key"
                                        :value="item.key"
                                        :label="item.val"
                                    />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="0" :sm="4" :md="3" :lg="2" />
                    <el-col :xs="24" :sm="20" :md="21" :lg="22">
                        <el-button type="primary" :icon="Search" @click="data_searchFun">
                            筛选
                        </el-button>
                        <el-button
                            v-if="data_search.switch == true"
                            class="m-l-20 m-r-10"
                            :icon="Loading"
                            @click="refreshSearch()"
                        >
                            重置
                        </el-button>
                        <span v-show="data_search.switch == true" class="size-base">
                            *搜索到相关结果共{{ data_search.total }}条。
                        </span>
                    </el-col>
                </el-row>
            </div>
            <div
                style="
                                                                                width: 100%;
                                                                                overflow: auto;
                                                                                border: 1px solid #ebeef4;
                                                                                box-sizing: border-box;
"
            >
                <el-table
                    v-loading="loading_tab"
                    :data="data_tab.arr"
                    :header-cell-style="{
                        background: '#fbfbfb',
                        color: '#999999',
                        'font-size': '12px',
                    }"
                    default-expand-all
                    row-key="id"
                    :tree-props="{ children: 'children' }"
                    style="width: 100%; min-height: 300px;"
                >
                    <el-table-column prop="name" label="用户组名称">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="id" label="用户组ID" width="300">
            <template #default="scope">
              <span style="margin-left: 10px">{{ scope.row.id }} </span>
            </template>
          </el-table-column> -->
                    <el-table-column prop="type" label="类型">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{
                                getOptVal(opts_all.obj.toushu_return_type, scope.row.type)
                            }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="成员">
                        <template #default="scope">
                            <el-button
                                type="primary"
                                size="small"
                                style="margin-left: -10px;"
                                @click="optValFunc(scope.row)"
                            >
                                成员
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="权限">
                        <template #default="scope">
                            <el-button
                                size="small"
                                type="warning"
                                style="margin-left: -10px;"
                                @click="getGroup_perms(scope.row)"
                            >
                                权限
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="角色">
                        <template #default="scope">
                            <el-button
                                type="success"
                                size="small"
                                style="margin-left: -10px;"
                                @click="getGroupRolesFun(scope.row)"
                            >
                                角色
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="200">
                        <template #default="scope">
                            <el-button
                                type="primary"
                                size="small"
                                @click="modifyResidentialFunc(scope.row)"
                            >
                                修改
                            </el-button>
                            <el-button size="small" @click="getGroupDetail(scope.row)">
                                详情
                            </el-button>
                            <el-popconfirm
                                title="确定要删除当前项么?"
                                cancel-button-type="info"
                                @confirm="deleteFunc(scope.row)"
                            >
                                <template #reference>
                                    <el-button type="danger" size="small"> 删除 </el-button>
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
                    @current-change="changePageFunc"
                />
            </div>
        </page-main>
        <!-- 修改添加用户组 -->
        <el-dialog v-model="switch_examine" :title="str_title" width="50%">
            <div>
                <el-form
                    ref="ruleFormRef"
                    :model="from_examine.item"
                    label-position="left"
                >
                    <el-row :gutter="10">
                        <el-col :md="24">
                            <el-form-item
                                label="用户组名称"
                                prop="name"
                                label-width="110px"
                                :error="
                                    from_error.msg && from_error.msg.name
                                        ? from_error.msg.name[0]
                                        : ''
                                "
                            >
                                <el-input v-model="from_examine.item.name" placeholder="" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :md="24">
                            <el-form-item label="类型" prop="type" label-width="110px">
                                <el-select
                                    v-model="from_examine.item.type"
                                    @change="type_change"
                                >
                                    <el-option
                                        v-for="item in opts_all.obj.toushu_return_type"
                                        :key="item.key"
                                        :value="item.key"
                                        :label="item.val"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :md="24">
                            <el-form-item
                                label="所在地区"
                                prop="region_val"
                                label-width="110px"
                                :error="
                                    from_error.msg && from_error.msg.name
                                        ? from_error.msg.name[0]
                                        : ''
                                "
                            >
                                <!-- <el-input
                                    v-model="from_examine.item.region_val"
                                    placeholder=""
                                /> -->
                                <div
                                    style="
                                                                                                                                                                width: 100%;
                                                                                                                                                                height: 32px;
                                                                                                                                                                border: 1px solid #dcdfe6;
                                                                                                                                                                border-radius: 4px;
"
                                    @click="click_add_group_zone_id"
                                >
                                    <span v-if="!selectedZone_id" style="margin-left: 11px; color: #c0c4cc;">请选择区域</span>
                                    <span v-else style="margin-left: 11px;">{{ selectedZone_id }}</span>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div
                    style="
                                                                                                display: flex;
                                                                                                justify-content: flex-end;
                                                                                                align-items: center;
                                                                                                width: 100%;
"
                >
                    <el-button @click="switch_examine = false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc(ruleFormRef)">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 添加用户组弹窗中选择区域弹窗 -->
        <el-dialog v-model="switch_choose_zone" title="选择小区">
            <el-scrollbar height="250px">
                <position-tree-fourth
                    :tree_item="tree_item.arr"
                    @checkChangeFunc="checkChangeFunc"
                    @checkFunc="checkFunc"
                />
            </el-scrollbar>
        </el-dialog>
        <!-- 成员 -->
        <!-- 列表 -->
        <el-dialog
            v-model="switch_opt_val"
            :title="`“${item_opt.obj.name}”所有成员`"
            width="70%"
        >
            <el-row :gutter="20" class="bottom-btn-box-2 m-b-20">
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                    <el-button type="primary" :icon="Plus" @click="optValAddFunc">
                        添加成员
                    </el-button>
                </el-col>
            </el-row>
            <el-table
                v-loading="opt_loading"
                :data="opt_tab.arr"
                :header-cell-style="{
                    background: '#fbfbfb',
                    color: '#999999',
                    'font-size': '12px',
                }"
                style="
                                                                                width: 100%;
                                                                                min-height: 300px;
                                                                                margin-bottom: 10px;
                                                                                border: 1px solid #ebeef5;
                                                                                border-radius: 6px;
"
                max-height="400"
            >
                <el-table-column prop="name" label="姓名">
                    <template #default="scope">
                        <span>{{ scope.row.username }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="gender" label="性别">
                    <template #default="scope">
                        <span>{{
                            getOptVal(
                                [
                                    { val: "男", key: "F" },
                                    { val: "女", key: "M" },
                                    { val: "未设置", key: "U" },
                                ],
                                scope.row.gender
                            )
                        }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="电话">
                    <template #default="scope">
                        <span>{{ scope.row.mobile }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="post" label="职位描述">
                    <template #default="scope">
                        <span>{{ scope.row.post }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="角色">
                    <template #default="scope">
                        <el-button
                            type="success"
                            size="small"
                            style="margin-left: -10px;"
                            @click="groupUserRolesFun(scope.row)"
                        >
                            成员角色
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="权限">
                    <template #default="scope">
                        <el-button
                            type="warning"
                            size="small"
                            style="margin-left: -10px;"
                            @click="getGroupUser_perms(scope.row)"
                        >
                            成员权限
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150px" fixed="right">
                    <template #default="scope">
                        <el-button
                            type="primary"
                            size="small"
                            @click="optValModifyFunc(scope.row)"
                        >
                            修改
                        </el-button>
                        <!-- <el-button size="small" @click="getUserDetail(scope.row)">
                            详情
                        </el-button> -->
                        <el-popconfirm
                            title="确定要删除当前项么?"
                            cancel-button-type="info"
                            @confirm="optValDeleteFunc(scope.row)"
                        >
                            <template #reference>
                                <el-button type="danger" size="small"> 删除 </el-button>
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
            @closed="dialogClosed"
        >
            <div>
                <el-form ref="ruleFormRef" :model="from_opt_val.obj" label-width="80px">
                    <el-row :gutter="10">
                        <el-col :sm="24" :md="24" :lg="12">
                            <el-form-item label="用户名" prop="id">
                                <div class="searchUserGroup">
                                    <SearchUser ref="V" v-model:name="username" @checkName="group_user_check_userid" />
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label="职位" prop="flg">
                                <el-select
                                    v-model="from_opt_val.obj.flg"
                                >
                                    <el-option
                                        v-for="item in opts_all.obj.group_user_flg"
                                        :key="item.key"
                                        :value="item.key"
                                        :label="item.val"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label="职位描述" prop="post">
                                <el-input v-model="from_opt_val.obj.post" placeholder="" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div
                    style="
                                                                                                display: flex;
                                                                                                justify-content: flex-end;
                                                                                                align-items: center;
                                                                                                width: 100%;
"
                >
                    <el-button type="primary" @click="dialogOptValFunc">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 角色部分 -->
        <el-dialog v-model="switch_roles" title="角色信息" center width="65%">
            <el-button type="primary" class="m-b-10" :icon="Plus" @click="addGroupRoles">
                添加用户组角色
            </el-button>
            <!-- <el-input v-model="from_addRoles.item.role_ids[0]" class="p-b-10">
                <template #prepend>角色ID集</template>
            </el-input> -->
            <el-table v-loading="loading_tab" :data="data_tab_roles.arr" class="tab_1">
                <el-table-column label="角色名称" prop="name">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="标识" prop="spec">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.spec }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="角色ID" prop="id" width="250px">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.id }} </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="角色所属" prop="group_id" width="250px">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.group_id }} </span>
                    </template>
                </el-table-column> -->

                <el-table-column fixed="right" label="操作" width="80">
                    <template #default="scope">
                        <el-popconfirm
                            title="确定要删除当前项么?"
                            cancel-button-type="info"
                            @confirm="deleteGroup_roles(scope.row)"
                        >
                            <template #reference>
                                <el-button type="danger" size="small"> 删除 </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <!-- 添加用户组角色弹窗 -->
        <el-dialog
            v-model="switch_post_group_role"
            title="添加用户组角色"
            width="50%"
        >
            <div>
                <el-form ref="ruleFormRef" :model="post_group_role.item" label-width="80px">
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label="名称" prop="name">
                                <el-input v-model="post_group_role.item.name" placeholder="" />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label="特有标识" prop="spec">
                                <el-input v-model="post_group_role.item.spec" placeholder="" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div
                    style="
                                                                                                display: flex;
                                                                                                justify-content: flex-end;
                                                                                                align-items: center;
                                                                                                width: 100%;
"
                >
                    <el-button type="primary" @click="post_group_role_submit">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 成员角色部分 -->
        <el-dialog v-model="switch_group_roles" title="成员角色">
            <el-button type="primary" :icon="Plus" @click="addGroupUser_rolesFun">
                添加角色
            </el-button>
            <el-select
                v-model="from_addGroupUser_Roles.item.role_ids[0]"
                placeholder="请选择要赋予的角色"
                class="m-tb-10"
            >
                <el-option
                    v-for="item in data_tab_roles.arr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                />
            </el-select>
            <el-table v-loading="loading_tab" :data="data_tab_user_roles.arr" class="tab_1">
                <el-table-column label="角色名称" prop="name">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="标识" prop="spec">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.spec }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="角色ID" prop="id" width="250px">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.id }} </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="角色所属" prop="group_id" width="250px">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.group_id }} </span>
                    </template>
                </el-table-column> -->

                <el-table-column fixed="right" label="操作" width="80">
                    <template #default="scope">
                        <el-popconfirm
                            title="确定要删除当前项么?"
                            cancel-button-type="info"
                            @confirm="deleteGroupUser_roles(scope.row)"
                        >
                            <template #reference>
                                <el-button type="danger" size="small"> 删除 </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <!-- 组成员权限 -->
        <el-dialog v-model="switch_group_user_perms" title="成员权限">
            <el-tabs>
                <el-tab-pane label="管理端权限">
                    <div v-for="item in all_perms_list_userIngroup.arr" :key="item.id">
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
                </el-tab-pane>
                <el-tab-pane label="物业端权限">
                    <div v-for="item in all_perms_list_userIngroup.arr" :key="item.id">
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
                    <div v-for="item in all_perms_list_userIngroup.arr" :key="item.id">
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
                <el-button type="primary" @click="post_all_group_user_perms">
                    确认
                </el-button>
            </template>
        </el-dialog>
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
        <!-- 用户组成员详情 -->
        <!-- <el-dialog v-model="switch_user_details" title="详情" width="50%">
            <el-scrollbar height="400px">
                <div class="details-box">
                    <div class="item">
                        <div class="left">用户名</div>
                        <div class="right">{{ data_user_detail.item.username }}</div>
                    </div>
                    <div v-if="data_user_detail.item.name" class="item">
                        <div class="left">真实名称</div>
                        <div class="right">{{ data_user_detail.item.name }}</div>
                    </div>
                    <div class="item">
                        <div class="left">性别</div>
                        <div class="right">
                            {{
                                getOptVal(
                                    [
                                        { key: "U", val: "未设置" },
                                        { key: "F", val: "男" },
                                        { key: "M", val: "女" },
                                    ],
                                    data_user_detail.item.gender
                                )
                            }}
                        </div>
                    </div>
                    <div v-if="data_user_detail.item.id_card" class="item">
                        <div class="left">身份证号</div>
                        <div class="right">{{ data_user_detail.item.id_card }}</div>
                    </div>
                    <div class="item">
                        <div class="left">手机号</div>
                        <div class="right">{{ data_user_detail.item.mobile }}</div>
                    </div>
                    <div class="item">
                        <div class="left">职位描述</div>
                        <div class="right">{{ data_user_detail.item.post }}</div>
                    </div>
                    <div class="item">
                        <div class="left">用户ID</div>
                        <div class="right">{{ data_user_detail.item.user_id }}</div>
                    </div>
                    <div class="item">
                        <div class="left">成员所在组</div>
                        <div class="right">{{ data_user_detail.item.group_id }}</div>
                    </div>
                </div>
            </el-scrollbar>
        </el-dialog> -->
        <!-- 用户组详情 -->
        <el-dialog v-model="switch_group_details" title="详情" width="50%">
            <div class="details-box">
                <div class="item">
                    <div class="left">用户组名称</div>
                    <div class="right">{{ data_group_details.item.name }}</div>
                </div>
                <div class="item">
                    <div class="left">所在区域</div>
                    <div class="right">{{ data_group_details.item.region_val_name }}</div>
                </div>
                <div class="item">
                    <div class="left">类型</div>
                    <div class="right">
                        {{
                            getOptVal(
                                opts_all.obj.toushu_return_type,
                                data_group_details.item.type
                            )
                        }}
                    </div>
                </div>

                <div class="item">
                    <div class="left">区域类型</div>
                    <div class="right">{{ getOptVal(opts_all.obj.group_user_region_type,data_group_details.item.region_type) }}</div>
                </div>
                <div class="item">
                    <div class="left">是否启用</div>
                    <div class="right">
                        <el-tag v-if="data_group_details.item.active == 1" type="success" round size="small"> 启用</el-tag>
                        <el-tag v-if="data_group_details.item.active == 0" type="danger" round size="small"> 禁用</el-tag>
                    </div>
                </div>
                <div v-if="data_group_details.item.ref" class="item">
                    <div class="left">关联企业</div>
                    <div class="right">{{ data_group_details.item.ref }}</div>
                </div>
                <!-- <div class="item">
                    <div class="left">最小中国区域代码</div>
                    <div class="right">{{ data_group_details.item.region_cc }}</div>
                </div> -->
                <div class="item">
                    <div class="left">用户组ID</div>
                    <div class="right">{{ data_group_details.item.id }}</div>
                </div>
                <div class="item">
                    <div class="left">创建时间</div>
                    <div class="right">{{ data_group_details.item.created_at }}</div>
                </div>
                <div class="item">
                    <div class="left">更新时间</div>
                    <div class="right">{{ data_group_details.item.updated_at }}</div>
                </div>
            </div>
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
    APIdeleteGroupPerms,
    APIgetUserDetails,
    APIgetPermsList
} from '@/api/custom/custom.js'
import { ref, watch, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { Loading, Search, Plus } from '@element-plus/icons-vue'
/* ----------------------------------------------------------------------------------------------------------------------- */
// 数据
// 分类种类
// 列表
const data_tab_group_perms_selected_gov = reactive({ arr: [] })
const data_tab_group_perms_selected_pm = reactive({ arr: [] })
const data_tab_group_perms_selected_mbr = reactive({ arr: [] })
const switch_group_details = ref(false)
const data_user_detail = reactive({
    item: {}
})
const tab_group_all_perms = reactive({
    arr: []
})
const data_tab_group_perms_selected_gov_boolean = ref(false)
let switch_user_details = ref(false)
let loading_tab = ref(false)
let data_tab = reactive({
    arr: []
})
const data_tab_user_roles = reactive({
    arr: []
})
const from_addGroupUser_Roles = reactive({
    item: {
        group_id: '',
        user_id: '',
        role_ids: ['']
    }
})
let from_addGroup_perms = reactive({
    item: {
        perm_ids: ['']
    }
})
let switch_group_perms = ref(false)
// 添加，修改
let switch_examine = ref(false)
let switch_roles = ref(false)
let data_tab_roles = reactive({
    arr: []
})
let switch_group_roles = ref(false)
let from_examine = reactive({
    item: {
        name: '',
        type: 3,
        region_type: 0,
        region_val: '',
        region_cc: '',
        group: ''
    }
})
// 检索查询板块
const refreshSearch = () => {
    data_search.item = {}
    data_search.switch = false
    APIgetGroupList().then(res => {
        data_tab.arr = res.data
    })
}
const data_search = reactive({
    item: {},
    switch: false,
    total: 50
})

const data_searchFun = () => {
    page.value = 1
    let params = {}
    for (let key in data_search.item) {
        if (data_search.item[key] && key !== 'switch') {
            params[key] = data_search.item[key]
        }
    }
    data_search.switch = true
    console.log(params)
    APIgetGroupList(params).then(res => {
        console.log(res)
        data_tab.arr = res.data
        data_search.total =  res.data.length
    })
}
let from_addRoles = reactive({
    item: {
        group: '',
        role_ids: [''],
        name: ''
    }
})
// 用户组分页板块
const page = ref(1)
const per_page = ref(12)
const total = ref(50)
watch(page, () => {
    getTabListFunc()
})
const next_click_page = val => {
    console.log(val)
}
const changePageFunc = val => {
    console.log(val)
}
let from_addGroupUser_perms = reactive({
    item: {
        perm_ids: ['']
    }
})
let data_tab_user_perms = reactive({
    arr: []
})
const switch_group_user_perms = ref(false)
const str_title = ref('添加用户组')
const from_error = reactive({
    msg: {}
})
const current_group_perms = reactive({
    item: {}
})
const current_user_perms = reactive({
    item: {}
})
const data_group_details = reactive({
    item: {}
})
const all_perms_list = reactive({
    arr: []
})
// 添加用户组全部权限
const post_all_group_perms = () => {
    APIpostGroupPerms(current_group_perms.item.id, {
        perm_ids: [
            ...data_tab_group_perms_selected_gov.arr,
            ...data_tab_group_perms_selected_pm.arr,
            ...data_tab_group_perms_selected_mbr.arr
        ]
    }).then(res => {
        if (res.status == 200) {
            ElMessage.success('添加用户组权限成功')
            switch_group_perms.value = false
        }
    })
}
// 添加用户组成员弹框选择成员
const group_user_check_userid = val => {
    console.log(val)
    from_opt_val.obj.user_id = val.id
}
// 添加用户组全部权限取消弹窗
const group_perms_close = () => {
    data_tab_group_perms_selected_gov.arr.length = 0
    data_tab_group_perms_selected_pm.arr.length = 0
    data_tab_group_perms_selected_mbr.arr.length = 0
}
// 添加用户组成员全部权限
const post_all_group_user_perms = () => {
    APIpostGroupUser_perms(
        current_user_perms.item.group_id,
        current_user_perms.item.user_id,
        {
            perm_ids: [
                ...data_tab_group_perms_selected_gov.arr,
                ...data_tab_group_perms_selected_pm.arr,
                ...data_tab_group_perms_selected_mbr.arr
            ]
        }
    ).then(res => {
        if (res.status == 200) {
            ElMessage.success('修改成员权限成功')
            switch_group_user_perms.value = false
        }
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
const type_change = val => {
    for (let i = 0; i < opts_all.obj.toushu_return_type.length; i++) {
        if (opts_all.obj.toushu_return_type[i].val === val) {
            from_examine.item.type = opts_all.obj.toushu_return_type[i].key
        }
    }
}
// 添加弹出框选择小区
const getChinaName = () => {
    let params = {}
    if (sessionStorage.getItem('groupChinaCode') && sessionStorage.getItem('utype') != 'pt') {
        params = {
            p_code: sessionStorage.getItem('groupChinaCode')
        }
    } else {
        params = {}
    }
    APIgetChinaRegion(params).then(res => {
        for (let i in res.data) {
            if (res.data[i].level < 5) {
                tree_item.value.arr.push({ name: res.data[i].name, type: 'region', next_type: 'region', id: res.data[i].code })
            } else {
                tree_item.value.arr.push({ name: res.data[i].name, type: 'region', next_type: 'zone', id: res.data[i].code })
            }
        }
    })
}
const click_add_group_zone_id = () => {
    switch_choose_zone.value = true
}
const switch_choose_zone = ref(false)
const checkFunc = val => {
    selectedZone_id.value = val.name
    if (val.type == 'region') {
        from_examine.item.region_type = 1
        from_examine.item.region_val = val.china_code || val.id
        from_examine.item.region_cc = val.china_code || val.id
    }
    if ((val.type == 'zone')) {
        from_examine.item.region_type = 2
        from_examine.item.region_val = val.id
        from_examine.item.region_cc = val.china_code
    }
    console.log(val)
}
const checkChangeFunc = val => {
    switch_choose_zone.value = false
}
const selectedZone_id = ref('')
const tree_item = ref({
    arr: []
})
import { APIgetChinaRegion } from '@/api/custom/custom.js'
const cascader_props = {
    multiple: false,
    emitPath: false,
    lazy: true,
    value: 'code',
    label: 'name',
    checkStrictly: true,
    lazyLoad(node, resolve) {
        const { data } = node
        APIgetChinaRegion({ p_code: data.code }).then(res => {
            resolve(res.data)
        })
    }
}
// 用户组详情
const getGroupDetail = val => {
    APIgetGroupDetails(val.id).then(res => {
        if (res.status == 200) {
            if (res.data.type != 7) {
                delete res.data.ref
            }
            data_group_details.item = res.data
            switch_group_details.value = true
        }
    })
}
// 用户组成员详细
// const getUserDetail = val => {
//     APIgetUserDetails(val.user_id).then(res => {
//         if (res.status === 200) {
//             data_user_detail.item = res.data
//             switch_user_details.value = true
//         }
//     })
// }
// 删除组权限
const deleteGroup_perms = val => {
    APIdeleteGroupPerms(current_group_perms.item.id, {
        data: { perm_ids: [val.id] }
    }).then(res => {
        // if (res.status = 200) {
        ElMessage.success('删除成功')
        switch_group_perms.value = false
        // } else {
        // ElMessage.error('删除失败')
        // }
    })
}
// 添加组权限
const addGroup_permsFun = () => {
    if (from_addGroup_perms.item.perm_ids[0] == '') {
        ElMessage.error('请填入数据')
        return
    }
    console.log(from_addGroup_perms.item.perm_ids[0])
    APIpostGroupPerms(current_group_perms.item.id, {
        perm_ids: [from_addGroup_perms.item.perm_ids[0]]
    }).then(res => {
        if (res.status == 200) {
            ElMessage.success('添加角色成功')
            switch_group_perms.value = false
        } else {
            ElMessage.error('添加失败')
        }
    })
}
const all_perms_list_userIngroup = reactive({
    arr: []
})
// 获取组成员权限弹窗
const getGroupUser_perms = val => {
    data_tab_group_perms_selected_gov.arr = []
    data_tab_group_perms_selected_pm.arr = []
    data_tab_group_perms_selected_mbr.arr = []
    console.log(val)
    current_user_perms.item.group_id = val.group_id
    current_user_perms.item.user_id = val.user_id
    switch_group_user_perms.value = true
    APIgetGroupPerms(val.group_id).then(res => {
        all_perms_list_userIngroup.arr = res.data
    })
    APIgetGroupUser_perms(val.group_id, val.user_id).then(res => {
        tab_group_all_perms.arr = res.data

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
    })
}
// 获取组权限弹窗
const getGroup_perms = val => {
    current_group_perms.item = val
    APIgetPermsList().then(res => {
        all_perms_list.arr = res.data
    })
    APIgetGroupPerms(val.id).then(res => {
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
// 添加成员权限
// const addGroupUser_permsFun=()=>{
//     if(from_addGroupUser_perms.item.perm_ids[0]==""){
//         ElMessage.error("请填入数据")
//         return
//     }
//     APIpostGroupUser_perms(current_user_perms.item.group_id,current_user_perms.item.user_id,
//     {perm_ids:[from_addGroupUser_perms.item.perm_ids[0]]}).then(res=>{
//         if(res.status==200){
//             ElMessage.success("添加权限成功")
//             switch_group_user_perms.value=false
//             from_addGroupUser_perms.item.perm_ids[0]=""
//         }
//     })
// }
// 删除成员权限
const deleteGroupUser_perms = val => {
    APIdeleteGroupUser_perms(
        current_user_perms.item.group_id,
        current_user_perms.item.user_id,
        { data: { perm_ids: [val.id] } }
    ).then(res => {
        if (res.status == 200) {
            switch_group_user_perms.value = false
            ElMessage.success('删除成功')
        }
    })
}
// 获取组成员权限
const getGroupUser_permsFun = val => {
    current_user_perms.item = val
    switch_group_user_perms.value = true
    APIgetGroupUser_perms(val.group_id, val.user_id).then(res => {
        console.log(res)
        data_tab_user_perms.arr = res.data
    })
}
// 删除用户组成员角色
const deleteGroupUser_roles = val => {
    APIdeleteGroupUser_Roles(
        from_addGroupUser_Roles.item.group_id,
        from_addGroupUser_Roles.item.user_id,
        { data: { role_ids: [val.id] } }
    ).then(res => {
        if (res.status === 200) {
            ElMessage.success('删除角色成功')
            switch_group_roles.value = false
        } else {
            ElMessage.success('删除角色失败')
            switch_group_roles.value = false
        }
    })
}
// 用户组成员角色
const groupUserRolesFun = val => {
    switch_group_roles.value = true
    from_addGroupUser_Roles.item.group_id = val.group_id
    from_addGroupUser_Roles.item.user_id = val.user_id
    APIgetGroupRolesList(val.group_id).then(res => {
        data_tab_roles.arr = res.data
    })
    APIgetGroupUser_Roles(val.group_id, val.user_id).then(res => {
        console.log(res)
        data_tab_user_roles.arr = res.data
    })
}
const addGroupUser_rolesFun = () => {
    if (from_addGroupUser_Roles.item.role_ids[0] == '') {
        ElMessage.error('请添加角色ID')
        return
    }
    APIpostGroupUser_Roles(
        from_addGroupUser_Roles.item.group_id,
        from_addGroupUser_Roles.item.user_id,
        { role_ids: [from_addGroupUser_Roles.item.role_ids[0]] }
    ).then(res => {
        if (res.status === 200) {
            switch_group_roles.value = false
            ElMessage.success('添加角色成功')
            from_addGroupUser_Roles.item.role_ids[0] = ''
        } else {
            switch_group_roles.value = false
            ElMessage.error('添加角色失败')
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
    if (from_examine.item.type != 7) {
        delete from_examine.item.ref
    }
    if (str_title.value == '修改用户组') {

        APIputGroup(from_examine.item.id, from_examine.item)
            .then(res => {
                if (res.status === 200) {
                    refreshFunc()
                    ElMessage.success('修改成功')
                    switch_examine.value = false
                }
            })
            .catch(err => {
                from_error.msg = err.data
            })
    } else {
        // from_examine.item.ref = '62ea126a6940af756a3075a1'
        APIpostGroup(from_examine.item)
            .then(res => {
                if (res.status === 200) {
                    refreshFunc()
                    ElMessage.success('添加成功')
                    switch_examine.value = false
                }
            })
            .catch(err => {
                from_error.msg = err.data
            })
    }
}
const flag = ref(false)
// 获取列表api请求
const getTabListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    if (data_search.item) {
        for (let i in data_search.item) {
            params[i] = data_search.item[i]
        }
    }
    console.log(params)
    loading_tab.value = true
    APIgetGroupList(params).then(res => {
        console.log(res)
        loading_tab.value = false
        data_tab.arr = res.data
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
// 删除
const deleteFunc = val => {
    console.log(val)
    APIdeleteGroup(val.id).then(res => {
        if (res.status === 200) {
            refreshFunc()
            ElMessage.success('删除成功')
        }
    })
}
// 用户组角色列表
const getGroupRolesFun = val => {
    switch_roles.value = true
    from_addRoles.item.group = val.id
    loading_tab.value = true
    APIgetGroupRolesList(val.id).then(res => {
        loading_tab.value = false
        data_tab_roles.arr = res.data
    })
}
// 删除用户组角色
const deleteGroup_roles = val => {
    let params = { data: { role_ids: [val.id] } }
    console.log(params)
    APIdeleteGroupRoles(val.group_id, params).then(res => {
        if (res.status === 200) {
            ElMessage.success('删除成功')
            switch_roles.value = false
        }
    })
}
// 添加用户组角色
import { APIpostRoles } from '@/api/custom/custom'
const switch_post_group_role = ref(false)
const post_group_role = reactive({
    item: {
        name: '',
        spec: ''
    }
})
const post_group_role_submit = async() => {
    let res = await APIpostRoles(post_group_role.item)
    APIpostGroupRoles(from_addRoles.item.group, { role_ids: [res.data.id] }).then(res => {
        if (res.status == 200) {
            ElMessage.success('添加成功')
            switch_post_group_role.value = false
            switch_roles.value = false
            post_group_role.item.name = ''
            post_group_role.item.spec = ''
        }
    })
}
const addGroupRoles = () => {
    switch_post_group_role.value = true
    // console.log(from_addRoles.item.role_ids[0])
    // if (from_addRoles.item.role_ids[0] == '') {
    //     ElMessage.error('请输入角色ID')
    //     return
    // }
    // APIpostGroupRoles(
    //     from_addRoles.item.group,
    //     from_addRoles.item
    // ).then(res => {
    //     if (res.status === 200) {
    //         ElMessage.success('添加角色成功')
    //     }
    // })
}
// 添加用户组
const addResidentialFunc = val => {
    selectedZone_id.value = ''
    from_examine.item = {}
    from_error.msg = {}
    str_title.value = '添加用户组'
    switch_examine.value = true
    getChinaName()
}
// 修改用户组
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改用户组'
    from_examine.item = {
        ...val
    }
    selectedZone_id.value = from_examine.item.region_val_name
    switch_examine.value = true
    getChinaName()
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
        APIputGroupUser(
            from_opt_val.obj.group_id,
            from_opt_val.obj.user_id,
            from_opt_val.obj
        )
            .then(res => {
                if (res.status === 200) {
                    optValRefreshFunc()
                    ElMessage.success('修改成功')
                    switch_opt_val_add.value = false
                }
            })
            .catch(err => {
                err_opt.msg = err.data
            })
    } else {
        APIpostGroupUser(item_opt.obj.id, from_opt_val.obj)
            .then(res => {
                if (res.status === 200) {
                    optValRefreshFunc()
                    ElMessage.success('添加成功')
                    switch_opt_val_add.value = false
                }
            })
            .catch(err => {
                err_opt.msg = err.data
            })
    }
}
const V = ref(null)
// 关闭谈话框
const dialogClosed = () => {
    V.value.clearFunc()
    username.value = ''
}
// 添加
const optValAddFunc = () => {
    err_opt.msg = {}
    hide_uid.value = false
    str_opt_val_title.value = '添加'
    from_opt_val.obj = {}
    switch_opt_val_add.value = true
}
// 修改
const username = ref('')
const optValModifyFunc = val => {
    err_opt.msg = {}
    str_opt_val_title.value = '修改'
    hide_uid.value = true
    from_opt_val.obj = {
        ...val
    }
    username.value = from_opt_val.obj.username
    switch_opt_val_add.value = true
}
// 删除
const optValDeleteFunc = val => {
    console.log(val)
    APIdeleteGroupUser(val.group_id, val.user_id).then(res => {
        if (res.status === 200) {
            optValRefreshFunc()
            ElMessage.success('删除成功')
        } else {
            ElMessage.error('删除失败请重试')
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
    APIgetGroupUserList(item_opt.obj.id)
        .then(res => {
            if (res.status === 200) {
                opt_loading.value = false
                opt_tab.arr = res.data
            }
        })
        .catch(err => {
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
getOpts([
    'status_all',
    'toushu_return_type',
    'group_user_flg',
    'group_user_region_type',
    'gender'
]).then(res => {
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
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
</style>
