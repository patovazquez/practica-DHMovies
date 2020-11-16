var express = require('express');
var router = express.Router();
var path = require('path');
var genresController = require(path.join(__dirname, '..', 'controllers', 'genresController'));


router.get('/', genresController.all);
router.get('/detail/:idGenre', genresController.detail);


module.exports = router;