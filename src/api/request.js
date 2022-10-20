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
const cleanEmptyData = (data)=> {
    if (Array.isArray(data)) {
        let newArr = []
        data.forEach(item => {
            let tmp = cleanEmptyData(item)
            if (tmp !== undefined) {
                newArr.push(tmp)
            }
        })
        return newArr
    } else if (data instanceof Object) {
        let newObj = {}
        Object.entries(data).forEach(item => {
            let [k, v] = item
            let tmp = cleanEmptyData(v)
            if (tmp !== undefined) {
                newObj[k] = tmp
            }
        })
        return newObj
    } else if (data === undefined || data === null || (data + '').trim() === '') {
        return undefined
    } else {
        return data
    }
}
const api = axios.create({
    // baseURL: import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true' ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL,
    baseURL: import.meta.env.DEV &&
        import.meta.env.VITE_OPEN_PROXY === 'true' ?
        '/proxy/' :
        import.meta.env.VITE_APP_API_BASEURL,
    timeout: 6000,
    responseType: 'json'
})

api.interceptors.request.use(
    request => {
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
            let uid = localStorage.getItem('uid')
            let cc = JSON.parse(localStorage.getItem(uid + '_city'))
            request.headers['X-Cc'] = ( cc !=null && Object.keys(cc).length!=0 )? cc.china_code:''
        }
        var time = new Date().getTime().toString()
        var eqtype = '2'
        var secret = 'secret'
        var sign = SHA256(time + eqtype + secret)
        request.headers['X-Sign'] = [time, eqtype, sign].join('.')
        // 是否将 POST 请求参数进行字符串化处理
        if (request.method === 'post' || request.method === 'put') {
            request.data = cleanEmptyData(request.data)
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
        let message = error.message
        if (message == 'Network Error') {
            message = '后端网络故障'
        } else if (message.includes('timeout')) {
            message = '接口请求超时'
        } else if (error.response) {
            message = error.response.data.message
        }
        ElMessage({
            message,
            type: 'error'
        })
        loading.close()
        return Promise.reject(error)
    }
)
export default api
