<template>
    <div class="articletplarticle">
        <page-main>
            <el-row :gutter="10">
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-input v-model="data_search.obj.cid" class="head-btn" placeholder="公示分类ID" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-input v-model="data_search.obj.totype" class="head-btn" placeholder="公示对象类型" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-input v-model="data_search.obj.reltype" class="head-btn" placeholder="关联对象类型" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-input v-model="data_search.obj.dep_id" class="head-btn" placeholder="发布人用户组ID" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-input v-model="data_search.obj.depcc" class="head-btn" placeholder="depcc" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-input v-model="data_search.obj.depcclv" class="head-btn" placeholder="depcclv" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-input v-model="data_search.obj.uid" class="head-btn" placeholder="发布人ID" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-input v-model="data_search.obj.utype" class="head-btn" placeholder="发布人用户端" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-input v-model="data_search.obj.lv" class="head-btn" placeholder="等级" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-input v-model="data_search.obj.status" class="head-btn" placeholder="状态" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-input v-model="data_search.obj.step" class="head-btn" placeholder="流程" clearable />
                </el-col>
                <!-- <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                        <el-select v-model="data_search.status_cert" class="head-btn" placeholder="认证状态" clearable>
                            <el-option v-for="(item,i) in opts_all.obj.status_cert" :key="item.key" :label="item.val" :value="item.key" />
                        </el-select>
                    </el-col> -->
                <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="el-cascader-box-my">
                        <div class="head-btn">
                            <el-date-picker
                                v-model="data_search.updated_at"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="更新时间"
                                end-placeholder="更新时间"
                                style="width: 100%;"
                                value-format="YYYY-MM-DD"
                            />
                        </div>
                    </el-col> -->
                <el-col :xs="12" :sm="8" :md="6" :lg="2" :xl="3">
                    <el-button class="head-btn" type="primary" @click="searchFunc">搜索</el-button>
                </el-col>
            </el-row>
            <div v-show="switch_search" class="search-tips">
                <el-button style="margin-right: 10px;" @click="refreshFunc">重置</el-button>
                *搜索到相关结果共{{ total }}条。
            </div>
            <el-row :gutter="20" class="bottom-btn-box-2">
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                    <el-button class="head-btn" type="primary" @click="addResidentialFunc">添加公示</el-button>
                </el-col>
            </el-row>
            <el-table
                v-loading="loading_tab"
                :data="data_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;border: 1px solid #ebeef4;box-sizing: border-box;"
            >
                <el-table-column label="标题" width="180">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ scope.row.title }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="等级" width="180">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ scope.row.lv }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="公示对象类型" width="180">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ scope.row.totype }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="关联对象类型" width="180">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ scope.row.reltype }} </span>
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="340">
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
                            size="small"
                            type="info"
                            @click="addArchiveFunc(scope.row)"
                        >
                            审核记录
                        </el-button>
                        <el-button
                            :disabled="scope.row.status==200"
                            size="small"
                            type="danger"
                            @click="passAudit(scope.row)"
                        >
                            审核
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column />
            </el-table>
            <el-pagination
                v-model:current-page="page"
                style="padding-top: 20px;"
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
            width="50%"
        >
            <el-form
                ref="ruleFormRef"
                :model="from_examine.item"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="120px"
                            label="标题"
                            :error="from_error.msg&&from_error.msg.title?from_error.msg.title[0]:''"
                        >
                            <el-input
                                v-model="from_examine.item.title"
                                placeholder=""
                            />
                            <!-- <el-select v-model="from_examine.item.auth_type" class="head-btn" placeholder="终端类型" clearable>
                                <el-option label="总平台" value="pt" />
                            </el-select> -->
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="公示分类ID"
                            label-width="120px"
                            :error="from_error.msg&&from_error.msg.cid?from_error.msg.cid[0]:''"
                        >
                            <el-input
                                v-model="from_examine.item.cid"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="公示对象类型"
                            label-width="120px"
                            :error="from_error.msg&&from_error.msg.totype?from_error.msg.totype[0]:''"
                        >
                            <el-input
                                v-model="from_examine.item.totype"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="公示对象ID"
                            label-width="120px"
                            :error="from_error.msg&&from_error.msg.toval?from_error.msg.toval[0]:''"
                        >
                            <el-input
                                v-model="from_examine.item.toval"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="关联对象类型"
                            label-width="120px"
                            :error="from_error.msg&&from_error.msg.reltype?from_error.msg.reltype[0]:''"
                        >
                            <el-input
                                v-model="from_examine.item.reltype"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="关联对象ID"
                            label-width="120px"
                            :error="from_error.msg&&from_error.msg.relval?from_error.msg.relval[0]:''"
                        >
                            <el-input
                                v-model="from_examine.item.relval"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="开始时间"
                            label-width="120px"
                            :error="from_error.msg&&from_error.msg.start_at?from_error.msg.start_at[0]:''"
                        >
                            <el-input
                                v-model="from_examine.item.start_at"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="结束时间"
                            label-width="120px"
                            :error="from_error.msg&&from_error.msg.end_at?from_error.msg.end_at[0]:''"
                        >
                            <el-input
                                v-model="from_examine.item.end_at"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="发布人用户组ID"
                            label-width="120px"
                            :error="from_error.msg&&from_error.msg.dep_id?from_error.msg.dep_id[0]:''"
                        >
                            <el-input
                                v-model="from_examine.item.dep_id"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="等级"
                            label-width="120px"
                            :error="from_error.msg&&from_error.msg.lv?from_error.msg.lv[0]:''"
                        >
                            <el-input
                                v-model="from_examine.item.lv"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="公示内容"
                            label-width="120px"
                            :error="from_error.msg&&from_error.msg.content?from_error.msg.content[0]:''"
                        >
                            <el-input
                                v-model="from_examine.item.content"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="流程"
                            label-width="120px"
                            :error="from_error.msg&&from_error.msg.step?from_error.msg.step[0]:''"
                        >
                            <el-input
                                v-model="from_examine.item.step"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="未完成任务ID"
                            label-width="120px"
                            :error="from_error.msg&&from_error.msg.taskid?from_error.msg.taskid[0]:''"
                        >
                            <el-input
                                v-model="from_examine.item.taskid"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="状态"
                            label-width="120px"
                            :error="from_error.msg&&from_error.msg.status?from_error.msg.status[0]:''"
                        >
                            <el-input
                                v-model="from_examine.item.status"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
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
                    <div class="left">标题</div>
                    <div class="right">{{ data_details.item.title }}</div>
                </div>
                <div class="item">
                    <div class="left">公示ID</div>
                    <div class="right">{{ data_details.item.id }}</div>
                </div>
                <div class="item">
                    <div class="left">公示分类ID</div>
                    <div class="right">{{ data_details.item.cid }}</div>
                </div>
                <div class="item">
                    <div class="left">公示对象类型</div>
                    <div class="right">{{ data_details.item.totype }}</div>
                </div>
                <div class="item">
                    <div class="left">公示对象ID</div>
                    <div class="right">{{ data_details.item.toval }}</div>
                </div>
                <div class="item">
                    <div class="left">关联对象类型</div>
                    <div class="right">{{ data_details.item.reltype }}</div>
                </div>
                <div class="item">
                    <div class="left">关联对象ID</div>
                    <div class="right">{{ data_details.item.relval }}</div>
                </div>
                <div class="item">
                    <div class="left">开始时间</div>
                    <div class="right">{{ data_details.item.start_at }}</div>
                </div>
                <div class="item">
                    <div class="left">结束时间</div>
                    <div class="right">{{ data_details.item.end_at }}</div>
                </div>
                <div class="item">
                    <div class="left">发布人用户组ID</div>
                    <div class="right">{{ data_details.item.dep_id }}</div>
                </div>
                <div class="item">
                    <div class="left">等级</div>
                    <div class="right">{{ data_details.item.lv }}</div>
                </div>
                <div class="item">
                    <div class="left">公示内容</div>
                    <div class="right">{{ data_details.item.content }}</div>
                </div>
                <div class="item">
                    <div class="left">流程</div>
                    <div class="right">{{ data_details.item.step }}</div>
                </div>
                <div class="item">
                    <div class="left">未完成任务ID</div>
                    <div class="right">{{ data_details.item.taskid }}</div>
                </div>
                <div class="item">
                    <div class="left">状态</div>
                    <div class="right">{{ data_details.item.status }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 档案下的公示 -->
        <el-dialog
            v-model="switch_article"
            title="审核"
            width="70%"
        >
            <el-table
                :data="article_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;border: 1px solid #ebeef4;box-sizing: border-box;"
            >
                <el-table-column label="ID" width="250">
                    <template #default="scope">
                        <span>{{ scope.row.id }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="公示ID" width="250">
                    <template #default="scope">
                        <span>{{ scope.row.aid }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="通过" width="90">
                    <template #default="scope">
                        <span>{{ scope.row.pass }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="答复" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.reply }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="流程" width="90">
                    <template #default="scope">
                        <span>{{ scope.row.step }} </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default="scope">
                        <el-button
                            size="small"
                            @click="lookDetails(scope.row)"
                        >
                            详情
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column />
            </el-table>
            <el-pagination
                v-model:current-page="page2"
                layout="total,prev,pager,next,jumper,"
                :total="total2"
                :page-size="per_page2"
                background
                hide-on-single-page
                style="padding-top: 20px;"
            />
        </el-dialog>
        <!-- 详情 -->
        <el-dialog
            v-model="switch_audit"
            title="详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">ID</div>
                    <div class="right">{{ details_audit.obj.id }}</div>
                </div>
                <div class="item">
                    <div class="left">公示ID</div>
                    <div class="right">{{ details_audit.obj.aid }}</div>
                </div>
                <div class="item">
                    <div class="left">发布人ID</div>
                    <div class="right">{{ details_audit.obj.uid }}</div>
                </div>
                <div class="item">
                    <div class="left">通过</div>
                    <div class="right">{{ details_audit.obj.pass }}</div>
                </div>
                <div class="item">
                    <div class="left">答复</div>
                    <div class="right">{{ details_audit.obj.reply }}</div>
                </div>
                <div class="item">
                    <div class="left">流程</div>
                    <div class="right">{{ details_audit.obj.step }}</div>
                </div>
                <div class="item">
                    <div class="left">发布人用户端</div>
                    <div class="right">{{ details_audit.obj.utype }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_audit = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 修改添加 -->
        <el-dialog
            v-model="switch_pass"
            title="审核"
            width="50%"
        >
            <el-form
                ref="ruleFormRef"
                :model="from_pass.obj"
            >
                <el-steps :active="gongshixiangqing.obj.status == 200?99:active_bzt" finish-status="success" :align-center="true" style="margin-bottom: 20px;">
                    <el-step v-for="(item,i) in buzhoutiao.arr" :title="item.name" />
                </el-steps>
                <div v-if="gongshixiangqing.obj.status == 200" style="width: 100%;text-align: center;font-size: 16px;color: #aaaaaa;">
                    当前公示已审核完成
                </div>
                <el-row v-else :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label="审核"
                            label-width="100px"
                            :error="err_msg.obj&&err_msg.obj.cid?err_msg.obj.cid[0]:''"
                        >
                            <el-select v-model="from_pass.obj.pass" class="head-btn" placeholder="" clearable>
                                <el-option label="审核通过" value="1" />
                                <el-option label="不通过" value="0" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="100px"
                            label="审核回执内容"
                            :error="err_msg.obj&&err_msg.obj.title?err_msg.obj.title[0]:''"
                        >
                            <el-input
                                v-model="from_pass.obj.reply"
                                :autosize="{ minRows: 2, maxRows: 10 }"
                                type="textarea"
                                placeholder="审核回执内容"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_pass=false">取消</el-button>
                    <el-button v-if="gongshixiangqing.obj.status != 200" type="primary" @click="passToAuditFunc">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
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
    page.value = 1
    switch_search.value = false
    data_search.obj = {}
    getTabListFunc()
}

// 详情
const detailsFunc = val => {
    data_dialog.obj = val
    APIgetEventArticleDetails(val.id).then(res => {
        if (!res.code) {
            data_details.item = res.data
            switch_details.value = true
        }
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
                APIputEventArticle(from_examine.item.id, from_examine.item).then(res => {
                    if (!res.code) {
                        refreshFunc()
                        ElMessage.success(res.msg)
                        switch_examine.value = false
                    }
                }).catch(err => {
                    from_error.msg = err.data
                })
            } else {
                APIpostEventArticle(from_examine.item).then(res => {
                    if (!res.code) {
                        refreshFunc()
                        ElMessage.success(res.msg)
                        switch_examine.value = false
                    }
                }).catch(err => {
                    from_error.msg = err.data
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
    APIgetEventArticleList(params).then(res => {
        if (res.code === 0) {
            loading_tab.value = false
            data_tab.arr = res.data.items
            total.value = res.data.aggregation.total_cnt
        }
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteEventArticle(val.id).then(res => {
        if (res.code === 0) {
            refreshFunc()
            ElMessage.success(res.msg)
        }
    })
}
// 添加
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        property_owners: [],
        house_id: '',
        time_deal: '',
        code_property: '',
        code_room: '',
        should_bind_house: ''
    }
    switch_examine.value = true
}
// 修改
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    APIgetEventArticleDetails(val.id).then(res => {
        if (!res.code) {
            from_examine.item = res.data
            switch_examine.value = true
        }
    })
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 审核
const switch_article = ref(false)
const article_item = reactive({
    obj: {}
})
const article_tab = reactive({
    obj: {}
})
const page2 = ref(1)
const total2 = ref(74751)
const per_page2 = ref(15)
const addArchiveFunc = val => {
    article_item.obj = val
    switch_article.value = true
    refreshFuncArticle()
}
const refreshFuncArticle = () => {
    page2.value = 1
    getListArchiveFunc()
}
import {
    APIgetListArchiveAudit,
    APIgetDetailsArchiveAudit,
    APIpostArchiveAudit
} from '@/api/custom/custom.js'
const getListArchiveFunc = () => {
    let params = {
        page: page2.value,
        per_page: per_page2.value
    }
    APIgetListArchiveAudit(article_item.obj.id, params).then(res => {
        article_tab.arr = res.data.items
        total2.value = res.data.aggregation.total_cnt
    })
}
const switch_audit = ref(false)
const details_audit = reactive({
    obj: {}
})
const lookDetails = val => {
    APIgetDetailsArchiveAudit(article_item.obj.id, val.id).then(res => {
        details_audit.obj = res.data
        switch_audit.value = true
    })
}
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
const active_bzt = ref(99)
import { APIgetFlowStepList } from '@/api/custom/custom.js'
const passAudit = val => {
    from_pass.obj = {}
    err_msg.obj = {}
    // 获取详情
    APIgetEventArticleDetails(val.id).then(res => {
        gongshixiangqing.obj = res.data
        // 获取步骤条
        APIgetFlowStepList(res.data.flowstep.fid).then(res2 => {
            buzhoutiao.arr = res2.data
            for (let i in res2.data) {
                if (res.data.flowstep.id == res2.data[i].id) {
                    nextTick(() => {
                        active_bzt.value = i * 1
                    })
                    break
                }
            }
        })
    })
    switch_pass.value = true
}
const passToAuditFunc = () => {
    APIpostArchiveAudit(gongshixiangqing.obj.id, from_pass.obj).then(res => {
        if (!res.code) {
            ElMessage.success(res.msg)
            refreshFunc()
            passAudit(gongshixiangqing.obj)
        }
    }).catch(err => {
        err_msg.obj = err.data
    })
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
getOpts(['status_cert', 'other_auth']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss">
	.articletplarticle {
		.el-cascader-box-my {
			.el-cascader {
				width: 100% !important;
				margin-bottom: 10px;
			}
		}

		.serve-box {
			border: 1px solid #eeeeee;
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
				background-color: #ffffff;
			}
		}
	}
</style>
<style lang="scss" scoped>
	.articletplarticle {
		.head-btn {
			width: 100%;
			margin-bottom: 10px;
		}
	}

	.search-tips {
		color: #aaaaaa;
		font-size: 14px;
		margin-bottom: 20px;
	}

	.details-box {
		.item {
			display: flex;
			color: #333333;
			font-size: 16px;
			margin-bottom: 20px;
			border-bottom: 1px solid #eee;
			padding-bottom: 10px;

			.left {
				box-sizing: border-box;
				width: 160px;
				white-space: nowrap;
				margin-right: 20px;
				text-align: right;
				font-weight: 600;
			}

			.left::after {
				content: '：';
			}

			.right {
				width: 100%;
				color: #666666;
			}
		}

		.item:last-child {
			border-style: none;
		}
	}
</style>
