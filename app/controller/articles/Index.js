
// Load models
const ArticleModel = require('../../model/Article');

// Load View
const View = require('../../view/View');

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
            data.articles = rows;
            
            // Send response
            const view = new View(app, 'admin/articles/index', 'admin/layout');
            view.render(data, (html) => {
                app.sendHTML(res, html);
            });
        });
    };
};

module.exports = Index;