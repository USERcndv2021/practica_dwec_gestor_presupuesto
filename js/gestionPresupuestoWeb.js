import * as gesPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor){ //para mostar el valor de un un elemento, se hace referencia a su id
    let elemento = document.getElementById(idElemento);
    elemento.innerText = valor;
}

function mostrarGastoWeb(idElemento, gasto){ //se crea los elementos div (primero el padre que es <div gasto), en su interior iran los nodos
                                             //hijos descripción, fecha, valor,etiquetas. Cada nodo en un div independiente.
  //div gasto
  let divGasto = document.createElement("div");
  divGasto.className = "gasto";
 //añadir gasto al contenedor principal
  let contenedor = document.getElementById(idElemento);
 contenedor.append(divGasto);

  //div gasto-descripción
  let divDescrip = document.createElement("div");
  divDescrip.className = "gasto-descripcion";
  divDescrip.innerText = gasto.descripcion;
  divGasto.append(divDescrip);  //Componer objeto gasto -- añadir el nodo divDescrip al nodo padre(divGasto)

  //div.fecha
 let divFecha = document.createElement("div");
 divFecha.className = "gasto-fecha";
 divFecha.innerText = gasto.fecha;
 divGasto.append(divFecha);  //Componer objeto gasto -- añadir el nodo divFecha al nodo padre(divGasto)

  //div.valor
 let divValor = document.createElement("div");
 divValor.className = "gasto-valor";
 divValor.innerText = gasto.valor;
 divGasto.append(divValor);  //Componer objeto gasto -- añadir el nodo divValor al nodo padre(divGasto)

 //div.etiquetas
  let divEtiquetas = document.createElement("div");
  divEtiquetas.className = "gasto-etiquetas";
  divGasto.append(divEtiquetas); //Componer objeto gasto -- añadir el nodo divEtiquetas al nodo padre(divGasto)
  
    for ( let etiqueta of gasto.etiquetas){
      let spanEti = document.createElement("span");
      spanEti.className = "gasto-etiquetas-etiqueta";
      spanEti.innerText = etiqueta;
      
      /////manejador borrarEtiquetas//////////////////////bien////
       let manejadorBorrarEtiqueta = new borrarEtiquetasHandle();
       manejadorBorrarEtiqueta.gasto = gasto;
       manejadorBorrarEtiqueta.etiqueta = etiqueta;
       spanEti.addEventListener("click", manejadorBorrarEtiqueta);

      divEtiquetas.append(spanEti);
  }
    

  
 ///Crear botón editar//////////////////////bien//////
  let botonEditar = document.createElement("button");
  botonEditar.className = "gasto-editar";
  botonEditar.innerHTML = "Editar";
  divGasto.append(botonEditar);

/////manejadorEditar//////////////////////bien/////
  let manejadorEditar = new editarHandle();
  manejadorEditar.gasto = gasto;
  botonEditar.addEventListener("click", manejadorEditar);



//////////Crear botón borrar///////////////bien////
  let botonBorrar = document.createElement("button");
  botonBorrar.className = "gasto-borrar";
  botonBorrar.innerHTML = "Borrar";
  divGasto.append(botonBorrar);

  /////manejadorBorrar///////////////////bien//////
  let manejadorBorrar = new borrarHandle();
  manejadorBorrar.gastoBorrar = gasto;
  botonBorrar.addEventListener("click", manejadorBorrar);

//////////Crear botón editar formulario///////////////

  let botonEditarForm = document.createElement("button");
  botonEditarForm.className = "gasto-editar-formulario";
  botonEditarForm.type = "button";
  botonEditarForm.innerHTML = "Editar(formulario)";
  divGasto.append(botonEditarForm);

  let manejadorEditarForm = new editarHandleFormulario();
  manejadorEditarForm.gasto = gasto;
  botonEditarForm.addEventListener("click", manejadorEditarForm);

  
}





//////////Eventos Función Handle////////bien///////
function editarHandle(){
  this.handleEvent = function(){
    let descripcion = prompt("Introduzca la descripción: ");
    let valor = Number(prompt("Introduzca el valor: "));
    let fecha = prompt("Introduzca la fecha: ");
    let etiquetas = prompt("Introduzca las etiquetas: ");
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...etiquetas.split(","));
    repintar();
  }

}

