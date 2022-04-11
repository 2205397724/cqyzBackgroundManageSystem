const Layout = () => import('@/layout/index.vue')

export default {
    path: '/house_residential',
    component: Layout,
    redirect: '/house_residential/residential',
    name: 'houseResidentialBox',
    meta: {
        title: '小区管理',
        icon: 'el-icon-office-building',
        auth: ['house.residential', '*']
    },
    children: [
        {
            path: 'residential',
            name: 'houseResidential',
            component: () => import('@/views/house/residential.vue'),
            meta: {
                title: '小区管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/house_residential'
            },
            children: [
                {
                    path: 'building',
                    name: 'houseResidentialBuilding',
                    component: () => import('@/views/house/Building.vue'),
                    meta: {
                        title: '楼栋',
                        sidebar: false,
                        activeMenu: '/house_residential'
                    },
                    children: [
                        {
                            path: 'unit',
                            name: 'houseResidentialBuildingUnit',
                            component: () => import('@/views/house/unit.vue'),
                            meta: {
                                title: '单元',
                                sidebar: false,
                                activeMenu: '/house_residential'
                            },
                            children: [
                                {
                                    path: 'house',
                                    name: 'houseResidentialBuildingUnitHouse',
                                    component: () => import('@/views/house/house.vue'),
                                    meta: {
                                        title: '房屋',
                                        sidebar: false,
                                        activeMenu: '/house_residential'
                                    }
                                }
                            ]
                        },
                        {
                            path: 'house',
                            name: 'houseResidentialBuildingHouse',
                            component: () => import('@/views/house/house.vue'),
                            meta: {
                                title: '房屋',
                                sidebar: false,
                                activeMenu: '/house_residential'
                            }
                        }
                    ]
                },
                {
                    path: 'house',
                    name: 'houseResidentialHouse',
                    component: () => import('@/views/house/house.vue'),
                    meta: {
                        title: '房屋',
                        sidebar: false,
                        activeMenu: '/house_residential'
                    }
                }
            ]
        }
        // {
        //     path: 'building',
        //     name: 'houseResidentialBuilding',
        //     component: () => import('@/views/house/building.vue'),
        //     meta: {
        //         title: '楼栋',
        //         sidebar: false,
        //         activeMenu: '/house_residential/residential/building'
        //     },
        //     children: [
        //         {
        //             path: 'unit',
        //             name: 'houseResidentialBuildingUnit',
        //             component: () => import('@/views/house/unit.vue'),
        //             meta: {
        //                 title: '单元',
        //                 sidebar: false,
        //                 activeMenu: '/house_residential/residential/building/unit'
        //             }
        //         }
        //     ]
        // }
    ]
}
