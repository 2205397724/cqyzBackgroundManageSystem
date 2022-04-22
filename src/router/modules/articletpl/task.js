const Layout = () => import('@/layout/index.vue')

export default {
    path: '/articletpl_task',
    component: Layout,
    redirect: '/articletpl_task/task',
    name: 'articletplTaskBox',
    meta: {
        title: '监管督促',
        icon: 'el-icon-document',
        auth: ['articletpl.task', '*']
    },
    children: [
        {
            path: 'task',
            name: 'articletplTask',
            component: () => import('@/views/articletpl/task.vue'),
            meta: {
                title: '监管督促',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/articletpl_task',
                auth: ['articletpl.task.task', '*']
            }
        }
    ]
}
