const Layout = () => import('@/layout/index.vue')

export default {
    path: '/event_articletpl',
    component: Layout,
    redirect: '/event_articletpl/archive',
    name: 'eventArticletplBox',
    meta: {
        title: '公示',
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
                title: '公示',
                auth: ['event.articletpl.article', '*']
            }
        },
        {
            path: 'audit',
            name: 'eventArticletplAudit',
            component: () => import('@/views/event/articletpl/audit.vue'),
            meta: {
                title: '公示审核',
                auth: ['event.articletpl.audit', '*']
            }
        },
        {
            path: 'placeonfile',
            name: 'eventArticletplPlaceonfile',
            component: () => import('@/views/event/articletpl/placeonfile.vue'),
            meta: {
                title: '归档公示',
                auth: ['event.articletpl.placeonfile', '*']
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
        }
    ]
}
