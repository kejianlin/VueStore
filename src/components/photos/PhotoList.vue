<template>
  <div>
		<!-- 借助 MUI 中的tab-top-webview-main.html组件，选取其中的代码, 去掉.mui-fullscreen类 -->
		<!-- 此时滑动条是无法进行正常滑动的，可能是由于 js 没写的原因，去查找官方文档，官方明确写到若需要使用滑动条，要先初始化mui插件 -->
		<!-- 顶部滑动条区域 -->
     <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item',item.id == 0 ? 'mui-active':'']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
							{{ item.title }}
						</a>
					</div>
				</div>
			</div>
				<!-- 图片列表区域 -->
				<ul class="photo-list">
						<router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
							<img v-lazy="item.img_url">
							<div class="info">
								<h1 class="info-title">{{ item.title }}</h1>
								<div class="info-body">{{ item.zhaiyao }}</div>
							</div>
						</router-link>
				</ul>
  </div>
</template>

<script>
// 1. 导入 mui 的js文件
// import mui from '../../lib/mui/js/mui.min.js'
// 注意：在初始化滑动条插件的时候，导入了mui.min.js，但是控制台报错，错误信息为
// Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode
// 错误信息是，在严格模式下，不能使用'caller', 'callee', and 'arguments'这三个属性
// 这个错误可能是mui.min.js中可能用到了'caller', 'callee', and 'arguments'这三个属性，但是bundle.js打包好的js中，默认启用了严格模式，所以冲突了

// 解决方案：
// mui.min.js中不用'caller', 'callee', and 'arguments'这三个属性了，但是肯定不现实
// 修改webpack禁用严格模式，移除严格模式babel-plugin-transform-remove-strict-mode
// 安装
// npm install babel-plugin-transform-remove-strict-mode -S
// 配置 .babelrc
// {
//   "plugins": ["transform-remove-strict-mode"]

export default {
  data() {
    return {
			cates: [],// 所有分类的列表数组
			list: []// 图片列表的数组
		};
  },
  mounted(){
		// 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
    // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
    // 2. 初始化滑动控件
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
	},
	created(){
		this.getAllCategory();
		// 默认进入页面，就主动请求 所有图片列表的数据
		this.getPhotoListByCateId(0);
	},
  methods: {
		getAllCategory(){
			// 获取所有的图片分类
			this.$http.get('api/getimgcategory').then(result => {
				if (result.body.status === 0) {
					// 手动拼接出一个最完整的 分类列表
					result.body.message.unshift({ title:'全部', id:0 });
					this.cates = result.body.message;
				}
			});
		},
		getPhotoListByCateId(cateId){
			// 根据 分类Id，获取图片列表
			this.$http.get('api/getimages/' + cateId).then(result => {
				if(result.body.status === 0){
					this.list = result.body.message;
				}
			})
		}
	}
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.photo-list{
	list-style: none;
	margin: 0;
	padding: 10px;
	padding-bottom: 0;
	li{
		background-color: #ccc;
		text-align: center;
		margin-bottom: 10px;
		box-shadow: 0 0 9px #999;
		position: relative;
		img{
			width: 100%;
			vertical-align: middle;
		}
		img[lazy="loading"] {
			width: 40px;
			height: 300px;
			margin: auto;
		}
		.info{
			color:white;
			text-align: left;
			position: absolute;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.4);
			max-height: 84px;
			.info-title{
				font-size: 14px;
			}
			.info-body{
				font-size: 13px;
			}
		}
	}
}
</style>