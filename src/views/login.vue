<template>
    <div>
        <div class="bg-banner">
            <p>重庆市哪屋优商务信息咨询有限公司</p>
        </div>
        <div id="login-box">
            <div class="logo">
                <img src="../assets/images/logo2.png" alt="">
            </div>
            <el-form v-show="formType == 'login'" ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
                <div class="title-container">
                    <h3 class="title">{{ title }}管理后台</h3>
                </div>
                <div>
                    <el-form-item prop="account">
                        <el-input ref="name" v-model="loginForm.account" placeholder="用户名" type="text" tabindex="1" autocomplete="on">
                            <template #prefix>
                                <svg-icon name="user" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码" tabindex="2" autocomplete="on" @keyup.enter="handleLogin">
                            <template #prefix>
                                <svg-icon name="password" />
                            </template>
                            <template #suffix>
                                <svg-icon :name="passwordType === 'password' ? 'eye' : 'eye-open'" @click="showPassword" />
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-radio-group v-model="user_utype">
                      <el-radio label="pt">总平台</el-radio>
                      <el-radio label="ptr">区域平台</el-radio>
                      <el-radio label="pm">企业端</el-radio>
                      <el-radio label="gov">行政端</el-radio>
                    </el-radio-group>
                </div>
                <div class="flex-bar">
                    <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
                    <!-- <el-button type="text" @click="formType = 'reset'">忘记密码</el-button> -->
                </div>
                <el-button :loading="loading" type="primary" size="large" style="width: 100%;" @click.prevent="handleLogin">登 录</el-button>
            </el-form>
            <el-form v-show="formType == 'reset'" ref="resetFormRef" :model="resetForm" :rules="resetRules" class="login-form" auto-complete="on" label-position="left">
                <div class="title-container">
                    <h3 class="title">重置密码</h3>
                </div>
                <div>
                    <el-form-item prop="account">
                        <el-input ref="name" v-model="resetForm.account" placeholder="用户名" type="text" tabindex="1" autocomplete="on">
                            <template #prefix>
                                <svg-icon name="user" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="captcha">
                        <el-input ref="captcha" v-model="resetForm.captcha" placeholder="验证码" type="text" tabindex="2" autocomplete="on">
                            <template #prefix>
                                <svg-icon name="captcha" />
                            </template>
                            <template #append>
                                <el-button>发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="newPassword">
                        <el-input ref="newPassword" v-model="resetForm.newPassword" :type="passwordType" placeholder="新密码" tabindex="3" autocomplete="on">
                            <template #prefix>
                                <svg-icon name="password" />
                            </template>
                            <template #suffix>
                                <svg-icon :name="passwordType === 'password' ? 'eye' : 'eye-open'" @click="showPassword" />
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
                <el-row :gutter="15" style="padding-top: 20px;">
                    <el-col :md="6">
                        <el-button size="large" style="width: 100%;" @click="formType = 'login'">去登录</el-button>
                    </el-col>
                    <el-col :md="18">
                        <el-button :loading="loading" type="primary" size="large" style="width: 100%;" @click.prevent="handleFind">确 认</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <Copyright v-if="settingsStore.copyright.enable" />
    </div>
</template>

<script setup name="Login">
import md5 from 'md5'
import {APIgetLoginUserGroup} from '@/api/custom/custom'
const { proxy } = getCurrentInstance()
const route = useRoute(), router = useRouter()
import {ElMessage} from 'element-plus'
import { useSettingsStore } from '@/store/modules/settings'
const settingsStore = useSettingsStore()
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()
// import { APIgetUser_where_group } from '@/api/custom/custom'
const title = import.meta.env.VITE_APP_TITLE
const user_utype=ref("")
// 表单类型，login 登录，reset 重置密码
const formType = ref('login')

