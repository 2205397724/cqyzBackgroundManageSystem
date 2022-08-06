<template>
    <el-cascader
        v-model="code" :options="data_1.arr" collapse-tags
        placeholder="公示分类"
        :show-all-levels="false"
        :props="cascader_props"
        clearable
    >
        <template #default="{ node, data }">
            <span>{{ data.name }}</span>
        </template>
    </el-cascader>
</template>
<script setup>
import {
    defineProps,
    defineEmits,
    watch,
    ref
} from 'vue'
const props = defineProps({
    modelValue: {
        type: [String, Array],
        default: ''
    }
})
const emits = defineEmits(['update:modelValue'])
const code = ref('')
const options = reactive({
    arr: []
})
watch(props, new_val => {
    code.value = new_val.modelValue
}, {
    immediate: true,
    deep: true
})
watch(code, new_val => {
    console.log(new_val)
    emits('update:modelValue', new_val)
})
let data_1 = reactive({
    arr: []
})
const main_type = ref('announce')
import {
    APIgetTypeList
} from '@/api/custom/custom.js'
// 获取公式列表api请求
APIgetTypeList(main_type.value).then(res => {
    console.log(res)
    data_1.arr = res
})
const cascader_props = { multiple: false, emitPath: false, checkStrictly: true, value: 'id', label: 'name' }
</script>
