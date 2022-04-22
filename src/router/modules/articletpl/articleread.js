const Layout = () => import('@/layout/index.vue')

export default {
    path: '/articletpl_articleread',
    component: Layout,
    redirect: '/articletpl_articleread/articleread',
    name: 'articletplArticlereadBox',
    meta: {
        title: '阅读记录',
        icon: 'el-icon-document',
        auth: ['articletpl.articleread', '*']
    },
    children: [
        {
            path: 'articleread',
            name: 'articletplArticleread',
            component: () => import('@/views/articletpl/articleread.vue'),
            meta: {
                title: '阅读记录',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/articletpl_articleread',
                auth: ['articletpl.articleread.articleread', '*']
            }
        }
    ]
}
