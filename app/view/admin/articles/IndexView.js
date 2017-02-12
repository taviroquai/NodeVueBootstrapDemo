
// Require View
const View = require('../../View');

// Users Admin Index
function IndexView(app) {
    
    // Call inherit constructor
    View.call(this, app);
    
    // Override properties
    var self = this;
    self.template = 'admin/articles/index';
    self.layout = 'admin/articles/index_layout';
}

IndexView.prototype = Object.create(View.prototype);
IndexView.prototype.constructor = IndexView;

module.exports = IndexView;