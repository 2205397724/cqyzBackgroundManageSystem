<template>
    <div class="main-box">
        <el-scrollbar max-height="100%">
            <el-tree
                ref="treeRef"
                class="el-tree-box"
                node-key="id"
                :props="tree_props"
                :load="loadNode"
                lazy
                show-checkbox
                :check-strictly="true"
                :filter-node-method="filterNode"
                @check="handleCheck"
                @check-change="handleCheckChange"
            />
        </el-scrollbar>
    </div>
</template>

<script setup>
// {id:500101,name:'总title',type:'region'}
import {
    ref,
    toRefs,
    reactive,
    defineProps,
    defineEmits
} from 'vue'
const props = defineProps(['tree_item', 'type'])
const type = ref(props.type)
const emit = defineEmits(['checkFunc', 'checkFuncDate', 'checkChangeFunc'])
const { tree_item } = toRefs(props)
const treeDetail = reactive({
    arr: {}
})
const tree_props = {
    label: 'name',
    children: 'children',
    isLeaf: 'leaf'
}
import {
    // china区域
    APIgetChinaRegion,
    // 小区列表
    APIgetResidentialListHouse
} from '@/api/custom/custom.js'
let nodeCopy = ''
// type: region区域 zone小区 building楼栋 units单元
const filterNode = (value, data, node) => {

    // if(node.data.next_type===value){
    //     return false
    // }
}
const loadNode = (node, resolve) => {
    if (node.level == 0) {
        nodeCopy = node
        console.log(node)
        // resolve([tree_item.value])
        emit('checkFunc', { 0: tree_item.value, 1: treeDetail.arr })
        return resolve(tree_item.value)
    }
    switch (node.data.next_type) {
        case 'region':
            APIgetChinaRegion({ 'p_code': node.data.id }).then(res => {
                treeDetail.arr = res
                // console.log(res)
                let tree_arr = []
                if (res.length > 0) {
                    for (let i in res) {
                        if (res[i].level < 5) {
                            tree_arr.push({ name: res[i].name, type: 'region', next_type: 'region', id: res[i].code })
                        } else {
                            tree_arr.push({ name: res[i].name, type: 'region', next_type: 'zone', id: res[i].code })
                        }
                    }
                }
                resolve(tree_arr)
                emit('checkFunc', { 0: tree_item.value, 1: treeDetail.arr })
            })
            break
        case 'zone':
            APIgetResidentialListHouse({ page: 1, per_page: 7, china_code: node.data.id }).then(res => {
                // treeDetail.arr = res.data
                console.log(res)
                let tree_arr = []
                for (let i in res) {
                    tree_arr.push({ name: res[i].name, type: 'zone', leaf: true, id: res[i].id, china_code: res[i].china_code })
                }
                resolve(tree_arr)
                emit('checkFunc', { 0: tree_item.value, 1: treeDetail.arr })
                tree_arr = []
            })
            break
        /* case 'building':
            APIgetBuildListHouse({ page: 1, per_page: 7, zone_id: node.data.id }).then(res => {
                let tree_arr = []
                    for (let i in res) {
                        tree_arr.push({ name: res[i].name, type: 'building', next_type: 'units', id: res[i].id })
                    }
                resolve(tree_arr)
            })
            break
        case 'units':
            APIgetUnitsListHouse({ page: 1, per_page: 7, building_id: node.data.id }).then(res => {
                let tree_arr = []
                    for (let i in res) {
                        tree_arr.push({ name: res[i].name, leaf: true, id: res[i].id, type: 'units', next_type: 'house' })
                    }
                resolve(tree_arr)
                emit('checkFunc', { 0: tree_item.value, 1: treeDetail.arr })
            })
            break */
    }
}
const treeRef = ref(null)
watch(tree_item, new_val => {
    if (nodeCopy) {
        nodeCopy.loaded = false
        nodeCopy.loadData()
    }
}, { immediate: true, deep: true })
const handleCheck = (data, checked) => {
    if (checked.checkedKeys.length > 0) {
        treeRef.value.setCheckedNodes([data])
        emit('checkFuncDate', data)
        emit('checkFunc', data)
        return false
    }
    emit('checkFunc', '')
    emit('checkFuncDate', '')

}
const handleCheckChange = (data, selfSelected, childrenSelected) => {
    if (selfSelected) {
        emit('checkChangeFunc', data)
    }
}
</script>
<style lang="scss">
    .main-box {
        height: 100%;
    }
</style>
