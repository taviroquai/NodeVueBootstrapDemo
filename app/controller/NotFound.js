
// Load View
const View = require('../view/View');

function NotFound(app, req, res) {
    
    this.action = (params) => {
        
        const data = {
            success: true
        };
        
        // Send response
        const view = new View(app, 'notfound');
        view.render(data, (html) => {
            app.sendHTML(res, html);
        });
        
    };
}

module.exports = NotFound;