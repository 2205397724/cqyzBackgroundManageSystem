
import { defineStore } from 'pinia'
import { piniaStore } from '@/store'
import { ElMessage } from 'element-plus'
import { APIlogin, APIgetPermissions, APIeditPassword } from '@/api/custom/custom.js'

import { useMenuStore } from './menu'
// import { resolve } from 'path-browserify'

export const useUserStore = defineStore(
    // 唯一ID
    'user', {
        state: () => ({
            account: localStorage.account || '',
            token: localStorage.token || '',
            failure_time: localStorage.failure_time || '',
            permissions: [],
            utype:"",
            city:"",
            isChooseCity:false
        }),
        getters: {
            isLogin: state => {
                let retn = false
                if (state.token) {
                    if (new Date().getTime() < state.failure_time * 1000) {
                        retn = true
                    }
                }
                return retn
            }
        },
        actions: {
            login(data) {
                return new Promise((resolve, reject) => {
                    APIlogin(data).then(res => {
                        console.log(res)
                        let name = data.username
                        let time = res.data.expires_in + Date.now() / 1000
                        let token = res.data.access_token
                        localStorage.setItem('account', name)
                        localStorage.setItem('token', token)
                        localStorage.setItem('failure_time', time)
                        this.account = name
                        this.token = token
                        this.failure_time = time
                        ElMessage.success(res.msg)
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            logout() {
                return new Promise(resolve => {
                    const menuStore = useMenuStore()
                    localStorage.removeItem('account')
                    localStorage.removeItem('token')
                    localStorage.removeItem('failure_time')
                    this.account = ''
                    this.token = ''
                    this.failure_time = ''
                    menuStore.invalidRoutes()
                    menuStore.removeRoutes()
                    resolve()
                })
            },
            // 获取我的权限
            getPermissions() {
                return new Promise(resolve => {
                    //通过 mock 获取权限
                    APIgetPermissions({ account: this.account }).then(res => {
                        this.permissions = res.data.permissions
                        resolve(res.data.permissions)
                    })
                    // this.permissions=['supervise','supervise.home','information']
                    // console.log(this.permissions)
                    // resolve(this.permissions)
                })
            },
            // setPermissions(data){
            //    return new Promise(resolve=>{
            //     for(let i=0;i<data.length;i++){
            //         this.permissions.push(data[0])
            //     }
            //     resolve()
            //    })
            // },
            editPassword(data) {
                return new Promise(resolve => {
                    APIeditPassword({ password: data.password }).then(res => {
                        ElMessage.success(res.msg)
                        resolve(res)
                    })
                })
            }
        }
    }
)

export function useUserOutsideStore() {
    return useUserStore(piniaStore)
}
