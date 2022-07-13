const Layout = () =>
    import ('@/layout/index.vue')

export default {
    path: '/setup_APP',
    component: Layout,
    redirect: '/setup_APP/APP',
    name: 'setupAPPBox',
    meta: {
        title: 'APP管理',
        icon: 'el-icon-Apple',
        auth: ['setup.APP', '*']
    },
    children: [{
            path: 'APP',
            name: 'setupApp',
            component: () =>
                import ('@/views/setup/APP.vue'),
            meta: {
                title: '分类管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/setup_APP',
                auth: ['setup.APP.APP', '*']
            },
            children: [{
                    path: 'menu',
                    name: 'SetupAppMenu',
                    component: () =>
                        import ('@/views/setup/menu.vue'),
                    meta: {
                        title: 'APP菜单管理',
                        sidebar: false,
                        activeMenu: '/setup_APP'
                    }
                },
                {
                    path: 'version',
                    name: 'SetupAppVersion',
                    component: () =>
                        import ('@/views/setup/version.vue'),
                    meta: {
                        title: 'APP版本管理',
                        sidebar: false,
                        activeMenu: '/setup_APP'
                    }
                }
            ]
        },
        {
            path: 'house',
            name: 'houseResidentialHouse',
            component: () =>
                import ('@/views/house/house.vue'),
            meta: {
                title: '房屋',
                sidebar: false,
                activeMenu: '/house_residential'
            }
        }
    ]
}