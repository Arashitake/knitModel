<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

let isShow = ref(false)
const showOptionsBtn = () => {
  isShow.value = !isShow.value
}
</script>

<template>
  <nav>
    <ul>
      <li @click="showOptionsBtn"><RouterLink to="/">Home</RouterLink></li>
      <li>
        <p :class="isShow ? 'show_btn' : ''" @click="showOptionsBtn">八股辫</p>
        <div v-show="isShow" class="options_box">
          <RouterLink to="/square">方八股辫</RouterLink>
          <RouterLink to="/cylinder">圆八股辫</RouterLink>
        </div>
      </li>
    </ul>
  </nav>
</template>

<style lang="less" scoped>
nav {
  margin: 1.5rem 0 1rem;
  padding: 0.5rem 0;
  text-align: left;
  font-size: 1rem;
  border-bottom: 1px solid #666;

  ul {
    display: flex;
    list-style-type: none;

    li {
      position: relative;

      p {
        padding: 0 1rem;
        border-left: 1px solid #666;
        cursor: pointer;
      }

      .options_box {
        position: absolute;
        width: 200px;
        padding: 6px 0;
        top: 2rem;
        border-top: 1px solid #000;
        // background-color: #eeeeee;
        // border: 1px solid #f00;
      }
    }
  }

  a.router-link-exact-active {
    color: #66ba6e;
  }

  a.router-link-exact-active:hover {
    background-color: transparent;
  }

  a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid #666;
    color: var(--color-text);

    &:first-of-type {
      border: 0;
    }
  }
}

.show_btn {
  color: #66ba6e;
}
</style>
