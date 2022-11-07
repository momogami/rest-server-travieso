const { response } = require("express");
const XLSX = require('xlsx');

const { generarPremium } = require('../helpers/generar-db-premium')

const PremiumUnitario = require('../models/premiumUnitario')


const cargarTablaDePuntos = async(req = request, res = response) => {
 
    const excelPremium = XLSX.readFile(req.files.archivo.name);
    const datosPremium = XLSX.utils.sheet_to_json(excelPremium.Sheets['Premium'])
    
    await generarPremium(datosPremium);
    
    res.json({
        msg: 'Datos de Ropa Premium guardados'
    })

}

const borrarTodo = async(req = request, res = response) => {
    if( !PremiumUnitario ){
        
    }
    PremiumUnitario.collection.drop();
    res.json({
        msg: 'Los datos de toda las categorias fueron borrados'
    })

}




module.exports = {
    cargarTablaDePuntos,
    borrarTodo
}