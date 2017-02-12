
// Require View
const View = require('./View');

// Homepage View
function HomepageView(app) {
    
    // Call inherit constructor
    View.call(this, app);
    
    // Override properties
    this.template = 'homepage';
    
}

HomepageView.prototype = Object.create(View.prototype);
HomepageView.prototype.constructor = HomepageView;

module.exports = HomepageView;