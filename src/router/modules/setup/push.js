const Layout = () => import('@/layout/index.vue')

export default {
    path: '/setup_push',
    component: Layout,
    redirect: '/setup_push/push',
    name: 'setupPushBox',
    meta: {
        title: '推送设置',
        icon: 'el-icon-position',
        auth: ['setup.push', '*']
    },
    children: [
        {
            path: 'push',
            name: 'setupPush',
            component: () => import('@/views/setup/push.vue'),
            meta: {
                title: '推送设置',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/setup_push',
                auth: ['setup.push.push', '*']
            }
        }
    ]
}
