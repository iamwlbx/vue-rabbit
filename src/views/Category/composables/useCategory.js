//封装分类数据Category业务代码

import { getCategoryAPI } from '@/apis/category'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { onBeforeRouteUpdate } from 'vue-router'
//获取分类数据
export function useCategory() {
  const categoryData = ref({})
  const router = useRoute()
  const getCategory = async (id = router.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }
  onMounted(() => {
    getCategory()
  })
  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
  })
  return {
    categoryData
  }
}