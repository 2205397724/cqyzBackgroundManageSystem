
const Layout = () => import('@/layout/index.vue')

export default {
    path: '/activity_review',
    component: Layout,
    redirect: '/activity_review/review',
    name: 'activityReviewBox',
    meta: {
        title: '活动审核',
        icon: 'el-icon-set-up',
        auth: ['activity.review', '*']
    },
    children: [
        {
            path: 'review',
            name: 'activityReview',
            component: () => import('@/views/supervise/review.vue'),
            meta: {
                copyright: false,
                title: '活动审核',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/activity_review'
            }
        }
    ]
}
