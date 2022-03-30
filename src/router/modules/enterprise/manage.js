const Layout = () => import('@/layout/index.vue')

export default {
    path: '/enterprise_manage',
    component: Layout,
    redirect: '/enterprise_manage/manage',
    name: 'enterpriseManageBox',
    meta: {
        title: '*企业管理',
        icon: 'el-icon-mic',
        auth: ['enterprise.manage', '*']
    },
    children: [
        {
            path: 'manage',
            name: 'enterpriseManage',
            component: () => import('@/views/enterprise/manage.vue'),
            meta: {
                title: '*企业管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/enterprise_manage',
                auth: ['enterprise.manage.manage', '*']
            }
        }
    ]
}
