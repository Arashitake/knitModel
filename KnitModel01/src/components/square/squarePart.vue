<script setup>
import { onMounted, onUpdated, ref } from 'vue'
import Zdog from 'zdog'

const squareCanvas = ref(null)
const diskCanvas = ref(null)

const props = defineProps({
  kcolor: Array[String]
})

const ZOOM = ref(0.5 * 0.5 * (1 + Math.sqrt(2)))
// 缩小
const decreaseZoom = () => {
  if (ZOOM.value >= 0.5) {
    ZOOM.value -= 0.1
  }
}
// 放大
const increaseZoom = () => {
  if (ZOOM.value <= 0.8) {
    ZOOM.value += 0.1
  }
}
// 还原
const restoreZooom = () => {
  ZOOM.value = 0.25 * (1 + Math.sqrt(2))
}

onMounted(() => {
  draw(ZOOM)
})

onUpdated(() => {
  draw(ZOOM)
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
  let item = new Zdog.Shape({
    addTo: group,
    path,
    fill: true,
    translate,
    color,
    stroke: 0
  })

  // 描边 strokeOutline
  item.copy({ color: '#666', fill: false, stroke: 1 })
}
// 正背面颜色状态
const frontState = (group, yPosition, zPositioin, LeftColorArr, RightColorArr) => {
  // 正面的右测：从最低点开始，逆时针画一圈
  let pointRightCenterRoutes = [
    { x: 0, y: -100, z: 0 },
    { x: 50, y: -50, z: 0 },
    { x: 50, y: -100, z: 0 },
    { x: 0, y: -150, z: 0 }
  ]
  // 右绿
  ropeColorComp(
    group,
    { x: 0, y: yPosition, z: zPositioin },
    RightColorArr[0],
    pointRightCenterRoutes
  )
  // 右红 (起点都是1，然后逆时针画一圈)
  ropeColorComp(
    group,
    { x: 0, y: yPosition + 50, z: zPositioin },
    RightColorArr[1],
    pointRightCenterRoutes
  )
  // 右白
  ropeColorComp(
    group,
    { x: 0, y: yPosition + 100, z: zPositioin },
    RightColorArr[2],
    pointRightCenterRoutes
  )
  // 右蓝
  ropeColorComp(
    group,
    { x: 0, y: yPosition + 150, z: zPositioin },
    RightColorArr[3],
    pointRightCenterRoutes
  )

  // 正面的左测：从最低点开始，顺时针画一圈
  let pointLeftCenterRoutes = [
    { x: 0, y: -100, z: 0 },
    { x: -50, y: -50, z: 0 },
    { x: -50, y: -100, z: 0 },
    { x: 0, y: -150, z: 0 }
  ]

  // 左紫
  ropeColorComp(
    group,
    { x: 0, y: yPosition, z: zPositioin },
    LeftColorArr[0],
    pointLeftCenterRoutes
  )
  // 左橙(顺时针画一圈)
  ropeColorComp(
    group,
    { x: 0, y: yPosition + 50, z: zPositioin },
    LeftColorArr[1],
    pointLeftCenterRoutes
  )
  // 左黄
  ropeColorComp(
    group,
    { x: 0, y: yPosition + 100, z: zPositioin },
    LeftColorArr[2],
    pointLeftCenterRoutes
  )
  // 左靛
  ropeColorComp(
    group,
    { x: 0, y: yPosition + 150, z: zPositioin },
    LeftColorArr[3],
    pointLeftCenterRoutes
  )
}

// 左右侧面颜色状态
const sideState = (group, yPosition, xPositioin, LeftColorArr, RightColorArr) => {
  // 给正方体右侧加线段（中右白）
  let pointLeftRightRoutes = [
    { x: 0, y: -50, z: 0 },
    { x: 0, y: 0, z: -50 },
    { x: 0, y: 50, z: -50 },
    { x: 0, y: 0, z: 0 }
  ]
  // 【右-左】绿
  ropeColorComp(
    group,
    { x: xPositioin, y: yPosition - 50, z: 50 },
    LeftColorArr[0],
    pointLeftRightRoutes
  )
  // 【右-左】红
  ropeColorComp(
    group,
    { x: xPositioin, y: yPosition, z: 50 },
    LeftColorArr[1],
    pointLeftRightRoutes
  )
  // 【右-左】白
  ropeColorComp(
    group,
    { x: xPositioin, y: yPosition + 50, z: 50 },
    LeftColorArr[2],
    pointLeftRightRoutes
  )
  // 【右-左】蓝
  ropeColorComp(
    group,
    { x: xPositioin, y: yPosition + 100, z: 50 },
    LeftColorArr[3],
    pointLeftRightRoutes
  )

  // 给正方体右侧加线段（中右白）
  let pointRightRightRoutes = [
    { x: 0, y: -50, z: 0 },
    { x: 0, y: 0, z: 50 },
    { x: 0, y: 50, z: 50 },
    { x: 0, y: 0, z: 0 }
  ]
  // 【右-右】黄
  ropeColorComp(
    group,
    { x: xPositioin, y: yPosition - 50, z: -50 },
    RightColorArr[0],
    pointRightRightRoutes
  )
  // 【右-右】靛
  ropeColorComp(
    group,
    { x: xPositioin, y: yPosition, z: -50 },
    RightColorArr[1],
    pointRightRightRoutes
  )
  // 【右-右】紫
  ropeColorComp(
    group,
    { x: xPositioin, y: yPosition + 50, z: -50 },
    RightColorArr[2],
    pointRightRightRoutes
  )
  // 【右-右】橙
  ropeColorComp(
    group,
    { x: xPositioin, y: yPosition + 100, z: -50 },
    RightColorArr[3],
    pointRightRightRoutes
  )
}

// 圆盘线段，direction：【上: 0 1】【右: 2 3】【下: 4 5】【左:6 7】
const linesOnCycleDisk = (cycle, rotate, color, direction) => {
  let xPositioin = 0
  if (direction == 0 || direction == 4) {
    xPositioin = 5
  } else if (direction == 1 || direction == 5) {
    xPositioin = -5
  }
  new Zdog.Shape({
    addTo: cycle,
    path: [
      { x: xPositioin, y: 0 },
      { x: xPositioin, y: -62 }
    ],
    closed: false,
    rotate,
    stroke: 3,
    color
  })
}

// 排线线段：direction: 右 ? 左
const linesDisk = (disk, color, yPosition, direction) => {
  new Zdog.Shape({
    addTo: disk,
    path: [
      { x: direction ? -10 : 10, y: -10 },
      { x: 0, y: -62 }
    ],
    closed: false,
    translate: { y: yPosition },
    rotate: { z: ((direction ? 1 : -1) * (2 * Zdog.TAU)) / 6 },
    stroke: 3,
    color
  })
}

// 重复模块repeat part：大棱形块-四圈
const DiamondBlocksDuplicateModule = (squareArr, yPosition) => {
  // 颜色顺序
  // 给正方体正面加线段（中前绿）
  let LeftColorArrF = [props.kcolor[0], props.kcolor[3], props.kcolor[4], props.kcolor[7]]
  let RightColorArrF = [props.kcolor[6], props.kcolor[5], props.kcolor[2], props.kcolor[1]]
  frontState(squareArr[0], yPosition, 50, LeftColorArrF, RightColorArrF)

  // 给正方体背面加线段（中后紫）
  let LeftColorArrB = [props.kcolor[6], props.kcolor[5], props.kcolor[2], props.kcolor[1]]
  let RightColorArrB = [props.kcolor[3], props.kcolor[4], props.kcolor[7], props.kcolor[0]]
  frontState(squareArr[1], yPosition, -50, LeftColorArrB, RightColorArrB)

  // 给正方体右侧加线段（中右白）
  let LeftColorArrR = [props.kcolor[6], props.kcolor[5], props.kcolor[2], props.kcolor[1]]
  let RightColorArrR = [props.kcolor[3], props.kcolor[4], props.kcolor[7], props.kcolor[0]]
  sideState(squareArr[2], yPosition, 50, LeftColorArrR, RightColorArrR)

  // 给正方体左侧加线段（中左黄）
  let RightColorArrL = [props.kcolor[6], props.kcolor[5], props.kcolor[2], props.kcolor[1]]
  let LeftColorArrL = [props.kcolor[0], props.kcolor[3], props.kcolor[4], props.kcolor[7]]
  sideState(squareArr[3], yPosition, -50, LeftColorArrL, RightColorArrL)
}

// 渲染：重复模块
const renderModule = (squareArr, zoom) => {
  zoom = Math.round(zoom * 10) / 10
  const renderMap = new Map()
  renderMap.set(0.8, [-100, 100])
  renderMap.set(0.7, [-200, 0, 200])
  renderMap.set(0.6, [-200, 0, 200])
  renderMap.set(0.5, [-300, -100, 100, 300])
  renderMap.set(0.4, [-400, -200, 0, 200, 400])
  for (let i = 0; i < renderMap.get(zoom).length; i++) {
    DiamondBlocksDuplicateModule(squareArr, renderMap.get(zoom)[i])
  }
}

// 渲染
const draw = (ZOOM) => {
  // 动态限死canvas的宽高
  squareCanvas.value.width = 300
  squareCanvas.value.height = 500
  diskCanvas.value.width = 150
  diskCanvas.value.height = 360
  let square = new Zdog.Illustration({
    element: '.square-canvas',
    zoom: ZOOM.value
  })

  let greenG = new Zdog.Group({ addTo: square })
  let whiteG = new Zdog.Group({ addTo: square })
  let yellowG = new Zdog.Group({ addTo: square })
  let purpleG = new Zdog.Group({ addTo: square })
  // 中正绿
  setCubeFace(greenG, null, { z: 50 }, '#41b883')
  // 中右白
  setCubeFace(whiteG, { y: Zdog.TAU / 4 }, { x: 50 }, '#fff')
  // 中左黄
  setCubeFace(yellowG, { y: Zdog.TAU / 4 }, { x: -50 }, '#ffff00')
  // 中后紫
  setCubeFace(purpleG, null, { z: -50 }, '#da70d6')
  // // 顶橙
  // setCubeFace(square, { x: Zdog.TAU / 4 }, { y: -50 }, '#ffa500')
  // // 底蓝
  // setCubeFace(square, { x: Zdog.TAU / 4 }, { y: 50 }, '#80b7ff')

  // 渲染：重复模块
  let squareArr = [greenG, purpleG, whiteG, yellowG]
  renderModule(squareArr, ZOOM.value)

  // 【右】
  let disk = new Zdog.Illustration({
    element: '.disk-canvas',
    dragRotate: false
  })
  // 圆盘
  let cycle = new Zdog.Ellipse({
    addTo: disk,
    diameter: 120,
    stroke: 10,
    translate: { y: -100 },
    fill: true,
    color: '#666'
  })
  // 圆盘上的线段
  for (let i = 0; i < props.kcolor.length / 2; i++) {
    linesOnCycleDisk(
      cycle,
      { z: ((1 + 6 * i) * Zdog.TAU) / 24 },
      props.kcolor[2 * i + 1],
      2 * i + 1
    )
    linesOnCycleDisk(cycle, { z: ((-1 + 6 * i) * Zdog.TAU) / 24 }, props.kcolor[2 * i], 2 * i)
  }

  // 排线线段-手编
  const colorOrderByHand = [3, 6, 4, 5, 7, 2, 0, 1]
  for (let i = 0; i < colorOrderByHand.length / 2; i++) {
    linesDisk(disk, props.kcolor[colorOrderByHand[2 * i]], 25 * (i + 1), false)
    linesDisk(disk, props.kcolor[colorOrderByHand[2 * i + 1]], 25 * (i + 1), true)
  }

  // 只能沿着y轴转
  let viewRotation = new Zdog.Vector()
  let dragStartRY

  new Zdog.Dragger({
    startElement: '.square-canvas',
    onDragStart: function () {
      dragStartRY = viewRotation.y
      animate()
    },
    onDragMove: function (pointer, moveX) {
      let moveRY = (moveX / square.width) * Zdog.TAU
      viewRotation.y = dragStartRY - moveRY
    }
  })

  function animate() {
    greenG.rotate.set(viewRotation)
    yellowG.rotate.set(viewRotation)
    whiteG.rotate.set(viewRotation)
    purpleG.rotate.set(viewRotation)
    square.updateRenderGraph()

    disk.updateRenderGraph()
    requestAnimationFrame(animate)
  }

  animate()
}
</script>

<template>
  <div class="square">
    <div class="select-color">
      <ul>
        <span>当前颜色：</span>
        <li v-for="(color, index) in props.kcolor" :key="index">
          <span :style="{ backgroundColor: color }"></span>
        </li>
      </ul>
    </div>
    <div class="draw-part">
      <canvas class="square-canvas" ref="squareCanvas" width="300" height="500"></canvas>
      <div>
        <canvas class="disk-canvas" ref="diskCanvas" width="150" height="360"></canvas>
        <div class="zoom-btn">
          <p class="zoom-num">
            缩放倍数: <strong>{{ (ZOOM / (0.25 * (1 + Math.sqrt(2)))).toFixed(1) }}</strong>
            <span>
              {{ ZOOM.toFixed(1) == 0.8 ? '[最大]' : ZOOM.toFixed(1) == 0.4 ? '[最小]' : null }}
            </span>
          </p>
          <button @click="decreaseZoom">缩小</button>
          <button @click="increaseZoom">放大</button>
          <button class="restore" @click="restoreZooom">还原缩放倍数</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.square {
  display: flex;
  width: 500px;
  flex-direction: column;
  align-items: center;
  /* background: #eeeeee; */
  /* border: 1px solid #f00; */
}

.select-color {
  width: 450px;
}

.select-color ul {
  display: flex;
  list-style: none;
}

.select-color ul span {
  display: block;
  height: 24px;
  line-height: 24px;
  font-size: 16px;
  font-weight: bold;
}

.select-color ul li span {
  display: block;
  margin: 0 4px 4px 0;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  border: 1px solid #666666;
}

.draw-part {
  display: flex;
  width: 500px;
  justify-content: center;
}

.square-canvas {
  display: block;
  width: 300px;
  height: 500px;
  background: #ffddbb;
  border-radius: 8px;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.25);
  cursor: move;
}
.disk-canvas {
  margin-left: 8px;
  display: block;
  width: 150px;
  height: 360px;
  background: #eeeeee;
  border-radius: 8px;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.25);
  cursor: move;
  overflow: hidden;
  /* border: 1px solid #666; */
}

.zoom-btn {
  margin: 12px 0 0 8px;
  width: 150px;
  /* border: 1px solid #0f0; */
}

.zoom-num {
  margin: 0 6px;
  line-height: 32px;
  padding: 0 3px;
  text-align: center;
  font-weight: bold;
  /* border: 1px solid #f00; */
}

.zoom-num strong {
  font-weight: bold;
  color: #eb1d4e;
}

.zoom-btn button {
  margin: 8px 4px 0 4px;
  width: 65px;
  height: 32px;
  font-size: 16px;
  letter-spacing: 1px;
  outline: none;
  background-color: #eeeeee;
  border-radius: 5px;
  border: 1px solid #666;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.restore {
  width: 138px !important;
}

.zoom-btn button:hover {
  background: #666;
  color: aliceblue;
}
</style>
