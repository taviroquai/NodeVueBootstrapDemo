
// Load Models
const ArticleModel = require('../model/Article');

// Controller
function Homepage(app, req, res) {
    
    const articles = new ArticleModel(app);
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            success: true,
            title: 'Hello World',
            articles: []
        };
        
        // Load from database
        articles.findAll((err, rows) => {
            data.articles = rows;
            
            // Send response
            app.sendHTML(res, 'index', data);
        });
    };
};

module.exports = Homepage;