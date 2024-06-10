import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useColorListStore = defineStore('colorList', () => {
  const colorList = reactive(new Map())
  let mapId = 1
  // 添加
  const addToColorList = (type, arr) => {
    const key = type + mapId
    console.log(key)
    colorList.set(key, arr)
    mapId++
  }
  // 删除
  const deleteColorList = (key) => {
    colorList.delete(key)
  }
  // 展示
  const showColorList = () => {
    return colorList
  }
  // 获取指定颜色组
  const getColorList = (key) => {
    if (colorList.has(key)) {
      return colorList.get(key)
    }
  }

  return { colorList, addToColorList, deleteColorList, showColorList, getColorList }
})
