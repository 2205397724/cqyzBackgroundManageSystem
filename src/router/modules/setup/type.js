const Layout = () => import('@/layout/index.vue')

export default {
    path: '/setup_type',
    component: Layout,
    redirect: '/setup_type/type',
    name: 'setupTypeBox',
    meta: {
        title: '分类管理',
        icon: 'el-icon-delete-location',
        auth: ['setup.type', '*']
    },
    children: [
        {
            path: 'type',
            name: 'setupType',
            component: () => import('@/views/setup/type.vue'),
            meta: {
                title: '分类管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/setup_type',
                auth: ['setup.type.type', '*']
            }
        }
    ]
}
