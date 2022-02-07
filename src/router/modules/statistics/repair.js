const Layout = () => import('@/layout/index.vue')

export default {
    path: '/statistics_repair',
    component: Layout,
    redirect: '/statistics_repair/repair',
    name: 'statisticsRepairBox',
    meta: {
        title: '报修统计',
        icon: 'el-icon-warning',
        auth: ['statistics.repair', '*']
    },
    children: [
        {
            path: 'repair',
            name: 'statisticsRepair',
            component: () => import('@/views/statistics/repair.vue'),
            meta: {
                title: '报修统计',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/statistics_repair',
                auth: ['statistics.repair.repair', '*']
            }
        }
    ]
}
