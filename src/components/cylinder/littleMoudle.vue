<script setup>
/* #region */
// 小菱形块
// const DiamondBlock = (group, rotate, translate, color) => {
//   // 菱形块
//   new Zdog.Shape({
//     addTo: group,
//     path: [
//       { x: 0, y: 0, z: 0 },
//       { x: -25, y: -25, z: 0 },
//       { x: 0, y: -50, z: 0 },
//       { x: 25, y: -25, z: 0 }
//     ],
//     fill: true,
//     rotate,
//     translate,
//     color,
//     stroke: 0
//   })
// }
// // 小半菱形块, 默认是右边的，左边加个旋转
// const HalfDiamondBlock = (group, rotateType, translate, color) => {
//   new Zdog.Shape({
//     addTo: group,
//     path: [
//       { x: 0, y: 0, z: 0 },
//       { x: 25, y: -25, z: 0 },
//       { x: 25, y: 25, z: 0 }
//     ],
//     fill: true,
//     rotate: { y: rotateType == 'right' ? 0 : Zdog.TAU / 2 },
//     translate,
//     color,
//     stroke: 0
//   })
// }
// // 菱形块
// DiamondBlock(redG, null, { x: 0, y: 0, z: 25 + SQ }, '#000')
// DiamondBlock(redG, null, { x: 0, y: 50, z: 25 + SQ }, '#fff')

// // 半菱形块, 默认是右边的，左边加个旋转：rotate: { y: Zdog.TAU / 2 },
// HalfDiamondBlock(redG, 'right', { x: 0, y: -50, z: 25 + SQ }, '#aaa')
// HalfDiamondBlock(redG, 'left', { x: 0, y: -50, z: 25 + SQ }, '#aaa')
/* #endregion */
</script>

<template>
  <div></div>
</template>

<style scoped></style>
