const Layout = () => import('@/layout/index.vue')

export default {
    path: '/activity_survey',
    component: Layout,
    redirect: '/activity_survey/survey',
    name: 'activitySurvey',
    meta: {
        title: '问卷',
        icon: 'el-icon-document',
        auth: ['activity.survey', '*']
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
                activeMenu: '/activity_survey'
            },
            children: [{
                path: 'details',
                name: 'surveyDetails',
                sidebar: false,
                breadcrumb: false,
                component: () =>
                    import ('@/views/activity/activityDetails.vue'),
                meta: {
                    title: '详情',
                    sidebar: false,
                    activeMenu: '/activity_survey'
                }
            }]
        }
    ]
}
