const { response, json } = require("express");
const { request } = require("http");

const XLSX = require('xlsx');
const fs = require('fs');

const { generarPremium } = require('../helpers/generar-db-premium')

const { generarDetallePremium,
        generarDetalleDescuento,
        generarDetalleDonacion,
        generarDetalleReciclaje,
        generarDetalleSegunda } = require('../helpers/generar-db-detalles')

const { coleccionesVacias } = require('../helpers/validar-colecciones')

const { subirArchivo } = require('../helpers/subir-archivo');
const Detalle           = require('../models/detalle');


//refactor
const subirTablaPremium = async( req = request, res = response) => {

    const premiums = await Detalle.find({tipoRopa: 'PREMIUM'});
    const vacio = Object.entries(premiums).length === 0;

    //revisa si la colección esta vacia
    if ( vacio == false ) {
        res.status(400).json({ msg: 'La colección de premium ya esta existe'})
        return;
    }

    // Subida de Archivo a Upload y obtención del Path de este archivo
    const resolve = await subirArchivo( req.files )
    
    // Lectura del Archivo
    const excel = XLSX.readFile( resolve.uploadPath );
    const datosPremium = XLSX.utils.sheet_to_json(excel.Sheets['Premium'])

    await generarPremium( datosPremium )

    await fs.unlinkSync(resolve.uploadPath)

    res.json({  msg: 'funca'})
}

//refactor
const subirTablaDescuentos = async( req = request, res = response) => {

    const descuentos = await Detalle.find({tipoRopa: 'DESCUENTO'})
    const vacio = Object.entries(descuentos).length === 0;

    //revisa si la colección esta vacia
    if ( vacio == false ) {
        res.status(400).json({ msg: 'La colección de descuentos ya esta existe'})
        return;
    }

    // Subida de Archivo a Upload y obtención del Path de este archivo
    const resolve = await subirArchivo( req.files )

    // Lectura del Archivo
    const excel = XLSX.readFile( resolve.uploadPath );
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
    await fs.unlinkSync(resolve.uploadPath)

    res.json({
        msg: 'funca'
    })
}

//refactor
const subirTablaDonacion = async( req = request, res = response) => {
    const donaciones = await Detalle.find({tipoRopa:'DONACION'})
    const vacio = Object.entries(donaciones).length === 0;
    //revisa si la colección esta vacia
    if ( vacio == false ) {
        res.status(400).json({ msg: 'La colección de donación ya esta existe'})
        return;
    }

    // Subida de Archivo a Upload y obtención del Path de este archivo
    const resolve = await subirArchivo( req.files )

    // Lectura del Archivo
    const excel = XLSX.readFile( resolve.uploadPath );
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
    await fs.unlinkSync(resolve.uploadPath)

    res.json({
        msg: 'funca'
    })  
}

//refactor
const subirTablaSegunda = async( req = request, res = response ) => {
    
    const segundas = await Detalle.find({tipoRopa:'SEGUNDA'})
    const vacio = Object.entries(segundas).length === 0;
    
    //revisa si la colección esta vacia
    if ( vacio == false ) {
        res.status(400).json({ msg: 'La colección de donación ya esta existe'})
        return;
    }
    
    // Subida de Archivo a Upload y obtención del Path de este archivo
    const resolve = await subirArchivo( req.files )

    // Lectura del Archivo
    const excel = XLSX.readFile( resolve.uploadPath );
    const datosSegunda = XLSX.utils.sheet_to_json(excel.Sheets['Segunda'])

    datosSegunda.forEach(datoSegunda => {
    

        const realg4life = {
            ropa: datoSegunda.Prenda,
            puntos: datoSegunda.Puntos
        }
        
        
        const { ropa, puntos } = realg4life
    
        const detalle = new Detalle({ tipoRopa: 'SEGUNDA', ropa: ropa, talla: null, puntos: puntos, deuda: null })
    
        detalle.save()
    
        
    });

    await fs.unlinkSync(resolve.uploadPath)

    res.json({  msg: 'Tabla Segunda lista'})
}

