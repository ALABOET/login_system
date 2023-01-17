<template>
  <div class="order">
    <div class="order__item id">{{id}}</div>
    <div class="order__item email">{{email}}</div>
    <div class="order__item amount">{{amount}}</div>
    <div class="order__item date">{{date}}</div>
  </div>
</template>

<script setup>
const props =  defineProps({
  id: Number,
  email: String,
  amount: Number,
  date: String,
})
</script>

<style lang="scss">
.order {
  height: 37px;
  background: #FFFFFF;
  border: 1px solid #EBEBEB;
  border-radius: 10px;
  display: flex;
  align-items: center;
  transition: all .5s ease;
  &:hover {
    background: #86CD89;
  }
  @media screen and (max-width: 540px) {
    height: unset;
  }
  &__item {
    flex: 1;
    text-align: left;
    margin-left: 11px;
    @media screen and (max-width: 540px){
      margin-left: 0;
    }
  }
  .id {
    text-align: center;
    max-width: 105px;
  }
  .email {
    line-break: anywhere;
  }
  .amount {
   text-align: left;
    @media screen and (max-width: 540px) {
      text-align: center;
    }
  }
}
</style>
