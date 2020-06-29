import React, { Component } from 'react';
import * as firebase from 'firebase';
import MenuUsuario from './slideBar.js'
import {Icon,Radio} from 'semantic-ui-react';
import Footer from '../Footer.js'
import AlertSnack from '../utileriaComponents/Alerta.js'
import Menu from '../header.js'
import axios from 'axios'
import {Direccion} from '../../strings/peticiones.js'
import '../../stylesUser/MisCompras.css';
import '../../styles/General.css';
import {SubirImgStorage} from '../../Scripts/SubirArchivos.js'
import {EliminarImgStorage} from '../../Scripts/EliminarArchivos.js'



class ContentMisProductos extends Component{
  constructor(){
    super()
    this.state = {
      nuevoProducto:false,
      Currentuser :firebase.auth().currentUser.uid,
      productosActivos:[],
      productosNoActivos:[],
      TabActivos:0,
    }
  }
  UNSAFE_componentWillMount=()=>{
    this.getProductos();
  }
  getProductos=()=>{
    let self = this;
    console.log('toma productos');
    axios.post(Direccion+`/get-producto-whitUsuario`,{idUser:this.state.Currentuser,})
      .then(res => {
        if(res.data.status){
          console.log(res.data);
          this.setState({
            productosActivos:res.data.productosActivos,
            productosNoActivos:res.data.productosNoActivos,
            loading:false,
          });
        }
        else{
          self.setState({
            loading:false,
            productoEncontrado:{},
            openAlert:true,
            AlertType: 'error',
            titleAlert:"Algo anda mal!",
            AlertMessage:res.data.contentStatus?res.data.contentStatus:'Error desconocido',
          })
        }
      })
  }
  setTabActivo=(e)=>{
    if (e == 1 || e== 0) {
      this.setState({TabActivos:e})
    }
  }
  render(){
    return(
      <div>
        <Menu black={true}/>
        <div >
          {!this.state.nuevoProducto?
            <div className='contentSlidePadre'>
              <MenuUsuario/>
              {this.state.TabActivos==0?
                <MisProductos TabActivo={0} getProductos={this.getProductos} handleChangeTabActivo={this.setTabActivo} productos={this.state.productosActivos} handleNuevoProducto={()=>this.setState({nuevoProducto:!this.state.nuevoProducto})} />
              :this.state.TabActivos==1?
                <MisProductos TabActivo={1} getProductos={this.getProductos} handleChangeTabActivo={this.setTabActivo} productos={this.state.productosNoActivos} handleNuevoProducto={()=>this.setState({nuevoProducto:!this.state.nuevoProducto})} />
              :<div></div>
              }
            </div>:
            <NuevoProducto getProductos={this.getProductos} handleNuevoProducto={()=>this.setState({nuevoProducto:!this.state.nuevoProducto})}/>
          }

        </div>
        <Footer/>
      </div>
    )
  }
}

class MisProductos extends Component{
  constructor(){
    super()
    this.state = {
      itemTabActivo:0,
    }

  }

  setTabActivo=()=>{
    this.props.handleChangeTabActivo(0);
  }
  setTabNoActivo=()=>{
    this.props.handleChangeTabActivo(1);
  }


  render(){
    return(
      <div className='contentMisProductos'>
        <section className='seccion1'>
          <div className='headerMisProductos'>
            <div className='buscadorProductos'>
              <input type='text' placeholder='Buscar nombre, id.'></input>
              <div className='btnBuscar'><Icon  name='search' /></div>
            </div>
            <div className='filtroActivos'>
              <div className={this.props.TabActivo == 0?'tabactivo active':'tabactivo'} onClick={this.setTabActivo}>Activos</div>
              <div  className={this.props.TabActivo == 1?'tabactivo active':'tabactivo'} onClick={this.setTabNoActivo}>Inactivos</div>
            </div>
            <div className='btnNuevoProducto' onClick={()=>this.props.handleNuevoProducto()}>Nuevo Producto</div>
            <div className='contentCardItem'>
              {
                this.props.productos.map((it,index)=>{
                  return(  <CardItemProducto getProductos={this.props.getProductos} producto={it} key={index}/>)
                })
              }
            </div>
          </div>
        </section>
      </div>
    )
  }
}

class CardItemProducto extends Component {
  constructor() {
    super()
    this.state = {
      loading:false,
      modificar:false,
    }
  }

