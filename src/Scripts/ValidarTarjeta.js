
 function ValidarTarjetaReg(CardNumber,mm,yy,cvv){
  if (!ValidateCreditCardNumber(CardNumber)) {
    return ({status:false,error:'ingresar numero de tarjeta valido!'});
  }
  else if (!ValidateExpirate(mm,yy)) {
    return ({status:false,error:'ingresar mes y año valido!'});
  }
  else if (!ValidateCvv(cvv)) {
    return ({status:false,error:'ingresar cvv valido!'});
  }
  else{
    return ({status:'OK'});
  }
}
 function ValidateCreditCardNumber(CardNumber) {

  var ccNum =CardNumber;
  var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
  var amexpRegEx = /^(?:3[47][0-9]{13})$/;
  var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
  var isValid = false;

  if (visaRegEx.test(ccNum)) {
    isValid = true;
  } else if(mastercardRegEx.test(ccNum)) {
    isValid = true;
  } else if(amexpRegEx.test(ccNum)) {
    isValid = true;
  } else if(discovRegEx.test(ccNum)) {
    isValid = true;
  }
  return isValid;
}
function ValidateExpirate(mm,yy){
  let date = new Date();
  console.log(parseInt(mm));
  console.log(date.getMonth()+1);
  console.log(parseInt(yy));
  console.log(date.getFullYear().toString().substr(-2));
  if (parseInt(mm)>=date.getMonth()+1 && parseInt(yy)<=date.getFullYear().toString().substr(-2)) {
    return false;
  }else{
    return true;
  }
}
function ValidateCvv(cvv){
  var myRe = /^[0-9]{3,4}$/;
  var myArray = myRe.exec(cvv);
  if(cvv!=myArray)
   {
     alert("Invalid cvv number"); //invalid cvv number
     return false;
  }else{
      return true;  //valid cvv number
     }

}

exports.ValidarTarjetaReg=ValidarTarjetaReg;
