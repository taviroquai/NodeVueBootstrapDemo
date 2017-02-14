
"use strict";

// Controller
function Index(app, req, res) {
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            title: 'Admin'
        };
        
        // Send response
        app.render(res, data, 'admin/index', 'admin/layout');
    };
};

module.exports = Index;