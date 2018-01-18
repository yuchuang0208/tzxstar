<template>
  <div>
    <div class="iframeclass_this">





       <h1>微信投票</h1>

        <!-- 投票问题开始 -->
        

        <div class="main_bd" v-if="current == 'ASK'">
          <a @click="backTable()">返回</a>
            <div class="tc_dialog_content vote_container">
               <form class="voteForm">
                   <div class="frm_control_group">
                         <label class="frm_label">投票名称</label>
                        <input :id="'INPT_TOP'" type="text"  value="" name="vote_title" maxlength="35"  v-model="voteInfo.name" ref="count" placeholder="投票名称只用于管理，不显示在下发的投票内容中" />
                                 <em ><span  v-html="voteInfo.number">0</span>/35</em>
                                  <p >
                                 <span  style="display: none;">请填写投票名称</span>
                                  </p>
                    </div>
                    <div class="vote_meta time_setting">
                      <label class="frm_label">截止时间</label>
                             
                      <input v-model="voteInfo.time[1].date" type="text" autocomplete="off"  placeholder="">年月日
                      <input v-model="voteInfo.time[1].hour" type="text"  autocomplete="off" placeholder="" >时
                      <input v-model="voteInfo.time[1].minute" type="text" autocomplete="off" placeholder="" >分
                             
                   </div>
                   <div class="vote_meta">
                        <div class="frm_control_group">
                               <label class="frm_label">投票权限</label>
                               
                                   <input v-model="voteInfo.rights" type="radio" name="permission" value="0" checked="true"><span class="permission_note">所有人</span>
                                   
                                   <input v-model="voteInfo.rights" type="radio" name="permission" value="1">
                                   <span class="permission_note">仅会员</span>
                              
                           </div>
                           <div class="frm_control_group">
                               <label class="frm_label">投票设置</label>
                               
                           </div>
                   </div>
               </form>
                <!---添加问题展示隐藏------->
                <div class="vote_meta_container">
               
                <!-- demo2 -->

                <div v-for="(item,index) in listAsk" :key="index" class="vote_meta option_setting">
                                 
                       <div class="vote_meta_title group">
                           <a class="question_edit">收起</a>
                           <a class="question_delete" v-if="item.del" @click="delAsk(listAsk,index)">删除</a>
                           <span class="vote_num">问题</span>
                           <span class="vote_question"></span>
                       </div>
                       <div class="vote_meta vote_meta_content">
                           <div class="frm_control_group">
                              <label >标题</label>
                              <input :id="'INPT_'+index" v-model="item.title" type="text"  value="" name="note_title" maxlength="35">
                              <em ><span >{{item.title.length}}</span>/35</em>
                              <span class="frm_tips"></span>
                            </div>
                           
                            <div class="frm_controls vote_meta_radio question">
                               <input v-model="item.double" type="radio"  :name="'R'+index" value="one"  checked="checked">
                               <span >单选</span>
                               <input v-model="item.double" type="radio" :name="'R'+index" value="unone" >
                               <span >多选</span>
                               {{item.double}}
                            </div>
                              
                           <div class="vote_meta_detail">


                               <div class="frm_control_group vote_detail" v-for="(item2,index2) in item.items" :key="index2">
                                   
                                   <div class="frm_controls">
                                      <span class="frm_input_box with_counter counter_in append vote_title">
                                        <input :id="'INPT_'+index+'_'+index2" v-model="item2.name" type="text"  value="" name="detail_title" maxlength="35" v-on:input="item2.number = item2.name.length">
                                        <em><span >{{item2.name.length}}</span>/35</em>
                                      </span>
                                      
                                      
                                      

                                      <el-upload
                                        :data-Disabled="imgUpdataBoxDisabled?'DisabledTrue':'DisabledFalse'"
                                        v-if="!item2.img"
                                        class="avatar-uploader"
                                        :disabled="imgUpdataBoxDisabled"
                                        accept=".jpg,.png,.gif"
                                        :on-error="updataLoadError"
                                        :action="action"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                        <font v-if="item2.loadTxt">加载中......</font>
                                        <i v-else  class="el-icon-plus avatar-uploader-icon" @click="updataPic(item2,index,index2)"></i>
                                      </el-upload>

                                      
                                      
                                      <a v-if="item2.delItem" @click="delItem(item.items,index2)" style="background:'red'; display:block; ">删除选项</a>
                                     
                                     
                                   </div>
                                    <div v-if="item2.img">
                                      <img alt="" :src="item2.img" width="100" >
                                      <a style="background:'yellow'; display:block; " v-on:click="delImg(item2)">删除</a>
                                   </div>
                               </div>



                           </div>
                           <div>
                                   <a @click="addItem(item,index)">添加选项</a>
                           </div>
                       </div>
                </div>

                <!-- demo2 -->
                    <div class="vote_container_dec">
                        <a @click="addAsk()">添加问题</a>
                        <p id="error" style="display: none;" class="frm_tips">问题填写完整才能添加下一个问题</p>
                    </div>
                </div>
                <!----问题结束---->
               
                <div class="tool_bar tc">
                    <a @click="save(listAsk,voteInfo)">完成</a>
                </div>
            </div>
        </div>
        <!-- 投票问题结束 -->
        <!-- 表格开始 -->
        <div v-if="current == 'TABLE'">
          <a @click="addVote()">新建投票</a>
          <table border="1" cellspacing="0" class="table" width="100%">
            <thead class="thead">
              <tr>
                <th > 投票名称
                </th>
                <th > 链接地址
                </th>
                <th > 投票人数
                </th>
                <th > 状态
                </th>
                <th > 操作
                </th>
              </tr>
            </thead>
            <tbody class="tbody">
              <tr v-for="(item,index) in table" :key="index">
                <td >{{item.nameData}}</td>
                <td >
                    <input  type="button"  value="点击复制地址">
                    <input  :value="item.urlData">

                </td>
                <td >{{item.peopleData}}</td>
                <td >{{item.stataData}}</td>
                <td >
                 <a @click="goList(item)">{{item.handleData[0]}}</a>
                  <span>
                    <a @click="delRow(table,index)">{{item.handleData[1]}}</a>
                    <div style="display:none;">
                          <p>确认删除此投票？</p>
                          <p>删除后投票数据无法恢复，且图文消息中不再显示。</p>
                          <a >关闭</a>
                         <span >确定</span>
                          <span >取消</span> 
                     
                      </div>
                  </span> 

                 

                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 表格结束 -->

        <!-- 详情开始 -->
        <div class="main_bd" v-if="current == 'LISTINFO'">
          <div > 
              <a @click="listBackTable()">返回</a> 
              <span>投票设置后，必须插入图文消息中才可生效。投票将统计该投票在各个渠道的综合结果总和，包括群发消息，自动回复，自定义菜单等。</span> 
          </div>
          <div >
            <ul>
              <li> 
                <span>投票名称</span>
                <span>{{listInfo.rowData.voteInfo.name}}</span>
               
              </li>
              <li > 
                <span >有效时间</span>
                <em >{{listInfo.rowData.voteInfo.time[0].date}} {{listInfo.rowData.voteInfo.time[0].hour}}:{{listInfo.rowData.voteInfo.time[0].minute}} 至</em>


                <span >{{listInfo.rowData.voteInfo.time[1].date}} {{listInfo.rowData.voteInfo.time[1].hour}}:{{listInfo.rowData.voteInfo.time[1].minute}}</span>
                <span >进行中</span>
                 <a>修改截止时间</a>



                <div class="msg vote_date_select_msg"> 
                      <input type="text"  autocomplete="off"  placeholder="" :value="listInfo.rowData.voteInfo.time[1].date" />
                      &nbsp;&nbsp;
                      <input type="text"  autocomplete="off" placeholder="" :value="listInfo.rowData.voteInfo.time[1].hour" />
                     &nbsp;时
                      <input type="text"  autocomplete="off" placeholder="" :value="listInfo.rowData.voteInfo.time[1].minute" />
                      &nbsp;分 &nbsp;&nbsp;
                      <a class="sureBtn allSet">确定</a>
                     &nbsp;&nbsp;
                      <a class="cancelBtn allSet">取消</a>
                </div>


              </li>
              <li> 
                <span>投票权限</span>
                <span>{{listInfo.rowData.voteInfo.rights=="1"?"只有会员可参与":"所有人均可参与"}}</span>
              </li>
              <li > 
                <span >投票人数</span><span>{{listInfo.peopleData}}人</span>
              </li>
            </ul>
          </div>
          <!---投票已经删除的内容----->
          <div  style="display: none;">
            投票已经删除
          </div>
          <!----end-----> 
          <!---投票结果展示--->
          <div class="vote_list" >
           
            <!-- -->
            <div class="vote_item" style="background:gray;" v-for="(item,index) in listInfo.rowData.listAsk" :key="index">
              <h4  style ="color:pink; font-size:30px;">{{item.title}}</h4>
              <div>
                <ul>

                  <li  style = 'border:blue solid 2px;' v-for="(item2,index2) in item.items">
                    <div > 
                      <img :src="item2.img" alt="item2.name" width="50"  /> <strong style="font-size:20px; color:green;">{{item2.name}}</strong> 
                    </div>
                    <div >
                      <div style = 'height:30px; background:red;'> 
                        <em :style="{width: item2.percent}" class="percentBar"></em> 
                      </div>
                      <span >{{item2.ticket}}票</span> <span >{{item2.percent}}</span> 
                    </div>
                  </li>

                  
                </ul>
              </div>
            </div>
            <!-- -->

          </div>
          <!----end----> 
        </div>

        <!-- 详情结束 -->


    </div>
  </div>
