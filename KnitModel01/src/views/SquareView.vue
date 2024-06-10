<script setup>
import { ref } from 'vue'
import squarePart from '@/components/square/squarePart.vue'
import selectSquareColor from '@/components/square/selectSquareColor.vue'
const pureColorArr = ref([
  '#eb1d4e',
  '#f67c01',
  '#ffeb3c',
  '#4cb050',
  '#42a5f6',
  '#2c2c9c',
  '#b968c7',
  '#fff'
])
</script>

<template>
  <div class="square_outside">
    <h1>方八股辫</h1>
    <squarePart :kcolor="pureColorArr" />
    <selectSquareColor :pureColorArr="pureColorArr" @selectcolor="(msg) => (pureColorArr = msg)" />
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .square_outside {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #000;
  }
}

.square_outside h1 {
  margin-bottom: 10px;
}
</style>
