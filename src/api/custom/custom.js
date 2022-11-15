import api from '@/api/request.js'
/* --------------------------------------------------------------------------------------------------------------------- */
// 查看
export function APIgetCommentconfig(tgtid) {
    return api.get(`commentcfg/${tgtid}`)
}
// 修改
export function APIpostCommentconfig(tgtid, data) {
    return api.post(`commentcfg/${tgtid}`, data)
}
// 删除
export function APIdeleteCommentconfig(tgtid) {
    return api.delete(`commentcfg/${tgtid}`)
}
// 评论
// 列表
// export function APIgetCommentList(params) {
//     return api.get('/comment', params)
// }
export function APIgetCommentList(params) {
    return api.get('/comment', { params: params })
}
// 详情
export function APIgetCommentDetails(id) {
    return api.get(`comment/${id}`)
}
// // 删除
// export function APIdeleteAdComment(id) {
//     return api.delete(`comment/${id}`)
// }
// 修改
export function APIputComment(id, data) {
    return api.put(`comment/${id}`, data)
}
// 添加
export function APIpostComment(tgtid, data) {
    return api.post(`target/${tgtid}/comment`, data)
}
// 评论观点
// 添加
export function APIpostCommentOpinions(tgt, data) {
    return api.post(`/comment-tag/tgt/${tgt}`, data)
}
// 列表
export function APIgetCommentOpinions(tgt) {
    return api.get(`/comment-tag/tgt/${tgt}`)
}
// 修改
export function APIputCommentOpinions(id, data) {
    return api.put(`comment-tag/${id}`, data)
}
// 评论观点统计
export function APIpostCommentStatistic(data) {
    return api.post('/comment-tag-stat', data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 设备维修
// 列表
export function APIgetDeviceRepairList(params) {
    return api.get('d/repair', { params: params })
}
// 详情
export function APIgetDeviceRepairDetails(repair) {
    return api.get(`d/repair/${repair}`)
}
// 删除
export function APIdeleteDeviceRepair(repair) {
    return api.delete(`d/repair/${repair}`)
}
// 修改
export function APIputDeviceRepair(repair, data) {
    return api.put(`d/repair/${repair}`, data)
}
// 添加
export function APIpostDeviceRepair(data) {
    return api.post('d/repair', data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 设备档案
// 列表
export function APIgetDeviceArchiveList(params) {
    return api.get('d/archive', { params: params })
}
// 详情
export function APIgetDeviceArchiveDetails(archive) {
    return api.get(`d/archive/${archive}`)
}
// 删除
export function APIdeleteDeviceArchive(archive) {
    return api.delete(`d/archive/${archive}`)
}
// 修改
export function APIputDeviceArchive(archive, data) {
    return api.put(`d/archive/${archive}`, data)
}
// 添加
export function APIpostDeviceArchive(data) {
    return api.post('d/archive', data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 设备
// 列表
export function APIgetDeviceList(params) {
    return api.get('device', { params: params })
}
// 详情
export function APIgetDeviceDetails(device) {
    return api.get(`device/${device}`)
}
// 删除
export function APIdeleteDevice(device) {
    return api.delete(`device/${device}`)
}
// 修改
export function APIputDevice(device, data) {
    return api.put(`device/${device}`, data)
}
// 添加
export function APIpostDevice(data) {
    return api.post('device', data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 线下票
export function APIpostOfflineAdd(vote, data) {
    return api.post(`vote/${vote}/offlineticket`, data)
}
// 列表 Illegal
export function APIgetTicketList(vote, params) {
    return api.get(`vote/${vote}/ticket`, { params: params })
}
// 详情
export function APIgetTicketDetails(ticket) {
    return api.get(`ticket/${ticket}`)
}
// 删除
export function APIdeleteTicket(ticket) {
    return api.delete(`ticket/${ticket}`)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 设置违建
// 列表 Illegal
export function APIgetIllegalList(params) {
    return api.get('complaint-illegal', { params: params })
}
// 详情
export function APIgetIllegalDetails(illegal) {
    return api.get(`complaint-illegal/${illegal}`)
}
// 删除
export function APIdeleteIllegal(illegal) {
    return api.delete(`complaint-illegal/${illegal}`)
}
// 修改
export function APIputIllegal(illegal, data) {
    return api.put(`complaint-illegal/${illegal}`, data)
}
// 添加
export function APIpostIllegal(complaint, data) {
    return api.post(`complaint/${complaint}/illegal`, data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 处理
export function APIpostDealAdd(complaint, data) {
    return api.post(`complaint/${complaint}/deal`, data)
}
// 追问
// 列表
export function APIgetComplaintPlusList(params) {
    return api.get('/complaint-plus', { params: params })
}
// 审核
export function APIputComplaintPlus(id, data) {
    return api.put(`/complaint-plus/${id}`, data)
}
// 删除
export function APIdeleteComplaintPlus(id) {
    return api.delete(`/complaint-plus/${id}`)
}
// 添加
export function APIpostComplaintPlus(complaint, data) {
    return api.post(`/complaint/${complaint}/plus`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 修改内容
export function APIputDeal(deal, data) {
    return api.put(`complaint-deal/${deal}`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 修改状态
export function APIputAllot(allot, data) {
    return api.put(`complaint-allot/${allot}`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 转办
export function APIpostAllot(complaint, data) {
    return api.post(`complaint/${complaint}/allot`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 投诉
// 列表
export function APIgetComplaintList(params) {
    return api.get('complaint', { params: params })
}
// 详情
export function APIgetcomplaintDetail(complaint, data) {
    return api.get(`complaint/${complaint}`, data)
}
// 修改
export function APIputComplaint(complaint, data) {
    return api.put(`complaint/${complaint}`, data)
}
// 添加
export function APIpostComplaint(data) {
    return api.post('complaint', data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 点赞
// 列表
export function APIgetEntryMbrZanList(params) {
    return api.get('entrymbrzan', { params: params })
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 报名成员
// 列表
export function APIgetEntryMbrList(params) {
    return api.get('entrymbr', { params: params })
}
// 详情
export function APIgetEntryMbrDetails(entrymbr) {
    return api.get(`entrymbr/${entrymbr}`)
}
// 删除
export function APIdeleteEntryMbr(entrymbr) {
    return api.delete(`entrymbr/${entrymbr}`)
}
// 修改
export function APIputEntryMbr(entrymbr, data) {
    return api.put(`entrymbr/${entrymbr}`, data)
}
// 添加
export function APIpostEntryMbr(data) {
    return api.post('entrymbr', data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 设置报名
// 列表
export function APIgetEntryList(params) {
    return api.get('entry', { params: params })
}
// 详情
export function APIgetEntryDetails(entry) {
    return api.get(`entry/${entry}`)
}
// 删除
export function APIdeleteEntry(entry) {
    return api.delete(`entry/${entry}`)
}
// 修改
export function APIputEntry(entry, data) {
    return api.put(`entry/${entry}`, data)
}
// 添加
export function APIpostEntry(data) {
    return api.post('entry', data)
}
/* --------------------------------------------------------------------------------------------------------------------- */

// 设置投票房屋
// 获取参与投票的房屋所属的楼栋单元
export function APIgetVoteHouseUnit(vote, params) {
    return api.get(`vote/${vote}/bu`, { params: params })
}
// 获取投票事项下参与的房屋
export function APIgetVoteHouse(vote, params) {
    return api.get(`vote/${vote}/house`, { params: params })
}
// 删除
export function APIdeleteVoteHouse(vote) {
    return api.delete(`vote/${vote}/ticket`)
}
// 添加
export function APIpostVoteHouse(vote, data) {
    return api.post(`vote/${vote}/house`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */

// 设置投票选项
// 列表
export function APIgetVoteoptsList(params) {
    return api.get('voteopt', { params: params })
}
// 详情
export function APIgetVoteoptsDetails(voteopt) {
    return api.get(`voteopt/${voteopt}`)
}
// 删除
export function APIdeleteVoteopts(voteopt) {
    return api.delete(`voteopt/${voteopt}`)
}
// 修改
export function APIputVoteopts(voteopt, data) {
    return api.put(`voteopt/${voteopt}`, data)
}
// 添加
export function APIpostVoteopts(data) {
    return api.post('voteopt', data)
}
/* --------------------------------------------------------------------------------------------------------------------- */

// 设置投票
// 列表
export function APIgetVoteList(params) {
    return api.get('vote', { params: params })
}
// 详情
export function APIgetVoteDetails(vote) {
    return api.get(`vote/${vote}`)
}
// 删除
export function APIdeleteVote(vote) {
    return api.delete(`vote/${vote}`)
}
// 修改
export function APIputVote(vote, data) {
    return api.put(`vote/${vote}`, data)
}
// 添加
export function APIpostVote(data) {
    return api.post('vote', data)
}
/* --------------------------------------------------------------------------------------------------------------------- */

// 设置步骤组
export function APIpostFlowstepgroup(data) {
    return api.post('flowstepgroup', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 流程事件
// 列表
export function APIgetFlowworkEventList(flowwork, params) {
    return api.get(`flowwork/${flowwork}/item`, { params: params })
}
// 保存
export function APIpostFlowworkEventSave(flowwork, data) {
    return api.post(`flowwork/${flowwork}/item`, data)
}
// 提交
export function APIpostFlowworkEventUpdate(flowwork, data) {
    return api.post(`flowwork/${flowwork}/next`, data)
}
// 返回事项进度
export function APIpostFlowworkEventSpeed(flowwork, data) {
    return api.post(`flowwork/${flowwork}/back`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 制定流程
// 列表
export function APIgetFlowworkList(params) {
    return api.get('flowwork', { params: params })
}
// 详情
export function APIgetFlowworkDetails(id) {
    return api.get(`flowwork/${id}`)
}
// 删除
export function APIdeleteFlowwork(id) {
    return api.delete(`flowwork/${id}`)
}
// 添加
export function APIpostFlowwork(flow, data) {
    return api.post(`flow/${flow}/work`, data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 流程的步骤
// 列表
export function APIgetStepList(flow, params) {
    return api.get(`v2/flow/${flow}/step`, { params: params })
}
// 详情
export function APIgetStepDetails(step) {
    return api.get(`flowstep/${step}`)
}
// 删除
export function APIdeleteStep(flow, id) {
    return api.delete(`v2/flow/${flow}/step/${id}`)
}
// 修改
export function APIputStep(flow, id, data) {
    return api.put(`v2/flow/${flow}/step/${id}`, data)
}
// 添加
export function APIpostStep(flow, data) {
    return api.post(`v2/flow/${flow}/step`, data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 制定流程
// 列表
export function APIgetFlowList(params) {
    return api.get('v2/flow', { params: params })
}
// 详情
export function APIgetFlowDetails(id) {
    return api.get(`v2/flow/${id}`)
}
// 删除
export function APIdeleteFlow(id) {
    return api.delete(`v2/flow/${id}`)
}
// 修改
export function APIputFlow(id, data) {
    return api.put(`v2/flow/${id}`, data)
}
// 添加
export function APIpostFlow(data) {
    return api.post('v2/flow', data)
}

// 业委会成员
// 列表
export function APIgetListYwhUser(ywh, params) {
    return api.get(`/ywh/${ywh}/user`, { params: params })
}
// 删除
export function APIdeleteYwhUser(ywh, id) {
    return api.delete(`/ywh/${ywh}/user/${id}`)
}
// 修改
export function APIputYwhUser(ywh, id, data) {
    return api.put(`/ywh/${ywh}/user/${id}`, data)
}
// 添加
export function APIpostYwhUser(ywh, data) {
    return api.post(`/ywh/${ywh}/user`, data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 业委会
// 列表
export function APIgetListYwh(params) {
    return api.get('/ywh', { params: params })
}
// 详情
export function APIgetDetailsYwh(id) {
    return api.get('/ywh/' + id)
}
// 删除
export function APIdeleteYwh(id) {
    return api.delete('/ywh/' + id)
}
// 修改
export function APIputYwh(id, data) {
    return api.put('/ywh/' + id, data)
}
// 添加
export function APIpostYwh(data) {
    return api.post('/ywh', data)
}
// 激活
export function APIputYwhActive(ywh, data) {
    return api.put(`/ywh/${ywh}/active`, data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 公示审核  /api/a/article/{article}/audit
// 列表
export function APIgetListArchiveAudit(params) {
    return api.get('/a-audit', { params: params })
}
// 详情
export function APIgetDetailsArchiveAudit(id) {
    return api.get(`/a-audit/${id}`)
}
// 发起审核
export function APIpostArchiveAudit(data) {
    return api.post('/a-audit', data)
}
// 审核操作
export function APIputArchiveAudit(id, data) {
    return api.put(`/a-audit/${id}`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 公示归档
// 列表
export function APIgetListArchiveArticle(params) {
    return api.get('/a/archive/', { params: params })
}
// 详情
export function APIgetDetailsArchiveArticle(archive, article) {
    return api.get(`/a/archive/${archive}/article/${article}`)
}
// 添加
export function APIpostArchiveArticle(archive, data) {
    return api.post(`/a/archive/${archive}/article`, data)
}
// 删除
export function APIdeleteArchiveArticle(archive, article) {
    return api.delete(`/a/archive/${archive}/article/${article}`)
}
// 所属档案的公示的列表
export function APIgetListArticleArchive(archive, params) {
    return api.get(`/a/archive/${archive}/announce`, { params: params })
}
export function APIpostArticleArchive(archive, data) {
    return api.post(`/a/archive/${archive}/announce`, data)
}
export function APIdeleteArticleArchive(archive, aid) {
    return api.delete(`a/archive/${archive}/announce/${aid}`)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 公示阅读 /api/a/ Articleread
// 列表
export function APIgetArticlereadList(params) {
    return api.get('/a/articleread', { params: params })
}
// 添加
export function APIpostArticleread(data) {
    return api.post('/a/articleread', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 公示任务
// 列表
export function APIgetTaskList(params) {
    return api.get('/a/task', { params: params })
}
// 详情
export function APIgetTaskDetails(id) {
    return api.get('/a/task/' + id)
}
// 删除
export function APIdeleteTask(id) {
    return api.delete('/a/task/' + id)
}
// 修改
export function APIputTask(id, data) {
    return api.put('/a/task/' + id, data)
}
// 添加
export function APIpostTask(data) {
    return api.post('/a/task', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 任务派发 /api/a/tasksd
// 列表
export function APIgetTasksdList(params) {
    return api.get('/a/task-fac', { params: params })
}
// 详情
export function APIgetTasksdDetails(id) {
    return api.get(`/a/task-fac/${id}`)
}
// 删除
export function APIdeleteTasksd(id) {
    return api.delete(`/a/task-fac/${id}`)
}
// 修改
export function APIputTasksd(id, data) {
    return api.put(`/a/task-fac/${id}`, data)
}
// 添加
export function APIpostTasksd(data) {
    return api.post('/a/task-fac', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 公示
// 列表
export function APIgetEventArticleList(params) {
    return api.get('/announce', { params: params })
}
// 详情
export function APIgetEventArticleDetails(id) {
    return api.get(`/announce/${id}`)
}
// 删除
export function APIdeleteEventArticle(id) {
    return api.delete(`/announce/${id}`)
}
// 修改
export function APIputEventArticle(id, data) {
    return api.put(`/announce/${id}`, data)
}
// 添加
export function APIpostEventArticle(data) {
    return api.post('/announce', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 资源 Step APIpostFiles
// 列表
export function APIgetFileList(params) {
    return api.get('/file', { params: params })
}
// 删除
export function APIdeleteFile(id) {
    return api.delete(`/file/${id}`)
}
// 添加
export function APIpostFileList(data) {
    return api.post('/file', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 公示 模板 Articletpl /api/a/
// 列表
export function APIgetArticletplList(params) {
    return api.get('/a/tpl', { params: params })
}
// 详情
export function APIgetArticletplDetails(id) {
    return api.get('/a/tpl/' + id)
}
// 删除
export function APIdeleteArticletpl(id) {
    return api.delete('/a/tpl/' + id)
}
// 修改
export function APIputArticletpl(id, data) {
    return api.put('/a/tpl/' + id, data)
}
// 添加
export function APIpostArticletpl(data) {
    return api.post('/a/tpl', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 公示
// 列表
export function APIgetArticleList(params) {
    return api.get('/a/article', { params: params })
}
// 详情
export function APIgetArticleDetails(id) {
    return api.get('/a/article' + id)
}
// 删除
export function APIdeleteArticle(id) {
    return api.delete('/a/article' + id)
}
// 修改
export function APIputArticle(id, data) {
    return api.put('/a/article' + id, data)
}
// 添加
export function APIpostArticle(data) {
    return api.post('/a/article', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 档案
// 列表
export function APIgetArchiveList(params) {
    return api.get('/a/archive', { params: params })
}
// 删除
export function APIdeleteArchive(id) {
    return api.delete(`/a/archive/${id}`)
}
// 修改
export function APIputArchive(id, data) {
    return api.put(`/a/archive/${id}`, data)
}
// 添加
export function APIpostArchive(data) {
    return api.post('/a/archive', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 中国区域接口
export function APIgetChinaRegion(params) {
    return api.get('/china', { params: params })
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 导入房屋任务列表
export function APIgetFilesList(params) {
    return api.get('/houseimptask', { params: params })
}
export function APIpostFilesList(data) {
    return api.post('/houseimptask', data)
}
// 资讯
// 资讯类别管理列表
export function APIgetInforCategoryList(params) {
    return api.get('/newscate', { params: params })
}
// 资讯类别管理添加

export function APIpostInforCategory(data) {
    return api.post('/newscate', data)
}
// 资讯类别管理修改
export function APIputInforCategory(id, data) {
    return api.put(`/newscate/${id}`, data)
}
// 资讯类别管理删除
export function APIdeleteInforCategory(id) {
    return api.delete(`/newscate/${id}`)
}

// 资讯管理列表
export function APIgetInforManageList(params) {
    return api.get('/news', { params: params })
}
// 资讯管理详情
export function APIgetInforManageDetails(id) {
    return api.get(`/news/${id}`)
}
// 资讯管理添加
export function APIpostInforManage(data) {
    return api.post('/news', data)
}
// 资讯管理修改
export function APIputInforManage(id, data) {
    return api.put(`/news/${id}`, data)
}
// 资讯管理删除
export function APIdeleteInforManage(id) {
    return api.delete(`/news/${id}`)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 备案
export function APIgetRecordList(params) {
    return api.get('/filing', { params: params })
}
export function APIpostRecord(data) {
    return api.post('/filing', data)
}
export function APIputRecord(id, data) {
    return api.put(`/filing/${id}`, data)
}
export function APIdeleteRecord(id) {
    return api.delete(`/filing/${id}`)
}
export function APIgetRecordDetail(id) {
    return api.get(`/filing/${id}`)
}
/* --------------------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------------------- */
// 文件上传获取配置 { 'folder': import.meta.env.VITE_APP_FOLDER_ADDHOUSE, 'number': 1 }
export function APIpostFiles(data) {
    return api.post('/blob/form', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 用户组成员 /api/ccgroup/{gid}/user
export function APIgetGroupUserList(gid, params) {
    return api.get(`/groups/${gid}/users`, { params: params })
}
// 删除
export function APIdeleteGroupUser(gid, uid) {
    return api.delete(`/groups/${gid}/users/${uid}`)
}
// 修改
export function APIputGroupUser(gid, uid, data) {
    return api.put(`/groups/${gid}/users/${uid}`, data)
}
// 添加
export function APIpostGroupUser(gid, data) {
    return api.post(`/groups/${gid}/users`, data)
}
// 详情
export function APIgetGroupUserDetails(gid, data) {
    return api.get(`/groups/${gid}/users`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 组成员角色
export function APIgetGroupUser_Roles(gid, uid) {
    return api.get(`/groups/${gid}/users/${uid}/roles`)
}
export function APIpostGroupUser_Roles(gid, uid, data) {
    return api.post(`/groups/${gid}/users/${uid}/roles`, data)
}
export function APIdeleteGroupUser_Roles(gid, uid, data) {
    return api.delete(`/groups/${gid}/users/${uid}/roles`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------------------- */
// 用户组成员权限
export function APIgetGroupUser_perms(group, user) {
    return api.get(`/groups/${group}/users/${user}/perms`)
}
export function APIpostGroupUser_perms(group, user, data) {
    return api.post(`/groups/${group}/users/${user}/perms`, data)
}
export function APIdeleteGroupUser_perms(group, user, data) {
    return api.delete(`/groups/${group}/users/${user}/perms`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 权限管理
export function APIgetPermsList(params) {
    return api.get('/perms', { params: params })
}
export function APIgetPermsDetail(perm) {
    return api.get(`/perms/${perm}`)
}
export function APIpostPerms(data) {
    return api.post('/perms', data)
}
export function APIputPerms(id, data) {
    return api.put(`/perms/${id}`, data)
}
export function APIdeletePerms(id) {
    return api.delete(`/perms/${id}`)
}
// 获取权限被赋予到的所有角色
export function APIgetPerms_Roles(pid) {
    return api.get(`/perms/${pid}/roles`)
}
// 将权限赋予给角色
export function APIpostPerms_Roles(pid, rid) {
    return api.post(`/perms/${pid}/roles`, rid)
}
// 权限移除角色
export function APIdeletePerms_Roles(pid, rid) {
    return api.delete(`/perms/${pid}/roles`, rid)
}
/* --------------------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------------------- */
// 用户组角色
export function APIgetGroupRolesList(gid) {
    return api.get(`/groups/${gid}/roles`)
}
export function APIpostGroupRoles(gid, data) {
    return api.post(`/groups/${gid}/roles`, data)
}
export function APIdeleteGroupRoles(gid, data) {
    return api.delete(`/groups/${gid}/roles`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 角色管理
export function APIgetRolesList(params) {
    return api.get('/roles', { params: params })
}
export function APIgetRolesDetail(role) {
    return api.get(`/roles/${role}`)
}
export function APIpostRoles(data) {
    return api.post('/roles', data)
}
export function APIputRoles(id, data) {
    return api.put(`/roles/${id}`, data)
}
export function APIDeleteRoles(id) {
    return api.delete(`/roles/${id}`)
}
export function APIgetRoles_perms(role) {
    return api.get(`/roles/${role}/perms`)
}
export function APIpostRoles_perms(role, data) {
    return api.post(`/roles/${role}/perms`, data)
}
export function APIdeleteRoles_perms(role, data) {
    return api.delete(`/roles/${role}/perms`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------------------- */
// 用户组 /api/cc/{cc}/group
// 列表
export function APIgetGroupList(params) {
    return api.get('/groups', { params: params })
}
// 删除
export function APIdeleteGroup(id) {
    return api.delete(`/groups/${id}`)
}
// 修改
export function APIputGroup(id, data) {
    return api.put(`/groups/${id}`, data)
}
// 添加
export function APIpostGroup(data) {
    return api.post('/groups', data)
}
// 详情
export function APIgetGroupDetails(id) {
    return api.get(`/groups/${id}`)
}
// 用户组权限
export function APIgetGroupPerms(gid) {
    return api.get(`/groups/${gid}/perms`)
}
export function APIpostGroupPerms(gid, data) {
    return api.post(`/groups/${gid}/perms`, data)
}
export function APIdeleteGroupPerms(gid,data) {
    return api.delete(`/groups/${gid}/perms`,{data})
}
// // 获取角色拥有所有权限
// export function getRoles_perms(role) {
//     return api.get(`/roles/${role}/perms`)
// }
// export function payRoles_perms(role, data) {
//     return api.post(`/roles/${role}/perms`, data)
// }
// export function deleteRoles_perms(role, data) {
//     return api.delete(`/roles/${role}/perms`, data)
// }
/* --------------------------------------------------------------------------------------------------------------------- */
// 用户组 /api/cc/{cc}/group
// 列表

/* --------------------------------------------------------------------------------------------------------------------- */
// 类别
// 列表
export function APIgetTypeList(kind, params) {
    return api.get(`/kind/${kind}/cat`, { params: params })
}
// 删除
export function APIdeleteType(kind, id) {
    return api.delete(`/kind/${kind}/cat/${id}`)
}
// 修改
export function APIputType(kind, id, data) {
    return api.put(`/kind/${kind}/cat/${id}`, data)
}
// 添加
export function APIpostType(kind, data) {
    return api.post(`/kind/${kind}/cat`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// APP 管理
// 列表
export function APIgetAPPList(params) {
    return api.get('/apps', { params: params })
}
// 详情
export function APIgetAPPListDetails(id) {
    return api.get(`/apps/${id}`)
}
// 删除
export function APIdeleteAPP(id) {
    return api.delete(`/apps/${id}`)
}
// 修改
export function APIputAPP(id, data) {
    return api.put(`/apps/${id}`, data)
}
// 添加
export function APIpostAPP(data) {
    return api.post('/apps', data)
}
// APP 菜单管理
// 列表
export function APIgetAppMenuList(params) {
    return api.get('/appmenu', { params: params })
}
// 删除
export function APIdeleteAppMenu(id) {
    return api.delete(`/appmenu/${id}`)
}
// 修改
export function APIputAppMenu(id, data) {
    return api.put(`/appmenu/${id}`, data)
}
// 添加
export function APIpostAppMenu(data) {
    return api.post('/appmenu', data)
}
// APP 版本管理
// 列表
export function APIgetAppVersionList(params) {
    return api.get('/appversion', { params: params })
}
// 删除
export function APIdeleteAppVersion(id) {
    return api.delete(`/appversion/${id}`)
}
// 修改
export function APIputAppVersion(id, data) {
    return api.put(`/appversion/${id}`, data)
}
// 添加
export function APIpostAppVersion(data) {
    return api.post('/appversion', data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 企业
// 列表
export function APIgetEnterpriseList(params) {
    return api.get('/com', { params: params })
}
// 详情
export function APIgetEnterpriseDetails(id) {
    return api.get('/com/' + id)
}
// 删除
export function APIdeleteEnterprise(id) {
    return api.delete('/com/' + id)
}
// 修改
export function APIputEnterprise(id, data) {
    return api.put('/com/' + id, data)
}
// 添加
export function APIpostEnterprise(data) {
    return api.post('/com', data)
}
// 企业端
// 添加
export function APIpostEnterpriseApply(data) {
    return api.post('/me/lic-com-apply', data)
}
// 详情
export function APIgetEnterpriseApplyDetails(apply) {
    return api.get(`/com-apply/${apply}`)
}
// 审核
export function APIpostEnterpriseExamine(apply, data) {
    return api.post(`com-apply-audit/${apply}`, data)
}
// +管理端申请列表
export function APIgetEnterpriseApplyList(params) {
    return api.get('/com-apply', { params: params })
}
export function APIgetEnterpriseApplyDetailsList(apply) {
    return api.get(`/com-apply/${apply}`)
}
// 添加
export function APIpostAmageApply(apply, data) {
    return api.post(`com-apply-audit/${apply}`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 用户
// 列表
export function APIgetUserList(params) {
    return api.get('/users', { params: params })
}
// 详情
export function APIgetUserDetails(id) {
    return api.get('/users/' + id)
}
// 删除
export function APIdeleteUser(type, id) {
    return api.delete(`/account/${type}/${id}`)
}
// 修改
export function APIputUser(id, data) {
    return api.put(`/user/${id}/account`, data)
}
// 添加
export function APIpostUser(type, data) {
    return api.post(`/user-account/${type}`, data)
}
// 获取业主身份的权限
export function APIgetloginUserPerms() {
    return api.get('/me/mbr-perms')
}
// 获取我的所在用户组
export function APIgetLoginUserGroup() {
    return api.get('/me/groups')
}
// 获取所在用户组权限
export function APIgetLoginUserGroupPerms(params) {
    return api.get('/me/group-perms', { params: params })
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 产权
// 列表
export function APIgetPropertyList(params) {
    return api.get('/house-property', { params: params })
}
// 详情
export function APIgetPropertyDetails(log) {
    return api.get(`/house-property/${log}`)
}
// 删除
export function APIdeleteProperty(log) {
    return api.delete(`/house-property/${log}`)
}
// 修改
export function APIputProperty(id, data) {
    return api.put(`/house-property/${id}`, data)
}
// 添加
export function APIpostProperty(data) {
    return api.post('/house-property', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// china
// 获取可服务的城市
export function APIgetCityNotPm() {
    return api.get('/srv-city')
}
// 列表
export function APIgetChinaList(params) {
    return api.get('china', { params: params })
}
// 详情
export function APIgetChinaDetails(id) {
    return api.get('/china/' + id)
}
// 删除
export function APIdeleteChina(id) {
    return api.delete('/china/' + id)
}
// 修改
export function APIputChina(id, data) {
    return api.put('/china/' + id, data)
}
// 添加
export function APIpostChina(data) {
    return api.post('/china', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 单元
// 列表
export function APIgetCityList(params) {
    return api.get('/city-conf', { params: params })
}
// 详情
export function APIgetCityDetails(id) {
    return api.get('/city-conf/' + id)
}
// 删除
export function APIdeleteCity(id) {
    return api.delete('/city-conf/' + id)
}
// 修改
export function APIputCity(id, data) {
    return api.put('/city-conf/' + id, data)
}
// 添加
export function APIpostCity(data) {
    return api.post('/city-conf', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 获取配置选项
// 获取列表
export function APIpostGetOpts(data) {
    return api.post('/optitem', data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 配置选项
// 列表
export function APIgetOptsValList(params) {
    return api.get('/sysoptitem', { params: params })
}
// 删除
export function APIdeleteOptsVal(id) {
    return api.delete('/sysoptitem/' + id)
}
// 修改
export function APIputOptsVal(id, data) {
    return api.put('/sysoptitem/' + id, data)
}
// 添加
export function APIpostOptsVal(data) {
    return api.post('/sysoptitem', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 配置
// 列表
export function APIgetOptsList(params) {
    return api.get('/sysopt', { params: params })
}
// 删除
export function APIdeleteOpts(id) {
    return api.delete('/sysopt/' + id)
}
// 修改
export function APIputOpts(id, data) {
    return api.put('/sysopt/' + id, data)
}
// 添加
export function APIpostOpts(data) {
    return api.post('/sysopt', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 房屋
// 列表
export function APIgetHouseListSort(params) {
    return api.get('/houses-able', { params: params })
}
// 列表
export function APIgetHouseListHouse(params) {
    return api.get('/houses', { params: params })
}
// 详情
export function APIgetHouseDetailsHouse(id) {
    return api.get('/houses/' + id)
}
// 删除
export function APIdeleteHouseHouse(id) {
    return api.delete('/houses/' + id)
}
// 删除楼栋或单元下的房屋
export function APIdeleteHouseAbleHouse(data) {
    return api.delete('/houses-able', {data})
}
// 修改
export function APIputHouseHouse(id, data) {
    return api.put('/houses/' + id, data)
}
// 添加
export function APIpostHouseHouse(data) {
    return api.post('/houses', data)
}
// 批量修改
export function APIputAllHouseHouse(data) {
    return api.put('/houses-batch', data)
}
// 房屋成员
// 列表
export function APIgetHouseNumbersSort(params) {
    return api.get('/house-user', { params: params })
}
// 添加
export function APIpostHouseNumbers(data) {
    return api.post('/house-user', data)
}
// 删除
export function APIdeleteHouseNumbers(data) {
    return api.delete('/house-user', data)
}
// 房屋绑定申请
// 列表
export function APIgetHouseBind(params) {
    return api.get('/house-bind', { params: params })
}
// 详情
export function APIgetHouseBindDetails(id) {
    return api.get(`/house-bind/${id}`)
}
// 修改
export function APIputHouseBind(id, data) {
    return api.put(`/house-bind/${id}`, data)
}
// 添加
export function APIpostHouseBind(data) {
    return api.post('/house-bind', data)
}
// 删除
export function APIdeleteHouseBind(id, data) {
    return api.delete(`/house-bind/${id}`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 单元
// 列表
export function APIgetUnitsListHouse(params) {
    return api.get('/units', { params: params })
}
// 详情
export function APIgetUnitsDetailsHouse(id) {
    return api.get('/units/' + id)
}
// 删除
export function APIdeleteUnitsHouse(id) {
    return api.delete('/units/' + id)
}
// 修改
export function APIputUnitsHouse(id, data) {
    return api.put('/units/' + id, data)
}
// 添加
export function APIpostUnitsHouse(data) {
    return api.post('/units', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 楼栋
// 列表
export function APIgetBuildListHouse(params) {
    return api.get('/buildings', { params: params })
}
// 详情
export function APIgetBuildDetailsHouse(id) {
    return api.get('/buildings/' + id)
}
// 删除
export function APIdeleteBuildHouse(id) {
    return api.delete('/buildings/' + id)
}
// 修改
export function APIputBuildHouse(id, data) {
    return api.put('/buildings/' + id, data)
}
// 添加
export function APIpostBuildHouse(data) {
    return api.post('/buildings', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 小区
// 列表
export function APIgetResidentialListHouse(params) {
    return api.get('/zones', { params: params })
}
// 详情
export function APIgetResidentialDetailsHouse(id) {
    return api.get('/zones/' + id)
}
// 删除
export function APIdeleteResidentialHouse(id) {
    return api.delete('/zones/' + id)
}
// 修改
export function APIputResidentialHouse(id, data) {
    return api.put('/zones/' + id, data)
}
// 添加
export function APIpostResidentialHouse(data) {
    return api.post('/zones', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 申请 小区
// 列表
export function APIgetResidentialList(params) {
    return api.get('/zone-com-apply', { params: params })
}
// 详情
export function APIgetResidentialDetails(id) {
    return api.get('/zone-com-apply/' + id)
}
// 审批
export function APIputResidential(id, data) {
    return api.put('/zone-com-apply/' + id, data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 申请 平台
// 列表
export function APIgetPlatformList(params) {
    return api.get('/pt/company-apply', { params: params })
}
// 详情
export function APIgetPlatformDetails(id) {
    return api.get('/pt/company-apply/' + id)
}
// 审批
export function APIputPlatform(id, data) {
    return api.put('/pt/company-apply/' + id, data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 登录
// 登录
export function APIlogin(data) {
    return api.post('local-login', data)
}
// 修改密码？
export function APIeditPassword(data) {
    return api.put('/user/password', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 分类
export function APIpostkind(kind, data) {
    return api.post(`/kind/${kind}/cat`, data)
}
export function APIgetKindList(kind, params) {
    return api.get(`/kind/${kind}/cat`, { params: params })
}
export function APIputKind(kind, cat, data) {
    return api.put(`/kind/${kind}/cat/${cat}`, data)
}
export function APIdeleteKind(kind, cat) {
    return api.delete(`/kind/${kind}/cat/${cat}`)
}
/* --------------------------------------------------------------------------------------------------------------------- */
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
    return api.get('/me', { params: params })
    // return api.get('/user/me', { params: params })
}
// 修改个人信息
export function APIputUserinfo(data) {
    return api.put('/me/custom', data)
    // return api.get('/user/me', { params: params })
}
// 统计
export function APIgetAggregate(data) {
    return api.post('/aggregate', data)
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
/* --------------------------------------------------------------------------------------------------------------------- */
// 获取问卷列表
export function APIgetSurvey(params) {
    return api.get('/survey', { params: params })
}
// 添加问卷
export function APIaddSurvey(params) {
    return api.post('/survey', params)
}
// 删除问卷
export function APIdeleteSurvey(id) {
    return api.delete('/survey/' + id)
}
// 修改问卷信息
export function APImodifySurvey(id, data) {
    return api.put('/survey/' + id, data)
}
// 获得问卷详情
export function APIgetSurveyDetails(id) {
    return api.get('/survey/' + id)
}
// 修改问卷状态
export function APImodifySurveyStatus(id, data) {
    return api.put('/survey-status/' + id, data)
}

// 问卷设置范围列表
export function APIgetSurveyRange(params) {
    return api.get('/s/can', { params: params })
}

// 获取参与范围是房屋时上级
export function APIgetSurverRangeWhenHouse(params) {
    return api.get('/s-can-h-p', { params: params })
}
// // 问卷设置范围详情
// export function APIsetSurveyDetails(props) {
//     return api.get('/s/can/'+ props)
// }
// 添加问卷设置范围
export function APIaddSurveyRange(params) {
    return api.post('/s/can', params)
}
// // 删除问卷设置范围
export function APIdeleteSurveyRange(params) {
    return api.delete('/s/can', { params: params })
}

// 获取问卷题目列表
export function APIgetSurveyTopic(params) {
    return api.get('/s/topic', { params: params })
}
// 获取问卷题目详情
export function APIgetSurveyTopicDetail(props) {
    return api.get('/s/topic/' + props)
}
// 添加问卷题目
export function APIaddSurveyTopic(params) {
    return api.post('/s/topic/', params)
}
// 修改问卷题目
export function APImodifySurveyTopic(id, props) {
    return api.put('/s/topic/' + id, props)
}
// 删除问卷题目
export function APIdeleteSurveyTopic(props) {
    return api.delete('/s/topic/' + props)
}

// 获取答卷管理列表
export function APIgetSurveyAnswerList(id, params) {
    return api.get('/s/' + id + '/answer', { params: params })
}
// 获取答卷管理详情
export function APIgetSurveyAnswerDetail(id) {
    return api.get('/s/answer/' + id)
}
// 删除答卷
export function APIdeleteSurveyAnswerDetail(id) {
    return api.delete('/s/answer/' + id)
}
// 获取答卷的参与房屋
export function APIgetSurveyAnswerHouse(id,params) {
    return api.get('/s/answer-house/'+id, { params: params })
}
// 录入线下参与答卷
export function APIaddSurveyAnswer(id, params) {
    return api.post('/s/' + id + '/answer', params)
}
// 获取未参与答卷的房屋
export function APIgetNotParticipate(id, params) {
    return api.get('/s/' + id + '/doesnt', { params: params })
}
// 获取活动统计结果
export function APIgetSurveyStatus(survey) {
    return api.get(`/s/${survey}/stat`)
}
// 修改活动统计数据
export function APImodifySurveyResultStatus(survey,props) {
    return api.put(`/s/${survey}/stat`,props)
}
// 修改活动统计数据
export function APIrefreshSurveyStatus(survey) {
    return api.put(`/s/${survey}/stat-refresh`)
}
// 事件脉络
// 事件
// 列表
export function APIgetActivityEventList(params) {
    return api.get('/vein', { params: params })
}
// 详情
export function APIgetActivityEventDetails(id) {
    return api.get(`/vein/${id}`)
}
// 删除
export function APIdeleteActivityEvent(id) {
    return api.delete(`/vein/${id}`)
}
// 修改
export function APIputActivityEvent(id, data) {
    return api.put(`/vein/${id}`, data)
}
// 添加
export function APIpostActivityEvent(data) {
    return api.post('/vein', data)
}
// 事件活动
export function APIgetActivitiesEventList(vein, params) {
    return api.get(`/vein/${vein}/docs`, { params: params })
}
// 删除
export function APIdeleteActivitiesEvent(vein, data) {
    return api.delete(`/vein/${vein}/docs`, data)
}
// 添加
export function APIpostActivitiesEvent(vein, data) {
    return api.post(`/vein/${vein}/docs`, data)
}
// 访问记录
export function APIRecordList(params) {
    return api.get('/visitlog', { params: params })
}
// 人员管理
export function APIgetPersonnelManageList(params) {
    return api.get('/people', { params: params })
}
// 详情
export function APIgetPersonnelManageDetails(id) {
    return api.get(`/people/${id}`)
}
// 删除
export function APIdeletePersonnelManage(id) {
    return api.delete(`/people/${id}`)
}
// 修改
export function APIputPersonnelManage(id, data) {
    return api.put(`/people/${id}`, data)
}
// 添加
export function APIpostPersonnelManage(data) {
    return api.post('/people', data)
}
// 房屋导入任务
export function APIgetHouseimptpl() {
    return api.get('/houseimptpl')
}
// 人员导入任务
export function APIgetPersonimptpl() {
    return api.get('/personimptpl')
}
// 系统标签库管理
export function APIgetPersonnelLabels(params) {
    return api.get('/systag', { params: params })
}
export function APIdeletePersonnelLabels(data) {
    return api.delete('/systag', data)
}
export function APIpostPersonnelLabels(data) {
    return api.post('/systag', data)
}
// 对象标签
export function APIpostPersonnelTag(data) {
    return api.post('/tag', data)
}
export function APIgetPersonnelTag(params) {
    return api.get('/tag', { params: params })
}
export function APIgetPersonnelTaglog(params) {
    return api.get('/taglog', { params: params })
}
// 人员导入
export function APIgetPersonimptask(params) {
    return api.get('/personimptask', { params: params })
}
// 模板
export function APIgetPersonimptpl_1() {
    return api.get('/personimptpl')
}
export function APIpostPersonimptask(data) {
    return api.post('/personimptask', data)
}
export function APIdeletePersonimptask(id) {
    return api.delete(`/personimptask/${id}`)
}
// 共享
// 共享业务种类
export function APIgetShareCategoryList(params) {
    return api.get('/share/kind', { params: params })
}
// 正常使用的共享业务种类
export function APIgetShareActiveCategoryList() {
    return api.get('/share/kind-active-all')
}
// 获取种类下的所有业务数据
export function APIgetShareAllMaterialData(params) {
    return api.get('/share/kind-all-biz-data', { params: params })
}
// 删除
export function APIdeleteShareCategory(id) {
    return api.delete(`/share/kind/${id}`)
}
// 修改
export function APIputShareCategory(id, data) {
    return api.put(`/share/kind/${id}`, data)
}
// 添加
export function APIpostShareCategory(data) {
    return api.post('/share/kind', data)
}
// 为种类划分部门
// 添加
export function APIgetShareCategoryUserGroupList(params) {
    return api.get('/share/kind-group', { params: params })
}
export function APIpostShareCategoryUserGroup(data) {
    return api.post('/share/kind-group', data)
}
// 删除
export function APIdeleteShareCategoryUserGroup(params) {
    return api.delete('/share/kind-group', { params: params })
}
// 业务
export function APIgetShareServicesList(params) {
    return api.get('/share/biz', { params: params })
}
// 删除
export function APIdeleteShareServices(id) {
    return api.delete(`/share/biz/${id}`)
}
// 修改
export function APIputShareServices(id, data) {
    return api.put(`/share/biz/${id}`, data)
}
// 添加
export function APIpostShareServices(data) {
    return api.post('/share/biz', data)
}
// 业务材料
export function APIgetShareMaterialList(params) {
    return api.get('/share/biz-material', { params: params })
}
// 删除
export function APIdeleteShareMaterial(id) {
    return api.delete(`/share/biz-material/${id}`)
}
// 修改
export function APIputShareMaterial(id, data) {
    return api.put(`/share/biz-material/${id}`, data)
}
// 添加
export function APIpostShareMaterial(data) {
    return api.post('/share/biz-material', data)
}
// 业务要件
export function APIgetShareElementsList(params) {
    return api.get('/share/file', { params: params })
}
// 删除
export function APIdeleteShareElements(id) {
    return api.delete(`/share/file/${id}`)
}
// 修改
export function APIputShareElements(id, data) {
    return api.put(`/share/file/${id}`, data)
}
// 添加
export function APIpostShareElements(data) {
    return api.post('/share/file', data)
}
// 共享记录
export function APIgetShareDataList(params) {
    return api.get('/share/record', { params: params })
}
// 详情
export function APIgetShareDataDetails(id) {
    return api.get(`/share/record/${id}`)
}
// 共享记录下的所有材料
export function APIgetShareDataMaterialList(params) {
    return api.get('/share/record-material', { params: params })
}
// 补充
export function APIputShareDataMaterial(id, data) {
    return api.put(`/share/record-material/${id}`, data)
}
// // 删除
// export function APIdeleteShareData(id) {
//     return api.delete(`/share/record/${id}`)
// }
// // 修改
// export function APIputShareData(id, data) {
//     return api.put(`/share/record/${id}`, data)
// }
// // 添加
// export function APIpostShareData(data) {
//     return api.post('/share/record', data)
// }
