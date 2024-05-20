
document.addEventListener('DOMContentLoaded', () => {
    // Función para actualizar la fecha y hora en tiempo real
    function actualizarFechaHora() {
        const fechaHora = new Date().toLocaleString();
        document.getElementById('fechaHora').innerText = `Fecha y hora: ${fechaHora}`;
    }

    // Actualizar la fecha y hora cada segundo
    setInterval(actualizarFechaHora, 1000);

    // Función para limpiar los cuadros de texto
    document.getElementById('limpiarDatos').addEventListener('click', () => {
        document.getElementById('locales').value = 'Puerta 7\nPuerta 3';
        document.getElementById('platos').value = '';
        document.getElementById('pedidos').value = '';
        actualizarNumerosDeLinea();
    });

    // Función para procesar los datos (simple log to console for now)
    document.getElementById('procesarDatos').addEventListener('click', () => {
        const locales = document.getElementById('locales').value.trim().split('\n');
        const platos = document.getElementById('platos').value.trim().split('\n');
        const pedidos = document.getElementById('pedidos').value.trim().split('\n');

        console.log('Locales:', locales);
        console.log('Platos:', platos);
        console.log('Pedidos:', pedidos);
    });

    // Función para imprimir los resultados
    document.getElementById('imprimirResultados').addEventListener('click', () => {
        window.print();
    });

    // Función para actualizar los números de línea
    function actualizarNumerosDeLinea() {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            const lineNumbers = textarea.previousElementSibling;
            const lines = textarea.value.split('\n').length;
            lineNumbers.innerHTML = '';
            for (let i = 1; i <= lines; i++) {
                const lineDiv = document.createElement('div');
                lineNumbers.appendChild(lineDiv);
            }
        });
    }

    // Agregar evento de input a los textareas para actualizar los números de línea
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', actualizarNumerosDeLinea);
        textarea.addEventListener('scroll', () => {
            textarea.previousElementSibling.scrollTop = textarea.scrollTop;
        });
    });

    // Inicializar números de línea al cargar la página
    actualizarNumerosDeLinea();
});