  render(){
    let dt = new Date(this.props.producto.fechaCreacion);
    let fechaCreacion = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
    return(
      <div>
        {this.state.modificar?
          <div className='returnModificado Actionbtn'>
            <Icon name='close' onClick={()=>this.setState({modificar:!this.state.modificar})} ></Icon>
          </div>
          :<div></div>
        }

        {!this.state.modificar?
          <div className='CardItem' >
            Categoria
          </div>
          :
          <ActualizarProducto getProductos={this.props.getProductos}  producto={this.props.producto}/>
        }
      </div>

    )
  }
}


class NuevoProducto extends Component{
  constructor(){
    super()
    this.state = {
      itemTabActivo:0,
      idUser:firebase.auth().currentUser.uid,
      pasoNuevoProducto:0,
      lastWindow:false,
      categoria:'',
      subCategoria:'',
      StatusProducto:1,
      imagenes:[],
      nombreProducto:'',
      descripcionProducto:'',
      marcaProducto:'',
      cantidadProducto:'',
      unidadProducto:'',
      precioProducto:'',
      palabrasClaves:'',
      ubicacionProducto:{},
      tipoEntrega:'',
      rangoEnvioGratis:0,
      CostoKmAdiconal:1,
      estiloProducto:'',
      colorProducto:'',
      alcProducto:'',
      presentacionProducto:'',
      loading:false,
      Status:1,
      unProducto:true,
      timeStamp :Date.now(),
    }

  }

  backStep = () =>{
    if(this.state.pasoNuevoProducto == 0){
      this.props.handleNuevoProducto();
    }else{
      if (this.state.pasoNuevoProducto == 4) {
        this.props.handleNuevoProducto();
      }
      this.setState({
        pasoNuevoProducto:this.state.pasoNuevoProducto-1,
      })
    }
  }
  goStep = (data,step) =>{

    if(step == 0){
      this.setState({categoria:data.categoria,subCategoria:data.subCategoria,StatusProducto:data.StatusProducto,pasoNuevoProducto:this.state.pasoNuevoProducto+1,})
    }
    else if (step == 1) {
      this.setState({imagenes:data.imagenes,nombreProducto:data.nombreProducto,descripcionProducto:data.descripcionProducto,marcaProducto:data.marcaProducto,cantidadProducto:data.cantidadProducto,unidadProducto:data.unidadProducto,precioProducto:data.precioProducto,precioDescuentoProducto:data.precioDescuentoProducto,pasoNuevoProducto:this.state.pasoNuevoProducto+1,})

    }
    else if (step == 2) {
      this.setState({palabrasClaves:data.palabrasClaves,ubicacionProducto:data.ubicacionProducto,tipoEntrega:data.tipoEntrega,rangoEnvioGratis:data.rangoEnvioGratis,CostoKmAdiconal:data.CostoKmAdiconal,pasoNuevoProducto:this.state.pasoNuevoProducto+1,})
    }
    else if (step == 3) {
      console.log('entro');
      this.setState({estiloProducto:data.estiloProducto,colorProducto:data.colorProducto,alcProducto:data.alcProducto,presentacionProducto:data.alcProducto,loading:true})
      if(this.ValidarProducto() ){
        this.subirProductoNuevo();
      }else{
        console.log(this.state);

        this.setState({openAlert:true,titleAlert:'Error',AlertMessage:'llena todos los campos',AlertType:'warning'})
      }
    }

  }

  ValidarProducto = ()=>{
    if(!this.state.categoria){return false}
    else if (!this.state.subCategoria) {return false}
    else if (!this.state.imagenes.length>0) {return false}
    else if (!this.state.nombreProducto) {return false}
    else if (!this.state.descripcionProducto) {return false}
    else if (!this.state.marcaProducto) {return false}
    else if (!this.state.cantidadProducto) {return false}
    else if (!this.state.precioProducto) {return false}
    else if (!this.state.unidadProducto) {return false}
    else if (!this.state.palabrasClaves) {return false}
    else if (!this.state.ubicacionProducto) {return false}
    else if (!this.state.tipoEntrega) {return false}
    else if (!this.state.rangoEnvioGratis) {return false}
    else if (!this.state.CostoKmAdiconal) {return false}

    else{return true}
  }

