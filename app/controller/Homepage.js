
// Load View
const View = require('../../src/View');

// Controller
function Homepage(app, req, res) {
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            success: true,
            title: 'Hello World',
            logged: req.session.get('logged')
        };
        
        // Send response
        const view = new View(app, 'homepage');
        view.render(data, (html) => {
            app.sendHTML(res, html);
        });
    };
};

module.exports = Homepage;