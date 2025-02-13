const nodemailer=require('nodemailer');

const sendEmail=async(options)=>{


    const transporter=nodemailer.createTransport({

        service:'gmail',
        auth:{
            user:'jee2006025@gmail.com',
            pass:'smkyclelvgamlyzs'
        }
    })

    const mail={

        from:'jee2006025@gmail.com',
        to:options.email,
        subject:options.subject,
        text:options.message
    }


    await transporter.sendMail(mail)

}

module.exports=sendEmail;