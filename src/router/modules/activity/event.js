const Layout = () =>
    import ('@/layout/index.vue')

export default {
    path: '/activity_event',
    component: Layout,
    redirect: '/activity_event/event',
    // name: 'activity',
    meta: {
        title: '事件专题',
        icon: 'el-icon-document',
        auth: ['event.events', '*']
    },
    children: [{
        path: 'event',
        component: () =>
            import ('@/views/activity/event.vue'),
        meta: {
            title: '事件专题',
            // 在侧边导航栏显示
            sidebar: false,
            // 在面包屑展示
            breadcrumb: false,
            activeMenu: '/activity_event'
        },
        children: [{
            path: 'details',
            name: 'eventDetails',
            sidebar: false,
            breadcrumb: false,
            component: () =>
                import ('@/views/activity/details.vue'),
            meta: {
                title: '详情',
                sidebar: false,
                activeMenu: '/activity_event'
            }
        }]
    }]
}