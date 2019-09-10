<template>
    <div class="Exhibition">
          <van-nav-bar title="党建引领" left-text="wad" fixed >
          <van-icon name="cross" slot="left"   @click="location" />
          </van-nav-bar>
     <div v-html="list.info"></div>
      <fenxiang></fenxiang>
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
               this.$router.push("/")
        },
        msg(){
            var url="/getParty"
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
        div{
                color: #333333;
                font-size: 0.4rem;
        }
    }
</style>