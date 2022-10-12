   
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;

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
    
  function CrearGasto(descripcion, valor) {
    //TODO
    this.descripcion = descripcion;
    this.valor = valor;
    this.valor = valor < 0 || isNaN(this.valor) ? 0: this.valor;
    
    this.mostrarGasto = function(){
      return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

     this.actualizarDescripcion = function(d){
      this.descripcion = d;
    }

    this.actualizarValor = function(nuevoValor){
      this.valor = nuevoValor;
      
      this.nuevoValor = nuevoValor < 0 || isNaN(this.nuevoValor) ? this.valor: this.nuevoValor;
    
  }
    
    
  
    
}

     
    
    
    

    
     
    
 
    
   
 

    
  
  
 
   
  


 


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
