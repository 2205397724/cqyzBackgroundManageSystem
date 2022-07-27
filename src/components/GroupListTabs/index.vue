<template>
   <div @click="click" style="width: 100%;height: 32px;border: 1px solid #dcdfe6;border-radius: 4px;">
     <span style="color: #c0c4cc;margin-left: 11px;">请选择类型</span>
     <el-dialog title="选择用户组" v-model="switchTabs">
        <el-tabs>
          <el-tab-pane label="住建">
            <el-tag type="success" v-for="item in groupType_3.arr" :key="item.id" class="m-r-10">{{item.name}}</el-tag>
          </el-tab-pane>
          <el-tab-pane label="街道">
            <el-tag type="success" v-for="item in groupType_4.arr" :key="item.id" class="m-r-10">{{item.name}}</el-tag>
          </el-tab-pane>
          <el-tab-pane label="社区">
            <el-tag type="success" v-for="item in groupType_5.arr" :key="item.id" class="m-r-10">{{item.name}}</el-tag>
          </el-tab-pane>
          <el-tab-pane label="业委会">
            <el-tag type="success" v-for="item in groupType_6.arr" :key="item.id" class="m-r-10">{{item.name}}</el-tag>
          </el-tab-pane>
          <el-tab-pane label="物业">
            <el-tag type="success" v-for="item in groupType_7.arr" :key="item.id" class="m-r-10">{{item.name}}</el-tag>
          </el-tab-pane>
          <el-tab-pane label="其他">
            <el-tag type="success" v-for="item in groupType_99.arr" :key="item.id" class="m-r-10">{{item.name}}</el-tag>
          </el-tab-pane>
        </el-tabs>
        <template #footer>
            <el-button type="primary">确认</el-button>
        </template>
     </el-dialog>
   </div>
</template>

<script setup>
import{
    ref,reactive,watch,defineEmits,defineProps
} from 'vue'
import {
    APIgetGroupList
} from '@/api/custom/custom'
const groupType_3=reactive({arr:[]})
const groupType_4=reactive({arr:[]})
const groupType_5=reactive({arr:[]})
const groupType_6=reactive({arr:[]})
const groupType_7=reactive({arr:[]})
const groupType_99=reactive({arr:[]})
const emit=defineEmits(['change'])
const switchTabs=ref(false)
const tab_group_list=reactive({
    arr:[]
})

const getGroupList=()=>{
    APIgetGroupList().then(res=>{
        tab_group_list.arr=res.data
        groupType_3.arr=tab_group_list.arr.filter(item=>{
            return item.type==3
        })
        groupType_4.arr=tab_group_list.arr.filter(item=>{
            return item.type==4
        })
        groupType_5.arr=tab_group_list.arr.filter(item=>{
            return item.type==5
        })
        groupType_6.arr=tab_group_list.arr.filter(item=>{
            return item.type==6
        })
        groupType_99.arr=tab_group_list.arr.filter(item=>{
            return item.type==99
        })
        console.log(tab_group_list.arr)
    })
}
const click=()=>{
     switchTabs.value=true
}
getGroupList()
</script>
