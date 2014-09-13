var express = require('express');
var compress = require('compression');
var methodOverride = require('method-override');
var path = require('path');
var app = express();

var p = /prod.*/
var match = p.test(app.settings.env) || p.test(process.argv[2]);
//TODO: pass port, i.e. `var port = process.argv[3] || 3000;
if (match){
	var mydir='digitalvapor';//change this to your deployment folder
	app.settings.env='production';
	var port = 3000;
}
else{
	var mydir = 'output';//default output for pelican
	//app.settings.env='development';//default
	var port = 9000;
}

function logErrors(err,req,res,next){
	log(err);
	console.error(err.stack);
	next(err);
}

function clientErrorHandler(err,req,res,next){
	if(req.xhr){
		res.send(500,{error:'something blew up!'});
	}
	else{
		next(err);
	}
}

function errorHandler(err,req,res,next){
	res.status(500);
	res.render('error',{error:err});
}

app.use(compress(
	//{threshold:512}
	));
app.use(express.static(path.join(__dirname,mydir)));
app.use(methodOverride());
app.use(logErrors);//TODO: need?
app.use(clientErrorHandler);//TODO: need?
app.use(errorHandler);//TODO: need?
app.get('*',function(req,res){
	console.log(__dirname+req.params[0]);
	res.sendfile(__dirname+req.params[0],function(err){
		res.sendfile(__dirname+req.params[0]+'.html',function(err){
			res.sendfile(__dirname+'/index.html');
		});
	});
});
app.use('/',function(req,res){
	res.sendfile(path.join(__dirname,mydir,'pages/404.html'));
});
app.listen(port);
console.log('Server listening on port %d in %s mode',port,app.settings.env);
