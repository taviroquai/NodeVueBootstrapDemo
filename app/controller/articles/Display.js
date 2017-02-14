
// Load models
const ArticleModel = require('../../model/Article');

// Load View
const View = require('../../../src/View');

// Controller
function Display(app, req, res) {
    
    const articles = new ArticleModel(app);
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            success: true,
            params: params,
            article: false
        };
        
        // Load from database
        articles.findBySlug(params[0], (err, row) => {
            data.article = row;
            
            // Send response
            const view = new View(app, 'admin/articles/display');
            view.render(data, (html) => {
                app.sendHTML(res, html);
            });
        });
    };
};

module.exports = Display;