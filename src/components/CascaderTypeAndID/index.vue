<template>
    <div class="totype-toval">
        <el-cascader
            v-model="code"
            placeholder="区域"
            :props="cascader_props"
            collapse-tags
            collapse-tags-tooltip
            :show-all-levels="false"
            clearable
        />
    </div>
</template>

<script setup>
import {
    defineProps,
    defineEmits,
    watch,
    ref
} from 'vue'
const props = defineProps(['totype', 'toval'])
const emits = defineEmits(['update:totype', 'update:toval'])
const code = ref('')
watch(() => props.toval, new_val => {
    code.value = new_val
}, { immediate: true, deep: true })
watch(code, new_val => {
    if (new_val) {
        let totype = '6'
        // 4：街道、5：社区, 6：小区
        if (new_val.length == 9) {
            totype = '4'
        } else if (new_val.length == 12) {
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
                if (level <= 2) {
                    for (let i in res.data) {
                        res.data[i].disabled = true
                    }
                }
                resolve(res.data)
            })
        } else {
            APIgetResidentialListHouse({ page: 1, per_page: 500, china_code: data.code }).then(res => {
                let arr = []
                for (let i in res.data.items) {
                    arr.push({ code: res.data.items[i].id, name: res.data.items[i].name, leaf: true })
                }
                resolve(arr)
            })
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
