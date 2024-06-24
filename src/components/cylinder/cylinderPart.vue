<script setup>
import { onMounted, ref, watch } from 'vue'
import Zdog from 'zdog'

const cylinderCanvas = ref(null)
const diskCanvas = ref(null)

const SQ = 25 * Math.sqrt(2)

const props = defineProps({
  kcolor: Array[String]
})

// 缩放倍数
const ZOOM = ref(0.5)
// 缩小
const decreaseZoom = () => {
  if (ZOOM.value >= 0.4) {
    ZOOM.value -= 0.1
  }
}
// 放大
const increaseZoom = () => {
  if (ZOOM.value <= 0.6) {
    ZOOM.value += 0.1
  }
}
// 还原
const restoreZooom = () => {
  ZOOM.value = 0.5
}

onMounted(() => {
  draw(ZOOM)
})

watch(
  () => [props.kcolor, ZOOM],
  () => {
    draw(ZOOM)
  },
  { deep: true }
)

// 颜色顺序
const colorOrder1 = [4, 7, 2, 5, 0, 3, 6, 1]
const colorOrder2 = [2, 1, 0, 7, 6, 5, 4, 3]
const colorOrder3 = [0, 3, 6, 1, 4, 7, 2, 5]
const colorOrder4 = [6, 5, 4, 3, 2, 1, 0, 7]

// 内部定位正方形六面
const setCubeFace = (group, rotate, translate, color) => {
  new Zdog.Rect({
    addTo: group,
    width: 50,
    height: 100,
    rotate,
    translate,
    color,
    stroke: false,
    fill: false
  })
}

const createCube = (illoArr) => {
  // 顺时针画一圈
  // 1红
  setCubeFace(illoArr[0], null, { z: 25 + SQ }, '#f00')
  // 2 橙
  setCubeFace(illoArr[1], { y: Zdog.TAU / 8 }, { x: -25 - SQ / 2, z: 25 + SQ / 2 }, '#ffa500')
  // 3 黄
  setCubeFace(illoArr[2], { y: Zdog.TAU / 4 }, { x: -25 - SQ }, '#ffff00')
  // 4 绿
  setCubeFace(illoArr[3], { y: -Zdog.TAU / 8 }, { x: -25 - SQ / 2, z: -25 - SQ / 2 }, '#41b883')
  // 5 蓝
  setCubeFace(illoArr[4], null, { z: -25 - SQ }, '#80b7ff')
  // 6 靛
  setCubeFace(illoArr[5], { y: Zdog.TAU / 8 }, { x: 25 + SQ / 2, z: -25 - SQ / 2 }, '#3f51b5')
  // 7 紫
  setCubeFace(illoArr[6], { y: Zdog.TAU / 4 }, { x: 25 + SQ }, '#da70d6')
  // 8 白
  setCubeFace(illoArr[7], { y: -Zdog.TAU / 8 }, { x: 25 + SQ / 2, z: 25 + SQ / 2 }, '#fff')
}

// 大半棱形块：向右
const DiamondBlocks = (group, rotate, translate, color) => {
  let item = new Zdog.Shape({
    addTo: group,
    path: [
      { x: 0, y: 0, z: 0 },
      { x: -50, y: 50, z: 0 },
      { x: 0, y: 100, z: 0 }
    ],
    closed: false,
    fill: true,
    rotate,
    translate,
    color,
    stroke: 0
  })

  // 描边 strokeOutline
  item.copy({ color: '#666', fill: false, stroke: 1 })
}

