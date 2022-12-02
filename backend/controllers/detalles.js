const { response, request } = require('express');

const Detalle = require('../models/detalle')

const obtenerRopasTallasPremium = async( req, res = response ) => {
   const premiums = await Detalle.find({ tipoRopa: 'PREMIUM' })
   let listaTallas = [];
   let listaRopas = [];
   
   premiums.forEach(premium => {
        listaRopas.push(premium.ropa);
        listaTallas.push(premium.talla)
   });

    listaRopas = listaRopas.filter((item,index)=>{
    return listaRopas.indexOf(item) === index;
    })

    listaTallas = listaTallas.filter((item,index)=>{
        return listaTallas.indexOf(item) === index;
        })
    
   res.json({
       listaRopas:  listaRopas,
       listaTallas: listaTallas 
    })
};

const obtenerPrendasSegunda = async( req, res ) => {
    const segundas = await Detalle.find({ tipoRopa: 'SEGUNDA' })
    let listaPrendas = [];
    
    segundas.forEach(segunda => {
         listaPrendas.push(segunda.ropa);
    });

    listaPrendas = listaPrendas.filter((item,index)=>{
        return listaPrendas.indexOf(item) === index;
     })
     
    res.json({
        listaPrendas:  listaPrendas,
     })
};

const obtenerPrendasDonacion = async( req, res ) => {
    const donaciones = await Detalle.find({ tipoRopa: 'DONACION' })
    let listaPrendas = [];
    
    donaciones.forEach(donacion => {
         listaPrendas.push(donacion.ropa);
    });

    listaPrendas = listaPrendas.filter((item,index)=>{
        return listaPrendas.indexOf(item) === index;
     })
     
    res.json({
        listaPrendas:  listaPrendas,
     })
};

const obtenerPrendasDescuento = async( req, res ) => {
    const descuentos = await Detalle.find({ tipoRopa: 'DESCUENTO' })
    let listaPrendas = [];
    
    descuentos.forEach(descuento => {
         listaPrendas.push(descuento.ropa);
    });

    listaPrendas = listaPrendas.filter((item,index)=>{
        return listaPrendas.indexOf(item) === index;
     })
     
    res.json({
        listaPrendas:  listaPrendas,
     })
};




module.exports = {
    obtenerRopasTallasPremium,
    obtenerPrendasSegunda,
    obtenerPrendasDonacion,
    obtenerPrendasDescuento
}