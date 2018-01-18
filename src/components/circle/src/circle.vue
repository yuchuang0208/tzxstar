<template>
	<div>	
		<div class="loading" >
	  		 <div class="left" ref = 'left'><div :style='{background:color}'></div></div>
		  	<div class="right" ref = 'right'><div :style='{background:color}'></div></div>
	  		<div class="small-pian" ref = 'pian'>
	            <div :style='{background:color}'></div>	        
	        </div>
	        <div class="shadow-left" ref = 'shadowleft'>
	            <div class='shadow1' :style='{background:shadowColor}'></div>	
	            <div class='shadow2' :style='{background:shadowColor}'></div>	 
	            <div class='shadow3' :style='{background:shadowColor}'></div>	 
	            <div class='shadow4' :style='{background:shadowColor}'></div>	  
	        </div>
	        <div class="shadow-right" ref = 'shadowright'>
	            <div class='shadow1' :style='{background:shadowColor}'></div>	
	            <div class='shadow2' :style='{background:shadowColor}'></div>	 
	        </div>
	  		<div class='progress'  ref="myChart" ></div>
	  	</div>
	</div>
</template>

<script>
	// 引入基本模板
	let echarts = require('echarts/lib/echarts')
	import echarts_liquidfill from 'echarts-liquidfill'
	// 引入柱状图组件
	require('echarts/lib/chart/bar')
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')
	export default {
		name: 'tzxcircle',
		data() {
			return {
				data_time:2000,
			}
		},
		
		mounted() {

			this.drawCircle();
			this.showHours("loading",this.num,50);

		},
		props:{
			score:Number,
		},
		watch:{
			score(val){
				this.drawCircle();
				this.showHours("loading",val,50);
			}
		},
	    computed: {
		    num() {		   
		      return this.score;
		    },
		    data_me(){
		    	let data = [];
		    	data.push(this.score/100)
		    	data.push(this.score/100) 
		    	return  data;
		    },
		    color(){
		    	let color = '#51E18A';
		    	if(this.score == 100){
					color ='#51E18A'
				}
				else if(this.score <= 99 && this.score>=60){
					color ='#FFC743'
				}
				else{
					color ='#FF6F6F'
				}
				return color;
		    },
		    color1(){
		    	let color = '#FF6F6F';
		    	if(this.score == 100){
					color ='#74FF79'
				}
				else if(this.score <= 99 && this.score>=60){
					color ='#FFD720'
				}
				else{
					color ='#FF7070'
				}
				return color;
		    },
		    shadowColor(){
		    	let shadowColor = '';
		    	if(this.score == 100){
					shadowColor ='#C1EFCC'
				}
				else if(this.score <= 99 && this.score>=60){
					shadowColor ='#FFE29D'
				}
				else{
					shadowColor ='rgb(249, 211, 211)'
				}
				return shadowColor;
		    }
		},
		methods: {		
			drawCircle(){
				let chart = echarts.init(this.$refs.myChart);
				let option = {
				    series: [{
				        type: 'liquidFill',
				        radius: '96%',
				        waveLength: '100%',
				        amplitude: '4%',
				        data: this.data_me,
				        animationDuration: this.data_time,   				
				     color:[this.color, this.color],
//				       color: [{
//				        	colorStops:[{ offset: 0, color: '#FFFFFF'},{offset: 1, color: this.color}],
//						    type: 'linear',
//						    x: 0,
//						    y: 0,
//						    x2: 0,
//						    y2: 1,						    
//						    globalCoord: false 
//				        }],
				
				        itemStyle: {
				            normal: {
				                opacity: 0.5,
				                shadowBlur: 0,
            					shadowColor: 'red'
				            },
				            emphasis: {
				                opacity: 0.3
				            }
				        },
				         outline: {
					        show: true,
					        borderDistance: 0,
					        itemStyle: {
					            color: 'none',
					            borderColor: '#74FF79',
					            borderWidth: 0,
					            shadowBlur: 0,
					            shadowColor: '#e9eef3'
					        }
					    },
   					   backgroundStyle: {
				            borderWidth: 5,
				            borderColor: '#FEFEFE',
				            color: '#f9f9f9'
				        },
				         label: {
				            normal: {
				            	formatter: function(param) {
			                    	return parseInt(100*param.value)+'分';
               					},
				                fontSize: 30,
				                color: this.color,
				                fontWeight:300
				            }
				        }
				    }]
				}
				chart.setOption(option);
			},
			
			showHours(oClass,num,n){	
					
		       let Rdeg = num > n ? n : num ;
		       let Ldeg = num > n ? num - n : 0;   
		       this.data_time = num > n ? ((360/(2*n)*num*2)/180)*1000  : 2*1000 ;		      
	  		 /*  this.$refs.left.children[0].style.transitionDuration = (this.data_time-2000) + "ms"	 
	  		   this.$refs.left.children[0].style.transitionDelay = '2000ms';	  		   
	  		   this.$refs.right.children[0].style.transitionDuration = "2000ms"	  				
	  		   this.$refs.pian.style.transitionDuration = this.data_time + "ms";	*/  			
			   this.$refs.right.children[0].style.transform = "rotateZ("+ (360/(2*n)*Rdeg-180) +"deg)";
	    	   this.$refs.left.children[0].style.transform = "rotateZ("+ (360/(2*n)*Ldeg-180) +"deg)";  		
	  		   this.$refs.pian.style.transform = "rotateZ("+ (360/(2*n)*num) +"deg)";
	  		   
			 },
			  getByClass(oClass){
			    return document.getElementsByClassName(oClass);
			  }
		
		}
	}