</template>

<script>
  
  export default {
      name: 'wechatvote',
      data(){
        return{
          voteInfo:{
            name:"",
            time:[
              {
                date:0,
                hour:0,
                minute:0,
              },
              {
                date:0,
                hour:23,
                minute:59,
              },
            ],
            
            rights:0,
            number:0,
          },
          singleAsk:{
            title:"",
            double:"one",
            del:true,
            items:[
              {
                name:"",
                img:false,
                number:0,
                delItem:false,
                loadTxt:false,
                ticket:0,
                percent:"0%",
              }
            ],
          },
          singleItem:{
              name:"",
              img:false,
              number:0,
              delItem:true,
              loadTxt:false,
              ticket:0,
              percent:"0%",
          },

          defsingleAsk:{
              title:"",
              double:"one",
              del:false,
              items:[
                {
                  name:"",
                  img:false,
                  number:0,
                  delItem:false,
                  loadTxt:false,
                  ticket:0,
                  percent:"0%",
                },
              ],
            },

          listAsk:[
            ///////////////////// 
            {
              title:"",
              double:"one",
              del:false,
              items:[
                {
                  name:"",
                  //img:"http://fastdfs.meishijia.com/group1/M00/06/72/wKgoD1pTM22ARBtdAAAR4MMLtSU796.png",
                  img:false,
                  number:0,
                  delItem:false,
                  loadTxt:false,
                  ticket:0,
                  percent:"0%",
                },
              ],
            },
            ///////////////////// 
          ],
         
          action:"",
          filename : "",
          itemsDemo:null,
          imgUpdataBoxDisabled:false,
          saveListAsk:null,
          User:null,
          Tenancyid:"",
          ASKDATA:"**********************************",
          row:{
            nameData:"",
            peopleData:0,
            urlData:"",
            stataData:false,
            handleData:false,
            rowData:false,
          },
          table:[
           
          ],
          TABLEDATA:"**********************************",
          listInfo:null,
          _listInfo:{
            "nameData": "T",
            "peopleData": 100,
            "urlData": "http://www.baidu.com",
            "stataData": "进行中",
            "handleData": ["详情1", "删除1"],
            "rowData": {
              "voteInfo": {
                "name": "T",
                "time": [{
                  "date": "2018-1-12",
                  "hour": 19,
                  "minute": 6
                }, {
                  "date": "2018-2-12",
                  "hour": 23,
                  "minute": 59
                }],
                "rights": 0,
                "number": 1
              },
              "listAsk": [{
                "title": "T-1",
                "double": "one",
                "del": false,
                "items": [{
                  "name": "T-1-1",
                  "img": "http://fastdfs.meishijia.com/group1/M00/06/7A/wKgoD1pYlryAT1zuAAvWFkcZHjA643.jpg",
                  "number": 5,
                  "delItem": false,
                  "loadTxt": false,
                  "ticket": 30,
                  "percent": "30%"
                }, {
                  "name": "T-1-2",
                  "img": "http://fastdfs.meishijia.com/group1/M00/06/7A/wKgoD1pYlsCAIL_3AAA2jdzzYK4791.jpg",
                  "number": 5,
                  "delItem": true,
                  "loadTxt": false,
                  "ticket": 40,
                  "percent": "40%"
                }]
              }, {
                "title": "T-2",
                "double": "one",
                "del": true,
                "items": [{
                  "name": "T-2-1",
                  "img": "http://fastdfs.meishijia.com/group1/M00/06/7A/wKgoD1pYltOACqUkAADSYCeNMEs749.gif",
                  "number": 5,
                  "delItem": false,
                  "loadTxt": false,
                  "ticket": 80,
                  "percent": "80%"
                }]
              }]
            }
          },

          LISTINFODATA:"*******************************",
          current:"TABLE"//"TABLE"//"ASK"//"LISTINFO"
        }
      },
      watch:{
        voteInfo:{
          handler(){
            //this.voteInfo.number = this.$refs.count.value.length;
          },
          deep:true
        },
        'voteInfo.name':function(val,oldval){  
          this.voteInfo.number = this.voteInfo.name.length;
        },
        User: {
  　　　　handler(newValue, oldValue) {
              
              
  　　　　　　
            if(newValue.tenancyid){
              this.Tenancyid = newValue.tenancyid;
              this.fnAction();
              
            }
              
  　　　　},
  　　　　deep: true
    　　}
        
      },
      methods:{
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
        save(D,V){
          
          let Save = true;
          let arrTit = [];
          let arrItem = [];
          let arrTop = [];
          let arrAll = [];
          if(!this.voteInfo.name){
            Save = false;
            arrTop.push("TOP");
          }
          for(var i=0;i<D.length;i++){
            if(!D[i].title){
              Save = false;
              arrTit.push(i)
            }
            
            for(var j=0;j<D[i].items.length;j++){
              if(!D[i].items[j].name){
                Save = false;
                arrItem.push(i+"_"+j);
              }
            }
          }
          arrAll = arrTit.concat(arrItem,arrTop);
          if(!Save){

            this.$message({
              showClose: true,
              message: "选项不能为空",
              type: 'error'
            });
           
            arrAll.forEach( function(element, index) {
              document.getElementById("INPT_"+element).style.background = 'red';
              setTimeout(()=>{
                document.getElementById("INPT_"+element).removeAttribute("style");
              },2000)
            });
            
            
          
          }else {
            this.$message({
              message: '提交',
              type: 'success'
            });
            let Obj = {};
            Obj.voteInfo = V;
            Obj.listAsk = D;
            this.saveListAsk = this.copy(Obj);
            Obj = null;
            console.log("提交","this.saveListAsk",this.saveListAsk);
            
            let addRow = this.copy(this.row);

            addRow.rowData = this.saveListAsk;
            addRow.nameData = this.saveListAsk.voteInfo.name;
            addRow.peopleData = 100;
            addRow.urlData = "http://www.baidu.com";
            addRow.stataData = "进行中";
            addRow.handleData = [ "详情", "删除"]
            this.table.push(addRow);
            this.current = "TABLE";
            this.saveListAsk = null;
            addRow = null;

            console.log("this.table", this.table);
            console.log(JSON.stringify(this.table))
            
          }

       

        },
        delImg(Item){
          Item.img = null;
        },
        delItem(Arr,I){
          Arr.splice(I, 1);
        },
        delAsk(Arr,I){
          Arr.splice(I, 1);
        },
        addItem(Arr,I){
          if(Arr.items.every((ITEM) => {return ITEM.name})){
            Arr.items.push(this.copy(this.singleItem))
          }else {
            this.$message({
              showClose: true,
              message: "选项不能为空",
              type: 'error'
            });
            let arr = [];
            Arr.items.forEach((ITEM,index)=>{
              if(!ITEM.name){
                arr.push(I+"_"+index)
              }
              
            })

            arr.forEach( function(element, index) {
              document.getElementById("INPT_"+element).style.background = 'red';
              setTimeout(()=>{
                document.getElementById("INPT_"+element).removeAttribute("style");
              },2000)
            });
            
            
          }
        },
        addAsk(){
          this.listAsk.push(this.copy(this.singleAsk));
        },
        updataPic(Arr,I,I2){
          if(!this.imgUpdataBoxDisabled){
            this.itemsDemo = null;
            this.itemsDemo = Arr;
            console.log("updataPic -- imgUpdataBoxDisabled:false");
          }else {
            console.log("updataPic -- imgUpdataBoxDisabled:true");
          }
          
        },
        updataLoadError(err, file, fileList){
          this.$message.error('文件上传失败');
          this.itemsDemo.loadTxt = false;
          this.itemsDemo = false;
          this.imgUpdataBoxDisabled = false;

        },

        handleAvatarSuccess(res, file) {
          let index1 = res.indexOf("url") + 6;
          let index2;

          if(res.indexOf("png") != -1){
            index2 = res.indexOf("png") + 3;
          }else if(res.indexOf("jpg") != -1){
            index2 = res.indexOf("jpg") + 3;
          }else if(res.indexOf("gif") != -1){
            index2 = res.indexOf("gif") + 3;
          }else {
            //this.$message.error('上传头像图片只能是 JPG、gif、png 格式!');
            return;
          }
          let path = res.substring(index1, index2); /****图片地址*****/
          let filename;
          if(path.indexOf("/") > 0) //如果包含有"/"或"\"号 从最后一个"/"或"\"号+1的位置开始截取字符串
          {
            filename = path.substring(path.lastIndexOf("/") + 1, path.length);
          } else if(path.indexOf("\\") > 0) {
            filename = path.substring(path.lastIndexOf("\\") + 1, path.length);
          }
          
          this.filename = filename;
          this.itemsDemo.img = path;
          console.log("--------3----------")
          this.itemsDemo.loadTxt = false;
          this.itemsDemo = null;
          this.imgUpdataBoxDisabled = false;
          console.log("--------3----------")
          

           
           
        },
        beforeAvatarUpload(file) {
          
          const isGIF = file.type === 'image/gif';
          const isPNG = file.type === 'image/png';
          const isJPG = file.type === 'image/jpeg';

          if (!isJPG && !isPNG && !isGIF) {
            this.$message.error('上传头像图片只能是 JPG、gif、png 格式!');
            return;
          }

          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          let Pic = isGIF || isPNG || isJPG;
          console.log("--------2---------")
          this.imgUpdataBoxDisabled = true;
          this.itemsDemo.loadTxt = true;

          console.log("-----------------2")
          return Pic && isLt2M;
        },
        fnAction(){

          //this.action = '../../../imgServlet?actionType=upload&tenentid=' + this.Tenancyid + '&fileId=';//正式地址  正式环境使用  
          this.action = 'img/imgServlet?actionType=upload&tenentid=' + this.Tenancyid + '&fileId='; //代理地址  本地调试时使用
        },
        askInit(){
          this.listAsk.splice(0,this.listAsk.length);
          this.voteInfo.name = "";
          //this.voteInfo.date = 0;
          this.voteInfo.time[0].date = 0;
          this.voteInfo.time[0].hour = 0;
          this.voteInfo.time[0].minute = 0;

          this.voteInfo.time[1].date = 0;
          this.voteInfo.time[1].hour = 23;
          this.voteInfo.time[1].minute = 59;


         
          this.voteInfo.rights = 0;
          this.voteInfo.number = 0;
          this.dateTimer();
          this.listAsk.push(this.copy(this.defsingleAsk));
        },
        dateTimer(){
          let myDate = new Date();
          let getM = myDate.getMonth()+2 >12?1:myDate.getMonth()+2;
          let endDate = myDate.getFullYear()+"-"+ getM +"-"+  myDate.getDate();
          let starDate = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();
          this.voteInfo.time[1].date = endDate;

          this.voteInfo.time[0].date = starDate;
          this.voteInfo.time[0].hour = myDate.getHours();
          this.voteInfo.time[0].minute = myDate.getMinutes();

          console.log("this.voteInfo.time",this.voteInfo.time)

          


        },
        backTable(){
          this.current = "TABLE";
          this.askInit();
        },
        /////////////--表格
        delRow(Arr,I){
          Arr.splice(I, 1);
        },
        addVote(){
          this.dateTimer();
          this.askInit();
          console.log('addVote--this.listAsk',this.listAsk)
          this.current = "ASK";
        },
        goList(ITEM){
          this.listInfo = ITEM;
          console.log('this.listInfo',JSON.stringify(this.listInfo))
          this.current = "LISTINFO";
          this.askInit();

        },
        ////////////////// 投票列表
        listBackTable(){
          this.askInit();

          this.current = "TABLE";
          this.listInfo = null;
        },
        

      },
      mounted(){
        
        
        this.User = this.$store.state.user;
        this.fnAction();
       
        
    
      },
      updated(){
        // if(this.Tenancyid){
        //   this.fnAction();
        // }
        
       
      }
    }

