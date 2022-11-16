const { response, request } = require('express');


const Premium = require('../models/premium');

const premiumPost = async(req = request, res = response) => {
    res.json({
        msg: 'Post API - controllers'
    })
}

module.exports = {
    premiumPost
}