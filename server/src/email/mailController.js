const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({ 
  host: "smtp-mail.outlook.com",
  secureConnection: false,
  port: 587,
  tls: {
    ciphers: 'SSLv3'
  },
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_P
  },
  tls: {
    rejectUnauthorized: false
  }
})

const emailBuilder = (email, senha) => {
  return {
    from: process.env.MAIL,
    to: email,
    subject: 'Cadastro Caminho Da luz',
    text: 'Caminho da Luz',
    html: `<b>Centro Espírita Caminho da Luz</b><br><b>Ola! Seja bem Vindo a equipe!</b><br><p>Este é o email de confirmação de cadastro no site do posto de assistência do centro espírita caminho da luz. Acesse o site e altere a senha inicial<br></p><p></p><a href="https://caminho-da-luz.herokuapp.com/">https://caminho-da-luz.herokuapp.com/</a></p><p></p>Usuário: <b>${email}</b></p><p></p>Senha: <b>${senha}</b></p>`
  }
}

exports.sendMail = (email, pass)=>{
  transporter.sendMail(emailBuilder(email,pass), (err, info) => { // Função que, efetivamente, envia o email.
    if (err) {
      console.log(err, email,pass)
      throw "não foi possível enviar o email "
    }    
    return info
  })
}