var TomarProductos = require("./get-productos.js");

function NuevoProductoSencillo(req,res,dataBase) {
  var refDaComponentes = dataBase.ref("Productos/"+req.body.idUser);
  var PushComponentes=refDaComponentes.push();
  PushComponentes.set({
    idProducto:PushComponentes.key,
    idUser:req.body.idUser,
    fechaCreacion:new Date().getTime(),
    fechaUsuario:req.body.timeStamp,
    categoria:req.body.categoria,
    subCategoria:req.body.subCategoria,
    StatusProducto:req.body.StatusProducto,
    imagenes:req.body.imagenes,
    nombreProducto:req.body.nombreProducto,
    urlProducto:GetUrlProducto(req.body.nombreProducto),
    descripcionProducto:req.body.descripcionProducto,
    marcaProducto:req.body.marcaProducto,
    cantidadProducto:req.body.cantidadProducto,
    unidadProducto:req.body.unidadProducto,
    precioProducto:req.body.precioProducto,
    precioDescuentoProducto:req.body.precioDescuentoProducto,
    palabrasClaves:req.body.palabrasClaves,
    ubicacionProducto:req.body.ubicacionProducto,
    tipoEntrega:req.body.tipoEntrega,
    rangoEnvioGratis:req.body.rangoEnvioGratis,
    CostoKmAdiconal:req.body.CostoKmAdiconal,
    estiloProducto:req.body.estiloProducto,
    colorProducto:req.body.colorProducto,
    alcProducto:req.body.alcProducto,
    presentacionProducto:req.body.presentacionProducto,
  }).then(function(){
    res.send({status:'OK'});
  })
  .catch(function(error) {
    res.send({status:'error',contentStatus:error});
  });
}
function ActualizarProductoSencillo(req,res,dataBase) {
  var refDaComponentes = dataBase.ref("Productos/"+req.body.idUser+'/'+req.body.idProducto);
  refDaComponentes.update({
    categoria:req.body.categoria,
    subCategoria:req.body.subCategoria,
    StatusProducto:req.body.StatusProducto,
    nombreProducto:req.body.nombreProducto,
    urlProducto:GetUrlProducto(req.body.nombreProducto),
    descripcionProducto:req.body.descripcionProducto,
    marcaProducto:req.body.marcaProducto,
    cantidadProducto:req.body.cantidadProducto,
    unidadProducto:req.body.unidadProducto,
    precioProducto:req.body.precioProducto,
    precioDescuentoProducto:req.body.precioDescuentoProducto,
    estiloProducto:req.body.estiloProducto,
    colorProducto:req.body.colorProducto,
    alcProducto:req.body.alcProducto,
    presentacionProducto:req.body.presentacionProducto,
  }).then(function(){
    res.send({status:'OK'});
  })
  .catch(function(error) {
    res.send({status:'error',contentStatus:error});
  });

}
function EliminarProductoSencillo(req,res,dataBase) {
  var refDaComponentes = dataBase.ref("Productos/"+req.body.idUser+'/'+req.body.idProducto);
  refDaComponentes.remove().then(function(){
    res.send({status:'OK'});
  })
  .catch(function(error) {
    res.send({status:'error',contentStatus:error});
  });

}


function TomarProductosPromocion(req,res,dataBase){
  let promesaPromocion = TomarProductos.TomarAllProductos(dataBase);
  promesaPromocion.then(function(e){
    res.send({status:true,datos:e})
  });
  promesaPromocion.catch(function(error){
    res.send({status:false,contentStatus:error})
  })
}

function TomarProductosRelacionados(req,res,dataBase){
  TomarAllProductos(dataBase);
}

function GetUrlProducto(nombre){
  return(nombre.replace(/ /g, "-"));
}
function TomarProductosWithId(req,res,dataBase){
  let promesaProductoId = TomarProductos.TomarProductoId(dataBase,req.body.idProducto,req.body.NameProducto);
  promesaProductoId.then(function(e){
    res.send({status:true,producto:e.productoUnico})
  });
  promesaProductoId.catch(function(error){
    res.send({status:false,errorCode:error})
  })
}

function TomarProductosPorUsuario(req,res,dataBase){
  let promesaProductoUsuario = TomarProductos.TomarProductosPorUsuario(dataBase,req.body.idUser);
  promesaProductoUsuario.then(function(e){
     res.send({status:true,productosActivos:e.Activos,productosNoActivos:e.NoActivos})
  });
  promesaProductoUsuario.catch(function(error){
    res.send({status:false,errorCode:error})
  })
}




//Funcion necesaria de cambiar a archivos individuales

//Funcion necesaria de cambiar a archivos individuales

exports.EliminarProductoSencillo = EliminarProductoSencillo;
exports.ActualizarProductoSencillo = ActualizarProductoSencillo;
exports.NuevoProductoSencillo=NuevoProductoSencillo;
exports.TomarProductosPromocion=TomarProductosPromocion;
exports.TomarProductosWithId =TomarProductosWithId;
exports.TomarProductosPorUsuario =TomarProductosPorUsuario;
