
"use strict";

// Load models
const UserModel = require('../../model/User');

// Controller
function Index(app, req, res) {
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            title: 'Admin',
            url: req.url,
            logged: false
        };
        
        // Load logged user
        var model = new UserModel(app);
        model.findBy('email', req.session.get('logged'), (err, rows) => {
            data.logged = rows[0];
            
            // Send response
            app.render(res, data, 'admin/index', 'admin/layout');
        });
    };
};

module.exports = Index;