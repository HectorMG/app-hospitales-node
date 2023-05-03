// Ruta: /api/auth/

const { Router } = require('express');
const { check } = require('express-validator')
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validarCampos } = require('../middleware/validar-campos')

const router = Router();

router.post('/login',[
    check('email', 'El correo es requerido').isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    validarCampos
],login);

router.post('/google',[
    check('token', 'El token es requerido').notEmpty(),
    validarCampos
],googleSignIn);

module.exports = router;