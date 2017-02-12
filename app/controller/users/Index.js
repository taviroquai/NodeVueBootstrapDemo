// Load models
const UserModel = require('../../model/User');

// Load View
const IndexView = require('../../view/admin/users/IndexView');

// Controller
function Index(app, req, res) {
    
    const users = new UserModel(app);
    const view = new IndexView(app);
    
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
            view.render(data, (html) => {
                app.sendHTML(res, html);
            });
        });
    };
};

module.exports = Index;