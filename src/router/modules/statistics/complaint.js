const Layout = () => import('@/layout/index.vue')

export default {
    path: '/statistics_complaint',
    component: Layout,
    redirect: '/statistics_complaint/complaint',
    name: 'statisticsComplaintBox',
    meta: {
        title: '*投诉统计',
        icon: 'el-icon-phone',
        auth: ['statistics.complaint', '*']
    },
    children: [
        {
            path: 'complaint',
            name: 'statisticsComplaint',
            component: () => import('@/views/statistics/complaint.vue'),
            meta: {
                title: '*投诉统计',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/statistics_complaint',
                auth: ['statistics.complaint.complaint', '*']
            }
        }
    ]
}
