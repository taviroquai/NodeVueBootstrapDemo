
"use strict";

// Load models
const ArticleModel = require('../../model/Article');

// Controller
function Index(app, req, res) {
    
    const articles = new ArticleModel(app);
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            success: true,
            url: req.url,
            logged: req.session.get('logged'),
            articles: []
        };
        
        articles.findAll((err, rows) => {
            data.articles = rows;
            
            // Send response
            app.render(res, data, 'admin/articles/index', 'admin/layout');
            
        });
    };
};

module.exports = Index;