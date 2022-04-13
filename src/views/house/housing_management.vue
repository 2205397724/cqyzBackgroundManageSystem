<template>
    <div>
        <page-main style="padding: 0;height: 100vh;">
            <div class="tree-box" style="height: 100%;">
                <div class="tree-item">
                    <div class="tree-title">请选择区域</div>
                    <position-tree
                        :tree_item="aaa"
                        @checkFunc="checkFunc"
                    />
                </div>
                <div class="tree-details" style="display: flex; flex-direction: column;">
                    <div style="height: 100%;">
                        <div
                            v-if="!active_obj.obj.name||active_obj.obj.type=='region'||active_obj.obj.type=='zone'"
                            style="height: 60px;line-height: 20px;padding: 20px ;box-sizing: border-box;border-bottom: 1px solid #e9e9e9;color:#f56c6c;"
                        >
                            请选择楼栋或单元
                        </div>
                        <div style="position: relative;display: flex; flex-direction: column; height: 100%; }">
                            <div
                                v-if="!active_obj.obj.name||active_obj.obj.type=='region'||active_obj.obj.type=='zone'"
                                style="position: absolute;left: 0;right: 0;z-index: 1;height: 100%;width: 100%;background-color: rgba(255,255,255,0.5);cursor: not-allowed;"
                            />
                            <div style="padding: 20px 20px 0 20px;box-sizing: border-box;">
                                <el-row :gutter="10">
                                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                                        <el-input
                                            v-model="data_search.obj.name" class="head-btn" placeholder="房屋名称"
                                            clearable
                                        />
                                    </el-col>
                                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                                        <el-input
                                            v-model="data_search.obj.addr" class="head-btn" placeholder="地址"
                                            clearable
                                        />
                                    </el-col>
                                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                                        <el-input
                                            v-model="data_search.obj.floor_truth" class="head-btn" placeholder="*物理楼层"
                                            clearable
                                        />
                                    </el-col>
                                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                                        <el-input
                                            v-model="data_search.obj.floor_alias" class="head-btn" placeholder="*名义层"
                                            clearable
                                        />
                                    </el-col>
                                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                                        <el-input
                                            v-model="data_search.obj.house_num" class="head-btn" placeholder="*房号"
                                            clearable
                                        />
                                    </el-col>
                                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                                        <el-select
                                            v-model="data_search.obj.type_property" class="head-btn" placeholder="*产权性质"
                                            clearable
                                        >
                                            <el-option
                                                v-for="(item,i) in opts_all.obj.house_type_property" :key="item.key"
                                                :label="item.val" :value="item.key"
                                            />
                                        </el-select>
                                    </el-col>
                                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                                        <el-select
                                            v-model="data_search.obj.type_building" class="head-btn" placeholder="*楼栋性质"
                                            clearable
                                        >
                                            <el-option
                                                v-for="(item,i) in opts_all.obj.house_type_building" :key="item.key"
                                                :label="item.val" :value="item.key"
                                            />
                                        </el-select>
                                    </el-col>
                                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                                        <el-select
                                            v-model="data_search.obj.type_model" class="head-btn" placeholder="*户型"
                                            clearable
                                        >
                                            <el-option
                                                v-for="(item,i) in opts_all.obj.house_type_model" :key="item.key"
                                                :label="item.val" :value="item.key"
                                            />
                                        </el-select>
                                    </el-col>
                                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                                        <el-select
                                            v-model="data_search.obj.status_use" class="head-btn" placeholder="*房屋使用状态"
                                            clearable
                                        >
                                            <el-option
                                                v-for="(item,i) in opts_all.obj.house_status_use" :key="item.key"
                                                :label="item.val" :value="item.key"
                                            />
                                        </el-select>
                                    </el-col>
                                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                                        <el-select
                                            v-model="data_search.obj.status_safe" class="head-btn" placeholder="*房屋安全状态"
                                            clearable
                                        >
                                            <el-option
                                                v-for="(item,i) in opts_all.obj.house_status_safe" :key="item.key"
                                                :label="item.val" :value="item.key"
                                            />
                                        </el-select>
                                    </el-col>
                                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                                        <el-select
                                            v-model="data_search.obj.status_plan" class="head-btn" placeholder="*规划用途"
                                            clearable
                                        >
                                            <el-option
                                                v-for="(item,i) in opts_all.obj.house_plan_fact" :key="item.key"
                                                :label="item.val" :value="item.key"
                                            />
                                        </el-select>
                                    </el-col>
                                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                                        <el-select
                                            v-model="data_search.obj.status_fact" class="head-btn" placeholder="*实际用途"
                                            clearable
                                        >
                                            <el-option
                                                v-for="(item,i) in opts_all.obj.house_plan_fact" :key="item.key"
                                                :label="item.val" :value="item.key"
                                            />
                                        </el-select>
                                    </el-col>
                                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                                        <el-select
                                            v-model="data_search.obj.is_bind_property" class="head-btn"
                                            placeholder="是否绑定产权"
                                            clearable
                                        >
                                            <el-option
                                                v-for="(item,i) in opts_all.obj.house_has_property" :key="item.key"
                                                :label="item.val" :value="item.key"
                                            />
                                        </el-select>
                                    </el-col>
                                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                                        <el-input
                                            v-model="data_search.obj.sync_china_code" class="head-btn"
                                            placeholder="区域code"
                                            clearable
                                        />
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
                                <div
                                    v-show="switch_search"
                                    style="color: #aaaaaa; font-size: 14px; margin-bottom: 20px;"
                                >
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
                                    <el-col
                                        :xs="12" :sm="{span: 7, offset: 5}" :md="{span: 5, offset: 11}"
                                        :lg="{span: 4, offset: 14}" :xl="{span: 3, offset: 17}"
                                    >
                                        <div
                                            style="display: flex;align-items: center;height: 100%; box-sizing: border-box; padding-bottom: 10px;"
                                        >
                                            <el-button style="width: 100%;" type="success">导入房屋</el-button>
                                            <div style="margin-left: 10px;cursor: pointer;">
                                                <el-popover
                                                    :width="220"
                                                    trigger="hover"
                                                    content="点击下载导入房屋的模板文件"
                                                    effect="dark"
                                                >
                                                    <template #reference>
                                                        <el-link
                                                            :underline="false"
                                                            href="http://192.168.110.37:10090/excels/house_import_tpl.xlsx"
                                                            target="_blank"
                                                        >
                                                            <el-button style="width: 100%;">
                                                                <el-icon>
                                                                    <el-icon-download />
                                                                </el-icon>
                                                            </el-button>
                                                        </el-link>
                                                    </template>
                                                </el-popover>
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div
                                style="padding: 20px 0 20px 20px;box-sizing: border-box;background-color: #f0f2f5;height: 100%;"
                            >
                                <div class="row-box">
                                    <el-scrollbar>
                                        <div class="row-item-box row-item-tit-box">
                                            <div class="row-item row-item-tit row-item-tit-bgline">
                                                <div class="tit-fh">楼层</div>
                                                <div class="tit-lc">房号</div>
                                            </div>
                                        </div>
                                        <div v-for="(item,i) in house_num.arr" class="row-item-box">
                                            <div class="row-item">
                                                <el-checkbox
                                                    v-model="checkFH.row[item].val"
                                                    @change="(val)=>{checkFH.row[item].val= val;rowClickFunc(item,val)}"
                                                />
                                                <div class="row-item-check">{{ item }}#</div>
                                            </div>
                                        </div>
                                    </el-scrollbar>
                                </div>
                                <div v-for="(child,j) in house_list.arr" class="row-box">
                                    <el-scrollbar>
                                        <div style="display: flex;">
                                            <div class="row-item-box row-item-tit-box">
                                                <div class="row-item row-item-tit row-item-tit-ceng">
                                                    <el-checkbox
                                                        v-model="checkFH.col[child.floor_truth].val"
                                                        @change="(val)=>{checkFH.col[child.floor_truth].val= val;colClickFunc(child.floor_truth,val)}"
                                                    />
                                                    <div>{{ child.floor_truth }}层</div>
                                                </div>
                                            </div>
                                            <div v-for="(item,i) in child.houses" class="row-item-box">
                                                <div v-show="item.house_num?true:false" class="row-item">
                                                    <el-checkbox
                                                        v-if="checkFH.all[child.floor_truth]&&checkFH.all[child.floor_truth][item.house_num]"
                                                        v-model="checkFH.all[child.floor_truth][item.house_num].val"
                                                        @change="(val)=>{checkFH.all[child.floor_truth][item.house_num].val= val;allClickFunc(child.floor_truth,item.house_num,val)}"
                                                    />
                                                    <div class="row-item-check">{{ item.house_num }}#</div>
                                                </div>
                                            </div>
                                        </div>
                                    </el-scrollbar>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </page-main>
    </div>
