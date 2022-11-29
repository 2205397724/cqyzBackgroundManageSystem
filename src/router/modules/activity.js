const Layout = () => import('@/layout/index.vue')

export default {
    list:[
        {
            path: '/activity/vein',
            component: Layout,
            redirect: '/activity/vein/index',
            meta: {
                title: '事件专题',
                icon: 'el-icon-document',
                auth: ['activity.vein', '*']
            },
            children: [{
                path: 'index',
                name: 'veinIndex',
                component: () => import ('@/views/activity/vein.vue'),
                meta: {
                    title: '事件专题',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/activity/vein'
                },
                children: [{
                    path: 'detail',
                    name: 'veinDetail',
                    sidebar: false,
                    breadcrumb: false,
                    component: () => import ('@/views/activity/veinDetails.vue'),
                    meta: {
                        title: '专题详情',
                        sidebar: false,
                        activeMenu: '/activity/vein'
                    }
                }]
            }]
        },
        {
            path: '/activity/vote',
            component: Layout,
            redirect: '/activity/vote/index',
            meta: {
                title: '表决',
                icon: 'el-icon-document',
                auth: ['activity.vote', '*']
            },
            children: [
                {
                    path: 'index',
                    name: 'voteIndex',
                    component: () => import('@/views/activity/vote.vue'),
                    meta: {
                        title: '表决',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/activity/vote'
                    },
                    children: [{
                        path: 'detail',
                        name: 'voteDetail',
                        sidebar: false,
                        breadcrumb: false,
                        component: () => import ('@/views/activity/activityDetails.vue'),
                        meta: {
                            title: '表决详情',
                            sidebar: false,
                            activeMenu: '/activity/vote'
                        }
                    }]
                }
            ]
        },
        {
            path: '/activity/elect',
            component: Layout,
            redirect: '/activity/elect/index',
            meta: {
                title: '选举',
                icon: 'el-icon-document',
                auth: ['activity.elect', '*']
            },
            children: [
                {
                    path: 'index',
                    name: 'electIndex',
                    component: () => import('@/views/activity/elect.vue'),
                    meta: {
                        title: '选举',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/activity/elect'
                    },
                    children: [{
                        path: 'detail',
                        name: 'electDetail',
                        sidebar: false,
                        breadcrumb: false,
                        component: () => import ('@/views/activity/activityDetails.vue'),
                        meta: {
                            title: '选举详情',
                            sidebar: false,
                            activeMenu: '/activity/elect'
                        }
                    }]
                }
            ]
        },
        {
            path: '/activity/survey',
            component: Layout,
            redirect: '/activity/survey/index',
            name: 'activitySurvey',
            meta: {
                title: '问卷',
                icon: 'el-icon-document',
                auth: ['activity.survey', '*']
            },
            children: [
                {
                    path: 'index',
                    name: 'surveyIndex',
                    component: () => import('@/views/activity/survey.vue'),
                    meta: {
                        title: '问卷',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/activity/survey'
                    },
                    children: [{
                        path: 'detail',
                        name: 'surveyDetail',
                        sidebar: false,
                        breadcrumb: false,
                        component: () => import ('@/views/activity/activityDetails.vue'),
                        meta: {
                            title: '问卷详情',
                            sidebar: false,
                            activeMenu: '/activity/survey'
                        }
                    }]
                }
            ]
        },
        {
            path: '/activity/jointly',
            component: Layout,
            redirect: '/activity/jointly/index',
            meta: {
                title: '联名',
                icon: 'el-icon-document',
                auth: ['activity.jointly', '*']
            },
            children: [
                {
                    path: 'index',
                    name: 'jointlyIndex',
                    component: () => import('@/views/activity/jointly.vue'),
                    meta: {
                        title: '联名',
                        sidebar: false,
                        breadcrumb: false,
                        activeMenu: '/activity/jointly'
                    },
                    children: [{
                        path: 'detail',
                        name: 'jointlyDetail',
                        sidebar: false,
                        breadcrumb: false,
                        component: () => import ('@/views/activity/activityDetails.vue'),
                        meta: {
                            title: '联名详情',
                            sidebar: false,
                            activeMenu: '/activity/jointly'
                        }
                    }]
                }
            ]
        }
    ]
}
