const { response } = require("express");
const Hospital = require('../models/hospital.model');

const getHospitales =  async (req, res = response) => {
    const hospitales = await Hospital.find()
                                     .populate('usuario', 'nombre email');
    
    res.status(200).json({
        ok: true,
        hospitales
    });
}

const crearHospital = async (req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({ usuario:uid, ...req.body});
    try {
        await hospital.save();

        res.status(200).json({
            ok: true,
            hospital
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error del servidor"
        })
    }
}

const actualizarHospital = (req, res = response) => {
    res.status(200).json({
        ok:true,
        msg: "Actualizar hospitales"
    })
}

const eliminarHospital = (req, res = response) => {
    res.status(200).json({
        ok:true,
        msg: "Eliminar hospitales"
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}