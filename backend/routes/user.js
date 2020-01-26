const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const models = require('../models')
const jwt = require('jsonwebtoken')
const jwtSeed = require('../config/config.json')['jwtSeed']
const moment = require('moment')
const authMiddleware = require('../middlewares/userAuth')

function createWebToken (id, days) {
  const oneDay = 86400
  return jwt.sign(id, jwtSeed, {
    expiresIn: oneDay * days,
  })
}

router.post('/register', async (req, res) => {
  try {

    const { cidadeNome, cidadeSigla, estadoSigla, estadoNome, keepConnection, ...clientData } = req.body
    debugger;
    let cidade = await models.Cidade.findOne({
      where:{ sigla: cidadeSigla }
    })

    const emailWithAccount = !!(await models.Usuario.count({
      where:{
        email: clientData.email
      }
    }))

    if(emailWithAccount) return res.status(400).send({error: 'Email já cadastrado'})

    if(!cidade) {
      cidade = await models.Cidade.create({
        nome: cidadeNome,
        sigla: cidadeSigla,
        estadoNome,
        estadoSigla,
      })
    }

    clientData.dataNascimento = moment(clientData.dataNascimento, 'DD/MM/YYYY').toDate()
    const days = keepConnection ? 31 : 1 //Se o parametro keepConnection == true ele mantem o token como ativo por 1 mes


    const newUser = await models.Usuario.create(clientData)
    const token = createWebToken({id: newUser.id}, days)

    const sessao = await models.Sessao.create({
      token: token,
      dataInicio: Date.now(),
      dataFim: null,
      UsuarioId: newUser.id
    })

    newUser.dataValues.senha = undefined


    res.send({
      user: newUser.dataValues,
      token: token
    })

  } catch (err) {
    console.error(err);
    res.status(500).send()
  }

})

router.use('/', authMiddleware() )

router.get('/', async (req, res) => {
  res.send({status: 'ok'})
})

module.exports = router
