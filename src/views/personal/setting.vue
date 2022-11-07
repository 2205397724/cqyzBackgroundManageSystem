<template>
    <div>
        <!-- 页面：Setting -->
        <page-main>
            <el-tabs tab-position="left" style="height: 600px;">
                <el-tab-pane label="基本设置" class="basic">
                    <h2>基本设置</h2>
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <el-form ref="ruleFormRef" :model="form.item" label-width="120px" label-suffix="：">
                                <!-- <el-form-item v-if="form.item.name" label="真实姓名" prop="username">
                                    <el-input placeholder="请输入你的真实姓名" />
                                </el-form-item> -->
                                <el-form-item label="昵称" prop="nickname">
                                    <el-input v-model="form.item.nickname" placeholder="请输入昵称" />
                                </el-form-item>
                                <!-- <el-form-item label="手机号">
                                    <el-input v-model="form.item.mobile" placeholder="请输入你的手机号" />
                                </el-form-item>
                                <el-form-item label="身份证号">
                                    <el-input v-model="form.item.id_card" placeholder="请输入你的身份证号" />
                                </el-form-item>
                                <el-form-item label="密码">
                                    <el-input v-model="form.item.password" placeholder="请输入你的新密码" />
                                </el-form-item>-->
                                <el-form-item>
                                    <el-button type="primary" @click="modifyUserInfo">保存</el-button>
                                </el-form-item>
                            </el-form>
                            <!-- <el-form
                                ref="ruleFormRef"
                                :model="form.item"
                            >
                                <el-row :gutter="10">
                                    <el-col :md="24" :lg="12">
                                        <el-form-item
                                            label="用户名" prop="username" label-width="120px"
                                        >
                                            <el-input v-if="form.item.username" v-model="form.item.username" placeholder="请输入你的用户名" />
                                        </el-form-item>
                                    </el-col> -->
                            <!-- <el-col v-if="from_examine.item.houseable_type" :md="24" :lg="12">
                                        <el-form-item
                                            label="直属楼栋/单元ID" prop="houseable_id" label-width="120px"
                                            :error="from_error.msg&&from_error.msg.houseable_id?from_error.msg.houseable_id[0]:''"
                                        >
                                            <div v-if="from_examine.item.houseable_type=='buildings'" style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                                <SearchBuilding v-model:str="from_examine.item.houseable_id" />
                                            </div>
                                            <div v-else-if="from_examine.item.houseable_type=='units'" style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                                <SearchUnit v-model:str="from_examine.item.houseable_id" />
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="24" :lg="12">
                                        <el-form-item
                                            label="物理楼层" prop="floor_truth" label-width="120px"
                                            :error="from_error.msg&&from_error.msg.floor_truth?from_error.msg.floor_truth[0]:''"
                                        >
                                            <el-input
                                                v-model="from_examine.item.floor_truth"
                                                placeholder=""
                                            >
                                                <template #append>层</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col> -->
                            <!-- </el-row>
                            </el-form> -->
                        </el-col>
                        <el-col :span="8" style="position: relative;">
                            <!-- <image-upload v-model:url="form.headimg" action="http://scrm.1daas.com/api/upload/upload" name="image" :data="{'token':'TKD628431923530324'}" notip class="headimg-upload" @on-success="handleSuccess" /> -->
                            <el-upload
                                action="***"

                                :auto-upload="false"
                                :file-list="fileListFn(form.item.avatar)"
                                :on-change="(file,files)=>{
                                    form.item.avatar = file
                                }"
                                :on-remove="(file,files)=>{
                                    form.item.avatar = file
                                }"
                            >
                                <!-- <el-button type="primary" class="m-b-10">选择</el-button> -->
                                <div class="portrait">
                                    <span v-if="!form.item.avatar" style="position: absolute; top: 39%; left: 32%; color: #fe9c7d;">头像</span>
                                    <el-image v-if="form.item.avatar&&!portrait.item.image" :src="VITE_APP_FOLDER_SRC+form.item.avatar" alt="" class="portrait" style="top: 80% ;left: 45%;" />
                                    <el-image v-if="portrait.item.image" :src="portrait.item.image" alt="" class="portrait" style="top: 81% ;left: 46%;" />
                                </div>
                            </el-upload>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane v-if="flag_1" label="用户组设置" class="security">
                    <h2>用户组设置</h2>
                    <div class="setting-list">
                        <div v-for="(item,i) in userGroup.arr" :key="item.key" class="item">
                            <div class="content">
                                <div class="image inline-block">
                                    <img v-if="item.flag" src="../../assets/images/checked.jpg" class="wh_100 pointer" @click="ChangeUserGroupFunc(item,i)">
                                    <img v-else src="../../assets/images/unchecked.jpg" class="wh_100 pointer" @click="ChangeUserGroupFunc(item,i)">
                                </div>
                                <div class="title inline-block">{{ item.name }}</div>
                            </div>
                        </div>
                        <!-- <div v-for="item in userGroup.arr" :key="item.key" class="item">
                            <div class="content">
                                <div class="title">
                                    <el-checkbox
                                        :label="item.name"
                                        :true-label="item.id"

                                        @change="(val) => changeUserGroup(val, item.id)"
                                    />
                                </div>
                            </div> -->
                        <!-- <div class="action">
                                <el-button type="text" @click="editPassword">修改</el-button>
                            </div> -->
                        <!-- </div> -->
                        <!-- <div class="item">
                            <div class="content">
                                <div class="title">密保手机</div>
                                <div class="desc">已绑定手机：187****3441</div>
                            </div>
                            <div class="action">
                                <el-button type="text">修改</el-button>
                            </div>
                        </div>
                        <div class="item">
                            <div class="content">
                                <div class="title">备用邮箱</div>
                                <div class="desc">当前未绑定备用邮箱</div>
                            </div>
                            <div class="action">
                                <el-button type="text">绑定</el-button>
                            </div>
                        </div> -->
                    </div>
                </el-tab-pane>
            </el-tabs>
        </page-main>
    </div>
