// Ruta: /api/auth/

const { Router } = require('express');
const { check } = require('express-validator')
const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middleware/validar-campos')

const router = Router();

router.post('/login',[
    check('email', 'El correo es requerido').isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    validarCampos
],login);

module.exports = router;