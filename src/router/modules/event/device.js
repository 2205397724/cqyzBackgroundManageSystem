const Layout = () => import('@/layout/index.vue')

export default {
    path: '/event_device',
    component: Layout,
    redirect: '/event_device/device',
    name: 'eventdeviceBox',
    meta: {
        title: '设备',
        icon: 'el-icon-document',
        auth: ['event.device', '*']
    },
    children: [
        {
            path: 'device',
            name: 'eventdevice',
            component: () => import('@/views/event/device.vue'),
            meta: {
                title: '设备',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/event_device',
                auth: ['event.device.device', '*']
            }
        }
    ]
}
