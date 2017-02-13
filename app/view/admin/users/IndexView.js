
// Require View
const View = require('../../View');

// Users Admin Index
function IndexView(app) {
    
    // Call inherit constructor
    View.call(this, app);
    
    // Override properties
    this.template = 'admin/users/index';
    this.layout = 'admin/users/index_layout';
    
}

IndexView.prototype = Object.create(View.prototype);
IndexView.prototype.constructor = IndexView;

module.exports = IndexView;