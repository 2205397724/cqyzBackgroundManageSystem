const Layout = () =>
    import ('@/layout/index.vue')

export default {
    path: '/event_repair',
    component: Layout,
    redirect: '/event_repair/repair',
    name: 'eventRepairBox',
    meta: {
        title: '报修管理',
        icon: 'el-icon-document',
        auth: ['event.repair', '*']
    },
    children: [{
        path: 'repair',
        name: 'eventRepair',
        component: () =>
            import ('@/views/event/repair.vue'),
        meta: {
            title: '报修管理',
            sidebar: false,
            breadcrumb: false,
            activeMenu: '/event_repair'
        },
        children: [{
            path: 'details',
            name: 'complaintDetails_2',
            sidebar: false,
            breadcrumb: false,
            component: () =>
                import ('@/views/event/Details.vue'),
            meta: {
                title: '详情',
                sidebar: false,
                activeMenu: '/event_repair'
            }
        }]
    }]
}
