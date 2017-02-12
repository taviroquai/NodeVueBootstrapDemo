
// Load models
const UserModel = require('../../model/User');

// Controller
function Form(app, req, res) {
    
    const users = new UserModel(app);
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            success: true,
            params: params,
            user: {}
        };
        
        // Load from database
        users.findOrNew(params[0], (err, record) => {
            data.user = record;
            
            // Send response
            app.loadPartial('content', 'admin/users/form', () => {
                app.sendHTML(res, 'admin/users/form_layout', data);
            });
        });
    };
};

module.exports = Form;