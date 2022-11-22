const Layout = () => import('@/layout/index.vue')

export default {
    list:[
        {
            path: '/complaint',
            component: Layout,
            redirect: '/complaint/index',
            name: 'complaintBox',
            meta: {
                title: '投诉管理',
                icon: 'el-icon-document',
                auth: ['complaint.index', '*']
            },
            children: [{
                path: 'index',
                name: 'complaintIndex',
                component: () => import ('@/views/event/complaint.vue'),
                meta: {
                    title: '投诉管理',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/complaint'
                },
                children: [{
                    path: 'detail',
                    name: 'complaintDetail',
                    sidebar: false,
                    breadcrumb: false,
                    component: () => import ('@/views/event/Details.vue'),
                    meta: {
                        title: '投诉详情',
                        sidebar: false,
                        activeMenu: '/complaint'
                    }
                }]
            }]
        },
        {
            path: '/illegal',
            component: Layout,
            redirect: '/illegal/index',
            name: 'illegalBox',
            meta: {
                title: '违建管理',
                icon: 'el-icon-document',
                auth: ['illegal.index', '*']
            },
            children: [{
                path: 'index',
                name: 'illegalIndex',
                component: () => import ('@/views/event/illegal.vue'),
                meta: {
                    title: '违建管理',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/illegal'
                },
                children: [{
                    path: 'detail',
                    name: 'illegalDetail',
                    sidebar: false,
                    breadcrumb: false,
                    component: () => import ('@/views/event/Details.vue'),
                    meta: {
                        title: '违建详情',
                        sidebar: false,
                        activeMenu: '/illegal'
                    }
                }]
            }]
        },
        {
            path: '/repair',
            component: Layout,
            redirect: '/repair/index',
            name: 'repairBox',
            meta: {
                title: '报修管理',
                icon: 'el-icon-document',
                auth: ['repair.index', '*']
            },
            children: [{
                path: 'index',
                name: 'repairIndex',
                component: () => import ('@/views/event/repair.vue'),
                meta: {
                    title: '报修管理',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/repair'
                },
                children: [{
                    path: 'detail',
                    name: 'repairDetail',
                    sidebar: false,
                    breadcrumb: false,
                    component: () => import ('@/views/event/repairDetails.vue'),
                    meta: {
                        title: '详情',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/repair'
                    }
                }]
            }]
        }
    ]
}
