const Layout = () => import('@/layout/index.vue')

export default {
    path: '/enterprise-manage',
    component: Layout,
    redirect: '/enterprise-manage/manage',
    name: 'enterpriseManageBox',
    meta: {
        title: '企业管理',
        // icon: 'el-icon-star-on'
        auth: ['enterprise.manage']
    },
    children: [
        {
            path: 'manage',
            name: 'enterpriseManage',
            component: () => import('@/views/enterprise/manage.vue'),
            meta: {
                title: '',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/enterprise-manage',
                auth: ['enterprise.manage.manage']
            }
        }
    ]
}
