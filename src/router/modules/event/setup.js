const Layout = () => import('@/layout/index.vue')

export default {
    path: '/event_setup',
    component: Layout,
    redirect: '/event_setup/process',
    name: 'eventSetupBox',
    meta: {
        title: '*设置',
        icon: 'el-icon-set-up',
        auth: ['event.setup', '*']
    },
    children: [
        {
            path: 'group',
            name: 'eventSetupGroup',
            component: () => import('@/views/event/setup/group.vue'),
            meta: {
                title: '*设置',
                auth: ['event.setup.group', '*']
            }
        }
    ]
}
