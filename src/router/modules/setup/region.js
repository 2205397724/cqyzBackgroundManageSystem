const Layout = () => import('@/layout/index.vue')

export default {
    path: '/setup-region',
    component: Layout,
    redirect: '/setup-region/region',
    name: 'setupRegionBox',
    meta: {
        title: '区域设置',
        icon: 'el-icon-guide',
        auth: ['setup.region', '*']
    },
    children: [
        {
            path: 'region',
            name: 'setupRegion',
            component: () => import('@/views/setup/region.vue'),
            meta: {
                title: '区域设置',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/setup-region',
                auth: ['setup.region.region', '*']
            }
        }
    ]
}
