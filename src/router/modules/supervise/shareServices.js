
const Layout = () => import('@/layout/index.vue')

export default {
    path: '/share_services',
    component: Layout,
    redirect: '/share_services/services',
    name: 'shareServicesBox',
    meta: {
        title: '共享业务',
        icon: 'el-icon-set-up',
        auth: ['share.services', '*']
    },
    children: [
        {
            path: 'services',
            name: 'shareServices',
            component: () => import('@/views/supervise/shareServices.vue'),
            meta: {
                copyright: false,
                title: '共享业务',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/share_services'
            }
        }
    ]
}
