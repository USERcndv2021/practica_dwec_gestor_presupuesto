   
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(valor) {//bien
    // TODO 
    if(valor < 0 || isNaN (valor)) {
        return -1;
    }else{
      return presupuesto = valor;
    }
}

function mostrarPresupuesto() {//bien
    // TODO
    return "Tu presupuesto actual es de " +""+ presupuesto + " " + "€";
}
    
  function CrearGasto(descripcion, valor, fecha, ... etiquetas) {//bien
    //TODO
    this.descripcion = descripcion;
    this.valor = valor;
    this.valor = valor < 0 || isNaN(this.valor) ? 0: this.valor;
    if (!fecha){
      fecha = Date.parse(new Date());
      this.fecha = fecha;
    }else{
      fecha = Date.parse(fecha);
      this.fecha = fecha;
    }
    
    this.etiquetas = [];
    if(etiquetas.length!= 0){
      for(let i in etiquetas){
        this.etiquetas.push(etiquetas[i]);
      }
    }else{
      this.etiquetas = [];
    }
    
    this.mostrarGasto = function(){//bien
      return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    },

     this.actualizarDescripcion = function(d){//bien
      this.descripcion = d;
    },

    this.actualizarValor = function(nuevoValor){ //bien
      if(typeof nuevoValor == "number" && nuevoValor >= 0){
        this.valor = nuevoValor;
      }
  },

  this.mostrarGastoCompleto = function(){//bien
    let res;
    res = this.mostrarGasto() +  ".";
    res = res + `\nFecha: ${new Date(this.fecha).toLocaleString()}\n`;
    res += `Etiquetas:\n`;
     for (let e of this.etiquetas) {
      res += `- ${e}\n`;
     }
     return res;
  },

  this.actualizarFecha = function(nueva){//bien
    nueva = Date.parse(nueva);
    if(nueva){
      this.fecha = nueva;
    }

  },

  this.anyadirEtiquetas = function(...eA){//bien
    let pos;
    for(let i of eA){
      pos = this.etiquetas.indexOf(i);
      if(pos == -1){
        this.etiquetas.push(i);
      }
    }
  
    },
  
  this.borrarEtiquetas = function(...eb){//bien
   let pos;
   for(let i of eb){
    pos = this.etiquetas.indexOf(i);
    if(pos!= -1){
      this.etiquetas.splice(pos, 1);
    }
   }
      
},

this.obtenerPeriodoAgrupacion =function(periodo){//bien JS-III
  let fecha =  new Date(this.fecha);
  let fechaString = fecha.toISOString();
   if (periodo == "dia"){
    return fechaString.substring(0,10);

   }else if (periodo == "mes"){
    return fechaString.substring(0,7);

   }else if (periodo == "anyo"){
    return fechaString.substring(0,4);
   }

}

}  
 //------>FIN DE OBJETO GASTO Y SUS METODOS<------

//Funciones de los gastos

function listarGastos(){//bien
  return gastos;
}


function anyadirGasto(gasto){//bien
  gasto.id = idGasto;
  idGasto++;
  gastos.push(gasto);
  
}


function borrarGasto(eliminarGasto){//bien
  for(let i = 0; i < gastos.length; i++){
    if(gastos[i].id == eliminarGasto){
      gastos.splice(i, 1);

    }
  }

}
  
function calcularTotalGastos(){//bien
  let suma = 0;
  for(let i of gastos){
    suma = suma + i.valor;
  }
  return suma;
} 


function calcularBalance(){
 return  presupuesto - calcularTotalGastos(gastos);//bien
}

    
function filtrarGastos(opciones){//bien //----->Javascript III<------
  
  return gastos.filter(function(d){
    var resultado = true;
    if (opciones.fechaDesde){
      var fD = Date.parse(opciones.fechaDesde);
      resultado = resultado && (d.fecha >= fD);
    }
    if (opciones.fechaHasta){
      var fH = Date.parse(opciones.fechaHasta);
      resultado = resultado && (d.fecha <= fH);
    }
     if (opciones.valorMinimo){
      resultado = resultado && (d.valor >= opciones.valorMinimo)
    }
    if (opciones.valorMaximo){
      resultado = resultado && (d.valor <= opciones.valorMaximo)
    }
    if (opciones.descripcionContiene){
      resultado = resultado && (d.descripcion.indexOf(opciones.descripcionContiene) > -1);
    }
    if (opciones.etiquetasTiene){
      let etiqSi = false;
      for (let e of opciones.etiquetasTiene){
        if (d.etiquetas.indexOf(e) > -1){
          etiqSi = true;
        }
      }
      resultado = resultado && etiqSi;
    }
    return resultado;

  })
  
}


function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta){ //bien
  let opciones = {};
  opciones.periodo = periodo;
  opciones.etiquetasTiene = etiquetas;
  opciones.fechaDesde = fechaDesde;
  opciones.fechaHasta = fechaHasta;
  let gastosFiltrados = filtrarGastos(opciones);
  let funReduce = function( acc, gasto) {
      let perAgrup = gasto.obtenerPeriodoAgrupacion(periodo);
      if (acc[perAgrup]) {
          acc[perAgrup] += gasto.valor;
      } else {
          acc[perAgrup] = gasto.valor;
      }
     
      return acc;
  };
  let acumulador = {};
  return gastosFiltrados.reduce(funReduce, acumulador);

}
  

function transformarListadoEtiquetas(etiquetasTiene){
  let array = etiquetasTiene;
  let listaEtiquetas = array.match(/\w{1,}/g);
  return listaEtiquetas;

}


function cargarGastos(gastosAlmacenamiento) {
  // gastosAlmacenamiento es un array de objetos "planos"
  // No tienen acceso a los métodos creados con "CrearGasto":
  // "anyadirEtiquetas", "actualizarValor",...
  // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas

  // Reseteamos la variable global "gastos"
  gastos = [];
  // Procesamos cada gasto del listado pasado a la función
  for (let g of gastosAlmacenamiento) {
      // Creamos un nuevo objeto mediante el constructor
      // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
      // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
      let gastoRehidratado = new CrearGasto();
      // Copiamos los datos del objeto guardado en el almacenamiento
      // al gasto rehidratado
      // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
      Object.assign(gastoRehidratado, g);
      // Ahora "gastoRehidratado" tiene las propiedades del gasto
      // almacenado y además tiene acceso a los métodos de "CrearGasto"
        
      // Añadimos el gasto rehidratado a "gastos"
      gastos.push(gastoRehidratado)
  }
}
  







// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos,
    

}
