<template>
    <div class="housing-management">
        <House :tree_item="tree_item" />
    </div>
</template>
<script setup>
import House from '@/components/House/index.vue'
// 如果你想修改这个页面，不，你不想！┗( ▔, ▔ )┛
import {
    reactive,
    ref
} from 'vue'
const tree_item = ref({
    id: '50',
    name: '测试',
    next_type: 'region',
    type: 'region'
})
import {
    APIgetChinaRegion
} from '@/api/custom/custom.js'
APIgetChinaRegion().then(res => {
    console.log(res)
    tree_item.value.id = res.data[0].code
    tree_item.value.name = res.data[0].name
    tree_item.value.next_type = 'region'
    tree_item.value.type = 'region'
})
</script>
<style lang="scss" >
    .housing-management {
        height: calc(100vh - 50px);
    }
</style>
