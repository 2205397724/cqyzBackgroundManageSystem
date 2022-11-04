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
                :check-strictly="true"
                :default-checked-keys="[tree_item.id]"
                :filter-node-method="filterNode"
                :highlight-current="true"
                @node-click="handleCheck"
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
const emit = defineEmits(['checkFunc'])
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
    APIgetResidentialListHouse,
    // 楼栋
    APIgetBuildListHouse,
    // 单元
    APIgetUnitsListHouse
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
        // resolve([tree_item.value])
        // emit('checkFunc', { 0: tree_item.value, 1: treeDetail.arr })
        return resolve(tree_item.value)
    }
    switch (node.data.next_type) {
        case 'region':
            APIgetChinaRegion({ 'p_code': node.data.id }).then(res => {
                treeDetail.arr = res
                console.log(res)
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
                // emit('checkFunc', { 0: tree_item.value, 1: treeDetail.arr })
            })
            break
        case 'zone':
            APIgetResidentialListHouse({ page: 1, per_page: 100, china_code: node.data.id }).then(res => {
                // treeDetail.arr = res
                console.log(res)
                let tree_arr = []
                for (let i in res) {
                    tree_arr.push({ name: res[i].name, type: 'zone', next_type: 'buildings', id: res[i].id })
                }
                resolve(tree_arr)
                // emit('checkFunc', { 0: tree_item.value, 1: treeDetail.arr })
                tree_arr = []
            })
            break
        case 'buildings':
            APIgetBuildListHouse({ page: 1, per_page: 100, zone_id: node.data.id }).then(res => {
                let tree_arr = []
                for (let i in res) {
                    tree_arr.push({ name: res[i].name, type: 'buildings', next_type: 'units', id: res[i].id })
                }
                resolve(tree_arr)
            })
            break
        case 'units':
            APIgetUnitsListHouse({ page: 1, per_page: 100, building_id: node.data.id }).then(res => {
                let tree_arr = []
                for (let i in res) {
                    tree_arr.push({ name: res[i].name, leaf: true, id: res[i].id, type: 'units', next_type: 'house' })
                }
                resolve(tree_arr)
                tree_arr = []
                // emit('checkFunc', { 0: tree_item.value, 1: treeDetail.arr })
            })
            break
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
    console.log(data)
    if (data) {
        emit('checkFunc', data)
        return false
    }
    emit('checkFunc', '')
}
</script>
<style lang="scss">
.main-box {
    height: 100%;
    // overflow: auto;
    .el-tree-box {
        // width: max-content;
        // min-width: 100%;
    }
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #409eff;
    color: white;
}
</style>
