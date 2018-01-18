<template>
<div>
		<!--内容-->
		<div class="Zcen_nr" v-loading.body="loading1">
		    <!--right-->	
		    <div class='safety_class'>
		    	<div class='safety_header'>
		    		<div class='safity_title_span'> <span>360°安全诊断</span> 
		    			<el-tooltip   popper-class='safety_tooltip' placement="right-start" effect="light">
		    				<div slot="content" class=''>
		    					<div style='width: 250px;height: 36px;line-height: 18px;font-size: 12px;color: #34495E;'>安全指数=(设置的诊断规则合格项/设置的诊断规则总项)*100</div>
			    				<li class='safety_tooltip_li'>
			    					<div class='safety_tooltip_left' style='background: #01D75D;'></div>
			    					<div class='safety_tooltip_center'>安全状态</div>
			    					<div class='safety_tooltip_right'>安全指数=100分</div>
			    				</li>
			    				<li class='safety_tooltip_li'>
			    					<div class='safety_tooltip_left' style='background: #FFBE1A;'></div>
			    					<div class='safety_tooltip_center'>存在风险</div>
			    					<div class='safety_tooltip_right'>60分≤安全指数<100分</div>
			    				</li>
			    				<li class='safety_tooltip_li'>
			    					<div class='safety_tooltip_left' style='background: #FF7171;'></div>
			    					<div class='safety_tooltip_center'>高危风险</div>
			    					<div class='safety_tooltip_right'>0分≤安全指数 <60分</div>
			    				</li>
		    				</div>
					    	<icon-svg icon-class='question'></icon-svg>
				        </el-tooltip>
		    		</div>
		    		<div class='safity_title'> 					
						<div class='circle_doctor' v-if='!circle_loading'>诊断中<div  class='loading-center'>
								<div class='circle circle1'> </div>
								<div class='circle circle2'> </div>
								<div class='circle circle3'> </div>
							</div>
						</div>
						<div class='circle_doctor1' v-if='circle_loading' @click='startAnalysis'>开始诊断</div>
	
					</div>
					<div class='safity_title3'> 					
						<span >全部门店</span>	
					</div>
					<div class='safity_title2'> 					
						<span>{{report_date}}</span>	
					</div>					
					<div class='safity_title1'> 					
						<span @click='set_operate'>诊断设置</span>	
					</div>
		    	</div>
	    		<div class='safity_circle' ref='safity_circle'>
					<li> 					
						<tzx-circle :score='score'></tzx-circle> 					
						<div class='circle-text' ref='circle1'>	
							<span>基本配置诊断</span>
						    <div class='circle-left' >
						    	<li v-for='(item,index) in basicWarn.basicList'>{{item.warn_text}}</li>
						    					  
						    </div>
						    <div class='circle-right' >
						    	<li v-for='(item,index) in basicWarn.basicList'><span :class='item.warn_status=="正常"?"normal":"exception"'>{{item.warn_status}}</span> </li>
						    	
						    </div>						
						</div>						
					</li>
					<li> 
						<tzx-circle :score='score2'></tzx-circle>
						<div class='circle-text' ref='circle2'>	
							<span>消费信息诊断</span>
						    <div class='circle-left' >
						    	<li v-for='(item,index) in consumeWarn.consumeList'>{{item.warn_text}}</li>
				  
						    </div>
						    <div class='circle-right' >
						    	<li v-for='(item,index) in consumeWarn.consumeList'> <span :class='item.warn_status=="正常"?"normal":"exception"'>{{item.warn_status}}</span></li>
			    	
						    </div>						
						</div>
					</li>
					<li> 
						<tzx-circle :score='score4'></tzx-circle>
						<div class='circle-text' ref='circle3'>	
							<span>操作信息诊断</span>
						    <div class='circle-left' >
						    	<li v-for='(item,index) in operateWarn.operateList'>{{item.warn_text}}</li>						    
						    </div>
						    <div class='circle-right' >
						    	<li  v-for='(item,index) in operateWarn.operateList' ><span :class='item.warn_status=="正常"?"normal":"exception"'>{{item.warn_status}}</span></li>						    		    					    	
						    </div>						
						</div>
					</li>
				</div>
		    <div class='circle-show' ref='circle_show'>
				<div class='circle-line' ></div>
				<div class='circle-button' @click='clickShow(circle_loading)'>					
						<div v-if='!circle_loading' class='loading-center'>
							<div class='circle circle1'> </div>
							<div class='circle circle2'> </div>
							<div class='circle circle3'> </div>
						</div>						
					<span v-if='circle_loading' style='width:100px;margin: 0 auto;'>{{showText}}</span>
					<i v-if='circle_loading' :class="!show?'el-icon-caret-bottom':'el-icon-caret-top'"></i>
				</div>					
			 	<div class='circle-line' ></div>
			</div>	
		    	
		    	
		    </div>

		    <div class="right_nr">
		    	<!--沉淀数据统计-->
		        <div class="Rblack" v-loading.body="loading4"  v-model="cdsj">
		        	<h1><b>沉淀数据统计</b> 
			        		<cite>
						        <el-popover
						        	v-model="visible"
								  	ref="popover01"
									placement="bottom"
									trigger="click"
									width="605" 
									height="200"
									@hide="setMendianCdsj"
									popper-class="mypop">
									
								<tzx-tree-select 
								   	:data="storeData" 
								   	unitAndName='家店' 			   
								   	@cancelButton='setMendianCdsj' 
								   	@makeSureButton ='getMendianCdsj'
								   	@boxChange = 'storeBoxChange' 
								   	:defaultCheckedId = 'storeCheckedIds'
								   	:pnodes= 'storeNodes' 
								   	:ptotalSelect = 'storeTotal'
								   	:defaultProps ='defaultTreeProps'
								   	>  
						  		</tzx-tree-select>	
				
								</el-popover>
								<a v-popover:popover01 v-bind:title="cdsj.shops" @click="changMendianStatus" @mouseover="changeMendianColor"
									@mouseleave="changeImageColor">
								 	{{cdsj.shops | mendianStrFormat(10)}}
								 	<!--<img src="../assets/mendian_xiala.svg"/>-->
								 	
								 	<svg v-if="mendianjiantou" width="9px" height="6px" viewBox="0 0 9 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
									    <title>Shape</title>
									    <desc>Created with Sketch.</desc>
									    <defs></defs>
									    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
									        <g id="02CRM首页-第一期-hover状态" transform="translate(-1556.000000, -374.000000)" fill="#C1CED6">
									            <g id="Group-6-Copy" transform="translate(495.000000, 351.000000)">
									                <g id="选择器-Select-基本样式-中尺寸" transform="translate(1000.000000, 15.000000)">
									                    <path d="M69.9899998,13.281648 C69.9899998,13.1731906 69.9525083,13.0636035 69.8775255,12.9720926 L65.8835158,8.18415158 C65.7862724,8.06778586 65.6398215,8 65.4839977,8 C65.3293455,8 65.181723,8.06778586 65.0856512,8.18415158 L61.1127305,12.9517568 C60.9358178,13.1641525 60.970966,13.4748377 61.1912282,13.6454321 C61.4114904,13.8160265 61.7336824,13.7821336 61.9105952,13.5697379 L65.4851693,9.28115269 L69.0796608,13.5912034 C69.2565735,13.8035991 69.5787656,13.837492 69.7990278,13.6668976 C69.9243898,13.5686081 69.9899998,13.4262578 69.9899998,13.281648 L69.9899998,13.281648 Z" id="Shape" transform="translate(65.495000, 10.887801) scale(1, -1) translate(-65.495000, -10.887801) "></path>
									                </g>
									            </g>
									        </g>
									    </g>
									</svg>
									
									<svg v-else="!mendianjiantou" width="9px" height="6px" viewBox="0 0 9 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
									    <!-- Generator: Sketch 46.1 (44463) - http://www.bohemiancoding.com/sketch -->
									    <title>Shape</title>
									    <desc>Created with Sketch.</desc>
									    <defs></defs>
									    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
									        <g id="03CRM首页-第一期-门店下拉" transform="translate(-1556.000000, -340.000000)" fill="#0C9AFF">
									            <g id="Group-6-Copy" transform="translate(495.000000, 317.000000)">
									                <g id="选择器-Select-基本样式-中尺寸" transform="translate(937.000000, 18.000000)">
									                    <path d="M132.99,10.281648 C132.99,10.1731906 132.952508,10.0636035 132.877525,9.97209258 L128.883516,5.18415158 C128.786272,5.06778586 128.639822,5 128.483998,5 C128.329346,5 128.181723,5.06778586 128.085651,5.18415158 L124.112731,9.95175682 C123.935818,10.1641525 123.970966,10.4748377 124.191228,10.6454321 C124.41149,10.8160265 124.733682,10.7821336 124.910595,10.5697379 L128.485169,6.28115269 L132.079661,10.5912034 C132.256574,10.8035991 132.578766,10.837492 132.799028,10.6668976 C132.92439,10.5686081 132.99,10.4262578 132.99,10.281648 L132.99,10.281648 Z" id="Shape"></path>
									                </g>
									            </g>
									        </g>
									    </g>
									</svg>
									
								 </a>		
			        		</cite>
			        		<tt>截止到 {{cdsj.end_date}}</tt></h1>
		            <ul class="zotpah" >
		            	<li>
		                	<em><img src="../assets/hyzs.svg"/></em>
		                    <p>
		                        <b>会员总数(人)</b>
		                        <tt>{{cdsj.total_fans_and_customer_num | thousand}}</tt>
		                        <cite> 粉丝：{{cdsj.total_fans | thousand}}（{{cdsj.total_fans_scale}}%）</cite>
		                      	<span> 会员：{{cdsj.total_customer_num | thousand}}（{{cdsj.total_customer_num_scale}}%）</span> 
		                    </p>
		                </li>
		 
		             	<li>
		                	<em><img src="../assets/hyxfdszb.svg"/></em>
		                    <p>
		                        <b>会员消费总单数占比</b>
		                        <tt>{{cdsj.customer_consume_num_scale}}%</tt>
		                        <cite v-bind:title="cdsj.customer_consume_num | thousand">	 会员消费总单数：{{cdsj.customer_consume_num | thousand}}</cite>
		                        <span v-bind:title="cdsj.total_consume_num | thousand">	全部顾客消费单数：{{cdsj.total_consume_num | thousand}}  </span>
		                    </p>
		                </li>
		
		             	<li>
		                	<em><img src="../assets/hyxfzjezb.svg"/></em>
		                    <p>
		                        <b>会员消费总金额占比</b>
		                        <tt>{{cdsj.customer_consume_amount_scale}}%</tt>
		                      	<cite v-bind:title="cdsj.customer_consume_amount | currency">会员消费总额：{{cdsj.customer_consume_amount | currency}}</cite>
		                     	<span v-bind:title="cdsj.total_consume_amount | currency"> 全部顾客消费总额：{{cdsj.total_consume_amount | currency}}</span>
		                    </p>
		                </li>
		 
		 
		              	<li>
		              		    <p>
				                	<em><img src="../assets/sjczje.svg"/></em>
				                    <strong>
				                    	<b>实际储值金额</b>
				                        <tt v-bind:title="cdsj.customer_rechange_amount | currency">{{cdsj.customer_rechange_amount | currency}}</tt>
				                    </strong>
			                    </p>
			                    <p>
				                    <em class="cemimg"><img src="../assets/cdzje.svg"/></em>
				                    <strong class="cp">
				                        <b>沉淀总金额</b>
				                        <tt v-bind:title="cdsj.customer_subside_amount | currency">{{cdsj.customer_subside_amount | currency}}</tt>
				                    </strong>
			                   	</p>
							<!--<div class="cli42">
			                	<em class="cemimg"><img src="../assets/cdjer.png"/></em>
			                    <p class="cp">
			                     <b>沉淀总金额</b>
			                        <tt>{{cdsj.customer_subside_amount | currency}}</tt>
			                   </p>
		                   </div>-->
		                </li>
		            </ul>
		             <div class="fd"></div>
		        </div>
		        
		    	<!--阶段数据统计-->
		        <div class="Rblack" v-loading.body="loading2" v-model="jdsj">
		        	<h1><b>阶段数据统计</b>   
		              <cite>
					       <el-popover
					       	    v-model="visible2"
							  	ref="popover22"
								placement="bottom"
								trigger="click"
								width="605" 
								height="200"
								@hide="setMendianJdsj"
								popper-class="mypop">
								<tzx-tree-select 
								   	:data="storeData" 
								   	unitAndName='家店' 			   
								   	@cancelButton='setMendianJdsj' 
								   	@makeSureButton ='getMendianJdsj'
								   	@boxChange = 'storeBoxChange2' 
								   	:defaultCheckedId = 'storeCheckedIds2'
								   	:pnodes= 'storeNodes2' 
								   	:ptotalSelect = 'storeTotal'
								   	:defaultProps ='defaultTreeProps'
								   	>  
						  		</tzx-tree-select>		
							</el-popover>
							  <a v-popover:popover22 v-bind:title="jdsj.shops" @click="changMendianStatus2" @mouseover="changeMendianColor"
								@mouseleave="changeImageColor">
							 	{{jdsj.shops | mendianStrFormat(10)}}
							 	<!--<img src="../assets/mendian_xiala.svg"/>-->
							 	
							 	<svg v-if="mendianjiantou2" width="9px" height="6px" viewBox="0 0 9 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
								    <title>Shape</title>
								    <desc>Created with Sketch.</desc>
								    <defs></defs>
								    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
								        <g id="02CRM首页-第一期-hover状态" transform="translate(-1556.000000, -374.000000)" fill="#C1CED6">
								            <g id="Group-6-Copy" transform="translate(495.000000, 351.000000)">
								                <g id="选择器-Select-基本样式-中尺寸" transform="translate(1000.000000, 15.000000)">
								                    <path d="M69.9899998,13.281648 C69.9899998,13.1731906 69.9525083,13.0636035 69.8775255,12.9720926 L65.8835158,8.18415158 C65.7862724,8.06778586 65.6398215,8 65.4839977,8 C65.3293455,8 65.181723,8.06778586 65.0856512,8.18415158 L61.1127305,12.9517568 C60.9358178,13.1641525 60.970966,13.4748377 61.1912282,13.6454321 C61.4114904,13.8160265 61.7336824,13.7821336 61.9105952,13.5697379 L65.4851693,9.28115269 L69.0796608,13.5912034 C69.2565735,13.8035991 69.5787656,13.837492 69.7990278,13.6668976 C69.9243898,13.5686081 69.9899998,13.4262578 69.9899998,13.281648 L69.9899998,13.281648 Z" id="Shape" transform="translate(65.495000, 10.887801) scale(1, -1) translate(-65.495000, -10.887801) "></path>
								                </g>
								            </g>
								        </g>
								    </g>
								</svg>
								
								<svg v-else="!mendianjiantou2" width="9px" height="6px" viewBox="0 0 9 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
								    <!-- Generator: Sketch 46.1 (44463) - http://www.bohemiancoding.com/sketch -->
								    <title>Shape</title>
								    <desc>Created with Sketch.</desc>
								    <defs></defs>
								    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
								        <g id="03CRM首页-第一期-门店下拉" transform="translate(-1556.000000, -340.000000)" fill="#0C9AFF">
								            <g id="Group-6-Copy" transform="translate(495.000000, 317.000000)">
								                <g id="选择器-Select-基本样式-中尺寸" transform="translate(937.000000, 18.000000)">
								                    <path d="M132.99,10.281648 C132.99,10.1731906 132.952508,10.0636035 132.877525,9.97209258 L128.883516,5.18415158 C128.786272,5.06778586 128.639822,5 128.483998,5 C128.329346,5 128.181723,5.06778586 128.085651,5.18415158 L124.112731,9.95175682 C123.935818,10.1641525 123.970966,10.4748377 124.191228,10.6454321 C124.41149,10.8160265 124.733682,10.7821336 124.910595,10.5697379 L128.485169,6.28115269 L132.079661,10.5912034 C132.256574,10.8035991 132.578766,10.837492 132.799028,10.6668976 C132.92439,10.5686081 132.99,10.4262578 132.99,10.281648 L132.99,10.281648 Z" id="Shape"></path>
								                </g>
								            </g>
								        </g>
								    </g>
								</svg>
							 </a>		
		        		</cite>
		        	
		        	  <tt>{{jdsj.start_date}}-{{jdsj.end_date}}</tt> 
		              <ul id="day_jieduan">
		              	<li class="hove" @click="jdsjfun">近<span>7</span>天</li>
		                <li @click="jdsjfun">近<span>14</span>天</li>
		                <li @click="jdsjfun">近<span>30</span>天</li>
		              </ul> 
		            </h1>
		            <!--数据列表-->
					<div id="Tab_two">
		                <ul class="zotpah2" >
		                    <li>
		                        <em><img src="../assets/hyxfje.svg"/></em>
		                        <p> <b>会员消费金额</b><tt v-bind:title="jdsj.customer_consume_amount | currency">{{jdsj.customer_consume_amount | currency}}</tt>
		                        	<strong>环比：{{jdsj.customer_consume_amount_ring | abs}}%
		                        		<img v-if="jdsj.total_consume_amount_ring > 0" src="../assets/jiantou_up.svg"/>
		                        		<img  v-else-if="jdsj.total_consume_amount_ring == 0" src="../assets/jiantou_nochang.svg"/>
		                        		<img  v-else src="../assets/jiantou_down.svg"/>
		                   			</strong>
		                        </p>
		                    </li>
		     
		                    <li>
		                        <em><img src="../assets/czje.svg"/></em>
		                        <p> <b>充值金额</b><tt v-bind:title="jdsj.customer_rechange_amount | currency">{{jdsj.customer_rechange_amount | currency}}</tt>
		                        	<strong>环比：{{jdsj.customer_rechange_amount_ring | abs}}% 
		                        		<img v-if="jdsj.customer_rechange_amount_ring > 0" src="../assets/jiantou_up.svg"/>
		                        		<img  v-else-if="jdsj.customer_rechange_amount_ring == 0" src="../assets/jiantou_nochang.svg"/>
		                        		<img  v-else src="../assets/jiantou_down.svg"/>
		                        	</strong>
		                        </p>
		                    </li>
		    
		                    <li>
		                        <em><img src="../assets/xzfs.svg"/></em>
		                        <p><b>新增粉丝(人)</b><tt v-bind:title="jdsj.fans_num | thousand">{{jdsj.fans_num | thousand}}</tt>
		                        	<strong>环比：{{jdsj.fans_num_ring | abs}}% 
		                        		<img v-if="jdsj.fans_num_ring > 0" src="../assets/jiantou_up.svg"/>
		                        		<img  v-else-if="jdsj.fans_num_ring == 0" src="../assets/jiantou_nochang.svg"/>
		                        		<img  v-else src="../assets/jiantou_down.svg"/>
		                        	</strong>
		                        </p>
		                    </li>
		      
		                    <li id="banner_xinzhuyan">
		                        <em><img src="../assets/xzhy2.svg"/></em>
		                        <p><b>新增会员(人)</b>
		                        	<tt>
										<el-popover
										  ref="popover"
										  placement="right"
										  trigger="hover">
											    <div class="api" >
						                        	<h1 v-for="item in jdsj.add_customer_info">{{item.name}}：
						                        		<cite v-bind:title="item.num | thousand">{{item.num | thousand}}人</cite>
						                        	</h1>
												</div>
												<div  slot="reference" class="xzhy_pop" @mouseover="changeHuiyuanImg" @mouseleave="changeHuiyuanImgHover">
													<a>
														<h3 v-bind:title="jdsj.add_customer_num | thousand">{{jdsj.add_customer_num | thousand}}</h3>
														<img v-if="jdsj_jiantou" src="../assets/ph_jiantou_right.svg" />
			                        	            	<img v-else src="../assets/huiyuan_jiantou_hover.svg" />
			                        	            </a>
											    </div>
										</el-popover>
		                        	</tt>
		                        	<cite>环比：{{jdsj.add_customer_num_ring | abs}}% 
			                        	<img v-if="jdsj.add_customer_num_ring > 0" src="../assets/jiantou_up.svg"/>
			                        	<img  v-else-if="jdsj.add_customer_num_ring == 0" src="../assets/jiantou_nochang.svg"/>
			                        	<img  v-else src="../assets/jiantou_down.svg"/>
		                        	</cite>
		                        </p>
		                    </li>
		                    <div class="fd"></div>
		                </ul>
		            </div>
		            <!--数据列表-->
		        </div>
		        <!--阶段数据统计-->
		  
		    	<!--营运排行榜 -->
		        <div class="Rblack" v-loading.body="loading3"> 
		        	<h1>
		        	  <b>营运排行榜</b>   
		              <strong>全部门店</strong>
		        	  <tt id="yyphbdatatime">{{phpsj.start_date}}-{{phpsj.end_date}}</tt> 
		              <ul>
		              	<li class="hove" @click="phbfun">近<span>7</span>天</li>
		                <li @click="phbfun">近<span>14</span>天</li>
		                <li @click="phbfun">近<span>30</span>天</li>
		              </ul> 
		            </h1>
		        	
		            <!--营运排行榜开始-->
		            <div id="Tab_one">
		           <!--近7天-->
		            <div class="yun_lebqu ">
		                <!--1-->
		                <div class="yunyin_ph ">
		                    <h2><img src="../assets/xzhy1.svg"/><span>新增会员</span></h2>
		                    <div v-if="phpsj.member_rank_list == null" class="nodata">
		                    	<img src="../assets/nodata.png">
		                    	<span>排行榜敬请期待...</span>
		                    </div>
		                    <ul v-else class="huiyn" v-for="(item,index) in phpsj.member_rank_list">
		                        <li><tt>{{index+1}}</tt>
		                        	<b v-bind:title="item.store_name">{{item.store_name | stringformat(11)}}</b>
		                        	<span v-bind:title="item.add_customer_num | thousand">{{item.add_customer_num | thousand}}人
		                        	
		                        	<img v-if="item.add_customer_num_ring > 0" src="../assets/jiantou_up.svg"/>
		                        	<img  v-else-if="item.add_customer_num_ring == 0" src="../assets/jiantou_nochang.svg"/>
		                        	<img  v-else src="../assets/jiantou_down.svg"/>
		                        </span> </li>
		                    </ul>
		                   
		                </div>
		    
		                <!--2-->
		                <div class="yunyin_ph ">
		                    <h2><img src="../assets/xfje1.svg"/>营业收入</h2>
		                    <div v-if="phpsj.consume_rank_list == null" class="nodata">
		                    	<img src="../assets/nodata.png">
		                    	<span>排行榜敬请期待...</span>
		                    </div>
		                    <ul v-else class="xiaofeijine" v-for="(item,index) in phpsj.consume_rank_list">
		                        <li><tt >{{index+1}}</tt>
		                        	<b v-bind:title="item.store_name">{{item.store_name | stringformat(11)}}</b>
		                        	<span v-bind:title="item.total_consume_amount | currency">{{item.total_consume_amount | currency}}
			                        	<img v-if="item.total_consume_amount_ring > 0" src="../assets/jiantou_up.svg"/>
			                        	<img  v-else-if="item.total_consume_amount_ring == 0" src="../assets/jiantou_nochang.svg"/>
		                        		<img  v-else src="../assets/jiantou_down.svg"/>
		                        	</span>
		                        </li>
		                    </ul>
		                </div>
		    
		                <!--3-->
		                <div class="yunyin_ph">
		                    <h2><img src="../assets/xiofei.svg"/>消费明星</h2>
		                    <div v-if="phpsj.customer_consume_list == null" class="nodata">
		                    	<img src="../assets/nodata.png">
		                    	<span>排行榜敬请期待...</span>
		                    </div>
		                    <ul v-else class="mx_xiaof" id="banner_menu_wrap" v-for="(item,index) in phpsj.customer_consume_list">
		                        <li >	
		                            <tt>{{index+1}}</tt>
										<el-popover
										  placement="right"
										  trigger="hover">
											    <div class="api2" v-model="xfmx">
					                                <div class="poptime">
					                                	<span>{{xfmx.start_date | strDateFomater}}</span>
					                                	<cite>至</cite>
					                                	<em>{{xfmx.end_date | strDateFomater}}</em>
					                                </div>
					                                
					                                <div class="timeMoney">
					                                	<div class="xiaofeijine">
					                                		<span>消费总额</span>
					                                		<cite v-bind:title="xfmx.consume_amount | currency">{{xfmx.consume_amount | currency}}</cite>
					                                	</div>
					                                	<div class="xiaofeijine">
					                                		<span>充值金额</span>
					                                		<cite v-bind:title="xfmx.topup_amount | currency">{{xfmx.topup_amount | currency}}</cite>
					                                	</div>
					                                </div>
					                                
					                                <div class="timeTotalMoney">
					                                	<div class="xiaofeijine">
					                                		<span>累计消费总额</span>
					                                		<cite v-bind:title="xfmx.total_consume_amount | currency">{{xfmx.total_consume_amount | currency}}</cite>
					                                	</div>
					                                	<div class="xiaofeijine">
					                                		<span>累计充值总额</span>
					                                		<cite v-bind:title="xfmx.total_topup_amount | currency">{{xfmx.total_topup_amount | currency}}</cite>
					                                	</div>
					                                	<div class="xiaofeijine">
					                                		<span>累计储值余额</span>
					                                		<cite v-bind:title="xfmx.account_balance | currency">{{xfmx.account_balance | currency}}</cite>
					                                	</div>
					                                </div>
												</div>
												<strong slot="reference" @mouseover="getxxmx(item.customer_id,$event)" @mouseleave="changeImageColor($event)">
													<b>{{item.customer_name | stringformat(11)}}</b>
													<cite>{{item.amount | currency}}</cite>
		                        	            	<svg width="8px" height="13px" viewBox="0 0 8 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
													    <title>Combined Shape</title>
													    <desc>Created with Sketch.</desc>
													    <defs></defs>
													    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													        <g id="01CRM首页-第一期-默认状态" transform="translate(-1278.000000, -691.000000)" fill="#C1CED6">
													            <g id="Group-6-Copy-2" transform="translate(495.000000, 566.000000)">
													                <g id="Group-9-Copy-2" transform="translate(609.000000, 19.000000)">
													                    <g id="Group-10" transform="translate(0.000000, 103.000000)">
													                        <path d="M178.156854,7.20710678 L183.460155,12.5104076 C183.655417,12.7056698 183.972,12.7056698 184.167262,12.5104076 C184.362524,12.3151455 184.362524,11.998563 184.167262,11.8033009 L178.510408,6.14644661 C178.412777,6.04881554 178.284815,6 178.156854,6 C178.028893,6 177.900932,6.04881554 177.803301,6.14644661 L172.146447,11.8033009 C171.951184,11.998563 171.951184,12.3151455 172.146447,12.5104076 C172.341709,12.7056698 172.658291,12.7056698 172.853553,12.5104076 L178.156854,7.20710678 Z" id="Combined-Shape" transform="translate(178.156854, 9.328427) rotate(-270.000000) translate(-178.156854, -9.328427) "></path>
													                    </g>
													                </g>
													            </g>
													        </g>
													    </g>
													</svg>
													
												</strong>
										</el-popover>
		                        </li>
		                     </ul>
		                </div>
		                <!--4-->
		                <div class="yunyin_ph">
		                    <h2><img src="../assets/chongzhimx.svg"/>充值明星</h2>
		                    <div v-if="phpsj.customer_recharge_list == null" class="nodata">
		                    	<img src="../assets/nodata.png">
		                    	<span>排行榜敬请期待...</span>
		                    </div>
		                    <ul  v-else class="ren" v-for="(item,index) in phpsj.customer_recharge_list">
		                        <li><tt class="red">{{index+1}}</tt>
		                            <el-popover
										  placement="right"
										  trigger="hover">
												 <div class="api2" v-model="xfmx">
					                                <div class="poptime">
					                                	<span>{{xfmx.start_date | strDateFomater}}</span>
					                                	<cite>至</cite>
					                                	<em>{{xfmx.end_date | strDateFomater}}</em>
					                                </div>
					                                
					                                <div class="timeMoney">
					                                	<div class="xiaofeijine">
					                                		<span>消费总额</span>
					                                		<cite v-bind:title="xfmx.consume_amount | currency">{{xfmx.consume_amount | currency}}</cite>
					                                	</div>
					                                	<div class="xiaofeijine">
					                                		<span>充值金额</span>
					                                		<cite v-bind:title="xfmx.topup_amount | currency">{{xfmx.topup_amount | currency}}</cite>
					                                	</div>
					                                </div>
					                                
					                                <div class="timeTotalMoney">
					                                	<div class="xiaofeijine">
					                                		<span>累计消费总额</span>
					                                		<cite v-bind:title="xfmx.total_consume_amount | currency">{{xfmx.total_consume_amount | currency}}</cite>
					                                	</div>
					                                	<div class="xiaofeijine">
					                                		<span>累计充值总额</span>
					                                		<cite v-bind:title="xfmx.total_topup_amount | currency">{{xfmx.total_topup_amount | currency}}</cite>
					                                	</div>
					                                	<div class="xiaofeijine">
					                                		<span>累计储值余额</span>
					                                		<cite v-bind:title="xfmx.account_balance | currency">{{xfmx.account_balance | currency}}</cite>
					                                	</div>
					                                </div>
												</div>
												<strong  slot="reference" @mouseover="getxxmx(item.customer_id,$event)"  @mouseleave="changeImageColor($event)">
													<b v-bind:title="item.customer_name">{{item.customer_name | stringformat(6)}}</b>
													<cite>{{item.amount | currency}}</cite>
													<svg width="8px" height="13px" viewBox="0 0 8 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
													    <title>Combined Shape</title>
													    <desc>Created with Sketch.</desc>
													    <defs></defs>
													    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													        <g id="01CRM首页-第一期-默认状态" transform="translate(-1278.000000, -691.000000)" fill="#C1CED6">
													            <g id="Group-6-Copy-2" transform="translate(495.000000, 566.000000)">
													                <g id="Group-9-Copy-2" transform="translate(609.000000, 19.000000)">
													                    <g id="Group-10" transform="translate(0.000000, 103.000000)">
													                        <path d="M178.156854,7.20710678 L183.460155,12.5104076 C183.655417,12.7056698 183.972,12.7056698 184.167262,12.5104076 C184.362524,12.3151455 184.362524,11.998563 184.167262,11.8033009 L178.510408,6.14644661 C178.412777,6.04881554 178.284815,6 178.156854,6 C178.028893,6 177.900932,6.04881554 177.803301,6.14644661 L172.146447,11.8033009 C171.951184,11.998563 171.951184,12.3151455 172.146447,12.5104076 C172.341709,12.7056698 172.658291,12.7056698 172.853553,12.5104076 L178.156854,7.20710678 Z" id="Combined-Shape" transform="translate(178.156854, 9.328427) rotate(-270.000000) translate(-178.156854, -9.328427) "></path>
													                    </g>
													                </g>
													            </g>
													        </g>
													    </g>
													</svg>
												</strong>
								    </el-popover>
		                        </li>
		                    </ul>
		                </div>
		                
		           </div>
		        <!--近7天-->
		        
		         <!--近14天-->
		            
		           <!--近14天-->
		       
		         <!--近30天-->
		            
		          <!--近30天-->
		          
		          </div>
		           <!--营运排行榜结束-->
		            <div class="fd"></div>
		        </div>
		        
		    </div>
		    <!--营运排行榜 -->		        
		</div>
		<div class="fot_renz">Copyright© 2001-2017 All Rights Reserved.  </div>
