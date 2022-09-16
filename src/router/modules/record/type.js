const Layout = () =>
    import ('@/layout/index.vue')

export default {
    path: '/record_type',
    component: Layout,
    redirect: '/record_type/type',
    name: 'recordTypeBox',
    meta: {
        title: '备案分类',
        icon: 'el-icon-document',
        auth: ['record.type', '*']
    },
    children: [{
        path: 'type',
        name: 'recordType',
        component: () =>
            import ('@/views/record/type.vue'),
        meta: {
            title: '备案分类',
            sidebar: false,
            breadcrumb: false,
            activeMenu: '/record_type'
        }
    }]
}
