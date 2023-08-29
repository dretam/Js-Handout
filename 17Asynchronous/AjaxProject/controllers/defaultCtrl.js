exports.getIndex = (request, respond, next) => {
    respond.status(200).render('index', {
        path: '/'
    });
}