var Perfil=require('../Usuarios-scripts/perfil-usuario.js');


 async function ValidaNuevoCliente(bd,OpenPay,idUser){
   let userPerfil = await Perfil.Tomar(bd,idUser);
  var customerRequest = {
   'name': userPerfil.val().Nombre,
   'email': userPerfil.val().Email,
   'requires_account': false,
   'external_id':userPerfil.val().key,
   'phone_number': userPerfil.val().Telefono,
   };
   var promesa=new Promise(function(resolve,reject){
     OpenPay.customers.create(customerRequest,function(error,customer){
       if (error) {
         if (error.error_code == 2003) {
           resolve({status:'OK'})
         }else{
           resolve({status:505,error:error.description})
         }
       }else{
         var refUser = bd.ref("Usuarios/"+idUser);
         refUser.update({idOpenPay:customer.id})
         resolve({status:'OK'})
       }
     });
   })
  return promesa
}

exports.ValidaNuevoCliente=ValidaNuevoCliente;
