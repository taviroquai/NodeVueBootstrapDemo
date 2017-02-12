
const bcrypt = require('bcrypt');
const url = require('url');
const fs = require('fs');
const T = require('handlebars');
var NodeSession = require('node-session');

/**
 * Mini framework
 * 
 * @param {array} config
 * @returns {nm$_Mini.Mini}
 */
function Mini(config) {
    
    self = this;
    this.db = null;
    
    // Track all sessions
    var sessions = {};
    
    // Init session
    session = new NodeSession(config.sessions);
    
    // Init database
    if (config.db.type === 'sqlite3') {
        var sqlite3 = require('sqlite3').verbose();
        this.db = new sqlite3.Database(config.db.filename);
    }
    
    // On HTTP request
    this.onRequest = (req, res) => {

        // Start session
        session.startSession(req, res, () => {
            
            self.initSession(req);
            self.dispatch(req, res);
        });
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
                controller = require('./app/controller/' + config.routes[i].controller);
            }
        }
        
        // Not Found
        if (!found) {
            controller = require('./app/controller/' + config.http.not_found_controller);
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
    
    // Send HTML
    this.sendHTML = (res, template, data) => {
        
        template = config.templates.default_path 
                + template 
                + config.templates.ext ;
        fs.readFile(template, 'utf8', (err, content) => {
            
            // Send 404
            if (err) {
                res.writeHead(404, {"Content-Type": "text/html"});
                return console.log(err);
            }

            // Response from template
            res.writeHead(200, {"Content-Type": "text/html"});
            const html = T.compile(content);
            res.end(html(data));
        });
    };
    
    // Send JSON
    this.sendJSON = (res, data) => {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(data));
    };
    
    // Send static file
    this.sendFile = (res, filename) => {
        fs.createReadStream(filename).pipe(res);
    };
    
    // Encrypt string (app wide)
    this.encrypt = (string, auto, cb) => {
        if (auto) {
            bcrypt.genSalt(config.encrypt.salt_rounds, (err, salt) => {
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
};

module.exports = Mini;