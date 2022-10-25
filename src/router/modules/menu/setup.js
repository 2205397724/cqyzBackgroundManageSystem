const Layout = () => import('@/layout/index.vue')

export default {
    list:[
        {
            path: '/setup/region',
            component: Layout,
            redirect: '/setup/region/city',
            name: 'regionBox',
            meta: {
                title: '城市配置',
                icon: 'el-icon-guide',
                auth: ['setup', '*']
            },
            children: [
                {
                    path: 'city',
                    name: 'regionCity',
                    component: () => import('@/views/setup/region/city.vue'),
                    meta: {
                        title: '城市配置',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/setup/region',
                        auth: ['setup.region', '*']
                    }
                }
            ]
        },
        {
            path: '/setup/option',
            component: Layout,
            redirect: '/setup/option/option',
            name: 'setupOptionBox',
            meta: {
                title: '选项配置',
                icon: 'el-icon-operation',
                auth: ['setup.option', '*']
            },
            children: [
                {
                    path: 'option',
                    name: 'setupOption',
                    component: () => import('@/views/setup/option.vue'),
                    meta: {
                        title: '选项配置',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/setup/option'
                    }
                }
            ]
        },
        {
            path: '/setup/type',
            component: Layout,
            redirect: '/setup/type/type',
            name: 'setupTypeBox',
            meta: {
                title: '分类管理',
                icon: 'el-icon-folder-opened',
                auth: ['setup.type', '*']
            },
            children: [
                {
                    path: 'type',
                    name: 'setupType',
                    component: () => import('@/views/setup/type.vue'),
                    meta: {
                        title: '分类管理',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/setup/type'
                    }
                }
            ]
        },
        {
            path: '/setup/app',
            component: Layout,
            redirect: '/setup/app/app',
            name: 'setupAppBox',
            meta: {
                title: 'APP管理',
                icon: 'el-icon-Apple',
                auth: ['setup.app', '*']
            },
            children: [{
                path: 'app',
                name: 'setupApp',
                component: () => import ('@/views/setup/app.vue'),
                meta: {
                    title: 'APP管理',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/setup/app'
                },
                children: [{
                    path: 'menu',
                    name: 'setupAppMenu',
                    component: () => import ('@/views/setup/menu.vue'),
                    meta: {
                        title: 'APP菜单管理',
                        sidebar: false,
                        activeMenu: '/setup/app'
                    }
                },
                {
                    path: 'version',
                    name: 'setupAppVersion',
                    component: () => import ('@/views/setup/version.vue'),
                    meta: {
                        title: 'APP版本管理',
                        sidebar: false,
                        activeMenu: '/setup/app'
                    }
                }]
            }]
        },
        {
            path: '/setup/label',
            component: Layout,
            redirect: '/setup/label/label',
            name: 'setupLabelBox',
            meta: {
                title: '标签配置',
                icon: 'el-icon-document',
                auth: ['setup.label', '*']
            },
            children: [
                {
                    path: 'label',
                    name: 'setupLabel',
                    component: () => import('@/views/setup/labels.vue'),
                    meta: {
                        title: '标签配置',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/setup/label'
                    }
                }
            ]
        }
    ]
}