  subirProductoNuevo = ()=>{
    let self = this;
    let ArrayImgUrl = [];
    let ArrayPromesas = [];
    self.setState({loading:true})

    this.state.imagenes.forEach((it,index,ArrayFile)=>{
      let url = 'Productos/'+firebase.auth().currentUser.uid+'/'+this.state.timeStamp+'/ImgProducto'+index;
      let respuestaStorage = SubirImgStorage(url,firebase.storage(),it);
      ArrayPromesas.push(
        respuestaStorage.then((urlPhoto)=>{
          ArrayImgUrl[index] = urlPhoto;
          self.setState({imagenes:ArrayImgUrl})
        })
      )

    })

    Promise.all(ArrayPromesas)
    .then(()=>{
      if (this.state.unProducto) {
        this.setState({unProducto:false})
        axios.post(Direccion+`/nuevo-producto-single`,this.state)
            .then(res => {

              if(res.data.status == "OK"){
                this.setState({unProducto:false,loading:false,openAlert:true,titleAlert:'Exito',AlertMessage:'Producto cargado exitosamente',AlertType:'success',pasoNuevoProducto:4});
                this.props.getProductos();
              }
              else if(res.data.status == 'error'){
                self.setState({
                  unProducto:false,
                  loading:false,
                  openAlert:true,
                  AlertType: 'error',
                  titleAlert:"Algo anda mal!",
                  AlertMessage:res.data.contentStatus,
                })
              }
            }).catch((error)=>{
              console.log(error);
              self.setState({
                unProducto:false,
                loading:false,
                openAlert:true,
                AlertType: 'error',
                titleAlert:"Algo anda mal!",
                AlertMessage:error,
              })
            })
      }
    })

  }

  resetAlert = ()=>{this.setState({openAlert:false,titleAlert:'',AlertMessage:'',AlertType:''})}

  render(){
    return(
      <div className='NuevoProducto'>
        <section className='seccion1'>
          <AlertSnack openAlert={this.state.openAlert} titleAlert={this.state.titleAlert} resetAlert={this.resetAlert} AlertMessage={this.state.AlertMessage} AlertType={this.state.AlertType}/>
          <div className='bgNuevoProducto'>
            <div className='filterOrange'></div>
            <img src='/imgs/LoginBg.jpg'/>
          </div>
          <div className='contentPrimerPaso '>
            <div className='contentBarProcess'>
              <div className={'barProcessNuevoProducto a'+ this.state.pasoNuevoProducto}></div>
              <div className='step'><span>{this.state.pasoNuevoProducto+1}</span>de 5</div>
            </div>
            {this.state.pasoNuevoProducto == 0?
              <NuevoProductoPaso1 OldState={this.state} handleobjPaso={this.setObjProductoNuevo} backStep={this.backStep}  goStep={this.goStep}  />
            :this.state.pasoNuevoProducto == 1?
              <NuevoProductoPaso2 OldState={this.state} handleobjPaso={this.setObjProductoNuevo} backStep={this.backStep}  goStep={this.goStep} />
            :this.state.pasoNuevoProducto == 2?
              <NuevoProductoPaso3 OldState={this.state} handleobjPaso={this.setObjProductoNuevo} backStep={this.backStep}  goStep={this.goStep} />
            :this.state.pasoNuevoProducto == 3?
              <NuevoProductoPaso4 OldState={this.state} handleobjPaso={this.setObjProductoNuevo} backStep={this.backStep}  goStep={this.goStep} />
            :this.state.pasoNuevoProducto == 4?
              <NuevoProductoPaso5 OldState={this.state} handleobjPaso={this.setObjProductoNuevo} backStep={this.backStep}  goStep={this.goStep} />
            :<div></div>
            }

          </div>
        </section>
      </div>
    )
  }
}

class NuevoProductoPaso1 extends Component{
  constructor(){
    super()
    this.state = {
      itemTabActivo:0,
      categoria:'Cemento',
      subCategoria:'Cemento_Blanco',
      StatusProducto:1,
    }
  }

