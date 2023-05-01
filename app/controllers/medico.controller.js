const { response } = require('express');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');


const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find()
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
    
    res.status(200).json({
        ok: true,
        medicos
    });
}

const crearMedicos = async (req, res = response) => {
    
    const { hospital } = req.body;

    const medico = new Medico({
        usuario: req.uid,
        ...req.body
    });

    try {

        const hospitalBd = await Hospital.findById(hospital);

        if (!hospitalBd) {
            return res.status(404).json({
                ok: false,
                msg: "El hospital no se encuentra"
            });
        }

        await medico.save();

        res.status(200).json({
            ok: true,
            medico
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error del servidor"
        });
    }
}

const actualizarMedicos = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: "Actualizar medicos"
    });
}

const eliminarMedicos = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: "Eliminar medicos"
    });
}

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    eliminarMedicos
}