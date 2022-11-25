// 上传文件
import {
    APIpostFiles
} from '@/api/custom/custom.js'
import axios from 'axios'
import {
    ElMessage
} from 'element-plus'
export function getFilesKeys(files, folder, type) {
    return new Promise((resolve, reject) => {
        APIpostFiles({
            'folder': folder,
            'number': files.length
        }).then(res => {
            const atemp = []
            for (let i in files) {
                const formData = new FormData()
                formData.append('Policy', res.inputs.Policy)
                formData.append('X-Amz-Algorithm', res.inputs['X-Amz-Algorithm'])
                formData.append('X-Amz-Credential', res.inputs['X-Amz-Credential'])
                formData.append('X-Amz-Date', res.inputs['X-Amz-Date'])
                formData.append('X-Amz-Signature', res.inputs['X-Amz-Signature'])
                formData.append('acl', res.inputs.acl)
                let key = ''
                // 公示的附件没有name属性
                if(files[i].name) {
                    key = files[i].name.split(".")[1]
                }
                formData.append('key', `${folder}/${res.keys[i]}.${key}`)
                formData.append('Content-Type', files[i].type)
                formData.append('file', files[i])
                const api = axios.create({
                    baseURL: res.attrs.action,
                    timeout: 1000,
                    headers: {
                        'Content-Type': res.attrs.enctype
                    }
                })

                atemp.push(
                    new Promise((resolve2, reject) => {
                        api[res.attrs.method.toLowerCase()]('', formData).then(res2 => {
                            resolve2(`${folder}/${res.keys[i]}.${key}`)
                        }).catch(err => {
                            reject('err')
                        })
                    })
                )
            }
            Promise.all(atemp).then(res3 => {
                resolve(res3)
            }).catch(err => {
                reject('err')
            })
        })
    })

    // ElMessage.success(res2.statusText)
}
