/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { getUsuarios, crearUsuarios, actualizarUsuarios, eliminarUsuario } = require('../controllers/usuario.controller')
const { check } = require('express-validator')
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/auth');

const router = Router();

router.get('/', validarJWT ,getUsuarios);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
] ,crearUsuarios);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    validarCampos
], actualizarUsuarios);

router.delete('/:id',validarJWT,eliminarUsuario);

module.exports = router;