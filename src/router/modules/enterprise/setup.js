const Layout = () => import('@/layout/index.vue')

export default {
    path: '/enterprise_setup',
    component: Layout,
    redirect: '/enterprise_setup/register',
    name: 'enterpriseSetupBox',
    meta: {
        title: '*企业设置',
        icon: 'el-icon-set-up',
        auth: ['enterprise.setup', '*']
    },
    children: [
        {
            path: 'register',
            name: 'enterpriseSetupRegister',
            component: () => import('@/views/enterprise/setup/register.vue'),
            meta: {
                title: '*注册设置',
                auth: ['enterprise.setup.register', '*']
            }
        },
        {
            path: 'group',
            name: 'enterpriseSetupGroup',
            component: () => import('@/views/enterprise/setup/group.vue'),
            meta: {
                title: '*企业类别',
                auth: ['enterprise.setup.group', '*']
            }
        },
        {
            path: 'news',
            name: 'enterpriseSetupNews',
            component: () => import('@/views/enterprise/setup/news.vue'),
            meta: {
                title: '*消息模板',
                auth: ['enterprise.setup.news', '*']
            }
        }
    ]
}
