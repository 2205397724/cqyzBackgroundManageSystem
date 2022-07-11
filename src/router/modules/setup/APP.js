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
        }
    }]
}