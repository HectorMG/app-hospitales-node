const Usuario = require('../models/usuario.model');
const bcrypt  = require('bcryptjs');
const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async (req,res) =>{

    const desde =  Number(req.query.desde) || 0;

    const [usuarios, total] = await Promise.all([
        Usuario.find({},'nombre email role google imag')
                                  .skip(desde)
                                  .limit(5),
        Usuario.count()
    ]);

    res.json({
        ok:true,
        usuarios,
        total
    })
}

const crearUsuarios = async (req,res = response) =>{

    const { password, email }  = req.body;

    try {
        const existeEmail = await Usuario.findOne({email});

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            }); 
        }

        const usuario = new Usuario(req.body);
    
        // se cifra la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario.id);
    
        res.json({
            ok:true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error del servidor - revisar logs'
        }); 
    }
}

const actualizarUsuarios =  async (req, res = response) =>{

    const uid = req.params.id;

    try {
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con el id'
            }); 
        }

        const { password, google, email,  ...campos } = req.body;

        if (usuario.email !== email) {
            const existeEmail = await Usuario.findOne({email});

            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo nuevo ya esta registrado'
                }); 
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos, {new: true});

        res.status(200).json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        });
    }
}

const eliminarUsuario = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con el id'
            }); 
        }

        const elimindo =  await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok:true,
            usuario: elimindo
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuarios,
    eliminarUsuario
}