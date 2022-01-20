/**
 * 全局拦截请求发送后返回的数据，如果数据有报错则在这做全局的错误提示
 * 假设返回数据格式为：{ status: 1, error: '', data: '' }
 * 规则是当 status 为 1 时表示请求成功，为 0 时表示接口需要登录或者登录状态失效，需要重新登录
 * 请求出错时 error 会返回错误信息
 */
export default [{
    url: '/mock/member/login',
    method: 'post',
    response: option => {
        return {
            error: '',
            status: 1,
            data: {
                account: option.body.account,
                token: '@string',
                failure_time: Math.ceil(new Date().getTime() / 1000) + 24 * 60 * 60
            }
        }
    }
},
{
    url: '/mock/member/permission',
    method: 'get',
    response: option => {
        let permissions = []
        if (option.query.account == 'admin') {
            permissions = [
                '*'
            ]
        } else if (option.query.account == 'test') {
            permissions = [
                'supervise',
                'supervise.home',
                'supervise.home.home',
                'supervise.workbench',
                'supervise.workbench.workbench'
            ]
        }
        return {
            error: '',
            status: 1,
            data: {
                permissions
            }
        }
    }
},
{
    url: '/mock/member/edit/password',
    method: 'post',
    response: {
        error: '',
        status: 1,
        data: {
            isSuccess: true
        }
    }
},
//
// 控制台首页
// 个人信息
{
    url: '/mock/member/home/userinfo',
    method: 'get',
    response: {
        error: '',
        status: 1,
        data: {
            avatar: 'https://try8.cn/_asset/img/logo.png',
            nickname: '李白',
            address: '重庆市万州区',
            department: '运营部',
            job: '管理员',
            tel: '158****6584',
            lasttime: '2021-12-21 11:26:45',
            ip: '121.123.43.54'
        }
    }
},
// // 统计
{
    url: '/mock/member/home/tipsnum',
    method: 'get',
    response: {
        error: '',
        status: 1,
        data: {
            user: {
                tit: '用户',
                total: 547142,
                today: 432
            },
            residence: {
                tit: '小区',
                total: 547142,
                today: 432
            },
            house: {
                tit: '房屋',
                total: 547142,
                today: 2
            },
            enterprise: {
                tit: '企业',
                total: 547142,
                today: 432
            },
            event: {
                tit: '事件',
                total: 547142,
                today: 221
            }
        }
    }
},
// // 投诉报修违建
{
    url: '/mock/member/home/eventnum',
    method: 'get',
    response: {
        error: '',
        status: 1,
        data: {
            complaint: {
                name: '投诉',
                nums: [{
                    tit: '待处理',
                    num: 123
                },
                {
                    tit: '处理中',
                    num: 321
                },
                {
                    tit: '有追问',
                    num: 321
                },
                {
                    tit: '已回复',
                    num: 321
                },
                {
                    tit: '已解决',
                    num: 321
                }
                ]
            },
            residence: {
                name: '报修',
                nums: [{
                    tit: '待处理',
                    num: 123
                },
                {
                    tit: '处理中',
                    num: 321
                },
                {
                    tit: '有追问',
                    num: 321
                },
                {
                    tit: '已回复',
                    num: 321
                },
                {
                    tit: '已解决',
                    num: 321
                }
                ]
            },
            house: {
                name: '违建',
                nums: [{
                    tit: '待处理',
                    num: 123
                },
                {
                    tit: '处理中',
                    num: 321
                },
                {
                    tit: '有追问',
                    num: 321
                },
                {
                    tit: '已回复',
                    num: 321
                },
                {
                    tit: '已解决',
                    num: 321
                }
                ]
            }
        }
    }
},
// // 统计图表 用户注册统计 用户实名认证 用户活跃统计
// 图表大于3个时站位 大屏1/3,中屏1/2,
{
    url: '/mock/member/home/echarts',
    method: 'get',
    response: {
        error: '',
        status: 1,
        data: [{
            tit: '用户注册统计',
            dom_id: 'echarts1',
            options: {
                tooltip: {},
                xAxis: {
                    data: ['1', '5', '10', '15', '20', '25', '30']
                },
                yAxis: {},
                series: [{
                    name: '用户量',
                    type: 'line',
                    data: [5, 20, 36, 10, 10, 20, 30]
                }]
            }
        },
        {
            tit: '用户实名认证',
            dom_id: 'echarts2',
            options: {
                tooltip: {},
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    data: [{
                        value: 235,
                        name: '已认证'
                    },
                    {
                        value: 374,
                        name: '未认证'
                    }
                    ]
                }]
            }
        },
        {
            tit: '用户活跃统计',
            dom_id: 'echarts3',
            options: {
                tooltip: {},
                xAxis: {
                    data: ['1', '5', '10', '15', '20', '25', '30']
                },
                yAxis: {},
                series: [{
                    name: '用户量',
                    type: 'line',
                    data: [5, 20, 36, 10, 10, 20, 30]
                }]
            }
        }
        ]
    }
}

]
