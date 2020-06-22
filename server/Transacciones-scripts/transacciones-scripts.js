function tomarTransaccionWithUser (bd,req,res){
    var ref=bd.ref('Transacciones/'+req.body.idUser);
    let valuesActivos=[];
    let valuesNoActivos=[];
    let valuesCancelados=[];
    var promesa=new Promise(function(resolve,reject){
      ref.on('value',snapShot=>{
        if(snapShot.exists()){
          snapShot.forEach(snapBaby=>{
            if (snapBaby.val().Status == 1) {
              valuesActivos.push(snapBaby.val());
            }
            else if(snapBaby.val().Status == 0){
              valuesNoActivos.push(snapBaby.val());
            }
            else if(snapBaby.val().Status == 2){
              valuesCancelados.push(snapBaby.val());
            }
          })
        }else {
          resolve({Terminados:valuesActivos=[],Proceso:valuesNoActivos=[],Cancelados:valuesCancelados=[]})
        } //if exists
        resolve({Terminados:valuesActivos.reverse(),Proceso:valuesNoActivos.reverse(),Cancelados:valuesCancelados.reverse()});
      }) // ref.on
    }) // promesa
    return promesa;

}

function tomarTransaccionWithAdmin(bd,req,res){
  var ref=bd.ref('Transacciones/');
  let valuesActivos=[];
  let valuesNoActivos=[];
  let valuesCancelados=[];

  var promesa=new Promise(function(resolve,reject){
    ref.on('value',snapShot=>{
      if(snapShot.exists()){
        snapShot.forEach(snapBaby=>{
          snapBaby.forEach(snapFeto=>{
            if (snapFeto.val().Status == 1) {
              valuesActivos.push(snapFeto.val());
            }
            else if(snapFeto.val().Status == 0){
              valuesNoActivos.push(snapFeto.val());
            }
            else if(snapFeto.val().Status == 2){
              valuesCancelados.push(snapFeto.val());
            }
          })
        })
      }else {
        resolve({Terminados:valuesActivos=[],Proceso:valuesNoActivos=[],Cancelados:valuesCancelados=[]})
      } //if exists
      resolve({Terminados:valuesActivos.reverse(),Proceso:valuesNoActivos.reverse(),Cancelados:valuesCancelados.reverse()});
    }) // ref.on
  }) // promesa
  return promesa;
}



function ActualizarFechaEntrega(req,res,bd){
  var ref=bd.ref('Transacciones/'+req.body.idUser+'/'+req.body.idTransaccion);
  ref.update({
    FechaEntrega:req.body.FechaEntrega,
  }).then(()=>{
    res.send({status:'OK'});
  }).catch((err)=>{
    res.send({status:505,error:err});
  })
}


function ActualizarStatus(req,res,bd){
  var ref=bd.ref('Transacciones/'+req.body.idUser+'/'+req.body.idTransaccion);
  ref.update({
    Status:req.body.Status,
  }).then(()=>{
    res.send({status:'OK'});
  }).catch((err)=>{
    res.send({status:505,error:err});
  })
}

exports.ActualizarStatus=ActualizarStatus;
exports.ActualizarFechaEntrega=ActualizarFechaEntrega;
exports.tomarTransaccionWithUser=tomarTransaccionWithUser;
exports.tomarTransaccionWithAdmin=tomarTransaccionWithAdmin;