const darValorReciclaje = async( req = request, res = response ) => {
    const reciclaje = await Detalle.find({tipoRopa:'RECICLAJE'})
    const vacio = Object.entries(reciclaje).length === 0;

    //revisa si la colección esta vacia
    if ( vacio == false ) {
        res.status(400).json({ msg: 'La colección de reciclaje ya esta existe'})
        return;
    }

    // Subida de Archivo a Upload y obtención del Path de este archivo
    const resolve = await subirArchivo( req.files )

    // Lectura del Archivo
    const excel = XLSX.readFile( resolve.uploadPath );
    const datosReciclaje = XLSX.utils.sheet_to_json(excel.Sheets['Reciclaje'])

    // nuevo detalle de tipo reciclaje
    const detalle = new Detalle({ tipoRopa: 'RECICLAJE', ropa: null, talla: null, puntos: null, deuda: datosReciclaje[0]['Valor Reciclaje'] })

    
    //guardar
    detalle.save()

    await fs.unlinkSync(resolve.uploadPath)

    res.json({
        msg: 'valor de reciclaje guardado' 
    })
}

//refactorizada
const borrarTodoPremium = async(req = request, res = response) => {
    const premiums = await Detalle.find({ tipoRopa: 'PREMIUM' })
    const vacio = Object.entries(premiums).length === 0;
    
    if ( vacio == true ) {
        res.status(400).json({ msg: 'No hay una base de datos para borrar' });
        return;
    }
    
    //Borra la colleción Premium
    await Detalle.collection.deleteMany({tipoRopa: 'PREMIUM'})
    //Mensaje de Salida
    res.json({
        msg: 'Los datos de toda las categorias fueron borrados'
    })

}

//refactorizada
const borrarTodoSegunda = async(req = request, res = response) => {
    const segundas = await Detalle.find({ tipoRopa: 'SEGUNDA' })
    const vacio = Object.entries(segundas).length === 0;

    if( vacio == true ){
        res.status(400).json({ msg: 'No hay una base de datos para borrar' });
        return;
    }
    //Borra la colleción Segunda
    Detalle.collection.deleteMany({tipoRopa: 'SEGUNDA'})
    //Mensaje de Salida
    res.json({
        msg: 'Los datos de toda las categorias fueron borrados'
    })

}

//refactorizada
const borrarTodoDescuento = async(req = request, res = response) => {
    //Buscar todo los detalles tipo Descuento
    const detalles = await Detalle.find({ tipoRopa: 'DESCUENTO' })
    const vacio = await Object.entries(detalles).length === 0;

    //revisa si la colección esta vacia
    if ( vacio == true ) {
        res.status(400).json({ msg: 'La colección de descuentos ya esta vacia'})
        return;
    }
    
    Detalle.collection.deleteMany({tipoRopa: 'DESCUENTO'})

    res.json({
        msg: 'Los datos Descuento fueron borrados'
    })

}

//refactorizada
const borrarTodoDonacion = async(req = request, res = response) => {
    const donaciones = await Detalle.find({ tipoRopa: 'DONACION' });
    const vacio = Object.entries(donaciones).length === 0;

    if( vacio == true ){
        res.status(400).json({ msg: 'No hay una base de datos para borrar' });
        return;
    }
    //Borra la colleción Premium
    Detalle.collection.deleteMany({tipoRopa: 'DONACION'})
    //Mensaje de Salida
    res.json({
        msg: 'Los datos de toda las categorias fueron borrados'
    })

}

const subirTodo = async( req = request, res = response) => {

    const vacio = await coleccionesVacias()

    if( vacio == false ){
        res.status(400).json({ msg: 'Alguna/algunas o todas las colecciones no estan vacias' })
        return
    }

    // Subida de Archivo a Upload y obtención del Path de este archivo
    const resolve = await subirArchivo( req.files )

    // Lectura del Archivo
    const excel = XLSX.readFile( resolve.uploadPath );

    await generarDetallePremium( req, res, excel );
    await generarDetalleSegunda( req, res, excel );
    await generarDetalleDescuento( req, res, excel );
    await generarDetalleDonacion( req, res, excel );
    await generarDetalleReciclaje( req, res, excel );
   
    await fs.unlinkSync(resolve.uploadPath)    

    res.json({
        msg: 'Tabla Completa subida'
    })

}

const borrarTodo = async( req = response, res = request ) => {
    
    const vacio = await coleccionesVacias();

    if( vacio == true ){
        res.status(400).json({ msg: 'no existen una collección que borrar' })
        return
    }

    Detalle.collection.drop();

    res.json({
        msg: 'Tabla eliminada por completo'
    })
    
}

module.exports = {
    borrarTodoPremium,
    borrarTodoSegunda,
    borrarTodoDescuento,
    borrarTodoDonacion,
    subirTablaPremium,
    subirTablaSegunda,
    subirTablaDescuentos,
    subirTablaDonacion,
    darValorReciclaje,
    subirTodo,
    borrarTodo
}