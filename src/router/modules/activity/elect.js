const Layout = () => import('@/layout/index.vue')

export default {
    path: '/activity_elect',
    component: Layout,
    redirect: '/activity_elect/elect',
    // name: 'activity',
    meta: {
        title: '选举',
        icon: 'el-icon-document',
        auth: ['activity.elect', '*']
    },
    children: [
        {
            path: 'elect',
            component: () => import('@/views/activity/elect.vue'),
            meta: {
                title: '选举',
                // 在侧边导航栏显示
                sidebar: false,
                // 在面包屑展示
                breadcrumb: false,
                activeMenu: '/activity_elect'
            },
            children: [{
                path: 'details',
                name: 'electDetails',
                sidebar: false,
                breadcrumb: false,
                component: () =>
                    import ('@/views/activity/activityDetails.vue'),
                meta: {
                    title: '详情',
                    sidebar: false,
                    activeMenu: '/activity_elect'
                }
            }]
        }
    ]
}
