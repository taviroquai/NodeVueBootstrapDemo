
// Load models
const UserModel = require('../../model/User');

// Controller
function Logout(app, req, res) {
    
    const users = new UserModel(app);
    
    // HTTP action
    this.action = (params) => {

        // Find User
        users.findBy('email', app.getLogged(req), (err, rows) => {

            // App logout
            app.logout(req);
            
            // Send redirect
            res.writeHead(301, { Location: '/' });
            res.end();
            
        });
    };
};

module.exports = Logout;