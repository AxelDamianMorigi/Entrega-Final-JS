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

function Auto(modelo, precioBase) {
  this.modelo = modelo;
  this.precioBase = precioBase;
  this.descuento = 0;
}

Auto.prototype.precioFinal = function(cuotas, interes, descuento) {
  let precioFinal = (this.precioBase + this.precioBase * interes) - this.precioBase * descuento;
  return precioFinal * cuotas;
};

const autosComprados = [];
const modelosDisponibles = ['audi', 'bmw', 'mercedes-benz'];

let salir = false;

const formularioCompra = document.getElementById('autoForm');
const resultadoDiv = document.getElementById('resultado');
const guardarLocalButton = document.getElementById('guardarLocal');
const guardarSessionButton = document.getElementById('guardarSession');

formularioCompra.addEventListener('submit', function (event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const edad = parseInt(document.getElementById('edad').value);
  const trabajo = document.getElementById('trabajo').value;
  const auto = document.getElementById('auto').value;
  const financiacion = document.getElementById('financiacion').value;
  const cuotas = document.getElementById('cuotas').value;

  if (trabajo.toLowerCase() === 'sí' || trabajo.toLowerCase() === 'si') {
    if (modelosDisponibles.includes(auto.toLowerCase())) {
      if (financiacion.toLowerCase() === 'sí' || financiacion.toLowerCase() === 'si') {
        resultadoDiv.innerHTML = 'Seleccione una opción de financiación:<br>';
        resultadoDiv.innerHTML += '1. 24 cuotas con 5% de interés.<br>';
        resultadoDiv.innerHTML += '2. 48 cuotas con 8% de interés.<br>';
        resultadoDiv.innerHTML += '3. 70 cuotas con 10% de interés.<br>';

        let opcion;
        do {
          opcion = parseInt(prompt('Ingrese el número de la opción deseada (1, 2 o 3):'));
        } while (opcion < 1 || opcion > 3);

        let cuotas;
        let interes;
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
            resultadoDiv.innerHTML = 'Opción no válida.';
            return;
        }

        resultadoDiv.innerHTML = `Ha elegido financiación a ${cuotas} cuotas con un interés del ${interes * 100}%.`;

        let descuento = 0;
        if (cuotas >= 12) {
          descuento = 0.1;
        }

        const autoSeleccionado = new Auto(auto, autosInfo[auto.toLowerCase()].precioBase);
        autoSeleccionado.descuento = descuento;

        autosComprados.push(autoSeleccionado);
        resultadoDiv.innerHTML += `<br>Precio del ${auto} con descuento e interés: $${autoSeleccionado.precioFinal(cuotas, interes, descuento).toFixed(2)}`;
      } else {
        resultadoDiv.innerHTML = 'Entendido, pagará el auto al contado.';
      }
    } else {
      resultadoDiv.innerHTML = 'Lo sentimos, no tenemos ese modelo de automóvil disponible.';
    }
  } else {
    resultadoDiv.innerHTML = `Lo siento, ${nombre} ${apellido}, debes tener trabajo para comprar un auto.`;
  }

  resultadoDiv.innerHTML += '<br>Simulación de calculadora:';
  let operacion = prompt('Ingrese una operación matemática (por ejemplo, 2 + 2):');
  while (!operacion) {
    operacion = prompt('Operación no válida. Ingrese una operación matemática (por ejemplo, 2 + 2):');
  }

  let resultado = eval(operacion);
  resultadoDiv.innerHTML += `<br>Resultado de la operación: ${operacion} = ${resultado}`;

  let realizarOtraOperación = prompt('¿Desea realizar otra operación? (Sí o No):');

  if (realizarOtraOperación.toLowerCase() === 'no') {
    salir = true;
  }
});

guardarLocalButton.addEventListener('click', function () {
  localStorage.setItem('autosComprados', JSON.stringify(autosComprados));
  alert('Autos comprados guardados en localStorage.');
});

guardarSessionButton.addEventListener('click', function () {
  sessionStorage.setItem('autosComprados', JSON.stringify(autosComprados));
  alert('Autos comprados guardados en sessionStorage.');
});

document.addEventListener('DOMContentLoaded', function() {
  const formularioCompra = document.getElementById('autoForm');
  const resultadoDiv = document.getElementById('resultado');

  formularioCompra.addEventListener('submit', function (event) {
    event.preventDefault(); 
  });
});
