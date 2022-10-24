const Layout = () => import('@/layout/index.vue')

export default {
    list:[
        //小区管理
        {
            path: '/datas/zones',
            component: Layout,
            redirect: '/datas/zones/index',
            name: 'zonesBox',
            meta: {
                title: '小区管理',
                icon: 'el-icon-office-building',
                auth: ['zones', '*']
            },
            children: [
                {
                    path: 'index',
                    name: 'zonesIndex',
                    component: () => import('@/views/datas/zones/zones.vue'),
                    meta: {
                        title: '小区管理',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/datas/zones',
                        auth: ['zones.index', '*']
                    },
                    children: [
                        {
                            path: 'building',
                            name: 'zonesBuilding',
                            component: () => import('@/views/datas/zones/building.vue'),
                            meta: {
                                title: '楼栋',
                                sidebar: false,
                                activeMenu: '/datas/zones',
                                auth: ['zones.building', '*']
                            },
                            children: [
                                {
                                    path: 'unit',
                                    name: 'zonesBuildingUnit',
                                    component: () => import('@/views/datas/zones/unit.vue'),
                                    meta: {
                                        title: '单元',
                                        sidebar: false,
                                        activeMenu: '/datas/zones',
                                        auth: ['zones.building.unit', '*']
                                    },
                                    children: [
                                        {
                                            path: 'house',
                                            name: 'zonesBuildingUnitHouse',
                                            component: () => import('@/views/datas/house.vue'),
                                            meta: {
                                                title: '房屋',
                                                sidebar: false,
                                                activeMenu: '/datas/zones',
                                                auth: ['zones.building.unit.house', '*']
                                            }
                                        }
                                    ]
                                },
                                {
                                    path: 'house',
                                    name: 'zonesBuildingHouse',
                                    component: () => import('@/views/datas/house.vue'),
                                    meta: {
                                        title: '房屋',
                                        sidebar: false,
                                        activeMenu: '/datas/zones',
                                        auth: ['zones.building.house', '*']
                                    }
                                }
                            ]
                        },
                        {
                            path: 'house',
                            name: 'zonesHouse',
                            component: () => import('@/views/datas/house.vue'),
                            meta: {
                                title: '房屋',
                                sidebar: false,
                                activeMenu: '/datas/zones',
                            }
                        },
                        {
                            path: 'committee',
                            name: 'zonesCommittee',
                            component: () => import('@/views/datas/zones/committee.vue'),
                            meta: {
                                title: '业委会',
                                sidebar: false,
                                activeMenu: '/datas/zones',
                                auth: ['zones.committee', '*']
                            }
                        },
                        {
                            path: 'company',
                            name: 'zonesCompany',
                            component: () => import('@/views/datas/zones/company.vue'),
                            meta: {
                                title: '企业',
                                sidebar: false,
                                activeMenu: '/datas/zones',
                                auth: ['zones.company', '*']
                            }
                        }
                    ]
                }
            ]
        },
        //房屋数据
        {
            path: '/datas/house',
            component: Layout,
            redirect: '/datas/house/index',
            name: 'houseBox',
            meta: {
                title: '房屋管理',
                icon: 'el-icon-message-box',
                auth: ['house', '*']
            },
            children: [{
                path: 'index',
                name: 'houseIndex',
                component: () => import ('@/views/datas/house.vue'),
                meta: {
                    title: '房屋管理',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/datas/house',
                    auth: ['house.index', '*']
                }
            }]
        },
        //产权数据
        {
            path: '/datas/property',
            component: Layout,
            redirect: '/datas/property/index',
            name: 'propertyBox',
            meta: {
                title: '产权管理',
                icon: 'el-icon-postcard',
                auth: ['property', '*']
            },
            children: [{
                path: 'index',
                name: 'propertyIndex',
                component: () =>import ('@/views/datas/property/property.vue'),
                meta: {
                    title: '产权管理',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/datas/property',
                    auth: ['property.index', '*']
                }
            }]
        },
        //企业数据
        {
            path: '/datas/company',
            component: Layout,
            redirect: '/datas/company/index',
            name: 'companyBox',
            meta: {
                title: '企业管理',
                icon: 'el-icon-postcard',
                auth: ['company', '*']
            },
            children: [{
                path: 'index',
                name: 'companyIndex',
                component: () => import ('@/views/datas/company.vue'),
                meta: {
                    title: '企业管理',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/datas/company',
                    auth:['company.index','*']
                }
            }]
        },
        //业委会数据
        {
            path: '/datas/committee',
            component: Layout,
            redirect: '/datas/committee/index',
            name: 'committeeBox',
            meta: {
                title: '业委会管理',
                icon: 'el-icon-postcard',
                auth: ['committee', '*']
            },
            children: [{
                path: 'index',
                name: 'committeeIndex',
                component: () => import ('@/views/datas/committee.vue'),
                meta: {
                    title: '业委会管理',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/datas/committee',
                    auth:['committee.index','*']
                }
            }]
        },
        //设施设备数据
        {
            path: '/datas/device',
            component: Layout,
            redirect: '/datas/device/index',
            name: 'deviceBox',
            meta: {
                title: '设施设备',
                icon: 'el-icon-document',
                auth: ['device', '*']
            },
            children: [{
                path: 'index',
                name: 'deviceIndex',
                component: () => import ('@/views/datas/device/device.vue'),
                meta: {
                    title: '设施设备',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/datas/device',
                    auth:['device.index','*']
                }
            }]
        },
        //人员数据
        {
            path: '/datas/people',
            component: Layout,
            redirect: '/datas/people/index',
            name: 'peopleBox',
            meta: {
                title: '居民数据',
                icon: 'el-icon-document',
                auth: ['people', '*']
            },
            children: [{
                path: 'index',
                name: 'peopleIndex',
                component: () => import ('@/views/datas/people.vue'),
                meta: {
                    title: '居民数据',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/datas/people',
                    auth:['people.index','*']
                }
            }]
        },
    ]
}