function borrarHandle(){
  this.handleEvent = function(){
    gesPresupuesto.borrarGasto(this.gastoBorrar.id);
    repintar();
  }
  
  }

  function borrarEtiquetasHandle(){
    this.handleEvent = function(){
      this.gasto.borrarEtiquetas(this.etiqueta);
      repintar();
    }

  }



//////////////////////////////////////////////////////////////---->Bien<---//////////////Interacción HTML

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){ 
  let divAgrup = document.createElement("div");  ///div agrupación html
  divAgrup.className = "agrupacion"; 


  
  let h1Per = document.createElement("h1");  //div h1 html
  h1Per.innerHTML = `Gastos agrupados por ${periodo}`;
  divAgrup.append(h1Per);


 for(let [clave, valor] of Object.entries(agrup)){ //para cada objeto agrup 
  
    let divAgrupDato = document.createElement("div");// div agrupación-Dato html
    divAgrupDato.className = "agrupacion-dato";
    divAgrup.append(divAgrupDato);
  
    let spanAgrup = document.createElement("span");
    spanAgrup.className = "agrupacion-dato-clave";
    spanAgrup.innerHTML =  clave.split("  ");
    divAgrupDato.append(spanAgrup);

    let spanAgrup2 = document.createElement("span");
    spanAgrup2.className = "agrupacion-dato-valor";
    spanAgrup2.innerHTML =  valor;
    divAgrupDato.append(spanAgrup2);
  

}

  let cont = document.getElementById(idElemento);
  cont.append(divAgrup);

}
///////////////////////////////////////////////////////////////////

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}



//////SigueEventos//////////////// bien//////////
function actualizarPresupuestoWeb(){
  let anyadirValor = prompt("Añade un presupuesto: ");
  parseFloat(anyadirValor);
  gesPresupuesto.actualizarPresupuesto(parseFloat(anyadirValor));
  repintar();

 }

 let buttonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
 buttonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);


  function repintar(){

  mostrarDatoEnId("presupuesto", gesPresupuesto.mostrarPresupuesto());

  mostrarDatoEnId("gastos-totales", gesPresupuesto.calcularTotalGastos());

  mostrarDatoEnId("balance-total", gesPresupuesto.calcularBalance());

   let listado = document.getElementById("listado-gastos-completo");
   listado.innerHTML = " ";

  for (let g of gesPresupuesto.listarGastos()){
    mostrarGastoWeb("listado-gastos-completo", g);
}

 }
  

   function nuevoGastoWeb(){
    let descripcion = prompt("Introduzca la descripción: ");
    let valor = prompt("Introduzca el valor: ");
    let fecha = prompt("Introduzca la fecha: ");
    let etiquetas = prompt("Introduzca las etiquetas: ");
    let gasto = new gesPresupuesto.CrearGasto(descripcion, parseFloat(valor), fecha, etiquetas.split(","));
    gesPresupuesto.anyadirGasto(gasto);
    repintar();
   }

 let botonAnyadirGasto = document.getElementById("anyadirgasto");
  botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////Formulario/////////Prueba/////////


 function cerrarFormularioAnyadir(event){//pendiente de arreglar
  var botonCancelar = event.currentTarget;
  botonCancelar.disabled = true;
  let botonAnyadir = document.getElementById("anyadirgasto-formulario");
  botonAnyadir.disabled = false;
  event.currentTarget.parentNode.remove();
   
 }
    
 
  function nuevoGastoWebFormulario(event){

  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true); //1-clonamos el formulario

  

  var formulario = plantillaFormulario.querySelector("form"); //2-localizamos al elemento <form> clonado anteriormente

  formulario.addEventListener("submit",anyadirElementoFormulario); //3-Llamamos al manejador de eventos "submit" para dicho formulario

   //desactivamos el botón añadir del formulario
   event.target.disabled = true;

  var botonCancelar = plantillaFormulario.querySelector("button.cancelar");//8-localizamos la plantillaFormulario para acceder
                                                                             //al botón cancelar.
  botonCancelar.addEventListener("click", cerrarFormularioAnyadir); //9-llamamos al manejador de eventos "click" para eliminar
                                                                    //el formulario cuando pulsemos "Cancelar."

   let controles = document.getElementById("controlesprincipales");
   controles.append(plantillaFormulario);

}

