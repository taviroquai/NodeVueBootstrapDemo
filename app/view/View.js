
// Require fs
const fs = require("fs");

// Require template engine
const T = require('handlebars');

// Admin Layout
function View(app, template, layout) {
    
    this.app = app;
    this.layout = layout;
    this.template = template;
    this.T = T;
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

// Render HTML
View.prototype.render = function(data, cb) {
    var html, self = this;
    if (self.layout) {
        self.loadTemplate(self.layout, (err, content) => {
            self.T.registerPartial('layout', content);
            self.loadTemplate(self.template, (err, content) => {
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

// Create pseudo-inheritance in handlbars
// Thanks https://gist.github.com/Wilfred/715ae4e22642cfff1dbd
T.loadPartial = function (name) {
  var partial = T.partials[name];
  if (typeof partial === "string") {
    partial = T.compile(partial);
    T.partials[name] = partial;
  }
  return partial;
};
T.registerHelper("block", function (name, options) {
    /* Look for partial by name. */
    var partial = T.loadPartial(name) || options.fn;
    return partial(this, { data : options.hash });
});
T.registerHelper("partial", function (name, options) {
    T.registerPartial(name, options.fn);
});

module.exports = View;