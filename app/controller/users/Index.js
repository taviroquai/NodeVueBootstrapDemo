
// Load models
const UserModel = require('../../model/User');

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
            
            // Send response
            data.users = rows;
            app.loadPartial('content', 'admin/users/index', () => {
                app.sendHTML(res, 'admin/users/index_layout', data);
            });
        });
    };
};

module.exports = Index;