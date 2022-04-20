const Layout = () => import('@/layout/index.vue')

export default {
    path: '/articletpl_articletpl',
    component: Layout,
    redirect: '/articletpl_articletpl/articletpl',
    name: 'articletplArticletplBox',
    meta: {
        title: '公示模板',
        icon: 'el-icon-document',
        auth: ['articletpl.articletpl', '*']
    },
    children: [
        {
            path: 'articletpl',
            name: 'articletplArticletpl',
            component: () => import('@/views/articletpl/articletpl.vue'),
            meta: {
                title: '公示模板',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/articletpl_articletpl',
                auth: ['articletpl.articletpl.articletpl', '*']
            }
        }
    ]
}








