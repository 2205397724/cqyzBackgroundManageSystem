<template>
    <div class="main-box">
        <el-tree class="el-tree-box" :props="tree_props" :load="loadNode" lazy show-checkbox />
    </div>
</template>

<script setup>
// {id:500101,name:'总title',type:'region'}
import {
    ref,
    reactive,
    toRefs,
    defineProps,
    defineEmits
} from 'vue'
const props = defineProps(['tree_item'])
const emit = defineEmits(['myClick'])
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
const refreshTree = () => {
    if (nodeCopy) {
        nodeCopy.loaded = false
        nodeCopy.loadData()
    }
}
// type: region区域 zone小区 building楼栋 unit单元
const loadNode = (node, resolve) => {
    console.log(node)
    if (node.level == 0) {
        nodeCopy = node
        resolve([{ name: tree_item.value.name, code: tree_item.value.id, type: tree_item.value.type }])
        return false
    }
    switch (node.data.type) {
        case 'region':
            APIgetChinaRegion({ 'p_code': node.data.code }).then(res => {
                let tree_arr = []
                if (!res.data.code) {
                    for (let i in res.data) {
                        if (res.data[i].level < 5) {
                            tree_arr.push({ name: res.data[i].name, code: res.data[i].code, type: 'region' })
                        } else {
                            tree_arr.push({ name: res.data[i].name, china_code: res.data[i].code, type: 'zone' })
                        }
                    }
                }
                resolve(tree_arr)
            })
            break
        case 'zone':
            APIgetResidentialListHouse({ page: 1, per_page: 500, china_code: node.data.china_code }).then(res => {
                let tree_arr = []
                if (!res.data.code) {
                    for (let i in res.data.items) {
                        tree_arr.push({ name: res.data.items[i].name, zone_id: res.data.items[i].id, type: 'building' })
                    }
                }
                resolve(tree_arr)
            })
            break
        case 'building':
            APIgetBuildListHouse({ page: 1, per_page: 500, zone_id: node.data.zone_id }).then(res => {
                let tree_arr = []
                if (!res.data.code) {
                    for (let i in res.data.items) {
                        tree_arr.push({ name: res.data.items[i].name, building_id: res.data.items[i].id, type: 'unit' })
                    }
                }
                resolve(tree_arr)
            })
            break
        case 'unit':
            APIgetUnitsListHouse({ page: 1, per_page: 500, building_id: node.data.building_id }).then(res => {
                let tree_arr = []
                if (!res.data.code) {
                    for (let i in res.data.items) {
                        tree_arr.push({ name: res.data.items[i].name, building_id: res.data.items[i].id, leaf: true })
                    }
                }
                resolve(tree_arr)
            })
            break
    }
}
watch(tree_item, new_val => {
    refreshTree()
}, { immediate: true, deep: true })
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
