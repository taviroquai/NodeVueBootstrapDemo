
// Require View
const View = require('../../View');

// Users Admin Form
function FormView(app) {
    
    // Call inherit constructor
    View.call(this, app);
    
    // Override properties
    var self = this;
    self.template = 'admin/articles/form';
    self.layout = 'admin/articles/form_layout';
}

FormView.prototype = Object.create(View.prototype);
FormView.prototype.constructor = FormView;

module.exports = FormView;