<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
// import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Intro</template>
    一个基于 <b>Vue3</b> 和 <b>Zdog</b> 的多股绳结颜色设计工具。
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Tooling</template>
    本项目基于 <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue3</a> 和
    <a href="https://zzz.dog/" target="_blank" rel="noopener">Zdog</a> 实现。<br />
    插件使用：
    <ol>
      <li>
        <a href="https://aesoper101.github.io/vue3-colorpicker" target="_blank" rel="noopener">
          vue3-colorpicker
        </a>
      </li>
      <li>
        <a href="https://github.com/tsayen/dom-to-image" target="_blank" rel="noopener">
          dom-to-image
        </a>
      </li>
    </ol>
    <!-- <br />More instructions are available in <code>README.md</code>. -->
  </WelcomeItem>

  <!-- <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Get official tools and libraries for your project:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, and
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>. If
    you need more resources, we suggest paying
    <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>
    a visit.
  </WelcomeItem> -->

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>
    Github项目地址：<a
      href="https://github.com/Arashitake/knitModel"
      target="_blank"
      rel="noopener"
    >
      knitModel
    </a>
    <br />如果喜欢可以点个star呀 (*°▽°*)╯
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support</template>
    为爱发电系列。
  </WelcomeItem>
</template>

<style lang="less" scoped>
ol {
  li {
    margin-left: 20px;
  }
}
</style>
