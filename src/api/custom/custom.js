import api from '@/api/index.js'

// 控制台首页
// 个人信息
export function APIgetUserinfo(params) {
    return api.get('/member/home/userinfo', { baseURL: '/mock/', params: params })
}
// 统计
export function APIgetTipsnum(params) {
    return api.get('/member/home/tipsnum', { baseURL: '/mock/', params: params })
}
// 投诉报修违建
export function APIgetEventnum(params) {
    return api.get('/member/home/eventnum', { baseURL: '/mock/', params: params })
}
// 统计图表 用户注册统计 用户实名认证 用户活跃统计
export function APIgetEcharts(params) {
    return api.get('/member/home/echarts', { baseURL: '/mock/', params: params })
}

// 登录
// 登录
export function APIlogin(data) {
    return api.post('/member/login', data, { baseURL: '/mock/' })
}
// 获取权限
export function APIgetPermissions(params) {
    return api.get('/member/permission', { baseURL: '/mock/', params: params })
}
// 修改密码？
export function APIeditPassword(data) {
    return api.post('/member/edit/password', data, { baseURL: '/mock/' })
}
// 获取路由
export function APIgenerateRoutesAtBack() {
    return api.get('/route/list', { baseURL: '/mock/' })
}

// // 滞纳金
// // 列表
// export function getLateFeeList(params) {
//     return api.get('/backend/money_overdue_rules',params)
// }
// // 详情
// export function getLateFeeDetails(id) {
//     return api.get('/backend/money_overdue_rules/'+id)
// }
// // 添加
// export function addLateFee(params) {
//     return api.post('/backend/money_overdue_rules',params)
// }
// // 修改
// export function putLateFee(id,params) {
//     return api.put('/backend/money_overdue_rules/'+id,params)
// }
// // 删除
// export function delLateFee(id) {
//     return api.delete('/backend/money_overdue_rules/'+id)
// }
