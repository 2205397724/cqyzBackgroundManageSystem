<template>
    <div class="articletplarchive">
        <page-main class="hidden">
            <div class="m-b-20">
                <el-button
                    type="primary" :icon="Plus" size="large"
                    @click="addResidentialFunc"
                >
                    添加归档
                </el-button>
            </div>
            <div class="search">
                <el-row>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                名称：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-input v-model="data_search.name" class="search_tb" placeholder="名称" />
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="0" :sm="4" :md="3" :lg="2" />
                    <el-col :xs="24" :sm="20" :md="21" :lg="22">
                        <el-button type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                        <el-button v-show="switch_search == true" class="m-l-20 m-r-10" :icon="Loading" @click="refreshFunc">重置</el-button>
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
                <el-table-column prop="name" label="归档名" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.name }} </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="name" label="归档内容数量" width="180">
                    <span> {{ total2 }} </span>
                </el-table-column> -->
                <el-table-column prop="id" label="ID" width="250">
                    <template #default="scope">
                        <span>{{ scope.row.id }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.created_at }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="updated_at" label="更新时间" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.updated_at }} </span>
                    </template>
                </el-table-column>

                <el-table-column />
                <el-table-column fixed="right" label="操作" width="230">
                    <template #default="scope">
                        <el-button
                            type="success" size="small"
                            @click="openArticleFunc(scope.row)"
                        >
                            已归档公示
                        </el-button>
                        <el-button
                            type="primary" size="small"
                            @click="modifyArticleFunc(scope.row)"
                        >
                            修改
                        </el-button>
                        <el-popconfirm
                            title="确定要删除当前项么?" cancel-button-type="info"
                            @confirm="deleteFunc(scope.row)"
                        >
                            <template #reference>
                                <el-button
                                    type="danger" size="small"
                                >
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
                <el-table-column />
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
            width="400px"
        >
            <el-form
                ref="ruleFormRef"
                :model="from_examine.item"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24">
                        <el-form-item
                            label="归档名称" prop="name"
                            :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                        >
                            <el-input
                                v-model="from_examine.item.name"
                                placeholder=""
                            />
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
        <!-- 档案下的公示 -->
        <el-dialog
            v-model="switch_article"
            title="已归档公示"
            width="60%"
        >
            <el-row :gutter="20" class="bottom-btn-box-2">
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                    <el-button class="m-b-20" type="primary" :icon="Plus" size="large" @click="addArchiveFunc">添加公示</el-button>
                </el-col>
            </el-row>
            <el-table
                :data="article_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                class="tab_1"
            >
                <el-table-column label="公示主题">
                    <template #default="scope">
                        <span>{{ scope.row.title }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="公示对象" width="220">
                    <template #default="scope">
                        <span>{{ scope.row.toval }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="公示对象类型">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.article_lv,scope.row.totype) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="180">
                    <template #default="scope">
                        <el-tag v-show="scope.row.status == 1" class="btnNone" type="primary" effect="dark" size="small">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 2" class="btnNone noDeal" type="warning" effect="dark" size="small">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 3" class="btnNone" type="warning" size="small">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 4" class="btnNone" type="success" size="small">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 5" class="btnNone" type="info" size="small">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 6" class="btnNone" type="info" size="small">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 7" class="btnNone" type="info" size="small">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-tag>
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="160">
                    <template #default="scope">
                        <!-- <el-button
                        size="small"
                        @click="lookDetails(scope.row)"
                    >
                        详情
                    </el-button> -->
                        <el-popconfirm
                            title="确定要删除当前项么?" cancel-button-type="info"
                            @confirm="deleteFuncDialog(scope.row)"
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
                v-model:current-page="page2"
                layout="total,prev,pager,next,jumper,"
                :total="total2"
                :page-size="per_page2"
                background
                hide-on-single-page
                class="p-t-20"
            />
        </el-dialog>
        <!-- 归档添加 -->
        <el-dialog
            v-model="switch_add"
            title="添加归档公示"
            width="50%"
            @closed="dialogClosed"
        >
            <el-form
                ref="ruleFormRef"
                :model="from_add.obj"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="选择公示"
                            :error="err_msg.obj&&err_msg.obj.article_id?err_msg.obj.article_id[0]:''"
                        >
                            <div class="wh_100">
                                <div class="searchUserGroup">
                                    <!-- <SearchArchive v-model:str="from_add.obj.article_id" /> -->
                                    <SearchArchive ref="V" @checkUserNameFunc="checkUserNameFunc" />
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="footer">
                    <el-button @click="switch_add=false">取消</el-button>
                    <el-button type="primary" @click="addPostFunc">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 归档公示详情 -->
        <el-dialog
            v-model="switch_details"
            title="公示详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">公示ID</div>
                    <div class="right">{{ details_data.obj.id }}</div>
                </div>
                <div class="item">
                    <div class="left">公示主题</div>
                    <div class="right">{{ details_data.obj.title }}</div>
                </div>
                <div class="item">
                    <div class="left">内容</div>
                    <div class="right">{{ details_data.obj.content }}</div>
                </div>
                <div class="item">
                    <div class="left">创建时间</div>
                    <div class="right">{{ details_data.obj.created_at }}</div>
                </div>
                <div class="item">
                    <div class="left">更新时间</div>
                    <div class="right">{{ details_data.obj.updated_at }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import SearchArchive from '@/components/SearchArchive/index.vue'
import {
    APIgetArchiveList,
    APIdeleteArchive,
    APIputArchive,
    APIpostArchive
} from '@/api/custom/custom.js'
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
import { Search, Plus, Loading } from '@element-plus/icons-vue'
/* ----------------------------------------------------------------------------------------------------------------------- */
// 数据
// 搜索
let switch_search = ref(false)
let data_search = reactive({})
// 列表
let ruleFormRef = ref('')
let loading_tab = ref(false)
let data_tab = reactive({
    arr: []
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
    data_search.name = ''
    getTabListFunc()

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
                APIputArchive(from_examine.item.id, from_examine.item).then(() => {
                    refreshFunc()
                    ElMessage.success('修改成功')
                    switch_examine.value = false
                }).catch(() => {
                    ElMessage.success('修改成功')
                })
            } else {
                APIpostArchive(from_examine.item).then(() => {
                    refreshFunc()
                    ElMessage.success('添加成功')
                    switch_examine.value = false
                }).catch(() => {
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
    for (let key in data_search) {
        if (data_search[key] || data_search[key] === 0) {
            if (data_search[key] instanceof Array && data_search[key].length <= 0) {
                continue
            }
            params[key] = data_search[key]
        }
    }
    if (params.time_deal) {
        let updated_str = ''
        for (let i in params.time_deal) {
            updated_str += ',' + params.time_deal[i]
        }
        params.time_deal = updated_str.substring(1)
    }
    if (params.created_at) {
        let updated_str = ''
        for (let i in params.created_at) {
            updated_str += ',' + params.created_at[i]
        }
        params.created_at = updated_str.substring(1)
    }
    if (params.updated_at) {
        let updated_str = ''
        for (let i in params.updated_at) {
            updated_str += ',' + params.updated_at[i]
        }
        params.updated_at = updated_str.substring(1)
    }
    loading_tab.value = true
    APIgetArchiveList(params).then(res => {
        console.log(res)
        loading_tab.value = false
        data_tab.arr = res
        total.value = res.length
        let btnNext = document.querySelector('.btn-next')
        if (res.length < per_page.value) {
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
// 删除
const deleteFunc = val => {
    APIdeleteArchive(val.id).then(() => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
// 添加档案
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        name: ''
    }
    switch_examine.value = true
}
// 修改
const modifyArticleFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    from_examine.item = {
        ...val
    }
    switch_examine.value = true

}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 归档
const switch_article = ref(false)
const article_item = reactive({
    obj: {}
})
const article_tab = reactive({
    obj: {}
})
const page2 = ref(1)
const total2 = ref(1)
const per_page2 = ref(15)
const openArticleFunc = val => {
    article_item.obj = val
    switch_article.value = true
    getListArchiveFunc()
}
import {
    APIgetListArticleArchive,
    // APIgetDetailsArchiveArticle,
    APIpostArticleArchive,
    APIdeleteArticleArchive
} from '@/api/custom/custom.js'
// const refreshFuncArticle = () => {
//     page2.value = 1
//     getListArchiveFunc()
// }
const getListArchiveFunc = () => {
    let params = {
        page: page2.value,
        per_page: per_page2.value
    }
    APIgetListArticleArchive(article_item.obj.id, params).then(res => {
        console.log(res)
        article_tab.arr = res
        total2.value = res.length
    })
}
const switch_add = ref(false)
const err_msg = reactive({
    obj: {}
})
const from_add = reactive({
    obj: {}
})
const V = ref(null)
const addArchiveFunc = () => {

    switch_add.value = true
    from_add.obj = {}
}
const dialogClosed = () => {
    V.value.clearFunc()
}
const addPostFunc = () => {
    APIpostArticleArchive(article_item.obj.id, from_add.obj).then(() => {
        getListArchiveFunc()
        switch_add.value = false
    }).catch(() => {
        ElMessage.error('添加失败')
    })
}
const switch_details = ref(false)
const details_data = reactive({
    obj: {}
})
const deleteFuncDialog = val => {
    APIdeleteArticleArchive(article_item.obj.id, val.id).then(() => {
        getListArchiveFunc()
    })
}
// 选择用户组name
const checkUserNameFunc = val => {
    from_add.obj.article_id = val.id
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
getOpts(['announce_status', 'article_lv']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
::v-deep .el-cascader {
    width: 100% !important;
}
.noDeal {
    margin-left: 6px;
}
</style>
