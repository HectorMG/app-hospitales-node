/**
 * Ruta : /api/busqueda
 */

const { Router } = require('express');
const { busquedaTotal, busquedaDocumentosColeccion } = require('../controllers/busqueda.controller')
const { validarJWT } = require('../middleware/auth')

const router = Router();

router.get('/:busqueda', validarJWT, busquedaTotal);

router.get('/coleccion/:tabla/:busqueda', validarJWT, busquedaDocumentosColeccion);


module.exports = router;