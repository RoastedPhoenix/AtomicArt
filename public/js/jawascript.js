/**
* Created by josh on 5/5/15.
*/
var canvas = document.getElementById('canvas');
var brush = canvas.getContext('2d');
var xpos1, ypos1, xpos2, ypos2;
brush.fillStyle = 'white';
brush.fillRect(0, 0, 800, 800);
var brushSize = 1;
var brushEnable = false;
brush.strokeStyle = 'black';
var BrushColor;
var CanvasTitle = "Title"
var ImageDownload;
var CanvasImage;
var imgarray, imgfilename, imgSplit, imgChar;
var imgnums = "";
var imgnum = 0;
var imgnames = [];
var imgnonum = [];
$('#BrushSize').val(1);
$('#NewTitle').val("");
var before, after;

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top

  };
}

function ChangeTitle()
{
  CanvasTitle = $('#NewTitle').val();
  NameTest();
}


function SetBrushSize()
{
  brushSize = parseInt($('#BrushSize').val());
  if(brushSize > 250)
  {
    brushSize = 250;
    $('#BrushSize').val(250);
  }
  else if(isNaN(brushSize))
  {
    brushSize = 1;
  }
}

function DownloadImage()
{
  CanvasImage = canvas.toDataURL("image.png");
  ImageDownload = $("<a>")
  .attr("href", CanvasImage)
  .attr("download", CanvasTitle + ".png")
  .appendTo("body");
  ImageDownload[0].click();
  ImageDownload.remove();
}

function UploadImage()
{
  CanvasImage = (document.getElementById("canvas").toDataURL('image/png'));
  PostNode();
}

function PostNode()
{
  $.ajax({
    url: "http://127.0.0.1:5011/upload",
    type: "POST",
    data: {"canvasimage" : CanvasImage, "canvastitle" : CanvasTitle}
  });
}

function NameTest()
{
  imgnonum = [];
  imgnums = "";
  imgnames.forEach(function(img){
    if(CanvasTitle == img)
    {
      imgSplit = img.split("");
      imgChar = imgSplit[img.length - 1];
      if(isNaN(imgChar))
      {
        CanvasTitle = img + 2;
      }
      else
      {
        imgSplit.forEach(function(imglett){
          if(isNaN(imglett))
          {
            imgnonum.push(imglett);
          }
          else
          {
            imgnums = imgnums + imglett;
          }
        });
        imgnonum = imgnonum.join("");
        imgnums = parseInt(imgnums) + 1;
        CanvasTitle = imgnonum + imgnums;
      }
    }
  });
  imgnames.forEach(function(img){
    if(CanvasTitle == img)
    {
      NameTest();
    }
  });
}

canvas.addEventListener('click', function() {
  if (brushEnable)
  {
    brushEnable = false;
    var mousePos = getMousePos(canvas);
    xpos1 = mousePos.x;
    ypos1 = mousePos.y;
  }
  else
  {
    brushEnable = true;
  }
});

canvas.addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  xpos2 = mousePos.x;
  ypos2 = mousePos.y;
  if(brushEnable)
  {
    brush.lineJoin = 'round';
    brush.lineWidth = brushSize;
    brush.beginPath();
    brush.moveTo(xpos1, ypos1);
    brush.lineTo(xpos2, ypos2);
    brush.closePath();
    brush.stroke();
  }
  xpos1 = xpos2;
  ypos1 = ypos2;


}, false);


$("#BrushSize").keydown(function(pressedKey) {
  if(pressedKey.keyCode >= 48 && pressedKey.keyCode <= 57);
  else if(pressedKey.keyCode == 8 || pressedKey.keyCode == 190);
  else if(pressedKey.keyCode >= 37 && pressedKey.keyCode <= 40);
  else
  {
    pressedKey.preventDefault();
  }
});

$("#ColorSelector").spectrum({
  showInput: true,
  preferredFormat: "name",
  showPalette: true,
  change: function(color)
  {
    BrushColor = color.toHexString();
    brush.strokeStyle = BrushColor;
    ButtonColor = BrushColor;
  }

});
$.get('/download', function(res) {
  imgarray = res;
  imgarray.forEach(function(img){
    imgfilename = imgarray[imgnum].split("AtomicArt/");
    imgnames.push(imgfilename[1].split(".png")[0]);
    imgnum += 1;
  });
});
$.cloudinary.config({ cloud_name: 'atomic-art', api_key: '662374422393778'})
