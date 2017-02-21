<?php
     $mysql=new mysqli("localhost","root","","yuelaoshi");
     $mysql->query("set names utf8");
     $result=$mysql->query("select * from stu");
     $arr=array();
     while($row=$result->fetch_assoc()){
     	 $arr[]=$row;
    }
     echo json_encode($arr);
?>