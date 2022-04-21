<template>
    <div class="fenlei-box">
        <el-cascader
            v-model="code"
            placeholder="分类"
            :options="options.arr"
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
import {
    getOpts,
    getOptVal
} from '@/util/opts.js'
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
    },
    checkbox: {
        type: Boolean,
        default: false
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
import {
    APIgetTypeList
} from '@/api/custom/custom.js'
const atemp = []
getOpts(['type_type']).then(res => {
    for (let i in res.type_type) {
        let opt = {
            id: res.type_type[i].key,
            name: res.type_type[i].val,
            disabled: true
        }
        atemp.push(
            new Promise((resolve, reject) => {
                APIgetTypeList(opt.id).then(res => {
                    opt.children = res.data
                    return resolve(opt)
                }).catch(err => {
                    resolve(opt)
                })
            })
        )
    }
    Promise.all(atemp).then(res => {
        options.arr = res
    })
})

const cascader_props = {
    multiple: props.checkbox,
    emitPath: false,
    lazy: false,
    value: 'id',
    label: 'name',
    checkStrictly: true
}
</script>
<style lang="scss">
    .fenlei-box {
        width: 100%;
        display: inline-block;

        .el-cascader {
            width: 100% !important;
        }
    }
</style>
