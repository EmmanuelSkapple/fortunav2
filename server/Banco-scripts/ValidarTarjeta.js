var crypto = require('crypto');


async function TarjetaDebito (bd,idUser,idTarjeta,cvvAutorizacion){
  let respuestaTarjetas= await TomarTarjeta(bd,idUser);
    let Tarjetas = respuestaTarjetas.val();
    if (Tarjetas[idTarjeta]) {
      let name = Tarjetas[idTarjeta].CardNumber+Tarjetas[idTarjeta].CardTitular+Tarjetas[idTarjeta].mesExpiracion+Tarjetas[idTarjeta].anoExpiracion+cvvAutorizacion;
      let hash = crypto.createHash('md5').update(name).digest('hex');
      if (hash == idTarjeta) {
        return({status:'OK',datosTarjetaCorrecto:Tarjetas[idTarjeta],cvvCorrecto:cvvAutorizacion})
      }
      else{
        return({status:505,error:'cvv incorrecto'})
      }
    }
    else{
      return({status:404,error:'Tarjeta no existe'})
    }
}

function TomarTarjeta(bd,idUser){
  return bd.ref('Usuarios/'+idUser+'/Tarjetas').once('value');
}




exports.TarjetaDebito =TarjetaDebito;
