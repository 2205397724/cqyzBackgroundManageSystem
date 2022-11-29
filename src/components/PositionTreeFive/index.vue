<template>
    <div class="main-box">
        <el-dialog
            v-model="showabled"
            title=""
            width="60%"
            class="dialog"
            @close="dialogClose"
        >
            <div class="tree" style="display: inline-block;">
                <el-scrollbar max-height="500px">
                    <el-tree
                        ref="treeRef"
                        class="el-tree-box"
                        node-key="code"
                        :default-checked-keys="defaultChecked.arr"
                        :props="tree_props"
                        :load="loadNode"
                        lazy
                        show-checkbox
                        :check-strictly="true"
                        accordion
                        @check="handleCheck"
                        @check-change="handleCheckChange"
                        @node-click="nodeClick"
                    />
                </el-scrollbar>
            </div>
            <div v-if="showFamily" class="table btnNone">
                <div class="header">{{ unitsDetail.item.name }}</div>
                <!-- <el-scrollbar height="504px"> -->

                <!-- <div>
                        <div
                            v-for="(floor, index) in floors.arr"
                            :key="index"
                            class="house_box"
                        >
                            <div class="floor">{{ floor.floor_truth }}</div>
                            <div class="house_item">
                                <div
                                    v-for="house in floor.houses"
                                    :key="house.id"
                                    :class="{
                                        item: true,
                                        bg: selected_house.arr.includes(house.id),
                                    }"
                                    @click="selectedHouseFun(house.id)"
                                >
                                    {{ house.house_num }}
                                </div>
                            </div>
                        </div>
                    </div> -->
                <!-- </el-scrollbar> -->
                <div style="padding: 20px;box-sizing: border-box;background-color: #f0f2f5;height: 400px;">
                    <!-- <div style="padding: 20px;box-sizing: border-box;background-color: #f0f2f5;"> -->
                    <div class="row-box row-box-title">
                        <div class="row-item-box row-item-tit-box">
                            <div class="row-item row-item-tit row-item-tit-bgline">
                                <div class="tit-fh">楼层</div>
                                <div class="tit-lc">房号</div>
                            </div>
                        </div>
                        <el-scrollbar style="white-space: nowrap;">
                            <div v-for="(item,i) in house_num.arr" :key="i" class="row-item-box ">
                                <div class="row-item">
                                    <!-- <el-checkbox
                                                        v-model="checkFH.row[item].val"
                                                        @change="(val)=>{checkFH.row[item].val= val;rowClickFunc(item,val)}"
                                                    /> -->
                                    <div class="row-item-check">{{ item }}#</div>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                    <div style="height: calc(100% - 45px);overflow: auto;">
                        <!-- <div> -->
                        <div v-for="(child,i) in house_list.arr" :key="i" class="row-box">
                            <div class="row-item-box row-item-tit-box">
                                <div class="row-item row-item-tit row-item-tit-ceng">
                                    <!-- <el-checkbox
                                                        v-model="checkFH.col[child.floor_truth].val"
                                                        @change="(val)=>{checkFH.col[child.floor_truth].val= val;colClickFunc(child.floor_truth,val)}"
                                                    /> -->
                                    <div>{{ child.floor_truth }}层</div>
                                </div>
                            </div>
                            <el-scrollbar style="white-space: nowrap;">
                                <div style="display: flex;">
                                    <div v-for="(item,i) in child.houses" :key="i" :class="{item: true,bg: selected_house.arr.includes(item.id)}" @click="selectedHouseFun(item.id)">
                                        <!-- <div v-for="(item,i) in house_list.arr" :key="i" class="row-item-box"> -->
                                        <div v-show="item.house_num?true:false" class="row-item" style="position: relative;">
                                            <div class="row-item-check">{{ item.house_num }}#</div>

                                            <!-- <el-popconfirm
                                                title="确定要删除当前项么?"
                                                cancel-button-type="info"
                                                @confirm="deleteHouse(item.id)"
                                            >
                                                <template #reference>
                                                    <div v-if="item.can_exist" class="region_box_item_del_1">✖</div>
                                                </template>
                                            </el-popconfirm> -->
                                        </div>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <!-- <el-select v-model="selected_do_type" placeholder="请选择可操作类型" style="width: 200px;margin-right: 20px;" effect="dark">
          <el-option :label="item.value" :value="item.type" v-for="item in do_type.item" :key="item.type"></el-option>
        </el-select> -->
                <el-button type="primary" @click="submit">确认</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
