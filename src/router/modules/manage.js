const Layout = () => import('@/layout/index.vue')

export default {
    list:[
        {
            path: '/manage',
            component: Layout,
            redirect: '/manage/index',
            name: 'manageBox',
            meta: {
                title: '控制台',
                icon: 'el-icon-set-up',
            },
            children: [
                {
                    path: 'index',
                    name: 'manageIndex',
                    component: () => import('@/views/index.vue'),
                    meta: {
                        title: '控制台',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/manage',
                        auth: ['manage.index', '*']
                    }
                }
            ]
        },
        {
            path: '/manage/review',
            component: Layout,
            redirect: '/manage/review/index',
            name: 'reviewBox',
            meta: {
                title: '活动审核',
                icon: 'el-icon-set-up',
            },
            children: [
                {
                    path: 'index',
                    name: 'reviewIndex',
                    component: () => import('@/views/manage/review.vue'),
                    meta: {
                        title: '活动审核',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/manage/review',
                        auth: ['review.index', '*']
                    }
                }
            ]
        },
        {
            path: '/manage/applyhouse',
            component: Layout,
            redirect: '/manage/applyhouse/index',
            name: 'applyhouseBox',
            meta: {
                title: '绑定申请',
                icon: 'el-icon-message-box',
            },
            children: [
                {
                    path: 'index',
                    name: 'applyhouseIndex',
                    component: () => import ('@/views/manage/applyhouse.vue'),
                    meta: {
                        title: '绑定申请',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/manage/applyhouse',
                        auth: ['applyhouse.index', '*']
                    }
                }
            ]
        },
        {
            path: '/manage/applycompany',
            component: Layout,
            redirect: '/manage/applycompany/index',
            name: 'applycompanyBox',
            meta: {
                title: '企业入住',
                icon: 'el-icon-message-box',
            },
            children: [
                {
                    path: 'index',
                    name: 'applycompanyIndex',
                    component: () => import ('@/views/manage/applycompany.vue'),
                    meta: {
                        title: '企业入住',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/manage/applycompany',
                        auth: ['applycompany.index', '*']
                    }
                }
            ]
        }
    ]
}