</script>

<style scoped="scoped">
	.loading{
		margin:10px auto;
		width: 150px; 
		height: 150px;
		position: relative;

    }
	.loading .progress{
		position: absolute;
		width: 148px;
		height:148px;
		background-color: white;
		border-radius: 50%;
		left: 1px;
      	top: 1px;
        text-align: center;

	}
  	.left,.right{
  		width: 75px;
  		height: 150px;
  		overflow: hidden;
  		position: relative;
  		float: left;
  	}
  	.left{ 
  		border-radius: 150px 0 0 150px;
  	}
  	.right{
  		border-radius: 0 150px 150px 0;
  	}
  	.left div,.right div{
	  	content:"";
	  	position:absolute;
	  	display:block;
	  	width: 75px;
	  	height: 150px;
	  	background-color: white;
	  	border-radius: 150px 0 0 150px;
        transform-origin:right center;
        transform:rotateZ(-180deg);

    }
  	        
   
	.right div{			  	

	  	content:"";
	  	position:absolute;
	  	display:block;
  	    border-radius: 0 150px 150px 0;
	  	transform-origin:left center; 
    }
    .small-pian{
        width: 118px;
        height:118px;
        position:absolute;
        margin: auto;
        top:0;
        bottom:0;
        left:0;
        right:0;
        z-index: 999;
	}
    .small-pian div{	    	
        width: 6px;
        height:6px;
        position:absolute;
        border-radius:50%;
        left: 57px;
    	bottom: 130px;
    }
    .shadow-left{
        width: 200px;
        height:200px;
        position:absolute;
        margin: auto;
        top:0;
        bottom:0;
        left:0;
        z-index: 999;
	}
	.shadow-left .shadow1{
        width: 4px;
        height:4px;
        position:absolute;
        border-radius:50%;
        left: 125px;
    	top: 33px;
    	background: #C1EFCC;
	}
	.shadow-left .shadow2{
        width: 6px;
        height:6px;
        position:absolute;
        border-radius:50%;
        left: 153px;
    	top: 63px;
    	background: #C1EFCC;
	}
	.shadow-left .shadow3{
        width: 10px;
        height:10px;
        position:absolute;
        border-radius:50%;
        left: 162px;
    	top: 135px;
    	background: #C1EFCC;
    	opacity: 0.5;
	}
	.shadow-left .shadow4{
        width: 55px;
        height:14px;
        position:absolute;
        left: 50px;
    	top: 180px;
    	background: #D8D8D8;
	    border-radius:50%;
    	opacity: 0.24;
    	-moz-box-shadow:0px 0px 25px #D3DCE6 ;
    	-webkit-box-shadow:0px 0px 25px #D3DCE6 ;
    	box-shadow:0px 0px 25px #D3DCE6 ;
	}
	 .shadow-right{
        width: 200px;
        height:200px;
        position:absolute;
        margin: auto;
        top:0;
        right:0;
        bottom: 0;
        z-index: 999;
	}
	.shadow-right .shadow1{
        width: 10px;
        height:10px;
        position:absolute;
        border-radius:50%;
        right: 147px;
    	top: 165px;
    	background: #C1EFCC;
    	opacity: 0.4;
	}
	.shadow-right .shadow2{
        width: 4px;
        height:4px;
        position:absolute;
        border-radius:50%;
        right: 158px;
    	top: 118px;
    	background: #C1EFCC;
	}
	
</style>