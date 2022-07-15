<template>
    <div style="width: 100%;">
        <div
            :style="{'color':checkedVal2l?'':'#aaaaaa'}"
            style="border: 1px solid rgb(220 223 230);width: 100%;border-radius: 4px;padding: 0 11px;box-sizing: border-box;cursor: pointer;overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
            @click="()=>{
                popup1.switch = true;
            }"
        >
            {{ checkedVal2 || '请选择单元' }}
        </div>
        <!-- 详情 -->
        <el-dialog
            v-model="popup1.switch"
            title="请勾选小区"
            width="60%"
        >
            <el-scrollbar max-height="calc(85vh - 50px - 40px - 54px - 42px - 63px)" style="border: 1px solid #f3f3f3;">
                <el-tree
                    v-if="popup1.switch"
                    ref="treeRef"
                    class="el-tree-box"
                    node-key="id"
                    :props="tree_props"
                    :load="loadNode"
                    lazy
                    show-checkbox
                    :check-strictly="true"
                    :accordion="true"
                    :default-checked-keys="[uid]"
                    @check="handleCheck"
                />
            </el-scrollbar>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="popup1.switch = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
// code 必须是区域代码，且不是最后一级
// region zone  building  units
import {
    defineProps,
    defineEmits,
    reactive,
    toRefs
} from 'vue'
const props = defineProps(['cid', 'zid', 'bid', 'uid', 'code', 'disabled'])
const emits = defineEmits(['update:zid', 'update:bid', 'update:uid', 'update:cid'])
const {
    uid,
    code,
    disabled
} = toRefs(props)
const tree_props = {
    label: 'name',
    children: 'children',
    isLeaf: 'leaf'
}
const popup1 = reactive({
    switch: false
})
const checkedVal = ref('')
const checkedVal2 = ref('')
const treeRef = ref(null)
const handleCheck = (data) => {
    treeRef.value.setCheckedNodes([data])
    checkedVal.value = treeRef.value.getCheckedNodes()
    checkedVal2.value = checkedVal.value[0].name
    console.log(checkedVal2.value)
    setTimeout(() => {
        popup1.switch = false
        if (data.type == 'region') {
            emits('update:cid', data.id)
            return false
        }
        if (data.type == 'zone') {
            emits('update:cid', data.data?.china_code)
            emits('update:zid', data.data?.id)
            return false
        }
        if (data.type == 'building') {
            emits('update:cid', data.data?.sync_china_code)
            emits('update:zid', data.data?.zone_id)
            emits('update:bid', data.data?.id)
            return false
        }
        if (data.type == 'units') {
            emits('update:cid', data.data?.sync_china_code)
            emits('update:zid', data.data?.sync_zone_id)
            emits('update:bid', data.data?.building_id)
            emits('update:uid', data.data?.id)
            return false
        }
    }, 200)
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
const loadNode = (node, resolve) => {
    if (node.level == 0) {
        APIgetChinaRegion({ 'p_code': code.value }).then(res => {
            let tree_arr = []
            let dis = false
            for (let i in disabled.value) {
                if (disabled.value[i] == node.level) {
                    dis = true
                    break
                }
            }
            for (let i in res) {
                if (res?.[i]?.level < 5) {
                    tree_arr.push({ name: res?.[i]?.name, type: 'region', next_type: 'region', id: res?.[i]?.code, disabled: dis })
                } else {
                    tree_arr.push({ name: res?.[i]?.name, type: 'region', next_type: 'zone', id: res?.[i]?.code, disabled: dis })
                }
            }
            resolve(tree_arr)
        })
        return false
    }
    if (node.data.next_type == 'region') {
        APIgetChinaRegion({ 'p_code': node.data.id }).then(res => {
            let tree_arr = []
            let dis = false
            for (let i in disabled.value) {
                if (disabled.value[i] == node.level) {
                    dis = true
                    break
                }
            }
            for (let i in res) {
                if (res[i].level < 5) {
                    tree_arr.push({ name: res[i].name, type: 'region', next_type: 'region', id: res[i].code, disabled: dis })
                } else {
                    tree_arr.push({ name: res[i].name, type: 'region', next_type: 'zone', id: res[i].code, disabled: dis })
                }
            }
            resolve(tree_arr)
        })
        return false
    }
    if (node.data.next_type == 'zone') {
        APIgetResidentialListHouse({ page: 1, per_page: 500, china_code: node.data.id }).then(res => {
            let tree_arr = []
            let dis = false
            // for (let i in disabled.value) {
            //     if (disabled.value[i] == node.level) {
            //         dis = true
            //         break
            //     }
            // }
<<<<<<< HEAD
            for (let i in res.data) {
                tree_arr.push({ name: res.data?.[i]?.name, type: 'zone', next_type: 'building', id: res.data?.[i]?.id, data: res.data?.[i], disabled: dis  })
=======
            for (let i in res) {
                tree_arr.push({ name: res?.[i]?.name, type: 'zone', next_type: 'building', id: res.items?.[i]?.id, data: res.items?.[i], disabled: dis  })
>>>>>>> admin2
            }
            resolve(tree_arr)
        })
        return false
    }
    if (node.data.next_type == 'building') {
        APIgetBuildListHouse({ page: 1, per_page: 500, zone_id: node.data.id }).then(res => {
            let tree_arr = []
            let dis = false
            // for (let i in disabled.value) {
            //     if (disabled.value[i] == node.level) {
            //         dis = true
            //         break
            //     }
            // }
<<<<<<< HEAD
            for (let i in res.data) {
                tree_arr.push({ name: res.data?.[i]?.name, type: 'building', next_type: 'units', id: res.data?.[i]?.id, data: res.data?.[i], disabled: dis })
=======
            for (let i in res) {
                tree_arr.push({ name: res?.[i]?.name, type: 'building', next_type: 'units', id: res?.[i]?.id, data: res?.[i], disabled: dis })
>>>>>>> admin2
            }
            resolve(tree_arr)
        })
        return false
    }
    if (node.data.next_type == 'units') {
        APIgetUnitsListHouse({ page: 1, per_page: 500, building_id: node.data.id }).then(res => {
            let tree_arr = []
            let dis = false
            // for (let i in disabled.value) {
            //     if (disabled.value[i] == node.level) {
            //         dis = true
            //         break
            //     }
            // }
<<<<<<< HEAD
            for (let i in res.data) {
                tree_arr.push({ name: res.data?.[i]?.name, leaf: true, id: res.data?.[i]?.id, type: 'units', next_type: 'house', data: res.data?.[i], disabled: dis })
=======
            for (let i in res) {
                tree_arr.push({ name: res?.[i]?.name, leaf: true, id: res?.[i]?.id, type: 'units', next_type: 'house', data: res?.[i], disabled: dis })
>>>>>>> admin2
            }
            resolve(tree_arr)
        })
        return false
    }
}
</script>
