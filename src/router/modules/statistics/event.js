const Layout = () => import('@/layout/index.vue')

export default {
    path: '/statistics_event',
    component: Layout,
    redirect: '/statistics_event/event',
    name: 'statisticsEventBox',
    meta: {
        title: '*事件统计',
        icon: 'el-icon-calendar',
        auth: ['statistics.event', '*']
    },
    children: [
        {
            path: 'event',
            name: 'statisticsEvent',
            component: () => import('@/views/statistics/event.vue'),
            meta: {
                title: '*事件统计',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/statistics_event',
                auth: ['statistics.event.event', '*']
            }
        }
    ]
}
