<template>
	<div>
		<page-main>
			<el-row>
				<el-col :xs="24" :sm="24" :lg="18">
					<el-row>
						<el-col :xs="24" :sm="24" :lg="4"
							style="display: flex;justify-content: center;align-items: center;box-sizing: border-box;padding-right: 20px;min-width: 135px;">
							<image-preview v-if='data.userinfo' :src="data.userinfo.avatar" width="90px" height="90px"
								style="border-radius: 50%;" />
						</el-col>
						<el-col :xs="24" :sm="24" :lg="18"
							style="display: flex;flex-direction: column;justify-content:space-between;">
							<div style="color: #333333;font-weight: 650;font-size: 24px;">欢迎你 {{data.userinfo.nickname}}</div>
							<div style="color: #666666;font-weight: 400;">
								<div style="font-size: 14px;">{{data.userinfo.address}} {{data.userinfo.department}} {{data.userinfo.job}}</div>
								<div style="font-size: 12px;">手机号码：{{data.userinfo.tel}} 最后登录：{{data.userinfo.lasttime}}
									登录IP：{{data.userinfo.ip}}</div>
							</div>
						</el-col>
					</el-row>
				</el-col>
				<el-col :xs="24" :sm="24" :lg="6" style="display: flex;justify-content: flex-end;align-items: center;">
					<el-button circle>
						<svg-icon name="chat" />
					</el-button>
					<el-button circle>
						<svg-icon name="phone" />
					</el-button>
					<el-button circle>
						<svg-icon name="key" />
					</el-button>
				</el-col>
			</el-row>
		</page-main>
		<el-row :gutter="20" style="margin: -10px 10px;" class="icontitbox">
			<el-col class="icontitcolbox" :sm="12" :md="8" :lg="6" :xl="{span:'4-8'}" v-for="(item,i) in data.tipsnum" :key="'tipsnum'+i">
				<page-main style="margin: 10px 0;">
					<div class="icontit">
						<div class="img">
							<svg-icon v-if="i==0" class="svg" name="u719" />
							<svg-icon v-if="i==1" class="svg" name="u726" />
							<svg-icon v-if="i==2" class="svg" name="u731" />
							<svg-icon v-if="i==3" class="svg" name="u736" />
							<svg-icon v-if="i==4" class="svg" name="u741" />
						</div>
						<div>{{item.tit}}</div>
					</div>
					<div class="item-bottom">
						<div>
							总数：<span class="tit">{{item.total}}</span>
						</div>
						<div>
							今日：<span class="num">{{item.today}}</span>
						</div>
					</div>
				</page-main>
			</el-col>
		</el-row>
		<el-row :gutter="20" style="margin: 10px 10px -10px 10px;">
			<el-col :xs="24" :sm="12" :md="12" :lg="8" v-for="(item,i) in data.eventnum" :key="'eventnum'+i">
				<page-main style="margin: 10px 0;" :title="item.name">
					<div class="numname">
						<div v-for="(child,j) in item.nums" :key="'titnum'+j">
							<div class="num">{{child.num}}</div>
							<div class="name">{{child.tit}}</div>
						</div>
					</div>
				</page-main>
			</el-col>
		</el-row>
		<page-main class="picbox" v-if="data.echarts.length>0">
			<el-row :gutter="20">
				<el-col :sm="24" :md="data.echarts.length==1?24:12" :lg="data.echarts.length==1?24:data.echarts.length==2?12:8" v-for="(item,i) in data.echarts" :key="'echarts'+i">
                    <my-echarts :data="item"></my-echarts>
				</el-col>
			</el-row>
		</page-main>
	</div>
</template>
<script setup>
    // 公共导入 cscs
    import {reactive, inject, onMounted, nextTick} from 'vue'

	// 数据
	import {
		APIgetUserinfo,
		APIgetTipsnum,
		APIgetEventnum
	} from '@/api/custom/custom.js'
	const data = reactive({userinfo:'',tipsnum:'',eventnum:'',echarts:''})
	APIgetUserinfo().then(res => {
		if (res.status == 1) {
			data.userinfo = res.data
		}
	}).catch(error => {
		console.log(error)
	})
	APIgetTipsnum().then(res => {
		if (res.status == 1) {
			data.tipsnum = res.data
		}
	}).catch(error => {
		console.log(error)
	})
	APIgetEventnum().then(res => {
		if (res.status == 1) {
			data.eventnum = res.data
		}
	}).catch(error => {
		console.log(error)
	})

	// 图表
	import {
		APIgetEchartsHome
	} from '@/api/custom/custom.js'
    APIgetEchartsHome().then(res => {
        if (res.status == 1) {
            data.echarts = res.data
        }
    }).catch(error => {
        console.log(error)
    })
</script>

<style lang="scss" scoped>
	@media only screen and (min-width: 1700px) {
		.el-col-xl-4-8 {
			max-width: 20%;
		}

		.el-col-xl-offset-4-8 {
			margin-left: 20%;
		}

		.el-col-xl-pull-4-8 {
			position: relative;
			right: 20%;
		}

		.el-col-xl-push-4-8 {
			position: relative;
			left: 20%;
		}
	}

	.list-icon {
		display: inline-block;
		margin: 10px;

		i {
			font-size: 32px;
			color: #606266;
		}
	}

	.item-bottom {
		display: flex;
		color: #999999;
		font-size: 14px;

		>div {
			flex: 1;
			white-space: nowrap;

			.tit {
				font-size: 18px;
				color: #333333;
			}

			.num {
				font-size: 18px;
				color: #EA2929;
			}
		}
	}

	.icontitbox .icontit {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 20px 0;

		>.img {
			>.svg {
				width: 40px;
				height: 20px;
				margin: 0 10px;
			}
		}
	}

	.icontitbox .icontitcolbox:nth-child(1) .icontit {
		color: #42C493;
	}

	.icontitbox .icontitcolbox:nth-child(2) .icontit {
		color: #48B9FD;
	}

	.icontitbox .icontitcolbox:nth-child(3) .icontit {
		color: #5CCED4;
	}

	.icontitbox .icontitcolbox:nth-child(4) .icontit {
		color: #BF5CD4;
	}

	.icontitbox .icontitcolbox:nth-child(5) .icontit {
		color: #D79A25;
	}

	.numname {
		display: flex;
		justify-content: space-between;

		>div {
			text-align: center;
		}

		>div:nth-child(1) .num {
			color: #E88301;
		}

		>div:nth-child(2) .num {
			color: #48B9FD;
		}

		>div:nth-child(3) .num {
			color: #42C493;
		}

		>div:nth-child(4) .num {
			color: #48B9FD;
		}

		>div:nth-child(5) .num {
			color: #6C6C6C;
		}

		.num {
			font-size: 22px;
		}

		.name {
			font-size: 14px;
			color: #666666;
		}
	}

	.picbox {
		.pic-item {
			margin-bottom: 20px;

			.pictit {
				font-size: 14px;
				color: #666666;
			}

			.pic {
				// background-color: #F2F2F2;
			}
		}
	}
</style>
