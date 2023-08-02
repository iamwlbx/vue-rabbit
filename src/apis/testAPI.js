import httpInstance from "@/utils/http";

export function getCategory() {
  return httpInstance({//promise对象
    url: 'home/category/head'
  })
}