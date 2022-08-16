<template>
  <div class="main-box">
    <el-dialog
      title=""
      v-model="showabled"
      width="60%"
      class="dialog"
      @close="dialogClose"
    >
      <div class="tree" style="display: inline-block;">
        <el-scrollbar max-height="500px">
          <el-tree
            ref="treeRef"
            class="el-tree-box"
            node-key="code"
            :default-checked-keys="defaultChecked.arr"
            :props="tree_props"
            :load="loadNode"
            lazy
            show-checkbox
            :check-strictly="true"
            accordion
            @check="handleCheck"
            @check-change="handleCheckChange"
          />
        </el-scrollbar>
      </div>
      <div class="table" v-if="showFamily">
        <div class="header">{{ unitsDetail.item.name }}</div>
        <el-scrollbar style="height: 504px;">
          <div>
            <div
              class="house_box"
              v-for="(floor, index) in floors.arr"
              :key="index"
            >
              <div class="floor">{{ floor.floor_truth }}</div>
              <div class="house_item">
                <div
                  :class="{
                    item: true,
                    bg: selected_house.arr.includes(house.id),
                  }"
                  v-for="house in floor.houses"
                  :key="house.id"
                  @click="selectedHouseFun(house.id)"
                >
                  {{ house.house_num }}
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <template #footer>
        <!-- <el-select v-model="selected_do_type" placeholder="请选择可操作类型" style="width: 200px;margin-right: 20px;" effect="dark">
          <el-option :label="item.value" :value="item.type" v-for="item in do_type.item" :key="item.type"></el-option>
        </el-select> -->
        <el-button type="primary" @click="submit"
          >确认</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
