const Layout = () => import('@/layout/index.vue')

export default {
    path: '/activity_survey',
    component: Layout,
    redirect: '/activity_survey/survey',
    name: 'activitySurvey',
    meta: {
        title: '问卷',
        icon: 'el-icon-document',
        auth: ['event.events', '*']
    },
    children: [
        {
            path: 'survey',
            component: () => import('@/views/activity/survey.vue'),
            meta: {
                title: '问卷',
                // 在侧边导航栏显示
                sidebar: false,
                // 在面包屑展示
                breadcrumb: false,
                activeMenu: '/activity_survey',
            }
        },
    ]
}
