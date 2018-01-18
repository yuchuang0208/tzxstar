<template>
	<div class="autoreply">
		<div class="divTwo_aqszs">
			<p class="rehead">自动回复</p>
			<div class="remind"><i class="el-icon-warning"></i> <span>已开启自动回复设置 </span> 通过编辑内容或关键词规则，快速进行自动回复设置。如具备开发能力，可更灵活地使用该功能。  
			<el-switch  v-model="onOff" on-text=""  off-text=""  on-color="#78C75E" on-value="1" off-value="0" @change="updateAutoReplyConfigFn" > </el-switch>
			<!-- <el-button v-if="onOff=='0'" :class="onOff=='1'?'off':'on'" @click="updateAutoReplyConfigFn">关闭</el-button><el-button v-if="onOff=='1'" :class="onOff=='1'?'off':'on'" @click="updateAutoReplyConfigFn">开启</el-button> -->
			</div>
			<el-tabs @tab-click="initialize"  v-model="activeName">
				<!-- 被添加自动回复 -->
				<el-tab-pane label="被添加自动回复" name="sub" class="zdgz" >
						<el-tabs type="border-card" v-model="type">

							<!-- 文字板块 -->
							<el-tab-pane name="text">
								<span slot="label"><i class="el-icon-edit"></i> 文字</span>
									<el-input
									class="pictureText"
									type="textarea"
									placeholder="请输入内容"
									maxlength="500"
									v-model="addtextarea">
									</el-input>
							</el-tab-pane>

							<!-- 图片板块 -->
							<el-tab-pane class="pictureText" name="image">
								<span slot="label">
									<i class="el-icon-picture"></i> 图片</span>
									<div  v-if="imageUrl">
										<img :src="imageUrl" class="avatar">
										<span @click.stop="imageUrl = ''">[删除]</span>
									</div>		
								<div
								v-if = "!imageUrl"
								@click.prevent = "findPicListFn(false)"
								class="el-upload-dragger"
								drag
								multiple>
								<i class="el-icon-plus" style="margin-top:65px;"></i>
								<div class="el-upload__text" style="margin-top:10px;">从素材库中选择</div>
								</div>
								<el-upload
									v-if = "!imageUrl"
									class="avatar-uploader"
									:action="action"
									:show-file-list="false"
									:on-success="handleAvatarSuccess"
									:before-upload="beforeAvatarUpload">
									<img v-if="imageUrl" :src="imageUrl" class="avatar">
									<div v-else class="imgBOX">
									<i style="font-size:14px; color:#000;line-height:146px;" class="el-icon-plus avatar-uploader-icon"></i>
									<span>上传图片</span>
									</div>
								</el-upload>
							</el-tab-pane>
							</el-tabs>

							<!-- 底部信息 -->
								<div v-if="type=='text'" style="border-bottom:1px dashed #EAF1F6;padding-left:20px;padding-top:10px;font-size:12px;color:#A1B1BD;padding-bottom:10px;">您还可以输入{{this.addtextarea?500-this.addtextarea.length:500}}字</div>
					<el-button style=" margin-left:20px;margin-top:30px;width:96px;height:32px;background: #fFF;border-radius: 3px; border:1px solid #D8E5EC; color: #34495E;" type="primary" @click="deleteReplyFn">删除回复</el-button>
					<el-button style="margin-left:10px;margin-top:30px;width:68px;height:32px;background: #0C9AFF;border-radius: 3px;" type="primary" @click="saveReplyFn">确定</el-button>
				</el-tab-pane>


				<!-- 消息自动回复 -->
				<el-tab-pane label="消息自动回复" name="default" class="zdgz">
							<el-tabs type="border-card" v-model="type">
								<!-- 文字板块 -->
							<el-tab-pane name = "text">
								<span slot="label"><i class="el-icon-edit"></i> 文字</span>
									<el-input
									class="pictureText"
									type="textarea"
									maxlength="500"									
									placeholder="请输入内容"
									v-model="addtextarea">
									</el-input>
							</el-tab-pane>
							<!-- 图片板块 -->
							<el-tab-pane class="pictureText" name = "image">
								<span slot="label">
									<i class="el-icon-picture"></i> 图片</span>
									<div  v-if="imageUrl">
										<img :src="imageUrl" class="avatar">
										<span @click.stop="imageUrl = ''">[删除]</span>
									</div>		
								<div
								v-if = "!imageUrl"
								@click.prevent = "findPicListFn(false)"
								class="el-upload-dragger"
								drag
								multiple>
								<i class="el-icon-plus" style="margin-top:65px;"></i>
								<div class="el-upload__text" style="margin-top:10px;">从素材库中选择</div>
								</div>
								<el-upload
									v-if = "!imageUrl"
									class="avatar-uploader"
									:action="action"
									:show-file-list="false"
									:on-success="handleAvatarSuccess"
									:before-upload="beforeAvatarUpload">
									<img v-if="imageUrl" :src="imageUrl" class="avatar">
									<div v-else class="imgBOX">
									<i style="font-size:14px; color:#000;line-height:146px;" class="el-icon-plus avatar-uploader-icon"></i>
									<span>上传图片</span>
									</div>
								</el-upload>
							</el-tab-pane>
							</el-tabs>

					<!-- 底部信息 -->
							<div  v-if="type =='text'" style="border-bottom:1px dashed #EAF1F6;padding-left:20px;padding-top:10px;font-size:12px;color:#A1B1BD;padding-bottom:10px;">您还可以输入{{this.addtextarea?500-this.addtextarea.length:500}}字</div>
					<el-button style=" margin-left:20px;margin-top:30px;width:96px;height:32px;background: #fFF;border-radius: 3px; border:1px solid #D8E5EC; color: #34495E;" type="primary" @click="deleteReplyFn">删除回复</el-button>
					<el-button style="margin-left:10px;margin-top:30px;width:68px;height:32px;background: #0C9AFF;border-radius: 3px;" type="primary" @click="saveReplyFn">确定</el-button>
				</el-tab-pane>

				<!-- 关键词回复 -->
				<el-tab-pane label="关键词回复" name="keyword" class="zdgz">
						

					<div class="addRuleBtnBox">
					  <el-button type="danger" class="btnStyle" @click="showNewRule()">添加新规则</el-button>
					</div>

					<div class="addRule" v-if="ruleAddBox">
						<el-form ref="form"  label-width="100px">
						  <el-form-item label="规则名">
						    <el-input maxlength="20" placeholder="规则名最多20个字" v-model="ruleAddBoxCont.ruleName"></el-input>
						  </el-form-item>
						  <el-form-item label="关键字">
						    <el-checkbox-group >
						      <el-button type="primary" @click="showMsgKeyWord()">添加关键字</el-button>
						    </el-checkbox-group>
						  </el-form-item>


						<el-form-item >
						    <el-checkbox-group v-for="(item,index) in ruleAddBoxCont.keyWord" :key="index">
						    	<div class="floatRight">
							      <el-button type="primary" icon="edit" @click="editKeyWord(true,index)"></el-button>
							      <el-button type="primary" icon="delete" @click="ruleAddBoxCont.keyWord.splice(index,1)"></el-button>
						    	</div>
						      {{item}}
						    </el-checkbox-group>
						</el-form-item>

						

						<div class="addRuleline">&nbsp;</div>

						<el-form-item label="回复">
						    <el-checkbox-group >
						    	<el-button type="primary" @click.prevent="showMsgReply(false)">文字回复</el-button>
						    	<el-button type="primary" @click.prevent="findPicListFn(false)">图片回复</el-button>
						    	<el-button type="primary" @click.prevent="getMaterialMsgPicListFn(false)">图文回复</el-button>
						    </el-checkbox-group>
						</el-form-item>

						<div class="addRuleline">&nbsp;</div>
						<div class="addRuleMsgBox clearfix">
							<ul>
								<li>
									<div class="addRuleMsgContBox" v-if="PicText">
										<div class="addRuleMsgLeft">
											<div  class="picTextBox">
												<div>
													<p>{{PicText.update_date.substring(0,PicText.update_date.length-2)}}</p>
												</div>
												<p>{{PicText.title}}</p>
												<img :src="PicText.pic_path" alt="">
											</div>
										</div>
										<div class="addRuleMsgRight">
											<el-button type="primary" icon="delete" @click.stop="delMsgTxtImg()"></el-button>
										</div>
									</div>






									<div class="addRuleMsgContBox" v-if="ruleAddBoxCont.msgImgSrc">
										<div class="addRuleMsgLeft">
											<img :src="ruleAddBoxCont.msgImgSrc" alt="" width="300px">
										</div>
										<div class="addRuleMsgRight">
											<el-button type="primary" icon="delete" @click="delMsgImg()"></el-button>
										</div>
										
									</div>

									<div class="addRuleMsgContBox" v-if="msgReply">
										<div class="addRuleMsgLeft">
											<p>{{msgReply}}</p>
										</div>
										<div class="addRuleMsgRight">
											<el-button type="primary" icon="edit"  @click="showMsgReply('EDIT')"></el-button>
											<el-button type="primary" icon="delete" @click="delMsgReply()"></el-button>
										</div>
									</div>


								</li>
							</ul>
						</div>
						<el-form-item>
						    <el-button class="btnStyle" type="success" @click="saveReplyWithKeywordFn(false)">保存</el-button>
						    <el-button class="btnStyle" @click="deleteRule()">删除</el-button>
						</el-form-item>
						</el-form>
					</div>

					

						
						<el-collapse accordion v-model="gorup_ID">
							<div class="tableHead"><p class="clearfix"><span class="name">规则名</span>   <span class="keyword">关键字</span>     <span class="rep">回复</span></p></div>

							<el-collapse-item class="addRuleBox" v-for="(item,index) in ruleList" :key="index" :name="(index+1)">
								<template slot="title" >
									<div class="clearfix">
										<div class="titleCont">
										<!-- <div class="titleContLeft">关键字</div> -->
												<span>{{item.fn_name}}</span>
									</div>
									
									<div class="titleCont">
										<!-- <div class="titleContLeft">关键字</div> -->
											<div v-if="item.content">
												<span v-for="(item1,index1) in item.content" :key="index1">{{item1}}&nbsp;&nbsp; </span>
											</div>
									</div>
										<div class="titleCont">
										<!-- <div class="titleContLeft">回复</div> -->
											<span>1 条消息（ {{item.type=="text"?1:0}}条文字， {{item.type=="image"?1:0}}条图片， {{item.type=="news"?1:0}}条图文）</span>
										</div>
									</div>
							    </template>

							    <!-- 已经存在的 -->
							    <div class="addRuleBoxCont">
							    	<div class="addRule">
										<el-form ref="form"  label-width="100px">
											<el-form-item label="规则名">
												<el-input maxlength="20"  placeholder="规则名最多20个字" v-model="item.fn_name"></el-input>
											</el-form-item>
											<el-form-item label="关键字">
												<el-checkbox-group >
													<el-button type="primary" @click="showMsgKeyWord1()">添加关键字</el-button>
												</el-checkbox-group>
											</el-form-item>


											
									<div v-if="item.content">
										<el-form-item v-for="(item2,index2) in item.content" :key="index2">
										    <el-checkbox-group >
										    	<div class="floatRight">
											      <el-button type="primary" icon="edit" @click="editKeyWord1(true,index2)"></el-button>
											      <el-button type="primary" icon="delete" @click="item.content.splice(index2,1)"></el-button>
										    	</div>
										      {{item2}}
										    </el-checkbox-group>
										</el-form-item>
									</div>
										<div class="addRuleline">&nbsp;</div>

										<el-form-item label="回复">
										    <el-checkbox-group >
										    	<el-button type="primary" @click="showMsgReply1(item)">文字回复</el-button>
										    	<el-button type="primary" @click="findPicListFn(item)">图片回复</el-button>
										    	<el-button type="primary" @click="getMaterialMsgPicListFn(item)">图文回复</el-button>
										    </el-checkbox-group>
										</el-form-item>

										<div class="addRuleline">&nbsp;</div>
										<div class="addRuleMsgBox clearfix">
											<ul>
												<li>
													<div class="addRuleMsgContBox" v-if="item.news">
										<div class="addRuleMsgLeft" v-if="item.news[0]">
											<div  class="picTextBox">
												<div>
													<p>{{item.news[0].update_date.substring(0,item.news[0].update_date.length-2)}}</p>
												</div>
												<p>{{item.news[0].title}}</p>
												<img :src="item.news[0].pic_path" alt="">
											</div>
										</div>
										<div class="addRuleMsgRight">
											<el-button type="primary" icon="delete" @click.stop="delPT(item)"></el-button>
										</div>
									</div>






									<div class="addRuleMsgContBox" v-if="item.pic_path">
										<div class="addRuleMsgLeft">
											<img :src="item.pic_path" alt="" width="300px">
										</div>
										<div class="addRuleMsgRight">
											<el-button type="primary" icon="delete" @click="item.pic_path=''"></el-button>
										</div>
										
									</div>

									<div class="addRuleMsgContBox" v-if="item.discraption">
										<div class="addRuleMsgLeft">
											<p>{{item.discraption}}</p>
										</div>
										<div class="addRuleMsgRight">
											<el-button type="primary" icon="delete" @click="delMsgReply(item)"></el-button>
										</div>
									</div>

												</li>
											</ul>
										</div>

										<el-form-item>
										    <el-button class="btnStyle" type="success" @click="saveReplyWithKeywordFn(item)">保存</el-button>
										    <el-button class="btnStyle" @click="deleteReplyWithKeywordFn(item)">删除</el-button>
										  </el-form-item>
										</el-form>
									</div>
							    </div>	
							</el-collapse-item>
						</el-collapse>
				</el-tab-pane>
			</el-tabs>
		</div>


				<!-- 图片弹出框添加回复 -->
			<el-dialog
				title="请选择图片"
				:visible.sync="dialogPic"
				width="770px">
						<ul>
							<li @click="active(item,index)" :class="checkedNum==index?'imgList active':'imgList'" v-for="(item,index) in picList" :key="index">
									<img :src="item.pic_path" alt="">
									<p>{{item.pic_name}}</p>
							</li>
						</ul>
						<div class="clearfix" style="margin-bottom:10px;">
						  <el-pagination
						  	v-if="total>0&&total>rows"
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="page"
							:page-sizes="[10,20,30,50]"
							:page-size="10"
							layout="total, sizes, prev, pager, next, jumper"
							:total="total">
						</el-pagination>
					</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancel">取 消</el-button>
					<el-button type="primary" @click="enterPic">确 定</el-button>
				</span>
			</el-dialog>

			<!-- 素材弹出框 -->
			<el-dialog
				title="请选择素材"
				:visible.sync="dialogMatter"
				width="770px">
				<ul>
					<li @click="activePT(item,index)" :class="index==checkedNum?'picTextBox active':'picTextBox'" v-for="(item,index) in picTextList" :key="index">
						<div>
							<p>{{item.update_date.substring(0,item.update_date.length-2)}}</p>
							<span v-if="!item.sendable">此图文消息未完善保存，无法选中</span>
						</div>
						<p>{{item.title}}</p>
						<img :src="item.pic_path" alt="">
					</li>
				</ul>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogMatter = false">取 消</el-button>
					<el-button type="primary" @click="enterPT">确 定</el-button>
				</span>
			</el-dialog>
			<!-- 文字弹出框 -->
			<el-dialog
			title="添加回复文字"
			:visible.sync="dialogVisible"
			size="tiny"
			>
				<div class="inputTxt">
					<span class="keyWordTitle">回复文字</span>
					
					<el-input
					  maxlength="500"
					  type="textarea"
					  :rows="6"
					  placeholder="请输入内容"
					  v-model="msgReply"
					  >
					</el-input>
					<p>&nbsp;</p>
					还能够输入{{500-msgReply.length}}个字符
				</div>

				<span slot="footer" class="dialog-footer">
					<el-button @click="canelMsgReply()">取 消</el-button>
					<el-button type="primary" @click="enterMsgReply()">确 定</el-button>
				</span>
			</el-dialog>

			<!-- 文字弹出框已存在 -->
			<el-dialog
			title="添加回复文字"
			:visible.sync="dialogVisible1"
			size="tiny"
			>
				<div class="inputTxt">
					<span class="keyWordTitle">回复文字</span>
					
					<el-input
					  maxlength="500"
					  type="textarea"
					  :rows="6"
					  placeholder="请输入内容"
					  v-model="msgReply"
					  >
					</el-input>
					还能够输入{{500-msgReply.length}}个字符					

				</div>

				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible1 = false">取 消</el-button>
					<el-button type="primary" @click="enterMsgReply1()">确 定</el-button>
				</span>
			</el-dialog>


			<!-- 添加关键字文字弹出框 -->
			<el-dialog
			title="添加关键字"
			:visible.sync="dialogVisibleKeyWord"
			size="tiny"
			>
				<div class="inputTxt">
					<span class="keyWordTitle">每个关键字少于30个字符</span>
					<el-input
					  maxlength="30"
					  type="textarea"
					  :rows="2"
					  placeholder="请输入内容"
					  v-model="msgKeyWordTxt"
					  
					  >
					</el-input>
					<el-checkbox v-model="checked">说明：用户进行交谈时，对话中包含上述关键字就执行这条规则。<br> 
					如果包含关键词存在多个回复，但回复内容不同时，系统会随机回复</el-checkbox>
				</div>

				<span slot="footer" class="dialog-footer">
					<el-button @click="canelMsgKeyWord()">取 消</el-button>
					<el-button type="primary" @click="enterMsgKeyWord(true)">确 定</el-button>
				</span>
			</el-dialog>
			<!-- 添加关键字文字弹出框 已存在-->
			<el-dialog
			title="添加关键字"
			:visible.sync="dialogVisibleKeyWord1"
			size="tiny"
			>
				<div class="inputTxt">
					<span class="keyWordTitle">每个关键字少于30个字符</span>
					<el-input
						maxlength="30"
					  type="textarea"
					  :rows="2"
					  placeholder="请输入内容"
					  v-model="msgKeyWordTxt"
					  
					  >
					</el-input>
					<el-checkbox v-model="checked">说明：用户进行交谈时，对话中包含上述关键字就执行这条规则。<br> 
					如果包含关键词存在多个回复，但回复内容不同时，系统会随机回复</el-checkbox>

				</div>

				<span slot="footer" class="dialog-footer">
					<el-button @click="canelMsgKeyWord()">取 消</el-button>
					<el-button type="primary" @click="enterMsgKeyWord()">确 定</el-button>
				</span>
			</el-dialog>




			<!-- 修改关键字文字弹出框 -->
			<el-dialog
			title="添加关键字"
			:visible.sync="dialogVisibleEditKeyWord"
			size="tiny"
			>
				<div class="inputTxt">
					<span class="keyWordTitle">每个关键字少于30个字符</span>
					<el-input
					  type="textarea"
					  :rows="2"
					  maxlength="30"	
					  placeholder="请输入内容"
					  v-model="editKeyWordTxt"
					  
					  >
					</el-input>
					<el-checkbox v-model="checked">说明：用户进行交谈时，对话中包含上述关键字就执行这条规则。<br> 
					如果包含关键词存在多个回复，但回复内容不同时，系统会随机回复</el-checkbox>
				</div>

				<span slot="footer" class="dialog-footer">
					<el-button @click="canelEditKeyWord()">取 消</el-button>
					<el-button type="primary" @click="enterEditKeyWord()">确 定</el-button>
				</span>
			</el-dialog>

			<!-- 已存在修改关键字文字弹出框 -->
			<el-dialog
			title="添加关键字"
			:visible.sync="dialogVisibleEditKeyWord1"
			size="tiny"
			>
				<div class="inputTxt">
					<span class="keyWordTitle">每个关键字少于30个字符</span>
					<el-input
					  maxlength="30"
					  type="textarea"
					  :rows="2"
					  placeholder="请输入内容"
					  v-model="editKeyWordTxt"
					  
					  >
					</el-input>
					<el-checkbox v-model="checked">说明：用户进行交谈时，对话中包含上述关键字就执行这条规则。<br> 
					如果包含关键词存在多个回复，但回复内容不同时，系统会随机回复</el-checkbox>

				</div>

				<span slot="footer" class="dialog-footer">
					<el-button @click="canelEditKeyWord()">取 消</el-button>
					<el-button type="primary" @click="enterEditKeyWord1()">确 定</el-button>
				</span>
			</el-dialog>

		<!-- 已存在图片弹出框 -->
			<el-dialog
				title="请选择图片"
				:visible.sync="dialogPic1"
				width="770px">
						<ul>
							<li @click="active(item,index)" :class="checkedNum==index?'imgList active':'imgList'" v-for="(item,index) in picList" :key="index">
									<img :src="item.pic_path" alt="">
									<p>{{item.pic_name}}</p>
							</li>
						</ul>
					<div class="clearfix" style="margin-bottom:10px;">
						  <el-pagination
						  	v-if="total1>0&&total1>rows1"
							@size-change="handleSizeChange1"
							@current-change="handleCurrentChange1"
							:current-page="page1"
							:page-sizes="[10,20,30,50]"
							:page-size="10"
							layout="total, sizes, prev, pager, next, jumper"
							:total="total1">
						</el-pagination>
					</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancel">取 消</el-button>
					<el-button type="primary" @click="enterPic1">确 定</el-button>
				</span>
			</el-dialog>


			<!-- 已存在素材弹出框 -->
			<el-dialog
				title="请选择素材"
				:visible.sync="dialogMatter1"
				width="770px">
				<ul>
					<li @click="activePT(item,index)" :class="index==checkedNum?'picTextBox active':'picTextBox'" v-for="(item,index) in picTextList" :key="index">
						<div>
							<p>{{item.update_date.substring(0,item.update_date.length-2)}}</p>
							<span v-if="!item.sendable">此图文消息未完善保存，无法选中</span>
						</div>
						<p>{{item.title}}</p>
						<img :src="item.pic_path" alt="">
					</li>
				</ul>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogMatter1 = false">取 消</el-button>
					<el-button type="primary" @click="enterPT1">确 定</el-button>
				</span>
			</el-dialog>

 

	</div>
