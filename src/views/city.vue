<template>
    <div>
        <page-main>
            选择城市
            <div class="citylist">
                <div v-for="(item,index) in cityList.arr" :key="index" :class="{item:true,select:(choose.city.china_code==item.china_code)}" @click="click_city(item)">
                   {{ item.name }}
                </div>
            </div>
        </page-main>
    </div>
</template>
<script setup name="city">
import { APIgetCityNotPm } from '@/api/custom/custom.js'
const { proxy } = getCurrentInstance()
import { useSettingsStore } from '@/store/modules/settings'
import { ElMessage } from 'element-plus'
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
    let uid = localStorage.getItem('uid')
    localStorage.setItem(uid + '_user_city', JSON.stringify({ china_code: val.china_code, name: val.name }))
    ElMessage.success('选择成功')
}
onMounted(() => {
    getCityList()
})
</script>
<style lang="scss" scoped>

</style>
