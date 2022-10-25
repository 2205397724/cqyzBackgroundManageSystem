const Layout = () => import('@/layout/index.vue')

export default {
    list:[
        {
            path: '/announce',
            component: Layout,
            redirect: '/announce/index',
            name: 'announceBox',
            meta: {
                title: '公示管理',
                icon: 'el-icon-document',
                auth: ['announce.index', '*']
            },
            children: [{
                path: 'index',
                name: 'announceIndex',
                component: () => import ('@/views/announce/announce.vue'),
                meta: {
                    title: '公示管理',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/announce'
                },
                children: [{
                    path: 'detail',
                    name: 'announceDetail',
                    sidebar: false,
                    breadcrumb: false,
                    component: () => import ('@/views/announce/details.vue'),
                    meta: {
                        title: '公示详情',
                        sidebar: false,
                        activeMenu: '/announce'
                    }
                }]
            }]
        },
        {
            path: '/announce/archive',
            component: Layout,
            redirect: '/announce/archive/index',
            name: 'announceArchiveBox',
            meta: {
                title: '公示归档',
                icon: 'el-icon-document',
                auth: ['announce.archive', '*']
            },
            children: [{
                path: 'index',
                name: 'archiveIndex',
                component: () => import ('@/views/announce/archive.vue'),
                meta: {
                    title: '公示归档',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/announce/archive'
                }
            }]
        },
        {
            path: '/announce/category',
            component: Layout,
            redirect: '/announce/category/index',
            name: 'announceCategoryBox',
            meta: {
                title: '公示分类',
                icon: 'el-icon-document',
                auth: ['announce.category', '*']
            },
            children: [{
                path: 'index',
                name: 'announceCategoryIndex',
                component: () => import ('@/views/announce/category.vue'),
                meta: {
                    title: '公示分类',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/announce/category'
                }
            }]
        },
        {
            path: '/announce/task',
            component: Layout,
            redirect: '/announce/task/index',
            name: 'announceTaskBox',
            meta: {
                title: '公示任务',
                icon: 'el-icon-document',
                auth: ['announce.task', '*']
            },
            children: [{
                path: 'index',
                name: 'announceTaskIndex',
                component: () => import ('@/views/announce/task.vue'),
                meta: {
                    title: '公示任务',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/announce/task'
                }
            }]
        },
        {
            path: '/announce/plan',
            component: Layout,
            redirect: '/announce/plan/index',
            name: 'announcePlanBox',
            meta: {
                title: '公示计划',
                icon: 'el-icon-document',
                auth: ['announce.plan', '*']
            },
            children: [{
                path: 'index',
                name: 'announcePlanIndex',
                component: () =>
                    import ('@/views/announce/plan.vue'),
                meta: {
                    title: '公示计划',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/announce/plan'
                }
            }]
        },
        {
            path: '/announce/template',
            component: Layout,
            redirect: '/announce/template/index',
            name: 'announceTemplateBox',
            meta: {
                title: '公示模板',
                icon: 'el-icon-document',
                auth: ['announce.template', '*']
            },
            children: [{
                path: 'index',
                name: 'announceTemplateIndex',
                component: () => import ('@/views/announce/template.vue'),
                meta: {
                    title: '公示模板',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/announce/template'
                }
            }]
        }
    ]
}
