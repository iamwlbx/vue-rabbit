<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import GoodsItem from '@/views/Home/components/GoodsItem.vue'

const subcategoryData = ref({})
const route = useRoute()
const getSubcategory = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  // console.log(res)
  subcategoryData.value = res.result
}
onMounted(() => {
  getSubcategory()
})

//获取接口列表数据
const goodList = ref([])
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const getgoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  goodList.value = res.result.items
}
onMounted(() => {
  getgoodList()
})

const tabChange = () => {
  reqData.value.page = 1
  getgoodList()
}
const disabled = ref(false)
//监听事件

const load = async () => {
  //获取下一页数据
  reqData.value.page++  //页数+1，向服务器请求下一页数据
  const res = await getSubCategoryAPI(reqData.value)
  goodList.value = [...goodList.value, ...res.result.items] //新老数据进行拼接
  if (res.result.items.length === 0) {
    disabled.value = true
  }
}

</script>

<template>
  <div class="container ">
    <!-- 二级面包屑导航 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${subcategoryData.parentId}` }">{{ subcategoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ subcategoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- v-infinite-scroll 用于判断是否已经到达底部-->

        <!-- 商品列表-->
        <GoodsItem v-for="item in goodList" :goods="item" :key="item.id" />
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>