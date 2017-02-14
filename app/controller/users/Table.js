
"use strict";

// Load models
const UserModel = require('../../model/User');

// Controller
function Table(app, req, res) {
    
    const users = new UserModel(app);
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            success: true,
            params: params,
            items: []
        };
        
        // Load from database
        users.findAll((err, rows) => {
            data.items = rows;
            
            // Send response
            app.sendJSON(res, data);
        });
    };
};

module.exports = Table;