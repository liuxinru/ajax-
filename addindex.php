<?php
   $mysql=new mysqli("localhost","root","","yuelaoshi");
   $mysql->query("set names utf8");
   $mysql->query("insert into stu(name,age,sex,home) values('','','','')");
   if($mysql->affected_rows>0){
	   echo $mysql->insert_id;
  }
?>