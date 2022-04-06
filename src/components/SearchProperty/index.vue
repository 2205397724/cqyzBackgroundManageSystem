<template>
    <div style="height: 100%;">
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
            <span style="line-height: 1rem;white-space: nowrap;overflow: hidden;">{{ props.str?props.str:'请点击选择产权ID' }}</span>
            <el-icon class="tit-icon" :class="{'tit-icon-on':!icon_hover}" :size="20" color="#aaaaaa" @click.stop="clearFunc"><el-icon-circle-close /></el-icon>
        </div>
        <!-- </el-tooltip> -->

        <el-dialog
            v-model="switch_list"
            title="产权"
            width="70%"
        >
            <el-row :gutter="10">
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" style="box-sizing: border-box;padding-bottom: 10px;font-size: 12px;">
                    <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                        <SearchHouse v-model:str="data_search.obj.house_id" />
                    </div>
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-input v-model="data_search.obj.code_property" class="head-btn" placeholder="产权证号" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-input v-model="data_search.obj.code_room" class="head-btn" placeholder="地房籍号" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-input v-model="data_search.obj.owner_name" class="head-btn" placeholder="产权人姓名" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-input v-model="data_search.obj.owner_id_card" class="head-btn" placeholder="产权人证件号" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-input v-model="data_search.obj.owner_mobile" class="head-btn" placeholder="产权人手机号" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-select v-model="data_search.obj.is_bind_house" class="head-btn" placeholder="*是否绑定房屋" clearable>
                        <el-option v-for="(item,i) in opts_all.obj.house_has_house" :key="item.key" :label="item.val" :value="item.key" />
                    </el-select>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="el-cascader-box-my">
                    <div class="head-btn">
                        <el-date-picker
                            v-model="data_search.obj.time_deal"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="交易时间"
                            end-placeholder="交易时间"
                            style="width: 100%;"
                            value-format="YYYY-MM-DD"
                        />
                    </div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="el-cascader-box-my">
                    <div class="head-btn">
                        <el-date-picker
                            v-model="data_search.obj.created_at"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="创建时间"
                            end-placeholder="创建时间"
                            style="width: 100%;"
                            value-format="YYYY-MM-DD"
                        />
                    </div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="el-cascader-box-my">
                    <div class="head-btn">
                        <el-date-picker
                            v-model="data_search.obj.updated_at"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="更新时间"
                            end-placeholder="更新时间"
                            style="width: 100%;"
                            value-format="YYYY-MM-DD"
                        />
                    </div>
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="2" :xl="3">
                    <el-button class="head-btn" type="primary" @click="searchFunc">搜索</el-button>
                </el-col>
            </el-row>
            <div v-show="switch_search" class="search-tips">
                <el-button style="margin-right: 10px;" @click="refreshFunc">重置</el-button>
                *搜索到相关结果共{{ total }}条。
            </div>
            <div style="font-size: 14px;color: #aaaaaa;margin-bottom: 8px;padding-top: 8px;">*点击产权所在行选择该产权</div>
            <el-table
                v-loading="loading_tab"
                :data="data_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;border: 1px solid rgb(235, 238, 245); border-radius: 6px;"
                @row-click="rowClickFunc"
            >
                <el-table-column prop="id" label="产权ID" width="250">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ scope.row.id }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="house_id" label="房屋ID" width="250">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ scope.row.house_id }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="code_property" label="产权证号" width="250">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ scope.row.code_property }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="code_room" label="地房籍号" width="250">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ scope.row.code_room }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="time_deal" label="交易时间" width="140">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ scope.row.time_deal }} </span>
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
    </div>
</template>

<script setup>
import SearchBuilding from '@/components/SearchBuilding/index.vue'
import SearchUnit from '@/components/SearchUnit/index.vue'
import SearchResidential from '@/components/SearchResidential/index.vue'
const icon_hover = ref(false)
import {
    reactive,
    ref,
    defineProps,
    defineEmits
} from 'vue'
import {
    APIgetPropertyList
} from '@/api/custom/custom.js'
const switch_list = ref(false)
const props = defineProps(['str'])
const emit = defineEmits(['update:str'])
// const name = ref('请点击选择产权')
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
    if (params.created_at) {
        let created_str = ''
        for (let i in params.created_at) {
            created_str += ',' + params.created_at[i]
        }
        params.created_at = created_str.substring(1)
    }
    if (params.updated_at) {
        let updated_str = ''
        for (let i in params.updated_at) {
            updated_str += ',' + params.updated_at[i]
        }
        params.updated_at = updated_str.substring(1)
    }
    if (params.time_deal) {
        let updated_str = ''
        for (let i in params.time_deal) {
            updated_str += ',' + params.time_deal[i]
        }
        params.time_deal = updated_str.substring(1)
    }
    loading_tab.value = true
    APIgetPropertyList(params).then(res => {
        if (res.code === 0) {
            loading_tab.value = false
            data_tab.arr = res.data.items
            total.value = res.data.aggregation.total_cnt
        }
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
// 刷新
const refreshFunc = () => {
    page.value = 1
    switch_search.value = false
    data_search.obj = {}
    getTabListFunc()
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import {
    APIpostGetOpts
} from '@/api/custom/custom.js'
const opts_all = reactive({
    obj: {}
})
APIpostGetOpts({ lab: ['house_has_house'] }).then(res => {
    opts_all.obj = res.data
})
const getOptValFunc = (arr, key) => {
    for (let i in arr) {
        if (arr[i].key == key) {
            return arr[i].val
        }
    }
    return ''
}
</script>
<style lang="scss" scoped>
    .head-btn{
        margin-bottom: 10px;
    }
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
