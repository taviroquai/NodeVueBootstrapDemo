
"use strict";

// Load models
const ArticleModel = require('../../model/Article');

// Controller
function Form(app, req, res) {
    
    const articles = new ArticleModel(app);
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            success: true,
            article: false
        };
        
        // Load from database
        articles.findOrNew(params[0], (err, record) => {
            data.article = record;
            
            // Send response
            app.render(res, data, 'admin/articles/form', 'admin/layout');
            
        });
    };
};

module.exports = Form;