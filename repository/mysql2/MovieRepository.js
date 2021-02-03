const db = require('../../config/mysql2/db');
const movieSchema = require('../../model/joi/Movie');


exports.getMovie = () => {
    return db.promise().query('SELECT * FROM MOVIES')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};




exports.getMovieById = (movieId) => {

    /*SELECT u._id as _id, u.username, u.email, u.password , m._id as m_id,m.title, m.director, m.price, ord._id as ord_id,
    ord.isPaid, ord.dateFrom, ord.dateTo
FROM Users u 
left join Orders ord on ord.user_id = u._id
left join Movies m on ord.movie_id = m._id 
where u._id =?*/


    const query = `SELECT m._id as _id, m.title,m.director, m.price , u._id as u_id, u.username, u.email ,o._id as o_id,
    o.isPaid, o.dateFrom,  o.dateTo
FROM Movies m 
left join Orders o on o.movie_id = m._id
left join Users u on o.user_id = u._id 
where m._id  = ?`;
    return db.promise().query(query, [movieId]).then((results, fields) => {
        const firstRow = results[0][0];
        if (!firstRow) {
            return {};
        }

        const movie = {
            _id: parseInt(movieId),
            title: firstRow.title,
            director: firstRow.director,
            price: firstRow.price,
            orders: []
        }
        for (let i = 0; i < results[0].length; i++) {
            const row = results[0][i];
            if (row.o_id) {
                const order = {
                    _id: row.o_id,
                    isPaid: row.isPaid,
                    dateFrom: row.dateFrom,
                    dateTo: row.dateTo,
                    user: {
                        _id: row.u_id,
                        username: row.username,
                        email: row.email
                    }
                };

                movie.orders.push(order);
            }
        }


        return movie;
    }).catch(err => {
        console.log(err);
        throw err;
    });
}

exports.createMovie = (newMovie) => {

    const vRes = movieSchema.validate(newMovie, { abortEarly: false });

    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    const title = newMovie.title;
    const director = newMovie.director;
    const price = newMovie.price;
    const sql = 'INSERT into Movies (title, director, price) VALUES (?,?, ?)'
    return db.promise().execute(sql, [title, director, price]);
};

exports.updateMovie = (movieId, movieData) => {

    const vRes = movieSchema.validate(movieData, { abortEarly: false });

    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    const title = movieData.title;
    const director = movieData.director;
    const price = movieData.price;
    const sql = `UPDATE Movies set title = ?, director = ?, price = ? where _id = ?`;
    return db.promise().execute(sql, [title, director, price, movieId]);
};

exports.deleteMovie = (movieId) => {

    const sql1 = 'DELETE FROM Orders where movie_id = ?'
    const sql2 = 'DELETE FROM Movies where _id = ?'

    return db.promise().execute(sql1, [movieId])
        .then(() => {
            return db.promise().execute(sql2, [movieId])
        });
};