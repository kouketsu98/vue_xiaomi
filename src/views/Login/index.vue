<template>
	<div>
		账号：<input type="text" v-model="name">
		密码：<input type="password" v-model="pwd">
		<button @click="login">登录</button>
	</div>
</template>

<script>
	import axios from 'axios';
        export default {
                name: "Login",
	        data:function(){
		        return {
		                name: "",
		                pwd: ""
		        };
                },
	        methods: {
			login() {
                                //发送ajax，请求页面的初始数据
                                axios({
	                                method: 'post',
                                        url: "/user/login_pwd",
	                                data: {
	                                        name: this.name,
		                                pwd: this.pwd,
	                                }
                                })
                                        .then(res => {
                                                if(res.status === 200) {
                                                        switch(res.data.code) {
                                                                case 200:
                                                                        sessionStorage.setItem('token',res.data.data);
                                                                        sessionStorage.setItem('userName',this.name);
                                                                        this.$router.replace('/cart');
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
        }
</script>

<style>

</style>