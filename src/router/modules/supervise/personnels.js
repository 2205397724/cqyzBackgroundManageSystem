
const Layout = () => import('@/layout/index.vue')

export default {
    path: '/personnel_management',
    component: Layout,
    redirect: '/personnel_management/personel',
    name: 'personnelManagementBox',
    meta: {
        title: '人员管理',
        icon: 'el-icon-set-up',
        auth: ['personnel.management', '*']
    },
    children: [
        {
            path: 'personel',
            name: 'personnelManagement',
            component: () => import('@/views/supervise/personnels.vue'),
            meta: {
                copyright: false,
                title: '人员管理',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/personnel_management'
            }
        }
    ]
}
