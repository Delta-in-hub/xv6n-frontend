<script setup lang="ts">
import dayjs from "dayjs";
import axios from "axios";

import TypeIt from "@/components/ReTypeit";
import { ref, computed, markRaw, reactive } from "vue";

import { baseUrlApi } from "@/api/utils";
import { message } from "@/utils/message";

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "Fighting"
});

const titleClass = computed(() => {
  return ["text-base", "font-medium"];
});

function handleClick(_row) {
  const username = _row.name;
  const labname = _row.labitem;
  // console.log(labname);
  // axios download file， usrename-labitem-tar.gz
  axios
    .get(baseUrlApi("getcode/" + username + "/" + labname), {
      responseType: "arraybuffer"
    })
    .then(res => {
      if (res.status != 200) {
        message("获取代码失败", { type: "error" });
        return;
      }
      const blob = new Blob([res.data]);
      const filename = username + "-" + labname + ".tar.gz";
      const a = document.createElement("a");
      a.download = filename;
      a.href = URL.createObjectURL(blob);
      a.click();
      URL.revokeObjectURL(a.href);
      message("开始下载代码", { type: "success" });
    })
    .catch(err => {
      message("获取代码失败" + err, { type: "error" });
    });

  return;
}
const columns: TableColumnList = [
  {
    label: "学号",
    prop: "name",
    width: "400"
  },
  {
    label: "子实验名称",
    prop: "labitem",
    width: "400"
  },
  {
    label: "实验成绩",
    prop: "score",
    width: "500"
  },
  {
    label: "操作",
    fixed: "right",
    slot: "operation"
  }
];

function updateScoreTable(
  table: { name: string; labitem: string; score: number }[]
) {
  const labname = table[0].labitem;
  console.log(labname);
  axios
    .get(baseUrlApi("getLabScores/" + labname))
    .then(res => {
      console.log(res.data);
      if (res.status != 200) {
        message("获取成绩失败", { type: "error" });
        return table;
      }
      const data = res.data;
      table.splice(0, table.length);
      for (let i = 0; i < data.length; i++) {
        // table[i].score = data[i].score;
        table.push({
          name: data[i].name,
          labitem: data[i].labitem,
          score: data[i].score
        });
      }
      return table;
    })
    .catch(err => {
      console.log(err);
      message("获取成绩失败", { type: "error" });
      return table;
    });
  return table;
}

// - lab2-1-hello
// - lab2-2-find
// - lab2-3-getppid
// - lab2-4-getsched

let lab2_1table = reactive([
  {
    name: "20194755",
    labitem: "lab2-1-hello",
    score: 77
  },
  {
    name: "20187777",
    labitem: "lab2-1-hello",
    score: 77
  }
]);

lab2_1table = updateScoreTable(lab2_1table);

let lab2_2table = reactive([
  {
    name: "20194755",
    labitem: "lab2-2-find",
    score: 77
  },
  {
    name: "20187777",
    labitem: "lab2-2-find",
    score: 77
  }
]);

lab2_2table = updateScoreTable(lab2_2table);

let lab2_3table = reactive([
  {
    name: "20194755",
    labitem: "lab2-3-getppid",
    score: 77
  },
  {
    name: "20187777",
    labitem: "lab2-3-getppid",
    score: 77
  }
]);

lab2_3table = updateScoreTable(lab2_3table);

let lab2_4table = reactive([
  {
    name: "20194755",
    labitem: "lab2-4-getsched",
    score: 77
  },
  {
    name: "20187777",
    labitem: "lab2-4-getsched",
    score: 77
  }
]);

lab2_4table = updateScoreTable(lab2_4table);
</script>

<template>
  <div>
    <el-row :gutter="24">
      <el-col>
        <el-card shadow="never" style="width: 100%; height: 100%">
          <template #header>
            <a
              :class="titleClass"
              href="https://github.com/xiaoxian521"
              target="_black"
            >
              <TypeIt
                :className="'type-it1'"
                :values="['实验项目 LAB2-1-hello']"
                :cursor="false"
                :speed="120"
              />
            </a>
          </template>
          <pure-table :data="lab2_1table" :columns="columns">
            <template #operation="{ row }">
              <el-button type="primary" @click="handleClick(row)">
                下载学生实验代码
              </el-button>
            </template>
          </pure-table>
        </el-card>
      </el-col>

      <el-col>
        <el-card shadow="never" style="width: 100%; height: 100%">
          <template #header>
            <a
              :class="titleClass"
              href="https://github.com/xiaoxian521"
              target="_black"
            >
              <TypeIt
                :className="'type-it2'"
                :values="['实验项目 LAB2-2-find']"
                :cursor="false"
                :speed="120"
              />
            </a>
          </template>
          <pure-table :data="lab2_2table" :columns="columns">
            <template #operation="{ row }">
              <el-button type="primary" @click="handleClick(row)">
                下载学生实验代码
              </el-button>
            </template>
          </pure-table>
        </el-card>
      </el-col>

      <el-col>
        <el-card shadow="never" style="width: 100%; height: 100%">
          <template #header>
            <a
              :class="titleClass"
              href="https://github.com/xiaoxian521"
              target="_black"
            >
              <TypeIt
                :className="'type-it3'"
                :values="['实验项目 LAB2-3-getppid']"
                :cursor="false"
                :speed="120"
              />
            </a>
          </template>
          <pure-table :data="lab2_3table" :columns="columns">
            <template #operation="{ row }">
              <el-button type="primary" @click="handleClick(row)">
                下载学生实验代码
              </el-button>
            </template>
          </pure-table>
        </el-card>
      </el-col>

      <el-col>
        <el-card shadow="never" style="width: 100%; height: 100%">
          <template #header>
            <a
              :class="titleClass"
              href="https://github.com/xiaoxian521"
              target="_black"
            >
              <TypeIt
                :className="'type-it4'"
                :values="['实验项目 LAB2-4-getsched']"
                :cursor="false"
                :speed="120"
              />
            </a>
          </template>
          <pure-table :data="lab2_4table" :columns="columns">
            <template #operation="{ row }">
              <el-button type="primary" @click="handleClick(row)">
                下载学生实验代码
              </el-button>
            </template>
          </pure-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
