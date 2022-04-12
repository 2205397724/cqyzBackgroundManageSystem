<template>
    <div class="main-box">
        <el-tree
            ref="treeRef"
            class="el-tree-box"
            node-key="id"
            :props="tree_props"
            :load="loadNode"
            lazy
            show-checkbox
            :check-strictly="true"
            :accordion="true"
            :default-checked-keys="[tree_item.id]"
            @check-change="handleCheckChange"
        />
    </div>
</template>

<script setup>
// {id:500101,name:'总title',type:'region'}
import {
    ref,
    toRefs,
    defineProps,
    defineEmits
} from 'vue'
const props = defineProps(['tree_item'])
const emit = defineEmits(['checkFunc'])
const { tree_item } = toRefs(props)
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
// type: region区域 zone小区 building楼栋 unit单元
const loadNode = (node, resolve) => {
    if (node.level == 0) {
        nodeCopy = node
        resolve([tree_item.value])
        if (tree_item.value.type && tree_item.value.type != 'region') {
            emit('checkFunc', tree_item.value)
        }
        return false
    }
    switch (node.data.next_type) {
        case 'region':
            APIgetChinaRegion({ 'p_code': node.data.id }).then(res => {
                let tree_arr = []
                if (!res.data.code) {
                    for (let i in res.data) {
                        if (res.data[i].level < 5) {
                            tree_arr.push({ name: res.data[i].name, type: 'region', next_type: 'region', id: res.data[i].code })
                        } else {
                            tree_arr.push({ name: res.data[i].name, type: 'region', next_type: 'zone', id: res.data[i].code })
                        }
                    }
                }
                resolve(tree_arr)
            })
            break
        case 'zone':
            APIgetResidentialListHouse({ page: 1, per_page: 500, china_code: node.data.id }).then(res => {
                let tree_arr = []
                if (!res.data.code) {
                    for (let i in res.data.items) {
                        tree_arr.push({ name: res.data.items[i].name, type: 'zone', next_type: 'building', id: res.data.items[i].id })
                    }
                }
                resolve(tree_arr)
            })
            break
        case 'building':
            APIgetBuildListHouse({ page: 1, per_page: 500, zone_id: node.data.id }).then(res => {
                let tree_arr = []
                if (!res.data.code) {
                    for (let i in res.data.items) {
                        tree_arr.push({ name: res.data.items[i].name, type: 'building', next_type: 'unit', id: res.data.items[i].id })
                    }
                }
                resolve(tree_arr)
            })
            break
        case 'unit':
            APIgetUnitsListHouse({ page: 1, per_page: 500, building_id: node.data.id }).then(res => {
                let tree_arr = []
                if (!res.data.code) {
                    for (let i in res.data.items) {
                        tree_arr.push({ name: res.data.items[i].name, leaf: true, id: res.data.items[i].id, type: 'unit', next_type: 'house' })
                    }
                }
                resolve(tree_arr)
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
const handleCheckChange = (data, checked, node) => {
    if (checked) {
        treeRef.value.setCheckedNodes([data])
        emit('checkFunc', data)
        return false
    }
    emit('checkFunc', '')
}
</script>
<style lang="scss">
    .main-box {
        height: 100%;
        max-height: 100vh;
        overflow: auto;
        .el-tree-box{
            width: max-content;
            min-width: 100%;
        }
    }
</style>
