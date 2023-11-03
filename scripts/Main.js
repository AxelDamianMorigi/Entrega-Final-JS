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
    }
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
  
  $(document).ready(() => {
    const formularioCompra = $('#autoForm');
    const resultadoDiv = $('#resultado');
    const autosCompradosList = $('#autosCompradosList');
    let interes;
  
    formularioCompra.on('submit', (event) => {
      event.preventDefault();
  
      const nombre = $('#nombre').val();
      const apellido = $('#apellido').val();
      const trabajo = $('#trabajo').val();
      const auto = $('#auto').val();
      const financiacion = $('#financiacion').val();
      const cuotas = parseInt($('#cuotas').val());
  
      const tieneTrabajo = trabajo.toLowerCase() === 'sí' || trabajo.toLowerCase() === 'si';
  
      if (tieneTrabajo && modelosDisponibles.includes(auto.toLowerCase())) {
        if (financiacion.toLowerCase() === 'no') {
          resultadoDiv.html('Entendido, pagará el auto al contado.');
  
          autosComprados.push({
            modelo: auto,
            cuotas: 0, // Indicamos cuotas como 0 para denotar que es al contado
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
            case 70:
              interes = 0.10;
              break;
            default:
              resultadoDiv.html('Opción no válida.');
              return;
          }
  
          const financiacionInfo = `Ha elegido financiación a ${cuotas} cuotas con un interés del ${interes * 100}%.`;
  
          resultadoDiv.html(`Nombre: ${nombre}<br>Apellido: ${apellido}<br>${financiacionInfo}`);
  
          const descuento = cuotas >= 12 ? 0.1 : 0;
  
          const autoSeleccionado = new Auto(auto, autosInfo[auto.toLowerCase()]?.precioBase ?? 0);
          autoSeleccionado.descuento = descuento;
  
          autosComprados.push({
            modelo: autoSeleccionado.modelo,
            cuotas: cuotas,
            interes: interes,
            descuento: autoSeleccionado.descuento
          });
        }
      } else {
        resultadoDiv.html(tieneTrabajo
          ? `Lo siento, ${nombre} ${apellido}, debes tener trabajo para comprar un auto.`
          : 'Lo siento, debes tener trabajo para comprar un auto.');
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
            precio = autosInfo[auto.modelo]?.precioBase || 0;
          } else {
            const autoSeleccionado = new Auto(auto.modelo, autosInfo[auto.modelo]?.precioBase || 0);
            autoSeleccionado.descuento = auto.descuento;
            precio = autoSeleccionado.precioFinal(auto.cuotas, auto.interes, auto.descuento);
          }
  
          const descripcion = auto.cuotas === 0 ? 'Al contado' : `${auto.cuotas} cuotas`;
  
          const li = `<li>Modelo: ${auto.modelo}, Precio: $${precio.toFixed(2)} (${descripcion})</li>`;
          autosCompradosList.append(li);
        }
      } else {
        resultadoDiv.html('No se encontraron autos comprados en el localStorage.');
      }
    });
  });
  
