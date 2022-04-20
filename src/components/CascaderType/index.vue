<template>
    <div class="quyu-box">
        <el-cascader
            v-model="code"
            placeholder="分类"
            :props="cascader_props"
            collapse-tags
            collapse-tags-tooltip
            :show-all-levels="false"
            clearable
        />
    </div>
</template>

<script setup>
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
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
    APIgetTypeList
} from '@/api/custom/custom.js'
const cascader_props = {
    multiple: props.checkbox,
    emitPath: false,
    lazy: true,
    value: 'id',
    label: 'name',
    children: 'children',
    checkStrictly: true,
    lazyLoad(node, resolve) {
        const {
            data,
            level
        } = node
        if (level == 0) {
            getOpts(['type_type']).then(res => {
                let child = []
                for (let i in res.type_type) {
                    child.push({
                        id: res.type_type[i].key,
                        name: res.type_type[i].val
                    })
                }
                resolve(child)
            })
        } else if (level == 1) {
            APIgetTypeList(data.id).then(res => {
                resolve(res.data)
            })
        } else {
            resolve()
        }
    }
}

</script>
<style lang="scss">
    .quyu-box{
        width: 100%;
        display: inline-block;
        .el-cascader {
            width: 100% !important;
        }
    }
</style>
