const Layout = () => import('@/layout/index.vue')

export default {
    path: '/statistics-event',
    component: Layout,
    redirect: '/statistics-event/event',
    name: 'statisticsEventBox',
    meta: {
        title: '事件统计',
        // icon: 'el-icon-star-on'
        auth: ['statistics.event']
    },
    children: [
        {
            path: 'event',
            name: 'statisticsEvent',
            component: () => import('@/views/statistics/event.vue'),
            meta: {
                title: '',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/statistics-event',
                auth: ['statistics.event.event']
            }
        }
    ]
}
