
// Load models
const UserModel = require('../../model/User');

// Load View
const View = require('../../../src/View');

// Controller
function Form(app, req, res) {
    
    const users = new UserModel(app);
    
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
            const view = new View(app, 'admin/users/form', 'admin/layout');
            view.render(data, (html) => {
                app.sendHTML(res, html);
            });
        });
    };
};

module.exports = Form;