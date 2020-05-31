/**
*@author: Heiter Developer <dev@heiterdeveloper.com>
*@link: https://github.com/HeiterDeveloper/dir-js
*@copyright: 2020 Heiter Developer
*@license: Apache License 2.0
*@license: https://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
**/

var targetRoot = '';

$('script').each(function(){
  var url = $(this).attr("src").split("/");
  if(url.length > 1){
    if(url[url.length-1] == "dir-js.js"){
      for(x=0;x<url.length-1;x++){
        targetRoot += url[x] + "/";
      }
    }
  }
});

function ce(el){
  return document.createElement(el);
}

function showBox(){
  var el1 = ce("div");
  el1.className="dir-js-background";
  var el2 = ce("div");
  el2.className="dir-js-box";
  el1.appendChild(el2);
  var el3 = ce("div");
  el3.className="dir-js-menu";
  el2.appendChild(el3);
  var el4 = ce("input");
  el4.type="hidden";
  el4.id="dirAtual";
  el3.appendChild(el4);

  var el5 = ce("input");
  el5.type="file";
  el5.name="fileUpload";
  el5.id="fileUpload";
  el3.appendChild(el5);

  var el6 = ce("span");
  el6.className="dir-js-back-dir";
  el6.innerHTML="Voltar";
  el6.style.backgroundImage="url("+targetRoot+"img/back.png)";
  el3.appendChild(el6);

  var el7 = ce("span");
  el7.className="dir-js-new-dir";
  el7.innerHTML="Nova pasta";
  el7.style.backgroundImage="url("+targetRoot+"img/folder.png)";
  el3.appendChild(el7);

  var el8 = ce("span");
  el8.className="dir-js-del-dir";
  el8.innerHTML="Excluir";
  el8.style.backgroundImage="url("+targetRoot+"img/delete.png)";
  el3.appendChild(el8);

  var ell8 = ce("span");
  ell8.className="dir-js-ren-dir";
  ell8.innerHTML="Renomear";
  ell8.style.backgroundImage="url("+targetRoot+"img/rename.png)";
  el3.appendChild(ell8);

  var el9 = ce("span");
  el9.className="dir-js-upl-dir";
  el9.innerHTML="Upload";
  el9.style.backgroundImage="url("+targetRoot+"img/upload.png)";
  el3.appendChild(el9);

  var el10 = ce("button");
  el10.className="dir-js-sel-dir";
  el10.innerHTML="Selecionar";
  el3.appendChild(el10);

  var el11 = ce("button");
  el11.className="dir-js-can-dir";
  el11.innerHTML="Cancelar";
  el3.appendChild(el11);

  var el12 = ce("div");
  el12.className="dir-js-box-resu";
  el2.appendChild(el12);

  document.body.appendChild(el1);
}

function dirJsList(obj){


  $("#dirAtual").val(obj.dir);
  $("#dirAtual").attr("data-dirfiles", obj.dirFiles);
  $(".dir-js-box-resu").html("");
  if(obj.itens.length == 0){
    $(".dir-js-box-resu").html("<h6 class='msgDirNull'>Pasta vazia</h6>");
    return false;
  }
  for(x=0;x<obj.itens.length;x++){
    if(obj.itens[x].dir == 'T'){
      $(".dir-js-box-resu").append("<div class='dir-js-isdir dir-js-item' data-nomedir='"+obj.itens[x].nome+"'><div class='area-click-cd'></div><span><input type='checkbox'/><br/>"+obj.itens[x].nome+"</span></div>");
    }
    else{
      var thumbPrev = (obj.itens[x].thumbFile == "") ?  targetRoot+"img/generic-file.png" : obj.itens[x].thumbFile;
      $(".dir-js-box-resu").append("<div class='dir-js-isfile dir-js-item' style='background-image:url("+thumbPrev+")' data-nomedir='"+obj.itens[x].nome+"'><span><input type='checkbox'/><br/>"+obj.itens[x].nome+"</span></div>");
    }
  }
  $(".dir-js-isdir").css("backgroundImage", "url("+targetRoot+"img/folder.png)");

  $(".dir-js-item").on("click", function(){

  });

  $(".dir-js-isfile").on("click", function(){
    if($(this).find("input").eq(0).prop("checked") == true){
      $(this).css("border", "solid 5px green");
    }
    else{
      $(this).css("border", "");
    }
    $(".dir-js-del-dir").hide();
    $(".dir-js-sel-dir").hide();
    $(".dir-js-ren-dir").hide();

    $(".dir-js-upl-dir").css("display", "inline-block");
    $(".dir-js-new-dir").css("display", "inline-block");

    $(".dir-js-item").each(function(){
      if($(this).find("input").eq(0).prop("checked") == true){
        $(".dir-js-del-dir").css("display", "inline-block");
        $(".dir-js-ren-dir").css("display", "inline-block");
        $(".dir-js-sel-dir").show();
        $(".dir-js-upl-dir").hide();
        $(".dir-js-new-dir").hide();
      }
    });
  });

  $(".dir-js-isdir input").on("click", function(){
    if($(this).prop("checked") == false){
      $(this).css("border", "solid 5px green");
    }
    else{
      $(this).css("border", "");
    }
  $(".dir-js-del-dir").hide();
  $(".dir-js-sel-dir").hide();
  $(".dir-js-ren-dir").hide();

  $(".dir-js-upl-dir").css("display", "inline-block");
  $(".dir-js-new-dir").css("display", "inline-block");

  $(".dir-js-item").each(function(){
    if($(this).find("input").eq(0).prop("checked") == true){
      $(".dir-js-del-dir").css("display", "inline-block");
      $(".dir-js-ren-dir").css("display", "inline-block");
      $(".dir-js-sel-dir").show();
      $(".dir-js-upl-dir").hide();
      $(".dir-js-new-dir").hide();
    }
  });
});

  $(".area-click-cd").on("click", function(){
    $.post( targetRoot+"dir-js.php", { command: 'cd', target: $("#dirAtual").val() +"/"+ $(this).parent().attr("data-nomedir")}).done(function( data ) {
      dirJsList(data);
    });
  });
}

