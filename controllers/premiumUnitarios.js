const { response, request } = require('express');

const PremiumUnitario = require('../models/premiumUnitario')

const obtenerTallas = async(req = request, res = response) => {

const listaTallas = [];
const tallas = await PremiumUnitario.find()
//Recorrer la colección para obtener las tallas
     tallas.forEach(talla => {
        const cosita = talla.talla
        listaTallas.push(cosita)
     });
// Eliminar Datos duplicados
const result = listaTallas.filter((item,index)=>{
    return listaTallas.indexOf(item) === index;
})

res.json( result )    

}

const obtenerRopas = async(req = request, res = response) => {

    const listaRopas = [];
    const ropas = await PremiumUnitario.find()
    //Recorrer la colección para obtener las tallas
         ropas.forEach(ropa => {
            const cosita = ropa.ropa
            listaRopas.push(cosita)
         });
    // Eliminar Datos duplicados
    const result = listaRopas.filter((item,index)=>{
        return listaRopas.indexOf(item) === index;
    })
    
    res.json( result )    
    
    }




module.exports = {
    obtenerTallas,
    obtenerRopas
}