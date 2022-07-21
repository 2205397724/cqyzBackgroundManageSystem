import api from '@/api/index.js'
import api2 from '@/api/index2.js'
import api9 from '@/api/index9.js'
/* --------------------------------------------------------------------------------------------------------------------- */
// 查看
export function APIgetAdCommentList(tgtid) {
    return api9.get(`commentcfg/${tgtid}`)
}
// 修改
export function APIpostAdComment(tgtid, data) {
    return api2.post(`commentcfg/${tgtid}`, data)
}
// 删除
export function APIdeleteAdComment(tgtid) {
    return api2.delete(`commentcfg/${tgtid}`)
}
// 评论
// 列表
export function APIgetCommentList(params) {
    return api2.get('/comment', params)
}
// 详情
export function APIgetCommentDetails(id) {
    return api2.get(`comment/${id}`)
}
// 删除
export function APIdeleteComment(id) {
    return api2.delete(`comment/${id}`)
}
// 修改
export function APIputComment(id, data) {
    return api2.put(`comment/${id}`, data)
}
// 添加
export function APIpostComment(tgtid, data) {
    return api2.post(`target/${tgtid}/comment`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 设备维修
// 列表
export function APIgetDeviceRepairList(params) {
    return api2.get('d/repair', { params: params })
}
// 详情
export function APIgetDeviceRepairDetails(repair) {
    return api2.get(`d/repair/${repair}`)
}
// 删除
export function APIdeleteDeviceRepair(repair) {
    return api2.delete(`d/repair/${repair}`)
}
// 修改
export function APIputDeviceRepair(repair, data) {
    return api2.put(`d/repair/${repair}`, data)
}
// 添加
export function APIpostDeviceRepair(data) {
    return api2.post('d/repair', data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 设备档案
// 列表
export function APIgetDeviceArchiveList(params) {
    return api2.get('d/archive', { params: params })
}
// 详情
export function APIgetDeviceArchiveDetails(archive) {
    return api2.get(`d/archive/${archive}`)
}
// 删除
export function APIdeleteDeviceArchive(archive) {
    return api2.delete(`d/archive/${archive}`)
}
// 修改
export function APIputDeviceArchive(archive, data) {
    return api2.put(`d/archive/${archive}`, data)
}
// 添加
export function APIpostDeviceArchive(data) {
    return api2.post('d/archive', data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 设备
// 列表
export function APIgetDeviceList(params) {
    return api2.get('device', { params: params })
}
// 详情
export function APIgetDeviceDetails(device) {
    return api2.get(`device/${device}`)
}
// 删除
export function APIdeleteDevice(device) {
    return api2.delete(`device/${device}`)
}
// 修改
export function APIputDevice(device, data) {
    return api2.put(`device/${device}`, data)
}
// 添加
export function APIpostDevice(data) {
    return api2.post('device', data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 线下票
export function APIpostOfflineAdd(vote, data) {
    return api2.post(`vote/${vote}/offlineticket`, data)
}
// 列表 Illegal
export function APIgetTicketList(vote, params) {
    return api2.get(`vote/${vote}/ticket`, { params: params })
}
// 详情
export function APIgetTicketDetails(ticket) {
    return api2.get(`ticket/${ticket}`)
}
// 删除
export function APIdeleteTicket(ticket) {
    return api2.delete(`ticket/${ticket}`)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 设置违建
// 列表 Illegal
export function APIgetIllegalList(params) {
    return api2.get('complaint-illegal', { params: params })
}
// 详情
export function APIgetIllegalDetails(illegal) {
    return api2.get(`complaint-illegal/${illegal}`)
}
// 删除
export function APIdeleteIllegal(illegal) {
    return api2.delete(`complaint-illegal/${illegal}`)
}
// 修改
export function APIputIllegal(illegal, data) {
    return api2.put(`complaint-illegal/${illegal}`, data)
}
// 添加
export function APIpostIllegal(complaint, data) {
    return api2.post(`complaint/${complaint}/illegal`, data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 处理
export function APIpostDealAdd(complaint, data) {
    return api2.post(`complaint/${complaint}/deal`, data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 修改内容
export function APIputDeal(deal, data) {
    return api2.put(`complaint-deal/${deal}`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 修改状态
export function APIputAllot(allot, data) {
    return api2.put(`complaint-allot/${allot}`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 转办
export function APIpostAllot(complaint, data) {
    return api2.post(`complaint/${complaint}/allot`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 投诉
// 列表
export function APIgetComplaintList(params) {
    return api2.get('complaint', { params: params })
}
// 详情
export function APIgetComplaintDetails(complaint, data) {
    return api2.get(`complaint/${complaint}`, data)
}
// 修改
export function APIputComplaint(complaint, data) {
    return api2.put(`complaint/${complaint}`, data)
}
// 添加
export function APIpostComplaint(data) {
    return api2.post('complaint', data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 点赞
// 列表
export function APIgetEntryMbrZanList(params) {
    return api2.get('entrymbrzan', { params: params })
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 报名成员
// 列表
export function APIgetEntryMbrList(params) {
    return api2.get('entrymbr', { params: params })
}
// 详情
export function APIgetEntryMbrDetails(entrymbr) {
    return api2.get(`entrymbr/${entrymbr}`)
}
// 删除
export function APIdeleteEntryMbr(entrymbr) {
    return api2.delete(`entrymbr/${entrymbr}`)
}
// 修改
export function APIputEntryMbr(entrymbr, data) {
    return api2.put(`entrymbr/${entrymbr}`, data)
}
// 添加
export function APIpostEntryMbr(data) {
    return api2.post('entrymbr', data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 设置报名
// 列表
export function APIgetEntryList(params) {
    return api2.get('entry', { params: params })
}
// 详情
export function APIgetEntryDetails(entry) {
    return api2.get(`entry/${entry}`)
}
// 删除
export function APIdeleteEntry(entry) {
    return api2.delete(`entry/${entry}`)
}
// 修改
export function APIputEntry(entry, data) {
    return api2.put(`entry/${entry}`, data)
}
// 添加
export function APIpostEntry(data) {
    return api2.post('entry', data)
}
/* --------------------------------------------------------------------------------------------------------------------- */

// 设置投票房屋
// 获取参与投票的房屋所属的楼栋单元
export function APIgetVoteHouseUnit(vote, params) {
    return api2.get(`vote/${vote}/bu`, { params: params })
}
// 获取投票事项下参与的房屋
export function APIgetVoteHouse(vote, params) {
    return api2.get(`vote/${vote}/house`, { params: params })
}
// 删除
export function APIdeleteVoteHouse(vote) {
    return api2.delete(`vote/${vote}/ticket`)
}
// 添加
export function APIpostVoteHouse(vote, data) {
    return api2.post(`vote/${vote}/house`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */

// 设置投票选项
// 列表
export function APIgetVoteoptsList(params) {
    return api2.get('voteopt', { params: params })
}
// 详情
export function APIgetVoteoptsDetails(voteopt) {
    return api2.get(`voteopt/${voteopt}`)
}
// 删除
export function APIdeleteVoteopts(voteopt) {
    return api2.delete(`voteopt/${voteopt}`)
}
// 修改
export function APIputVoteopts(voteopt, data) {
    return api2.put(`voteopt/${voteopt}`, data)
}
// 添加
export function APIpostVoteopts(data) {
    return api2.post('voteopt', data)
}
/* --------------------------------------------------------------------------------------------------------------------- */

// 设置投票
// 列表
export function APIgetVoteList(params) {
    return api2.get('vote', { params: params })
}
// 详情
export function APIgetVoteDetails(vote) {
    return api2.get(`vote/${vote}`)
}
// 删除
export function APIdeleteVote(vote) {
    return api2.delete(`vote/${vote}`)
}
// 修改
export function APIputVote(vote, data) {
    return api2.put(`vote/${vote}`, data)
}
// 添加
export function APIpostVote(data) {
    return api2.post('vote', data)
}
/* --------------------------------------------------------------------------------------------------------------------- */

// 设置步骤组
export function APIpostFlowstepgroup(data) {
    return api2.post('flowstepgroup', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 流程事件
// 列表
export function APIgetFlowworkEventList(flowwork, params) {
    return api2.get(`flowwork/${flowwork}/item`, { params: params })
}
// 保存
export function APIpostFlowworkEventSave(flowwork, data) {
    return api2.post(`flowwork/${flowwork}/item`, data)
}
// 提交
export function APIpostFlowworkEventUpdate(flowwork, data) {
    return api2.post(`flowwork/${flowwork}/next`, data)
}
// 返回事项进度
export function APIpostFlowworkEventSpeed(flowwork, data) {
    return api2.post(`flowwork/${flowwork}/back`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 制定流程
// 列表
export function APIgetFlowworkList(params) {
    return api2.get('flowwork', { params: params })
}
// 详情
export function APIgetFlowworkDetails(id) {
    return api2.get(`flowwork/${id}`)
}
// 删除
export function APIdeleteFlowwork(id) {
    return api2.delete(`flowwork/${id}`)
}
// 添加
export function APIpostFlowwork(flow, data) {
    return api2.post(`flow/${flow}/work`, data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 流程的步骤
// 列表
export function APIgetStepList(flow, params) {
    return api2.get(`v2/flow/${flow}/step`, { params: params })
}
// 详情
export function APIgetStepDetails(step) {
    return api2.get(`flowstep/${step}`)
}
// 删除
export function APIdeleteStep(flow, id) {
    return api2.delete(`v2/flow/${flow}/step/${id}`)
}
// 修改
export function APIputStep(flow, id, data) {
    return api2.put(`v2/flow/${flow}/step/${id}`, data)
}
// 添加
export function APIpostStep(flow, data) {
    return api2.post(`v2/flow/${flow}/step`, data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 制定流程
// 列表
export function APIgetFlowList(params) {
    return api2.get('v2/flow', { params: params })
}
// 详情
export function APIgetFlowDetails(id) {
    return api2.get(`v2/flow/${id}`)
}
// 删除
export function APIdeleteFlow(id) {
    return api2.delete(`v2/flow/${id}`)
}
// 修改
export function APIputFlow(id, data) {
    return api2.put(`v2/flow/${id}`, data)
}
// 添加
export function APIpostFlow(data) {
    return api2.post('v2/flow', data)
}

// 业委会成员
// 列表
export function APIgetListYwhUser(ywh, params) {
    return api2.get(`/ywh/${ywh}/user`, { params: params })
}
// 删除
export function APIdeleteYwhUser(ywh, id) {
    return api2.delete(`/ywh/${ywh}/user/${id}`)
}
// 修改
export function APIputYwhUser(ywh, id, data) {
    return api2.put(`/ywh/${ywh}/user/${id}`, data)
}
// 添加
export function APIpostYwhUser(ywh, data) {
    return api2.post(`/ywh/${ywh}/user`, data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 业委会
// 列表
export function APIgetListYwh(params) {
    return api2.get('/ywh', { params: params })
}
// 详情
export function APIgetDetailsYwh(id) {
    return api2.get('/ywh/' + id)
}
// 删除
export function APIdeleteYwh(id) {
    return api2.delete('/ywh/' + id)
}
// 修改
export function APIputYwh(id, data) {
    return api2.put('/ywh/' + id, data)
}
// 添加
export function APIpostYwh(data) {
    return api2.post('/ywh', data)
}
// 激活
export function APIputYwhActive(ywh, data) {
    return api2.put(`/ywh/${ywh}/active`, data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 公示审核  /api/a/article/{article}/audit
// 列表
export function APIgetListArchiveAudit(archive, params) {
    return api2.get(`/a/article/${archive}/audit`, { params: params })
}
// 详情
export function APIgetDetailsArchiveAudit(archive, article) {
    return api2.get(`/a/article/${archive}/audit/${article}`)
}
// 审核
export function APIpostArchiveAudit(archive, data) {
    return api2.post(`/a/article/${archive}/audit`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 公示归档
// 列表
export function APIgetListArchiveArticle(archive, params) {
    return api2.get(`/a/archive/${archive}/article`, { params: params })
}
// 详情
export function APIgetDetailsArchiveArticle(archive, article) {
    return api2.get(`/a/archive/${archive}/article/${article}`)
}
// 添加
export function APIpostArchiveArticle(archive, data) {
    return api2.post(`/a/archive/${archive}/article`, data)
}
// 删除
export function APIdeleteArchiveArticle(archive, article) {
    return api2.delete(`/a/archive/${archive}/article/${article}`)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 公示阅读 /api/a/ Articleread
// 列表
export function APIgetArticlereadList(params) {
    return api2.get('/a/articleread', { params: params })
}
// 添加
export function APIpostArticleread(data) {
    return api2.post('/a/articleread', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 公示任务
// 列表
export function APIgetTaskList(params) {
    return api2.get('/a/task', { params: params })
}
// 详情
export function APIgetTaskDetails(id) {
    return api2.get('/a/task/' + id)
}
// 删除
export function APIdeleteTask(id) {
    return api2.delete('/a/task/' + id)
}
// 修改
export function APIputTask(id, data) {
    return api2.put('/a/task/' + id, data)
}
// 添加
export function APIpostTask(data) {
    return api2.post('/a/task', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 任务派发 /api/a/tasksd
// 列表
export function APIgetTasksdList(params) {
    return api2.get('/tasksd', { params: params })
}
// 详情
export function APIgetTasksdDetails(id) {
    return api2.get('/tasksd/' + id)
}
// 删除
export function APIdeleteTasksd(id) {
    return api2.delete('/tasksd/' + id)
}
// 修改
export function APIputTasksd(id, data) {
    return api2.put('/tasksd/' + id, data)
}
// 添加
export function APIpostTasksd(data) {
    return api2.post('/tasksd', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 公示
// 列表
export function APIgetEventArticleList(params) {
    return api2.get('/a/article', { params: params })
}
// 详情
export function APIgetEventArticleDetails(id) {
    return api2.get('/a/article/' + id)
}
// 删除
export function APIdeleteEventArticle(id) {
    return api2.delete('/a/article/' + id)
}
// 修改
export function APIputEventArticle(id, data) {
    return api2.put('/a/article/' + id, data)
}
// 添加
export function APIpostEventArticle(data) {
    return api2.post('/a/article', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 资源 Step APIpostFiles
// 列表
export function APIgetFileList(params) {
    return api2.get('/file', { params: params })
}
// 删除
export function APIdeleteFile(id) {
    return api2.delete(`/file/${id}`)
}
// 添加
export function APIpostFileList(data) {
    return api2.post('/file', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 公示 模板 Articletpl /api/a/
// 列表
export function APIgetArticletplList(params) {
    return api2.get('/a/articletpl', { params: params })
}
// 详情
export function APIgetArticletplDetails(id) {
    return api2.get('/a/articletpl/' + id)
}
// 删除
export function APIdeleteArticletpl(id) {
    return api2.delete('/a/articletpl/' + id)
}
// 修改
export function APIputArticletpl(id, data) {
    return api2.put('/a/articletpl/' + id, data)
}
// 添加
export function APIpostArticletpl(data) {
    return api2.post('/a/articletpl', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 公示
// 列表
export function APIgetArticleList(params) {
    return api2.get('/a/article', { params: params })
}
// 详情
export function APIgetArticleDetails(id) {
    return api2.get('/a/article' + id)
}
// 删除
export function APIdeleteArticle(id) {
    return api2.delete('/a/article' + id)
}
// 修改
export function APIputArticle(id, data) {
    return api2.put('/a/article' + id, data)
}
// 添加
export function APIpostArticle(data) {
    return api2.post('/a/article', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 档案
// 列表
export function APIgetArchiveList(params) {
    return api2.get('/a/archive', { params: params })
}
// 删除
export function APIdeleteArchive(id) {
    return api2.delete('/a/archive/' + id)
}
// 修改
export function APIputArchive(id, data) {
    return api2.put('/a/archive/' + id, data)
}
// 添加
export function APIpostArchive(data) {
    return api2.post('/a/archive', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 中国区域接口
export function APIgetChinaRegion(params) {
    return api.get('/china', { params: params })
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 导入房屋任务列表
export function APIgetFilesList(params) {
    return api2.get('/houseimptask', { params: params })
}
export function APIpostFilesList(data) {
    return api2.post('/houseimptask', data)
}
// 资讯
// 资讯类别管理列表
export function APIgetInforCategoryList(params) {
    return api2.get('/newscate', params)
}
// 资讯类别管理添加
export function APIpostInforCategory(data) {
    return api.post('/newscate', data)
}
// 资讯类别管理修改
export function APIputInforCategory(id, data) {
    return api2.get(`/newscate/${id}`, data)
}
// 资讯类别管理删除
export function APIdeleteInforCategory(id) {
    return api2.get(`/newscate/${id}`)
}
// 资讯管理列表
export function APIgetInforManageList(params) {
    return api2.get('/news', { params: params })
}
// 资讯管理详情
export function APIgetInforManageDetails(id) {
    return api2.get(`/news/${id}`)
}
// 资讯管理添加
export function APIpostInforManage(data) {
    return api.post('/news', data)
}
// 资讯管理修改
export function APIputInforManage(id, data) {
    return api2.get(`/news/${id}`, data)
}
// 资讯管理删除
export function APIdeleteInforManage(id) {
    return api2.get(`/news/${id}`)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 文件上传获取配置 { 'folder': import.meta.env.VITE_APP_FOLDER_ADDHOUSE, 'number': 1 }
export function APIpostFiles(data) {
    return api.post('/blob/form', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 用户组成员 /api/ccgroup/{gid}/user
// 列表
export function APIgetGroupUserList(gid, params) {
    return api.get(`/ccgroup/${gid}/user`, { params: params })
}
// 删除
export function APIdeleteGroupUser(gid, id) {
    return api.delete(`/ccgroup/${gid}/user/${id}`)
}
// 修改
export function APIputGroupUser(gid, id, data) {
    return api.put(`/ccgroup/${gid}/user/${id}`, data)
}
// 添加
export function APIpostGroupUser(gid, data) {
    return api.post(`/ccgroup/${gid}/user`, data)
}
// 详情
export function APIgetGroupUserDetails(gid, id) {
    return api.get(`/ccgroup/${gid}/user/${id}`)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 用户组 /api/cc/{cc}/group
// 列表
export function APIgetGroupList(cc, params) {
    return api.get(`/cc/${cc}/group`, { params: params })
}
// 删除
export function APIdeleteGroup(cc, id) {
    return api.delete(`/cc/${cc}/group/${id}`)
}
// 修改
export function APIputGroup(cc, id, data) {
    return api.put(`/cc/${cc}/group/${id}`, data)
}
// 添加
export function APIpostGroup(cc, data) {
    return api.post(`/cc/${cc}/group`, data)
}
// 详情
export function APIgetGroupDetails(cc, id) {
    return api.get('/cc/${cc}/group/' + id)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 类别
// 列表
export function APIgetTypeList(kind, params) {
    return api2.get(`/kind/${kind}/cat`, { params: params })
}
// 删除
export function APIdeleteType(kind, id) {
    return api2.delete(`/kind/${kind}/cat/${id}`)
}
// 修改
export function APIputType(kind, id, data) {
    return api2.put(`/kind/${kind}/cat/${id}`, data)
}
// 添加
export function APIpostType(kind, data) {
    return api2.post(`/kind/${kind}/cat`, data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// APP 管理
// 列表
export function APIgetAPPList(params) {
    return api2.get('/apps', { params: params })
}
// 详情
export function APIgetAPPListDetails(id) {
    return api2.get(`/apps/${id}`)
}
// 删除
export function APIdeleteAPP(id) {
    return api2.delete(`/apps/${id}`)
}
// 修改
export function APIputAPP(id, data) {
    return api2.put(`/apps/${id}`, data)
}
// 添加
export function APIpostAPP(data) {
    return api2.post('/apps', data)
}
// APP 菜单管理
// 列表
export function APIgetAppMenuList(params) {
    return api2.get('/appmenu', { params: params })
}
// 删除
export function APIdeleteAppMenu(id) {
    return api2.delete(`/appmenu/${id}`)
}
// 修改
export function APIputAppMenu(id, data) {
    return api2.put(`/appmenu/${id}`, data)
}
// 添加
export function APIpostAppMenu(data) {
    return api2.post('/appmenu', data)
}
// APP 版本管理
// 列表
export function APIgetAppVersionList(params) {
    return api2.get('/appversion', { params: params })
}
// 删除
export function APIdeleteAppVersion(id) {
    return api2.delete(`/appversion/${id}`)
}
// 修改
export function APIputAppVersion(id, data) {
    return api2.put(`/appversion/${id}`, data)
}
// 添加
export function APIpostAppVersion(data) {
    return api2.post('/appversion', data)
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

/* --------------------------------------------------------------------------------------------------------------------- */
// 用户
// 列表
export function APIgetUserList(params) {
    return api.get('/pt/user-account', { params: params })
}
// 详情
export function APIgetUserDetails(id) {
    return api.get('/pt/user-account/' + id)
}
// 删除
export function APIdeleteUser(id) {
    return api.delete('/pt/user-account/' + id)
}
// 修改
export function APIputUser(id, data) {
    return api.put('/pt/user-account/' + id, data)
}
// 添加
export function APIpostUser(data) {
    return api.post('/pt/user-account', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 产权
// 列表
export function APIgetPropertyList(params) {
    return api2.get('/house-property', { params: params })
}
// 详情
export function APIgetPropertyDetails(id) {
    return api2.get('/house-property/' + id)
}
// 删除
export function APIdeleteProperty(id) {
    return api2.delete('/house-property/' + id)
}
// 修改
export function APIputProperty(id, data) {
    return api2.put('/house-property/' + id, data)
}
// 添加
export function APIpostProperty(data) {
    return api2.post('/house-property', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// china
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
    return api2.get('/sysoptitem', { params: params })
}
// 删除
export function APIdeleteOptsVal(id) {
    return api2.delete('/sysoptitem/' + id)
}
// 修改
export function APIputOptsVal(id, data) {
    return api2.put('/sysoptitem/' + id, data)
}
// 添加
export function APIpostOptsVal(data) {
    return api2.post('/sysoptitem', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 配置
// 列表
export function APIgetOptsList(params) {
    return api2.get('/sysopt', { params: params })
}
// 删除
export function APIdeleteOpts(id) {
    return api2.delete('/sysopt/' + id)
}
// 修改
export function APIputOpts(id, data) {
    return api2.put('/sysopt/' + id, data)
}
// 添加
export function APIpostOpts(data) {
    return api2.post('/sysopt', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 房屋
// 列表
export function APIgetHouseListSort(params) {
    return api2.get('/houses-able', { params: params })
}
// 列表
export function APIgetHouseListHouse(params) {
    return api2.get('/houses', { params: params })
}
// 详情
export function APIgetHouseDetailsHouse(id) {
    return api2.get('/houses/' + id)
}
// 删除
export function APIdeleteHouseHouse(id) {
    return api2.delete('/houses/' + id)
}
// 修改
export function APIputHouseHouse(id, data) {
    return api2.put('/houses/' + id, data)
}
// 添加
export function APIpostHouseHouse(data) {
    return api2.post('/houses', data)
}
// 批量修改
export function APIputAllHouseHouse(data) {
    return api2.put('/houses-batch', data)
}
/* --------------------------------------------------------------------------------------------------------------------- */
// 单元
// 列表
export function APIgetUnitsListHouse(params) {
    return api2.get('/units', { params: params })
}
// 详情
export function APIgetUnitsDetailsHouse(id) {
    return api2.get('/units/' + id)
}
// 删除
export function APIdeleteUnitsHouse(id) {
    return api2.delete('/units/' + id)
}
// 修改
export function APIputUnitsHouse(id, data) {
    return api2.put('/units/' + id, data)
}
// 添加
export function APIpostUnitsHouse(data) {
    return api2.post('/units', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 楼栋
// 列表
export function APIgetBuildListHouse(params) {
    return api2.get('/buildings', { params: params })
}
// 详情
export function APIgetBuildDetailsHouse(id) {
    return api2.get('/buildings/' + id)
}
// 删除
export function APIdeleteBuildHouse(id) {
    return api2.delete('/buildings/' + id)
}
// 修改
export function APIputBuildHouse(id, data) {
    return api2.put('/buildings/' + id, data)
}
// 添加
export function APIpostBuildHouse(data) {
    return api2.post('/buildings', data)
}

/* --------------------------------------------------------------------------------------------------------------------- */
// 小区
// 列表
export function APIgetResidentialListHouse(params) {
    return api2.get('/zones', { params: params })
}
// 详情
export function APIgetResidentialDetailsHouse(id) {
    return api2.get('/zones/' + id)
}
// 删除
export function APIdeleteResidentialHouse(id) {
    return api2.delete('/zones/' + id)
}
// 修改
export function APIputResidentialHouse(id, data) {
    return api2.put('/zones/' + id, data)
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
    return api2.get('/zone-com-apply/' + id)
}
// 审批
export function APIputResidential(id, data) {
    return api2.put('/zone-com-apply/' + id, data)
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