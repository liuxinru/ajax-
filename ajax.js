//封装ajax
//parma  object
      //url   str【url】   要请求的地址
      //type  str【post，get】  要请求的方式
      //data  str【json，xml，text，document】     返回的数据类型
      //success   fn（callback） callback(e)
function ajax(obj){
	if(typeof obj!="object"){
	 	 console.log("请输入正确的格式！");
	 	 return false;
	 }
	 //参数初始化
	 var url=obj.url;
	 if(url==undefined){
	 	console.log("请指定请求地址！");
	 	return false;
	 }
	 var type=obj.type||"get";
	 var dataType=obj.dataType||"text";
	 var data=obj.data||"";
	 if(typeof data=="object"){
	 	var str="";
	 	for(var i in data){
	 		str+=i+"="+obj.data[i]+"&";   
	 	}
	 	data=str.slice(0,-1);
	 }
	 var asynch=obj.asynch==undefined?true:obj.asynch;
	 var ajaxobj=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	 if(type=="get"){
	 	ajaxobj.open(type,url+"?"+data,asynch);
	 	ajaxobj.responseType=dataType;
	 	ajaxobj.send();
	 	
	 }else if(type=="post"){
	 	ajaxobj.open(type,url,asynch);
	 	ajaxobj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	 	ajaxobj.responseType=dataType;
	 	ajaxobj.send(data);
	 	
	 }
	 var success=obj.success;
	 ajaxobj.onreadystatechange=function(){
	 	if(ajaxobj.readyState==4){
	 		if(ajaxobj.status==200){
	 			   if(typeof result=="xml"){
	 					var result=ajaxobj.responseXML;
	 				}else{
	 					var result=ajaxobj.response;
	 				}
	 		       success(result);
	 		       
	 		}else if(ajaxobj.status==404){
	 			alert("页面未找到！");
	 		}else if(ajaxobj.status==403){
	 			alert("禁止访问！");
	 		}
	 	}
	 }
}



//function ajax(obj){
//	if(typeof obj!="object"){
//		console.log("请输入正确的格式");
//		return false;
//	}
//	var obj=obj.url;
//	if(url==undefined){
//		console.log("请输入请求地址");
//		return false;
//	}
//  
//  var data=obj.data||"";
//  if(typeof data=="object"){
//  	var str="";
//  	for(var i in data){
//  	    str+=i+"="+obj.data[i]+"&"; 
//  	}
//  	data=str.slice(0,-1);
//  }
//  
//  var dataType=obj.dataType||"get";
//  var ajaxobj=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
//  var success=obj.success;
//  var asynch=obj.asynch==undefined?
//}
