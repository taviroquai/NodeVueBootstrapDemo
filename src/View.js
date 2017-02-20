
"use strict";

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
    this.T.view = this;
}
;

// Load template
View.prototype.loadTemplate = function (template) {
    var filename = this.app.getConfig().templates.default_path
            + template
            + this.app.getConfig().templates.ext;
    return fs.readFileSync(filename, 'utf8');
};

// Add partial to view
View.prototype.add = function (name, path) {
    var content, self = this;
    content = self.loadTemplate(path);
    self.T.registerPartial(name, content);
};

// Render HTML
View.prototype.render = function (data, cb) {
    var content, html, self = this;
    if (self.layout) {
        content = self.loadTemplate(self.layout);
        self.T.registerPartial('layout', content);
    }
    content = self.loadTemplate(self.template);
    html = T.compile(content);
    if (typeof cb === 'function') cb(html(data));
    else return html(data);
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
    var partial = T.loadPartial(name) || options.fn;
    return partial(this, {data: options.hash});
});
T.registerHelper("partial", function (name, options) {
    T.registerPartial(name, options.fn);
});
T.registerHelper("include", function (path, options) {
    var content = T.view.loadTemplate(path),
        partial = T.compile(content);
    return partial(this, {data: options.hash});
});

module.exports = View;