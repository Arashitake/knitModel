<script setup>
import { RouterLink, RouterView } from 'vue-router'
import colorListView from './views/colorListView.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="greetings">
        <h1 class="green">Hand Rope</h1>
      </div>
      <div>
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <!-- <RouterLink to="/line">Line</RouterLink> -->
          <RouterLink to="/square">方八股辫</RouterLink>
          <RouterLink to="/cylinder">圆八股辫</RouterLink>
        </nav>
        <colorListView />
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

header {
  line-height: 1.5;
  max-height: 100vh;
}

.greetings h1 {
  position: relative;
  text-align: left;
  font-size: 2.6rem;
  font-weight: 500;
  color: #66ba6e;
}

nav {
  margin-top: 2rem;
  text-align: left;
  font-size: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #666;

  a.router-link-exact-active {
    color: var(--color-text);
  }

  a.router-link-exact-active:hover {
    background-color: transparent;
  }

  a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid #666;
    color: #66ba6e;

    &:first-of-type {
      border: 0;
    }
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
