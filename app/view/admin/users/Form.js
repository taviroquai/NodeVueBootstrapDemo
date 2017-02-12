
// Require View
const View = require('../../View');

// Users Admin Index
function Form(app) {
    
    // Call inherit constructor
    View.call(this, app);
    
    // Override properties
    var self = this;
    self.template = 'admin/users/form';
    self.layout = 'admin/users/form_layout';
}

Form.prototype = Object.create(View.prototype);
Form.prototype.constructor = Form;

module.exports = Form;