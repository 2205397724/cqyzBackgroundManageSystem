<template>
    <div class="articletparticletpl">
        <page-main style="overflow: hidden;">
            <div>
                <el-button
                    class="head-btn" type="primary" :icon="Plus" @click="()=>{
                        data_1.add_form={};
                        data_1.add_error={};
                        data_1.add_switch=true;
                        file_list=[];
                        data_1.add_title = '添加'
                    }"
                >
                    添加违建
                </el-button>
            </div>
            <div class="search">
                <el-row :gutter="10">
                    <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">
                                违建名称：
                            </div>
                            <el-input v-model="data_1.search.title" class="search_tb" placeholder="违建名称" clearable />
                        </div>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">违建状态：</div>
                            <el-select v-model="data_1.search.status" class="search_tb" clearable placeholder="状态">
                                <el-option v-for="(item,i) in opts_all.obj.toushu_status" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="m-t-20">
                    <el-col :xs="24" :md="24" :lg="10">
                        <div class="flx">
                            <div class="w_30">
                                <el-button
                                    class="m-l-20" type="primary" :icon="Search"
                                    @click="()=>{
                                        data_1.switch_search = true;
                                        data_1.page = 1;
                                        getFuncVoteList()
                                    }"
                                >
                                    筛选
                                </el-button>
                            </div>
                            <div v-show=" data_1.switch_search == true" class="w_70 m-l-30">
                                <el-button class="m-r-10" @click="refreshFunc">重置</el-button>
                                <div class="searchDetail">
                                    *搜索到相关结果共{{ data_1.total }}条。
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <!-- <el-table
                        v-loading="loading_tab"
                        :data="data_tab.arr"
                        :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                        style="width: 100%;min-height: 300px;"
                    >
                        <el-table-column prop="id" label="违建ID" width="250">
                            <template #default="scope">
                                <span>{{ scope.row.id }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cid" label="违建对象">
                            <template #default="scope">
                                <span>{{ scope.row?.tgt_able?.name }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="type" label="违建类型">
                            <template #default="scope">
                                <span>{{ getOptVal(opts_all.obj.illegal_type,scope.row.type) }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" label="状态">
                            <template #default="scope">
                                <el-tag v-show="scope.row.status == 10" class="btnNone" type="danger" effect="dark" size="large">{{ getOptVal(opts_all.obj.illegal_user,scope.row.status) }} </el-tag>
                                <el-tag v-show="scope.row.status == 15" class="btnNone" type="primary" effect="dark" size="large">{{ getOptVal(opts_all.obj.illegal_user,scope.row.status) }} </el-tag>
                                <el-tag v-show="scope.row.status == 20" class="btnNone" type="success" effect="dark" size="large">{{ getOptVal(opts_all.obj.illegal_user,scope.row.status) }} </el-tag>
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
                        <el-table-column />
                    </el-table> -->
            <el-table
                :data="data_1.list"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
            >
                <el-table-column label="违建名称">
                    <template #default="scope">
                        <span>{{ scope.row.title }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="所在区域">
                    <template #default="scope">
                        <span>{{ scope.row.cc_name }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="业务编号" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.sno }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="所在小区">
                    <template #default="scope">
                        <span>{{ scope.row?.zone?.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template #default="scope">
                        <el-tag v-show="scope.row.status == 0" class="btnNone" type="danger" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 1" class="btnNone" type="success" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 2" class="btnNone" type="success" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 3" class="btnNone" type="success" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 4" class="btnNone" type="warning" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 5" class="btnNone" type="warning" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 6" class="btnNone" type="primary" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 7" class="btnNone" type="info" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 8" class="btnNone" type="info" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="是否匿名">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.toushu_ano,scope.row.ano) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="是否公开">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.toushu_pub,scope.row.pub) }} </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                    <template #default="scope">
                        <el-button
                            type="primary" size="small"
                            @click="clickFuncModify(scope.row)"
                        >
                            修改
                        </el-button>
                        <el-button
                            size="small"
                            @click="clickFuncDeteails(scope.row)"
                        >
                            详情
                        </el-button>
                        <el-button
                            size="small"
                            @click="clickFuncAllot4(scope.row.id)"
                        >
                            违建
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column />
            </el-table>
            <el-pagination
                v-model:current-page="data_1.page"
                style="float: right;"
                layout="prev,next,jumper,"
                :total="50"
                :page-size="data_1.per_page"
                background
                prev-text="上一页"
                next-text="下一页"
                hide-on-single-page
            />
        </page-main>
        <!-- 修改添加 -->
        <el-dialog
            v-model="data_1.add_switch"
            :title="data_1.add_title"
            width="50%"
            @closed="dialogClosed"
        >
            <el-form
                :model="data_1.add_form"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="报修名称"
                            :error="data_1.add_error&&data_1.add_error.title?data_1.add_error.title[0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.title"
                                class="head-btn"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="是否公开"
                            :error="data_1.add_error&&data_1.add_error.pub?data_1.add_error.pub[0]:''"
                        >
                            <el-select v-model="data_1.add_form.pub" class="head-btn" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.toushu_pub" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="是否匿名"
                            :error="data_1.add_error&&data_1.add_error.ano?data_1.add_error.ano[0]:''"
                        >
                            <el-select v-model="data_1.add_form.ano" class="head-btn" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.toushu_ano" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="状态"
                            :error="data_1.add_error&&data_1.add_error.status?data_1.add_error.status[0]:''"
                        >
                            <el-select v-model="data_1.add_form.status" class="head-btn" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.toushu_status" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <template v-if="data_1.add_title=='修改'">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="100px"
                                label="问题分类"
                                :error="data_1.add_error&&data_1.add_error.catpro?data_1.add_error.catpro[0]:''"
                            >
                                <el-cascader
                                    v-model="data_1.add_form.catpro"
                                    placeholder=""
                                    :options="opts_all.obj.problem_type"
                                    :props="{
                                        multiple: false,
                                        emitPath: false,
                                        lazy: false,
                                        value: 'id',
                                        label: 'name',
                                        checkStrictly: true
                                    }"
                                    collapse-tags
                                    collapse-tags-tooltip
                                    :show-all-levels="false"
                                    clearable
                                />
                            </el-form-item>
                            <el-icon :size="15" color="#F56C6C" class="icon">
                                <StarFilled />
                            </el-icon>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="100px"
                                label="投诉对象"
                                :error="data_1.add_error&&data_1.add_error.catob?data_1.add_error.catob[0]:''"
                            >
                                <el-cascader
                                    v-model="data_1.add_form.catob"
                                    style="width: 100%;"
                                    placeholder=""
                                    :options="opts_all.obj.toushu_user_type"
                                    :props="{
                                        multiple: false,
                                        emitPath: false,
                                        lazy: false,
                                        value: 'id',
                                        label: 'name',
                                        checkStrictly: true
                                    }"
                                    collapse-tags
                                    collapse-tags-tooltip
                                    :show-all-levels="false"
                                    clearable
                                />
                            </el-form-item>
                            <el-icon :size="15" color="#F56C6C" class="icon_1">
                                <StarFilled />
                            </el-icon>
                        </el-col>
                    </template>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="100px"
                            label="附件"
                            :error="data_1.add_error&&data_1.add_error.affix?data_1.add_error.affix[0]:''"
                        >
                            <el-upload
                                ref="uploadRef"
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
                                <el-button type="primary">选择附件</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="100px"
                            label="内容"
                            :error="data_1.add_error&&data_1.add_error.content?data_1.add_error.content[0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.content"
                                class="head-btn"
                                :autosize="{ minRows: 2, maxRows: 6 }"
                                type="textarea"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="data_1.add_switch=false">取消</el-button>
                    <el-button type="primary" @click="clickFuncAddVote">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog
            v-model="data_1.details_switch"
            title="详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">违建名称</div>
                    <div class="right">{{ data_1.details_data.title }}</div>
                </div>
                <div class="item">
                    <div class="left">违建id</div>
                    <div class="right">{{ data_1.details_data.id }}</div>
                </div>
                <div class="item">
                    <div class="left">编号</div>
                    <div class="right">{{ data_1.details_data.sno }}</div>
                </div>
                <div class="item">
                    <div class="left">是否公开</div>
                    <div class="right">{{ getOptVal(opts_all.obj.toushu_pub,data_1.details_data.pub) }}</div>
                </div>
                <div class="item">
                    <div class="left">是否匿名</div>
                    <div class="right">{{ getOptVal(opts_all.obj.toushu_ano,data_1.details_data.ano) }}</div>
                </div>
                <div v-if="data_1.details_data?.zone?.name" class="item">
                    <div class="left">所在小区</div>
                    <div class="right">{{ data_1.details_data?.zone?.name }}</div>
                </div>
                <div v-if="data_1.details_data.catpro" class="item">
                    <div class="left">问题分类</div>
                    <div class="right">{{ data_1.details_data.catpro }}</div>
                </div>
                <div v-if="data_1.details_data.catob" class="item">
                    <div class="left">投诉对象</div>
                    <div class="right">{{ data_1.details_data.catob }}</div>
                </div>
                <div v-if="data_1.details_data.affixs&&data_1.details_data.affixs.length>0" class="item">
                    <div class="left">附件</div>
                    <div class="right">
                        <!-- 两种模式任君选择 -->
                        <img v-for="(item,i) in data_1.details_data.affixs" :key="i" :preview-src-list="data_1.details_data.affixs" class="image" :src="item" fit="cover">
                        <!-- <div v-for="(item,i) in data_1.details_data.affixs">
                            <el-link type="success" :href="item" target="_blank">{{ item }}</el-link>
                        </div> -->
                    </div>
                </div>
                <div class="item">
                    <div class="left">状态</div>
                    <div class="right">
                        <el-tag v-show="data_1.details_data.status == 0" class="btnNone" type="danger" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,data_1.details_data.status) }} </el-tag>
                        <el-tag v-show="data_1.details_data.status == 1" class="btnNone" type="success" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,data_1.details_data.status) }} </el-tag>
                        <el-tag v-show="data_1.details_data.status == 2" class="btnNone" type="success" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,data_1.details_data.status) }} </el-tag>
                        <el-tag v-show="data_1.details_data.status == 3" class="btnNone" type="success" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,data_1.details_data.status) }} </el-tag>
                        <el-tag v-show="data_1.details_data.status == 4" class="btnNone" type="warning" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,data_1.details_data.status) }} </el-tag>
                        <el-tag v-show="data_1.details_data.status == 5" class="btnNone" type="warning" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,data_1.details_data.status) }} </el-tag>
                        <el-tag v-show="data_1.details_data.status == 6" class="btnNone" type="primary" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,data_1.details_data.status) }} </el-tag>
                        <el-tag v-show="data_1.details_data.status == 7" class="btnNone" type="info" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,data_1.details_data.status) }} </el-tag>
                        <el-tag v-show="data_1.details_data.status == 8" class="btnNone" type="info" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,data_1.details_data.status) }} </el-tag>
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="data_1.details_switch = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 添加违建 -->
        <el-dialog
            v-model="popup_4.switch"
            title="为投诉添加违建"
            width="400px"
            @closed="dialogClosed_1"
        >
            <el-form
                :model="popup_4.form"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24">
                        <el-form-item
                            label-width="70px"
                            label="违建类型" prop="name"
                            :error="popup_4.msg&&popup_4.msg.type?popup_4.msg.type[0]:''"
                        >
                            <el-select v-model="popup_4.form.type" class="head-btn" clearable @change="popup_4.form.tgt=''">
                                <el-option v-for="(item,i) in opts_all.obj.illegal_type" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col v-if="opts_all.obj.illegal_type&&opts_all.obj.illegal_type[0]&&(popup_4.form.type==opts_all.obj.illegal_type[0].key)" :xs="24" :sm="24" :md="24"> -->
                    <el-col :xs="24" :sm="24" :md="24">
                        <el-form-item
                            label-width="70px"
                            label="违建对象"
                            :error="popup_4.msg&&popup_4.msg.tgt?popup_4.msg.tgt[0]:''"
                        >
                            <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                <SearchHouse ref="V_1" @checkFunc="checkNameFunc_1" />
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24">
                        <el-form-item
                            label-width="70px"
                            label="处理状态"
                            :error="popup_4.msg&&popup_4.msg.status?popup_4.msg.status[0]:''"
                        >
                            <el-select v-model="popup_4.form.status" class="head-btn" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.illegal_user" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="popup_4.switch=false">取消</el-button>
                    <el-button type="primary" @click="popupFuncAdd4">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 修改添加 -->
        <!-- <el-dialog
            v-model="switch_examine"
            :title="str_title"
            width="50%"
            @closed="dialogClosed"
        >
            <div>
                <el-form
                    ref="ruleFormRef"
                    :model="from_examine.item"
                >
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="90px"
                                label="违建对象"
                                :error="from_error.msg&&from_error.msg.type?from_error.msg.type[0]:''"
                            >
                                <div v-show="opts_all.obj.illegal_type&&opts_all.obj.illegal_type[0]&&(from_examine.item.type==opts_all.obj.illegal_type[0].key)" style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                    <SearchHouse ref="V_1" v-model:name="houseName" @checkFunc="checkNameFunc_1" />
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="对象类型"
                                label-width="90px"
                                :error="from_error.msg&&from_error.msg.type?from_error.msg.type[0]:''"
                            >
                                <el-select v-model="from_examine.item.type" class="head-btn" placeholder="处理状态" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.illegal_type" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="处理状态"
                                label-width="90px"
                                :error="from_error.msg&&from_error.msg.status?from_error.msg.status[0]:''"
                            >
                                <el-select v-model="from_examine.item.status" class="head-btn" placeholder="" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.illegal_user" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
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
        </el-dialog> -->
        <!-- 详情 -->
        <!-- <el-dialog
            v-model="switch_details"
            title="详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">违建ID</div>
                    <div class="right">{{ data_details.item.id }}</div>
                </div>
                <div class="item">
                    <div class="left">违建对象</div>
                    <div class="right">{{ data_details.item.tgt }}</div>
                </div>
                <div class="item">
                    <div class="left">违建类型</div>
                    <div class="right">{{ getOptVal(opts_all.obj.illegal_type,data_details.item.type) }}</div>
                </div>
                <div class="item">
                    <div class="left">状态</div>
                    <div class="right">{{ getOptVal(opts_all.obj.illegal_user,data_details.item.status) }}</div>
                </div>
                <div class="item">
                    <div class="left">创建时间</div>
                    <div class="right">{{ data_details.item.created_at }}</div>
                </div>
                <div class="item">
                    <div class="left">更新时间</div>
                    <div class="right">{{ data_details.item.updated_at }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details = false">取消</el-button>
                </span>
            </template>
        </el-dialog> -->
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
import { Search, Plus, StarFilled } from '@element-plus/icons-vue'
/* ----------------------------------------------------------------------------------------------------------------------- */
import {
    APIgetComplaintList,
    APIgetComplaintDetails,
    APIputComplaint,
    APIpostComplaint
} from '@/api/custom/custom.js'
const data_1 = reactive({
    search: {},
    switch_search: false,
    page: 1,
    total: 0,
    per_page: 15,
    list: [],
    add_switch: false,
    add_title: '添加',
    add_form: {},
    add_error: {},
    details_data: {
        zone: { name: '' }
    },
    details_switch: false
})
const getFuncVoteList = () => {
    let data = {
        page: data_1.page,
        per_page: data_1.per_page,
        kind: 1
    }
    for (let key in data_1.search) {
        let item = data_1.search[key]
        if (item || item === 0) {
            data[key] = item
        }
    }
    APIgetComplaintList(data).then(res => {
        console.log(res)
        data_1.total = res.length
        data_1.list = res
        let btnNext = document.querySelector('.btn-next')
        if (res.length <= data_1.per_page) {
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
const flag = ref(false)
const file_list = ref([])
import { getFilesKeys } from '@/util/files.js'
const clickFuncAddVote = () => {
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
    data_1.add_error = {}
    if (files.length > 0) {
        getFilesKeys(files, 'folder').then(arr => {
            data_1.add_form.affix = file_key.concat(arr)
            if (data_1.add_title == '添加') {
                APIpostComplaint(data_1.add_form).then(res => {
                    refreshFunc()
                    data_1.add_switch = false
                    ElMessage.success('添加成功')
                }).catch(err => {
                    ElMessage.error('添加失败')
                })
            } else {
                APIputComplaint(data_1.add_form.id, data_1.add_form).then(res => {
                    getFuncVoteList()
                    data_1.add_switch = false
                    ElMessage.success('修改成功 ')
                }).catch(err => {
                    ElMessage.error('修改失败 ')
                })
            }
        })
        return false
    }
    data_1.add_form.affix = file_key
    if (data_1.add_title == '添加') {
        APIpostComplaint(data_1.add_form).then(res => {
            refreshFunc()
            data_1.add_switch = false
            ElMessage.success('添加成功')
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    } else {
        APIputComplaint(data_1.add_form.id, data_1.add_form).then(res => {
            getFuncVoteList()
            data_1.add_switch = false
            ElMessage.success('修改成功 ')
        }).catch(err => {
            ElMessage.error('修改失败 ')
        })
    }
}
const clickFuncModify = val => {
    data_1.add_error = {}
    data_1.add_title = '修改'
    data_1.add_switch
    APIgetComplaintDetails(val.id).then(res => {
        console.log(res)
        data_1.add_form = res
        let arr = []
        for (let i in res.affix) {
            if (res.affix[i]) {
                arr.push({
                    name: res.affix[i]
                })
            }
        }
        file_list.value = arr
        data_1.add_switch = true
    })
}
const clickFuncDeteails = val => {
    APIgetComplaintDetails(val.id).then(res => {
        res.affixs = []
        for (let i in res.affix) {
            res.affixs.push(import.meta.env.VITE_APP_FOLDER_SRC + res.affix[i])
        }
        for (let i in res.totlogs) {
            res.totlogs[i].logable.affixs = []
            for (let j in res.totlogs[i].logable.affix) {
                res.totlogs[i].logable.affixs.push(import.meta.env.VITE_APP_FOLDER_SRC + res.totlogs[i].logable.affix[j])
            }
        }
        console.log(res)
        data_1.details_data = res
        data_1.details_switch = true
    })
}
// 修改处理
const file_list3 = ref([])
const popup_3 = reactive({
    switch: false,
    form: {},
    msg: {},
    title: '添加投诉处理'
})
import {
    APIputDeal,
    APIpostDealAdd
} from '@/api/custom/custom.js'
const dealFuncAddPut = (data, id) => {
    if (id) {
        APIpostDealAdd(id, data).then(res => {
            ElMessage.success(res.msg)
            popup_3.switch = false
            clickFuncDeteails(data_1.details_data)
        }).catch(err => {
            popup_3.msg = err.data
        })
        return false
    }
    APIputDeal(data.caid, data).then(res => {
        ElMessage.success(res.msg)
        popup_3.switch = false
        clickFuncDeteails(data_1.details_data)
    }).catch(err => {
        popup_3.msg = err.data
    })

}
const popupFuncAdd3 = val => {
    let files = []
    let file_key = []
    if (file_list3.value.length > 0) {
        for (let i in file_list3.value) {
            if (!file_list3.value[i].raw) {
                file_key.push(file_list3.value[i].name)
            } else {
                files.push(file_list3.value[i].raw)
            }
        }
    }
    let data = {
        caid: popup_3.form.caid,
        content: popup_3.form.content,
        affix: file_key,
        type: popup_3.form.type,
        flg: popup_3.form.flg
    }
    popup_3.msg = {}
    if (files.length > 0) {
        getFilesKeys(files, 'folder').then(arr => {
            data.affix = file_key.concat(arr)
            dealFuncAddPut(data, popup_3.tid)
        })
        return false
    }
    dealFuncAddPut(data)
}
// 添加转办处理
const clickFuncOpenPopup4 = (val, id) => {
    popup_3.msg = {}
    popup_3.title = '添加投诉处理'
    popup_3.tid = id
    popup_3.form = {
        caid: val.id,
        content: '',
        affix: [],
        type: ''
    }
    popup_3.switch = true
    let arr = []
    for (let i in val.affix) {
        if (val.affix[i]) {
            arr.push({
                name: val.affix[i]
            })
        }
    }
    file_list3.value = arr
}
// 违建
const popup_4 = reactive({
    switch: false,
    form: {},
    msg: {}
})
const clickFuncAllot4 = id => {
    popup_4.msg = {}
    popup_4.form = {
        id: id
    }
    popup_4.switch = true
}
const V_1 = ref(null)
const dialogClosed_1 = () => {
    V_1.value.clearFunc()
}
const checkNameFunc_1 = val => {
    popup_4.form.tgt = val
}
import {
    APIpostIllegal
} from '@/api/custom/custom.js'
const popupFuncAdd4 = val => {
    popup_4.msg = {}
    let data = {
        type: popup_4.form.type,
        status: popup_4.form.status
    }
    APIpostIllegal(popup_4.form.id, popup_4.form).then(res => {
        ElMessage.success('添加违建成功')
        popup_4.switch = false
        refreshFunc()
    }).catch(err => {
        ElMessage.error('添加违建失败')
    })
}
/* ----------------------------------------------------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------------------------------------------------- */
const refreshFunc = () => {
    data_1.search = {
        kind: 1
    }
    data_1.switch_search = false
    data_1.page = 1
    getFuncVoteList()
}
watch(() => data_1.page, new_val => {
    refreshFunc()
}, { immediate: true, deep: true })
/* ----------------------------------------------------------------------------------------------------------------------- */
// // 配置项
import {
    getOpts,
    getOptVal
} from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
import {
    APIgetTypeList
} from '@/api/custom/custom.js'
getOpts(['flg_type', 'tousu_type_kind', 'toushu_status', 'toushu_ano', 'toushu_pub', 'kind', 'toushu_return_type', 'toushu_illegal', 'illegal_type', 'illegal_user']).then(res => {
    opts_all.obj = res
    APIgetTypeList(opts_all.obj.kind[1].key).then(res => {
        console.log(res)
        opts_all.obj.problem_type = res
    })
    APIgetTypeList(opts_all.obj.kind[2].key).then(res => {
        opts_all.obj.toushu_user_type = res
    })
})

// import {
//     APIgetIllegalList,
//     APIgetIllegalDetails,
//     APIdeleteIllegal,
//     APIputIllegal,
//     APIpostIllegal
// } from '@/api/custom/custom.js'
// import {
//     reactive,
//     ref,
//     watch
// } from 'vue'
// import {
//     ElMessage
// } from 'element-plus'
// import { Search } from '@element-plus/icons-vue'
// /* ----------------------------------------------------------------------------------------------------------------------- */
// // 数据
// // 搜索
// let switch_search = ref(false)
// let data_search = reactive({ obj: {} })
// // 详情
// let switch_details = ref(false)
// // 列表
// let ruleFormRef = ref('')
// let loading_tab = ref(false)
// let data_tab = reactive({
//     arr: []
// })
// // 操作事件 列表单个行数据
// let data_dialog = reactive({
//     obj: {}
// })
// // 详情
// const data_details = reactive({
//     item: ''
// })
// // 分页
// let total = ref(100)
// let per_page = ref(15)
// let page = ref(1)
// // 添加，修改
// let switch_examine = ref(false)
// let from_examine = reactive({
//     item: {
//         fields: []
//     }
// })
// const str_title = ref('添加')
// const from_error = reactive({
//     msg: {}
// })

// import {
//     APIgetTypeList
// } from '@/api/custom/custom.js'
// const options = reactive({ arr: [] })
// APIgetTypeList('announce').then(res => {
//     options.arr = res
// })
// /* ----------------------------------------------------------------------------------------------------------------------- */
// // 方法
// // 搜索
// const searchFunc = () => {
//     page.value = 1
//     switch_search.value = true
//     getTabListFunc()
// }
// // 刷新
// const refreshFunc = () => {
//     page.value = 1
//     switch_search.value = false
//     data_search.obj = {}
//     getTabListFunc()
// }
// const V = ref(null)
// const refreshFunc_1 = () => {
//     V.value.clearFunc()
//     refreshFunc()
// }
// const checkNameFunc = val => {
//     data_search.obj.tgt = val
// }
// // 详情
// const detailsFunc = val => {
//     data_dialog.obj = val
//     APIgetIllegalDetails(val.id).then(res => {
//         data_details.item = res
//         switch_details.value = true
//     })
// }
// // 监听分页
// watch(page, () => {
//     getTabListFunc()
// })
// // 同意拒绝提交
// const dialogExamineCloseFunc = formEl => {
//     from_error.msg = {}
//     if (!formEl) return
//     formEl.validate(valid => {
//         if (valid) {
//             if (str_title.value == '修改') {
//                 APIputIllegal(from_examine.item.id, from_examine.item).then(res => {
//                     refreshFunc()
//                     ElMessage.success('修改成功')
//                     switch_examine.value = false
//                 }).catch(err => {
//                     ElMessage.success('修改失败')
//                 })
//             } else {
//                 console.log(from_examine.item)
//                 APIpostIllegal('62cbf190ee857750a615a1d5', from_examine.item).then(res => {
//                     refreshFunc()
//                     ElMessage.success('添加成功')
//                     switch_examine.value = false
//                 }).catch(err => {
//                     ElMessage.success('添加失败')
//                 })
//             }
//         } else {
//             return false
//         }
//     })
// }
// // 获取列表api请求
// const getTabListFunc = () => {
//     let params = {
//         page: page.value,
//         per_page: per_page.value
//         // cid: "62cbf190ee857750a615a1d5",
//         // status: 10
//     }
//     for (let key in data_search.obj) {
//         if (data_search.obj[key] || data_search.obj[key] === 0) {
//             if (data_search.obj[key] instanceof Array && data_search.obj[key].length <= 0) {
//                 continue
//             }
//             params[key] = data_search.obj[key]
//         }
//     }
//     if (params.time_deal) {
//         let updated_str = ''
//         for (let i in params.time_deal) {
//             updated_str += ',' + params.time_deal[i]
//         }
//         params.time_deal = updated_str.substring(1)
//     }
//     if (params.created_at) {
//         let updated_str = ''
//         for (let i in params.created_at) {
//             updated_str += ',' + params.created_at[i]
//         }
//         params.created_at = updated_str.substring(1)
//     }
//     if (params.updated_at) {
//         let updated_str = ''
//         for (let i in params.updated_at) {
//             updated_str += ',' + params.updated_at[i]
//         }
//         params.updated_at = updated_str.substring(1)
//     }
//     loading_tab.value = true
//     APIgetIllegalList(params).then(res => {
//         console.log(res)
//         loading_tab.value = false
//         data_tab.arr = res
//         total.value = res.length
//     })
// }
// // 删除
// const deleteFunc = val => {
//     APIdeleteIllegal(val.id).then(res => {
//         refreshFunc()
//         ElMessage.success('删除成功')
//     })
// }
// const houseName = ref('')
// const V_1 = ref(null)
// const dialogClosed = () => {
//     V_1.value.clearFunc()
//     houseName.value = ''
// }
// /* ----------------------------------------------------------------------------------------------------------------------- */
// // 执行
// refreshFunc()
// /* ----------------------------------------------------------------------------------------------------------------------- */
// // 配置项
// import { getOpts, getOptVal } from '@/util/opts.js'
// const opts_all = reactive({
//     obj: {}
// })
// getOpts(['illegal_user', 'illegal_type']).then(res => {
//     opts_all.obj = res
// })
</script>
<style lang="scss">
    .articletparticletpl {
        .el-cascader {
            width: 100% !important;
            margin-bottom: 10px;
        }
        .serve-box {
            border: 1px solid #eee;
            box-sizing: border-box;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 6px;
            position: relative;
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
.search-tips {
    color: #aaa;
    font-size: 14px;
    margin-bottom: 20px;
}
::v-deep .el-cascader {
    width: 100%;
}
.icon {
    position: absolute;
    top: 65px;
    left: 10px;
}
.icon_1 {
    position: absolute;
    top: 65px;
    right: 340px;
}
</style>
