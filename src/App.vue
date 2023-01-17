<script setup lang="ts">
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition
      name="fade"
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="scss">
button, input[type="submit"], input[type="reset"] {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: none;
  transition: all .5s ease;
  &:hover {
    opacity: .8;
  }
  &:focus {
    outline: none;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s linear;
}

.fade-enter, .fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
