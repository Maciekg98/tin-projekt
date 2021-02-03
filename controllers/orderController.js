
const OrderRepo = require('../repository/mysql2/OrderRepository');
const MovieRepository = require('../repository/mysql2/MovieRepository');
const UserRepository = require('../repository/mysql2/UserRepository');




exports.showOrderList = (req, res, next) => {
    OrderRepo.getOrders()
        .then(orders => {
            res.render('pages/order/list', {
                orders: orders,
                navLocation: 'order'
            });

        });

}

exports.show = (req, res, next) => {
    let allUsers, allMovies;
    UserRepository.getUsers()
        .then(users => {
            allUsers = users;
            return MovieRepository.getMovie();
        })
        .then(movies => {
            allMovies = movies;
            return OrderRepo.getOrders();

        }).then(orders => {
            res.render('pages/order/list', {
                order: {},
                orders: orders,
                allMovies: allMovies,
                allUsers: allUsers,
                navLocation: 'orders'
            });
        });
}

exports.showOrderAddForm = (req, res, next) => {
    let allUsers, allMovies;
    UserRepository.getUsers()
        .then(users => {
            allUsers = users;
            return MovieRepository.getMovie();
        })
        .then(movies => {
            allMovies = movies;
            res.render('pages/order/form', {
                order: false,
                formMode: 'createNew',
                allUsers: allUsers,
                allMovies: allMovies,
                pageTitle: 'New Order',
                btnLabel: 'Add order',
                formAction: '/orders/add',
                navLocation: 'order',
                validationErrors: []

            });
        });
}



exports.showDetails = (req, res, next) => {
    const orderId = req.params.orderId;


    let allUsers, allMovies;
    UserRepository.getUsers()
        .then(users => {
            allUsers = users;
            // console.log(allUsers);
            return MovieRepository.getMovie();
        })
        .then(movies => {

            allMovies = movies;
            // console.log(allMovies);
            return OrderRepo.getOrdersById(orderId);
        })
        .then(order => {
            // console.log(order[0]);
            res.render('pages/order/form', {
                order: order,
                formMode: 'showDetails',
                allUsers: allUsers,
                allMovies: allMovies,
                pageTitle: 'Order Details',
                btnLabel: 'Edit order',
                formAction: '/orders/edit',
                navLocation: 'order',
                validationErrors: []

            });
        });


}


exports.showEditForm = (req, res, next) => {
    const orderId = req.params.orderId;

    console.log("================req====================");
    console.log(req.params);
    console.log("====================================");

    let allUsers, allMovies;
    UserRepository.getUsers()
        .then(users => {
            allUsers = users;
            // console.log(allUsers);
            return MovieRepository.getMovie();
        })
        .then(movies => {

            allMovies = movies;
            // console.log(allMovies);
            return OrderRepo.getOrdersById(orderId);
        })
        .then(order => {
            // console.log(order[0]);
            console.log("order====================================");
            console.log(order);
            console.log("order====================================");
            res.render('pages/order/form', {
                order: order,
                formMode: 'edit',
                allUsers: allUsers,
                allMovies: allMovies,
                pageTitle: 'Order Details',
                btnLabel: 'Edit order',
                formAction: '/orders/edit',
                navLocation: 'order',
                validationErrors: []

            });
        });


}


exports.addOrder = (req, res, next) => {
    const orderData = {
        ...req.body
    };
    OrderRepo.createOrder(orderData)
        .then(result => {
            res.redirect('/orders');
        }).catch(err => {
            let allUsers, allMovies;
            UserRepository.getUsers()
                .then(users => {
                    allUsers = users;
                    return MovieRepository.getMovie();
                })
                .then(movies => {

                    allMovies = movies;
                    res.render('pages/order/form', {
                        order: false,
                        formMode: 'createNew',
                        allUsers: allUsers,
                        allMovies: allMovies,
                        pageTitle: 'New Order',
                        btnLabel: 'Add order',
                        formAction: '/orders/add',
                        navLocation: 'order',
                        validationErrors: err.details

                    });

                });
            /*       order: {},
                            orders: orders,
                            allMovies: allMovies,
                            allUsers: allUsers,
                            navLocation: 'order'*/
        });


}

exports.deleteOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    OrderRepo.deleteOrder(orderId)
        .then(() => {
            res.redirect('/orders');
        });
};

exports.updateOrder = (req, res, next) => {
    const orderId = req.body._id;

    const propData = {
        ...req.body
    };
    console.log("===============reqbody=============");
    console.log("============================");
    console.log(propData);
    console.log("============================");
    OrderRepo.updateOrder(orderId, propData)
        .then(result => {

            res.redirect('/orders');
        })
        .catch(err => {
            let allUsers, allMovies;
            UserRepository.getUsers()
                .then(users => {
                    allUsers = users;
                    return MovieRepository.getMovie()
                })
                .then(movies => {

                    allMovies = movies;
                    return OrderRepo.getOrdersById(orderId)
                })
                .then(order => {


                    res.render('pages/order/form', {
                        order: order,
                        formMode: 'edit',
                        allUsers: allUsers,
                        allMovies: allMovies,
                        pageTitle: 'Edit order',
                        btnLabel: 'Edit order',
                        formAction: '/orders/edit',
                        navLocation: 'order',
                        validationErrors: err.details
                    });

                });

        });
};