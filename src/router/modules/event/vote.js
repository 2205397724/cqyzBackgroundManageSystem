const Layout = () => import('@/layout/index.vue')

export default {
    path: '/event_vote',
    component: Layout,
    redirect: '/event_vote/vote',
    name: 'eventvoteBox',
    meta: {
        title: '投票设置',
        icon: 'el-icon-document',
        auth: ['event.vote', '*']
    },
    children: [
        {
            path: 'vote',
            name: 'eventvote',
            component: () => import('@/views/event/vote.vue'),
            meta: {
                title: '投票设置',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/event_vote',
                auth: ['event.vote.vote', '*']
            }
        }
    ]
}
