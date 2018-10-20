<template>
    <el-row class="wrap">
        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>首页</b></el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        
        <el-col :span="24" class="warp-main">
            <section class="chart-container">
                <el-row>
                    <el-col :span="8">
                        <el-card :body-style="{ padding: '0px' }">
                        <img src="../assets/images/forest.png" class="image">
                        <div style="padding: 14px;">
                            <span class="cardTitle">一个例子而已</span>
                            <div class="bottom clearfix">
                            <time class="time">{{ currentDate | formatDate}}</time>
                            </div>
                        </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card :body-style="{ padding: '0px' }">
                        <img src="../assets/images/sunrise.png" class="image">
                        <div style="padding: 14px;">
                            <span>我是一张卡片</span>
                            <div class="bottom clearfix">
                            <time class="time">{{ currentDate | formatDate }}</time>
                            </div>
                        </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card :body-style="{ padding: '0px' }">
                        <img src="../assets/images/sunshine.png" class="image">
                        <div style="padding: 14px;">
                            <span>快乐生活每一天</span>
                            <div class="bottom clearfix">
                            <time class="time">{{ currentDate | formatDate}}</time>
                            </div>
                        </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="chart" id="chartmainline"></div>
                    </el-col>
                    <el-col :span="12">
                        <div class="chart" id="charthoritialline"></div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="chart" id="chartzheline"></div>
                    </el-col>
                    <el-col :span="12">
                        <div class="chart" id="chartbing"></div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <a href="http://echarts.baidu.com/examples.html" target="_blank" style="float: right;">more>></a>
                    </el-col>
                </el-row>
            </section>
        </el-col>
    </el-row>
</template>

<script>
import {formatDate} from '@/components/common/date.js'
export default {
  data () {
      return {
        name: 'DashBoard',
        currentDate: new Date(),
        optionline:{
            xAxis: {
                type: 'category',
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [5, 20, 35, 10, 10, 20],
                type: 'bar'
            }]
        },
        horitialline:{
            title: {
                text: '世界人口总量',
                subtext: '数据来自网络'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['2011年', '2012年']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
            },
            series: [
                {
                    name: '2011年',
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 630230]
                },
                {
                    name: '2012年',
                    type: 'bar',
                    data: [19325, 23438, 31000, 121594, 134141, 681807]
                }
            ]
        },
        zheline:{
            title: {
                text: '折线图堆叠'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '直接访问',
                    type: 'line',
                    stack: '总量',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '搜索引擎',
                    type: 'line',
                    stack: '总量',
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        },
        bing:{
            title : {
                text: '某站点用户访问来源',
                subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data: [
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
      }
  }, 
  filters: {
       formatDate(time){
            let date = new Date(time);
            return formatDate(date,'yyyy-MM-dd hh:mm');
       }
  },
  mounted(){
        this.drawLine()
        console.log(new Date())
        // console.log(formatDate(new Date()))
    },
    methods:{
         formatDate:function (a) {  
            var y = a.getFullYear();  
            var m = a.getMonth() + 1;  
            m = m < 10 ? '0' + m : m;  
            var d = a.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            return y + '-' + m + '-' + d;  
        },
        drawLine:function(){
            let chartmainline = this.$echarts.init(document.getElementById("chartmainline"));
            let charthoritialline = this.$echarts.init(document.getElementById("charthoritialline"));
            let chartzheline = this.$echarts.init(document.getElementById("chartzheline"));
            let chartbing = this.$echarts.init(document.getElementById("chartbing"));

            chartmainline.setOption(this.optionline);
            charthoritialline.setOption(this.horitialline);
            chartzheline.setOption(this.zheline);
            chartbing.setOption(this.bing);

            window.onresize = function(){
                chartmainline.resize();
                charthoritialline.resize();
                chartzheline.resize();
                chartbing.resize();
            }
        },
        
    }
}
</script>

<style lang="scss" scoped>
    .chart-container .el-col{
        padding: 30px 20px;
        text-align: left;
    }
    .image{
        width: 100%;
        display: block;
    }
    .time{
        font-size: 13px;
        color: #999;
        padding-top: 10px;
        display: inline-block;
    }
    .chart{
        width: 100%;
        height:600px;
    }
    .el-card {
        font-size: 16px;
        color: #000000;
    }
</style>