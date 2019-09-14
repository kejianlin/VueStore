<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间:{{ photoinfo.add_time | dateFormat }}:</span>
      <span>点击:{{ photoinfo.click }}次</span>
    </p>
    
    <hr>
    <div class="thumbs">
        <vue-preview :slides="list" @close="getThumbs"></vue-preview>
    </div>
    <div class="content">{{ photoinfo.content }}</div>
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
import comment from '../subcomponents/comment.vue';

export default {
  data(){
    return {
      id:this.$route.params.id,
      photoinfo: {},
      list: [] 
    };
  },
  created(){
    this.getPhotoInfo();
    this.getThumbs();
  },

  methods: {
    getPhotoInfo(){
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if(result.body.status === 0){
          this.photoinfo = result.body.message[0];
        }
      });
    },
    getThumbs(){
      this.$http.get('api/getthumimages/' + this.id).then(result => {
        if (result.body.status === 0){
          result.body.message.forEach(item => {
             item.w = 600;
             item.h = 400;
            item.msrc = item.src;
          });
          this.list = result.body.message;
        }
      });
    },
     handleClose() {
      console.log("close event");
    }
  },
  components:{
    'cmt-box': comment
  }
};
</script>

<style lang="scss">
.photoinfo-container{
  padding:3px;
  h3{
    color: #26a2ff;
    text-align: center;
    font-size: 15px;
    margin: 15px 0;
  }
  .subtitle{
    display: flex;
    justify-content: space-between;
    font-size:13px;
  }
  .content{
    font-size:13px;
    line-height: 30px;
  }
  // .photo-info-container {
  //   figure {
  //    margin: 5px 5px;
  //    width: 120px;
  //    height: 120px;
  //    display: inline-block;
  //   }}
   .thumbs{
        display: grid;
        margin: 0px -40px;
        margin-right: -70px;
        margin-top: -10px;
       img{
        //  margin: 10px;
        //  box-shadow: 0 0 8px #999;
          //  width: 25%;
          //  margin-left: 20px;
          //  margin-bottom: 10px;
          //  float: left;
          width: 20%;
          margin-left: 10px;
          margin-bottom: 10px;
          float: left;
       }
    }
}
</style>