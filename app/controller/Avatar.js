
"use strict";

// Controller
function Avatar(app, req, res) {
    
    // HTTP action
    this.action = (params) => {
        
        app.sendFile(res, './storage/users/' + params[0] + '/' + params[1]);
    };
};

module.exports = Avatar;