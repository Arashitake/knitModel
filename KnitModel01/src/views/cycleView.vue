<script setup>
import { onMounted, ref } from 'vue'
import Zdog from 'zdog'

const zdogCanvas = ref(null)

onMounted(() => {
  draw(zdogCanvas.value)
})
const draw = (zdogCanvas) => {
  let illo = new Zdog.Illustration({
    element: zdogCanvas,
    dragRotate: true
  })

  // 圆盘
  let cycle = new Zdog.Ellipse({
    addTo: illo,
    diameter: 180,
    // translate: { x: 150 },
    stroke: 10,
    fill: true,
    color: '#fff'
  })

  // 线段1
  new Zdog.Shape({
    addTo: cycle,
    path: [
      { x: 0, y: 0 },
      { x: 45, y: -45 * Math.sqrt(3) }
    ],
    closed: false,
    stroke: 5,
    color: '#f00'
  })

  // 线段2
  new Zdog.Shape({
    addTo: illo,
    path: [
      { x: 0, y: 0 },
      { x: -45 * Math.sqrt(3), y: 45 }
    ],
    closed: false,
    stroke: 5,
    color: '#00f'
  })

  // 加载在画布上
  illo.updateRenderGraph()
}
</script>

<template>
  <div>
    <canvas class="zdog-canvas" ref="zdogCanvas" width="400" height="400"></canvas>
  </div>
</template>

<style scoped>
.zdog-canvas {
  display: block;
  width: 400px;
  height: 400px;
  background: #ffddbb;
  cursor: move;
}
</style>
