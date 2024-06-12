import { reactive } from 'vue'
import { defineStore } from 'pinia'
import cloneDeep from 'lodash/cloneDeep'

export const useColorListStore = defineStore('colorList', () => {
  const colorListMap = reactive(new Map())
  let squareId = 1,
    cylinderId = 1
  // 添加
  const addToColorList = (type, arr) => {
    const isHasThisType = Array.from(colorListMap.keys()).some((key) => key.includes(type))
    if (!isHasThisType) {
      type == 'square' ? (squareId = 1) : (cylinderId = 1)
    }
    const key = type + (type == 'square' ? squareId : cylinderId)
    colorListMap.set(key, cloneDeep(arr))
    type == 'square' ? squareId++ : cylinderId++
  }
  // 删除
  const deleteColorList = (key) => {
    colorListMap.delete(key)
  }
  // 展示
  const showColorList = () => {
    return colorListMap
  }
  // 展示颜色组的key列表
  const showColorKeyList = () => {
    return Array.from(cloneDeep(colorListMap.keys()))
  }
  // 获取指定颜色组
  const getColorList = (key) => {
    if (colorListMap.has(key)) {
      return cloneDeep(colorListMap.get(key))
    }
  }

  return {
    colorListMap,
    addToColorList,
    deleteColorList,
    showColorList,
    showColorKeyList,
    getColorList
  }
})
