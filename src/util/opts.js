// // 配置项
// import { getOpts, getOptVal } from '@/util/opts.js'
// const opts_alls = reactive({
//     obj: {}
// })
// getOpts(['status_cert', 'other_auth']).then(res => {
//     opts_alls.obj = res
// })

import api2 from '@/api/index.js'
const opts = {
    // 性别
    gender: [{
        key: 'U', val: '未设置'
    }, {
        key: 'F', val: '男'
    }, {
        key: 'M', val: '女'
    }],
    // 短信验证码发送场景
    sms_purpose: [{
        key: 'default', val: '默认'
    }, {
        key: 'login', val: '登录'
    }, {
        key: 'modify', val: '修改手机号'
    }],
    // 第三方登录类型
    login_type: [{
        key: 100, val: '微信'
    }, {
        key: 200, val: 'QQ'
    }, {
        key: 300, val: '支付宝账号'
    }, {
        key: 400, val: '苹果账号'
    }],
    // 通用处理状态
    status_all: [{
        key: 100, val: '未处理'
    }, {
        key: 150, val: '处理中'
    }, {
        key: 200, val: '处理成功'
    }, {
        key: 300, val: '处理失败'
    }],
    // 用户端类型
    terminal: [{
        key: 'pt', val: '总平台管理端'
    }, {
        key: 'ptr', val: '区域平台管理端'
    }, {
        key: 'mbr', val: '业主端'
    }, {
        key: 'pm', val: '物业端'
    }, {
        key: 'gov', val: '行政管理端'
    }],
    // 房屋住户标识
    role_house: [{
        key: 1, val: '业主'
    }, {
        key: 2, val: '家人'
    }, {
        key: 3, val: '委托授权人'
    }, {
        key: 11, val: '司机'
    }, {
        key: 12, val: '保姆'
    }, {
        key: 13, val: '租客'
    }],
    // 分类种类
    type_type: [{
        key: 101, val: '公示'
    }],
    // 步骤动作代码
    step_type: [{
        key: 101, val: '公示审核'
    }],
    // 企业类别
    enterprise_type: [{
        key: 1, val: '物业'
    }],
    // 企业服务类型
    enterprise_service: [{
        key: 100, val: '物业'
    }],
    // 公示任务接收对象等级
    article_lv: [{
        key: 4, val: '街道'
    }, {
        key: 5, val: '社区'
    }, {
        key: 6, val: '小区'
    }],
    // 公示任务派发频率
    article_rate: [{
        key: 1, val: '每月'
    }, {
        key: 2, val: '每季度'
    }, {
        key: 3, val: '每半年'
    }, {
        key: 4, val: '每年'
    }]
}

export async function getOpts(arr) {
    const res = await api2.post('/optitem', { lab: arr })
    const opt_up = {}
    for (let key in res.data) {
        opt_up[key] = res.data[key]
        if (res.data[key].length <= 0 && opts[key]) {
            opt_up[key] = opts[key]
        }
    }
    return opt_up
}
export function getOptVal(arr, key)  {
    for (let i in arr) {
        if (arr[i].key == key) {
            return arr[i].val
        }
    }
    return ''
}