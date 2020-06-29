var Perfil=require('../Usuarios-scripts/perfil-usuario.js');
var Carrito=require('../Usuarios-scripts/usuarios-scripts.js');
var Producto=require('../Producto-scripts/get-productos.js');
var Usuario=require('../Usuarios-scripts/usuarios-scripts.js');
var Direcciones=require('../Direcciones-scripts/direcciones-scripts.js');
var EmailScript = require("../Email-scripts/email-scripts.js");



async function NuevoCargoOpenPay(req,res,bd,OpenPay,dataUser,dataTarjeta,TotalAPagar,TotalItems){
  let KeyTransaccion = bd.ref().push().key;
  var chargeRequest = {
   'source_id' : dataTarjeta.datosTarjetaCorrecto.idTarjetaOpenPay,
   'method' : 'card',
   'cvv2' : dataTarjeta.cvvCorrecto,
   'amount' : TotalAPagar,
   'currency' : 'MXN',
   'description' : 'Compra en Tienda Fortuna por '+TotalItems+" producto(s)",
   'order_id' : KeyTransaccion,
   'device_session_id' : req.body.idDeviceSession,
}

var promesa=new Promise(function(resolve,reject){
  OpenPay.customers.charges.create(dataUser.val().idOpenPay,chargeRequest, function(error, charge) {
    if (error) {
      resolve({status:505,error:error.description})
    }else{
      resolve({status:'OK',cargo:charge})
    }
  });
})
return promesa;
}



async function NuevoCargo (req,res,bd,OpenPay,dataUser,dataTarjeta){
  let respuestaCarrito = Carrito.TomarTotalItemsCarrito(req,res,bd);
  respuestaCarrito.then((data)=>{
      let ArrayPromesas = [];
      let Total=0;
          data.carrito.forEach((it,index,ArrayFile)=>{
            let respuestaStorage = Producto.TomarProductoId(bd,it.idProducto,it.nombreProducto);
            ArrayPromesas.push(
              respuestaStorage.then((producto)=>{
                if (producto) {
                  let subTotalProducto = parseInt(producto.productoUnico.precioDescuentoProducto)*parseInt(it.cantidadProducto);
                  Total = Total + subTotalProducto;
                }
              }).catch(error=>{
                console.log(error);
              })
            )
          })
        Promise.all(ArrayPromesas)
        .then(()=>{
          NuevoCargoOpenPay(req,res,bd,OpenPay,dataUser,dataTarjeta,Total,data.carrito.length).then(async(datos)=>{
            if (datos.status == "OK") {
              let carritoItems = await  Usuario.TomarTotalItemsCarrito(req,res,bd);
              let direccionItem = await  Direcciones.TomarDireccionUnica(bd,req.body.idDireccion,req.body.idUser);
              RegistrarCargoDB(req,res,bd,dataUser,dataTarjeta,datos.cargo,carritoItems,direccionItem.val());

            }
          });
        })
  })
}



function RegistrarCargoDB (req,res,bd,userPerfil,dataTarjeta,cargo,carritoItems,direccionItem){
  var ref=bd.ref('Transacciones/'+req.body.idUser+'/'+cargo.order_id);
    ref.set({
      Status:0,
      idTransaccion:cargo.order_id,
      fechaCreacion:cargo.creation_date,
      idUser: req.body.idUser,
      carritoItems:carritoItems.carrito,
      direccionEnvio: direccionItem,
      cargoInfo:{
        idTarjeta:req.body.idTarjeta,
        TarjetaDisplay:dataTarjeta.datosTarjetaCorrecto.displayNumber,
        idTarjetaOpenPay:cargo.card.id,
        idAutorizacion:cargo.authorization,
        descripcion:cargo.description,
        idCargoOpenPay:cargo.id,
        Amount:cargo.amount,
        Status:cargo.status,
        TipoTransaccion:cargo.transaction_type,
      }
    },function(error) {
        if (error) {
          return(error); //error si hay problemas al subir Firebase
          res.send({status:'505',error:error})
        } else {
          MandarCorreo(res,userPerfil.val().Nombre,userPerfil.val().Email,cargo,carritoItems,direccionItem);
          borrarCarrito(req,res,bd);

          res.send ({status:'OK'});
        }
      }
    );
}


function MandarCorreo (res,UserName,Email,cargo,carritoItems,direccionItem){
  let datos={
    cargo:cargo,
    carritoItems:carritoItems,
    direccionItem:direccionItem,
  }
  EmailScript.SendEmail(res,UserName,Email,datos);
}

function borrarCarrito (req,res,bd){
  var ref=bd.ref('Carrito/'+req.body.idUser);
    ref.remove();
}


exports.NuevoCargo=NuevoCargo;
