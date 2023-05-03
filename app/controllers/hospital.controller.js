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

const actualizarHospital = async (req, res = response) => {

    const id = req.params.id;
    const datosActualziar = { usuario: req.uid, ...req.body};

    try {
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: "El hospital no se encuentra"
            })
        }

        const hospitalNuevo = await Hospital.findByIdAndUpdate(id,datosActualziar,{new:true});

        res.status(200).json({
            ok:true,
            hospital: hospitalNuevo
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error del servidor"
        })
    }
}

const eliminarHospital = async (req, res = response) => {

    const id = req.params.id;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: "El hospital no se encuentra"
            })
        }

        const eliminado = await Hospital.findByIdAndDelete(id);

        res.status(200).json({
            ok:true,
            msg: eliminado
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error del servidor"
        })
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}