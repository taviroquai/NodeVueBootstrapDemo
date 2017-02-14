
"use strict";

// Load models
const ArticleModel = require('../../model/Article');

// Controller
function Delete(app, req, res) {
    
    const articles = new ArticleModel(app);
    
    // HTTP action
    this.action = (params) => {
        
        var id = params[0] === '' ? 0 : params[0];
        
        // Response data
        const data = {
            success: true
        };
                
        // Load article if 
        articles.findOrNew(id, (err, record) => {

            // Update article
            articles.delete(record, (err) => {

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