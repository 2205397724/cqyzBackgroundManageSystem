const Layout = () => import('@/layout/index.vue')

export default {
    path: '/event-setup',
    component: Layout,
    redirect: '/event-setup/process',
    name: 'eventSetupBox',
    meta: {
        title: '事件设置',
        icon: 'el-icon-set-up',
        auth: ['event.setup']
    },
    children: [
        {
            path: 'group',
            name: 'eventSetupGroup',
            component: () => import('@/views/event/setup/group.vue'),
            meta: {
                title: ' 类别设置',
                auth: ['event.setup.group']
            }
        },
        {
            path: 'process',
            name: 'eventSetupProcess',
            component: () => import('@/views/event/setup/process.vue'),
            meta: {
                title: '流程设置',
                auth: ['event.setup.process']
            }
        },
        {
            path: 'news',
            name: 'eventSetupNews',
            component: () => import('@/views/event/setup/news.vue'),
            meta: {
                title: '消息模板',
                auth: ['event.setup.news']
            }
        },
    ]
}
