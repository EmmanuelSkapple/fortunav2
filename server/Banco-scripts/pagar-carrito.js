var Perfil=require('../Usuarios-scripts/perfil-usuario.js');
var ValidarTarjeta=require('./ValidarTarjeta.js');
var ClienteOpenPay = require('../OpenPay-scripts/cliente-script.js');
var CargoOpenPay = require('../OpenPay-scripts/cargos-scripts.js');





async function pagarCarrito(bd,OpenPay,req,res){
let PagoData = req.body;
let dataTarjeta = await ValidarTarjeta.TarjetaDebito(bd,PagoData.idUser,PagoData.idTarjeta,PagoData.cvvAutorizacion);
if (dataTarjeta.status == 'OK') {
  let openPayRequest = ClienteOpenPay.ValidaNuevoCliente(bd,OpenPay,PagoData.idUser);
    openPayRequest.then(async function(data){
      if (data.status =='OK') {
        let userPerfil = await Perfil.Tomar(bd,PagoData.idUser);
        CargoOpenPay.NuevoCargo(req,res,bd,OpenPay,userPerfil,dataTarjeta);

      }
      else{
        res.send(data);
      }
    })


}else{
  res.send(dataTarjeta);
}
}



exports.pagarCarrito=pagarCarrito;
