// 最简代码，也就是这些字段必须有
export default {
  path: "/labs",
  meta: {
    title: "LABs",
    rank: 1
  },
  children: [
    {
      path: "/labs/index",
      name: "labs-index",
      component: () => import("@/views/labs/index.vue"),
      meta: {
        title: "labs-index"
      }
    },
    {
      path: "/labs/lab1",
      name: "lab1",
      component: () => import("@/views/labs/lab1.vue"),
      meta: {
        title: "lab1"
      }
    },
    {
      path: "/labs/lab2",
      name: "lab2",
      component: () => import("@/views/labs/lab2.vue"),
      meta: {
        title: "lab2"
      }
    },
    {
      path: "/labs/lab3",
      name: "lab3",
      component: () => import("@/views/labs/lab3.vue"),
      meta: {
        title: "lab3"
      }
    },
    {
      path: "/labs/lab4",
      name: "lab4",
      component: () => import("@/views/labs/lab4.vue"),
      meta: {
        title: "lab4"
      }
    },
    {
      path: "/labs/lab5",
      name: "lab5",
      component: () => import("@/views/labs/lab5.vue"),
      meta: {
        title: "lab5"
      }
    },
    {
      path: "/labs/lab6",
      name: "lab6",
      component: () => import("@/views/labs/lab6.vue"),
      meta: {
        title: "lab6"
      }
    },
    {
      path: "/labs/lab7",
      name: "lab7",
      component: () => import("@/views/labs/lab7.vue"),
      meta: {
        title: "lab7"
      }
    },
    {
      path: "/labs/lab8",
      name: "lab8",
      component: () => import("@/views/labs/lab8.vue"),
      meta: {
        title: "lab8"
      }
    }
  ]
};
