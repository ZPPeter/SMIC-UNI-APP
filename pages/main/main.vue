<template>
    <view>
		<view class="flex-item-0">
					<text class="iconfont icon-earth2 font-fize2">字体图标</text>
					<text class="yticon icon-shoucang font-fize2"/>					
					<icon type="info" size="18" color="red"/> 不支持 H5
		</view>
				<view>
					您好：<text class="username">{{ userInfo.realname || '游客' }}</text>
				</view>
			</view>
	</view>
</template>

<script>
	var bitmap = null;
import { mapState } from 'vuex';
export default {
	data() {
		return {
		}
	},
	computed: mapState(['hasLogin', 'userInfo']),
	methods: {
		createtab: function() {
			// 设置水平居中位置
			var _this = this;
			var leftPos = Math.ceil((plus.screen.resolutionWidth - 60) / 2);
			var view = new plus.nativeObj.View('icon', {
				bottom: '5px',
				left: leftPos + 'px',
				width: '60px',
				height: '60px'
			});
			view.drawBitmap(bitmap, {
				tag: 'font',
				id: 'icon',
				//src: '/static/img/q2.png',
				position: {
					top: '0px',
					left: '5px',
					width: '50px',
					height: '100%'
				}
			});			
			view.addEventListener(
				'click',
				function(e) {
					if(!_this.$store.state.hasLogin){
						//uni.showToast({
						//	icon:'none',
						//	title: '尚未登录,无法扫描'
						//});
						_this.$Router.push({ name: 'login' });
					} else {

		if (uni.getSystemInfoSync().platform === 'android') {
			var icon = plus.nativeObj.View.getViewById('icon');
			if (icon) {
				setTimeout(function() {
					icon.hide();
				}, 100);
			}
		}

						uni.scanCode({
							success: res => {
								//console.log(res.result);
								uni.showToast({
									icon:'none',
									title: res.result
								});
		if (uni.getSystemInfoSync().platform === 'android') {
			var icon = plus.nativeObj.View.getViewById('icon');
			if (icon) {
				setTimeout(function() {
					icon.show();
				}, 100);
			}
		}
								
								
							}
						});
						//uni.switchTab({ // 不走路由
						//	url: '/pages/scan/scan' //大按钮点击事件
						//});
					}
				},
				false
			);
			view.show();
		}
	},
	onLoad: function(e) {
		//console.log(this.hasLogin)
		if (uni.getSystemInfoSync().platform === 'android') {
			bitmap = new plus.nativeObj.Bitmap('bmp1');
			//bitmap.load('static/tab_icon_1.png', function() {}, function(e) {}); //普通写法;

			//兼容ios端需要执行下面的代码
			bitmap.loadBase64Data(
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAYAAADGWyb7AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAE8FJREFUeJztnXtwleWdxz/vueZ+IYQASUi4BN1gsFq1smCdHcHSCuuFdXe6lLVqURlZXddLdxxm1S3TKtZ142WAUh1dS9ut0q4oW0dwd1BYW6GCIWTVYBLJhZAQScj1XN/943eSnJyc817ONQl8ZjLD8L7v8zzv73ue97n9fs8DF5iUKKkuQBRYgSwgE8gA0oE0wAk4AHvgHkvgfj/gAzyAG3ABQ8AgMAD0A32Be5KOqqqm7lcUkcwWbQLJQlEUJ5AX+MtZunTpRRs2bPhaZWVlxYwZM0qysrKmO53ObJvNlm6xWGwWi8XK+B+k6vf7fX6/3+v1egddLldvX1/fmY6Ojpa6urr6rVu3Hj148OBnwDmgG+hWVdWV3Dc1x8gLTiThFEXJBAqAgnvvvXfZ2rVrl86bN29Rbm5usdPpzFEUxRrP/FRV9blcrnM9PT2tDQ0Nx3fu3HnwxRdfPAB0AV2qqvbHM79YGK5xE0Y4RVHswAyg8Jlnnrlx1apV1xYXF1dmZGRMj7dQeqiq6hsYGDjT2tpa9/bbb+9/8MEH3wQ6gQ5VVT3JLEsow8KNoKpqSv6Q9mr+qlWrbj969Oju3t7eVr/f71MnCH6/39fb29t69OjR3atWrbodmA9kqamzV2qFA7KBi6qrqx9rbm4+5PF4+uNl7ETh8Xj6m5ubD1VXVz8GXARkq+eLcEgvsGLbtm2b29vbj/l8Pnc8jZsMfD6fu729/di2bds2AxVAujqVhQNKN23a9FBra+vHk1GwUHw+n7u1tfXjTZs2PQSUqlNNOCDf4XDcWFdXt9ftdvfF34Spxe1299XV1e11OBw3AvlqEoQz16usdejfE4JS5SnbtWvXQytWrLg5Ozu72HQC4XDVQ/8+GDgM7hPgbQNfD/gHQfUgY+5gLKDYwZIO1lywzQbHAsi4AjKXg7MiLsXq7e1t3bt37+/WrFnzU/WY/cuoErnErXk5+uGAQfGUKk8WMLe+vv6FuXPnXm21Ws2rPoznJJx9Ffr3g+tT8HWBGqeJDsUK1gJwXgyZ10L+bWCfE3VyPp/P3djY+IeKioqNQKN6zN5n+GEd0SDBwilVnqItW7asX79+/R15eXlzjSUcgrcDup6D3nfA9TmoQ1ElYxolDZwLIXslFNwHthlRJdPd3d24Y8eOlx955JEd6jH7ad0HDIgGsQ7ANcRTqjxl+/bte2zZsmW3OJ3OXOOJBjj3FpzdAQMfyucvlVhzIWMJ5K+HnNWmH3e5XD0HDhz47fLly5/Q/HQaFA0SIJxS5VGABTU1NdWVlZXXmf40dr8GXdth6EignZpAKHZIuwwK7oa8daYe9fl87rq6uvcWL158P3BCPWYfb+hUCadUeWxARUNDw47y8vIliqJYwj8Yht490Pk0DH4Eqtd4GVKBYoP0q6DwYci+wfBjqqr6m5qaPpw3b956oF49Zh99UROiQRyFU6o8dmBhc3PzKyUlJVcYTsPbAafulzbMP2HmcI1hyZQ2cFa1qTawpaXlcGlp6feBz9VjdvmsJFU4gFoHSpXHClzc2tr62uzZsy8z/GzXC9BVDe7oeswTBkcZFNwPBRsNP9LW1nakuLh4LfCZqqqh4xZd4rI6oCjK3Obm5l+XlJRcZewJPzSvlQ6Iau6XNmFRHNJxKd3J6NqtNi0tLXtKS0v/WlXVAdPZBYQz3hYFU+tAUZTshoaGH5WUlFxp6Jn+D+DEN6Bn19QRDeRdenbJu/V/YOiJkpKSmQ0NDfZYso1KOKXKo9TU1FxTXl6+xNADZ1+G5u/B0CfRZDc5GPpE3vHsy3p3+oGO8vJy07UtmKiE27dvX1ZlZeXXFUXJQc9vpfPH0P5D8J6KJqvJhfeUvGvnj7XuUoFuRVFiGvPY9G8Zz7Jly+ZYrdaFiLNOZE5vko6IP6Yf1+TC1wOdW+SdizaHu0NFnJZiwnSN6+7utjqdzgpgIeJVFZ7Tm+DMc+eXaMP4B+TdT2+KdEf087YBTAuXl5c3A7gcmIO4wY2n88dS05I1vzgRUYfEBuM/mxbEYy15nROfz2cDFgN/DuQTrn07+zKcefb8rGmh+AfEFmM7LApQiIgXNaaEs1qtZcByYBHhqnv/B3D6idRPDk8kfD1ik9GhggUoQnxWosaMcNOB6xHhChhX2/xw6h/Pj96jWbynxDajC7z5wDWxJGlIOI/Hk4cIdgviHDP++9y8dmqP02Jl6BOxkZAO/AXimhgVusK1tbXl2e32lcA64ErCDQG6XpBprAtoc+4tsZV06qoA84t8ATSF2759e/rMmTNXA3cAS4HxA25vh0wYT6VprEShusVW3g6Q5uZ7RNlJ0RTupptuKrZYLNcDVxFONJClmck+y59M3F+KzaS5uRrYEE0ymjMnhYWFdiT8yE440Xr3yHpaKrHPEUcfRznYZom7geoCbye4m8BdH/BZmUDBN73viO2yb8gFbgOOA7vNJKEpnMViOQM0IXFk49u2zqdTtwhqyRF/kKxrIe1rIqA1T1zwVA/4+8BzClyfwcD70H8A3A2pKWso/n6xXfYNViQWYRMSo/ffRpPQW49zAt8H/gkoH3Ol+zVovTv57gZpi2DaBlkDs80y/pzqhv734avtcO7NxJXPKIoNircP+7B4gCPAY4DmJ8zoepwH6EFq3Fhlu7YnVzTbLCjeCvM/gml3mRMNZMEzaznMeR3mH4Ss6xJTTqOoXrGhYEemEbcA38XA5L+ecH5kJttNsHDn3hJvrGSReyss+Ajy7xSPq1hJvxLKfw+zq8WPMlUMHQkeRtmASuCfkXZPc4ynJ1z4tbazO5LnQlf0uLgF2Irin/a0DTD3XbDPjn/aRlA9YstRhtu8e4A1QES/VCPCDQfFi4jeDnFWTQazn4PCRxObR8bVMPc96ZWmgoEPh8d1w9iBP0PGeCuJMM7TE86OjN9Ge5RdzyVnEnnmT2DaPYnPB8AxH8reBuu05OQXjK9HbDqWDGSW6u+Ab/X3948rmJ5wOcAs5HsrNS4Z47a878L0B8094+uRKJ7Bj2HouPnJbudCKNH1F0kM422qILZfCvwgIyPj1o0bN475bOr1XmYh31ypcZ6TMphNJPYScTQ1gn8Qzr0B3f8hgvm6GOlDWTKlJmWvgvx18m89sr8jPpIyn5g8XJ+LbcdGCQ2Lt0RRlOlr167tVxTlNwTcHrRqnBWYR7CLwtlXE7+qPfNpGUjrce5N+OJKaLkT+t4F3xnGjFj8/TBUIyvQJy6H9kdFaD2KngB7fML4DKMOiW3HoyAb8SyaPn36Jao6OiGsJVwRoS4K/fvjVtawpF8FuWv072t/FE7earz2+wfhzE+h8Tr9T6glO/EdonBo29ZeUVFxcfB/RBIuvIuC69PYC6hF4SP695x6SESIhsHD0LgitBc3nvx18slOJvq2vRSpfUBk4cqA6wh2UXDVB9qQBGEvhezrte/p/kW4Hpg5XJ9Dy+2ETgSNQUmTDlIy8XWJjSNTTpC7Qzjhwrso9O+LX/huOLJXas9ieDvh1MPxyatvr/wINMvznfjkZRTVJzbWZsHwP0KFy0cEW0Ooi8LA4fgUMBz2OZClU9u+2hbfGt/5pPbsT1qVxIYnE30bzxv+R7BwWUhNWwdcQegyjvtEfAoXjrRF8hcJ1QM9v45vnq56GPjfyNctOZB2SXzz1EPfxiPjhWDhlgE/IKKLQlt8ChcOx3ywzYx83X1C7/sfHf3va193lMU/Ty30bTwyqRo8AP9bYAlS08ZPLidymsteKgPmSLgSVNvdOj+GRExsa6Fv45Ffd7BwVxLU3RyHkcFrtFhGZ9TC4tPpvkeL9yvt65bsxOQbCX0bjzS6wZ/K6ZqPJHQZRyeiVok5RiJSwjrXTUf6xoa+jUemlIKF0/hWQUJfwveV9lDDlqD1Mr3Ae193YvKNiK6Nww7AnQkpixHcTeDXMJLzosTUOr1eoyeBHbLoGNEouhjweOOuB09L5Ov2Esj4RpwzteiPHRO9EhIDwcKlzvFw6DgMHNK+Z9pd8c0z85vaY0dPW+LnZs0zolGwcDoOkgmsnL6z0KezQJuzBtKNb6WiS9G/aF8fPJyCwExdG49oFHyndkscD+8qLfr+R3vWXrFB8c/i45VV+EPxNdGi5zex52MWfRuPaBQsnPZEoCU9+gIZwd8L3b/UviftUih9lZgOKMm5Sb+2edrERTzZ6Nt4RKNg4do1H7Ga38HQNF3P64cg59wMc94Aq/awMyz2OVBiQPiuf0uNa72+jUc0ChZOu++bqLFUMJ5miZnWI2c1LPijuG+bGSbk3qr/qx46lnyfk2H0bTyiUbBwJzUfcSzQvBw3Op+SXqYe9lIoeQkWfAxFP5L1M8cC7V+tY17ka8MoVrAWGi9vPNG38YhGwcJph7JkGN/RMCbUIVmhNtqjcy6UzkbZf8LC47Dw/ySYwpo//t6hGgPpVcLcvclfGQAjNh7RKFg47Sn4zOXya0wGQ0cD7gVmUaTty78dyt4EJWQy6Nxvwau/PTLOhVD+TkybaptGsYqNtRnRKFi4z5BYuPA4K5K7ItyzK1DzoowIyrgacm8Z+3/eTvjyFmMr6Y75EldgxB8zHlgL9LbRb0I0AsYPwLW/Jc6LNS/Hne6d8OVqY7UkHJnXjv+/wUPQ+C1jns6OeRJXkIyVcH3b1hBhAA4SXBeZcIZINH3vwRdLoxtXRVqYHKoR8Tyt+mnYZ8tnM22x+fzNoG/bMdqECvcnzUfzb0tNPJnnJHx5M5z8G3E1N4rW7IfrU2j6tjHxbDOgfE98p9yCUdLEttqM0SZUuENAY8RH7XOk4U4V534HXywREXveCLidR+D0JhjU/h2KeNcb2zXCVgTl/yVBkfHGuVCvI9SIaDNanJAb2oGDQOTTObJXGutWJww1sNvDHhmzpV0K6ZeDvUyM6zsDPa8b3WZXnJCaVkiEql5HxFogNa9ppbmar0f2Sr07DhIysxUueH898LOISXg7oH7R1NtozV5qvBc5VAOnHjD+49DCmgsVx/VW4+8CdoB28P5+IPKqpm2GbFMx1fA0Q+P1xhZP0xabOjBCk4wleqK1IJqMIZxwnwN7NTPLX5/4ZZ5U4GmWNs/IlJsl6v3TRlHsYktt9iKajM0+ws3vaiaVs1rOmpmKeNqkDdPaCdDXrd/xMULaZUYOWwqrRSThfg8c0Eyu4G5Z3JyKeE9D0w2RO2GdT0kHKBYUm9hQmwOIFuOIJFwPentL5a2TQMSpirdDYunO/rtMlakuaf9O/QOceUa2nIqF9KuMnIy1G9FiHFpVZjeyUUpkj5rCh+WQhMl2qJFRfGfhq63i028rhMGa2GsaiLt9oW7ImObGbFrCfQa8gZZw2TfIGKRnl14hJi+Df4pPexZM9kojvdI3CJpUDkXPreh1oFbzjlnVqVm7mqw4yozsKlGL2D4iesIdB7Q9eGwz5CiuhPn3TyEUh9hK/8y5XyK2j4gRZ8mdhBkAjqFgY1RniJ535Kw2ctbcfsTmmhgR7iQQdhOOMZTulHnDC4Qn7dLAGXO6vIqe/w/G3ZNfAV7STWrWv5rfR/J8wDZLbKNv7pcQW+tiVDgV+Dl6K+SZ10DRY8nxwZwsWHPFJpm650PUIDY2dHSm8YCAWscfgK26CeffAdMfAIv2CWXnBZYMsUX+HXp3qsDWgI2NJW2qILWObcDzuvcVPiqNcCp3X001SprYwNj2Us8HbGuYaEJwngf0HUCKNsP0+87PmmfJkHcPf/BfKHswUhlCszBdqFrHCeBZQP8gnaLNsj/X+dTmWXPlnY2J9gnwbMCmpoj2VOL3gKcBfU+bwkdh5lPnR2/TNkve1djnsRV4OmBL00QfrVjr2Ak8CfTq3pt/B5T+YmqP89IulXfU74iA2OzJgA2jIrYw01rHC8BmjBzWmnmNRNjkrpla02OKQ95pwR+NdPlBbLU5YLuoiT0+uNaxBXgcQyftWqD0VzDzyakxMe0ok3cp/RUGTekGHg/YLCb0jmgZpVanllzifgQ5I8bYdjzeDjnVqfedybeeZ8mUpZlZ1UYmjIfpRWqatmiXaP/+h7284iecZLoROYfH+KbGvXvkgKDBj5J/To9ZFJusXBc+bNbLqxVp0/Q/jykRTjJeCzyMbEVrnO7X5KyZoSPJO0XEKIpdHHsK7jbibhDKJ0jv0VhHJGXCSebXAQ8A5p0Pz70lx5YMfJh6p1trrvg95q+PdtlqDzJOM97lT6lwUoAFwN8H/sxvk+DtkP2Xe98JHNyXpD1HlDTx5c9eCQX3mWnDglGR2ZDnTQ+uUy7caEHuQY6TjD5OyXNS9uXv3y+BGr6u+O0PrVgDQYUXS6hT/m2xRqLWIBPGpuYeR5gwwklhrkZ2n70z+kSCcNXLxtMDh2X3WG+bfFb9g4H2MXQXOou0U5Z0+fzZZkugfMYVEr6rHQlqhpeAn5uZ5R9H3IWLHQU5/fE2IAURkgllP7Jy/QoG19OiJRXCDTMHWItsJZzk3arjTi3i2LMTA+4G8SCVwg2zCLgV+Cu0fDcnJscRv8fX0fHGijcTQbhhLgL+MvC3LFWFMMgBxLt4NxrOqolkIgk3TC7wbeTsgxVAkg+3iUgLEur0LhKAkdLB5UQULpiFSAfmm8g5CJFDmxNDIxK++z7S8ZgwW8VOdOGCmYlsrf914DJkPFge5zyakPHXEWR3g0Po7SaYIiaTcKFkIu3iAuSsmTnICRgzkX358wL3DO8H5UI2dulG9ntsR3ahO4nsjXUCaa8mxRLFsHAXuMAFksn/AwZgxxDtQBX7AAAAAElFTkSuQmCC',
			 	function() {},
			 	function(e) {}
			); // base64图片地址
			this.createtab();
		}
	},
	onShow() {
	},	
};
</script>
<style>
.flex-item-0 {
	width: 100%;
	height: 200upx;
	text-align: center;
	line-height: 200upx;
	background-color: #0faeff;
}
.font-fize2{
	font-size: 21px;
	color:red;
	font-weight: bold;
}
.test {
	background-color: #0faeff;
	width: 100%;
}
.hello {
	display: flex;
	flex: 1;
	flex-direction: column;
}

.title {
	color: #8f8f94;
	margin-top: 50upx;
}

.ul {
	font-size: 30upx;
	color: #8f8f94;
	margin-top: 50upx;
}

.ul > view {
	line-height: 50upx;
}
</style>
