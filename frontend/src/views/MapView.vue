<template>
  <div class="map">
    <div ref="mapContainer" style="width: 100%;height: 100%;"></div>
    <div class="search-box">
      <el-form :inline="true" @submit.prevent="handleSearch">
        <el-form-item>
          <el-input v-model="destination" placeholder="Please input place..."></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">Search</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader';

const mapContainer = ref();
const destination = ref('');
const map = ref()
const placeSearch = ref()

const handleSearch = () => {
  if (destination.value) {
    placeSearch.value.search(destination.value, function(status, result) {
      if (status === 'complete' && result.info === 'OK') {
        if (result.poiList && result.poiList.pois.length > 0) {
          const firstPoi = result.poiList.pois[0];
          map.setZoomAndCenter(15, [firstPoi.location.lng, firstPoi.location.lat]);
        }
      }
    });
  }
}


// https://lbs.amap.com/api/javascript-api-v2/tutorails/display-a-map
onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: "6dfb1e7a885c38cfaf634757613ec776", // YOUR SECURITY JS CODE
  };
  AMapLoader.load({
    key: 'a41b8f92686a636382aac915cde520b0', // API Key
    version: '2.0',
  }).then((AMap) => {
    map.value = new AMap.Map(mapContainer.value, {
      zoom: 11,
      center: [116.397428, 39.90923]
    });

    // load plugin
    AMap.plugin('AMap.ToolBar',function(){
      var toolbar = new AMap.ToolBar();
      map.value.addControl(toolbar);
    });

    AMap.plugin('AMap.PlaceSearch', function() {
      placeSearch.value = new AMap.PlaceSearch({
        city: '全国',
        map: map.value
      });
    });
  }).catch(e => {
    console.error(e);
  });
})
</script>

<style scoped lang="scss">
.map {
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
  .search-box {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 4px;
  }
}
</style>
