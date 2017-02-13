// Load models
const UserModel = require('../../model/User');

// Load View
const View = require('../../view/View');

// Controller
function Index(app, req, res) {
    
    const users = new UserModel(app);
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            success: true,
            users: []
        };
        
        users.findAll((err, rows) => {
            data.users = rows;
            
            // Send response
            const view = new View(app, 'admin/users/index', 'admin/layout');
            view.render(data, (html) => {
                app.sendHTML(res, html);
            });
        });
    };
};

module.exports = Index;