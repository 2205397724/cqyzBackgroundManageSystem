<template>
    <div>
        <div class="m-b-20">
            <el-button
                class="m-r-20" type="primary"
                style="padding: 19px 18px;position: relative;top: 5px;"
                @click="addAnswer()"
            >
                添加书面票
            </el-button>
            <el-radio-group v-model="radio" size="large" @change="handleClick">
                <el-radio-button label="线上参与">线上参与({{ status.online }}票)</el-radio-button>
                <el-radio-button label="线下参与">线下参与({{ status.offline }}票)</el-radio-button>
                <el-radio-button label="未参与">未参与的房屋({{ status.notParticipateHouse}}套)</el-radio-button>
            </el-radio-group>
            <el-button
                class="m-r-20" type="primary"
                style="padding: 19px 18px;position: relative;top: 5px;"
                @click="() => { switch_files_list_house = !switch_files_list_house;}"
            >导出未参与房屋</el-button>
        </div>
        <!-- 未参与情况 -->
        <div v-if="radio == '未参与'">
            <el-table v-if="radio == '未参与'" :data="notParticipateList.arr" :header-cell-style="{ background: '#fbfbfb', color: '#999999', 'font-size': '12px' }" class="tab_1">
                <el-table-column prop="name" label="房屋" />
                <el-table-column prop="addr" label="坐落" />
                <el-table-column prop="area_build" label="建筑面积" />
                <el-table-column prop="updated_at" label="更新时间" />
            </el-table>
            <el-pagination
                v-model:current-page="notParticipatePage" style="float: right;"
                layout="prev,next,jumper," :total="Infinity" :page-size="notParticipatePerPage" background
                prev-text="上一页" next-text="下一页" hide-on-single-page
            />
        </div>
        <!-- 参与情况 -->
        <div v-else>
            <el-table :data="answer_list.arr" :header-cell-style="{ background: '#fbfbfb', color: '#999999', 'font-size': '12px' }" class="tab_1">
                <el-table-column label="用户端类型">
                    <template #default="scope">
                        <span v-if="scope.row.uinfo?.auth_type === 'pt'">总平台端</span>
                        <span v-else-if="scope.row.uinfo?.auth_type === 'ptr'">区域平台端</span>
                        <span v-else-if="scope.row.uinfo?.auth_type === 'gov'">管理端</span>
                        <span v-else-if="scope.row.uinfo?.auth_type === 'pm'">物业端</span>
                        <span v-else>业主端</span>
                    </template>
                </el-table-column>
                <el-table-column label="参与人">
                    <template #default="scope">
                        <span>{{ scope.row.uinfo?.name || scope.row.uinfo?.nickname || scope.row.uinfo?.username }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="电话">
                    <template #default="scope">
                        <span>{{ scope.row.uinfo?. mobile }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="updated_at" label="参与时间" width="180px" />
                <el-table-column label="参与途径">
                    <template #default="scope">
                        <span v-if="scope.row.source === 1">线上</span>
                        <span v-else-if="scope.row.source === 2">线下</span>
                        <!-- <span v-else>未设置</span> -->
                        <span v-else>未参与</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" width="140px" label="操作">
                    <template #default="scope">
                        <el-button type="primary" :icon="Search" size="small" @click="getAnswerDetail(scope.row.id)">查看</el-button>
                        <el-popconfirm
                            title="确定要删除当前项么?" cancel-button-type="info"
                            @confirm="deleteFunc(scope.row.id)"
                        >
                            <template #reference>
                                <el-button type="danger" class="btnfix">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-model:current-page="answerPage" style="float: right;"
                layout="prev,next,jumper," :total="Infinity" :page-size="answerPerPage" background
                prev-text="上一页" next-text="下一页" hide-on-single-page
            />
        </div>
        <!-- 添加书面票 -->
        <el-dialog v-model="switch_addAnswer" title="添加书面票">
            <div class="bg-color-grey p-10 m-b-10">
                <el-row style="width: 400px; line-height: 32px;">
                    <el-col :lg="4">参与人：</el-col>
                    <el-col :lg="20" class="selecZone" @click="click_add_group_zone_id">
                        <span v-if="!selectedZone_id" class="selecChina">请选择</span>
                        <span style="margin-left: 11px;">{{ selectedZone_id }}</span>
                    </el-col>
                </el-row>
            </div>
            <el-scrollbar height="300px">
                <!-- 遍历题目 -->
                <div v-for="(item,index) in topic_details.item" :key="item.id">
                    <!-- 单选题 -->
                    <div v-if="item.type === 1">
                        <div><span class="strong">{{ index+1 }}、{{ item.title }}</span> <span class="font-red">(单选)</span></div>
                        <div v-for="(items,i) in item.opts" :key="i">
                            <!-- <el-radio-group v-model="radio2"> -->
                            <el-radio-group v-model="radio2.list[index]">
                                <el-radio :label="items.id" @change="emitTickets_1(item.id,index)">{{ items.content }}</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <!-- 多选题 -->
                    <div v-else-if="item.type === 2">
                        <div><span class="strong">{{ index+1 }}、{{ item.title }}</span>  <span class="font-red">(多选)</span></div>
                        <div v-for="items in item.opts" :key="items.id">
                            <el-checkbox-group v-model="addticket.answers[index].opt">
                                <el-checkbox :label="items.id" @click="emitTickets(item.id,index)">{{ items.content }}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <!-- 主观填空 -->
                    <div v-else-if="item.type === 3">
                        <div><span class="strong">{{ index+1 }}、{{ item.title }}</span>  <span class="font-red">(主观)</span></div>
                        <div class="m-tb-10">
                            <el-input v-model="item.answer" placeholder="请输入内容" @blur="emitTickets_2(item,index)" />
                        </div>
                    </div>
                    <!-- 文字描述 -->
                    <div v-else-if="item.type === 0">
                        <div>(文字描述){{ item.title }}</div>
                    </div>
                </div>
                <!-- </el-scrollbar> -->
            </el-scrollbar>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_addAnswer=false">取消</el-button>
                    <el-button type="primary" @click="dialogAddSurveyAnswer()">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 查看答卷详情 -->
        <el-dialog v-model="switch_answer_detail" title="用户参与详情">
            <el-scrollbar height="600px">
                <div class="details-box">
                    <div class="details-tit-sm">基础信息</div>
                    <el-row>
                        <el-col :span="12">
                            <div class="item">
                                <div class="left">参与人</div>
                                <div class="right">{{ answer_detail.item.uinfo?.name || answer_detail.item.uinfo?.nickname || answer_detail.item.uinfo?.username }}</div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="item">
                                <div class="left">用户端类型</div>
                                <div class="right">
                                    <span v-if="answer_detail.item.uinfo?.auth_type === 'pt'">总平台端</span>
                                    <span v-else-if="answer_detail.item.uinfo?.auth_type === 'ptr'">区域平台端</span>
                                    <span v-else-if="answer_detail.item.uinfo?.auth_type === 'gov'">管理端</span>
                                    <span v-else-if="answer_detail.item.uinfo?.auth_type === 'pm'">物业端</span>
                                    <span v-else>业主端</span>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <div class="item">
                                <div class="left">证件号码</div>
                                <div class="right">{{ answer_detail.item.idcard }}</div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="item">
                                <div class="left">电话</div>
                                <div class="right">{{ answer_detail.item.uinfo?.mobile }}</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <div class="item">
                                <div class="left">参与时间</div>
                                <div class="right">{{ answer_detail.item.updated_at }}</div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="item">
                                <div class="left">参与途径</div>
                                <div class="right">
                                    <span v-if="answer_detail.item.source == 1">线上参与</span>
                                    <span v-if="answer_detail.item.source == 2">线下参与</span>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="flex-row p-t-10">
                        <el-button type="primary" size="small" @click="getAnsweredHouse">获取参与房屋</el-button>
                        <div v-if="answer_house.arr.length>0" class="m-l-10">
                            <block v-for="item in answer_house.arr" :key="item">
                                <div>{{item.house.name}}</div>
                            </block>
                        </div>
                    </div>
                    <!-- 遍历题目 -->
                    <div class="details-tit-sm m-t-20">参与详情</div>
                    <div v-for="(item,index) in topic_details.item" :key="item.id" class="m-t-10">
                        <!-- 单选题 -->
                        <div v-if="item.type === 1">
                            <div><span class="strong">{{ index+1 }}、{{ item.title }}</span> (单选)</div>
                            <div v-for="items in item.opts" :key="items.id">
                                <el-radio-group v-if="answer_detail.item" v-model="ischecked">
                                    <el-radio :label="showTopic(item.id,items.id,answer_detail.item.answertopics) ? '1' : '0'" disabled>{{ items.content }}</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <!-- 多选题 -->
                        <div v-else-if="item.type === 2">
                            <div><span class="strong">{{ index+1 }}、{{ item.title }}</span> (多选)</div>
                            <div v-for="items in item.opts" :key="items.id">
                                <el-checkbox-group v-model="checkList">
                                    <el-checkbox v-if="answer_detail.item" :label="showTopic(item.id,items.id,answer_detail.item.answertopics) ? '1' : '0'" disabled>{{ items.content }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <!-- 主观填空 -->
                        <div v-else-if="item.type === 3">
                            <div><span class="strong">{{ index+1 }}、{{ item.title }}</span> (主观)</div>
                            <div v-if="answer_detail.item" class="m-tb-10">
                                <!-- 问卷提交后，若新增填空题，此处会报错，content为空 -->
                                <el-input v-if="answer_detail.item.answertopics" :placeholder="showTopic(item.id,null,answer_detail.item.answertopics)" />
                            </div>
                        </div>
                        <!-- 文字描述 -->
                        <div v-else>
                            <div>{{ item.title }}</div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button type="warning" plain @click="switch_answer_detail=false">取消</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="switch_choose_zone" width="60%" title="选择参与人">
            <div class="flx">
                <div style="width: 30%; height: 600px; display: inline-block;">
                    <el-scrollbar height="600px">
                        <position-tree
                            :tree_item="tree_item.arr"
                            @checkFunc="checkFunc"
                        />
                    </el-scrollbar>
                </div>

                <div style="width: 70%; display: inline-block;">
                    <div style="padding: 20px;box-sizing: border-box;background-color: #f0f2f5;height: 450px;">
                        <div class="row-box">
                            <div class="row-item-box row-item-tit-box">
                                <div class="row-item row-item-tit row-item-tit-ceng">
                                    <div class="">楼层</div>
                                </div>
                            </div>
                        </div>
                        <div style="height: calc(100% - 45px);overflow: auto;">
                            <div v-for="(child,i) in house_list.arr" :key="i" class="row-box">
                                <div class="row-item-box row-item-tit-box">
                                    <div class="row-item row-item-tit row-item-tit-ceng">
                                        <div>{{ child.floor_truth }}层</div>
                                    </div>
                                </div>
                                <el-scrollbar style="white-space: nowrap;">
                                    <div style="display: flex;">
                                        <div v-for="(item,j) in child.houses" :key="j" :class="{item: true,bg: item.can_exist}">
                                            <div v-show="item.house_num?true:false" class="row-item" style="position: relative;">
                                                <div class="row-item-check" @click="houseDetailsFunc(item)">{{ item.house_num }}#</div>
                                            </div>
                                        </div>
                                    </div>
                                </el-scrollbar>
                            </div>
                        </div>
                    </div>
                    <div v-if="flag" style="background-color: #f0f2f5; padding: 20px; margin-top: 20px;">
                        <el-row :span="10" class="m-b-10">
                            <el-col :lg="4" style="line-height: 32px; text-align: right;">
                                <span>选择的房屋：</span>
                            </el-col>
                            <el-col :lg="20">
                                <el-input v-model="houseName" />
                            </el-col>
                        </el-row>
                        <el-row :lg="5">
                            <el-col :lg="4" style="line-height: 32px; text-align: right;">
                                <span>产权人：</span>
                            </el-col>
                            <el-col :lg="20">
                                <template v-if="house_details.item.curr_property&&house_details.item.curr_property.owners">
                                    <el-button v-for="(item,i) in house_details.item.curr_property.owners" :key="i" type="primary" plain @click="selectPropertyPeople(item)">{{ item.name }}</el-button>
                                </template>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </el-dialog>
        <ExportHouse
            v-if="switch_files_list_house"
            :switch_files_list_house="switch_files_list_house"
            :type="2"
            :sid="props.id"
            />
    </div>
</template>

<script setup name="SurveyAnswer">
import {
    APIgetHouseDetailsHouse,
    APIgetSurveyAnswerList,
    APIgetSurveyAnswerDetail,
    APIaddSurveyAnswer,
    APIdeleteSurveyAnswerDetail,
    APIgetNotParticipate,
    // 获取问卷题目
    APIgetSurveyTopic,
    APIgetSurveyRange,
    APIgetHouseListSort,
    // 获取答卷参与房屋
    APIgetSurveyAnswerHouse,
    // 统计结果
    APIgetSurveyStatus,
    APIgetExportTask,
    APIdeleteExportTask,
    APIpostTaskSurvey
} from '@/api/custom/custom.js'
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
const switch_files_list_house = ref(false)
// 接收父组件传递过来的id
const props = defineProps(['id'])
let answer_list = reactive({arr:[]})// 参与列表
let notParticipateList = reactive({arr:[]})//未参与的房屋列表
// 问卷题目
const topic_details = reactive({
    item: [[], [], [], []]
})
const radio = ref('全部')// 标签切换
let source = ref(1)//参与方式 默认线上参与
// 参与情况
let participate = reactive({
    'on_line': 0,
    'off_line': 0,
    'notParticipateLength': 0
})
const notParticipatePage = ref(1)
const notParticipatePerPage = ref(15)
const answerPage = ref(1)
const answerPerPage = ref(15)
const status = reactive({})
onMounted(() => {
    // 参与列表
    answerListFunc()
    // 统计详细
    getSurveyStatus()
})

watch([notParticipatePage,answerPage], (val,oldVal) => {
    if(val[0] != oldVal[0]){
        notParticipate()
    }
    if(val[1] != oldVal[1]){
        answerListFunc()
    }
})
// 切换标签，显示不同参与情况的列表
const handleClick = tab => {
    if (tab === '线上参与') {
        source.value =1
        answerListFunc()
    } else if (tab === '线下参与') {
        source.value =2
        answerListFunc()
    }else if(tab =='未参与'){
        notParticipate()
    }
}

// 获取参与列表
const answerListFunc = () => {
    let params = {
        page:answerPage.value,
        per_page: answerPerPage.value,
        source:source.value
    }
    APIgetSurveyAnswerList(props.id, params).then(res => {
        answer_list.arr = res
        let btnNext = document.querySelector('.btn-next')
        if (res.length < answerPerPage.value) {
            btnNext.classList.add('not_allowed')
            btnNext.setAttribute('disabled', true)
            btnNext.setAttribute('aria-disabled', true)
        } else {
            btnNext.classList.remove('not_allowed')
            btnNext.removeAttribute('disabled')
            btnNext.setAttribute('aria-disabled', false)
        }
    })
}
// 获取未参与的房屋列表
const notParticipate = () => {
    let params = {
        page: notParticipatePage.value,
        per_page: notParticipatePerPage.value
    }
    APIgetNotParticipate(props.id, params).then(res => {
        notParticipateList.arr = res
        let btnNext = document.querySelector('.btn-next')
        if (res.length < notParticipatePerPage.value) {
            btnNext.classList.add('not_allowed')
            btnNext.setAttribute('disabled', true)
            btnNext.setAttribute('aria-disabled', true)
        } else {
            btnNext.classList.remove('not_allowed')
            btnNext.removeAttribute('disabled')
            btnNext.setAttribute('aria-disabled', false)
        }
    })
}
// 获取统计结果
const getSurveyStatus = () => {
    APIgetSurveyStatus(props.id).then(res => {
        status.online = res.answer_cnt.online
        status.offline = res.answer_cnt.offline
        status.notParticipateHouse = res.house_tot_cnt - res.house_has_cnt
    })
}

// 控制书面票弹窗
let switch_addAnswer = ref(false)
let switch_answer_detail = ref(false)
// 确认提交添加书面票
let addticket = reactive({
    'idcard': '',
    'answers': [
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
const showTopic = (tid, optid, answertopics) => {
    let isShow = false
    answertopics.forEach(item => {
        if (tid == item.tid) {
            if (item.content) {
                //
                isShow = item.content
            } else if (item.type === 3) {
                isShow = null
            }
            item.answeropts.forEach(element => {
                if (optid === element.oid) {
                    isShow = true
                }
            })
        }
    })
    return isShow
}

let answer_list_on = reactive([])
let answer_list_off = reactive([])

// 获取问卷结果详情
let answer_detail = reactive({
    item: ''
})
// 查看
const active_answer_id = ref('')//当前查看的答卷id
const getAnswerDetail = id => {
    answer_house.arr = []//清空答卷已参与房屋的数组
    active_answer_id.value = id
    switch_answer_detail.value = true
    // 根据问卷题目数量插入对象到answers中
    // 先判断数组长度是否相同
    if (addticket.answers.length != topic_details.item.length) {
        addticket.answers = []
        for (let i = 0;i < topic_details.item.length;i++) {
            // 判断是选择题还是主观题
            if (topic_details.item[i].type == 1 || topic_details.item[i].type == 2) {
                addticket.answers.push({ 'tid': '', 'opt': [] })
            } else {
                addticket.answers.push({ 'tid': '', 'content': '' })
            }
        }
    }
    //
    APIgetSurveyAnswerDetail(id).then(res => {
        //
        answer_detail.item = res
        //
    })
}
// 删除答卷
const deleteFunc = id => {
    APIdeleteSurveyAnswerDetail(id).then(res => {
        ElMessage.success('删除成功')
        answerListFunc()
    })
}
// 获取答卷的参与房屋
const answer_house = reactive({
    arr:[]
})
const getAnsweredHouse = () => {
    let params = {
        page:1,
        per_page:150
    }
    APIgetSurveyAnswerHouse(active_answer_id.value,params).then(res=>{
        answer_house.arr = res.items
    })
}
const data_range = reactive({
    arr: []
})
const tree_item = reactive({
    arr: []
})
// 打开对话框添加书面票
const addAnswer = () => {
    // radio2.value = ''
    radio4.arr = []
    topicsFunc()
    switch_addAnswer.value = true
    // 根据问卷题目数量插入对象到answers中
    //
    // 先判断数组长度是否相同
    // if (addticket.answers.length != topic_details.item.length) {
    addticket.answers = []
    for (let i = 0;i < topic_details.item.length;i++) {
        radio2.list[i] = ' '
        // 判断是选择题还是主观题
        if (topic_details.item[i].type == 1 || topic_details.item[i].type == 2) {
            addticket.answers.push({ 'tid': '', 'opt': [] })
        } else if (topic_details.item[i].type == 3) {
            addticket.answers.push({ 'tid': '', 'content': '' })
        }
    }
    //
    // }
    let params = {
        page: 1,
        per_page: 100,
        sid: props.id,
        can_type: 2
        // type_many: [2, 3, 4, 5]
    }
    APIgetSurveyRange(params).then(res => {
            for (let i = 0;i < res.length;i++) {
                for (let j = i + 1; j < res.length;j++) {
                    if (res[i].tgt == res[j].tgt) {
                        res.splice(j, 1)
                        j--
                    }
                }
            }
            //
            data_range.arr = res
            tree_item.arr = []
            res.forEach((item, key) => {
                if (item.type == 5) {
                    if (item.tgt.length <= 9) {
                        tree_item.arr.push({ name: item.tgt_obj, type: 'region', next_type: 'region', id: item.tgt })
                    } else {
                        tree_item.arr.push({ name: item.tgt_obj, type: 'region', next_type: 'zone', id: item.tgt })
                    }
                } else if (item.type == 4) {
                    tree_item.arr.push({ name: item.tgt_obj.name, type: 'zone', next_type: 'buildings', id: item.tgt })
                } else if (item.type == 3) {
                    tree_item.arr.push({ name: item.tgt_obj.name, type: 'buildings', next_type: 'units', id: item.tgt })
                } else if (item.type == 2) {
                    tree_item.arr.push({ name: item.tgt_obj.name, type: 'units', next_type: 'house', id: item.tgt })
                }
            })
        })
}
const radio2 = reactive({
    list:[]
})
const radio3 = ref('')
const radio4 = reactive({
    arr: []
})
const radio5 = ref([])
// 点击选框事件
const emitTickets = (tid, index) => {
    // addticket.answers[index].opt = []
    addticket.answers[index].tid = tid
    //
    // addticket.answers[index].opt.push(radio4.arr)

}
const emitTickets_1 = (tid, index) => {
    addticket.answers[index].opt = []
    addticket.answers[index].tid = tid
    // addticket.answers[index].opt.push(radio2.value)
    addticket.answers[index].opt.push(radio2.list[index])

}
const emitTickets_2 = (val, index) => {
    addticket.answers[index].content = ''
    addticket.answers[index].tid = val.id
    //
    addticket.answers[index].content = val.answer

}
const dialogAddSurveyAnswer = () => {

    APIaddSurveyAnswer(props.id, addticket).then(res => {
        //
        switch_addAnswer.value = false
        ElMessage.success('问卷提交成功')
    }).catch(err => {
        ElMessage.success('问卷提交失败')
    })
    // 获取问卷结果新数据
    notParticipate()
    answerListFunc()
}
// 获取问卷题目
const topicsFunc = () => {
    let params = {
        sid: props.id
    }
    // 问卷题目列表
    APIgetSurveyTopic(params).then(res => {
        // topic_details.item = [[], [], [], []]
        // // 对题目进行排序
        // res.forEach(element => {
        //     if (element.type === 0) {
        //         topic_details.item[0].push(element)
        //     } else if (element.type === 1) {
        //         topic_details.item[1].push(element)
        //     } else if (element.type === 2) {
        //         topic_details.item[2].push(element)
        //     } else if (element.type === 3) {
        //         topic_details.item[3].push(element)
        //     }
        // })
        // topic_details.item = [...topic_details.item[1], ...topic_details.item[2], ...topic_details.item[3], ...topic_details.item[0]]
        topic_details.item = res
    })
    //
}
// 选择身份证号
const switch_choose_zone = ref(false)
const click_add_group_zone_id = () => {
    switch_choose_zone.value = true
}
const active_obj = reactive({
    obj: {}
})
const checkFunc = val => {

    active_obj.obj = val
    if (active_obj.obj.id && active_obj.obj.name && (active_obj.obj.type == 'units' || active_obj.obj.type ==
        'buildings')) {
        getHouseList()
    }
}
const house_list = reactive({
    arr: []
})
const house_num = reactive({
    arr: []
})
const checkFH = reactive({
    row: {},
    col: {},
    all: {}
})
const total = ref(0)
const getHouseList = () => {
    let params = {

        // houseable_type: tree_item.value.type == 'units' ? 'units' : active_obj.obj.type,
        // houseable_id: tree_item.value.type == 'units' ? tree_item.value.id : active_obj.obj.id
        // houseable_type: active_obj.obj.type,
        houseable_id: active_obj.obj.id
    }
    if (active_obj.obj.type == 'building') {
        params.houseable_type = 'buildings'
    } else {
        params.houseable_type = active_obj.obj.type
    }
    APIgetHouseListSort(params).then(res => {
        //
        total.value = 0
        // 处理空白格
        let nums = res.house_nums
        let list = res.floors
        for (let i in list) {
            if (list[i].houses.length < nums.length) {
                for (let j in nums) {
                    if (!list[i].houses[j] || !list[i].houses[j].house_num || (list[i].houses[j]
                        .house_num != nums[j])) {
                        list[i].houses.splice(j, 0, {})
                    }
                }
            }
            house_num.arr = nums
            house_list.arr = list
            //
            // 处理默认选择项目
            for (let i in house_num.arr) {
                checkFH.row[house_num.arr[i]] = {
                    val: false
                }
            }
            for (let i in house_list.arr) {
                checkFH.col[house_list.arr[i].floor_truth] = {
                    val: false
                }
                checkFH.all[house_list.arr[i].floor_truth] = {}
                for (let j in house_list.arr[i].houses) {
                    if (house_list.arr[i].houses[j].house_num) {
                        total.value++
                        checkFH.all[house_list.arr[i].floor_truth][house_list.arr[i].houses[j]
                            .house_num] = {
                            val: false,
                            data: house_list.arr[i].houses[j]
                        }
                    }
                }
            }
        }
        // house_list.arr = res.floors
    })
}
const flag = ref(false)
const house_details = reactive({
    item: {}
})
const selectedZone_id = ref('')
const houseName = ref('')
const houseDetailsFunc = row => {
    APIgetHouseDetailsHouse(row.id).then(res => {
        house_details.item = res
        houseName.value = house_details.item.pos_name + house_details.item.name
    })
    flag.value = true
}
const selectPropertyPeople = row => {
    selectedZone_id.value = row.name
    addticket.idcard = row.id_card
    switch_choose_zone.value = false
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
// scss
.row-box {
    border-bottom: 1px solid #f2f2f2;
    background-color: #fff;
    display: flex;
    .row-item-box {
        display: inline-block;
        box-sizing: border-box;
        padding: 6px;
        min-width: 54px;
        height: 44px;
        .row-item {
            width: 100%;
            height: 100%;
            border: 1px solid #e9e9e9;
            font-size: 14px;
            vertical-align: top;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            padding: 6px;
            cursor: pointer;

            // justify-content: space-between;
        }
        .row-item-tit-ceng {
            border: 0 solid #e9e9e9;
        }
    }
    .item {
        display: inline-block;
        box-sizing: border-box;
        padding: 6px;
        min-width: 54px;
        height: 44px;
        &.bg {
            background-color: #409eff;
        }
        .row-item {
            width: 100%;
            height: 100%;
            font-size: 14px;
            vertical-align: top;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            padding: 6px;
            cursor: pointer;
            border: 1px solid #e9e9e9;
            // justify-content: space-between;
        }
        .row-item-tit-ceng {
            border: 0 solid #e9e9e9;
        }
    }
    .region_box_item_del_1 {
        width: 22px;
        height: 24px;
        line-height: 18px;
        transform: scale(0.7);
        position: absolute;
        right: -9px;
        top: -9px;
        border-radius: 50%;
        border: 2px solid red;
        cursor: pointer;
        font-weight: bold;
        color: red;
        text-align: center;
    }
    .row-item-tit-box {
        border-right: 1px solid #e9e9e9;
        width: 54px;
        .row-item-tit {
            border: 0 solid #e9e9e9 !important;
            font-size: 12px;
            .tit-fh {
                margin-bottom: -18px;
            }
            .tit-lc {
                margin-top: -18px;
            }
        }
        .row-item-tit-bgline {
            background-image: linear-gradient(to top right, #fff 49%, #e9e9e9, #fff 51%);
            justify-content: space-between;
            cursor: initial;
        }
    }
}
// :deep .el-dialog__body {
//     display: flex;
// }
.selecZone {
    width: 100%;
    height: 32px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fff;
    .selecChina {
        margin-left: 11px;
        color: #aaa;
    }
    .selecChina_1 {
        margin-left: 11px;
        font-size: 14px;
        line-height: 29px;
        color: #c0c4d5;
    }
}
</style>
