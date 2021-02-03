const express = require('express');
const router = express.Router();

const movieApiController = require('../../api/MovieApi');

router.get('/', movieApiController.getMovie);
router.get('/:movieId', movieApiController.getMovieById);
router.post('/', movieApiController.createMovie);
router.put('/:movieId', movieApiController.updateMovie);
router.delete('/:movieId', movieApiController.deleteUser);







module.exports = router;