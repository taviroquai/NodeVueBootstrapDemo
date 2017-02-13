
// Load models
const ArticleModel = require('../../model/Article');

// Load View
const View = require('../../view/View');

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
            const view = new View(app, 'admin/articles/form', 'admin/layout');
            view.render(data, (html) => {
                app.sendHTML(res, html);
            });
        });
    };
};

module.exports = Form;