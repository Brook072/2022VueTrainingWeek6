<script setup>
import { ref, toRef } from "vue";
const prop = defineProps(["modalTarget"]);
const emit = defineEmits(["sendAddCartItem", "sendModalTargetQty"]);
const modalTarget = toRef(prop, "modalTarget");
const modalTargetQty = ref(1);
</script>

<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ modalTarget.title }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" :src="modalTarget.imageUrl" alt="" />
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{
                modalTarget.category
              }}</span>
              <p>商品描述：{{ modalTarget.description }}</p>
              <p>商品內容：{{ modalTarget.content }}</p>
              <del class="h6">原價 {{ modalTarget.origin_price }} 元</del>
              <div class="h5">現在只要 {{ modalTarget.price }} 元</div>
              <div>
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    min="1"
                    v-model="modalTargetQty"
                  />
                  <button
                    @click="
                      emit('sendModalTargetQty', modalTargetQty);
                      emit('sendAddCartItem', modalTarget.id);
                    "
                    type="button"
                    class="btn btn-primary"
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
