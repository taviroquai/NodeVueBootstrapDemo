
// Require View
const View = require('../../View');

// Users Admin Index
function Index(app) {
    
    // Call inherit constructor
    View.call(this, app);
    
    // Override properties
    var self = this;
    this.template = 'admin/index';
}

Index.prototype = Object.create(View.prototype);
Index.prototype.constructor = Index;

module.exports = Index;