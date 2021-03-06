
"use strict";

// Load models
const usersModel = require('../../model/User');

// Controller
function Profile(app, req, res) {
    
    const users = new UserModel(app);
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            success: true,
            params: params,
            user: false
        };
        
        // Load from database
        users.findBySlug(params[0], (err, row) => {
            data.user = row;
            
            // Send response
            app.render(res, data, 'admin/users/profile', 'admin/layout');
        });
    };
};

module.exports = Profile;