
function Tomar(dataBase,idUser) {
return dataBase.ref('/Usuarios/' + idUser).once('value');
}

exports.Tomar=Tomar;
