
"use strict";

// Require fs
const fs = require("fs");

// require Model
const Model = require('../../src/Model');

// User Model
function User(app) {
    
    // Call inherit constructor
    Model.call(this, app);
    
    // Override properties
    var self = this;
    this.table = 'users';
    this.pkey = 'id';
    this.timestamps = false;
    this.fill = ['username', 'email'];
    this.template = {
        id: '',
        username: '',
        password: '',
        email: ''
    };
    
    // Put model updates inside serialize
    this.app.db.serialize(function() {

        // Init database schema
        self.app.db.run(
            "CREATE TABLE if not exists users (" 
            + "id INTEGER PRIMARY KEY AUTOINCREMENT, " 
            + "username VARCHAR(32), " 
            + "password VARCHAR(255), " 
            + "email VARCHAR(64), " 
            + "recover_token VARCHAR(255), " 
            + "created_at DATE, "
            + "updated_at DATE, "
            + "active INTEGER "
            + ")"
        );

        // SQL UPDATES
        self.app.db.all("PRAGMA table_info(users)", (err, rows) => {
            
            // Add image column
            var exists_image = false;
            for(var i = 0; i < rows.length; i++)
                if (rows[i].name === 'image')
                    exists_image = true;
            if (!exists_image) {
                self.app.db.run("ALTER TABLE users ADD COLUMN image VARCHAR(255)");
            }
        });

    });
}

User.prototype = Object.create(Model.prototype);
User.prototype.constructor = User;

User.prototype.findByLogin = function(email, password, cb) {
    var sql = "SELECT * FROM " + this.table 
            + " WHERE email = ? AND password = ?";
    this.app.db.all(sql, [email, password], cb);
};

// Update password
User.prototype.updatePassword = function(record, password, cb) {

    var sql = "UPDATE " + this.table 
            + " SET password = ?"
            + " WHERE " + this.pkey + " = ?";
    var values = [];
    values.push(password);
    values.push(record.id);
    
    this.app.db.run(sql, values, cb);
};

// Upload image
User.prototype.uploadImage = function(base64str, target, name, cb) {
    
    var ext = false, regex;
    if (ext = this.app.validateBase64Image(base64str)) {
        regex = new RegExp("^data:image/" + ext + ";base64,");
        base64str = base64str.replace(regex, "");

        fs.mkdir(target, (err) => {
            fs.writeFile(target + name + "." + ext, base64str, 'base64', (err) => {
                typeof cb === 'function' ? cb(err, ext) : false;
            });
        });
    } else {
        typeof cb === 'function' ? cb(null, ext) : false;
    }
    
};

// Update image
User.prototype.updateImage = function(record, filename, cb) {
    
    // Update database
    var sql = "UPDATE " + this.table 
        + " SET image = ?"
        + " WHERE " + this.pkey + " = ?";
    var values = [];
    values.push(filename);
    values.push(record.id);
    this.app.db.run(sql, values, cb);
};

// Remove image
User.prototype.removeImage = function(filename, cb) {
    fs.unlink(filename, cb);
};

module.exports = User;