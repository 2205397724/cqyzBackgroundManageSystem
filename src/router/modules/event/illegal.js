const Layout = () => import('@/layout/index.vue')

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
    children: [
        {
            path: 'illegal',
            name: 'eventIllegal',
            component: () => import('@/views/event/illegal.vue'),
            meta: {
                title: '违建管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/event_illegal',
                auth: ['event.illegal.illegal', '*']
            }
        }
    ]
}
