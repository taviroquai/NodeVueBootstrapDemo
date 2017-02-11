
// Load models
const ArticleModel = require('../../model/Article');

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
            app.sendHTML(res, 'admin/articles/display', data);
        });
    };
};

module.exports = Display;