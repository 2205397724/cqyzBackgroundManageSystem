const Layout = () => import('@/layout/index.vue')

export default {
    path: '/event_device_repair',
    component: Layout,
    redirect: '/event_device_repair/device_repair',
    name: 'eventdeviceRepairBox',
    meta: {
        title: '设备维修',
        icon: 'el-icon-document',
        auth: ['event.device_repair', '*']
    },
    children: [
        {
            path: 'device_repair',
            name: 'eventdeviceRepair',
            component: () => import('@/views/house/device_repair.vue'),
            meta: {
                title: '设备维修',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/event_device_repair',
                auth: ['event.device_repair.device_repair', '*']
            }
        }
    ]
}
