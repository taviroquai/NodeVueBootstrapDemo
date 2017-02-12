
// Load View
const IndexView = require('../../view/admin/IndexView');

// Controller
function Index(app, req, res) {
    
    const view = new IndexView(app);
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            title: 'Admin'
        };
        
        // Send response
        view.render(data, (html) => {
            app.sendHTML(res, html);
        });
    };
};

module.exports = Index;