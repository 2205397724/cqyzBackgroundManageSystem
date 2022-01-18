const Layout = () => import('@/layout/index.vue')

export default {
    path: '/house-property',
    component: Layout,
    redirect: '/house-property/property',
    name: 'housePropertyBox',
    meta: {
        title: '产权管理',
        icon: 'el-icon-collection',
        auth: ['house.property']
    },
    children: [
        {
            path: 'property',
            name: 'houseProperty',
            component: () => import('@/views/house/property.vue'),
            meta: {
                title: '',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/house-property',
                auth: ['house.property.property']
            }
        }
    ]
}
