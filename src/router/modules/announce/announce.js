const Layout = () =>
    import ('@/layout/index.vue')

export default {
    path: '/announce_announce',
    component: Layout,
    redirect: '/announce_announce/announce',
    name: 'announceBox',
    meta: {
        title: '公示模板',
        icon: 'el-icon-document',
        auth: ['announce.announce', '*']
    },
    children: [{
        path: 'announce',
        name: 'announce',
        component: () =>
            import ('@/views/announce/announce.vue'),
        meta: {
            title: '公示模板',
            sidebar: false,
            breadcrumb: false,
            activeMenu: '/announce_announce',
            auth: ['announce.announce.announce', '*']
        }
    }]
}
