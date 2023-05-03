import { $t } from "@/plugins/i18n";
import { editor } from "@/router/enums";

export default {
  path: "/editor",
  redirect: "/editor/index",
  meta: {
    icon: "edit",
    title: $t("menus.hseditor"),
    rank: editor,
    roles: ["admin"]
    // showLink: false
  },
  children: [
    {
      path: "/editor/index",
      name: "Editor",
      component: () => import("@/views/editor/index.vue"),
      meta: {
        title: $t("menus.hseditor"),
        keepAlive: true,
        roles: ["admin"]
      }
    }
  ]
} as RouteConfigsTable;
