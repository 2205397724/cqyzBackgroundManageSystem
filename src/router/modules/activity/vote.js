const Layout = () => import('@/layout/index.vue')

export default {
    path: '/activity_vote',
    component: Layout,
    redirect: '/activity_vote/vote',
    // name: 'activity',
    meta: {
        title: '表决',
        icon: 'el-icon-document',
        auth: ['activity.vote', '*']
    },
    children: [
        {
            path: 'vote',
            component: () => import('@/views/activity/vote.vue'),
            meta: {
                title: '表决',
                // 在侧边导航栏显示
                sidebar: false,
                // 在面包屑展示
                breadcrumb: false,
                activeMenu: '/activity_vote'
            }
        }
    ]
}
