const { response, json } = require("express");
const { request } = require("http");

const XLSX = require('xlsx');
const fs = require('fs');

const { generarPremium } = require('../helpers/generar-db-premium')
const { generarSegunda, coleccionVacia } = require('../helpers/index')
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
const cargarTablaDescuentos = async( req = request, res = response) => {

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
const cargarTablaDonacion = async( req = request, res = response) => {
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
        }
        
        
        const { ropa } = realg4life
    
        const detalle = new Detalle({ tipoRopa: 'SEGUNDA', ropa: ropa, talla: null, puntos: null, deuda: null })
    
        detalle.save()
    
        
    });

    await fs.unlinkSync(resolve.uploadPath)

    res.json({  msg: 'Tabla Segunda lista'})
}

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
    const objetoPremiumUnitario = await PremiumUnitario.find()
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



module.exports = {
    cargarTablaDePuntos,
    borrarTodoPremium,
    cargarArchivo,
    actualizarTablaDePuntos,
    borrarTodoSegunda,
    cargarTablaDescuentos,
    cargarTablaDonacion,
    borrarTodoDescuento,
    borrarTodoDonacion,
    subirTablaPremium,
    subirTablaSegunda
}