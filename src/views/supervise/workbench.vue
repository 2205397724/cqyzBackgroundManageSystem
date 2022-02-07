<template>
    <div class="bmap-page-container">
        <el-bmap
            :min-zoom="data.min_zoom"
            :max-zoom="data.max_zoom"
            :zoom="data. zoom"
            :center="data.center"
            :enable-double-click-zoom="data.dblclick"
            @init="initFunc"
        />
    </div>
</template>

<script setup >
import {
    reactive
} from 'vue'

const data = reactive({
    map_init: null,
    min_zoom: 5,
    max_zoom: 25,
    zoom: 16,
    center: [121.5273285, 31.21515044],
    dblclick: false
})

const initFunc = res => {
    data.map_init = res
}
</script>

<style lang="scss" scoped>
    .bmap-page-container {
        height: calc(100vh - 50px);
    }
</style>