
"use strict";

// Load form parser
const formidable = require('formidable');

// Load models
const UserModel = require('../../model/User');

// Controller
function Login(app, req, res) {
    
    const users = new UserModel(app);
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            success: false,
            redirect: req.session.get('login_redirect')
        };
        console.log('get redirect: ' + data.redirect);
        if (req.method == 'POST') {
            
            const input = new formidable.IncomingForm();

            input.parse(req, (err, fields, files) => {
                
                // Encrypt submitted password
                app.encrypt(fields.password, false, (err, hash) => {
                
                    // Find User
                    users.findByLogin(fields.email, hash, (err, rows) => {

                        // Send login result
                        if (err) {
                            data.error = 'Wrong email or password';
                        } else if (rows.length === 0) {
                            data.error = 'Wrong email or password';
                        } else {
                            data.success = true;
                            app.login(req, fields.email);
                        }
                        app.sendJSON(res, data);

                    }); 
                });
            });
            
        } else {
        
            // Send response
            app.render(res, data, 'auth/login');
        }
    };
};

module.exports = Login;