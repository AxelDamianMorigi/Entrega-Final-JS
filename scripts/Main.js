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
  let autosInfo = {};
  
  function cargarDatosAutos() {
    fetch('scripts/autos.json')
      .then(response => response.json())
      .then(data => {
        autosInfo = data;
      })
      .catch(error => console.error(error));
  }
  
  document.addEventListener('DOMContentLoaded', cargarDatosAutos);
  
  $(document).ready(() => {
    const formularioCompra = $('#autoForm');
    const resultadoDiv = $('#resultado');
    const autosCompradosList = $('#autosCompradosList');
  
    formularioCompra.on('submit', (event) => {
      event.preventDefault();
  
      const nombre = $('#nombre').val();
      const apellido = $('#apellido').val();
      const trabajo = $('#trabajo').val();
      const auto = $('#auto').val();
      const financiacion = $('#financiacion').val();
      const cuotas = parseInt($('#cuotas').val());
  
      const tieneTrabajo = trabajo.toLowerCase() === 'sí' || trabajo.toLowerCase() === 'si';
  
      if (!tieneTrabajo) {
        resultadoDiv.html('Lo siento, debes tener trabajo para comprar un auto.');
        return;
      }
  
      const modelosDisponibles = Object.keys(autosInfo);
  
      if (!modelosDisponibles.includes(auto.toLowerCase())) {
        resultadoDiv.html(`Lo siento, no tenemos el modelo seleccionado.`);
        return;
      }
  
      let interes = 0;
  
      if (financiacion.toLowerCase() === 'no') {
        resultadoDiv.html('Entendido, pagará el auto al contado.');
  
        autosComprados.push({
          modelo: auto,
          cuotas: 0,
          interes: 0,
          descuento: 0
        });
      } else {
        switch (cuotas) {
          case 24:
            interes = 0.05;
            break;
          case 48:
            interes = 0.08;
            break;
          case 72:
            interes = 0.10;
            break;
          default:
            resultadoDiv.html('Opción de financiación no válida.');
            return;
        }
  
        const financiacionInfo = `Ha elegido financiación a ${cuotas} cuotas con un interés del ${interes * 100}%.`;
  
        resultadoDiv.html(`Nombre: ${nombre}<br>Apellido: ${apellido}<br>${financiacionInfo}`);
  
        const descuento = cuotas >= 12 ? 0.1 : 0;
  
        const autoSeleccionado = new Auto(auto, autosInfo[auto.toLowerCase()].precioBase);
        autoSeleccionado.descuento = descuento;
  
        autosComprados.push({
          modelo: autoSeleccionado.modelo,
          cuotas: cuotas,
          interes: interes,
          descuento: autoSeleccionado.descuento
        });
      }
    });
  
    $('#guardarLocal').on('click', () => {
      localStorage.setItem('autosComprados', JSON.stringify(autosComprados));
      resultadoDiv.html('Autos comprados guardados en localStorage.');
    });
  
    $('#mostrarLocal').on('click', () => {
      const autosCompradosJSON = localStorage.getItem('autosComprados');
      const autosComprados = JSON.parse(autosCompradosJSON);
  
      if (autosComprados && autosComprados.length > 0) {
        autosCompradosList.empty();
  
        for (const auto of autosComprados) {
          let precio = 0;
  
          if (auto.cuotas === 0) {
            precio = autosInfo[auto.modelo].precioBase;
          } else {
            const autoSeleccionado = new Auto(auto.modelo, autosInfo[auto.modelo].precioBase);
            autoSeleccionado.descuento = auto.descuento;
            precio = autoSeleccionado.precioFinal(auto.cuotas, auto.interes, auto.descuento);
          }
  
          const descripcion = auto.cuotas === 0 ? 'Al contado' : `${auto.cuotas} cuotas`;
  
          const li = `<li>Modelo: ${auto.modelo}, Precio: $${precio.toFixed(2)} (${descripcion})</li>`;
          autosCompradosList.append(li);
        }
      } else {
        resultadoDiv.html('No hay información de autos comprados en localStorage.');
      }
    });
  });
  