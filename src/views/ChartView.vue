<template>
  <el-row justify="center">
    <div ref="chart" style="width: 1200px; height: 500px;margin-top: 100px"></div>
  </el-row>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import request from "@/utils/request";
import * as echarts from 'echarts';

const chart = ref(null);
const queryData = async () => {
  const list = await request.get('/order/all')
  const dateCounts = list.reduce((acc, date) => {
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const dates = Object.keys(dateCounts).sort();
  const counts = dates.map(date => dateCounts[date]);

  initChart(dates, counts);
}

const initChart = (dates, counts) => {
  const myChart = echarts.init(chart.value);
  const option = {
    title: {
      text: 'Daily order number',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: dates
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: counts,
      type: 'line'
    }]
  };
  myChart.setOption(option);
}

onMounted(() => {
  queryData();
})
</script>
