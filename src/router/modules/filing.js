const Layout = () => import('@/layout/index.vue')

export default {
    list:[
        {
            path: '/filing',
            component: Layout,
            redirect: '/filing/index',
            name: 'filingBox',
            meta: {
                title: '备案管理',
                icon: 'el-icon-document',
                auth: ['filing.index','*']
            },
            children: [{
                path: 'index',
                name: 'filingIndex',
                component: () => import ('@/views/filing/index.vue'),
                meta: {
                    title: '备案管理',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/filing',
                },
                children: [{
                    path: 'detail',
                    name: 'filingDetail',
                    component: () => import('@/views/filing/detail.vue'),
                    meta: {
                        title: '详情',
                        activeMenu: '/filing'
                    }
                }]
            }]
        },
        {
            path: '/filing/category',
            component: Layout,
            redirect: '/filing/category/index',
            name: 'filingCategoryBox',
            meta: {
                title: '备案类别',
                icon: 'el-icon-Notebook'
            },
            children: [{
                path: 'index',
                name: 'filingCategoryIndex',
                component: () => import ('@/views/filing/category.vue'),
                meta: {
                    title: '备案类别',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/filing/category',
                    auth: ['filing.category', '*']
                }
            }]
        }
    ]
}
