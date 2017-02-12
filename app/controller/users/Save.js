
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
                
                // Validate image
                if (fields.image_upload !== '' && !users.validateBase64Image(fields.image_upload)) {
                    data.success = false;
                    data.error = 'Invalid image';
                    app.sendJSON(res, data);
                    return;
                }
                
                // Load User if 
                id = fields[users.pkey] === '' ? 0 : fields[users.pkey];
                users.findOrNew(id, (err, record) => {

                    // Update User
                    users.save(record, fields, (err, record) => {
                        
                        // Change password
                        if (fields.password !== '') {
                            app.encrypt(fields.password, false, (err, hash) => {
                                users.updatePassword(record, hash);
                            });
                        }

                        // Upload image
                        if (fields.image_upload !== '') {
                            var id = record[users.pkey];
                            var name = 'avatar';
                            var target = "./storage/users/" + id + '/';
                            users.uploadImage(fields.image_upload, target, name, (err, ext) => {
                                users.updateImage(record, name + "." + ext);
                            });
                        }
                        
                        // Remove image
                        if (fields.image === '') {
                            var id = record[users.pkey];
                            var filename = "./storage/users/" + id + '/' + record.image;
                            users.removeImage(filename, (err, ext) => {
                                users.updateImage(record, fields.image);
                            });
                        }

                        // Send response
                        if (err) {
                            data.success = false;
                            data.error = 'Could not save!';
                        } else {
                            data.record = record;
                        }
                        app.sendJSON(res, data);
                    });
                    
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