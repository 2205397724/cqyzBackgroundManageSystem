const Layout = () => import('@/layout/index.vue')

export default {
    list:[
        {
            path: '/setup/region',
            component: Layout,
            redirect: '/setup/region/city',
            name: 'regionBox',
            meta: {
                title: '城市配置',
                icon: 'el-icon-guide',
                auth: ['setup', '*']
            },
            children: [
                {
                    path: 'city',
                    name: 'regionCity',
                    component: () => import('@/views/setup/region/city.vue'),
                    meta: {
                        title: '城市配置',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/setup/region',
                        auth: ['setup.region', '*']
                    }
                }
            ]
        }
    ]
}