// {id:500101,name:'总title',type:'region'}
import { ElMessage } from "element-plus";
import { ref, toRefs, reactive, defineProps, defineEmits, watch } from "vue";
const props = defineProps(["tree_item", "type", "showabled", "surveyid"]);
const showFamily = ref(false);
const type = reactive(props.type);
const emit = defineEmits(["checkFunc", "update:showabled"]);
const { tree_item, showabled } = toRefs(props);
const treeDetail = reactive({
  arr: {},
});
const range = ref(0); //活动参与范围
watch(showabled, (newVal) => {
  showabled.value = newVal.value;
});
const selected_all = reactive({
  arr: [],
});
const selected_house = reactive({
  //选择的房子
  arr: [],
});
const selected_units = reactive({
  arr: [],
});
const selected_building = reactive({
  arr: [],
});
const selected_zone = reactive({
  arr: [],
});
const selected_region = reactive({
  arr: [],
});
const unitsDetail = reactive({
  item: {},
});
const floors = reactive({
  arr: [],
});
const tree_props = {
  label: "name",
  children: "children",
  isLeaf: "leaf",
};
//选择可操作类型
const selected_do_type=ref(2)
const do_type = reactive({
  item: [
    {
      type: 1,
      value: "指定范围可查看",
    },
    {
      type: 2,
      value: "指定范围可参与",
    },
  ],
});
const dialogClose = () => {
  emit("update:showabled", false);
};
import {
  APIgetChinaRegion,
  APIgetResidentialListHouse,
  APIgetBuildListHouse,
  APIgetUnitsListHouse,
  APIgetHouseListHouse,
  APIgetHouseDetailsHouse,
  APIgetHouseListSort,
  APIgetResidentialDetailsHouse,
  APIgetBuildDetailsHouse,
  APIaddSurveyRange,
} from "@/api/custom/custom.js";
let nodeCopy = "";
// type: region区域 zone小区 building楼栋 units单元
const filterNode = (value, data, node) => {
  // if(node.data.next_type===value){
  //     return false
  // }
};
const house_detail = reactive({
  item: {},
});
//选择的目标
const selectedHouseFun = (houseid) => {
  if (selected_house.arr.includes(houseid)) {
    let index = selected_house.arr.indexOf(houseid);
    selected_house.arr.splice(index, 1);
  } else {
    selected_house.arr.push(houseid);
  }
};
//默认选择地区数组
const defaultChecked=reactive({arr:[]})
//提交选择
const submit = () => {
  let all = treeRef.value.getCheckedNodes();
  all.forEach((item) => {
    switch (item.type) {
      case "region":
        selected_region.arr.push(item.id);
        break;
      case "zone":
        selected_zone.arr.push(item.id);
        break;
      case "building":
        selected_building.arr.push(item.id);
        break;
      case "units":
        selected_units.arr.push(item.id);
        break;
    }
  });
  let promiseAll = [];
  if (selected_region.arr.length > 0) {
    promiseAll.push(
      APIaddSurveyRange({
        sid: props.surveyid,
        can_type: selected_do_type.value,
        type: 5,
        tgt: selected_region.arr,
      })
    );
  }
  if (selected_zone.arr.length > 0) {
    promiseAll.push(
      APIaddSurveyRange({
        sid: props.surveyid,
        can_type: selected_do_type.value,
        type: 4,
        tgt: selected_zone.arr,
      })
    );
  }
  if (selected_building.arr.length > 0) {
    promiseAll.push(
      APIaddSurveyRange({
        sid: props.surveyid,
        can_type: selected_do_type.value,
        type: 3,
        tgt: selected_building.arr,
      })
    );
  }
  if (selected_units.arr.length > 0) {
    promiseAll.push(
      APIaddSurveyRange({
        sid: props.surveyid,
        can_type: selected_do_type.value,
        type: 2,
        tgt: selected_units.arr,
      })
    );
  }
  if (selected_house.arr.length > 0) {
    promiseAll.push(
      APIaddSurveyRange({
        sid: props.surveyid,
        can_type: selected_do_type.value,
        type: 1,
        tgt: selected_house.arr,
      })
    );
  }
  Promise.all(promiseAll)
    .then((res) => {
      //并发接口
      ElMessage.success("设置成功");
    })
    .catch((e) => {
      ElMessage.error("设置失败请重试");
    });
};
const loadNode = (node, resolve) => {
  if (node.level == 0) {
    nodeCopy = node;
    resolve([tree_item.value]);
    emit("checkFunc", { 0: tree_item.value, 1: treeDetail.arr });
    return false;
  }
  switch (node.data.next_type) {
    case "region":
      APIgetChinaRegion({ p_code: node.data.id ,sid:props.surveyid,can_type:2}).then((res) => {
        treeDetail.arr = res.data;
        console.log(res);
        let tree_arr = [];
        if (res.status == 200) {
          for (let i in res.data) {
            if (res.data[i].level < 5) {
              if(res.data[i].can_exist){
                console.log(res.data[i])
                defaultChecked.arr.push(res.data[i].code)
                selected_all.arr.push(res.data[i].code)
                treeRef.value.setCheckedKeys(selected_all.arr);
              }
              tree_arr.push({
                name: res.data[i].name,
                type: "region",
                next_type: "region",
                id: res.data[i].code,
                code: res.data[i].code,
                can_exist:res.data[i].can_exist
              });
            } else {
                if(res.data[i].can_exist){
                console.log('ffffffff')
                defaultChecked.arr.push(res.data[i].code)
                selected_all.arr.push(res.data[i].code)
                treeRef.value.setCheckedKeys(selected_all.arr);
              }
              tree_arr.push({
                name: res.data[i].name,
                type: "region",
                next_type: "zone",
                id: res.data[i].code,
                code:res.data[i].code
              });
            }
          }
        }
                console.log(defaultChecked.arr)
        resolve(tree_arr);
        emit("checkFunc", { 0: tree_item.value, 1: treeDetail.arr });
      });
      break;
    case "zone":
      APIgetResidentialListHouse({
        page: 1,
        per_page: 7,
        china_code: node.data.id,
        sid:props.surveyid,
        can_type:2
      }).then((res) => {
        console.log(res);
        let tree_arr = [];
        for (let i in res) {
          if(res[i].can_exist){
            defaultChecked.arr.push(res[i].china_code)
            selected_all.arr.push(res[i].china_code)
            treeRef.value.setCheckedKeys(selected_all.arr);
          }
          tree_arr.push({
            name: res[i].name,
            type: "zone",
            next_type: "building",
            id: res[i].id,
            code: res[i].id,
            can_exist:res[i].can_exist
          });
        }
        resolve(tree_arr);
        emit("checkFunc", { 0: tree_item.value, 1: treeDetail.arr });
        tree_arr = [];
      });
      break;
    case "building":
      APIgetBuildListHouse({
        page: 1,
        per_page: 7,
        zone_id: node.data.id,
        sid:props.surveyid,
        can_type:2
      }).then((res) => {
        let tree_arr = [];
        for (let i in res) {
            if(res[i].can_exist){
            defaultChecked.arr.push(res[i].china_code)
            selected_all.arr.push(res[i].id)
            treeRef.value.setCheckedKeys(selected_all.arr);
          }
          tree_arr.push({
            name: res[i].name,
            type: "building",
            next_type: "units",
            id: res[i].id,
            china_code:res[i].china_code,
            can_exist:res[i].can_exist
          });
        }
        emit("checkFunc", { 0: tree_item.value, 1: treeDetail.arr });
        resolve(tree_arr);
      });
      break;
    case "units":
      APIgetUnitsListHouse({
        page: 1,
        per_page: 7,
        building_id: node.data.id,
        sid:props.surveyid,
        can_type:2
      }).then((res) => {
        let tree_arr = [];
        for (let i in res) {
            if(res[i].can_exist){
            defaultChecked.arr.push(res[i].id)
            selected_all.arr.push(res[i].id)
            treeRef.value.setCheckedKeys(selected_all.arr);
          }
          tree_arr.push({
            name: res[i].name,
            id: res[i].id,
            type: "units",
            next_type: "house",
            can_exist:res[i].can_exist,
            leaf:true
          });
        }
        resolve(tree_arr);
        emit("checkFunc", { 0: tree_item.value, 1: treeDetail.arr });
      });
      break;
    //   case "house":
    //   APIgetHouseListSort({
    //     page: 1,
    //     per_page: 7,
    //     houseable_type: "units",
    //     houseable_id: node.data.id,
    //     sid:props.surveyid,
    //     can_type:2,
    //   }).then((res) => {
    //     let tree_arr = [];
    //     for (let i in res) {
    //         if(res[i].can_exist){
    //         defaultChecked.arr.push(res[i].id)
    //       }
    //       tree_arr.push({
    //         name: res[i].name,
    //         id: res[i].id,
    //         type: "house",
    //         next_type: "house",

    //         can_exist:res[i].can_exist,
    //         leaf: true
    //       });
    //     }
    //     resolve(tree_arr);
    //     emit("checkFunc", { 0: tree_item.value, 1: treeDetail.arr });
    //   });
    //   break;
  }
};
const treeRef = ref(null);
watch(
  tree_item,
  (new_val) => {
    if (nodeCopy) {
      nodeCopy.loaded = false;
      nodeCopy.loadData();
    }
  },
  { immediate: true, deep: true }
);
const handleCheck = (data, checked) => {
  //点击复选框触发
  selected_all.arr.push(data.code); //选中的数组往里面push值
  console.log(selected_all.arr)
  treeRef.value.setCheckedKeys(selected_all.arr);
  emit("checkFunc", data);
};
const handleCheckChange = (data, selfSelected, childrenSelected) => {
  //点击节点触发
  selected_all.arr.forEach((item, index) => {
    //实现多选时复选框二次点击取消选中
    if (item== data.code) {
      selected_all.arr.splice(index, 1);
      treeRef.value.setCheckedKeys(selected_all.arr);
    }
  });
  if (data.type == "region") {
    console.log(data);
  }
  if (data.type == "zone") {
    APIgetResidentialDetailsHouse(data.id).then((res) => {
      console.log(res);
      emit("checkChangeFunc", res);
    });
  }
  if (data.type == "building") {
    APIgetBuildDetailsHouse(data.id).then((res) => {
      console.log(res);
      emit("checkChangeFunc", res);
    });
  }
  if (data.type == "units") {
    showFamily.value = true;
    emit("checkChangeFunc", data);
    unitsDetail.item = data;
    APIgetHouseListSort({
      houseable_type: "units",
      houseable_id: data.id,
    }).then((res) => {
      console.log(res);
      floors.arr = res.floors;
    });
  }
};
</script>
<style lang="scss">
.main-box {
    height: 100%;
    height: 500px;
    .tree {
        width: 35%;
        display: inline-block;
    }
    .table {
        display: inline-block;
        width: 65%;
        height: 500px;
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
                    &.bg {
                        background-color: #409eff;
                    }
                }
            }
        }
    }
}
</style>
