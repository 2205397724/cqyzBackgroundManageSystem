
const Layout = () => import('@/layout/index.vue')

export default {
    path: '/share_data',
    component: Layout,
    redirect: '/share_data/data',
    name: 'sharedDataBox',
    meta: {
        title: '共享数据',
        icon: 'el-icon-set-up',
        auth: ['share.data', '*']
    },
    children: [
        {
            path: 'data',
            name: 'shareData',
            component: () => import('@/views/share/shareData.vue'),
            meta: {
                copyright: false,
                title: '共享数据',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/share_data'
            }
        }
    ]
}
