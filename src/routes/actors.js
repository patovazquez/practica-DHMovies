var express = require('express');
var router = express.Router();
var path = require('path');
var actorsController = require(path.join(__dirname, '..', 'controllers', 'actorsController'));


router.get('/', actorsController.all);
router.get('/detail/:idActor', actorsController.detail);
router.get('/acting', actorsController.acting)
router.post('/acting', actorsController.store)


module.exports = router;