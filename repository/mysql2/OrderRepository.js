const db = require('../../config/mysql2/db');
const orderSchema = require('../../model/joi/Order');
exports.getOrders = () => {
    const query = `SELECT o._id as o_id, o.isPaid, o.dateFrom, o.dateTo, m._id as movie_id, m.title,
    m.price, u._id as user_id, u.username, u.email, u.password
FROM Orders o 
left join Movies m on o.movie_id = m._id
left join Users u on o.user_id = u._id`
    return db.promise().query(query)
        .then((results, fields) => {
            const orders = [];
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                const order = {
                    _id: row.o_id,
                    isPaid: row.isPaid,
                    dateFrom: row.dateFrom,
                    dateTo: row.dateTo,
                    user: {
                        _id: row.user_id,
                        username: row.username

                    },
                    movie: {
                        _id: row.movie_id,
                        title: row.title

                    }
                };
                orders.push(order);
            }
            return orders;
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getOrdersById = (orderId) => {
    const query = `SELECT o._id as o_id, o.isPaid, o.dateFrom, o.dateTo, m._id as movie_id, m.title,
    m.price, u._id as user_id, u.username, u.email, u.password,m.director
FROM Orders o 
left join Movies m on o.movie_id = m._id
left join Users u on o.user_id = u._id
where o._id = ?`
    return db.promise().query(query, [orderId])
        .then((results, fields) => {
            const orders = [];
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                const order = {
                    _id: orderId,
                    isPaid: row.isPaid,
                    dateFrom: row.dateFrom,
                    dateTo: row.dateTo,
                    user: {
                        _id: row.user_id,
                        username: row.username,
                        email: row.email,
                        password: row.password
                    },
                    movie: {
                        _id: row.movie_id,
                        title: row.title,
                        director: row.director,
                        price: row.price
                    }
                };
                orders.push(order);
            }
            return orders;
        })
        .catch(err => {
            console.log(err);
        });
};

exports.createOrder = (data) => {

    const vRes = orderSchema.validate(data, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }


    const sql = 'INSERT into Orders (user_id, movie_id, dateFrom, dateTo, isPaid) VALUES (?, ?, ?, ?, ?)';
    return db.promise().execute(sql, [data.user, data.movie_id, data.dateFrom, data.dateTo, data.isPaid]);
};

exports.updateOrder = (orderId, data) => {
    console.log("id w updejcie");
    console.log(orderId);
    console.log("==========koniec=================");
    const vRes = orderSchema.validate(data, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    data.dateTo = data.dateTo ? data.dateTo : null;

    const sql = `UPDATE Orders set user_id = ?, movie_id = ?, isPaid = ?, dateFrom = ?, dateTo = ? where _id = ?`;
    return db.promise().execute(sql, [data.user, data.movie_id, data.isPaid, data.dateFrom, data.dateTo, orderId]);
}


exports.deleteOrder = (orderId) => {
    const sql = 'DELETE FROM orders where _id = ?'
    return db.promise().execute(sql, [orderId]);
}