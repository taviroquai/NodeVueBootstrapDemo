
"use strict";

// Load models
const UserModel = require('../../model/User');

// Controller
function Form(app, req, res) {
    
    const users = new UserModel(app);
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            success: true,
            logged: req.session.get('logged'),
            user: {}
        };
        
        // Load from database
        users.findOrNew(params[0], (err, record) => {
            data.user = record;
            
            // Send response
            app.render(res, data, 'admin/users/form', 'admin/layout');
            
        });
    };
};

module.exports = Form;