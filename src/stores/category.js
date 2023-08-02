import { defineStore } from "pinia";
import { getCategoryAPI } from '@/apis/layout';
import { ref } from 'vue';
export const useCategoryStore = defineStore('category', () => {

  //state数据
  const categoryList = ref([])

  //action方法
  const getCategory = async () => {
    const res = await getCategoryAPI()
    categoryList.value = res.result
  }

  return { categoryList, getCategory }
})