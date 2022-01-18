import api from '@/api/index.js'

// 登录
// 登录
export function APIlogin(data) {
    return api.post('/member/login', data, { baseURL: '/mock/' })
}
// 获取权限
export function APIgetPermissions(params) {
    return api.get('/member/permission', { baseURL: '/mock/', params: params })
}
// 输入密码？
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
