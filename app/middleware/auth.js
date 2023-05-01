const { response } = require('express')
const jwt = require('jsonwebtoken');

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


module.exports = {
    validarJWT
}