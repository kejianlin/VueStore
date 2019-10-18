<template>
  <div>
 	<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
					<!-- router-link改造
          把列表中的每一项改为router-link,同时在跳转的时候应该提供唯一的Id标识符
          注意：由于这里需要提供id，所以需要拼接字符串，将to当做变量来处理，前面加:绑定 -->
          <router-link :to="'/home/newsinfo/' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{ item.title }}</h1>
							<p class='mui-ellipsis'>
                <!-- 在组件的时间item.add_time后面加上管道符|并跟上定义的过滤器dateFormat,表示使用dateFormat过滤器规则过滤item.add_time，这样输出结果就是我们想要的了 -->
                <span>发表时间：{{ item.add_time | dateFormat }}</span>
                <span>点击：{{item.click}}次</span>
              </p>
						</div>
					</router-link>
				</li>
			</ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data(){
    return {
      newslist: []// 新闻列表
    };
  },
  created(){
    this.getNewsList();
  },
  methods:{
    getNewsList() {
      // 获取新闻列表
      this.$http.get("api/getnewslist").then(result => {
        if (result.body.status === 0) {
          // 如果没有失败，应该把数据保存到 data 上
          this.newslist = result.body.message;
        } else {
          Toast('获取新闻列表失败！')
        }
      });
    }
  }
};
</script>

<style lang="less" Scope>
.mui-table-view{
 li{
   h1{font-size: 14px;}
   .mui-ellipsis{
    font-size: 12px;
    color:#226aff;
    display: flex;
    justify-content: space-between;
    }
  } 
}
</style>