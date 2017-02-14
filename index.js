
const config = require('./app/config');
const Mini = require('./src/Mini');

const mini = new Mini(config);
mini.listenHTTP();

