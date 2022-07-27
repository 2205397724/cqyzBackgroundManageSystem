<template>
    <div class="m-b-10">
        <span class="m-l-30 m-r-20">评论</span>
        <el-switch
            v-model="data_list"
            class="mb-2"

            inline-prompt
            style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
            active-text="开启"
            inactive-text="关闭"
            :active-value="1"
            :inactive-value="0"
            @change="switchFunk"
        />
    </div>
</template>
<script setup>
import {
    APIpostCommentconfig,
    APIdeleteCommentconfig
} from '@/api/custom/custom.js'
import {
    ref,
    defineProps
} from 'vue'
const props = defineProps(['id'])
const id = ref(props.id)
const data_list = ref(0)
// const data_list = ref(props.data_list)
const switchFunk = () => {
    console.log(id)
    // row.comment == 1
    console.log(data_list)
    if (data_list.value == 1) {
        APIpostCommentconfig(id.value, { scoreper: 10 }).then(res => {
            console.log(res)
        })
    } else {
        APIdeleteCommentconfig(id.value).then(res => {
            console.log(res)
        })
    }
}
</script>
