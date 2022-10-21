   
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO 
    if(valor < 0 || isNaN (valor)) {
        return -1;
    }else{
      return presupuesto = valor;
    }
}

function mostrarPresupuesto() {
    // TODO
    return "Tu presupuesto actual es de " +""+ presupuesto + " " + "€";
}
    
  function CrearGasto(descripcion, valor, fecha,... etiquetas) {
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
    
    
    this.mostrarGasto = function(){
      return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    },

     this.actualizarDescripcion = function(d){
      this.descripcion = d;
    },

    this.actualizarValor = function(nuevoValor){  
      if(typeof nuevoValor == "number" && nuevoValor >= 0){
        this.valor = nuevoValor;
      }
  },



  this.mostrarGastoCompleto = function(){//mal
    let res;
    res = this.mostrarGasto() +  ".";
    res = res + `\nFecha: ${new Date(this.fecha).toLocaleString()}\n`;
    res += `Etiquetas:\n-` ;
     for(let i = 0; i < this.etiquetas.length; i++) {
      res = res + ` ${this.etiquetas[i]}\n `;
     
     }
     return res;
  },


  this.actualizarFecha = function(nueva){//bien
    nueva = Date.parse(nueva);
    if(nueva){
      this.fecha = nueva;
    }

  },
  this.anyadirEtiquetas = function(...et){
     
    
  }

 
  this.borrarEtiquetas = function(...eb){
    
}
}












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
  
function calcularTotalGastos(){
  let suma = 0;
  for(let i of gastos){
    suma = suma + i.valor;
  }
  return suma;
} 


function calcularBalance(){
  
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
    calcularBalance

}
