const Layout = () => import('@/layout/index.vue')

export default {
    path: '/statistics-repair',
    component: Layout,
    redirect: '/statistics-repair/repair',
    name: 'statisticsRepairBox',
    meta: {
        title: '报修统计',
        icon: 'el-icon-warning',
        auth: ['statistics.repair']
    },
    children: [
        {
            path: 'repair',
            name: 'statisticsRepair',
            component: () => import('@/views/statistics/repair.vue'),
            meta: {
                title: '',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/statistics-repair',
                auth: ['statistics.repair.repair']
            }
        }
    ]
}
