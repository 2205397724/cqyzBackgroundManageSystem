const Layout = () =>
    import ('@/layout/index.vue')

export default {
    path: '/information_category',
    component: Layout,
    redirect: '/information_category/category',
    name: 'informationCategoryBox',
    meta: {
        title: '资讯类别',
        icon: 'el-icon-document',
        auth: ['information.category', '*']
    },
    children: [{
        path: 'category',
        name: 'informationCategory',
        component: () =>
            import ('@/views/information/category.vue'),
        meta: {
            title: '资讯类别',
            sidebar: false,
            breadcrumb: false,
            activeMenu: '/information_category'
        }
    }]
}
