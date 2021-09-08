<template>

	<ul class="nav">
		<li class="active"><router-link  to="/home"><i></i><span>首页</span></router-link></li>
		<li><router-link   to="/category"><i></i><span>分类</span></router-link></li>
		<li><router-link   to="/cart"><i></i><span>购物车</span></router-link></li>
		<li><router-link   to="/profile"><i></i><span>个人</span></router-link></li>
	</ul>
</template>

<script>


	export default {
	        name: 'MiNav',

	};
</script>

<style scoped>
	ul.nav {
		display: flex;
		height: 100%;
	}
	ul.nav li {
		display: flex;
		flex-grow: 1;
		flex-basis: 0;

	}
	ul.nav a {
		text-decoration: none;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		font-size: 3.2vw;
	}
	ul.nav i {
		width: 6.4vw;
		height: 6.4vw;
		background-image: url(nav_bg.png);
		background-repeat: no-repeat;
		background-size: 100% auto;
	}
	ul.nav li:nth-child(1) i {background-position: 0% 0%;}
	ul.nav li:nth-child(2) i {background-position: 0% 28.5714%;}
	ul.nav li:nth-child(3) i {background-position: 0% 57.1429%;}
	ul.nav li:nth-child(4) i {background-position: 0% 85.7143%;}
	ul.nav li:nth-child(1) a.active i {background-position: 0% 14.2857%;}
	ul.nav li:nth-child(2) a.active i {background-position: 0% 42.8571%;}
	ul.nav li:nth-child(3) a.active i {background-position: 0% 71.4285%;}
	ul.nav li:nth-child(4) a.active i {background-position: 0% 100%;}
	ul.nav span{
		color: #000000;
	}
</style>