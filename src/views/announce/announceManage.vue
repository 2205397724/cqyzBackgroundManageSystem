<template>
    <div class="articletplarticle">
        <page-main>
            <div>
                <el-button class="head-btn" type="primary" :icon="Plus" @click="addResidentialFunc">发布公示</el-button>
            </div>
            <div class="search">
                <el-row :gutter="10">
                    <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">公示分类：</div>
                            <div class="search_tb">
                                <CascaderAnnounce v-model="data_search.obj.cid" />
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">发布人用户组：</div>

                            <div class="search_tb">
                                <div class="searchUserGroup">
                                    <SearchUserGroup ref="V_1" @checkName="checkNameFunc" />
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">状态：</div>

                            <el-select v-model="data_search.obj.status" class="search_tb" placeholder="审核状态" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.announce_status" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="m-t-20">
                    <el-col :xs="24" :md="24" :lg="10">
                        <div class="flx">
                            <div class="w_30">
                                <el-button class="m-l-20" type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                            </div>
                            <div v-show="switch_search == true" class="w_70 m-l-30">
                                <el-button class="m-r-10" @click="refreshFunc_1">重置</el-button>
                                <div class="searchDetail">
                                    *搜索到相关结果共{{ total }}条。
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-table
                v-loading="loading_tab"
                :data="data_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                class="tab_1"
            >
                <el-table-column label="公示主题">
                    <template #default="scope">
                        <span>{{ scope.row.title }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="公示分类">
                    <template #default="scope">
                        <span>{{ scope.row.cate.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="公示对象" width="160">
                    <template #default="scope">
                        <span>{{ scope.row.toval }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="公示对象类型">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.article_lv,scope.row.totype) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="用户组">
                    <template #default="scope">
                        <span>{{ scope.row.authorgroup.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template #default="scope">
                        <el-tag v-show="scope.row.status == 1" class="btnNone" type="primary" effect="dark" size="large" @click="noExamineFunc(scope.row)">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 2" class="btnNone noDeal" type="warning" effect="dark" size="large">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 3" class="btnNone" type="warning" effect="dark" size="large">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 4" class="btnNone" type="success" effect="dark" size="large">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 5" class="btnNone" type="info" effect="dark" size="large">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="280">
                    <template #default="scope">
                        <el-button
                            type="primary" size="small"
                            @click="modifyResidentialFunc(scope.row)"
                        >
                            修改
                        </el-button>
                        <el-button
                            size="small"
                        >
                            <AnnounceDetails :id="scope.row.id" :name="announceName" />
                        </el-button>
                        <!-- <span style="display: inline-block; width: 30px;"> -->
                        <!-- <AnnounceDetails :id=""></AnnounceDetails> -->
                        <!-- </span> -->
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
                        <!-- <el-button
                            size="small"
                            type="primary"
                            @click="passAudit(scope.row)"
                        >
                            审核
                        </el-button> -->
                        <BerComment :id="scope.row.id" />
                    </template>
                </el-table-column>
                <el-table-column />
            </el-table>
            <el-pagination
                v-model:current-page="page"
                class="p-t-20"
                layout="total,prev,pager,next,jumper,"
                :total="total"
                :page-size="per_page"
                background
                hide-on-single-page
            />
        </page-main>
        <!-- 修改添加 -->
        <el-dialog
            v-model="switch_examine"
            :title="str_title"
            width="70%"
            @closed="add_dialog_close"
        >
            <!-- <template> -->
            <el-steps :active="active" finish-status="success" space="30%" align-center>
                <el-step title="填写公式信息">
                    <!-- <div style="width: 300px; height: 300px;"> -->
                    <!-- </div> -->
                    <!-- <el-button style="margin-top: 12px;" @click="next">Next step</el-button> -->
                </el-step>
                <el-step title="发起审核申请" />
                <el-step title="完成" />
            </el-steps>
            <div style="width: 100%; margin-top: 40px; margin-bottom: 20px;">
              <!-- <el-scrollbar max-height="550px"> -->
                <el-form
                    v-if="active == 0"
                    ref="ruleFormRef"
                    :model="from_examine.item"
                >
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="120px"
                                label="公示主题"
                                :error="from_error.msg&&from_error.msg.title?from_error.msg.title[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.title"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="120px"
                                label="文号"
                                :error="from_error.msg&&from_error.msg.proof?from_error.msg.proof[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.proof"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="公示对象类型"
                            label-width="120px"
                            :error="from_error.msg&&from_error.msg.lv?from_error.msg.lv[0]:''"
                        >
                            <el-select v-model="from_examine.item.totype" placeholder="" clearable style="width: 100%;">
                                <el-option v-for="(item,i) in opts_all.obj.article_lv" :key="item.key" :label="item.key == from_examine.item.totype ? item.val : item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col> -->
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="公示分类"
                                label-width="120px"
                                :error="from_error.msg&&from_error.msg.cid?from_error.msg.cid[0]:''"
                            >
                                <CascaderAnnounce v-model="from_examine.item.cid" />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="公示对象"
                                label-width="120px"
                                :error="from_error.msg&&from_error.msg.toval?from_error.msg.toval[0]:''"
                            >
                                <!-- <CascaderTypeAndID v-model:totype="from_examine.item.totype" v-model:toval="from_examine.item.toval" :disableds="[]" :zone="true" :tips="''" /> -->
                                <!-- <Cascaders v-model="from_examine.item.toval" /> -->
                                <div
                                    class="selecZone"
                                    @click="switch_choose_zone = true"
                                >
                                    <span v-if="!selectedZone_id" class="selecChina">区域</span>
                                    <span class="m-l-10">{{ selectedZone_id }}</span>
                                </div>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col v-if="from_examine.item.reltype||from_examine.item.reltype===0" :xs="24" :sm="24" :md="24" :lg="12" :xl="12"> -->
                        <!-- <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="关联对象"
                            label-width="120px"
                            :error="from_error.msg&&from_error.msg.relval?from_error.msg.relval[0]:''"
                        >
                            <el-input
                                v-model="from_examine.item.relid"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col> -->
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="开始时间"
                                label-width="120px"
                                :error="from_error.msg&&from_error.msg.start_at?from_error.msg.start_at[0]:''"
                            >
                                <el-date-picker
                                    v-model="from_examine.item.start_at"
                                    type="datetime"
                                    value-format="YYYY-MM-DD HH:mm:ss"
                                    placeholder=""
                                    class="w-100"
                                    :default-value="new Date()"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="结束时间"
                                label-width="120px"
                                :error="from_error.msg&&from_error.msg.end_at?from_error.msg.end_at[0]:''"
                            >
                                <el-date-picker
                                    v-model="from_examine.item.end_at"
                                    type="datetime"
                                    value-format="YYYY-MM-DD HH:mm:ss"
                                    placeholder=""
                                    class="w-100"
                                    :default-value="new Date()"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="发布人用户组"
                                label-width="120px"
                                :error="from_error.msg&&from_error.msg.dep_id?from_error.msg.dep_id[0]:''"
                            >
                                <div class="wh_100">
                                    <div class="searchUserGroup">
                                        <SearchUserGroup ref="V" v-model:name="userGroupName" @checkName="checkNameFunc" />
                                    </div>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item
                                label="公示内容"
                                label-width="120px"
                                :error="from_error.msg&&from_error.msg.content?from_error.msg.content[0]:''"
                            >
                                <editor v-model="from_examine.item.content" class="w-100" />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <div class="m-b-10">
                                <el-button type="primary" plain @click="addServiceFunc">添加附件</el-button>
                            </div>
                            <div v-for="(item,i) in from_examine.item.affix" :key="i" class="serve-box">
                                <el-row :gutter="10">
                                    <el-col :xs="12" :sm="12" class="m-t-10">
                                        <el-form-item label="附件名称" :error="from_error.msg&&from_error.msg['affix.'+i+'.title']?from_error.msg['affix.'+i+'.title'][0]:''">
                                            <el-input
                                                v-model="item.title"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="12" :sm="12" class="p-t-10">
                                        <el-form-item label="附件" :error="from_error.msg&&from_error.msg['affix.'+i+'.file']?from_error.msg['affix.'+i+'.file'][0]:''">
                                            <input v-show="false" :id="'fileRef'+i" :ref="'fileRef'+i" type="file" @change="(val)=>{fileChange(val,i)}">
                                            <el-button @click="chooseFile(i)">{{ item.file||'添加附件' }}</el-button>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <div class="delete-service" @click="deleteServiceFunc(i)">
                                    <el-icon :size="20" color="#F56C6C">
                                        <el-icon-circle-close />
                                    </el-icon>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- </el-scrollbar> -->
                <el-form
                    v-if="active == 1"
                    ref="ruleFormRef"
                    :model="from_pass.obj"
                >
                    <el-steps :active="gongshixiangqing.obj.status == opts_all.obj.status_all[1]?99:active_bzt" finish-status="success" :align-center="true" class="m-b-20">
                        <el-step v-for="(item,i) in buzhoutiao.arr" :key="i" :title="item.name" />
                    </el-steps>
                    <div v-if="gongshixiangqing.obj.status == opts_all.obj.status_all[1]" class="pass">
                        当前公示已审核完成
                    </div>
                    <el-row v-else :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item
                                label="审核申请"
                                label-width="100px"
                                :error="err_msg.obj&&err_msg.obj.pass?err_msg.obj.pass[0]:''"
                            >
                                <!-- <el-select v-model="from_pass.obj.status" class="head-btn" placeholder="" clearable>
                                <el-option label="审核通过" value="1" />
                                <el-option label="不通过" value="0" />
                            </el-select> -->
                                <el-switch
                                    v-model="from_pass.obj.status"

                                    style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                                    active-text="通过"
                                    inactive-text="失败"
                                    :active-value="10"
                                    :inactive-value="0"
                                    class="switchStyle"
                                    :disabled="total1>= 1 ? true: false"
                                />
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item
                                label-width="100px"
                                label="审核回执内容"
                                :error="err_msg.obj&&err_msg.obj.reply?err_msg.obj.reply[0]:''"
                            >
                                <el-input
                                    v-model="from_pass.obj.reply"
                                    :autosize="{ minRows: 2, maxRows: 10 }"
                                    type="textarea"
                                    placeholder="审核回执内容"
                                    :disabled="total1>=1 ? true: false"
                                />
                            </el-form-item>
                        </el-col> -->
                    </el-row>
                </el-form>
            </div>
            <el-button v-if="active !== 2" style="position: absolute; right: 33px; bottom: 14px;" size="largr" type="primary" @click="next">下一步</el-button>
            <el-button v-if="active == 2" style="position: absolute; right: 33px; bottom: 14px;" size="largr" type="primary" @click="next">完成</el-button>
            <!-- </template> -->
            <!-- <template #footer>
                <div class="footer">
                    <el-button @click="switch_examine=false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc(ruleFormRef)">确定</el-button>
                </div>
            </template> -->
        </el-dialog>
        <!-- 审核 -->
        <el-dialog
            v-model="switch_pass"
            title="审核"
            width="50%"
        >
            <el-form
                ref="ruleFormRef"
                :model="from_pass.obj"
            >
                <el-steps :active="gongshixiangqing.obj.status == opts_all.obj.status_all[1]?99:active_bzt" finish-status="success" :align-center="true" class="m-b-20">
                    <el-step v-for="(item,i) in buzhoutiao.arr" :key="i" :title="item.name" />
                </el-steps>
                <div v-if="gongshixiangqing.obj.status == opts_all.obj.status_all[1]" class="pass">
                    当前公示已审核完成
                </div>
                <el-row v-else :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label="审核申请"
                            label-width="100px"
                            :error="err_msg.obj&&err_msg.obj.pass?err_msg.obj.pass[0]:''"
                        >
                            <!-- <el-select v-model="from_pass.obj.status" class="head-btn" placeholder="" clearable>
                                <el-option label="审核通过" value="1" />
                                <el-option label="不通过" value="0" />
                            </el-select> -->
                            <el-switch
                                v-model="from_pass.obj.status"

                                style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                                active-text="通过"
                                inactive-text="失败"
                                :active-value="20"
                                :inactive-value="30"
                                class="switchStyle"
                                :disabled="total1>= 1 ? true: false"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="100px"
                            label="审核回执内容"
                            :error="err_msg.obj&&err_msg.obj.reply?err_msg.obj.reply[0]:''"
                        >
                            <el-input
                                v-model="from_pass.obj.reply"
                                :autosize="{ minRows: 2, maxRows: 10 }"
                                type="textarea"
                                placeholder="审核回执内容"
                                :disabled="total1>=1 ? true: false"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="footer">
                    <el-button @click="switch_pass=false">取消</el-button>
                    <el-button v-if="gongshixiangqing.obj.status != opts_all.obj.status_all[1]" type="primary" @click="passToAuditFunc_1">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 选择公示对象 -->
        <el-dialog v-model="switch_choose_zone" title="选择公示对象">
            <el-scrollbar height="250px">
                <position-tree-fourth :tree_item="tree_item" @checkFuncDate="checkFunc" @checkChangeFunc="checkChangeFunc" />
            </el-scrollbar>
        </el-dialog>
    </div>
</template>
<script setup>
// import CascaderTypeAndID from '@/components/CascaderTypeAndID/index.vue'
// import SearchResidential from '@/components/SearchResidential/index.vue'
// import CascaderType from '@/components/CascaderType/index.vue'
import SearchUserGroup from '@/components/SearchUserGroup/index.vue'
// import SearchUser from '@/components/SearchUser/index.vue'
// import SearchFlowStep from '@/components/SearchFlowStep/index.vue'

// const VITE_APP_FOLDER_SRC = ref(import.meta.env.VITE_APP_FOLDER_SRC)
import {
    APIgetEventArticleList,
    APIgetEventArticleDetails,
    APIdeleteEventArticle,
    APIputEventArticle,
    APIpostEventArticle
} from '@/api/custom/custom.js'
import {
    reactive,
    ref,
    watch,
    nextTick
} from 'vue'
import {
    ElMessage
} from 'element-plus'
import { Search, Plus } from '@element-plus/icons-vue'
/* ----------------------------------------------------------------------------------------------------------------------- */
// 数据
// 搜索
let switch_search = ref(false)
let data_search = reactive({
    obj: {}
})
const announceName = ref('公式')
// 详情
let switch_details = ref(false)
// dialog关闭回调
const V = ref(null)
const add_dialog_close = () => {
    V.value.clearFunc()
    selectedZone_id.value = ''
}
// 列表
let ruleFormRef = ref('')
let loading_tab = ref(false)
let data_tab = reactive({
    arr: []
})
// 操作事件 列表单个行数据
let data_dialog = reactive({
    obj: {}
})
// 详情
const data_details = reactive({
    item: ''
})
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(1)
// 添加，修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {
        custom: [],
        affix: [],
        groupcc: '',
        relid: '',
        groupid: ''
    }
})
const str_title = ref('添加')
const from_error = reactive({
    msg: {}
})
const userGroupName = ref('')
/* ----------------------------------------------------------------------------------------------------------------------- */
// 方法
// 搜索
const searchFunc = () => {
    page.value = 1
    switch_search.value = true
    getTabListFunc()
}
// 刷新
const refreshFunc = () => {
    // V.value.clearFunc()
    page.value = 1
    switch_search.value = false
    data_search.obj = {}
    getTabListFunc()
}
const V_1 = ref(null)
const refreshFunc_1 = () => {
    V_1.value.clearFunc()
    refreshFunc()
}
// 监听分页
watch(page, () => {
    getTabListFunc()
})
// const V_2 = ref(null)
// 详情
// const detailsFunc = row => {
//     switch_details.value = true
//     APIgetEventArticleDetails(row.id).then(res => {
//         data_details.item = res
//         console.log(data_details.item)
//         res.affixs = []
//         for (let i in res.affix) {
//             res.affixs.push(import.meta.env.VITE_APP_FOLDER_SRC + res.affix[i].file)
//         }
//     })
//     // V_2.value.getAnnounceDetailsFunc()
// }
// 同意拒绝提交
import { getFilesKeys } from '@/util/files.js'
const dialogExamineCloseFunc = () => {
    // console.log(formEl)
    // from_error.msg = {}
    // if (!formEl) return
    // formEl.validate(valid => {
    //     if (valid) {
    let files_arr = []
    for (let i in from_examine.item.affix) {
        files_arr.push(from_examine.item.affix[i].file)
    }
    if (files_arr.length <= 0) {
        if (str_title.value == '修改') {
            // from_examine.item = {
            //     custom: [],
            //     groupcc: '',
            //     taskid: ''
            // }
            from_examine.item.custom = []
            from_examine.item.relid = 'ggtr4535'
            from_examine.item.taskid = 'gdhfth454g'
            APIputEventArticle(from_examine.item.id, from_examine.item).then(res => {
                refreshFunc()
                // ElMessage.success('修改成功')
                // switch_examine.value = false
            }).catch(err => {
                ElMessage.error('修改失败')
            })
        } else {
            APIpostEventArticle(from_examine.item).then(res => {
                refreshFunc()
                // ElMessage.success('添加成功')
                // switch_examine.value = false
            }).catch(err => {
                ElMessage.error('添加失败')
            })
        }
        return false
    }
    getFilesKeys(files_arr, 'folder').then(files => {
        console.log(files)
        for (let i in files) {
            from_examine.item.affix[i].file = files[i]
        }
        if (str_title.value == '修改') {
            from_examine.item.custom = []
            from_examine.item.relid = 'ggtr4535'
            from_examine.item.groupcc = 'hgfjht56'
            from_examine.item.taskid = 'gdhfth454g'
            APIputEventArticle(from_examine.item.id, from_examine.item).then(res => {
                refreshFunc()
                // ElMessage.success('修改成功')
                // switch_examine.value = false
                // from_examine.item.status=
            }).catch(err => {
                ElMessage.error('修改失败')
            })
        } else {
            APIpostEventArticle(from_examine.item).then(res => {
                refreshFunc()
                // ElMessage.success('添加成功')
                // switch_examine.value = false
            }).catch(err => {
                ElMessage.error('添加失败')
            })
        }
    })
    // } else {
    //     return false
    // }
    // })
}
// 获取列表api请求
const getTabListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    for (let key in data_search.obj) {
        if (data_search.obj[key] || data_search.obj[key] === 0) {
            if (data_search.obj[key] instanceof Array && data_search.obj[key].length <= 0) {
                continue
            }
            params[key] = data_search.obj[key]
        }
    }
    loading_tab.value = true
    APIgetEventArticleList(params).then(res => {
        console.log(res)
        loading_tab.value = false
        data_tab.arr = res
        announce_id.value = getNameFunc(res, from_examine.item.title)
        group_id.value = from_examine.item.groupid
        total.value = res.length
        // console.log(announce_id.value)
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteEventArticle(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
// 添加
const addResidentialFunc = () => {
    from_pass.obj.reply = ''
    from_pass.obj.status = 0
    active.value = 0
    getChinaName()
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        // 'title': '气总造毛',
        // 'totype': 97,
        // 'toval': 'incididunt',
        // 'start_at': '2022-07-23 12:23:34',
        // 'end_at': '2022-07-25 12:23:34',
        // 'groupid': '45gdfgt687gvfdt54fgrt45f',
        // 'groupcc': 'irure',
        // 'grouplv': 45,
        // 'lv': 0,
        // 'affix': [
        //     {
        //         'title': '生口史',
        //         'file': 'ut dolore in'
        //     }
        // ],
        // 'custom': [],
        // 'content': 'minim et pariatur proident non',
        // 'taskid': '78',
        // 'relid': '46',
        // 'reltype': 0
    }
    switch_examine.value = true
    // passAudit()
}
// 修改
const modifyResidentialFunc = val => {
    from_pass.obj.reply = ''
    active.value = 0
    getChinaName()
    getUsergroupList()
    from_error.msg = {}
    str_title.value = '修改'
    switch_examine.value = true
    APIgetEventArticleDetails(val.id).then(res => {
        // console.log(res)
        // for (let key in res) {
        //     // if (key !== 'status') {
        //     from_examine.item[key] = val[key]
        //     // }
        // }
        delete res.status
        // console.log(from_examine.item)
        console.log(res)
        from_examine.item = res
        switch_examine.value = true
        announce_id.value = from_examine.item.id,
        group_id.value = from_examine.item.groupid
        userGroupName.value = getNameFunc_1(userData.arr, from_examine.item.groupid)
    })

}
const noExamineFunc = row => {
    from_pass.obj.reply = ''
    active.value = 0
    // APIgetDetailsArchiveAudit(row.id).then(res => {
    //     console.log(res)
    // })
    modifyResidentialFunc(row)
}
// 删除 附件
const deleteServiceFunc = index => {
    from_examine.item.affix.splice(index, 1)
}
// 添加 附件
const addServiceFunc = index => {
    let data = {
        'title': '',
        'file': ''
    }
    if (!from_examine.item.affix) {
        from_examine.item.affix = []
    }
    from_examine.item.affix.push(data)
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 步骤条
const active = ref(0)
const announce_id = ref('')
const group_id = ref('')
const total1 = ref(0)
const next = () => {
    if (active.value == 0) {
        dialogExamineCloseFunc()
        if (str_title.value == '修改') {
            console.log(announce_id.value)
            let params = {
                page: page.value,
                per_page: per_page.value,
                tgt_type: 'announce',
                tgt_id: announce_id.value,
                group_id: group_id.value
            }
            APIgetListArchiveAudit(params).then(res => {
                console.log(res)
                if (res.length >= 1) {
                    from_pass.obj.status = res[0].status,
                    from_pass.obj.reply = res[0].reply
                    total1.value = res.length
                } else {
                    from_pass.obj.status = 0
                    total1.value = 0
                }
            })
        }
        active.value = 1
    } else if (active.value == 1) {
        console.log(str_title.value)
        if (str_title.value == '添加' || total1.value == 0) {
            passToAuditFunc()
        }
        active.value = 2
    } else {
        switch_examine.value = false
    }
}
// 审核
import {
    APIpostArchiveAudit,
    APIgetListArchiveAudit,
    APIputArchiveAudit,
    APIgetDetailsArchiveAudit
} from '@/api/custom/custom.js'

const switch_pass = ref(false)
const from_pass = reactive({
    obj: {}
})
const err_msg = reactive({
    obj: {}
})
const gongshixiangqing = reactive({
    obj: {}
})
const buzhoutiao = reactive({
    arr: []
})
const examineListFunc = val => {
    let params = {
        page: page.value,
        per_page: per_page.value,
        tgt_type: 'announce',
        tgt_id: val.id,
        group_id: val.groupid
    }
    APIgetListArchiveAudit(params).then(res => {
        console.log(res)
        Examine_id.value = res[0].id
        switch_pass.value = true
    })
}
const active_bzt = ref(99)
const Examine_id = ref('')
const passAudit = val => {
    from_pass.obj = {}
    err_msg.obj = {}
    examineListFunc(val)
    // 获取详情
    // APIgetDetailsArchiveAudit(val.id).then(res => {
    // if (res.status == 10) {
    // console.log(res)
    // gongshixiangqing.obj = res
    // }
    // 获取步骤条
    // APIgetStepList(res.data.flowstep.fid).then(res2 => {
    //     buzhoutiao.arr = res2
    //     for (let i in res2) {
    //         if (res.flowstep.id == res2[i].id) {
    //             nextTick(() => {
    //                 active_bzt.value = i * 1
    //             })
    //             break
    //         }
    //     }
    // })
    // console.log(gongshixiangqing.obj)
    // })
}
const passToAuditFunc_1 = () => {
    console.log(from_pass.obj)
    APIputArchiveAudit(Examine_id.value, from_pass.obj).then(res => {
        ElMessage.success('审核成功')
        getTabListFunc()
    })
}
const passToAuditFunc = () => {
    // let data = {
    //     'tgt_type': 'announce',
    //     'tgt_id': gongshixiangqing.obj.id,
    //     'group_id': gongshixiangqing.obj.groupid
    // }
    from_pass.obj.tgt_type = 'announce'
    from_pass.obj.tgt_id = announce_id.value
    from_pass.obj.group_id = group_id.value
    console.log(from_pass.obj)
    APIpostArchiveAudit(from_pass.obj).then(res => {
        // ElMessage.success('审核成功')
        refreshFunc()
        // passAudit(gongshixiangqing.obj)
        switch_pass.value = false
    }).catch(err => {
        ElMessage.success('审核失败')
    })
}
const fileChange = (val, i) => {
    from_examine.item.affix[i].file = val.target.files[0].name
}
const chooseFile = i => {
    const file = document.getElementById('fileRef' + i)
    file.click()
}
// 选择公示对象
const tree_item = ref({})
const switch_choose_zone = ref(false)
const selectedZone_id = ref('')
import { APIgetChinaRegion } from '@/api/custom/custom.js'
const getChinaName = () => {
    APIgetChinaRegion().then(res => {
        console.log(res)
        tree_item.value.id = res.data[0].code
        tree_item.value.name = res.data[0].name
        tree_item.value.next_type = 'region'
        tree_item.value.type = 'region'
    })
}
const checkFunc = val => {
    console.log(val)
    if (val.type == 'zone') {
        from_examine.item.toval = val.china_code
        from_examine.item.totype = 6
    } else {
        from_examine.item.toval = val.id
        if (val.id.length <= 6) {
            from_examine.item.totype = 3
        } else if (val.id.length <= 9) {
            from_examine.item.totype = 4
        } else if (val.id.length <= 12) {
            from_examine.item.totype = 5
        }
    }
    selectedZone_id.value = val.name
}
const checkChangeFunc = () => {
    switch_choose_zone.value = false
}
// 选择用户组name
const userData = reactive({
    arr: []
})
const checkNameFunc = val => {
    console.log(val)
    data_search.obj.groupid = val.id
    from_examine.item.groupid = val.id
    userGroupName.value = ''
}
import {
    APIgetGroupList
} from '@/api/custom/custom.js'
const getUsergroupList = () => {
    APIgetGroupList().then(res => {
        if (res.status == 200) {
            console.log(res)
            userData.arr = res.data
        }
    })
}
const getNameFunc = (arr, key) => {
    for (let i in arr) {
        if (arr[i].title == key) {
            return arr[i].id
        }
    }
}
const getNameFunc_1 = (arr, key) => {
    for (let i in arr) {
        if (arr[i].id == key) {
            return arr[i].name
        }
    }
}
// 获取类别名称
// let data_1 = reactive({
//     arr: []
// })
// import {
//     APIgetTypeList
// } from '@/api/custom/custom.js'
// // 获取公式列表api请求
// const main_type = ref('announce')
// APIgetTypeList(main_type.value).then(res => {
//     console.log(res)
//     data_1.arr = res
// })
/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {
        status_all: []
    }
})
getOpts(['article_lv', 'article_type', 'terminal', 'article_lv', 'status_all', 'announce_status']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss">
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
.el-form-item__content {
    overflow: hidden;
}
</style>
<style lang="scss" scoped>
.search-tips {
    color: #aaa;
    font-size: 14px;
    margin-bottom: 20px;
}
.switchStyle ::v-deep .el-switch__label {
    position: absolute !important;
    display: none !important;
    color: #fff !important;
    width: 80px;
}
.switchStyle ::v-deep .el-switch__label--left {
    z-index: 9 !important;
    left: 17px !important;
}
.switchStyle ::v-deep .el-switch__label--right {
    z-index: 9 !important;
    left: -5px !important;
}
.switchStyle ::v-deep .el-switch__label.is-active {
    display: block !important;
}
.switchStyle.el-switch ::v-deep .el-switch__core,
.switchStyle ::v-deep .el-switch__label {
    width: 60px !important;
}
.noDeal {
    margin-left: 6px;
}
::v-deep .el-cascader {
    width: 100% !important;
}
.selecZone {
    width: 100%;
    height: 32px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    .selecChina {
        margin-left: 11px;
        color: #aaa;
    }
}
.pass {
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #aaa;
}
.el-steps {
    margin-left: 70px;
}
::v-deep .el-date-editor.el-input {
    width: 100%;
}
</style>
