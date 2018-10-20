<template>
  <div>
    <div id="container0"></div>
    <div id="panel"></div>
  </div>
</template>
<script>
export default {
  name: 'PersonInfo',
  mounted () {
    // var map0 = new AMap.Map('container0', {
    //    resizeEnable: true,
    //    center: [116.397428, 39.90923],
    //    zoom:13,
    //   //  viewMode:'3D'
    // });
    // var driving = new AMap.Driving({
    //   map: map0,
    //   panel: "panel"
    // });
    // driving.search([
    //   {keyword: '北京市地震局(公交站)',city:'北京'},
    //   {keyword: '亦庄文化园(地铁站)',city:'北京'}
    // ],function(status, result) {
    //   if (status === 'complete') {
    //       console.log('绘制驾车路线完成')
    //   } else {
    //       console.log('获取驾车数据失败：' + result)
    //   }
    // })
     var map = new AMap.Map("container", {
        center: [116.397559, 39.89621],
        zoom: 14
    });

    var drivingOption = {
        policy: AMap.DrivingPolicy.LEAST_TIME, 
        ferry: 1, // 是否可以使用轮渡
        province: '京', // 车牌省份的汉字缩写 
        map: map,
        panel: 'panel'
    }

    // 构造路线导航类
    var driving = new AMap.Driving(drivingOption)

    // 根据起终点经纬度规划驾车导航路线
    driving.search(new AMap.LngLat(116.379028, 39.865042), new AMap.LngLat(116.427281, 39.903719), function(status, result) {
        // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
        if (status === 'complete') {
            log.success('绘制驾车路线完成')
        } else {
            log.error('获取驾车数据失败：' + result)
        }
    });
  }
}
</script>
<style>
  #container0 {
    /* margin-top: -10px;
    margin-left: -10px; */
    width: 100%; 
    height: 100%;
  }
  #panel {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 100px;
    right: 10px;
    width: 280px;
  }
  #panel .amap-call {
    background-color: #009cf9;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  #panel .amap-lib-driving {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
  }
  .amap-logo {
          display: none;
    } 
  .amap-copyright {
        bottom:-100px;
          display: none;
  }  
</style>
