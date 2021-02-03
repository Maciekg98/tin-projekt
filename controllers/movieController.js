
const MovieRepository = require('../repository/mysql2/MovieRepository');

exports.showMovieList = (req, res, next) => {
    MovieRepository.getMovie()
        .then(movies => {
            res.render('pages/movie/list', {
                movies: movies,
                navLocation: 'movies'
            });
        });


}


exports.showAddMovieForm = (req, res, next) => {
    res.render('pages/movie/form', {
        movie: {},
        pageTitle: 'New Movie',
        formMode: 'createNew',
        btnLabel: 'Add Movie',
        formAction: '/movies/add',
        navLocation: 'movies',
        validateErrors: []


    });

}
exports.showEditMovieForm = (req, res, next) => {
    const movieId = req.params.movieId;

    MovieRepository.getMovieById(movieId)
        .then(movie => {
            console.log(movie);
            res.render('pages/movie/form', {
                movie: movie,
                formMode: 'edit',
                pageTitle: 'Edit movie',
                btnLabel: 'Edit movie',
                formAction: '/movies/edit',
                navLocation: 'movies',
                validateErrors: []

            });
        });
};

exports.showMovieDetails = (req, res, next) => {

    const movieId = req.params.movieId;
    MovieRepository.getMovieById(movieId)
        .then(movie => {

            res.render('pages/movie/form', {
                movie: movie,
                formMode: 'showDetails',
                pageTitle: 'Movie details',
                formAction: '',
                navLocation: 'movies',
                validateErrors: []

            });
        });
}




exports.addMovie = (req, res, next) => {
    const newMovie = { ...req.body };
    MovieRepository.createMovie(newMovie).then(result => {
        res.redirect('/movies');
    }).catch(err => {
        console.log(err.details);
        res.render('pages/movie/form', {
            movie: newMovie,
            pageTitle: 'Add movie',
            formMode: 'createNew',
            btnLabel: 'Add movie',
            formAction: '/movies/add',
            navLocation: 'movie',
            validateErrors: err.details
        });
    });

};

exports.updateMovie = (req, res, next) => {
    const movieId = req.body._id;
    console.log("movieeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    const movieData = {
        ...req.body
    };
    MovieRepository.updateMovie(movieId, movieData)
        .then(result => {
            res.redirect('/movies');
        }).catch(err => {
            console.log(err.details);
            res.render('pages/movie/form', {
                movie: movieData,
                pageTitle: 'Edit  movie',
                formMode: 'createNew',
                btnLabel: 'Editmovie',
                formAction: '/movies/edit',
                navLocation: 'movie',
                validateErrors: err.details
            });
        });
};

exports.deleteMovie = (req, res, next) => {
    const movieId = req.params.movieId;
    MovieRepository.deleteMovie(movieId)
        .then(() => {
            res.redirect('/movies');
        });
};
