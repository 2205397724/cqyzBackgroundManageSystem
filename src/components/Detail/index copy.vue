<template>
    <div class="container">
        <div style="position: relative; top: -10px;">
            <span>开始时间：{{ data_details.item.startat }}</span>
            <span class="m-20">
                <el-button v-if="data_details.item.status == 1" type="danger" round>未开始</el-button>
                <el-button v-if="data_details.item.status == 2" type="success" round>进行中</el-button>
                <el-button v-if="data_details.item.status == 3" type="info" round>已结束</el-button>
            </span>
            <span>结束时间：{{ data_details.item.endat }}</span>
        </div>
        <el-tabs v-model="activeName" @tab-click="changePane">
            <el-tab-pane label="问卷主题" name="1">
                <el-scrollbar height="400px">
                    <div class="details-box">
                        <div class="item">
                            <div style="margin: auto 0;" class="left">内容</div>
                            <p>{{ data_details.item.content }}</p>
                        </div>
                        <div class="item">
                            <div class="left">附件</div>
                        </div>
                        <div class="item">
                            <div class="left">是否开放</div><span>{{ data_details.item.pub }}</span>
                            <div class="left">是否匿名</div><span>{{ data_details.item.pub }}</span>
                            <div class="left">活动类型</div><span>{{ data_details.item.type }}</span>
                        </div>
                        <div class="item">
                            <div class="left">总票数</div><span>{{ data_details.item.ticketall }}</span>
                            <div class="left">总面积数</div><span>{{ data_details.item.areaall }}</span>
                            <div class="left">活动id</div><span>{{ data_details.item.id }}</span>
                        </div>
                    </div>
                    <div class="record">
                        <h3>问卷记录</h3>
                        <div class="steps-column m-l-40 selected">
                            <div class="steps-column-item">
                                <div>
                                    <text>时间:2022-07-14 12:00:00</text>
                                </div>
                                <div>
                                    操作人员：街道 主任 王先生 <span class="m-l-40">事件：审核</span>
                                </div>
                            </div>
                        </div>
                        <div class="steps-column m-l-40">
                            <div class="steps-column-item">
                                <div>
                                    <text>时间:2022-07-14 12:00:00</text>
                                </div>
                                <div>
                                    操作人员：街道 主任 王先生 <span class="m-l-40">事件：审核</span>
                                </div>
                            </div>
                        </div>
                        <div class="steps-column m-l-40">
                            <div class="steps-column-item ">
                                <div>
                                    <text>时间:2022-07-14 12:00:00</text>
                                </div>
                                <div>
                                    操作人员：街道 主任 王先生 <span class="m-l-40">事件：审核</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="设置参与范围" name="2">
                <div class="font-darkgrey size-lg" style="background-color: #fafafa;">
                    <span class="m-40">
                        已选择<span class="size-lx strong m-10">328</span>户
                    </span>
                    <el-button type="primary" class="m-10" @click="submit">提交</el-button>
                </div>
                <el-scrollbar height="400px">
                    <!-- 树形结构 -->
                    <div class="tree-item">
                        <div style="height: calc(100% - 60px);">
                            <position-tree-third
                                :tree_item="tree_item"
                                :type="no_zone"
                                @checkFunc="checkFunc"
                            />
                        </div>
                        <!-- 房屋 -->
                        <div class="houses p-l-20">
                            <div style="width: 100%;">
                                <!-- <el-table
                                v-loading="loading_tab"
                                :data="data_tab.arr"
                                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                                style="width: 100%;"
                            >
                                <el-table-column prop="name" label="小区" width="700px">
                                    <template #default="scope">
                                        <span>{{scope.row.floor_truth}}</span>
                                        <div v-for="item in scope.row.houses">{{item.name}}</div>
                                    </template>
                                </el-table-column>
                            </el-table> -->
                                <div v-for="item in data_tab.arr" class="housesStyle">
                                    <span class="floor">{{ item.floor_truth }}层</span>
                                    <!-- <span class="floorHouse" v-for="items in item.houses"><span><el-button>{{items.name}}</el-button></span></span> -->
                                    <span v-for="items in item.houses" class="floorHouse"><span :class="[isSelect?'hover':'']" @click="exchange(items.id)">{{ items.name }}</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="参与范围" name="6">
                <div class="font-darkgrey size-lg" style="background-color: #fafafa;">
                    <span class="m-40">
                        已选择<span class="size-lx strong m-10">{{ data_range.arr.length }}</span>户
                    </span>
                    <el-button type="primary" class="m-10">修改</el-button>
                    <el-button type="primary" class="m-10">保存</el-button>
                </div>
                <div v-for="item in data_range.arr">
                    <span>{{ item.id }}</span>
                </div>
            </el-tab-pane>
            <el-tab-pane label="问卷题目" name="3">
                <el-scrollbar height="400px">
                    <div>
                        <el-button type="primary" @click="addServeyTopic()">添加问卷题目</el-button>
                    </div>
                    <el-table
                        :data="topic_details.item"
                        :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                        width="100%"
                    >
                        <el-table-column type="index" width="50" />
                        <el-table-column prop="title" label="题目" />
                        <el-table-column prop="type" label="题目选项类型">
                            <template #default="scope">
                                <span v-if="scope.row.type == 1">单选</span>
                                <span v-else-if="scope.row.type == 2">多选</span>
                                <span v-else-if="scope.row.type == 3">主观填空</span>
                                <span v-else="scope.row.type == 0">文字描述</span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" width="250px" label="操作">
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
            </el-tab-pane>
            <el-tab-pane label="问卷调查结果" name="4">
                <div class="m-b-20">
                    <el-button class="m-r-20" type="primary" style="padding: 19px 18px;position: relative;top: 5px;">添加书面票</el-button>
                    <el-radio-group v-model="radio" size="large">
                        <el-radio-button label="网络参与">网络参与(125)</el-radio-button>>
                        <el-radio-button label="书面参与">书面参与(62)</el-radio-button>>
                        <el-radio-button label="未参与">书面参与(62)</el-radio-button>>
                    </el-radio-group>
                </div>
                <el-scrollbar height="400px">
                    <el-table :data="tableData" border style="width: 100%;">
                        <el-table-column prop="date" label="序号" />
                        <el-table-column prop="name" label="操作人" />
                        <el-table-column prop="address" label="表决人" />
                        <el-table-column prop="date" label="真实业主" />
                        <el-table-column prop="name" label="房号" />
                        <el-table-column prop="address" label="类型" />
                        <el-table-column prop="date" label="面积" />
                        <el-table-column prop="name" label="表态" />
                        <el-table-column prop="address" label="时间" />
                        <el-table-column fixed="right" width="180px" label="操作">
                            <template #default="scope">
                                <el-button type="success" :icon="Edit" size="small">修改</el-button>
                                <el-button type="primary" :icon="Search" size="small">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="业主评论" name="5">
                <el-scrollbar height="400px">
                    <el-table :data="tableData" border style="width: 100%;">
                        <el-table-column label="序号">1</el-table-column>
                        <el-table-column label="评论内容">2</el-table-column>
                        <el-table-column label="点赞">3</el-table-column>
                        <el-table-column label="状态">4</el-table-column>
                        <el-table-column label="用户">5</el-table-column>
                        <el-table-column label="地区">6</el-table-column>
                        <el-table-column label="时间">7</el-table-column>
                        <el-table-column label="操作">8</el-table-column>
                    </el-table>
                </el-scrollbar>
            </el-tab-pane>
        </el-tabs>
        <!-- 修改添加 -->
        <el-dialog v-model="switch_examine" :title="str_title" width="50%">
            <div>
                <el-scrollbar style="height: 450px;">
                    <div class="details-box p-lr-10">
                        <el-form :model="topic_examine.item">
                            <el-row :gutter="10">
                                <el-col>
                                    <el-form-item label="问卷题目" label-width="120px">
                                        <el-input v-model="topic_examine.item.title" />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="10">
                                <el-col>
                                    <el-form-item label="类型" label-width="120px">
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
                                    <el-form-item label="计分方式" label-width="120px">
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
                            <el-row :gutter="10">
                                <el-col>
                                    <el-form-item label="题目分值" label-width="120px">
                                        <el-input v-model="topic_examine.item.score" placeholder="" />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <div class="m-l-40">
                            <div class="width-100 m-b-10 display" style="border-bottom: solid 1px #e4e7ed;">
                                <span class="size-lg strong" style="color: #409eff;flex: 1;">选项</span>
                                <el-button class="m-b-10" type="primary" size="small" @click="addopts()">增加选项</el-button>
                            </div>
                            <el-scrollbar height="140px">
                                <el-row v-for="(item,i) in opts" :gutter="24">
                                    <el-col :span="14" class="flex">
                                        <span style="width: 40px;">选项内容</span>
                                        <el-input v-model="item.content" />
                                    </el-col>
                                    <el-col :span="4" class="flex">
                                        <span>排序</span>
                                        <el-input v-model="item.score" />
                                    </el-col>
                                    <el-col :span="4" class="flex">
                                        <span>分值</span>
                                        <el-input v-model="item.sort" />
                                    </el-col>
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
                                </el-row>
                            </el-scrollbar>
                        </div>
                    </div>
                </el-scrollbar>
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