</template>

<script setup name="PersonalSetting">
import {
    ElMessage
} from 'element-plus'
import {
    APIgetUserinfo,
    APIputUserinfo,
    APIgetLoginUserGroup
} from '@/api/custom/custom.js'
const router = useRouter()
const { proxy } = getCurrentInstance()

const form = reactive({
    item: {
        username: 'dg'
    }
})

function handleSuccess(res) {
    if (res.error == '') {
        form.item.headimg = res.path
    } else {
        proxy.$message.warning(res.error)
    }
}
function editPassword() {
    router.push({
        name: 'personalEditPassword'
    })
}
const portrait = reactive({
    item: {
        image: ''
    }
})
const logo_1 = reactive({
    arr: []
})
// const changeUserGroup = (val, id) => {
//     console.log(localStorage.getItem('china_code'))
//     console.log(val)
//     console.log(id)
// }
import { getFilesKeys } from '@/util/files.js'
const VITE_APP_FOLDER_SRC = ref(import.meta.env.VITE_APP_FOLDER_SRC)
const fileListFn = val => {
    console.log(val)
    if (val) {
        let files = []
        // for (let i in obj) {
        files.push(val.raw)
        // }
        console.log(files)
        if (files.length > 0 && files[0]) {
            getFilesKeys(files, 'portrait').then(arr => {
                // let o = 0
                // for (let i in obj) {
                //     addMenuForm.item.logo = arr[o]
                //     o++
                // }
                console.log(arr)
                logo_1.arr.push(VITE_APP_FOLDER_SRC.value + arr[0])
                portrait.item.image = VITE_APP_FOLDER_SRC.value + arr[0]
                console.log(portrait.item.image)
            })
        }
        // if (str_title.value != '修改' && str_title.value != '添加') {
        // portrait.item.image = VITE_APP_FOLDER_SRC.value + val
        // } else {
        // form.item.avatar = val.name
        // }
        return []
    }

}
const userGroup = reactive({
    arr: []
})
const defaultUserGroup = ref('=')
APIgetUserinfo().then(res => {
    // console.log(res)
    form.item = res
    // console.log(res.username)
    form.item.username = res.username
    // console.log(form.item.username)
}).catch(error => {
    console.log(error)
})
APIgetLoginUserGroup().then(res => {
    // console.log(res)
    if (localStorage.getItem('utype') == 'pt') {
        flag_1.value = false
    } else {
        flag_1.value = true
    }
    // console.log(localStorage.getItem(localStorage.getItem('uid') + '_user_group'))
    // defaultUserGroup.value = sessionStorage.getItem('groupChinaCode')
    // for (let i in res) {
    //     if (res[i].region_cc == sessionStorage.getItem('groupChinaCode')) {
    //         flag.value = true
    //     }
    // }
    res.forEach((item, index) => {
        let user_group = JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_group'))
        if (item.region_cc == user_group.region_cc && item.region_val == user_group.region_val) {
            res[index].flag = true
        } else {
            res[index].flag = false
        }
    })
    // console.log(res)
    userGroup.arr = res
})
const ChangeUserGroupFunc = (val, i) => {
    // console.log(i)
    // console.log(val.flag)
    val.flag = !val.flag
    if (val.flag == true) {
        userGroup.arr.forEach((item, index) => {
            if (index != i) {
                item.flag = false
            }
        })
        localStorage.setItem(localStorage.getItem('uid') + '_user_group', JSON.stringify(val))
        // APIgetLoginUserGroup()
        // userGroup.arr[i]
    }
}
const flag = ref(false)
const flag_1 = ref(false)
const modifyUserInfo = () => {
    // console.log(form.item.avatar)
    let obj = {}
    // for (let i in addArchive.item.content) {
    if (typeof form.item.avatar != 'string') {
        obj = form.item.avatar
    }
    let files = []
    // for (let i in obj) {
    files.push(obj.raw)
    // }
    // console.log(files)
    if (files.length > 0) {
        getFilesKeys(files, 'avatar').then(arr => {
            // let o = 0
            // for (let i in obj) {
            //     addMenuForm.item.logo = arr[o]
            //     o++
            // }
            // console.log(arr)
            form.item.avatar = arr[0]
            // console.log(form.item)
            if (!form.item.name) {
                delete form.item.name
            }
            APIputUserinfo(form.item).then(res => {
                APIgetUserinfo()
                ElMessage.success('保存成功')
            }).catch(err => {
                ElMessage.success('保存失败')
            })
        })
        return false
    }
    APIputUserinfo(form.item).then(res => {
        // refreshFunc()
        ElMessage.success('保存成功')
    }).catch(err => {
        ElMessage.success('保存失败')
    })
}
</script>

