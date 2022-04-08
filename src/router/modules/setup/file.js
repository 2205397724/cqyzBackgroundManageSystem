const Layout = () => import('@/layout/index.vue')

export default {
    path: '/setup_file',
    component: Layout,
    redirect: '/setup_file/file',
    name: 'setupfileBox',
    meta: {
        title: '资源文件',
        icon: 'el-icon-delete-location',
        auth: ['setup.file', '*']
    },
    children: [
        {
            path: 'file',
            name: 'setupfile',
            component: () => import('@/views/setup/file.vue'),
            meta: {
                title: '资源文件',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/setup_file',
                auth: ['setup.file.file', '*']
            }
        }
    ]
}
