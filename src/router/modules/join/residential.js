const Layout = () => import('@/layout/index.vue')

export default {
    path: '/join_residential',
    component: Layout,
    redirect: '/join_residential/residential',
    name: 'joinResidentialBox',
    meta: {
        title: '入驻小区',
        icon: 'el-icon-office-building',
        auth: ['join.residential', '*']
    },
    children: [
        {
            path: 'residential',
            name: 'joinResidential',
            component: () => import('@/views/join/residential.vue'),
            meta: {
                title: '入驻小区',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/join_residential',
                auth: ['join.residential.residential', '*']
            }
        }
    ]
}
