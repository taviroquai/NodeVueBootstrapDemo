
// Load dependencies
const formidable = require('formidable');
        
// Load models
const UserModel = require('../../model/User');

// Controller
function Save(app, req, res) {
    
    const users = new UserModel(app);
    
    // HTTP action
    this.action = (params) => {
        
        var input, id;
        
        // Response data
        const data = {
            success: true
        };
        
        if (req.method == 'POST') {
            
            input = new formidable.IncomingForm();

            input.parse(req, (err, fields, files) => {
                
                // Validate input
                if (fields.password !== '' && fields.password_confirm !== fields.password) {
                    data.success = false;
                    data.error = 'Password was not confirmed';
                    app.sendJSON(res, data);
                    return;
                }
                
                // Load User if 
                id = fields[users.pkey] === '' ? 0 : fields[users.pkey];
                users.findOrNew(id, (err, record) => {

                    // Update User
                    users.save(record, fields, (err, record) => {
                        
                        if (fields.password !== '' && fields.password_confirm)

                        // Send response
                        if (err) {
                            data.success = false;
                            data.error = 'Could not save!';
                        } else {
                            data.record = record;
                        }
                        app.sendJSON(res, data);
                    });
                    
                    // Change password
                    if (fields.password !== '') {
                        app.encrypt(fields.password, false, (err, hash) => {
                            users.updatePassword(record, hash);
                        });
                    }
                });
            });
        } else {
            
            // Send response
            data.success = false;
            app.sendJSON(res, data);
        }
    };
};

module.exports = Save;