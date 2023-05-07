<script setup lang="ts">
import { message } from "@/utils/message";
import axios from "axios";
import { useColumns } from "./columns";
const { columnsA, columnsB, columnsC } = useColumns();
import { baseUrlApi } from "@/api/utils";

const list = [
  {
    columns: columnsA,
    column: 3
  },
  {
    columns: columnsB,
    column: 2
  },
  {
    columns: columnsC,
    column: 1
  }
];

const refreshToken = () => {
  axios
    .post(baseUrlApi("refreshtoken"), {
      username: JSON.parse(sessionStorage.getItem("user-info"))["username"]
    })
    .then(res => {
      if (res.status === 200) {
        console.log(res.data.token);
        message("刷新TOKEN成功,请重载页面", { type: "success" });
      } else {
        message("刷新TOKEN失败", { type: "error" });
      }
    })
    .catch(err => {
      console.log(err);
      message("刷新TOKEN失败", { type: "error" });
    });
};
</script>

<template>
  <PureDescriptions
    v-for="(item, index) in list"
    :key="index"
    :columns="item.columns"
    :column="item.column"
    direction="vertical"
    border
  />
  <el-button @click="refreshToken" style="margin-top: 10px">
    刷新TOKEN
  </el-button>
</template>
