const Layout = () => import('@/layout/index.vue')

export default {
    path: '/activity_jointly',
    component: Layout,
    redirect: '/activity_jointly/jointly',
    // name: 'activity',
    meta: {
        title: '联名',
        icon: 'el-icon-document',
        auth: ['activity.jointly', '*']
    },
    children: [
        {
            path: 'jointly',
            component: () => import('@/views/activity/jointly.vue'),
            meta: {
                title: '联名',
                // 在侧边导航栏显示
                sidebar: false,
                // 在面包屑展示
                breadcrumb: false,
                activeMenu: '/activity_jointly'
            }
        }
    ]
}
