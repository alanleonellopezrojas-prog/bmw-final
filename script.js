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
        initReportCharts();
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

function showNotification(message) {
    let toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

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

function showClimateAnimation(isCooling) {
    const overlay = document.getElementById('climateAnimation');
    const snowEffect = document.getElementById('snowEffect');
    const heatEffect = document.getElementById('heatEffect');
    const statusText = document.getElementById('climateStatusText');
    
    snowEffect.innerHTML = '';
    heatEffect.classList.remove('active');
    snowEffect.classList.remove('active');
    
    if (isCooling) {
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
        statusText.textContent = '🔥 CALENTANDO... 🔥';
        heatEffect.classList.add('active');
    }
    
    overlay.classList.add('active');
    if (carState.animationTimeout) clearTimeout(carState.animationTimeout);
    carState.animationTimeout = setTimeout(() => {
        overlay.classList.remove('active');
    }, 2000);
}

function toggleClimateWithAnimation() {
    carState.climateOn = !carState.climateOn;
    if (carState.climateOn) {
        const isCooling = carState.temperature < 22;
        showClimateAnimation(isCooling);
        showNotification(`❄️ Clima encendido a ${carState.temperature}°C`);
    } else {
        showNotification('🔴 Clima apagado');
    }
    updateUI();
}

function changeTemp(delta) {
    let newTemp = carState.temperature + delta;
    if (newTemp >= 16 && newTemp <= 30) {
        carState.temperature = newTemp;
        updateUI();
        showNotification(`🌡️ Temperatura: ${carState.temperature}°C`);
    }
}

function lockDoors() { carState.doorsLocked = true; updateUI(); showNotification('🔒 Puertas cerradas'); }
function unlockDoors() { carState.doorsLocked = false; updateUI(); showNotification('🔓 Puertas abiertas'); }
function windowsUp() { carState.windowsOpen = false; updateUI(); showNotification('⬆️ Ventanas subidas'); }
function windowsDown() { carState.windowsOpen = true; updateUI(); showNotification('⬇️ Ventanas bajadas'); }
function findMyCar() { showNotification('📍 Tu auto está a 50 metros al noreste'); }

function updateLocation() {
    const locations = ['Av. Reforma 123, CDMX', 'Blvd. Miguel de Cervantes 456', 'Paseo de la Reforma 789'];
    const randomLoc = locations[Math.floor(Math.random() * locations.length)];
    document.getElementById('locationText').innerHTML = randomLoc;
    showNotification(`📍 Ubicación actualizada: ${randomLoc}`);
}

function startCameraSimulation() {
    if (cameraInterval) clearInterval(cameraInterval);
    cameraInterval = setInterval(() => {
        const cameras = document.querySelectorAll('.camara-preview');
        cameras.forEach(cam => {
            const icon = cam.querySelector('i');
            if (icon) {
                icon.style.opacity = '0.7';
                setTimeout(() => { icon.style.opacity = '1'; }, 200);
            }
        });
    }, 3000);
}

function refreshCameras() {
    showNotification('📷 Actualizando feed de cámaras...');
    setTimeout(() => showNotification('✅ Cámaras actualizadas'), 1000);
}

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

setInterval(() => {
    const pressure = (2.3 + Math.random() * 0.3).toFixed(1);
    const tireElement = document.getElementById('tirePressure');
    if (tireElement) tireElement.innerHTML = pressure + ' bar';
}, 15000);

// ========== REPORTES DE MANEJO ==========
let currentPeriod = 'week';
let consumptionChart = null;

const drivingData = {
    week: { avgSpeed: 42, efficiency: 19.2, totalDistance: 342, totalTime: 8.5, hardAccel: 12, hardBrake: 8, speeding: 3, regen: 4.2, score: 89, consumption: [18.5, 19.2, 17.8, 20.1, 18.2, 17.5, 19.0] },
    month: { avgSpeed: 44, efficiency: 18.5, totalDistance: 1450, totalTime: 36, hardAccel: 48, hardBrake: 32, speeding: 14, regen: 18.5, score: 92, consumption: [18.2, 19.0, 17.5, 18.8, 19.5, 17.2, 18.0, 18.9, 17.8, 19.1, 18.3, 17.9, 18.6, 19.3] },
    year: { avgSpeed: 46, efficiency: 18.2, totalDistance: 12450, totalTime: 310, hardAccel: 420, hardBrake: 280, speeding: 120, regen: 160, score: 94, consumption: [18.5, 18.2, 17.8, 18.0, 19.0, 18.3, 17.5, 18.1, 17.9, 18.4, 18.0, 17.7] }
};

function initReportCharts() {
    const ctx = document.getElementById('consumptionChart').getContext('2d');
    consumptionChart = new Chart(ctx, {
        type: 'line',
        data: { labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'], datasets: [{ label: 'Consumo (kWh/100km)', data: drivingData.week.consumption, borderColor: '#003399', backgroundColor: 'rgba(0,51,153,0.1)', tension: 0.3, fill: true }] },
        options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'top' } } }
    });
    drawScoreCircle(89);
    updateReportUI();
}

