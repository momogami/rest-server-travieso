const { response } = require("express");
const XLSX = require('xlsx');
const fs = require('fs');

const { generarPremium } = require('../helpers/generar-db-premium')
const { subirArchivo } = require('../helpers/subir-archivo');

const PremiumUnitario = require('../models/premiumUnitario')
const SegundaUnitario = require('../models/segundaUnitario');
const { request } = require("http");
const premiumUnitario = require("../models/premiumUnitario");




const cargarTablaDePuntos = async(req = request, res = response) => {

    // Ver si hay un archivo para subir
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg: ' No hay archivo que subir '});
        return;
        }
    const resolve = await subirArchivo( req.files )
    
    // Lectura del Archivo
    const excelPremium = XLSX.readFile( resolve.uploadPath );
    const datosPremium = XLSX.utils.sheet_to_json(excelPremium.Sheets['Premium'])
    
    // Generar Base de Datos de Trueques Premium
    await generarPremium(datosPremium);
    
    // Eliminar Archivo de la Carpeta
    fs.unlinkSync(resolve.uploadPath)

    res.json({
        msg: ' Subido correctamente '
    })
}

const actualizarTablaDePuntos = async(req = request, res = response) => {
    // Ver la colección
    const objetoPremiumUnitario = await premiumUnitario.find()
    // Revisa si el objeto esta vacio
    const existenDatos = Object.entries(objetoPremiumUnitario).length === 0;
    // Si no existen datos ya no actualiza
    if( existenDatos == true ){
        res.status(400).json({ msg: 'No hay una base de datos para actualizar' });
        return;
    }
    // Borra todo en caso de que hallan datos
    PremiumUnitario.collection.drop();
    
    // Ver si hay un archivo para subir
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg: ' No hay archivo que subir '});
        return;
        }
    
    // subir archivo cambiar su nombre a Tabla de Datos y regresar el Path y su Nombre Final    
    const resolve = await subirArchivo( req.files );

    // Lectura del Archivo
    const excelPremium = XLSX.readFile( resolve.uploadPath );
    const datosPremium = XLSX.utils.sheet_to_json(excelPremium.Sheets['Premium'])
    
    // Generar Base de Datos de Trueques Premium
    await generarPremium(datosPremium);
    
    // Eliminar Archivo de la Carpeta
    fs.unlinkSync(resolve.uploadPath)
    
    
    res.json({
        msg: 'actulización de datos completa'
    })
}

const cargarArchivo = async( req, res = response) => {


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({msg: ' No hay archivo que subir '});
    return;
    }

    const resolve = await subirArchivo( req.files )

    res.json({
        nombre: resolve.nombreFinal,
        path:   resolve.uploadPath
    })
}

const borrarTodo = async(req = request, res = response) => {

    const objetoPremiumUnitario = await premiumUnitario.find()
    // Revisa si el objeto esta vacio
    const existenDatos = Object.entries(objetoPremiumUnitario).length === 0;

    if( existenDatos == true ){
        res.status(400).json({ msg: 'No hay una base de datos para borrar' });
        return;
    }

    PremiumUnitario.collection.drop();
    res.json({
        msg: 'Los datos de toda las categorias fueron borrados'
    })

}




module.exports = {
    cargarTablaDePuntos,
    borrarTodo,
    cargarArchivo,
    actualizarTablaDePuntos
}