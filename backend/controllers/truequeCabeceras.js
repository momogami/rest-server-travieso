const { response, request } = require('express');
const detalle = require('../models/detalle');
const { mongoose, ISODate } = require('mongoose')

const TruequeCabecera = require('../models/truequeCabecera');
const Detalle = require('../models/detalle');
const TruequeDetalle  = require('../models/truequeDetalle');
const Cliente = require('../models/cliente');


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
    let estadoReciclaje = true;

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

        if(detalle[0].tipoRopa == 'RECICLAJE'){
            estadoReciclaje = true
        }
    }

    
    

    const resumen = ({
        totalPrendasPremiumSegunda: cantidadPremiumSegunda ,
        ropaDescuento: cantidadRopaDescuento ,
        descuento: 0,
        puntosExtra: 0,
        puntosVestuario: puntosTotales,
        deudaReciclaje: deudaTotal,
        totalPuntos: puntosTotales,
        estadoReciclaje: estadoReciclaje
    })



    res.json( {
        idTruequeCabecera: truequeCabecera._id,
        resumen: resumen
    } )
    
};

const actualizarConResumen = async (req, res) => {
    const { idTruequeCabecera, resumen } = req.body;
    
    const truequeCabecera = await TruequeCabecera.findOne({ _id: idTruequeCabecera })

    truequeCabecera.deudaTotal = resumen.deudaReciclaje;
    truequeCabecera.descuento = resumen.descuento;
    truequeCabecera.puntosTotales =  resumen.totalPuntos

    if( resumen.estadoReciclaje == false ){
        truequeCabecera.idsTruequeDetalle.forEach( async detalleTrueque => {
            const truequeDetalle = await TruequeDetalle.find({ _id: detalleTrueque._id })
            const detalle = await Detalle.find({ _id: truequeDetalle[0].idDetalle })

            if ( detalle[0].tipoRopa == 'RECICLAJE') {
                
                truequeCabecera.idsTruequeDetalle = truequeCabecera.idsTruequeDetalle.filter((item) => item !== detalleTrueque )
                await TruequeDetalle.findByIdAndDelete(detalleTrueque)
                truequeCabecera.save()
            }

        });
    }

    truequeCabecera.save();

    res.json(truequeCabecera)
};

const consultaEntreFechas = async( req, res ) => {
    
    const { fechaInicio, fechaFin } = req.body

    const historialCompleto = [];

    const trueques = await TruequeCabecera.find({fecha: {$gte: new Date(fechaInicio), $lte: new Date(fechaFin)}}
    )

    for (let index = 0; index < trueques.length; index++) {
        // Obtencion Cliente
        const cliente = await Cliente.findOne(trueques[index].idCliente)

        //Obtener Trueque Detalle 
        let premiumFinal = [];
        let segundaFinal = [];
        let descuentoFinal = [];
        let donacionFinal = [];
        for (let index2 = 0; index2 < trueques[index].idsTruequeDetalle.length; index2++) {
            const truequeDetalle = await TruequeDetalle.findOne(trueques[index].idsTruequeDetalle[index2])
            const detalle = await Detalle.findOne( truequeDetalle.idDetalle )

            if(detalle.tipoRopa == 'PREMIUM'){
                premiumInicial = ` ${detalle.ropa}/${detalle.talla}: ${truequeDetalle.cantidad}  `
                premiumFinal.push(premiumInicial)
            }

            if( detalle.tipoRopa == 'SEGUNDA'){
                segundaInicial = `${detalle.ropa}: ${truequeDetalle.cantidad}`
                segundaFinal.push(segundaInicial)
            }

            if ( detalle.tipoRopa == 'DESCUENTO') {
                descuentoInicial = `${detalle.ropa}: ${truequeDetalle.cantidad}`
                descuentoFinal.push(descuentoInicial)
            }

            if ( detalle.tipoRopa == 'DONACION') {
                donacionInicial = `${detalle.ropa}: ${truequeDetalle.cantidad}`
                donacionFinal.push(donacionInicial)
            }

            if ( detalle.tipoRopa == 'RECICLAJE') {
                kilosReciclaje = truequeDetalle.kilos;
                cantidadReciclaje = truequeDetalle.cantidad ;
                deudaReciclaje = truequeDetalle.deudaInicial ;
            }


        }
        

        

        let historial = ({
            ID : trueques[index]._id,
            NombreCliente: `${cliente.nombre} ${cliente.apellido}`,
            rut: cliente.rut,
            puntosTotales: trueques[index].puntosTotales,
            premium: premiumFinal,
            segunda: segundaFinal,
            descuento: descuentoFinal,
            donacion: donacionFinal,
            kilos: kilosReciclaje,
            cantidadReciclaje: cantidadReciclaje,
            deudaReciclaje: deudaReciclaje  
        })

        historialCompleto.push( historial )
        
        
    }

    
    
    console.log( historialCompleto )

    res.json(historialCompleto)
}


module.exports = {
    crearTruequeCabecera,
    consultaEntreFechas,
    actualizarConResumen
}