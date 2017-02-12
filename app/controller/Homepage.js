
// Load View
const HomepageView = require('../view/HomepageView');

// Controller
function Homepage(app, req, res) {
    
    const view = new HomepageView(app);
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            success: true,
            title: 'Hello World',
            logged: req.session.get('logged')
        };
        
        // Send response
        view.render(data, (html) => {
            app.sendHTML(res, html);
        });
    };
};

module.exports = Homepage;