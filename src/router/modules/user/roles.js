const Layout = () => import('@/layout/index.vue')

export default {
    path: '/user_roles',
    component: Layout,
    redirect: '/user_roles/roles',
    name: 'userRolesBox',
    meta: {
        title: '角色管理',
        icon: 'el-icon-avatar',
        auth: ['user.roles', '*']
    },
    children: [
        {
            path: 'roles',
            name: 'userRoles',
            component: () => import('@/views/user/roles.vue'),
            meta: {
                title: '角色管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/user_roles',
                auth: ['user.roles.roles', '*']
            }
        }
    ]
}
