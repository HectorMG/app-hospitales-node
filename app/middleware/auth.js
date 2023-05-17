const { response } = require('express')
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

const validarJWT = (req, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok:false,
            msg: "No esta autenticado"
        });
    }

    try {
        const { uid } = jwt.verify(token,process.env.JWT_SECRET);
        req.uid = uid;
        next()
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: "Token no válido"
        })
    }
}

const validarRol =  async (req, res = response, next) => {
    const uid = req.uid;
    try {
        const usuario = await Usuario.findById(uid)
    
        if (usuario.rol !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok:false,
                msg: "No esta autorizado"
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: "Token no válido"
        })
    }
}

const validarRolMismoUsuario =  async (req, res = response, next) => {
    const uid = req.uid;
    const uidEditar = req.params.id;
    try {
        const usuario = await Usuario.findById(uid)
    
        if (usuario.rol !== 'ADMIN_ROLE' && uid!==uidEditar ) {
            return res.status(403).json({
                ok:false,
                msg: "No esta autorizado"
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: "Token no válido"
        })
    }
}


module.exports = {
    validarJWT,
    validarRol,
    validarRolMismoUsuario
}