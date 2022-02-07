const Layout = () => import('@/layout/index.vue')

export default {
    path: '/statistics-enterprise',
    component: Layout,
    redirect: '/statistics-enterprise/enterprise',
    name: 'statisticsEnterpriseBox',
    meta: {
        title: '企业统计',
        icon: 'el-icon-data-line',
        auth: ['statistics.enterprise', '*']
    },
    children: [
        {
            path: 'enterprise',
            name: 'statisticsEnterprise',
            component: () => import('@/views/statistics/enterprise.vue'),
            meta: {
                title: '企业统计',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/statistics-enterprise',
                auth: ['statistics.enterprise.enterprise', '*']
            }
        }
    ]
}
