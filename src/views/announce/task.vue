<template>
    <div class="articletpltask">
        <page-main style="overflow: hidden;">
            <div class="m-b-20">
                <el-button
                    type="primary" :icon="Plus" size="large"
                    @click="addResidentialFunc"
                >
                    添加任务
                </el-button>
            </div>
            <div class="search">
                <el-row>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="10" class="search_th">
                                任务派发单位：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="14">
                                <div class="searchUserGroup">
                                    <SearchUserGroup ref="V_2" @checkName="checkNameFunc_2" />
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="10" class="search_th">
                                公示分类：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="14">
                                <CascaderAnnounce v-model="data_search.obj.cid" />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="10" class="search_th">
                                是否完成：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="14">
                                <el-select v-model="data_search.obj.iscpt" class="search_tb" placeholder="是否完成" clearable>
                                    <el-option v-for="item in opts_all.obj.task_ok" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="0" :sm="4" :md="3" :lg="2" />
                    <el-col :xs="24" :sm="20" :md="21" :lg="22">
                        <el-button type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                        <el-button v-show="switch_search == true" class="m-l-20 m-r-10" :icon="Loading" @click="refreshFunc_1">重置</el-button>
                        <span v-show="switch_search == true" class="size-base">
                            *共搜索到{{ total }}条。
                        </span>
                    </el-col>
                </el-row>
            </div>
            <el-table
                v-loading="loading_tab"
                :data="data_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                class="tab_1"
            >
                <el-table-column label="任务接收单位">
                    <template #default="scope">
                        <!-- <span class="m-l-10">{{ getNameFunc(userData.arr,scope.row.to) }}</span> -->
                        <span class="m-l-10">{{ scope.row.togroup?.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="公示分类">
                    <template #default="scope">
                        <span class="m-l-10">{{ scope.row.cate?.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="接收单位等级">
                    <template #default="scope">
                        <span class="m-l-10">{{ getOptVal(opts_all.obj.article_lv_1,scope.row.tolv) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="是否完成">
                    <template #default="scope">
                        <!-- <el-tag v-if=" scope.row.iscpt" type="success" size="small" round>已完成</el-tag> -->
                        <announceDetails v-if=" scope.row.iscpt == 1" :id="scope.row.aid" :name="announceName" />
                        <el-tag v-if="scope.row.iscpt == 0" type="danger" size="small" class="btnNone" round>未完成</el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="300">
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
                        <el-button
                            type="success" size="small" :disabled="scope.row.aid ? true: false"
                            @click="upResidentialFunc(scope.row)"
                        >
                            发布公示
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-model:current-page="page"
                style="float: right;"
                layout="prev,next,jumper,"
                :total="50"
                :page-size="per_page"
                background
                prev-text="上一页"
                next-text="下一页"
                hide-on-single-page
            />
        </page-main>
        <!-- 修改添加 -->
        <el-dialog
            v-model="switch_examine"
            :title="str_title"
            width="50%"
            @closed="add_dialog_close"
        >
            <el-form
                ref="ruleFormRef"
                :model="from_examine.item"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="任务派发单位"
                            label-width="100px"
                            :error="from_error.msg&&from_error.msg.from?from_error.msg.from[0]:''"
                        >
                            <div class="searchUserGroup">
                                <SearchUserGroup ref="V_1" v-model:name="usergroupName" @checkName="checkNameFunc" />
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="接收单位等级"
                            label-width="100px"
                            :error="from_error.msg&&from_error.msg.tolv?from_error.msg.tolv[0]:''"
                        >
                            <el-select v-model="from_examine.item.tolv" class="head-btn" placeholder="" clearable>
                                <el-option v-for="item in opts_all.obj.article_lv_1" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="任务接收单位"
                            label-width="100px"
                            :error="from_error.msg&&from_error.msg.to?from_error.msg.to[0]:''"
                        >
                            <div class="searchUserGroup">
                                <SearchUserGroup ref="V" v-model:name="usergroupName_1" @checkName="checkNameFunc_1" />
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="公示分类"
                            label-width="100px"
                            :error="from_error.msg&&from_error.msg.cid?from_error.msg.cid[0]:''"
                        >
                            <CascaderAnnounce v-model="from_examine.item.cid" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="footer">
                    <el-button @click="switch_examine=false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc(ruleFormRef)">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog
            v-model="switch_details"
            title="详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">任务派发单位</div>
                    <div class="right">{{ data_details.item.fromgroup?.name }}</div>
                </div>
                <div class="item">
                    <div class="left">公示分类</div>
                    <div class="right">{{ data_details.item.cate?.name }}</div>
                </div>
                <div class="item">
                    <div class="left">接收单位等级</div>
                    <div class="right">{{ getOptVal(opts_all.obj.article_lv_1,data_details.item.tolv) }}</div>
                </div>
                <div class="item">
                    <div class="left">任务接收单位</div>
                    <div class="right">{{ data_details.item.togroup?.name }}</div>
                </div>
                <!-- <div class="item">
                    <div class="left">任务单位</div>
                    <div class="right">{{ getOptVal(opts_all.obj.article_lv,data_details.item.tolv ) }}</div>
                </div> -->
                <!-- <div class="item">
                    <div class="left">任务部门</div>
                    <div class="right">{{ data_details.item.todata.name }}</div>
                </div> -->
                <!-- <div class="item">
                    <div class="left">公示分类</div>
                    <div class="right">{{ data_details.item.cate.name }}</div>
                </div> -->
                <div class="item">
                    <div class="left">是否完成</div>
                    <div class="right">
                        <el-tag v-if=" data_details.item.iscpt" type="success" effect="dark" round class="btnNone">已完成</el-tag>
                        <el-tag v-if=" data_details.item.iscpt" class="m-l-10 btnNone" type="default" round>查看{{ data_details.item.aid }}</el-tag>
                        <el-tag v-if="!data_details.item.iscpt" type="danger" effect="dark" round class="btnNone">未完成</el-tag>
                    </div>
                </div>
                <div class="item">
                    <div class="left">任务ID</div>
                    <div class="right">{{ data_details.item.id }}</div>
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
        </el-dialog>
        <!-- 发布公示 -->
        <el-dialog
            v-model="switch_announce"
            title="发布公示"
            width="50%"
            @closed="dialogClosed"
        >
            <el-form
                ref="ruleFormRef"
                :model="from_examine.item"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="公示主题"
                            :error="from_error.msg&&from_error.msg.title?from_error.msg.title[0]:''"
                        >
                            <el-input
                                v-model="announce.item.title"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="100px"
                            label="文号"
                            :error="from_error.msg&&from_error.msg.proof?from_error.msg.proof[0]:''"
                        >
                            <el-input
                                v-model="announce.item.proof"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="公示分类"
                            label-width="100px"
                            :error="from_error.msg&&from_error.msg.cid?from_error.msg.cid[0]:''"
                        >
                            <CascaderAnnounce v-model="announce.item.cid" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="公示区域"
                            label-width="100px"
                            :error="from_error.msg&&from_error.msg.toval?from_error.msg.toval[0]:''"
                        >
                            <!-- <CascaderTypeAndID v-model:totype="from_examine.item.totype" v-model:toval="from_examine.item.toval" :disableds="[]" :zone="true" :tips="''" /> -->
                            <!-- <Cascaders v-model="from_examine.item.toval" /> -->
                            <div
                                class="total"
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
                            label-width="100px"
                            :error="from_error.msg&&from_error.msg.start_at?from_error.msg.start_at[0]:''"
                        >
                            <el-date-picker
                                v-model="announce.item.start_at"
                                type="datetime"
                                value-format="YYYY-MM-DD HH:mm:ss"
                                placeholder=""
                                class="w_100"
                                :default-value="new Date()"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="结束时间"
                            label-width="100px"
                            :error="from_error.msg&&from_error.msg.end_at?from_error.msg.end_at[0]:''"
                        >
                            <el-date-picker
                                v-model="announce.item.end_at"
                                type="datetime"
                                value-format="YYYY-MM-DD HH:mm:ss"
                                placeholder=""
                                class="w_100"
                                :default-value="new Date()"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="发布单位"
                            label-width="100px"
                            :error="from_error.msg&&from_error.msg.dep_id?from_error.msg.dep_id[0]:''"
                        >
                            <div class="wh_100">
                                <div class="searchUserGroup">
                                    <SearchUserGroup ref="V_3" @checkName="checkNameFunc" />
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label="公示内容"
                            label-width="100px"
                            :error="from_error.msg&&from_error.msg.content?from_error.msg.content[0]:''"
                        >
                            <editor v-model="announce.item.content" class="w_100" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div class="m-b-10" style="margin-left: 33px;">
                            <el-button type="success" plain @click="addServiceFunc">添加附件</el-button>
                        </div>
                        <div v-for="(item,i) in announce.item.affix" :key="i" class="serve-box">
                            <el-row :gutter="10">
                                <el-col :xs="12" :sm="12" class="p-t-10">
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
                    <el-col :md="24" :lg="24">
                        <div class="m-b-10" style="margin-left: 33px;">
                            <el-button type="primary" plain @click="addServiceFunc_1">添加自定义字段</el-button>
                        </div>
                        <div v-for="(item, i) in announce.item.custom" :key="i" class="serve-box">
                            <el-row :gutter="10" class="p-t-20">
                                <el-col :xs="12" :sm="12">
                                    <el-form-item
                                        label="字段名"
                                        :error="from_error.msg && from_error.msg['extra.' + i + '.lab'] ? from_error.msg['extra.' + i + '.lab'][0] : ''"
                                    >
                                        <el-input v-model="item.label" placeholder="" />
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="12" :sm="12">
                                    <el-form-item
                                        label="字段内容"
                                        :error="from_error.msg && from_error.msg['extra.' + i + '.val'] ? from_error.msg['extra.' + i + '.val'][0] : ''"
                                    >
                                        <el-input v-model="item.val" placeholder="" />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <div class="delete-service" @click="deleteServiceFunc_1(i)">
                                <el-icon :size="20" color="#F56C6C">
                                    <el-icon-circle-close />
                                </el-icon>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="footer">
                    <el-button @click="switch_announce=false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc1(ruleFormRef)">确定</el-button>
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
import {
    APIgetTaskList,
    APIgetTaskDetails,
    APIdeleteTask,
    APIputTask,
    APIpostTask
} from '@/api/custom/custom.js'
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
import { Loading, Search, Plus } from '@element-plus/icons-vue'
/* ----------------------------------------------------------------------------------------------------------------------- */
// 数据
// 搜索
let switch_search = ref(false)
let data_search = reactive({
    obj: {}
})
// 详情
let switch_details = ref(false)
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
// dialog关闭回调
const V = ref(null)
const V_1 = ref(null)
const add_dialog_close = () => {
    V.value.clearFunc()
    V_1.value.clearFunc()
    usergroupName.value = ''
    usergroupName_1.value = ''
}
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(1)
// 添加，修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {}
})
const str_title = ref('添加')
const from_error = reactive({
    msg: {}
})
const announceName = ref('公示')
/* ----------------------------------------------------------------------------------------------------------------------- */
// 方法
// 搜索
const searchFunc = () => {
    page.value = 1
    switch_search.value = true
    getTabListFunc()
}
// 刷新
const V_2 = ref(null)
const refreshFunc = () => {
    page.value = 1
    switch_search.value = false
    data_search.obj = {}
    getTabListFunc()
}
const refreshFunc_1 = () => {
    V_2.value.clearFunc()
    refreshFunc()
}
// 详情
const detailsFunc = val => {
    data_dialog.obj = val
    APIgetTaskDetails(val.id).then(res => {
        data_details.item = res
        switch_details.value = true
    })
}

// 监听分页
watch(page, () => {
    getTabListFunc()
})
// 同意拒绝提交
const dialogExamineCloseFunc = formEl => {
    from_error.msg = {}
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            if (str_title.value == '修改') {
                console.log(from_examine.item)
                APIputTask(from_examine.item.id, from_examine.item).then(res => {
                    refreshFunc()
                    ElMessage.success('修改成功')
                    switch_examine.value = false
                }).catch(err => {
                    ElMessage.error('修改失败')
                })
            } else {
                // console.log(str_father)
                APIpostTask(from_examine.item).then(res => {
                    refreshFunc()
                    ElMessage.success('添加成功')
                    switch_examine.value = false
                }).catch(err => {
                    ElMessage.error('添加失败')
                })
            }
        } else {
            return false
        }
    })
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
    APIgetTaskList(params).then(res => {
        console.log(res)
        loading_tab.value = false
        data_tab.arr = res
        total.value = res.length
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
// 删除
const deleteFunc = val => {
    APIdeleteTask(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
// 发布公示
const switch_announce = ref(false)
const announce = reactive({
    item: {
        custom: []
    }
})
const selectedZone_id = ref('')
const switch_choose_zone = ref(false)
const upResidentialFunc = row => {
    announce.item = {
        custom: []
    }
    announce.item.taskid = row.id
    getChinaName()
    switch_announce.value = true
}
const tree_item = ref({})
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
        announce.item.toval = val.china_code
        announce.item.totype = 6
    } else {
        announce.item.toval = val.id
        if (val.id.length <= 6) {
            announce.item.totype = 3
        } else if (val.id.length <= 9) {
            announce.item.totype = 4
        } else if (val.id.length <= 12) {
            announce.item.totype = 5
        }
    }
    selectedZone_id.value = val.name
}
const checkChangeFunc = () => {
    switch_choose_zone.value = false
}
const fileChange = (val, i) => {
    announce.item.affix[i].file = val.target.files[0].name
}
import { getFilesKeys } from '@/util/files.js'
import { APIpostEventArticle } from '@/api/custom/custom.js'
const dialogExamineCloseFunc1 = formEl => {
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            let files_arr = []
            for (let i in announce.item.affix) {
                files_arr.push(announce.item.affix[i].file)
            }
            delete announce.item.relid
            if (files_arr.length <= 0) {
                APIpostEventArticle(announce.item).then(res => {
                    refreshFunc()
                    ElMessage.success('发布成功')
                    switch_announce.value = false
                }).catch(err => {
                    ElMessage.error('发布失败')
                })
                return false
            }
            getFilesKeys(files_arr, 'announce').then(files => {
                for (let i in files) {
                    announce.item.affix[i].file = files[i]
                }
                APIpostEventArticle(announce.item).then(res => {
                    refreshFunc()
                    ElMessage.success('发布成功')
                    switch_announce.value = false
                }).catch(err => {
                    ElMessage.error('发布失败')
                })
            })
        }

    })
}
// 添加 附件
const addServiceFunc = index => {
    let data = {
        'title': '',
        'file': ''
    }
    if (!announce.item.affix) {
        announce.item.affix = []
    }
    announce.item.affix.push(data)
}
const chooseFile = i => {
    const file = document.getElementById('fileRef' + i)
    file.click()
}
// 删除 附件
const deleteServiceFunc = index => {
    announce.item.affix.splice(index, 1)
}
// 删除字段
const deleteServiceFunc_1 = index => {
    announce.item.custom.splice(index, 1)
}
// 添加字段
const addServiceFunc_1 = index => {
    let data = {
        'label': '',
        'val': ''
    }
    announce.item.custom.push(data)
}
// 添加
const addResidentialFunc = () => {

    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        // property_owners: [],
        // house_id: '',
        // time_deal: '',
        // code_property: '',
        // code_room: '',
        // should_bind_house: '',
        // from: 'tgt54bvfg564545ggtgt34gh',
        // tolv: 4,
        // to: '43tdtg54y6h6',
        // cid: '37vfgdgrt5465gftyy67fg45'
    }
    switch_examine.value = true
}
// 修改
const usergroupName = ref('')
const usergroupName_1 = ref('')
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    APIgetTaskDetails(val.id).then(res => {
        from_examine.item = res
        switch_examine.value = true
        usergroupName.value = res.fromgroup?.name
        usergroupName_1.value = res.togroup?.name
    })

}
// 选择用户组name
// const userName = ref('')
const checkNameFunc_2 = val => {
    data_search.obj.from = val.id
}
const checkNameFunc = val => {

    from_examine.item.from = val.id
    console.log(from_examine.item.from)
}
const V_3 = ref(null)
const dialogClosed = () => {
    V_3.value.clearFunc()
    selectedZone_id.value = ''
}
const checkNameFunc_1 = val => {
    from_examine.item.to = val.id
    console.log(from_examine.item.to)
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['article_lv_1', 'task_ok']).then(res => {
    opts_all.obj = res
})

</script>
<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
.el-form-item__content {
    overflow: hidden;
}
.total {
    width: 100%;
    height: 32px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
}
.selecChina {
    margin-left: 11px;
    color: #aaa;
}
</style>