// 大棱形块：一圈
const DiamondBlocksLap = (illoArr, yPosition, colorOrder) => {
  //【√】1 红
  DiamondBlocks(
    illoArr[0],
    { y: Zdog.TAU / 2 },
    { x: -25, y: yPosition - 50, z: 25 + SQ },
    props.kcolor[colorOrder[0]]
  )
  DiamondBlocks(illoArr[0], null, { x: 25, y: yPosition, z: 25 + SQ }, props.kcolor[colorOrder[7]])
  //【√】2 橙
  DiamondBlocks(
    illoArr[1],
    { y: Zdog.TAU / 8 },
    { x: -25, y: yPosition - 50, z: 25 + SQ },
    props.kcolor[colorOrder[0]]
  )
  DiamondBlocks(
    illoArr[1],
    { y: -(3 * Zdog.TAU) / 8 },
    { x: -25 - SQ, y: yPosition, z: 25 },
    props.kcolor[colorOrder[1]]
  )
  //【√】3 黄
  DiamondBlocks(
    illoArr[2],
    { y: Zdog.TAU / 4 },
    { x: -25 - SQ, y: yPosition, z: 25 },
    props.kcolor[colorOrder[1]]
  )
  DiamondBlocks(
    illoArr[2],
    { y: -Zdog.TAU / 4 },
    { x: -25 - SQ, y: yPosition - 50, z: -25 },
    props.kcolor[colorOrder[2]]
  )
  //【√】4 绿
  DiamondBlocks(
    illoArr[3],
    { y: (3 * Zdog.TAU) / 8 },
    { x: -25 - SQ, y: yPosition - 50, z: -25 },
    props.kcolor[colorOrder[2]]
  )
  DiamondBlocks(
    illoArr[3],
    { y: -Zdog.TAU / 8 },
    { x: -25, y: yPosition, z: -25 - SQ },
    props.kcolor[colorOrder[3]]
  )
  //【√】5 蓝
  DiamondBlocks(
    illoArr[4],
    { y: Zdog.TAU / 2 },
    { x: -25, y: yPosition, z: -25 - SQ },
    props.kcolor[colorOrder[3]]
  )
  DiamondBlocks(
    illoArr[4],
    null,
    { x: 25, y: yPosition - 50, z: -25 - SQ },
    props.kcolor[colorOrder[4]]
  )
  //【√】6 靛
  DiamondBlocks(
    illoArr[5],
    { y: -(3 * Zdog.TAU) / 8 },
    { x: 25, y: yPosition - 50, z: -25 - SQ },
    props.kcolor[colorOrder[4]]
  )
  DiamondBlocks(
    illoArr[5],
    { y: Zdog.TAU / 8 },
    { x: 25 + SQ, y: yPosition, z: -25 },
    props.kcolor[colorOrder[5]]
  )

  // 7 紫
  DiamondBlocks(
    illoArr[6],
    { y: -Zdog.TAU / 4 },
    { x: 25 + SQ, y: yPosition, z: -25 },
    props.kcolor[colorOrder[5]]
  )
  DiamondBlocks(
    illoArr[6],
    { y: Zdog.TAU / 4 },
    { x: 25 + SQ, y: yPosition - 50, z: 25 },
    props.kcolor[colorOrder[6]]
  )
  //【√】8 白
  DiamondBlocks(
    illoArr[7],
    { y: -Zdog.TAU / 8 },
    { x: 25 + SQ, y: yPosition - 50, z: 25 },
    props.kcolor[colorOrder[6]]
  )
  DiamondBlocks(
    illoArr[7],
    { y: (3 * Zdog.TAU) / 8 },
    { x: 25, y: yPosition, z: 25 + SQ },
    props.kcolor[colorOrder[7]]
  )
}

// 重复模块repeat part：大棱形块-四圈
const DiamondBlocksDuplicateModule = (illoArr, position) => {
  DiamondBlocksLap(illoArr, position, colorOrder1)
  DiamondBlocksLap(illoArr, position + 100, colorOrder2)
  DiamondBlocksLap(illoArr, position + 200, colorOrder3)
  DiamondBlocksLap(illoArr, position + 300, colorOrder4)
}

