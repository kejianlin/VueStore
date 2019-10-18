
<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容（最多吐槽120字）" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
        <div class="cmt-title">
          第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
        </div>
        <div class="cmt-body">
          {{ item.content ===""?"此用户很懒，嘛都没说": item.content  }}
        </div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>

import { Toast } from "mint-ui";
// 为加载更多按钮，绑定click事件
// 当点击时，让 pageIndex++，然后调用一下 this.getComments() 方法获取最新一页的数据
export default {
  data(){
    return {
      pageIndex:1,// 默认展示第一页数据
      comments: [],// 所有的评论数据
      msg: "" // 评论输入的内容
    };
},
created() {
  this.getComments();
},
methods: {
  getComments(){
     this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
    .then(result => {
      if (result.body.status === 0) {
         // this.comments = result.body.message;
            // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
          this.comments = this.comments.concat(result.body.message)
      } else {
        Toast('获取评论失败！')
      }
    });
  },
  getMore(){
    // 加载更多
    this.pageIndex++;
    this.getComments();
  },
  postComment(){
    // 校验是否为空内容
    if (this.msg.trim().length === 0) {
      return Toast("评论内容不能为空！");
    }

      // 发表评论
      // post请求：
      // 参数1： 请求的URL地址
      // 参数2： 提交给服务器的数据对象 { content: this.msg }
      // 参数3： 定义提交时候，表单中数据的格式  { emulateJSON:true } 由于考虑到post请求在整个项目中有很多，所以把数据格式全局配置 application/x-www-form-urlencoded
   this.$http
        .post("api/postcomment/" + this.$route.params.id, {
          content: this.msg.trim()
        })
      .then(function(result) {
          if (result.body.status === 0) {
            // 1. 拼接出一个评论对象
            var cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.comments.unshift(cmt);
            this.msg = "";
          }
    });
  }
},
  props:["id"]
}
</script>

<style lang="scss" scoped>
.cmt-container{
  h3{
    font-size: 18px;
  }
  textarea{
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

.cmt-list{
  margin: 5px 0;
  .cmt-item{
    font-size: 13px;
    .cmt-title{
      line-height:30px;
      background-color: #ccc;
    }
    .cmt-body{
      line-height: 35px;
      text-indent: 2em;
      }
    }
  }
}
</style>
 <!-- 双向数据绑定
 绑定事件（发表评论按钮）
 校验评论区域内容是否为空，如果为空，则提示用户评论内容不能为空，若校验通过，通过 vue-resource 把评论内容提交到服务器
 当发表评论OK后，则重新刷新列表，以查看最新的评论
 如果调用 getComments 重新刷新列表，只能得到当前评论的最后一页，得不到第一页的评论，而我们的需求是要刷新出来第一页的评论，因为发表评论之后应该刷新从第一页开始，这样才能看到最新的评论
 换一种思路：当评论成功后在客户端手动拼接出一个最新的评论对象，然后调用数组的 unshift 把最新的评论追加到 data 中 comments 的最前面，这样就达到需求了 -->