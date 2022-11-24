import * as gesPresupuesto from "./gestionPresupuesto.js";
import * as gesPresupuestoWeb from './gestionPresupuestoWeb.js';

gesPresupuesto.actualizarPresupuesto(1500); //se actualiza el presupuesto
gesPresupuestoWeb.mostrarDatoEnId("presupuesto", gesPresupuesto.mostrarPresupuesto());//para mostrar el presupuesto, se llama a la función
//mostarDatoEnId(gestionPresupuestoWeb.js)(dentro se hará referencia al elemento identificador del HTML donde se mostrará en este
//caso el presupuesto y llamará su vez a la función mostrarPresupuesto(gestionPresupuesto))

let gasto1 =  new gesPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
gesPresupuesto.anyadirGasto(gasto1);

 gasto1 = new gesPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
gesPresupuesto.anyadirGasto(gasto1);

gasto1 = new gesPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
gesPresupuesto.anyadirGasto(gasto1);

gasto1 = new gesPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
gesPresupuesto.anyadirGasto(gasto1);

gasto1 = new gesPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
gesPresupuesto.anyadirGasto(gasto1);

gasto1 = new gesPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
gesPresupuesto.anyadirGasto(gasto1);

gesPresupuestoWeb.mostrarDatoEnId("gastos-totales", gesPresupuesto.calcularTotalGastos());
gesPresupuestoWeb.mostrarDatoEnId("balance-total", gesPresupuesto.calcularBalance());

for (let g of gesPresupuesto.listarGastos()){
    gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", g);
}

///////////////////////////////////////////////////////---Agrupar Gastos<---

gesPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia",gesPresupuesto.agruparGastos("dia"), "día");


gesPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes",gesPresupuesto.agruparGastos("mes"), "mes");


gesPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo",gesPresupuesto.agruparGastos("anyo"), "año");
///////////////////////////////////////////////////////


//////////////////////////Prueba filtrados----//////////////////////


for (let gt of gesPresupuesto.filtrarGastos({fechaDesde:"2021-09-01", fechaHasta:"2021-09-30"})){
    gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gt);
}


for (let gt of gesPresupuesto.filtrarGastos({valorMinimo: 50})){
    gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gt);
}


for (let gt of gesPresupuesto.filtrarGastos({etiquetas: "seguros", valorMinimo:200})){
    gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gt);
}


for (let gt of gesPresupuesto.filtrarGastos({etiquetas:"comida", etiquetas:"transporte", valorMinimo: 50})){
    gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gt);
}


////////////////////////////////////////////