let botonAnyadir = document.getElementById("anyadirgasto-formulario");
botonAnyadir.addEventListener("click",nuevoGastoWebFormulario);



///
function anyadirElementoFormulario(event){ //4- Creamos una función para obtener las propiedades del objeto gasto , esta función 
                                            // irá asociada al evento "submit" de la función nuevoGastoEbFormulario()
  event.preventDefault(); //5- Prevenir el envío del formulario
  let eti = event.target.etiquetas.value.split(",  ");
  let nuevoGasto = new gesPresupuesto.CrearGasto(event.target.descripcion.value, event.target.valor.value, 
    event.target.fecha.value, ...eti);     //6- creamos nuevoGasto con sus propiedades.

  gesPresupuesto.anyadirGasto(nuevoGasto); //7- añadimos el nuevoGasto a la lista de gastos --archivo gesPresupuesto

  let botonAnyadir = document.getElementById("anyadirgasto-formulario"); //8- obtenemos el botón "anyadirgasto-formulario" 
  botonAnyadir.disabled = false;                                     
  event.target.remove();  // 9-Eliminamos el formulario
  repintar(); //10- Llamamos a la función repintar();

}




///comprobar


function manejadorSubmitEditarFormulario() {
  this.handleEvent = function(event) {
      
      event.preventDefault(); //1.prevenir la funcion por defecto
      this.gasto.etiquetas = []; //2.limpiar el array
      
      let formulario = event.currentTarget;
      let descripcion = formulario.elements.descripcion.value;
      let valor = formulario.elements.valor.value;
      let fecha =  formulario.elements.fecha.value;
      let etiquetas = formulario.elements.etiquetas.value; 
      let separadorEtiquetas = etiquetas.split(',');
                      //3.Actualizar
      this.gasto.actualizarDescripcion(descripcion);
      this.gasto.actualizarValor(parseFloat(valor));
      this.gasto.actualizarFecha(fecha);
      this.gasto.anyadirEtiquetas(...separadorEtiquetas);
      
      repintar();
  }
}



//manejador botón cancelar formulario
function manejadorBotonCancelarFormulario() {
  this.handleEvent = function(event) {
      event.currentTarget.parentNode.remove(); 
      this.botonEditar.disabled = false; 
  }
}






function editarHandleFormulario () {
  this.handleEvent = function(event){ 
       
      let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true); //1.Crear una copia del formulario

      var formulario = plantillaFormulario.querySelector("form"); //2.Localizar el elemento <form>

      formulario.elements.descripcion.value = this.gasto.descripcion; //3.Mostrar los valores del gasto
      formulario.elements.valor.value = this.gasto.valor;
      formulario.elements.fecha.value = this.gasto.fecha;
      formulario.elements.etiquetas.value = this.gasto.etiquetas;

      event.currentTarget.after(formulario); //4. añadir el formulario al final del botón editar
      let botonEditarFormulario = event.currentTarget; //5.Desactivar botón
      botonEditarFormulario.disabled = true;
       //6.manejador botón EDITAR del evento submit 
      let botonSubmitFormulario = new manejadorSubmitEditarFormulario();
      botonSubmitFormulario.gasto = this.gasto;
      formulario.addEventListener('submit', botonSubmitFormulario);
       //7.manejador botón CANCELAR del formulario
      let botonCancelarFormulario = formulario.querySelector("button.cancelar");
      let cancelarFormulario = new manejadorBotonCancelarFormulario();
      cancelarFormulario.botonEditar = event.currentTarget; // 8.Hace referencia al botón de editar
      cancelarFormulario.className = "button.cancelar"
      botonCancelarFormulario.addEventListener('click', cancelarFormulario);
  }
}













