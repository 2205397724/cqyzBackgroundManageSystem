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
    APIgetChinaRegion
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
        APIgetChinaRegion({ 'p_code': data.code }).then(res => {
            resolve(res.data)
        })
    }
}
</script>
<style lang="scss">
    .quyu-box{
        width: 100%;
        .el-cascader {
            width: 100% !important;
        }
    }
</style>
