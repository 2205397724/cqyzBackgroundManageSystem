const Layout = () =>
    import ('@/layout/index.vue')

export default {
    path: '/house_enterprise_apply',
    component: Layout,
    redirect: '/house_enterprise_apply/enterprise_apply',
    name: 'houseEnterpriseApplyBox',
    meta: {
        title: '企业申请管理',
        icon: 'el-icon-postcard',
        auth: ['house.enterprise_apply', '*']
    },
    children: [{
        path: 'enterprise_apply',
        name: 'houseEnterpriseApply',
        component: () =>
            import ('@/views/house/enterprise_apply.vue'),
        meta: {
            title: '企业申请管理',
            sidebar: false,
            breadcrumb: false,
            activeMenu: '/house_enterprise_apply',
            auth: ['house.enterprise_apply.enterprise_apply', '*']
        }
    }]
}