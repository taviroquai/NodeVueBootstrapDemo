
"use strict";

// Not Found controller
function NotFound(app, req, res) {
    
    this.action = (params) => {
        
        const data = {
            success: true
        };
        
        // Send response
        app.render(res, data, 'notfound');
        
    };
}

module.exports = NotFound;