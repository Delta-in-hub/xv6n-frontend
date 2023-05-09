<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "Fighting"
});

const router = useRouter();

function jumptolab1() {
  router.push("/labs/lab1");
}
function jumptolab2() {
  router.push("/labs/lab2");
}
function jumptolab3() {
  router.push("/labs/lab3");
}
function jumptolab4() {
  router.push("/labs/lab4");
}
function jumptolab5() {
  router.push("/labs/lab5");
}
function jumptolab6() {
  router.push("/labs/lab6");
}
function jumptolab7() {
  router.push("/labs/lab7");
}
function jumptolab8() {
  router.push("/labs/lab8");
}
</script>

<template>
  <div style="text-align: center">
    <div class="btn golang" @click="jumptolab1">LAB 1</div>
    <div class="btn golang" @click="jumptolab2">LAB 2</div>
    <div class="btn golang" @click="jumptolab3">LAB 3</div>
    <div class="btn golang" @click="jumptolab4">LAB 4</div>
    <div class="btn golang" @click="jumptolab5">LAB 5</div>
    <div class="btn golang" @click="jumptolab6">LAB 6</div>
    <div class="btn golang" @click="jumptolab7">LAB 7</div>
    <div class="btn golang" @click="jumptolab8">LAB 8</div>
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
