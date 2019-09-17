<template>
    <div class="Exhibition">
    <van-nav-bar title="主要设备信息" left-text="wad" fixed >
    <van-icon name="arrow-left
" slot="left"  @click="location" />
    </van-nav-bar>
        <div class="item" v-html="list.info"></div>
         <fenxiang title="#/eqMsg"></fenxiang>
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
    },methods:{
         location(){
               this.$router.go(-1)
        },
        msg(){
            var url="/getEquipment"
            this.axios.post(url).then(result=>{
                this.list=result.data.data
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
    .Exhibition{
        width:90%;
        height:500px;
        margin: 0 auto;
        .item{
            color: #333333;
            font-size:0.4rem;
              text-indent:0.5rem;
             letter-spacing: 4px;
        }
    }
</style>