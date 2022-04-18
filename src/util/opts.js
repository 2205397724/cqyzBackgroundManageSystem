// // 配置项
// import { getOpts, getOptVal } from '@/util/opts.js'
// const opts_alls = reactive({
//     obj: {}
// })
// getOpts(['status_cert', 'other_auth']).then(res => {
//     opts_alls.obj = res
// })

import api2 from '@/api/index.js'
const opts = {
    'test': [{
        'key': 10,
        'val': '安全完好'
    },
    {
        'key': 11,
        'val': '有安全隐患'
    },
    {
        'key': 12,
        'val': '有问题待维修'
    }
    ]
}

export async function getOpts(arr) {
    const valArr = {}
    const keys = []
    for (let i in arr) {
        if (opts[arr[i]]) {
            valArr[arr[i]] = opts[arr[i]]
        } else {
            keys.push(arr[i])
        }
    }
    if (keys.length > 0) {
        const res = await api2.post('/optitem', { lab: keys })
        return { ...valArr, ...res.data }
    }
    return { ...valArr }
}
export function getOptVal(arr, key)  {
    for (let i in arr) {
        if (arr[i].key == key) {
            return arr[i].val
        }
    }
    return ''
}
