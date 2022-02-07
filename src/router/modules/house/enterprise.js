const Layout = () => import('@/layout/index.vue')

export default {
    path: '/house_enterprise',
    component: Layout,
    redirect: '/house_enterprise/enterprise',
    name: 'houseEnterpriseBox',
    meta: {
        title: '企业备案',
        icon: 'el-icon-postcard',
        auth: ['house.enterprise', '*']
    },
    children: [
        {
            path: 'enterprise',
            name: 'houseEnterprise',
            component: () => import('@/views/house/enterprise.vue'),
            meta: {
                title: '企业备案',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/house_enterprise',
                auth: ['house.enterprise.enterprise', '*']
            }
        }
    ]
}
