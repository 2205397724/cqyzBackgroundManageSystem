
const Layout = () => import('@/layout/index.vue')

export default {
    path: '/share_elements',
    component: Layout,
    redirect: '/share_elements/elements',
    name: 'sharedElementsBox',
    meta: {
        title: '共享要件',
        icon: 'el-icon-set-up',
        auth: ['share.elements', '*']
    },
    children: [
        {
            path: 'elements',
            name: 'shareElements',
            component: () => import('@/views/share/shareElements.vue'),
            meta: {
                copyright: false,
                title: '共享要件',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/share_elements'
            }
        }
    ]
}
