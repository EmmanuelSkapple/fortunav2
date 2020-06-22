function TomarProductosPorUsuario(bd,idUser){
  var ref=bd.ref('Productos/'+idUser);
  let valuesActivos=[];
  let valuesNoActivos=[];
  var promesa=new Promise(function(resolve,reject){
    ref.on('value',snapShot=>{
      if(snapShot.exists()){
        snapShot.forEach(snapBaby=>{
          if (snapBaby.val().StatusProducto == 1) {
            valuesActivos.push(snapBaby.val());
          }
          else if(snapBaby.val().StatusProducto == 0){
            valuesNoActivos.push(snapBaby.val());
          }

        })
      }else {
        resolve({Activos:valuesActivos=[],NoActivos:valuesNoActivos=[]})
      } //if exists
      resolve({Activos:valuesActivos,NoActivos:valuesNoActivos});
    }) // ref.on
  }) // promesa
  return promesa;
}


function TomarProductoId(bd,idProducto,NameProducto){
  var ref=bd.ref('Productos/');
  var promesa=new Promise(function(resolve,reject){
    ref.on('value',snapShot=>{
      if(snapShot.exists()){
        snapShot.forEach(snapBaby=>{
          snapBaby.forEach(snapFeto=>{
            if (snapFeto.val().idProducto == idProducto && snapFeto.val().urlProducto ==  NameProducto && snapFeto.val().StatusProducto==1) {
              resolve({productoUnico:snapFeto.val()});
            }
          })
        })
      }else {
        resolve(values=[])
      } //if exists
    }) // ref.on
  }) // promesa
  return promesa;
}

function TomarAllProductos(bd){
  var ref=bd.ref('Productos/');
  let values=[];
  var promesa=new Promise(function(resolve,reject){
    ref.on('value',snapShot=>{
      if(snapShot.exists()){
        snapShot.forEach(snapBaby=>{
          snapBaby.forEach(snapFeto=>{
            if (snapFeto.val().StatusProducto == 1 && snapFeto.val().precioProducto && snapFeto.val().imagenes.length>0) {
              values.push(snapFeto.val());
            }
          })
        })
      }else {
        resolve(values=[])
      } //if exists
      resolve(values);
    }) // ref.on
  }) // promesa
  return promesa;
}



exports.TomarProductosPorUsuario=TomarProductosPorUsuario;
exports.TomarAllProductos =TomarAllProductos;
exports.TomarProductoId=TomarProductoId;
