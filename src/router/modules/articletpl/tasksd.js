const Layout = () => import('@/layout/index.vue')

export default {
    path: '/articletpl_tasksd',
    component: Layout,
    redirect: '/articletpl_tasksd/tasksd',
    name: 'articletplTasksdBox',
    meta: {
        title: '任务派发',
        icon: 'el-icon-document',
        auth: ['articletpl.tasksd', '*']
    },
    children: [
        {
            path: 'tasksd',
            name: 'articletplTasksd',
            component: () => import('@/views/articletpl/tasksd.vue'),
            meta: {
                title: '任务派发',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/articletpl_tasksd',
                auth: ['articletpl.tasksd.tasksd', '*']
            }
        }
    ]
}
