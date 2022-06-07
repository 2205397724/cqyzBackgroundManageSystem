const Layout = () => import('@/layout/index.vue')

export default {
    path: '/event_entry',
    component: Layout,
    redirect: '/event_entry/entry',
    name: 'eventEntryBox',
    meta: {
        title: '报名设置',
        icon: 'el-icon-document',
        auth: ['event.entry', '*']
    },
    children: [
        {
            path: 'entry',
            name: 'eventEntry',
            component: () => import('@/views/event/entry.vue'),
            meta: {
                title: '报名设置',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/event_entry',
                auth: ['event.entry.entry', '*']
            }
        }
    ]
}
