<script setup>
import { RouterView } from 'vue-router'
import colorList from '@/components/homepage/colorList.vue'
import navModel from '@/components/homepage/navModel.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="greetings">
        <img src="./assets/logo.png" alt="Hand Rope" />
        <h1 class="green">Hand Rope</h1>
      </div>
      <div>
        <navModel />
        <colorList />
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth; /* 启用全局平滑滚动 */
}

.greetings {
  display: flex;
  align-items: center;
  img {
    width: 3.2rem;
    height: 3.2rem;
  }
  h1 {
    position: relative;
    text-align: left;
    font-size: 2.6rem;
    font-weight: 500;
    color: #66ba6e;
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    // place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    flex-direction: column;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