  render(){

    return(
      <div>
        <div className='contentFormNuevoProducto'>
          <p className='tituloCategoria'>¿En que categoria vas a publicar tu producto?</p>
          <select value={this.state.categoria} className="selectCategoria" onChange={(e)=>this.setState({categoria:e.target.value})}>
           <option selected disabled >Seleccionar...</option>
           <option value="Cerveza">Cerveza</option>
          </select>
          <p className='tituloCategoria'>¿En que subcategoria vas a publicar tu producto?</p>
          <select value={this.state.subCategoria} className="selectCategoria" onChange={(e)=>this.setState({subCategoria:e.target.value})}>
           <option selected disabled >Seleccionar...</option>
           <option value="Botella">Botella</option>
           <option value="Barril">Barril</option>
          </select>
          <div className='StatusProducto'>
            <p>Estatus de tu producto</p>
            <div className='Radio label'>
              <p>{this.state.StatusProducto==1?'Visble':'No visible'}</p>
              <Radio  toggle checked={this.state.StatusProducto} onChange={()=>this.setState({StatusProducto:this.state.StatusProducto==0?1:0})} />
            </div>
          </div>
        </div>
        <div className='btnsSteppers'>
          <div className='btnStepper' onClick={ () =>this.props.backStep()}>Regresar</div>
          <div className={this.state.categoria && this.state.subCategoria?'btnStepper':'btnStepper last'} onClick={() =>this.props.goStep(this.state,0)}>Siguiente</div>
        </div>
    </div>
    )
  }
}
class NuevoProductoPaso2 extends Component{
  constructor(){
    super()
    this.state = {
      itemTabActivo:0,
      nombreProducto:'',
      descripcionProducto:'',
      marcaProducto:'',
      cantidadProducto:'',
      unidadProducto:'botellas',
      precioProducto:'',
      precioDescuentoProducto:'',
      imagenes:[],
    }
  }

  setImagePreview = (img,posicion) =>{
    let arrayAux=this.state.imagenes;
    let posicionArray = posicion.substr(posicion.length - 1);
    arrayAux[parseInt(posicionArray)] = img;
    this.setState({
      imagenes:arrayAux,
    })
  }

  render(){

    return(
      <div>
          <div className='contentFormNuevoProducto contentMiddle'>
            <div className='image preview'>
              {this.state.imagenes[0]?<ImagenPreview imgSrc={this.state.imagenes[0]}/> :<ImagenPreview timeStamp={this.state.timeStamp} setImage={this.setImagePreview} id={'inputImg0'} imgSrc={false}/>}
              {this.state.imagenes[1]?<ImagenPreview imgSrc={this.state.imagenes[1]}/> :<ImagenPreview timeStamp={this.state.timeStamp} setImage={this.setImagePreview} id={'inputImg1'} imgSrc={false}/>}
              {this.state.imagenes[2]?<ImagenPreview imgSrc={this.state.imagenes[2]}/> :<ImagenPreview timeStamp={this.state.timeStamp} setImage={this.setImagePreview} id={'inputImg2'} imgSrc={false}/>}
              {this.state.imagenes[3]?<ImagenPreview imgSrc={this.state.imagenes[3]}/> :<ImagenPreview timeStamp={this.state.timeStamp} setImage={this.setImagePreview} id={'inputImg3'} imgSrc={false}/>}
              {this.state.imagenes[4]?<ImagenPreview imgSrc={this.state.imagenes[4]}/> :<ImagenPreview timeStamp={this.state.timeStamp} setImage={this.setImagePreview} id={'inputImg4'} imgSrc={false}/>}
            </div>
            <div className='inputsMiddle'>
              <div className='input label'>
                <p className='tituloInputNuevoProducto'>Nombre de tu producto</p>
                <input value={this.state.nombreProducto} type='text' onChange={(e)=>this.setState({nombreProducto:e.target.value})}/>
              </div>
              <div className='input label'>
                <p className='tituloInputNuevoProducto'>Marca</p>
                <input value={this.state.marcaProducto} type='text' onChange={(e)=>this.setState({marcaProducto:e.target.value})}/>
              </div>
            </div>
            <p className='tituloInputNuevoProducto'>Descripcion del producto</p>
            <textarea value={this.state.descripcionProducto} onChange={(e)=>this.setState({descripcionProducto:e.target.value})} />
            <div className='inputsMiddle'>
              <div className='input label'>
                <p  className='tituloInputNuevoProducto'>Cantidad</p>
                <input value={this.state.cantidadProducto} type='number' onChange={(e)=>this.setState({cantidadProducto:e.target.value})}/>
              </div>
              <div className='input label'>
                <p className='tituloInputNuevoProducto'>Unidad</p>
                <select value={this.state.unidadProducto} className="selectForm paso2" onChange={(e)=>this.setState({unidadProducto:e.target.value})}>
                 <option selected disabled >Seleccionar...</option>
                 <option value={'Botellas'}>Botellas</option>
                 <option value={'Mililitros'}>Mililitros</option>
                 <option value={'Litros'}>Litros</option>
                </select>
              </div>
            </div>
            <div className='inputsMiddle'>
              <div className='input label'>
                <p   className='tituloInputNuevoProducto'>Precio</p>
                <input value={this.state.precioProducto} type='number' onChange={(e)=>this.setState({precioProducto:e.target.value})}/>
              </div>
              <div className='input label'>
                <p   className='tituloInputNuevoProducto'>P.Descuento</p>
                <input value={this.state.precioDescuentoProducto} type='number' onChange={(e)=>this.setState({precioDescuentoProducto:e.target.value})}/>
              </div>
            </div>


          </div>
          <div className='btnsSteppers'>
            <div className='btnStepper' onClick={ () =>this.props.backStep()}>Regresar</div>
            <div
              className={this.state.imagenes.length>0 && this.state.nombreProducto && this.state.descripcionProducto && this.state.marcaProducto && this.state.cantidadProducto && this.state.unidadProducto?'btnStepper':'btnStepper last'}
              onClick={() =>this.props.goStep(this.state,1)}>Siguiente</div>
          </div>
      </div>
    )
  }
}
class NuevoProductoPaso3 extends Component{
  constructor(){
    super()
    this.state = {
      itemTabActivo:0,
      mensajeKmGratis:false,
      palabrasClaves:'',
      ubicacionProducto:{},
      tipoEntrega:'1',
      rangoEnvioGratis:0,
      CostoKmAdiconal:0,
    }
  }

