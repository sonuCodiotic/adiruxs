const router = require('express').Router();
const user = require('../controller/UserController')

router.post('/signup', user.add_user)

router.post('/login', user.login)

router.post('/get-users', user.get_all_user)

module.exports = router;