const loginForm = ref({
    account: localStorage.login_account || '',
    password: '',
    remember: !!localStorage.login_account,
    domain: localStorage.domain || ''
})
const loginRules = ref({
    account: [
        { required: true, trigger: 'blur', message: '请输入用户名' }
    ],
    password: [
        { required: true, trigger: 'blur', message: '请输入密码' },
        { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' }
    ],
    domain: [
        { required: true, trigger: 'blur', message: '请输入主域名' }
    ]
})

const resetForm = ref({
    account: localStorage.login_account || '',
    captcha: '',
    newPassword: ''
})
const resetRules = ref({
    account: [
        { required: true, trigger: 'blur', message: '请输入用户名' }
    ],
    captcha: [
        { required: true, trigger: 'blur', message: '请输入验证码' }
    ],
    newPassword: [
        { required: true, trigger: 'blur', message: '请输入新密码' },
        { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' }
    ]
})

const loading = ref(false)
const passwordType = ref('password')
const redirect = ref(null)

onMounted(() => {
    redirect.value = route.query.redirect ?? '/'
})

function showPassword() {
    passwordType.value = passwordType.value === 'password' ? '' : 'password'
    nextTick(() => {
        proxy.$refs.password.focus()
    })
}

function handleLogin() {
    proxy.$refs.loginFormRef.validate(valid => {
        if (valid) {
            if(user_utype.value==""){
                ElMessage.error("请选择类型")
                return
            }
            loading.value = true
            let data = {
                'auth_type': user_utype.value,
                'username': loginForm.value.account,
                'password': loginForm.value.password
            }
            console.log(data)
            userStore.login(data).then(() => {
                localStorage.removeItem("utype")
                userStore.utype=data.auth_type
                loading.value = false
                localStorage.setItem('domain', import.meta.env.VITE_APP_DOMAIN)
                if (loginForm.value.remember) {
                    localStorage.setItem('login_account', loginForm.value.account)
                } else {
                    localStorage.removeItem('login_account')
                }
                if(data.auth_type==="pt"){
                    userStore.utype="pt"
                    sessionStorage.setItem("utype",md5('pt'))
                    sessionStorage.setItem("isChooseCity",false)
                }
                if(data.auth_type!=="pt"){
                    userStore.utype=data.auth_type
                    sessionStorage.setItem("utype",'none')
                    userStore.isChooseCity=true
                    sessionStorage.setItem("isChooseCity",true)
                }
                APIgetLoginUserGroup().then(res=>{
                    console.log(res)
                    userStore.groupChinaCode=res.data[0].region_cc
                    localStorage.setItem("groupChinaCode",res.data[0].region_cc)
                })
                router.push(redirect.value)
            }).catch(() => {

                loading.value = false
            })
        }
    })
}

function handleFind() {
    proxy.$message({
        message: '重置密码仅提供界面演示，无实际功能，需开发者自行扩展',
        type: 'info'
    })
    proxy.$refs.resetFormRef.validate(valid => {
        if (valid) {
            // 这里编写业务代码
        }
    })
}

// function testAccount(account) {
//     loginForm.value.account = account
//     loginForm.value.password = '123456'
//     handleLogin()
// }
</script>

<style lang="scss" scoped>
[data-mode="mobile"] {
    #login-box {
        max-width: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    .bg-banner p {
        max-width: 80%;
        font-size: 0;
    }
}
:deep(input[type="password"]::-ms-reveal) {
    display: none;
}
.bg-banner {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-image: url("../assets/images/login-big.jpg");
    background-size: cover;
    background-position: center center;
    p {
        font-weight: bold;
        color: #666;
        font-size: 1.5rem;
        padding: 20px 0 0 60px;
        letter-spacing: 1em;
        margin: 0 auto;
    }
}
#login-box {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 70%;
    transform: translateX(-50%) translateY(-50%);
    background: rgb(255 255 255 / 37.3%);
    border-radius: 10px;
    box-shadow: 0 0 5px #999;
    .logo {
        position: absolute;
        top: -11%;
        left: 35%;
        transform: translateX(50%) translateY(50%);
        img {
            width: 70px;
            height: 50px;
        }
    }
    .login-form {
        width: 450px;
        padding: 50px 35px 30px;
        overflow: hidden;
        .title-container {
            position: relative;
            .title {
                font-size: 22px;
                color: #444;
                margin: 0 auto 30px;
                text-align: center;
                font-weight: 800;
                @include text-overflow;
            }
        }
    }
    :deep(.el-input) {
        height: 48px;
        line-height: inherit;
        width: 100%;
        input {
            height: 48px;
        }
        .el-input__prefix,
        .el-input__suffix {
            display: flex;
            align-items: center;
        }
        .el-input__prefix {
            left: 10px;
        }
        .el-input__suffix {
            right: 10px;
        }
    }
    .flex-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .el-checkbox {
        margin: 20px 0;
    }
}
.copyright {
    position: absolute;
    bottom: 30px;
    width: 100%;
    margin: 0;
    mix-blend-mode: difference;
}
</style>