  render(){
    return(
      <div>
        <div className='contentFormNuevoProducto contentMiddle'>
          <p className='tituloInputNuevoProducto'>Palabras claves</p>
          <input value={this.state.palabrasClaves} type='text' onChange={(e)=>this.setState({palabrasClaves:e.target.value})}/>
          <p className='tituloInputNuevoProducto'>¿Donde tienes tu producto?</p>
          <input  type='text' onChange={(e)=>this.setState({ubicacionProducto:{calle:'Mexico',numero:'113',municipio:'Tala',estado:'Jalisco'}})}/>
          <p className='tituloInputNuevoProducto'>Tipo de Entrega</p>
          <select value={this.state.tipoEntrega} className="selectForm paso2" onChange={(e)=>this.setState({tipoEntrega:e.target.value})}>
           <option>Seleccionar...</option>
           <option value='1' >Hasta domicilio</option>
           <option value='2' >Libre abordo</option>

          </select>
          {this.state.mensajeKmGratis?
            <p className='tituloInputNuevoProducto'>Envio Gratis a todo el pais</p>
            :
            <p className='tituloInputNuevoProducto'>Rango de entrega gratuito <span>{this.state.rangoEnvioGratis} km</span></p>
          }
          <input  min={0} max={101} step={1} value={this.state.rangoEnvioGratis} onChange={ (e)=> this.setState({rangoEnvioGratis:e.target.value,mensajeKmGratis:e.target.value == 101?true:false})} type='range'/>
          <p className='tituloInputNuevoProducto'>Costo por kilometro adicional</p>
          <input value={this.state.CostoKmAdiconal} type='number' onChange={(e)=>this.setState({CostoKmAdiconal:e.target.value})}/>
        </div>
        <div className='btnsSteppers'>
          <div className='btnStepper' onClick={ () =>this.props.backStep()}>Regresar</div>
          <div  className={this.state.palabrasClaves && this.state.ubicacionProducto && this.state.tipoEntrega && this.state.rangoEnvioGratis && this.state.CostoKmAdiconal?'btnStepper':'btnStepper last'}

            onClick={() =>this.props.goStep(this.state,2)}>Siguiente</div>
        </div>
      </div>
    )
  }
}
class NuevoProductoPaso4 extends Component{
  constructor(){
    super()
    this.state = {
      estiloProducto:'',
      colorProducto:'',
      alcProducto:'',
      presentacionProducto:'',
      loading:false,
    }
  }
  goBack=()=>{
    this.setState({loading:true,})
    this.props.goStep(this.state,3);
  }
  render(){
    return(
      <div>
        <div className='contentFormNuevoProducto contentMiddle'>
            <h2>Si el producto es cerveza, llena estos campos, de lo contrario omite este paso</h2>
            <p className='tituloInputNuevoProducto'>Estilo</p>
            <input value={this.state.estiloProducto} type='text' onChange={(e)=>this.setState({estiloProducto:e.target.value})}/>
            <p className='tituloInputNuevoProducto'>Color</p>
            <input value={this.state.colorProducto} type='text' onChange={(e)=>this.setState({colorProducto:e.target.value})}/>
            <p className='tituloInputNuevoProducto'>Alc.Vol</p>
            <input value={this.state.alcProducto} type='text' onChange={(e)=>this.setState({alcProducto:e.target.value})}/>
            <p className='tituloInputNuevoProducto'>Presentacion</p>
            <input value={this.state.presentacionProducto} type='text' onChange={(e)=>this.setState({presentacionProducto:e.target.value})}/>

        </div>
        <div className='btnsSteppers'>
          <div className='btnStepper' onClick={ () =>this.props.backStep()}>Regresar</div>
          {!this.state.loading?
            <div  className='btnStepper' onClick={this.goBack}>Siguiente</div>
            :
            <div  className='btnStepper'><Icon  loading={this.state.loading} name='spinner'></Icon></div>
          }
        </div>
      </div>
    )
  }
}
class NuevoProductoPaso5 extends Component{
  constructor(){
    super()
    this.state = {
      itemTabActivo:0,
      KmGratis:0,
      mensajeKmGratis:false,
    }
  }

