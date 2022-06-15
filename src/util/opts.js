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
import api2 from '@/api/index2.js'
const opts = {
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
        val: '不公开'
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
        val: '业委'
    }, {
        key: 7,
        val: '物业'
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
        key: 4,
        val: '已拒办'
    }, {
        key: 5,
        val: '已转办'
    }, {
        key: 6,
        val: '已回复'
    }, {
        key: 7,
        val: '已办结'
    }, {
        key: 8,
        val: '结案'
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
        val: '未设置'
    }, {
        key: 'F',
        val: '男'
    }, {
        key: 'M',
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
    // 用户端类型
    terminal: [{
        key: 'pt',
        val: '总平台管理端'
    }, {
        key: 'ptr',
        val: '区域平台管理端'
    }, {
        key: 'mbr',
        val: '业主端'
    }, {
        key: 'pm',
        val: '物业端'
    }, {
        key: 'gov',
        val: '行政管理端'
    }],
    // 用户端类型
    terminal_num: [{
        key: 1,
        val: '总平台管理端'
    }, {
        key: 2,
        val: '区域平台管理端'
    }, {
        key: 3,
        val: '行政管理端'
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
    type_type: [{
        key: 101,
        val: '公示'
    }, {
        key: 102,
        val: '流程'
    }, {
        key: 103,
        val: '投诉问题'
    }, {
        key: 104,
        val: '投诉对象'
    }, {
        key: 105,
        val: '报修问题'
    }, {
        key: 106,
        val: '报修对象'
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
    }],
    // china添加时候的区域等级
    china_level: [{
        key: 100,
        val: '区域等级一'
    }]
}

export async function getOpts(arr) {
    const res = await api2.post('/optitem', {
        lab: arr
    })
    const opt_up = {}
    for (let key in res.data) {
        opt_up[key] = res.data[key]
        if (res.data[key].length <= 0 && opts[key]) {
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
