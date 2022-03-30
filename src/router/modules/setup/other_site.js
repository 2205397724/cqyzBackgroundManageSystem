const Layout = () => import('@/layout/index.vue')

export default {
    path: '/setup_other',
    component: Layout,
    redirect: '/setup_other/other',
    name: 'setupOtherBox',
    meta: {
        title: '*分站设置',
        icon: 'el-icon-connection',
        auth: ['setup.other', '*']
    },
    children: [
        {
            path: 'other',
            name: 'setupOther',
            component: () => import('@/views/setup/other_site.vue'),
            meta: {
                title: '*分站设置',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/setup_other',
                auth: ['setup.other.other', '*']
            }
        }
    ]
}