  render(){
    return(
      <div>
        <div className='contentFormNuevoProducto contentMiddle'>
          <Icon name='check circle outline'/>
          <p className='titleSuccess'>Producto subido correctamente</p>
          <p className='subtitleSuccess'>tu producto esta publicado y pronto recibirás compradores</p>
        </div>
        <div className='btnsSteppers'>
          <div className='btnStepper' onClick={ () =>this.props.backStep()}>Regresar</div>
        </div>
      </div>
    )
  }
}


class ImagenPreview extends Component{
  constructor(){
    super()
    this.state ={
      loading:false,
      imagePreviewUrl:'',
    }
  }

  componentWillReceiveProps(props){
    let self = this;
    console.log(props.imgSrc);
    if (props.imgSrc) {
      var reader = new FileReader();
      reader.onload = function(e) {
        self.setState({
          imagePreviewUrl:e.target.result,
        })
      }
      reader.readAsDataURL(props.imgSrc);
    }
  }

  fileOpen=()=>{
    this.setState({loading:true})
    if (this.props.id == 'inputImg0') {
      var input = document.getElementById('inputImg0');
      if (input) {input.click();}
    }
    else if (this.props.id  == 'inputImg1') {
      var input = document.getElementById('inputImg1')
      if (input) {input.click();}
    }
    else if (this.props.id  == 'inputImg2') {
      var input = document.getElementById('inputImg2');
      if (input) {input.click();}
    }
    else if (this.props.id  == 'inputImg3') {
      var input = document.getElementById('inputImg3');
      if (input) {input.click();}
    }
    else if (this.props.id  == 'inputImg4') {
      var input = document.getElementById('inputImg4');
      if (input) {input.click();}
    }
  }
  setFile=(e)=>{
    let self = this;
    var reader = new FileReader();
    reader.onload = function(e) {
      self.setState({
        imagePreviewUrl:e.target.result,
      })
    }
    reader.readAsDataURL(e.target.files[0]);
      this.props.setImage(e.target.files[0],this.props.id);
  }
  render(){

    return(
      <div className={this.props.imgSrc?'imgTrue':'imgFalse'} onClick={this.fileOpen}>
        <input onChange={this.setFile} type='file' id={this.props.id} style={{display:'none'}}></input>
        {this.state.imagePreviewUrl?
            <img src={this.state.imagePreviewUrl}></img>
          :
            <Icon loading={this.state.loading} name={this.state.loading?'spinner':'image outline'}></Icon>
        }
      </div>
    )
  }
}

