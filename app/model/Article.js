
"use strict";

// require Model
const Model = require('../../src/Model');

// Article Model
function Article(app) {
    
    // Call inherit constructor
    Model.call(this, app);
    
    // Override properties
    var self = this;
    this.table = 'articles';
    this.pkey = 'id';
    this.timestamps = true;
    this.fill = ['title', 'body'];
    this.template = {
        id: '',
        title: '',
        body: ''
    };
    
    // Put model updates inside serialize
    this.app.db.serialize(() => {
    
        // Init database schema
        self.app.db.run(
            "CREATE TABLE if not exists articles (" 
            + "id INTEGER PRIMARY KEY AUTOINCREMENT, " 
            + "title VARCHAR(120), " 
            + "body TEXT, "
            + "description VARCHAR(255), "
            + "keywords VARCHAR(255), "
            + "slug VARCHAR(120), "
            + "created_at DATE, "
            + "updated_at DATE, "
            + "publish INTEGER "
            + ")"
        );

        // SQL UPDATES
        
    });
    
}

Article.prototype = Object.create(Model.prototype);
Article.prototype.constructor = Article;

Article.prototype.findBySlug = function(slug, cb) {
    this.findBy('slug', slug, cb);
};

module.exports = Article;