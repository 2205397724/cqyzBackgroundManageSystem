const Layout = () => import('@/layout/index.vue')

export default {
    path: '/setup-system',
    component: Layout,
    redirect: '/setup-system/system',
    name: 'setupSystemBox',
    meta: {
        title: '系统设置',
        icon: 'el-icon-set-up',
        auth: ['setup.system', '*']
    },
    children: [
        {
            path: 'system',
            name: 'setupSystem',
            component: () => import('@/views/setup/system.vue'),
            meta: {
                title: '系统设置',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/setup-system',
                auth: ['setup.system.system', '*']
            }
        }
    ]
}