</template>
<script setup>
// 如果你想修改这个页面，不，你不想！┗( ▔, ▔ )┛
import {
    reactive,
    ref,
    watch
} from 'vue'
const aaa = ref({
    id: '6217489fe2f596482a1db208',
    leaf: true,
    name: '反非叫集建南',
    next_type: 'house',
    type: 'units'
})
const active_obj = reactive({
    obj: {}
})
const checkFunc = val => {
    console.log(val)
    active_obj.obj = val
    if (active_obj.obj.id && active_obj.obj.name && (active_obj.obj.type == 'units' || active_obj.obj.type ==
        'building')) {
        getHouseListFunc()
    }
}
const switch_search = ref(false)
// 分页
const total = ref(74751)
let per_page = ref(500)
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
import {
    APIgetHouseListSort
} from '@/api/custom/custom.js'
// 获取房屋列表
const house_num = reactive({
    arr: []
})
const house_list = reactive({
    arr: []
})
// 写反了 row列，col行
const checkFH = reactive({
    row: {},
    col: {},
    all: {}
})
const getHouseListFunc = () => {
    let params = {
        houseable_type: active_obj.obj.type,
        houseable_id: active_obj.obj.id
    }
    APIgetHouseListSort(params).then(res => {
        if (!res.code) {
            // 处理空白格
            let nums = res.data.house_nums
            let list = res.data.houses
            for (let i in list) {
                if (list[i].houses.length < nums.length) {
                    for (let j in nums) {
                        if (!list[i].houses[j] || !list[i].houses[j].house_num || (list[i].houses[j]
                            .house_num != nums[j])) {
                            list[i].houses.splice(j, 0, {})
                        }
                    }
                }
            }
            house_num.arr = nums
            house_list.arr = list
            // 处理默认选择项目
            for (let i in house_num.arr) {
                checkFH.row[house_num.arr[i]] = {
                    val: false
                }
            }
            for (let i in house_list.arr) {
                checkFH.col[house_list.arr[i].floor_truth] = {
                    val: false
                }
                checkFH.all[house_list.arr[i].floor_truth] = {}
                for (let j in house_list.arr[i].houses) {
                    if (house_list.arr[i].houses[j].house_num) {
                        checkFH.all[house_list.arr[i].floor_truth][house_list.arr[i].houses[j]
                            .house_num] = {
                            val: false,
                            data: house_list.arr[i].houses[j]
                        }
                    }
                }
            }
        }
    })
}
// 更新check状态
// row点击
const rowClickFunc = (col, val) => {
    for (let i in checkFH.all) {
        if (checkFH.all[i][col]) {
            checkFH.all[i][col].val = val
        }
    }
    for (let i in checkFH.all) {
        let row_val = val
        for (let j in checkFH.all[i]) {
            if (checkFH.all[i][j].val != val) {
                row_val = !val
                break
            }
        }
        checkFH.col[i].val = row_val
    }
}
// col点击
const colClickFunc = (row, val) => {
    for (let i in checkFH.all[row]) {
        if (checkFH.all[row][i]) {
            checkFH.all[row][i].val = val
        }
    }
    for (let i in checkFH.row) {
        let col_val = val
        for (let j in checkFH.all) {
            if (checkFH.all[j][i] && checkFH.all[j][i].val != val) {
                col_val = !val
                break
            }
        }
        checkFH.row[i].val = col_val
    }
}
// 内部点击
const allClickFunc = (row, col, val) => {
    // 看行
    for (let i in checkFH.all[row]) {
        if (checkFH.all[row][i].val != val) {
            checkFH.col[row].val = !val
            return false
        }
    }
    checkFH.col[row].val = val
    // 看列
    for (let i in checkFH.all) {
        if (checkFH.all[i][col] && checkFH.all[i][col].val != val) {
            checkFH.row[col].val = !val
            return false
        }
    }
    checkFH.row[col].val = val

}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import {
    APIpostGetOpts
} from '@/api/custom/custom.js'
const opts_all = reactive({
    obj: {}
})
APIpostGetOpts({
    lab: ['house_has_property', 'house_type_model', 'house_type_property', 'house_type_building',
          'house_status_use', 'house_status_safe', 'house_plan_fact'
    ]
}).then(res => {
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
        display: flex;

        .head-btn {
            width: 100%;
            margin-bottom: 10px;
        }

        .tree-item {
            min-width: 200px;
            width: 200px;
            border-right: 1px solid #e9e9e9;

            .tree-title {
                height: 60px;
                line-height: 60px;
                padding-left: 20px;
                color: #aaaaaa;
                font-size: 14px;
                border-bottom: 1px solid #e9e9e9;
            }
        }

        .tree-details {
            flex-grow: 1;
            max-width: calc(100% - 200px);

            .el-cascader-box-my {}

            .bottom-btn-box-2 {
                margin-bottom: 10px;

                .head-btn {
                    width: 100%;
                    margin: 10px 0 10px 0;
                }
            }
        }
    }

    .row-box {
        border-bottom: 1px solid #e9e9e9;
        background-color: #ffffff;

        .row-item-box {
            display: inline-block;
            box-sizing: border-box;
            padding: 2px;
            width: 74px;
            height: 44px;

            .row-item {
                width: 100%;
                height: 100%;
                border: 1px solid #e9e9e9;
                font-size: 14px;
                vertical-align: top;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                padding: 6px;
                cursor: pointer;
                justify-content: space-between;

                .row-item-check {}
            }

            .row-item-tit-ceng {
                border: 0 solid #e9e9e9;
            }
        }

        .row-item-tit-box {
            border-right: 1px solid #e9e9e9;

            .row-item-tit {
                border: 0 solid #e9e9e9 !important;
                font-size: 12px;

                .tit-fh {
                    margin-bottom: -18px;
                }

                .tit-lc {
                    margin-top: -18px;
                }
            }

            .row-item-tit-bgline {
                background-image: linear-gradient(to top right, #ffffff 49%, #e9e9e9, #ffffff 51%);
                justify-content: space-between;
                cursor: initial;
            }
        }
    }
</style>
