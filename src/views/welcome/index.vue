<script setup lang="ts">
import dayjs from "dayjs";
import axios from "axios";
import MdEditor from "md-editor-v3";
import Bar from "./components/Bar.vue";
import Pie from "./components/Pie.vue";
import Line from "./components/Line.vue";
import TypeIt from "@/components/ReTypeit";
import { ref, computed, markRaw, reactive } from "vue";
import Github from "./components/Github.vue";
import { randomColor } from "@pureadmin/utils";
import { useRenderFlicker } from "@/components/ReFlicker";
import { baseUrlApi } from "@/api/utils";
import { message } from "@/utils/message";
import PureTable from "@pureadmin/table";

defineOptions({
  name: "Welcome"
});

const list = ref();
const loading = ref<boolean>(true);
const titleClass = computed(() => {
  return ["text-base", "font-medium"];
});

setTimeout(() => {
  loading.value = !loading.value;
}, 800);

axios.get(baseUrlApi("get/example_release.json")).then(res => {
  list.value = res.data.map(v => {
    return {
      content: v.body,
      timestamp: dayjs(v.published_at).format("YYYY/MM/DD hh:mm:ss A"),
      icon: markRaw(
        useRenderFlicker({
          background: randomColor({ type: "hex" }) as string
        })
      )
    };
  });
});

const tableRowClassName = ({ rowIndex }: { rowIndex: number }) => {
  if (rowIndex % 4 === 1) {
    return "pure-warning-row";
  } else if (rowIndex % 4 === 3) {
    return "pure-success-row";
  }
  return "";
};

const columns: TableColumnList = [
  {
    label: "实验项目",
    prop: "lab"
  },
  {
    label: "姓名",
    prop: "name"
  },
  {
    label: "成绩",
    prop: "score"
  }
];

const puretable = ref();

const tableData = reactive([
  {
    lab: "lab1-1",
    score: 90,
    name: "Tom"
  },
  {
    lab: "lab2-1",
    score: 100,
    name: "Jack"
  }
]);

const uname: string = JSON.parse(sessionStorage.getItem("user-info"))[
  "username"
];

type Score = {
  username: string;
  course: string;
  score: number;
};

const getScoreList = () => {
  let urll = "getAllScores";
  if (uname.indexOf("admin") != -1) {
    urll = "getAllStudentsScores";
  } else {
    urll = urll + "/" + uname;
  }
  axios
    .get(baseUrlApi(urll))
    .then(res => {
      console.log(res.data);
      tableData.splice(0, tableData.length);
      if (res.status != 200) {
        message("获取成绩失败", { type: "error" });
        return;
      }
      if (urll === "getAllStudentsScores") {
        res.data.forEach((user: any) => {
          user.scores.forEach((item: Score) => {
            tableData.push({
              lab: item.course,
              name: item.username,
              score: item.score
            });
          });
        });
      } else {
        res.data.scores.forEach((item: Score) => {
          tableData.push({
            lab: item.course,
            name: item.username,
            score: item.score
          });
        });
        console.log(tableData);
      }
      // console.log(puretable.value.getTableRef());
      // puretable.value.getTableRef().data = tableData;
    })
    .catch((err: any) => {
      console.log(err);
    });
};

getScoreList();
</script>

<template>
  <div>
    <el-row :gutter="24">
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
        class="mb-[18px]"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200
          }
        }"
      >
        <el-card shadow="never" style="height: 100%">
          <template #header>
            <a
              :class="titleClass"
              href="https://github.com/pure-admin/vue-pure-admin/releases"
              target="_black"
            >
              <TypeIt
                :className="'type-it2'"
                :values="['OSLAB 系统公告']"
                :cursor="false"
                :speed="80"
              />
            </a>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <el-scrollbar height="324px">
                <el-timeline v-show="list?.length > 0">
                  <el-timeline-item
                    v-for="(item, index) in list"
                    :key="index"
                    :icon="item.icon"
                    :timestamp="item.timestamp"
                  >
                    <md-editor v-model="item.content" preview-only />
                  </el-timeline-item>
                </el-timeline>
                <el-empty v-show="list?.length === 0" />
              </el-scrollbar>
            </template>
          </el-skeleton>
        </el-card>
      </el-col>

      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
        class="mb-[18px]"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200
          }
        }"
      >
        <el-card shadow="never" style="height: 100%">
          <template #header>
            <a
              :class="titleClass"
              href="https://github.com/xiaoxian521"
              target="_black"
            >
              <TypeIt
                :className="'type-it1'"
                :values="['用户信息']"
                :cursor="false"
                :speed="120"
              />
            </a>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <Github />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>

      <!-- <el-col>
        <el-card shadow="never" style="width: 100%; height: 100%">
          <template #header>
            <a
              :class="titleClass"
              href="https://github.com/xiaoxian521"
              target="_black"
            >
              <TypeIt
                :className="'type-it3'"
                :values="['成绩信息']"
                :cursor="false"
                :speed="120"
              />
            </a>
            <pure-table
              ref="puretable"
              :data="tableData"
              :columns="columns"
              :row-class-name="tableRowClassName"
            />
          </template>
        </el-card>
      </el-col> -->
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
                :values="['实验项目']"
                :cursor="false"
                :speed="120"
              />
            </a>
          </template>
          <div style="text-align: center">
            <div class="btn golang">LAB 1</div>
            <div class="btn golang">LAB 2</div>
            <div class="btn golang">LAB 3</div>
            <div class="btn golang">LAB 4</div>
            <div class="btn golang">LAB 5</div>
            <div class="btn golang">LAB 6</div>
            <div class="btn golang">LAB 7</div>
            <div class="btn golang">LAB 8</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-timeline-item) {
  margin: 6px 0 0 6px;
}

.main-content {
  margin: 20px 20px 0 20px !important;
}
</style>

<style>
/* 此处样式会在全局都生效，上面 tableRowClassName 函数返回的值也就是类名必须在全局中唯一，避免样式突出 */
.pure-warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.pure-success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.btn {
  vertical-align: top;
  margin: 15px;
  display: inline-block;
  text-align: center;
  width: 122px;
  height: 44px;
  line-height: 44px;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.golang {
  vertical-align: top;
  height: 42px;
  line-height: 42px;
  width: 120px;
  color: #2194e0;
  border: 1px solid #2194e0;
  transition: all 0.2s ease-in-out;
  position: relative;
  opacity: 1;
  overflow: hidden;
}

.golang:before {
  content: "";
  background-color: rgba(255, 255, 255, 0.5);
  height: 100%;
  width: 3em;
  display: block;
  position: absolute;
  top: 0;
  left: -4.5em;
  transform: skewX(-45deg) translateX(0);
  transition: none;
}

.golang:hover {
  background-color: #2194e0;
  color: #fff;
}

.golang:hover:before {
  transform: skewX(-45deg) translateX(260px);
  transition: all 0.5s ease-in-out;
}

.golang:active {
  opacity: 0.8;
}
</style>
