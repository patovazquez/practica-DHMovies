var express = require('express');
var router = express.Router();
var path = require('path');
/*const { validator } = require('sequelize/types/lib/utils/validator-extras');*/
var moviesController = require(path.join(__dirname, '..', 'controllers', 'moviesController'));
let { check, validationResult, body } = require('express-validator');


router.get('/', moviesController.all);
router.get('/detail/:idMovie', moviesController.detail);
router.get('/new', moviesController.new);
router.get('/calendar', moviesController.calendar); /*ruta que lleva al calendario*/
router.get('/recommended', moviesController.recom);
router.post('/search', moviesController.search);
router.get('/create', moviesController.create);
router.post('/create',
[ 
check('title').notEmpty().withMessage('El titulo es obligatorio'),
check('rating').isFloat().withMessage('Rating es un numero'),
check('awards').isInt().withMessage('Premios es un numero'),
check('length').isInt().withMessage('Duración es un numero'),
check('release_date').isDate().withMessage('Seleccionar fecha'),
check('genre_id').isInt().withMessage('Seleccione el genero'),
], 
moviesController.store);
router.get('/edit/:idMovie', moviesController.edit);
router.put('/edit/:idMovie', 
[ 
check('title').notEmpty().withMessage('El titulo es obligatorio'),
check('rating').isFloat().withMessage('Rating es un numero'),
check('awards').isInt().withMessage('Premios es un numero'),
check('length').isInt().withMessage('Duración es un numero'),
check('release_date').isDate().withMessage('Seleccionar fecha'),
check('genre_id').isInt().withMessage('Seleccione el genero'),
], 
moviesController.update);
router.delete('/delete/:idMovie', moviesController.destroy);

module.exports = router;
