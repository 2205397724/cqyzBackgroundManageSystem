
const Layout = () => import('@/layout/index.vue')

export default {
    path: '/personnel_labels',
    component: Layout,
    redirect: '/personnel_labels/labels',
    name: 'personnelLabelsBox',
    meta: {
        title: '标签库管理',
        icon: 'el-icon-set-up',
        auth: ['personnel.labels', '*']
    },
    children: [
        {
            path: 'labels',
            name: 'personnelLabels',
            component: () => import('@/views/supervise/labels.vue'),
            meta: {
                copyright: false,
                title: '标签库管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/personnel_labels'
            }
        }
    ]
}
