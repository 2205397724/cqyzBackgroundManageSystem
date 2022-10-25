<template>
    <teleport to="#app">
        <div id="choosecity" :class="{'searching': isShow}" @click="isShow && $eventBus.emit('global-choose-city')">
            <div class="container">
                <div class="head-box" @click.stop>
                    <div class="title">选择城市</div>
                </div>
                <div ref="search" class="result" :class="{'mobile': settingsStore.mode === 'mobile'}">
                    <div class="citylist">
                        <div v-for="(item,index) in cityList.arr" :key="index" :class="{item:true,seleItem:(choose.city.china_code==item.china_code)}" @click="click_city(item)">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
const reload = inject('reload')
import { APIgetCityNotPm } from '@/api/custom/custom.js'
const { proxy } = getCurrentInstance()
import { useSettingsStore } from '@/store/modules/settings'
import { ElMessage } from 'element-plus'
const settingsStore = useSettingsStore()
const isShow = ref(false)
//已选择
const choose = reactive({
    city : {}
})
//城市列表
const cityList = reactive({
    arr: []
})
watch(() => isShow.value, val => {
    if (val) {
        document.querySelector('body').classList.add('hidden')
        proxy.$refs.search.scrollTop = 0
        getCityList()
    } else {
        document.querySelector('body').classList.remove('hidden')
    }
})
onMounted(() => {
    proxy.$eventBus.on('global-choose-city', () => {
        isShow.value = !isShow.value
    })
})
// 获取城市配置
const getCityList = () => {
    let params = {
        page: 1,
        per_page: 500
    }
    APIgetCityNotPm(params).then(res => {
        let uid = localStorage.getItem('uid')
        choose.city = JSON.parse(localStorage.getItem(uid + '_user_city'))
        cityList.arr = res
    })
}
// 选择 后确认按钮
const click_city = val => {
    if (!val.china_code) {
        ElMessage.error('请选择城市')
        return
    }
    let uid = localStorage.getItem('uid')
    localStorage.setItem(uid + '_user_city', JSON.stringify({ china_code: val.china_code, name: val.name }))
    ElMessage.success('选择成功')
    reload()//重新加载页面
}
</script>

<style lang="scss" scoped>
#choosecity {
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 50%);
    backdrop-filter: blur(10px);
    transition: all 0.2s;
    transform: translateZ(0);
    opacity: 0;
    visibility: hidden;
    &.searching {
        opacity: 1;
        visibility: visible;
        .container {
            transform: initial;
            filter: initial;
        }
    }
    .citylist {
        display: flex;
        flex-direction: row;
        padding: 10px 20px;
        .item {
            padding: 20px;
            border: 2px solid #dedede;
            margin: 10px;
            font-size: 14px;
            cursor: pointer;
        }
        .seleItem {
            border: 2px solid #95cfaf;
            color: #289659;
            background-color: #f3fff4;
        }
    }
    .container {
        display: flex;
        flex-direction: column;
        max-width: 800px;
        height: 100%;
        margin: 0 auto;
        transition: all 0.2s;
        transform: scale(1.1);
        filter: blur(10px);
        .head-box {
            margin: 100px 20px 0;
            .title {
                background-color: #fff;
                padding: 30px 30px 10px;
                border-radius: 5px 5px 0 0;
                color: #999;
                font-size: 14px;
            }
        }
        .result {
            position: relative;
            margin: 0 20px;
            max-height: calc(100% - 250px);
            border-radius: 0 0 5px 5px;
            overflow: auto;
            background-color: #fff;
            &.mobile {
                max-height: calc(100% - 200px);
            }
        }
    }
}
</style>
