<template>
    <div style="height: 100%;display: inline-block;width: 100%;">
        <div
            class="tit-box"
            :class="{'nostr':!props.str}"
            style="height: 100%;width: 100%;display: flex;align-items: center;cursor: pointer;padding-left: 11px;"
            @click="openDigFunc"
            @mouseenter="icon_hover=true" @mouseleave="icon_hover=false"
        >
            <span style="line-height: 1rem;white-space: nowrap;overflow: hidden;">{{ props.str?props.str:'请点击选择用户组ID' }}</span>
            <el-icon class="tit-icon" :class="{'tit-icon-on':!icon_hover}" :size="20" color="#aaaaaa" @click.stop="clearFunc"><el-icon-circle-close /></el-icon>
        </div>

        <el-dialog
            v-model="switch_list"
            title="用户组"
            width="70%"
        >
            <Cascaders v-model="code" style="max-width: 200px;margin-bottom: 10px;" />
            <div style="font-size: 14px;color: #aaaaaa;margin-bottom: 8px;">*点击列表选择用户组ID</div>
            <el-table
                v-loading="loading_tab"
                :data="data_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;border: 1px solid rgb(235, 238, 245); border-radius: 6px;border-bottom: 0px solid #ffffff!important;"
                :tree-props="{ children: 'children' }"
                row-key="id"
                default-expand-all
                @row-click="rowClickFunc"
                @selection-change="selectionChangeFunc"
            >
                <el-table-column v-if="props.checkbox" type="selection" width="55" />
                <el-table-column prop="name" label="名称" width="180">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ scope.row.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" width="250">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ scope.row.id }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="上级ID" width="250">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ scope.row.pid }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="等级" width="90">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ scope.row.level }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间" width="180">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ scope.row.created_at }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="updated_at" label="更新时间" width="180">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ scope.row.updated_at }} </span>
                    </template>
                </el-table-column>
                <el-table-column />
            </el-table>
            <template #footer>
                <span v-if="props.checkbox" style="width: 100%;text-align: right;">
                    <el-button type="primary" @click="getUsers">提交</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import Cascaders from '@/components/Cascaders/index.vue'
const  code = ref('500101')
const icon_hover = ref(false)
import {
    reactive,
    ref,
    defineProps,
    defineEmits
} from 'vue'
import {
    APIgetGroupList
} from '@/api/custom/custom.js'
const switch_list = ref(false)
const props = defineProps({ 'str': { type: String, default: '' }, checkbox: { type: Boolean, default: false } })
const emit = defineEmits(['update:str'])
const loading_tab = ref(false)
const data_tab = reactive({
    arr: []
})
// 打开弹窗
const openDigFunc = () => {
    switch_list.value = true
    getTabListFunc()
}
watch(code, () => {
    getTabListFunc()
})
// 获取列表
const getTabListFunc = () => {
    loading_tab.value = true
    APIgetGroupList(code.value).then(res => {
        if (res.code === 0) {
            loading_tab.value = false
            data_tab.arr = res.data
        }
    })
}

const rowClickFunc = row => {
    if (!props.checkbox) {
        emit('update:str', row.id)
        switch_list.value = false
    }
}
const users = reactive({
    arr: []
})
const selectionChangeFunc = val => {
    users.arr = val
}
const getUsers = () => {
    let arr = []
    for (let i in users.arr) {
        arr.push(users.arr[i].id)
    }
    emit('update:str', arr)
    switch_list.value = false
}
const clearFunc = () => {
    emit('update:str', '')
}
</script>
<style lang="scss" scoped>
    .tit-box{
        position: relative;
        .tit-icon{
            position: absolute;
            right: 10px;
            top: calc(50% - 10px);
            background-color: #ffffff;
            z-index: 1;
        }
        .tit-icon-on{
            display: none;
        }
    }
    .nostr{
        color: #aaaaaa;
    }
</style>
