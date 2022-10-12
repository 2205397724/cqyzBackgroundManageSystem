<template>
    <div>
        <page-main class="hidden">
            <div class="m-b-20">
                <el-button type="primary" :icon="Plus" size="large" @click="addResidentialFunc">
                    添加业务
                </el-button>
            </div>
            <div class="row-box">
                <div class="row-col">
                    <div style="padding: 10px;">
                        <div style="font-weight: 700;">
                            天然过气户
                        </div>
                        <p class="row-p">平均办理时长</p>
                        <div>
                            <el-tag class="m-r-10" type="success">身份证照片</el-tag>
                            <el-tag type="success">不动产证</el-tag>
                        </div>
                    </div>
                </div>
                <div class="row-col">
                    b
                </div>
                <div class="row-col">
                    c
                </div>
            </div>
            <!-- 修改添加 -->
            <el-dialog v-model="data.switch" :title="str_title" width="60%" @closed="add_dialog_close">
                <div>
                    <el-form ref="ruleFormRef" :model="data.obj">
                        <el-row :gutter="10">
                            <el-col :md="24" :lg="12">
                                <el-form-item
                                    label="业务名称" label-width="100px"
                                    :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                                >
                                    <el-input v-model="data.obj.name" placeholder="" />
                                <!-- <el-input
                                    v-model="data.obj.logo"
                                    placeholder=""
                                /> -->
                                </el-form-item>
                            </el-col>
                            <el-col :md="24" :lg="12">
                                <el-form-item
                                    label="业务状态" label-width="100px"
                                    :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                                >
                                    <el-input v-model="data.obj.id_card" placeholder="" />
                                </el-form-item>
                            </el-col>
                            <el-col :md="24" :lg="12">
                                <el-form-item
                                    label="平均办理时常" label-width="100px"
                                    :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                                >
                                    <el-input v-model="data.obj.mobile" placeholder="" />
                                </el-form-item>
                            </el-col>
                            <el-col :md="24" :lg="12">
                                <el-form-item
                                    label="服务电话" label-width="100px"
                                    :error="err_add.obj&&err_add.obj.user_id?err_add.obj.user_id[0]:''"
                                >
                                    <el-input v-model="data.obj.mobile" placeholder="" />
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <el-form-item
                                    label="其他说明" label-width="100px"
                                    :error="err_add.obj&&err_add.obj.contact?err_add.obj.contact[0]:''"
                                >
                                    <el-input v-model="data.obj.cc" :autosize="{ minRows: 4, maxRows: 6 }" type="textarea" placeholder="" />
                                </el-form-item>
                            </el-col>
                            <!-- <el-col :md="24" :lg="24">
                                <div class="m-b-10">
                                    <el-button class="m-r-10" type="primary" @click="addServiceFunc">添加模板字段</el-button>
                                </div>
                                <div v-for="(item,i) in from_examine.item.fields" :key="i" class="serve-box">
                                    <el-row :gutter="10">
                                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                            <el-form-item label="字段名称" :error="from_error.msg&&from_error.msg['fields.'+i+'.label']?from_error.msg['fields.'+i+'.label'][0]:''">
                                                <el-input
                                                    v-model="item.label"
                                                    placeholder=""
                                                />
                                            </el-form-item>
                                        </el-col>
                                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                            <el-form-item label="字段类型" :error="from_error.msg&&from_error.msg['fields.'+i+'.type']?from_error.msg['fields.'+i+'.type'][0]:''">
                                                <el-input
                                                    v-model="item.type"
                                                    placeholder=""
                                                />
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <div class="m-b-10">
                                        <el-button type="primary" plain class="m-r-10" @click="addServiceOptFunc(i)">添加选项字段</el-button>
                                    </div>
                                    <template v-if="data.item.fields[i].prop&&data.item.fields[i].prop.arr">
                                        <div v-for="(child,j) in data.item.fields[i].prop.arr" :key="j" class="options">
                                            <el-row :gutter="10">
                                                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                                    <el-form-item :label="'键Key'+j">
                                                        <el-input
                                                            v-model="child.key"
                                                            placeholder=""
                                                        />
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                                    <el-form-item :label="'值Val'+j">
                                                        <el-input
                                                            v-model="child.val"
                                                            placeholder=""
                                                        />
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                            <div class="icon_1" @click="deleteServiceOptFunc(i,j)">
                                                <el-icon :size="20" color="#F56C6C">
                                                    <el-icon-circle-close />
                                                </el-icon>
                                            </div>
                                        </div>
                                    </template>
                                    <div class="delete-service" @click="deleteServiceFunc(i)">
                                        <el-icon :size="20" color="#F56C6C">
                                            <el-icon-circle-close />
                                        </el-icon>
                                    </div>
                                </div>
                            </el-col> -->
                        </el-row>
                    </el-form>
                </div>
                <template #footer>
                    <div class="footer">
                        <el-button @click="data.switch=false">取消</el-button>
                        <el-button type="primary" @click="postFunc">确定</el-button>
                    </div>
                </template>
            </el-dialog>
        </page-main>
    </div>
</template>
<script setup >
import {
    ref,
    reactive,
    watch
} from 'vue'
import {
    APIgetListArchiveAudit,
    APIputArchiveAudit,
    APIgetDetailsArchiveAudit
} from '@/api/custom/custom.js'
import {
    ElMessage
} from 'element-plus'
import { Search, Plus, Loading } from '@element-plus/icons-vue'
const loading_tab = ref(false)
const data = reactive({
    list: [],
    switch: false,
    obj: {}
})
const err_add = reactive({
    obj: {}
})
const str_title = ref('添加业务')
const getShareServicesList = () => {
    console.log('a')
}
const addResidentialFunc = () => {
    data.switch = true
}
</script>
<style lang="scss" scoped>
.btn button {
    padding: 20px 40px;
}
.row-box {
    display: flex;
    flex-wrap: wrap;
    .row-col {
        border: 1px solid #ddd;
        flex: 30%;
        margin-right: 10px;
        .row-p {
            font-size: 14px;
            color: #ccc;
        }
    }
}
</style>
