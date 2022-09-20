const Layout = () =>
    import ('@/layout/index.vue')

export default {
    path: '/information_manage',
    component: Layout,
    redirect: '/information_manage/manage',
    name: 'informationManageBox',
    meta: {
        title: '资讯管理',
        icon: 'el-icon-document',
        auth: ['information.manage', '*']
    },
    children: [{
        path: 'manage',
        name: 'informationManage',
        component: () =>
            import ('@/views/information/manage.vue'),
        meta: {
            title: '资讯管理',
            sidebar: false,
            breadcrumb: false,
            activeMenu: '/information_manage'
        }
    }]
}