class ActualizarProducto extends Component{
  constructor(){
    super()
    this.state ={
      loading:false,
      idProducto:'',
      idUser:'',
      categoria:'',
      subCategoria:'',
      StatusProducto:'',
      fechaUsuario:'',
      nombreProducto:'',
      descripcionProducto:'',
      marcaProducto:'',
      cantidadProducto:'',
      unidadProducto:'',
      precioProducto:'',
      precioDescuentoProducto:'',
      estiloProducto:'',
      colorProducto:'',
      alcProducto:'',
      presentacionProducto:'',
    }
  }
  componentDidMount(){
    console.log(this.props);
    this.setState({
      idProducto:this.props.producto.idProducto,
      idUser:this.props.producto.idUser,
      fechaUsuario:this.props.producto.fechaUsuario,
      categoria:this.props.producto.categoria,
      subCategoria:this.props.producto.subCategoria,
      StatusProducto:this.props.producto.StatusProducto,
      nombreProducto:this.props.producto.nombreProducto,
      descripcionProducto:this.props.producto.descripcionProducto,
      marcaProducto:this.props.producto.marcaProducto,
      cantidadProducto:this.props.producto.cantidadProducto,
      unidadProducto:this.props.producto.unidadProducto,
      precioProducto:this.props.producto.precioProducto,
      precioDescuentoProducto:this.props.producto.precioDescuentoProducto,
      estiloProducto:this.props.producto.estiloProducto,
      colorProducto:this.props.producto.colorProducto,
      alcProducto:this.props.producto.alcProducto,
      presentacionProducto:this.props.producto.presentacionProducto,
    })
  }
  ModificarProducto=()=>{
    let self = this;
    axios.post(Direccion+`/actualizar-producto-single`,this.state)
        .then(res => {
          if(res.data.status == "OK"){
            this.setState({loading:false,openAlert:true,titleAlert:'Exito',AlertMessage:'Producto actualizado exitosamente',AlertType:'success'});
            this.props.getProductos();
          }
          else if(res.data.status == 'error'){
            self.setState({
              loading:false,
              openAlert:true,
              AlertType: 'error',
              titleAlert:"Algo anda mal!",
              AlertMessage:res.data.contentStatus,
            })
          }
        })
  }

  EliminarProducto=async()=>{
    let self = this;
    let url = 'Productos/'+firebase.auth().currentUser.uid+'/'+this.state.fechaUsuario;
    EliminarImgStorage(url,firebase.storage());
      axios.post(Direccion+`/eliminar-producto-single`,this.state)
          .then(res => {
            if(res.data.status == "OK"){
              this.setState({loading:false,openAlert:true,titleAlert:'Exito',AlertMessage:'Producto eliminado exitosamente',AlertType:'success'});
              this.props.getProductos();
            }
            else if(res.data.status == 'error'){
              self.setState({
                loading:false,
                openAlert:true,
                AlertType: 'error',
                titleAlert:"Algo anda mal!",
                AlertMessage:res.data.contentStatus,
              })
            }
          })


  }
  resetAlert = ()=>{this.setState({openAlert:false,titleAlert:'',AlertMessage:'',AlertType:''})}

