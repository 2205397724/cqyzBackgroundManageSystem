const Layout = () => import('@/layout/index.vue')

export default {
    path: '/articletpl_archive',
    component: Layout,
    redirect: '/articletpl_archive/archive',
    name: 'articletplArchiveBox',
    meta: {
        title: '公示归档',
        icon: 'el-icon-document',
        auth: ['articletpl.archive', '*']
    },
    children: [
        {
            path: 'archive',
            name: 'articletplArchive',
            component: () => import('@/views/articletpl/archive.vue'),
            meta: {
                title: '公示归档',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/articletpl_archive',
                auth: ['event.archive.archive', '*']
            }
        }
    ]
}
