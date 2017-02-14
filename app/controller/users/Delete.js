
"use strict";

// Load models
const UserModel = require('../../model/User');

// Controller
function Delete(app, req, res) {
    
    const users = new UserModel(app);
    
    // HTTP action
    this.action = (params) => {
        
        var id = params[0] === '' ? 0 : params[0];
        
        // Response data
        const data = {
            success: true
        };
                
        // Load User if 
        users.findOrNew(id, (err, record) => {

            // Update User
            users.delete(record, (err) => {

                // Send response
                if (err) {
                    data.success = false;
                    data.error = 'Could not delete!';
                } else {
                    data.record = record;
                }
                app.sendJSON(res, data);
            });
        });

    };
};

module.exports = Delete;