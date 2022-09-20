const Layout = () =>
    import ('@/layout/index.vue')

export default {
    path: '/house_bind',
    component: Layout,
    redirect: '/house_bind/bind',
    name: 'houseBindBox',
    meta: {
        title: '房屋绑定申请',
        icon: 'el-icon-message-box',
        auth: ['house.bind', '*']
    },
    children: [{
        path: 'bind',
        name: 'houseBind',
        component: () =>
            import ('@/views/house/houseBind.vue'),
        meta: {
            title: '房屋绑定申请',
            sidebar: false,
            breadcrumb: false,
            activeMenu: '/house_bind'
        }
    }]
}
