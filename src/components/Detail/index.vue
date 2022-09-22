<template>
    <div class="container">
        <div style="position: relative; top: -10px;">
            <span>开始时间：{{ data_details.item.startat }}</span>
            <span class="m-20">
                <el-tag v-show="data_details.item.status == 1" class="btnNone" type="primary" effect="dark" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.status) }} </el-tag>
                <el-tag v-show="data_details.item.status == 2" class="btnNone noDeal" type="warning" effect="dark" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.status) }} </el-tag>
                <el-tag v-show="data_details.item.status == 3" class="btnNone" type="warning" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.status) }} </el-tag>
                <el-tag v-show="data_details.item.status == 4" class="btnNone" type="success" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.status) }} </el-tag>
                <el-tag v-show="data_details.item.status == 5" class="btnNone" type="info" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.status) }} </el-tag>
                <el-tag v-show="data_details.item.status == 6" class="btnNone" type="info" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.status) }} </el-tag>
                <el-tag v-show="data_details.item.status == 7" class="btnNone" type="info" size="small">{{ getOptVal(opts_all.obj.announce_status,data_details.item.status) }} </el-tag>
            </span>
            <span>结束时间：{{ data_details.item.endat }}</span>
        </div>
        <!-- <div class="m-t-10 m-b-20">
            <el-button size="small" @click="exchangeStatus('1')">筹备中</el-button>
            <el-button size="small" type="primary" @click="exchangeStatus('2')">
                待审
            </el-button>
            <el-button size="small" type="info" @click="exchangeStatus('3')">
                未开始
            </el-button>
            <el-button size="small" type="success" @click="exchangeStatus('4')">
                进行中
            </el-button>
            <el-button size="small" type="warning" @click="exchangeStatus('5')">
                暂停
            </el-button>
            <el-button size="small" type="warning" @click="exchangeStatus('6')">
                终止
            </el-button>
            <el-button size="small" type="danger" @click="exchangeStatus('7')">
                已结束
            </el-button>
        </div> -->
        <el-tabs v-model="activeName" @tab-click="changePane">
            <el-tab-pane :label="activeName_1+'主题'" name="1">
                <div style="height: 400px;">
                    <div class="details-box">
                        <!-- <el-row>
                            <el-col :span="8">

                            </el-col>
                        </el-row> -->
                        <div class="details-tit-sm">基础信息</div>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <div class="item">
                                    <div class="left w-100">内容</div>
                                    <span>{{ data_details.item.content }}</span>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="item">
                                    <div class="left w-100">所在区域</div>
                                    <span>{{ data_details.item.author_cc_name }}</span>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="item">
                                    <div class="left w-100">是否开放</div>
                                    <el-tag v-show="data_details.item.pub == 0" class="btnNone" type="primary" size="small">关闭</el-tag>
                                    <el-tag v-show="data_details.item.pub== 1" class="btnNone noDeal" type="warning" size="small">开放</el-tag>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <div class="item">
                                    <div class="left w-100">总票数</div>
                                    <span>{{ data_details.item.ticketall }}</span>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="item">
                                    <div class="left w-100">总面积数</div>
                                    <span>{{ data_details.item.areaall }}</span>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="item">
                                    <div class="left w-100">活动id</div>
                                    <span>{{ data_details.item.id }}</span>
                                </div>
                            </el-col>
                        </el-row>
                        <div class="details-tit-sm">发布人信息</div>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <div class="item">
                                    <div class="left w-100">发布人</div>
                                    <span>{{ data_details.item.uinfo?.name ? data_details.item.uinfo?.name:data_details.item.uinfo?.nickname? data_details.item.uinfo?.nickname :data_details.item.uinfo?.username }}</span>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="item">
                                    <div class="left w-100">手机号</div>
                                    <span>{{ data_details.item.uinfo?.mobile }}</span>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="item">
                                    <div class="left w-100">用户类型</div>
                                    <span>{{ data_details.item.utype }}</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                <!-- <div>
                        <h3>问卷记录</h3>
                        <div class="steps-column m-l-40 selected">
                            <div class="steps-column-item">
                                <div>
                                    <text>时间:2022-07-14 12:00:00</text>
                                </div>
                                <div>
                                    操作人员：街道 主任 王先生
                                    <span class="m-l-40">事件：审核</span>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </el-tab-pane>
            <el-tab-pane label="设置参与范围" name="2">
                <el-button
                    type="primary"
                    class="m-tb-10"
                    plain
                    style="position: relative;"
                    @click="detail_set_area"
                >
                    设置
                </el-button>
                <!-- <el-table :data="data_range.arr"
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
                                    <el-button type="danger" size="small" >
                                        删除
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table> -->

                <el-row class="m-l-30">
                    <el-col :sm="3" :md="3" :lg="5">
                        <div class="set_range_box">
                            <div>
                                <div class="m-b-10 m-l-50">已选择区域</div>
                            </div>
                            <el-scrollbar height="310px">
                                <div class="region_box btnNone">
                                    <div v-for="item in data_range.arr" :key="item.id">
                                        <div
                                            v-if="item.type == 5"
                                            class="region_box_item"
                                            @click="closeShowHouse"
                                        >
                                            {{ item.tgt_obj }}
                                            <el-popconfirm
                                                title="确定要删除当前项么?"
                                                cancel-button-type="info"
                                                @confirm="deleteRange(item)"
                                            >
                                                <template #reference>
                                                    <div class="region_box_item_del">✖</div>
                                                </template>
                                            </el-popconfirm>
                                        </div>
                                    </div>
                                </div>
                                <!-- 已选择小区 -->
                                <div class="region_box btnNone">
                                    <div v-for="item in data_range.arr" :key="item.id">
                                        <div
                                            v-if="item.type == 4"
                                            class="region_box_item"
                                            @click="closeShowHouse"
                                        >
                                            <!-- {{ item.tgt_obj.pos_name+item.tgt_obj.name }} -->
                                            {{ item.tgt_obj.name }}
                                            <el-popconfirm
                                                title="确定要删除当前项么?"
                                                cancel-button-type="info"
                                                @confirm="deleteRange(item)"
                                            >
                                                <template #reference>
                                                    <div class="region_box_item_del">✖</div>
                                                </template>
                                            </el-popconfirm>
                                        </div>
                                    </div>
                                    <div v-for="house in surverRangeWhenHouse.arr" :key="house.id">
                                        <div v-if="!house.name&&!house.building?.name" class="region_box_item region_box_item_house">
                                            {{ house.building.zone.name }}
                                        </div>
                                    </div>
                                </div>
                                <!-- 可参与楼栋 -->
                                <div class="region_box btnNone">
                                    <div v-for="item in data_range.arr" :key="item.id">
                                        <div
                                            v-if="item.type == 3"
                                            class="region_box_item"
                                            @click="closeShowHouse"
                                        >
                                            {{ item.tgt_obj?.pos_name+item.tgt_obj?.name }}
                                            <el-popconfirm
                                                title="确定要删除当前项么?"
                                                cancel-button-type="info"
                                                @confirm="deleteRange(item)"
                                            >
                                                <template #reference>
                                                    <div class="region_box_item_del">✖</div>
                                                </template>
                                            </el-popconfirm>
                                        </div>
                                    </div>
                                    <div v-for="house in surverRangeWhenHouse.arr" :key="house.id">
                                        <div v-if="!house.name" class="region_box_item region_box_item_house">
                                            {{ house.building.name }}
                                        </div>
                                    </div>
                                </div>
                                <!-- 可参与单元 -->
                                <div class="region_box" btnNone>
                                    <!-- <div v-for="item in data_range_units.arr" :key="item.id">
                    <div class="region_box_item" @click="clickUnits(item)">
                      {{ item.name }}
                      <el-popconfirm
                        title="确定要删除当前项么?"
                        cancel-button-type="info"
                        @confirm="deleteRange(item)"
                      >
                        <template #reference>
                          <div class="region_box_item_del">✖</div>
                        </template>
                      </el-popconfirm>
                    </div>
                  </div> -->
                                    <div v-for="item in data_range.arr" :key="item.id">
                                        <div
                                            v-if="item.type == 2"
                                            class="region_box_item"
                                            @click="closeShowHouse"
                                        >
                                            {{ item.tgt_obj.pos_name+item.tgt_obj.name }}
                                            <el-popconfirm
                                                title="确定要删除当前项么?"
                                                cancel-button-type="info"
                                                @confirm="deleteRange(item)"
                                            >
                                                <template #reference>
                                                    <div class="region_box_item_del">✖</div>
                                                </template>
                                            </el-popconfirm>
                                        </div>
                                    </div>
                                    <div
                                        v-for="house in surverRangeWhenHouse.arr"
                                        :key="house.id"
                                    >
                                        <div class="region_box_item region_box_item_house" @click="clickUnits(house.id)">
                                            {{ house.name }}
                                        </div>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </div>
                    </el-col>
                    <el-col :sm="11" :md="11" :lg="19">
                        <div v-if="showHouses" class="table btnNone">
                            <div class="header" />
                            <el-scrollbar style="height: 300px;">
                                <div>
                                    <div
                                        v-for="(floor, index) in floors.arr"
                                        :key="index"
                                        class="house_box"
                                    >
                                        <div class="floor">{{ floor.floor_truth }}</div>
                                        <div class="house_item">
                                            <div
                                                v-for="house in floor.houses"
                                                :key="house.id"
                                                :class="{
                                                    item: true,
                                                    bg: house.can_exist,
                                                }"
                                            >
                                                {{ house.house_num }}
                                                <el-popconfirm
                                                    title="确定要删除当前项么?"
                                                    cancel-button-type="info"
                                                    @confirm="deleteHouse(house.id)"
                                                >
                                                    <template #reference>
                                                        <div v-if="house.can_exist" class="region_box_item_del_1">✖</div>
                                                    </template>
                                                </el-popconfirm>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </div>
                    </el-col>
                </el-row>
                <!-- <el-row>
                    <el-col :sm="3" :md="3" :lg="3">
                        <div class="set_range_box">
                            <div class="m-b-10">
                                <div>已选择小区</div>
                            </div>
                            <el-scrollbar height="300px" />
                        </div>
                    </el-col>
                </el-row> -->
                <!-- <el-row>
                    <el-col :sm="3" :md="3" :lg="3">
                        <div class="set_range_box">
                            <div>
                                <div>可参与楼栋</div>
                            </div>
                            <el-scrollbar height="300px">

                            </el-scrollbar>
                        </div>
                    </el-col>
                </el-row> -->
                <!-- <el-row>
                    <el-col :sm="3" :md="3" :lg="3">
                        <div class="set_range_box">
                            <div>
                                <div>可参与单元</div>
                            </div>
                            <el-scrollbar height="300px" />
                        </div>
                    </el-col>
                </el-row> -->
                <el-row />
            </el-tab-pane>
            <el-tab-pane :label="activeName_1+'题目'" name="3">
                <SurveyQuestions :id="props.id" />
            </el-tab-pane>
            <el-tab-pane :label=" activeName_1 + '调查结果'" name="4">
                <SurveyAnswer :id="props.id" />
            </el-tab-pane>
            <el-tab-pane label="审核记录" name="7">
                <div>
                    <el-timeline>
                        <el-timeline-item
                            v-for="(item,index) in article_tab.arr" :key="index"
                            :timestamp="item.created_at" placement="top" :type="index==0? 'primary':''"
                        >
                            <el-card>
                                <div class="details-box">
                                    <div class="item">
                                        <div class="left">公示</div>
                                        <div class="right">{{ item.auditable?.title }}</div>
                                    </div>
                                    <div class="item">
                                        <div class="left">处理人</div>
                                        <div class="right">
                                            {{ item.auditor?.name?
                                                item.auditor?.name:item.auditor?.nickname?item.auditor?.nickname:item.auditor?.username
                                            }}
                                        </div>
                                    </div>
                                    <div v-if="item.reply" class="item">
                                        <div class="left">回复内容</div>
                                        <div class="right">{{ item.reply }}</div>
                                    </div>
                                    <div class="item">
                                        <div class="left">状态</div>
                                        <div class="right">
                                            <el-tag v-if="item.status== 10" type="warning" size="small">
                                                未处理
                                            </el-tag>
                                            <el-tag v-if="item.status == 20" type="success" size="small">
                                                审核通过
                                            </el-tag>
                                            <el-tag v-if="item.status == 30" type="danger" size="small">
                                                审核失败
                                            </el-tag>
                                        </div>
                                    </div>
                                </div>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </div>
                <div v-show="article_tab.arr.length <= 0" class="size-lg">此公式无审核信息</div>
            </el-tab-pane>
            <el-tab-pane label="业主评论" name="5" class="hidden">
                <div style="display: flex;align-items: center;">
                    <span>是否开启评论：</span>
                    <el-switch
                        v-model="popup1.using" inline-prompt active-text="开" inactive-text="关"
                        @change="switchFnUse"
                    />
                    <div style="margin-left: 20px;display: inline-block;">
                        <el-radio-group
                            v-model="popup1.scoreper" :disabled="!popup1.using"
                            @change="switchFnUse(true)"
                        >
                            <el-radio
                                v-for="(item,i) in opts_all.obj.comment_scoreper" :key="item.key"
                                :label="item.key" size="large"
                            >
                                {{ item.val }}
                            </el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div>
                    <el-button
                        class="m-b-20 m-t-5" type="primary" :icon="Plus"
                        :disabled="popup1.using ? false:true" @click="()=>{
                            popup2.form = {};
                            popup2.error = {};
                            popup2.title = '添加';
                            popup2.switch = true;
                        }"
                    >
                        添加
                    </el-button>
                </div>
                <el-table
                    :data="data_1.list"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    class="tab_1"
                >
                    <el-table-column label="评论内容">
                        <template #default="scope">
                            <span>{{ scope.row.content }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="data_1.list.uname">
                        <template #default="scope">
                            <span>{{ scope.row.uname|| 'null' }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="评分" width="80">
                        <template #default="scope">
                            <span>{{ scope.row.score }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center">
                        <template #default="scope">
                            <!-- <span>{{ getOptVal(opts_all.obj.comment_status,scope.row.status ) }} </span> -->
                            <el-tag v-if="scope.row.status == 10" type="waring" roung>未审核</el-tag>
                            <el-tag v-if="scope.row.status == 20" type="success" round>已审核</el-tag>
                            <el-tag v-if="scope.row.status == 30" type="danger" round>审核失败</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="评论时间">
                        <template #default="scope">
                            <span>{{ scope.row.created_at }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="260">
                        <template #default="scope">
                            <el-button type="primary" size="small" @click="popup2FnModify(scope.row)">
                                修改
                            </el-button>
                            <el-button size="small" @click="popup3FnDetails(scope.row.id)">
                                详情
                            </el-button>
                            <!-- <el-popconfirm
                            title="确定要删除当前项么?"
                            cancel-button-type="info"
                            @confirm="data1FnDelete(scope.row.id)"
                        >
                            <template #reference>
                                <el-button
                                    type="danger"
                                    size="small"
                                >
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm> -->
                            <el-button type="primary" size="small" @click="popup2FnReply(scope.row)">
                                回复
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    v-model:current-page="data_1.page" style="float: right;"
                    layout="prev,next,jumper," :total="50" :page-size="data_1.per_page" background
                    prev-text="上一页" next-text="下一页" hide-on-single-page
                />
            </el-tab-pane>
            <el-tab-pane label="访问记录" name="6">
                <el-table
                    :data="data_2.list"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    class="tab_1"
                >
                    <el-table-column label="访问者">
                        <template #default="scope">
                            <span>{{ scope.row.uinfo?.name?scope.row.uinfo?.name:scope.row.uinfo?.nickname?scope.row.uinfo?.nickname:scope.row.uinfo?.username }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="访问时间">
                        <template #default="scope">
                            <span>{{ scope.row.created_at }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="ip地址" align="center">
                        <template #default="scope">
                            <span>{{ scope.row.ip }} </span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="评论时间" width="200">
                                <template #default="scope">
                                    <span>{{ scope.row.created_at }} </span>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="260">
                                <template #default="scope">
                                    <el-button
                                        type="primary" size="small"
                                        @click="popup2FnModify(scope.row)"
                                    >
                                        修改
                                    </el-button>
                                    <el-button
                                        size="small"
                                        @click="popup3FnDetails(scope.row.id)"
                                    >
                                        详情
                                    </el-button>
                                    <el-button
                                        type="primary"
                                        size="small"
                                        @click="popup2FnReply(scope.row)"
                                    >
                                        回复
                                    </el-button>
                                </template>
                            </el-table-column> -->
                </el-table>
                <el-pagination
                    v-model:current-page="data_2.page"
                    style="float: right;"
                    class="btnClass"
                    layout="prev,next,jumper,"
                    :total="50"
                    :page-size="data_2.per_page"
                    background
                    prev-text="上一页"
                    next-text="下一页"
                    hide-on-single-page
                />
            </el-tab-pane>
        </el-tabs>
        <!-- 修改添加 -->
        <el-dialog v-model="popup2.switch" :title="popup2.title" width="50%" :append-to-body="true">
            <el-form :model="popup2.form">
                <el-row :gutter="10">
                    <el-col v-if="popup2.title == '修改'" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px" label="状态"
                            :error="popup2.error&&popup2.error.status?popup2.error.status[0]:''"
                        >
                            <el-select v-model="popup2.form.status" class="head-btn" placeholder="" clearable>
                                <el-option
                                    v-for="(item,i) in opts_all.obj.comment_status" :key="item.key"
                                    :label="item.val" :value="item.key"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col v-if="popup2.title == '回复'" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px" label="打分"
                            :error="popup2.error&&popup2.error.score?popup2.error.score[0]:''"
                        >
                            <el-input-number v-model="popup2.form.score" :step="1" :max="popup1.scoreper" :min="0" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="70px" label="内容"
                            :error="popup2.error&&popup2.error.content?popup2.error.content[0]:''"
                        >
                            <el-input
                                v-model="popup2.form.content" :autosize="{ minRows: 2, maxRows: 6 }"
                                type="textarea" placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="popup2.switch=false">取消</el-button>
                    <el-button type="primary" @click="popup2FnAdd">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog v-model="popup3.switch" title="详情" width="50%" :append-to-body="true">
            <div class="details-box">
                <div v-if="popup3.details.uname" class="item">
                    <div class="left">评论人</div>
                    <div class="right">{{ popup3.details.uname }}</div>
                </div>
                <div class="item">
                    <div class="left">评论内容</div>
                    <div class="right">{{ popup3.details.content }}</div>
                </div>
                <div class="item">
                    <div class="left">评论状态</div>
                    <div class="right">{{ getOptVal(opts_all.obj.comment_status,popup3.details.status) }}</div>
                </div>
                <div class="item">
                    <div class="left">所在地址</div>
                    <div class="right">{{ popup3.details.loc }}</div>
                </div>
                <div class="item">
                    <div class="left">评论人IP</div>
                    <div class="right">{{ popup3.details.ip }}</div>
                </div>
                <div class="item">
                    <div class="left">评论时间</div>
                    <div class="right">{{ popup3.details.created_at }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="popup3.switch = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <PositionTreeFive
            v-model:showabled="switch_set_area"
            :tree_item="tree_item"
            :surveyid="props.id"
            @onRangeFunc="rangeFunc"
            @checkFunc="checkFunc"
            @checkChangeFunc="checkChangeFunc"
        />
    </div>
</template>

<script setup>
import {
    APImodifySurveyStatus,
    APIgetChinaRegion,
    APIaddSurveyRange,
    APIgetSurveyDetails,
    // 问卷范围
    APIgetSurveyRange,
    APIgetSurverRangeWhenHouse,
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
    APIgetBuildListHouse,
    // 访问记录
    APIRecordList
} from '@/api/custom/custom.js'
// 导入图标
import { Edit, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const from_error = reactive({
    msg: {}
})
import {
    reactive,
    ref,
    watch
} from 'vue'
// 修改问卷状态
const exchangeStatus = status => {
    APImodifySurveyStatus(props.id, { status: status })
        .then(res => {
            console.log(res)
            detailsFunc(props.id)
        })
        .catch(err => {
            // console.log('err',err.response.data)
            ElMessage.error('修改失败' + err.response.data.message)
            // from_error.msg = err.data
        })
}
// 详情设置范围
const tree_item = ref({
    id: '50',
    name: '测试',
    next_type: 'region',
    type: 'region'
})
const checkFunc = val => {

}
const checkChangeFunc = val => {
    console.log(val)
}
const switch_set_area = ref(false)
const detail_set_area = () => {
    switch_set_area.value = true
    console.log(switch_set_area.value)
}
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
    arr: []
})
const data_range_zone = reactive({
    arr: []
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
    opts.push({
        content: '',
        score: '',
        sort: ''
    })
}
const data_2 = reactive({
    list: [],
    page: 1,
    total: 50,
    per_page: 15
})
onMounted(() => {
    detailsFunc(props.id)
})
// 切换tab-pane触发请求事件
const changePane = (tab, event) => {
    // 代理
    // console.log(tab)
    // 指针事件pointerEvent（未使用）
    // console.log(event)
    // console.log(tab.props.name)
    if (tab.props.name == 2) {
        rangeFunc()
    } else if (tab.props.name == 3) {
        // 问卷题目
        topicsFunc()
    } else if (tab.props.name == 4) {
        // 未参与房屋
        notParticipate()
        // 问卷调查结果
        answerListFunc()
        topicsFunc()

    } else {
        // 业主评论
        getListArchiveFunc()
        ownerComment()
    }
}
const activeName_1 = ref('')
// 获取问卷详情
const detailsFunc = id => {
    data_details.item = ''
    APIgetSurveyDetails(id).then(res => {
        if (res.status === 200) {
            data_details.item = res.data
            if (res.data.type == 1) {
                activeName_1.value = '问卷'
            } else if (res.data.type == 2) {
                activeName_1.value = '选举'
            } else if (res.data.type == 3) {
                activeName_1.value = '表决'
            } else {
                activeName_1.value = '联名'
            }
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
    console.log('topic_details', topic_details)
}
// 获取问卷范围
const surverRangeWhenHouse = reactive({ arr: [] })
const rangeFunc = () => {
    let params = {
        page: 1,
        per_page: 100,
        sid: props.id,
        can_type: 2
        // type_many: [2, 3, 4, 5]
    }
    APIgetSurveyRange(params)
        .then(res => {

            for (let i = 0;i < res.data.length;i++) {
                for (let j = i + 1; j < res.data.length;j++) {
                    if (res.data[i].tgt == res.data[j].tgt) {
                        res.data.splice(j, 1)
                        j--
                    }
                }
            }
            console.log(res.data)
            data_range.arr = res.data
        })
        .catch(err => {
            from_error.msg = err.data
        })
    APIgetSurverRangeWhenHouse({ sid: props.id, can_type: 2 }).then(res => {
        console.log(res)
        surverRangeWhenHouse.arr = res.data.units
        console.log(surverRangeWhenHouse.arr)
    })
    showHouses.value = false
}
// 获取审核记录
const article_tab = reactive({
    arr: []
})
import {
    APIgetListArchiveAudit
} from '@/api/custom/custom.js'
const getListArchiveFunc = () => {
    let params = {
        tgt_id: props.id,
        tgt_type: 'announce'
    }
    APIgetListArchiveAudit(params).then(res => {
        console.log(res)
        article_tab.arr = res
    })
}
// 获取访问记录
const getRecordListunc = () => {
    let params = {
        page: data_2.page,
        per_page: data_2.per_page,
        tgt_id: props.id
    }
    APIRecordList(params).then(res => {
        console.log(res)
        data_2.list = res
        data_2.total = res.length
        let btnNext1 = document.querySelector('.btnClass')
        let btnNext2 = btnNext1.children[1]
        console.log(btnNext1.children[1])
        if (res.length < data_2.per_page) {
            console.log('gouqi')
            btnNext2.classList.add('not_allowed')
            btnNext2.setAttribute('disabled', true)
            btnNext2.setAttribute('aria-disabled', true)
        } else {
            btnNext2.classList.remove('not_allowed')
            btnNext2.removeAttribute('disabled')
            btnNext2.setAttribute('aria-disabled', false)
        }
    })
}
watch(() => data_2.page, new_val => {
    // console.log(data_2.page)
    // data1FnGetList()
    getRecordListunc()
}, { immediate: true, deep: true })
// 问卷范围点击小区事件
const data_range_buildings = reactive({
    arr: []
})
const clickZone = val => {
    showHouses.value = false
    data_range_buildings.arr = []
    APIgetBuildListHouse({ zone_id: val.tgt, sid: props.id, can_type: 2 }).then(
        res => {
            res.forEach(item => {
                if (item.can_exist) {
                    data_range_buildings.arr.push(item)
                }
            })
        }
    )
}
// 问卷范围点击楼栋事件
const data_range_units = reactive({
    arr: []
})
import { APIgetUnitsListHouse } from '@/api/custom/custom'
const clickBuildings = val => {
    data_range_units.arr = []
    showHouses.value = false
    APIgetUnitsListHouse({
        building_id: val.id,
        sid: props.id,
        can_type: 2
    }).then(res => {
        res.forEach(item => {
            if (item.can_exist) {
                data_range_units.arr.push(item)
            }
        })
    })
}
// 点击单元取消显示房屋范围
const closeShowHouse = () => {
    showHouses.value = false
}
// 问卷范围点击单元事件
const data_range_selected_houses = reactive({
    arr: []
})
const showHouses = ref(false)
const floors = reactive({
    arr: []
})
const clickUnits = val => {
    console.log(val)
    APIgetHouseListSort({
        houseable_id: val,
        houseable_type: 'units',
        sid: props.id,
        can_type: 2
    }).then(res => {
        showHouses.value = true
        floors.arr = res.floors
        floors.arr.forEach(item => {
            data_range_selected_houses.arr.push(...item.houses)
        })
        data_range_selected_houses.arr = data_range_selected_houses.arr.filter(
            item => {
                return item.can_exist == 1
            }
        )
        console.log(data_range_selected_houses.arr)
        console.log(floors.arr)
    })
}
// 获取问卷结果详情
let answer_detail = reactive({
    item: ''
})
const getAnswerDetail = id => {
    switch_answer_detail.value = true
    // 根据问卷题目数量插入对象到answers中
    // 先判断数组长度是否相同
    if (addticket.answers.length != topic_details.item.length) {
        addticket.answers = []
        for (let i = 0; i < topic_details.item.length; i++) {
            // 判断是选择题还是主观题
            if (topic_details.item[i].type == 1 || topic_details.item[i].type == 2) {
                addticket.answers.push({ tid: '', opt: [] })
            } else {
                addticket.answers.push({ tid: '', content: '' })
            }
        }
    }
    // console.log(id)
    APIgetSurveyAnswerDetail(id).then(res => {
        // console.log(res.data)
        answer_detail.item = res.data
        console.log('answer_detail.item', answer_detail.item)
    })
}
// 参与情况
let participate = reactive({
    on_line: 0,
    off_line: 0,
    notParticipateLength: 0
})
// 获取问卷结果列表
let answer_list = reactive([])
let answer_list_on = reactive([])
let answer_list_off = reactive([])
const answerListFunc = () => {
    let params = {
        page: 1,
        per_page: 15
    }
    APIgetSurveyAnswerList(props.id, params).then(res => {
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
            if (element.source === 1) {
                participate.on_line++
                answer_list_on.push(element)
            } else {
                participate.off_line++
                answer_list_off.push(element)
            }
        })
        answer_list.push(...answer_list_on, ...answer_list_off)
    // console.log(answer_list)
    })
}
// 判断选项是否存在于答卷详情,取每个选项的id判断是否存在于答卷中，存在则显示该道选项内容
const showTopic = (optid, answeropts) => {
    let isShow = false
    answeropts.forEach(element => {
        console.log(optid, element.oid)
        if (optid === element.oid) {
            isShow = true
        }
    })
    return isShow
}
// 切换标签，显示不同参与情况的列表
const handleClick = tab => {
    if (tab === '线上参与') {
        answer_list.length = 0
        answer_list.push(...answer_list_on)
    } else if (tab === '线下参与') {
        answer_list.length = 0
        answer_list.push(...answer_list_off)
    } else if (tab === '全部') {
        answer_list.length = 0
        answer_list.push(...answer_list_on, ...answer_list_off)
    }
}
// 打开对话框添加书面票
const addAnswer = () => {
    switch_addAnswer.value = true
    // 根据问卷题目数量插入对象到answers中
    // console.log('length',topic_details.item.length)
    // 先判断数组长度是否相同
    if (addticket.answers.length != topic_details.item.length) {
        addticket.answers = []
        for (let i = 0; i < topic_details.item.length; i++) {
            // 判断是选择题还是主观题
            if (topic_details.item[i].type == 1 || topic_details.item[i].type == 2) {
                addticket.answers.push({ tid: '', opt: [] })
            } else {
                addticket.answers.push({ tid: '', content: '' })
            }
        }
    }
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
// 添加问卷题目
const addServeyTopic = () => {
    // console.log(props.id)
    str_title.value = '添加'
    switch_examine.value = true
    // 清除问卷的信息
    topic_examine.item = { sid: props.id, extra: null, sort: 5 }
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
// 删除问卷题目
const deleteFunc = val => {
    APIdeleteSurveyTopic(val.id).then(res => {
        refreshFunc()
        // ElMessage.success(res.statusText)
        ElMessage.success('删除成功')
    })
}
// 删除问卷范围
const deleteRange = val => {
    let range = { sid: val.sid, can_type: val.can_type, type: val.type, tgt: [] }
    range.tgt.push(val.tgt)
    APIdeleteSurveyRange(range).then(res => {
        rangeFunc()
        ElMessage.success('删除成功')
    })
}
// 删除问卷房屋
const deleteHouse = houseid => {
    APIdeleteSurveyRange({ sid: props.id, can_type: 2, type: 1, tgt: [houseid] })
    rangeFunc()
}
// 刷新
const refreshFunc = () => {
    topicsFunc()
    rangeFunc()
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
    idcard: '',
    answers: [
    // {
    //     // 'tid':'',
    //     // 'content':'',
    //     'opt':''
    // },
    ]
})
// 点击选框事件
const emitTickets = (tid, index) => {
    // console.log('tid',tid,'opt',opt,'index',index)
    addticket.answers[index].tid = tid
    // addticket.answers.opt = opt
}
const dialogAddSurveyAnswer = () => {
    console.log('addticket', addticket)
    APIaddSurveyAnswer(props.id, addticket)
        .then(res => {
            // console.log(res)
            switch_addAnswer.value = false
            ElMessage.success('问卷提交成功')
        })
        .catch(err => {
            from_error.msg = err.data
        })
}

// // 调用接口设置范围
// const submit = () => {
//     // console.log(ArrSetRange)
//     // 遍历数组调用API接口添加数据
//     ArrSetRange.forEach(element => {
//         APIaddSurveyRange(element).then(res => {
//             console.log(res)
//             ElMessage.success("问卷范围设置成功")
//         }).catch(err => {
//             from_error.msg = err.data
//         })
//     })
// }
// 调用tree树形组件初始的请求
APIgetChinaRegion().then(res => {
    tree_item.value.id = res.data[0].code
    tree_item.value.name = res.data[0].name
    tree_item.value.type = 'region'
    tree_item.value.next_type = 'region'
})

// 业主评论
let comment_list = reactive([])
const ownerComment = () => {
    let params = {
        tgtid: props.id
    }
    APIgetCommentList(params)
        .then(res => {
            // console.log(res)
            comment_list.length = 0
            res.forEach(element => {
                comment_list.push(element)
            })
            console.log(comment_list)
        })
        .catch(err => {
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
const modifyComment = id => {
    modify.Id = id
    switch_comment.value = true
    APIgetCommentDetails(id)
        .then(res => {
            console.log(res)
            comment_details.item = res
            comment_details.item.status += ''
        })
        .catch(err => {
            from_error.msg = err.data
        })
}
// 评论详情
const getCommentDetail = id => {
    switch_comment_detail.value = true
    comment_details.length = 0
    APIgetCommentDetails(id)
        .then(res => {
            console.log(res)
            comment_details.item = res
        })
        .catch(err => {
            from_error.msg = err.data
        })
}
// 提交评论修改
const dialogModifyComment = (content, status) => {
    console.log(modify.Id)
    APIputComment(modify.Id, { content: content, status: status })
        .then(res => {
            console.log(res)
            ElMessage.success('修改成功')
        })
        .catch(err => {
            ElMessage.error('提交失败')
        })
    switch_comment.value = false
    ownerComment()
}
import { Plus } from '@element-plus/icons-vue'
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
const popup1 = reactive({
    switch: false,
    using: false,
    scoreper: 0
})
import {
    APIpostCommentconfig,
    APIdeleteCommentconfig
} from '@/api/custom/custom.js'
const switchFnUse = val => {
    console.log(val)
    if (val) {
        APIpostCommentconfig(props.id, { scoreper: popup1.scoreper }).then(res => {
            // ElMessage.success('已开启')
        })
        return false
    }
    APIdeleteCommentconfig(props.id).then(res => {
        // ElMessage.success('已开启')
    })
}
// const switchFnStatus = () => {
//     APIgetCommentconfig(props.id).then(res => {
//         console.log(res)
//         popup1.using = false
//         if (res) {
//             popup1.using = true
//             popup1.scoreper = res.scoreper
//         }
//     })
// }
const popup2 = reactive({
    switch: false,
    title: '添加',
    error: {},
    form: {}
})
const popup2FnAdd = () => {
    popup2.error = {}
    for (let key in popup2.form) {
        if (popup2.form[key] == '') {
            delete popup2.form[key]
        }
    }
    if (popup2.title == '添加' || popup2.title == '回复') {
        APIpostComment(route.query.id, popup2.form).then(res => {
            ElMessage.success('添加成功')
            popup2.switch = false
            data1FnGetList()
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    } else if (popup2.title == '修改') {
        APIputComment(popup2.form.id, popup2.form).then(res => {
            ElMessage.success('修改成功')
            popup2.switch = false
            data1FnGetList()
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    }
}
const popup2FnModify = val => {
    popup2.error = {}
    popup2.title = '修改'
    APIgetCommentDetails(val.id).then(res => {
        popup2.form = {
            id: res.id,
            content: res.content,
            status: res.status
        }
        popup2.switch = true
    })
}
const popup2FnReply = val => {
    popup2.error = {}
    popup2.title = '回复'
    popup2.form = {
        content: '',
        atuid: val.uid,
        atutype: val.utype,
        score: 0,
        tagid: val.id

    }
    popup2.switch = true
}
const popup3 = reactive({
    switch: false,
    details: {}
})
const popup3FnDetails = id => {
    APIgetCommentDetails(id).then(res => {
        popup3.details = res
        popup3.switch = true
    })
}
const data_1 = reactive({
    list: [],
    page: 1,
    total: 50,
    per_page: 15
})
const data1FnGetList = () => {
    let data = {
        page: data_1.page,
        per_page: data_1.per_page,
        tgtid: props.id
    }
    APIgetCommentList(data).then(res => {
        data_1.list = res
        data_1.total = res.length
        let btnNext = document.querySelector('.btn-next')
        if (res.length < data_1.per_page) {
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
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {
        status_all: []
    }
})
getOpts(['announce_status', 'toushu_pub']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
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
.display {
    display: flex;
}
.set_range_box {
    height: 100%;
    font-size: 20px;
    color: #aaa;
    .region_box {
        .region_box_item {
            text-align: center;
            background-color: #409eff;
            // color: #ecf5ff;
            color: white;
            width: 85%;
            height: 40px;
            font-size: 15px;
            margin-bottom: 10px;
            line-height: 40px;
            border-radius: 10px;
            position: relative;
            margin-top: 10px;
            .region_box_item_del {
                width: 20px;
                height: 20px;
                line-height: 16px;
                position: absolute;
                right: -6px;
                top: -7px;
                border-radius: 50%;
                border: 2px solid red;
                cursor: pointer;
                font-weight: bold;
                color: red;
            }
        }
        .region_box_item_house {
            background-color: #999;
        }
    }
}
.table {
    display: inline-block;
    width: 77%;
    height: 300px;
    position: absolute;
    .header {
        width: 100%;
        height: 40px;
        text-align: center;
        font-size: 22px;
    }
    .house_box {
        height: 51px;
        width: 99%;
        border: 2px solid #999;
        border-bottom: none;
        display: flex;
        &:last-child {
            border-bottom: 2px solid #999;
        }
        .floor {
            width: 56px;
            height: 50px;
            border-right: 1px solid #999;
            text-align: center;
            line-height: 50px;
            background-color: #424141;
            color: white;
            font-size: 20px;
        }
        .house_item {
            width: 90%;
            display: flex;
            align-items: center;
            .item {
                margin-left: 10px;
                width: 40px;
                height: 40px;
                border: 1px solid #999;
                font-size: 20px;
                line-height: 40px;
                text-align: center;
                position: absolute;
                &.bg {
                    background-color: #409eff;
                }
            }
            .region_box_item_del_1 {
                width: 20px;
                height: 20px;
                line-height: 16px;
                transform: scale(0.7);
                position: absolute;
                right: -9px;
                top: -8px;
                z-index: 1;
                border-radius: 50%;
                border: 2px solid red;
                cursor: pointer;
                font-weight: bold;
                color: red;
            }
        }
    }
}
.w-100 {
    width: 100px;
}
</style>
