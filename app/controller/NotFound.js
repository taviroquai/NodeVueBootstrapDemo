
function NotFound(app, req, res) {
    
    this.action = (params) => {
        
        const data = {
            success: true
        };

        app.sendHTML(res, './client/notfound.html', data);
        
    };
}

module.exports = NotFound;