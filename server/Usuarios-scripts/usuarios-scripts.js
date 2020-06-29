var Registro=require('./registro-usuario.js');
var Loggeo=require('./login-usuario.js');
var Perfil=require('./perfil-usuario.js');
var Producto=require('../Producto-scripts/get-productos.js');

function registroUsuarios (req,res,dataBase,Auth) {
  let Email = req.body.Email;
  let Nombre = req.body.Nombre;
  let Apellido = req.body.Apellido;
  let Telefono = req.body.Telefono;
  let Pass = req.body.Pass;

  let promesaRegistro = Registro.Registro(Auth,dataBase,Email,Nombre,Apellido,Telefono,Pass)
  promesaRegistro.then(function(value){
    res.send({status:'OK'});
  })
  .catch(function(error) {
    res.send({status:'error',contentStatus:error});
  });
}
function loggeoUsuarios (req,res,dataBase) {
  let idUser = req.body.idUser;

  let promesaRegistro = Loggeo.Loggeo(dataBase,idUser)
  promesaRegistro.then(function(user){
    if (user.val()) {
      if (user.val().Bloqueado) {
        res.send({status:'401'});
      }
      else{
        if (user.val().key =='yIp8C3YGYJRwvQFP9w24SFpGVFd2') {
          res.send({status:'OK',mode:1});
        }
        else{
          res.send({status:'OK',mode:0});
        }
      }
    }
    else{
      res.send({status:'404'});
    }
  })
  .catch(function(error) {
    res.send({status:'error',contentStatus:error});
  });
}
function TomarPerfil(req,res,dataBase){
  let idUser = req.body.idUser.uid;
  let promesaGetPerfil = Perfil.Tomar(dataBase,idUser)
  promesaGetPerfil.then(function(user){
    let usuario=user.val()
    delete usuario.Tarjetas;
    delete usuario.Direcciones;

    if (user.val()) {
      if (user.val().Bloqueado) {
        res.send({status:'401'});
      }
      else{
        res.send({status:false,value:usuario});
      }
    }
    else{
      res.send({status:'404'});
    }
  })
  .catch(function(error) {
    res.send({status:'error',contentStatus:error});
  });
}





////////////////METODOS DE CARRITO////////////////////
function TomarTotalItemsCarrito (req,res,dataBase){
  var ref=dataBase.ref('/Carrito/' + req.body.idUser);
  let values=[];
  var promesa=new Promise(function(resolve,reject){
    ref.on('value',snapShot=>{
      if(snapShot.exists()){
        snapShot.forEach(snapBaby=>{
          values.push(snapBaby.val());
        })
      }else {
        resolve({status:'OK',carrito:values=[]})
      } //if exists
      resolve({status:'OK',carrito:values});
    }) // ref.on
  }) // promesa
  return promesa;
}
function TomarCarrito(req,res,dataBase){
  let respuestaCarrito = TomarTotalItemsCarrito(req,res,dataBase);
  respuestaCarrito.then((data)=>{
    res.send(data)
  })
}
function EliminarCarrito(req,res,dataBase){
  var ref=dataBase.ref('/Carrito/' + req.body.idUser);
  ref.remove().then(()=>{
    res.send({status:'OK'})
  }).catch((error)=>{
    res.send({status:'404',error:error})

  })
}
function EliminarItemCarrito(req,res,dataBase){
  var ref=dataBase.ref('/Carrito/' + req.body.idUser+'/'+req.body.idItemCarrito);
  ref.remove().then(()=>{
    res.send({status:'OK'})
  }).catch((error)=>{
    res.send({status:'404',error:error})

  })
}
function SubirItemCarrito (req,res,dataBase){
  let itemCarrito = req.body;
  var refDaComponentes = dataBase.ref('/Carrito/' + req.body.idUser);
  var PushComponentes=refDaComponentes.push();
  PushComponentes.set({
    idItemCarrito:PushComponentes.key,
    idProducto:itemCarrito.idProducto,
    imgProducto:itemCarrito.imgProducto,
    nombreProducto:itemCarrito.nombreProducto,
    cantidadProducto:itemCarrito.cantidadProducto,
    cantidadPorItem:itemCarrito.cantidadPorItem,
    unidadProducto:itemCarrito.unidadProducto,
  }).then(()=>{
    res.send({status:'OK'})
  }).catch((error)=>{
    res.secnd({status:'404',error:error})
  })
}
function TomarPrecioTotalCarrito (req,res,dataBase){
  let respuestaCarrito = TomarTotalItemsCarrito(req,res,dataBase);
  respuestaCarrito.then((data)=>{
      let ArrayPromesas = [];
      let Total=0;
      let Totalitems = 0;
      if (data) {
          data.carrito.forEach((it,index,ArrayFile)=>{
            let respuestaStorage = Producto.TomarProductoId(dataBase,it.idProducto,it.nombreProducto);
            ArrayPromesas.push(
              respuestaStorage.then((producto)=>{
                if (producto) {
                  let subTotalProducto = parseInt(producto.productoUnico.precioDescuentoProducto)*parseInt(it.cantidadProducto);
                  Total = Total + subTotalProducto;
                  Totalitems += it.cantidadProducto;
                }
              }).catch(error=>{
                console.log(error);
              })
            )
          })
        Promise.all(ArrayPromesas)
        .then(()=>{
          res.send({status:'OK',total:Total,totalItems:Totalitems})
        })
      }
    else{
      res.send({status:'OK',total:Total,totalItems:Totalitems})

    }
  })
}





exports.TomarTotalItemsCarrito=TomarTotalItemsCarrito;
exports.EliminarCarrito=EliminarCarrito;
exports.EliminarItemCarrito=EliminarItemCarrito;
exports.TomarPrecioTotalCarrito=TomarPrecioTotalCarrito;
exports.TomarCarrito=TomarCarrito;
exports.SubirItemCarrito =SubirItemCarrito;
exports.registroUsuarios=registroUsuarios;
exports.loggeoUsuarios=loggeoUsuarios;
exports.TomarPerfil=TomarPerfil;
