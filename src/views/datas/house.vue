<template>
    <div class="housing-management">
        <House :tree_item="tree_item_1.arr" />
    </div>
</template>
<script setup>
import House from '@/components/House/index.vue'
import {
    reactive,
    ref
} from 'vue'
import {
    APIgetChinaRegion
} from '@/api/custom/custom.js'
const tree_item_1 = reactive({
    arr: []
})
const getChinaRegionunc = () => {
    tree_item_1.arr = []
    let params = {}
    if (localStorage.getItem('utype') == 'pt') {
        params = {
            p_code: localStorage.getItem('china_code')
        }
    } else if (JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_city'))) {
        params = {
            p_code: JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_city')).china_code
        }
    } else {
        params = {}
    }
    APIgetChinaRegion(params).then(res => {
        for (let i in res) {
            if (res[i].level < 5) {
                tree_item_1.arr.push({ name: res[i].name, type: 'region', next_type: 'region', id: res[i].code })
            } else {
                tree_item_1.arr.push({ name: res[i].name, type: 'region', next_type: 'zone', id: res[i].code })
            }
        }
    })
}
getChinaRegionunc()
</script>
<style lang="scss" >
    .housing-management {
        height: calc(100vh - 50px);
    }
</style>
