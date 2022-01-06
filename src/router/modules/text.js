const Layout = () => import('@/layout/index.vue')

export default {
    path: '/text',
    component: Layout,
    redirect: '/text/text',
    name: 'text',
    meta: {
        title: 'Text',
        icon: 'sidebar-mock'
    },
    children: [
        {
            path: 'text',
            name: 'text',
            component: () => import('@/views/text/text.vue'),
            meta: {
                title: 'Text',
                breadcrumb: false
            }
        }
    ]
}
