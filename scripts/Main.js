// Funciones para operaciones matemáticas
function sumar(a, b) {
    return a + b;
  }
  
  function restar(a, b) {
    return a - b;
  }
  
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
  const autosComprados = [];
  let promedioVentas = 0;
  
  do {
    // Pedir información básica al usuario
    nombre = prompt("Ingrese su nombre:");
    apellido = prompt("Ingrese su apellido:");
    edad = parseInt(prompt("Ingrese su edad:"));
    trabajo = prompt("¿Tiene trabajo? (Sí o No):");
  
    // Saludo y bienvenida
    alert(`¡Hola ${nombre} ${apellido}! Bienvenido a nuestra concesionaria de autos.`);
    alert("¿En qué podemos ayudarte hoy?");
    console.log(`Nombre: ${nombre} ${apellido}, Edad: ${edad}, Trabajo: ${trabajo}`);
  
    // Comprobar si el usuario tiene trabajo
    if (trabajo.toLowerCase() === "sí" || trabajo.toLowerCase() === "si") {
      console.log(`Hola ${nombre} ${apellido}, tienes ${edad} años y tienes trabajo.`);
  
      // Preguntar sobre la compra de un auto
      auto = prompt("¿Qué automóvil desea comprar? (Audi, BMW, Mercedes-Benz):");
  
      // Validar elección de automóvil
      switch (auto.toLowerCase()) {
        case "audi":
        case "bmw":
        case "mercedes-benz":
          console.log(`Excelente elección, ha seleccionado un ${auto}.`);
          break;
        default:
          alert("Lo sentimos, no tenemos ese modelo de automóvil disponible.");
          console.log("Gracias por visitarnos. ¡Hasta luego!");
          continue;
      }
  
      // Preguntar sobre la financiación
      financiacion = prompt("¿Necesita financiación? (Sí o No):");
  
      // Validar elección de financiación
      if (financiacion.toLowerCase() === "sí" || financiacion.toLowerCase() === "si") {
        console.log("Seleccione una opción de financiación:");
        console.log("1. 24 cuotas con 5% de interés.");
        console.log("2. 48 cuotas con 8% de interés.");
        console.log("3. 70 cuotas con 10% de interés.");
  
        // Pedir y validar la opción de financiación
        do {
          opcion = parseInt(prompt("Ingrese el número de la opción deseada (1, 2 o 3):"));
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
            console.log("Opción no válida.");
            break;
        }
  
        console.log(`Ha elegido financiación a ${cuotas} cuotas con un interés del ${interes * 100}%.`);
  
        // Calcular el descuento según la cantidad de cuotas
        if (cuotas >= 12) {
          descuento = 0.1; // 10% de descuento para más de 12 cuotas
        }
  
        // Registrar la venta del auto
        let preciosAutos = {
          "audi": 30000,    // Precio base del Audi (puedes cambiarlo)
          "bmw": 35000,     // Precio base del BMW (puedes cambiarlo)
          "mercedes-benz": 40000  // Precio base del Mercedes-Benz (puedes cambiarlo)
        };
  
        let precioAuto = preciosAutos[auto.toLowerCase()];
        let precioFinal = (precioAuto + (precioAuto * interes)) - (precioAuto * descuento);
        autosComprados.push(precioFinal);
        console.log(`Precio del ${auto} con descuento e interés: $${precioFinal.toFixed(2)}`);
      } else {
        console.log("Entendido, pagará el auto al contado.");
      }
    } else {
      console.log(`Lo siento, ${nombre} ${apellido}, debes tener trabajo para comprar un auto.`);
    }
  
    // Simulación de calculadora
    console.log("Simulación de calculadora:");
  
    // Pedir una operación matemática y validarla
    let operacion = prompt("Ingrese una operación matemática (por ejemplo, 2 + 2):");
    while (!operacion) {
      operacion = prompt("Operación no válida. Ingrese una operación matemática (por ejemplo, 2 + 2):");
    }
  
    // Calcular y mostrar el resultado de la operación
    let resultado = eval(operacion);
    alert(`Resultado de la operación: ${operacion} = ${resultado}`);
    console.log(`Resultado de la operación: ${operacion} = ${resultado}`);
  
    // Confirmación de compra con descuento
    if (descuento > 0) {
      let confirmarCompra = prompt("¿Desea confirmar la compra con descuento? (Sí o No):");
  
      if (confirmarCompra.toLowerCase() === "sí" || confirmarCompra.toLowerCase() === "si") {
        console.log("Gracias por su compra con descuento.");
      } else {
        console.log("Gracias por visitarnos. ¡Hasta luego!");
      }
    } else {
      console.log("Gracias por visitarnos. ¡Hasta luego!");
    }
  
    // Preguntar si desea salir del programa
    let salirPrograma = prompt("¿Desea salir del programa? (Presione ESC para salir o cualquier otra tecla para continuar)");
  
    if (salirPrograma === null || salirPrograma.toLowerCase() === "esc") {
      salir = true;
    }
  } while (!salir);
  
  // Cálculo de IVA e Impuesto País al final
  if (autosComprados.length > 0) {
    let totalVentas = autosComprados.reduce((total, venta) => total + venta, 0);
    promedioVentas = totalVentas / autosComprados.length;
  
    // Calcular IVA (21%)
    let iva = totalVentas * 0.21;
  
    // Calcular Impuesto País (30%)
    let impuestoPais = totalVentas * 0.30;
  
    totalVentas += iva + impuestoPais;
  
    console.log(`Promedio de ventas de autos: $${promedioVentas.toFixed(2)}`);
    console.log(`Total de ventas de autos con IVA e Impuesto País: $${totalVentas.toFixed(2)}`);
  }
  