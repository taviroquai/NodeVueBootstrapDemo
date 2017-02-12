
// Load models
const ArticleModel = require('../../model/Article');

// Load View
const IndexView = require('../../view/admin/articles/IndexView');

// Controller
function Index(app, req, res) {
    
    const articles = new ArticleModel(app);
    const view = new IndexView(app);
    
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
            view.render(data, (html) => {
                app.sendHTML(res, html);
            });
        });
    };
};

module.exports = Index;