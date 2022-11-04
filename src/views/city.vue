<template>
    <div>
        <page-main>
            <div class="title">选择城市</div>
            <div class="citylist">
            <div v-for="(item,index) in cityList.arr" :key="index" :class="{item:true,seleItem:(choose.city.china_code==item.china_code)}" @click="click_city(item)">
                {{ item.name }}
            </div>
        </div>
        </page-main>
    </div>
</template>
<script setup>
import { APIgetCityNotPm } from '@/api/custom/custom.js'
import { useSettingsStore } from '@/store/modules/settings'
import { ElMessage } from 'element-plus'
import { onUnmounted } from 'vue'
import { useUserStore } from '@/store/modules/user'
const router = useRouter()
const { proxy } = getCurrentInstance()
const userStore = useUserStore()
//已选择
const choose = reactive({
    city : {}
})
//城市列表
const cityList = reactive({
    arr: []
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
        // res.forEach((item, index) => {
        //     if (item.china_code == city.china_code) {
        //         item.flag = true
        //     } else {
        //         item.flag = false
        //     }
        // })
        cityList.arr = res
    })
}
// 选择 后确认按钮
const click_city = val => {
    if (!val.china_code) {
        ElMessage.error('请选择城市')
        return
    }
    choose.city = val
    let uid = localStorage.getItem('uid')
    localStorage.setItem(uid + '_user_city', JSON.stringify({ china_code: val.china_code, name: val.name }))
    router.push('/')
    ElMessage.success('选择成功')
}
onMounted(() => {
    getCityList()
})
onUnmounted(() => {
    userStore.getGroups()//拉取用户默认用户组
})
</script>

<style lang="scss" scoped>
    .title {
        color: #999;
        padding: 20px 10px;
    }
    .citylist {
        display: flex;
        flex-direction: row;
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
</style>
