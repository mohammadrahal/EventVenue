const jwt = require('jsonwebtoken')

exports.generate = (id, role) => {
    const token = jwt.sign({id, role}, process.env.Token_Key,{
        expiresIn:'1h',
    })
    console.log(token)
    return token
}