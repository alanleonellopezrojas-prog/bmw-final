// ============ ESTADO DEL AUTO ============
let estadoAuto = {
    climaEncendido: false,
    temperatura: 22,
    puertasCerradas: true,
    ventanasAbiertas: false,
    asientosCalientes: false,
    asientosVentilados: false,
    volanteCaliente: false,
    cargando: false,
    bateria: 87,
    limiteCarga: 80,
    lucesEncendidas: false,
    modoPerro: false
};

// ============ INICIALIZAR ============
document.addEventListener('DOMContentLoaded', function() {
    actualizarUI();
    configurarTabs();
    configurarSliderCarga();
    
    // Simular actualización de presión de neumáticos
    setInterval(() => {
        if (document.getElementById('presionNeumaticos')) {
            let presion = (2.3 + Math.random() * 0.2).toFixed(1);
            document.getElementById('presionNeumaticos').innerHTML = presion + ' bar';
        }
    }, 10000);
});

// ============ NOTIFICACIONES ============
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Crear toast si no existe
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: #1a1a2e;
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            font-size: 14px;
            z-index: 9999;
            border-left: 4px solid #0066ff;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
            font-family: 'Inter', sans-serif;
        `;
        document.body.appendChild(toast);
    }
    
    toast.textContent = mensaje;
    toast.style.opacity = '1';
    
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 2500);
}

// ============ ACTUALIZAR INTERFAZ ============
function actualizarUI() {
    // Actualizar temperatura
    if (document.getElementById('temperatura')) {
        document.getElementById('temperatura').innerHTML = estadoAuto.temperatura + '°C';
    }
    if (document.getElementById('tempPrincipal')) {
        document.getElementById('tempPrincipal').innerHTML = estadoAuto.temperatura;
    }
    
    // Actualizar batería
    if (document.getElementById('bateriaValor')) {
        document.getElementById('bateriaValor').innerHTML = estadoAuto.bateria + '%';
    }
    if (document.getElementById('bateriaFill')) {
        document.getElementById('bateriaFill').style.width = estadoAuto.bateria + '%';
    }
    
    // Actualizar autonomía
    if (document.getElementById('autonomiaValor')) {
        let autonomia = Math.floor(estadoAuto.bateria * 4.8);
        document.getElementById('autonomiaValor').innerHTML = autonomia + ' km';
    }
    
    // Actualizar estado de puertas
    if (document.getElementById('estadoPuertas')) {
        document.getElementById('estadoPuertas').innerHTML = estadoAuto.puertasCerradas ? '🔒 Cerradas' : '🔓 Abiertas';
        document.getElementById('estadoPuertas').style.color = estadoAuto.puertasCerradas ? '#4caf50' : '#ff9800';
    }
    
    // Actualizar estado de ventanas
    if (document.getElementById('estadoVentanas')) {
        document.getElementById('estadoVentanas').innerHTML = estadoAuto.ventanasAbiertas ? '⬇️ Abiertas' : '⬆️ Cerradas';
        document.getElementById('estadoVentanas').style.color = estadoAuto.ventanasAbiertas ? '#ff9800' : '#4caf50';
    }
    
    // Actualizar texto del botón clima
    if (document.getElementById('climaBtnTexto')) {
        document.getElementById('climaBtnTexto').innerHTML = estadoAuto.climaEncendido ? '❄️ Apagar Clima' : '🔥 Encender Clima';
    }
}

// ============ CONFIGURAR TABS ============
function configurarTabs() {
    const botones = document.querySelectorAll('.nav-btn');
    const paneles = document.querySelectorAll('.panel');
    
    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            const tabId = boton.getAttribute('data-tab');
            
            botones.forEach(b => b.classList.remove('active'));
            boton.classList.add('active');
            
            paneles.forEach(p => p.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// ============ CONFIGURAR SLIDER CARGA ============
function configurarSliderCarga() {
    const slider = document.getElementById('sliderCarga');
    if (slider) {
        slider.addEventListener('input', (e) => {
            estadoAuto.limiteCarga = e.target.value;
            document.getElementById('limitePorcentaje').innerHTML = estadoAuto.limiteCarga + '%';
            mostrarNotificacion(`🔋 Límite de carga: ${estadoAuto.limiteCarga}%`);
        });
    }
}

// ============ 1. FUNCIONES DE CLIMATIZACIÓN ============
function cambiarTemp(delta) {
    let nuevaTemp = estadoAuto.temperatura + delta;
    if (nuevaTemp >= 16 && nuevaTemp <= 30) {
        estadoAuto.temperatura = nuevaTemp;
        actualizarUI();
        mostrarNotificacion(`🌡️ Temperatura ajustada a ${estadoAuto.temperatura}°C`);
    }
}

function toggleClima() {
    estadoAuto.climaEncendido = !estadoAuto.climaEncendido;
    actualizarUI();
    if (estadoAuto.climaEncendido) {
        mostrarNotificacion(`❄️ Clima encendido a ${estadoAuto.temperatura}°C`);
    } else {
        mostrarNotificacion(`🔴 Clima apagado`);
    }
}

function asientosCalientes() {
    estadoAuto.asientosCalientes = !estadoAuto.asientosCalientes;
    mostrarNotificacion(estadoAuto.asientosCalientes ? '🔥 Asientos calefaccionados ACTIVADOS' : 'Asientos calefaccionados DESACTIVADOS');
}

function asientosVentilados() {
    estadoAuto.asientosVentilados = !estadoAuto.asientosVentilados;
    mostrarNotificacion(estadoAuto.asientosVentilados ? '💨 Asientos ventilados ACTIVADOS' : 'Asientos ventilados DESACTIVADOS');
}

function volanteCaliente() {
    estadoAuto.volanteCaliente = !estadoAuto.volanteCaliente;
    mostrarNotificacion(estadoAuto.volanteCaliente ? '🔥 Volante caliente ACTIVADO' : 'Volante caliente DESACTIVADO');
}

function descongelarLuneta() {
    mostrarNotificacion('❄️ Descongelando luneta térmica y espejos laterales...');
    setTimeout(() => {
        mostrarNotificacion('✅ Luneta y espejos descongelados');
    }, 2000);
}

function modoPerro() {
    estadoAuto.modoPerro = !estadoAuto.modoPerro;
    if (estadoAuto.modoPerro) {
        mostrarNotificacion('🐕 MODO PERRO activado - Clima manteniéndose a 22°C');
    } else {
        mostrarNotificacion('MODO PERRO desactivado');
    }
}

// ============ 2. FUNCIONES DE ACCESOS ============
function cerrarPuertas() {
    estadoAuto.puertasCerradas = true;
    actualizarUI();
    mostrarNotificacion('🔒 TODAS las puertas CERRADAS');
}

function abrirPuertas() {
    estadoAuto.puertasCerradas = false;
    actualizarUI();
    mostrarNotificacion('🔓 TODAS las puertas ABIERTAS');
}

function abrirCajuela() {
    mostrarNotificacion('📦 Cajuela ABIERTA');
    setTimeout(() => {
        mostrarNotificacion('💡 Recuerda cerrar la cajuela');
    }, 3000);
}

function abrirFrunk() {
    mostrarNotificacion('📦 Frunk (maletero delantero) ABIERTO');
}

function subirVentanas() {
    estadoAuto.ventanasAbiertas = false;
    actualizarUI();
    mostrarNotificacion('⬆️ Ventanas SUBIDAS');
}

function bajarVentanas() {
    estadoAuto.ventanasAbiertas = true;
    actualizarUI();
    mostrarNotificacion('⬇️ Ventanas BAJADAS');
}

function encenderLuces() {
    estadoAuto.lucesEncendidas = !estadoAuto.lucesEncendidas;
    mostrarNotificacion(estadoAuto.lucesEncendidas ? '💡 Luces ENCENDIDAS - Busca tu auto' : '💡 Luces APAGADAS');
}

function activarBocina() {
    mostrarNotificacion('📢 ¡BOOOOCINA! Aquí está tu auto 🚗');
    // Efecto visual
    const bocinaAnim = document.createElement('div');
    bocinaAnim.textContent = '📢 ¡PIIIIII!';
    bocinaAnim.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 50px;
        background: rgba(0,0,0,0.8);
        padding: 20px;
        border-radius: 20px;
        z-index: 10000;
        animation: fadeOut 1s ease-out;
    `;
    document.body.appendChild(bocinaAnim);
    setTimeout(() => bocinaAnim.remove(), 1000);
}

