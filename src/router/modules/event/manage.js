const Layout = () => import('@/layout/index.vue')

export default {
    path: '/event-manage',
    component: Layout,
    redirect: '/event-manage/manage',
    name: 'eventManageBox',
    meta: {
        title: '事件管理',
        icon: 'el-icon-document',
        auth: ['event.manage']
    },
    children: [
        {
            path: 'manage',
            name: 'eventManage',
            component: () => import('@/views/event/manage.vue'),
            meta: {
                title: '',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/event-manage',
                auth: ['event.manage.manage']
            }
        }
    ]
}
