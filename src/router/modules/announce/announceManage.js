const Layout = () =>
    import ('@/layout/index.vue')

export default {
    path: '/announce_announceManage',
    component: Layout,
    redirect: '/announce_announceManage/announceManage',
    name: 'announceManageBox',
    meta: {
        title: '公示管理',
        icon: 'el-icon-document',
        auth: ['announce.announceManage', '*']
    },
    children: [{
        path: 'announceManage',
        name: 'announceManage',
        component: () =>
            import ('@/views/announce/announceManage.vue'),
        meta: {
            title: '管理',
            sidebar: false,
            breadcrumb: false,
            activeMenu: '/announce_announceManage',
            auth: ['announce.announceManage.announceManage', '*']
        }
    }]
}