<template>
<div class="container">
    <div style="position: relative; top: -10px;">
        <span>开始时间：{{data_details.item.startat}}</span>
        <span class="m-20">
            <el-button v-if="data_details.item.status == 1" round>筹备阶段</el-button>
            <el-button v-if="data_details.item.status == 2" type="primary" round>待审</el-button>
            <el-button v-if="data_details.item.status == 3" type="info" round>未开始</el-button>
            <el-button v-if="data_details.item.status == 4" type="success" round>进行中</el-button>
            <el-button v-if="data_details.item.status == 5" type="warning" round>暂停</el-button>
            <el-button v-if="data_details.item.status == 6" type="warning" round>终止</el-button>
            <el-button v-if="data_details.item.status == 7" type="danger" round>已结束</el-button>
        </span>
        <span>结束时间：{{data_details.item.endat}}</span>
    </div>
    <el-tabs v-model="activeName" @tab-click="changePane">
        <el-tab-pane label="问卷主题" name="1">
            <el-scrollbar height="400px">
                <div class="details-box">
                    <div class="item">
                        <div style="margin: auto 0;" class="left">内容</div>
                        <p>{{data_details.item.content}}</p>
                    </div>
                    <div class="item">
                        <div class="left">附件</div>
                    </div>
                    <div class="item">
                        <div class="left">是否开放</div><span>{{data_details.item.pub}}</span>
                        <div class="left">是否匿名</div><span>{{data_details.item.pub}}</span>
                        <div class="left">活动类型</div><span>{{data_details.item.type}}</span>
                    </div>
                    <div class="item">
                        <div class="left">总票数</div><span>{{data_details.item.ticketall}}</span>
                        <div class="left">总面积数</div><span>{{data_details.item.areaall}}</span>
                        <div class="left">活动id</div><span>{{data_details.item.id}}</span>
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
        <el-tab-pane label="设置参与范围" name="2" >
            <el-scrollbar height="400px">
                <!-- <div>
                    <el-button type="primary" size="large" @click="addServeyTopic()">添加问卷范围</el-button>
                </div> -->
               <el-table :data="data_range.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    width="100%"
                >
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="tgt_name" label="地区范围"></el-table-column>
                    <el-table-column label="活动参与范围类型" >
                        <template #default="scope">
                            <span v-if="scope.row.type === 1">房屋</span>
                            <span v-if="scope.row.type === 2">单元</span>
                            <span v-if="scope.row.type === 3">楼栋</span>
                            <span v-if="scope.row.type === 4">小区</span>
                            <span v-if="scope.row.type === 5">区域</span>
                            <span>{{scope.row.type}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed='right' width="250px" label="操作">
                        <template #default="scope">
                            <el-popconfirm title="确定要删除当前项么?" cancel-button-type="info"
                                @confirm="deleteRange(scope.row)">
                                <template #reference>
                                    <el-button type="danger" size="large" >
                                        删除
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="添加参与范围" name="6" >
            <el-button type="primary" class="m-10" @click="submit">确认设置</el-button>
            <el-scrollbar height="400px">
                <!-- 树形结构 -->
                <div class="tree-item" >
                    <div style="height: calc(100% - 60px);">
                        <position-tree-third
                            :id="props.id"
                            :tree_item = "tree_item"
                            @arrSetRange="arrSetRange"
                            @checkFunc="checkFunc"
                        />
                    </div>
                    <!-- 房屋 -->
                    <div class="houses p-l-20">
                        <div style="width: 100%;">
                            <div v-for="item in data_tab.arr" class="housesStyle">
                                <span class="floor">{{item.floor_truth}}层</span>
                                <!-- <span class="floorHouse" v-for="items in item.houses"><span><el-button>{{items.name}}</el-button></span></span> -->
                                <span class="floorHouse" v-for="items in item.houses"><span @click="exchange(items.id)" :class="[isSelect?'hover':'']">{{items.name}}</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="问卷题目" name="3">
            <el-scrollbar height="400px">
                <div>
                    <el-button type="primary" @click="addServeyTopic()">添加问卷题目</el-button>
                </div>
                <el-table :data="topic_details.item"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    width="100%"
                >
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="title" label="题目"></el-table-column>
                    <el-table-column prop="type" label="题目选项类型" >
                        <template #default="scope">
                            <span v-if="scope.row.type == 1">单选</span>
                            <span v-else-if="scope.row.type == 2">多选</span>
                            <span v-else-if="scope.row.type == 3">主观填空</span>
                            <span v-else="scope.row.type == 0">文字描述</span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed='right' width="250px" label="操作">
                        <template #default="scope">
                            <el-button border type="primary" size="small" @click="modifyServeyTopic(scope.row)">
                            修改
                            </el-button>
                            <el-popconfirm title="确定要删除当前项么?" cancel-button-type="info"
                                @confirm="deleteFunc(scope.row)">
                                <template #reference>
                                    <el-button type="danger" size="small" >
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
            <el-scrollbar height="400px">
                <el-table :data="answer_list" border style="width: 100%;">
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
        </el-tab-pane>
        <el-tab-pane label="业主评论" name="5">
            <el-scrollbar height="400px">
                <el-table :data="comment_list" style="width: 100%;">
                    <el-table-column prop="content" width="200" label="评论内容"></el-table-column>
                    <el-table-column prop="zan" label="点赞" width="100"></el-table-column>
                    <el-table-column label="状态" width="150" align="center">
                        <template #default="scope">
                            <el-button v-show="scope.row.status == 10" type="warning">未审核</el-button>
                            <el-button v-show="scope.row.status == 20" type="success">已审核</el-button>
                            <el-button v-show="scope.row.status == 30" type="danger">审核失败</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="score" label="评分" width="100"></el-table-column>
                    <el-table-column prop="atuname" label="作者" width="100"></el-table-column>
                    <el-table-column prop="updated_at" label="时间" ></el-table-column>
                    <el-table-column fixed='right' width="200" label="操作">
                        <template #default="scope">
                            <el-button border size="small" @click="getCommentDetail(scope.row.id)">详情</el-button>
                            <el-button border type="primary" size="small" @click="modifyComment(scope.row.id)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-scrollbar>
        </el-tab-pane>
    </el-tabs>
    <!-- 修改添加问卷题目 -->
    <el-dialog v-model="switch_examine" :title="str_title" width="50%">
        <div>
            <el-scrollbar style="height: 450px;">
                <div class="details-box p-lr-10">
                    <el-form :model="topic_examine.item">
                        <el-row :gutter="10">
                            <el-col>
                                <el-form-item label="问卷题目"  label-width="120px">
                                    <el-input v-model="topic_examine.item.title"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="10">
                            <el-col>
                                <el-form-item label="类型"  label-width="120px">
                                    <el-radio-group class="ml-4" v-model="topic_examine.item.type">
                                        <el-radio label='1' size="large">单选</el-radio>
                                        <el-radio label='2' size="large">多选</el-radio>
                                        <el-radio label='3' size="large">主观填空</el-radio>
                                        <el-radio label='0' size="large">文字描述</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="10">
                            <el-col>
                                <el-form-item label="计分方式"  label-width="120px">
                                    <el-radio-group class="ml-4" v-model="topic_examine.item.score_calc">
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
                                <el-form-item label="题目分值"  label-width="120px">
                                    <el-input v-model="topic_examine.item.score" placeholder=""></el-input>
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
                        <el-row :gutter="24" v-for="(item,i) in opts">
                            <el-col :span="14" class="flex">
                                <span style="width: 40px;">选项内容</span>
                                <el-input v-model="item.content"></el-input>
                            </el-col>
                            <el-col :span="4" class="flex">
                                <span>排序</span>
                                <el-input v-model="item.score" ></el-input>
                            </el-col>
                            <el-col :span="4" class="flex">
                                <span>分值</span>
                                <el-input v-model="item.sort"></el-input>
                            </el-col>
                            <el-popconfirm  title="确定要删除当前项么?" cancel-button-type="info"
                                @confirm="opts.splice(i,1)">
                                <template #reference>
                                    <el-button type="danger"  >
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
    <!-- 添加书面票 -->
    <el-dialog v-model="switch_addAnswer" title="添加书面票" fullscreen>
        <el-scrollbar>
            <div class="m-b-20">证件号码：<el-input v-model="addticket.idcard"></el-input></div>
            <!-- 遍历题目 -->
            <div v-for="(item,index) in topic_details.item" :key="item.id">
                <!-- 单选题 -->
                <div v-if="item.type === 1">
                    <div>题号(单选题){{index+1}}、{{item.title}}</div>
                    <div class="m-l-40" v-for="items in item.opts" :key="items.id">
                        <!-- <el-radio-group v-model="addticket.answers[index].opt[i]">
                            <el-radio :label="items.id" @click="emitTickets(item.id,items.id,index)">{{items.content}}</el-radio>
                        </el-radio-group> -->
                        <el-radio-group v-model="addticket.answers[index].opt[0]">
                            <el-radio :label="items.id" @click="emitTickets(item.id,index)">{{items.content}}</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <!-- 多选题 -->
                <div v-else-if="item.type === 2">
                    <div>题号(多选题){{index+1}}、{{item.title}}</div>
                    <div class="m-l-40" v-for="(items,i) in item.opts" :key="items.id">
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
                <!-- <div v-else>
                    <div>题号(文字描述){{index+1}}：{{item.title}}</div>
                    <div class="m-l-40">
                        <el-input v-model="addticket.answers[index].content" placeholder="请输入内容" @click="emitTickets(item.id,index)"/>
                    </div>
                </div> -->
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
    <el-dialog v-model="switch_answer_detail" title="用户答卷详情" fullscreen>
        <el-scrollbar>
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
                        <!-- <el-radio-group v-model="addticket.answers[index].opt[i]">
                            <el-radio :label="items.id" @click="emitTickets(item.id,items.id,index)">{{items.content}}</el-radio>
                        </el-radio-group> -->
                        <el-radio-group v-model="ischecked">
                            <el-radio :label="showTopic(items.id,answer_detail.item.answertopics[index].answeropts) ? '1' : '0'" disabled>{{items.content}}</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <!-- 多选题 -->
                <div v-else-if="item.type === 2">
                    <div>题号(多选题){{index+1}}、{{item.title}}</div>
                    <div class="m-l-40" v-for="items in item.opts" :key="items.id">
                        <!-- <el-checkbox-group v-if="addticket.answers[index]" v-model="addticket.answers[index].opt">
                            <el-checkbox v-if="items" :label="items.id">{{items.content}}</el-checkbox>
                        </el-checkbox-group> -->
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox v-if="answer_detail.item" :label="showTopic(items.id,answer_detail.item.answertopics[index].answeropts) ? '1' : '0'" disabled>{{items.content}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <!-- 主观填空 -->
                <div v-else-if="item.type === 3">
                    <div>题号(主观题){{index+1}}、{{item.title}}</div>
                    <div class="m-l-40 m-tb-10">
                        <el-input v-if="addticket.answers[index]" v-model="addticket.answers[index].content" placeholder="请输入内容"/>
                        <!-- <el-input :placeholder="answer_detail.item.answertopics[index].content"/> -->
                    </div>
                </div>
                <!-- 文字描述 -->
                <!-- <div v-else>
                    <div>题号(文字描述){{index+1}}：{{item.title}}</div>
                    <div class="m-l-40">
                        <el-input v-model="addticket.answers[index].content" placeholder="请输入内容"/>
                    </div>
                </div> -->
            </div>
        </el-scrollbar>
        <!-- <div v-for="(item,index) in topic_details.item" :key="item.id" class="m-t-10">
            <div>题号{{index+1}}：{{item.title}}</div>
            <div class="m-l-40" v-for="items in item.opts" :key="items.id" >
                <span
                    v-if="answer_detail.item.answertopics[index]"
                    v-show="showTopic(items.id,answer_detail.item.answertopics[index].answeropts)"
                    >{{items.content}}</span>
                <span>{{items.id}}</span>:
                <span v-if="answer_detail.item.answertopics[index]">{{answer_detail.item.answertopics[index].answeropts}}</span>
                <span>{{answer_detail.item.answertopics[index].answeropts}}</span>
                <p>{{items.id}}:{{answer_detail.item.answertopics[index].answeropts[0].oid}}</p>
            </div>
        </div> -->
        <template #footer>
            <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                <el-button @click="switch_answer_detail=false">取消</el-button>
            </div>
        </template>
    </el-dialog>
    <!-- 修改问卷评论 -->
    <el-dialog v-model="switch_comment" title="修改问卷评论">
        <div class="details-box p-lr-10">
            <el-form :model="comment_details.item">
                <el-row :gutter="10">
                    <el-col>
                        <el-form-item label="评论内容"  label-width="120px">
                            <el-input v-model="comment_details.item.content"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col>
                        <el-form-item label="评论状态"  label-width="120px">
                            <el-radio-group class="ml-4" v-model="comment_details.item.status">
                                <el-radio label="10" size="large">未审核</el-radio>
                                <el-radio label="20" size="large">已审核</el-radio>
                                <el-radio label="30" size="large">审核失败</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <template #footer>
            <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                <el-button @click="switch_comment=false">取消</el-button>
                <el-button type="primary" @click="dialogModifyComment(comment_details.item.content,comment_details.item.status)">确定</el-button>
            </div>
        </template>
    </el-dialog>
    <!-- 问卷评论详情 -->
    <el-dialog v-model="switch_comment_detail" title="问卷评论详情">
        <div class="details-box p-lr-10">
            <div class="item">
                <div class="left">评论内容</div>
                <div class="right">{{comment_details.item.content}}</div>
            </div>
            <div class="item">
                <div class="left">评论状态</div>
                <div class="right">
                    <span v-if="comment_details.item.status == 10">未审核</span>
                    <span v-else-if="comment_details.item.status == 20">未审核</span>
                    <span v-else>审核失败</span>
                </div>
            </div>
            <div class="item">
                <div class="left">评论时间</div>
                <div class="right">{{comment_details.item.created_at}}</div>
            </div>
            <div class="item">
                <div class="left">修改时间</div>
                <div class="right">{{comment_details.item.updated_at}}</div>
            </div>
            <div class="item">
                <div class="left">点赞</div>
                <div class="right">{{comment_details.item.zan}}</div>
            </div>
            <div class="item">
                <div class="left">分数</div>
                <div class="right">{{comment_details.item.score}}</div>
            </div>
            <div class="item">
                <div class="left">网络位置</div>
                <div class="right">{{comment_details.item.loc}}:{{comment_details.item.ip}}</div>
            </div>
        </div>
        <template #footer>
            <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                <el-button @click="switch_comment_detail=false">取消</el-button>
            </div>
        </template>
    </el-dialog>
</div>
</template>

<script setup>
    import {
        APIgetChinaRegion,
        APIaddSurveyRange,
        APIgetSurveyDetails,
        // 问卷范围
        APIgetSurveyRange,
        APIdeleteSurveyRange,
        APIgetSurveyTopic,
        APIgetSurveyTopicDetail,
        APIdeleteSurveyTopic,
        APIaddSurveyTopic,
        APImodifySurveyTopic,
        APIgetHouseListSort,
        // 问卷结果
        APIgetSurveyAnswerList,
        APIgetSurveyAnswerDetail,
        APIaddSurveyAnswer,
        APIgetNotParticipate,
        // 评论
        APIgetCommentList,
        APIgetCommentDetails,
        APIputComment,
    } from '@/api/custom/custom.js'
    // 导入图标
    import {
        Edit,
        Search,
    } from '@element-plus/icons-vue'
    import {
        ElMessage
    } from 'element-plus'
    const from_error = reactive({
        msg: {}
    })
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
    // 判断答卷选项是否选中
    const ischecked = ref('1')
    const checkList = ref(['1'])
    // 参与详情
    const radio = ref('全部')
    // 参与范围
    let data_range = reactive({
        arr:[]
    })
    // 添加问卷题目
    const str_title = ref('添加')
    let switch_examine = ref(false)
    let switch_addAnswer = ref(false)
    let switch_answer_detail = ref(false)
    let switch_comment = ref(false)
    let switch_comment_detail = ref(false)
    let topic_examine = reactive({
        item: {}
    })
    let opts = reactive([])
    // 增加选项
    const addopts = () => {
        opts.push(
            {
                'content':'',
                'score':'',
                'sort':'',
            },
        )
    }
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
            rangeFunc()
        }else if(tab.props.name == 3){
            // 问卷题目
            topicsFunc()
        }else if(tab.props.name == 4){
            // 未参与房屋
            notParticipate()
            // 问卷调查结果
            answerListFunc()
            topicsFunc()
        }else{
            // 业主评论
            ownerComment()
        }
    }
    // 获取问卷详情
    const detailsFunc = id => {
        data_details.item = ''
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
            sid:props.id
        }
        // 问卷题目列表
        APIgetSurveyTopic(params).then(res => {
            console.log(res.data)
            if (res.status === 200) {
                topic_details.item = res.data
            }
        })
        console.log('topic_details',topic_details)
    }
    // 获取问卷范围
    const rangeFunc = () => {
        let params = {
            page:1,
            per_page:15,
            sid:props.id
        }
        APIgetSurveyRange(params).then(res => {
            data_range.arr = res.data
            console.log(data_range.arr.length)
        }).catch(err => {
            from_error.msg = err.data
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
    // 参与情况
    let participate = reactive({
        "on_line":0,
        "off_line":0,
        "notParticipateLength":0
    })
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
    // 判断选项是否存在于答卷详情,取每个选项的id判断是否存在于答卷中，存在则显示该道选项内容
    const showTopic = (optid,answeropts) => {
        let isShow = false
        answeropts.forEach(element => {
            console.log(optid,element.oid)
            if(optid === element.oid) {
                isShow = true
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
                }else {
                    addticket.answers.push({'tid':'','content':''})
                }
            }
        }
    }
    // 获取未参与答卷的房屋作为未参与用户的数量
    let notParticipateLength = 0
    const notParticipate = () => {
        APIgetNotParticipate(props.id).then(res => {
            // console.log('aaa',res.data)
            participate.notParticipateLength = res.data.length
        })
    }
    // 添加问卷题目
    const addServeyTopic = () => {
        console.log(props.id)
        str_title.value = '添加'
        switch_examine.value = true
        // 清除问卷的信息
        topic_examine.item = {'sid':props.id,'extra':null,'sort':5}
        opts.length = 0
    }
    // 修改问卷题目
    const modifyServeyTopic = (val) =>{
        console.log(val.id)
        str_title.value = '修改'
        // 获取问卷题目详情
        APIgetSurveyTopicDetail(val.id).then(res => {
            if(res.status == 200 ) {
                topic_examine.item = res.data
                // 修改为字符串类型，让选项被选中，默认为int类型，选项没有选中
                topic_examine.item.type += ''
                topic_examine.item.score_calc += ''
                // 清除选项缓存数据
                opts.length = 0
                // 将选项数据遍历插入数组对象
                res.data.opts.forEach(element => {
                    opts.push(element)
                });
                console.log(opts)
                switch_examine.value = true
            }
        })
    }
    // 删除问卷题目
    const deleteFunc = val => {
        APIdeleteSurveyTopic(val.id).then(res => {
            refreshFunc()
            // ElMessage.success(res.statusText)
            ElMessage.success("删除成功")
        })
    }
    // 删除问卷范围
    const deleteRange = val => {
        let range = {"sid":val.sid,"can_type":val.can_type,"type":val.type,"tgt":[]}
        range.tgt.push(val.tgt)
        APIdeleteSurveyRange(range).then(res => {
            rangeFunc()
            ElMessage.success("删除成功")
        })
    }
    // 刷新
    const refreshFunc = () => {
        topicsFunc()
    }
    // 确定提交添加修改问卷题目
    const dialogExamineCloseFunc = (id) => {
        topic_examine.item.opts = opts
        // console.log(topic_examine.item)
        if(str_title.value == '添加') {
            // console.log('qqqqqq',topic_examine.item)
            APIaddSurveyTopic(topic_examine.item).then(res => {
                if (!res.code) {
                    refreshFunc()
                    // ElMessage.success(res.msg)
                    ElMessage.success('添加成功')
                    switch_examine.value = false
                }
            })
        }else {
            id = topic_examine.item.id
            // console.log(id)
            APImodifySurveyTopic(id,topic_examine.item).then(res => {
                if (res.status == 200) {
                    refreshFunc()
                    // ElMessage.success(res.msg)
                    ElMessage.success('修改成功')
                    switch_examine.value = false
                }
            })
        }

    }

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
    // 点击选框事件
    const emitTickets = (tid,index) => {
        // console.log('tid',tid,'opt',opt,'index',index)
        addticket.answers[index].tid = tid
        // addticket.answers.opt = opt
    }
    const dialogAddSurveyAnswer = () => {
        console.log("addticket",addticket)
        APIaddSurveyAnswer(props.id,addticket).then(res => {
            // console.log(res)
            ElMessage.success("问卷提交成功")
        }).catch(err => {
            from_error.msg = err.data
        })
    }

    // 接受传递的数据
    let ArrSetRange
    const arrSetRange = val => {
        ArrSetRange = val
        // console.log("Arr",ArrSetRange)
    }
    // 调用接口设置范围
    const submit = () => {
        // console.log(ArrSetRange)
        // 遍历数组调用API接口添加数据
        ArrSetRange.forEach(element => {
            APIaddSurveyRange(element).then(res => {
                console.log(res)
            }).catch(err => {
                from_error.msg = err.data
            })
        })
    }
    const tree_item = ref({
    })
    // 调用tree树形组件初始的请求
    APIgetChinaRegion().then(res => {
        tree_item.value.id = res.data[0].code
        tree_item.value.name = res.data[0].name
        tree_item.value.type = 'region'
        tree_item.value.next_type = 'zone'
    })

    let data_tab = reactive({
        arr: []
    })
    const checkFunc = val => {
        if(val.type == 'units') {
            // 获取房屋数据按楼栋楼层
            APIgetHouseListSort({ houseable_type: 'units ', houseable_id: val.id }).then(res => {
                console.log(res)
                data_tab.arr=res.floors
                // console.log('bbb',data_tab.arr)
            }).catch(err => {
                from_error.msg = err.data
            })
        }
    }

    // 业主评论
    let comment_list = reactive([])
    const ownerComment = () => {
        let params = {
            tgtid:props.id,
        }
        APIgetCommentList(params).then(res => {
            // console.log(res)
            comment_list.length = 0
            res.forEach(element => {
                comment_list.push(element)
            })
            console.log(comment_list)
        }).catch(err => {
            from_error.msg = err.data
        })
    }
    // 修改评论
    const modify = reactive({
        Id: ''
    })
    const comment_details = reactive({
        item: ''
    })
    const modifyComment = (id) => {
        modify.Id = id
        switch_comment.value = true
        APIgetCommentDetails(id).then(res => {
            console.log(res)
            comment_details.item = res
        }).catch(err => {
            from_error.msg = err.data
        })
    }
    // 评论详情
    const getCommentDetail = (id) => {
        switch_comment_detail.value = true
        comment_details.length = 0
        APIgetCommentDetails(id).then(res => {
            console.log(res)
            comment_details.item = res
        }).catch(err => {
            from_error.msg = err.data
        })
    }
    // 提交评论修改
    const dialogModifyComment = (content,status) => {
        console.log(modify.Id)
        APIputComment(modify.Id,{"content":content,"status":status}).then(res => {
            console.log(res)
            ElMessage.success("修改成功")
        }).catch(err => {
            ElMessage.error("提交失败")
        })
        switch_comment.value = false
        ownerComment()
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