// 圆盘线段
const linesOnCycleDisk = (cycle, rotate, color) => {
  new Zdog.Shape({
    addTo: cycle,
    path: [
      { x: 0, y: 0 },
      { x: 0, y: -62 }
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
// 渲染：重复模块
const renderModule = (illoArr, zoom) => {
  zoom = Math.round(zoom * 10) / 10
  const renderMap = new Map()
  renderMap.set(0.7, [-150])
  renderMap.set(0.5, [-375, 25])
  renderMap.set(0.6, [-375, 25])
  renderMap.set(0.4, [-550, -150, 250])
  renderMap.set(0.3, [-750, -350, 50, 450])
  for (let i = 0; i < renderMap.get(zoom).length; i++) {
    DiamondBlocksDuplicateModule(illoArr, renderMap.get(zoom)[i])
  }
}

// 渲染
const draw = (ZOOM) => {
  // 动态限死canvas的宽高
  cylinderCanvas.value.width = 300
  cylinderCanvas.value.height = 500
  diskCanvas.value.width = 150
  diskCanvas.value.height = 360

  // 圆柱
  // let isSpinning = true
  let cylinder = new Zdog.Illustration({
    element: '.cylinder-canvas',
    zoom: ZOOM.value
    // dragRotate: true,
    // onDragStart: function () {
    //   isSpinning = false
    // }
  })

  // 分组
  let redG = new Zdog.Group({ addTo: cylinder })
  let orangeG = new Zdog.Group({ addTo: cylinder })
  let yellowG = new Zdog.Group({ addTo: cylinder })
  let greenG = new Zdog.Group({ addTo: cylinder })
  let blueG = new Zdog.Group({ addTo: cylinder })
  let cyanG = new Zdog.Group({ addTo: cylinder })
  let purpleG = new Zdog.Group({ addTo: cylinder })
  let whiteG = new Zdog.Group({ addTo: cylinder })
  let illoArr = [redG, orangeG, yellowG, greenG, blueG, cyanG, purpleG, whiteG]
  createCube(illoArr)

  // 渲染：重复模块
  renderModule(illoArr, ZOOM.value)

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
    linesOnCycleDisk(cycle, { z: ((-1 + 6 * i) * Zdog.TAU) / 24 }, props.kcolor[2 * i])
    linesOnCycleDisk(cycle, { z: ((1 + 6 * i) * Zdog.TAU) / 24 }, props.kcolor[2 * i + 1])
  }

  // 排线线段-手编
  const colorOrderByHand = [4, 1, 2, 3, 0, 5, 6, 7]
  for (let i = 0; i < colorOrderByHand.length / 2; i++) {
    linesDisk(disk, props.kcolor[colorOrderByHand[2 * i]], 25 * (i + 1), false)
    linesDisk(disk, props.kcolor[colorOrderByHand[2 * i + 1]], 25 * (i + 1), true)
  }

  // 只能沿着y轴转
  let viewRotation = new Zdog.Vector()
  let dragStartRY

  new Zdog.Dragger({
    startElement: '.cylinder-canvas',
    onDragStart: function () {
      dragStartRY = viewRotation.y
      animate()
    },
    onDragMove: function (pointer, moveX) {
      let moveRY = (moveX / cylinder.width) * Zdog.TAU
      viewRotation.y = dragStartRY - moveRY
    }
  })

  function animate() {
    redG.rotate.set(viewRotation)
    orangeG.rotate.set(viewRotation)
    yellowG.rotate.set(viewRotation)
    greenG.rotate.set(viewRotation)
    blueG.rotate.set(viewRotation)
    cyanG.rotate.set(viewRotation)
    purpleG.rotate.set(viewRotation)
    whiteG.rotate.set(viewRotation)

    cylinder.updateRenderGraph()
    // cylinder.rotate.y += isSpinning ? 0.03 : 0
    disk.updateRenderGraph()

    requestAnimationFrame(animate)
  }

  animate()
}
</script>

<template>
  <div class="cylinder">
    <div class="draw-part">
      <canvas class="cylinder-canvas" ref="cylinderCanvas" width="300" height="500"></canvas>
      <div>
        <canvas class="disk-canvas" ref="diskCanvas" width="150" height="360"></canvas>
        <div class="zoom-btn">
          <p class="zoom-num">
            缩放倍数: <strong>{{ (ZOOM / 0.5).toFixed(1) }}</strong>
            <span>
              {{ ZOOM == 0.7 ? '[最大]' : ZOOM.toFixed(1) == 0.3 ? '[最小]' : null }}
            </span>
          </p>
          <div class="zoom-3btn">
            <button @click="decreaseZoom">缩小</button>
            <button @click="increaseZoom">放大</button>
            <button class="restore" @click="restoreZooom">还原缩放倍数</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.cylinder {
  display: flex;
  width: 500px;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid #f00; */
}

.draw-part {
  display: flex;
  width: 500px;
  justify-content: center;
}
.cylinder-canvas {
  display: block;
  width: 300px;
  height: 500px;
  background: #ffddbb;
  border-radius: 8px;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.25);
  cursor: move;
  overflow: hidden;
}
.disk-canvas {
  margin-left: 8px;
  display: block;
  width: 150px;
  height: 360px;
  background: #eeeeee;
  border-radius: 8px;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  /* border: 1px solid #f00; */
}

.zoom-btn {
  margin: 12px 0 0 8px;
  width: 150px;
  /* border: 1px solid #0f0; */

  .zoom-num {
    margin: 0 6px;
    line-height: 32px;
    padding: 6px 3px;
    text-align: center;
    font-weight: bold;
    /* border: 1px solid #f00; */
    strong {
      font-weight: bold;
      color: #eb1d4e;
    }
  }

  button {
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

    &:hover {
      background: #666666;
      color: aliceblue;
    }
  }
  .restore {
    width: 138px !important;
  }
}
</style>
