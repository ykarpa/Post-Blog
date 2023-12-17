let express = require('express');
let router = express.Router();
let { loginUser,
    registerUser,
    getLogin,
    getRegistration, } = require('../controllers/authControllers');

router.get('/login', getLogin);

router.get('/registration', getRegistration);

router.post('/login', loginUser);

router.post('/register', registerUser);

module.exports = router;