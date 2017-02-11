
// require Model
const Model = require('./Model');

// User Model
function User(app) {
    
    // Call inherit constructor
    Model.call(this, app);
    
    // Override properties
    var self = this;
    this.table = 'users';
    this.pkey = 'id';
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
Model.prototype.updatePassword = function(record, password, cb) {

    var sql = "UPDATE " + this.table 
            + " SET password = ?"
            + " WHERE " + this.pkey + " = ?";
    var values = [];
    values.push(password);
    values.push(record.id);
    
    this.app.db.run(sql, values, cb);
};

module.exports = User;