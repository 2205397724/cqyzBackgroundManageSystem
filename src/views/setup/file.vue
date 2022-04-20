<template>
    <div class="userregister">
        <page-main>
            <div>
                <div>
                    <el-row :gutter="10">
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-input v-model="data_search.obj.name" class="head-btn" placeholder="文件名称" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-input v-model="data_search.obj.rid" class="head-btn" placeholder="文件ID" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-select v-model="data_search.obj.rtype" class="head-btn" placeholder="资源类型" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.resources_type" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-select v-model="data_search.obj.ftype" class="head-btn" placeholder="文件分类" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.file_type" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
                        <el-col :xs="24" :sm="16" :md="12" :lg="8" :xl="6">
                            <el-date-picker
                                v-model="data_search.obj.created_at"
                                class="head-btn"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="创建时间"
                                end-placeholder="创建时间"
                                value-format="YYYY-MM-DD"
                                clearable
                                style="width: 100%;margin-bottom: 10px;"
                            />
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
                <div style="width: 100%; overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;">
                    <el-table
                        v-loading="loading_tab"
                        :data="data_tab.arr"
                        :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                        style="width: 100%;min-height: 300px;"
                    >
                        <el-table-column prop="name" label="文件名称" width="180">
                            <template #default="scope">
                                <span style="margin-left: 10px;">{{ scope.row.name }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="rid" label="资源类型对应的ID" width="180">
                            <template #default="scope">
                                <span style="margin-left: 10px;">{{ scope.row.rid }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="rtype" label="资源类型" width="120">
                            <template #default="scope">
                                <span style="margin-left: 10px;">{{ getOptVal(opts_all.obj.resources_type,scope.row.rtype) }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="ftype" label="文件分类" width="120">
                            <template #default="scope">
                                <span style="margin-left: 10px;">{{ getOptVal(opts_all.obj.file_type,scope.row.ftype) }} </span>
                            </template>
                        </el-table-column>

                        <el-table-column />
                        <el-table-column fixed="right" label="操作" width="200">
                            <template #default="scope">
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
    </div>
</template>
<script setup>
import {
    APIgetFileList,
    APIdeleteFile
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
let data_search = reactive({ })
// 列表
let loading_tab = ref(false)
let data_tab = reactive({
    arr: []
})
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(1)
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

// 监听分页
watch(page, () => {
    getTabListFunc()
})
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
    if (params.created_at) {
        let updated_str = ''
        for (let i in params.created_at) {
            updated_str += ',' + params.created_at[i]
        }
        params.created_at = updated_str.substring(1)
    }
    loading_tab.value = true
    APIgetFileList(params).then(res => {
        if (res.code === 0) {
            loading_tab.value = false
            data_tab.arr = res.data.items
            total.value = res.data.aggregation.total_cnt
        }
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteFile(val.id).then(res => {
        if (res.code === 0) {
            refreshFunc()
            ElMessage.success(res.msg)
        }
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
getOpts(['file_type', 'resources_type']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss">
    .userregister {
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
    .userregister {

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
