// ========== ESTADO DEL AUTO ==========
let carState = {
    climateOn: false,
    temperature: 22,
    doorsLocked: true,
    windowsOpen: false,
    charging: false,
    battery: 87,
    chargeLimit: 80,
    animationTimeout: null
};

let chargingInterval = null;
let cameraInterval = null;

// ========== LOGIN ==========
function doLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (email && password) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('appContainer').style.display = 'block';
        showNotification(`Bienvenido, ${email.split('@')[0]} 🚗`);
        startCameraSimulation();
    } else {
        showNotification('Ingresa tu correo y contraseña');
    }
}

function logout() {
    if (cameraInterval) clearInterval(cameraInterval);
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('appContainer').style.display = 'none';
    showNotification('Sesión cerrada');
}

// ========== NOTIFICACIONES ==========
function showNotification(message) {
    let toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ========== ACTUALIZAR UI ==========
function updateUI() {
    document.getElementById('tempValue').innerHTML = carState.temperature;
    document.getElementById('batteryValue').innerHTML = carState.battery + '%';
    document.getElementById('batteryValue2').innerHTML = carState.battery + '%';
    document.getElementById('batteryFill').style.width = carState.battery + '%';
    document.getElementById('rangeValue').innerHTML = Math.floor(carState.battery * 4.8) + ' km';
    
    const climateBtn = document.getElementById('climateBtn');
    if (carState.climateOn) {
        climateBtn.innerHTML = '❄️ Apagar Clima';
    } else {
        climateBtn.innerHTML = '🔥 Encender Clima';
    }
    
    document.getElementById('doorStatus').innerHTML = carState.doorsLocked ? '🔒 Cerradas' : '🔓 Abiertas';
    document.getElementById('windowStatus').innerHTML = carState.windowsOpen ? '⬇️ Abiertas' : '⬆️ Cerradas';
}

// ========== CONFIGURAR TABS ==========
function setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            panels.forEach(p => p.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// ========== CONFIGURAR SLIDER CARGA ==========
function setupChargeSlider() {
    const slider = document.getElementById('chargeLimit');
    if (slider) {
        slider.addEventListener('input', (e) => {
            carState.chargeLimit = parseInt(e.target.value);
            document.getElementById('limitValue').innerHTML = carState.chargeLimit + '%';
            showNotification(`Límite de carga: ${carState.chargeLimit}%`);
        });
    }
}

// ========== ANIMACIÓN DEL CLIMA (NUEVO) ==========
function showClimateAnimation(isCooling) {
    const overlay = document.getElementById('climateAnimation');
    const snowEffect = document.getElementById('snowEffect');
    const heatEffect = document.getElementById('heatEffect');
    const statusText = document.getElementById('climateStatusText');
    
    // Limpiar efectos anteriores
    snowEffect.innerHTML = '';
    heatEffect.classList.remove('active');
    snowEffect.classList.remove('active');
    
    if (isCooling) {
        // Animación de frío (nieve)
        statusText.textContent = '❄️ ENFRIANDO... ❄️';
        snowEffect.classList.add('active');
        for (let i = 0; i < 30; i++) {
            const snowflake = document.createElement('i');
            snowflake.className = 'fas fa-snowflake';
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.animationDelay = Math.random() * 2 + 's';
            snowflake.style.animationDuration = 1 + Math.random() * 2 + 's';
            snowEffect.appendChild(snowflake);
        }
    } else {
        // Animación de calor
        statusText.textContent = '🔥 CALENTANDO... 🔥';
        heatEffect.classList.add('active');
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const wave = document.createElement('div');
                wave.className = 'heat-waves-temp';
                heatEffect.appendChild(wave);
                setTimeout(() => wave.remove(), 500);
            }, i * 100);
        }
    }
    
    overlay.classList.add('active');
    
    if (carState.animationTimeout) clearTimeout(carState.animationTimeout);
    carState.animationTimeout = setTimeout(() => {
        overlay.classList.remove('active');
        snowEffect.classList.remove('active');
        heatEffect.classList.remove('active');
    }, 2000);
}

function toggleClimateWithAnimation() {
    carState.climateOn = !carState.climateOn;
    
    // Mostrar animación según el modo
    if (carState.climateOn) {
        // Si la temperatura es baja, muestra calor; si es alta, muestra frío
        const isCooling = carState.temperature < 22;
        showClimateAnimation(isCooling);
        showNotification(`❄️ Clima encendido a ${carState.temperature}°C`);
    } else {
        showNotification('🔴 Clima apagado');
    }
    
    updateUI();
}

