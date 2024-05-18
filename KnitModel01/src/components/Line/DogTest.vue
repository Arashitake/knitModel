<script setup>
import { onMounted, ref } from 'vue'
import Zdog from 'zdog'

const zdogCanvas = ref(null)

onMounted(() => {
  draw(zdogCanvas.value)
})

const [c1, c2, c3, c4, c5, c6, c7, c8] = [
  'orange', // 橘色1
  'red', // 红色2
  '#da70d6', // 紫色3
  '#41b883', // 绿色4
  '#483667', // 深蓝5
  '#80b7ff', // 蓝色6
  'yellow', // 黄色7
  '#fff' // 白色8
]

// 【NO】线段：会穿模
const model4 = (illo, yPosition, colorArr) => {
  // orange1
  new Zdog.Shape({
    addTo: illo,
    path: [
      { x: 15, y: yPosition, z: 15 }, // start
      { x: 15, y: yPosition + 10, z: 0 },
      { x: 0, y: yPosition + 20, z: 0 }
    ],
    closed: false,
    stroke: 20,
    color: colorArr[0]
  })

  // red2
  new Zdog.Shape({
    addTo: illo,
    path: [
      { x: -15, y: yPosition, z: 15 }, // start
      { x: -15, y: yPosition + 10, z: 0 },
      { x: 0, y: yPosition + 20, z: 0 }
    ],
    closed: false,
    stroke: 20,
    color: colorArr[1]
  })

  // deep blue3
  new Zdog.Shape({
    addTo: illo,
    path: [
      { x: -15, y: yPosition, z: 15 }, // start
      { x: -15, y: yPosition + 10, z: 30 },
      { x: 0, y: yPosition + 20, z: 30 }
    ],
    closed: false,
    stroke: 20,
    color: colorArr[2]
  })

  // white4
  new Zdog.Shape({
    addTo: illo,
    path: [
      { x: 15, y: yPosition, z: 15 }, // start
      { x: 15, y: yPosition + 10, z: 30 },
      { x: 0, y: yPosition + 20, z: 30 }
    ],
    closed: false,
    stroke: 20,
    color: colorArr[3]
  })
}

// 【YES】方块
const model4Box = (illo, yPosition, colorArr) => {
  // orange1
  new Zdog.Box({
    addTo: illo,
    width: 60,
    height: 60,
    depth: 60,
    stroke: false,
    color: colorArr[0],
    translate: { x: -150, y: yPosition, z: 30 },
    closed: false
  })

  // red2
  new Zdog.Box({
    addTo: illo,
    width: 60,
    height: 60,
    depth: 60,
    stroke: false,
    color: colorArr[1],
    translate: { x: -90, y: yPosition, z: 30 },
    closed: false
  })

  // deep blue3
  new Zdog.Box({
    addTo: illo,
    width: 60,
    height: 60,
    depth: 60,
    stroke: false,
    color: colorArr[2],
    translate: { x: -150, y: yPosition, z: -30 },
    closed: false
  })

  // white4
  new Zdog.Box({
    addTo: illo,
    width: 60,
    height: 60,
    depth: 60,
    stroke: false,
    color: colorArr[3],
    translate: { x: -90, y: yPosition, z: -30 },
    closed: false
  })
}

// 一组线段
const aGroupModel4 = (one, yPosition, colorArr1, colorArr2, colorArr3, colorArr4) => {
  let illo = new Zdog.Group({
    addTo: one
  })
  model4(illo, yPosition, colorArr3)
  // model4(illo, yPosition + 20, colorArr4)
  // model4(illo, yPosition + 40, colorArr1)
  // model4(illo, yPosition + 60, colorArr2)
}

const draw = (zdogCanvas) => {
  let illo = new Zdog.Illustration({
    element: zdogCanvas,
    dragRotate: true
  })
  // groups
  let one = new Zdog.Anchor({
    addTo: illo
  })

  // colorArr
  const colorArr1 = [c1, c2, c6, c5]
  const colorArr2 = [c7, c8, c4, c3]
  const colorArr3 = [c5, c6, c2, c1]
  const colorArr4 = [c3, c4, c7, c8]

  // aGroupModel4(illo, -150, colorArr1, colorArr2, colorArr3, colorArr4)
  aGroupModel4(one, -70, colorArr1, colorArr2, colorArr3, colorArr4)
  // aGroupModel4(illo, 10, colorArr1, colorArr2, colorArr3, colorArr4)

  // model4Box(illo, -120, colorArr1)
  // model4Box(illo, -58, colorArr2)
  // model4Box(illo, 4, colorArr3)
  // model4Box(illo, 66, colorArr4)

  // 直角四面体
  // new Zdog.Shape({
  //   addTo: illo,
  //   path: [
  //     // 第一个面
  //     { x: 100, y: 0, z: -50 }, // start
  //     { x: 100, y: 100, z: -50 },
  //     { x: 200, y: 100, z: -50 },
  //     { x: 100, y: 0, z: -50 },
  //     // 第二个面
  //     { x: 100, y: 100, z: 50 },
  //     { x: 100, y: 100, z: -50 },
  //     { x: 100, y: 0, z: -50 },
  //     // 第三个面
  //     { x: 100, y: 100, z: -50 },
  //     { x: 200, y: 100, z: -50 },
  //     { x: 100, y: 100, z: 50 },
  //     // 下半部分
  //     { x: 100, y: 200, z: -50 },
  //     { x: 200, y: 100, z: -50 },
  //     { x: 100, y: 100, z: -50 },
  //     { x: 100, y: 200, z: -50 }
  //   ],
  //   closed: false,
  //   stroke: 10,
  //   // stroke: false,
  //   // fill: true,
  //   color: '#188038'
  // })

  function animate() {
    illo.updateRenderGraph()
    requestAnimationFrame(animate)
  }

  animate()
}
</script>

<template>
  <div>
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
