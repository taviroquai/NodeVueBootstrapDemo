
"use strict";

// Controller
function Assets(app, req, res) {
    
    // HTTP action
    this.action = (params) => {
        
        // Send file
        app.sendFile(res, app.getConfig().files.assets_path + params[0]);
    };
};

module.exports = Assets;