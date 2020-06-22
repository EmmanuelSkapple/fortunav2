const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var serviceAccount = require("./cervezafortuna-4217e-firebase-adminsdk-pot3w-a01ef27a50.json");
var admin = require("firebase-admin");

var UsuarioScript = require("./Usuarios-scripts/usuarios-scripts.js");
var BancoScript = require("./Banco-scripts/banco-usuario.js");
var ProductoScript = require("./Producto-scripts/productos-scripts.js");
var DireccionesScript = require("./Direcciones-scripts/direcciones-scripts.js");
var Transacciones = require("./Transacciones-scripts/transacciones-scripts.js");
var OpenpayService = require('openpay');
var OpenPay = new OpenpayService('mac7dpp1xag8ezadtklh', 'sk_8b100c9ddaaa4158bc9361ff0dd5c0ba');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cervezafortuna-4217e.firebaseio.com/"
});
var dataBase = admin.database();
var Auth = admin.auth();


app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.set('trust proxy', true);

app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(function(req, res, next) {

  var allowedOrigins = [, 'http://localhost:3000', 'https://exportaciones-e2444.firebaseapp.com/'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.get('/', function (req, res) {
  res.send('Que andas buscando aqui? ___ooO_(_o__o_)_Ooo___');

});

app.post('/registro-usuario', function (req, res) {
  UsuarioScript.registroUsuarios(req,res,dataBase,Auth);
});

app.post('/login-usuario', function (req, res) {
  UsuarioScript.loggeoUsuarios(req,res,dataBase);
});
app.post('/tomar-carrito', function (req, res) {
  UsuarioScript.TomarCarrito(req,res,dataBase);
});
app.post('/borrar-all-carrito', function (req, res) {
  UsuarioScript.EliminarCarrito(req,res,dataBase);
});
app.post('/borrar-item-carrito', function (req, res) {
  UsuarioScript.EliminarItemCarrito(req,res,dataBase);
});

app.post('/tomar-precioTotal-carrito', function (req, res) {
  UsuarioScript.TomarPrecioTotalCarrito(req,res,dataBase);
});
app.post('/subir-item-carrito', function (req, res) {
  UsuarioScript.SubirItemCarrito(req,res,dataBase);
});
app.post('/tomar-Perfil', function (req, res) {
  UsuarioScript.TomarPerfil(req,res,dataBase);
});


app.post('/nueva-Bancaria', function (req, res) {
  BancoScript.NuevaBancaria(req,res,dataBase);
});

app.post('/nuevo-producto-single', function (req, res) {
  ProductoScript.NuevoProductoSencillo(req,res,dataBase);
});
app.post('/actualizar-producto-single', function (req, res) {
  ProductoScript.ActualizarProductoSencillo(req,res,dataBase);
});
app.post('/eliminar-producto-single', function (req, res) {
  ProductoScript.EliminarProductoSencillo(req,res,dataBase);
});

app.get('/tomar-producto-promocion', function (req, res) {
  ProductoScript.TomarProductosPromocion(req,res,dataBase);
});
app.get('/TomarProductosRelacionados', function (req, res) {
  ProductoScript.TomarProductosRelacionados(req,res,dataBase);
});
app.post('/get-producto-whitId', function (req, res) {
  ProductoScript.TomarProductosWithId(req,res,dataBase);
});

app.post('/get-producto-whitUsuario', function (req, res) {
  ProductoScript.TomarProductosPorUsuario(req,res,dataBase);
});



app.post('/nueva-tarjeta', function (req, res) {
  BancoScript.NuevaTarjeta(dataBase,OpenPay,req,res);
});

app.post('/tomar-tarjetas', function (req, res) {
  BancoScript.TomarTarjeta(dataBase,req,res);
});

app.post('/eliminar-tarjeta', function (req, res) {
  BancoScript.EliminarTarjeta(dataBase,OpenPay,req,res);
});
app.post('/pagar-carrito', function (req, res) {
  BancoScript.PagarCarrito(dataBase,OpenPay,req,res);
});


app.post('/tomar-direcciones', function (req, res) {
  DireccionesScript.TomarDireccion(dataBase,req,res);
});
app.post('/nueva-direccion', function (req, res) {
  DireccionesScript.NuevaDireccion(dataBase,req,res);
});

app.post('/eliminar-direccion', function (req, res) {
  DireccionesScript.EliminarDireccion(dataBase,req,res);
});
app.post('/eliminar-direccion', function (req, res) {
  DireccionesScript.EliminarDireccion(dataBase,req,res);
});
app.post('/get-compras', function (req, res) {
  let respuestaTrans = Transacciones.tomarTransaccionWithUser(dataBase,req,res);
  respuestaTrans.then((datos)=>{
    res.send({status:'OK',values:datos});

  })
});
app.post('/get-ventas', function (req, res) {
  let respuestaTrans = Transacciones.tomarTransaccionWithAdmin(dataBase,req,res);
  respuestaTrans.then((datos)=>{
    res.send({status:'OK',values:datos});

  })
});
app.post('/actualizar-fecha-entrega', function (req, res) {
  Transacciones.ActualizarFechaEntrega(req,res,dataBase);
});
app.post('/actualizar-status', function (req, res) {
  Transacciones.ActualizarStatus(req,res,dataBase);
});






app.listen(process.env.PORT || 4000 ,function(){
    console.log("up and running on port "+process.env.PORT);
});
