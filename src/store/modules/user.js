import { defineStore } from 'pinia'
import { piniaStore } from '@/store'
import { ElMessage } from 'element-plus'
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
            groupChinaCode: ''
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
                        this.time = res.data.expires_in + Date.now() / 1000
                        this.token = res.data.access_token
                        localStorage.setItem('token', this.token)
                        localStorage.setItem('failure_time', this.time)
                        this.failure_time = this.time
                        ElMessage.success('登录成功')
                        this.getInfo()
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
                    sessionStorage.removeItem('isChooseCity')
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
                        let data = {
                            info: res.data
                        }
                        localStorage.setItem('user_info', JSON.stringify({ [res.data.id]: data }))
                        resolve()
                    }).catch(error => {
                        console.log(error)
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
