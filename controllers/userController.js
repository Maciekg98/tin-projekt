const UserRepository = require('../repository/mysql2/UserRepository');


exports.showUserList = (req, res, next) => {
    UserRepository.getUsers()
        .then(users => {
            res.render('pages/user/list', {
                users: users,
                navLocation: 'users'
            });
        });
}

exports.showAddUserForm = (req, res, next) => {
    const validateErrors = [];
    res.render('pages/user/form', {
        user: {},
        pageTitle: 'New user',
        formMode: 'createNew',
        btnLabel: 'Add user',
        formAction: '/users/add',
        navLocation: 'users',
        validateErrors: validateErrors
    });
}

exports.showEditUserForm = (req, res, next) => {
    const userId = req.params.userId;
    UserRepository.getUserById(userId)
        .then(user => {


            console.log(userId)

            res.render('pages/user/form', {
                user: user,
                formMode: 'edit',
                pageTitle: 'Edit user',
                btnLabel: 'Edit user',
                formAction: '/users/edit',
                navLocation: 'users',
                validateErrors: []

            });
        });
};

exports.showDetails = (req, res, next) => {
    const userId = req.params.userId;




    UserRepository.getUserById(userId)
        .then(user => {
            res.render('pages/user/form', {
                user: user,
                formMode: 'showDetails',
                pageTitle: 'User details',
                formAction: '',
                navLocation: 'users',
                validateErrors: []

            });
        });


}



exports.addUser = (req, res, next) => {


    const newUser = { ...req.body };
    UserRepository.createUser(newUser).then(result => {
        res.redirect('/users');
    }).catch(err => {
        console.log(err.details);
        res.render('pages/user/form', {
            user: newUser,
            pageTitle: 'Add user',
            formMode: 'createNew',
            btnLabel: 'Add user',
            formAction: '/users/add',
            navLocation: 'user',
            validateErrors: err.details
        });
    });

};

exports.updateUser = (req, res, next) => {
    const userId = req.body._id;
    const user = {
        ...req.body
    };
    UserRepository.updateUser(userId, user)
        .then(result => {
            res.redirect('/users');
        }).catch(err => {
            console.log(err.details);
            console.log(user);
            res.render('pages/user/form', {
                user: user,
                pageTitle: 'edit user',
                formMode: 'edit',
                btnLabel: 'Edit user',
                formAction: '/users/edit',
                navLocation: 'user',
                validateErrors: err.details
            });
        });
}


exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    UserRepository.deleteUser(userId)
        .then(() => {
            res.redirect('/users');
        });
};
