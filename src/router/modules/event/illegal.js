const Layout = () =>
    import ('@/layout/index.vue')

export default {
    path: '/event_illegal',
    component: Layout,
    redirect: '/event_illegal/illegal',
    name: 'eventIllegalBox',
    meta: {
        title: '违建管理',
        icon: 'el-icon-document',
        auth: ['event.illegal', '*']
    },
    children: [{
        path: 'illegal',
        name: 'eventIllegal',
        component: () =>
            import ('@/views/event/illegal.vue'),
        meta: {
            title: '违建管理',
            sidebar: false,
            breadcrumb: false,
            activeMenu: '/event_illegal'
        },
        children: [{
            path: 'details',
            name: 'complaintDetails_1',
            sidebar: false,
            breadcrumb: false,
            component: () =>
                import ('@/views/event/Details.vue'),
            meta: {
                title: '详情',
                sidebar: false,
                activeMenu: '/event_illegal'
            }
        }]
    }]
}
