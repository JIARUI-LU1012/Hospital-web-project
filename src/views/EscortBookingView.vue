<template>
  <el-form :inline="true" :model="state" class="demo-form-inline">
    <el-form-item label="price(￥)">
      <el-input v-model="state.minPrice" style="width: 100px"/>
      -
      <el-input v-model="state.maxPrice" style="width: 100px"/>
    </el-form-item>
    <el-form-item>
      <el-button  type="primary" :icon="Search" @click="onQuery">Search</el-button>
    </el-form-item>
  </el-form>

  <el-divider />

  <div class="container">
    <el-card v-for="item in state.dataList" class="card-style">
      <template #header>
        <div class="card-header">
          <span class="bold">{{ item.nickname }} ({{ item.gender }})</span>
          <el-button :disabled="item.state === 'Accompaniment'" type="warning" :icon="Plus" @click="onBooking(item)">Appointment</el-button>
        </div>
      </template>

      <div class="card-body">
        <div>
          <Image :src="item.avatar"/>
        </div>
        <div>
          <p>Services：{{ item.service }}</p>
          <p>current state：
            <el-tag :type="calcType(item.state)" effect="dark">{{ item.state }}</el-tag>
          </p>
          <p>Service price：￥<span style="color: red;font-weight: bold;">{{ item.price }}</span></p>
          <p>contact phone：{{ item.phone }}</p>
          <p>CV：{{ item.remark }}</p>
        </div>
      </div>

    </el-card>
  </div>

  <el-dialog v-model="state.dialogVisible" title="Choose a doctor" width="80%">
    <DoctorChooseView :escort="state.chooseEscort" @on-booking="onBookingSuccess"/>
  </el-dialog>
</template>

<script setup>
import {reactive} from 'vue'
import {
  Plus,
  Search,
} from '@element-plus/icons-vue'
import Image from "@/components/Image.vue";
import request from "@/utils/request.js";
import DoctorChooseView from "@/views/DoctorChooseView.vue";

const state = reactive({
  minPrice: 0,
  maxPrice: 200,
  dialogVisible: false,
  chooseEscort: null,
  dataList: [],
})

const onQuery = async () => {
  state.dataList = await request.get(`/user/escort/list?minPrice=${state.minPrice}&maxPrice=${state.maxPrice}`)
}
onQuery()

const onBooking = (row) => {
  state.dialogVisible = true
  state.chooseEscort = row
}

const onBookingSuccess = () => {
  state.dialogVisible = false
  onQuery()
}

const calcType = (state) => {
  switch (state) {
    case 'free':
      return 'success'
    case 'Reservations are underway':
      return 'warning'
    case 'Appointment':
      return 'danger'
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  .card-style {
    width: 450px;
    height: 320px;
    padding: 20px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;

    .bold {
      font-weight: bold;
    }
  }

  .card-body {
    display: flex;

    img {
      width: 130px;
      height: 100%;
      margin-right: 10px;
    }

    p {
      margin-bottom: 4px;
    }
  }
}
</style>
