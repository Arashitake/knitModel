import domToImage from 'dom-to-image'

// 筛选节点（八股辫：圆八股和方八股）
const filter8Node = (node) => {
  return (
    node.className !== 'btn_list' &&
    node.className !== 'out_btn' &&
    node.className !== 'zoom-3btn' &&
    node.className !== 'color_selector_box'
  )
}
// 导出png图片
export const captureNodeToPNG = (node, picName) => {
  if (node) {
    domToImage
      .toPng(node, {
        height: 640,
        filter: filter8Node,
        cacheBust: true
      })
      .then((dataUrl) => {
        // 输出图片的Base64，下载到PC
        const a = document.createElement('a') // 生成一个a元素
        const event = new MouseEvent('click') // 创建一个点击事件
        a.download = picName // 设置图片名称
        a.href = dataUrl
        a.dispatchEvent(event) // 触发a的单击事件
      })
      .catch((error) => {
        console.error('Something went wrong!', error)
      })
  }
}
