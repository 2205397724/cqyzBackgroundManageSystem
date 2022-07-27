const Layout = () => import('@/layout/index.vue')

export default {
    path: '/articletpl_article',
    component: Layout,
    redirect: '/articletpl_article/article',
    name: 'articletplArticleBox',
    meta: {
        title: '公示管理',
        icon: 'el-icon-document',
        auth: ['articletpl.article', '*']
    },
    children: [
        {
            path: 'article',
            name: 'articletplArticle',
            component: () => import('@/views/articletpl/article.vue'),
            meta: {
                title: '管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/articletpl_article',
                auth: ['articletpl.article.article', '*']
            }
        }
    ]
}
