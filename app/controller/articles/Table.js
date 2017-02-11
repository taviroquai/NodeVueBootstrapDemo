
// Load models
const ArticleModel = require('../../model/Article');

// Controller
function Table(app, req, res) {
    
    const articles = new ArticleModel(app);
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            success: true,
            params: params,
            items: []
        };
        
        // Load from database
        articles.findAll((err, rows) => {
            data.items = rows;
            
            // Send response
            app.sendJSON(res, data);
        });
    };
};

module.exports = Table;