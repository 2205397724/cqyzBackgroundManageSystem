const Layout = () =>
    import ('@/layout/index.vue')

export default {
    path: '/house_property',
    component: Layout,
    redirect: '/house_property/property_list',
    name: 'housePropertyBox',
    meta: {
        title: '产权管理',
        icon: 'el-icon-postcard',
        auth: ['house.property_list', '*']
    },
    children: [{
        path: 'property_list',
        name: 'houseProperty',
        component: () =>
            import ('@/views/house/property/property_list.vue'),
        meta: {
            title: '产权管理',
            sidebar: false,
            breadcrumb: false,
            activeMenu: '/house_property'
        }
    }]
}

// const Layout = () => import('@/layout/index.vue')

// export default {
//     path: '/house_property',
//     component: Layout,
//     redirect: '/house_property/property_list',
//     name: 'housePropertyBox',
//     meta: {
//         title: '产权管理',
//         icon: 'el-icon-collection',
//         auth: ['house.property', '*']
//     },
//     children: [
//         {
//             path: 'property_list',
//             name: 'housePropertyPropertyList',
//             component: () => import('@/views/house/property/property_list.vue'),
//             meta: {
//                 title: '产权列表',
//                 auth: ['house.property.property_list', '*']
//             }
//         },
//         {
//             path: 'demo',
//             name: 'housePropertyDemo',
//             component: () => import('@/views/house/property/demo.vue'),
//             meta: {
//                 title: '*产权示例',
//                 auth: ['house.property.demo', '*']
//             }
//         }
//     ]
// }
