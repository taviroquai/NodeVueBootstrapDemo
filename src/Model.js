
"use strict";

// Model 
function Model(app) {
    
    this.app = app;
    this.table = 'table_name';
    this.pkey = 'pkey';
    this.timestamps = false;
    this.fill = [];
    this.template = {
        pkey: ''
    };
}
    
// Destroy database schema
Model.prototype.destroy = function(cb) {
    var sql = "DROP TABLE if exists " + this.table;
    this.app.db.run(sql, cb);
};
    
// Find all
Model.prototype.findAll = function(select, cb) {
    var sql = "SELECT " + select + " FROM " + this.table;
    this.app.db.all(sql, cb);
};
    
// Find by field
Model.prototype.findBy = function(field, value, cb) {
    var sql = "SELECT * FROM " + this.table 
            + " WHERE " + field + " = ?";
    this.app.db.all(sql, [value], cb);
};

// Find by pkey
Model.prototype.find = function(id, cb) {
    this.findBy(this.pkey, id, (err, rows) => {
        if (rows.length === 0) {
            cb(err, false);
        } else {
            cb(err, rows[0]);
        }
    });
};
    
// Find by pkey or new
Model.prototype.findOrNew = function(id, cb) {
    var self = this;
    this.find(id, (err, record) => {
        if (err) cb(err, self.template);
        if (!record) {
            cb(err, self.template);
        } else {
            cb(err, record);
        }
    });
};
    
// Insert
Model.prototype.insert = function(data, cb) {

    var sql, sql_params = [];
    var values = [];
    for (var i = 0; i < this.fill.length; i++) {
        sql_params.push('?');
        values.push(data[this.fill[i]]);
    }
    if (this.timestamps) {
        sql = "INSERT INTO " + this.table 
                + " (" + this.fill.join(',') + ", created_at)"
                + " VALUES (" + sql_params.join(',') + ", date('now'))";
    } else {
        sql = "INSERT INTO " + this.table 
                + " (" + this.fill.join(',') + ")"
                + " VALUES (" + sql_params.join(',') + ")";
    }
    this.app.db.run(sql, values, cb);
};
    
// Update
Model.prototype.update = function(record, data, cb) {

    var sql, sql_params = [];
    var values = [];
    for (var i = 0; i < this.fill.length; i++) {
        sql_params.push(this.fill[i] + ' = ?');
        values.push(data[this.fill[i]]);
    }
    values.push(record.id);
    if (this.timestamps) {
        sql = "UPDATE " + this.table 
                + " SET " + sql_params.join(',') 
                + ", updated_at = date('now') "
                + " WHERE " + this.pkey + " = ?";
    } else {
        sql = "UPDATE " + this.table 
                + " SET " + sql_params.join(',') 
                + " WHERE " + this.pkey + " = ?";
    }
    this.app.db.run(sql, values, cb);
};

// Save
Model.prototype.save = function(record, data, cb) {
    var sql, self = this;
    if (record[this.pkey] === '' || record[this.pkey] === 0) {
        sql = "select seq from sqlite_sequence where name='" + this.table + "'";
        this.insert(data, (err) => {
            self.app.db.all(sql, (err, rows) => {
                self.find(rows[0].seq, cb);
            });
        });
    } else {
        this.update(record, data, (err) => {
            self.find(record[self.pkey], cb);
        });
    }
};

// Delete
Model.prototype.delete = function(record, cb) {

    var values = [];
    var sql = "DELETE FROM " + this.table 
            + " WHERE " + this.pkey + " = ?";
    values.push(record[this.pkey]);
    this.app.db.run(sql, values, cb);
};

module.exports = Model;