const Layout = () => import('@/layout/index.vue')

export default {
    path: '/supervise_home',
    component: Layout,
    redirect: '/supervise_home/home',
    name: 'superviseHomeBox',
    meta: {
        title: '*控制台首页1',
        icon: 'el-icon-set-up',
        auth: ['supervise.home', '*']
    },
    children: [
        {
            path: 'home',
            name: 'superviseHome',
            component: () => import('@/views/index.vue'),
            meta: {
                title: '*控制台首页2',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/supervise_home'
            }
        }
    ]
}