<script setup>
import {
    APIgetSurveyDetails,
    // 问卷范围
    APIgetSurveyRange,
    APIgetSurveyTopic,
    APIdeleteSurveyTopic,
    APIaddSurveyTopic,
    APImodifySurveyTopic,
    APIgetSurveyTopicDetail,
    // 获取问卷范围城市
    APIgetChinaRegion,
    APIgetHouseListSort,
    APIaddSurveyRange
} from '@/api/custom/custom.js'
// 导入图标
import {
    Edit,
    Search
} from '@element-plus/icons-vue'
import {
    ElMessage
} from 'element-plus'
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-08',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-06',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-07',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    }
]
const checkstrictly = ref('false')
let no_zone = ref(false)
// 可多选
const prop = { multiple: true }
const city = reactive([
    // 区域代码
    {
        // value:'',
        // label:'',
        // 小区
        children: [
            {
                // value:'',
                // label:'',
                // 楼栋
                children: [
                    {
                        // value:'',
                        // label:'',
                        // 单元
                        children: [
                            {
                                // value:'',
                                // label:'',
                                // 房屋
                            }
                        ]
                    }
                ]
            }
        ]
    }
])
// 详情
let switch_details = ref(false)
// 接收父组件传递过来的id
const props = defineProps(['id'])
const activeName = ref('1')
// 详情
const data_details = reactive({
    item: ''
})
// 问卷题目
const topic_details = reactive({
    item: ''
})
const value1 = ref([])
// 参与详情
const radio = ref('网络参与')
// 参与范围
let data_range = reactive({
    arr: []
})
// 添加问卷题目
const str_title = ref('添加')
let switch_examine = ref(false)
let topic_examine = reactive({
    item: {
    }
})
let opts = reactive([
])
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
onMounted(() => {
    console.log(props.id)
    detailsFunc(props.id)
})
// 切换tab-pane触发请求事件
const changePane = (tab, event) => {
    // 代理
    // console.log(tab)
    // 指针事件pointerEvent（未使用）
    // console.log(event)
    // console.log(tab.props.name)
    if (tab.props.name == 6) {
        APIgetSurveyRange().then(res => {
            console.log('xxx', res.data)
            data_range.arr = res.data
            console.log(data_range.arr.length)
            // getCities()
        })
    } else if (tab.props.name == 3) {
        topicsFunc()
    } else if (tab.props.name == 4) {
    } else {

    }
}
// 获取问卷详情
const detailsFunc = id => {
    APIgetSurveyDetails(id).then(res => {
        if (res.status === 200) {
            data_details.item = res.data
            switch_details.value = true
        }
    })
    console.log(data_details.item)
}
// 获取问卷题目
const topicsFunc = () => {
    let params = {
        sid: props.id
    }
    // 问卷题目列表
    APIgetSurveyTopic(params).then(res => {
        console.log(res.data)
        if (res.status === 200) {
            topic_details.item = res.data
        }
    })
}
// 添加问卷题目
const addServeyTopic = () => {
    console.log(props.id)
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
        if (res.status == 200) {
            topic_examine.item = res.data
            // 修改为字符串类型，让选项被选中，默认为int类型，选项没有选中
            topic_examine.item.type += ''
            topic_examine.item.score_calc += ''
            // 清除选项缓存数据
            opts.length = 0
            // 将选项数据遍历插入数组对象
            res.data.opts.forEach(element => {
                opts.push(element)
            })
            console.log(opts)
            switch_examine.value = true
        }
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteSurveyTopic(val.id).then(res => {
        refreshFunc()
        // ElMessage.success(res.statusText)
        ElMessage.success('删除成功')
    })
}
// 刷新
const refreshFunc = () => {
    topicsFunc()
}
// 确定提交添加修改问卷题目
const dialogExamineCloseFunc = id => {
    topic_examine.item.opts = opts
    // console.log(topic_examine.item)
    if (str_title.value == '添加') {
        console.log('qqqqqq', topic_examine.item)
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
            if (res.status == 200) {
                refreshFunc()
                // ElMessage.success(res.msg)
                ElMessage.success('修改成功')
                switch_examine.value = false
            }
        })
    }

}
// 获取活动参与范围的城市
// const getCities = () => {
//     // 区域代码
//     APIgetChinaRegion().then(res => {
//         // console.log(res.data)
//         city.length = 0
//         res.data.forEach(element => {
//             city.push({'label':element.name,'value':element.code,'children':[]})
//         })
//         // console.log(city)
//     })
//     // // 小区
//     APIgetResidentialListHouse().then(res => {
//         // console.log(res)
//         city[0].children = []
//         res.forEach(element => {
//             city[0].children.push({'label':element.name,'value':element.china_code,'children':[]})
//         })
//         // console.log(city)
//     })
//     // 楼栋
//     APIgetBuildListHouse().then(res => {
//         // console.log(res)
//         city[0].children[0].children = []
//         res.forEach(element => {
//             city[0].children[0].children.push({'label':element.name,'value':element.sync_china_code,'children':[]})
//         })
//         console.log(city)
//     })
//     // // // 单元
//     // APIgetUnitsListHouse().then(res => {
//     //     // console.log(res)
//     //     city[0].children[0].children[0].children = []
//     //      res.forEach(element => {
//     //         city[0].children[0].children[0].children.push({'label':element.name,'value':element.sync_china_code,'children':[]})
//     //     })
//     //     console.log(city)
//     // })
//     // // // 房屋
//     // APIgetHouseListHouse().then(res => {
//     //     console.log(res)
//     //     city[0].children[0].children[0].children[0].children = []
//     //      res.forEach(element => {
//     //         city[0].children[0].children[0].children[0].children.push({'label':element.name,'value':element.sync_china_code,})
//     //     })
//     //     console.log(city)
//     // })
// }
let data_tab = reactive({
    arr: []
})
const edit_house = ref(false)
let houseableType = ref()
let houseableTgt = ref()
const checkFunc = val => {
    // console.log('aaa',val)
    // if判断组件传递的type，指定添加问卷范围类型和范围类型对应的值
    if (val.type == 'houses') {
        houseableType = 1
    } else if (val.type == 'units') {
        houseableType = 2
        houseableTgt = val.id
    } else if (val.type == 'buildings') {
        houseableType = 3
        houseableTgt = val.id
    } else if (val.type == 'zone') {
        houseableType = 4
        houseableTgt = val.id
    } else if (val.type == 'region') {
        houseableType = 5
        houseableTgt = val.id
    }
    // console.log(houseableType)
    if (val.type == 'units') {
        // 获取房屋数据按楼栋楼层
        APIgetHouseListSort({ houseable_type: 'units ', houseable_id: val.id }).then(res => {
            console.log(res)
            data_tab.arr = res.floors
            console.log('bbb', data_tab.arr)
        })
    }
}
const submit = () => {
    console.log(props.id, '1', houseableType, houseableTgt)
    APIaddSurveyRange().then(res => {

    })
}
const tree_item = ref({
})
// tree树形组件初始的请求
APIgetChinaRegion().then(res => {
    tree_item.value.id = res.data[0].code
    tree_item.value.name = res.data[0].name
    tree_item.value.type = 'region'
    tree_item.value.next_type = 'zone'
})
// 点击房屋的事件
let isSelect = false
const exchange = id => {
    isSelect = !isSelect
    console.log(isSelect, id)
}

