const Layout = () => import('@/layout/index.vue')
export default {
    path: '/share_category',
    component: Layout,
    redirect: '/share_category/category',
    name: 'shareCategoryBox',
    meta: {
        title: '共享种类',
        icon: 'el-icon-set-up',
        auth: ['share.category', '*']
    },
    children: [
        {
            path: 'category',
            name: 'shareCategory',
            component: () => import('@/views/share/shareCategory.vue'),
            meta: {
                copyright: false,
                title: '共享种类',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/share_category'
            }
        }
    ]
}
