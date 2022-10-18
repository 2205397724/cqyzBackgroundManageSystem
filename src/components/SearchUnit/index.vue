<template>
    <div style="height: 100%;display: inline-block;width: 100%;">
        <!-- <el-tooltip
            effect="dark"
            :content="'ID：'+props.str"
        > -->
        <div
            class="tit-box"
            :class="{'nostr':!props.str}"
            style="height: 100%;width: 100%;display: flex;align-items: center;cursor: pointer;padding-left: 11px;"
            @click="openDigFunc"
            @mouseenter="icon_hover=true" @mouseleave="icon_hover=false"
        >
            <span style="line-height: 1rem;white-space: nowrap;overflow: hidden;">{{ props.str?props.str:'请点击选择单元' }}</span>
            <el-icon class="tit-icon" :class="{'tit-icon-on':!icon_hover}" :size="20" color="#aaaaaa" @click.stop="clearFunc"><el-icon-circle-close /></el-icon>
        </div>
        <!-- </el-tooltip> -->

        <el-dialog
            v-model="switch_list"
            title="单元"
            width="70%"
        >
            <div style="font-size: 14px;color: #aaa;margin-bottom: 8px;">*点击单元所在行选择该单元</div>
            <el-table
                v-loading="loading_tab"
                :data="data_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;border: 1px solid rgb(235 238 245); border-radius: 6px;"
                @row-click="rowClickFunc"
            >
                <el-table-column prop="name" label="名称" width="180" />
                <el-table-column prop="id" label="单元ID" width="250" />
                <el-table-column prop="addr" label="地址" width="220" />
                <el-table-column prop="area_floor" label="总占地面积" width="140">
                    <template #default="scope">
                        <span>{{ scope.row.area_floor }} m²</span>
                    </template>
                </el-table-column>
                <el-table-column prop="area_build" label="总建筑面积" width="140">
                    <template #default="scope">
                        <span>{{ scope.row.area_build }} m²</span>
                    </template>
                </el-table-column>
                <el-table-column prop="area_support" label="配套用房总面积" width="140">
                    <template #default="scope">
                        <span>{{ scope.row.area_support }} m²</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cnt_building" label="楼栋数" width="140">
                    <template #default="scope">
                        <span>{{ scope.row.cnt_building }} 栋</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cnt_live" label="住房总套数" width="140">
                    <template #default="scope">
                        <span>{{ scope.row.cnt_live }} 套</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cnt_support" label="配套用房总套数" width="140">
                    <template #default="scope">
                        <span>{{ scope.row.cnt_support }} 套</span>
                    </template>
                </el-table-column>
                <el-table-column prop="company_build" label="建设单位名称" width="140" />
                <el-table-column prop="time_use" label="投用时间" width="140" />
                <el-table-column />
            </el-table>
            <!-- <div style="padding-top: 20px;">
                <el-pagination
                    v-model:current-page="page"
                    layout="total,prev,pager,next,jumper,"
                    :total="total"
                    :page-size="per_page"
                    background
                    hide-on-single-page
                />
            </div> -->
        </el-dialog>
    </div>
</template>

<script setup>
const icon_hover = ref(false)
import {
    reactive,
    ref,
    defineProps,
    defineEmits
} from 'vue'
import {
    APIgetUnitsListHouse
} from '@/api/custom/custom.js'
const switch_list = ref(false)
const props = defineProps(['str'])
const emit = defineEmits(['update:str'])
// const name = ref('请点击选择单元')
const loading_tab = ref(false)
const data_tab = reactive({
    arr: []
})
const total = ref(100)
const per_page = ref(15)
const page = ref(1)
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
    loading_tab.value = true
    APIgetUnitsListHouse(params).then(res => {
        console.log(res)
        data_tab.arr = res
        total.value = res.length
        loading_tab.value = false
    })
}

const rowClickFunc = row => {
    // name.value = row.name
    emit('update:str', row.id)
    switch_list.value = false
}
const clearFunc = () => {
    emit('update:str', '')
}
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
