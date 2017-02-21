//2016.12.14 
//1.获取类名
function getClass(classname,obj){   //传入类名，父级下面的元素
   var obj=obj||document;           //两种情况，父级可以是document，也可以是你写的父级
   if(obj.getElementsByClassName){    //父级能识别getElenmentsClassName的话，就直接获取
     return obj.getElementsByClassName(classname);  
   }else{                             //不识别的话，通过遍历所有的标签，
     var arr=[];                      //创建一个空数组
     var objs=obj.getElementsByTagName("*");    //找到给出的父级里边所有的标签
     for(var i=0;i<objs.length;i++){            //遍历找到的标签
      if(checkClass(objs[i].className,classname)){        //把找到的类名和你传入的类别比较
            arr.push(objs[i]);                  //相同的添加到新数组中
      }
     }
     return arr;                               //返回这个数组
   }
}
function checkClass(classname,val){         //classname(box,one,two)   val(需要获取的类名)
  var arr1=classname.split(" ");            //先将字符串转成数组
  for(var i=0;i<arr1.length;i++){           //遍历这个数组
    if(arr1[i]==val){                       //在数组里边找到需要的类名
         return 1;                          //如果存在的话返回1
    }                    

  }
  return 0;                               // 不存在的话返回0
}



//2016.12.16
//2.获取类样式
function getStyle(obj,style){     //获取谁的样式,一个参数是对象,还有该对象的样式
    if(obj.currentStyle){        // 如果是IE,可识别currenStyle,则用obj.currenStyle.css属性
      return obj.currentStyle[style];    
    }else{
      return getComputedStyle(obj,null)[style];   //否则用getComputedStyle(obj,null).css属性
    } 
}


//2016.12.16
//目的:  $("div")    $(".one")    $("#one")    $(function(){})实现window.onload
//3.获取元素
function $(selecter,obj){
  var obj=obj||document;                                        //将前后出现的空格都找到去掉
 if(typeof selecter=="string"){
     var selecter=selecter.replace("/^\s*|\s*$/g","");      
      if(selecter.charAt(0)=="."){                            //如果首字母是“.” 类名   要截取
      return getClass(selecter.slice(1),obj);         
    }if(selecter.charAt(0)=="#"){                                //id   “#”
      return obj.getElementById(selecter.slice(1)); 
    }else if(/^[a-zA-Z][a-zA-Z0-6]{0,8}$/.test(selecter)){        //标签  <div> 
      return obj.getElementsByTagName(selecter);
    }else if(/^<[a-zA-Z][a-zA-Z0-6]{0,8}>$/){                     //"<div>"
       return document.createElement(selecter.slice(1,-1));
    }
      
  }else if(typeof selecter=="function"){           
      window.onload=function(){
        selecter();
      }
    }

  }



//2016.12.20
//4.节点问题
function getChilds(obj,type){    //找谁下面的节点，
  var arr=[];                    //声明一个新数组用来存
  var childs=obj.childNodes;     //声明该对象的所有子节点
  type=type||"no";               //默认找元素节点
  for(var i=0;i<childs.length;i++){    //遍历子节点
       if(type=="no"){                 //如果是传入“no”；
         if(childs[i].nodeType==1){       //且节点类型是1
              arr.push(childs[i]);        //将找出来的节点添加到新数组
        }  
        //包括文本
       }else if(type=="yes"){             //如果传入“yes”
         if(childs[i].nodeType==1||childs[i].nodeType==3&&childs[i].nodeValue.replace("/^\s*|\s*$/g","")){
                                     //找到是元素节点，或者是文本节点和将空格换成空
         arr.push(childs[i]);            //添加到新数组
        }
     }
  }
  return arr;
}






//获取第一个节点
function getFirst(obj,type){     
  type=type||"no";
  if(type=="no"){
    return getChilds(obj,"no")[0];
  }else if(type=="yes"){
    return getChilds(obj,"yes")[0];
  }
}




//获取最后一个节点
function getLast(obj,type){
   type=type||"no";
   var childs=obj.childNodes;
   if(type=="no"){
    return getChilds(obj,"no")[getChilds(obj,"no").length-1];
  }else if(type=="yes"){
    return getChilds(obj,"yes")[getChilds(obj,"no").length-1];
  }
}



//获取指定的节点
function getNum(obj,num,type){
  type=type||"no";
  if(type=="no"){
    return getChilds(obj,"no")[num-1];
  }else if(type=="yes"){
    return getChilds(obj,"yes")[num-1];
  }
}




//获取下一个节点
function getNext(obj,type){
  type=type||"no";
  var next=obj.nextSibling;
  if(next==null){
     return 0;
  }
  if(type=="no"){
      while(next.nodeType==3||next.nodeType==8){
        next=next.nextSibling;
        if(next==null){
          return 0;
        }
      }
  }else if(type=="yes"){
       while(next.nodeType==3&&!next.nodeValue.replace("/^\s*|\s*$/g","")||next.nodeType==8){
        next=next.nextSibling;
        if(next==null){
          return 0;
         }
      }
    }
       return next;
  }
  



//获取上一个节点
function getshang(obj,type){
  type=type||"no";                   
  var shang=obj.previousSibling;              
  if(shang==null){               
    return 0;
  }
  if(type=="no"){
     while(shang.nodeType==3&&shang.nodeType==8){
      shang=shang.previousSibling;
      if(shang==null){
        return 0;
      }
     }
  }else if(type=="yes"){
     while(shang.nodeType==3&&!shang.nodeValue.replace("/^\s*|\s*$/g","")||shang.nodeType==8){
      shang=obj.previousSibling;
      if(shang==null){
        return 0;
      }
     }
  }
  return shang;
}