$.fn.dirJs = function(options){

  var defaultSettings = $.extend({
    'lockTypes' : []
  }, options);

  this.on('click', function(){

    var objMain = $(this);
    showBox();
      $.post( targetRoot+"dir-js.php", { target: 'default'}).done(function( data ) {
        dirJsList(data);
      });

      $(".dir-js-can-dir").on('click', function(){
        $(".dir-js-background").remove();
      });

      $(".dir-js-back-dir").on('click', function(){
        $.post( targetRoot+"dir-js.php", { command: 'back', target: $("#dirAtual").val()}).done(function( data ) {
          dirJsList(data);
        });
      });

      $(".dir-js-new-dir").on("click", function(){
        var nameDir = prompt("Nome do novo diretório?");
        if(nameDir !== null){
          $.post( targetRoot+"dir-js.php", { command: 'newDir', target: $("#dirAtual").val(), namedir: nameDir}).done(function( data ) {
            dirJsList(data);
          });
        }
      });

      $(".dir-js-ren-dir").on("click", function(){
        var nameDir = prompt("Novo nome do arquivo/pasta?");
        if(nameDir !== null){
          $.post( targetRoot+"dir-js.php", { command: 'renameDir', target: $("#dirAtual").val(), namedir: {newName: nameDir, oldName: $(".dir-js-item span input:checked").eq(0).parent().parent().attr("data-nomedir")}}).done(function( data ) {
            dirJsList(data);
            $(".dir-js-upl-dir").css("display", "inline-block");
            $(".dir-js-new-dir").css("display", "inline-block");
            $(".dir-js-del-dir").hide();
            $(".dir-js-sel-dir").hide();
            $(".dir-js-ren-dir").hide();
          });
        }
      });

      $(".dir-js-del-dir").on('click', function(){
        var elsDel = [];
        var numPos = 0;
        var cf = confirm("Deseja remover este(s) arquivo(s)?");
        if(cf == true){
          $(".dir-js-item").each(function(){
            var est = $(this).find("span").eq(0).find("input").eq(0);
            if($(est).prop("checked") == true){
              elsDel.push($(est).parent().parent().attr("data-nomedir"));
            }
            numPos++;
            if(numPos == $(".dir-js-item").length){
              $.post( targetRoot+"dir-js.php", { command: 'delDir', target: $("#dirAtual").val(), namedir: elsDel}).done(function( data ) {
                dirJsList(data);
                $(".dir-js-del-dir").hide();
                $(".dir-js-sel-dir").hide();
              });
              return;
            }
          });
        }
      });

      $(".dir-js-upl-dir").on("click", function(){
        $("#fileUpload").click();
      });

      $("#fileUpload").on("change", function(){
        var formData = new FormData();

        if(defaultSettings.lockTypes.length > 0){
          if(defaultSettings.lockTypes.indexOf($('#fileUpload')[0].files[0].type) == -1){
            alert("tipo bloqueado");
            return false;
          }
        }

        formData.append('arquivo', $('#fileUpload')[0].files[0]);
        formData.append('command', "upload");
        formData.append('target', $("#dirAtual").val());
        $(".dir-js-box").append("<div class='loadBar'></div>");
        $.ajax({
           url : targetRoot+'dir-js.php',
           xhr: function(){
             var xhr = new window.XMLHttpRequest();
             xhr.addEventListener("progress", function (evt) {
               if (evt.lengthComputable) {
                 var percentComplete = evt.loaded / evt.total;
                 prc = Math.round(percentComplete * 100) + "%";
                 $(".loadBar").css("width", prc);
                 $(".loadBar").text(prc);
               }
             }, false);
             return xhr;
           },
           type : 'POST',
           data : formData,
           processData: false,
           contentType: false,
           success : function(data) {
             setTimeout(function(){
               $(".loadBar").remove();
             }, 500);
               dirJsList(data);
           }
        });
      });

      $(".dir-js-sel-dir").on('click', function(){
        $(".dir-js-item").each(function(){


          var est = $(this).find("span").eq(0).find("input").eq(0);
          if($(est).prop("checked") == true){

            if($(this).hasClass("dir-js-isdir")){
              alert("Seleção precisa ser um arquivo");
              return;
            }

            var dirUplod = $("#dirAtual").val();
            var dirFiles = $("#dirAtual").attr("data-dirfiles");
            if(dirUplod == ""){
              dirUplod = dirFiles;
            }
            else{
              dirUplod = "/"+dirFiles.split("/")[1]+dirUplod + "/";
            }
            $(objMain).eq(0).val(dirUplod+$(est).parent().parent().attr("data-nomedir"));
            $(".dir-js-background").remove();
            return;
          }
        });
      });
  });
}