function drawScoreCircle(score) {
    const canvas = document.getElementById('scoreCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const centerX = 60, centerY = 60, radius = 50;
    ctx.clearRect(0, 0, 120, 120);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 8;
    ctx.stroke();
    const endAngle = (score / 100) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, endAngle - Math.PI / 2);
    ctx.strokeStyle = score >= 80 ? '#4caf50' : score >= 60 ? '#ff9800' : '#f44336';
    ctx.stroke();
    document.getElementById('scoreValue').innerHTML = score;
    const rating = score >= 90 ? 'Excelente' : score >= 70 ? 'Bueno' : score >= 50 ? 'Regular' : 'Mejorable';
    document.getElementById('scoreRating').innerHTML = rating;
}

function changeReportPeriod(period) {
    currentPeriod = period;
    document.querySelectorAll('.period-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    updateReportUI();
}

function updateReportUI() {
    const data = drivingData[currentPeriod];
    document.getElementById('avgSpeed').innerHTML = data.avgSpeed + ' km/h';
    document.getElementById('efficiency').innerHTML = data.efficiency + ' kWh/100km';
    document.getElementById('totalDistance').innerHTML = data.totalDistance + ' km';
    document.getElementById('totalTime').innerHTML = data.totalTime + ' h';
    document.getElementById('hardAccel').innerHTML = data.hardAccel;
    document.getElementById('hardBrake').innerHTML = data.hardBrake;
    document.getElementById('speeding').innerHTML = data.speeding;
    document.getElementById('regen').innerHTML = '+' + data.regen + ' kWh';
    drawScoreCircle(data.score);
    if (consumptionChart) {
        const labels = currentPeriod === 'week' ? ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] : 
                       currentPeriod === 'month' ? Array.from({length: 14}, (_,i) => i+1) : 
                       ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        consumptionChart.data.labels = labels;
        consumptionChart.data.datasets[0].data = data.consumption;
        consumptionChart.update();
    }
    document.getElementById('speedCompare').innerHTML = '-5%';
    document.getElementById('efficiencyCompare').innerHTML = '+8%';
    document.getElementById('eventsCompare').innerHTML = '+12%';
}

// ========== PARKING ASSIST ==========
let parkingActive = false;
let parkingSoundEnabled = true;
let parkingInterval = null;
let currentObstacleDistance = 150;
let steeringAngle = 0;

function playBeep(frequency, duration) {
    if (!parkingSoundEnabled) return;
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = frequency;
        gainNode.gain.value = 0.3;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + duration);
        oscillator.stop(audioContext.currentTime + duration);
        audioContext.resume();
    } catch(e) { console.log('Audio no soportado'); }
}

function startParkingAssist() {
    if (parkingActive) { stopParkingAssist(); return; }
    parkingActive = true;
    document.querySelector('#parking .btn-primary').innerHTML = '<i class="fas fa-stop"></i> Detener Parking Assist';
    showNotification('🅿️ Parking Assist activado');
    if (parkingInterval) clearInterval(parkingInterval);
    parkingInterval = setInterval(updateParkingSensors, 500);
}

function stopParkingAssist() {
    parkingActive = false;
    document.querySelector('#parking .btn-primary').innerHTML = '<i class="fas fa-play"></i> Activar Parking Assist';
    showNotification('Parking Assist desactivado');
    if (parkingInterval) clearInterval(parkingInterval);
}

function updateParkingSensors() {
    const frontDist = Math.max(20, Math.min(200, currentObstacleDistance + (Math.random() * 10 - 5)));
    const rearDist = Math.max(20, Math.min(200, 150 + (Math.random() * 20 - 10)));
    const leftDist = Math.max(20, Math.min(200, 100 + (Math.random() * 30 - 15)));
    const rightDist = Math.max(20, Math.min(200, 100 + (Math.random() * 30 - 15)));
    
    document.getElementById('frontDist').innerHTML = Math.round(frontDist) + ' cm';
    document.getElementById('rearDist').innerHTML = Math.round(rearDist) + ' cm';
    
    updateSensorIndicator('sensorFront', frontDist, 'frontIndicator');
    updateSensorIndicator('sensorRear', rearDist, 'rearIndicator');
    updateSensorIndicator('sensorLeftFront', leftDist, 'leftIndicator');
    updateSensorIndicator('sensorRightFront', rightDist, 'rightIndicator');
    
    const minDist = Math.min(frontDist, rearDist, leftDist, rightDist);
    const proximityPercent = Math.min(100, Math.max(0, ((200 - minDist) / 200) * 100));
    document.getElementById('proximityFill').style.width = proximityPercent + '%';
    
    if (minDist < 40) {
        if (parkingActive && parkingSoundEnabled) playBeep(880, 0.2);
        showParkingAlert('¡OBSTÁCULO DEMASIADO CERCA! 🚨');
    } else if (minDist < 80) {
        if (parkingActive && parkingSoundEnabled) playBeep(660, 0.3);
        showParkingAlert('Atención: obstáculo cercano ⚠️');
    }
}

