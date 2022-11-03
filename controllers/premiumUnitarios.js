const { response, request } = require('express');
const { body } = require('express-validator');
const XLSX = require('xlsx');
const { db } = require('../models/premiumUnitario');



const PremiumUnitario = require('../models/premiumUnitario');


const premiumUnitariosPost = async(req = request, res = response) => {
    /* for( let i = 0; i < req.body.length; i++){
        console.log(req.body[i])
    } */
    const excelPremium = XLSX.readFile("C:\\Users\\souls\\Desktop\\restserver - travieso\\Premium.xlsx"
    );
    const nombreHoja = excelPremium.SheetNames
    const datos = XLSX.utils.sheet_to_json(excelPremium.Sheets['Premium'])
    /* console.log(nombreHoja[0]) */
    console.log('Datos:')
    console.log(datos)
    console.log('----------------------------------------------------------------------------')
    
    // Ejemplo mati 
    const salida = []; // pa guardar las vainas procesadas
    
    datos.forEach(dato => {
        //Muestra el dato en el que se situa ahora
        console.log('iterando en', dato);

        //Paseo por keys de un objeto
        for (const [key, value] of Object.entries(dato)) {
            if (key == '__EMPTY') continue;

            console.log(`Valores actuales ${key}: ${value}`)
            
            const realg4life = {
                ropa: dato['__EMPTY'],
                talla: key,
                puntos: value,
            }

            console.log(realg4life)
            const {talla, puntos, ropa} = realg4life
            const premiumUnitario = new PremiumUnitario({talla, puntos, ropa})
            premiumUnitario.save()
            salida.push(realg4life)


        }
    });

    console.log({salida})


    res.json({
        msg: 'post API - controllers'
    })
}

const premiumUnitarioDelete = async(req = request, res = response) => {
    if( !PremiumUnitario ){
        
    }
    PremiumUnitario.collection.drop();
    res.json({
        msg: 'delete API - controllers'
    })

}

module.exports = {
    premiumUnitariosPost,
    premiumUnitarioDelete
    
}