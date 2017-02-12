
// Require View
const View = require('../View');

// Index View
function IndexView(app) {
    
    // Call inherit constructor
    View.call(this, app);
    
    // Override properties
    this.template = 'admin/index';
    
}

IndexView.prototype = Object.create(View.prototype);
IndexView.prototype.constructor = IndexView;

module.exports = IndexView;