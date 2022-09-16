const Layout = () =>
    import ('@/layout/index.vue')

export default {
    path: '/announce_archive',
    component: Layout,
    redirect: '/announce_archive/archive',
    name: 'archiveBox',
    meta: {
        title: '公示归档',
        icon: 'el-icon-document',
        auth: ['announce.Archive', '*']
    },
    children: [{
        path: 'archive',
        name: 'archive',
        component: () =>
            import ('@/views/announce/archive.vue'),
        meta: {
            title: '公示归档',
            sidebar: false,
            breadcrumb: false,
            activeMenu: '/announce_archive'
        }
    }]
}
