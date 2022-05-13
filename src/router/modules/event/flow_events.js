const Layout = () => import('@/layout/index.vue')

export default {
    path: '/event_events',
    component: Layout,
    redirect: '/event_events/events',
    name: 'eventeventsBox',
    meta: {
        title: '议事管理',
        icon: 'el-icon-document',
        auth: ['event.events', '*']
    },
    children: [
        {
            path: 'events',
            name: 'eventevents',
            component: () => import('@/views/event/events.vue'),
            meta: {
                title: '议事管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/event_events',
                auth: ['event.events.events', '*']
            }
        }
    ]
}
