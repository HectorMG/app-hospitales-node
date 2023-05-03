/**
 * Ruta: /api/medicos
 */

const { Router } = require('express');
const { getMedicos, crearMedicos, actualizarMedicos, eliminarMedicos } = require('../controllers/medico.controller');
const { validarJWT } = require('../middleware/auth');
const { validarCampos } = require('../middleware/validar-campos');
const { check } = require('express-validator');

const router = Router();

router.get('/', getMedicos);

router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es requerido').notEmpty(),
    check('hospital', 'El hospital es requerido').notEmpty(),
    check('hospital', 'El hospital id no es válido').isMongoId(),
    validarCampos
],crearMedicos);

router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es requerido').notEmpty(),
    check('hospital', 'El hospital es requerido').notEmpty(),
    check('hospital', 'El hospital id no es válido').isMongoId(),
    validarCampos
],actualizarMedicos);

router.delete('/:id', validarJWT, eliminarMedicos);


module.exports = router;

