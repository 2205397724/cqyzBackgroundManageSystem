const Layout = () => import('@/layout/index.vue')

export default {
    path: '/event_device_archive',
    component: Layout,
    redirect: '/event_device_archive/device_archive',
    name: 'eventdeviceArchiveBox',
    meta: {
        title: '设备档案',
        icon: 'el-icon-document',
        auth: ['event.device_archive', '*']
    },
    children: [
        {
            path: 'device_archive',
            name: 'eventdeviceArchive',
            component: () => import('@/views/house/device_archive.vue'),
            meta: {
                title: '设备档案',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/event_device_archive',
                auth: ['event.device_archive.device_archive', '*']
            }
        }
    ]
}
