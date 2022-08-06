const Layout = () =>
    import ('@/layout/index.vue')

export default {
    path: '/announce_task',
    component: Layout,
    redirect: '/announce_task/task',
    name: 'announceTaskBox',
    meta: {
        title: '监管督促',
        icon: 'el-icon-document',
        auth: ['announce.task', '*']
    },
    children: [{
        path: 'task',
        name: 'announceTask',
        component: () =>
            import ('@/views/announce/task.vue'),
        meta: {
            title: '监管督促',
            sidebar: false,
            breadcrumb: false,
            activeMenu: '/announce_task',
            auth: ['announce.task.task', '*']
        }
    }]
}
