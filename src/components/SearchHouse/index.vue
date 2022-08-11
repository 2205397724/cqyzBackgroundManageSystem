<template>
    <div style="height: 100%;display: inline-block;width: 100%;">
        <!-- <el-tooltip
            effect="dark"
            :content="'ID：'+props.str"
        > -->
        <div
            class="tit-box"
            :class="{'nostr':!houseName}"
            style="height: 100%;width: 100%;display: flex;align-items: center;cursor: pointer;padding-left: 11px;"
            @click="openDigFunc"
            @mouseenter="icon_hover=true" @mouseleave="icon_hover=false"
        >
            <span v-if="!props.name" style="line-height: 1rem;white-space: nowrap;overflow: hidden;">{{ houseName?houseName:'请点击选择房屋' }}</span>
            <span v-if="props.name" class="head_tb" style="color: #626466;">{{ props.name }}</span>
            <el-icon class="tit-icon" :class="{'tit-icon-on':!icon_hover}" :size="20" color="#aaaaaa" @click.stop="clearFunc"><el-icon-circle-close /></el-icon>
        </div>
        <!-- </el-tooltip> -->

        <el-dialog
            v-model="switch_list"
            title="房屋"
            width="70%"
        >
            <el-row :gutter="10">
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                    <el-input v-model="data_search.obj.name" class="head-btn" placeholder="房屋名称" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                    <el-input v-model="data_search.obj.addr" class="head-btn" placeholder="地址" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                    <el-input v-model="data_search.obj.floor_truth" class="head-btn" placeholder="*物理楼层" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                    <el-input v-model="data_search.obj.floor_alias" class="head-btn" placeholder="*名义层" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                    <el-input v-model="data_search.obj.house_num" class="head-btn" placeholder="*房号" clearable />
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                    <el-select v-model="data_search.obj.type_property" class="head-btn" placeholder="*产权性质" clearable>
                        <el-option v-for="(item,i) in opts_all.obj.house_type_property" :key="item.key" :label="item.val" :value="item.key" />
                    </el-select>
                </el-col>
                <el-col v-show="searchVisible==true" :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                    <el-select v-model="data_search.obj.type_building" class="head-btn" placeholder="*楼栋性质" clearable>
                        <el-option v-for="(item,i) in opts_all.obj.house_type_building" :key="item.key" :label="item.val" :value="item.key" />
                    </el-select>
                </el-col>
                <el-col v-show="searchVisible==true" :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                    <el-select v-model="data_search.obj.type_model" class="head-btn" placeholder="*户型" clearable>
                        <el-option v-for="(item,i) in opts_all.obj.house_type_model" :key="item.key" :label="item.val" :value="item.key" />
                    </el-select>
                </el-col>
                <el-col v-show="searchVisible==true" :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                    <el-select v-model="data_search.obj.status_use" class="head-btn" placeholder="*房屋使用状态" clearable>
                        <el-option v-for="(item,i) in opts_all.obj.house_status_use" :key="item.key" :label="item.val" :value="item.key" />
                    </el-select>
                </el-col>
                <el-col v-show="searchVisible==true" :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                    <el-select v-model="data_search.obj.status_safe" class="head-btn" placeholder="*房屋安全状态" clearable>
                        <el-option v-for="(item,i) in opts_all.obj.house_status_safe" :key="item.key" :label="item.val" :value="item.key" />
                    </el-select>
                </el-col>
                <el-col v-show="searchVisible==true" :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                    <el-select v-model="data_search.obj.status_plan" class="head-btn" placeholder="*规划用途" clearable>
                        <el-option v-for="(item,i) in opts_all.obj.house_plan_fact" :key="item.key" :label="item.val" :value="item.key" />
                    </el-select>
                </el-col>
                <el-col v-show="searchVisible==true" :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                    <el-select v-model="data_search.obj.status_fact" class="head-btn" placeholder="*实际用途" clearable>
                        <el-option v-for="(item,i) in opts_all.obj.house_plan_fact" :key="item.key" :label="item.val" :value="item.key" />
                    </el-select>
                </el-col>
                <el-col v-show="searchVisible==true" :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                    <el-select v-model="data_search.obj.is_bind_property" class="head-btn" placeholder="是否绑定产权" clearable>
                        <el-option v-for="(item,i) in opts_all.obj.house_has_property" :key="item.key" :label="item.val" :value="item.key" />
                    </el-select>
                </el-col>
                <el-col v-show="searchVisible==true" :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                    <el-input v-model="data_search.obj.sync_china_code" class="head-btn" placeholder="区域code" clearable />
                </el-col>
                <el-col v-show="searchVisible==true" :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my" style="box-sizing: border-box;padding-bottom: 10px;font-size: 12px;">
                    <!-- <el-input v-model="data_search.obj.sync_zone_id" class="head-btn" placeholder="小区ID" clearable /> -->
                    <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                        <SearchResidential v-model:str="data_search.obj.sync_zone_id" />
                    </div>
                </el-col>
                <el-col v-show="searchVisible==true" :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my" style="box-sizing: border-box;padding-bottom: 10px;font-size: 12px;">
                    <!-- <el-input v-model="data_search.obj.sync_building_id" class="head-btn" placeholder="楼栋ID" clearable /> -->
                    <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                        <SearchBuilding v-model:str="data_search.obj.sync_building_id" />
                    </div>
                </el-col>
                <el-col v-show="searchVisible==true" :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my" style="box-sizing: border-box;padding-bottom: 10px;font-size: 12px;">
                    <!-- <el-input v-model="data_search.obj.sync_unit_id" class="head-btn" placeholder="单元ID" clearable /> -->
                    <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                        <SearchUnit v-model:str="data_search.obj.sync_unit_id" />
                    </div>
                </el-col>
                <el-col v-show="searchVisible==true" :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                    <el-select v-model="data_search.obj.houseable_type" class="head-btn" placeholder="直属上级类型" clearable @change="data_search.obj.houseable_id=''">
                        <el-option label="楼栋" value="buildings" />
                        <el-option label="单元" value="units" />
                    </el-select>
                </el-col>
                <el-col v-show="searchVisible==true" v-if="data_search.obj.houseable_type" :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my" style="box-sizing: border-box;padding-bottom: 10px;font-size: 12px;">
                    <div v-if="data_search.obj.houseable_type=='buildings'" style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                        <SearchBuilding v-model:str="data_search.obj.houseable_id" />
                    </div>
                    <div v-else-if="data_search.obj.houseable_type=='units'" style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                        <SearchUnit v-model:str="data_search.obj.houseable_id" />
                    </div>
                </el-col>
                <el-col v-show="searchVisible==true" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="el-cascader-box-my">
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
                <el-col v-show="searchVisible==true" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="el-cascader-box-my">
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
                <el-col :xs="12" :sm="8" :md="6" :lg="2" :xl="3">
                    <el-button class="head-btn" type="primary" @click="searchMore">更多搜索</el-button>
                </el-col>
            </el-row>
            <div v-show="switch_search" class="search-tips">
                <el-button style="margin-right: 10px;" @click="refreshFunc">重置</el-button>
                *搜索到相关结果共{{ total }}条。
            </div>
            <div style="font-size: 14px;color: #aaa;margin-bottom: 8px;padding-top: 8px;">*点击房屋所在行选择该房屋</div>
            <el-table
                v-loading="loading_tab"
                :data="data_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;border: 1px solid rgb(235 238 245); border-radius: 6px;"
                @row-click="rowClickFunc"
            >
                <el-table-column prop="name" label="房屋名称" width="180" />
                <el-table-column prop="id" label="房屋ID" width="250" />
                <el-table-column prop="addr" label="地址" width="220" />
                <el-table-column prop="floor_truth" label="物理层" width="140">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.floor_truth }} 层</span>
                    </template>
                </el-table-column>
                <el-table-column prop="floor_alias" label="名义层" width="140">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.floor_alias }} 层</span>
                    </template>
                </el-table-column>
                <el-table-column prop="house_num" label="房号" width="140">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.house_num }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="area_build" label="建筑面积" width="140">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.area_build }} m²</span>
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
    defineExpose,
    defineEmits
} from 'vue'
import {
    APIgetHouseListHouse
} from '@/api/custom/custom.js'
const switch_list = ref(false)
const props = defineProps(['name'])
const emit = defineEmits(['update:name', 'checkFunc'])
// const name = ref('请点击选择房屋')
const loading_tab = ref(false)
const data_tab = reactive({
    arr: []
})
const total = ref(100)
const per_page = ref(15)
const page = ref(1)
const searchVisible = ref(false)
const switch_search = ref(false)
const data_search = reactive({
    obj: {}
})
const searchFunc = () => {
    switch_search.value = true
    getTabListFunc()
}
const searchMore = () => {
    searchVisible.value = !searchVisible.value
}
// 打开弹窗
const openDigFunc = () => {
    switch_list.value = true
    getTabListFunc()
    emit('update:name', '')
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
    loading_tab.value = true
    APIgetHouseListHouse(params).then(res => {
        loading_tab.value = false
        data_tab.arr = res
        total.value = res.length
    })
}
const houseName = ref('')
const rowClickFunc = row => {
    // name.value = row.name
    emit('checkFunc', row.id)
    switch_list.value = false
    houseName.value = row.name
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
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['house_has_property', 'house_type_model', 'house_type_property', 'house_type_building', 'house_status_use', 'house_status_safe', 'house_plan_fact']).then(res => {
    opts_all.obj = res
})
const clearFunc = () => {
    // emit('update:str', '')
    houseName.value = ''
}
defineExpose({
    clearFunc
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
