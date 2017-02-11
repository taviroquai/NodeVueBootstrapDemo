
// require Model
const Model = require('./Model');

// Article Model
function Article(app) {
    
    // Call inherit constructor
    Model.call(this, app);
    
    // Override properties
    this.table = 'articles';
    this.pkey = 'id';
    this.fill = ['title', 'body'];
    this.template = {
        id: '',
        title: '',
        body: ''
    };
    
    // Init database schema
    this.app.db.run(
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
}

Article.prototype = Object.create(Model.prototype);
Article.prototype.constructor = Article;

Article.prototype.findBySlug = function(slug, cb) {
    this.findBy('slug', slug, cb);
};

module.exports = Article;