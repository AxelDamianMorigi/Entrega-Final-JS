// Definición de objetos y funciones

// Objeto literal para almacenar información de los autos
const autosInfo = {
  audi: {
    modelo: 'Audi',
    precioBase: 30000,
  },
  bmw: {
    modelo: 'BMW',
    precioBase: 35000,
  },
  'mercedes-benz': {
    modelo: 'Mercedes-Benz',
    precioBase: 40000,
  },
};

// Función constructora para crear objetos Auto
function Auto(modelo, precioBase) {
  this.modelo = modelo;
  this.precioBase = precioBase;
}

Auto.prototype.precioFinal = function(cuotas, interes, descuento) {
  let precioFinal = (this.precioBase + this.precioBase * interes) - this.precioBase * descuento;
  return precioFinal * cuotas;
};

// Arrays para el seguimiento de autos comprados y modelos disponibles
const autosComprados = [];
const modelosDisponibles = ['audi', 'bmw', 'mercedes-benz'];

// Variables globales
let nombre;
let apellido;
let edad;
let trabajo;
let auto;
let financiacion;
let cuotas;
let descuento = 0;
let interes;
let opcion;
let salir = false;
let promedioVentas = 0;

// Bucle principal
do {
  // Pedir información básica al usuario
  nombre = prompt('Ingrese su nombre:');
  apellido = prompt('Ingrese su apellido:');
  edad = parseInt(prompt('Ingrese su edad:'));
  trabajo = prompt('¿Tiene trabajo? (Sí o No):');

  // Saludo y bienvenida
  alert(`¡Hola ${nombre} ${apellido}! Bienvenido a nuestra concesionaria de autos.`);
  alert('¿En qué podemos ayudarte hoy?');
  console.log(`Nombre: ${nombre} ${apellido}, Edad: ${edad}, Trabajo: ${trabajo}`);

  // Comprobar si el usuario tiene trabajo
  if (trabajo.toLowerCase() === 'sí' || trabajo.toLowerCase() === 'si') {
    console.log(`Hola ${nombre} ${apellido}, tienes ${edad} años y tienes trabajo.`);

    // Preguntar sobre la compra de un auto
    auto = prompt('¿Qué automóvil desea comprar? (Audi, BMW, Mercedes-Benz):');

    // Validar elección de automóvil
    if (modelosDisponibles.includes(auto.toLowerCase())) {
      console.log(`Excelente elección, ha seleccionado un ${auto}.`);
    } else {
      alert('Lo sentimos, no tenemos ese modelo de automóvil disponible.');
      console.log('Gracias por visitarnos. ¡Hasta luego!');
      continue;
    }

    // Preguntar sobre la financiación
    financiacion = prompt('¿Necesita financiación? (Sí o No):');

    // Validar elección de financiación
    if (financiacion.toLowerCase() === 'sí' || financiacion.toLowerCase() === 'si') {
      console.log('Seleccione una opción de financiación:');
      console.log('1. 24 cuotas con 5% de interés.');
      console.log('2. 48 cuotas con 8% de interés.');
      console.log('3. 70 cuotas con 10% de interés.');

      // Pedir y validar la opción de financiación
      do {
        opcion = parseInt(prompt('Ingrese el número de la opción deseada (1, 2 o 3):'));
      } while (opcion < 1 || opcion > 3);

      // Configurar cuotas e interés según la opción
      switch (opcion) {
        case 1:
          cuotas = 24;
          interes = 0.05;
          break;
        case 2:
          cuotas = 48;
          interes = 0.08;
          break;
        case 3:
          cuotas = 70;
          interes = 0.10;
          break;
        default:
          console.log('Opción no válida.');
          break;
      }

      console.log(`Ha elegido financiación a ${cuotas} cuotas con un interés del ${interes * 100}%.`);

      // Calcular el descuento según la cantidad de cuotas
      if (cuotas >= 12) {
        descuento = 0.1; // 10% de descuento para más de 12 cuotas
      }

      // Crear un objeto Auto
      const autoSeleccionado = new Auto(auto, autosInfo[auto.toLowerCase()].precioBase);

      // Registrar la venta del auto
      autosComprados.push(autoSeleccionado);
      console.log(`Precio del ${auto} con descuento e interés: $${autoSeleccionado.precioFinal(cuotas, interes, descuento).toFixed(2)}`);
    } else {
      console.log('Entendido, pagará el auto al contado.');
    }
  } else {
    console.log(`Lo siento, ${nombre} ${apellido}, debes tener trabajo para comprar un auto.`);
  }

  // Simulación de calculadora
  console.log('Simulación de calculadora:');

  // Pedir una operación matemática y validarla
  let operacion = prompt('Ingrese una operación matemática (por ejemplo, 2 + 2):');
  while (!operacion) {
    operacion = prompt('Operación no válida. Ingrese una operación matemática (por ejemplo, 2 + 2):');
  }

  // Calcular y mostrar el resultado de la operación
  let resultado = eval(operacion);
  alert(`Resultado de la operación: ${operacion} = ${resultado}`);
  console.log(`Resultado de la operación: ${operacion} = ${resultado}`);

  // Preguntar si desea realizar otra operación
  let realizarOtraOperacion = prompt('¿Desea realizar otra operación? (Sí o No):');
  
  if (realizarOtraOperacion.toLowerCase() === 'no') {
    salir = true;
  }

} while (!salir);

// Funciones de orden superior

// Función de búsqueda
function buscarAutoPorModelo(modelo) {
  return autosComprados.find(auto => auto.modelo.toLowerCase() === modelo.toLowerCase());
}

// Función de filtro
function autosConDescuento() {
  return autosComprados.filter(auto => auto.descuento > 0);
}

// Función de mapeo
function obtenerPreciosFinales() {
  return autosComprados.map(auto => auto.precioFinal(cuotas, interes, descuento).toFixed(2));
}

// Función de reducción
function calcularTotalVentas() {
  return autosComprados.reduce((total, auto) => total + auto.precioFinal(cuotas, interes, descuento), 0).toFixed(2);
}

// Cálculo de IVA e Impuesto País al final
if (autosComprados.length > 0) {
  let totalVentas = calcularTotalVentas();
  promedioVentas = totalVentas / autosComprados.length;

  // Calcular IVA (21%)
  let iva = totalVentas * 0.21;

  // Calcular Impuesto País (30%)
  let impuestoPais = totalVentas * 0.30;

  totalVentas += iva + impuestoPais;

  console.log(`Promedio de ventas de autos: $${promedioVentas.toFixed(2)}`);
  console.log(`Total de ventas de autos con IVA e Impuesto País: $${totalVentas.toFixed(2)}`);
}