<style lang="scss" scoped>
:deep(.el-tabs) {
    .el-tabs__header .el-tabs__nav {
        .el-tabs__active-bar {
            z-index: 0;
            width: 100%;
            background-color: #e1f0ff;
            border-right: 2px solid #409eff;
        }
        .el-tabs__item {
            text-align: left;
            padding-right: 100px;
        }
    }
    .el-tab-pane {
        padding: 0 20px 0 30px;
    }
}
h2 {
    margin: 0;
    margin-bottom: 30px;
    font-weight: normal;
}
.basic {
    :deep(.headimg-upload) {
        > div {
            text-align: center;
        }
        .el-upload-dragger {
            border-radius: 50%;
        }
    }
    .portrait {
        height: 90px;
        width: 90px;
        border: 1px solid #fe9c7d;
        border-radius: 50%;

        /* margin: auto; */
        position: absolute;
        top: 54%;
        left: 50%;
        transform: translate(-45%, -80%);
    }
}
.security {
    .setting-list {
        .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e8e8e8;
            .content {
                .title {
                    margin-bottom: 5px;
                    color: #666;
                }
                .desc {
                    font-size: 14px;
                    color: #999;
                }
            }
            &:last-child {
                border-bottom: 0;
            }
        }
    }
}
.image {
    vertical-align: middle;
    width: 20px;
    height: 20px;
    margin-right: 20px;
}
</style>