</script>
<style lang="scss" scoped>
.record {
    margin-left: 80px;
}
.steps-column {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-left: 30px;
    .steps-column-item {
        position: relative;
        padding: 30px;
    }
    // 圆点
    .steps-column-item::before {
        content: "";
        position: absolute;
        top: 40px;
        left: -38px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: rgb(227 231 237);
    }
}
// 前面的线
.steps-column::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    border-left: 4px solid rgb(227 231 237);
}
// 改变选中状态颜色
.selected .steps-column-item::before {
    background-color: rgb(64 158 255);
}
.selected::before {
    border-color: rgb(64 158 255);
}
.bg {
    background-color: #bfa;
}
//弹性布局
.flex {
    display: flex;
}
.tree-item {
    min-width: 400px;
    min-height: 300px;
    width: 300px;
    border-right: 1px solid #e9e9e9;
}
.houses {
    position: absolute;
    top: 20px;
    left: 400px;
    flex: 1;
}
.bgbfa {
    background-color: #bfa;
}
.display {
    display: flex;
}
.housesStyle {
    display: flex;
    .floor {
        width: 50px;
        margin: auto 0;
        text-align: center;
        color: #ccc;
    }
    .floorHouse {
        span {
            display: inline-block;
            text-align: center;
            width: 100px;
            margin: 5px;
            padding: 15px;
            background-color: #e6e6ee;
        }
        .hover {
            background-color: #439dfd;
            color: #fff;
        }
    }
}
</style>
