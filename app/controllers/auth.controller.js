const { response } = require('express');
const { generarJWT } = require('../helpers/jwt')
const Usuario = require('../models/usuario.model');
const  bcrypt = require('bcryptjs');


const login = async (req, res = response) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({email});

        if (!usuario) {
            return res.status(404).json({
                'ok':false,
                'msg': 'Correo o contraseña invalido'
            })
        }

        const passValidacion = bcrypt.compareSync(password, usuario.password);

        if (!passValidacion) {
            return res.status(404).json({
                'ok':false,
                'msg': 'Correo o contraseña inválido'
            });
        }

        const token =  await generarJWT(usuario.id)

        res.status(200).json({
            'ok': true,
            'msg': token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            'ok': false,
            'msg': 'Error del servidor revise logs'
        });
    }
}

module.exports = {
    login
}