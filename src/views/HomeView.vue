<template>
  <el-container class="layout-container-demo" style="height: 500px">
    <el-header>
      <span class="logo">Self-Service Escort System</span>
      <span class="info">
        <Image class="avatar" :src="userStore.state.avatar"/>
        <span>&nbsp;{{ userStore.state.nickname }} &nbsp;&nbsp;&nbsp;&nbsp;</span>
        <el-button type="primary" class="exit" @click="userStore.actions.logout">Log out</el-button>
      </span>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-scrollbar>
          <el-menu
            active-text-color="#ffd04b"
            background-color="#000"
            text-color="#fff"
            :router="true">
            <el-menu-item v-for="menu in menus" :index="menu.path">
              <el-icon>
                <component :is="menu.icon"/>
              </el-icon>
              <span>{{ menu.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-main>
        <el-scrollbar>
          <RouterView/>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import {UserFilled, Calendar, House, Search, List, PieChart,MapLocation,Avatar} from '@element-plus/icons-vue'
import Image from '@/components/Image.vue'
import {useUserStore} from '@/stores/user';


const userStore = useUserStore();
const menus = [
  {
    path: '/home/center',
    name: 'Personal Center',
    icon: UserFilled,
    role: ['patient', 'escort', 'admin'],
  },
  {
    path: '/home/doctor-management',
    name: 'doctor admin',
    icon: Calendar,
    role: ['admin'],
  },
  {
    path: '/home/office-management',
    name: 'Departmentadmin',
    icon: House,
    role: ['admin'],
  },
  {
    path: '/home/chart',
    name: 'Chart',
    icon: PieChart,
    role: ['admin'],
  },
  {
    path: '/home/escort-booking',
    name: 'Make appointment',
    icon: Search,
    role: ['patient'],
  },
  {
    path: '/home/user-order',
    name: 'Patient Order',
    icon: List,
    role: ['patient'],
  },
  {
    path: '/home/map',
    name: 'Map Navigation',
    icon: MapLocation,
    role: ['patient'],
  },
  {
    path: '/home/ai',
    name: 'AI Doctor',
    icon: Avatar,
    role: ['patient'],
  },
  {
    path: '/home/escort-order',
    name: 'Escorts order',
    icon: List,
    role: ['escort'],
  },
].filter((menu) => menu.role.includes(userStore.state.role))
</script>

<style scoped lang="scss">
.layout-container-demo {
  .el-header, .el-aside {
    position: relative;
    background-color: #000;
    color: white;
  }

  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .el-aside {
    height: calc(100vh - 60px);
  }

  .logo {
    font-size: 26px;
    font-weight: bold;
  }

  .info {
    display: flex;
    align-items: center;
  }
}
</style>
