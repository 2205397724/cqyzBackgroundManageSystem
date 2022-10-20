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
                        console.log(res)
                        let data = {
                            info: res
                        }
                        if (!localStorage.getItem('uid')) {
                            localStorage.setItem('uid', res.id)
                        }
                        if (!localStorage.getItem(res.id + '_user_info')) {
                            localStorage.setItem(res.id + '_user_info', JSON.stringify(res))
                        }
                        // localStorage.setItem('user_info', JSON.stringify({ [res.id]: data }))
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
                            let data = {
                                groups: res[0]
                            }
                            // localStorage.setItem('user_info', JSON.stringify({ [this.uid]: data }))
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
                    console.log(localStorage.getItem('utype'))
                    if (localStorage.getItem('utype') == 'pt') {
                        this.permissions = ['*']
                        resolve(this.permissions)
                    } else {
                        // APIgetPermsList().then(res => {
                        //     console.log(res)
                        //     res.forEach(item => {
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
                            if (res.length > 0) {
                                let uid = localStorage.getItem('uid')
                                if (!JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_groupChinaCode'))) {
                                    localStorage.setItem(uid + '_groupChinaCode', JSON.stringify(res[0]))
                                }
                                APIgetGroupPerms(JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_groupChinaCode')).id).then(res => {
                                    console.log(res)
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
