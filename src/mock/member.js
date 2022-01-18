export default [
    {
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
                    '*',
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
    }
]
