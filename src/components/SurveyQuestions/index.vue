<template>
    <div>
        <el-scrollbar height="400px">
            <div class="m-b-20">
                <el-button type="primary" style="padding: 19px 18px;position: relative;top: 5px;" @click="addServeyTopic()">添加题目</el-button>
            </div>
            <el-table
                :data="topic_details.item"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                class="tab_1"
            >
                <el-table-column type="index" width="50" />
                <el-table-column prop="title" label="题目" />
                <el-table-column prop="type" label="题目分值">
                    <template #default="scope">
                        <span>{{ scope.row.score }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="题目选项类型">
                    <template #default="scope">
                        <span v-if="scope.row.type == 1">单选</span>
                        <span v-else-if="scope.row.type == 2">多选</span>
                        <span v-else-if="scope.row.type == 3">主观填空</span>
                        <span v-else-if="scope.row.type == 0">文字描述</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="题目排序">
                    <template #default="scope">
                        <span>{{ scope.row.sort }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" width="180px" label="操作">
                    <template #default="scope">
                        <el-button border type="primary" size="small" @click="modifyServeyTopic(scope.row)">
                            修改
                        </el-button>
                        <el-popconfirm
                            title="确定要删除当前项么?" cancel-button-type="info"
                            @confirm="deleteFunc(scope.row)"
                        >
                            <template #reference>
                                <el-button type="danger" size="small">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-scrollbar>
        <!-- 修改添加问卷题目 -->
        <el-dialog v-model="switch_examine" :title="str_title" width="50%">
            <div>
                <div class="details-box">
                    <el-form :model="topic_examine.item" label-position="left">
                        <el-row>
                            <el-col>
                                <el-form-item label="题目" label-width="80px">
                                    <!-- <el-input v-model="topic_examine.item.title"></el-input> -->
                                    <el-input
                                        v-model="topic_examine.item.title"
                                        type="textarea"
                                        :autosize="{ minRows: 2, maxRows: 4 }"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <el-form-item label="题目类型" label-width="80px">
                                    <el-radio-group v-model="topic_examine.item.type" class="ml-4">
                                        <el-radio label="1" size="large">单选</el-radio>
                                        <el-radio label="2" size="large">多选</el-radio>
                                        <el-radio label="3" size="large">主观填空</el-radio>
                                        <el-radio label="0" size="large">文字描述</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="10">
                            <el-col>
                                <el-form-item label="计分方式" label-width="80px">
                                    <el-radio-group v-model="topic_examine.item.score_calc" class="ml-4">
                                        <el-radio label="0" size="large">不计分</el-radio>
                                        <el-radio label="1" size="large">取最小值</el-radio>
                                        <el-radio label="2" size="large">取最大值</el-radio>
                                        <el-radio label="3" size="large">取平均值四舍五入</el-radio>
                                        <el-radio label="4" size="large">取平均值向下取整</el-radio>
                                        <el-radio label="5" size="large">取平均值向上取整</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row v-if="topic_examine.item.score_calc != 0" :gutter="10">
                            <el-col>
                                <el-form-item label="题目分值" label-width="80px">
                                    <el-input v-model="topic_examine.item.score" placeholder="0" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <!-- 选择题 -->
                    <div v-if="topic_examine.item.type == 1 || topic_examine.item.type == 2">
                        <div class="width-100 m-b-10 display" style="border-bottom: solid 1px #e4e7ed;">
                            <span class="size-lg strong" style="color: #409eff;flex: 1;">选项</span>
                            <el-button class="m-b-10" type="primary" size="small" @click="addopts()">增加选项</el-button>
                        </div>
                        <el-scrollbar height="140px">
                            <el-row v-for="(item,i) in opts" :key="item.id" :gutter="24" class="m-b-10">
                                <el-col :span="12" class="flex">
                                    <span style="width: 80px;line-height: 32px;">选项内容</span>
                                    <el-input v-model="item.content" />
                                </el-col>
                                <el-col :span="4" class="flex">
                                    <span style="width: 60px;line-height: 32px;">排序</span>
                                    <el-input v-model="item.score" />
                                </el-col>
                                <el-col :span="4" class="flex">
                                    <span style="width: 60px;line-height: 32px;">分值</span>
                                    <el-input v-model="item.sort" />
                                </el-col>
                                <el-col :span="4">
                                    <el-popconfirm
                                        title="确定要删除当前项么?" cancel-button-type="info"
                                        @confirm="opts.splice(i,1)"
                                    >
                                        <template #reference>
                                            <el-button type="danger">
                                                删除
                                            </el-button>
                                        </template>
                                    </el-popconfirm>
                                </el-col>
                            </el-row>
                        </el-scrollbar>
                    </div>
                    <!-- 主观填空题 -->
                    <!-- <div v-else-if="topic_examine.item.type == 3" class="m-l-40">
                        <div class="width-100 m-b-10 display" style="border-bottom: solid 1px #e4e7ed;">
                            <span class="size-lg strong" style="color: #409eff;flex: 1;">题目</span>
                        </div>
                        <el-input
                            v-model="topic_examine.item.content"
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4 }"
                        ></el-input>
                    </div> -->
                    <!-- 文字描述 -->
                    <!-- <div v-else-if="topic_examine.item.type == 0" class="m-l-40">
                        <div class="width-100 m-b-10 display" style="border-bottom: solid 1px #e4e7ed;">
                            <span class="size-lg strong" style="color: #409eff;flex: 1;">文字描述</span>
                        </div>
                        <el-input
                            v-model="topic_examine.item.title"
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4 }"
                        ></el-input>
                    </div> -->
                </div>
            </div>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_examine=false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc(id)">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup name="SurveyQuestions">
