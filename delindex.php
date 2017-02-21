<?php
   $mysql=new mysqli("localhost","root","","yuelaoshi");
   $mysql->query("set names utf8");
   $id=$_GET["id"];
   $mysql->query("delete from stu where id=".$id);
   if($mysql->affected_rows>0){
	echo "ok";
  }
?>