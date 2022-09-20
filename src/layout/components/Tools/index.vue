<template>
    <div class="tools">
        <div class="buttons">
            <!-- <span v-if="settingsStore.mode == 'pc'" class="item item-pro" @click="pro">
                <svg-icon name="pro" />
                <span class="title">智慧物业</span>
            </span> -->
            <span class="item" @click="switchCity">
                <el-icon><Switch /></el-icon>
                <!-- <svg-icon name="switch" /> -->
            </span>
            <span v-if="settingsStore.topbar.enableNavSearch" class="item" @click="$eventBus.emit('global-search-toggle')">
                <svg-icon name="search" />
            </span>
            <span v-if="settingsStore.mode === 'pc' && settingsStore.topbar.enableFullscreen" class="item" @click="toggle">
                <svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
            </span>
            <span v-if="settingsStore.topbar.enablePageReload" class="item" @click="reload()">
                <svg-icon name="toolbar-reload" />
            </span>
            <span v-if="settingsStore.topbar.enableAppSetting" class="item" @click="$eventBus.emit('global-theme-toggle')">
                <svg-icon name="toolbar-theme" />
            </span>
        </div>
        <el-dropdown class="user-container" size="default" @command="userCommand">
            <div class="user-wrapper">
                <el-avatar size="small">
                    <el-icon><el-icon-user-filled /></el-icon>
                </el-avatar>
                {{ userStore.account }}
                <el-icon><el-icon-caret-bottom /></el-icon>
            </div>
            <template #dropdown>
                <el-dropdown-menu class="user-dropdown">
                    <el-dropdown-item v-if="settingsStore.dashboard.enable" command="dashboard">控制台</el-dropdown-item>
                    <el-dropdown-item command="setting">个人设置</el-dropdown-item>
                    <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!-- <page-main> -->
        <el-dialog
            v-model="switch_choose_city" title="请选择地区"
            width="40%" :close-on-click-modal="false" :show-close="false"
        >
            <div class="cityBox">
                <div v-for="item in city_list.arr" :key="item.ip" class="city" @click="choose_city_end(item)">{{ item.name }}</div>
            </div>
        </el-dialog>
        <!-- </page-main> -->
    </div>
</template>

<script setup>
const reload = inject('reload')
const router = useRouter()
import { Switch } from '@element-plus/icons-vue'
import { useSettingsStore } from '@/store/modules/settings'
const settingsStore = useSettingsStore()
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()

import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()

function userCommand(command) {
    switch (command) {
        case 'dashboard':
            router.push({
                name: 'dashboard'
            })
            break
        case 'setting':
            router.push({
                name: 'personalSetting'
            })
            break
        case 'logout':
            userStore.logout().then(() => {
                router.push({
                    name: 'login'
                })
            })
            break
    }
}
function pro() {
    window.open('https://app.cqyezhuapp.com/edatachart/', 'top')
}
const switch_choose_city = ref(false)
const switchCity = () => {
    getCityList()
    switch_choose_city.value = true
}
import {
    APIgetCityNotPm
} from '@/api/custom/custom.js'
import { ElMessage } from 'element-plus'
const city_list = reactive({
    arr: []
})
const page = ref(1)
const per_page = ref(15)
// 获取城市配置
const getCityList = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    APIgetCityNotPm(params).then(res => {
        city_list.arr = res.data
        console.log(res)
    })
}
// 选择 后确认按钮
const choose_city_end = val => {
    if (!val.china_code) {
        ElMessage.error('请选择城市')
        return
    }
    console.log(val.china_code)
    userStore.china_code  = val.china_code
    localStorage.setItem('china_code', val.china_code)
    ElMessage.success('选择成功')
    switch_choose_city.value = false
    sessionStorage.setItem('isChooseCity', true)
    console.log(sessionStorage.getItem('isChooseCity'))
}
</script>

<style lang="scss" scoped>
.tools {
    display: flex;
    align-items: center;
    padding: 0 20px;
    white-space: nowrap;
    .buttons {
        margin-right: 20px;
        .item {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 24px;
            width: 34px;
            cursor: pointer;
            vertical-align: middle;
            transition: all 0.3s;
        }
        .item-pro {
            display: inline-block;
            width: auto;
            padding: 0 10px;
            transform-origin: right center;
            animation: pro-text 3s ease-out infinite;
            @keyframes pro-text {
                0%,
                20% {
                    transform: scale(1);
                }
                50%,
                70% {
                    transform: scale(1.2);
                }
                100% {
                    transform: scale(1);
                }
            }
            .title {
                padding-left: 5px;
                font-weight: bold;
                font-size: 14px;
                background-image: linear-gradient(to right, #ffa237, #fc455d);
                /* stylelint-disable-next-line property-no-vendor-prefix */
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }
    }
}
:deep(.user-container) {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    cursor: pointer;
    .user-wrapper {
        .el-avatar {
            vertical-align: middle;
            margin-top: -2px;
            margin-right: 4px;
        }
    }
}
</style>
