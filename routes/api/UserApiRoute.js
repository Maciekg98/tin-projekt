const express = require('express');
const router = express.Router();

const userApiController = require('../../api/UserApi');

router.get('/', userApiController.getUsers);
router.get('/:userId', userApiController.getUserById);
router.post('/', userApiController.createUser);
router.put('/:userId', userApiController.updateUser);
router.delete('/:userId', userApiController.deleteUser);




module.exports = router;
