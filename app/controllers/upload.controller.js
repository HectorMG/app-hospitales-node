const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const path = require('path');
const fs = require('fs');


const cargarArchivo = (req, res = response) => {
    
    const id = req.params.id;
    const tipo = req.params.tipo;

    const tiposValidos = ['usuarios', 'hospitales', 'medicos'];


    if (!tiposValidos.includes(tipo)) {
        return res.status(404).json({
            ok:false,
            msg: "El tipo ingresado no es válido"
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: "No se envio el archivo"
        });
    }


    const file = req.files.imagen;

    const nombre = file.name.split('.');

    const extension = nombre[nombre.length-1];

    const extensionesValidas = ['jpg', 'png', 'gif', 'jpeg'];

    if (!extensionesValidas.includes(extension)) {
        return res.status(404).json({
            ok:false,
            msg: "La extensión no es válida"
        });
    }

    const nombreArchivo = `${uuidv4()}.${extension}`;

    const path = `./uploads/${tipo}/${nombreArchivo}`

    file.mv(path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: "Error del servidor"
            });
        }
        actualizarImagen(tipo,id,nombreArchivo);
        res.status(200).json({
            ok: true,
            msg: "Archivo subido",
            nombreArchivo
        });
      });

}

const retornarImagen = (req, res = response) => {
        
    const foto = req.params.foto;
    const tipo = req.params.tipo;

    const pathImg = path.join( __dirname, `../../uploads/${tipo}/${foto}`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);    
    }else{
        const pathImg = path.join( __dirname, `../../uploads/no-img.jpg`);
        res.sendFile(pathImg);     
    }

}


module.exports = {
    cargarArchivo,
    retornarImagen
}