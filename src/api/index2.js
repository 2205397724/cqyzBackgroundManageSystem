import axios from 'axios'
// import qs from 'qs'
import router from '@/router/index'
import { ElMessage, ElLoading } from 'element-plus'
import { useUserOutsideStore } from '@/store/modules/user'
import SHA256 from 'crypto-js/sha256'
var loading = ''
const toLogin = () => {
    const userOutsideStore = useUserOutsideStore()
    userOutsideStore.logout().then(() => {
        router.push({
            name: 'login',
            query: {
                redirect: router.currentRoute.value.path !== '/login' ? router.currentRoute.value.fullPath : undefined
            }
        })
    })
}

const api = axios.create({
    // baseURL: import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true' ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL_2,
    baseURL: import.meta.env.DEV &&
        import.meta.env.VITE_OPEN_PROXY === 'true' ?
        '/proxy/' : import.meta.env.VITE_APP_API_BASEURL,
    timeout: 6000,
    responseType: 'json'
})
api.interceptors.request.use(
    request => {
        if (!request.baseURL) {
            request.baseURL =
                import.meta.env.VITE_APP_API_BASEURL
        }
        loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
        })
        const userOutsideStore = useUserOutsideStore()
            /**
             * 全局拦截请求发送前提交的参数
             * 以下代码为示例，在请求头里带上 token 信息
             */
        if (userOutsideStore.isLogin) {
            request.headers['Authorization'] = 'Bearer ' + localStorage.token
                // request.headers['Token'] = userOutsideStore.token
        }
        var time = new Date().getTime().toString()
        var eqtype = '2'
        var secret = 'secret'
        var sign = SHA256(time + eqtype + secret)
        request.headers['X-Sign'] = [time, eqtype, sign].join('.')
            request.headers['X-Cc'] = localStorage.getItem("groupChinaCode")
        // }
            // 是否将 POST 请求参数进行字符串化处理
        if (request.method === 'post') {
            // request.data = qs.stringify(request.data, {
            //     arrayFormat: 'brackets'
            // })
        }
        return request
    }
)

api.interceptors.response.use(
    response => {
        loading.close()
            /**
             * 全局拦截请求发送后返回的数据，如果数据有报错则在这做全局的错误提示
             * 假设返回数据格式为：{ status: 1, error: '', data: '' }
             * 规则是当 status 为 1 时表示请求成功，为 0 时表示接口需要登录或者登录状态失效，需要重新登录
             * 请求出错时 error 会返回错误信息
             */
        if (response.status === 200) {
            if (!response.data.code) {
                return Promise.resolve(response.data)
            } else {
                ElMessage.error(response.data.msg)
                return Promise.reject(response.data)
            }
        } else {
            toLogin()
        }
    },
    error => {
        loading.close()
        let message = error.message
        if (message == 'Network Error') {
            message = '后端网络故障'
        } else if (message.includes('timeout')) {
            message = '接口请求超时'
        } else if (message.includes('Request failed with status code')) {
            message = '接口' + message.substr(message.length - 3) + '异常'
        }
        ElMessage({
            message,
            type: 'error'
        })
        return Promise.reject(error)
    }
)

export default api
