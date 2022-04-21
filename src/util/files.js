// 上传文件
import {
    APIpostFiles
} from '@/api/custom/custom.js'
import axios from 'axios'
import {
    ElMessage
} from 'element-plus'
export function getFilesKeys(files, folder) {
    return new Promise((resolve, reject) => {
        APIpostFiles({
            'folder': folder,
            'number': files.length
        }).then(res => {
            const atemp = []
            for (let i in files) {
                const formData = new FormData()
                formData.append('Policy', res.data.inputs.Policy)
                formData.append('X-Amz-Algorithm', res.data.inputs['X-Amz-Algorithm'])
                formData.append('X-Amz-Credential', res.data.inputs['X-Amz-Credential'])
                formData.append('X-Amz-Date', res.data.inputs['X-Amz-Date'])
                formData.append('X-Amz-Signature', res.data.inputs['X-Amz-Signature'])
                formData.append('acl', res.data.inputs.acl)
                formData.append('key', `${folder}/${res.data.keys[i]}`)
                formData.append('Content-Type', files[i].type)
                formData.append('file', files[i])
                const api = axios.create({
                    baseURL: res.data.attrs.action,
                    timeout: 1000,
                    headers: {
                        'Content-Type': res.data.attrs.enctype
                    }
                })

                atemp.push(
                    new Promise((resolve2, reject) => {
                        api[res.data.attrs.method.toLowerCase()]('', formData).then(res2 => {
                            resolve2(res2)
                        })
                    })
                )
            }
            Promise.all(atemp).then(res3 => {
                resolve(res3)
            })
        })
    })




    // ElMessage.success(res2.statusText)
}
