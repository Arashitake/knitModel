<script setup>
import { useColorListStore } from '@/stores/colorList.js'
import { reactive } from 'vue'

const colorListStore = useColorListStore()
// 获取颜色列表
const colorList = reactive(colorListStore.showColorList())
// 删除指定颜色组
const deleteCurColorList = (key) => {
  colorListStore.deleteColorList(key)
}
</script>

<template>
  <div class="store">
    <p class="color_list_name">颜色列表</p>
    <ul>
      <div v-show="colorList.size == 0">
        当前还没有存储色组 (●'◡'●)/，<br />
        若需要储存色组，请在模块中点击右上角“存色”按钮~
      </div>
      <li v-for="(item, key) of colorList" :key="key">
        <div>
          <p><b>色名</b>: {{ item[0] }}</p>
          <ol class="select_color">
            <b>色组：</b>
            <li v-for="(color, index) in item[1]" :key="index">
              <span :style="{ backgroundColor: color }"></span>
            </li>
          </ol>
        </div>
        <button @click="deleteCurColorList(item[0])">Delete</button>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.store {
  width: 400px;
  height: 500px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px; /* 滚动条宽度 */
  }

  &::-webkit-scrollbar-track {
    background: #eeeeee; /* 滚动轨道颜色 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #666666; /* 滚动条拇指颜色 */
    border-radius: 10px; /* 滚动条拇指圆角 */
    cursor: pointer;
    &:hover {
      background-color: #66ba6e;
    }
  }

  .color_list_name {
    margin: 20px 0 15px;
    font-size: 20px;
    font-weight: bold;
  }

  ul {
    & > li {
      display: flex;
      padding-left: 15px;
      align-items: center;
      border-bottom: 1px solid #666;
      b {
        font-weight: bold;
      }
      p {
        font-size: 16px;
        line-height: 30px;
      }
      .select_color {
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
      }
      button {
        margin-left: 50px;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
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
}
</style>
