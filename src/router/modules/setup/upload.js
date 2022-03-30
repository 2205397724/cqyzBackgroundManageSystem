const Layout = () => import('@/layout/index.vue')

export default {
    path: '/setup_upload',
    component: Layout,
    redirect: '/setup_upload/upload',
    name: 'setupUploadBox',
    meta: {
        title: '*上传设置',
        icon: 'el-icon-delete-location',
        auth: ['setup.upload', '*']
    },
    children: [
        {
            path: 'upload',
            name: 'setupUpload',
            component: () => import('@/views/setup/upload.vue'),
            meta: {
                title: '*上传设置',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/setup_upload',
                auth: ['setup.upload.upload', '*']
            }
        }
    ]
}
