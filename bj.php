<?php
   $mysql=new mysqli("localhost","root","","yuelaoshi");
   $mysql->query("set names utf8");
   $id=$_GET["id"];
   $attr=$_GET["attr"];
   $value=$_GET["value"];
   $mysql->query("update stu set {$attr}='{$value}' where id=".$id);
   if($mysql->affected_rows>0){
	echo "ok";
  }
?>