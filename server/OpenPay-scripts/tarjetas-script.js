var Perfil=require('../Usuarios-scripts/perfil-usuario.js');

 async function RegistrarTarjeta(bd,OpenPay,idUserOpenPay,dataTarjeta){
   var cardRequest = {
      'card_number':dataTarjeta.CardNumber,
      'holder_name':dataTarjeta.CardTitular,
      'expiration_year':dataTarjeta.anoExpiracion,
      'expiration_month':dataTarjeta.mesExpiracion,
      'cvv2':dataTarjeta.cvv,
   };
   var promesa=new Promise(function(resolve,reject){
     OpenPay.customers.cards.create(idUserOpenPay,cardRequest,function(error,card){
       if (error) {
         resolve({status:505,error:error.description})
       }else{
         resolve({status:'OK',idTarjeta:card.id})
       }
     });
   })
  return promesa
}



 async function EliminarTarjeta(bd,OpenPay,idUser,idTarjetaOpenPay){
   let userPerfil = await Perfil.Tomar(bd,idUser);
   var promesa=new Promise(function(resolve,reject){
     OpenPay.customers.cards.delete(userPerfil.val().idOpenPay,idTarjetaOpenPay, function(error) {
       if (error) {
         resolve({status:505,error:error.description})
       }else{
         resolve({status:'OK'})
       }
     });
   })
  return promesa
}

exports.EliminarTarjeta=EliminarTarjeta;
exports.RegistrarTarjeta=RegistrarTarjeta;
