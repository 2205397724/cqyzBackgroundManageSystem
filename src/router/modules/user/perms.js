const Layout = () => import('@/layout/index.vue')

export default {
    path: '/user_perms',
    component: Layout,
    redirect: '/user_perms/perms',
    name: 'userPermsBox',
    meta: {
        title: '权限管理',
        icon: 'el-icon-document-copy',
        auth: ['user.perms', '*']
    },
    children: [
        {
            path: 'perms',
            name: 'userPerms',
            component: () => import('@/views/user/perms.vue'),
            meta: {
                title: '权限管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/user_perms',
                auth: ['user.perms.perms', '*']
            }
        }
    ]
}
