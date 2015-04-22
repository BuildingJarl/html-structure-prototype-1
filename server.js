var common = require('koa-common');
var router = require('koa-router');
var koa = require('koa');
var app = koa();

// enable logger middleware
app.use(common.logger('dev'));

//router
app.use(router(app));

// enable static middleware
app.use(common.static(__dirname + '/public'))



// listen
var port = process.env.PORT || 4000;
var server = app.listen(port, function () {
    console.log('Listening on port %d', server.address().port);
});