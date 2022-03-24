import { defineStore } from 'pinia'
import { piniaStore } from '@/store'

import { APIlogin, APIgetPermissions, APIeditPassword } from '@/api/custom/custom.js'

import { useMenuStore } from './menu'

export const useUserStore = defineStore(
    // 唯一ID
    'user',
    {
        state: () => ({
            account: localStorage.account || '',
            token: localStorage.token || '',
            failure_time: localStorage.failure_time || '',
            permissions: []
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
                    // 通过 mock 进行登录
                    APIlogin(data).then(res => {
                        let name = data.username
                        let time = res.data.expires_in + Date.now() / 1000
                        let token = res.data.access_token
                        localStorage.setItem('account', name)
                        localStorage.setItem('token', token)
                        localStorage.setItem('failure_time', time)
                        this.account = name
                        this.token = token
                        this.failure_time = time
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
                    // 通过 mock 获取权限
                    APIgetPermissions({ account: this.account }).then(res => {
                        this.permissions = res.data.permissions
                        resolve(res.data.permissions)
                    })
                })
            },
            editPassword(data) {
                return new Promise(resolve => {
                    APIeditPassword({ password: data.password }).then((res) => {
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
