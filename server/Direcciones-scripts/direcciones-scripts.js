
//Se guarda una nueva tarjeta
function NuevaDireccion(bd,req,res){
  let dataDireccion =req.body;

  var ref=bd.ref('Usuarios/'+dataDireccion.idUser+'/Direcciones');
  var PushComponentes=ref.push();
  PushComponentes.set({
      idDireccion:PushComponentes.key,
      NombreDireccion:dataDireccion.NombreDireccion,
      CPDireccion:dataDireccion.CPDireccion,
      EstadoDireccion:dataDireccion.EstadoDireccion,
      MunicipioDireccion:dataDireccion.MunicipioDireccion,
      ColoniaDireccion:dataDireccion.ColoniaDireccion,
      CalleDireccion:dataDireccion.CalleDireccion,
      NumDireccion:dataDireccion.NumDireccion,
      NumInDireccion:dataDireccion.NumInDireccion,
      EntreCalle1Direccion:dataDireccion.EntreCalle1Direccion,
      EntreCalle2Direccion:dataDireccion.EntreCalle2Direccion,
      IndicacionesDireccion:dataDireccion.IndicacionesDireccion,
      numContactoDireccion:dataDireccion.numContactoDireccion,
    },function(error) {
        if (error) {
          return(error); //error si hay problemas al subir Firebase
          res.send({status:'505',error:error})
        } else {
          res.send ({status:'OK'});
        }
      }
    );
}

function EliminarDireccion(bd,req,res){
  var ref=bd.ref('Usuarios/'+req.body.idUser+'/Direcciones/'+req.body.idDireccion);
  ref.remove(function(error){
    if (!error) {
      res.send({status:'OK'})
    }
    else{
      res.send({status:'505'})
    }
  })
}

//Consulta las tarjetas de credito de el usuario (solo puede leer el dueño de la info)
function TomarDireccion(bd,req,res){
  var ref=bd.ref('Usuarios/'+req.body.idUser+'/Direcciones');
  let values=[];
  var promesa=new Promise(function(resolve,reject){
    ref.on('value',snapShot=>{
      if(snapShot.exists()){
        snapShot.forEach(snap=>{
            resolve(
              values.push(snap.val())
          )
        })
      }else {
        resolve(values=[])
      } //if exists
    }) // ref.on
  }) // promesa
  promesa.then(function(){
    res.send({status:'OK',direcciones:values});
  }).catch(function(error){
    res.send({status:'505',error:error});

  });
}


function TomarDireccionUnica(bd,idDireccion,idUser){
  return bd.ref('/Usuarios/' + idUser+'/Direcciones/'+idDireccion).once('value');

}
exports.TomarDireccionUnica=TomarDireccionUnica;
exports.EliminarDireccion=EliminarDireccion;
exports.NuevaDireccion=NuevaDireccion;
exports.TomarDireccion=TomarDireccion;