//5.封装insertBofer
function insertBefore(newobj,beforeobj){         //参数 newobj要插入的对象    beforeobj要插入某个对象之前
   var parent=beforeobj.parentNode;              //某个对象的父节点
   parent.insertBefore(newobj,beforeobj)         //直接调用
}                                                
function insertAfter(newobj,beforeobj){         //插入某个对象之后，思路是插入这个对象的下一个节点之前  
  var next=getNext(beforeobj,"yes");            //获取这个对象的下一个节点
  var parent=beforeobj.parentNode;                
  if(next){                                     //如果存在下一个节点的话
    insertBefore(newobj,next);                  //插在下一个节点的前面
  }else{                                        
    parent.appendChild(newobj);                 //如果没有下一个节点，直接追加到父节点后边
  }
}






//绑定事件的兼容问题
//12.23
function addEvent(obj,event,fun){          
  if(obj.attachEvent){                   
     obj.attachEvent("on"+event,funEvent);                   //绑定在obj身上的是funEvent
  }else{
     obj.addEventListener(event,funEvent,false);           //绑定在obj身上的是funEvent
                                                             
      
    }
      return funEvent;
      function funEvent(e){                   //兼容事件对象
        var ev=e||window.event;              //改变this指针，并且传递事件对象
        fun.call(obj,ev);
   }


}





//删除事件
function removeEvent(obj,event,fun){
  if(obj.addEventListener){
     obj.removeEventListener(event,fun,false);    //删除的事件是funEvent
  }else{
     obj.detachEvent("on"+event,fun);
  }
}









//2016.12.26
//滚轮事件
function mousewheel(obj,upfun,downfun){
   if(obj.attachEvent){                                      //各个浏览器的滚轮事件添加方法
     obj.attachEvent("onmousewheel",fun);                    //IE
   }else{
     obj.addEventListener("mousewheel",fun,false);           //360 其他
     obj.addEventListener("DOMMouseScroll",fun,false);       //火狐
   }
     function fun(e){
      var ev=e||window.event; 
      var num=ev.wheelDelta||ev.detail;             //判断滚轮的方向
      if(num==120||num==-3){                        //谷歌向上120，火狐向上是-3，
         upfun.call(obj);
    }else if(num==-120||num==3){                    //谷歌向下-120，火狐向上是3
        downfun.call(obj);
   }
 }
}





//2016.12.27
//hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
 



//2016.12.29
//设置cookie
function setCookie(attr,value,time){       //time可以自己指定 天、时、分都可以
	if(time){                               //如果传时间的话
		var nowtime=new Date();             //用时间必须实例化时间        
		nowtime.setTime(nowtime.getTime()+time*1000);      //setTime设置毫秒时间  
		document.cookie=attr+"="+value+";expires="+nowtime.toGMTString();   //将时间转化GMT形式
	}else{
		document.cookie=attr+"="+value;
	}
}



//得到cookie  
//首先观察cookie的形式
//“aa=bb； cc=ee; ”
//分割成【“aa=bb”，“cc=ee”】
function getCookie(attr){
	var cookies=document.cookie;           //获取cookie
	var arr=cookies.split("; ");           //分割
  for(var i=0;i<arr.length;i++){          
    var brr=arr[i].split("=");            //在用等号分割
     if(brr[0]==attr){                  //brr【0】存的是键，brr【1】存的是值，将值返回
      return brr[1];            
     }
  }
  return false;
}



//删除cookie
function delCookie(attr){                   //attr为键
	 var nowtime=new Date();
    nowtime.setTime(nowtime.getTime()-1);      //让他的时间变为之前的任意时间就可以，-10或者-2都可以
    document.cookie=attr+"=fdsfdf;expires="+nowtime.toGMTString();   
}




//2017.1.6
//封装ajax
function ajax(obj){
	var method=obj.method||"get";                            //初始化
	var url=obj.url;
	var dataType=obj.dataType||"text";
	var asynch=obj.asynch==undefined? true:obj.asynch;      
	var success=obj.success;                               //函数
	var data="";
    switch(typeof(obj.data)){
			case "undefined":;
			break;
			case "string":
			   data=obj.data;
			break;
			case "object":
			   for (var i in obj.data){
			   	data+=i+"="+obj.data[i]+"&";
			}
			data=data.slice(0,-1);
			break;
			
		};
      var ajax=window.XMLHttpRequest? new XMLHttpRequest():new activeXobject("Microsoft.XMLHTTP");
      if(method=="get"){
    	 ajax.open("get",url+"?"+data,asynch);
    	 ajax.send(null);
      }else if(method=="post"){
    	ajax.open("post",url,asynch);
    	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    	ajax.send(data);
    };
    ajax.onreadystatechange=function(){
    	if(ajax.readyState==4){
    		if(ajax.status==200){
    			var result;
    			switch(dataType){
    				case "text":
    				   result=ajax.responseText;
    				   success(result);
    				break;
    				case "XML":
    				   result=ajax.responseXML;
    				   success(result);
    				break;
    				case "json":
    				   result=eval("("+ajax.response+")");
    				   success(result);
    				break;
    			}
    		}
    	}
    }

}

