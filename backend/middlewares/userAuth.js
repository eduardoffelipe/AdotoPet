const jwt = require('jsonwebtoken')
const jwtSeed = require('../config/config.json')['jwtSeed']
const models = require('../models')

module.exports = () => async function (req, res, next) {

  try {
    const authHeader = req.headers.authorization

    if(!authHeader){
      return res.status(401).send({error: 'Token não informado'})
    }

    const parts = authHeader.split(" ")

    if(!parts.lengh === 2){
      return res.status(401).send({error: 'Token invalido'})
    }

    const [scheme, token] = parts

    if( !/^Bearer$/i.test(scheme) ){
      return res.status(401).send({error: 'Formato de token invalido'})
    }

    jwt.verify(token, jwtSeed, async (err,decoded) => {
      if(err){
        return res.status(401).send({error: 'Token invalido'})
      }
      const user = await models.Usuario.findOne({
        where:{
          id: decoded.id
        }
      })

      if(!user){
        return res.status(401).send({error: 'Usuario não encontrado ou inativo'})
      }

      req.session = {user: user.dataValues}
      next()
    })

  } catch (err){
    console.error(err);
    return res.status(500).send()

  }
}
