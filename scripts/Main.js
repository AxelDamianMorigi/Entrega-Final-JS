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

class Auto {
  constructor(modelo, precioBase) {
    this.modelo = modelo;
    this.precioBase = precioBase;
    this.descuento = 0;
  }

  precioFinal(cuotas, interes, descuento) {
    let precioFinal = (this.precioBase + this.precioBase * interes) - this.precioBase * descuento;
    return precioFinal * cuotas;
  }
}

const autosComprados = [];
const modelosDisponibles = ['audi', 'bmw', 'mercedes-benz'];

document.addEventListener('DOMContentLoaded', () => {
  const formularioCompra = document.getElementById('autoForm');
  const resultadoDiv = document.getElementById('resultado');
  const guardarLocalButton = document.getElementById('guardarLocal');
  const guardarSessionButton = document.getElementById('guardarSession');

  formularioCompra.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const trabajo = document.getElementById('trabajo').value;
    const auto = document.getElementById('auto').value;
    const financiacion = document.getElementById('financiacion').value;
    const cuotas = parseInt(document.getElementById('cuotas').value);

    const tieneTrabajo = trabajo.toLowerCase() === 'sí' || trabajo.toLowerCase() === 'si';

    if (tieneTrabajo && modelosDisponibles.includes(auto.toLowerCase())) {
      const tieneFinanciacion = financiacion.toLowerCase() === 'sí' || financiacion.toLowerCase() === 'si';

      resultadoDiv.innerHTML = tieneFinanciacion
        ? `Seleccione una opción de financiación:<br>1. 24 cuotas con 5% de interés.<br>2. 48 cuotas con 8% de interés.<br>3. 70 cuotas con 10% de interés.`
        : 'Entendido, pagará el auto al contado.';

      if (tieneFinanciacion) {
        let opcion = parseInt(prompt('Ingrese el número de la opción deseada (1, 2 o 3):') || '0');

        while (opcion < 1 || opcion > 3) {
          opcion = parseInt(prompt('Ingrese el número de la opción deseada (1, 2 o 3):') || '0');
        }

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

        const descuento = cuotas >= 12 ? 0.1 : 0;

        const autoSeleccionado = new Auto(auto, autosInfo[auto.toLowerCase()]?.precioBase ?? 0);
        autoSeleccionado.descuento = descuento;

        autosComprados.push(autoSeleccionado);
        resultadoDiv.innerHTML += `<br>Precio del ${auto} con descuento e interés: $${autoSeleccionado.precioFinal(cuotas, interes, descuento).toFixed(2)}`;
      }
    } else {
      resultadoDiv.innerHTML = tieneTrabajo
        ? `Lo siento, ${nombre} ${apellido}, debes tener trabajo para comprar un auto.`
        : 'Lo siento, debes tener trabajo para comprar un auto.';
    }
  });

  guardarLocalButton.addEventListener('click', () => {
    localStorage.setItem('autosComprados', JSON.stringify(autosComprados));
    alert('Autos comprados guardados en localStorage.');
  });

  guardarSessionButton.addEventListener('click', () => {
    sessionStorage.setItem('autosComprados', JSON.stringify(autosComprados));
    alert('Autos comprados guardados en sessionStorage.');
  });
});
