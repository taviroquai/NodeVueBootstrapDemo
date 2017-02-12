
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
            params: params,
            article: false
        };
        
        // Load from database
        articles.findOrNew(params[0], (err, record) => {
            data.article = record;
            
            // Send response
            app.loadPartial('content', 'admin/articles/form', () => {
                app.sendHTML(res, 'admin/articles/form_layout', data);
            });
        });
    };
};

module.exports = Form;