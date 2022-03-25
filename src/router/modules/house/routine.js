const Layout = () => import('@/layout/index.vue')

export default {
    path: '/house_routine',
    component: Layout,
    redirect: '/house_routine/archives-category',
    name: 'houseRoutineBox',
    meta: {
        title: '常规设置',
        icon: 'el-icon-set-up',
        auth: ['house.routine', '*']
    },
    children: [
        {
            path: 'archives-category',
            name: 'houseRoutineArchivesCategory',
            component: () => import('@/views/house/routine/archives_category.vue'),
            meta: {
                title: '档案类别',
                auth: ['house.routine.archives', '*']
            }
        },
        {
            path: 'residential',
            name: 'houseRoutineResidential',
            component: () => import('@/views/house/routine/residential.vue'),
            meta: {
                title: '小区字段',
                auth: ['house.routine.residential', '*']
            }
        },
        {
            path: 'building',
            name: 'houseRoutineBuilding',
            component: () => import('@/views/house/routine/building.vue'),
            meta: {
                title: '楼栋字段',
                auth: ['house.routine.building', '*']
            }
        },
        {
            path: 'unit',
            name: 'houseRoutineUnit',
            component: () => import('@/views/house/routine/unit.vue'),
            meta: {
                title: '单元字段',
                auth: ['house.routine.unit', '*']
            }
        },
        {
            path: 'house',
            name: 'houseRoutineHouse',
            component: () => import('@/views/house/routine/house.vue'),
            meta: {
                title: '房屋字段',
                auth: ['house.routine.house', '*']
            }
        },
        {
            path: 'category',
            name: 'houseRoutineCategory',
            component: () => import('@/views/house/routine/category.vue'),
            meta: {
                title: '类别配置',
                auth: ['house.routine.category', '*']
            }
        },
        {
            path: 'news',
            name: 'houseRoutineNews',
            component: () => import('@/views/house/routine/news.vue'),
            meta: {
                title: '消息模板',
                auth: ['house.routine.news', '*']
            }
        }

    ]
}
