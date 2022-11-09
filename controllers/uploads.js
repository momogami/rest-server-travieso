const { response } = require("express");
const XLSX = require('xlsx');
const fs = require('fs');

const { generarPremium } = require('../helpers/generar-db-premium')
const { generarSegunda, coleccionVacia } = require('../helpers/index')
const { subirArchivo } = require('../helpers/subir-archivo');

const PremiumUnitario = require('../models/premiumUnitario');
const SegundaUnitario = require('../models/segundaUnitario');
const { request } = require("http");




const cargarTablaDePuntos = async(req = request, res = response) => {
    const premiumVacia = await coleccionVacia( 'Premium');
    const segundaVacia = await coleccionVacia( 'Segunda' );
   

    if( (premiumVacia.existenDatos && segundaVacia.existenDatos) == false){
        res.status(400).json({msg: ' Una de las colecciones no esta vacia '});
        return;
    }
    // Ver si hay un archivo para subir
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg: ' No hay archivo que subir '});
        return;
        }
    
    // Subida de Archivo a Upload y obtención del Path de este archivo
    const resolve = await subirArchivo( req.files )
    
    // Lectura del Archivo
    const excel = XLSX.readFile( resolve.uploadPath );

    // Datos de las Hojas 
    const datosPremium = XLSX.utils.sheet_to_json(excel.Sheets['Premium'])
    const datosSegunda = XLSX.utils.sheet_to_json(excel.Sheets['Segunda'])
    
    // Generar Base de Datos de Trueques Segunda Mano
    await generarSegunda(datosSegunda)
    
    // Generar Base de Datos de Trueques Premium
    await generarPremium(datosPremium);
    
    // Eliminar Archivo de la Carpeta
    await fs.unlinkSync(resolve.uploadPath)

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
    const excel = XLSX.readFile( resolve.uploadPath );
    const datosPremium = XLSX.utils.sheet_to_json(excel.Sheets['Premium'])
    
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

const borrarTodoPremium = async(req = request, res = response) => {
    const premiumVacia = await coleccionVacia('Premium');
    
    if( premiumVacia.existenDatos == true ){
        res.status(400).json({ msg: 'No hay una base de datos para borrar' });
        return;
    }
    //Borra la colleción Premium
    PremiumUnitario.collection.drop();
    //Mensaje de Salida
    res.json({
        msg: 'Los datos de toda las categorias fueron borrados'
    })

}

const borrarTodoSegunda = async(req = request, res = response) => {
    const segundaVacia = await coleccionVacia('Segunda');

    if( segundaVacia.existenDatos == true ){
        res.status(400).json({ msg: 'No hay una base de datos para borrar' });
        return;
    }
    //Borra la colleción Premium
    SegundaUnitario.collection.drop();
    //Mensaje de Salida
    res.json({
        msg: 'Los datos de toda las categorias fueron borrados'
    })

}




module.exports = {
    cargarTablaDePuntos,
    borrarTodoPremium,
    cargarArchivo,
    actualizarTablaDePuntos,
    borrarTodoSegunda
}