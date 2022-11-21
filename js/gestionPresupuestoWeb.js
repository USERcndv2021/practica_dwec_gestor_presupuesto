
function mostrarDatoEnId(idElemento, valor){ //para mostar el valor de un un elemento, se hace referencia a su id
    let elemento = document.getElementById(idElemento);
    elemento.innerText = valor;
}

 
function mostrarGastoWeb(idElemento, gasto){ //se crea los elementos div (primero el padre que es <div gasto), en su interior iran los nodos
                                             //hijos descripción, fecha, valor,etiquetas. Cada nodo en un div independiente.

  //div gasto
  let divGasto = document.createElement("div");
  divGasto.className = "gasto";

  //div gasto-descripción
  let divDescrip = document.createElement("div");
  divDescrip.className = "gasto-descripcion";
  divDescrip.innerText = gasto.descripcion;

  //div.fecha
 let divFecha = document.createElement("div");
 divFecha.className = "gasto-fecha";
 divFecha.innerText = gasto.fecha;

  //div.valor
 let divValor = document.createElement("div");
 divValor.className = "gasto-valor";
 divValor.innerText = gasto.valor;

 //div.etiquetas
  let divEtiquetas = document.createElement("div");
  divEtiquetas.className = "gasto-etiquetas";
  
    for ( let eti of gasto.etiquetas){
      let spanEti = document.createElement("span");
      spanEti.className = "gasto-etiquetas-etiqueta"
      spanEti.innerText = eti;
      divEtiquetas.append(spanEti);

  }


 //añadir gasto
 let contenedor = document.getElementById(idElemento);
 contenedor.append(divGasto);

//Componer objeto gasto        ---añadir los nodos (divDescrip, divFecha, divValor, divEtiquetas al nodo padre(divGasto))
  divGasto.append(divDescrip);
  divGasto.append(divFecha);
  divGasto.append(divValor);
  divGasto.append(divEtiquetas);

}


//////////////////////////////////////////////////////////////---->Prueba<---

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){ //fase prueba
  let divAgrup = document.createElement("div");  ///div agrupación html
  divAgrup.className = "agrupacion"; 


  
  let h1Per = document.createElement("h1");  //div h1 html
  h1Per.innerHTML = `Gastos agrupados por ${periodo}`;
  divAgrup.append(h1Per);


  let divAgrupDato = document.createElement("div"); // div agrupación-Dato html
  divAgrupDato.className = "agrupacion-dato";
  
  
 

 for(let [clave, valor] of Object.entries(agrup)){ //para cada objeto agrup 

    let spanAgrup = document.createElement("span");
    spanAgrup.className = "agrupacion-dato-clave";
    spanAgrup.innerHTML =  clave;
    divAgrupDato.append(spanAgrup);
   

    let spanAgrup2 = document.createElement("span");
    spanAgrup2.className = "agrupacion-dato-valor";
    spanAgrup2.innerHTML =  valor;
    divAgrupDato.append(spanAgrup2);

}







   /* spanAgrup.className= "agrupacion-dato-valor";
    spanAgrup.innerHTML = value;*/

    /*let spanAgrupClave = document.createElement("span");
    spanAgrupClave.className = "agrupacion-dato-clave";
    spanAgrupClave.innerHTML =  key;
    divAgrupDato.append(spanAgrupClave[key]);*/

    /*let spanAgrupValor = document.createElement("span");
    spanAgrupValor.className ="agrupacion-dato-valor";
    spanAgrupValor.innerHTML = value;
    
    divAgrupDato.append(spanAgrupValor[value]);
    
    divAgrupDato.append(spanAgrup);
  }
*/
  

  divAgrup.append(divAgrupDato);
  let cont = document.getElementById(idElemento);
  cont.append(divAgrup);

}
///////////////////////////////////////////////////////////////////

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}

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


//////Códigos Formulario////////////////

  function repintar(){

  //alert("repintando");
   let listado = document.createElementById("listado-gastos-completo");
   listado.innerHTML = "";

  for (let g of gesPresupuesto.listarGastos()){
    mostrarGastoWeb("listado-gastos-completo", g);
}

 }

 function anyadirElementoFormulario(event){

     event.preventDefault();
      
     //event.target es el formulario
     //alert(event.target.descripcion.value);
     //array de etiquetas
     let e = event.target.etiquetas.value.split(",  ");
     let nuevoGasto = new gesPresupuesto.CrearGasto(event.target.descripcion.value, event.target.valor.value,
       event.target.fecha.value, ...e);

       console.log(nuevoGasto);

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
