import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GoodsListView from "../views/GoodsListView.vue";
import ShoppingCartView from "../views/ShoppingCartView.vue";
import DashboardView from "../views/DashboardView.vue"
import InventorisView from "../views/InventoriesView.vue";
import AdminLoginView from "../views/AdminLoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "首頁",
      component: HomeView,
    },
    {
      path: "/goodsList",
      name: "產品頁面",
      component: GoodsListView,
    },
    {
      path: "/shoppingCart",
      name: "購物車",
      component: ShoppingCartView,
    },
    {
      path: "/dashboard",
      name: "後台",
      component: DashboardView,
      children: [
        { path: "inventories", name: "商品管理", component: InventorisView },
        { path: "adminLogin", name: "管理者登入", component: AdminLoginView },
      ],
    },
  ],
});

export default router;
