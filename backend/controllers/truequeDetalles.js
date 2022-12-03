const { response, request } = require('express');

const Detalle = require('../models/detalle');
const TruequeDetalle = require('../models/truequeDetalle');

const agregarPremium = async(req, res = response) => {
    
    const { ropa, talla, cantidad } = req.body;

    const detalle =  await Detalle.findOne({ ropa: ropa, talla: talla })

    const truequeDetalle = new TruequeDetalle({ idDetalle: detalle._id, cantidad: cantidad, puntosIniciales: (detalle.puntos * cantidad), kilos: null, deudaInicial: null })
    
    const resumen = ({
        tipoTrueque: detalle.tipoRopa,
        prenda:  ` ${ropa} / ${talla} `,
        cantidad: cantidad,
        deuda: "",
        puntos: (detalle.puntos * cantidad)
    })

    truequeDetalle.save()

    res.json({
        truequeDetalle: truequeDetalle._id,
        resumen:        resumen
    })
    
};

const agregarSegunda = async(req, res = response) => {
    
    const { ropa, cantidad } = req.body;

    const detalle =  await Detalle.findOne({ ropa: ropa })

    const truequeDetalle = new TruequeDetalle({ idDetalle: detalle._id, cantidad: cantidad, puntosIniciales: (detalle.puntos * cantidad), kilos: null, deudaInicial: null })
    
    const resumen = ({
        tipoTrueque: detalle.tipoRopa,
        prenda:   ropa,
        cantidad: cantidad,
        deuda: "",
        puntos: (detalle.puntos * cantidad)
    })

    truequeDetalle.save()

    res.json({
        truequeDetalle: truequeDetalle._id,
        resumen:        resumen
    })
    
};

const agregarDescuento = async(req, res = response) => {
    
    const { ropa, cantidad } = req.body;

    const detalle =  await Detalle.findOne({ ropa: ropa })

    const truequeDetalle = new TruequeDetalle({ idDetalle: detalle._id, cantidad: cantidad, puntosIniciales: (detalle.puntos * cantidad), kilos: null, deudaInicial: null })
    
    const resumen = ({
        tipoTrueque: detalle.tipoRopa,
        prenda:  ropa,
        cantidad: cantidad,
        deuda: "",
        puntos: (detalle.puntos * cantidad)
    })

    truequeDetalle.save()

    res.json({
        truequeDetalle: truequeDetalle._id,
        resumen:        resumen
    })
    
};

const agregarDonacion = async(req = request, res = response) => {
    const { ropa, cantidad } = req.body;

    const detalle =  await Detalle.findOne({ ropa: ropa })

    const truequeDetalle = new TruequeDetalle({ idDetalle: detalle._id, cantidad: cantidad, puntosIniciales: (detalle.puntos * cantidad), kilos: null, deudaInicial: null })
    
    const resumen = ({
        tipoTrueque: detalle.tipoRopa,
        prenda:  ropa,
        cantidad: cantidad,
        deuda: "",
        puntos: (detalle.puntos * cantidad)
    })

    truequeDetalle.save()

    res.json({
        truequeDetalle: truequeDetalle._id,
        resumen:        resumen
    })
}

const agregarReciclaje = async(req = request, res = response ) => {
    const { cantidad, kilos } = req.body;

    const detalle =  await Detalle.findOne({ tipoRopa: 'RECICLAJE' })

    const truequeDetalle = new TruequeDetalle({ idDetalle: detalle._id, cantidad: cantidad, puntosIniciales: null, kilos: kilos, deudaInicial: (kilos * detalle.deuda)  })
    
    const resumen = ({
        tipoTrueque: detalle.tipoRopa,
        prenda:  "",
        cantidad: "",
        deuda: (detalle.deuda * kilos),
        puntos: 0
    })

    truequeDetalle.save()

    res.json({
        truequeDetalle: truequeDetalle._id,
        resumen:        [resumen]
    })
}




module.exports = {
    agregarPremium,
    agregarSegunda,
    agregarDescuento,
    agregarDonacion,
    agregarReciclaje
}