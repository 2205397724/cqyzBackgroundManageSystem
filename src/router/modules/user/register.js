const Layout = () => import('@/layout/index.vue')

export default {
    path: '/user_register',
    component: Layout,
    redirect: '/user_register/register',
    name: 'userRegisterBox',
    meta: {
        title: '用户管理',
        icon: 'el-icon-postcard',
        auth: ['user.register', '*']
    },
    children: [
        {
            path: 'register',
            name: 'userRegister',
            component: () => import('@/views/user/register.vue'),
            meta: {
                title: '用户管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/user_register',
                auth: ['user.register.register', '*']
            }
        }
    ]
}
