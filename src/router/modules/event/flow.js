const Layout = () => import('@/layout/index.vue')

export default {
    path: '/event_flow',
    component: Layout,
    redirect: '/event_flow/flow',
    name: 'eventflowBox',
    meta: {
        title: '流程',
        icon: 'el-icon-document',
        auth: ['event.flow', '*']
    },
    children: [
        {
            path: 'flow',
            name: 'eventflow',
            component: () => import('@/views/event/flow.vue'),
            meta: {
                title: '流程',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/event_flow',
                auth: ['event.flow.flow', '*']
            }
        }
    ]
}
