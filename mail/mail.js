
const {google} = require("googleapis")
const mailer = require("nodemailer")


const CLIENT_ID = '229159196749-irq7o7cgbo1ocl7e3fvp7j0hq0pipohj.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URL = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04Fdr-W6bq4FXCgYIARAAGAQSNwF-L9Ir54Si6fxP99ta79gHJ4QoIPHWmFl8cGu7m0uynlwrhKCwy-gcmoPAjEhx_2Rt0AZV6AU'



const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );

  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
  });


  async function sendMail(messageTemplate){
    try {
        const accessToken = await oauth2Client.getAccessToken()

        const transport = await mailer.createTransport({
            service : "gmail",
            auth : {
                type : "OAUTH2",
                user : "khanal.aashis116@gmail.com",
                clientId : CLIENT_ID,
                clientSecret : CLIENT_SECRET,
                refreshToken : REFRESH_TOKEN,
                accessToken  : accessToken
            }
        })
        const productDetail = {
            name : "DELL",
            category : "laptop",
            model : "Inspiron",
            expire : '30/09/2023',
            vendor : "ITSolution"
        }
        
        const mailList = ['khanal.ghanashyam116@gmail.com' , 'khanal.aashis116@gmail.com']
        const emailOptions = {
            from : "RESUNGA_BANK <khanal.aashis116@gmail.com>",
            to : `${mailList.toString()}`,
            subject : "Product Renew Alert !!!",
            text : messageTemplate
            
        }


        const result = await transport.sendMail(emailOptions)
        return result
    }
    catch(error){
        return error
    }
  }

  module.exports = sendMail
