const Layout = () => import('@/layout/index.vue')

export default {
    path: '/activity_elect',
    component: Layout,
    redirect: '/activity_elect/elect',
    // name: 'activity',
    meta: {
        title: '选举',
        icon: 'el-icon-document',
        auth: ['event.events', '*']
    },
    children: [
        {
            path: 'elect',
            component: () => import('@/views/activity/survey.vue'),
            meta: {
                title: '选举管理',
                // 在侧边导航栏显示
                sidebar: false,
                // 在面包屑展示
                breadcrumb: false,
                activeMenu: '/activity_elect',
            }
        },
    ]
}