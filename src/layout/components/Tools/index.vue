<template>
    <div class="tools">
        <div class="buttons">
            <!-- <span v-if="settingsStore.mode == 'pc'" class="item item-pro" @click="pro">
                <svg-icon name="pro" />
                <span class="title">智慧物业</span>
            </span> -->
            <span class="item cityitem" @click="$eventBus.emit('global-choose-city')">
                <el-icon><Switch /></el-icon>{{city.name}}
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
                {{ user_info.name || user_info.nickname }}
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
    </div>
</template>

<script setup>
const reload = inject('reload')
const router = useRouter()
import { Switch } from '@element-plus/icons-vue'
import { useSettingsStore } from '@/store/modules/settings'
const settingsStore = useSettingsStore()
const { proxy } = getCurrentInstance()
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()

import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()
const abc = ref(window.screen.height + 'px')
const uid = localStorage.getItem('uid')
const city = reactive(JSON.parse(localStorage.getItem(uid + '_user_city')))
const user_info = reactive(JSON.parse(localStorage.getItem(uid + '_user_info')))

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
    window.open('', 'top')
}
onMounted(() => {
    proxy.$eventBus.on('choose-city', () => {
        let store_city = JSON.parse(localStorage.getItem(uid + '_user_city'))
        city.name = store_city.name
    })
})
</script>

<style lang="scss" scoped>
.tools {
    display: flex;
    align-items: center;
    padding: 0 20px;
    white-space: nowrap;
    .buttons {
        margin-right: 20px;
        .cityitem {
            color: #409eff;
            font-size: 14px;
        }
        .item {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            vertical-align: middle;
            transition: all 0.3s;
            padding: 0 8px;
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
.chooseCityBox {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: v-bind(abc);
    background-color: rgb(0 0 0 / 50%);
    overflow: auto;
    z-index: 2022;
    .chooseCity {
        border: 1px solid #ccc;
        background-color: #fff;
        width: 30%;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: 230px;
        border-radius: 4px;
        transform: translate(-50%, -50%);
    }
    .cityBox {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        padding: 30px 0 20px 15px;
        .city {
            text-align: center;
            margin-right: 20px;
            height: 50px;
            padding: 15px;
            cursor: pointer;
            border: 1px solid #ccc;
            font-size: 14px;
        }
        .city_1 {
            text-align: center;
            margin-right: 20px;
            height: 50px;
            padding: 15px;
            cursor: pointer;
            font-size: 14px;
            border: none;
            color: #67c23a;
            background-color: #f0f9eb;
        }
        .city:hover {
            border: none;
            color: #67c23a;
            background-color: #f0f9eb;
        }
        .city:visited {
            border: none;
            color: #67c23a;
            background-color: #f0f9eb;
        }
    }
}
</style>
