const Layout = () => import('@/layout/index.vue')

export default {
    path: '/user-register',
    component: Layout,
    redirect: '/user-register/register',
    name: 'userRegisterBox',
    meta: {
        title: '注册用户管理',
        icon: 'el-icon-postcard',
        auth: ['user.register', '*']
    },
    children: [
        {
            path: 'register',
            name: 'userRegister',
            component: () => import('@/views/user/register.vue'),
            meta: {
                title: '注册用户管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/user-register',
                auth: ['user.register.register', '*']
            }
        }
    ]
}
