
const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');

router.get('/', movieController.showMovieList);

router.get('/add', movieController.showAddMovieForm);
router.get('/edit/:movieId', movieController.showEditMovieForm);
router.get('/details/:movieId', movieController.showMovieDetails);

router.get('/delete/:movieId', movieController.deleteMovie);
router.post('/add', movieController.addMovie);
router.post('/edit', movieController.updateMovie);





module.exports = router;

