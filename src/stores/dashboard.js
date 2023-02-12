import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const useDashboardStore = defineStore("dashboard", () => {
  const token = ref("");
  const isLogined = ref(false);
  const modalType = ref("");
  const modalTarget = ref({});
  const modalImageUrl = ref("");
  function logout() {
    return axios.post(
      `${apiUrl}/v2/logout`,
      {},
      { headers: { Authorization: token.value } }
    );
  }
  return { token, isLogined, modalType, modalTarget, modalImageUrl, logout };
});
