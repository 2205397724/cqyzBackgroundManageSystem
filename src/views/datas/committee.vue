<template>
    <div class="keep-on-record">
        <page-main class="hidden">
            <div>
                <el-button type="primary" :icon="Plus" size="large" @click="addCommitteeFunc">
                    添加业委会
                </el-button>
            </div>
            <div class="search">
                <el-row>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                业委会名称：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-input
                                    v-model="data_search.obj.name" class="search_tb" placeholder="设备名称"
                                    clearable
                                />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                状态：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-select
                                    v-model="data_search.obj.active" class="search_tb" placeholder="状态"
                                    clearable
                                >
                                    <el-option
                                        v-for="(item) in opts_all.obj.group_active" :key="item.key"
                                        :label="item.val" :value="item.key"
                                    />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="0" :sm="4" :md="3" :lg="2" />
                    <el-col :xs="24" :sm="20" :md="21" :lg="22">
                        <el-button type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                        <el-button
                            v-show="switch_search == true" class="m-l-20 m-r-10" :icon="Loading"
                            @click="refreshFunc"
                        >
                            重置
                        </el-button>
                        <span v-show="switch_search == true" class="size-base">
                            *共搜索到{{ total }}条。
                        </span>
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-table
                    :data="data_tab.arr"
                    :header-cell-style="{ background: '#fbfbfb', color: '#999999', 'font-size': '12px' }" class="tab_1"
                >
                    <el-table-column prop="id" label="业委会名称">
                        <template #default="scope">
                            <span>{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="用户组ID">
                        <template #default="scope">
                            <span>{{scope.row.id}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="状态">
                        <template #default="scope">
                            <el-tag v-show="scope.row.active == 1" class="btnNone" type="success" size="small">
                                启用
                            </el-tag>
                            <el-tag v-show="scope.row.active == 0" class="btnNone noDeal" type="danger" size="small">
                                禁用
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="200">
                        <template #default="scope">
                            <el-button type="primary" size="small" @click="modifyCommitteeFunc(scope.row)">
                                修改
                            </el-button>
                            <el-button size="small" @click="detailsFunc(scope.row)">
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
            </div>
            <el-pagination
                v-model:current-page="page" style="float: right;" layout="prev,next,jumper," :total="Infinity"
                :page-size="per_page" background prev-text="上一页" next-text="下一页" hide-on-single-page
            />
        </page-main>
    </div>
</template>
<script setup>
import {
    APIgetGroupList,
    APIpostGroup,
    APIdeleteGroup,
    APIputGroup
} from '@/api/custom/custom.js'
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
import { getOpts, getOptVal } from '@/util/opts.js'
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(1)
// 搜索
let switch_search = ref(false)
let data_search = reactive({ obj: {} })
const searchFunc = () => {
    page.value = 1
    switch_search.value = true
    getTabListFunc()
}
// 添加，修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {
        extra: []
    }
})
const str_title = ref('添加')
// 添加业委会
const addCommitteeFunc = () => {

}
// 修改业委会
const modifyCommitteeFunc = () => {

}
// 查看业委会详情
const detailsFunc = () => {

}
// 删除业委会
const deleteFunc = val => {
    // APIdeleteDevice(val.id).then(res => {
    //     refreshFunc()
    //     ElMessage.success('删除成功')
    // })
}
// 获取列表api请求
let data_tab = reactive({
    arr: []
})
const getTabListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value,
        type: 6,//业委会
    }
    for (let key in data_search.obj) {
        if (data_search.obj[key] || data_search.obj[key] === 0) {
            if (data_search.obj[key] instanceof Array && data_search.obj[key].length <= 0) {
                continue
            }
            params[key] = data_search.obj[key]
        }
    }
    console.log(params)
    APIgetGroupList(params).then(res => {
        console.log("res",res)
        total.value = res.length
        data_tab.arr = res
    })
}
// 刷新
const refreshFunc = () => {
    switch_search.value = false
    data_search.obj = {}
    getTabListFunc()
}
// 监听分页
watch(page, () => {
    refreshFunc()
}, { immediate: true, deep: true })
// 配置项
const opts_all = reactive({
    obj: {}
})
getOpts(['group_active']).then(res => {
    console.log(res)
    opts_all.obj = res
})
</script>
<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
</style>
