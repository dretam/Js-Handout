const portNumber = 4000;
let Package = require('./utilities/package-manager');
let expressCore = Package.generateExpressCore();

//const dataAccess = Package.dataAccess.appDataAccess;
//Package.setSequelizeConnection(dataAccess);
//const sequelizeConnection = Package.sequelizeConnection;

//Package.configureSequelizeSession(expressCore, 24, 1);
//Package.setXSProtection(expressCore);

// let ModelAssociation = require('./utilities/models-association');
// ModelAssociation.setAppAssociations();

// let authenticationController = require('./controllers/authenticationCtrl');
// expressCore.use(authenticationController.aunthenticatingAndSetToken);

const routesCollection = require('./utilities/routes-collection');
routesCollection.setRoutes(expressCore);

(async () => {
    try{
        //await sequelizeConnection.sync({force:false});
        expressCore.listen(portNumber);
        //let administratorProvider = require('./providers/administratorPrv');
        //await administratorProvider.superAdminInitialization();
    } catch(error) {
        console.log(error);
    }
})();