</div>		
</template>
  <script>
			
	import Assist from '../utils/assist';
	import Index from '../utils/index';
	import Vue from "vue";
	import bus from "@/assets/js/bus.js";
	import { TzxTreeSelect } from '@/components/tzxtreeselect';
    import { TzxTag } from '@/components/tag'
	import axios from "axios";
	import {getIndex,getJdsj,getMendian,getPangb,getXxqk,getCdsj} from '@/api/home'
	import {TzxCircle } from '@/components/circle'	
	import {getSafeWarn,startSafe} from '@/api/safety'
  export default {
  	components:{TzxTreeSelect,TzxTag,TzxCircle},
  	computed : {
        circle_loading() {
            return (this.circle_loading1 && this.circle_loading2 && this.circle_loading3)
        }
    },
    data() {
      return {
      	//11111111111
      	treedata:{"success":true,"msg":"成功","data":[{"children":[{"count":0,"id":0,"label":"品牌总部","labelc":"品牌总部"},{"count":3,"id":90,"label":"北京测试","type":1,"children":[{"count":0,"id":129,"label":"北京测试2","type":3,"plabels":"北京测试","labelc":"北京测试2"},{"count":0,"id":124,"label":"北方项目","type":3,"plabels":"北京测试","labelc":"北方项目"},{"count":0,"id":91,"label":"五道口","type":3,"plabels":"北京测试","labelc":"五道口"}],"labelc":"北京测试(3)"},{"count":5,"id":108,"label":"产品中心测试专用","type":1,"children":[{"count":0,"id":111,"label":"李露测试门店01","type":3,"plabels":"产品中心测试专用","labelc":"李露测试门店01"},{"count":0,"id":114,"label":"黄娟的店测试专用","type":3,"plabels":"产品中心测试专用","labelc":"黄娟的店测试专用"},{"count":0,"id":113,"label":"李露测试门店03","type":3,"plabels":"产品中心测试专用","labelc":"李露测试门店03"},{"count":0,"id":112,"label":"李露测试门店02","type":3,"plabels":"产品中心测试专用","labelc":"李露测试门店02"},{"count":0,"id":181,"label":"朱磊测试门店","type":3,"plabels":"产品中心测试专用","labelc":"朱磊测试门店"}],"labelc":"产品中心测试专用(5)"},{"count":3,"id":144,"label":"供应链测试","type":1,"children":[{"count":0,"id":148,"label":"门店3","type":3,"plabels":"供应链测试","labelc":"门店3"},{"count":0,"id":146,"label":"门店1","type":3,"plabels":"供应链测试","labelc":"门店1"},{"count":0,"id":147,"label":"门店2","type":3,"plabels":"供应链测试","labelc":"门店2"}],"labelc":"供应链测试(3)"},{"count":2,"id":105,"label":"zcs","type":1,"children":[{"count":0,"id":107,"label":"蓝天白云","type":3,"plabels":"zcs","labelc":"蓝天白云"},{"count":0,"id":106,"label":"白云店","type":3,"plabels":"zcs","labelc":"白云店"}],"labelc":"zcs(2)"},{"count":1,"id":74,"label":"面香八方","type":1,"children":[{"count":0,"id":75,"label":"面香八方现代城店","type":3,"plabels":"面香八方","labelc":"面香八方现代城店"}],"labelc":"面香八方(1)"},{"count":2,"id":76,"label":"自定义","type":1,"children":[{"count":0,"id":77,"label":"第一家餐厅","type":3,"plabels":"自定义","labelc":"第一家餐厅"},{"count":0,"id":78,"label":"第二家餐厅","type":3,"plabels":"自定义","labelc":"第二家餐厅"}],"labelc":"自定义(2)"},{"count":1,"id":70,"label":"脸谱","type":1,"children":[{"count":0,"id":71,"label":"朝阳门店","type":3,"plabels":"脸谱","labelc":"朝阳门店"}],"labelc":"脸谱(1)"},{"count":20,"id":2,"label":"实施专用分公司","type":1,"children":[{"count":0,"id":87,"label":"测试店","type":3,"plabels":"实施专用分公司","labelc":"测试店"},{"count":0,"id":34,"label":"实施专用101","type":3,"plabels":"实施专用分公司","labelc":"实施专用101"},{"children":[{"count":0,"id":13,"label":"yitaoshi","type":3,"plabels":"实施门店1-实施专用分公司","labelc":"yitaoshi"},{"count":0,"id":117,"label":"复华测试店","type":3,"plabels":"实施门店1-实施专用分公司","labelc":"复华测试店"},{"count":0,"id":121,"label":"实施测试0421","type":3,"plabels":"实施门店1-实施专用分公司","labelc":"实施测试0421"},{"count":0,"id":12,"label":"sundanen-ceshi","type":3,"plabels":"实施门店1-实施专用分公司","labelc":"sundanen-ceshi"},{"count":0,"id":54,"label":"上海实施测试1","type":3,"plabels":"实施门店1-实施专用分公司","labelc":"上海实施测试1"},{"count":0,"id":18,"label":"测试门店4","type":3,"plabels":"实施门店1-实施专用分公司","labelc":"测试门店4"}],"plabels":"实施专用分公司","count":6,"id":5,"label":"实施门店1","type":1,"labelc":"实施门店1(6)"},{"count":0,"id":99,"label":"zlx测试","type":3,"plabels":"实施专用分公司","labelc":"zlx测试"},{"count":0,"id":103,"label":"Majc","type":3,"plabels":"实施专用分公司","labelc":"Majc"},{"count":0,"id":7,"label":"测试门店2","type":3,"plabels":"实施专用分公司","labelc":"测试门店2"},{"count":0,"id":123,"label":"实施测试HDB866","type":3,"plabels":"实施专用分公司","labelc":"实施测试HDB866"},{"count":0,"id":4,"label":"测试门店1","type":3,"plabels":"实施专用分公司","labelc":"测试门店1"},{"count":0,"id":33,"label":"实施门店12","type":3,"plabels":"实施专用分公司","labelc":"实施门店12"},{"count":0,"id":42,"label":"亮健容天测试","type":3,"plabels":"实施专用分公司","labelc":"亮健容天测试"},{"count":0,"id":11,"label":"实施门店2","type":3,"plabels":"实施专用分公司","labelc":"实施门店2"},{"count":0,"id":30,"label":"实施门店6","type":3,"plabels":"实施专用分公司","labelc":"实施门店6"},{"count":0,"id":14,"label":"实施门店3","type":3,"plabels":"实施专用分公司","labelc":"实施门店3"},{"count":0,"id":36,"label":"实施测试7","type":3,"plabels":"实施专用分公司","labelc":"实施测试7"},{"count":0,"id":45,"label":"云南xx酒楼","type":3,"plabels":"实施专用分公司","labelc":"云南xx酒楼"},{"count":0,"id":27,"label":"实施门店5","type":3,"plabels":"实施专用分公司","labelc":"实施门店5"},{"count":0,"id":58,"label":"ns","type":3,"plabels":"实施专用分公司","labelc":"ns"},{"count":0,"id":53,"label":"昆明测试门店90","type":3,"plabels":"实施专用分公司","labelc":"昆明测试门店90"},{"count":0,"id":93,"label":"relayh测试门店","type":3,"plabels":"实施专用分公司","labelc":"relayh测试门店"},{"count":0,"id":94,"label":"范文涛","type":3,"plabels":"实施专用分公司","labelc":"范文涛"}],"labelc":"实施专用分公司(20)"},{"count":11,"id":3,"label":"开发专用分公司","type":1,"children":[{"count":0,"id":140,"label":"OM认证测试","type":3,"plabels":"开发专用分公司","labelc":"OM认证测试"},{"count":0,"id":128,"label":"开店流程测试","type":3,"plabels":"开发专用分公司","labelc":"开店流程测试"},{"count":0,"id":40,"label":"0305开发郭沈厅","type":3,"plabels":"开发专用分公司","labelc":"0305开发郭沈厅"},{"count":0,"id":24,"label":"开发门店2","type":3,"plabels":"开发专用分公司","labelc":"开发门店2"},{"count":0,"id":46,"label":"张晓丽测试专用","type":3,"plabels":"开发专用分公司","labelc":"张晓丽测试专用"},{"count":0,"id":38,"label":"开发高健","type":3,"plabels":"开发专用分公司","labelc":"开发高健"},{"count":0,"id":80,"label":"分公司测试123","type":3,"plabels":"开发专用分公司","labelc":"分公司测试123"},{"count":0,"id":37,"label":"白青冉专用测试","type":3,"plabels":"开发专用分公司","labelc":"白青冉专用测试"},{"count":0,"id":72,"label":"演示专用","type":3,"plabels":"开发专用分公司","labelc":"演示专用"},{"children":[{"count":0,"id":68,"label":"物流测试01店","type":3,"plabels":"物流测试专用-开发专用分公司","labelc":"物流测试01店"}],"plabels":"开发专用分公司","count":1,"id":66,"label":"物流测试专用","type":1,"labelc":"物流测试专用(1)"},{"count":0,"id":6,"label":"开发门店1","type":3,"plabels":"开发专用分公司","labelc":"开发门店1"}],"labelc":"开发专用分公司(11)"},{"count":32,"id":1,"label":"测试专用分公司","type":1,"children":[{"count":0,"id":199,"label":"测试门店21ww","type":3,"plabels":"测试专用分公司","labelc":"测试门店21ww"},{"count":0,"id":200,"label":"测试门店20yk","type":3,"plabels":"测试专用分公司","labelc":"测试门店20yk"},{"count":0,"id":201,"label":"测试新增","type":3,"plabels":"测试专用分公司","labelc":"测试新增"},{"count":0,"id":120,"label":"实施李浩测试","type":3,"plabels":"测试专用分公司","labelc":"实施李浩测试"},{"count":0,"id":101,"label":"ceshi","type":3,"plabels":"测试专用分公司","labelc":"ceshi"},{"count":0,"id":97,"label":"测试望京店勿动","type":3,"plabels":"测试专用分公司","labelc":"测试望京店勿动"},{"count":0,"id":196,"label":"s测试14","type":3,"plabels":"测试专用分公司","labelc":"s测试14"},{"count":0,"id":16,"label":"报表专用测试（勿动）","type":3,"plabels":"测试专用分公司","labelc":"报表专用测试（勿动）"},{"count":0,"id":28,"label":"快餐自动化（ZC勿动）","type":3,"plabels":"测试专用分公司","labelc":"快餐自动化（ZC勿动）"},{"count":0,"id":29,"label":"天子星望京店","type":3,"plabels":"测试专用分公司","labelc":"天子星望京店"},{"count":0,"id":73,"label":"localw快餐测试","type":3,"plabels":"测试专用分公司","labelc":"localw快餐测试"},{"count":0,"id":31,"label":"测试门店18勿动","type":3,"plabels":"测试专用分公司","labelc":"测试门店18勿动"},{"count":0,"id":15,"label":"测试门店6","type":3,"plabels":"测试专用分公司","labelc":"测试门店6"},{"count":0,"id":98,"label":"刘美丽微信测试专用","type":3,"plabels":"测试专用分公司","labelc":"刘美丽微信测试专用"},{"count":0,"id":122,"label":"北区项目实施测试用","type":3,"plabels":"测试专用分公司","labelc":"北区项目实施测试用"},{"count":0,"id":88,"label":"postest勿动","type":3,"plabels":"测试专用分公司","labelc":"postest勿动"},{"count":0,"id":25,"label":"正餐自动化（KC勿动）","type":3,"plabels":"测试专用分公司","labelc":"正餐自动化（KC勿动）"},{"count":0,"id":151,"label":"822测试","type":3,"plabels":"测试专用分公司","labelc":"822测试"},{"count":0,"id":156,"label":"门店A","type":3,"plabels":"测试专用分公司","labelc":"门店A"},{"count":0,"id":184,"label":"ljl测试","type":3,"plabels":"测试专用分公司","labelc":"ljl测试"},{"count":0,"id":168,"label":"青岛海鲜专卖店","type":3,"plabels":"测试专用分公司","labelc":"青岛海鲜专卖店"},{"count":0,"id":163,"label":"黄焖鸡","type":3,"plabels":"测试专用分公司","labelc":"黄焖鸡"},{"count":0,"id":85,"label":"localw正餐测试","type":3,"plabels":"测试专用分公司","labelc":"localw正餐测试"},{"children":[{"count":0,"id":167,"label":"测试123","type":3,"plabels":"华南区测试-测试专用分公司","labelc":"测试123"}],"plabels":"测试专用分公司","count":1,"id":166,"label":"华南区测试","type":1,"labelc":"华南区测试(1)"},{"count":0,"id":174,"label":"济南测试","type":3,"plabels":"测试专用分公司","labelc":"济南测试"},{"count":0,"id":165,"label":"测试店面","type":3,"plabels":"测试专用分公司","labelc":"测试店面"},{"count":0,"id":197,"label":"zyx没有初始化的机构","type":3,"plabels":"测试专用分公司","labelc":"zyx没有初始化的机构"},{"count":0,"id":9,"label":"正餐-秒付-Netty11","type":3,"plabels":"测试专用分公司","labelc":"正餐-秒付-Netty11"},{"count":0,"id":19,"label":"杨旭测试店","type":3,"plabels":"测试专用分公司","labelc":"杨旭测试店"},{"count":0,"id":17,"label":"测试门店8","type":3,"plabels":"测试专用分公司","labelc":"测试门店8"},{"count":0,"id":83,"label":"一鸣的没店","type":3,"plabels":"测试专用分公司","labelc":"一鸣的没店"},{"count":0,"id":10,"label":"测试门店5","type":3,"plabels":"测试专用分公司","labelc":"测试门店5"}],"labelc":"测试专用分公司(32)"},{"count":1,"id":176,"label":"分公司1","type":1,"children":[{"count":0,"id":178,"label":"测试门店","type":3,"plabels":"分公司1","labelc":"测试门店"}],"labelc":"分公司1(1)"},{"count":2,"id":185,"label":"沙县小吃001","type":1,"children":[{"count":0,"id":186,"label":"测试门店001","type":3,"plabels":"沙县小吃001","labelc":"测试门店001"},{"count":0,"id":187,"label":"测试门店002","type":3,"plabels":"沙县小吃001","labelc":"测试门店002"}],"labelc":"沙县小吃001(2)"}],"count":13,"id":-1,"label":"全部机构","labelc":"全部机构"}]},
      	//22222222222
      	
      	defaultTreeProps: {
			children: 'children',
			label: 'labelc',
			name: 'label',
			id: 'id',
			count: 'count'
		},
      	mendianjiantou:true,
      	mendianjiantou2:true,
      	loading1:false,
      	loading2:false,
      	loading3:false,
      	loading4:false,
      	jdsj_jiantou:true,
      	shops:"",
      	backtop:false,
      	isActive:true,
      	visible: false,
      	visible2:false,
      
      	//indexdata:{},
      	totalcount:0,
      	totalcount22:0,
       //门店开始
		storeData:[],
		storeDialogVisible:false,
		storeCheckedIds:[],
		storeCheckedIds2:[],
		storeNodes:[],
		storeNodes_template:[],
		storeTotal:0,
		storeNodes2:[],
		storeNodes_template2:[],
		storeTotal2:0,
		checkedIds2:[],
		data:[],
		checkedIds:[],
		nodes:[],
		nodes_dish:[],//点击确定按钮 才让选择的菜品展示 不能做数据双向绑定
		total:0,
		is_find:false,
		//门店结束
		
        cdsj:{
        	shops:'',
        	total_fans_and_customer_num:0,
        	total_fans:0,
        	total_fans_scale:0,
        	total_customer_num:0,
        	total_customer_num_scale:0,
        	customer_consume_num_scale:0,
        	customer_consume_num:0,
        	total_consume_num:0,
        	customer_consume_amount_scale:0,
        	customer_consume_amount:0,
        	total_consume_amount:0,
        	customer_rechange_amount:0,
        	customer_subside_amount:0
        },//沉淀数据
        jdsj:{
        	shops:'',
        	customer_consume_amount:0,
        	customer_consume_amount_ring:0,
        	customer_rechange_amount:0,
        	customer_rechange_amount_ring:0,
        	fans_num:0,	
        	fans_num_ring:0,
        	add_customer_num:0,
        	add_customer_num_ring:0
        },//阶段统计数据
        phpsj:{},//排行榜数据
        xfmx:{},//消费明星
        score:50,
		score1:0,
		score2:50,
		score3:0,
		score4:50,
		score5:0,
		add1:'-',
		add2:'-',
		add3:'-',
		loadingform:false,
		basicWarn:{},
		consumeWarn:{},
		operateWarn:{},
		showText:'展开',
        show:false,
        circle_loading1 : true,
		circle_loading2 : true,
		circle_loading3 : true,
		report_date:''
      }
    },
    methods: {
	   /* search:function(data){
	    	this.filterNode(this.filterText,data);
	    },*/
    	//加载首页数据
    	clickShow(circle_loading){
            if(circle_loading){
            	this.show = !this.show;
				this.showText = this.show ? '收起' : '展开'
				this.$refs.safity_circle.style.height = this.show ? '446px' : '186px';
				this.$refs.circle_show.style.paddingBottom = this.show ? '0' : '20px';
				this.$refs.circle1.style.height = this.show ? '260px' : '20px';
				this.$refs.circle2.style.height = this.show ? '260px' : '20px';
				this.$refs.circle3.style.height = this.show ? '260px' : '20px';
            }
		},
		set_operate(){
			this.$router.push({
				path:'/tool/anquanzhenduan',
				hash:'#new'
			})
		},
    	loadIndex(){
    		this.loading4 = true;
    		this.loading2 = true;
    		this.loading3 = true;
    		
    		_czc.push(["_trackEvent", "首页统计数据", "打开"]);//统计流量
    		getIndex().then((response) => {
    			if(response.success){
    				this.shops = response.shops;
					this.cdsj = response.subside;
					this.jdsj = response.section;
					this.phpsj = response.operation;
    			}else{
    				this.$message({
						type: 'error',
						message: response.msg
					});
    			}
    			this.loading4 = false;
	    		this.loading2 = false;
	    		this.loading3 = false;
			}).catch(() => {
				this.loading4 = false;
	    		this.loading2 = false;
	    		this.loading3 = false;
				this.$message({
					type: 'error',
					message: response.msg
				});
			});
    	},
    	loadTree(){
    		//this.storeData = this.treedata.data;
			getMendian().then((response) => {
				this.storeData =  response.data;
			}).catch(() => {
				this.$message({
					type: 'error',
					message: response.msg
				});
			});
		},
		jdsjfun:function(e){//阶段数据
			/*this.loading2 = true;*/
			var el = e.currentTarget;
			var days = el.getElementsByTagName("span")[0].innerHTML;
			var arrays = [];
			let shops = [];
			this.storeNodes2.forEach(item =>{
				arrays.push(item.id);
				shops.push(item.label);
			});
			var store_ids = arrays.join(",").toString();
			let len = shops.length;
			shops = shops.slice(0,2);
			let shops_show = shops.join(",").toString();
			if(len>0){
				shops_show = shops_show+"等("+len+"家)";
			}
			if(shops_show==""){
				shops_show = this.jdsj.shops;
			}
			_czc.push(["_trackEvent", "阶段数据统计-"+days+"天", "点击"]);//统计流量
			//取消默认样式，添加当前标签样式
			var el = e.currentTarget;
			el.className="hove";
			var childs = el.parentNode.childNodes;
			childs[0].className="";
			childs[2].className="";
			childs[4].className="";
			el.className="hove";
			getJdsj(days,store_ids).then((response) => {
				this.jdsj = response;
				this.jdsj.shops=shops_show;
				this.loading2 = false;
			}).catch(() => {
				this.loading2 = false;
				this.$message({
					type: 'error',
					message: response.msg
				});
			});
		},
		phbfun:function(e){
			this.loading3 = true;
			var el = e.currentTarget;
			var days = el.getElementsByTagName("span")[0].innerHTML;
			_czc.push(["_trackEvent", "运营排行榜统计-"+days+"天", "点击"]);//统计流量
			//取消默认样式，添加当前标签样式
			el.className="hove";
			var childs = el.parentNode.childNodes;
			childs[0].className="";
			childs[2].className="";
			childs[4].className="";
			el.className="hove";
			
			getPangb(days).then((response) => {
				this.phpsj = response;
				this.loading3 = false;
			}).catch(() => {
				this.loading3 = false;
				this.$message({
					type: 'error',
					message: response.msg
				});
			});
		},
		//消费明星弹出框，充值明星弹出框
		getxxmx:function(id,e){
			/*alert("asdfasdfa");*/
			_czc.push(["_trackEvent", "消费明星和充值明星", "悬浮"]);//统计流量
			//会员id
			//获取当前的时间
			let time = document.getElementById("yyphbdatatime").innerHTML.split("-");
			let start_date =time[0];
			let end_date =time[1];
			
			//当前图片替换成 hover
			let el = e.currentTarget;
			e.currentTarget.getElementsByTagName("svg")[0].getElementsByTagName("g")[1].setAttribute("fill","#0C9AFF");
			
			getXxqk(id,start_date,end_date).then((response) => {
				this.xfmx = response;
			})
		},
		changeImageColor:function(e){//改变消费明星，充值明星的箭头颜色
			e.currentTarget.getElementsByTagName("svg")[0].getElementsByTagName("g")[1].setAttribute("fill","#C1CED6");
		},
		getMendianCdsj:function(){//更新数据，关闭门店弹出框
			_czc.push(["_trackEvent", "门店树查询沉淀数据", "点击"]);//统计流量
			//{"storeIds": "1,2,3"}
			//假如门店不选 则返回
			if(this.storeNodes == ""){
				this.visible = false
				return ;
			}
			
			this.loading4 = true;
			let arrays = [];
			let shops = [];
			this.storeNodes.forEach(item =>{
				arrays.push(item.id);
				shops.push(item.label);
			});
			let store_ids = arrays.join(",").toString();
			
			let len = shops.length;
			shops = shops.slice(0,2);
			let shops_show = shops.join(",").toString();
			if(len>0){
				shops_show = shops_show+"等("+len+"家)";
			}
			getCdsj(store_ids).then((response) => {
				this.cdsj = response;
				this.cdsj.shops=shops_show;
				this.loading4 = false;
				this.mendianjiantou = true;
			}).catch(() => {
				this.loading4 = false;
				this.mendianjiantou = true;
				this.$message({
					type: 'error',
					message: response.msg
				});
			});
			
			this.visible = false
		},
		setMendianCdsj:function(){
			this.visible = false;
			this.mendianjiantou = true;
		},
		getMendianJdsj:function(e){//更新数据，关闭门店弹出框
			_czc.push(["_trackEvent", "门店树查询阶段数据", "点击"]);//统计流量
			//{"storeIds": "1,2,3"}
			this.visible2 = false;
			//假如门店不选 则返回
			if(this.storeNodes2 == ""){
				this.visible2 = false;
				return ;
			}
			
			this.loading2 = true;
			var arrays = [];
			let shops = [];
			this.storeNodes2.forEach(item =>{
				arrays.push(item.id);
				shops.push(item.label);
			});
			var store_ids = arrays.join(",").toString();
			let len = shops.length;
			shops = shops.slice(0,2);
			let shops_show = shops.join(",").toString();
			if(len>0){
				shops_show = shops_show+"等("+len+"家)";
			}
			/*var el = e.currentTarget;
			var days = el.getElementsByTagName("span")[0].innerHTML;*/
			//获取当前天数
			
			/*this.jdsj.shops=shops_show;*/
			var days = document.getElementById("day_jieduan").getElementsByClassName("hove")[0].getElementsByTagName("span")[0].innerHTML;
			getJdsj(days,store_ids).then((response) => {
				this.jdsj = response;
				this.jdsj.shops=shops_show;
				this.loading2 = false;
				this.mendianjiantou2 = true;
			}).catch(() => {
				this.loading2 = false;
				this.mendianjiantou2 = true;
				this.$message({
					type: 'error',
					message: response.msg
				});
			});
		},
		 boxChange(nodes,total){
		      	this.nodes = nodes;
		      	this.total = total;
	     },
	      storeBoxChange(nodes,total){
	      	this.storeNodes = nodes;
	      	this.storeTotal = total;
	     },
	      storeBoxChange2(nodes,total){
	      	this.storeNodes2 = nodes;
	      	this.storeTotal2 = total;
	     },
	     deleteStore(store,index){
			this.storeNodes_template.splice(index, 1);
		},
		 deleteStore2(store,index){
			this.storeNodes_template2.splice(index, 1);
		},
		setMendianJdsj:function(){
			this.visible2 = false;
			this.mendianjiantou2 = true;
		},
	   
	   changeHuiyuanImg:function(){
	   	   this.jdsj_jiantou = false;
	   },
	   changeHuiyuanImgHover:function(){
	   	  this.jdsj_jiantou = true;
	   },
	   changeMendianColor:function(e){/***click 全部门店，下来箭头变成蓝色***/
			e.currentTarget.getElementsByTagName("svg")[0].getElementsByTagName("g")[1].setAttribute("fill","#0C9AFF");
	   },
	   changMendianStatus:function(){
	   		this.mendianjiantou = false;
	   },
	   changMendianStatus2:function(){
	   		this.mendianjiantou2 = false;
	   },
	   
	   render:function(){//全屏
			document.getElementsByClassName("app-header")[0].getElementsByClassName("el-row")[0].style.width="1275px";  
			document.getElementsByClassName("app-wrapper")[0].style.width="1275px";
			document.getElementsByClassName("Zcen_nr")[0].style.width="1275px";
			document.getElementsByClassName("Zcen_nr")[0].getElementsByClassName("right_nr")[0].style.width="1102px";
			document.getElementsByClassName("fot_cen")[0].style.width="1275px";
			document.getElementsByClassName("mybox")[0].style.width="1275px";
			document.getElementsByClassName("avatar-container")[0].style.marginRight="0px";
		},
		start1(){
				let start = setInterval(()=>{
					if(this.add1=='-'){						
						if(this.score == 0){
							this.add1 = '+'
						}
						if(this.score >= 1){
							this.score -= 1;
						}
						
					}
					else{
						if(this.score< this.score1){
							this.score += 1;
						}
						if(this.score ==  this.score1){
							this.add1 = '-'
							this.circle_loading1 = true;
							clearInterval(start);
						}
					}				
				},100)
			},
			start2(){
				let start = setInterval(()=>{
					if(this.add2=='-'){						
						if(this.score2 == 0){
							this.add2 = '+'
						}
						if(this.score2 >= 1){
							this.score2 -= 1;
						}
					}
					else{
						if(this.score2< this.score3){
							this.score2 += 1;
						}
						if(this.score2 ==  this.score3){
							this.add2 = '-'
							this.circle_loading2 = true;
							clearInterval(start);
						}
					}				
				},100)
			 
				
			},
			start3(){
				let start = setInterval(()=>{
					if(this.add3=='-'){						
						if(this.score4 == 0){
							this.add3 = '+'
						}
						if(this.score4 >= 1){
							this.score4 -= 1;
						}
					}
					else{
						if(this.score4< this.score5){
							this.score4 += 1;
						}
						if(this.score4 ==  this.score5){
							this.add3 = '-'
							this.circle_loading3 = true;
							clearInterval(start);
						}
					}				
				},100)
			},
		getSafeWarn(){
				this.circle_loading1 = false;
				this.circle_loading2 = false;
				this.circle_loading3 = false;
				getSafeWarn().then(response => {
					if(response.success){
						this.report_date = response.date;
						if(!response.basicWarn.basicList){
							this.$message({
								type:'error',
								message:'初始化数据异常,请手动诊断!'
							})
							this.circle_loading1 = true;
							this.circle_loading2 = true;
							this.circle_loading3 = true;
							return;
						}
						
						if(response.basicWarn.basicList.length != 0){
							response.basicWarn.basicList.map((item,index) =>{
								let num = isNaN(parseInt(item.warn_real))? 0 : parseInt(item.warn_real);
								if(item.warn_key == 'marketing_sms_remained_count'){
									item.warn_text = '营销短信剩余'+num+'条';
								}
								if(item.warn_key == 'trade_sms_remained_count'){
									item.warn_text = '交易短信剩余'+num +'条';
								}
								if(item.warn_key == 'member_level'){
									item.warn_text = '会员等级'
								}
							})
						}
						if(response.consumeWarn.consumeList.length != 0){
							response.consumeWarn.consumeList.map((item,index) =>{
								if(item.warn_key == 'stored_times'){
									item.warn_text = '储值次数'
								}
								if(item.warn_key == 'stored_money'){
									item.warn_text = '单笔储值金额'
								}
								if(item.warn_key == 'stored_consume_times'){
									item.warn_text = '储值消费次数'
								}
								if(item.warn_key == 'stored_per_consume_money'){
									item.warn_text = '单笔储值消费额'
								}
								if(item.warn_key == 'credit_add_times'){
									item.warn_text ='积分增加次数'
								}
								if(item.warn_key == 'credit_add_amount'){
									item.warn_text = '单笔积分增加额'
								}
								if(item.warn_key == 'credit_consume_times'){
									item.warn_text = '积分消费次数'
								}
								if(item.warn_key == 'credit_per_consume_amount'){
									item.warn_text ='单笔积分消费额'
								}							
							})
						}
						if(response.operateWarn.operateList.length != 0){
							response.operateWarn.operateList.map((item,index) =>{
								if(item.warn_key == 'credit_adjust_count'){
									item.warn_text = '积分调账次数'
								}
								if(item.warn_key == 'amount_adjust_count'){
									item.warn_text = '储值金额调账次数'
								}								
							})
						}			
						this.basicWarn = response.basicWarn;
						this.consumeWarn = response.consumeWarn;
						this.operateWarn = response.operateWarn;
						this.score1 = response.basicWarn.basicScore;
						this.score3 = response.consumeWarn.consumeScore;
						this.score5 = response.operateWarn.operateScore;						
						this.start1();
						this.start2();
						this.start3();	
					}
					
				}).then(e => {
					console.log(e)
				})
			},
			startAnalysis(){
				this.circle_loading1 = false;
				this.circle_loading2 = false;
				this.circle_loading3 = false;
				if(this.show){
					this.show = !this.show;
					this.showText = this.show ? '收起' : '展开'
					this.$refs.safity_circle.style.height = this.show ? '446px' : '186px';
					this.$refs.circle_show.style.paddingBottom = this.show ? '0' : '20px';
					this.$refs.circle1.style.height = this.show ? '260px' : '20px';
					this.$refs.circle2.style.height = this.show ? '260px' : '20px';
					this.$refs.circle3.style.height = this.show ? '260px' : '20px';
				}	
				startSafe().then(response => {
					this.report_date = response.date;
					if(response.success){
						if(!response.basicWarn.basicList){
							this.$message({
								type:'error',
								message:'初始化数据异常,请手动诊断!'
							})
							this.circle_loading1 = true;
							this.circle_loading2 = true;
							this.circle_loading3 = true;
							return;
						}						
						if(response.basicWarn.basicList.length != 0){
							response.basicWarn.basicList.map((item,index) =>{
								let num = isNaN(parseInt(item.warn_real))? 0 : parseInt(item.warn_real);
								if(item.warn_key == 'marketing_sms_remained_count'){
									item.warn_text = '营销短信剩余'+ num +'条'
								}
								if(item.warn_key == 'trade_sms_remained_count'){
									item.warn_text = '交易短信剩余'+ num +'条'
								}
								if(item.warn_key == 'member_level'){
									item.warn_text = '会员等级'
								}
							})
						}
						if(response.consumeWarn.consumeList.length != 0){
							response.consumeWarn.consumeList.map((item,index) =>{
								if(item.warn_key == 'stored_times'){
									item.warn_text = '储值次数'
								}
								if(item.warn_key == 'stored_money'){
									item.warn_text = '单笔储值金额'
								}
								if(item.warn_key == 'stored_consume_times'){
									item.warn_text = '储值消费次数'
								}
								if(item.warn_key == 'stored_per_consume_money'){
									item.warn_text = '单笔储值消费额'
								}
								if(item.warn_key == 'credit_add_times'){
									item.warn_text ='积分增加次数'
								}
								if(item.warn_key == 'credit_add_amount'){
									item.warn_text = '单笔积分增加额'
								}
								if(item.warn_key == 'credit_consume_times'){
									item.warn_text = '积分消费次数'
								}
								if(item.warn_key == 'credit_per_consume_amount'){
									item.warn_text ='单笔积分消费额'
								}							
							})
						}
						if(response.operateWarn.operateList.length != 0){
							response.operateWarn.operateList.map((item,index) =>{
								if(item.warn_key == 'credit_adjust_count'){
									item.warn_text = '积分调账次数'
								}
								if(item.warn_key == 'amount_adjust_count'){
									item.warn_text = '储值金额调账次数'
								}								
							})
						}			
						this.basicWarn = response.basicWarn;
						this.consumeWarn = response.consumeWarn;
						this.operateWarn = response.operateWarn;
						this.score1 = response.basicWarn.basicScore;
						this.score3 = response.consumeWarn.consumeScore;
						this.score5 = response.operateWarn.operateScore;						
						this.start1();
						this.start2();
						this.start3();	
					}
				})
			},
	},
	mounted() {
		//查询360°安全诊断
		this.getSafeWarn();
	},
	destroyed() {
	},
	created() {//下面的是boss 请求地址 
		this.loadTree();
		this.loadIndex();
			
	}
};
</script>
<style >
	    .safety_tooltip_li{
	    	display: block;
	    	height: 22px;
	    	line-height: 22px;
	    }
	    .safety_tooltip_left{
	    	float: left;
	    	height: 8px;
	    	width: 8px;
	    	margin-top: 8px;
	    	border-radius: 50%;
	    }
	     .safety_tooltip_center{
	    	float: left;
	    	font-size: 12px;
	    	margin-left: 3px;
            color: #34495E;
	    }
	     .safety_tooltip_right{
	    	float: right;
	    	font-size: 12px;
			color: #6F7E8D;
	    }
		.safety_class{
			transition: width .6s;
			background: #FFFFFF;
		}
		.safety_tooltip{
			background: #FFFFFF;
			border: 1px solid #cad4da !important;
			box-shadow: 0 4px 4px 0 rgba(0,0,0,0.05);
			border-radius: 3px;
		}
		.safety_header{
			height: 50px;
			padding-left: 20px;
			padding-right: 20px;
			border-bottom: 1px dotted #EAF1F6;
		}
		.safety_header .safity_title_span {
			height: 50px;
			line-height: 50px;
			float: left;
		} 
		.safety_header .safity_title {
		    padding-top: 14px;
			float: left;
		} 
		.safety_header .safity_title1 {
		    padding-top: 16px;
		    margin-right: 20px;
			float: right;
		}
		.safety_header .safity_title2 {
		    padding-top: 16px;
		    margin-right: 20px;
			float: right;
		}
		.safety_header .safity_title3 {
		    padding-top: 16px;
		    margin-right: 20px;
			float: right;
		}
		.safety_header .safity_title1 span{
		    font-size: 14px;
			color: #0C9AFF;
		} 
		.safety_header .safity_title1 span:hover{
		    font-size: 14px;
			color: #0C9AFF;
			cursor: pointer;
		} 
		.safety_header .safity_title2 span{
		    font-size: 14px;
			color: #9AABB8;
		}
		.safety_header .safity_title3 span{
		    font-size: 14px;
			color: #9AABB8;
		}     
		.safety_header .safity_title_span span{
			height: 50px;
			line-height: 50px;
			font-size: 16px;
		}
	
		.safity_title .circle_doctor{
			position: relative;
		    height: 20px;
		    width: 72px;
		    border-radis: 3px;
		    padding-left: 10px;
		    border-radius: 3px;
		    border: 1px solid #E7EDF1;
		    margin-left: 20px;
		    font-size: 12px;
		    line-height: 20px;
		    background: #F2F6FB;
		    color: #9AABB8;
		}
		.safity_title .circle_doctor1{
			position: relative;
		    height: 22px;
		    border-radius: 3px;
		    padding-left: 10px;
		    padding-right: 10px;
		    margin-left: 20px;
		    font-size: 12px;
		    line-height: 22px;
		    background: #0C9AFF;
		    cursor: pointer;
		    color: #FFFFFF;
		}
		.safity_title .circle_doctor .loading-center{
			position: absolute;
		    left: 59%;
		    bottom: 29%;
		    width: 90px;
		}
		.safity_title .circle_doctor .circle{
			width: 2px;
			height: 2px;
			background-color: #9AABB8;
			float: left;
			margin-right: 5px;
			-moz-border-radius: 50% 50% 50% 50%;
			-webkit-border-radius: 50% 50% 50% 50%;
			border-radius: 50% 50% 50% 50%;
		}
		.safity_title .circle_doctor .circle1{
			animation: object_one1 1.5s infinite;
		}
		.safity_title .circle_doctor .circle2{
			animation: object_two1 1.5s infinite;
			animation-delay: 0.25s;
		}
		.safity_title .circle_doctor .circle3{
			animation: object_three1 1.5s infinite;
			animation-delay: 0.5s;
		}
		@keyframes object_one1 {
			75% { 
			    transform: scale(0);
			    -webkit-transform: scale(0);
		    }
		}  
		@keyframes object_two1 {
			75% { 
			    transform: scale(0);
			    -webkit-transform: scale(0);
			}
		}  
		@keyframes object_three1 {			
			75% { 
			    transform: scale(0);
			    -webkit-transform: scale(0);
			}
		}  		
		.safity_circle{
			height: 186px;
			transition: height 0.6s;
		}
		.safity_circle li{
			display: block;
			width: 33.3%;
			float: left;
			list-style: none;
			text-align: center;	
		}
		.safity_circle li .circle-text{
			background: #FFFFFF;
			height:20px;
			position: relative;
			margin-top: 26px;
			margin-bottom: 14px;
			overflow: hidden;
			transition: height 0.6s;
		}
		.safity_circle li .circle-text span{
			display: block;
			font-size: 16px;
			color: #34495E;	
			margin-bottom: 14px;	
		}
		.safity_circle li .circle-text .circle-left{
			float: left;
			width: 60%;
			padding-left: 20%;
		}
		.safity_circle li .circle-text .circle-left li{
			width: 100%;
			height: 28px;
			line-height: 28px;
			font-size: 14px;
			color: #34495E;	
			text-align: left;
			opacity: 0.7;
		}
		.safity_circle li .circle-text .circle-right{
			float: right;
			width: 20%;
		}
		.safity_circle li .circle-text .circle-right li{
			width: 100%;
			height: 28px;
			line-height: 28px;
			color: #34495E;	
			opacity: 0.7;
			text-align: left;
		}
		.safity_circle li .circle-text .circle-right li .normal{
			font-size: 14px;
			color: #56C94F;
		}
		.safity_circle li .circle-text .circle-right li .exception{
			font-size: 14px;
			color: #FF7171;
		}
		.circle-show{
			height: 56px;
			margin-left: 20px;
			margin-right: 20px;
			padding-bottom: 20px;
		}	
		.circle-show .circle-line{
			border-bottom: 1px dotted  #F1F1F1;
			height:10px;
			width: 45%;
			float:left;
			transition: width .6s;		
		}
		.circle-show .circle-line:nth-of-type(1){
			width: 485px;
		}
		.circle-show .circle-button{
			position: relative;
			cursor: pointer;
			width: 90px;
			float:left;	
			height:20px;
			line-height: 20px;
			text-align: center;
			background: #FFFFFF;
			border:1px solid  #E6E6E6;
			border-radius: 10px;
		} 
		.circle-show .circle-button span{
			font-size:12px;
			color:#666666;
		}
		.circle-show .circle-button .el-icon-caret-bottom:before{
			color:#E6E6E6;
			font-size: 11px;
		}
		.circle-show .circle-button .el-icon-caret-top:before{
			color:#E6E6E6;
			font-size:11px;
		}
		.circle-show .circle-button .loading-center{
	        position: absolute;
		    left: 18%;
		    bottom: 29%;
		    width: 90px;
		}
		.circle-show .circle-button .circle{
			width: 6px;
			height: 6px;
			background-color: #0C9AFF;
			float: left;
			margin-right: 20px;
			-moz-border-radius: 50% 50% 50% 50%;
			-webkit-border-radius: 50% 50% 50% 50%;
			border-radius: 50% 50% 50% 50%;
		}
		.circle-show .circle-button .circle1{
			animation: object_one 1.5s infinite;
		}
		.circle-show .circle-button .circle2{
			animation: object_two 1.5s infinite;
			animation-delay: .75s;
		}	
		.circle-show .circle-button .circle3{
			animation: object_three 1.5s infinite;
			animation-delay: 1.5s;
		}
		@keyframes object_one {				
			25% {
			  	transform: translate(11px,0px);
			}			
			50% { 
			    transform: translate(0px,0px);
			}
			75%{
			  	 transform: translate(-11px,0px);
			}
			100%{
			  	transform: translate(0px,0px);
			} 
		}  
		@keyframes object_two {		
		    25% {
		  		transform: translate(11px,0px);
		  	}			
		  	50% { 
		   		transform: translate(0px,0px);
		  	}
		  	75%{
		  	    transform: translate(-11px,0px);
		  	}
		    100%{
		  		transform: translate(0px,0px);
		  	} 
		}  
		@keyframes object_three {		
		    25% {
		  		transform: translate(11px,0px);
		    }			
		    50% { 
		    	transform: translate(0px,0px);
		  	}
		    75%{
		  	 	transform: translate(-11px,0px);
		    }
		    100%{
		  		transform: translate(0px,0px);
		    } 
		}  		
		.Zcen_nr{
			/*min-width:1275px;*/
			margin:0 auto;
			cursor:default;
			transition: width .6s;
		}
		.app-main{ background: none;}
		.Zcen_nr .right_nr{  float:left;width:100%; position:relative;transition: width .6s; }
		.Zcen_nr .right_nr .Rblack{ margin:10px 0px; background: #fff;}
		.Zcen_nr .right_nr .Rblack h1{  border-bottom:1px #EAF1F6  solid; height:50px; line-height:50px; position:relative;margin:0 20px;color: #34495E;}
		.Zcen_nr .right_nr .Rblack h1 a{margin-right:30px;display:block;}
		.Zcen_nr .right_nr .Rblack h1 a:hover{color:#34495E;}
		.Zcen_nr .right_nr .Rblack h1 a svg{margin-left:5px;vertical-align: middle;}
		.Zcen_nr .right_nr .Rblack  .zotpah > li{ float:left; position:relative;padding-top: 30px;}
		.Zcen_nr .right_nr .Rblack  .zotpah > li:nth-child(1){ width:21%; padding-left:22px;}
		.Zcen_nr .right_nr .Rblack  .zotpah > li:nth-child(2){ width:23%; padding-left:8px;}
		.Zcen_nr .right_nr .Rblack  .zotpah > li:nth-child(3){ width:26%; padding-left:8px;}
		.Zcen_nr .right_nr .Rblack  .zotpah > li:nth-child(4){ width:23%; padding-left:8px;}
		
		.Zcen_nr .right_nr .Rblack .zotpah li strong{display:block;width: 23%;font-weight: normal;;}
		
		.Zcen_nr .right_nr .Rblack  .zotpah > li em{ float:left; display:block; width:36px; text-align:center;}
		.Zcen_nr .right_nr .Rblack  .zotpah > li p{  float:left; color:#34495E; font-size:14px; line-height:14px;margin-left:10px;}
		.Zcen_nr .right_nr .Rblack  .zotpah > li p b{ color:#9AABB8; font-size:14px; font-weight:normal; }
		.Zcen_nr .right_nr .Rblack  .zotpah > li p tt{ color:#34495E; font-size:30px;margin-top:5px; display:block; line-height:30px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;}
		.Zcen_nr .right_nr .Rblack  .zotpah > li p tt.blue{ color:#0C9AFF}
		.Zcen_nr .right_nr .Rblack  .zotpah > li p cite{font-style:normal;margin-top:5px;display:block; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;}
		.Zcen_nr .right_nr .Rblack  .zotpah > li p span{margin-top:10px;display:block;margin-bottom: 52px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;}
		.Zcen_nr .right_nr .Rblack  .zotpah > li:nth-child(1) p cite,.Zcen_nr .right_nr .Rblack  .zotpah > li:nth-child(1) p span{ width: 180px;}
		.Zcen_nr .right_nr .Rblack  .zotpah > li:nth-child(2) p cite,.Zcen_nr .right_nr .Rblack  .zotpah > li:nth-child(2) p span{ width: 200px;}
		.Zcen_nr .right_nr .Rblack  .zotpah > li:nth-child(1) p cite,.Zcen_nr .right_nr .Rblack  .zotpah > li:nth-child(1) p span{ width: 240px;}
		.Zcen_nr .right_nr .Rblack  .zotpah > li:nth-child(1) p cite,.Zcen_nr .right_nr .Rblack  .zotpah > li:nth-child(1) p span{ width: 180px;}


		.Zcen_nr .right_nr .Rblack  .zotpah > li p{display: block;}
		.Zcen_nr .right_nr .Rblack  .zotpah > li p em{clear: both;float: left;display: block;}
		.Zcen_nr .right_nr .Rblack  .zotpah > li p strong{display: block;float: left; width: 80%; margin-left: 10px; margin-bottom: 20px;}
		
		.Zcen_nr .right_nr .Rblack  .zotpah > li:nth-child(4) em:nth-child(3){margin-top:20px;}
		.Zcen_nr .right_nr .Rblack  .zotpah > li:nth-child(4) p:nth-child(4){margin-top:20px;}
		.Zcen_nr .right_nr .Rblack  .zotpah > li:nth-child(4) p{width: 100%;clear: both;}
		
		.Zcen_nr .right_nr .Rblack  .zotpah .ZX_huiyuan{ width:140px; padding:5px 10px; border:1px #D8E5EC solid; position:absolute; right:-60px;  background:#fff; min-height:100px; z-index:100}
		.Zcen_nr .right_nr .Rblack  .zotpah .ZX_huiyuan em{position:absolute; left:-30px; top:23px; }
		.Zcen_nr .right_nr .Rblack  .zotpah .ZX_huiyuan span{ font-size:14px; display:block; line-height:25px;}
		.Zcen_nr .right_nr .Rblack  .zotpah .ZX_huiyuan b{ display:inline-block; width:85px; float:left; font-weight:normal}
		.Zcen_nr .right_nr .Rblack  .zotpah .ZX_huiyuan tt{ float:right}
		
		/**阶段数据**/
		.Zcen_nr .right_nr .Rblack  .zotpah2 > li{ float:left; position:relative}
		.Zcen_nr .right_nr .Rblack  .zotpah2 > li:nth-child(1){ width:28%; }
		.Zcen_nr .right_nr .Rblack  .zotpah2 > li:nth-child(2){ width:28%; }
		.Zcen_nr .right_nr .Rblack  .zotpah2 > li:nth-child(3){ width:20%; }
		.Zcen_nr .right_nr .Rblack  .zotpah2 > li:nth-child(4){ width:22%; }
		
		.Zcen_nr .right_nr .Rblack  .zotpah2 > li em{ float:left; display:block; width:50px; text-align:center; padding-top:30px;padding-left:15px;}
		.Zcen_nr .right_nr .Rblack  .zotpah2 > li p{  float:left; color:#34495E; font-size:14px; line-height:14px; padding-top:30px;margin-left:10px;}
		.Zcen_nr .right_nr .Rblack  .zotpah2 > li p b{ color:#9AABB8; font-size:14px; font-weight:normal; }
		.Zcen_nr .right_nr .Rblack  .zotpah2 > li p tt{ color:#34495E; font-size:30px; display:block; line-height:30px;margin-top:5px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;}
		.Zcen_nr .right_nr .Rblack  .zotpah2 > li:nth-child(1) p tt,.Zcen_nr .right_nr .Rblack  .zotpah2 > li:nth-child(2) p tt{ width:230px;}
		.Zcen_nr .right_nr .Rblack  .zotpah2 > li:nth-child(3) p tt{ width:140px;}
		.Zcen_nr .right_nr .Rblack  .zotpah2 > li p tt.blue{ color:#0C9AFF}
		.Zcen_nr .right_nr .Rblack  .zotpah2 > li p strong{display:block;margin-top:20px;margin-bottom:40px;font-weight: normal; }
		.Zcen_nr .right_nr .Rblack  .zotpah2 > li p cite{display:block; font-style:normal;margin-top:5px;clear:both;}
		.Zcen_nr .right_nr .Rblack  .zotpah2 > li p h3{display:block;float:left; font-style:normal;font-size:30px;margin-bottom:10px; line-height:30px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; max-width: 140px;}
		.api{width: 166px;height: auto;margin: 20px 15px 20px 20px;}
		.api h1{display: block;height: 14px;font-family: PingFangSC-Regular;font-size: 14px;color: #34495E;line-height: 14px;margin-top: 12px;}
		.api h1 cite{font-style:normal;float:right;}
		
		.Zcen_nr .right_nr .Rblack  .zotpah2 .ZX_huiyuan{ width:140px; padding:5px 10px; border:1px #D8E5EC solid; position:absolute; right:-60px;  background:#fff; min-height:100px; z-index:100}
		.Zcen_nr .right_nr .Rblack  .zotpah2 .ZX_huiyuan em{position:absolute; left:-30px; top:23px; }
		.Zcen_nr .right_nr .Rblack  .zotpah2 .ZX_huiyuan span{ font-size:14px; display:block; line-height:25px;}
		.Zcen_nr .right_nr .Rblack  .zotpah2 .ZX_huiyuan b{ display:inline-block; width:85px; float:left; font-weight:normal}
		.Zcen_nr .right_nr .Rblack  .zotpah2 .ZX_huiyuan tt{ float:right}
		
		.Zcen_nr .right_nr .Rblack h1 b{font-size:16px; font-weight:normal;margin-left:10px;}
		.Zcen_nr .right_nr .Rblack h1 tt{ float:right; color:#9AABB8; font-size:14px; font-weight:normal;margin-top:18px;}
		.Zcen_nr .right_nr .Rblack h1 cite{float:right; margin-left: 15px;font-style: normal;color: #9AABB8; margin-top: 18px;}
		.Zcen_nr .right_nr .Rblack h1 strong{font-weight: normal;float:right;margin-right:30px;margin-left:15px;font-family: PingFangSC-Regular;font-size: 14px;color: #9AABB8;margin-top:18px;}
		.Zcen_nr .right_nr .Rblack h1>ul{ border:1px #E4ECF1 solid; 
		   -webkit-border-radius: 3px 3px 3px 3px;
		    -moz-border-radius: 3px 3px 3px 3px;
		    border-radius: 3px 3px 3px 3px;
		    background:#fff; height:28px; width:182px; position:absolute; left:50%; top:10px; margin-left:-91px;}
			
		.Zcen_nr .right_nr .Rblack h1>ul>li{ width:60px; height:28px; line-height:28px; text-align:center; border-right:1px #E4ECF1 solid; float:left; cursor:pointer}	
		.Zcen_nr .right_nr .Rblack h1>ul>li:last-of-type{ border-right:0px;}
		.Zcen_nr .right_nr .Rblack h1>ul>li.hove{ background:#F7F9FB}
		
		.yunyin_ph h2 img{width:22px;height:20px;}
		.yunyin_ph h2 span{height:20px;line-height:20px;vertical-align: middle;}
		
		.Zcen_nr .yunyin_ph{padding-bottom:42px;}
		.Zcen_nr .yunyin_ph:nth-child(1){ width:25%; float:left; }
		.Zcen_nr .yunyin_ph:nth-child(2){ width:25%; float:left; }
		.Zcen_nr .yunyin_ph:nth-child(3){ width:25%; float:left; }
		.Zcen_nr .yunyin_ph:nth-child(4){ width:25%; float:left; }
		   
		.Zcen_nr .yunyin_ph h2{color: rgb(52, 73, 94);font-size: 16px;line-height: 22px;text-align: center;margin-top: 30px;margin-bottom: 3px;}
		.Zcen_nr .yunyin_ph img{display: inline-block; max-width: 100%; max-height: 100%;margin: 0 6px; vertical-align: middle;}
		.Zcen_nr .yunyin_ph > ul{ width:270px; margin:0px auto}
		.Zcen_nr .yunyin_ph > ul > li{height: 20px;line-height: 20px;margin-top: 13px;}
		.Zcen_nr .yunyin_ph > ul > li > tt{ width:18px; height:18px;  font-size:12px; color:#fff;-webkit-border-radius:2px;moz-border-radius:2px; border-radius:2px; display:block; float:left;line-height:18px; text-align:center;}
		.Zcen_nr .yunyin_ph > ul > li > b{ font-size:14px; float:left; width:90px; display:block; overflow:hidden; font-weight:normal;color: #34495E;height: 20px;line-height: 20px;}
		.Zcen_nr .yunyin_ph > ul > li > span{ float:right; font-size:14px;  display:inline-table;   text-align:right;color: #34495E;}
		.Zcen_nr .yunyin_ph > ul > li.blue{ color:#0C9AFF}
		.yunyin_ph ul:nth-child(2) li tt{background-color:#FF9001;}
		.yunyin_ph ul:nth-child(3) li tt{background-color:#FF9001;}
		.yunyin_ph ul:nth-child(4) li tt{background-color:#FF9001;}
		.yunyin_ph ul:nth-child(n+5) li tt{background-color:#cbd4da;}
		.Zcen_nr .yunyin_ph ul.xiaofeijine b{margin-left:6px;}
		.Zcen_nr .yunyin_ph ul.ren{ width:230px; margin:0px auto}
		.Zcen_nr .yunyin_ph ul.ren b{ width:65px; margin-left:6px;}
		.Zcen_nr .yunyin_ph ul.ren span{ float:left; }
		.Zcen_nr .yunyin_ph ul.ren span:hover{ color:#0C9AFF !important;}
		.Zcen_nr .yunyin_ph ul.huiyn{ width:240px; margin:0px auto}
		.Zcen_nr .yunyin_ph ul.huiyn b{ width:87px;margin-left: 6px;cursor:pointer;height: 20px;line-height: 20px;}
		.Zcen_nr .yunyin_ph ul.huiyn span{ width:110px; text-align:right}
		.Zcen_nr .yunyin_ph ul.mx_xiaof{ width:230px; margin:0px auto}
		.Zcen_nr .yunyin_ph ul.mx_xiaof li{ position:relative; cursor:pointer}
		.Zcen_nr .yunyin_ph ul.mx_xiaof b{ width:65px;margin-left:6px; }
		.Zcen_nr .yunyin_ph ul.mx_xiaof span{ float: left; }
		.Zcen_nr .yunyin_ph ul.mx_xiaof li span strong cite{ line-height: 20px;text-align: right;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
		/*.Zcen_nr .yunyin_ph ul.margin-left:6px; b{margin-left:6px;}*/
		.Zcen_nr .yunyin_ph .xiao_xiaqin{ width:250px; padding:5px 10px; border:1px #D8E5EC solid; position:absolute; top:-15px; right:-280px; background:#fff; min-height:100px; z-index:100}
		.Zcen_nr .yunyin_ph .xiao_xiaqin em{ position:absolute; left:-15px; top:13px; }
		.Zcen_nr .yunyin_ph .xiao_xiaqin strong{ display:block; text-align:center; font-weight:normal; font-size:14px; color:#34495E}
		.Zcen_nr .yunyin_ph .xiao_xiaqin dl{ border-bottom:1px #ecf2f6 solid; overflow:hidden; padding-bottom:6px;}
		.Zcen_nr .yunyin_ph .xiao_xiaqin dd,.Zcen_nr .yunyin_ph .xiao_xiaqin dt { font-size:12px; color:#9AABB8; width:50%; float:left;  line-height:20px; padding:3px 0px}
		.Zcen_nr .yunyin_ph .xiao_xiaqin dd tt,.Zcen_nr .yunyin_ph .xiao_xiaqin dt tt{ font-size:18px; color:#34495E}
		.Zcen_nr .yunyin_ph .xiao_xiaqin dl:last-of-type{ border-bottom:0px; }
		.Zcen_nr .yunyin_ph .yun_lebqu{ width:100%}
		.Zcen_nr .yunyin_ph .xiaofeijine li b{cursor:pointer;}
		.mx_xiaof li span strong b{font-weight:normal;float: left; text-align: left;height: 20px;line-height: 20px;}
		.mx_xiaof li span strong cite{    font-style: normal;float: left; width: 110px;}
		.mx_xiaof li span strong svg{margin-left:5px;margin-top:3px;}
		
		.ren li span strong b{font-weight:normal;float: left; text-align: left;height: 20px;line-height: 20px;}
		.ren li span strong cite{white-space: nowrap;text-overflow: ellipsis;overflow: hidden;font-style: normal;float: left; width: 110px;text-align:right;height: 20px;line-height: 20px; }
		.ren li span strong svg{margin-left:5px;margin-top:3px;}
		.Rblack .yun_lebqu .yunyin_ph  h2 img{vertical-align: text-bottom;}
		
		.fot_renz{ clear:both;font-size:14px; color:#9AABB8; text-align:center;  width:100%;}
		.Zcen_nr .yunyin_ph .yun_lebqu{ width:100%}
		.center-right{float: right;}
		
		.api2{ width: 335px;/*height:226px;*/cursor:default;}
		.api2 .poptime{
			/*width:182px;*/
			margin-left: 16px;
		 	margin-top: 20px;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #34495E;
			letter-spacing: 0;
			line-height: 14px;
		}
		.api2 .poptime span{width:80px;}
		.api2 .poptime em{width:20px;font-style: normal;}
		.api2 .poptime cite{width:80px;font-style: normal;}
		
		.api2 .timeMoney{
			height: 14px;
		    margin-left: 16px;
		    margin-top: 15px;
		    margin-right: 10px;
		    height:52px;
    		border-bottom: 1px  #EAF1F6 solid;
    		display:inline-block;
		  }
		.api2 .timeMoney .xiaofeijine{    
			float: left;
    	}
		.api2 .timeMoney .xiaofeijine span{
			display:block;    
			font-family: PingFangSC-Regular;
		    font-size: 12px;
		    color: #9AABB8;
		    line-height: 12px;
		    width:150px;
		}
		.api2 .timeMoney .xiaofeijine cite{
			    display:block;
				font-family: PingFangSC-Regular;
				font-size: 18px;
				color: #34495E;
				letter-spacing: 0;
				line-height: 20px;
				width:150px;
				font-style:normal;
				margin-top:5px;
		}
		
		.api2 .timeTotalMoney {
			height: 14px;
		    margin-left: 16px;
		    margin-top: 15px;
		  }
		.api2 .timeTotalMoney .xiaofeijine{    
			float: left;
    	}
		.api2 .timeTotalMoney  .xiaofeijine span{
			display:block;    
			font-family: PingFangSC-Regular;
		    font-size: 12px;
		    color: #9AABB8;
		    line-height: 12px;
		    width:150px;
		}
		.api2 .timeTotalMoney  .xiaofeijine cite{
			    display:block;
				font-family: PingFangSC-Regular;
				font-size: 18px;
				color: #34495E;
				letter-spacing: 0;
				line-height: 20px;
				width:150px;
				font-style:normal;
				margin-top:5px;
				margin-bottom:15px;
		}
		
		.Zcen_nr, :after, :before {
		     box-sizing: content-box; 
		}
		.yunyin_ph ul li strong{font-weight: inherit;font-size: 14px;float:right;cursor:pointer;}
		.yunyin_ph ul li strong:hover{color: #0C9AFF;}
		.ivu-poptip, .ivu-poptip-rel {float: right;}
		
		a{color: #34495E; }
		a:hover{color: #2d8cf0;text-decoration: none;}
		
		.ivu-poptip-popper .fade-enter-to{
			width: 269px; position: absolute; transform-origin: left center 0px; left: 200px; top: -58px;
		}
		.xzhy_pop{
			font-size:30px;
		}
		.xzhy_pop:hover{
			  color: #0C9AFF;
		}
		.xzhy_pop a{
			    color: #34495E;
			    display: block;
			    float: left;
		}
		.xzhy_pop a:hover{
			    color: #0C9AFF;
		}
		.xzhy_pop img{
			float: left;
		    display: block;
		    padding-top: 12px;
		    padding-left: 9.8px;
		}
		/*.xzhy_pop a{-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}*/
		
		/*****/
		.tree_main{
		    width: 444px;
		    height: 400px;
		    z-index: 100;
		    position: absolute;
		    right: 0px;
		    top: 30px;
		}
		.jiantou img{
			z-index: 101;
		    position: absolute;
		    left: 390px;
		}
	    /*.el-checkbox {
	    	float: right !important;
	    }*/
	   
	  .nodata{
        width: 100%;
       /* background: red;*/
        text-align: center;
        vertical-align: middle;
        height: 93px;
        margin-top: 116px;
        margin-left: 10px;
    }
    .nodata img{
    	margin-left:37px;
    }
    .nodata span{
        display:block;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #9AABB8;
        letter-spacing: 0;
        margin-top:10px;
    }
    .rightbox{
        float:right;
    }  
    
	
</style>