  render(){
    return(
      <div className='CardItemModificar'>

        <ul className='col5'>
          <li>
            <div className='infoCardItem center Modificar'>
              <div className='input label'>
                <p className='tituloInputNuevoProducto'>Categoria</p>
                <select value={this.state.categoria} className="selectCategoria" onChange={(e)=>this.setState({categoria:e.target.value})}>
                 <option selected disabled >Seleccionar...</option>
                 <option value="Cerveza">Cerveza</option>
                </select>
              </div>
            </div>
          </li>
          <li>
            <div className='infoCardItem center Modificar'>
              <div className='input label'>
                <p className='tituloInputNuevoProducto'>Subcategoria</p>
                <select value={this.state.subCategoria} className="selectCategoria" onChange={(e)=>this.setState({subCategoria:e.target.value})}>
                 <option selected disabled >Seleccionar...</option>
                 <option value="Botella">Botella</option>
                 <option value="Barril">Barril</option>
                </select>
              </div>
            </div>
          </li>
          <li>
            <div className='infoCardItem center Modificar'>
              <div className='input label'>
                <p className='tituloInputNuevoProducto'>Nombre</p>
                <input value={this.state.nombreProducto} type='text' onChange={(e)=>this.setState({nombreProducto:e.target.value})}/>
              </div>
            </div>
          </li>
          <li>
            <div className='infoCardItem center Modificar'>
              <div className='input label'>
                <p className='tituloInputNuevoProducto'>Marca</p>
                <input value={this.state.marcaProducto} type='text' onChange={(e)=>this.setState({marcaProducto:e.target.value})}/>
              </div>
            </div>
          </li>
          <li>
            <div className='infoCardItem center Modificar'>
              <div className='input label'>
                <p className='tituloInputNuevoProducto'>Cantidad</p>
                <input value={this.state.cantidadProducto} type='text' onChange={(e)=>this.setState({cantidadProducto:e.target.value})}/>
              </div>
            </div>
          </li>
          <li>
            <div className='infoCardItem center Modificar'>
              <div className='input label'>
                <p className='tituloInputNuevoProducto'>Unidad</p>
                <select value={this.state.unidadProducto} className="selectForm paso2" onChange={(e)=>this.setState({unidadProducto:e.target.value})}>
                 <option selected disabled >Seleccionar...</option>
                 <option>Botellas</option>
                 <option>Mililitros</option>
                 <option>Litros</option>
                </select>
              </div>
            </div>
          </li>
          <li>
            <div className='infoCardItem center Modificar'>
              <div className='input label'>
                <p className='tituloInputNuevoProducto'>Precio</p>
                <input value={this.state.precioProducto} type='text' onChange={(e)=>this.setState({precioProducto:e.target.value})}/>
              </div>
            </div>
          </li>
          <li>
            <div className='infoCardItem center Modificar'>
              <div className='input label'>
                <p className='tituloInputNuevoProducto'>P.Descuento</p>
                <input value={this.state.precioDescuentoProducto} type='text' onChange={(e)=>this.setState({precioDescuentoProducto:e.target.value})}/>
              </div>
            </div>
          </li>
          <li>
            <div className='infoCardItem center Modificar'>
              <div className='input label'>
                <p className='tituloInputNuevoProducto'>Estilo</p>
                <input value={this.state.estiloProducto} type='text' onChange={(e)=>this.setState({estiloProducto:e.target.value})}/>
              </div>
            </div>
          </li>
          <li>
            <div className='infoCardItem center Modificar'>
              <div className='input label'>
                <p className='tituloInputNuevoProducto'>Color</p>
                <input value={this.state.colorProducto} type='text' onChange={(e)=>this.setState({colorProducto:e.target.value})}/>
              </div>
            </div>
          </li>
          <li>
            <div className='infoCardItem center Modificar'>
              <div className='input label'>
                <p className='tituloInputNuevoProducto'>Alc.Vol</p>
                <input value={this.state.alcProducto} type='text' onChange={(e)=>this.setState({alcProducto:e.target.value})}/>
              </div>
            </div>
          </li>
          <li>
            <div className='infoCardItem center Modificar'>
              <div className='input label'>
                <p className='tituloInputNuevoProducto'>Presentacion</p>
                <input value={this.state.presentacionProducto} type='text' onChange={(e)=>this.setState({presentacionProducto:e.target.value})}/>
              </div>
            </div>
          </li>
          <li>
            <div className='infoCardItem center Modificar decripcion'>
              <div className='input label'>
                <p className='tituloInputNuevoProducto'>Descripcion</p>
                <textarea value={this.state.descripcionProducto} onChange={(e)=>this.setState({descripcionProducto:e.target.value})} />
              </div>
            </div>
          </li>

          <div className='clear'></div>
        </ul>
        <div className='ActionsModificar'>
            <div className='Radio label Modificar'>
              <p>{this.state.StatusProducto==1?'Visble':'No visible'}</p>
              <Radio  toggle checked={this.state.StatusProducto} onChange={()=>this.setState({StatusProducto:this.state.StatusProducto==0?1:0})} />
            </div>

          <div onClick={this.EliminarProducto} className='eliminarModificado Actionbtn'>
            Eliminar
          </div>
          <div onClick={this.ModificarProducto} className='btnModificado Actionbtn'>
            Modificar
          </div>
        </div>
        <AlertSnack openAlert={this.state.openAlert} titleAlert={this.state.titleAlert} resetAlert={this.resetAlert} AlertMessage={this.state.AlertMessage} AlertType={this.state.AlertType}/>
      </div>
    )
  }
}

export default ContentMisProductos;
