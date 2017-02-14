
"use strict";

// Controller
function Assets(app, req, res) {
    
    // HTTP action
    this.action = (params) => {
        
        app.sendFile(res, './public/assets/' + params[0]);
    };
};

module.exports = Assets;