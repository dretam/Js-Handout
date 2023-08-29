const defaultRoutes = require('../routes/defaultRts');
exports.setRoutes = (expressCore) => {
    expressCore.use(defaultRoutes);
}
