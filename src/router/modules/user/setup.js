const Layout = () => import('@/layout/index.vue')

export default {
    path: '/user_setup',
    component: Layout,
    redirect: '/user_setup/basics',
    name: 'userSetupBox',
    meta: {
        title: '用户设置',
        icon: 'el-icon-set-up',
        auth: ['user.setup', '*']
    },
    children: [
        {
            path: 'basics',
            name: 'userSetupBasics',
            component: () => import('@/views/user/setup/basics.vue'),
            meta: {
                title: '基础设置',
                auth: ['user.setup.basics', '*']
            }
        },
        {
            path: 'data',
            name: 'userSetupData',
            component: () => import('@/views/user/setup/data.vue'),
            meta: {
                title: '用户资料',
                auth: ['user.setup.data', '*']
            }
        },
        {
            path: 'group',
            name: 'userSetupGroup',
            component: () => import('@/views/user/setup/group.vue'),
            meta: {
                title: '分组设置',
                auth: ['user.setup.group', '*']
            }
        },
        {
            path: 'news',
            name: 'userSetupNews',
            component: () => import('@/views/user/setup/news.vue'),
            meta: {
                title: '消息模板',
                auth: ['user.setup.news', '*']
            }
        }
    ]
}
