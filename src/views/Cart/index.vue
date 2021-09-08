<template>
	<div class="container">
		<template v-if="list.length > 0">
			<span @click="mode = !mode"  v-text="mode ? '完成' : '编辑' "></span>
			<ul >
				<li v-for="item in list" :key="item.id">
					<input  v-model="item.checked1" type="checkbox" v-show="!mode">
					<input  v-model="item.checked2" type="checkbox" v-show="mode">
					<h4 v-text="item.name"></h4>
					<p>￥<span v-text="item.price"></span>.00</p>
					<button :data-id="item.id" class="btn-decrease" :disabled="item.count === 1">-</button>
					<span v-text="item.count"></span>
					<button :data-id="item.id" class="btn-increase" :disabled="item.count === 10">+</button>
					<p>小计：￥<span v-text="item.count * item.price"></span>.00</p>
				</li>
			</ul>
			<!--普通状态-->
			<div v-show="!mode">
				<input v-model="isCheckedAll" type="checkbox">全选
				<p>合计：￥<span v-text="total"></span>00元</p>
				<button :disabled="amount === 0">
					结算 <span v-show="amount !== 0" v-text="`(${amount})`"></span>
				</button>
			</div>
			<!--编辑状态-->
			<div v-show="mode">
				<input v-model="isCheckedAll" type="checkbox">全选
				<button>删除</button>
			</div>
		</template>

		<div v-else>
			<p>您的购物车为空</p>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
        import MiNav from '@/components/MiNav';
	export default {
	        name: "Cart",
                components: {MiNav},
		data() {
	                return {
	                        mode: false,
		                list: []
	                };
		},
		computed: {
	                total() {
				var total = 0;
				this.list.forEach(item => {
				        if(item.checked1) total += item.count * item.price;
				});
				return total;
	                },
			amount() {
				var amount = 0;
				this.list.forEach(item => {
				        if(item.checked1) amount += item.count;
				});
				return amount;
			},
			isCheckedAll: {
	                        get() {
	                                return this.list.every(item => item[this.mode ? 'checked2' : 'checked1']);

	                        },
				set(value) {
	                                this.list.forEach(item => item[this.mode ? 'checked2' : "checked1"] = value);
				}
			}
		},
		created() {
                        axios({
	                        method: "post",
                                url: "/cart/list" ,
	                        headers: {Authorization: sessionStorage.getItem('token')}
                        })
                                .then(res => {
                                        if(res.status === 200) {
                                                switch(res.data.code) {
                                                        case 200:
                                                                res.data.data.forEach(item => {
                                                                   item.checked1 = false;
                                                                   item.checked2 = false;
                                                                });
                                                               this.list = res.data.data;
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

</style>