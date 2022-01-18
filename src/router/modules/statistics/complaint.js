const Layout = () => import('@/layout/index.vue')

export default {
    path: '/statistics-complaint',
    component: Layout,
    redirect: '/statistics-complaint/complaint',
    name: 'statisticsComplaintBox',
    meta: {
        title: '投诉统计',
        icon: 'el-icon-phone',
        auth: ['statistics.complaint', '*']
    },
    children: [
        {
            path: 'complaint',
            name: 'statisticsComplaint',
            component: () => import('@/views/statistics/complaint.vue'),
            meta: {
                title: '',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/statistics-complaint',
                auth: ['statistics.complaint.complaint', '*']
            }
        }
    ]
}
