<template>
    <div class="vote">
        <page-main>
            <div>
                <el-button
                    class="head-btn" type="primary" :icon="Plus"
                    @click="()=>{
                        data_1.add_form={status:opts_all.obj.toushu_status[0].key};
                        data_1.add_error={};
                        data_1.add_switch=true;
                        file_list=[];
                        data_1.add_title = '添加'
                    }"
                >
                    添加投诉
                </el-button>
            </div>
            <div class="search">
                <span class="searchKey">关键字</span>
                <el-input v-model="data_1.search.title" class="input-b-r" placeholder="标题名称" clearable />
                <el-select v-model="data_1.search.kind" class="input-b-r" clearable placeholder="分类">
                    <el-option v-for="(item,i) in opts_all.obj.tousu_type_kind" :key="item.key" :label="item.val" :value="item.key" />
                </el-select>
                <el-select v-model="data_1.search.status" class="input-b-r" clearable placeholder="状态">
                    <el-option v-for="(item,i) in opts_all.obj.toushu_status" :key="item.key" :label="item.val" :value="item.key" />
                </el-select>
                <br>
                <el-button
                    class="btn-b-r" type="primary" :icon="Search"
                    @click="()=>{
                        data_1.switch_search = true;
                        data_1.page = 1;
                        getFuncVoteList()
                    }"
                >
                    筛选
                </el-button>
            </div>
            <div v-show="data_1.switch_search" style="margin-bottom: 10px;">
                <el-button style="margin-right: 10px;" @click="refreshFunc()">重置</el-button>
                *搜索到相关结果共{{ data_1.total }}条。
            </div>
            <div class="btn">
                <el-badge :value="index == 0 ? data_1.total : ''" class="item" :hidden="flag">
                    <el-button :type="index == 0 ? 'primary' : ''" @click="StatusFunk(0)">
                        未处理
                    </el-button>
                </el-badge>
                <el-badge :value="index == 1 ? data_1.total : ''" class="item" :hidden="flag">
                    <el-button :type="index == 1 ? 'primary' : ''" @click="StatusFunk(1)">
                        办理中
                    </el-button>
                </el-badge>
                <el-badge :value="index == 3 ? data_1.total : ''" class="item" :hidden="flag">
                    <el-button :type="index == 3 ? 'primary' : ''" @click="StatusFunk(3)">
                        已回复
                    </el-button>
                </el-badge>
                <el-badge :value="index == 4 ? data_1.total : ''" class="item" :hidden="flag">
                    <el-button :type="index == 4 ? 'primary' : ''" @click="StatusFunk(4)">
                        已结案
                    </el-button>
                </el-badge>
            </div>
            <el-table
                :data="data_1.list"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
            >
                <el-table-column label="投诉名称" width="120">
                    <template #default="scope">
                        <span>{{ scope.row.title }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="投诉id">
                    <template #default="scope">
                        <span>{{ scope.row.id }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="小区id">
                    <template #default="scope">
                        <span>{{ scope.row.zid }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="150">
                    <template #default="scope">
                        <el-button v-show="scope.row.status == 0" class="btn1 noDeal" type="danger">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-button>
                        <el-button v-show="scope.row.status == 1" class="btn1" type="success">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-button>
                        <el-button v-show="scope.row.status == 2" class="btn1" type="success">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-button>
                        <el-button v-show="scope.row.status == 3" class="btn1" type="success">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-button>
                        <el-button v-show="scope.row.status == 4" class="btn1" type="warning">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-button>
                        <el-button v-show="scope.row.status == 5" class="btn1" type="warning">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-button>
                        <el-button v-show="scope.row.status == 6" class="btn1" type="primary">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-button>
                        <el-button v-show="scope.row.status == 7" class="btn1" type="info">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-button>
                        <el-button v-show="scope.row.status == 8" class="btn1" type="info">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-button>
                        <!-- <div style=":background-color"></div> -->
                    </template>
                </el-table-column>
                <el-table-column label="是否匿名" width="90">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.toushu_ano,scope.row.ano) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="是否公开" width="90">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.toushu_pub,scope.row.pub) }} </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="评论" width="90">
                    <template #default="scope">
                        <el-switch
                            v-model="scope.row.comment"
                            class="mb-2"

                            inline-prompt
                            style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                            active-text="开启"
                            inactive-text="关闭"
                            :active-value="1"
                            :inactive-value="0"
                            @change="switchFunk(scope.row)"
                        />
                    </template>
                </el-table-column> -->
                <el-table-column fixed="right" label="操作" width="300">
                    <template #default="scope">
                        <el-button
                            type="primary" size="small"
                            @click="clickFuncModify(scope.row)"
                        >
                            修改
                        </el-button>
                        <el-link :underline="false" type="primary">
                            <router-link class="el-button details" :to="{name: 'complaintDetails',query:{ id : scope.row.id }}">详情</router-link>
                        </el-link>
                        <el-button
                            size="small"
                            @click="clickFuncAllot(scope.row)"
                        >
                            转办
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
                style="padding-top: 20px;"
                layout="total,prev,pager,next,jumper,"
                :total="data_1.total"
                :page-size="data_1.per_page"
                background
                hide-on-single-page
            />
        </page-main>
        <!-- 修改添加 -->
        <el-dialog
            v-model="data_1.add_switch"
            :title="data_1.add_title"
            width="50%"
        >
            <el-form
                :model="data_1.add_form"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="标题名称"
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
                            label-width="70px"
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
                            label-width="70px"
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
                            label-width="70px"
                            label="状态"
                            :error="data_1.add_error&&data_1.add_error.status?data_1.add_error.status[0]:''"
                        >
                            <el-select v-model="data_1.add_form.status" class="head-btn" clearable>
                                <el-option v-for="(item) in opts_all.obj.toushu_status" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="分类"
                            :error="data_1.add_error&&data_1.add_error.kind?data_1.add_error.kind[0]:''"
                        >
                            <el-select v-model="data_1.add_form.kind" class="head-btn" clearable placeholder="">
                                <el-option v-for="(item,i) in opts_all.obj.tousu_type_kind" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="小区id"
                            :error="data_1.add_error&&data_1.add_error.zid?data_1.add_error.zid[0]:''"
                        >
                            <div style="margin-bottom: 10px;width: 100%;">
                                <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                    <SearchResidential v-model:str="data_1.add_form.zid" />
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                    <template v-if="data_1.add_title=='修改'">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="70px"
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
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="70px"
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
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="70px"
                                label="评论"
                                :error="data_1.add_error&&data_1.add_error.catob?data_1.add_error.catob[0]:''"
                            >
                                <el-switch
                                    v-model="data_1.list.comment"
                                    class="mb-2"

                                    inline-prompt
                                    style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                                    active-text="开启"
                                    inactive-text="关闭"
                                    :active-value="1"
                                    :inactive-value="0"
                                    @change="switchFunk"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="70px"
                                label="状态"
                                :error="data_1.add_error&&data_1.add_error.status?data_1.add_error.status[0]:''"
                            >
                                <el-select v-model="data_1.add_form.status" class="head-btn" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.toushu_status" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </template>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="70px"
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
                            label-width="70px"
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
            <div class="">
                <div class="item">
                    <div class="left">标题名称</div>
                    <div class="right">{{ data_1.details_data.title }}</div>
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
                <div class="item">
                    <div class="left">分类</div>
                    <div class="right">{{ getOptVal(opts_all.obj.tousu_type_kind,data_1.details_data.kind) }}</div>
                </div>
                <div class="item">
                    <div class="left">小区id</div>
                    <div class="right">{{ data_1.details_data.zid }}</div>
                </div>
                <div v-if="data_1.details_data.catpro" class="item">
                    <div class="left">问题分类</div>
                    <div class="right">{{ data_1.details_data.catpro }}</div>
                </div>
                <div v-if="data_1.details_data.catob" class="item">
                    <div class="left">投诉对象</div>
                    <div class="right">{{ data_1.details_data.catob }}</div>
                </div>
                <div class="item">
                    <div class="left">状态</div>
                    <div class="right">{{ getOptVal(opts_all.obj.toushu_status,data_1.details_data.status) }}</div>
                </div>
                <div v-if="data_1.details_data.affix&&data_1.details_data.affix.length>0" class="item">
                    <div class="left">附件</div>
                    <div class="right">
                        <!-- 两种模式任君选择 -->
                        <el-image
                            v-for="(item,i) in data_1.details_data.affixs" :key="i" :preview-src-list="data_1.details_data.affixs" style="width: 100px; height: 100px;margin-right: 10px;" :src="item" fit="cover"
                        />
                        <!-- <div v-for="(item,i) in data_1.details_data.affixs">
                            <el-link type="success" :href="item" target="_blank">{{ item }}</el-link>
                        </div> -->
                    </div>
                </div>
                <div class="item">
                    <div class="left">内容</div>
                    <div class="right">{{ data_1.details_data.content }}</div>
                </div>
                <div v-if="data_1.details_data.totlogs&&data_1.details_data.totlogs.length>=0" class="item">
                    <div class="left">记录</div>
                    <div class="right">
                        <el-timeline>
                            <el-timeline-item
                                v-for="(activity, index) in data_1.details_data.totlogs"
                                :key="index"
                                :timestamp="activity.updated_at"
                            >
                                <div>事件：{{ activity.content }}</div>
                                <div>操作人员：{{ activity.uinfo.realname || '空' }}</div>

                                <div v-if="activity.content=='已转办'">转办状态：{{ getOptVal(opts_all.obj.toushu_status,activity.logable.status) }}</div>
                                <div v-if="activity.content=='已转办'" style="padding: 6px 0;">
                                    <el-button
                                        size="small"
                                        @click="clickFuncOpenPopup2(activity.tgtid)"
                                    >
                                        转办状态
                                    </el-button>
                                    <el-button
                                        size="small"
                                        @click="clickFuncOpenPopup4(activity.logable,data_1.details_data.id,activity.tgtid)"
                                    >
                                        添加处理
                                    </el-button>
                                </div>
                                <div v-if="activity.content=='已回复'" style="padding: 6px 0;">
                                    <el-button
                                        size="small"
                                        @click="clickFuncOpenPopup3(activity.logable)"
                                    >
                                        修改处理
                                    </el-button>
                                </div>
                                <div v-if="activity.content=='已回复'">
                                    <div class="item">
                                        <div class="left">处理对象</div>
                                        <div class="right">
                                            {{ getOptVal(opts_all.obj.toushu_return_type,activity.logable.type) }}
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="left">回复内容</div>
                                        <div class="right">
                                            {{ activity.logable.content }}
                                        </div>
                                    </div>
                                    <div v-if="activity.logable.affixs&&activity.logable.affixs.length>0" class="item">
                                        <div class="left">回复附件</div>
                                        <div class="right">
                                            <!-- 两种模式任君选择 -->
                                            <el-imag v-for="(item,i) in activity.logable.affixs" :key="i" :preview-src-list="activity.logable.affixs" style="width: 100px; height: 100px;margin-right: 10px;" :src="item" fit="cover" />
                                            <!-- <div v-for="(item,i) in activity.logable.affixs">
                                                <el-link type="success" :href="item" target="_blank">{{ item }}</el-link>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="data_1.details_switch = false">取消</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 转办 -->
        <el-dialog
            v-model="popup_1.switch"
            title="转办"
            width="400px"
        >
            <el-form
                :model="popup_1.form"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24">
                        <el-form-item
                            label="投诉转办对象" prop="name"
                            :error="popup_1.msg&&popup_1.msg.type?popup_1.msg.type[0]:''"
                        >
                            <el-select v-model="popup_1.form.type" class="head-btn" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.toushu_return_type" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="popup_1.switch=false">取消</el-button>
                    <el-button type="primary" @click="popupFuncAdd">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 状态 -->
        <el-dialog
            v-model="popup_2.switch"
            title="转办状态"
            width="400px"
        >
            <el-form
                :model="popup_2.form"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24">
                        <el-form-item
                            label="投诉转办状态" prop="name"
                            :error="popup_2.msg&&popup_2.msg.status?popup_2.msg.status[0]:''"
                        >
                            <el-select v-model="popup_2.form.status" class="head-btn" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.toushu_status" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="popup_2.switch=false">取消</el-button>
                    <el-button type="primary" @click="popupFuncAdd2">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 修改投诉处理 -->
        <el-dialog
            v-model="popup_3.switch"
            :title="popup_3.title"
            width="40%"
        >
            <el-form
                :model="popup_3.form"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="处理对象" prop="name"
                            :error="popup_3.msg&&popup_3.msg.type?popup_3.msg.type[0]:''"
                        >
                            <el-select v-model="popup_3.form.type" class="head-btn" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.toushu_return_type" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="标记"
                            :error="popup_3.msg&&popup_3.msg.flg?popup_3.msg.flg[0]:''"
                        >
                            <el-select v-model="popup_3.form.flg" class="head-btn" clearable placeholder="">
                                <el-option v-for="(item,i) in opts_all.obj.flg_type" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="70px"
                            label="附件"
                            :error="popup_3.msg&&popup_3.msg.affix?popup_3.msg.affix[0]:''"
                        >
                            <el-upload
                                ref="uploadRef"
                                action="***"
                                :auto-upload="false"
                                :file-list="file_list3"
                                :on-change="(file,files)=>{
                                    file_list3 = files
                                }"
                                :on-remove="(file,files)=>{
                                    file_list3 = files
                                }"
                            >
                                <el-button type="primary">选择附件</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="70px"
                            label="内容"
                            :error="popup_3.msg&&popup_3.msg.content?popup_3.msg.content[0]:''"
                        >
                            <el-input
                                v-model="popup_3.form.content"
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
                    <el-button @click="popup_3.switch=false">取消</el-button>
                    <el-button type="primary" @click="popupFuncAdd3">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 添加违建 -->
        <el-dialog
            v-model="popup_4.switch"
            title="为投诉添加违建"
            width="400px"
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
                    <el-col v-if="opts_all.obj.illegal_type&&opts_all.obj.illegal_type[0]&&(popup_4.form.type==opts_all.obj.illegal_type[0].key)" :xs="24" :sm="24" :md="24">
                        <el-form-item
                            label-width="70px"
                            label="违建ID"
                            :error="popup_4.msg&&popup_4.msg.tgt?popup_4.msg.tgt[0]:''"
                        >
                            <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                <SearchHouse v-model:str="popup_4.form.tgt" />
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
    details_data: {},
    details_switch: false
})
const getFuncVoteList = () => {
    let data = {
        page: data_1.page,
        per_page: data_1.per_page
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
    })
}
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
                    console.log(data_1.add_form.catpro)
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
        data_1.details_data = res
        data_1.details_switch = true
    })
}
// 转办
const popup_1 = reactive({
    switch: false,
    form: {},
    msg: {}
})
const clickFuncAllot = val => {
    popup_1.msg = {}
    popup_1.form = {
        id: val.id
    }
    popup_1.switch = true
}
import {
    APIpostAllot
} from '@/api/custom/custom.js'
const popupFuncAdd = val => {
    popup_1.msg = {}
    APIpostAllot(popup_1.form.id, { type: popup_1.form.type }).then(res => {
        console.log(res)

        ElMessage.success('转办成功')
        popup_1.switch = false
        refreshFunc()
    }).catch(err => {
        ElMessage.error('转办失败')
    })
}
// 转办状态
const popup_2 = reactive({
    switch: false,
    form: {},
    msg: {}
})
const clickFuncOpenPopup2 = id => {
    popup_2.msg = {}
    popup_2.form = {
        id: id
    }
    popup_2.switch = true
}
import {
    APIputAllot
} from '@/api/custom/custom.js'
const popupFuncAdd2 = val => {
    popup_2.msg = {}
    APIputAllot(popup_2.form.id, { status: popup_2.form.status }).then(res => {
        ElMessage.success(res.msg)
        popup_2.switch = false
        refreshFunc()
        clickFuncDeteails(data_1.details_data)
    }).catch(err => {
        popup_2.msg = err.data
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
const clickFuncOpenPopup3 = val => {
    popup_3.msg = {}
    popup_3.title = '修改投诉处理'
    popup_3.tid = ''
    popup_3.form = {
        caid: val.id,
        content: val.content,
        affix: val.affix,
        type: val.type,
        flg: val.flg
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
import {
    APIpostIllegal
} from '@/api/custom/custom.js'
const popupFuncAdd4 = val => {
    popup_4.msg = {}
    let data = {
        type: popup_4.form.type,
        status: popup_4.form.status
    }
    APIpostIllegal(popup_4.form.id, popup_4.form).then(() => {
        ElMessage.success('添加违建成功')
        popup_4.switch = false
        refreshFunc()
    }).catch(err => {
        ElMessage.error('添加违建失败')
    })
}
// 待处理点击事件
const index = ref(1)
const noDeal = val => {
    index.value = val
    data_1.page = 1
    data_1.list.type = 0
    let data1 = {
        page: data_1.page,
        per_page: data_1.per_page,
        kind: 2,
        status: val
    }
    APIgetComplaintList(data1).then(res => {
        console.log(res)
        data_1.total = res.length
        data_1.list = res
    })
}
const flag = ref(true)
const StatusFunk = val => {
    noDeal(val)
    console.log(index.value)
    flag.value = !flag.value
}
const integer = ref(false)
import {
    APIpostAdComment,
    APIgetAdCommentList
} from '@/api/custom/custom.js'
const switchFunk = () => {
    // row.comment == 1
    if (data_1.list.comment == 1) {
        APIpostAdComment(data_1.add_form.id, { scoreper: 10 }).then(res => {
            console.log(res)
        })
    }
    // data_1.add_form = {
    //     comment: row.comment,
    //     king: 2
    // }
    // data_1.add_form.comment == row.comment
    // data_1.add_form.kind == 2
    // APIputComplaint(row.id, data_1.add_form).then(res => {
    //     console.log(data_1.add_form.comment)
    //     getFuncVoteList()
    // }).catch(err => {})
    // APIgetAdCommentList(id).then(res => {
    //     console.log(res)
    // })
    // APIgetComplaintDetails(row.id).then(res => {
    //     console.log(res)
    //     data_1.add_form = res
    // let arr = []
    // for (let i in res.affix) {
    //     if (res.affix[i]) {
    //         arr.push({
    //             name: res.affix[i]
    //         })
    //     }
    // }
    // file_list.value = arr
    // data_1.add_switch = true
    // })
    // console.log(res)
    // APIputComplaint(row.id, data_1.add_form).then(res => {
    //     console.log(data_1.add_form)
    //     getFuncVoteList()
    // }).catch(err => {})
}

/* ----------------------------------------------------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------------------------------------------------- */
const refreshFunc = () => {
    data_1.search = {
        kind: 2
    }
    data_1.switch_search = false
    data_1.page = 1
    index.value = 9
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
import { Search, Plus } from '@element-plus/icons-vue'
</script>
<style lang="scss" scoped>
    ::v-deep .el-cascader {
        width: 100%;
    }
    .search {
        background-color: #fafafa;
        height: 150px;
        width: 100%;
        padding: 20px;
        margin-bottom: 15px;
    }
    .searchKey {
        margin-right: 10px;
    }
    .searchSele {
        margin: 10px 0 0 15px;
    }
    .btn {
        margin-bottom: 15px;
    }
    .noDeal {
        margin-left: 12px;
    }
    .details {
        text-decoration: inherit;
        font-size: small;
        margin: 0 10px;
    }
    .el-button--small {
        height: 32px;
        width: 58px;
    }
    .el-badge {
        margin-right: 25px;
    }
</style>
