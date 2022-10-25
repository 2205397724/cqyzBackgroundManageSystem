const Layout = () => import('@/layout/index.vue')

export default {
    list:[
        {
            path: '/news',
            component: Layout,
            redirect: '/news/index',
            name: 'newsBox',
            meta: {
                title: '资讯管理',
                icon: 'el-icon-document',
                auth: ['news.index', '*']
            },
            children: [{
                path: 'index',
                name: 'newsIndex',
                component: () => import ('@/views/news/index.vue'),
                meta: {
                    title: '资讯管理',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/news'
                }
            }]
        },
        {
            path: '/news/category',
            component: Layout,
            redirect: '/news/category/index',
            name: 'newsCategoryBox',
            meta: {
                title: '资讯类别',
                icon: 'el-icon-Notebook',
                auth: ['news.category', '*']
            },
            children: [{
                path: 'index',
                name: 'newsCategoryIndex',
                component: () => import ('@/views/news/category.vue'),
                meta: {
                    title: '资讯类别',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/news/category'
                }
            }]
        }
    ]
}
