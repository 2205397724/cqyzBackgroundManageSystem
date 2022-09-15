const Layout = () =>
    import ('@/layout/index.vue')

export default {
    path: '/house_housing_management',
    component: Layout,
    redirect: '/house_housing_management/housing_management',
    name: 'houseHousingManagementBox',
    meta: {
        title: '房屋管理',
        icon: 'el-icon-message-box',
        auth: ['house.housing_management', '*']
    },
    children: [{
        path: 'housing_management',
        name: 'houseHousingManagement',
        component: () =>
            import ('@/views/house/housing_management.vue'),
        meta: {
            title: '房屋管理',
            sidebar: false,
            breadcrumb: false,
            activeMenu: '/house_housing_management',
            auth: ['house.housing_management.housing_management', '*']
        }
    }]
}