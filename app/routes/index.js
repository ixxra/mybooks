var root = require('./root');

function loadRoutes (app) {
    app.use('/', root);
//    app.use('/users', users);
//    app.use('/books', books);
//    app.use('/search', search);
//    app.use('/thumbnails', thumbs);
};

module.exports = loadRoutes;
