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
            china_code: '',
            gid: '',
            isChooseCity: false,
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
                        this.utype = res.data.auth_type
                        this.name = res.data.username
                        this.time = res.data.expires_in + Date.now() / 1000
                        this.token = res.data.access_token
                        this.account = this.name
                        this.failure_time = this.time
                        localStorage.setItem('account', this.name)
                        localStorage.setItem('token', this.token)
                        localStorage.setItem('failure_time', this.time)
                        resolve(res.data)
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
                        console.log(res)
                        let data = {
                            info: res.data
                        }
                        localStorage.setItem('uid', res.data.id)
                        // localStorage.setItem('user_info', JSON.stringify({ [res.data.id]: data }))
                        localStorage.setItem(res.data.id + '_user_info', JSON.stringify(res.data))
                        resolve(res.data)
                    }).catch(error => {
                        reject({})
                    })
                })
            },
            // 获取用户组
            getGroups() {
                return new Promise((resolve, reject) => {
                    APIgetLoginUserGroup().then(res => {
                        if (res.data.length > 0) {
                            let data = {
                                groups: res.data[0]
                            }
                            localStorage.setItem('user_info', JSON.stringify({ [this.uid]: data }))
                            resolve(res.data)
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
                    console.log(localStorage.getItem('utype'))
                    if (localStorage.getItem('utype') == 'pt') {
                        this.permissions = ['*']
                        resolve(this.permissions)
                    } else {
                        // APIgetPermsList().then(res => {
                        //     console.log(res)
                        //     res.data.forEach(item => {
                        //         for (let key in item) {
                        //             if (key == 'name') {
                        //                 perms.push(item[key])
                        //             }
                        //         }
                        //     })
                        //     this.permissions = perms
                        //     console.log(perms)
                        //     console.log('获取权限')
                        //     resolve(perms)
                        // })
                        let allPermisson = []
                        APIgetLoginUserGroup().then(res => {
                            if (res.data.length > 0) {
                                let currentGId = res.data[0].id
                                sessionStorage.setItem('groupChinaCode', res.data[0].region_cc)
                                APIgetGroupPerms(currentGId).then(res => {
                                    console.log(res)
                                    res.data.forEach(item => {
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
