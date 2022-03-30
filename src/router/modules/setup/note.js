const Layout = () => import('@/layout/index.vue')

export default {
    path: '/setup_note',
    component: Layout,
    redirect: '/setup_note/note',
    name: 'setupNoteBox',
    meta: {
        title: '*短信设置',
        icon: 'el-icon-chat-dot-round',
        auth: ['setup.note', '*']
    },
    children: [
        {
            path: 'note',
            name: 'setupNote',
            component: () => import('@/views/setup/note.vue'),
            meta: {
                title: '*短信设置',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/setup_note',
                auth: ['setup.note.note', '*']
            }
        }
    ]
}
