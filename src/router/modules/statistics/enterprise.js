const Layout = () => import('@/layout/index.vue')

export default {
    path: '/statistics_enterprise',
    component: Layout,
    redirect: '/statistics_enterprise/enterprise',
    name: 'statisticsEnterpriseBox',
    meta: {
        title: '*企业统计',
        icon: 'el-icon-data-line',
        auth: ['statistics.enterprise', '*']
    },
    children: [
        {
            path: 'enterprise',
            name: 'statisticsEnterprise',
            component: () => import('@/views/statistics/enterprise.vue'),
            meta: {
                title: '*企业统计',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/statistics_enterprise',
                auth: ['statistics.enterprise.enterprise', '*']
            }
        }
    ]
}
