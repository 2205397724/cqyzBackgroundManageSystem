const Layout = () => import('@/layout/index.vue')

export default {
    path: '/setup_region',
    component: Layout,
    redirect: '/setup_region/city',
    name: 'setupRegionBox',
    meta: {
        title: '区域设置',
        icon: 'el-icon-guide',
        auth: ['setup.region', '*']
    },
    children: [
        {
            path: 'city',
            name: 'setupRegionCity',
            component: () => import('@/views/setup/region/city.vue'),
            meta: {
                title: '城市配置',
                auth: ['setup.region.city', '*']
            }
        },
        {
            path: 'china',
            name: 'setupRegionChina',
            component: () => import('@/views/setup/region/china.vue'),
            meta: {
                title: 'CHINA',
                auth: ['setup.region.china', '*']
            }
        }
    ]
}
