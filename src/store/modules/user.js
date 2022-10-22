import { defineStore } from 'pinia'
import { piniaStore } from '@/store'
import {
    APIlogin,
    APIgetUserinfo,
    APIeditPassword,
    APIgetLoginUserGroup,
    APIgetGroupPerms
} from '@/api/custom/custom.js'
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
            utype: '',
            gid: '',
            groupChinaCode: '',
            // 后加的
            uid: localStorage.uid || ''
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
                        this.utype = res.auth_type
                        this.name = res.username
                        this.time = res.expires_in + Date.now() / 1000
                        this.token = res.access_token
                        this.account = this.name
                        this.failure_time = this.time
                        localStorage.setItem('account', this.name)
                        localStorage.setItem('token', this.token)
                        localStorage.setItem('failure_time', this.time)
                        resolve(res)
                    }).catch(error => {
                        reject({})
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
            // 获取用户信息。
            getInfo() {
                return new Promise((resolve, reject) => {
                    APIgetUserinfo().then(res => {
                        localStorage.setItem('uid', res.id)
                        localStorage.setItem(res.id + '_user_info', JSON.stringify(res))
                        localStorage.setItem(res.id+'_user_city', JSON.stringify({}))
                        localStorage.setItem(res.id+'_user_group', JSON.stringify({}))
                        resolve(res)
                    }).catch(error => {
                        reject({})
                    })
                })
            },
            // 获取用户组
            getGroups() {
                return new Promise((resolve, reject) => {
                    APIgetLoginUserGroup().then(res => {
                        if (res.length > 0) {
                            localStorage.setItem(this.uid + '_user_group', JSON.stringify(res[0]))
                            resolve(res)
                        } else {
                            reject({})
                        }
                    }).catch(error => {
                        reject({})
                    })
                })
            },
            // 获取我的权限
            getPermissions() {
                return new Promise(resolve => {
                    let uid = localStorage.getItem('uid')
                    let user_info =JSON.parse(localStorage.getItem(uid+'_user_info'))
                    if (user_info.auth_type == 'pt') {
                        this.permissions = ['*']
                        resolve(this.permissions)
                    } else {
                        let allPermisson = []
                        APIgetLoginUserGroup().then(res => {
                            if (res.length > 0) {
                                if (!JSON.parse(localStorage.getItem(uid + '_user_group'))) {
                                    localStorage.setItem(uid + '_user_group', JSON.stringify(res[0]))
                                }
                                APIgetGroupPerms(JSON.parse(localStorage.getItem(uid + '_user_group')).id).then(res => {
                                    res.forEach(item => {
                                        for (let key in item) {
                                            if (key == 'name') {
                                                allPermisson.push(item[key])
                                            }
                                        }
                                    })
                                    console.log(allPermisson)
                                    this.permissions = allPermisson
                                    resolve(this.permissions)
                                })
                            } else {
                                resolve('')
                            }
                        })
                    }
                })
            },
            editPassword(data) {
                return new Promise(resolve => {
                    APIeditPassword({ password: data.password }).then(res => {
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
