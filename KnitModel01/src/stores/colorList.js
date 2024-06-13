import { reactive } from 'vue'
import { defineStore } from 'pinia'
import cloneDeep from 'lodash/cloneDeep'
import LS from '@/stores/localStorage'

export const useColorListStore = defineStore('colorList', () => {
  const isHasData = LS.findVal('colorList')
  const localStorageData = new Map(LS.getVal('colorList'))

  const colorListMap = reactive(isHasData ? localStorageData : new Map())
  let squareId = 1,
    cylinderId = 1
  // 添加
  const addToColorList = (type, arr) => {
    const isHasThisType = Array.from(colorListMap.keys()).some((key) => key.includes(type))
    if (!isHasThisType) {
      type == 'square' ? (squareId = 1) : (cylinderId = 1)
    }
    const key = type + (type == 'square' ? squareId : cylinderId)
    colorListMap.set(key, {
      nickName: key,
      colorArr: cloneDeep(arr)
    })
    type == 'square' ? squareId++ : cylinderId++
  }
  // 删除
  const deleteColorList = (key) => {
    colorListMap.delete(key)
    LS.setVal('colorList', Array.from(colorListMap))
  }
  // 展示
  const showColorList = () => {
    return colorListMap
  }
  // 展示颜色组的key列表
  const showColorKeyList = () => {
    return Array.from(cloneDeep(colorListMap.entries()))
  }
  // 获取指定颜色组
  const getColorList = (key) => {
    if (colorListMap.has(key)) {
      return cloneDeep(colorListMap.get(key).colorArr)
    }
  }
  // 清空
  const clearColorList = () => {
    colorListMap.clear()
  }
  return {
    colorListMap,
    addToColorList,
    deleteColorList,
    showColorList,
    showColorKeyList,
    getColorList,
    clearColorList
  }
})
