
import '../../static/UE/zepto.min.js'
import  store   from  '../store';

    UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
    UE.Editor.prototype.getActionUrl = function(action){
        if(action == 'uploadimage' || action == 'uploadfile'){
            return  window.getBasePath2()+"/framework/kindeditor/uploadFileUE?_s="+store.state.user.session;
        }else{
            return this._bkGetActionUrl.call(this, action);
        }
    };
   window.getBasePath2=function(){
   	 //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp  
        var curWwwPath=window.document.location.href;  
        //获取主机地址之后的目录，如： /uimcardprj/share/meun.jsp  
        var pathName=window.document.location.pathname;  
        var pos=curWwwPath.indexOf(pathName);  
        //获取主机地址，如： http://localhost:8083  
        var localhostPaht=curWwwPath.substring(0,pos);  
        //获取带"/"的项目名，如：/uimcardprj  
        //var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);  
        return(localhostPaht);  
   }
