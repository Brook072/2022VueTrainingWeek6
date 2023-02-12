import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import HomeView from "../views/HomeView.vue";
import GoodsListView from "../views/GoodsListView.vue";
import ShoppingCartView from "../views/ShoppingCartView.vue";
import DashboardView from "../views/DashboardView.vue";
import InventoriesView from "../views/InventoriesView.vue";
import AdminLoginView from "../views/AdminLoginView.vue";

const apiUrl = import.meta.env.VITE_API_URL;

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
      beforeEnter: (to, from, next) => {
        let cookieAry = document.cookie.split("; ");
        let cookieObj = {};
        cookieAry.forEach((item) => {
          let key = item.split("=")[0];
          let value = item.split("=")[1];
          cookieObj[key] = value;
        });
        let token = cookieObj["token"];
        if (token === null) {
          alert("請重新登入");
          next("/adminLogin");
        } else {
          axios
            .post(
              `${apiUrl}/v2/api/user/check`,
              {},
              {
                headers: {
                  Authorization: token,
                },
              }
            )
            .then((res) => {
              if (res.data.success === false) {
                next("/adminLogin");
              } else {
                next();
              }
            })
            .catch((err) => {
              alert(err.response.data.message);
              next("/adminLogin");
            });
        }
      },
      children: [
        { path: "inventories", name: "商品管理", component: InventoriesView },
      ],
    },
    {
      path: "/adminLogin",
      name: "後台登入",
      component: AdminLoginView,
    },
  ],
});

export default router;
