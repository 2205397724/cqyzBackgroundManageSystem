<template>
<div class="container">
    <div style="position: relative; top: -10px;">
        <span>开始时间：{{data_details.item.startat}}</span>
        <span class="m-20">
            <el-button v-if="data_details.item.status == 1" type="danger" round>未开始</el-button>
            <el-button v-if="data_details.item.status == 2" type="success" round>进行中</el-button>
            <el-button v-if="data_details.item.status == 3" type="info" round>已结束</el-button>
        </span>
        <span>结束时间：{{data_details.item.endat}}</span>
    </div>
    <el-tabs v-model="activeName" @tab-click="changePane">
        <el-tab-pane label="问卷主题" name="1">
            <el-scrollbar height="400px">
                <div class="details-box">
                    <div class="item">
                        <div style="margin: auto 0;" class="left">内容</div>
                        <p>kajfhjdshfkahfkahfjaskhfksdhfjakhfalhfjsafhlakghalhgakghdsghalkhgdlahgladsjhgalsdjhgaldghalsjhgdalhdsjahlksadhlaskdjgh</p>
                    </div>
                    <div class="item">
                        <div class="left">附件</div>
                    </div>
                    <div class="item">
                        <div class="left">是否开放</div><span>123</span>
                        <div class="left">是否匿名</div><span>123</span>
                        <div class="left">分类</div><span>123</span>
                    </div>
                    <div class="item">
                        <div class="left">小区id</div><span>123</span>
                        <div class="left">问卷分类</div><span>123</span>
                        <div class="left">问卷对象</div><span>123</span>
                    </div>
                </div>
                <div class="record">
                    <h3>问卷记录</h3>
                    <div class="steps-column m-l-40 selected" >
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
        <el-tab-pane label="参与范围" name="2">
            <el-scrollbar height="400px">
                <div class="font-darkgrey size-lg">
                    <span class="m-40">
                        已选择<span class="size-lx strong m-10">328</span>户
                    </span>
                    <el-button type="primary" class="m-10">修改</el-button>
                    <el-button type="primary" class="m-10">保存</el-button>
                </div>
                <div class="m-40">
                    <el-cascader :options="options" style="width: 10px;" />
                </div>
            </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="问卷题目" name="3">
            <el-scrollbar height="400px">
                <div>
                    <el-button type="primary">添加投票项</el-button>
                </div>
                <div v-for="item in topic_details.item">
                    <div class="m-tb-10">
                        <!-- <span>你是否愿意使用大修基金安装中央空调？</span> -->
                        <span>{{item.title}}</span>
                        <el-button>修改</el-button>
                        <el-button>删除</el-button>
                    </div>
                    <div>
                        <ul style="list-style: decimal;">
                            <li>同意</li>
                            <li>弃权</li>
                            <li>反对</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div class="m-tb-10">
                        <span>你认为安装中央空调所需要资金可从下列哪些途径而来</span>
                        <el-button>修改</el-button>
                        <el-button>删除</el-button>
                    </div>
                    <div>
                        <ul style="list-style: decimal;">
                            <li>用户自筹资金</li>
                            <li>通过三方途径赞助</li>
                            <li>其它<el-input v-model="input" placeholder="请输入其它途径" /></li>
                        </ul>
                    </div>
                </div>
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
                    <el-table-column prop="date" label="序号"></el-table-column>
                    <el-table-column prop="name" label="操作人"></el-table-column>
                    <el-table-column prop="address" label="表决人"></el-table-column>
                    <el-table-column prop="date" label="真实业主"></el-table-column>
                    <el-table-column prop="name" label="房号"></el-table-column>
                    <el-table-column prop="address" label="类型"></el-table-column>
                    <el-table-column prop="date" label="面积"></el-table-column>
                    <el-table-column prop="name" label="表态"></el-table-column>
                    <el-table-column prop="address" label="时间"></el-table-column>
                    <el-table-column fixed="right" width="180px" label="操作">
                        <template #default="scope">
                            <el-button type="success" :icon="Edit"  size="small">修改</el-button>
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
</div>
</template>

<script setup>
    import {
        APIgetSurveyDetails,
        APIsetSurvey,
        APIgetSurveyTopic
    } from '@/api/custom/custom.js'
    // 导入图标
    import {
    Edit,
    Search,
    } from '@element-plus/icons-vue'
    const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-08',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-06',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-07',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    ]
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
    // 参与详情
    const radio = ref('网络参与')
    // 参与范围
    const data_range = {}
    onMounted(() => {
        console.log(props.id)
        detailsFunc(props.id)
    })
    // 切换tab-pane触发请求事件
    const changePane = (tab,event) => {
        // 代理
        // console.log(tab)
        // 指针事件pointerEvent（未使用）
        // console.log(event)
        // console.log(tab.props.name)
        if(tab.props.name == 2){
            APIsetSurvey().then(res => {
                console.log(res.data)
                // data_range = res.data
                // console.log(data_range)
            })
        }else if(tab.props.name == 3){
            let params = {
                sid:props.id
            }
            // 问卷题目
            APIgetSurveyTopic(params).then(res => {
                // console.log(res.data)
                if (res.status === 200) {
                    topic_details.item = res.data
                }
            })
        }else{

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
</style>
