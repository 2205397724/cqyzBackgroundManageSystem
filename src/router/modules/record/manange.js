const Layout = () =>
    import ('@/layout/index.vue')

export default {
    path: '/record_manange',
    component: Layout,
    redirect: '/record_manange/manange',
    name: 'recordManangeBox',
    meta: {
        title: '备案管理',
        icon: 'el-icon-document',
        auth: ['record.manange', '*']
    },
    children: [{
        path: 'manange',
        name: 'recordManange',
        component: () =>
            import ('@/views/record/manange.vue'),
        meta: {
            title: '备案管理',
            sidebar: false,
            breadcrumb: false,
            activeMenu: '/record_manange',
            auth: ['record.manange.manange', '*']
        },
        children: [{
            path: 'detail',
            name: 'recordManangeDetail',
            component: () => import('@/views/record/add.vue'),
            meta: {
                title: '详情',
                activeMenu: '/record_manange',
                auth: ['record.manange.add', '*']
            }
        }]
    }]
}
