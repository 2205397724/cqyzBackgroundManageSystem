import { createRouter, createWebHashHistory } from 'vue-router'
import { useSettingsOutsideStore } from '@/store/modules/settings'
import { useKeepAliveOutsideStore } from '@/store/modules/keepAlive'
import { useUserOutsideStore } from '@/store/modules/user'
import { useMenuOutsideStore } from '@/store/modules/menu'

import '@/assets/styles/nprogress.scss'
import { useNProgress } from '@vueuse/integrations/useNProgress'
const { isLoading } = useNProgress()

// 引入菜单配置
import manageMenu from './modules/manage.js'
import datasMenu from './modules/datas.js'
import setupMenu from './modules/setup.js'
import userMenu from './modules/user.js'
import shareMenu from './modules/share.js'
import newsMenu from './modules/news.js'
import filingMenu from './modules/filing.js'
import complaintMenu from './modules/complaint.js'
import announceMenu from './modules/announce.js'
import activityMenu from './modules/activity.js'
// 固定路由
const constantRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import ('@/views/login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/city',
        name: 'city',
        component: () => import ('@/views/city.vue'),
        meta: {
            title: '选择城市'
        }
    },
    {
        path: '/',
        component: () => import ('@/layout/index.vue'),
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'dashboard',
            component: () => import ('@/views/index.vue'),
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
            component: () => import ('@/views/personal/setting.vue'),
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
            component: () => import ('@/views/personal/edit.password.vue'),
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
        }]
    }
]

// 动态路由（异步路由、导航栏路由）
const asyncRoutes = [
    {
        meta: {
            title: '管理',
            icon: 'manage',
        },
        children:manageMenu.list
    },
    {
        meta: {
            title: '数据',
            icon: 'house',
        },
        children: datasMenu.list
    },
    {
        meta: {
            title: '公示',
            icon: 'announce',
        },
        children: announceMenu.list
    },
    {
        meta: {
            title: '议事',
            icon: 'survey',
        },
        children: activityMenu.list
    },
    {
        meta: {
            title: '民生',
            icon: 'service',
        },
        children: complaintMenu.list
    },
    {
        meta: {
            title: '备案',
            icon: 'filing',
        },
        children: filingMenu.list
    },
    {
        meta: {
            title: '资讯',
            icon: 'news',
        },
        children:newsMenu.list
    },
    {
        meta: {
            title: '共享',
            icon: 'news',
        },
        children: shareMenu.list
    },
    {
        meta: {
            title: '用户',
            icon: 'users',
        },
        children: userMenu.list
    },
    {
        meta: {
            title: '设置',
            icon: 'setting',
        },
        children:setupMenu.list
    }
]

const lastRoute = {
    path: '/:pathMatch(.*)*',
    component: () => import ('@/views/404.vue'),
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
        let uid = localStorage.getItem('uid')
        let city = JSON.parse(localStorage.getItem(uid+'_user_city'))
        //判断是否选择了区域。
        if(city != null && Object.keys(city).length>0){
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
        }else{
            if(to.path =='/city'){
                next()
            }else{
                next({
                    name: 'city',
                    replace: true
                })
            }
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