// {id:500101,name:'总title',type:'region'}
import { ElMessage } from 'element-plus'
import { ref, toRefs, reactive, defineProps, defineEmits, watch } from 'vue'
const props = defineProps(['tree_item', 'type', 'showabled', 'surveyid'])
const showFamily = ref(false)
const type = reactive(props.type)
const emit = defineEmits(['checkFunc', 'update:showabled', 'onRangeFunc'])
const { tree_item, showabled } = toRefs(props)
const treeDetail = reactive({
    arr: {}
})
const range = ref(0) // 活动参与范围
watch(showabled, newVal => {
    showabled.value = newVal
})

const selected_all = reactive({
    arr: []
})
const selected_house = reactive({
    // 选择的房子
    arr: []
})
const selected_units = reactive({
    arr: []
})
const selected_building = reactive({
    arr: []
})
const selected_zone = reactive({
    arr: []
})
const selected_region = reactive({
    arr: []
})
const unitsDetail = reactive({
    item: {
        name: ''
    }
})
const floors = reactive({
    arr: []
})
const tree_props = {
    label: 'name',
    children: 'children',
    isLeaf: 'leaf'
}
// 选择可操作类型
const selected_do_type = ref(2)
const do_type = reactive({
    item: [
        {
            type: 1,
            value: '指定范围可查看'
        },
        {
            type: 2,
            value: '指定范围可参与'
        }
    ]
})
// 刷新
const refreshFunc = () => {

}
const dialogClose = () => {
    emit('update:showabled', false)
}
import {
    APIgetChinaRegion,
    APIgetResidentialListHouse,
    APIgetBuildListHouse,
    APIgetUnitsListHouse,
    APIgetHouseListHouse,
    APIgetHouseDetailsHouse,
    APIgetHouseListSort,
    APIgetResidentialDetailsHouse,
    APIgetBuildDetailsHouse,
    APIaddSurveyRange,
    APIdeleteSurveyRange
} from '@/api/custom/custom.js'
let nodeCopy = ''
// type: region区域 zone小区 building楼栋 units单元
const filterNode = (value, data, node) => {
    // if(node.data.next_type===value){
    //     return false
    // }
}
const house_detail = reactive({
    item: {}
})
// 选择的房屋
const selectedHouseFun = houseid => {
    if (selected_house.arr.includes(houseid)) {
        let index = selected_house.arr.indexOf(houseid)
        selected_house.arr.splice(index, 1)
    } else {
        selected_house.arr.push(houseid)
    }
    console.log(selected_house.arr)
}
// 默认选择地区数组
const defaultChecked = reactive({ arr: [] })
// 提交选择
const submit = () => {
    let all = treeRef.value.getCheckedNodes()
    console.log(all)
    all.forEach(item => {
        switch (item.type) {
            case 'region':
                selected_region.arr.push(item.id)
                break
            case 'zone':
                selected_zone.arr.push(item.id)
                break
            case 'building':
                selected_building.arr.push(item.id)
                break
            case 'units':
                selected_units.arr.push(item.id)
                break
        }
    })
    console.log(selected_region.arr)
    let promiseAll = []
    if (selected_region.arr.length > 0) {
        promiseAll.push(
            APIaddSurveyRange({
                sid: props.surveyid,
                can_type: selected_do_type.value,
                type: 5,
                tgt: selected_region.arr
            })
        )
    }
    if (selected_zone.arr.length > 0) {
        promiseAll.push(
            APIaddSurveyRange({
                sid: props.surveyid,
                can_type: selected_do_type.value,
                type: 4,
                tgt: selected_zone.arr
            })
        )
    }
    if (selected_building.arr.length > 0) {
        promiseAll.push(
            APIaddSurveyRange({
                sid: props.surveyid,
                can_type: selected_do_type.value,
                type: 3,
                tgt: selected_building.arr
            })
        )
    }
    if (selected_units.arr.length > 0) {
        promiseAll.push(
            APIaddSurveyRange({
                sid: props.surveyid,
                can_type: selected_do_type.value,
                type: 2,
                tgt: selected_units.arr
            })
        )
    }

    Promise.all(promiseAll)
        .then(res => {
            // 并发接口
            ElMessage.success('设置成功')
            emit('update:showabled', false)
            emit('onRangeFunc')
        })
        .catch(e => {
            ElMessage.error('设置失败请重试')
        })
    if (selected_house.arr.length > 0) {
        APIaddSurveyRange({ sid: props.surveyid, can_type: 2, type: 1, tgt: selected_house.arr })
    }

}
const house_list = reactive({
    arr: []
})
const house_num = reactive({
    arr: []
})
const checkFH = reactive({
    row: {},
    col: {},
    all: {}
})
const total = ref(0)
// 点击节点触发
const nodeClick = (node, treenode, event) => {
    console.log(node)
    if (node.type == 'units' || node.type == 'building') {
        let name = node.name
        unitsDetail.item.name = name
        showFamily.value = true
        APIgetHouseListSort({
            houseable_type: node.type == 'units' ? 'units' : 'buildings',
            houseable_id: node.id,
            sid: props.surveyid,
            can_type: 2
        }).then(res => {
            console.log(res)
            let nums = res.house_nums
            let list = res.floors
            for (let i in list) {
                if (list[i].houses.length < nums.length) {
                    for (let j in nums) {
                        if (!list[i].houses[j] || !list[i].houses[j].house_num || (list[i].houses[j]
                            .house_num != nums[j])) {
                            list[i].houses.splice(j, 0, {})
                        }
                    }
                }
                house_num.arr = nums
                house_list.arr = list
                console.log(house_num.arr)
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
                        }
                    }
                }
            }
            floors.arr = res.floors
            let selected = []
            floors.arr.forEach(item => {
                item.houses.forEach(items => {
                    if (items.can_exist) {
                        selected.push(items.id)
                    }
                })
            })
            selected_house.arr = selected
        })
    } else {
        showFamily.value = false
        return
    }
}
const loadNode = (node, resolve) => {
    if (node.level == 0) {
        nodeCopy = node
        resolve([tree_item.value])
        emit('checkFunc', { 0: tree_item.value, 1: treeDetail.arr })
        return false
    }
    switch (node.data.next_type) {
        case 'region':
            APIgetChinaRegion({
                p_code: node.data.id,
                sid: props.surveyid,
                can_type: 2
            }).then(res => {
                treeDetail.arr = res
                console.log(res)
                let tree_arr = []
                if (res.length > 0) {
                    for (let i in res) {
                        if (res[i].level < 5) {
                            if (res[i].can_exist) {
                                console.log(res[i])
                                defaultChecked.arr.push(res[i].code)
                                selected_all.arr.push(res[i].code)
                                treeRef.value.setCheckedKeys(selected_all.arr)
                            }
                            tree_arr.push({
                                name: res[i].name,
                                type: 'region',
                                next_type: 'region',
                                id: res[i].code,
                                code: res[i].code,
                                can_exist: res[i].can_exist,
                                isDisabled: true
                            })
                        } else {
                            if (res[i].can_exist) {
                                defaultChecked.arr.push(res[i].code)
                                selected_all.arr.push(res[i].code)
                                treeRef.value.setCheckedKeys(selected_all.arr)
                            }
                            tree_arr.push({
                                name: res[i].name,
                                type: 'region',
                                next_type: 'zone',
                                id: res[i].code,
                                code: res[i].code,
                                isDisabled: true
                            })
                        }
                    }
                }
                console.log(defaultChecked.arr)
                resolve(tree_arr)
                emit('checkFunc', { 0: tree_item.value, 1: treeDetail.arr })
            })
            break
        case 'zone':
            APIgetResidentialListHouse({
                page:1,
                per_page:200,
                china_code: node.data.id,
                sid: props.surveyid,
                can_type: 2
            }).then(res => {
                console.log(res)
                let tree_arr = []
                for (let i in res) {
                    if (res[i].can_exist) {
                        defaultChecked.arr.push(res[i].china_code)
                        selected_all.arr.push(res[i].id)
                        treeRef.value.setCheckedKeys(selected_all.arr)
                    }
                    tree_arr.push({
                        name: res[i].name,
                        type: 'zone',
                        next_type: 'building',
                        id: res[i].id,
                        code: res[i].id,
                        can_exist: res[i].can_exist,
                        isDisabled: true
                    })
                }
                resolve(tree_arr)
                emit('checkFunc', { 0: tree_item.value, 1: treeDetail.arr })
                tree_arr = []
            })
            break
        case 'building':
            APIgetBuildListHouse({
                page:1,
                per_page:200,
                zone_id: node.data.id,
                sid: props.surveyid,
                can_type: 2
            }).then(res => {
                let tree_arr = []
                for (let i in res) {
                    if (res[i].can_exist) {
                        defaultChecked.arr.push(res[i].id)
                        selected_all.arr.push(res[i].id)
                        treeRef.value.setCheckedKeys(selected_all.arr)
                    }
                    tree_arr.push({
                        name: res[i].name,
                        type: 'building',
                        next_type: 'units',
                        id: res[i].id,
                        code: res[i].id,
                        can_exist: res[i].can_exist,
                        isDisabled: true
                    })
                }
                emit('checkFunc', { 0: tree_item.value, 1: treeDetail.arr })
                resolve(tree_arr)
            })
            break
        case 'units':
            APIgetUnitsListHouse({
                page:1,
                per_page:200,
                building_id: node.data.id,
                sid: props.surveyid,
                can_type: 2
            }).then(res => {
                let tree_arr = []
                for (let i in res) {
                    if (res[i].can_exist) {
                        defaultChecked.arr.push(res[i].id)
                        selected_all.arr.push(res[i].id)
                        treeRef.value.setCheckedKeys(selected_all.arr)
                    }
                    tree_arr.push({
                        name: res[i].name,
                        id: res[i].id,
                        type: 'units',
                        next_type: 'house',
                        code: res[i].id,
                        can_exist: res[i].can_exist,
                        isDisabled: false,
                        leaf: true
                    })
                }
                resolve(tree_arr)
                emit('checkFunc', { 0: tree_item.value, 1: treeDetail.arr })
            })
            break
    }
}
const treeRef = ref(null)
watch(
    tree_item,
    new_val => {
        if (nodeCopy) {
            nodeCopy.loaded = false
            nodeCopy.loadData()
        }
    },
    { immediate: true, deep: true }
)
const handleCheck = (data, checked) => {
    // 点击复选框触发
    let currentNode = treeRef.value.getNode(data.code)
    console.log(currentNode)
    if (currentNode.checked) {
        cancelChildNode(currentNode)
    }
    function cancelChildNode(parentNode) {
        for (let i = 0;i < parentNode.childNodes.length;i++) {
            console.log(i)
            parentNode.childNodes[i].checked = false
            // parentNode.childNodes[i].data.isDisabled=true
            cancelChildNode(parentNode.childNodes[i])
        }
    }
    // 控制选择父节点，子节点取消
    //   if (data.type == "region") {
    //     treeRef.value.setCheckedKeys(selected_all.arr);
    //     APIgetChinaRegion({
    //       p_code: data.code,
    //       sid: props.surveyid,
    //       can_type: 2,
    //     }).then((res) => {
    //       console.log(res);
    //       let can_exist_true = [];
    //       let delarr = [];
    //       res.forEach((item) => {
    //         can_exist_true.push(item.code);
    //       });
    //       can_exist_true.forEach((item) => {
    //         if (selected_all.arr.indexOf(item) != -1) {
    //           let index = selected_all.arr.indexOf(item);
    //           let del = selected_all.arr.splice(index, 1);
    //           delarr.push(del);
    //           console.log(del);
    //           // treeRef.value.setCheckedKeys(selected_all.arr)
    //         }
    //       });
    //       selected_all.arr = selected_all.arr.filter((item) => {
    //         return !delarr.includes(item);
    //       });
    //       treeRef.value.setCheckedKeys(selected_all.arr);
    //     });
    //   }
    //   if (data.type == "zone") {
    //     APIgetBuildListHouse({
    //       zone_id: data.id,
    //       sid: props.surveyid,
    //       can_type: 2,
    //     }).then((res) => {
    //       console.log(res);
    //       let can_exist_true = [];
    //       let delarr = [];
    //       res.forEach((item) => {
    //         can_exist_true.push(item.id);
    //       });
    //       can_exist_true.forEach((item) => {
    //         if (selected_all.arr.indexOf(item) != -1) {
    //           let index = selected_all.arr.indexOf(item);
    //           let del = selected_all.arr.splice(index, 1);
    //           delarr.push(del);
    //           console.log(del);
    //           // treeRef.value.setCheckedKeys(selected_all.arr)
    //         }
    //       });
    //       selected_all.arr = selected_all.arr.filter((item) => {
    //         return !delarr.includes(item);
    //       });
    //       treeRef.value.setCheckedKeys(selected_all.arr);
    //     });
    //   }
    //   if (data.type == "building") {
    //     APIgetUnitsListHouse({
    //       building_id: data.id,
    //       sid: props.surveyid,
    //       can_type: 2,
    //     }).then((res) => {
    //       console.log(res);
    //       let can_exist_true = [];
    //       let delarr = [];
    //       res.forEach((item) => {
    //         can_exist_true.push(item.id);
    //       });
    //       can_exist_true.forEach((item) => {
    //         if (selected_all.arr.indexOf(item) != -1) {
    //           let index = selected_all.arr.indexOf(item);
    //           let del = selected_all.arr.splice(index, 1);
    //           delarr.push(del);
    //           console.log(del);
    //         }
    //       });
    //       selected_all.arr = selected_all.arr.filter((item) => {
    //         return !delarr.includes(item);
    //       });
    //       treeRef.value.setCheckedKeys(selected_all.arr);
    //     });
    //   }
    emit('checkFunc', data)
}
const handleCheckChange = (data, selfSelected, childrenSelected) => {
    // 点击节点触发
    //   selected_all.arr.forEach((item, index) => {
    //     //实现多选时复选框二次点击取消选中
    //     if (item == data.code) {
    //       selected_all.arr.splice(index, 1);
    //       treeRef.value.setCheckedKeys(selected_all.arr);
    //     }
    //   });
    if (data.type == 'zone') {
        APIgetResidentialDetailsHouse(data.id).then(res => {
            emit('checkChangeFunc', res)
        })
    }
    if (data.type == 'building') {
        APIgetBuildDetailsHouse(data.id).then(res => {
            emit('checkChangeFunc', res)
        })
    }
    //   if (data.type == "units") {
    //     showFamily.value = true;
    //     emit("checkChangeFunc", data);
    //     unitsDetail.item.name= data.name
    //     APIgetHouseListSort({
    //       houseable_type: "units",
    //       houseable_id: data.id,
    //       sid: props.surveyid,
    //       can_type: 2,
    //     }).then((res) => {
    //       console.log(res);
    //       floors.arr = res.floors;
    //       let selected = [];
    //       floors.arr.forEach((item) => {
    //         item.houses.forEach((items) => {
    //           if (items.can_exist) {
    //             selected.push(items.id);
    //           }
    //         });
    //       });
    //       selected_house.arr = selected;
    //     });
    //   }
}
</script>
<style lang="scss">
.main-box {
    .tree {
        width: 35%;
        display: inline-block;
    }
    .table {
        display: inline-block;
        width: 60%;
        height: 500px;
        position: absolute;
        .header {
            width: 100%;
            height: 40px;
            text-align: center;
            font-size: 22px;
        }
        .house_box {
            height: 51px;
            width: 99%;
            border: 2px solid #999;
            border-bottom: none;
            display: flex;
            &:last-child {
                border-bottom: 2px solid #999;
            }
            .floor {
                width: 56px;
                height: 50px;
                border-right: 1px solid #999;
                text-align: center;
                line-height: 50px;
                background-color: #424141;
                color: white;
                font-size: 20px;
            }
            .house_item {
                width: 90%;
                display: flex;
                align-items: center;
                .item {
                    margin-left: 10px;
                    width: 40px;
                    height: 40px;
                    border: 1px solid #999;
                    font-size: 20px;
                    line-height: 40px;
                    text-align: center;
                    cursor: pointer;
                    &.bg {
                        background-color: #409eff;
                    }
                }
            }
        }
    }
}
.row-box {
    border-bottom: 1px solid #f2f2f2;
    background-color: #fff;
    display: flex;
    .row-item-box {
        display: inline-block;
        box-sizing: border-box;
        padding: 6px;
        min-width: 84px;
        height: 44px;
        .row-item {
            width: 100%;
            height: 100%;
            font-size: 14px;
            vertical-align: top;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            padding: 6px;
            cursor: pointer;

            // justify-content: space-between;
        }
        .row-item-tit-ceng {
            border: 0 solid #e9e9e9;
        }
    }
    .item {
        display: inline-block;
        box-sizing: border-box;
        padding: 6px;
        min-width: 84px;
        height: 44px;
        &.bg {
            background-color: #409eff;
        }
        .row-item {
            width: 100%;
            height: 100%;
            // border: 1px solid #e9e9e9;
            font-size: 14px;
            vertical-align: top;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            padding: 6px;
            cursor: pointer;

            // justify-content: space-between;
        }
    }
    .row-item-tit-ceng {
        border: 0 solid #e9e9e9;
    }
    .region_box_item_del_1 {
        width: 22px;
        height: 24px;
        line-height: 18px;
        transform: scale(0.7);
        position: absolute;
        right: -9px;
        top: -9px;
        border-radius: 50%;
        border: 2px solid red;
        cursor: pointer;
        font-weight: bold;
        color: red;
        text-align: center;
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
            background-image: linear-gradient(to top right, #fff 49%, #e9e9e9, #fff 51%);
            justify-content: space-between;
            cursor: initial;
        }
    }
}
</style>
