<script setup>
import { userInfoStore } from '@/stores/userStore'
import { useRouter } from 'vue-router';
const userStore = userInfoStore()
const router = useRouter()
const exit = () => {
  userStore.clearUser()
  router.push('/login')
}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 区分登陆状态 -->
        <template v-if="userStore.userInfo.token">
          <!-- 登录状态 -->
          <li><a href="javascript:;"><i class=" iconfont icon-user"></i>{{ userStore.userInfo.account }}</a></li>
          <li> <!-- confirm为点击确认时的事件 -->
            <el-popconfirm title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消" @confirm="exit">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;" @click="$router.replace('/member/order')">我的订单</a></li>
          <li><a href="javascript:;" @click="$router.replace('/member')">会员中心</a></li>
        </template>
        <!-- 非登录状态 -->
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>