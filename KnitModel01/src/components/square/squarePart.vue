<script setup>
import { onMounted, ref } from 'vue'
import Zdog from 'zdog'

const zdogCanvas = ref(null)

onMounted(() => {
  draw(zdogCanvas.value)
})

// 内部定位正方形六面
const setCubeFace = (group, rotate, translate, color) => {
  new Zdog.Rect({
    addTo: group,
    width: 100,
    height: 100,
    rotate,
    translate,
    color,
    stroke: false,
    fill: true
  })
}

// 绳子模块的颜色
const ropeColorComp = (group, translate, color, path) => {
  new Zdog.Shape({
    addTo: group,
    path,
    fill: true,
    translate,
    color,
    stroke: 0
  })
}
// 正背面颜色状态
const frontState = (group, zPositioin, LeftColorArr, RightColorArr) => {
  // 正面的右测：从最低点开始，逆时针画一圈
  let pointRightCenterRoutes = [
    { x: 0, y: 0, z: 0 },
    { x: 50, y: -50, z: 0 },
    { x: 50, y: -100, z: 0 },
    { x: 0, y: -50, z: 0 }
  ]
  // 右绿
  ropeColorComp(group, { x: 0, y: 0, z: zPositioin }, RightColorArr[0], pointRightCenterRoutes)
  // 右红 (起点都是1，然后逆时针画一圈)
  ropeColorComp(group, { x: 0, y: 50, z: zPositioin }, RightColorArr[1], pointRightCenterRoutes)
  // 右白
  ropeColorComp(group, { x: 0, y: 100, z: zPositioin }, RightColorArr[2], pointRightCenterRoutes)
  // 右蓝
  ropeColorComp(group, { x: 0, y: 150, z: zPositioin }, RightColorArr[3], pointRightCenterRoutes)

  // 正面的左测：从最低点开始，顺时针画一圈
  let pointLeftCenterRoutes = [
    { x: 0, y: 0, z: 0 },
    { x: -50, y: -50, z: 0 },
    { x: -50, y: -100, z: 0 },
    { x: 0, y: -50, z: 0 }
  ]

  // 左紫
  ropeColorComp(group, { x: 0, y: 0, z: zPositioin }, LeftColorArr[0], pointLeftCenterRoutes)
  // 左橙(顺时针画一圈)
  ropeColorComp(group, { x: 0, y: 50, z: zPositioin }, LeftColorArr[1], pointLeftCenterRoutes)
  // 左黄
  ropeColorComp(group, { x: 0, y: 100, z: zPositioin }, LeftColorArr[2], pointLeftCenterRoutes)
  // 左靛
  ropeColorComp(group, { x: 0, y: 150, z: zPositioin }, LeftColorArr[3], pointLeftCenterRoutes)
}
// 左右侧面颜色状态
const sideState = (group, xPositioin, LeftColorArr, RightColorArr) => {
  // 给正方体右侧加线段（中右白）
  let pointLeftRightRoutes = [
    { x: 0, y: 0, z: 0 },
    { x: 0, y: -50, z: -50 },
    { x: 0, y: -100, z: -50 },
    { x: 0, y: -50, z: 0 }
  ]
  // 【右-左】绿
  ropeColorComp(group, { x: xPositioin, y: -50, z: 50 }, LeftColorArr[0], pointLeftRightRoutes)
  // 【右-左】红
  ropeColorComp(group, { x: xPositioin, y: 0, z: 50 }, LeftColorArr[1], pointLeftRightRoutes)
  // 【右-左】白
  ropeColorComp(group, { x: xPositioin, y: 50, z: 50 }, LeftColorArr[2], pointLeftRightRoutes)
  // 【右-左】蓝
  ropeColorComp(group, { x: xPositioin, y: 100, z: 50 }, LeftColorArr[3], pointLeftRightRoutes)

  // 给正方体右侧加线段（中右白）
  let pointRightRightRoutes = [
    { x: 0, y: 0, z: 0 },
    { x: 0, y: -50, z: 50 },
    { x: 0, y: -100, z: 50 },
    { x: 0, y: -50, z: 0 }
  ]
  // 【右-右】黄
  ropeColorComp(group, { x: xPositioin, y: -50, z: -50 }, RightColorArr[0], pointRightRightRoutes)
  // 【右-右】靛
  ropeColorComp(group, { x: xPositioin, y: 0, z: -50 }, RightColorArr[1], pointRightRightRoutes)
  // 【右-右】紫
  ropeColorComp(group, { x: xPositioin, y: 50, z: -50 }, RightColorArr[2], pointRightRightRoutes)
  // 【右-右】橙
  ropeColorComp(group, { x: xPositioin, y: 100, z: -50 }, RightColorArr[3], pointRightRightRoutes)
}

// 渲染
const draw = (zdogCanvas) => {
  let illo = new Zdog.Illustration({
    element: zdogCanvas,
    dragRotate: true
  })

  let greenG = new Zdog.Group({ addTo: illo })
  let whiteG = new Zdog.Group({ addTo: illo })
  let yellowG = new Zdog.Group({ addTo: illo })
  let purpleG = new Zdog.Group({ addTo: illo })

  // 中正绿
  setCubeFace(greenG, null, { z: 50 }, '#41b883')
  // 中右白
  setCubeFace(whiteG, { y: Zdog.TAU / 4 }, { x: 50 }, '#fff')
  // 中左黄
  setCubeFace(yellowG, { y: Zdog.TAU / 4 }, { x: -50 }, '#ffff00')
  // 中后紫
  setCubeFace(purpleG, null, { z: -50 }, '#da70d6')
  // // 顶橙
  // setCubeFace(illo, { x: Zdog.TAU / 4 }, { y: -50 }, '#ffa500')
  // // 底蓝
  // setCubeFace(illo, { x: Zdog.TAU / 4 }, { y: 50 }, '#80b7ff')

  // 给正方体正面加线段（中前绿）
  let LeftColorArrF = ['#da70d6', '#ffa500', 'yellow', '#3f51b5']
  let RightColorArrF = ['#41b883', '#f00', '#fff', '#80b7ff']
  frontState(greenG, 50, LeftColorArrF, RightColorArrF)

  // 给正方体背面加线段（中后紫）
  let RightColorArrB = ['#ffff00', '#3f51b5', '#da70d6', '#ffa500']
  let LeftColorArrB = ['#80b7ff', '#41b883', '#f00', '#fff']
  frontState(purpleG, -50, LeftColorArrB, RightColorArrB)

  // 给正方体右侧加线段（中右白）
  let LeftColorArrR = ['#41b883', '#f00', '#fff', '#80b7ff']
  let RightColorArrR = ['#ffff00', '#3f51b5', '#da70d6', '#ffa500']
  sideState(whiteG, 50, LeftColorArrR, RightColorArrR)

  // 给正方体左侧加线段（中左黄）
  let RightColorArrL = ['#da70d6', '#ffa500', '#ffff00', '#3f51b5']
  let LeftColorArrL = ['#80b7ff', '#41b883', '#f00', '#fff']
  sideState(yellowG, -50, RightColorArrL, LeftColorArrL)

  function animate() {
    illo.updateRenderGraph()
    requestAnimationFrame(animate)
  }

  animate()
}
</script>

<template>
  <div class="square">
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
