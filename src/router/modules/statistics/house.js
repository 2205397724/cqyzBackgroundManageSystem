const Layout = () => import('@/layout/index.vue')

export default {
    path: '/statistics_house',
    component: Layout,
    redirect: '/statistics_house/house',
    name: 'statisticsHouseBox',
    meta: {
        title: '*小区房屋统计',
        icon: 'el-icon-office-building',
        auth: ['statistics.house', '*']
    },
    children: [
        {
            path: 'house',
            name: 'statisticsHouse',
            component: () => import('@/views/statistics/house.vue'),
            meta: {
                title: '*小区房屋统计',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/statistics_house',
                auth: ['statistics.house.house', '*']
            }
        }
    ]
}
