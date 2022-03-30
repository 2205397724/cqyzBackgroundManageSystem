const Layout = () => import('@/layout/index.vue')

export default {
    path: '/house_residential',
    component: Layout,
    redirect: '/house_residential/residential',
    name: 'houseResidentialBox',
    meta: {
        title: '*小区管理',
        icon: 'el-icon-office-building',
        auth: ['house.residential', '*']
    },
    children: [
        {
            path: 'residential',
            name: 'houseResidential',
            component: () => import('@/views/house/residential.vue'),
            meta: {
                title: '*小区管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/house_residential',
                auth: ['house.residential.residential', '*']
            }
        }
    ]
}
