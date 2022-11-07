<template>
    <div class="container">
        <page-main>
            <div class="size-lg m-b-10">{{ data_details.item.name }}</div>
            <div class="size-sm font-grey p-t-10 p-b-20">
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
            <el-tabs v-model="activeName" @tab-click="changePane">
                <el-tab-pane :label="activeName_1+'主题'" name="1">
                    <div>
                        <div class="details-box">
                            <div class="details-tit-sm">基础信息</div>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left_1 w-100">所在区域</div>
                                        <span>{{ data_details.item.author_cc_name }}</span>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left_1 w-100">所在区域类型</div>
                                        <span>{{ data_details.item.author_cc_name }}</span>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left_1 w-100">是否开放</div>
                                        <el-tag v-show="data_details.item.pub == 0" class="btnNone" type="danger" size="small">关闭</el-tag>
                                        <el-tag v-show="data_details.item.pub== 1" class="btnNone noDeal" type="success" size="small">开放</el-tag>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left_1 w-100">总票数</div>
                                        <span>{{ data_details.item.ticketall }}</span>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left_1 w-100">总面积数</div>
                                        <span>{{ data_details.item.areaall }}</span>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <div class="item">
                                    <div class="left_1 w-100 m-l-10">内容</div>
                                    <span v-html="data_details.item.content " />
                                </div>
                            </el-row>
                            <div class="details-tit-sm">发布人信息</div>
                            <el-row>
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left_1 w-100">发布人</div>
                                        <span>{{ data_details.item.uinfo?.name ? data_details.item.uinfo?.name:data_details.item.uinfo?.nickname? data_details.item.uinfo?.nickname :data_details.item.uinfo?.username }}</span>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left_1 w-100">手机号</div>
                                        <span>{{ data_details.item.uinfo?.mobile }}</span>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left_1 w-100">用户类型</div>
                                        <span>{{ data_details.item.utype }}</span>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left_1 w-100">活动id</div>
                                        <span>{{ data_details.item.id }}</span>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left_1 w-100">创建时间</div>
                                        <span>{{ data_details.item.created_at }}</span>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left_1 w-100">修改时间</div>
                                        <span>{{ data_details.item.updated_at }}</span>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="参与范围" name="2">
                    <el-button
                        type="primary"
                        style="padding: 19px 18px;position: relative;top: 5px;"
                        plain
                        @click="detail_set_area"
                    >
                        设置
                    </el-button>
                    <el-row class="m-t-30">
                        <el-col :sm="3" :md="3" :lg="5">
                            <div class="set_range_box">
                                <div>
                                    <div class="m-b-10" style="text-align: left;">已选择区域</div>
                                </div>
                                <el-scrollbar height="510px">
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
                                        <template v-if="flag_1">
                                            <div v-for="house in surverRangeWhenBuildHouse.arr" :key="house.id">
                                                <div class="region_box_item region_box_item_house" @click="clickUnits_1(house.id)">
                                                    {{ house.name }}
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                    <!-- 可参与单元 -->
                                    <div class="region_box btnNone">
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
                                        <template v-if="flag">
                                            <div
                                                v-for="house in surverRangeWhenUnitHouse.arr"
                                                :key="house.id"
                                            >
                                                <div class="region_box_item region_box_item_house" @click="clickUnits(house.id)">
                                                    {{ house.pos_name+house.name }}
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </el-scrollbar>
                            </div>
                        </el-col>
                        <el-col :sm="11" :md="11" :lg="19">
                            <div v-if="showHouses" class="table btnNone">
                                <div class="header" />
                                <div style="padding: 20px;box-sizing: border-box;background-color: #f0f2f5;height: calc(100% - 155px);">
                                    <div class="row-box row-box-title">
                                        <div class="row-item-box row-item-tit-box">
                                            <div class="row-item row-item-tit row-item-tit-bgline">
                                                <div class="tit-fh">楼层</div>
                                                <div class="tit-lc">房号</div>
                                            </div>
                                        </div>
                                        <el-scrollbar style="white-space: nowrap;">
                                            <div v-for="(item,i) in house_num.arr" :key="i" class="row-item-box ">
                                                <div class="row-item">
                                                    <div class="row-item-check">{{ item }}#</div>
                                                </div>
                                            </div>
                                        </el-scrollbar>
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
                                                    <div v-for="(item,i) in child.houses" :key="i" :class="{item: true,bg: item.can_exist}">
                                                        <div v-show="item.house_num?true:false" class="row-item" style="position: relative;">
                                                            <div class="row-item-check" @click="houseDetailsFunc(item)">{{ item.house_num }}#</div>

                                                            <el-popconfirm
                                                                title="确定要删除当前项么?"
                                                                cancel-button-type="info"
                                                                @confirm="deleteHouse(item.id)"
                                                            >
                                                                <template #reference>
                                                                    <div v-if="item.can_exist" class="region_box_item_del_1">✖</div>
                                                                </template>
                                                            </el-popconfirm>
                                                        </div>
                                                    </div>
                                                </div>
                                            </el-scrollbar>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row />
                </el-tab-pane>
                <el-tab-pane :label="activeName_1 == '选举' ? activeName_1+'候选人' : activeName_1+'题目'" name="3">
                    <div v-if="activeName_1 == '选举'">
                        <!-- <SurveyQuestions :id="route.query.id" /> -->
                        <SurveyElection :id="route.query.id" />
                    </div>
                    <div v-else>
                        <SurveyQuestions :id="route.query.id" />
                    </div>
                </el-tab-pane>
                <el-tab-pane :label=" activeName_1 + '参与详情'" name="4">
                    <SurveyAnswer :id="route.query.id" />
                </el-tab-pane>
                <el-tab-pane label="统计数据" name="8">
                    <div>
                        <div class="details-box">
                            <el-row>
                                <el-col :span="8">
                                    <el-button type="primary" @click="updateSurveyResult">更新统计结果</el-button>
                                </el-col>
                            </el-row>
                            <div class="details-tit-sm">数量</div>

                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left_1 w-100">总票数</div>
                                        <span>{{ statistics.obj.tot?.ticket }}</span>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left_1 w-100">总面积数</div>
                                        <span>{{ statistics.obj.tot?.area }}</span>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left_1 w-100">总房屋数</div>
                                        <span>{{ statistics.obj.house_tot_cnt }}</span>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left_1 w-100">线上参与</div>
                                        <span>{{ statistics.obj.answer_cnt?.online }}</span>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left_1 w-100">线下参与</div>
                                        <span>{{ statistics.obj.answer_cnt?.offline }}</span>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="item">
                                        <div class="left_1 w-100">已参与房屋</div>
                                        <span>{{ statistics.obj.house_has_cnt }}</span>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <!-- 总进度 -->
                    <div>
                        <div class="details-box">
                            <div class="details-tit-sm">总进度</div>
                            <el-row>
                                <el-col :lg="12" style="display: inline-block;text-align: center;">
                                    <el-progress type="circle" :percentage="statistics.obj.ticket_per" />
                                    <div style="font-size: 14px; color: #aaa; margin: 5px 0;">参与票/总票数</div>
                                    <div>
                                        {{ statistics.obj.answer_cnt?.online + statistics.obj.answer_cnt?.offline }}/{{ statistics.obj.tot?.ticket }}
                                    </div>
                                </el-col>
                                <el-col :lg="12" style="display: inline-block;text-align: center;">
                                    <el-progress type="circle" :percentage="statistics.obj.area_per" />
                                    <div style="font-size: 14px; color: #aaa; margin: 5px 0;">参与面积/总面积m²</div>
                                    <div>
                                        {{ statistics.obj.area_has }}/{{ statistics.obj.tot?.area }}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <!-- 选项详情 -->
                    <div>
                        <div class="details-box">
                            <div class="details-tit-sm hidden">
                                <div style="float: left;"> 选项详情 </div>
                                <div style="float: right;">
                                    <el-button-group>
                                        <el-button :type=" flag_2 ? '' : 'primary'" @click="getProportion">总占比</el-button>
                                        <el-button :type=" flag_3 ? '' : 'primary'" @click="getProportion_1">按参与占比</el-button>
                                    </el-button-group>
                                </div>
                            </div>

                            <div>
                                <div v-for="(item,i) in topic_details.item" :key="i">
                                    <template v-if="item.type == 1 || item.type == 2">
                                        <div style="font-weight: 700; margin: 10px 0;">
                                            <el-icon style="vertical-align: middle;color: #e44822;"><ChatDotRound /></el-icon>
                                            {{ item.title }}
                                        </div>
                                        <div v-for="(val,j) in item.opts" :key="j">
                                            <div class="m-t-10">{{ val.content }}</div>
                                            <el-row :gutter="20">
                                                <el-col :lg="12" style="color: #aaa; margin-top: 10px; font-size: 14px;">
                                                    <el-row>
                                                        <el-col :lg="2"> 票数 </el-col>
                                                        <el-col v-if="!flag_2&&flag_3" :lg="22" style="margin-top: 3px;">
                                                            <el-progress v-if="val.opt_cnt_map == 0" :percentage="0" :color="customColor" />
                                                            <el-progress v-else :percentage="(val.opt_cnt_map / countTot *100) .toFixed(2)" :color="customColor"/>
                                                            <text>{{'('+val.opt_cnt_map +'/'+countTot+')'}}</text>
                                                        </el-col>
                                                        <el-col v-if="flag_2&&!flag_3" :lg="22" style="margin-top: 3px;">
                                                            <el-progress v-if="val.opt_cnt_map == 0" :percentage="0" :color="customColor" />
                                                            <el-progress v-else :percentage="(val.opt_cnt_map / answerCnt *100) .toFixed(2)" :color="customColor"/>
                                                            <text>{{'('+val.opt_cnt_map +'/'+answerCnt+')'}}</text>
                                                        </el-col>
                                                    </el-row>
                                                </el-col>
                                                <el-col :lg="12" style="color: #aaa; margin-top: 10px; font-size: 14px;">
                                                    <el-row>
                                                        <el-col :lg="2"> 面积 </el-col>
                                                        <el-col v-if="!flag_2&&flag_3" :lg="22" style="margin-top: 3px;">
                                                            <el-progress v-if="val.opt_area_map == 0" :percentage="0" :color="customColor" />
                                                            <el-progress v-else :percentage="((val.opt_area_map) / areaTot * 100).toFixed(2)" :color="customColor"/>
                                                            <text>{{'('+val.opt_area_map +'/'+areaTot+')'}}</text>
                                                        </el-col>
                                                        <el-col v-if="flag_2&&!flag_3" :lg="22" style="margin-top: 3px;">
                                                            <el-progress v-if="val.opt_area_map == 0" :percentage="0" :color="customColor" />
                                                            <el-progress v-else :percentage="((val.opt_area_map) / areaCnt * 100).toFixed(2)" :color="customColor"/>
                                                            <text>{{'('+val.opt_area_map +'/'+areaCnt+')'}}</text>
                                                        </el-col>
                                                    </el-row>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="审核记录" name="7">
                    <div style="margin-top: 7px;">
                        <el-timeline>
                            <el-timeline-item
                                v-for="(item,index) in article_tab.arr" :key="index"
                                :timestamp="item.created_at" placement="top" :type="index==0? 'primary':''"
                            >
                                <el-card>
                                    <div class="details-box">
                                        <div class="item">
                                            <div class="left">审核活动</div>
                                            <div class="right">{{ item.auditable?.name }}</div>
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
                    <div v-show="article_tab.arr.length <= 0" class="size-lg">此活动无审核信息</div>
                </el-tab-pane>
                <el-tab-pane label="业主评论" name="5" class="hidden">
                    <Comment :id="route.query.id" />
                </el-tab-pane>
                <el-tab-pane label="访问记录" name="6">
                    <el-table
                        :data="data_2.list"
                        :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                        class="tab_1"
                        style="margin-top: 12px;"
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
                    </el-table>
                    <el-pagination
                        v-model:current-page="data_2.page"
                        style="float: right;"
                        class="btnClass"
                        layout="prev,next,jumper,"
                        :total="Infinity"
                        :page-size="data_2.per_page"
                        background
                        prev-text="上一页"
                        next-text="下一页"
                        hide-on-single-page
                    />
                </el-tab-pane>
            </el-tabs>
        </page-main>
        <PositionTreeFive
            v-model:showabled="switch_set_area"
            :tree_item="tree_item"
            :surveyid="route.query.id"
            @onRangeFunc="rangeFunc"
            @checkFunc="checkFunc"
            @checkChangeFunc="checkChangeFunc"
        />
        <!-- 更新统计结果弹窗 -->
        <el-dialog v-model="result_switch_examine" :title="result_str_title" width="50%">
            <el-button class="m-b-10" type="primary" @click="resultRefreshState">计算结果</el-button>
            <div>
                <el-row  :gutter="10">
                    <el-col :span="12">
                        <div class="p-10" style="background-color: #ecf5ff ;color: #4d95fc;">计算结果</div>
                        <el-form-item label="线上参与：">{{statistics.obj.answer_cnt.online}}</el-form-item>
                        <el-form-item label="线下参与：">{{statistics.obj.answer_cnt.offline}}</el-form-item>
                        <el-form-item label="参与房屋总数：">{{statistics.obj.house_tot_cnt}}</el-form-item>
                        <el-form-item label="已参与房屋数量：">{{statistics.obj.house_has_cnt}}</el-form-item>
                        <el-form-item label="已参与房屋面积总数：">{{statistics.obj.area_has}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <div class="p-10" style="background-color: #f0f9eb ;color: #61bf33;">最终结果</div>
                        <el-form
                            ref="ruleFormRef"
                            :model="from_examine.item"
                        >
                            <el-form-item label="线上参与">
                                <el-input v-model="from_examine.item.answer_cnt.online" placeholder="" type="number"/>
                            </el-form-item>
                            <el-form-item label="线下参与">
                                <el-input v-model="from_examine.item.answer_cnt.offline" placeholder="" type="number"/>
                            </el-form-item>
                            <el-form-item label="参与房屋总数">
                                <el-input v-model="from_examine.item.house_tot_cnt" placeholder="" type="number"/>
                            </el-form-item>
                            <el-form-item label="已参与房屋数量">
                                <el-input v-model="from_examine.item.house_has_cnt" placeholder="" type="number"/>
                            </el-form-item>
                            <el-form-item label="已参与房屋面积总数">
                                <el-input v-model="from_examine.item.area_has" placeholder="" type="number"/>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
            <template #footer>
                <div
                    style="display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    width: 100%;"
                >
                    <el-button @click="result_switch_examine = false">取消</el-button>
                    <el-button type="primary" @click="dialogSurveyResultFunc(ruleFormRef)">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import {
    APImodifySurveyStatus,
    APIgetChinaRegion,
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
    APIRecordList,
    // 统计结果
    APIgetSurveyStatus,
    APImodifySurveyResultStatus,
    APIrefreshSurveyStatus,
} from '@/api/custom/custom.js'
// 导入图标
import { ChatDotRound, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import {
    reactive,
    ref,
    watch
} from 'vue'
import { useRoute } from 'vue-router'

// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
// 审核记录
import {
    APIgetListArchiveAudit
} from '@/api/custom/custom.js'
import { APIgetUnitsListHouse } from '@/api/custom/custom'

const from_error = reactive({
    msg: {}
})
// 修改问卷状态
const exchangeStatus = status => {
    APImodifySurveyStatus(route.query.id, { status: status })
        .then(res => {
            detailsFunc(route.query.id)
        })
        .catch(err => {
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

}
const switch_set_area = ref(false)
const detail_set_area = () => {
    switch_set_area.value = true
}
// 详情
let switch_details = ref(false)
// 接收父组件传递过来的id
const route = useRoute()
// const props = defineProps(['id'])
const activeName = ref('1')
// 详情
const data_details = reactive({
    item: ''
})
// 问卷题目
const topic_details = reactive({
    item: []
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
// 添加问卷题目
const str_title = ref('添加')
let switch_examine = ref(false)
let switch_addAnswer = ref(false)
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
    detailsFunc(route.query.id)
})
// 切换tab-pane触发请求事件
const changePane = (tab, event) => {
    // 代理
    // 指针事件pointerEvent（未使用）
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

    } else if (tab.props.name == 7) {
        // 审核记录
        getListArchiveFunc()
    } else if (tab.props.name == 8) {
        // 统计结果
        topicsFunc()
        getSurveyStatus()
    }
}
const activeName_1 = ref('')
// 获取问卷详情
const detailsFunc = id => {
    data_details.item = ''
    APIgetSurveyDetails(id).then(res => {
        data_details.item = res
        if (res.type == 1) {
            activeName_1.value = '问卷'
        } else if (res.type == 2) {
            activeName_1.value = '选举'
        } else if (res.type == 3) {
            activeName_1.value = '表决'
        } else {
            activeName_1.value = '联名'
        }
        switch_details.value = true
    })
}
const statistics = reactive({
    obj: {}
})
const opt_cnt_map = reactive({
    arr: []
})
const opt_area_map = reactive({
    arr: []
})
const countTot = ref(0)
const areaTot = ref(0)
const answerCnt = ref(0)
const areaCnt = ref(0)
// 获取统计结果
const getSurveyStatus = () => {
    APIgetSurveyStatus(route.query.id).then(res => {
        from_examine.item = JSON.parse(JSON.stringify(res))//深拷贝
        statistics.obj = res
        countTot.value = statistics.obj.tot.ticket
        answerCnt.value = statistics.obj.answer_cnt.offline + statistics.obj.answer_cnt.online
        areaTot.value = statistics.obj.tot.area
        areaCnt.value = statistics.obj.area_has
        opt_cnt_map.arr = []
        opt_area_map.arr = []
        let opt_cnt_map_1 = {}
        let opt_area_map_1 = {}

        statistics.obj.opt_cnt_map.forEach((item, i) => {
            opt_cnt_map_1[item.oid] = item.cnt
        })
        statistics.obj.opt_area_map.forEach((item, i) => {
            opt_area_map_1[item.oid] = item.area
        })
        topic_details.item.forEach((item, i) => {
            item.opts.forEach((val, j) => {
                val.opt_cnt_map = 0
                val.opt_area_map = ''
                val.opt_cnt_map = opt_cnt_map_1[val.id] || 0
                val.opt_area_map = opt_area_map_1[val.id] || 0
            })
        })
    })
}
// 获取问卷题目
const topicsFunc = () => {
    let params = {
        sid: route.query.id
    }
    // 问卷题目列表
    APIgetSurveyTopic(params).then(res => {
        topic_details.item = res
    })
}
// 获取问卷范围
const surverRangeWhenUnitHouse = reactive({ arr: [] })
const surverRangeWhenBuildHouse = reactive({ arr: [] })
const flag = ref(false)
const flag_1 = ref(false)
const rangeFunc = () => {
    let params = {
        page: 1,
        per_page: 100,
        sid: route.query.id,
        can_type: 2
        // type_many: [2, 3, 4, 5]
    }
    APIgetSurveyRange(params)
        .then(res => {

            for (let i = 0;i < res.length;i++) {
                for (let j = i + 1; j < res.length;j++) {
                    if (res[i].tgt == res[j].tgt) {
                        res.splice(j, 1)
                        j--
                    }
                }
            }
            data_range.arr = res
        })
        .catch(err => {
            from_error.msg = err.data
        })
    APIgetSurverRangeWhenHouse({ sid: route.query.id, can_type: 2 }).then(res => {
        if (res.units) {
            flag.value = true
            surverRangeWhenUnitHouse.arr = res.units
        } else {
            flag.value = false
        }
        if (res.buildings) {
            flag_1.value = true
            surverRangeWhenBuildHouse.arr = res.buildings
        } else {
            flag_1.value = false
        }
    })
    showHouses.value = false
}
// 获取审核记录
const article_tab = reactive({
    arr: []
})
const getListArchiveFunc = () => {
    let params = {
        tgt_id: route.query.id,
        tgt_type: 'survey'
    }
    APIgetListArchiveAudit(params).then(res => {
        article_tab.arr = res
    })
}
// 获取访问记录
const getRecordListunc = () => {
    let params = {
        page: data_2.page,
        per_page: data_2.per_page,
        tgt_id: route.query.id
    }
    APIRecordList(params).then(res => {
        data_2.list = res
        data_2.total = res.length
        // let btnNext1 = document.querySelector('.btnClass')
        // let btnNext2 = btnNext1.children[1]
        //
        // if (res.length < data_2.per_page) {
        //
        //     btnNext2.classList.add('not_allowed')
        //     btnNext2.setAttribute('disabled', true)
        //     btnNext2.setAttribute('aria-disabled', true)
        // } else {
        //     btnNext2.classList.remove('not_allowed')
        //     btnNext2.removeAttribute('disabled')
        //     btnNext2.setAttribute('aria-disabled', false)
        // }
    })
}
watch(() => data_2.page, new_val => {
    getRecordListunc()
}, { immediate: true, deep: true })
// 问卷范围点击小区事件
const data_range_buildings = reactive({
    arr: []
})
const clickZone = val => {
    showHouses.value = false
    data_range_buildings.arr = []
    APIgetBuildListHouse({ zone_id: val.tgt, sid: route.query.id, can_type: 2 }).then(
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
const clickBuildings = val => {
    data_range_units.arr = []
    showHouses.value = false
    APIgetUnitsListHouse({
        building_id: val.id,
        sid: route.query.id,
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
const clickUnits = val => {
    APIgetHouseListSort({
        houseable_id: val,
        houseable_type: 'units',
        sid: route.query.id,
        can_type: 2
    }).then(res => {
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
    })
}
const clickUnits_1 = val => {
    APIgetHouseListSort({
        houseable_id: val,
        houseable_type: 'buildings',
        sid: route.query.id,
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
    APIgetSurveyAnswerList(route.query.id, params).then(res => {
        // answer_list = res[0]
        // 清空答卷列表（线上、线下、总列表）
        answer_list.length = 0
        answer_list_on.length = 0
        answer_list_off.length = 0
        // 线上线下参与数量
        participate.on_line = 0
        participate.off_line = 0
        res.forEach(element => {
            if (element.source === 1) {
                participate.on_line++
                answer_list_on.push(element)
            } else {
                participate.off_line++
                answer_list_off.push(element)
            }
        })
        answer_list.push(...answer_list_on, ...answer_list_off)
    //
    })
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
    //
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
    APIgetNotParticipate(route.query.id).then(res => {
        //
        participate.notParticipateLength = res.length
        res.forEach(element => {
            notParticipateList.push(element)
        })
    //
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
    APIdeleteSurveyRange({ sid: route.query.id, can_type: 2, type: 1, tgt: [houseid] }).then(res => {
        rangeFunc()
    })

}
// 刷新
const refreshFunc = () => {
    topicsFunc()
    rangeFunc()
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
// 调用tree树形组件初始的请求
APIgetChinaRegion().then(res => {
    tree_item.value.id = res[0].code
    tree_item.value.name = res[0].name
    tree_item.value.type = 'region'
    tree_item.value.next_type = 'region'
})
const flag_2 = ref(false)
const flag_3 = ref(true)
const getProportion = () => {
    flag_2.value = false
    flag_3.value = true
}
const getProportion_1 = () => {
    flag_2.value = true
    flag_3.value = false
}
// 更新统计结果
let result_switch_examine = ref(false)
const result_str_title = ref('更新统计结果')
const updateSurveyResult = () => {
    result_switch_examine.value = true
}
// 提交更新统计结果
let ruleFormRef = ref('')
let from_examine = reactive({
    item:{
        tot:{},
        answer_cnt:{},
        house_tot_cnt:'',
        house_has_cnt:'',
        area_has:'',
    }
})
const dialogSurveyResultFunc = formEl => {
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            APImodifySurveyResultStatus(route.query.id, from_examine.item).then(res=>{
                ElMessage.success('修改成功',res)
                result_switch_examine.value = false
                getSurveyStatus()
            }).catch(err => {
                ElMessage.error('修改失败')
            })
        }else {
            return false
        }
    })
}
// 重现统计数据
const resultRefreshState = () => {
    APIrefreshSurveyStatus(route.query.id).then(res=>{
        statistics.obj = res
        countTot.value = statistics.obj.tot.ticket
        answerCnt.value = statistics.obj.answer_cnt.offline + statistics.obj.answer_cnt.online
        areaTot.value = statistics.obj.tot.area
    })
}
// 配置项
const opts_all = reactive({
    obj: {
        status_all: []
    }
})
getOpts(['announce_status']).then(res => {
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
    height: 100%;
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
.row-box {
    border-bottom: 1px solid #f2f2f2;
    background-color: #fff;
    display: flex;
    .row-item-box {
        display: inline-block;
        box-sizing: border-box;
        padding: 6px;
        min-width: 84px;
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
        min-width: 84px;
        height: 44px;
        &.bg {
            background-color: #409eff;
        }
        .row-item {
            width: 100%;
            height: 100%;
            // border: 1px solid #e9e9e9;
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
        width: 84px;
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
.row-box-title {
    .row-item-box {
        .row-item {
            border: 1px solid #fff;
        }
    }
}
.el-timeline {
    margin-left: -38px;
}
</style>
