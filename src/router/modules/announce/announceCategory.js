const Layout = () =>
    import ('@/layout/index.vue')

export default {
    path: '/announce_announceCategory',
    component: Layout,
    redirect: '/announce_announceCategory/announceCategory',
    name: 'announceCategoryBox',
    meta: {
        title: '公式分类',
        icon: 'el-icon-document',
        auth: ['announce.announceCategory', '*']
    },
    children: [{
        path: 'announceCategory',
        name: 'announceCategory',
        component: () =>
            import ('@/views/announce/announceCategory.vue'),
        meta: {
            title: '公式分类',
            sidebar: false,
            breadcrumb: false,
            activeMenu: '/announce_announceCategory',
            auth: ['announce.aannounceCategory.announceCategory', '*']
        }
    }]
}
