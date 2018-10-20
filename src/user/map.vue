<template>
    <div id="container"></div>
</template>

<script>
import BMap from 'BMap'
export default {
    name: "map",
    mounted() {
    var map = new BMap.Map("container");
    var point = new BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
    var local = new BMap.LocalSearch(map, {
        renderOptions: {map: map, autoViewport: true}
    });
    local.searchNearby("小吃", "前门");
    var myGeo = new BMap.Geocoder();
    myGeo.getPoint("北京市海淀区上地10街10号", function(point){
        if(point){
            map.centerAndZoom(point, 16);
            map.addOverlay(new BMap.Marker(point));
        }
    },"北京市");
    // var transit = new BMap.TransitRoute(map, {
    //     renderOptions: {map: map}
    // });
    // transit.search("王府井", "西单");
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);
    marker.enableDragging();
    marker.addEventListener("dragend", function(e){
        alert("当前位置:" + e.point.lng + "," +e.point.lat);
    })
    // var polyline = new BMap.polyline([
    //     new BMap.Point(116.399, 39.910),
    //     new BMap.Point(116.405, 39.920)
    // ],
    // {strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5}
    // );
    // map.addOverlay(polyline);

    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());
    map.setCurrentCity("广州");
    // var polyline = new BMap.Polyline([
    // new BMap.Point(116.399, 39.910),
    // new BMap.Point(116.405, 39.920)
    // ],
    // {strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5}
    // );
    // map.addOverlay(polyline);
    var traffic = new BMap.TrafficLayer();
    map.addTileLayer(traffic);
    map.enableScrollWheelZoom(true);
    var driving = new BMap.DrivingRoute(map, {
        renderOptions: {
            map: map,    
            autoViewport: true
        }
    });
    driving.search("中关村", "天安门")
    }
    
}
</script>
<style>
    .BMap_cpyCtrl {
        display: none;
    }
    .anchorBL {
        display: none;
    }
</style>
<style scoped>
    html{
        height: 100%
    }
    body{
        height: 100%;
        margin: 0;
        padding: 0;
    }
    #container{
        height: 100%;
        /* margin-top: -10px;
        margin-left: -10px; */
    }
</style>

