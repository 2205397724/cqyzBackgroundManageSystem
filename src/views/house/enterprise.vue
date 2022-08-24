<template>
    <div class="keep-on-record">
        <page-main>
            <div>
                <el-button
                    class="head-btn" type="primary" :icon="Plus"
                    @click="addResidentialFunc"
                >
                    添加企业
                </el-button>
            </div>
            <div class="search">
                <div class="m-t-10">
                    <el-row :gutter="10">
                        <el-col :xs="24" :md="12" :lg="8">
                            <div class="searchBox">
                                <div class="search_th">
                                    关键字：
                                </div>
                                <el-input v-model="search_str.obj.keyword" class="search_tb" placeholder="" clearable />
                            </div>
                        </el-col>
                        <el-col :xs="24" :md="12" :lg="8">
                            <div class="searchBox">
                                <div class="search_th">用户名：</div>
                                <div class="search_tb">
                                    <div class="searchUserGroup">
                                        <SearchUser ref="V" @checkName="checkUsersNameFunc" />
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="m-t-20">
                        <el-col :xs="24" :md="24" :lg="24">
                            <div class="flx">
                                <el-button style="margin-left: 110px;" type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                                <div v-show="switch_search" class="m-l-20 size-base">
                                    <el-button class="m-r-10" @click="refreshFunc_1">重置</el-button>
                                    <div class="searchDetail">
                                        *搜索到相关结果共{{ total }}条。
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <el-table
                :data="from_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                class="tab_1"
            >
                <el-table-column prop="logo_1" label="企业图标" width="140">
                    <template #default="scope">
                        <span class="m-l-10">
                            <el-image :src="scope.row.logo_1" alt="" style="width: 25px;" /></span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="企业名称" />
                <el-table-column prop="user_id" label="用户名">
                    <template #default="scope">
                        <span class="m-l-10">{{ getNameFunc(userData.arr,scope.row.user_id) }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="social_code" label="社会信用代码" width="140">
                    <template #default="scope">
                        <span class="m-l-10">{{ scope.row.social_code }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="企业类型">
                    <template #default="scope">
                        <span class="m-l-10">{{ getOptVal(opts_all.obj.enterprise_type,scope.row.type) }}
                        </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="legal" label="法人" width="140">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.legal }} </span>
                    </template>
                </el-table-column> -->
                <el-table-column prop="contact" label="联系方式" width="140">
                    <template #default="scope">
                        <span class="m-l-10">{{ scope.row.contact }} </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="desc" label="简介" width="140">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.desc }} </span>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column /> -->
                <el-table-column fixed="right" label="操作" width="300">
                    <template #default="scope">
                        <el-button
                            type="primary" size="small"
                            @click="applyFunc(scope.row)"
                        >
                            企业申请
                        </el-button>
                        <el-button
                            type="primary" size="small"
                            @click="modifyFunc(scope.row)"
                        >
                            修改
                        </el-button>
                        <el-button
                            size="small"
                            @click="detailsFunc(scope.row)"
                        >
                            详情
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
            <el-pagination
                v-model:current-page="page"
                layout="total,prev,pager,next,jumper,"
                :total="total"
                :page-size="per_page"
                background
                hide-on-single-page
                class="p-t-20"
            />
        </page-main>
        <!-- 修改添加 -->
        <el-dialog
            v-model="switch_add"
            :title="str_title"
            width="50%"
            @closed="add_dialog_close"
        >
            <div>
                <el-form
                    :model="from_add.obj"
                >
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="用户名"
                                label-width="120px"
                                :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                            >
                                <div class="wh_100">
                                    <div class="searchUserGroup">
                                        <SearchUser ref="V_1" v-model:name="userNames" @checkName="checkUsersNameFunc" />
                                    </div>
                                </div>
                                <!-- <el-input
                                    v-model="from_add.obj.logo"
                                    placeholder=""
                                /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="公司名称"
                                label-width="120px"
                                :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                            >
                                <el-input
                                    v-model="from_add.obj.name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="社会信用代码"
                                label-width="120px"
                                :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                            >
                                <el-input
                                    v-model="from_add.obj.social_code"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="公司类型"
                                label-width="120px"
                                :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                            >
                                <el-select v-model="from_add.obj.type" class="head-btn search_tb" placeholder="审核状态" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.enterprise_type" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="联系方式"
                                label-width="120px"
                                :error="err_add.obj&&err_add.obj.contact?err_add.obj.contact[0]:''"
                            >
                                <el-input
                                    v-model="from_add.obj.contact"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label="企业图标"
                                label-width="120px"
                                :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                            >
                                <el-upload
                                    action="***"
                                    :auto-upload="false"
                                    :file-list="file_list"
                                    :on-change="(file,files)=>{
                                        file_list = files
                                    }"
                                    :on-remove="(file,files)=>{
                                        file_list = files
                                    }"
                                >
                                    <el-button type="primary" :disabled="logo.arr.length == 1&&file_list.length == 1? true:false">选择图标</el-button>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="法人"
                                label-width="120px"
                                :error="err_add.obj&&err_add.obj.contact?err_add.obj.contact[0]:''"
                            >
                                <el-input
                                    v-model="from_add.obj.legal"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col> -->
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label="简介"
                                label-width="120px"
                                :error="err_add.obj&&err_add.obj.desc?err_add.obj.desc[0]:''"
                            >
                                <el-input
                                    v-model="from_add.obj.desc"
                                    :autosize="{ minRows: 4, maxRows: 6 }"
                                    type="textarea"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div class="footer">
                    <el-button @click="switch_add=false">取消</el-button>
                    <el-button type="primary" @click="postFunc">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog
            v-model="switch_details"
            title="详情"
            width="70%"
        >
            <el-tabs model-value="1" @tab-click="handleClick">
                <el-tab-pane label="企业成员" name="1">
                    <el-scrollbar height="400px">
                        <div>
                            <el-button
                                class="head-btn" type="primary" :icon="Plus"
                                @click="addUserGroupFunc"
                            >
                                添加用户组
                            </el-button>
                        </div>
                        <!-- <div class="search">
                            <el-row :gutter="10">
                                <el-col :xs="24" :md="12" :lg="8">
                                    <div class="searchBox">
                                        <div class="search_th">
                                            用户组名称：
                                        </div>
                                        <el-input v-model="data_search.item.name" class="search_tb" placeholder="" clearable />
                                    </div>
                                </el-col>
                                <el-col :xs="24" :md="12" :lg="8">
                                    <div class="searchBox">
                                        <div class="search_th">用户组类型：</div>
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
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row class="m-t-20">
                                <el-col :xs="12" :md="12" :lg="10">
                                    <div class="flx">
                                        <div class="w_30%">
                                            <el-button class="m-l-20" type="primary" :icon="Search" @click="searchFunc_1">筛选</el-button>
                                        </div>
                                        <div v-show="switch_search_1" class="w_70% m-l-30">
                                            <el-button class="m-r-10" @click="refreshFunc_2">重置</el-button>
                                            *搜索到相关结果共{{ total_1 }}条。
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div> -->
                        <div>
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
                                <el-table-column prop="name" label="用户组名称" width="180">
                                    <template #default="scope">
                                        <span style="margin-left: 10px;">{{ scope.row.name }} </span>
                                    </template>
                                </el-table-column>
                                <!-- <el-table-column prop="id" label="用户组ID" width="300">
            <template #default="scope">
              <span style="margin-left: 10px">{{ scope.row.id }} </span>
            </template>
          </el-table-column> -->
                                <el-table-column prop="type" label="类型" width="180">
                                    <template #default="scope">
                                        <span style="margin-left: 10px;">{{
                                            getOptVal(opts_all.obj.toushu_return_type, scope.row.type)
                                        }}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="type" label="所在区域" width="180">
                                    <template #default="scope">
                                        <span style="margin-left: 10px;">{{ scope.row.region_cc }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="成员" width="180">
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
                                <el-table-column />
                                <el-table-column fixed="right" label="操作" width="320" style="z-index: 1;">
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
                                            @confirm="deleteFunc_1(scope.row)"
                                        >
                                            <template #reference>
                                                <el-button type="danger" size="small"> 删除 </el-button>
                                            </template>
                                        </el-popconfirm>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="企业信息" name="2">
                    <div class="details-box">
                        <div class="item">
                            <div class="left">图标</div>
                            <div class="right">
                                <el-image :src="VITE_APP_FOLDER_SRC+details_item.obj.logo" alt="" style="width: 40px;" />
                            </div>
                        </div>
                        <div class="item">
                            <div class="left">企业名称</div>
                            <div class="right">{{ details_item.obj.name }} </div>
                        </div>
                        <div class="item">
                            <div class="left">企业ID</div>
                            <div class="right">{{ details_item.obj.id }} </div>
                        </div>
                        <div class="item">
                            <div class="left">用户名</div>
                            <div class="right">{{ getNameFunc(userData.arr,details_item.obj.user_id) }} </div>
                        </div>
                        <div class="item">
                            <div class="left">社会责任代码</div>
                            <div class="right">{{ details_item.obj.social_code }} </div>
                        </div>
                        <div class="item">
                            <div class="left">类型</div>
                            <div class="right">{{ getOptVal(opts_all.obj.enterprise_type,details_item.obj.type) }} </div>
                        </div>
                        <div class="item">
                            <div class="left">联系方式</div>
                            <div class="right">{{ details_item.obj.contact }} </div>
                        </div>
                        <div class="item">
                            <div class="left">简介</div>
                            <div class="right">{{ details_item.obj.desc }} </div>
                        </div>
                        <!-- <div class="item">
                    <div class="left">extra</div>
                    <div class="right">{{ details_item.obj.extra }} </div>
                </div> -->
                        <div class="item">
                            <div class="left">创建时间</div>
                            <div class="right">{{ details_item.obj.created_at }} </div>
                        </div>
                        <div class="item">
                            <div class="left">更新时间</div>
                            <div class="right">{{ details_item.obj.updated_at }} </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog
            v-model="switch_replay"
            title="企业申请列表"
            width="70%"
        >
            <el-table
                :data="data_applyList.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                class="tab_1"
            >
                <el-table-column prop="name" label="企业名称" />
                <el-table-column prop="user_id" label="用户名">
                    <template #default="scope">
                        <span v-if="getNameFunc(userData.arr,scope.row.user_id)" class="m-l-10">{{ getNameFunc(userData.arr,scope.row.user_id) }} </span>
                        <span class="m-l-10" else>{{ scope.row.user_id }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="企业类型">
                    <template #default="scope">
                        <span class="m-l-10">{{ getOptVal(opts_all.obj.enterprise_type,scope.row.type) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="处理状态">
                    <template #default="scope">
                        <el-tag v-if="scope.row.process_status == 10" type="warning" round effect="dark">{{ getOptVal(opts_all.obj.enterpriseStatus,scope.row.process_status) }}</el-tag>
                        <el-tag v-if="scope.row.process_status == 15" type="primary" round effect="dark">{{ getOptVal(opts_all.obj.enterpriseStatus,scope.row.process_status) }}</el-tag>
                        <el-tag v-if="scope.row.process_status == 20" type="success" round effect="dark">{{ getOptVal(opts_all.obj.enterpriseStatus,scope.row.process_status) }}</el-tag>
                        <el-tag v-if="scope.row.process_status == 30" type="danger" round effect="dark">{{ getOptVal(opts_all.obj.enterpriseStatus,scope.row.process_status) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template #default="scope">
                        <el-button
                            type="primary" size="small"
                            :disabled="scope.row.status == 20 || scope.row.status == 30 ? false : true"
                            @click="examineFunc(scope.row)"
                        >
                            审核
                        </el-button>
                        <el-button
                            size="small"
                            @click="detailsFunc_1(scope.row)"
                        >
                            详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_replay = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 申请详情 -->
        <el-dialog
            v-model="switch_details_1"
            title="申请详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">企业名称</div>
                    <div class="right">{{ apply_details.obj.name }} </div>
                </div>
                <div class="item">
                    <div class="left">用户名</div>
                    <div v-if="getNameFunc(userData.arr,apply_details.obj.user_id)" class="right">{{ getNameFunc(userData.arr,apply_details.obj.user_id) }} </div>
                    <div class="right" else>{{ apply_details.obj.user_id }} </div>
                </div>
                <div class="item">
                    <div class="left">企业类型</div>
                    <div class="right">{{ getOptVal(opts_all.obj.enterprise_type,apply_details.obj.type) }} </div>
                </div>
                <div class="item">
                    <div class="left">处理状态</div>
                    <div class="right">
                        <el-tag v-if="apply_details.obj.process_status == 10" type="warning" round effect="dark">{{ getOptVal(opts_all.obj.enterpriseStatus,apply_details.obj.process_status) }}</el-tag>
                        <el-tag v-if="apply_details.obj.process_status == 15" type="primary" round effect="dark">{{ getOptVal(opts_all.obj.enterpriseStatus,apply_details.obj.process_status) }}</el-tag>
                        <el-tag v-if="apply_details.obj.process_status == 20" type="success" round effect="dark">{{ getOptVal(opts_all.obj.enterpriseStatus,apply_details.obj.process_status) }}</el-tag>
                        <el-tag v-if="apply_details.obj.process_status == 30" type="danger" round effect="dark">{{ getOptVal(opts_all.obj.enterpriseStatus,apply_details.obj.process_status) }}</el-tag>
                    </div>
                </div>
                <!-- <div class="item">
                    <div class="left">图标</div>
                    <div class="right">
                        <img :src="apply_details.obj.logo" alt="" style="width: 40px;">
                    </div>
                </div> -->
                <!-- <div class="item">
                    <div class="left">法人</div>
                    <div class="right">{{ details_item.obj.legal }} </div>
                </div> -->
                <div class="item">
                    <div class="left">申请时间</div>
                    <div class="right">{{ apply_details.obj.created_at }} </div>
                </div>
                <div v-if="apply_details.obj.reply" class="item">
                    <div class="left">回复内容</div>
                    <div class="right">{{ apply_details.obj.reply }} </div>
                </div>
                <div style="border: 1px solid #ccc;">
                    相关信息
                    <div class="item">
                        <div class="left">申请人</div>
                        <div class="right">{{ apply_details.obj.content.legal }} </div>
                    </div>
                    <div class="item">
                        <div class="left">申请地址</div>
                        <div class="right">{{ apply_details.obj.content.com_addr }} </div>
                    </div>
                    <div class="item">
                        <div class="left">营业执照</div>
                        <div class="right">
                            <img :src="apply_details.obj.content.biz_lic" alt="" style="width: 120px;">
                        </div>
                    </div>
                    <div class="item">
                        <div class="left">社会信用代码</div>
                        <div class="right">{{ apply_details.obj.content.social_code }} </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details_1 = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 审核  -->
        <el-dialog
            v-model="switch_examine_1"
            title="审核申请"
            width="40%"
        >
            <div>
                <el-form
                    :model="from_add.obj"
                >
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="审核状态"
                                label-width="80px"
                                :error="err_add.obj&&err_add.obj.contact?err_add.obj.contact[0]:''"
                            >
                                <el-select v-model="examine_item.obj.process_status" class="head-btn" placeholder="" clearable>
                                    <el-option v-for="item in opts_all.obj.examine_status" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label="回复"
                                label-width="80px"
                            >
                                <el-input
                                    v-model="examine_item.obj.reply"
                                    :autosize="{ minRows: 4, maxRows: 6 }"
                                    type="textarea"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div class="footer">
                    <el-button @click="switch_examine_1=false">取消</el-button>
                    <el-button type="primary" @click="postFunc_2">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 企业成员添加修改 -->
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
                                    <span v-if="!selectedZone_id" style="margin-left: 11px; color: #ccc;">请选择区域</span>
                                    <span style="margin-left: 11px;">{{ selectedZone_id }}</span>
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
        <!-- 用户组详情 -->
        <el-dialog v-model="switch_group_details" title="详情" width="50%">
            <div class="details-box">
                <div class="item">
                    <div class="left">用户组名称</div>
                    <div class="right">{{ data_group_details.item.name }}</div>
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
                    <div class="left">关联</div>
                    <div class="right">{{ data_group_details.item.ref }}</div>
                </div>
                <div class="item">
                    <div class="left">区域类型</div>
                    <div class="right">{{ getOptVal(opts_all.obj.group_user_region_type,data_group_details.item.region_type) }}</div>
                </div>
                <div class="item">
                    <div class="left">所在区域</div>
                    <div class="right">{{ data_group_details.item.region_cc }}</div>
                </div>
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
        <!-- 添加用户组弹窗中选择区域弹窗 -->
        <el-dialog v-model="switch_choose_zone" title="选择小区">
            <el-scrollbar height="250px">
                <position-tree-fourth
                    :tree_item="tree_item"
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
            <el-row :gutter="20" class="bottom-btn-box-2">
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                    <el-button class="head-btn" type="primary" @click="optValAddFunc">
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
                <el-table-column prop="name" label="姓名" width="80">
                    <template #default="scope">
                        <span>{{ scope.row.username }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="gender" label="性别" width="150">
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
                <el-table-column prop="mobile" label="电话" width="130">
                    <template #default="scope">
                        <span>{{ scope.row.mobile }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="post" label="职位" width="100">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.group_user_flg,scope.row.flg) }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="post" label="职位描述">
                    <template #default="scope">
                        <span>{{ scope.row.post }} </span>
                    </template>
                </el-table-column>
                <el-table-column />
                <el-table-column label="操作" width="200px" fixed="right">
                    <template #default="scope">
                        <el-button
                            type="primary"
                            size="small"
                            @click="optValModifyFunc(scope.row)"
                        >
                            修改
                        </el-button>
                        <el-button size="small" @click="getUserDetail(scope.row)">
                            详情
                        </el-button>
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
            @closed="userNumbersClosed"
        >
            <div>
                <el-form ref="ruleFormRef" :model="from_opt_val.obj" label-width="80px">
                    <el-row :gutter="10">
                        <el-col v-if="str_opt_val_title == '添加'" :sm="24" :md="24" :lg="12">
                            <el-form-item label="用户ID" prop="id">
                                <div class="searchUserGroup">
                                    <SearchUser ref="V_1" @checkName="checkUsersNameFunc_1" />
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label="职位" prop="flg">
                                <el-select
                                    v-model="from_opt_val.obj.flg"
                                    @change="type_change"
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
        <!-- 用户组成员详情 -->
        <el-dialog v-model="switch_user_details" title="详情" width="50%">
            <el-scrollbar height="400px">
                <div class="details-box">
                    <div v-if="data_user_detail.item.username" class="item">
                        <div class="left">用户名</div>
                        <div class="right">{{ data_user_detail.item.username }}</div>
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
                    <div v-if="data_user_detail.item.id_card " class="item">
                        <div class="left">身份证号</div>
                        <div class="right">{{ data_user_detail.item.id_card }}</div>
                    </div>
                    <div class="item">
                        <div class="left">手机号</div>
                        <div class="right">{{ data_user_detail.item.mobile }}</div>
                    </div>
                    <div class="item">
                        <div class="left">职位</div>
                        <div class="right">{{ getOptVal(opts_all.obj.group_user_flg,data_user_detail.item.flg) }}</div>
                    </div>
                    <div class="item">
                        <div class="left">职位描述</div>
                        <div class="right">{{ data_user_detail.item.post }}</div>
                    </div>
                    <div class="item">
                        <div class="left">成员所在组</div>
                        <div class="right">{{ getUserGroupNameFunc(data_tab.arr,data_user_detail.item.group_id) }}</div>
                    </div>
                    <div class="item">
                        <div class="left">用户ID</div>
                        <div class="right">{{ data_user_detail.item.user_id }}</div>
                    </div>
                </div>
            </el-scrollbar>
        </el-dialog>
    </div>
</template>
<script setup>
import Cascaders from '@/components/Cascaders/index.vue'
import { reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
const search_str = reactive({
    obj: {}
})
const switch_search = ref(false)
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(1)
watch(page, () => {
    getTabListFunc()
})
const searchFunc = () => {
    switch_search.value = true
    getTabListFunc()
}
const refreshFunc = () => {
    search_str.obj = {}
    switch_search.value = false
    getTabListFunc()
}
const V = ref(null)
const refreshFunc_1 = () => {
    V.value.clearFunc()
    refreshFunc()
}
const from_tab = reactive({
    arr: []
})
const file_list = ref([])
import { getFilesKeys } from '@/util/files.js'
import {
    APIgetEnterpriseList,
    APIgetEnterpriseDetails,
    APIdeleteEnterprise,
    APIputEnterprise,
    APIpostEnterprise
} from '@/api/custom/custom.js'
const VITE_APP_FOLDER_SRC = ref(import.meta.env.VITE_APP_FOLDER_SRC)
// 获取列表
const loading_tab = ref(false)
const getTabListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    for (let key in search_str.obj) {
        if (search_str.obj[key] || search_str.obj[key] === 0) {
            if (search_str.obj[key] instanceof Array && search_str.obj[key].length <= 0) {
                continue
            }
            params[key] = search_str.obj[key]
        }
    }
    loading_tab.value = true
    APIgetEnterpriseList(params).then(res => {
        if (res.status === 200) {
            console.log(res)
            loading_tab.value = false
            from_tab.arr = res.data
            total.value = res.data.length
            for (let i in res.data) {
                res.data[i].logo_1 = ''
                res.data[i].logo_1 = VITE_APP_FOLDER_SRC.value + res.data[i].logo
            }
        }
    })
}

const switch_add = ref(false)
const str_title = ref('添加')
const from_add = reactive({
    obj: {}
})
const err_add = reactive({
    obj: {}
})
const checkUsersNameFunc = val => {
    console.log(val)
    search_str.obj.user_id = val.id
    from_add.obj.user_id = val.id
    // from_opt_val.obj.user_id = val.id
}

// // 添加
// const addFunc = () => {
//     from_add.obj = {}
//     err_add.obj = {}
//     str_title.value = '添加'
//     switch_add.value = true
// }
// 添加
const addResidentialFunc = () => {
    from_add.obj = {}
    err_add.obj = {}
    str_title.value = '添加'
    switch_add.value = true
    file_list.value = []
    logo.arr = []
}
const logo = reactive({
    arr: []
})
const modifyFunc = val => {
    logo.arr = []
    APIgetEnterpriseDetails(val.id).then(res => {
        from_add.obj = res.data
        // file_list.value = res.data.logo
        userNames.value = getNameFunc(userData.arr, from_add.obj.user_id)
        logo.arr.push(res.data.logo)
        let arr = []
        for (let i in logo.arr) {
            if (logo.arr[i]) {
                arr.push({
                    name: logo.arr[i]
                })
            }
        }
        file_list.value = arr
    })
    err_add.obj = {}
    str_title.value = '修改'
    switch_add.value = true
}
const switch_details = ref(false)
const details_item = reactive({
    obj: {}
})
const data_tab = reactive({
    arr: []
})
import {
    APIgetGroupList,
    APIputGroup,
    APIpostGroup,
    APIgetGroupDetails,
    APIdeleteGroup
} from '@/api/custom/custom.js'
const data_search = reactive({
    item: {}
})
const total_1 = ref(0)
const switch_examine = ref(false)
const from_examine = reactive({
    item: {}
})
// 详情
const detailsFunc = val => {
    APIgetEnterpriseDetails(val.id).then(res => {
        // res.data.logo = import.meta.env.VITE_APP_FOLDER_SRC + res.data.lofo
        details_item.obj = res.data
        switch_details.value = true
        console.log(res.data)
    })
    getUsergroupList()
}
const getUsergroupList = () => {
    let params = {
        page: page.value,
        per_page: per_page.value,
        type: 7,
        ref: details_item.obj.id
    }
    for (let key in data_search.item) {
        if (data_search.item[key] && key !== 'switch') {
            params[key] = data_search.item[key]
        }
    }
    APIgetGroupList(params).then(res => {
        console.log(res)
        data_tab.arr = res.data
        total_1.value = res.data.length
    })
}
const getUserGroupNameFunc = (arr, key) => {
    for (let i in arr) {
        if (arr[i].id == key) {
            return arr[i].name
        }
    }
    return ''
}
const deleteFunc = val => {
    APIdeleteEnterprise(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
// 删除
const deleteFunc_1 = val => {
    console.log(val)
    APIdeleteGroup(val.id).then(res => {
        if (res.status === 200) {
            getUsergroupList()
            ElMessage.success('删除成功')
        }
    })
}
// 企业成员添加
const addUserGroupFunc = val => {
    from_examine.item = {}
    str_title.value = '添加用户组'
    from_examine.item.type = 7
    from_examine.item.region_val = ''
    switch_examine.value = true
}
// 企业成员修改
const modifyResidentialFunc = val => {
    str_title.value = '修改用户组'
    from_examine.item = {
        ...val
    }
    switch_examine.value = true
}
// 同意拒绝提交
const dialogExamineCloseFunc = () => {
    from_examine.item.ref = details_item.obj.id
    if (str_title.value == '修改用户组') {
        APIputGroup(from_examine.item.id, from_examine.item)
            .then(res => {
                if (res.status === 200) {
                    getUsergroupList()
                    ElMessage.success('修改成功')
                    switch_examine.value = false
                }
            })
            .catch(err => {
                ElMessage.error('修改失败')
            })
    } else {
        APIpostGroup(from_examine.item)
            .then(res => {
                if (res.status === 200) {
                    getUsergroupList()
                    ElMessage.success('添加成功')
                    switch_examine.value = false
                }
            })
            .catch(err => {
                ElMessage.error('添加失败')
            })
    }
}
const switch_choose_zone = ref(false)
const click_add_group_zone_id = () => {
    switch_choose_zone.value = true
}
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
    id: '50',
    name: '测试',
    next_type: 'region',
    type: 'region'
})
import { APIgetChinaRegion } from '@/api/custom/custom.js'
// 添加弹出框选择小区
APIgetChinaRegion().then(res => {
    console.log(res)
    tree_item.value.id = res.data[0].code
    tree_item.value.name = res.data[0].name
    tree_item.value.next_type = 'region'
    tree_item.value.type = 'region'
})
// // 企业成员搜索
// const switch_search_1 = ref(false)
// const searchFunc_1 = () => {
//     getUsergroupList()
//     switch_search_1.value = true
//     console.log(data_search.item)
// }
// const refreshFunc_2 = () => {
//     data_search.item = {}
//     getUsergroupList()
//     switch_search_1.value = false
// }
// 提交
// 企业成员详情
const switch_group_details = ref(false)
const data_group_details = reactive({
    item: {}
})
// 用户组详情
const getGroupDetail = val => {
    APIgetGroupDetails(val.id).then(res => {
        if (res.status == 200) {
            data_group_details.item = res.data
            switch_group_details.value = true
        }
    })
}
// 成员
// 打开配置选项
const switch_opt_val = ref(false)
const item_opt = reactive({
    obj: {}
})
import {
    APIgetGroupUserList,
    APIputGroupUser,
    APIpostGroupUser,
    APIdeleteGroupUser
} from '@/api/custom/custom.js'
const opt_tab = reactive({
    arr: []
})
const str_opt_val_title = ref('添加')
const from_opt_val = reactive({
    obj: {}
})
const switch_opt_val_add = ref(false)
const optValFunc = val => {
    item_opt.obj = val
    switch_opt_val.value = true
    getOptValListFunc()
}
// 获取列表
const getOptValListFunc = () => {
    APIgetGroupUserList(item_opt.obj.id)
        .then(res => {
            if (res.status === 200) {
                console.log(res)
                opt_tab.arr = res.data
            }
        })
}
// dialog关闭回调
const V_1 = ref(null)
// 成员添加
const optValAddFunc = () => {
    str_opt_val_title.value = '添加'
    from_opt_val.obj = {}
    switch_opt_val_add.value = true
}
const add_dialog_close = () => {
    V_1.value.clearFunc()
    userNames.value = ''
}
const userNames = ref('')
// 修改
const optValModifyFunc = val => {
    switch_opt_val_add.value = true
    str_opt_val_title.value = '修改'
    from_opt_val.obj = {
        ...val
    }
}
// 提交
const dialogOptValFunc = () => {
    if (str_opt_val_title.value == '修改') {
        console.log(from_opt_val.obj)
        APIputGroupUser(
            from_opt_val.obj.group_id,
            from_opt_val.obj.user_id,
            from_opt_val.obj
        )
            .then(res => {
                if (res.status === 200) {
                    getOptValListFunc()
                    ElMessage.success('修改成功')
                    switch_opt_val_add.value = false
                }
            })
    } else {
        APIpostGroupUser(item_opt.obj.id, from_opt_val.obj)
            .then(res => {
                if (res.status === 200) {
                    getOptValListFunc()
                    ElMessage.success('添加成功')
                    switch_opt_val_add.value = false
                }
            })
    }
}
const checkUsersNameFunc_1 = val => {
    from_opt_val.obj.user_id = val.id
}
// 用户组成员详细
const data_user_detail = reactive({
    item: {}
})
const switch_user_details = ref(false)
const getUserDetail = val => {
    // APIgetUserDetails(val.user_id).then(res => {
    //     if (res.status === 200) {
    //         console.log(res.data)
    //         data_user_detail.item = res.data
    //         switch_user_details.value = true
    //     }
    // })
    console.log(val)
    data_user_detail.item = val
    switch_user_details.value = true
}
// 删除
const optValDeleteFunc = val => {
    console.log(val)
    APIdeleteGroupUser(val.group_id, val.user_id).then(res => {
        if (res.status === 200) {
            getOptValListFunc()
            ElMessage.success('删除成功')
        } else {
            ElMessage.error('删除失败请重试')
        }
    })
}
const postFunc_1 = () => {
    if (str_title.value == '添加') {
        APIpostEnterprise(from_add.obj).then(res => {
            refreshFunc()
            ElMessage.success('添加成功')
            switch_add.value = false
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    } else if (str_title.value == '修改') {
        APIputEnterprise(from_add.obj.id, from_add.obj).then(() => {
            refreshFunc()
            ElMessage.success('修改成功')
            switch_add.value = false
        }).catch(() => {
            ElMessage.error('修改失败')
        })
    }
}
const postFunc = () => {
    let files = []
    let file_key = []
    if (file_list.value.length > 0) {
        for (let i in file_list.value) {
            if (!file_list.value[i].raw) {
                file_key.push(file_list.value[i].name)
            } else {
                files.push(file_list.value[i].raw)
            }
        }
    }
    delete from_add.obj.legal
    // console.log(file_list.value)
    from_add.obj.logo = file_key
    from_add.obj.logo = from_add.obj.logo.join(' ')
    if (files.length > 0) {
        getFilesKeys(files, 'folder').then(arr => {
            console.log(arr)
            from_add.obj.logo = file_key.concat(arr)
            // console.log(from_add.obj.logo)
            console.log(from_add.obj.logo.join(' '))
            from_add.obj.logo = from_add.obj.logo.join(' ')
            postFunc_1()
        })
        console.log(from_add.obj.logo)

        return false
    }
    // }
    postFunc_1()
    // let data = {
    //     biz_lic: 'gdrtrye5t.jpg',
    //     type: 1
    // }
    // APIpostEnterpriseApply(data).then(res => {

    // })
    // let params = {
    //     page: page.value,
    //     per_page: per_page.value,
    //     tyle: 1
    // }
    // APIgetEnterpriseApplyList(params).then(res => {
    //     console.log(res)
    // })
}
// 选择用户名
const userData = reactive({
    arr: []
})
import {
    APIgetUserList
} from '@/api/custom/custom.js'
APIgetUserList().then(res => {
    if (res.status == 200) {
        console.log(res)
        userData.arr = res.data
    }
})
const getNameFunc = (arr, key) => {
    for (let i in arr) {
        if (arr[i].id == key) {
            return arr[i].username
        }
    }
}
// 企业申请
const data_applyList = reactive({
    arr: []
})
const switch_replay = ref(false)
import {
    APIgetEnterpriseApplyDetails,
    APIgetEnterpriseApplyList,
    APIpostEnterpriseExamine
} from '@/api/custom/custom.js'
const applyFunc = row => {
    let params = {
        page: page.value,
        per_page: per_page.value,
        tyle: 1
    }
    APIgetEnterpriseApplyList(params).then(res => {
        console.log(res)
        data_applyList.arr = res.data
        switch_replay.value = true
    })
}
const switch_details_1 = ref(false)
const apply_details = reactive({
    obj: {}
})
const examine_item = reactive({
    obj: {}
})
const switch_examine_1 = ref(false)
const detailsFunc_1 = row => {
    APIgetEnterpriseApplyDetails(row.id).then(res => {
        console.log(res)
        apply_details.obj = res.data
        switch_details_1.value = true
        apply_details.obj.content.biz_lic = import.meta.env.VITE_APP_FOLDER_SRC + apply_details.obj.content.biz_lic
    })
}
const examineFunc = row => {
    switch_examine_1.value = true
    apply_details.obj = row

}
const postFunc_2 = () => {
    APIpostEnterpriseExamine(apply_details.obj.id, examine_item.obj).then(res => {
        ElMessage.success('审核成功')
        switch_examine_1.value = false
    })
}
refreshFunc()
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['enterprise_type', 'enterpriseStatus', 'examine_status', 'toushu_return_type', 'group_user_region_type', 'group_user_flg']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss" scoped>
    .keep-on-record {
        .tit-box-box {
            display: flex;
            padding: 0;
            .tit-box {
                height: 60px;
                box-sizing: border-box;
                margin-right: 30px;
                padding: 0 20px;
                font-size: 13px;
                color: #8c8c8c;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                border-bottom: 2px solid transparent;
                position: relative;
                .tips {
                    position: absolute;
                    right: 0;
                    top: 8px;
                    box-sizing: border-box;
                    padding: 0 8px;
                    border-radius: 14px;
                    font-size: 12px;
                    color: #fff;
                    background-color: #e55055;
                }
            }
            .tit-box.on {
                border-bottom: 2px solid rgb(2 167 240 / 100%);
            }
            .tit-box:last-child {
                margin-right: 0;
            }
        }
    }
    ::v-deep .el-table__header-wrapper tr th.el-table-fixed-column--right {
        z-index: 1;
    }
</style>
