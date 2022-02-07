const Layout = () => import('@/layout/index.vue')

export default {
    path: '/house-archives',
    component: Layout,
    redirect: '/house-archives/archives',
    name: 'houseArchivesBox',
    meta: {
        title: '档案管理',
        icon: 'el-icon-message-box',
        auth: ['house.archives', '*']
    },
    children: [
        {
            path: 'archives',
            name: 'houseArchives',
            component: () => import('@/views/house/archives.vue'),
            meta: {
                title: '档案管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/house-archives',
                auth: ['house.archives.archives', '*']
            }
        }
    ]
}
