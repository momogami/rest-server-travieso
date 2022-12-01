
//Modelos
const Detalle         = require('../models/detalle')

//Funciones
const { generarPremium } = require('./generar-db-premium')
const { subirArchivo }    = require('./subir-archivo')

//Dependencias
const XLSX = require('xlsx');
const fs = require('fs');

//Recibe los datos de la Conversión de Excel a Json
const generarDetallePremium = async( req, res, excel ) => {

    const datosPremium = XLSX.utils.sheet_to_json(excel.Sheets['Premium'])

    await generarPremium( datosPremium )
    
}

const generarDetalleSegunda = async( req, res, excel ) => {
    
    const datosSegunda = XLSX.utils.sheet_to_json(excel.Sheets['Segunda'])

    datosSegunda.forEach(datoSegunda => {
    

        const realg4life = {
            ropa: datoSegunda.Prenda,
        }
        
        
        const { ropa } = realg4life
    
        const detalle = new Detalle({ tipoRopa: 'SEGUNDA', ropa: ropa, talla: null, puntos: null, deuda: null })
    
        detalle.save()
    
        
    });

  

}

const generarDetalleDescuento = async( req, res, excel ) => {

    const datosDescuento = XLSX.utils.sheet_to_json(excel.Sheets['Descuento'])
   

    datosDescuento.forEach(datoDescuento => {
    

    const realg4life = {
        ropa: datoDescuento.Prenda,
    }

    
    const { ropa } = realg4life

    const detalle = new Detalle({ tipoRopa: 'DESCUENTO', ropa: ropa, talla: null, puntos: null, deuda: null })

    /* const descuentoUnitario = new DescuentoUnitario({ ropa }) */
    detalle.save()

    
    });

} 

const generarDetalleDonacion = async( req, res, excel ) => {

    const datosDescuento = XLSX.utils.sheet_to_json(excel.Sheets['Donacion'])
   

    datosDescuento.forEach(datoDescuento => {
    

    const realg4life = {
        ropa: datoDescuento.Prenda,
    }

    
    const { ropa } = realg4life

    const detalle = new Detalle({ tipoRopa: 'DONACION', ropa: ropa, talla: null, puntos: null, deuda: null })

    /* const descuentoUnitario = new DescuentoUnitario({ ropa }) */
    detalle.save()

    
    });

}

const generarDetalleReciclaje = async( req, res, excel ) => {

    const datosReciclaje = XLSX.utils.sheet_to_json(excel.Sheets['Reciclaje'])

    // nuevo detalle de tipo reciclaje
    const detalle = new Detalle({ tipoRopa: 'RECICLAJE', ropa: null, talla: null, puntos: null, deuda: datosReciclaje[0]['Valor Reciclaje'] })

    
    //guardar
    detalle.save()
}

module.exports = {
    generarDetallePremium,
    generarDetalleDescuento,
    generarDetalleDonacion,
    generarDetalleReciclaje,
    generarDetalleSegunda
}