import {
    APIgetSurveyTopic,
    APIgetSurveyTopicDetail,
    APIdeleteSurveyTopic,
    APIaddSurveyTopic,
    APImodifySurveyTopic
} from '@/api/custom/custom.js'
import {
    ElMessage
} from 'element-plus'
// 接收父组件传递过来的id
const props = defineProps(['id'])
onMounted(() => {
    console.log(props.id)
    topicsFunc()
})
// 问卷题目
// const topic_details = reactive({
//     item: ''
// })
const topic_details = reactive({
    item: [[], [], [], []]
})
// 添加问卷题目
const str_title = ref('添加')
let switch_examine = ref(false)
let topic_examine = reactive({
    item: {}
})
let opts = reactive([])
// 添加问卷题目
const addServeyTopic = () => {
    // console.log(props.id)
    str_title.value = '添加'
    switch_examine.value = true
    // 清除问卷的信息
    topic_examine.item = { 'sid': props.id, 'extra': null, 'sort': 5 }
    opts.length = 0
}
// 修改问卷题目
const modifyServeyTopic = val => {
    console.log(val.id)
    str_title.value = '修改'
    // 获取问卷题目详情
    APIgetSurveyTopicDetail(val.id).then(res => {
        topic_examine.item = res
        // 修改为字符串类型，让选项被选中，默认为int类型，选项没有选中
        topic_examine.item.type += ''
        topic_examine.item.score_calc += ''
        // 清除选项缓存数据
        opts.length = 0
        // 将选项数据遍历插入数组对象
        res.opts.forEach(element => {
            opts.push(element)
        })
        console.log(opts)
        switch_examine.value = true
    })
}
// 删除问卷题目
const deleteFunc = val => {
    APIdeleteSurveyTopic(val.id).then(res => {
        refreshFunc()
        // ElMessage.success(res.statusText)
        ElMessage.success('删除成功')
    })
}
// 确定提交添加修改问卷题目
const dialogExamineCloseFunc = id => {
    topic_examine.item.opts = opts
    // console.log(topic_examine.item)
    if (str_title.value == '添加') {
        // console.log('qqqqqq',topic_examine.item)
        APIaddSurveyTopic(topic_examine.item).then(res => {
            if (!res.code) {
                refreshFunc()
                // ElMessage.success(res.msg)
                ElMessage.success('添加成功')
                switch_examine.value = false
            }
        })
    } else {
        id = topic_examine.item.id
        // console.log(id)
        APImodifySurveyTopic(id, topic_examine.item).then(res => {
            refreshFunc()
            // ElMessage.success(res.msg)
            ElMessage.success('修改成功')
            switch_examine.value = false
        })
    }

}
// 获取问卷题目
const topicsFunc = () => {
    let params = {
        sid: props.id
    }
    // 问卷题目列表
    APIgetSurveyTopic(params).then(res => {
        topic_details.item = [[], [], [], []]
        console.log(res)
        // 对题目进行排序
        res.forEach(element => {
            if (element.type === 0) {
                topic_details.item[0].push(element)
            } else if (element.type === 1) {
                topic_details.item[1].push(element)
            } else if (element.type === 2) {
                topic_details.item[2].push(element)
            } else if (element.type === 3) {
                topic_details.item[3].push(element)
            }
        })
        topic_details.item = [...topic_details.item[1], ...topic_details.item[2], ...topic_details.item[3], ...topic_details.item[0]]
    })
    console.log('topic_details', topic_details)
}
// 增加选项
const addopts = () => {
    opts.push(
        {
            'content': '',
            'score': '',
            'sort': ''
        }
    )
}
// 刷新
const refreshFunc = () => {
    topicsFunc()
}
</script>

<style lang="scss" scoped>
    .display {
        display: flex;
    }
    //弹性布局
    .flex {
        display: flex;
    }
</style>
