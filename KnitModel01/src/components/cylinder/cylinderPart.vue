<script setup>
import { onMounted, ref } from 'vue'
import Zdog from 'zdog'

const zdogCanvas = ref(null)

onMounted(() => {
  draw(zdogCanvas.value)
})

// 渲染
const draw = (zdogCanvas) => {
  let illo = new Zdog.Illustration({
    element: zdogCanvas,
    dragRotate: true
  })
}
</script>

<template>
  <div class="cylinder">
    <canvas class="zdog-canvas" ref="zdogCanvas" width="500" height="500"></canvas>
  </div>
</template>

<style scoped>
.zdog-canvas {
  display: block;
  width: 500px;
  height: 500px;
  background: #ffddbb;
  cursor: move;
}
</style>
