const Layout = () => import('@/layout/index.vue')

export default {
    path: '/event_articletpl',
    component: Layout,
    redirect: '/event_articletpl/archive',
    name: 'eventArticletplBox',
    meta: {
        title: '*公示',
        icon: 'el-icon-set-up',
        auth: ['event.articletpl', '*']
    },
    children: [
        {
            path: 'archive',
            name: 'eventArticletplArchive',
            component: () => import('@/views/event/articletpl/archive.vue'),
            meta: {
                title: '档案',
                auth: ['event.articletpl.archive', '*']
            }
        },
        {
            path: 'article',
            name: 'eventArticletplArticle',
            component: () => import('@/views/event/articletpl/article.vue'),
            meta: {
                title: '*公示',
                auth: ['event.articletpl.article', '*']
            }
        },
        {
            path: 'articletpl',
            name: 'eventArticletplArticletpl',
            component: () => import('@/views/event/articletpl/articletpl.vue'),
            meta: {
                title: '公示模板',
                auth: ['event.articletpl.articletpl', '*']
            }
        },
        {
            path: 'tasksd',
            name: 'eventArticletplTasksd',
            component: () => import('@/views/event/articletpl/tasksd.vue'),
            meta: {
                title: '任务派发',
                auth: ['event.articletpl.tasksd', '*']
            }
        },
        {
            path: 'task',
            name: 'eventArticletplTask',
            component: () => import('@/views/event/articletpl/task.vue'),
            meta: {
                title: '公示任务',
                auth: ['event.articletpl.task', '*']
            }
        },
        {
            path: 'articleread',
            name: 'eventArticletplArticleread',
            component: () => import('@/views/event/articletpl/articleread.vue'),
            meta: {
                title: '公示阅读',
                auth: ['event.articletpl.articleread', '*']
            }
        }
    ]
}
