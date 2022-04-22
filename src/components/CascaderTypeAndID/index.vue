<template>
    <div class="totype-toval">
        <el-cascader
            v-model="code"
            :placeholder="props.tips"
            :props="cascader_props"
            collapse-tags
            collapse-tags-tooltip
            :show-all-levels="false"
            clearable
        />
    </div>
</template>

<script setup>
// <CascaderTypeAndID v-model:totype="类型值" v-model:toval="id值" :disableds="[禁止选择值]" :zone="true是否加载小区" :tips="'placeholder值'"/>
import {
    defineProps,
    defineEmits,
    watch,
    ref
} from 'vue'
const props = defineProps(['totype', 'toval', 'disableds', 'zone', 'tips'])
const emits = defineEmits(['update:totype', 'update:toval'])
const code = ref('')
watch(() => props.toval, new_val => {
    code.value = new_val
}, { immediate: true, deep: true })
watch(code, new_val => {
    if (new_val) {
        let totype = '6'
        // 3，区域 4：街道、5：社区, 6：小区
        if (new_val.length <= 6) {
            totype = '3'
        } else if (new_val.length <= 9) {
            totype = '4'
        } else if (new_val.length <= 12) {
            totype = '5'
        }
        emits('update:totype', totype)
        emits('update:toval', new_val)
    }
})
import {
    APIgetChinaRegion,
    APIgetResidentialListHouse
} from '@/api/custom/custom.js'
const cascader_props = {
    multiple: false,
    emitPath: false,
    lazy: true,
    value: 'code',
    label: 'name',
    checkStrictly: true,
    lazyLoad(node, resolve) {
        const {
            data,
            level
        } = node

        if (level <= 4) {
            APIgetChinaRegion({ 'p_code': data.code }).then(res => {
                if (props.disableds.indexOf(level) >= 0) {
                    for (let i in res.data) {
                        res.data[i].disabled = true
                    }
                }
                resolve(res.data)
            })
        } else {
            if (props.zone) {
                APIgetResidentialListHouse({ page: 1, per_page: 500, china_code: data.code }).then(res => {
                    let arr = []
                    for (let i in res.data.items) {
                        arr.push({ code: res.data.items[i].id, name: res.data.items[i].name, leaf: true })
                    }
                    if (props.disableds.indexOf(level) >= 0) {
                        for (let i in arr) {
                            arr[i].disabled = true
                        }
                    }
                    resolve(arr)
                })
            } else {
                resolve()
            }
        }
    }
}
</script>
<style lang="scss">
    .totype-toval{
        width: 100%;
        display: inline-block;
        .el-cascader {
            width: 100% !important;
        }
    }
</style>
