const entradaTexto = document.getElementById('input-text');
const botonAnalizar = document.getElementById('analyze-button');
const tablaResultados = document.getElementById('results-table');
const botonDescargar = document.getElementById('download-button');

entradaTexto.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.shiftKey) {
        analizarTexto();
    }
});

botonDescargar.addEventListener('click', descargarPDF);
botonAnalizar.addEventListener('click', analizarTexto);

function analizarTexto() {
    const texto = entradaTexto.value.toLowerCase();
    const palabras = texto.split(' ');

    const frecuencia = {};
    for (const palabra of palabras) {
        if (frecuencia[palabra]) {
            frecuencia[palabra]++;
        } else {
            frecuencia[palabra] = 1;
        }
    }

    const frecuenciasOrdenadas = Object.entries(frecuencia).sort((a, b) => b[1] - a[1]);

    const tablaCuerpo = tablaResultados.querySelector('tbody');
    tablaCuerpo.innerHTML = ''; // Clear existing results

    for (const [palabra, frecuencia] of frecuenciasOrdenadas) {
        const fila = tablaCuerpo.insertRow();
        const celdaPalabra = fila.insertCell();
        const celdaFrecuencia = fila.insertCell();

        celdaPalabra.textContent = palabra;
        celdaFrecuencia.textContent = frecuencia;
    }
}

function descargarPDF() {
    // Create a new PDF document
    const doc = new jsPDF('p', 'mm', 'a4');

    // Convert table HTML to PDF table
    const tableHTML = resultsTable.outerHTML;
    const pdfTable = doc.table({ html: tableHTML, startY: 10, fontSize: 10 });

    // Set document properties
    doc.setFontSize(12);
    doc.autoTable({
        startY: pdfTable.y + pdfTable.height + 10,
        html: `
            <h2 style="text-align: center;">Word Frequency Results</h2>
        `
    });

    // Save the PDF
    doc.save('word_frequency_results.pdf');
}