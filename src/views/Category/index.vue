<template>

		<div class="container">
			<div class="header">
				<div class="header-main">
					<span>分类</span>
					<span class="btn-search"></span>
				</div>
			</div>
			<div class="border-1px content">
				<div class="left">
					<ul class="list-main">
						<li  @click="activeId = item.id" :class="{active: item.id === activeId}" v-for="item in listMain" :key="item.id">
							<span v-text="item.name"></span>
						</li>
					</ul>
				</div>
				<div class="right">
					<div class="rg-banner">
						<img :src="avatar" alt="">
					</div>
					<div class="rg-main">
						<ul v-if="listSub.length > 0" class="list-sub">
							<li v-for="item in listSub" :key="item.id">
								<router-link to="/list">
									<img :src="item.avatar" alt="">
									<span v-text="item.name"></span>
								</router-link>

							</li>
						</ul>
						<p v-else class="tip">暂无相关分类，敬请期待。。</p>
					</div>
				</div>
			</div>

			<div class="footer">
				<MiNav></MiNav>
			</div>
		</div>

</template>

<script>
	import axios from 'axios';
	import MiNav from '@/components/MiNav';
        export default {
                name: "Category",
	        components: {MiNav},
	        data() {
                        return {
                                listMain: [],
				listSub:[],
	                        activeId: 0,
                                //这里放数据给template
                        };
	        },
	        //计算属性

	        computed: {
                        avatar: function() {
                                return this.activeId ? this.listMain.find(item => item.id === this.activeId).avatar : "";
                        }
	        },
	        watch: {
                        activeId:function(newValue,oldValue){
                                //发送ajax，请求页面的初始数据
                                axios({
                                        url: "/category/list/" + newValue,
                                })
                                        .then(res => {
                                                if(res.status === 200) {
                                                        switch(res.data.code) {
                                                                case 200:
                                                                       this.listSub = res.data.data;
                                                                        break;
                                                                case 199:
                                                                case 401:
                                                                case 404:
                                                                case 500:
                                                                        console.log(res.data.msg);
                                                        }
                                                }else {
                                                        console.log(res.statusText);
                                                }
                                        })
                                        .catch(err => {
                                                console.log(err.message);
                                        });
                        }
	        },
	        created() {
                        //发送ajax，请求页面的初始数据
		        axios({
			        url: "/category/list/0"
		        })
		        .then(res => {
		                if(res.status === 200) {
		                        switch(res.data.code) {
			                        case 200:
			                                this.listMain = res.data.data;
			                                this.activeId = res.data.data[0].id;
			                                break;
			                        case 199:
			                        case 401:
			                        case 404:
			                        case 500:
			                                console.log(res.data.msg);
		                        }
		                }else {
		                        console.log(res.statusText);
		                }
		        })
		        .catch(err => {
		                console.log(err.message);
		        });
	        }
        };
</script>

<style scoped>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.header {
		display: flex;
		flex-shrink: 0;
		height: 12vw;
	}
	.header-main {
		line-height: 7.2vw;
		text-align: center;
		padding: 2.4vw 3.2vw;
	}
	.header-main span {
		display: inline-block;
		font-size: 4.533333vw;

	}
	span.btn-search {
		float: right;

		display: inline-block;
		width: 8vw;
		height: 8vw;
		background-size: 100% 100%;
		/*background-image: url(../images/icon_search.png);*/
	}
	.content {
		flex-grow: 1;
		display: flex;
		overflow: hidden;
		background-color: rgb(246, 246, 246);
	}
	.content::after {
		border: none;
		border-top: 1px solid #ff0000;
		border-bottom: 1px solid #ff0000;
	}
	.left {
		width: 24.8vw;
		flex-shrink: 0;
		overflow: auto;
		background-color: #FFFFFF;
	}
	.left::-webkit-scrollbar { display: none;}
	.right {
		flex-grow: 1;
		padding: 0 2.666666vw;
		/* border-left: 1px solid #b0b0b0; */
		overflow: auto;
	}
	.right::-webkit-scrollbar { display: none;}
	ul.list-main {
		width: 100%;
	}
	ul.list-main li {
		font-size: 3.733333vw;
		color: rgb(119,119,119);
		text-align: center;
		/* background-color: #3DA5FE; */

		height: 13.333333vw;
	}
	ul.list-main li>span {
		border-radius: 3.2vw;
		padding: 1.13vw 2.13vw;
		line-height: 13.333333vw;
	}
	ul.list-main li.active>span {

		color: #fff;
		background-color: rgb(230, 170, 92);
	}
	.rg-banner {
		padding: 2.666666vw 0;
		display: inline-block;
		width: 100%;
		/* height: 20.266666vw; */

	}
	.rg-banner>img {
		width: 100%;
		height: 100%;
		border-radius: 2.133333vw;
	}
	.rg-main {
		width: 100%;
		background-color: #fff;
		border-radius: 2.133333vw;
	}
	ul.list-sub {
		width: 100%;
		font-size: 0;
	}
	ul.list-sub li {
		display: inline-block;
		width: 33.333333%;
		/* height: 26.666666vw; */
		text-align: center;
	}
	ul.list-sub li>a {
		text-align: center;
		display: inline-block;
		width: 100%;
		height: 100%;
		padding: 2.666666vw 3.191489vw 3.191489vw 0;
	}
	ul.list-sub li>a>img {
		background-color: #f8f8f8;
		width: 17.6vw;
	}
	ul.list-sub li>a>span {
		display: block;
		padding-top: 1.6vw;
		font-size: 3.191489vw;
		color: rgb(119,119,119);
	}
	.footer {

		flex-shrink: 0;
		height: 13.333333vw;
	}
</style>