<template>
    <el-dialog
        v-model="opt_switch"
        title="投票选项"
        width="70%"
    >
        12312321
    </el-dialog>
</template>

<script setup>
import {
    reactive,
    ref,
    toRefs
} from 'vue'
import {
    APIgetResidentialListHouse
} from '@/api/custom/custom.js'

const props = defineProps(['opt_switch', 'opt_voteid'])
const {
    opt_switch,
    opt_voteid
} = toRefs(props)
// const emit = defineEmits(['update:str'])
// emit('update:str', '')
</script>
<style lang="scss" scoped>

</style>
