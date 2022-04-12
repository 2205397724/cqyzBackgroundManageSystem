<template>
    <div>
        <page-main style="padding: 0;">
            <div class="tree-box">
                <div class="tree-item">
                    <position-tree
                        :tree_item="{id:50,name:'总title',type:'region'}"
                    />
                </div>
                <div class="tree-details">
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
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-select v-model="data_search.obj.type_building" class="head-btn" placeholder="*楼栋性质" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.house_type_building" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-select v-model="data_search.obj.type_model" class="head-btn" placeholder="*户型" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.house_type_model" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-select v-model="data_search.obj.status_use" class="head-btn" placeholder="*房屋使用状态" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.house_status_use" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-select v-model="data_search.obj.status_safe" class="head-btn" placeholder="*房屋安全状态" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.house_status_safe" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-select v-model="data_search.obj.status_plan" class="head-btn" placeholder="*规划用途" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.house_plan_fact" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-select v-model="data_search.obj.status_fact" class="head-btn" placeholder="*实际用途" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.house_plan_fact" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-select v-model="data_search.obj.is_bind_property" class="head-btn" placeholder="是否绑定产权" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.house_has_property" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-input v-model="data_search.obj.sync_china_code" class="head-btn" placeholder="区域code" clearable />
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
                    <div v-show="switch_search" style="color: #aaaaaa; font-size: 14px; margin-bottom: 20px;">
                        <el-button style="margin-right: 10px;" @click="refreshFunc">重置</el-button>
                        *搜索到相关结果共{{ total }}条。
                    </div>
                    <el-row :gutter="10" class="bottom-btn-box-2">
                        <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="2">
                            <el-button class="head-btn" type="primary">添加房屋</el-button>
                        </el-col>
                        <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="2">
                            <el-button class="head-btn" type="warning">批量修改</el-button>
                            <!-- <el-button :disabled="arr_selection.arr.length<=0" class="head-btn" type="warning">批量修改</el-button> -->
                        </el-col>
                        <el-col :xs="12" :sm="{span: 7, offset: 5}" :md="{span: 5, offset: 11}" :lg="{span: 4, offset: 14}" :xl="{span: 3, offset: 17}">
                            <div style="display: flex;align-items: center;height: 100%; box-sizing: border-box; padding-bottom: 10px;">
                                <el-button style="width: 100%;" type="success">导入房屋</el-button>
                                <div style="margin-left: 10px;cursor: pointer;">
                                    <el-popover
                                        :width="220"
                                        trigger="hover"
                                        content="点击下载导入房屋的模板文件"
                                        effect="dark"
                                    >
                                        <template #reference>
                                            <el-link :underline="false" href="http://192.168.110.37:10090/excels/house_import_tpl.xlsx" target="_blank"><el-button style="width: 100%;"><el-icon><el-icon-download /></el-icon></el-button></el-link>
                                        </template>
                                    </el-popover>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <div style="width: 100%; overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;">
                        123
                    </div>
                </div>
            </div>
        </page-main>
    </div>
</template>
<script setup>
import {
    reactive,
    ref
} from 'vue'
const aaa = ref(123)
setTimeout(() => {
    aaa.value = 312
}, 2000)
const switch_search = ref(false)
// 分页
const total = ref(74751)
let per_page = ref(15)
let page = ref(1)
const data_search = reactive({
    obj: {}
})

// 搜索
const searchFunc = () => {
    switch_search.value = true
}
// 刷新
const refreshFunc = () => {
    page.value = 1
    switch_search.value = false
    data_search.obj = {}
}

/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import {
    APIpostGetOpts
} from '@/api/custom/custom.js'
const opts_all = reactive({
    obj: {}
})
APIpostGetOpts({ lab: ['house_has_property', 'house_type_model', 'house_type_property', 'house_type_building', 'house_status_use', 'house_status_safe', 'house_plan_fact'] }).then(res => {
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

<style lang="scss">
    .tree-box {
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

            .el-form-item {
                margin: 0;
            }

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
    .tree-box {
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
    .tree-box {
        display: flex;

        .tree-item {
            min-width: 200px;
            width: 200px;
        }

        .tree-details {
            padding: 20px;
            flex-grow: 1;
            max-width: calc(100% - 200px);

            .head-btn {
                width: 100%;
                margin-bottom: 10px;
            }

            .bottom-btn-box-2 {
                margin-bottom: 10px;

                .head-btn {
                    width: 100%;
                    margin: 10px 0 10px 0;
                }
            }
        }
    }
</style>
