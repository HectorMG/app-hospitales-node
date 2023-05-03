/**
 * Ruta : /api/hospitales
 */

const { Router } = require('express')
const { getHospitales, crearHospital, actualizarHospital, eliminarHospital } = require('../controllers/hospital.controller')
const { validarJWT } = require('../middleware/auth')
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

router.get('/', validarJWT, getHospitales);

router.post('/', [
    validarJWT,
    check('nombre', 'Nombre es requerido').not().isEmpty(),
    validarCampos
], crearHospital);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es requerido').notEmpty(),
    validarCampos
], actualizarHospital);

router.delete('/:id', [validarJWT], eliminarHospital);

module.exports = router;