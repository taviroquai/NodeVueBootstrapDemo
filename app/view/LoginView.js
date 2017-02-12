
// Require View
const View = require('./View');

// Login View
function LoginView(app) {
    
    // Call inherit constructor
    View.call(this, app);
    
    // Override properties
    this.template = 'login';
    
}

LoginView.prototype = Object.create(View.prototype);
LoginView.prototype.constructor = LoginView;

module.exports = LoginView;