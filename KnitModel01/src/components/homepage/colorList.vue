<script setup>
import { reactive } from 'vue'
import { useColorListStore } from '@/stores/colorList.js'
import localStorage from '@/stores/localStorage'

const colorListStore = useColorListStore()
// 获取颜色列表
const colorList = reactive(colorListStore.showColorList())

// 删除指定颜色组
const deleteCurColorList = (key) => {
  colorListStore.deleteColorList(key)
}

// 缓存将数据存入localStage
const setLocalStage = () => {
  localStorage.setVal('colorList', Array.from(colorList))
}
const deleteLocalStage = () => {
  localStorage.deleteVal('colorList')
  colorListStore.clearColorList()
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
      <li class="color_item" v-for="(item, key) of colorList" :key="key">
        <div>
          <p><b>色名</b>: {{ item[0] }}</p>
          <ol class="select_color">
            <b>色组：</b>
            <li v-for="(color, index) in item[1].colorArr" :key="index">
              <span :style="{ backgroundColor: color }"></span>
            </li>
          </ol>
        </div>
        <button @click="deleteCurColorList(item[0])">Delete</button>
      </li>
    </ul>
    <div class="localstage_btn" v-show="colorList.size != 0">
      <button @click="setLocalStage">缓 存</button>
      <button @click="deleteLocalStage">清空</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.store {
  position: relative;
  margin-bottom: 20px;
  width: 400px;
  height: 500px;
  transform-origin: top left;

  .color_list_name {
    margin: 25px 0 15px;
    font-size: 1.5rem;
    font-weight: bold;
  }

  ul {
    overflow: auto;
    height: 400px;

    .color_item {
      display: flex;
      padding-left: 15px;
      align-items: center;
      justify-content: space-between;
      font-size: 1rem;
      border-bottom: 1px solid #666;
      b {
        font-weight: bold;
      }
      p {
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
        margin-right: 20px;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
      }
    }

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
  }

  .localstage_btn {
    position: absolute;
    display: flex;
    width: 100%;
    justify-content: end;
    bottom: 0;
    right: 20px;

    button {
      margin-left: 10px;
      padding: 0 10px;
      height: 30px;
      cursor: pointer;
    }
  }
}

@media (max-width: 900px) {
  .store {
    width: 500px;
    .color_item {
      width: 500px;
    }
  }
}
@media (max-width: 600px) {
  .store {
    transform: scale(0.9);
  }
}
@media (max-width: 400px) {
  .store {
    transform: scale(0.85);
  }
}
</style>
