const Layout = () => import('@/layout/index.vue')

export default {
    path: '/statistics_equipment',
    component: Layout,
    redirect: '/statistics_equipment/equipment',
    name: 'statisticsEquipmentBox',
    meta: {
        title: '设备统计',
        icon: 'el-icon-timer',
        auth: ['statistics.equipment', '*']
    },
    children: [
        {
            path: 'equipment',
            name: 'statisticsEquipment',
            component: () => import('@/views/statistics/equipment.vue'),
            meta: {
                title: '设备统计',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/statistics_equipment',
                auth: ['statistics.equipment.equipment', '*']
            }
        }
    ]
}
