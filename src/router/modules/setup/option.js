const Layout = () => import('@/layout/index.vue')

export default {
    path: '/setup_option',
    component: Layout,
    redirect: '/setup_option/option',
    name: 'setupOptionBox',
    meta: {
        title: '选项配置',
        icon: 'el-icon-operation',
        auth: ['setup.option', '*']
    },
    children: [
        {
            path: 'option',
            name: 'setupOption',
            component: () => import('@/views/setup/option.vue'),
            meta: {
                title: '选项配置',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/setup_option'
            }
        }
    ]
}
