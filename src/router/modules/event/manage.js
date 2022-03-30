const Layout = () => import('@/layout/index.vue')

export default {
    path: '/event_manage',
    component: Layout,
    redirect: '/event_manage/manage',
    name: 'eventManageBox',
    meta: {
        title: '*事件管理',
        icon: 'el-icon-document',
        auth: ['event.manage', '*']
    },
    children: [
        {
            path: 'manage',
            name: 'eventManage',
            component: () => import('@/views/event/manage.vue'),
            meta: {
                title: '*事件管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/event_manage',
                auth: ['event.manage.manage', '*']
            }
        }
    ]
}
