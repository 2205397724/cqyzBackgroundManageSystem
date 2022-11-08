const Layout = () => import('@/layout/index.vue')

export default {
    list:[
        {
            path: '/share/data',
            component: Layout,
            redirect: '/share/data/index',
            name: 'shareDataBox',
            meta: {
                title: '共享数据',
                icon: 'el-icon-Tickets',
                auth: ['share.data', '*']
            },
            children: [
                {
                    path: 'index',
                    name: 'shareDataIndex',
                    component: () => import('@/views/share/data.vue'),
                    meta: {
                        title: '共享数据',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/share/data'
                    },
                    children: [
                        {
                            path: 'detail',
                            name: 'shareDataDetail',
                            component: () => import('@/views/share/detail.vue'),
                            meta: {
                                title: '数据详情',
                                sidebar: false,
                                breadcrumb: false,
                                activeMenu: '/share/data'
                            }
                        }
                    ]
                }
            ]
        },
        {
            path: '/share/category',
            component: Layout,
            redirect: '/share/category/index',
            name: 'shareCategoryBox',
            meta: {
                title: '业务种类',
                icon: 'el-icon-set-up',
                auth: ['share.category', '*']
            },
            children: [
                {
                    path: 'index',
                    name: 'shareCategoryIndex',
                    component: () => import('@/views/share/category.vue'),
                    meta: {
                        title: '业务种类',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/share/category'
                    }
                }
            ]
        },
        {
            path: '/share/services',
            component: Layout,
            redirect: '/share/services/index',
            name: 'shareServicesBox',
            meta: {
                title: '业务管理',
                icon: 'el-icon-DataAnalysis',
                auth: ['share.services', '*']
            },
            children: [
                {
                    path: 'index',
                    name: 'shareServicesIndex',
                    component: () => import('@/views/share/services.vue'),
                    meta: {
                        title: '业务管理',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/share/services'
                    }
                }
            ]
        },
        {
            path: '/share/files',
            component: Layout,
            redirect: '/share/files/index',
            name: 'shareFilesBox',
            meta: {
                title: '共享要件',
                icon: 'el-icon-MessageBox',
                auth: ['share.files', '*']
            },
            children: [
                {
                    path: 'index',
                    name: 'shareFilesIndex',
                    component: () => import('@/views/share/files.vue'),
                    meta: {
                        title: '共享要件',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/share/files'
                    }
                }
            ]
        },
        {
            path: '/share/post.share.record',
            component: Layout,
            redirect: '/share/post.share.record/index',
            name: 'postShareRecord',
            meta: {
                title: '发起共享',
                icon: 'el-icon-MessageBox',
                auth: ['share.files', '*']
            },
            children: [
                {
                    path: 'index',
                    name: 'postShareRecord',
                    component: () => import('@/views/share/post.share.record.vue'),
                    meta: {
                        title: '发起共享',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/share/post.share.record'
                    }
                }
            ]
        }
    ]
}
