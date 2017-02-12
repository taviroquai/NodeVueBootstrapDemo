
// Load models
const UserModel = require('../../model/User');

// Load View
const FormView = require('../../view/admin/users/FormView');

// Controller
function Form(app, req, res) {
    
    const users = new UserModel(app);
    const view = new FormView(app);
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            success: true,
            user: {}
        };
        
        // Load from database
        users.findOrNew(params[0], (err, record) => {
            data.user = record;
            
            // Send response
            view.render(data, (html) => {
                app.sendHTML(res, html);
            });
        });
    };
};

module.exports = Form;