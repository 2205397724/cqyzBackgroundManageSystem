const Layout = () => import('@/layout/index.vue')

export default {
    path: '/supervise-workbench',
    component: Layout,
    redirect: '/supervise-workbench/workbench',
    name: 'superviseWorkbenchBox',
    meta: {
        title: '管理工作台',
        icon: 'el-icon-brush',
        auth: ['supervise.workbench', '*']
    },
    children: [
        {
            path: 'workbench',
            name: 'superviseWorkbench',
            component: () => import('@/views/supervise/workbench.vue'),
            meta: {
                copyright: false,
                title: '管理工作台',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/supervise-workbench',
                auth: ['supervise.workbench.workbench', '*']
            }
        }
    ]
}
