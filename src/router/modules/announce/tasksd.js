const Layout = () =>
    import ('@/layout/index.vue')

export default {
    path: '/announce_tasksd',
    component: Layout,
    redirect: '/announce_tasksd/tasksd',
    name: 'announceTasksdBox',
    meta: {
        title: '公示计划',
        icon: 'el-icon-document',
        auth: ['announce.tasksd', '*']
    },
    children: [{
        path: 'tasksd',
        name: 'announceTasksd',
        component: () =>
            import ('@/views/announce/tasksd.vue'),
        meta: {
            title: '公示计划',
            sidebar: false,
            breadcrumb: false,
            activeMenu: '/announce_tasksd'
        }
    }]
}
