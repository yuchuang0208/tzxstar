<template>
		<div class="theme">
      <h1>主题设置</h1>
      <div class="tableBox">
        <div class="tablerow">
        <div class="left">
          <div class="telBox">
            <div class="telScreen" id="telScreen">
              <img id="screen_0" src="~@/assets/wx_themes_settings/screen_0.png" width="100%">
              <img id="screen_1" src="~@/assets/wx_themes_settings/screen_1.png" style="display:none;" width="100%">
              <img id="screen_4" src="~@/assets/wx_themes_settings/screen_4.png" style="display:none;" width="100%">
              <img id="screen_3" src="~@/assets/wx_themes_settings/screen_3.png" style="display:none;" width="100%">
              <img id="screen_2" src="~@/assets/wx_themes_settings/screen_2.png" style="display:none;" width="100%">
            </div>
            <img src="~@/assets/wx_themes_settings/iphone.png" width="100%">
          </div>
        </div>
        <div class="right">
          <h2>选择颜色</h2>
          <ul class="palette" id="palette">
            <li v-for="(ele,index) in inputList" :key="index">
              <input :checked="index==0?'checked':''" type="radio" :key="index" name="type" :data-id="index" v-on:click="selColor"  />
              <span>&nbsp;</span>
            </li>
          </ul>
          <fieldset class="btnBox">
            <el-button type="primary" v-on:click="save">保存</el-button>
          </fieldset>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {getColorFn , setColorFn} from "@/api/wx_themes_set.js"
	export default {
  		name: 'wx_themes_settings',
  		data(){
  			return{
          inputList:[
            {id:0},
            {id:1},
            {id:2},
            {id:3},
            {id:4}
          ]
  			}
  		},
      methods: {
        getColor:function(){
          //
          getColorFn("").then(
            data => {
              if(data.msg == "1"){
                let styleColor = data.list[0].para_value;
                document.getElementById("palette").getElementsByTagName("input")[styleColor].checked = true;
                this.elem(styleColor)
              }else{
                this.$message({
                  showClose: true,
                  message: data.msg,
                  type: 'error'
                });
              }
              
            }
          ).catch(
            err => {
              this.$message({
                showClose: true,
                message: JSON.stringify(err),
                type: 'error'
              });
            }
          )
        },
        getStr:function(){
          var getQueryString = (name,str) => {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            let r = str.match(reg);
            if (r != null) return unescape(r[2]); return null;
          }
          let getStr = null;
          if(window.location.hash){
            let Hash = window.location.hash;
            let HashStr = Hash.substring(Hash.indexOf("?")+1);
            getStr = getQueryString("_s",HashStr)?getQueryString("_s",HashStr) : getQueryString("_s",window.location.search.substr(1))
          }else {
            getStr = getQueryString("_s",window.location.search.substr(1));
          }
          return getStr;
        },
        save:function(){
          var Type = null;
          var Input = document.getElementById("palette").getElementsByTagName("input");
          for(var i=0;i<Input.length;i++){
            if(Input[i].checked){
              Type = i;
              break;
            }
          }
         
          setColorFn("values="+Type).then(data=>{
            if(data.msg == "1"){
              this.$message({
                message: '设置成功！',
                type: 'success'
              });
              this.getColor();
            }else{
              this.$message({
                showClose: true,
                message: data.msg,
                type: 'error'
              });
            }
          }).catch(err=>{
            this.$message({
              showClose: true,
              message: JSON.stringify(err),
              type: 'error'
            });
          })
        },
        elem:function(num){
          var ImgEle = document.getElementById("telScreen").getElementsByTagName("img");
          var ImgNum = ImgEle.length;
          for(var i=0;i<ImgNum;i++){
            ImgEle[i].style.display = "none";
          }
          ImgEle[num].style.display = 'block';
        },
        selColor: function (event) { 
          var dataId = event.target.getAttribute("data-id");
          this.elem(dataId);
        }  
      },
    	created(){
        this.getColor()
      },
      mounted(){
        /*****统计埋点*****/
        _czc.push(["_trackEvent", "主题设置", "访问页面"]); //统计流量
      }
  	}
</script>

<style scoped>




.theme{ 
  background: white;
  padding-bottom: 20px;
 }
.theme h1 { 
  color:#34495E;
  font-size: 16px;
  margin-left:21px;
  border-bottom: 1px solid #EAF1F6;
  padding-top: 22px;
  padding-bottom: 12px;
  padding-left: 9px; 
}

.tableBox {
  display:table;
　border-collapse:separate;
  width: 100%; 
  
  padding:0; 
  margin: 0;
}
.tableBox .tablerow {
  display:table-row;   
}
.tableBox .tablerow > div {
  display: table-cell;
}
.tableBox .left  {
  width: 322px;
  overflow: hidden;
 
}
.telBox {
  float: right;
  width:282px;
  margin-top:20px;
  position: relative;
  
}
.telScreen {
  position: absolute;
  top:69px;
  left: 19px;
  right: 20px;
  
}
.tableBox .right{
  vertical-align: top; 
}
.theme h2 {
  color: #34495E;
  margin-top:44px;
  padding-left: 33px; 
}
.theme fieldset {
  margin: 0;
  padding:0;
  border: none;
}
.tableBox .right>ul{
  overflow: hidden;
  margin-left: 20px;
  margin-top: 15px;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}
ul.palette li {
  display: inline-block;
  
  width: 26px;
  height: 26px;
  margin-right: 14px;
  float: left;
  
  color:transparent;
  position: relative;
}
ul.palette li input{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top:0;
  opacity: 0.001;
  z-index: 10;
  cursor: pointer;
}
ul.palette li span{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top:0;
  cursor: pointer;
}
ul.palette li input:checked + span {

  
  width: 36px;
  height: 36px;
  border:rgba(12,154,255,0.2) solid 1px;
  left: -5px;
  top:-5px;
  box-shadow:rgba(219,228,254,0.4) 0px 0px 6px;
}
ul.palette li.current {

}
ul.palette li:nth-of-type(1) {
  background: #FF4444;
}
ul.palette li:nth-of-type(2) {
  background: #1ABC9C;
}
ul.palette li:nth-of-type(3) {
  //background: #FF9A00;
  background: #3399FE;
}
ul.palette li:nth-of-type(4) {
  background: #36AA3F;
}
ul.palette li:nth-of-type(5) {
  //background: #3399FE;
  background: #FF9A00;
}
.theme fieldset.btnBox {
  margin-left: 30px;
  margin-top: 25px;
  border-top: 1px dotted #EAF1F6;
  padding-top: 29px;
}
.btnBox button{
  padding:9px 21px;
}

</style>



