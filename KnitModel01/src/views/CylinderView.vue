<script setup>
import { ref } from 'vue'
import cylinderPart from '@/components/cylinder/cylinderPart.vue'
import selectCylinderColor from '@/components/cylinder/selectCylinderColor.vue'
import { useColorListStore } from '@/stores/colorList.js'

// const pureColorArr = reactive(Array(8).fill('#000'))
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

// 修改当前选色
const colorListStore = useColorListStore()
const modifiedCurColorList = () => {
  pureColorArr.value = colorListStore.getColorList('cylinder1')
  console.log(1111)
}
let isChange = ref(false)
// 存色
const saveCurColorList = (name, pureColorArr) => {
  isChange.value = true
  colorListStore.addToColorList(name, pureColorArr)
}
</script>

<template>
  <div class="cylinder_outside">
    <div class="title">
      <h1>圆八股辫</h1>
      <button @click="modifiedCurColorList">选 色</button>
      <button @click="saveCurColorList('cylinder', [...pureColorArr])">存 色</button>
    </div>
    <!-- {{ pureColorArr }} -->
    <cylinderPart :kcolor="pureColorArr" />
    <selectCylinderColor
      :pureColorArr="pureColorArr"
      :isChange="isChange"
      @selectcolor="(msg) => (pureColorArr = msg)"
    />
  </div>
</template>

<style lang="less" scoped>
@media (min-width: 1024px) {
  .cylinder_outside {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #000;
  }
}

.cylinder_outside {
  .title {
    display: flex;
    align-items: center;
    button {
      width: 40px;
      height: 25px;
      margin-left: 30px;
    }
  }
  h1 {
    margin-bottom: 10px;
  }
}
</style>
