const express = require('express');

const { validateUsers } = require('../middleware/usersValidator')

const router = express.Router();

const { check } = require('express-validator');

const { validateJWT } = require('../middleware/validarJWT');

const { getUsers, register, login, renew } = require('../controllers/usersControllers');







router.get('/', getUsers);

router.post('/new', [
    check('nickname', 'Nickname de usuario obligatorio').not().isEmpty(),
    check('pass', 'Password obligatoria').not().isEmpty(),
    check('email', 'email obligatorio').not().isEmpty().isEmail(),
    validateUsers],
    register);

router.post('/log', [
    check('nickname', 'Nickname de usuario obligatorio').not().isEmpty(),
    check('pass', 'Password obligatoria').not().isEmpty(),
    check('email', 'email obligatorio').not().isEmpty().isEmail(),
    validateUsers],
    login);

router.get('/renew', validateJWT, renew);


// router.post('/new', [
//     check('nickname', 'Nickname de usuario obligatorio').not().isEmpty(),
//     check('pass', 'Password obligatoria').not().isEmpty(),
//     check('email', 'email obligatorio').not().isEmpty().isEmail(), validateUsers],
//     postUser);

module.exports = router;