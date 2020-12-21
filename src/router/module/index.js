import MainLayout from "@/layout/mainLayout";
const businessRoutes = [
  {
    name: "Editor",
    path: "/editor",
    component: MainLayout,
    children: [
      {
        path: "index",
        component: () => import("@/views/editor/editor"),
        meta: {
          title: "编辑器",
          icon: "font-size",
        },
      },
    ],
  },
  {
    name: "Chart",
    path: "/chart",
    redirect: "/chart/pie",
    meta: {
      title: "图表",
      icon: "project",
    },
    children: [
      {
        name: "Pie",
        path: "pie",
        component: () => import("@/views/chart/pie/pie"),
        meta: {
          title: "饼图",
          icon: "pie-chart",
        },
      },
      {
        name: "Bar",
        path: "/bar",
        component: () => import("@/views/chart/bar/bar"),
        meta: {
          title: "条形图",
          icon: "bar-chart",
        },
      },
    ],
  },
];

export { businessRoutes };
