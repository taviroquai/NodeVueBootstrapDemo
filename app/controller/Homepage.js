
// Controller
function Homepage(app, req, res) {
    
    // HTTP action
    this.action = (params) => {
        
        // Response data
        const data = {
            success: true,
            title: 'Hello World',
            logged: req.session.get('logged')
        };
        
        // Send response
        app.sendHTML(res, 'index', data);
    };
};

module.exports = Homepage;