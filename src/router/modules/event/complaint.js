const Layout = () => import('@/layout/index.vue')

export default {
    path: '/event_complaint',
    component: Layout,
    redirect: '/event_complaint/complaint',
    name: 'eventComplaintBox',
    meta: {
        title: '投诉管理',
        icon: 'el-icon-document',
        auth: ['event.complaint', '*']
    },
    children: [
        {
            path: 'complaint',
            name: 'eventComplaint',
            component: () => import('@/views/event/complaint.vue'),
            meta: {
                title: '投诉管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/event_complaint',
                auth: ['event.complaint.complaint', '*']
            }
        }
    ]
}
