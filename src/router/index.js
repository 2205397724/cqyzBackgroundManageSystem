import { createRouter, createWebHashHistory } from 'vue-router'
import { useSettingsOutsideStore } from '@/store/modules/settings'
import { useKeepAliveOutsideStore } from '@/store/modules/keepAlive'
import { useUserOutsideStore } from '@/store/modules/user'
import { useMenuOutsideStore } from '@/store/modules/menu'

import '@/assets/styles/nprogress.scss'
import { useNProgress } from '@vueuse/integrations/useNProgress'
const { isLoading } = useNProgress()

// 固定路由
const constantRoutes = [{
    path: '/login',
    name: 'login',
    component: () =>
        import ('@/views/login.vue'),
    meta: {
        title: '登录'
    }
},
{
    path: '/',
    component: () =>
        import ('@/layout/index.vue'),
    redirect: '/dashboard',
    children: [{
        path: 'dashboard',
        name: 'dashboard',
        component: () =>
            import ('@/views/index.vue'),
        meta: {
            title: () => {
                const settingsOutsideStore = useSettingsOutsideStore()
                return settingsOutsideStore.dashboard.title
            }
        }
    },
    {
        path: 'personal/setting',
        name: 'personalSetting',
        component: () =>
            import ('@/views/personal/setting.vue'),
        meta: {
            title: '个人设置',
            cache: 'personalEditPassword',
            breadcrumbNeste: [
                { title: '个人设置', path: '/personal/setting' }
            ]
        }
    },
    {
        path: 'personal/edit/password',
        name: 'personalEditPassword',
        component: () =>
            import ('@/views/personal/edit.password.vue'),
        meta: {
            title: '修改密码',
            breadcrumbNeste: [
                { title: '修改密码', path: '/personal/edit/password' }
            ]
        }
    },
    {
        path: 'reload',
        name: 'reload',
        component: () =>
            import ('@/views/reload.vue')
    }
    ]
}
]
// 民事
// 活动
import activityJointly from './modules/activity/jointly.js'
import activityEvent from './modules/activity/event.js'
import activitySurvey from './modules/activity/survey.js'
import activityElect from './modules/activity/elect.js'
import activityVote from './modules/activity/vote.js'
// 公示
import announceArchive from './modules/announce/archive.js'
import announceManage from './modules/announce/announceManage.js'
import announceCategory from './modules/announce/announceCategory.js'
import announceAnnounce from './modules/announce/announce.js'
import announceTask from './modules/announce/task.js'
import announcelTasksd from './modules/announce/tasksd.js'
// 管理
import superviseHome from './modules/supervise/home.js'
import activityReview from './modules/supervise/review.js'
import personnelManagement from './modules/supervise/personnels.js'
// // 统计
// import statisticsComplaint from './modules/statistics/complaint.js'
// import statisticsEnterprise from './modules/statistics/enterprise.js'
// import statisticsEquipment from './modules/statistics/equipment.js'
// import statisticsEvent from './modules/statistics/event.js'
// import statisticsHouse from './modules/statistics/house.js'
// import statisticsRepair from './modules/statistics/repair.js'
// 房源
import houseHousingManagement from './modules/house/housing_management.js'
import houseEnterprise from './modules/house/enterprise.js'
import houseEnterpriseApply from './modules/house/enterprise_apply.js'
import houseProperty from './modules/house/property.js'
import houseResidential from './modules/house/residential.js'
import houseBind from './modules/house/house_bind.js'
import eventDevice from './modules/house/device.js'
// 用户
import userRegister from './modules/user/register.js'
import userGroup from './modules/user/group.js'
import userRoles from './modules/user/roles'
import userPerms from './modules/user/perms'
// 事件
import eventComplaint from './modules/event/complaint.js'
import eventIllegal from './modules/event/illegal.js'
import eventRepair from './modules/event/repair.js'
// 资讯
import informationManage from './modules/information/manage.js'
import informationCategory from './modules/information/category.js'
// 设置
import setupRegion from './modules/setup/region.js'
import setupOption from './modules/setup/option.js'
import setupType from './modules/setup/type.js'
import setupAPP from './modules/setup/APP.js'
// 申请
// import joinPlatform from './modules/join/platform.js'
// import joinResidential from './modules/join/residential.js'
// 备案
import recordManage from './modules/record/manange.js'
import recordType from './modules/record/type'
// 动态路由（异步路由、导航栏路由）
const asyncRoutes = [{
    meta: {
        title: '管理',
        icon: 'manage',
        auth: ['supervise', '*']
    },
    children: [
        superviseHome,
        activityReview,
        personnelManagement
    ]
},
// {
//     meta: {
//         title: '统计',
//         icon: 'data',
//         auth: ['statistics', '*']
//     },
//     children: [
//         statisticsHouse,
//         statisticsEvent,
//         statisticsComplaint,
//         statisticsRepair,
//         statisticsEnterprise,
//         statisticsEquipment
//     ]
// },
{
    meta: {
        title: '小区',
        icon: 'house',
        auth: ['house', '*']
    },
    children: [
        houseResidential,
        houseHousingManagement,
        houseBind,
        houseProperty,
        houseEnterprise,
        houseEnterpriseApply,
        eventDevice
    ]
},
{
    meta: {
        title: '公示',
        icon: 'announce',
        auth: ['announce', '*']
    },
    children: [
        announceManage,
        announceArchive,
        announceCategory,
        announceAnnounce,
        announceTask,
        announcelTasksd
    ]
},
{
    meta: {
        title: '议事',
        icon: 'survey',
        auth: ['activity', '*']
    },
    children: [
        activityEvent,
        activitySurvey,
        activityElect,
        activityVote,
        activityJointly
    ]
},
{
    meta: {
        title: '民生',
        icon: 'service',
        auth: ['event', '*']
    },
    children: [
        eventComplaint,
        eventIllegal,
        eventRepair
    ]
},
{
    meta: {
        title: '备案',
        icon: 'filing',
        auth: ['record', '*']
    },
    children: [
        recordManage,
        recordType
    ]
},
{
    meta: {
        title: '资讯',
        icon: 'news',
        auth: [' information', '*']
    },
    children: [
        informationManage,
        informationCategory
    ]
},
{
    meta: {
        title: '用户',
        icon: 'users',
        auth: ['users', '*']
    },
    children: [
        userRegister,
        userGroup,
        userRoles,
        userPerms
    ]
},
// {
//     meta: {
//         title: '申请',
//         icon: 'apply',
//         auth: ['join', '*']
//     },
//     children: [
//         joinPlatform,
//         joinResidential
//     ]
// },
{
    meta: {
        title: '设置',
        icon: 'setting',
        auth: ['setup', '*']
    },
    children: [
        setupRegion,
        setupOption,
        setupType,
        setupAPP
    ]
}
]

