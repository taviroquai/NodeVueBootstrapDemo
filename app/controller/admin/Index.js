
"use strict";

// Controller
function Index(app, req, res) {
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            title: 'Admin',
            url: req.url,
            logged: req.session.get('logged')
        };
        
        // Send response
        app.render(res, data, 'admin/index', 'admin/layout');
    };
};

module.exports = Index;