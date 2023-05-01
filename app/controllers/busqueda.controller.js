const { response } = require('express');
const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');



const busquedaTotal = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda,'i');

    /* const usuarios = await Usuario.find({nombre: regex});
    const hospitales = await Hospital.find({nombre: regex});
    const medicos = await Medico.find({nombre: regex}); */

    const [usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find({nombre: regex}),
        Hospital.find({nombre: regex}),
        Medico.find({nombre: regex})
    ]);


    res.status(200).json({
        ok:true,
        usuarios,
        hospitales,
        medicos
    });
}

const busquedaDocumentosColeccion = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;

    const regex = new RegExp(busqueda,'i');

    let resultado = [];

    switch (tabla) {
        case 'medicos':
            resultado = await Medico.find({nombre: regex})
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img')

            break;

        case 'hospitales':
            resultado = await Hospital.find({nombre: regex})
                                      .populate('usuario', 'nombre img')

            break;
        
        case 'usuarios':
            resultado = await Usuario.find({nombre: regex})
            break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: "La tabla no se encuentra definida"
            });
    }

    res.status(200).json({
        ok:true,
        resultado
    });
}

module.exports = {
    busquedaTotal,
    busquedaDocumentosColeccion
}