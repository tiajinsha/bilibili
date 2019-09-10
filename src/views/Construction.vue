<template>
    <div class="Construction">
          <van-nav-bar title="项目总体介绍" left-text="wad" fixed >
    <van-icon name="cross" slot="left"  @click="location" />
    </van-nav-bar>
        <div class="video">
             <video  controls :src="'http://js.vrccn.com/' + list.url"></video>
        </div>
        <div class="box">
            <div v-html="list.info"></div>
        </div>
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
    },
    methods:{
         location(){
               this.$router.push("/")
        },
        msg(){
            var url="/getProject"
            this.axios.post(url).then(result=>{
                this.list=result.data.data
                console.log(result.data.data)
            })
        }
    },
    components:{
     /*   touchBar, */
       fenxiang,
       abc 
    }
}
</script>
<style lang="scss" scoped>
    .Construction{
        .video{
            video{
                position: relative;
                width: 100%;
            }
        }
        .box{
            width: 90%;
            margin: 0 auto;
            margin-top:0.4rem;
            div{
               margin-top: 0.4rem;
                text-align: left;
                text-indent:0.5rem;
                letter-spacing: 4px;
                line-height: 19px;
                font-size: 0.4rem;
                margin-bottom:0.5rem;
                color: #333333;
            }
        }
    }
</style>