<template>
    <div class="my-echarts">
        <div class="pic-item">
            <div class="pictit">{{ props.data.tit }}</div>
            <div :id="props.data.dom_id" class="pic" :style="{height:props.data.height}" />
        </div>
    </div>
</template>

<script setup>
import {
    defineProps,
    onMounted
} from 'vue'
const props = defineProps(['data'])
const echarts = inject('ec')
onMounted(() => {
    nextTick(() => {
        let item = props.data
        let myChart = echarts.init(document.getElementById(item.dom_id))
        myChart.setOption(item.options)
    })
})
</script>
<style lang="scss" scoped>
    .my-echarts {
        .pic-item {
            margin-bottom: 20px;

            .pictit {
                font-size: 14px;
                color: #666666;
            }

            .pic {
                height: 300px;
                // background-color: #F2F2F2;
            }
        }
    }
</style>
