var express = require('express');
var app = express();
var cloudinary = require('cloudinary');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var imgarray = [];

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.get('/', function (req, res) {
  res.render('Pallete.ejs');
});

app.get('/PalleteImages', function (req, res) {
  res.render('Images.ejs');
});

var server = app.listen(5011, function(){
  var port = server.address().port;
  console.log('Listening at http://127.0.0.1:%s', port);
});

app.post('/upload', function(req, res){

  cloudinary.uploader.upload(req.body.canvasimage, function(result)
  {PushImage(result)},
  { public_id: "AtomicArt/" + req.body.canvastitle, tags: ["AtomicArt"] });
});

app.get('/download', function(req, res){
  res.send(imgarray);
});


function SaveImages(result, res)
{
  var imgresources = result.resources;
  for (var i=0; i<imgresources.length; i++)
  {
    imgarray.push(imgresources[i].url);
  }
}

function PushImage(result)
{
  imgarray.unshift(result.url);
}

cloudinary.config({
  cloud_name: 'atomic-art',
  api_key: '662374422393778',
  api_secret: 't-Ewa6lAMionXx-PYWYCcIiAnbc'
});

cloudinary.api.resources_by_tag('AtomicArt', function(result){SaveImages(result)});
