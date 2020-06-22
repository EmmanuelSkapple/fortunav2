function SubirImgStorage(direccion,firebaseStorage,archivo){
var downloadURL;
console.log('subiendo');
const ref=firebaseStorage.ref(direccion);
const task=ref.put(archivo);
var self=this;
var promise = new Promise(
        function(resolve,reject){
            task.on('state_changed',function(snapshot){

            },(error) =>{
              alert(error);
            },()=>{
              task.snapshot.ref.getDownloadURL().then(function(dURL) {
                resolve(downloadURL= dURL);
              });

            })
        })
        return promise;
}


exports.SubirImgStorage=SubirImgStorage;
