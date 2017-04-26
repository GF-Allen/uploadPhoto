/**
 * Created by Allen on 2017/4/26.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');

var cacheFolder = 'public/upload/';

router.get('/',function (req,res,next) {
    res.render('upload');
});

router.post("/",function (req,res,next) {
    var form = formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "public/upload/";
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.parse(req, function(err, fields, files) {
        var image = files.image;
        rename(res,image,fields.image);
    });

});

function rename(res,image,fileName) {
    if (image.name){
        var newPath = cacheFolder +fileName +".png";
        fs.rename(image.path, newPath, function (err) {
            res.render('index', {dir: newPath});
        });
    }else {
        fs.unlink(image.path);
        res.render('upload',{error:'请选择上传的图片'});
    }

}

module.exports = router;
