<template>
    <div style="height: 100%;display: inline-block;width: 100%;">
        <div
            class="tit-box"
            :class="{'nostr':!props.str}"
            style="height: 100%;width: 100%;display: flex;align-items: center;cursor: pointer;padding-left: 11px;"
            @click="openDigFunc"
            @mouseenter="icon_hover=true" @mouseleave="icon_hover=false"
        >
            <span style="line-height: 1rem;white-space: nowrap;overflow: hidden;">{{ props.str?props.str:'请点击选择流程' }}</span>
            <el-icon class="tit-icon" :class="{'tit-icon-on':!icon_hover}" :size="20" color="#aaaaaa" @click.stop="clearFunc"><el-icon-circle-close /></el-icon>
        </div>

        <el-dialog
            v-model="switch_list"
            title="流程"
            width="70%"
        >
            <el-row :gutter="10">
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-input v-model="data_search.obj.name" class="head-btn" placeholder="名称" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="2" :xl="3">
                    <el-button class="head-btn" type="primary" @click="searchFunc">搜索</el-button>
                </el-col>
            </el-row>
            <div v-show="switch_search" class="search-tips">
                <el-button style="margin-right: 10px;" @click="refreshFunc">重置</el-button>
                *搜索到相关结果共{{ total }}条。
            </div>
            <div style="font-size: 14px;color: #aaa;margin-bottom: 8px;padding-top: 8px;">*点击流程后面的步骤</div>
            <el-table
                v-loading="loading_tab"
                :data="data_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;border: 1px solid rgb(235 238 245); border-radius: 6px;"
            >
                <el-table-column prop="name" label="流程名称" width="180">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="流程ID" width="250">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.id }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间" width="180">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.created_at }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="updated_at" label="更新时间" width="180">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.updated_at }} </span>
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="120">
                    <template #default="scope">
                        <el-button
                            size="small"
                            type="info"
                            @click="openStepFunc(scope.row)"
                        >
                            步骤
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column />
            </el-table>
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
        </el-dialog>
        <!-- 步骤 -->
        <el-dialog
            v-model="show_dialog_flow"
            title="步骤"
            width="70%"
        >
            <div style="font-size: 14px;color: #aaa;margin-bottom: 8px;padding-top: 8px;">*点击步骤所在行选择步骤</div>
            <el-table
                v-loading="tabloading"
                :data="flow_data.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;"
                @row-click="rowClickFunc"
            >
                <el-table-column prop="name" label="步骤名称" width="180">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="prev" label="前一个步骤节点" width="180">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.prev }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="step" label="当前步骤节点" width="180">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.step }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="next" label="下一个步骤节点" width="180">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.next }} </span>
                    </template>
                </el-table-column>
                <el-table-column />
            </el-table>
        </el-dialog>
    </div>
</template>

<script setup>
import Cascaders from '@/components/Cascaders/index.vue'
const icon_hover = ref(false)
import {
    reactive,
    ref,
    defineProps,
    defineEmits
} from 'vue'
import {
    APIgetFlowList
} from '@/api/custom/custom.js'
const switch_list = ref(false)
const props = defineProps(['str'])
const emit = defineEmits(['update:str'])
// const name = ref('请点击选择房屋')
const loading_tab = ref(false)
const data_tab = reactive({
    arr: []
})
const total = ref(100)
const per_page = ref(15)
const page = ref(1)
const switch_search = ref(false)
const data_search = reactive({
    obj: {}
})
const searchFunc = () => {
    switch_search.value = true
    getTabListFunc()
}
// 打开弹窗
const openDigFunc = () => {
    switch_list.value = true
    getTabListFunc()
}
watch(page, () => {
    getTabListFunc()
})
// 获取列表
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
    APIgetFlowList(params).then(res => {
        if (res.code === 0) {
            loading_tab.value = false
            data_tab.arr = res.data.items
            total.value = res.data.aggregation.total_cnt
        }
    })
}

const rowClickFunc = row => {
    emit('update:str', row.step)
    switch_list.value = false
    show_dialog_flow.value = false
}
const clearFunc = () => {
    emit('update:str', '')
}
// 刷新
const refreshFunc = () => {
    page.value = 1
    switch_search.value = false
    data_search.obj = {}
    getTabListFunc()
}
const openStepFunc = val => {
    show_dialog_flow.value = true
    refreshFunc2(val.id)
}
const show_dialog_flow = ref(false)
const tabloading = ref(false)
const flow_data = reactive({
    arr: []
})
import {
    APIgetFlowStepList
} from '@/api/custom/custom.js'
const refreshFunc2 = id => {
    tabloading.value = true
    APIgetFlowStepList(id).then(res => {
        flow_data.arr = res.data
        tabloading.value = false
    })
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['status_all', 'other_auth', 'gender', 'terminal', 'login_type']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss" scoped>
    .tit-box {
        position: relative;
        .tit-icon {
            position: absolute;
            right: 10px;
            top: calc(50% - 10px);
            background-color: #fff;
            z-index: 1;
        }
        .tit-icon-on {
            display: none;
        }
    }
    .nostr {
        color: #aaa;
    }
</style>
