<script setup>
import { reactive, ref } from 'vue'
import cylinderPart from '@/components/cylinder/cylinderPart.vue'
import selectCylinderColor from '@/components/cylinder/selectCylinderColor.vue'
import { useColorListStore } from '@/stores/colorList.js'
import cloneDeep from 'lodash/cloneDeep'
import { captureNodeToPNG } from '@/util/domToImage'

// 颜色列表
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
// 是否出现颜色选项列表
let isShow = ref(false)
// 颜色选项列表key
let keysList = reactive([])

// 修改当前选色
const colorListStore = useColorListStore()
// 存色
const saveCurColorList = (name, pureColorArr) => {
  colorListStore.addToColorList(name, cloneDeep(pureColorArr))
}
// 获取keys
const getColorKeysList = () => {
  isShow.value = true
  keysList = colorListStore.showColorKeyList()
}
// 选色
const modifiedCurColorList = (ckey) => {
  pureColorArr.value = colorListStore.getColorList(ckey)
}
// 关闭选色列表
const closeKeysList = () => {
  isShow.value = false
}
// 选色列表按钮事件变化
const colorListChoseBtn = () => {
  return isShow.value ? closeKeysList() : getColorKeysList()
}

// 图片导出
const screenshotElement = ref(null)
</script>

<template>
  <div class="cylinder_outside" ref="screenshotElement">
    <h1>圆八股辫</h1>
    <button class="out_btn" @click="captureNodeToPNG(screenshotElement, '圆八股辫')">
      点击导出 PNG 图片
    </button>
    <div class="select_color">
      <ul>
        <span>当前颜色：</span>
        <li v-for="(color, index) in pureColorArr" :key="index">
          <span :style="{ backgroundColor: color }"></span>
        </li>
      </ul>
      <div class="btn_list">
        <button @click="colorListChoseBtn">
          {{ isShow ? '关 闭' : '选 色' }}
        </button>
        <button @click="saveCurColorList('cylinder', pureColorArr)">存 色</button>
        <!-- 色组的 key 列表 -->
        <ol v-show="isShow">
          <li v-for="(ckey, index) in keysList" :key="index" @click="modifiedCurColorList(ckey)">
            {{ ckey }}
          </li>
          <p v-show="isShow && keysList.length == 0">当前没有存储色组噢</p>
        </ol>
      </div>
    </div>
    <cylinderPart :kcolor="pureColorArr" />
    <selectCylinderColor
      :pureColorArr="pureColorArr"
      @selectcolor="(msg) => (pureColorArr = msg)"
    />
  </div>
</template>

<style lang="less" scoped>
.cylinder_outside {
  position: relative;
  display: flex;
  padding-top: 20px;
  width: 508px;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border: 1px solid #000;

  .out_btn {
    position: absolute;
    width: 100px;
    height: 50px;
    top: 0;
    left: 0;
    font-size: 16px;
    cursor: pointer;
  }

  h1 {
    margin-bottom: 10px;
  }
}

.select_color {
  display: flex;
  position: relative;
  margin-bottom: 6px;
  width: 450px;

  & > ul {
    display: flex;
    list-style: none;

    span {
      display: block;
      height: 24px;
      line-height: 24px;
      font-size: 16px;
      font-weight: bold;
    }

    li span {
      display: block;
      margin: 0 4px 4px 0;
      width: 24px;
      height: 24px;
      border-radius: 100%;
      border: 1px solid #666666;
    }
  }

  .btn_list {
    button {
      width: 50px;
      height: 25px;
      margin-left: 18px;
      outline: none;
      background-color: #eee;
      border-radius: 5px;
      border: 1px solid #666;
      cursor: pointer;

      &:hover {
        background-color: #666;
        color: aliceblue;
      }
    }
    ol {
      display: flex;
      position: absolute;
      padding: 10px;
      width: 100%;
      top: 30px;
      left: 0;
      list-style: none;
      background: #eeeeee;
      border-radius: 5px;
      box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.25);

      li {
        margin-right: 6px;
        padding: 0 5px;
        height: 25px;
        line-height: 25px;
        color: #333;
        background: #fff;
        border-radius: 5px;
        box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.25);
        cursor: pointer;

        &:hover {
          color: #fff;
          background: #666666;
        }
      }
    }
  }
}
</style>
