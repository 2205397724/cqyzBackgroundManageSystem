<template>
    <div class="vote">
        <page-main>
            <div class="size-lx ">{{ dataForm.item.name }}</div>
            <p v-if="dataForm.item.desc">
                {{ dataForm.item.desc }}
            </p>
            <div class="m-t-20 m-b-30">
                <!-- <el-button-group> -->
                <el-button type="primary" style="width: 150px;" @click="addActiviesFunc">
                    添加关联活动
                </el-button>
            </div>
            <div>
                <el-scrollbar height="800px">
                                    <el-timeline>
                                        <el-timeline-item v-for="(item,index) in activity_tab.arr" :key="index" :timestamp="item.docable.created_at" placement="top" type="primary">
                                            <el-card>
                                                <div>
                                                    <div class="size-lg">{{item.docable.title}}</div>
                                                    <div class="m-t-10 m-b-10">
                                                        <el-tag round v-if="item.tgt_type == 'announce'" size="large">公示</el-tag>
                                                        <el-tag round v-if="item.docable.type == 1" size="large">联名活动</el-tag>
                                                        <el-tag round v-if="item.docable.type == 2" size="large">表决活动</el-tag>
                                                        <el-tag round v-if="item.docable.type == 3" size="large">选举活动</el-tag>
                                                        <el-tag round v-if="item.docable.type == 4" size="large">问卷活动</el-tag>
                                                    </div>
                                                    <div>
                                                            <span style="color: #b7b1b1;">操作人员: {{ item.docable.uinfo.name }}</span>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </el-timeline-item>
                                    </el-timeline>
                                    </el-scrollbar>
                                </div>
            <!-- <div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="基础信息" name="1">
                        <el-scrollbar height="800px">
                            <div class="details-box">
                                <div class="item">
                                    <div class="left content">内容</div>
                                    <div class="right">{{ dataForm.item.content }}</div>
                                </div>
                                <div class="box">
                                    <div>
                                        <div class="item">
                                            <div class="left">是否公开</div>
                                            <div class="right">{{ getOptVal(opts_all.obj.toushu_pub,dataForm.item.pub) }}</div>
                                        </div>
                                        <div class="item">
                                            <div class="left">小区id</div>
                                            <div class="right">{{ dataForm.item.zid }}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="item">
                                            <div class="left">是否匿名</div>
                                            <div class="right">{{ getOptVal(opts_all.obj.toushu_ano,dataForm.item.ano) }}</div>
                                        </div>
                                        <div v-if="dataForm.item.catpro" class="item">
                                            <div class="left">问题分类</div>
                                            <div class="right">{{ newcatpro.item.name }}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="item">
                                            <div class="left">分类</div>
                                            <div class="right">{{ getOptVal(opts_all.obj.tousu_type_kind,dataForm.item.kind) }}</div>
                                        </div>
                                        <div v-if="dataForm.item.catob" class="item">
                                            <div class="left">投诉对象</div>
                                            <div class="right">{{ newcatob.item.name }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-scrollbar>
                    </el-tab-pane>
                    <el-tab-pane label="处理记录" name="2">
                        <el-scrollbar height="800px">
                            <div>
                                <el-timeline>
                                    <el-timeline-item v-for="(item,index) in dataForm.item.totlogs" :key="index" :timestamp="item.created_at" placement="top" :type="index == 0 ? 'primary' : ''">
                                        <el-card>
                                            <div>
                                                <div>
                                                    <div class="sno m-b-10">
                                                        <span>操作人员: {{ Name }}</span>
                                                        <span class="m-l-60">事件：{{ item.content }}</span>
                                                    </div>
                                                </div>
                                                <div class="m-b-10">
                                                    {{ item.logable.content }}
                                                </div>
                                                <div>
                                                    <img v-for="(item,i) in dataForm.item.affixs" :key="i" :preview-src-list="dataForm.item.affixs" class="image" :src="item" fit="cover">
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-timeline-item>
                                </el-timeline>
                            </div>
                        </el-scrollbar>
                    </el-tab-pane>
                    <el-tab-pane label="业主评论" name="3">
                        <el-scrollbar height="800px">
                            <div class="isComment">
                                <span>是否开启评论：</span>
                                <el-switch
                                    v-model="popup1.using"
                                    style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                                    inline-prompt
                                    active-text="开"
                                    inactive-text="关"
                                    @change="switchFnUse"
                                />
                                <div class="radioGroup">
                                    <el-radio-group v-model="popup1.scoreper" :disabled="!popup1.using" @change="switchFnUse(true)">
                                        <el-radio v-for="(item,i) in opts_all.obj.comment_scoreper" :key="item.key" :label="item.key" size="large">{{ item.val }}</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div>
                                <el-table
                                    ref="multipleTableRef"
                                    :data="tableData.arr"
                                    style="width: 100%;"
                                    @selection-change="handleSelectionChange"
                                >
                                    <el-table-column type="selection" width="50" />
                                    <el-table-column label="评论内容" width="200" show-overflow-tooltip="true">
                                        <template #default="scope">
                                            <span>{{ scope.row.content }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column v-if="tableData.arr.uname" label="评论人" width="110">
                                        <template #default="scope">
                                            <span>{{ scope.row.uname|| 'null' }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="状态" width="150">
                                        <template #default="scope">
                                            <el-tag v-show="scope.row.status == 10" class="btnNone" type="warning" effect="dark" size="large">{{ getOptVal(opts_all.obj.comment_status,scope.row.status) }} </el-tag>
                                            <el-tag v-show="scope.row.status == 20" class="btnNone" type="success" effect="dark" size="large">{{ getOptVal(opts_all.obj.comment_status,scope.row.status) }} </el-tag>
                                            <el-tag v-show="scope.row.status == 30" class="btnNone" type="danger" effect="dark" size="large">{{ getOptVal(opts_all.obj.comment_status,scope.row.status) }} </el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="评分" width="100">
                                        <template #default="scope">
                                            <span>{{ scope.row.score }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="评论时间">
                                        <template #default="scope">
                                            <span>{{ scope.row.created_at }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column fixed="right" label="操作" with="200">
                                        <template #default="scope">
                                            <el-button
                                                v-show="scope.row.status == 10"
                                                type="primary" size="small"
                                                @click="toggleSelection(scope.row)"
                                            >
                                                审核
                                            </el-button>
                                            <el-button
                                                v-if="scope.row.status == 20 || scope.row.status == 30"
                                                type="success" size="small"
                                                @click="toggleSelection(scope.row)"
                                            >
                                                修改
                                            </el-button>
                                            <el-button
                                                size="small"
                                                @click="clickFuncDetail(scope.row)"
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
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-scrollbar>
                    </el-tab-pane>
                </el-tabs>
            </div> -->
            <el-dialog
                v-model="switch_list"
                title="添加活动"
                width="70%"
            >
                <div class="search">
                    <el-row :gutter="10">
                        <el-col :xs="24" :md="12" :lg="8">
                            <div class="searchBox">
                                <div class="search_th">标题名称：</div>
                                <el-input v-model="data_search.obj.title" class="search_tb" placeholder="标题名称" clearable />
                            </div>
                        </el-col>
                        <el-col :xs="24" :md="12" :lg="8">
                            <div class="searchBox">
                                <div class="search_th">起始时间：</div>
                                <el-date-picker
                                    v-model="data_search.obj.created_at"
                                    type="date"
                                    value-format="YYYY-MM-DD"
                                    placeholder="起始时间"
                                    class="search_tb"
                                    :default-value="new Date()"
                                />
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="m-t-20">
                        <el-col :xs="12" :md="12" :lg="10">
                            <div class="flx">
                                <div class="w_30%">
                                    <el-button class="m-l-20" type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                                </div>
                                <div v-show="switch_search == true" class="w_70% m-l-30">
                                    <el-button class="m-r-10" @click="refreshFunc">重置</el-button>
                                    *搜索到相关结果共{{ total }}条。
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="公示" name="5">
                            <el-scrollbar height="500px">
                                <el-table
                                    v-loading="loading_tab"
                                    :data="data_announce.arr"
                                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                                    style="width: 100%;min-height: 300px;border: 1px solid rgb(235 238 245); border-radius: 6px;"
                                    @row-click="rowClickFunc"
                                >
                                    <el-table-column label="公示主题">
                                        <template #default="scope">
                                            <span>{{ scope.row.title }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="公示id" width="240">
                                        <template #default="scope">
                                            <span>{{ scope.row.id }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="公示分类">
                                        <template #default="scope">
                                            <span>{{ getNameFunc(data_1.arr,scope.row.cid) }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="公示对象类型" width="70">
                                        <template #default="scope">
                                            <span>{{ getOptVal(opts_all.obj.article_lv,scope.row.totype) }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="用户组ID">
                                        <template #default="scope">
                                            <span>{{ getNameFunc(userData.arr,scope.row.groupid) }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="状态" width="100">
                                        <template #default="scope">
                                            <el-button v-show="scope.row.status == 1" class="btnNone" type="primary">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-button>
                                            <el-button v-show="scope.row.status == 2" class="btnNone m-l-5" type="warning">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-button>
                                            <el-button v-show="scope.row.status == 3" class="btnNone" type="warning">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-button>
                                            <el-button v-show="scope.row.status == 4" class="btnNone" type="success">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-button>
                                            <el-button v-show="scope.row.status == 5" class="btnNone" type="info">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-button>
                                        </template>
                                    </el-table-column>

                                    <el-table-column />
                                </el-table>
                            </el-scrollbar>
                        </el-tab-pane>
                        <el-tab-pane label="联名" name="1">
                            <el-scrollbar height="800px">
                                <el-table
                                    v-loading="loading_tab"
                                    :data="data_tab.arr"
                                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                                    style="width: 100%;min-height: 300px;border: 1px solid rgb(235 238 245); border-radius: 6px;"
                                    @row-click="rowClickFunc"
                                >
                                    <el-table-column prop="name" label="标题名称" />
                                    <el-table-column label="所在区域">
                                        <template #default="scope">
                                            <span>{{ scope.row.author_cc_name }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="区域类型" width="150">
                                        <template #default="scope">
                                            <span>{{ getOptVal(opts_all.obj.group_user_region_type,scope.row.author_type) }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="起始时间">
                                        <template #default="scope">
                                            <span>{{ scope.row.created_at }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="状态" width="150">
                                        <template #default="scope">
                                            <el-button v-if="scope.row.status == '1'" size="small" round>筹备阶段</el-button>
                                            <el-button v-if="scope.row.status == '2'" size="small" type="primary" round>待审</el-button>
                                            <el-button v-if="scope.row.status == '3'" size="small" type="info" round>未开始</el-button>
                                            <el-button v-if="scope.row.status == '4'" size="small" type="success" round>进行中</el-button>
                                            <el-button v-if="scope.row.status == '5'" size="small" type="warning" round>暂停</el-button>
                                            <el-button v-if="scope.row.status == '6'" size="small" type="warning" round>终止</el-button>
                                            <el-button v-if="scope.row.status == '7'" size="small" type="danger" round>已结束</el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column />
                                </el-table>
                            </el-scrollbar>
                        </el-tab-pane>
                        <el-tab-pane label="表决" name="2">
                            <el-scrollbar height="800px">
                                <el-table
                                    v-loading="loading_tab"
                                    :data="data_tab.arr"
                                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                                    style="width: 100%;min-height: 300px;border: 1px solid rgb(235 238 245); border-radius: 6px;"
                                    @row-click="rowClickFunc"
                                >
                                    <el-table-column prop="name" label="标题名称" />
                                    <el-table-column label="所在区域">
                                        <template #default="scope">
                                            <span>{{ scope.row.author_cc_name }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="区域类型" width="150">
                                        <template #default="scope">
                                            <span>{{ getOptVal(opts_all.obj.group_user_region_type,scope.row.author_type) }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="起始时间">
                                        <template #default="scope">
                                            <span>{{ scope.row.created_at }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="状态" width="150">
                                        <template #default="scope">
                                            <el-button v-if="scope.row.status == '1'" size="small" round>筹备阶段</el-button>
                                            <el-button v-if="scope.row.status == '2'" size="small" type="primary" round>待审</el-button>
                                            <el-button v-if="scope.row.status == '3'" size="small" type="info" round>未开始</el-button>
                                            <el-button v-if="scope.row.status == '4'" size="small" type="success" round>进行中</el-button>
                                            <el-button v-if="scope.row.status == '5'" size="small" type="warning" round>暂停</el-button>
                                            <el-button v-if="scope.row.status == '6'" size="small" type="warning" round>终止</el-button>
                                            <el-button v-if="scope.row.status == '7'" size="small" type="danger" round>已结束</el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column />
                                </el-table>
                            </el-scrollbar>
                        </el-tab-pane>
                        <el-tab-pane label="选举" name="3">
                            <el-scrollbar height="800px">
                                <el-table
                                    v-loading="loading_tab"
                                    :data="data_tab.arr"
                                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                                    style="width: 100%;min-height: 300px;border: 1px solid rgb(235 238 245); border-radius: 6px;"
                                    @row-click="rowClickFunc"
                                >
                                    <el-table-column prop="name" label="标题名称" />
                                    <el-table-column label="所在区域">
                                        <template #default="scope">
                                            <span>{{ scope.row.author_cc_name }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="区域类型" width="150">
                                        <template #default="scope">
                                            <span>{{ getOptVal(opts_all.obj.group_user_region_type,scope.row.author_type) }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="起始时间">
                                        <template #default="scope">
                                            <span>{{ scope.row.created_at }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="状态" width="150">
                                        <template #default="scope">
                                            <el-button v-if="scope.row.status == '1'" size="small" round>筹备阶段</el-button>
                                            <el-button v-if="scope.row.status == '2'" size="small" type="primary" round>待审</el-button>
                                            <el-button v-if="scope.row.status == '3'" size="small" type="info" round>未开始</el-button>
                                            <el-button v-if="scope.row.status == '4'" size="small" type="success" round>进行中</el-button>
                                            <el-button v-if="scope.row.status == '5'" size="small" type="warning" round>暂停</el-button>
                                            <el-button v-if="scope.row.status == '6'" size="small" type="warning" round>终止</el-button>
                                            <el-button v-if="scope.row.status == '7'" size="small" type="danger" round>已结束</el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column />
                                </el-table>
                            </el-scrollbar>
                        </el-tab-pane>
                        <el-tab-pane label="问卷" name="4">
                            <el-scrollbar height="800px">
                                <el-table
                                    v-loading="loading_tab"
                                    :data="data_tab.arr"
                                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                                    style="width: 100%;min-height: 300px;border: 1px solid rgb(235 238 245); border-radius: 6px;"
                                    @row-click="rowClickFunc"
                                >
                                    <el-table-column prop="name" label="标题名称" />
                                    <el-table-column label="所在区域">
                                        <template #default="scope">
                                            <span>{{ scope.row.author_cc_name }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="区域类型" width="150">
                                        <template #default="scope">
                                            <span>{{ getOptVal(opts_all.obj.group_user_region_type,scope.row.author_type) }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="起始时间">
                                        <template #default="scope">
                                            <span>{{ scope.row.created_at }} </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="状态" width="150">
                                        <template #default="scope">
                                            <el-button v-if="scope.row.status == '1'" size="small" round>筹备阶段</el-button>
                                            <el-button v-if="scope.row.status == '2'" size="small" type="primary" round>待审</el-button>
                                            <el-button v-if="scope.row.status == '3'" size="small" type="info" round>未开始</el-button>
                                            <el-button v-if="scope.row.status == '4'" size="small" type="success" round>进行中</el-button>
                                            <el-button v-if="scope.row.status == '5'" size="small" type="warning" round>暂停</el-button>
                                            <el-button v-if="scope.row.status == '6'" size="small" type="warning" round>终止</el-button>
                                            <el-button v-if="scope.row.status == '7'" size="small" type="danger" round>已结束</el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column />
                                </el-table>
                            </el-scrollbar>
                        </el-tab-pane>
                    <!-- <el-tab-pane label="评分" name="4">
                        <div>
                            <el-rate
                                v-model="score"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value} 分"
                            />
                        </div>
                    </el-tab-pane> -->
                    </el-tabs>
                </div>
                <!-- <el-table
                    v-loading="loading_tab"
                    :data="data_tab.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    style="width: 100%;min-height: 300px;border: 1px solid rgb(235 238 245); border-radius: 6px;"
                    @row-click="rowClickFunc"
                >
                    <el-table-column prop="name" label="标题名称" width="150px" />
                    <el-table-column label="活动类型" width="220">
                        <template #default="scope">
                            <span>{{ getOptVal(opts_all.obj.activity_type,scope.row.type) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="所在区域" width="220">
                        <template #default="scope">
                            <span>{{ scope.row.author_cc }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="起始时间" width="70">
                        <template #default="scope">
                            <span>{{ scope.row.created_at }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" width="150">
                        <template #default="scope">
                            <el-button v-if="scope.row.status == '1'" size="small" round>筹备阶段</el-button>
                            <el-button v-if="scope.row.status == '2'" size="small" type="primary" round>待审</el-button>
                            <el-button v-if="scope.row.status == '3'" size="small" type="info" round>未开始</el-button>
                            <el-button v-if="scope.row.status == '4'" size="small" type="success" round>进行中</el-button>
                            <el-button v-if="scope.row.status == '5'" size="small" type="warning" round>暂停</el-button>
                            <el-button v-if="scope.row.status == '6'" size="small" type="warning" round>终止</el-button>
                            <el-button v-if="scope.row.status == '7'" size="small" type="danger" round>已结束</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column />
                </el-table> -->
                <div style="padding-top: 20px;">
                    <el-pagination
                        v-model:current-page="page"
                        layout="total,prev,pager,next,jumper,"
                        :total="total"
                        :page-size="per_page"
                        background
                        hide-on-single-page
                    />
                </div>
            </el-dialog>
            <el-dialog
                v-model="switch_sure"
                title="确认"
                width="30%"
            >
            <div>
                <!-- <img src="../../assets/images/xth.png"/> -->
            是否确认添加此活动！</div>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_sure=false">取消</el-button>
                    <el-button type="primary" @click="clickFuncAddVote">确定</el-button>
                </div>
            </template>
            </el-dialog>
        </page-main>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.query.id)
// console.log(route.params)
import {
    reactive,
    ref,
    watch,
    computed
} from 'vue'
import {
    ElMessage
} from 'element-plus'
/* ----------------------------------------------------------------------------------------------------------------------- */
import {
    APIgetActivityEventDetails,
    APIgetCommentList,
    // APIpostComment,
    APIgetCommentDetails,
    APIputComplaint
    // APIpostComplaint
} from '@/api/custom/custom.js'
const page = ref(1)
const total = ref(0)
const per_page = ref(15)
const dataForm = reactive({
    item: {}
})
const data_announce = reactive({
    arr: []
})
const data_tab = reactive({
    arr: []
})
const activity_tab = reactive({
    arr: [{
        docable:{
            uinfo: {
                name: ''
            }
        }
    }]
})
const switch_list = ref(false)
const activeName = ref('5')
const data_search = reactive({
    obj: {}
})
const switch_sure=ref(false)
const loading_tab = ref(false)
const currentActivity=reactive({
    item: {}
})
// 详情
APIgetActivityEventDetails(route.query.id).then(res => {
    console.log(res)
    dataForm.item = res
})
// 搜索
const switch_search = ref(false)
const searchFunc = () => {
    switch_search.value = true
    data_search.obj.name = name
    // if (activeName.value == '5') {
    getTabListFunc()
    // } else {
    getSurveyListFunc(activeName.value)
    // }
}
// :disabled="activeName !== '5' ? true : false"
// 刷新
const refreshFunc = () => {
    page.value = 1
    data_search.obj={}
    getActivitiesEventList()
    getTabListFunc()
    getSurveyListFunc(activeName.value)
    switch_search.value = false
    // clickFuncAddVote()
    console.log();
}
import {
    APIgetSurvey,
    APIgetEventArticleList,
    APIgetActivitiesEventList,
    APIpostActivitiesEvent } from '@/api/custom/custom.js'
const getActivitiesEventList = () => {
    APIgetActivitiesEventList(route.query.id).then(res => {
        console.log(res)
        activity_tab.arr = res
    })
}
// 获取列表
const getTabListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    for (let key in data_search.obj) {
        if (data_search.obj[key] || data_search.obj[key] === 0) {
            if (data_search.obj[key] instanceof Array && data_search.obj[key].length <= 0) {
                continue
            }
            params[key] = data_search.obj[key]
        }
    }
    loading_tab.value = true
    APIgetEventArticleList(params).then(res => {
        console.log(res)
        loading_tab.value = false
        data_announce.arr = res
        total.value = res.length
    })
}
const getSurveyListFunc = val => {
    if (val !== '5') {
        console.log('成功')
        let params_1 = {
            page: page.value,
            per_page: per_page.value,
            type: parseInt(val)
        }
        for (let key in data_search.obj) {
            if (data_search.obj[key] || data_search.obj[key] === 0) {
                if (data_search.obj[key] instanceof Array && data_search.obj[key].length <= 0) {
                    continue
                }
                params_1[key] = data_search.obj[key]
            }
        }
        loading_tab.value = true
        APIgetSurvey(params_1).then(res => {
            console.log(res)
            if (res.status === 200) {
                loading_tab.value = false
                data_tab.arr = res.data
                total.value = res.data.length
            }
        })
    }
}
const handleClick = () => {
    console.log(activeName.value)
    getSurveyListFunc(activeName.value)
}
const name = computed(() => {
    return data_search.obj.title
})
// 添加活动
const addActiviesFunc = () => {
    switch_list.value = true
    activeName.value = '5'
    data_search.obj = {}
    getTabListFunc()
    getSurveyListFunc(activeName.value)
}
const rowClickFunc = row => {
    console.log(row)
    currentActivity.item=row
    switch_sure.value = true
}
const getNameFunc = (arr, key) => {
    for (let i in arr) {
        if (arr[i].id == key) {
            return arr[i].name
        }
    }
}
// 获取类别名称
let data_1 = reactive({
    arr: []
})
import {
    APIgetTypeList
} from '@/api/custom/custom.js'
// 获取公式列表api请求
const main_type = ref('announce')
APIgetTypeList(main_type.value).then(res => {
    console.log(res)
    data_1.arr = res
})
// 选择用户组name
const userData = reactive({
    arr: []
})
import {
    APIgetGroupList
} from '@/api/custom/custom.js'
APIgetGroupList().then(res => {
    if (res.status == 200) {
        console.log(res)
        loading_tab.value = false
        userData.arr = res.data
    }
})
// 确认添加
const createdAt=reactive({
    // arr: [{
    //     uinfo: [{
    //         name: ""
    //         }]
    // }]
    arr: []
})
const activityName=ref('')
const jointlyName=ref('')
const voteName=ref('')
const electName=ref('')
const surveyName=ref('')
const clickFuncAddVote=()=>{
    let data={
            tgt_id:currentActivity.item.id,
            tgt_type: ''
        }
    if(activeName.value == '5'){
        data.tgt_type='announce'
    APIpostActivitiesEvent(route.query.id, data).then(() => {
        getActivitiesEventList()
        switch_sure.value = false
        ElMessage.success('添加成功')
    }).catch(() => {
        ElMessage.error('添加失败')
    })
    activity_tab.created_at=currentActivity.item.created_at
    }else{
        data.tgt_type='survey'
        APIpostActivitiesEvent(route.query.id, data).then(() => {
        getActivitiesEventList()
        switch_sure.value = false
        ElMessage.success('添加成功')
    }).catch(() => {
        ElMessage.error('添加失败')
    })
    }
}
// 监听分页
watch(page, () => {
    getActivitiesEventList()
})
// 执行
refreshFunc()
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['activity_type', 'activityStatus', 'announce_status', 'article_lv', 'group_user_region_type']).then(res => {
    opts_all.obj = res
})
</script>
<style scoped>
    ::v-deep .el-button + .el-button {
        margin-bottom: 5px;
    }
</style>
