const Layout = () => import('@/layout/index.vue')

export default {
    path: '/statistics-equipment',
    component: Layout,
    redirect: '/statistics-equipment/equipment',
    name: 'statisticsEquipmentBox',
    meta: {
        title: '设备统计',
        icon: 'el-icon-timer',
        auth: ['statistics.equipment']
    },
    children: [
        {
            path: 'equipment',
            name: 'statisticsEquipment',
            component: () => import('@/views/statistics/equipment.vue'),
            meta: {
                title: '',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/statistics-equipment',
                auth: ['statistics.equipment.equipment']
            }
        }
    ]
}
