const Layout = () => import('@/layout/index.vue')

export default {
    path: '/supervise-home',
    component: Layout,
    redirect: '/supervise-home/home',
    name: 'superviseHomeBox',
    meta: {
        title: '控制台首页',
        icon: 'el-icon-set-up',
        auth: ['supervise.home', '*']
    },
    children: [
        {
            path: 'home',
            name: 'superviseHome',
            component: () => import('@/views/index.vue'),
            meta: {
                title: '',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/supervise-home',
                auth: ['supervise.home.home', '*']
            }
        }
    ]
}
