
// Require fs
const fs = require("fs");

// Require template engine
const T = require('handlebars');

// Admin Layout
function View(app) {
    
    this.app = app;
    this.layout = false;
    this.template = '';
    this.data = {};
};

// Load template
View.prototype.loadTemplate = function(template, cb) {
    var filename = this.app.getConfig().templates.default_path 
            + template 
            + this.app.getConfig().templates.ext ;
    fs.readFile(filename, 'utf8', (err, content) => {

        if (err) return '';
        cb(err, content);
    });
};

// Load HTML partial
View.prototype.loadPartial = function(name, template, cb) {
    this.loadTemplate(template, (err, content) => {
        T.registerPartial(name, content);
        cb(err);
    });
};

// Render HTML
View.prototype.render = function(data, cb) {
    var html, self = this;
    
    if (self.layout) {
        self.loadPartial('content', self.template, (err) => {
            self.loadTemplate(self.layout, (err, content) => {
                html = T.compile(content);
                cb(html(data));
            });
        });
    } else {
        self.loadTemplate(self.template, (err, content) => {
            html = T.compile(content);
            cb(html(data));
        });
    }
};

module.exports = View;