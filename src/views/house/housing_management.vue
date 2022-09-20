<template>
    <div class="housing-management">
        <House :tree_item="tree_item_1.arr" />
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
const tree_item_1 = reactive({
    arr: []
})

import md5 from 'md5'
const getChinaRegionunc = () => {
    let params = {}
    if (localStorage.getItem('utype') == md5('pt')) {
        params = {
            p_code: localStorage.getItem('china_code')
        }
    } else if (sessionStorage.getItem('groupChinaCode')) {
        params = {
            p_code: sessionStorage.getItem('groupChinaCode')
        }
    } else {
        params = {}
    }
    APIgetChinaRegion(params).then(res => {
        console.log(res)
        for (let i in res.data) {
            if (res.data[i].level < 5) {
                tree_item_1.arr.push({ name: res.data[i].name, type: 'region', next_type: 'region', id: res.data[i].code })
            } else {
                tree_item_1.arr.push({ name: res.data[i].name, type: 'region', next_type: 'zone', id: res.data[i].code })
            }
        }
        console.log(tree_item_1.arr)
    })
}
getChinaRegionunc()
</script>
<style lang="scss" >
    .housing-management {
        height: calc(100vh - 50px);
    }
</style>
