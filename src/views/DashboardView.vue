<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useDashboardStore } from "../stores/dashboard.js";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const router = useRouter();
const { logout } = useDashboardStore();
const { token, isLogined } = storeToRefs(useDashboardStore());

function getToken() {
  let cookieAry = document.cookie.split("; ");
  let cookieObj = {};
  cookieAry.forEach((item) => {
    let key = item.split("=")[0];
    let value = item.split("=")[1];
    cookieObj[key] = value;
  });
  token.value = cookieObj["token"];
}

function loginConfirmation() {
  if (token.value === null) {
    alert("請重新登入");
    router.push("/dashboard/adminLogin");
  } else {
    axios
      .post(
        `${apiUrl}/v2/api/user/check`,
        {},
        {
          headers: {
            Authorization: token.value,
          },
        }
      )
      .then((res) => {
        if (res.data.success === false) {
          alert(res.data.message);
          router.push("/dashboard/adminLogin");
        } else {
          isLogined.value = true;
          router.push("/dashboard/inventories");
        }
      })
      .catch((err) => {
        isLogined.value = false;
        alert(err.response.data.message);
        router.push("/dashboard/adminLogin");
      });
  }
}

function useLogout() {
  logout()
    .then((res) => {
      if (res.data.success === true) {
        alert(res.data.message);
        document.cookie = "max-age=0";
        document.cookie = "Expires=Thu, 01 Jan 1970 00:00:00 GMT";
        token.value = "";
        router.push("/");
      } else {
        alert(res.data.message);
        router.push("/dashboard");
      }
    })
    .catch((err) => {
      alert(err.data.message);
    });
}

getToken();
loginConfirmation();
</script>

<template>
  <div class="container">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link
          class="nav-link active"
          aria-current="page"
          to="/dashboard/inventories"
          >產品管理</router-link
        >
      </li>
      <li v-if="!isLogined" class="nav-item">
        <router-link class="nav-link" to="/dashboard/adminLogin"
          >登入頁面</router-link
        >
      </li>
      <li v-else class="nav-item">
        <a
          @click.prevent="useLogout()"
          class="nav-link"
          to="/dashboard/adminLogin"
          >登出</a
        >
      </li>
    </ul>
    <RouterView />
  </div>
</template>

<style scoped></style>
