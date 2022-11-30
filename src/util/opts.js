// // 配置项
// import { getOpts, getOptVal } from '@/util/opts.js'
// const opts_all = reactive({
//     obj: {}
// })
// getOpts(['status_cert', 'other_auth']).then(res => {
//     opts_all.obj = res
// })
// ---------------------------------------------------------------------------------------
// 只能在数组后面追加值，不能在数组前面插入值
// ---------------------------------------------------------------------------------------
import api from '@/api/request'
const opts = {
    // 评论状态
    comment_status: [{
        key: 10,
        val: '未审核'
    }, {
        key: 20,
        val: '已审核'
    }, {
        key: 30,
        val: '审核失败'
    }],
    // 资讯状态
    information_status: [{
        key: 0,
        val: '未审'
    }, {
        key: 1,
        val: '已审'
    }],
    // 评论 分割 100百分制、10分制、5分制、0不采用
    comment_scoreper: [{
        key: 100,
        val: '100百分制'
    }, {
        key: 10,
        val: '10分制'
    }, {
        key: 5,
        val: '5分制'
    }, {
        key: 0,
        val: '不采用'
    }],
    // 标识类别
    flg_type: [{
        key: 0,
        val: '未标记'
    }, {
        key: 1,
        val: '处罚'
    }, {
        key: 2,
        val: '整改'
    }],
    // 投诉类型
    tousu_type_kind: [{
        key: 1,
        val: '违建'
    }, {
        key: 2,
        val: '投诉'
    }, {
        key: 3,
        val: '报修'
    }],
    // 维修类型
    repair_type: [{
        key: 1,
        val: '日常维护'
    }, {
        key: 2,
        val: '维修记录'
    }],
    // 是否显示
    device_show: [{
        key: 0,
        val: '隐藏'
    }, {
        key: 1,
        val: '显示'
    }],
    // 是否显示1
    app_show: [{
        key: 1,
        val: '是'
    }, {
        key: 0,
        val: '否'
    }],
    // 设备状态
    device_status: [{
        key: 1,
        val: '正常'
    }, {
        key: 2,
        val: '故障'
    }, {
        key: 3,
        val: '维修中'
    }],
    // 设备类型
    device_type: [{
        key: 1,
        val: '设备'
    }, {
        key: 2,
        val: '设施'
    }, {
        key: 3,
        val: '部位'
    }, {
        key: 9,
        val: '其他'
    }],
    // 投票
    vote_toupiao: [{
        key: 1,
        val: '支持'
    }, {
        key: 2,
        val: '弃权'
    }, {
        key: 3,
        val: '反对'
    }],
    illegal_type: [{
        key: 1,
        val: '房屋'
    }],
    illegal_user: [{
        key: 10,
        val: '未处理'
    }, {
        key: 15,
        val: '处理中'
    }, {
        key: 20,
        val: '已处理'
    }],
    toushu_illegal: [{
        key: 0,
        val: '否'
    }, {
        key: 1,
        val: '是'
    }],
    toushu_pub: [{
        key: 0,
        val: '关闭'
    }, {
        key: 1,
        val: '公开'
    }],
    toushu_ano: [{
        key: 0,
        val: '实名'
    }, {
        key: 1,
        val: '匿名'
    }],
    // 投诉转办对象
    toushu_return_type: [{
        key: 3,
        val: '住建'
    }, {
        key: 4,
        val: '街道'
    }, {
        key: 5,
        val: '社区'
    }, {
        key: 6,
        val: '业委会'
    }, {
        key: 7,
        val: '物业企业'
    },{
        key: 8,
        val: '事业单位'
    },{
        key: 99,
        val: '其他'
    }],
    // 投诉 状态
    toushu_status: [{
        key: 0,
        val: '未处理'
    }, {
        key: 1,
        val: '已审核'
    }, {
        key: 2,
        val: '已确认'
    }, {
        key: 3,
        val: '已受理'
    }, {
        key: 5,
        val: '已转办'
    }, {
        key: 6,
        val: '已回复'
    }, {
        key: 7,
        val: '已办完'
    }, {
        key: 8,
        val: '已追问'
    }, {
        key: 99,
        val: '已结案'
    }],
    // 公式 状态
    announce_status: [{
        key: 1,
        val: '筹备中'
    }, {
        key: 2,
        val: '待审'
    }, {
        key: 3,
        val: '未开始'
    }, {
        key: 4,
        val: '进行中'
    }, {
        key: 5,
        val: '暂停'
    }, {
        key: 6,
        val: '终止'
    }, {
        key: 7,
        val: '已结束'
    }],
    // 报名是否有效
    isvalid_opt: [{
        key: 0,
        val: '无效'
    }, {
        key: 1,
        val: '有效'
    }],
    // 报名人类型
    entry_type: [{
        key: 1,
        val: '业主'
    }, {
        key: 2,
        val: '物业'
    }],
    // 投票选项类型
    opttype_type: [{
        key: 0,
        val: '不关联'
    }, {
        key: 1,
        val: '用户参与'
    }, {
        key: 2,
        val: '企业参与'
    }],
    // 投票状态
    vote_status: [{
        key: 1,
        val: '未开始'
    }, {
        key: 2,
        val: '进行中'
    }, {
        key: 3,
        val: '已结束'
    }],
    // 投票类别
    vote_type: [{
        key: 1,
        val: '投票'
    }, {
        key: 2,
        val: '表决'
    }],
    // 自定义表单type表单类型
    from_type: [{
        key: 'upload',
        val: '图片'
    }, {
        key: 'text',
        val: '文本输入框'
    }, {
        key: 'textarea',
        val: '多行文本输入框'
    }, {
        key: 'password',
        val: '密码输入框'
    }, {
        key: 'number',
        val: '数字输入框'
    }, {
        key: 'picker-select',
        val: '选择器'
    }, {
        key: 'checkbox',
        val: '勾选框'
    }, {
        key: 'picker-date',
        val: '日期选择器'
    }],
    // 步骤是否可以进行返回步骤操作
    step_back: [{
        key: 1,
        val: '允许返回'
    }, {
        key: 0,
        val: '禁止返回'
    }],
    // 步骤里面的内置议题类型？死的 10 公示、21投票、22表决、20多个投票表决组、30报名
    step_yt_type: [{
        key: 0,
        val: '无'
    }, {
        key: 10,
        val: '发布公示'
    }, {
        key: 21,
        val: '投票'
    }, {
        key: 22,
        val: '表决'
    }, {
        key: 20,
        val: '多个投票表决组'
    }, {
        key: 30,
        val: '报名'
    }],
    // //备案状态
    // record_status:[
    //     {
    //         key:0,
    //         val:'未审核'
    //     },
    //     {
    //         key:1,
    //         val:'已审核'
    //     }
    // ],
    // 流程启用
    flow_active: [{
        key: 1,
        val: '启用'
    }, {
        key: 0,
        val: '禁用'
    }],
    // 性别
    gender: [{
        key: 'U',
        val: '-'
    }, {
        key: 'M',
        val: '男'
    }, {
        key: 'F',
        val: '女'
    }],
    // 短信验证码发送场景
    sms_purpose: [{
        key: 'default',
        val: '默认'
    }, {
        key: 'login',
        val: '登录'
    }, {
        key: 'modify',
        val: '修改手机号'
    }],
    // 第三方登录类型
    login_type: [{
        key: 100,
        val: '微信'
    }, {
        key: 200,
        val: 'QQ'
    }, {
        key: 300,
        val: '支付宝账号'
    }, {
        key: 400,
        val: '苹果账号'
    }],
    // 通用处理状态
    status_all: [{
        key: 10,
        val: '未处理'
    }, {
        key: 15,
        val: '处理中'
    }, {
        key: 20,
        val: '处理成功'
    }, {
        key: 30,
        val: '处理失败'
    }],
    // 通用处理状态
    verify_status: [{
        key: 10,
        val: '未认证'
    }, {
        key: 15,
        val: '处理中'
    }, {
        key: 20,
        val: '已认证'
    }, {
        key: 30,
        val: '失败'
    }],
    // 用户端类型
    terminal: [{
        key: 'pt',
        val: '总平台'
    }, {
        key: 'ptr',
        val: '区域平台'
    }, {
        key: 'mbr',
        val: '业主端'
    }, {
        key: 'pm',
        val: '物业端'
    }, {
        key: 'gov',
        val: '部门端'
    }],
    terminal_perms: [{
        key: 'gov',
        val: '管理端'
    }, {
        key: 'pm',
        val: '物业端'
    }, {
        key: 'mbr',
        val: '业主端'
    }],
    // 用户端类型
    terminal_num: [{
        key: 1,
        val: '总平台'
    }, {
        key: 2,
        val: '区域平台'
    }, {
        key: 3,
        val: '部门端'
    }, {
        key: 4,
        val: '物业端'
    }, {
        key: 5,
        val: '业主端'
    }],
    // 房屋住户标识
    role_house: [{
        key: 1,
        val: '业主'
    }, {
        key: 2,
        val: '家人'
    }, {
        key: 3,
        val: '委托授权人'
    }, {
        key: 11,
        val: '司机'
    }, {
        key: 12,
        val: '保姆'
    }, {
        key: 13,
        val: '租客'
    }],
    // 分类种类 101：公示、102：流程、103：投诉问题、104：投诉对象、 105：报修问题、106：报修对象
    kind: [{
        key: 'announce',
        val: '公示'
    }, {
        key: 'complaint-pro',
        val: '投诉问题'
    }, {
        key: 'complaint-obj',
        val: '投诉对象'
    }, {
        key: 'repair-pro',
        val: '报修问题'
    }, {
        key: 'repair-obj',
        val: '报修对象'
    }, {
        key: 'ill-pro',
        val: '违建问题'
    }, {
        key: 'ill-obj',
        val: '违建对象'
    }],
    // 企业类别
    enterprise_type: [{
        key: 1,
        val: '物业'
    }],
    // 企业服务类型
    enterprise_service: [{
        key: 100,
        val: '物业'
    }],
    // 公示任务接收对象等级 如果修改该字段，cascaderTypeAndID组件和tasksd页面需要调整
    article_lv: [{
        key: 3,
        val: '区县'
    }, {
        key: 4,
        val: '街道'
    }, {
        key: 5,
        val: '社区'
    }, {
        key: 6,
        val: '小区'
    }],
    article_lv_1: [{
        key: 4,
        val: '街道'
    }, {
        key: 5,
        val: '社区'
    }, {
        key: 6,
        val: '物业'
    }, {
        key: 7,
        val: '业委会'
    }],
    // 公示任务派发频率
    article_rate: [{
        key: 1,
        val: '每月'
    }, {
        key: 2,
        val: '每季度'
    }, {
        key: 3,
        val: '每半年'
    }, {
        key: 4,
        val: '每年'
    }],
    // 是否绑定产权
    house_has_property: [{
        key: 1,
        val: '已绑定'
    }, {
        key: 0,
        val: '未绑定'
    }],
    // 房屋上级类型
    houseable_type: [{
        key: 'buildings',
        val: '楼栋'
    }, {
        key: 'units',
        val: '单元'
    }],
    // 产权是否绑定房屋
    house_has_house: [{
        key: 1,
        val: '已绑定'
    }, {
        key: 0,
        val: '未绑定'
    }],
    // 审批
    process_status: [{
        key: 200,
        val: '拒绝'
    }, {
        key: 300,
        val: '同意'
    }],
    // 关联对象类型
    article_type: [{
        key: 0,
        val: '无'
    }],
    // 任务派发是否使用
    tasksd_use: [{
        key: 0,
        val: '不启用'
    }, {
        key: 1,
        val: '启用'
    }],
    // 任务是否完成
    task_ok: [{
        key: 0,
        val: '未完成'
    }, {
        key: 1,
        val: '已完成'
    }],
    // 文件资源类型
    resources_type: [{
        key: 100,
        val: '资源类型一'
    }, {
        key: 200,
        val: '资源类型二'
    }],
    // 文件分类
    file_type: [{
        key: 100,
        val: '文件分类一'
    }, {
        key: 200,
        val: '文件分类二'
    }],
    // 系统级别
    sys_is_sys: [{
        key: 0,
        val: '关闭'
    }, {
        key: 1,
        val: '开启'
    }],
    // 启用状态
    sys_is_active: [{
        key: 0,
        val: '关闭'
    }, {
        key: 1,
        val: '开启'
    }],
    // app管理状态
    sys_is_status: [{
        key: 0,
        val: '已关闭'
    }, {
        key: 1,
        val: '已开启'
    }],
    // 是否强制更新
    sys_is_force: [{
        key: 1,
        val: '是'
    }, {
        key: 0,
        val: '否'
    }],
    // app类别
    sys_is_type: [{
        key: 1,
        val: '安卓'
    }, {
        key: 2,
        val: '苹果'
    }],
    // 菜单位置
    sele_menu: [{
        key: 1,
        val: 'APP首页金刚区'
    }, {
        key: 2,
        val: '发布首页'
    }, {
        key: 3,
        val: '用户中心'
    }, {
        key: 4,
        val: 'APP小区中心'
    }],
    // 跳转方式
    sele_type: [{
        key: 0,
        val: 'tabbar'
    }, {
        key: 1,
        val: 'pages'
    }, {
        key: 2,
        val: 'url'
    }, {
        key: 3,
        val: 'wxapp'
    }, {
        key: 4,
        val: 'phone'
    }],
    // 供水方式
    build_type_water: [{
        key: 100,
        val: '供水方式一'
    }],
    // 结构形式
    build_type_construct: [{
        key: 100,
        val: '结构形式一'
    }],
    // 证件类型
    type_id_card: [{
        key: 100,
        val: '证件类型一'
    },{
        key: 0,
        val: '身份证'
    }],
    // china添加时候的区域等级
    china_level: [{
        key: 1,
        val: '区域等级一'
    }],
    // 用户组成员类型
    group_user_flg: [{
        key: 0,
        val: '普通成员'
    }, {
        key: 1,
        val: '组管理员'
    }],
    // 用户组成员区域类型
    group_user_region_type: [{
        key: 1,
        val: '中国区域代码'
    }, {
        key: 2,
        val: '小区ID'
    }],
    // 用户组状态
    group_active: [{
        key: 1,
        val: '启用'
    }, {
        key: 0,
        val: '禁用'
    }],
    // 活动事件类型
    activityEvent_type: [{
        key: 0,
        val: 'announce',
        leb: 'announce'
    }, {
        key: 1,
        val: 'survey',
        leb: 'survey'
        // }, {
        //     key: 2,
        //     val: 'survey',
        //     leb: 'jointly'
        // }, {
        //     key: 3,
        //     val: 'survey',
        //     leb: 'vote'
        // }, {
        //     key: 4,
        //     val: 'survey',
        //     leb: 'elect'
    }],
    activity_type: [{
        key: 1,
        val: 'survey'
    }, {
        key: 2,
        val: 'jointly'
    }, {
        key: 3,
        val: 'vote'
    }, {
        key: 4,
        val: 'elect'
    }],
    activityStatus: [
        { key: 1, val: '筹备阶段' },
        { key: 2, val: '待审' },
        { key: 3, val: '未开始' },
        { key: 4, val: '进行中' },
        { key: 5, val: '暂停' },
        { key: 6, val: '终止' },
        { key: 7, val: '已结束' }
    ],
    enterpriseStatus: [{
        key: 10,
        val: '未处理'
    }, {
        key: 15,
        val: '处理中'
    }, {
        key: 20,
        val: '处理成功'
    }, {
        key: 30,
        val: '处理失败'
    }],
    examine_status: [{
        key: 20,
        val: '通过'
    }, {
        key: 30,
        val: '失败'
    }],
    house_bind: [{
        key: 0,
        val: '非业主'
    }, {
        key: 1,
        val: '业主'
    }],
    houseBindStatus: [{
        key: 10,
        val: '未处理'
    }, {
        key: 20,
        val: '审核成功'
    }, {
        key: 30,
        val: '审核失败'
    }],
    houseBindStatus_1: [{
        key: 20,
        val: '审核成功'
    }, {
        key: 30,
        val: '审核失败'
    }],
    rolesSpec: [{
        key: 0,
        val: '无'
    }, {
        key: 1,
        val: '业主'
    }],
    put_perms_utype: [{
        key: 'gov',
        val: '管理端'
    }, {
        key: 'pm',
        val: '物业端'
    }, {
        key: 'mbr',
        val: '业主端'
    }],
    labels_kind: [{
        key: 1,
        val: '人员'
    }, {
        key: 2,
        val: '房屋'
    }]
}

export async function getOpts(arr) {
    const res = await api.post('/optitem', {
        lab: arr
    })
    // console.log(res)
    const opt_up = {}
    for (let key in res) {
        opt_up[key] = res[key]
        if (res[key].length <= 0 && opts[key]) {
            opt_up[key] = opts[key]
        }
    }
    return opt_up
}
export function getOptVal(arr, key) {
    for (let i in arr) {
        if (arr[i].key == key) {
            return arr[i].val
        }
    }
    return ''
}
