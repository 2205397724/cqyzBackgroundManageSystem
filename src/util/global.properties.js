import { auth, authAll } from '@/util'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import Cookies from 'js-cookie'
import hotkeys from 'hotkeys-js'
import mitt from 'mitt'

export default function globalProperties(app) {
    // 鉴权
    app.config.globalProperties.$auth = auth
    app.config.globalProperties.$authAll = authAll
    dayjs.locale('zh-cn')// 使用本地化语言
    app.config.globalProperties.$dayjs = dayjs
    app.config.globalProperties.$cookies = Cookies
    app.config.globalProperties.$hotkeys = hotkeys
    app.config.globalProperties.$eventBus = mitt()
}
