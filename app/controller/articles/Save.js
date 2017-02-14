
"use strict";

// Load form parser
const formidable = require('formidable');
        
// Load models
const ArticleModel = require('../../model/Article');

// Controller
function Save(app, req, res) {
    
    const articles = new ArticleModel(app);
    
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
                
                // Load article or new
                id = fields[articles.pkey] === '' ? 0 : fields[articles.pkey];
                articles.findOrNew(id, (err, record) => {

                    // Update article
                    articles.save(record, fields, (err, record) => {

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