/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { getUsuarios, crearUsuarios, actualizarUsuarios, eliminarUsuario } = require('../controllers/usuario.controller')
const { check } = require('express-validator')
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT, validarRol, validarRolMismoUsuario } = require('../middleware/auth');

const router = Router();

router.get('/', [validarJWT, validarRol] ,getUsuarios);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
] ,crearUsuarios);

router.put('/:id', [
    validarJWT,
    validarRolMismoUsuario,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    validarCampos
], actualizarUsuarios);

router.delete('/:id',[validarJWT,validarRol],eliminarUsuario);

module.exports = router;