var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname + '/client')));
app.use(express.static(path.join(__dirname + '/bower_components')));

app.listen(8000, function(){
    console.log("litening at port 8000")
})
