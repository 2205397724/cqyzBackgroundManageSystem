<template>
    <div class="quyu-box">
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
const props = defineProps({ modelValue: { type: [String, Array], default: '' }, checkbox: { type: Boolean, default: false } })
const emits = defineEmits(['update:modelValue'])
const code = ref('')
watch(props, new_val => {
    code.value = new_val.modelValue
}, { immediate: true, deep: true })
watch(code, new_val => {
    console.log(new_val)
    emits('update:modelValue', new_val)
})
import {
    APIgetChinaRegion,
    APIgetResidentialListHouse
} from '@/api/custom/custom.js'
const cascader_props = {
    multiple: props.checkbox,
    emitPath: false,
    lazy: true,
    value: 'code',
    label: 'name',
    checkStrictly: true,
    lazyLoad(node, resolve) {
        const {
            data
        } = node
        // console.log(node)
        if (data.level == 5) {
            APIgetResidentialListHouse({ 'china_code': data.code }).then(res => {
                res.forEech(item => {
                    item['code'] = item.china_code
                })
                console.log(res)
                resolve(res)
                return
            })
        }
        APIgetChinaRegion({ 'p_code': data.code }).then(res => {
            console.log(res)

            resolve(res)
        })

    }
}
</script>
<style lang="scss">
    .quyu-box {
        width: 100%;
        display: inline-block;
        .el-cascader {
            width: 100% !important;
        }
    }
</style>
