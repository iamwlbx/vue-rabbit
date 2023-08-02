<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import HomeProduct from './components/HomeProduct.vue'
import HomePannel from './components/HomePannel.vue'
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <HomeProduct />
  <!-- 测试面板组件 -->
  <!-- <HomePannel title="新鲜好物" subTitle="新鲜好物，值得拥有">
    <div>
      新鲜好物插槽部分
    </div>
  </HomePannel>
  <HomePannel title="人气推荐" subTitle="人气推荐，值得拥有">
    <div>
      人气推荐插槽部分
    </div>
  </HomePannel> -->
</template>