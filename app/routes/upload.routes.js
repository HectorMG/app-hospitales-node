/**
 * Ruta: /upload/:table/:id
 */

const { Router } = require('express');
const fileUpload = require('express-fileupload');
const { cargarArchivo, retornarImagen } = require('../controllers/upload.controller');
const { validarJWT } = require('../middleware/auth');


const router = Router();

router.use(fileUpload());

router.put('/:tipo/:id', validarJWT , cargarArchivo);

router.get('/:tipo/:foto',  retornarImagen);



module.exports = router;