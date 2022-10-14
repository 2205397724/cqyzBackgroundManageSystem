
const Layout = () => import('@/layout/index.vue')

export default {
    path: '/share_services_manage',
    component: Layout,
    redirect: '/share_services_manage/manage',
    name: 'shareServicesManageBox',
    meta: {
        title: '共享业务管理',
        icon: 'el-icon-set-up',
        auth: ['share.services.manage', '*']
    },
    children: [
        {
            path: 'manage',
            name: 'shareServicesManage',
            component: () => import('@/views/supervise/shareServicesManage.vue'),
            meta: {
                copyright: false,
                title: '共享业务管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/share_services_manage'
            }
        }
    ]
}
