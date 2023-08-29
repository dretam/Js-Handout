let Package = require('../utilities/package-manager');
const router = Package.getRouter();
const defaultController = require('../controllers/defaultCtrl');

router.get('/',defaultController.getIndex);

module.exports = router;