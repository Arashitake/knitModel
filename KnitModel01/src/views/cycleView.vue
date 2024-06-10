<script setup>
import { onMounted } from 'vue'
// import Zdog from 'zdog'
import { useColorListStore } from '@/stores/colorList.js'

// const zdogCanvas = ref(null)

const colorListStore = useColorListStore()

onMounted(() => {
  draw()
})

const draw = () => {
  // Made with Zdog
  // let illo = new Zdog.Illustration({
  //   element: zdogCanvas
  // })
  // // circle
  // let circle = new Zdog.Ellipse({
  //   addTo: illo,
  //   diameter: 70,
  //   stroke: 20,
  //   color: '#636'
  // })
  // let viewRotation = new Zdog.Vector()
  // let dragStartRY
  // new Zdog.Dragger({
  //   startElement: '.zdog-canvas',
  //   onDragStart: function () {
  //     dragStartRY = viewRotation.y
  //     animate()
  //   },
  //   onDragMove: function (pointer, moveX) {
  //     let moveRY = (moveX / illo.width) * Zdog.TAU
  //     viewRotation.y = dragStartRY - moveRY
  //   },
  //   onDragEnd: function () {}
  // })
  // function animate() {
  //   circle.rotate.set(viewRotation)
  //   illo.updateRenderGraph()
  //   requestAnimationFrame(animate)
  // }
  // animate()
}
</script>

<template>
  <div class="store">
    <!-- <canvas class="zdog-canvas" ref="zdogCanvas" width="400" height="400"></canvas> -->
    <div class="check_colorlist">
      输入要删除的颜色列表序号：
      <input id="color_select" type="text" />
      <button>删除</button>
    </div>
    <p>颜色列表</p>
    <ul>
      <li v-for="(item, key) of colorListStore.showColorList()" :key="key">
        <p><b>label</b>: {{ item[0] }}</p>
        <ol class="select-color">
          <b>色组：</b>
          <li v-for="(color, index) in item[1]" :key="index">
            <span :style="{ backgroundColor: color }"></span>
          </li>
          <button>选择此色组</button>
        </ol>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.store {
  width: 400px;
  height: 500px;
  /* border: 1px solid seagreen; */
}

.store ul li {
  b {
    font-weight: bold;
  }
  .select-color {
    width: 450px;
    display: flex;
    list-style: none;

    li span {
      display: block;
      margin: 0 4px 4px 0;
      width: 22px;
      height: 22px;
      border-radius: 100%;
      border: 1px solid #666666;
    }

    button {
    }
  }
}

.zdog-canvas {
  display: block;
  width: 400px;
  height: 400px;
  background: #ffddbb;
  cursor: move;
}
</style>
