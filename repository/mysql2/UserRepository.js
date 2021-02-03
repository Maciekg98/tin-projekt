


const db = require('../../config/mysql2/db');
const userSchema = require('../../model/joi/User');
exports.getUsers = () => {
    return db.promise().query('SELECT * FROM USERS')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getUserById = (userId) => {
    console.log(userId);
    const query = `SELECT u._id as _id, u.username, u.email, u.password , m._id as m_id,m.title, m.director, m.price, ord._id as ord_id,
    ord.isPaid, ord.dateFrom, ord.dateTo
FROM Users u 
left join Orders ord on ord.user_id = u._id
left join Movies m on ord.movie_id = m._id 
where u._id =?`;
    return db.promise().query(query, [userId]).then((results, fields) => {
        const firstRow = results[0][0];
        if (!firstRow) {
            return {};
        }

        const user = {
            _id: parseInt(userId),
            username: firstRow.username,
            email: firstRow.email,
            password: firstRow.password,
            orders: []
        }
        for (let i = 0; i < results[0].length; i++) {
            const row = results[0][i];
            if (row.ord_id) {
                const order = {
                    _id: row.ord_id,
                    isPaid: row.isPaid,
                    dateFrom: row.dateFrom,
                    dateTo: row.dateTo,
                    movie: {
                        _id: row.m_id,
                        title: row.title,
                        price: row.price
                    }
                };
                user.orders.push(order)
            }
        }
        return user;
    }).catch(err => {
        console.log(err);
        throw err;
    });
}

exports.createUser = (newUser) => {

    const vRes = userSchema.validate(newUser, { abortEarly: false });

    if (vRes.error) {
        return Promise.reject(vRes.error);
    }



    const username = newUser.username;
    const email = newUser.email;
    const password = newUser.password;
    const sql = 'INSERT into USERS (username, email, password) VALUES (?, ?, ?)'
    return db.promise().execute(sql, [username, email, password]);



};

exports.updateUser = (userId, userData) => {
    const vRes = userSchema.validate(userData, { abortEarly: false });

    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    const username = userData.username;
    const email = userData.email;
    const password = userData.password;
    const sql = `UPDATE Users set username = ?, email = ?, password = ? where _id = ?`;
    return db.promise().execute(sql, [username, email, password, userId]);
};

exports.deleteUser = (userId) => {

    const sql1 = 'DELETE FROM Orders where user_id = ?'
    const sql2 = 'DELETE FROM Users where _id = ?'

    return db.promise().execute(sql1, [userId])
        .then(() => {
            return db.promise().execute(sql2, [userId])
        });
};

checkEmailUnique = (email, userId) => {
    let sql, promise;
    if (userId) {
        sql = `SELECT COUNT(1) as c FROM Users where _id != ? and email = ?`;
        promise = db.promise().query(sql, [userId, email]);
    } else {
        sql = `SELECT COUNT(1) as c FROM Users where email = ?`;
        promise = db.promise().query(sql, [email]);
    }
    return promise.then((results, fields) => {
        const count = results[0][0].c;
        let err = {};
        if (count > 0) {
            err = {
                details: [{
                    path: ['email'],
                    message: 'enter another email   '
                }]
            };
        }
        return err;
    });
}