// ========== CLIMATIZACIÓN ==========
function changeTemp(delta) {
    let newTemp = carState.temperature + delta;
    if (newTemp >= 16 && newTemp <= 30) {
        carState.temperature = newTemp;
        updateUI();
        showNotification(`🌡️ Temperatura: ${carState.temperature}°C`);
    }
}

// ========== ACCESOS ==========
function lockDoors() {
    carState.doorsLocked = true;
    updateUI();
    showNotification('🔒 Puertas cerradas');
}

function unlockDoors() {
    carState.doorsLocked = false;
    updateUI();
    showNotification('🔓 Puertas abiertas');
}

function windowsUp() {
    carState.windowsOpen = false;
    updateUI();
    showNotification('⬆️ Ventanas subidas');
}

function windowsDown() {
    carState.windowsOpen = true;
    updateUI();
    showNotification('⬇️ Ventanas bajadas');
}

function findMyCar() {
    showNotification('📍 Tu auto está a 50 metros al noreste');
}

// ========== MONITOREO ==========
function updateLocation() {
    const locations = [
        'Av. Reforma 123, CDMX',
        'Blvd. Miguel de Cervantes 456',
        'Paseo de la Reforma 789',
        'Av. Insurgentes Sur 321'
    ];
    const randomLoc = locations[Math.floor(Math.random() * locations.length)];
    document.getElementById('locationText').innerHTML = randomLoc;
    showNotification(`📍 Ubicación actualizada: ${randomLoc}`);
}

// ========== CÁMARAS EN TIEMPO REAL ==========
function startCameraSimulation() {
    // Simular cambios en las cámaras cada 3 segundos
    if (cameraInterval) clearInterval(cameraInterval);
    
    cameraInterval = setInterval(() => {
        // Cambiar el ícono de las cámaras para simular "live"
        const cameras = document.querySelectorAll('.camara-preview');
        cameras.forEach(cam => {
            const icon = cam.querySelector('i');
            if (icon) {
                icon.style.opacity = '0.7';
                setTimeout(() => {
                    icon.style.opacity = '1';
                }, 200);
            }
        });
    }, 3000);
}

function refreshCameras() {
    showNotification('📷 Actualizando feed de cámaras...');
    
    // Simular actualización de imágenes
    const cameras = document.querySelectorAll('.camara-preview');
    cameras.forEach((cam, index) => {
        const icon = cam.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1.1)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 300);
        }
    });
    
    setTimeout(() => {
        showNotification('✅ Cámaras actualizadas');
    }, 1000);
}

// ========== CARGA ==========
function startCharging() {
    if (carState.battery >= carState.chargeLimit) {
        showNotification('✅ Batería ya en el límite establecido');
        return;
    }
    carState.charging = true;
    document.getElementById('chargingText').innerHTML = '⚡ Conectado - Cargando...';
    showNotification('🔌 Carga iniciada');
    
    if (chargingInterval) clearInterval(chargingInterval);
    chargingInterval = setInterval(() => {
        if (carState.charging && carState.battery < carState.chargeLimit) {
            carState.battery = Math.min(carState.battery + 1, carState.chargeLimit);
            updateUI();
            if (carState.battery >= carState.chargeLimit) {
                stopCharging();
                showNotification(`✅ Carga completada al ${carState.chargeLimit}%`);
            }
        }
    }, 400);
}

function stopCharging() {
    carState.charging = false;
    if (chargingInterval) clearInterval(chargingInterval);
    document.getElementById('chargingText').innerHTML = '⭕ Desconectado';
    showNotification('⏹️ Carga detenida');
}

// ========== SIMULAR NEUMÁTICOS ==========
setInterval(() => {
    const pressure = (2.3 + Math.random() * 0.3).toFixed(1);
    const tireElement = document.getElementById('tirePressure');
    if (tireElement) {
        tireElement.innerHTML = pressure + ' bar';
    }
}, 15000);

// ========== INICIALIZAR ==========
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    setupTabs();
    setupChargeSlider();
});

// Exponer funciones globales
window.changeTemp = changeTemp;
window.toggleClimateWithAnimation = toggleClimateWithAnimation;
window.lockDoors = lockDoors;
window.unlockDoors = unlockDoors;
window.windowsUp = windowsUp;
window.windowsDown = windowsDown;
window.findMyCar = findMyCar;
window.updateLocation = updateLocation;
window.startCharging = startCharging;
window.stopCharging = stopCharging;
window.doLogin = doLogin;
window.logout = logout;
window.showNotification = showNotification;
window.refreshCameras = refreshCameras;