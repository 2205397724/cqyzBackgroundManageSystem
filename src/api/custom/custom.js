import api from '@/api/index.js'
import api2 from '@/api/index2.js'

/* --------------------------------------------------------------------------------------------------------------------- */
// 小区
// 列表
export function APIgetResidentialListHouse(params) {
    return api2.get('/zones', { params: params })
}
// 详情
export function APIgetResidentialDetailsHouse(id) {
    return api2.get('/zones/'+id)
}
// 删除
export function APIdeleteResidentialHouse(id) {
    return api2.delete('/zones/'+id)
}
// 修改
export function APIputResidentialHouse(id, data) {
    return api2.put('/zones/'+id, data)
}
// 添加
export function APIpostResidentialHouse(data) {
    return api2.post('/zones', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 申请 小区
// 列表
export function APIgetResidentialList(params) {
    return api2.get('/zone-com-apply', { params: params })
}
// 详情
export function APIgetResidentialDetails(id) {
    return api2.get('/zone-com-apply/'+id)
}
// 审批
export function APIputResidential(id, data) {
    return api2.put('/zone-com-apply/'+id, data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 申请 平台
// 列表
export function APIgetPlatformList(params) {
    return api.get('/pt/company-apply', { params: params })
}
// 详情
export function APIgetPlatformDetails(id) {
    return api.get('/pt/company-apply/'+id)
}
// 审批
export function APIputPlatform(id, data) {
    return api.put('/pt/company-apply/'+id, data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 登录
// 登录
export function APIlogin(data) {
    return api.post('/user/local-login', data)
}
// 修改密码？
export function APIeditPassword(data) {
    return api.put('/user/password', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */

// 统计
// 图表
export function APIgetEchartsStatistics() {
    return api.get('/member/statistics/echarts', { baseURL: '/mock/' })
}
// 总数
export function APIgetHouseNums(params) {
    return api.get('/member/statistics/nums', { baseURL: '/mock/', params: params })
}
// 区域
export function APIgetHousePlace(params) {
    return api.get('/member/statistics/place', { baseURL: '/mock/', params: params })
}
// 小区
export function APIgetHouseHouse(params) {
    return api.get('/member/statistics/house', { baseURL: '/mock/', params: params })
}

// 控制台首页
// 个人信息
export function APIgetUserinfo(params) {
    return api.get('/member/home/userinfo', { baseURL: '/mock/', params: params })
    // return api.get('/user/me', { params: params })
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
export function APIgetEchartsHome(params) {
    return api.get('/member/home/echarts', { baseURL: '/mock/', params: params })
}

// 获取权限
export function APIgetPermissions(params) {
    return api.get('/member/permission', { baseURL: '/mock/', params: params })
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
