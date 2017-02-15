
"use strict";

// Load models
const UserModel = require('../../model/User');

// Controller
function Index(app, req, res) {
    
    const users = new UserModel(app);
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            success: true,
            url: req.url,
            logged: req.session.get('logged'),
            users: []
        };
        
        users.findAll((err, rows) => {
            data.users = rows;
            
            // Send response
            app.render(res, data, 'admin/users/index', 'admin/layout');
            
        });
    };
};

module.exports = Index;