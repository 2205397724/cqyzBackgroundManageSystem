<template>
    <!-- <el-tag class="btnNone" type="danger" size="small" @click="showDialog">通知</el-tag> -->
    <el-dialog v-model="switch_dialog" title="发送通知" width="60%">
        <div>
            <el-form :model="formData" label-width="80" label-position="left">
                <el-row>
                    <el-col>
                        <el-form-item label="消息主题">
                            <el-input v-model="formData.title" />
                        </el-form-item>
                    </el-col> 
                    <el-col>
                        <el-form-item label="消息内容">
                            <el-input type="textarea" v-model="formData.content" />
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="接收人">
                            <el-radio-group v-model="formData.user">
                                <el-radio label="1" size="large" disabled>所有用户</el-radio>
                                <el-radio label="2" size="large" disabled>指定单个或多个用户</el-radio>
                                <el-radio label="3" size="large" disabled>指定范围内的所有用户</el-radio>
                                <el-radio label="4" size="large">参与范围内的用户</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col> 
                    <el-col>
                        <el-form-item label="通知方式">
                            <el-checkbox-group v-model="formData.type">
                                <el-checkbox label="1">站内信</el-checkbox>
                                <el-checkbox label="2">APP推送</el-checkbox>
                                <el-checkbox label="3" disabled>手机短信</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <template #footer>
            <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                <el-button @click="switch_dialog=false">取消</el-button>
                <el-button type="primary" @click="sendNotice">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup name="Notice">
import {
    postNoticeSurvey,
    postNoticeRange,
    postNoticeMany,
    postNoticeAll,
} from '@/api/custom/custom.js'
import {
    ElMessage
} from 'element-plus'
import {
    reactive,
    ref,
    watch
} from 'vue'
const { proxy } = getCurrentInstance()
const switch_dialog = ref(false)
const formData = reactive({
    "title":"",
    "content":"",
    "user" :"4",
    "type" :['1','2']
})
let tgt_type = ref('')
let details = reactive({})
//发送消息
const sendNotice = ()=>{
    if(formData.type.length>0){
        switch(formData.user){
            case '1':
                break
            case '2':
                break
            case '3':
                break
            case '4':
                let data = {
                    sid:details.id,
                    can_type:2,
                    title:formData.title,
                    content:formData.content,
                    payload:{
                        tgt_type:tgt_type,
                        tgt:details.id
                    }
                }
                postNoticeSurvey(data).then(res=>{
                    ElMessage.success('发送成功')
                })
                break
        }
    }else{
        ElMessage.error('请选择通知方式')
    }
}
// 接收父组件传递过来数据
onMounted(() => {
    proxy.$eventBus.off('noticeData')
    proxy.$eventBus.on('noticeData',(data)=>{
        details = data[0]
        tgt_type = data[1]
        if(details.id){
            switch_dialog.value = true
            formData.title = details.name || details.title
            formData.content =  details.name || details.title
        }
    })
})
</script>
<style lang="scss" scoped>
</style>
