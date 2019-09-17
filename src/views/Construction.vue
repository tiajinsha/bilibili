<template>
    <div class="Construction">
          <van-nav-bar title="项目总体介绍" left-text="wad" fixed >
    <van-icon name="arrow-left" slot="left"  @click="location" />
    </van-nav-bar>
        <div class="video">
             <video preload=Metadata  controls :src="'http://js.vrccn.com/' + list.url"></video>
        </div>
        <div class="box">
            <div style="margin-left:0.2rem;" v-html="list.info"></div>
        </div>
         <fenxiang title="#/Construction"></fenxiang>
        <abc></abc>
    </div>
</template>
<script>
import fenxiang from '../components/fenxiang'
import abc from '../components/text'
export default {
    data(){
        return{
            list:[]
        }
    },
    created(){
        this.msg()
        console.log(window.history)
    },
    methods:{
         location(){
               this.$router.go(-1)
        },
        msg(){
            var url="/getProject"
            this.axios.post(url).then(result=>{
                this.list=result.data.data
            })
        }
    },
    components:{
       fenxiang,
       abc 
    }
}
</script>
<style lang="scss" scoped>
    .Construction{
        .video{
            text-align: center;
            video{
                position: relative;
                 max-width:10rem;
            }
        }
        .box{
             width:90%;
              margin: 0 auto;
            margin-top:0.4rem;
            div{
               margin-top: 0.4rem;
                letter-spacing: 4px;
                font-size: 0.4rem;
                margin-bottom:0.5rem;
                color: #333333;
            }
        }
    }
</style>