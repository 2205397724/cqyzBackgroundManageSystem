const Layout = () =>
    import ('@/layout/index.vue')

export default {
    path: '/event_device',
    component: Layout,
    redirect: '/event_device/device',
    name: 'eventdeviceBox',
    meta: {
        title: '设备管理',
        icon: 'el-icon-document',
        auth: ['event.device', '*']
    },
    children: [{
        path: 'device',
        name: 'eventdevice',
        component: () =>
            import ('@/views/house/device.vue'),
        meta: {
            title: '设备管理',
            sidebar: false,
            breadcrumb: false,
            activeMenu: '/event_device'
        }
    }]
}
