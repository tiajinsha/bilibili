<template>
    <div style="width:10rem;">
        <div style="margin-top:-40px;" class="index">
        <img  src="../assets/img/矩形 10.png" alt="">
        </div>
        <div class="firstView">
            <div class="endView">
                <div class="lastView">
                    <p>广州轨道交通十二号及同步实施工程</p>
                    <p>内容大学城北站（不含）~大学城南停车场</p>
                </div>
            </div>
        </div>
        <div class="mapDiv">
         <baidu-map  :center="center" :zoom="zoom" @ready="handler" class="map"></baidu-map>
        </div>
     <scoll></scoll>
     <fenxiang></fenxiang>
    </div>
</template>
<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import fenxiang from '../components/indexFenxiang'
import scoll from '../components/scoll'
export default {
    data(){
        return{
            center: {lng: 0, lat: 0},
            zoom: 3
        }
    },
    created(){
         this.$store.commit("showBar")
/*         alert(window.screen.width)
        alert(window.screen.height)  */
        //创建地图实例
        var map = new BMap.Map("allmap", {enableMapClick:false})
        this.postGet()
    },
    methods:{
        postGet(){
            var url="/getNews"
            var obj={token:1}
            this.axios.post(url,{params:obj}).then(result=>{
            })
        },
        handler ({BMap, map}) {
        //坐标
           this.center.lng = 113.4023732964
           this.center.lat = 23.0578019388
           this.zoom = 15
            /* 清除滚动 */
           map.disableDragging();
           map.disableDoubleClickZoom()
           map.disablePinchToZoom()
      }
    },
    mounted(){

  },
    components: {
    BaiduMap,
     fenxiang,
       scoll
  }
  }
</script>
<style lang="scss" scoped>
.mapDiv{
    height: 12rem;
    position: fixed;
    opacity: 0.6;
    top:4.79rem;
    width: 10rem;  
    .map{
        width: 100%;
  height:17rem;
  margin-top: -0.1rem;
      }
}
.index{
    position: fixed;
    top: 40px;
    z-index: 99;
    img{
        width: 100%;
       }
    }

.firstView{
    width: 9rem;
    max-height:75px;
    background:rgba(1,88,159,1);
    border-radius:12px;
    position:fixed;
    text-align: center;
    left:0.45rem;
    z-index: 100;
    top:4rem;
    .endView{
       border:2px solid rgba(255,255,255,1);
       border-radius:8px;
        max-height:57;
        width: 95%;
        margin: 0.1rem auto;
        .lastView{
            p:nth-child(1){
                font-weight: bold;
                font-size:15px;
                color:#FFFFFF;
                font-family: PingFang-SC-Bold;
                margin-top: 0.05rem;
            }
            p:nth-child(2){
                font-size:10px;
                font-family: PingFang-SC-Bold;
                color:#FFFFFF;
                 margin-bottom: 0.1rem;
            }
        }
    }
}
</style>