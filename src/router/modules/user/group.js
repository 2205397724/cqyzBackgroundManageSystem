const Layout = () => import('@/layout/index.vue')

export default {
    path: '/user_group',
    component: Layout,
    redirect: '/user_group/group',
    name: 'userTypeBox',
    meta: {
        title: '用户组管理',
        icon: 'el-icon-document-copy',
        auth: ['user.group', '*']
    },
    children: [
        {
            path: 'group',
            name: 'userType',
            component: () => import('@/views/user/group.vue'),
            meta: {
                title: '用户组管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/user_group',
                auth: ['user.group.group', '*']
            }
        }
    ]
}
