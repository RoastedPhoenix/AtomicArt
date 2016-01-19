var imgarray;
var imgnum = 0
var imgfilename;
var imgname;
$.get('/download', function(res) {
  imgarray = res;
  imgarray.forEach(function(img){
    imgfilename = imgarray[imgnum].split("AtomicArt/");
    imgname = imgfilename[1].split(".png")[0]
    $("#ImgContainer").append('<div class="ui button" onclick=window.open("'+img+'","MsgWindow","width=800,height=800")><img src=' + img + ' height="80" width="80"><br>'+imgname+'</div>')
    imgnum += 1;
  });
});
