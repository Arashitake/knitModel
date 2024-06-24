<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  pureColorArr: Array[String]
})

// v-model颜色数组
let getColorArr = reactive([...props.pureColorArr])

// 可以通过watch去获取历史选择色号
const emit = defineEmits(['selectcolor'])

watch(
  () => getColorArr,
  (getColorArr) => {
    emit('selectcolor', getColorArr)
  },
  { deep: true }
)

watch(
  () => props.pureColorArr,
  (oldval) => {
    getColorArr = oldval
  },
  { deep: true }
)
</script>

<template>
  <div class="color_selector_box">
    <p>选色：</p>
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

<style scoped>
.color_selector_box {
  margin-top: 10px;
}

.color_selector_box > p {
  font-size: 16px;
  font-weight: bold;
}

.color_selector {
  display: flex;
  width: 450px;
  /* height: 66px; */
  flex-wrap: wrap;
  list-style-type: none;
  font-size: 16px;
  /* border: 1px solid #0f0; */
}

.color_selector li {
  width: 40px;
  height: 30px;
  flex-basis: 12.5%;
  /* border: 1px solid #666; */
}
</style>
