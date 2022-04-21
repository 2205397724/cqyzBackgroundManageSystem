<template>
    <div class="articletplarchive">
        <page-main>
            <div>
                <div>
                    <el-row :gutter="10">
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-input v-model="data_search.name" class="head-btn" placeholder="名称" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="2" :xl="3">
                            <el-button class="head-btn" type="primary" @click="searchFunc">搜索</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div v-show="switch_search" class="search-tips">
                    <el-button style="margin-right: 10px;" @click="refreshFunc">重置</el-button>
                    *搜索到相关结果共{{ total }}条。
                </div>
                <div>
                    <el-row :gutter="20" class="bottom-btn-box-2">
                        <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                            <el-button class="head-btn" type="primary" @click="addResidentialFunc">添加档案</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div style="width: 100%; overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;">
                    <el-table
                        v-loading="loading_tab"
                        :data="data_tab.arr"
                        :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                        style="width: 100%;min-height: 300px;"
                    >
                        <el-table-column prop="name" label="档案名" width="180">
                            <template #default="scope">
                                <span>{{ scope.row.name }} </span>
                            </template>
                        </el-table-column>
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
                                    type="primary" size="small"
                                    @click="modifyResidentialFunc(scope.row)"
                                >
                                    修改
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
                                    @click="openArticleFunc(scope.row)"
                                >
                                    归档
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column />
                    </el-table>
                </div>
                <div style="padding-top: 20px;">
                    <el-pagination
                        v-model:current-page="page"
                        layout="total,prev,pager,next,jumper,"
                        :total="total"
                        :page-size="per_page"
                        background
                        hide-on-single-page
                    />
                </div>
            </div>
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
                            label="名称" prop="name"
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
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_examine=false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc(ruleFormRef)">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 档案下的公示 -->
        <el-dialog
            v-model="switch_article"
            title="归档"
            width="70%"
        >
            <el-row :gutter="20" class="bottom-btn-box-2">
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                    <el-button class="head-btn" type="primary" @click="addArchiveFunc">添加公示</el-button>
                </el-col>
            </el-row>
            <el-table
                :data="article_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;border: 1px solid #ebeef4;box-sizing: border-box;"
            >
                <el-table-column label="名称" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.title }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="ID" width="250">
                    <template #default="scope">
                        <span>{{ scope.row.id }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.status }} </span>
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="160">
                    <template #default="scope">
                        <el-button
                            size="small"
                            @click="lookDetails(scope.row)"
                        >
                            详情
                        </el-button>
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
        <!-- 归档添加 -->
        <el-dialog
            v-model="switch_add"
            title="添加公示"
            width="50%"
        >
            <el-form
                ref="ruleFormRef"
                :model="from_add.obj"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label="公示"
                            :error="err_msg.obj&&err_msg.obj.article_id?err_msg.obj.article_id[0]:''"
                        >
                            <div style="height: 100%;width: 100%;">
                                <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;font-size: 14px;">
                                    <SearchArchive v-model:str="from_add.obj.article_id" />
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_add=false">取消</el-button>
                    <el-button type="primary" @click="addPostFunc">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 归档公示详情 -->
        <el-dialog
            v-model="switch_details"
            title="详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">公示ID</div>
                    <div class="right">{{ details_data.obj.id }}</div>
                </div>
                <div class="item">
                    <div class="left">名称</div>
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
    data_search.mobile = ''
    data_search.username = ''
    data_search.id_card = ''
    data_search.name = ''
    data_search.gender = ''
    data_search.status_cert = ''
    data_search.house_id = ''
    data_search.oauth_type = ''
    data_search.region = ''
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
                APIputArchive(from_examine.item.id, from_examine.item).then(res => {
                    if (!res.code) {
                        refreshFunc()
                        ElMessage.success(res.msg)
                        switch_examine.value = false
                    }
                }).catch(err => {
                    from_error.msg = err.data
                })
            } else {
                APIpostArchive(from_examine.item).then(res => {
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
        if (res.code === 0) {
            loading_tab.value = false
            data_tab.arr = res.data.items
            total.value = res.data.aggregation.total_cnt
        }
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteArchive(val.id).then(res => {
        if (res.code === 0) {
            refreshFunc()
            ElMessage.success(res.msg)
        }
    })
}
// 添加档案
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
const total2 = ref(74751)
const per_page2 = ref(15)
const openArticleFunc = val => {
    article_item.obj = val
    switch_article.value = true
    refreshFuncArticle()
}
import {
    APIgetListArchiveArticle,
    APIgetDetailsArchiveArticle,
    APIpostArchiveArticle,
    APIdeleteArchiveArticle
} from '@/api/custom/custom.js'
const refreshFuncArticle = () => {
    page2.value = 1
    getListArchiveFunc()
}
const getListArchiveFunc = () => {
    let params = {
        page: page2.value,
        per_page: per_page2.value
    }
    APIgetListArchiveArticle(article_item.obj.id, params).then(res => {
        article_tab.arr = res.data.items
        total2.value = res.data.aggregation.total_cnt
    })
}
const switch_add = ref(false)
const err_msg = reactive({
    obj: {}
})
const from_add = reactive({
    obj: {}
})
const addArchiveFunc = () => {
    switch_add.value = true
    from_add.obj = {}
}
const addPostFunc = () => {
    APIpostArchiveArticle(article_item.obj.id, from_add.obj).then(res => {
        refreshFuncArticle()
        switch_add.value = false
    }).catch(err => {
        err_msg.obj = err.data
    })
}
const switch_details = ref(false)
const details_data = reactive({
    obj: {}
})
const lookDetails = val => {
    APIgetDetailsArchiveArticle(article_item.obj.id, val.id).then(res => {
        details_data.obj = res.data
        switch_details.value = true
    })
}
const deleteFuncDialog = val => {
    APIdeleteArchiveArticle(article_item.obj.id, val.id).then(res => {
        refreshFuncArticle()
    })
}

/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()
/* ----------------------------------------------------------------------------------------------------------------------- */

</script>
<style lang="scss">
    .articletplarchive {
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
    .articletplarchive {

    }
    .search-tips {
        color: #aaa;
        font-size: 14px;
        margin-bottom: 20px;
    }
    .details-box {
        .item {
            display: flex;
            color: #333;
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
                content: "：";
            }
            .right {
                width: 100%;
                color: #666;
            }
        }
        .item:last-child {
            border-style: none;
        }
    }
</style>
