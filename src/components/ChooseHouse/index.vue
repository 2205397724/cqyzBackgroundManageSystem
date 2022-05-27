<template>
    <div style="display: flex; max-height: calc(85vh - 50px - 54px - 62px - 40px);">
        <position-tree
            :tree_item="tree_item.obj"
            style="width:400px;border: 1px solid #eeeeee;height: auto;"
            @checkFunc="checkFunc"
        />
        <div style="width: 100%;margin-left: 20px;overflow: auto;border: 1px solid #eeeeee;position: relative;">
            <div v-if="!(tree_item.active_unit.type=='units'||tree_item.active_unit.type=='building')" style="position: absolute;left:0;top:0;width:100%;height:100%;background-color: rgba(255,255,255,0.6);z-index: 9;cursor: no-drop;" />
            <div>
                <div class="row-box row-box-title">
                    <div class="row-item-box row-item-tit-box">
                        <div class="row-item row-item-tit row-item-tit-bgline">
                            <div class="tit-fh">楼层</div>
                            <div class="tit-lc">房号</div>
                        </div>
                    </div>
                    <el-scrollbar style="white-space: nowrap;">
                        <div v-for="(item,i) in house_num.arr" class="row-item-box ">
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
                <div style="height: calc(100% - 45px );overflow: auto;">
                    <div v-for="(child,j) in house_list.arr" class="row-box">
                        <div class="row-item-box row-item-tit-box">
                            <div class="row-item row-item-tit row-item-tit-ceng">
                                <el-checkbox
                                    v-model="checkFH.col[child.floor_truth].val"
                                    @change="(val)=>{checkFH.col[child.floor_truth].val= val;colClickFunc(child.floor_truth,val)}"
                                />
                                <div>{{ child.floor_truth }}层</div>
                            </div>
                        </div>
                        <el-scrollbar style="white-space: nowrap;">
                            <div style="display: flex;">
                                <div v-for="(item,i) in child.houses" class="row-item-box">
                                    <div v-show="item.house_num?true:false" class="row-item">
                                        <el-checkbox
                                            v-if="checkFH.all[child.floor_truth]&&checkFH.all[child.floor_truth][item.house_num]"
                                            v-model="checkFH.all[child.floor_truth][item.house_num].val"
                                            @change="(val)=>{checkFH.all[child.floor_truth][item.house_num].val= val;allClickFunc(child.floor_truth,item.house_num,val)}"
                                        />
                                        <!-- <div class="row-item-check">{{ item.house_num }}#</div> -->
                                        <el-popover
                                            :width="200"
                                            trigger="hover"

                                            placement="top"
                                        >
                                            <template #reference>
                                                <div class="row-item-check">{{ item.house_num }}#</div>
                                            </template>
                                            <div style="box-sizing: border-box;padding: 4px;">
                                                <div class="tip-title">房屋：{{ item.name }}</div>
                                                <div class="tip-title">使用状态：{{ getOptVal(opts_all.obj.house_status_use,item.status_use) }}</div>
                                                <div class="tip-title">安全状态：{{ getOptVal(opts_all.obj.house_status_safe,item.status_safe) }}</div>
                                                <div class="tip-title">产权性质：{{ getOptVal(opts_all.obj.house_type_property,item.type_property) }}</div>
                                                <div class="tip-title">户型：{{ getOptVal(opts_all.obj.house_type_model,item.type_model) }}</div>
                                            </div>
                                        </el-popover>
                                    </div>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import PositionTree from '@/components/PositionTree/index.vue'
import {
    reactive,
    ref,
    toRefs
} from 'vue'
import {
    ElMessage
} from 'element-plus'
const props = defineProps(['houses', 'oldval'])
const { houses, oldval } = toRefs(props)
// watch(dialog_switch, new_val => {
// }, {
//     immediate: true,
//     deep: true
// })
const emit = defineEmits(['update:houses'])
// emit('update:dialog_switch', false)
/* -------------------------------------------------------------------------------------------------------- */
const tree_item = reactive({
    obj: {
        id: '50',
        name: '测试',
        next_type: 'region',
        type: 'region'
    },
    active_unit: {}

})
import {
    APIgetChinaRegion
} from '@/api/custom/custom.js'
APIgetChinaRegion().then(res => {
    tree_item.obj = {
        id: res.data[0].code,
        name: res.data[0].name,
        next_type: 'region',
        type: 'region'
    }
})
const checkFunc = val => {
    console.log(val)
    tree_item.active_unit = val
    if (val.id && val.name && (val.type == 'units' || val.type == 'building')) {
        getHouseListFunc()
    }
    emit('update:houses', oldval)
}
import {
    APIgetHouseListSort
} from '@/api/custom/custom.js'
const total = ref(74751)
const house_num = reactive({
    arr: []
})
const house_list = reactive({
    arr: []
})
const checkFH = reactive({
    row: {},
    col: {},
    all: {}
})
const choseIDs = reactive({
    arr: []
})
const getHouseListFunc = () => {
    let params = {
        houseable_type: tree_item.active_unit.type,
        houseable_id: tree_item.active_unit.id
    }
    APIgetHouseListSort(params).then(res => {
        total.value = 0
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
                    total.value++
                    checkFH.all[house_list.arr[i].floor_truth][house_list.arr[i].houses[j]
                        .house_num] = {
                        val: false,
                        data: house_list.arr[i].houses[j]
                    }
                    if (houses.value.indexOf(house_list.arr[i].houses[j].id) >= 0) {
                        checkFH.all[house_list.arr[i].floor_truth][house_list.arr[i].houses[j].house_num].val = true
                    }
                }
            }
        }
    })
}
const getStateFunc = () => {
    let data = checkFH.all
    choseIDs.arr = []
    for (let i in data) {
        for (let j in data[i]) {
            if (data[i][j].val) {
                choseIDs.arr.push(data[i][j].data)
            }
        }
    }

    let arr = []
    for (let i in choseIDs.arr) {
        arr.push(choseIDs.arr[i].id)
    }
    emit('update:houses', arr)
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
    getStateFunc()
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
    getStateFunc()
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
    getStateFunc()
}
/* -------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts([  'house_type_model', 'house_type_property',  'house_status_use', 'house_status_safe']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss" scoped>
    .row-box {
        border-bottom: 1px solid #f2f2f2;
        background-color: #ffffff;
        display: flex;
        .row-item-box {
            display: inline-block;
            box-sizing: border-box;
            padding:6px;
            min-width:84px;
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
            width: 84px;
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
    .row-box-title{
        .row-item-box{
            .row-item {
                border: 1px solid #ffffff;
            }
        }
    }
</style>
