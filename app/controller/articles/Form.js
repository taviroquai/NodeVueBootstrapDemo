
// Load models
const ArticleModel = require('../../model/Article');

// Load View
const FormView = require('../../view/admin/articles/FormView');

// Controller
function Form(app, req, res) {
    
    const articles = new ArticleModel(app);
    const view = new FormView(app);
    
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
            view.render(data, (html) => {
                app.sendHTML(res, html);
            });
        });
    };
};

module.exports = Form;