<template>
    <div>
        <div class="m-b-20">
            <el-button class="m-r-20" type="primary"
                style="padding: 19px 18px;position: relative;top: 5px;"
                @click="addAnswer()">
                添加书面票
            </el-button>
            <el-radio-group v-model="radio" size="large" @change="handleClick">
                <el-radio-button label="全部">全部</el-radio-button>>
                <el-radio-button label="线上参与">线上参与({{participate.on_line}})</el-radio-button>>
                <el-radio-button label="线下参与">线下参与({{participate.off_line}})</el-radio-button>>
                <el-radio-button label="未参与">未参与({{participate.notParticipateLength}})</el-radio-button>>
            </el-radio-group>
        </div>
        <!-- 未参与情况 -->
        <el-scrollbar v-if="radio == '未参与'" height="400px">
            <el-table :data="notParticipateList" style="width: 100%;">
                <el-table-column prop="name" label="房屋"></el-table-column>
                <el-table-column prop="addr" label="地址"></el-table-column>
                <el-table-column prop="houseable_type" label="类型"></el-table-column>
                <el-table-column prop="updated_at" label="更新时间"></el-table-column>
            </el-table>
        </el-scrollbar>
        <!-- 参与情况 -->
        <el-scrollbar v-else height="400px">
            <el-table :data="answer_list" style="width: 100%;">
                <el-table-column label="用户端类型">
                    <template #default="scope">
                        <span v-if="scope.row.uinfo.auth_type === 'pt'">总平台端</span>
                        <span v-else-if="scope.row.uinfo.auth_type === 'ptr'">区域平台端</span>
                        <span v-else-if="scope.row.uinfo.auth_type === 'gov'">管理端</span>
                        <span v-else-if="scope.row.uinfo.auth_type === 'pm'">物业端</span>
                        <span v-else>业主端</span>
                    </template>
                </el-table-column>
                <el-table-column prop="uinfo.name" label="答题人"></el-table-column>
                <el-table-column prop="uinfo.mobile" label="电话"></el-table-column>
                <el-table-column prop="idcard" label="idcard"></el-table-column>
                <el-table-column prop="updated_at" label="参与时间"></el-table-column>
                <el-table-column label="参与途径">
                    <template #default="scope">
                        <span v-if="scope.row.source === 1">线上参与</span>
                        <span v-else-if="scope.row.source === 2">线下参与</span>
                        <!-- <span v-else>未设置</span> -->
                        <span v-else>未参与</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" width="180px" label="操作">
                    <template #default="scope">
                        <el-button type="primary" :icon="Search" size="small" @click="getAnswerDetail(scope.row.id)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-scrollbar>
        <!-- 添加书面票 -->
        <el-dialog v-model="switch_addAnswer" title="添加书面票" >
            <el-scrollbar  height="600px">
                <div class="m-b-20">证件号码：<el-input v-model="addticket.idcard"></el-input></div>
                <!-- 遍历题目 -->
                <div v-for="(item,index) in topic_details.item" :key="item.id">
                    <!-- 单选题 -->
                    <div v-if="item.type === 1">
                        <div>题号(单选题){{index+1}}、{{item.title}}</div>
                        <div class="m-l-40" v-for="items in item.opts" :key="items.id">
                            <el-radio-group v-model="addticket.answers[index].opt[0]">
                                <el-radio :label="items.id" @click="emitTickets(item.id,index)">{{items.content}}</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <!-- 多选题 -->
                    <div v-else-if="item.type === 2">
                        <div>题号(多选题){{index+1}}、{{item.title}}</div>
                        <div class="m-l-40" v-for="items in item.opts" :key="items.id">
                            <el-checkbox-group v-model="addticket.answers[index].opt">
                                <el-checkbox :label="items.id" @click="emitTickets(item.id,index)">{{items.content}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <!-- 主观填空 -->
                    <div v-else-if="item.type === 3">
                        <div>题号(主观题){{index+1}}、{{item.title}}</div>
                        <div class="m-l-40 m-tb-10">
                            <el-input v-model="addticket.answers[index].content" placeholder="请输入内容" @click="emitTickets(item.id,index)"/>
                        </div>
                    </div>
                    <!-- 文字描述 -->
                    <div v-else-if="item.type === 0">
                        <div>(文字描述){{item.title}}</div>
                    </div>
                </div>
            </el-scrollbar>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_addAnswer=false">取消</el-button>
                    <el-button type="primary" @click="dialogAddSurveyAnswer()">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 查看答卷详情 -->
        <el-dialog v-model="switch_answer_detail" title="用户答卷详情" >
            <el-scrollbar height="600px">
                <div>证件号码：{{answer_detail.item.idcard}}</div>
                <div v-if="answer_detail.item.uinfo">电话：{{answer_detail.item.uinfo.mobile}}</div>
                <div>
                    参与途径：
                    <span v-if="answer_detail.item.source == 1">线上参与</span>
                    <span v-if="answer_detail.item.source == 2">线下参与</span>
                </div>
                <!-- 遍历题目 -->
                <div v-for="(item,index) in topic_details.item" :key="item.id">
                    <!-- 单选题 -->
                    <div v-if="item.type === 1">
                        <div>题号(单选题){{index+1}}、{{item.title}}</div>
                        <div class="m-l-40" v-for="items in item.opts" :key="items.id">
                            <el-radio-group v-model="ischecked" v-if="answer_detail.item">
                                <!-- <el-radio :label="showTopic(items.id,answer_detail.item.answertopics[index].answeropts) ? '1' : '0'" disabled>{{items.content}}</el-radio> -->
                                <el-radio :label="showTopic(item.id,items.id,answer_detail.item.answertopics) ? '1' : '0'" disabled>{{items.content}}</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <!-- 多选题 -->
                    <div v-else-if="item.type === 2">
                        <div>题号(多选题){{index+1}}、{{item.title}}</div>
                        <div class="m-l-40" v-for="items in item.opts" :key="items.id">
                            <el-checkbox-group v-model="checkList">
                                <!-- <el-checkbox v-if="answer_detail.item" :label="showTopic(items.id,answer_detail.item.answertopics[index].answeropts) ? '1' : '0'" disabled>{{items.content}}</el-checkbox> -->
                                <el-checkbox v-if="answer_detail.item" :label="showTopic(item.id,items.id,answer_detail.item.answertopics) ? '1' : '0'" disabled>{{items.content}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <!-- 主观填空 -->
                    <div v-else-if="item.type === 3">
                        <div>题号(主观题){{index+1}}、{{item.title}}</div>
                        <div class="m-l-40 m-tb-10" v-if="answer_detail.item">
                        <!-- 问卷提交后，若新增填空题，此处会报错，content为空 -->
                            <!-- <el-input v-if="answer_detail.item.answertopics[index]" :placeholder="answer_detail.item.answertopics[index].content"/> -->
                            <el-input v-if="answer_detail.item.answertopics" :placeholder="showTopic(item.id,null,answer_detail.item.answertopics)"/>
                        </div>
                    </div>
                    <!-- 文字描述 -->
                    <div v-else>
                        <div>{{item.title}}</div>
                    </div>
                </div>
            </el-scrollbar>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button type="warning" plain @click="switch_answer_detail=false">取消</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup name="SurveyAnswer">
    import {
        APIgetSurveyAnswerList,
        APIgetSurveyAnswerDetail,
        APIaddSurveyAnswer,
        APIgetNotParticipate,
        // 获取问卷题目
        APIgetSurveyTopic
    } from '@/api/custom/custom.js'
    // 接收父组件传递过来的id
    const props = defineProps(['id'])
    onMounted(() => {
        console.log(props.id)
        // 未参与房屋
        notParticipate()
        // 问卷调查结果
        answerListFunc()
        topicsFunc()
    })
    // 问卷题目
    const topic_details = reactive({
        item: [[],[],[],[]]
    })
    // 参与详情
    const radio = ref('全部')
    // 参与情况
    let participate = reactive({
        "on_line":0,
        "off_line":0,
        "notParticipateLength":0
    })
    // 控制书面票弹窗
    let switch_addAnswer = ref(false)
    let switch_answer_detail = ref(false)
    // 确认提交添加书面票
    let addticket = reactive({
        'idcard':'',
        'answers':[
            // {
            //     // 'tid':'',
            //     // 'content':'',
            //     'opt':''
            // },
        ]
    })
    // 判断答卷选项是否选中
    const ischecked = ref('1')
    const checkList = ref(['1'])
    // 判断选项是否存在于答卷详情,先判断遍历题目id，再遍历选项id取每个选项的id判断是否存在于答卷中，存在则显示该道选项内容
    const showTopic = (tid,optid,answertopics) => {
        let isShow = false
        answertopics.forEach(item => {
            if(tid == item.tid) {
                if(item.content) {
                    // console.log(item.content)
                    isShow = item.content
                }else if(item.type === 3) {
                    isShow = null
                }
                item.answeropts.forEach(element => {
                    if(optid === element.oid) {
                        isShow = true
                    }
                })
            }
        })
        return isShow
    }
    // 切换标签，显示不同参与情况的列表
    const handleClick = (tab) => {
        if(tab === "线上参与") {
            answer_list.length = 0
            answer_list.push(...answer_list_on)
        }else if(tab === "线下参与"){
            answer_list.length = 0
            answer_list.push(...answer_list_off)
        }else if(tab === "全部"){
            answer_list.length = 0
            answer_list.push(...answer_list_on,...answer_list_off)
        }
    }
    // 获取问卷结果列表
    let answer_list = reactive([])
    let answer_list_on = reactive([])
    let answer_list_off = reactive([])
    const answerListFunc = () => {
        let params = {
            page:1,
            per_page:15,
        }
        APIgetSurveyAnswerList(props.id,params).then(res => {
            // console.log(res.data)
            // answer_list = res.data[0]
            // 清空答卷列表（线上、线下、总列表）
            answer_list.length = 0
            answer_list_on.length = 0
            answer_list_off.length = 0
            // 线上线下参与数量
            participate.on_line = 0
            participate.off_line = 0
            res.data.forEach(element => {
                if(element.source === 1) {
                    participate.on_line++
                    answer_list_on.push(element)
                }else{
                    participate.off_line++
                    answer_list_off.push(element)
                }
            })
            answer_list.push(...answer_list_on,...answer_list_off)
            // console.log(answer_list)
        })
    }
    // 获取问卷结果详情
    let answer_detail = reactive({
        item:''
    })
    const getAnswerDetail = (id) => {
        switch_answer_detail.value = true
        // 根据问卷题目数量插入对象到answers中
        // 先判断数组长度是否相同
        if(addticket.answers.length != topic_details.item.length) {
            addticket.answers = []
            for(let i=0;i<topic_details.item.length;i++) {
                // 判断是选择题还是主观题
                if(topic_details.item[i].type == 1 || topic_details.item[i].type == 2) {
                    addticket.answers.push({'tid':'','opt':[]})
                }else {
                    addticket.answers.push({'tid':'','content':''})
                }
            }
        }
        // console.log(id)
        APIgetSurveyAnswerDetail(id).then(res => {
            // console.log(res.data)
            answer_detail.item = res.data
            console.log('answer_detail.item',answer_detail.item)
        })
    }
    //打开对话框添加书面票
    const addAnswer = () => {
        switch_addAnswer.value = true
        // 根据问卷题目数量插入对象到answers中
        // console.log('length',topic_details.item.length)
        // 先判断数组长度是否相同
        if(addticket.answers.length != topic_details.item.length) {
            addticket.answers = []
            for(let i=0;i<topic_details.item.length;i++) {
                // 判断是选择题还是主观题
                if(topic_details.item[i].type == 1 || topic_details.item[i].type == 2) {
                    addticket.answers.push({'tid':'','opt':[]})
                }else if(topic_details.item[i].type == 3) {
                    addticket.answers.push({'tid':'','content':''})
                }
            }
        }
        // console.log('aaaa',addticket)
    }
    // 获取未参与答卷的房屋作为未参与用户的数量
    let notParticipateLength = 0
    let notParticipateList = reactive([])
    const notParticipate = () => {
        notParticipateList.length = 0
        APIgetNotParticipate(props.id).then(res => {
            // console.log('aaa',res.data)
            participate.notParticipateLength = res.data.length
            res.data.forEach(element => {
                notParticipateList.push(element)
            })
            // console.log("notParticipateList",notParticipateList)
        })
    }

    // 点击选框事件
    const emitTickets = (tid,index) => {
        addticket.answers[index].tid = tid
    }
    const dialogAddSurveyAnswer = () => {
        console.log("addticket",addticket)
        APIaddSurveyAnswer(props.id,addticket).then(res => {
            // console.log(res)
            switch_addAnswer.value = false
            ElMessage.success("问卷提交成功")
        }).catch(err => {
            from_error.msg = err.data
        })
        // 获取问卷结果新数据
        notParticipate()
        answerListFunc()
    }
    // 获取问卷题目
    const topicsFunc = () => {
        let params = {
            sid:props.id
        }
        // 问卷题目列表
        APIgetSurveyTopic(params).then(res => {
            topic_details.item = [[],[],[],[]]
            console.log(res.data)
            if (res.status === 200) {
                // topic_details.item = res.data
            }
            // 对题目进行排序
            res.data.forEach(element => {
                if(element.type === 0){
                    topic_details.item[0].push(element)
                }else if(element.type === 1){
                    topic_details.item[1].push(element)
                }else if(element.type === 2){
                    topic_details.item[2].push(element)
                }else if(element.type === 3){
                    topic_details.item[3].push(element)
                }
            })
            topic_details.item = [...topic_details.item[1],...topic_details.item[2],...topic_details.item[3],...topic_details.item[0]]
        })
        console.log('topic_details',topic_details)
    }
</script>

<style lang="scss" scoped>
// scss
</style>
