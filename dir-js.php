<?php
/**
*@author: Heiter Developer <dev@heiterdeveloper.com>
*@link: https://github.com/HeiterDeveloper/dir-js
*@copyright: 2020 Heiter Developer
*@license: Apache License 2.0
*@license: https://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
**/

require("SimpleThumbPHP.class.php");
define("DIRROOT", "/var/www/teste");
define("DIRFILES", DIRROOT."/uploads/");
define("DIRCACHE", "cache/");
define("OUTDIRFILES", str_replace(DIRROOT, "", DIRFILES));


$p = $_POST['target'];
$p2 = $_POST['command'];
$p3 = $_POST['namedir'];
$p4 = $_FILES['arquivo'];

function thumbArquivo($file){
  $typeFile = mime_content_type($file);
  $thumb = '';
  if(preg_match("/image/", $typeFile)){
    $ext = pathinfo($file)['extension'];
    $nm = sha1($file);
    $thumbDefault = DIRROOT."/".DIRCACHE.$nm.".$ext";

    if(!file_exists($thumbDefault)){
      $mode = 'C';
      $modeFile = 'S';
      $myImg = new SimpleThumbPHP();
      $myImg->create($file, 150, 150, $mode);
      $myImg->save($modeFile, $thumbDefault);
    }
  }
  return str_replace(DIRROOT."/", "", $thumbDefault);
}

function listDir($dir){

  $outCommand = array();
  $itens = array();

  $fullName = (DIRFILES == $dir . "/") ? "" : str_replace(DIRFILES, "", $dir);
  if ($handle = opendir($dir)) {
    while (false !== ($file = readdir($handle))) {
        if ($file != "." && $file != "..") {
            $thumbFile = thumbArquivo("$dir/$file");
            $isDir = (is_dir("$dir/$file")) ? "T" : "F";
            $itens[] = array("nome"=>$file, "dir"=>$isDir, "thumbFile"=>$thumbFile);
        }
    }
    $outCommand = array("dir"=>$fullName, "dirFiles"=>OUTDIRFILES, "itens"=>$itens);
    echo json_encode($outCommand);
    closedir($handle);
  }
  else{
    $outCommand = array("dir"=>$fullName, "dirFiles"=>OUTDIRFILES, "vazio"=>1);
    echo json_encode($outCommand);
  }
}

header("Content-type: application/json");

if($p == "default"){
  listDir(DIRFILES);
}
if($p2 == "cd"){
  listDir(DIRFILES."$p");
}
if($p2 == "newDir"){
  mkdir(DIRFILES."$p/$p3");
  listDir(DIRFILES."$p");
}
if($p2 == "renameDir"){
  $oldNameFile = DIRFILES."$p/".$p3['oldName'];
  $ext = (!is_dir($oldNameFile)) ? ".".pathinfo($oldNameFile)['extension'] : '';
  rename($oldNameFile, DIRFILES.$p."/".$p3['newName'].$ext);
  listDir(DIRFILES."$p");
}
if($p2 == "back"){
  $cm = dirname(DIRFILES . $p, 1);
  if($p == ""){
    $cm = DIRFILES;
  }
  listDir($cm);
}
if($p2 == "delDir"){
  foreach($p3 as $pos){
    exec("rm -fr \"". DIRFILES.$p."/$pos\"");
  }
  listDir(DIRFILES."$p");
}
if($p2 == "upload"){
  move_uploaded_file($p4['tmp_name'], DIRFILES."$p/".$p4['name']);
  listDir(DIRFILES."$p");
}
?>
