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
  
    formularioCompra.on('submit', (event) => {
        event.preventDefault();
  
        const nombre = $('#nombre').val();
        const apellido = $('#apellido').val();
        const trabajo = $('#trabajo').val();
        const edad = parseInt($('#edad').val());
        const auto = $('#auto').val();
        const financiacion = $('#financiacion').val();
        const cuotas = parseInt($('#cuotas').val());
  
        // Verifica la edad
        if (edad < 18) {
            resultadoDiv.html('Lo siento, debes ser mayor de 18 años para comprar un automóvil.');
            return; // Detén el proceso aquí
        }
  
        const tieneTrabajo = trabajo.toLowerCase() === 'sí' || trabajo.toLowerCase() === 'si';
  
        if (tieneTrabajo && modelosDisponibles.includes(auto.toLowerCase())) {
            const tieneFinanciacion = financiacion.toLowerCase() === 'sí' || financiacion.toLowerCase() === 'si';
  
            resultadoDiv.html(tieneFinanciacion
                ? `Seleccione una opción de financiación:<br>1. 24 cuotas con 5% de interés.<br>2. 48 cuotas con 8% de interés.<br>3. 70 cuotas con 10% de interés.`
                : 'Entendido, pagará el auto al contado.');
  
            if (tieneFinanciacion) {
                let interes;
  
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
  
                resultadoDiv.html(`Ha elegido financiación a ${cuotas} cuotas con un interés del ${interes * 100}%.`);
  
                const descuento = cuotas >= 12 ? 0.1 : 0;
  
                const autoSeleccionado = new Auto(auto, autosInfo[auto.toLowerCase()]?.precioBase ?? 0);
                autoSeleccionado.descuento = descuento;
  
                autosComprados.push(autoSeleccionado);
                resultadoDiv.append(`<br>Precio del ${auto} con descuento e interés: $${autoSeleccionado.precioFinal(cuotas, interes, descuento).toFixed(2)}`);
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
  
    $('#guardarSession').on('click', () => {
        sessionStorage.setItem('autosComprados', JSON.stringify(autosComprados));
        resultadoDiv.html('Autos comprados guardados en sessionStorage.');
    });
  });
  
