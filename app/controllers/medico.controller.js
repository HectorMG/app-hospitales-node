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

const getMedico =  async (req, res = response) => {
    const id = req.params.id;

    try {
        
        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: "El médico no se encuentra"
            })
        }

        res.status(200).json({
            ok:true,
            medico
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: "Error del servidor"
        })
        
    }

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

const actualizarMedicos = async (req, res = response) => {

    const id = req.params.id;

    const datosActualizar = {
        usuario: req.uid,
        ...req.body
    }

    try {

        const medico = await Medico.findById(id);


        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: "El médico no se encuentra"
            });
        }

        const nuevoMedico = await Medico.findByIdAndUpdate(id, datosActualizar,{new:true});


        res.status(200).json({
            ok: true,
            medico:nuevoMedico
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error en el servidor"
        });
    }

    
}

const eliminarMedicos = async (req, res = response) => {
    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: "El médico no se encuentra"
            })
        }

        const eliminado = await Medico.findByIdAndDelete(id);

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
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    eliminarMedicos,
    getMedico
}