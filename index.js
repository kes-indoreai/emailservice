const nodemailer = require('nodemailer'); 
let mailTransporter = nodemailer.createTransport({ 
	service: 'Gmail', 
	   host: 'smtp.gmail.com',
    port: 465,
    secure: true,
	auth: { 
		user: 'indoreai2020@gmail.com', 
		pass: 'Admin@123'
	} 
}); 

'use strict';
const express = require('express');

const  cors  =  require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
const router = express.Router();

app.get('/another', (req, res) => res.json({ route: req.originalUrl }));
app.post('/contactus', (req, res) => {
    let reqObj = req.body;
    let sendEmail= ['keshav@indoreai.com', 'mukesh@indoreai.com','deepak@indoreai.com','indoreai2020@gmail.com'];
    sendEmail.forEach(row=>{
        let mailDetails = { 
            from: reqObj['toSender'] , 
           // to: 'indoreai2020@gmail.com', 
            //recipients = ['keshav@indoreai.com', 'mukesh@indoreai.com','deepak@indoreai.com'],
            subject: 'Contact Us Indore AI', 
            text: reqObj['message'],
            html: `<!DOCTYPE html>
            <html>
            <head>
            <title>IndoreAI Email Template</title>
            </head>
            <body style="margin: 0; padding: 0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
            <td style="padding: 20px 0 30px 0;">
            
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
            <tr>
            <td align="center" bgcolor="#18214c" style="padding: 15px 0 15px 0;">
            <img src="https://www.indoreai.com/images/IndoreAi_logo.png" alt="logo" width="140" height="29" style="display: block;" />
            </td>
            </tr>
            <tr>
            <td style="padding: 20px 30px 20px 30px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
            <tr>
            <td style="color: #153643; font-family: Arial, sans-serif;padding: 6px 0;">
            <p style="font-size: 14px; margin: 0;">Name</p>
            </td>
            <td style="color: #153643; font-family: Arial, sans-serif;padding: 6px 0;">
            <p style="font-size: 14px; margin: 0;">${reqObj['name']}</p>
            </td>
            </tr>
            
            <tr>
            <td style="color: #153643; font-family: Arial, sans-serif;padding: 6px 0;">
            <p style="font-size: 14px; margin: 0;">Email</p>
            </td>
            <td style="color: #153643; font-family: Arial, sans-serif;padding: 6px 0;">
            <p style="font-size: 14px; margin: 0;">${reqObj['toSender']}</p>
            </td>
            </tr>
            
            <tr>
            <td style="color: #153643; font-family: Arial, sans-serif;padding: 6px 0;">
            <p style="font-size: 14px; margin: 0;">Phone</p>
            </td>
            <td style="color: #153643; font-family: Arial, sans-serif;padding: 6px 0;">
            <p style="font-size: 14px; margin: 0;">${reqObj['phone']}</p>
            </td>
            </tr>
            
            <tr>
            <td style="color: #153643; font-family: Arial, sans-serif;padding: 6px 0;">
            <p style="font-size: 14px; margin: 0;">Message</p>
            </td>
            <td style="color: #153643; font-family: Arial, sans-serif;padding: 6px 0;">
            <p style="font-size: 14px; margin: 0;">${reqObj['message']} Text</p>
            </td>
            </tr>
            
            
            
            
            </table>
            </td>
            </tr>
            <tr>
            <td bgcolor="#18214c" style="padding: 10px 30px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
            <tr>
            
            <td>
            
            </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            
            </td>
            </tr>
            </table>
            </body>
            </html>`
        }; 
        mailDetails.to = row;
        mailTransporter.sendMail(mailDetails, function(err, data) { 
            if(err) { 
		    console.error(err);
                res.json({
                    status: 500,
                    message: "Internal server error!."
                })
            } else { 
               res.json({
                   status: 200,
                   message: "Email sending successfully."
               })
            } 
        }); 
    })
 
});


//app.use('/.netlify/functions/server', router);  // path must route to lambda

app.listen(3000,() =>{
    console.error(" server listing port number 3000")
})
//module.exports = app;
//module.exports.handler = serverless(app);
