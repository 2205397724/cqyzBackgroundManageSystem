const Layout = () => import('@/layout/index.vue')

export default {
    path: '/join_platform',
    component: Layout,
    redirect: '/join_platform/platform',
    name: 'joinPlatformBox',
    meta: {
        title: '入驻平台',
        icon: 'el-icon-grid',
        auth: ['join.platform', '*']
    },
    children: [
        {
            path: 'platform',
            name: 'joinPlatform',
            component: () => import('@/views/join/platform.vue'),
            meta: {
                title: '入驻平台',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/join_platform',
                auth: ['join.platform.platform', '*']
            }
        }
    ]
}
