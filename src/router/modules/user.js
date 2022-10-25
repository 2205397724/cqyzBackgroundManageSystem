const Layout = () => import('@/layout/index.vue')

export default {
    list:[
        {
            path: '/user',
            component: Layout,
            redirect: '/user/index',
            name: 'userIndexBox',
            meta: {
                title: '用户管理',
                icon: 'el-icon-postcard',
                auth: ['user.index', '*']
            },
            children: [
                {
                    path: 'index',
                    name: 'userIndex',
                    component: () => import('@/views/user/user.vue'),
                    meta: {
                        title: '用户管理',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/user'
                    }
                }
            ]
        },
        {
            path: '/user/group',
            component: Layout,
            redirect: '/user/group/index',
            name: 'userGroupBox',
            meta: {
                title: '用户组管理',
                icon: 'el-icon-document-copy',
                auth: ['user.group', '*']
            },
            children: [
                {
                    path: 'index',
                    name: 'userGroupIndex',
                    component: () => import('@/views/user/group.vue'),
                    meta: {
                        title: '用户组管理',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/user/group'
                    }
                }
            ]
        },
        {
            path: '/user/roles',
            component: Layout,
            redirect: '/user/roles/index',
            name: 'userRolesBox',
            meta: {
                title: '角色管理',
                icon: 'el-icon-Finished',
                auth: ['user.roles', '*']
            },
            children: [
                {
                    path: 'index',
                    name: 'userRolesIndex',
                    component: () => import('@/views/user/roles.vue'),
                    meta: {
                        title: '角色管理',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/user/roles'
                    }
                }
            ]
        },
        {
            path: '/user/auth',
            component: Layout,
            redirect: '/user/auth/index',
            name: 'userAuthBox',
            meta: {
                title: '权限管理',
                icon: 'el-icon-document-copy',
                auth: ['user.auth', '*']
            },
            children: [
                {
                    path: 'index',
                    name: 'userAuthIndex',
                    component: () => import('@/views/user/auth.vue'),
                    meta: {
                        title: '权限管理',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/user/auth'
                    }
                }
            ]
        }
    ]
}
