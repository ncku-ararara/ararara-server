/* library */
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
/* core */
const { Debugger } = require('./server/debug');
const { IntroService } = require('./server/intro');
const { DB } = require('./server/db');
const { UserService } = require('./server/account');
const { AdfService } = require('./server/adf');
const { Lite } = require('./server/lite');
const { IO } = require('./server/io');
const { IOService } = require('./server/io_service');
/* define app(2 for secure & download) */
const app = express(),app_s = express();
app.set('view engine', 'ejs');
app_s.set('view engine','ejs');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app_s.use(bodyParser.urlencoded({
	extended: true
}));
app_s.use(bodyParser.json());

/* redirect & static link */
// for http
app.set('views',path.join(__dirname,'client/views'));
app.use(express.static(path.join(__dirname,'client/elements')));
app.use(express.static(path.join(__dirname,'client/images')));
app.use(express.static(path.join(__dirname,'client/css')));
app.use(express.static(path.join(__dirname,'client/js')));
app.use(express.static(path.join(__dirname,'client/lib')));
// for https
app_s.set('views',path.join(__dirname,'client/views'));
app_s.use(express.static(path.join(__dirname,'client/elements')));
app_s.use(express.static(path.join(__dirname,'client/images')));
app_s.use(express.static(path.join(__dirname,'client/css')));
app_s.use(express.static(path.join(__dirname,'client/js')));
app_s.use(express.static(path.join(__dirname,'client/lib')));

/* ssl usage */
var options = {
    key: fs.readFileSync(path.join('/','var','www','sslforfree','private.key')),
    cert: fs.readFileSync(path.join('/','var','www','sslforfree','certificate.crt'))
}

/* Initialize all module */
/* Need to separate "Secure service" & "Download Service" */
const secure_server = https.createServer(options,app_s);
const download_server = http.createServer(app);

/* Both (Secure & Download), often for testbed or introduction */
Debugger.init(app);
Debugger.init(app_s);
IntroService.init(app);
IntroService.init(app_s);
UserService.init(app);
UserService.init(app_s);
AdfService.init(app);
AdfService.init(app_s);
Lite.init(app);
Lite.init(app_s);

/* Special for https */
IO.init(secure_server);
IOService.init(app_s);

/* 2 Server create! */
secure_server.listen(process.env.npm_package_config_secure_port, function() {
    console.log("Secure Server listening on port " + process.env.npm_package_config_secure_port);
});

download_server.listen(process.env.npm_package_config_download_port, function() {
    console.log("Download Server listening on port " + process.env.npm_package_config_download_port);
});