class Package{
    static express = require('express');
    static bodyParser = require('body-parser');
    static fileSystem = require('fs');
    static path = require('path');
    static rootDirectory = this.path.dirname(process.mainModule.filename);
    static Sequelize = require('sequelize');
    static mongoose = require('mongoose');
    static expressSession = require('express-session');
    static antiXSToken = require('csurf');
    static flash = require('connect-flash');
    static cors = require('cors');
    static SequelizeStore = require('connect-session-sequelize')(this.expressSession.Store);
    static MongoDBStore = require('connect-mongodb-session')(this.expressSession);
    static dataAccess = require('./data-access');
    static sequelizeConnection;
    static mongoURI;
    /**
     * The function is used to instantiate express framework, set views folder as default views folder, 
     * set bodyParser for html and json, setp public folder to be accessed by browser.
     * @returns {object} express framework object
     */
    static generateExpressCore = () => {
        const express = this.express;
        const expressCore = express();
        expressCore.set('view engine', 'ejs');
        expressCore.set('views', 'views');
        expressCore.use(this.bodyParser.urlencoded({extended: false}));
        expressCore.use(this.bodyParser.json());
        expressCore.use(express.static(this.path.join(__dirname, '../public')));
        expressCore.use(express.static(this.path.join(__dirname, '../node_modules/apexcharts/dist')));
        expressCore.use(this.cors());
        return expressCore;
    }
    /**
     * This function is used to get object router inside express framework, used to create routing
     * for every web request. This will be used in routes files.
     * @returns {object} expressRoutes 
     */
    static getRouter = () => this.express.Router();
    /**
     * This function is used to get the path of the root directory of the project.
     * With this path, we can easily navigate to the file location we want.
     * @returns {object} rootDirectory
     */
    static getRootDirectory = () => this.path.dirname(process.mainModule.filename);
    /**
     * Set database connection with sequelize.
     * @param {object} connectionStringObject - host: server, userName, database, password, dbms: the type of database management
     */
    static setSequelizeConnection = ({host, userName, database, password, dbms}) => {
        const Sequelize = this.Sequelize;
        const connection = new Sequelize(database, userName, password, {
            dialect: dbms,
            host: host
        });
        this.sequelizeConnection = connection;
    }
    /**
     * This function is used to configure session inside database with sequelize.
     * @param {express} expressCore - object express
     * @param {number} expireDuration - in hour
     * @param {number} expireInterval - Period in hour to check the session.
     */
    static configureSequelizeSession = (expressCore, expireDuration, expireInterval) => {
        const SequelizeStore = this.SequelizeStore;
        const unicornStore = new SequelizeStore({
            db:this.sequelizeConnection,
            expiration: expireDuration * 3600000,
            checkExpirationInterval: expireInterval * 3600000
        });
        expressCore.use(this.expressSession({
            secret: 'MQ9Reaper',
            store: unicornStore,
            resave: false,
            saveUninitialized: false
        }));
        unicornStore.sync({force:true});
    }
    /**
     * This function is used to return setting configuration for model first configuration and how it will make table in database.
     * @returns {object} tableSetting
     */
    static getSequelizeTableSetting = () => {
        var setting = {
            freezeTableName: true,
            underscored: true,
            timestamps: false
        } 
        return setting;   
    };
    /**
     * This function is used to set url to mongoDB for connection string to database.
     * @param {string} uri - url to connect to mongoDB.
     */
    static setMongoDBConnectionString = uri => { this.mongoURI = uri };
    /**
     * This function is used to set and connect mongoDB with Mongoose.
     * @param {string} callback - ?
     */
    static connectToMongoose = async(callback) => {
        try{
            await this.mongoose.connect(this.mongoURI, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
            callback();
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * This function is used to get mongoose schema.
     * @returns {Schema} mongooseSchema
     */
    static getMongooseSchema = () => this.mongoose.Schema;
    /**
     * This function is used to configure session in mongoDB.
     * @param {object} expressCore - express object
     * @param {number} expiration - in hour
     */
    static configureMongoDBSession = (expressCore, expiration) => {
        const MongoDBStore = this.MongoDBStore;
        const unicornStore = new MongoDBStore({
            uri: this.mongoURI,
            collection: 'sessions',
            connectionOptions:{useNewUrlParser: true, useUnifiedTopology: true}
        });
        expressCore.use(this.expressSession({
            secret: 'MQ9Reaper',
            cookie: {
                maxAge: expiration * 60000
            },
            resave: false,
            saveUninitialized: false,
            store: unicornStore
        }));
    }
    /**
     * Set anti Cross-Site Forgery Token in express object.
     * @param {express} expressCore - express object.
     */
    static setXSProtection = expressCore => {
        const antiXSToken = this.antiXSToken;
        const antiXSProtection = new antiXSToken();
        expressCore.use(antiXSProtection);
    }
    /**
     * This function is used set flash validation for the express framework.
     * @param {express} expressCore - express object.
     */
    static setFlash = expressCore => {
        const flash = this.flash;
        expressCore.use(flash());
    }
    /**
     * This function is used to full file path in data directory by just give the file name.
     * @param {string} fileName
     * @returns {string} filePath - full path for the file.
     */
    static getFilePath = fileName => {
        let filePath = this.path.join(this.rootDirectory, 'data', fileName);
        return filePath;
    }
}

module.exports = Package;