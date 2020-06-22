var crypto = require('crypto');
var Carrito=require('./pagar-carrito.js');
var ClienteOpenPay = require('../OpenPay-scripts/cliente-script.js');
var TarjetasOpenPay = require('../OpenPay-scripts/tarjetas-script.js');
var Perfil=require('../Usuarios-scripts/perfil-usuario.js');

function NuevaBancaria(req,res,bd) {

  var ref=bd.ref('Usuarios/'+req.body.idUser+'/Bancaria');
  ref.set({
    NoCuenta:req.body.NoCuenta,
    CLABE:req.body.CLABE,
    Banco: req.body.Banco,
    Titular: req.body.Titular,
    FileComprobante:req.body.FileComprobante,
  }).then(function(){
      res.send({ status: 'OK' });
   })
   .catch(function(error){
     res.send({status:'error',contentStatus:error});
   });
}

//Se guarda una nueva tarjeta
async function NuevaTarjeta(bd,OpenPay,req,res){
  let dataTarjeta =req.body;

  let openPayRequest = ClienteOpenPay.ValidaNuevoCliente(bd,OpenPay,dataTarjeta.idUser);
    openPayRequest.then(async function(data){
      if (data.status =='OK') {
        let userPerfil = await Perfil.Tomar(bd,dataTarjeta.idUser);
        let respuestaTarjetaOpenPay = TarjetasOpenPay.RegistrarTarjeta(bd,OpenPay,userPerfil.val().idOpenPay,dataTarjeta);
        respuestaTarjetaOpenPay.then((data)=>{
          if (data.status == 'OK') {
            var name = dataTarjeta.CardNumber+dataTarjeta.CardTitular+dataTarjeta.mesExpiracion+dataTarjeta.anoExpiracion+dataTarjeta.cvv;
            var hash = crypto.createHash('md5').update(name).digest('hex');
            var displayNumber = dataTarjeta.CardNumber.replace(/(?<=\d{4})\d(?=\d{4})/g, "*");
            var ref=bd.ref('Usuarios/'+dataTarjeta.idUser+'/Tarjetas'+'/'+hash);
              ref.set({CardNumber:dataTarjeta.CardNumber,displayNumber:displayNumber,CardTitular: dataTarjeta.CardTitular,mesExpiracion: dataTarjeta.mesExpiracion,anoExpiracion: dataTarjeta.anoExpiracion,idTarjetaOpenPay:data.idTarjeta},function(error) {
                  if (error) {
                    return(error); //error si hay problemas al subir Firebase
                    res.send({status:'505',error:error})
                  } else {
                    res.send ({status:'OK'});
                  }
                }
              );
          }
          else{
            res.send(data)
          }
        })
      }
      else{
        res.send(data);
      }
    })
}



function EliminarTarjeta(bd,OpenPay,req,res){
  var ref=bd.ref('Usuarios/'+req.body.idUser+'/Tarjetas/'+req.body.idTarjeta);
  let respuestaTarjetaOpenPay = TarjetasOpenPay.EliminarTarjeta(bd,OpenPay,req.body.idUser,req.body.idTarjetaOpenPay);
  respuestaTarjetaOpenPay.then((data)=>{
    if (data.status == "OK") {
      ref.remove(function(error){
        if (!error) {
          res.send({status:'OK'})
        }
        else{
          res.send({status:'505',error:error})
        }
      })
    }else{
      res.send(data);
    }
  })
}

//Consulta las tarjetas de credito de el usuario (solo puede leer el dueño de la info)
function TomarTarjeta(bd,req,res){
  var ref=bd.ref('Usuarios/'+req.body.idUser+'/Tarjetas');
  let values=[];
  var promesa=new Promise(function(resolve,reject){
    ref.on('value',snapShot=>{
      if(snapShot.exists()){
        snapShot.forEach(snap=>{
            resolve(
              values.push({
              key:snap.key,
              displayNumber:snap.val().displayNumber,
              CardTitular:snap.val().CardTitular,
              mesExpiracion:snap.val().mesExpiracion,
              anoExpiracion:snap.val().anoExpiracion,
              idTarjetaOpenPay:snap.val().idTarjetaOpenPay,
            })
          )
        })
      }else {
        resolve(values=[])
      } //if exists
    }) // ref.on
  }) // promesa
  promesa.then(function(){
    res.send({status:'OK',tarjetas:values});
  }).catch(function(error){
    res.send({status:'505',error:error});

  });
}


function PagarCarrito(bd,OpenPay,req,res){
  Carrito.pagarCarrito(bd,OpenPay,req,res);

}



exports.PagarCarrito=PagarCarrito;
exports.EliminarTarjeta=EliminarTarjeta;
exports.NuevaTarjeta=NuevaTarjeta;
exports.TomarTarjeta=TomarTarjeta;
exports.NuevaBancaria=NuevaBancaria;
