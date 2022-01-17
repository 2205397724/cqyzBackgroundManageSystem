const Layout = () => import('@/layout/index.vue')

export default {
    path: '/setup-upload',
    component: Layout,
    redirect: '/setup-upload/upload',
    name: 'setupUploadBox',
    meta: {
        title: '上传设置',
        // icon: 'el-icon-star-on'
        auth: ['setup.upload']
    },
    children: [
        {
            path: 'upload',
            name: 'setupUpload',
            component: () => import('@/views/setup/upload.vue'),
            meta: {
                title: '',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/setup-upload',
                auth: ['setup.upload.upload']
            }
        }
    ]
}
