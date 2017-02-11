
const url = require('url');
const fs = require('fs');
const T = require('handlebars');
var NodeSession = require('node-session');

function Mini(config) {
    
    self = this;
    this.db = null;
    
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
            
            //console.log(req.session.getId());
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
                params = self.getUrlParams(req, re);
                controller = require('./app/controller/' + config.routes[i].controller);
            }
        }
        
        // Not Found
        if (!found) {
            controller = require('./app/controller/NotFound');
        }
        
        // Dispatch
        instance = new controller(self, req, res);
        instance.action(params);
    };
    
    this.getUrlParams = (req, re) => {
        var result = re.exec(req.url);
        result.shift();
        delete result['index'];
        delete result['input'];
        return result;
    };
    
    // Send HTML
    this.sendHTML = (res, template, data) => {
        
        template = './resources/views/' + template + '.html';
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
};

module.exports = Mini;