const lastRoute = {
    path: '/:pathMatch(.*)*',
    component: () =>
        import ('@/views/404.vue'),
    meta: {
        title: '找不到页面'
    }
}

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})

router.beforeEach(async(to, from, next) => {
    const settingsOutsideStore = useSettingsOutsideStore()
    const userOutsideStore = useUserOutsideStore()
    const menuOutsideStore = useMenuOutsideStore()
    settingsOutsideStore.app.enableProgress && (isLoading.value = true)
    // 是否已登录
    if (userOutsideStore.isLogin) {
        // 是否已根据权限动态生成并挂载路由
        if (menuOutsideStore.isGenerate) {
            // 导航栏如果不是 single 模式，则需要根据 path 定位主导航的选中状态
            settingsOutsideStore.menu.menuMode !== 'single' && menuOutsideStore.setHeaderActived(to.path)
            if (to.name) {
                if (to.matched.length !== 0) {
                    // 如果已登录状态下，进入登录页会强制跳转到控制台页面
                    if (to.name == 'login') {
                        next({
                            name: 'dashboard',
                            replace: true
                        })
                    } else if (!settingsOutsideStore.dashboard.enable && to.name == 'dashboard') {
                        // 如果未开启控制台页面，则默认进入侧边栏导航第一个模块
                        if (menuOutsideStore.sidebarRoutes.length > 0) {
                            next({
                                path: menuOutsideStore.sidebarRoutesFirstDeepestPath,
                                replace: true
                            })
                        } else {
                            next()
                        }
                    } else {
                        next()
                    }
                } else {
                    // 如果是通过 name 跳转，并且 name 对应的路由没有权限时，需要做这步处理，手动指向到 404 页面
                    next({
                        path: '/404'
                    })
                }
            } else {
                next()
            }
        } else {
            let accessRoutes = []
            if (!settingsOutsideStore.app.enableBackendReturnRoute) {
                accessRoutes = await menuOutsideStore.generateRoutesAtFront(asyncRoutes)
            } else {
                accessRoutes = await menuOutsideStore.generateRoutesAtBack()
            }
            accessRoutes.push(lastRoute)
            let removeRoutes = []
            accessRoutes.forEach(route => {
                if (!/^(https?:|mailto:|tel:)/.test(route.path)) {
                    removeRoutes.push(router.addRoute(route))
                }
            })
            // 记录的 accessRoutes 路由数据，在登出时会使用到，不使用 router.removeRoute 是考虑配置的路由可能不一定有设置 name ，则通过调用 router.addRoute() 返回的回调进行删除
            menuOutsideStore.setCurrentRemoveRoutes(removeRoutes)
            next({ ...to, replace: true })
        }
    } else {
        if (to.name != 'login') {
            next({
                name: 'login',
                query: {
                    redirect: to.fullPath
                }
            })
        } else {
            next()
        }
    }
})

router.afterEach((to, from) => {
    const settingsOutsideStore = useSettingsOutsideStore()
    const keepAliveOutsideStore = useKeepAliveOutsideStore()
    settingsOutsideStore.app.enableProgress && (isLoading.value = false)
    // 设置页面 title
    to.meta.title && settingsOutsideStore.setTitle(typeof to.meta.title === 'function' ? to.meta.title() : to.meta.title)
    // 判断当前页面是否开启缓存，如果开启，则将当前页面的 name 信息存入 keep-alive 全局状态
    if (to.meta.cache) {
        let componentName = to.matched[to.matched.length - 1].components.default.name
        if (componentName) {
            keepAliveOutsideStore.add(componentName)
        } else {
            console.warn('该页面组件未设置组件名，会导致缓存失效，请检查')
        }
    }
    // 判断离开页面是否开启缓存，如果开启，则根据缓存规则判断是否需要清空 keep-alive 全局状态里离开页面的 name 信息
    if (from.meta.cache) {
        let componentName = from.matched[from.matched.length - 1].components.default.name
        // 通过 meta.cache 判断针对哪些页面进行缓存
        switch (typeof from.meta.cache) {
            case 'string':
                if (from.meta.cache != to.name) {
                    keepAliveOutsideStore.remove(componentName)
                }
                break
            case 'object':
                if (!from.meta.cache.includes(to.name)) {
                    keepAliveOutsideStore.remove(componentName)
                }
                break
        }
        // 如果进入的是 reload 页面，则也将离开页面的缓存清空
        if (to.name == 'reload') {
            keepAliveOutsideStore.remove(componentName)
        }
    }
})

export default router
