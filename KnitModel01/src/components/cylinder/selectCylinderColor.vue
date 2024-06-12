<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  pureColorArr: Array[String]
})

// v-model颜色数组
let getColorArr = reactive([...props.pureColorArr])

// 可以通过watch去获取历史选择色号
const emit = defineEmits(['selectcolor'])
watch(getColorArr, (getColorArr) => {
  emit('selectcolor', getColorArr)
})
watch(props, (oldval) => {
  getColorArr = oldval.pureColorArr
})
</script>

<template>
  <div class="color_selector_box">
    <div class="cs_btn">
      <p>选色：</p>
    </div>
    <ul class="color_selector">
      <li v-for="(color, index) in getColorArr" :key="index">
        <color-picker
          format="hex"
          shape="square"
          v-model:pureColor="getColorArr[index]"
          disable-alpha
          disable-history
        />
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.color_selector_box {
  margin-top: 10px;
}

.cs_btn {
  display: flex;
  justify-content: space-between;

  p {
    font-size: 16px;
    font-weight: bold;
  }

  button {
    margin: 0 6px 6px;
    width: 65px;
    height: 30px;
    letter-spacing: 1px;
    outline: none;
    background-color: #eeeeee;
    border-radius: 5px;
    border: 1px solid #666;
    box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    /* display: none; */
    &:hover {
      background: #666666;
      color: aliceblue;
    }
  }
}

.color_selector {
  display: flex;
  width: 450px;
  /* height: 66px; */
  flex-wrap: wrap;
  list-style-type: none;
  font-size: 16px;
  /* border: 1px solid #0f0; */

  li {
    width: 40px;
    height: 30px;
    flex-basis: 12.5%;
    /* border: 1px solid #666; */
  }
}
</style>
