
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
            articles: []
        };
        
        articles.findAll((err, rows) => {
            
            // Send response
            data.articles = rows;
            app.loadPartial('content', 'admin/articles/index', () => {
                app.sendHTML(res, 'admin/articles/index_layout', data);
            });
        });
    };
};

module.exports = Index;