</script>

<style rel="stylesheet/scss" lang="scss">
  .iframeclass_this {
      width: 100%;
      min-height: 550px;
      border: 1px solid #EAF1F6;
      background:white;
  }
  .iframeclass_this h1 { 
    color:#34495E;
    font-size: 16px;
    margin-left:21px;
    margin-right:21px;
    border-bottom: 1px solid #EAF1F6;
    padding-top: 22px;
    padding-bottom: 12px;
    padding-left: 9px; 
  }

  .vote_meta_container {
    border:red solid 1px;
  }
  .vote_meta.option_setting {
    background:gray;
    border:blue solid 3px;
    margin-top:20px;
  }


.percentBar {
   height:100%; display:block; background: linear-gradient(to right, rgb(0, 179, 96) 35%, rgb(255, 176, 54) 68%);
}
  div[data-disabled=DisabledFalse].avatar-uploader{
   
  }
  div[data-disabled=DisabledTrue].avatar-uploader i{
    opacity:0;
  }
  .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #20a0ff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 78px;
      height: 78px;
      line-height: 78px;
      text-align: center;
    }
    .avatar {
      width: 78px;
      height: 78px;
      display: block;
    }

</style>
//http:///pages/weixin/admin/newversion/wechatvote.jsp?_s=5e2046b2-3ea3-4c29-a609-d8dd296d064a

//../../../pages/weixin/admin/newversion/wechatvote.jsp

//src:'http://cs4.meishijia.com/pages/weixin/admin/newversion/wechatvote.jsp'+'?_s='+this.$store.state.user.session