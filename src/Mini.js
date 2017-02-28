
"use strict";

// Load dependencies
const bcrypt = require('bcrypt');
const url = require('url');
const fs = require('fs');
const http = require('http');
const NodeSession = require('node-session');
const View = require('./View');

/**
 * Mini framework
 * 
 * @param {array} config
 * @returns {nm$_Mini.Mini}
 */
function Mini(config) {
    
    var self = this,
        
        // Track all sessions
        sessions = {},
                
        // Init session handler
        session = new NodeSession(config.sessions);
        
    // Init database
    this.db = null;
    
    // Init database
    if (config.db.type === 'sqlite3') {
        var sqlite3 = require('sqlite3').verbose();
        this.db = new sqlite3.Database(config.db.filename);
    }
    
    // Start listen to HTTP
    this.listenHTTP = function () {
        const server = http.createServer(self.onRequest);
        server.on('clientError', self.onClientError);
        server.listen(config.http.port, (a) => {
            console.log('Listening http://localhost:' + config.http.port);
        });
    };
    
    // Display HTTP error
    this.onClientError = (err, socket) => {
        err ? console.log(err) : false;
        socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    };
    
    // On HTTP request
    this.onRequest = (req, res) => {
        
        // Send static file
        var params = [],
            re = new RegExp("^\/assets\/(.+)");
        if (re.test(req.url)) {
            //console.log(req.url);
            params = self.getUrlParams(req, re);
            self.sendFile(res, self.getConfig().files.assets_path + params[0]);
        } else {

            // Start session
            session.startSession(req, res, () => {

                self.initSession(req);
                self.dispatch(req, res);
            });
        }
    };
    
    // Dispatch request
    this.dispatch = (req, res) => {
        
        // Private vars
        var re, params = [], controller, instance, found = false;
        
        // Find controller
        for (var i = 0, len = config.routes.length; i < len; i++) {
            
            re = new RegExp(config.routes[i].path);
            if (!found && re.test(req.url)) {
                found = true;
                
                // Redirect guest
                if (!config.routes[i].guest && !req.session.get('logged')) {
                    
                    // Save redirect on session
                    req.session.set('login_redirect', req.url);
                    
                    // Redirect to login route
                    res.writeHead(302, {
                        Location: config.sessions.login_route
                    });
                    res.end();
                    return;
                }
                
                // Get controller
                params = self.getUrlParams(req, re);
                console.log(config.routes[i].controller);
                controller = require('../app/controller/' + config.routes[i].controller);
            }
        }
        
        // Not Found
        if (!found) {
            controller = require('../app/controller/' + config.http.not_found_controller);
        }
        
        // Dispatch
        instance = new controller(self, req, res);
        instance.action(params);
    };
    
    // Get url params
    this.getUrlParams = (req, re) => {
        var result = re.exec(req.url);
        result.shift();
        delete result['index'];
        delete result['input'];
        return result;
    };
    
    // Make view
    this.getView = (template, layout) => {
        return new View(this, template, layout);
    };
    
    // Render HTML
    this.render = (res, data, template, layout) => {
        var self = this;
        const view = self.getView(template, layout);
        view.render(data, (html) => {
            self.sendHTML(res, html);
        });
    };
    
    // Send HTML
    this.sendHTML = (res, html) => {
        
        // Response from template
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(html);
    };
    
    // Send JSON
    this.sendJSON = (res, data) => {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(data));
    };
    
    // Send static file
    this.sendFile = (res, filename) => {
        if (fs.existsSync(filename)) {
            res.writeHead(200, {'Cache-Control': 'max-age=86400'});
            fs.createReadStream(filename).pipe(res);
        } else {
            res.end();
        }
    };
    
    // Encrypt string (app wide)
    this.encrypt = (string, auto, cb) => {
        if (auto) {
            bcrypt.genSalt(config.encrypt.salt_rounds, (err, salt) => {
                err ? console.log(err) : false;
                bcrypt.hash(string, salt, cb);
            });
        } else {
            bcrypt.hash(string, config.encrypt.salt, cb);
        }
    };
    
    // Init request session
    this.initSession = (req) => {
        if (typeof sessions["_" + req.session.getId()] === 'undefined') {
            sessions["_" + req.session.getId()] = {
                logged: false
            };
            req.session.set('logged', false);
            
            // Set default login redirect
            typeof req.session.get('login_redirect') === 'undefined' ? 
                req.session.set('login_redirect', config.sessions.login_redirect)
                : false;
        }
    };
    
    // Set session as logged mail
    this.login = (req, email) => {
        req.session.set('logged', email);
        sessions["_" + req.session.getId()].logged = req.session.get('logged');
    };
    
    // Set session as logged out
    this.logout = (req) => {
        req.session.set('logged', false);
        delete sessions["_" + req.session.getId()];
    };
    
    // Get logged key
    this.getLogged = (req) => {
        return req.session.get('logged');
    };
    
    // Get config
    this.getConfig = () => {
        return config;
    };
    
    // Validate base64 image
    this.validateBase64Image = (base64str) => {
        var ext = false;
        if (!base64str) return ext;
        if (base64str.indexOf('image/png') !== -1) {
            ext = 'png';
        } else if (base64str.indexOf('image/jpeg') !== -1) {
            ext = 'jpeg';
        } else if (base64str.indexOf('image/jpg') !== -1) {
            ext = 'jpg';
        } else if (base64str.indexOf('image/gif') !== -1) {
            ext = 'gif';
        }
        return ext;
    };
};

module.exports = Mini;