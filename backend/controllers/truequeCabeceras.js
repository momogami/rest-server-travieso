const { response, request } = require('express');
const detalle = require('../models/detalle');
const { mongoose, ISODate } = require('mongoose')

const TruequeCabecera = require('../models/truequeCabecera');
const Detalle = require('../models/detalle');
const TruequeDetalle  = require('../models/truequeDetalle')

const crearTruequeCabecera = async(req, res = response) => {
    const { idUsuario, idCliente, idsTruequeDetalle  } = req.body
    
    const truequeCabecera = new TruequeCabecera({ idUsuario: idUsuario, idCliente: idCliente, idsTruequeDetalle: idsTruequeDetalle, descuento: 0});

    let puntosTotales = 0;

    // Puntos Totales
    for (let index = 0; index < idsTruequeDetalle.length; index++) {
        const truequeDetalle = await TruequeDetalle.find( {_id: idsTruequeDetalle[index]} );
        
        puntosTotales = puntosTotales + truequeDetalle[0].puntosIniciales

    }

    truequeCabecera.puntosTotales = puntosTotales
    
    // Deuda Total
    let deudaTotal = 0;

    for (let index = 0; index < idsTruequeDetalle.length; index++) {
        const truequeDetalle = await TruequeDetalle.find( {_id: idsTruequeDetalle[index]} );
        
        deudaTotal = deudaTotal + truequeDetalle[0].deudaInicial

    }

    truequeCabecera.deudaTotal = deudaTotal


    // Fecha
    const fecha = new Date()

    truequeCabecera.fecha = fecha

    truequeCabecera.save()


    let cantidadPremiumSegunda = 0;
    let cantidadRopaDescuento = 0;

    for (let index = 0; index < idsTruequeDetalle.length; index++) {
        const element = idsTruequeDetalle[index];
        const truequeDetalle = await TruequeDetalle.find({ _id: element })
        const detalle = await Detalle.find({ _id: truequeDetalle[0].idDetalle })
 

        if ( detalle[0].tipoRopa == 'SEGUNDA' || detalle[0].tipoRopa == 'PREMIUM' ) {

            cantidadPremiumSegunda = cantidadPremiumSegunda + truequeDetalle[0].cantidad
        }

        if (detalle[0].tipoRopa == 'DESCUENTO') {

            cantidadRopaDescuento = cantidadRopaDescuento + truequeDetalle[0].cantidad
        }

    }

    
    

    const resumen = ({
        totalPrendasPremiumSegunda: cantidadPremiumSegunda ,
        ropaDescuento: cantidadRopaDescuento ,
        descuento: 0,
        puntosExtra: 0,
        puntosVestuario: puntosTotales,
        deudaReciclaje: deudaTotal,
        totalPuntos: puntosTotales
    })



    res.json( {
        idTruequeCabecera: truequeCabecera._id,
        resumen: resumen
    } )
    
};

const consultaEntreFechas = async( req, res ) => {
    
    const { fechaInicio, fechaFin } = req.body

    const fechas = await TruequeCabecera.find({fecha: {$gte: new Date(fechaInicio), $lte: new Date(fechaFin)}}
    )

    fechas.forEach(fecha => {
        console.log(fecha.fecha)
    });

    res.json({
        msg: 'funca'
    })
}



module.exports = {
    crearTruequeCabecera,
    consultaEntreFechas
}