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
const props = defineProps({
    modelValue: { type: [String, Array], default: '' },
    checkbox: { type: Boolean, default: false },
    showall: {type: Boolean, default: false},//控制是否从顶层“重庆”开始拉取数据
})
const emits = defineEmits(['update:modelValue'])
const code = ref('')
watch(props, new_val => {
    code.value = new_val.modelValue
}, { immediate: true, deep: true })
watch(code, new_val => {
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
        if (data.level == 5) {
            resolve()
            return
            // APIgetResidentialListHouse({ 'china_code': data.code }).then(res => {
            //     resolve(res)
            // })
        }
        if(!data.code && props.showall) {
            data.code = 50
        }else if(!data.code) {
            // 没数据时，获取用户选中的城市的代码开始拉取
            data.code = JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_city')).china_code
        }
        let params = {
            p_code:data.code,
        }
        if(Object.keys(data).length === 1) {
            params.w = 3
        }
        APIgetChinaRegion(params).then(res => {
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
