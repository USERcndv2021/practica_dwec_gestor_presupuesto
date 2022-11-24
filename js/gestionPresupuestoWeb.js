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
 //añadir gasto
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
      spanEti.className = "gasto-etiquetas-etiqueta"
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
  botonEditar.className = "gasto-editar"
  botonEditar.innerHTML = "Editar";
  divGasto.append(botonEditar);

/////manejadorEditar//////////////////////bien/////
  let manejadorEditar = new editarHandle();
  manejadorEditar.gasto = gasto;
  botonEditar.addEventListener("click", manejadorEditar);



//////////Crear botón borrar///////////////bien////
  let botonBorrar = document.createElement("button");
  botonBorrar.className = "gasto-borrar"
  botonBorrar.type = "button";
  botonBorrar.innerHTML = "Borrar";
  divGasto.append(botonBorrar);

  /////manejadorBorrar///////////////////bien//////
  let manejadorBorrar = new borrarHandle();
  manejadorBorrar.gastoBorrar = gasto;
  botonBorrar.addEventListener("click", manejadorBorrar);


}

//////////Función Handle////////bien///////
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
  
//////////////////////////////////////////////////////////////---->Bien<---//////////////

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
  //repintar();

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

/*

 function anyadirElementoFormulario(event){

     event.preventDefault();
     let e = event.target.etiquetas.value.split(",  ");
     let nuevoGasto = new gesPresupuesto.CrearGasto(event.target.descripcion.value, event.target.valor.value,
       event.target.fecha.value, ...e);

     gesPresupuesto.anyadirGasto(nuevoGasto);

     repintar();

     let botonAnyadir = document.getElementById("anyadirgasto-formulario");
     botonAnyadir.disabled = false;
     event.target.remove();  

 }

 function cerrarBotonFormularioAnyadir(){//pendiente
  let botonAnyadir = document.getElementById("anyadirgasto-formulario");
  botonAnyadir.disabled = false;
   
 }


function nuevoGastoWebFormulario(event){
  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

  //manejadores

  var formulario = plantillaFormulario.querySelector("form");

  formulario.addEventListener("submit",anyadirElementoFormulario);

  var botonCancelar = plantillaFormulario.querySelector("button.cancelar");

  botonCancelar.addEventListener("click", cerrarBotonFormularioAnyadir) ;

   event.target.disabled = true; 

   let controles = document.getElementById("controlesprincipales");
   controles.append(plantillaFormulario);

}

let botonAnyadir = document.getElementById("anyadirgasto-formulario");
botonAnyadir.addEventListener("click",nuevoGastoWebFormulario);
*/






/*
//clona el contenido de la plantilla  para reutilizarlo múltiples veces
let templ= document.createElement("templ");
let elem  = document.createElement("div");

let copiaPlantilla = templ.content.cloneNode(true);
let copiaPlantilla2 = templ.content.cloneNode(true);

elem.append(copiaPlantilla); 
elem.append(copiaPlantilla2);

document.body.append(elem); //agregar en la capa que corresponda
*/