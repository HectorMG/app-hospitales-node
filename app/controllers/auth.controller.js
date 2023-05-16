const { response } = require('express');
const { generarJWT } = require('../helpers/jwt')
const { googleVerify } = require('../helpers/google-verify');
const  bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const { getMenu } = require('../helpers/menu');


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
        const menu = getMenu(usuario.rol);

        res.status(200).json({
            'ok': true,
            usuario,
            token,
            menu
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            'ok': false,
            'msg': 'Error del servidor revise logs'
        });
    }
}


const googleSignIn = async (req, res = response) => {

    try {
        const { email, name, picture } = await googleVerify(req.body.token);


        const usuarioBd = await Usuario.findOne({email});

        let usuario;

        if (!usuarioBd) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '--',
                imag:picture,
                google:true
            });
        }else{
            usuario = usuarioBd;
            usuario.google = true;
        }

        await usuario.save();


        const token =  await generarJWT(usuario.id)

        const menu = getMenu(usuario.rol);

        res.status(200).json({
            'ok': true,
            usuario,
            token,
            menu
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'ok': false,
            'msg': 'Error en el token'
        });
    }
}

const reNewToken = async (req, res = response) =>{

    const uid  = req.uid;
    const token =  await generarJWT(uid)

    const usuario = await Usuario.findById(uid);

    const menu = getMenu(usuario.rol);

    res.json({
        ok:true,
        usuario,
        token,
        menu
    });
}

module.exports = {
    login,
    googleSignIn,
    reNewToken
}