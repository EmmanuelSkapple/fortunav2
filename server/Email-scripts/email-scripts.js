const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
var path = require('path');

function SendEmail(res,username,email,datos,){
  var d =new Date();
  var mes= parseInt(d.getMonth()+1);
  var dia=d.getDate();
  if (mes <10) {mes = "0"+mes}
  if (dia<10) {dia = "0"+dia}

  var fecha=d.getFullYear()+'-'+mes +'-'+dia;
  var time = d.getHours() + ":" + d.getMinutes();
  var dateTime = fecha+' '+time;

  var smtpConfig = {
  host: 'mail.cervezafortuna.com',
  port: 465,
  secure: true, // use SSL
  auth: {
       user:'no-reply@cervezafortuna.com',
       pass:'&de3V6^n5J}o'
        }
  };

  var transporter = nodemailer.createTransport(smtpConfig);

  const handlebarOptions = {
    viewEngine: {
      extName: '.hbs',
      partialsDir: path.join(__dirname, 'views/partials'),
      layoutsDir: path.join(__dirname, 'views/layouts'),
    },
    viewPath: path.join(__dirname, 'views'),
    extName: '.hbs',
  };

  transporter.use('compile', hbs(handlebarOptions));

  var mailOptions = {
    from: "Cerveza Fortuna no-reply@cervezafortuna.com", // sender address
    to: email, // list of receivers
    subject: "Compra en linea en Cerveza Fortuna", // Subject line
    template: 'index',// html body
    context: {
          Nombre:username,
          email : email,
          datos:datos,
     }
  };
  transporter.sendMail(mailOptions, function(error, response){
    if(error){
     console.log(error);
    }else{
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
    });
  }


  function SendEmailStatus(res,username,email,idTransaccion){
    var d =new Date();
    var mes= parseInt(d.getMonth()+1);
    var dia=d.getDate();
    if (mes <10) {mes = "0"+mes}
    if (dia<10) {dia = "0"+dia}

    var fecha=d.getFullYear()+'-'+mes +'-'+dia;
    var time = d.getHours() + ":" + d.getMinutes();
    var dateTime = fecha+' '+time;

    var smtpConfig = {
    host: 'mail.cervezafortuna.com',
    port: 465,
    secure: true, // use SSL
    auth: {
         user:'no-reply@cervezafortuna.com',
         pass:'&de3V6^n5J}o'
          }
    };

    var transporter = nodemailer.createTransport(smtpConfig);

    const handlebarOptions = {
      viewEngine: {
        extName: '.hbs',
        partialsDir: path.join(__dirname, 'views-status/partials'),
        layoutsDir: path.join(__dirname, 'views-status/layouts'),
      },
      viewPath: path.join(__dirname, 'views-status'),
      extName: '.hbs',
    };

    transporter.use('compile', hbs(handlebarOptions));

    var mailOptions = {
      from: "Cerveza Fortuna no-reply@cervezafortuna.com", // sender address
      to: email, // list of receivers
      subject: "Hay nuevas noticias en tu compra", // Subject line
      template: 'index',// html body
      context: {
          Nombre:username,
          email : email,
          idTransaccion:idTransaccion,
       }
    };
    transporter.sendMail(mailOptions, function(error, response){
      if(error){
       console.log(error);
      }else{
      }

      // if you don't want to use this transport object anymore, uncomment following line
      //smtpTransport.close(); // shut down the connection pool, no more messages
      });

    }


exports.SendEmail = SendEmail;
exports.SendEmailStatus = SendEmailStatus;