</template>

<script>
  import {findPicList, getMaterialMsgPicList} from "@/api/massmessage.js"
  import {getReply , saveReply , deleteReply ,getAutoReplyConfig ,updateAutoReplyConfig ,saveReplyWithKeyword , deleteReplyWithKeyword} from "@/api/autoreply.js"

	export default {
  		name: 'autoreply',
  		data(){
  			return{
				  checked:false,   //添加关键字是否启用存在即恢复
				  action:"",
  				  arr:[1,2,3],
				  autoId:0,
				  id:0,
				  total:0,
				  total1:0,
				  activeName:"sub",
				  onOff:"1",
				  addtextarea:'',
					checkedImgUrl:"",
					img_media:"",
					checkedNum:"9999999999999999999",
					dialogPic:false,
					dialogPic1:false,
					rows:10,
					page:1,
					rows1:10,
					page1:1,
					picList:[],//图片列表
				  imageUrl: '',
				  type:"text",
				  media_id:"",
				  groupId:0,
					myIndex:0,
					gorup_ID:0,
				ruleAddBoxCont:{
					id:null,
					ruleName:"",
					keyWord:[],
					keyWordNum:[],
					msgImgSrc:false,
					msgTatol:0,
					msgTxt:0,
					msgImg:0,
					msgTxtImg:0,
	            },
				ruleList:[
	            ],
		        ruleAddBox:false,
		        dialogMatter:false,
		        dialogMatter1:false,
		        picTextList:[],
		        checkedPicText:null,
		        PicText:null,
		        dialogVisible: false,
		        dialogVisible1: false,
		        msgReply:"",
		        msgReplyBak:"",

		        dialogVisibleKeyWord:false,
		        dialogVisibleKeyWord1:false,
		        msgKeyWordTxt:"",
				editKeyWordTxt:"",//修改关键字
				dialogVisibleEditKeyWord:false,
				dialogVisibleEditKeyWord1:false,

				filename : ""//上传文件的文件名
 
  			}
		  },
		  methods:{
			showMsgKeyWord(){
		    	this.dialogVisibleKeyWord = true;
		    },
			showMsgKeyWord1(){
		    	this.dialogVisibleKeyWord1 = true;
		    },

			enterMsgKeyWord(flag){
				if(flag){
					this.ruleAddBoxCont.keyWord.push(this.msgKeyWordTxt)
					this.ruleAddBoxCont.keyWordNum.push(this.checked?1:0)
				}else{
					this.ruleList[this.gorup_ID-1].content.push(this.msgKeyWordTxt)
					this.ruleList[this.gorup_ID-1].include_keyword.push(this.checked?1:0)
				}
		    	this.dialogVisibleKeyWord = false;
		    	this.dialogVisibleKeyWord1 = false;
		    	this.msgKeyWordTxt=''
				this.checked = false
		    },
		    canelMsgKeyWord(){
		    	this.dialogVisibleKeyWord = false;
		    	this.dialogVisibleKeyWord1 = false;
		    	this.msgKeyWordTxt=''
			},
			
			enterEditKeyWord(){
				this.editKeyWord(false)
		    	this.dialogVisibleEditKeyWord = false;
		    	this.editKeyWordTxt=''
			},
			// 已存在
			enterEditKeyWord1(){
				this.editKeyWord1(false)
		    	this.dialogVisibleEditKeyWord1 = false;
		    	this.editKeyWordTxt=''
		    },
		    canelEditKeyWord(){
		    	this.dialogVisibleEditKeyWord = false;
		    	this.dialogVisibleEditKeyWord1 = false;
		    	this.editKeyWordTxt=''
		    },



		    enterMsgReply(){
		    	this.dialogVisible = false;
		    	this.msgReplyBak = this.msgReply;
		    },
		    enterMsgReply1(){
		    	this.dialogVisible1 = false;
		    	this.ruleList[this.gorup_ID-1].discraption = this.msgReply;
				this.msgReply = ""
		    },
		    canelMsgReply(){
		    	this.dialogVisible = false;
		    	this.msgReply = this.msgReplyBak;
		    	if(this.msgReplyBak == ""){
		    		this.msgReply = this.msgReplyBak;
		    	}
		    },
		    showMsgReply(p){
		    	if(p){
		    		this.dialogVisible = true;
		    		this.msgReplyBak = this.msgReply;
		    	}else{
		    		if(this.activeName == "keyword" && !(!this.ruleAddBoxCont.msgImgSrc && !this.PicText && !this.msgReply)){
					this.$message({
			                showClose: true,
			                message: "最多添加一条",
			                type: 'error'
			            });
					return;	
					}
			    	this.dialogVisible = true;
		    	}
		    	
		    },
		    showMsgReply1(item){
				if(item){
					if(item.news||item.pic_path||item.discraption){
					this.$message({
			                showClose: true,
			                message: "最多添加一条",
			                type: 'error'
			            });
					return;	
				}
				this.dialogVisible1 = true;
				this.sendType = "text"
				}
		    },
		    delMsgReply(item){
		    	this.msgReply=""
				if(item){
		    		this.msgReply=""					
					item.discraption=''
				}
		    },
		  	deleteRule(){
				  this.gorup_ID = 999999999999999
					this.ruleAddBox = false;
					this.ruleAddBoxCont.id=null
					this.ruleAddBoxCont.ruleName=''
					this.ruleAddBoxCont.keyWord=[]
					this.ruleAddBoxCont.keyWordNum=[]
					this.ruleAddBoxCont.msgImgSrc=false
					this.ruleAddBoxCont.msgTatol=0
					this.ruleAddBoxCont.msgTxt=0
					this.ruleAddBoxCont.msgImg=0
					this.ruleAddBoxCont.msgTxtImg=0
					this.PicText = null
					this.msgReply =''
		  	},
		  	showNewRule(){
				  if(this.ruleList.length){
						this.gorup_ID = this.ruleList.map((item)=>{
							this.gorup_ID = this.gorup_ID+item.define_type+1
						})
				  }else{
					  this.gorup_ID = this.ruleList.length+1
				  }
		  		this.ruleAddBox = !this.ruleAddBox;
		  	},
		  	copy(obj1,obj2){
				var obj2=obj2||{}; 
				for(var name in obj1){
				    if(typeof obj1[name] === "object"){ 
				        //obj2[name]= (obj1[name].constructor===Array)?[]:{}; 
				        obj2[name] = (obj1[name] instanceof Array)?[]:{}; 
				        this.copy(obj1[name],obj2[name]); 
				    }else{
				          obj2[name]=obj1[name]; 
				    }
				}
				return obj2; 
			},
		  	saveAddRule(){
				this.ruleList.push(this.copy(this.ruleAddBoxCont));
				this.ruleAddBox = false;
				
	 		},
	 		cancel(){
	 			this.dialogPic = false;
	 			this.dialogPic1 = false;
	 		},
	 		delMsgTxtImg(){
	 			this.PicText = null;
	 		},
	 		delMsgImg(){
	 			this.ruleAddBoxCont.msgImgSrc = false;
	 			
	 		},

	 		getMaterialMsgPicListFn(item){   //加载素材库
			 	this.checkedNum = "99999999999999999"
	 			if(this.activeName == "keyword" && !(!this.ruleAddBoxCont.msgImgSrc && !this.PicText && !this.msgReply)){
					this.$message({
			                showClose: true,
			                message: "最多添加一条",
			                type: 'error'
			            });
					return;	
				} 
				if(item){
					if(item.news||item.pic_path||item.discraption){
					this.$message({
			                showClose: true,
			                message: "最多添加一条",
			                type: 'error'
			            });
					return;	
				}
				this.dialogMatter1 = true;	
				}else{
				this.dialogMatter = true;
				}
				getMaterialMsgPicList().then(data=>{
					this.picTextList = data.rows;
				})
			},

			//选中素材方法
			activePT(item,index){
				if(!item.sendable){
					return false;
				}
				this.checkedNum = index;
				this.checkedPicText = item
			},
					// 确定选择素材
			enterPT(){
				if(this.checkedPicText){
				this.dialogMatter = false;
				this.PicText = this.checkedPicText;
				this.checkedPicText = null	
				this.checkedNum = "9999999999999999999999999"
				}else{
				this.dialogMatter = false;
				this.checkedNum = "9999999999999999999999999"
				}	
			},

			enterPT1(){
				if(this.checkedPicText){
					this.dialogMatter1 = false;
					this.ruleList[this.gorup_ID-1].news = []
					this.ruleList[this.gorup_ID-1].news.push(this.checkedPicText);
					this.checkedPicText = null
					this.checkedNum = "9999999999999999999999999"
				}else{
					this.dialogMatter1 = false;
					this.checkedPicText = null					
					this.checkedNum = "9999999999999999999999999"
				}

			},
	 		//关键词回复
			handleAvatarSuccess(res, file) {
				let index1 = res.indexOf("url") + 6;
				let index2 = res.indexOf("png") != -1 ? res.indexOf("png") + 3 : res.indexOf('jpg') + 3;
				let path = res.substring(index1, index2); /****图片地址*****/
				let filename;
				if(path.indexOf("/") > 0) //如果包含有"/"或"\"号 从最后一个"/"或"\"号+1的位置开始截取字符串
				{
					filename = path.substring(path.lastIndexOf("/") + 1, path.length);
				} else if(path.indexOf("\\") > 0) {
					filename = path.substring(path.lastIndexOf("\\") + 1, path.length);
				}
					this.imageUrl = path;
					this.filename = filename
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			delIMG(){
				this.imageUrl = "";
			},
			handleSizeChange(val) {
			 this.rows= val;
			 this.findPicListFn(false)
 		 	},
			//   分页
      		handleCurrentChange(val) {
				this.page = val
				this.findPicListFn(false)
			},
			handleSizeChange1(val) {
			 this.rows1= val;
			 this.findPicListFn(true)
 		 	},
			//   分页
      		handleCurrentChange1(val) {
				this.page1 = val
				this.findPicListFn(true)
			},
			//选中方法
			active(item,index){
				this.checkedNum = index;
				this.checkedImgUrl = item.pic_path
				this.media_id = item.pic_thumb_media_id
			},
			// 确定选择图片
			enterPic(){
				if(this.activeName == "keyword"){
					this.dialogPic = false;
					this.dialogPic1 = false;
					this.ruleAddBoxCont.msgImgSrc = this.checkedImgUrl
					this.checkedNum = "99999999999999999"
					this.filename = ""					
				}else{
					this.dialogPic = false;				
					this.dialogPic1 = false;				
					this.imageUrl = this.checkedImgUrl
					this.checkedImgUrl ="" 
					this.checkedNum = "99999999999999999"
					this.filename = ""
				}	
			},
			enterPic1(){
					this.dialogPic = false;
					this.dialogPic1 = false;
					this.ruleList[this.gorup_ID-1].pic_path = this.checkedImgUrl
					this.ruleList[this.gorup_ID-1].media_id = this.media_id
					this.media_id = ''
					this.checkedNum = "99999999999999999"
			},
			// 数据初始化
			initialize(){
				this.checkedImgUrl ="" 
				this.checkedNum = "999999999999999999"
				this.imageUrl = ""
				this.addtextarea=''
				this.filename=""
				this.getReplySubFn()
			},
			// 修改关键字
			editKeyWord(flag,index){
				if(index==0||index){
					this.myIndex = index					
				}
				if(flag){
				this.dialogVisibleEditKeyWord = true
				this.editKeyWordTxt = this.ruleAddBoxCont.keyWord[this.myIndex]
				this.checked = this.ruleAddBoxCont.keyWordNum[this.myIndex]==1
				}else{
					if(this.editKeyWordTxt == ''){
					this.ruleAddBoxCont.keyWord[this.myIndex] = "空关键字"
					this.ruleAddBoxCont.keyWordNum[this.myIndex] = this.checked?1:0;
					}else{
					this.ruleAddBoxCont.keyWord[this.myIndex] = this.editKeyWordTxt						
					this.ruleAddBoxCont.keyWordNum[this.myIndex] = this.checked?1:0;
					}
				this.checked=false
				}			
			},
			//删除某条已存在的图文信息
			delPT(item){
				item.news = null;
				this.checkedNum = "9999999999999999999"
			},
			// 已存在修改关键字
			editKeyWord1(flag,index){
				if(index==0||index){
					this.myIndex = index
				}
				if(flag){
				this.dialogVisibleEditKeyWord1 = true
				this.editKeyWordTxt = this.ruleList[this.gorup_ID-1].content[this.myIndex]
				this.checked = this.ruleList[this.gorup_ID-1].include_keyword[this.myIndex]==1
				}else{
					if(this.editKeyWordTxt == ''){
					this.ruleList[this.gorup_ID-1].content[this.myIndex] = "空关键字"
					this.ruleList[this.gorup_ID-1].include_keyword[this.myIndex] = this.checked?1:0;
					}else{
					this.ruleList[this.gorup_ID-1].content[this.myIndex] = this.editKeyWordTxt						
					this.ruleList[this.gorup_ID-1].include_keyword[this.myIndex] = this.checked?1:0;				
					}
				this.checked=false
				}
			},
			// 以下是飞驰方法
			findPicListFn(item){
				this.checkedNum = "99999999999999999"
				if(this.activeName == "keyword" && !(!this.ruleAddBoxCont.msgImgSrc && !this.PicText && !this.msgReply)){
					this.$message({
			                showClose: true,
			                message: "最多添加一条",
			                type: 'error'
			            });
					return;	
				}
				if(item){
					if(item.news||item.pic_path||item.discraption){
					this.$message({
			                showClose: true,
			                message: "最多添加一条",
			                type: 'error'
			            });
					return;	
				}
					this.dialogPic1 = true;	
					findPicList("page="+this.page1+"&"+"rows="+this.rows1).then(data=>{
					this.picList = data.rows;
					this.total1 = data.total;
				})				
				}else{
				//加载图片列表
					this.dialogPic = true;
					findPicList("page="+this.page+"&"+"rows="+this.rows).then(data=>{
					this.picList = data.rows;
					this.total = data.total;
				})
				}
				
			},
			// 获取自动回复详细内容
			getReplySubFn(){
					getReply("fn_code="+this.activeName).then(data=>{
						if(this.activeName == "keyword"){
							if(data){
							data.map((item)=>{
								item.content = item.content.split(",")
								item.include_keyword = item.include_keyword.split(",")
							})
							this.ruleList = data
							}
						}else{
							if(data[0]){
							this.type = data[0].type?data[0].type:"text"
							if(data[0].type=="text"){
								this.addtextarea = data[0].discraption?data[0].discraption:""
								this.imageUrl = ""
							}else if(data[0].type=="image"){
								this.imageUrl = data[0].pic_path?data[0].pic_path:""
								this.addtextarea = ""					
							}else{
								this.addtextarea = data[0].discraption?data[0].discraption:""	
								this.imageUrl = data[0].pic_path?data[0].pic_path:""								
							}
							this.media_id = data[0].media_id?data[0].media_id:""
							this.id = data[0].id?data[0].id:""
							}else{
								this.id = "";
								this.type = "text"
							}
						}
					})
				
			},
			saveReplyFn(){
				if(this.type=="text"&&this.addtextarea==""){
						this.$message({
							message: '请输入回复信息!',
							type: 'error'
						});
					return false
				}
				if(this.type=="image"&&this.imageUrl==""){
					this.$message({
							message: '请输入回复信息！',
							type: 'error'
						});
					return false
				}
				saveReply("fn_code="+this.activeName+"&"+"id="+this.id+"&type="+this.type+"&pic_path="+this.imageUrl+"&media_id="+this.media_id+"&discraption="+this.addtextarea+"&pic_name="+this.filename).then(data=>{
					if(data.success){
						this.$message({
							message: '发送成功！',
							type: 'success'
						});
						this.getReplySubFn()
					}else{
						this.$message({
							message: '发送失败！',
							type: 'error'
						});
					}
				})
			},
			deleteReplyFn(){
				deleteReply("id="+this.id).then(data=>{
					if(data.success){
						this.imageUrl = "",
						this.addtextarea = "",
						this.id="",
						this.$message({
							message: '删除成功！',
							type: 'success'
						});
						this.getReplySubFn()
					}else{
						this.$message({
							message: '删除失败！',
							type: 'error'
						});
					}
				})
			},
			getAutoReplyConfigFn(){
				getAutoReplyConfig("").then(data=>{
					if(data){
						this.onOff = data[0].para_value=="0"?data[0].para_value:"1";
						this.autoId = data[0].id
					}
				})
			},
			updateAutoReplyConfigFn(){
				let onOff = "";
				if(this.onOff == "0"){
					onOff="0"
				}else{
					onOff="1"
				}
				updateAutoReplyConfig("id="+this.autoId+"&paraValue="+onOff).then(data=>{
					if(this.onOff=="0"){
						if(data.success){
			
						this.$message({
							message: '自动回复成功关闭',
							type: 'success'
						});
						this.getAutoReplyConfigFn()
					}else{
						this.$message({
							message: '自动回复开启失败，请重试',
							type: 'error'
						});
						this.getAutoReplyConfigFn()						
					}
					}else if(this.onOff == "1"){
																
						if(data.success){
						this.$message({
							message: '自动回复成功开启',
							type: 'success'
						});
						this.getAutoReplyConfigFn()
					}else{
						this.$message({
							message: '自动回复关闭失败，请重试',
							type: 'error'
						});
						this.getAutoReplyConfigFn()
					}
					}
				})
			},
			onSubmit(){

			},
			// 保存方法
			saveReplyWithKeywordFn(item){
					let groupid = 0;
					this.ruleList.map((data)=>{
						groupid = groupid + parseInt(data.define_type) + 1
					})
					if(item){
						 groupid = item.define_type						
					}
				if(item){
					if(!item.fn_name){
						this.$message({
							message: '请输入标题',
							type: 'error'
						});
						return false
					}
					if(!item.content.length){
						this.$message({
							message: '请输入关键字',
							type: 'error'
						});
						return false
					}
					if(!item.pic_path&&!item.discraption&!item.news){
						this.$message({
							message: '请输入内容',
							type: 'error'
						});
						return false
					}
					let fn_name = item.fn_name
					let content = item.content
					let include_keyword = item.include_keyword
					let data = ''
					if(item.pic_path){
						data = 'type==image##pic_path=='+item.pic_path+'##media_id=='+item.media_id
					}else if(item.discraption){
						data = 'type==text##discraption=='+item.discraption
					}else if(item.news){
						console.log(item)
						data = 'type==news##media_id=='+item.media_id
					}
					saveReplyWithKeyword('groupid='+groupid+"&fn_name="+fn_name+"&content="+content+"&include_keyword="+include_keyword+"&data="+data).then(data=>{
						if(data.success){
							this.initialize()
							this.gorup_ID = 999999999999999
							this.$message({
							message: '储存成功',
							type: 'success'
						});
						}else{
							this.$message({
							message: '储存失败，请重试',
							type: 'error'
						});
						}
					})		
				}else{
					if(!this.ruleAddBoxCont.ruleName){
						this.$message({
							message: '请输入标题',
							type: 'error'
						});
						return false
					}
					if(!this.ruleAddBoxCont.keyWord.length){
						this.$message({
							message: '请输入关键字',
							type: 'error'
						});
						return false
					}
					if(!this.ruleAddBoxCont.msgImgSrc && !this.PicText && !this.msgReply){
						this.$message({
							message: '请输入内容',
							type: 'error'
						});
						return false
					}

					let fn_name = this.ruleAddBoxCont.ruleName
					let content = this.ruleAddBoxCont.keyWord
					let include_keyword = this.ruleAddBoxCont.keyWordNum
					let data = ''
					if(this.ruleAddBoxCont.msgImgSrc){
						 data = 'type==image##pic_path=='+this.ruleAddBoxCont.msgImgSrc+"##media_id=="+this.media_id
					}else if(this.msgReply){
						data = 'type==text##discraption=='+this.msgReply
					}else if(this.PicText){
						data = 'type==news##media_id=='+this.PicText.pic_thumb_media_id
					}

					saveReplyWithKeyword('groupid='+groupid+"&fn_name="+fn_name+"&content="+content+"&include_keyword="+include_keyword+"&data="+data).then(data=>{
						if(data.success){
							this.initialize()
							this.gorup_ID = 999999999999999
							this.ruleAddBox = false;
							this.ruleAddBoxCont.id=null
							this.ruleAddBoxCont.ruleName=''
							this.ruleAddBoxCont.keyWord=[]
							this.ruleAddBoxCont.keyWordNum=[]
							this.ruleAddBoxCont.msgImgSrc=false
							this.ruleAddBoxCont.msgTatol=0
							this.ruleAddBoxCont.msgTxt=0
							this.ruleAddBoxCont.msgImg=0
							this.ruleAddBoxCont.msgTxtImg=0
							this.PicText = null
							this.msgReply =''
							this.$message({
							message: '储存成功',
							type: 'success'
						});
						}else{
							this.$message({
							message: '储存失败，请重试',
							type: 'error'
						});
						}
					})		
				}
			},
			// 删除方法
			deleteReplyWithKeywordFn(item){
				deleteReplyWithKeyword("groupid="+item.define_type).then(data=>{
					if(data.success){
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.initialize()
						this.gorup_ID = 999999999999999						
					}else{
							this.$message({
							message: '删除失败，请重试',
							type: 'error'
						});
					}
				})
			}
		  },
		  mounted(){
		  	/*****统计埋点*****/
			_czc.push(["_trackEvent", "自动回复", "访问页面"]); //统计流量
			this.action = '../../../imgServlet?actionType=upload&tenentid=' + this.$store.state.user.tenancyid + '&fileId=';//正式地址  正式环境使用	
			// this.action = 'img/imgServlet?actionType=upload&tenentid=' + this.$store.state.user.tenancyid + '&fileId='; //代理地址  本地调试时使用
			  this.getAutoReplyConfigFn()
			  this.getReplySubFn()

		  },
		  updated(){
	
		  }

  	
  	}
</script>

<style rel="stylesheet/scss" lang="scss">

	.autoreply {
	  position: relative;
	  .el-pagination{
		  height: 40px;
	  }
	  		.el-switch{
				  float: right;
				  padding: 5px 20px 0 0;
			  }
		  .el-collapse-item__wrap{
			  width: 100%;
		  }
	  .tableHead{
		  .clearfix{
		  	margin-bottom: 0px;
			border-bottom: 1px solid #ccc 
		  }
	  	padding: 0px 20px;		  
		  p{
			padding: 11px 20px;
		  	width: 100%;
		  	background:rgb(245,247,248);
			  .name{
				  float: left;
				  width: 20%;
				  padding-left:10px;
			  }
			  .keyword{
				  float: left;
				  width: 40%;
				  padding-left:10px;
			  }
			  .rep{
				  float: left;
				  width: 40%;
				  padding-left:10px;
			  }
		  }
	  }
	  .addRuleMsgRight{
		  float: right;
	  }
	  .addRuleMsgLeft{
		  float: left;
	  }
	  .el-table__header {
	    width: 1070px !important;
	  }
	  .divTwo_aqszs {
	    height: auto;
	    min-height: 800px;
	    background: #ffffff;
	    margin-top: 10px;
	    .el-tabs__nav-scroll {
	      border-bottom: 1px solid #eaf1f6;
	      height: 45px;
	      line-height: 45px;
	      margin-left: 20px;
	      margin-right: 20px;
	    }
	    .el-tabs__item {
	      font-size: 16px !important;
	      margin-bottom: 8px !important;
	      padding: 0px 20px !important;
	      margin-left: 0 !important;
	      color: #34495e !important;
	    }
	    .el-tabs__item.is-active {
	      color: #0c9aff !important;
	    }
	    .el-tabs__active-bar {
	      background-color: #0c9aff !important;
	    }
	    .el-tabs__header {
	      background: #fefefe;
	    }
		.rehead{
			font-size: 16px;
			height: 50px;
			line-height:50px;
			margin:0 20px;
			border-bottom:1px solid #EAF1F6;
			text-indent: 10px; 
		}
		.remind{
			font-family: PingFangSC-Regular;
			font-size: 12px;
			color: #758896;
			line-height: 32px;
			height: 32px;
			background: #FFFCF2;
			border-radius: 3px;
			margin:10px 20px 0px;
			padding: 0 9px 0 16px;
			i{
				color:#FFBF00;
			}
			span{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #546475;
				line-height: 14px;
			}
			.on{
				margin: 5px 0px;			
				float: right;
				background: #FF4761;
				border-radius: 3px;
				font-family: PingFangSC-Regular;
				width: 44px;
				height: 22px;
				line-height: 22px;
				padding: 0;			
				span{
					font-size: 12px !important;
					color: #FFFFFF !important;
				}			
			}
			.off{
				margin: 5px 0px;
				float: right;			
				background: #78C75E;
				border-radius: 3px;
				font-family: PingFangSC-Regular;
				width: 44px;
				height: 22px;
				line-height: 22px;
				padding: 0;	
				span{
					color: #FFFFFF !important;				
					font-size: 12px !important;
				}			
			}
		}
		.el-tabs--border-card {
	      border: 1px solid #d8e5ec;
	      box-shadow: none;
	      width: 782px;
	      height: 300px;
	      margin-left: 20px;
	      margin-top: 20px;
	      .is-active {
	        border: none;
	      }
	      .el-tabs__item {
	        border: none;
	        border-color: #d1dbe5;
	        margin-bottom: 0px !important;
	        border-bottom: none;
	        font-size: 14px !important;
	      }
	      .el-tabs__item + .el-tabs__item {
	        border-left: 1px solid #d1dbe5;
	      }
	      .el-tabs__content {
	        padding: 0;
	      }
	      .el-tabs__nav-scroll {
	        margin: 0;
	        border-bottom: 1px solid #e4ecf1 !important;
	      }
		}
		.pictureText {
	      margin-top: 1px;
	      height: 253px;
	      background: #f9fdff;
	      display: flex;
	      justify-content: space-around;
	      align-items: center;
	      textarea {
	        background: #f9fdff;
	        height: 100%;
	        width: 100%;
	        border: none;
	        padding: 5px;
	        margin: 0;
	        resize: none;
	      }
	       .el-upload-dragger {
	        background: #f9fdff;
	        border: 1px dashed #d9d9d9;
	        border-radius: 6px;
	        cursor: pointer;
	        position: relative;
	        overflow: hidden;
	        width: 230px;
	      }
	      .el-upload-dragger:hover {
	        border-color: #20a0ff;
	      }
	      .avatar-uploader-icon {
	        font-size: 28px;
	        color: #8c939d;
	        border: 1px dashed #d9d9d9;		
	        width: 230px;
	        height: 180px;
	        line-height: 180px;
	        text-align: center;
			border-radius:3px; 
	      }
		  .avatar-uploader-icon:hover {
	        border-color: #20a0ff;		  
		  }
	      .avatar {
	        width: 230px;
	        height: 180px;
	        display: block;
	      }
		  .imgBOX{
			position: relative !important;
				span{
					position:absolute;
					top:93px;
					right:87px;
					color: #97a8be;
				}
			}
	  }
	}


		// 图片素材库CSS
			.imgList{
			margin-top: 25px;
			border: 1px solid #EAF1F6;
			margin-left: 20px;
			width:130px;
			float:left;
			text-align: center;
			img{
				display: inline-block;
				width:120px;
				height:120px;
			}
			p{
				line-height: 30px;
				border-top: 1px solid #EAF1F6;
				white-space:nowrap;
				text-overflow:ellipsis;
				width: 130px;
				height: 30px;
				text-align: center;
				overflow: hidden;
				font-size: 16px;
			}
		}
	.active{
		border: 1px solid #0C9AFF;
	}
	.el-dialog__footer{
	background-color: #F4F9FC;	
	text-align: center !important;
	}
	.el-checkbox__label{
		margin-top: 20px;
		display: inline-block;
	}
	.el-checkbox__inner{
		margin-bottom: 15px;
	}

	.btnStyle {
		padding:9px 21px;
	}
	.addRule{
		padding-left:30px;
	}
	.addRule .el-form { 
		width:80%;
	}
	.addRule .el-form-item__label {
		margin-left:0;
	}
	.el-form-item{
		margin-bottom: 10px;
	}
	 .addRuleBtnBox{
		padding:20px;
	}
	.addRuleBtnBox .el-button--danger {
	    color: #fff;
	    background-color: #ff4949;
	    border-color: #ff4949;
	}
	.addRule .floatRight {
		float:right;
	}
	.addRule .el-button--success {
	    color: #fff;
	    background-color: #13ce66;
	    border-color: #13ce66;
	}
	.addRuleBox{
		padding: 0px 20px;
	}
	.addRuleBox .el-collapse-item__header{
		padding: 0;
		height: auto;
		width:100%;
		line-height: 0px;
		border-right: 1px solid #dfe6ec;
		border-left: 1px solid #dfe6ec;
	}
	.addRuleBox .el-collapse-item__header i{
		display: none;
	}
	.el-collapse{
		padding-bottom: 1px;
		border:none;
	}
	.addRuleBox  .titleCont:nth-child(1) {
	  float: left;
	  width: 20%;
	  padding:11px 0px 11px 30px; 
	  margin: 0;
	  span{
		  line-height: 14px;
	  }
	}
	.addRuleBox  .titleCont:nth-child(2) {
	  float: left;
	  width: 40%;
	  padding:11px 0px 11px 15px; 
	  margin: 0;
	  span{
		  line-height: 14px;
	  }
	}
	.addRuleBox  .titleCont:nth-child(3) {
	  float: left;
	  width: 40%; 
	  padding:11px 0px 11px 5px; 
	  margin: 0;
	  span{
		  line-height: 14px;
	  }
	}
	.addRule .addRuleline {
		border-bottom:1px solid #e7e7eb;
		line-height:1px;
		height:1px;
		overflow: hidden;
		margin-bottom:10px;
	}

	.addRuleMsgBox .addRuleMsgContBox{
		padding-left:100px; 
	}
	.addRuleBox .addRuleMsgBox li {
		overflow: hidden;
	}
	.addRuleBox .addRuleMsgContBox , .addRule .addRuleMsgContBox{
	 	width: 100%; 
	}
	.picTextBox{
		padding: 10px;
		border: 1px solid #EAF1F6;	
		margin-bottom:10px;	
		float: left;
		margin-left: 50px;
		width: 316px;
		height: 248px;
		div{
		border-bottom: 1px solid #EAF1F6;	
		height: 40px;
		line-height: 20px;
		margin: 0px 14px;
		span{
			font-size: 12px;
			color: #FFBE00;
		}
		}
		img{
			width: 288px;
			height: 160px;
		}
	}
	.active{
		border: 1px solid #0C9AFF;
	}
	.el-dialog__body ul {
		height: 380px;
    	overflow-y: scroll;
	}

	.inputTxt {
		padding:20px;
	}
	.el-textarea{
		margin-bottom: 10px;
	}
	.inputTxt textarea , .inputTxt .el-textarea__inner {
		width:100%;
	}
	.keyWordTitle {
		line-height:2em;
	}

}
</style>