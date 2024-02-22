const apiURL = "https://mindicador.cl/api/";
const selectMonedas = document.getElementById("monedas");
const montoInput = document.getElementById("montoInput");
const calcularBtn = document.getElementById("calcularBtn");
const resultadoH3 = document.getElementById("resultado");
const historialCanvas = document.getElementById("historialCanvas");

async function getDivisas() {
    try {
        const res = await fetch(apiURL);
        const divisas = await res.json();
        return divisas;
    } catch (error) {
        console.error("Error al obtener datos:", error);
        return null;
    }
}

async function renderDivisas() {
    try {
        const divisas = await getDivisas();

        if (divisas && Object.keys(divisas).length > 0) {
            const opciones = Object.keys(divisas)
                .filter(codigoMoneda => typeof divisas[codigoMoneda] === 'object')
                .map(codigoMoneda => {
                    const moneda = divisas[codigoMoneda];
                    return `<option value="${codigoMoneda}">${moneda.nombre}</option>`;
                });

            selectMonedas.innerHTML = opciones.join("");
        } else {
            console.error("La respuesta de la API no contiene datos válidos.");
        }
    } catch (error) {
        console.error("Error al renderizar divisas:", error);
    }
}

async function calcularConversion() {
    try {
        const divisas = await getDivisas();
        const monto = parseFloat(montoInput.value);
        const monedaSeleccionada = selectMonedas.value;

        if (!isNaN(monto) && monedaSeleccionada) {
            const tasaConversion = divisas[monedaSeleccionada].valor;
            const resultado = monto * tasaConversion;

            resultadoH3.textContent = `Resultado: ${resultado.toFixed(2)} ${monedaSeleccionada}`;
          
        } else {
            resultadoH3.textContent = "Ingrese un monto válido y seleccione una moneda.";
        }
    } catch (error) {
        console.error("Error al calcular la conversión:", error);
    }
}



calcularBtn.addEventListener("click", calcularConversion);

// Llama a la función renderDivisas para cargar las opciones del select
renderDivisas();