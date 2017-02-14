
// Load View
const View = require('../../../src/View');

// Controller
function Index(app, req, res) {
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            title: 'Admin'
        };
        
        // Send response
        const view = new View(app, 'admin/index');
        view.render(data, (html) => {
            app.sendHTML(res, html);
        });
    };
};

module.exports = Index;