// Añadir animación CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
    }
`;
document.head.appendChild(style);

function encontrarAuto() {
    mostrarNotificacion('📍 Tu auto está a 50 metros al NORESTE - Sigue la flecha →');
}

// ============ 3. FUNCIONES DE MONITOREO ============
function actualizarUbicacion() {
    const ubicaciones = [
        'Av. Siempre Viva 742, Zona Norte',
        'Calle Principal 123, Centro',
        'Blvd. de los Sueños 456, Sur',
        'Plaza Central, Local 1'
    ];
    const randomUbic = ubicaciones[Math.floor(Math.random() * ubicaciones.length)];
    document.getElementById('ubicacionTexto').innerHTML = randomUbic;
    mostrarNotificacion(`📍 Ubicación actualizada: ${randomUbic}`);
}

// ============ 4. FUNCIONES DE CARGA ============
function iniciarCarga() {
    if (estadoAuto.bateria >= 100) {
        mostrarNotificacion('✅ Batería ya está COMPLETAMENTE cargada');
        return;
    }
    estadoAuto.cargando = true;
    document.getElementById('estadoCargaTexto').innerHTML = '⚡ CONECTADO - Cargando...';
    document.getElementById('estadoCargaTexto').style.color = '#4caf50';
    mostrarNotificacion('🔌 Carga INICIADA - Tiempo estimado: 2 horas');
    
    // Simular carga
    if (window.intervaloCarga) clearInterval(window.intervaloCarga);
    window.intervaloCarga = setInterval(() => {
        if (estadoAuto.cargando && estadoAuto.bateria < estadoAuto.limiteCarga) {
            estadoAuto.bateria = Math.min(estadoAuto.bateria + 1, estadoAuto.limiteCarga);
            actualizarUI();
            if (estadoAuto.bateria >= estadoAuto.limiteCarga) {
                detenerCarga();
                mostrarNotificacion(`✅ Carga COMPLETADA al ${estadoAuto.limiteCarga}%`);
            }
        }
    }, 200);
}

function detenerCarga() {
    estadoAuto.cargando = false;
    if (window.intervaloCarga) clearInterval(window.intervaloCarga);
    document.getElementById('estadoCargaTexto').innerHTML = '⭕ DESCONECTADO';
    document.getElementById('estadoCargaTexto').style.color = '#ff9800';
    mostrarNotificacion('⏹️ Carga DETENIDA');
}

function programarCarga() {
    mostrarNotificacion('📅 Carga programada para las 2:00 AM (horario económico)');
}

// ============ 5. FUNCIONES DE UTILIDADES ============
function crearGeocerca() {
    mostrarNotificacion('🗺️ Geocerca CREADA - Te avisaré si el auto sale del área');
}

function compartirAcceso() {
    mostrarNotificacion('👥 Acceso temporal COMPARTIDO por 1 hora - Enlace enviado');
}

function verHistorial() {
    mostrarNotificacion('📊 Mostrando historial de los últimos 7 días');
}

function actualizarSoftware() {
    mostrarNotificacion('🔄 Buscando actualizaciones... Versión actual: 2025.03');
    setTimeout(() => {
        mostrarNotificacion('✅ Tu software está ACTUALIZADO');
    }, 2000);
}

// ============ EXPORTAR FUNCIONES GLOBALES ============
window.cambiarTemp = cambiarTemp;
window.toggleClima = toggleClima;
window.asientosCalientes = asientosCalientes;
window.asientosVentilados = asientosVentilados;
window.volanteCaliente = volanteCaliente;
window.descongelarLuneta = descongelarLuneta;
window.modoPerro = modoPerro;
window.cerrarPuertas = cerrarPuertas;
window.abrirPuertas = abrirPuertas;
window.abrirCajuela = abrirCajuela;
window.abrirFrunk = abrirFrunk;
window.subirVentanas = subirVentanas;
window.bajarVentanas = bajarVentanas;
window.encenderLuces = encenderLuces;
window.activarBocina = activarBocina;
window.encontrarAuto = encontrarAuto;
window.actualizarUbicacion = actualizarUbicacion;
window.iniciarCarga = iniciarCarga;
window.detenerCarga = detenerCarga;
window.programarCarga = programarCarga;
window.crearGeocerca = crearGeocerca;
window.compartirAcceso = compartirAcceso;
window.verHistorial = verHistorial;
window.actualizarSoftware = actualizarSoftware;