function updateSensorIndicator(sensorId, distance, indicatorId) {
    const sensor = document.getElementById(sensorId);
    const indicator = document.getElementById(indicatorId);
    if (!sensor) return;
    sensor.classList.remove('safe', 'warning', 'danger');
    if (distance < 40) {
        sensor.classList.add('danger');
        if (indicator) { indicator.innerHTML = '🔴 Peligro'; indicator.className = 'indicator-value danger'; }
    } else if (distance < 80) {
        sensor.classList.add('warning');
        if (indicator) { indicator.innerHTML = '🟠 Atención'; indicator.className = 'indicator-value warning'; }
    } else {
        sensor.classList.add('safe');
        if (indicator) { indicator.innerHTML = '🟢 Seguro'; indicator.className = 'indicator-value safe'; }
    }
}

let alertTimeout = null;
function showParkingAlert(message) {
    const oldAlert = document.querySelector('.parking-alert');
    if (oldAlert) oldAlert.remove();
    if (alertTimeout) clearTimeout(alertTimeout);
    const alertDiv = document.createElement('div');
    alertDiv.className = 'parking-alert';
    alertDiv.innerHTML = message;
    document.body.appendChild(alertDiv);
    alertTimeout = setTimeout(() => { if (alertDiv) alertDiv.remove(); }, 2000);
}

function simulateObstacle() {
    currentObstacleDistance = 35;
    showNotification('⚠️ Simulando obstáculo a 35 cm');
    setTimeout(() => { currentObstacleDistance = 150; showNotification('Obstáculo removido'); }, 3000);
    updateParkingSensors();
}

function toggleParkingSound() {
    parkingSoundEnabled = !parkingSoundEnabled;
    const soundStatus = document.getElementById('soundStatus');
    if (soundStatus) soundStatus.innerHTML = parkingSoundEnabled ? 'Sonido activado' : 'Sonido desactivado';
    showNotification(parkingSoundEnabled ? '🔊 Sonido activado' : '🔇 Sonido desactivado');
}

function changeSteeringAngle() {
    steeringAngle = (steeringAngle + 30) % 180;
    const trajectories = document.querySelectorAll('.trajectory');
    trajectories.forEach((traj, index) => {
        traj.classList.remove('active');
        if (Math.sin((steeringAngle + index * 30) * Math.PI / 180) > 0.5) traj.classList.add('active');
    });
    showNotification(`🚗 Ángulo de dirección: ${steeringAngle}°`);
}

// ========== CONCESIONARIOS Y CITAS ==========
let currentDealer = null;

function showDealerInfo(name, address, phone, hours) {
    currentDealer = name;
    document.getElementById('dealerSelect').value = name;
    showNotification(`📞 ${name} - Tel: ${phone} | Horario: ${hours}`);
}

function scheduleAppointment() {
    const dealer = document.getElementById('dealerSelect').value;
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;
    const service = document.getElementById('serviceType').value;
    
    if (!date) {
        showNotification('⚠️ Por favor selecciona una fecha');
        return;
    }
    
    showNotification(`✅ Cita agendada en ${dealer} para el ${date} a las ${time} | Servicio: ${service}`);
    document.getElementById('appointmentDate').value = '';
}

function callEmergency() {
    showNotification('🚨 Conectando con asistencia vial BMW... Por favor espera');
    setTimeout(() => {
        showNotification('✅ Asistencia en camino. Tiempo estimado: 15-20 min');
    }, 2000);
}

// Agregar fecha mínima para la cita (mañana)
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    setupTabs();
    setupChargeSlider();
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
});

// Exponer funciones globales
window.doLogin = doLogin;
window.logout = logout;
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
window.showNotification = showNotification;
window.refreshCameras = refreshCameras;
window.changeReportPeriod = changeReportPeriod;
window.startParkingAssist = startParkingAssist;
window.simulateObstacle = simulateObstacle;
window.toggleParkingSound = toggleParkingSound;
window.changeSteeringAngle = changeSteeringAngle;
window.showDealerInfo = showDealerInfo;
window.scheduleAppointment = scheduleAppointment;
window.callEmergency = callEmergency;