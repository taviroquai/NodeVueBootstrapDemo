
// Load Models
const ArticleModel = require('../../model/Article');

// Controller
function Index(app, req, res) {
    
    const articles = new ArticleModel(app);
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            success: true,
            title: 'Admin'
        };
        
        // Send response
        app.sendHTML(res, 'admin/index', data);
    };
};

module.exports = Index;