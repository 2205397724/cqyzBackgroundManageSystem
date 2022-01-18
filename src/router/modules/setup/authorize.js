const Layout = () => import('@/layout/index.vue')

export default {
    path: '/setup-authorize',
    component: Layout,
    redirect: '/setup-authorize/group',
    name: 'setupAuthorizeBox',
    meta: {
        title: '权限设置',
        icon: 'el-icon-key',
        auth: ['setup.authorize']
    },
    children: [
        {
            path: 'group',
            name: 'setupAuthorizeGroup',
            component: () => import('@/views/setup/authorize/group.vue'),
            meta: {
                title: ' 角色分组',
                auth: ['setup.authorize.group']
            }
        },
        {
            path: 'menu',
            name: 'setupAuthorizeMenu',
            component: () => import('@/views/setup/authorize/menu.vue'),
            meta: {
                title: ' 后台菜单',
                auth: ['setup.authorize.menu']
            }
        },
        {
            path: 'admin',
            name: 'setupAuthorizeAdmin',
            component: () => import('@/views/setup/authorize/admin.vue'),
            meta: {
                title: ' 管理员设置',
                auth: ['setup.authorize.admin']
            }
        }
    ]
}
