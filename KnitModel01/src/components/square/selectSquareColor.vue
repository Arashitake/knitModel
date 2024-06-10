<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  pureColorArr: Array[String]
})

// v-model颜色数组
const [color1, color2, color3, color4, color5, color6, color7, color8] = [
  ref(props.pureColorArr[0]),
  ref(props.pureColorArr[1]),
  ref(props.pureColorArr[2]),
  ref(props.pureColorArr[3]),
  ref(props.pureColorArr[4]),
  ref(props.pureColorArr[5]),
  ref(props.pureColorArr[6]),
  ref(props.pureColorArr[7])
]

const getColorArr = reactive([
  color1.value,
  color2.value,
  color3.value,
  color4.value,
  color5.value,
  color6.value,
  color7.value,
  color8.value
])
// 可以通过watch去获取历史选择色号
const emit = defineEmits(['selectcolor'])

watch(getColorArr, (getColorArr) => {
  // console.log('getColorArr: ', getColorArr)
  emit('selectcolor', getColorArr)
})
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
