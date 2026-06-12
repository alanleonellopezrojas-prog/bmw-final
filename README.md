<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>BMW ConnectedDrive - CRM</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: #F5F7FA;
            min-height: 100vh;
        }

        .login-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #003399 0%, #0066CC 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .login-card {
            background: white;
            border-radius: 40px;
            padding: 48px 40px;
            width: 90%;
            max-width: 420px;
            text-align: center;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
        }

        .bmw-login-ring {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #003399, #0066CC);
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            box-shadow: 0 10px 20px rgba(0,51,153,0.3);
        }

        .bmw-login-ring i { font-size: 44px; color: white; }
        .login-logo h2 { font-size: 24px; color: #1A2C3E; }
        .login-logo h2 span { color: #003399; }
        .login-logo p { color: #6B7280; margin-top: 8px; }

        .input-group {
            display: flex;
            align-items: center;
            background: #F3F4F6;
            border-radius: 16px;
            padding: 12px 18px;
            margin-bottom: 16px;
            border: 1px solid #E5E7EB;
            transition: all 0.2s;
        }

        .input-group:focus-within {
            border-color: #003399;
            box-shadow: 0 0 0 3px rgba(0,51,153,0.1);
        }

        .input-group i { color: #9CA3AF; font-size: 18px; margin-right: 12px; }
        .input-group input { border: none; background: transparent; font-size: 16px; width: 100%; outline: none; font-family: 'Inter', sans-serif; }

        .login-btn {
            width: 100%;
            background: linear-gradient(135deg, #003399, #0066CC);
            color: white;
            border: none;
            padding: 14px;
            border-radius: 16px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 8px;
            transition: transform 0.2s;
        }

        .login-btn:hover { transform: translateY(-2px); }
        .login-demo { font-size: 12px; color: #9CA3AF; margin-top: 20px; }

        .app-container {
            max-width: 500px;
            margin: 0 auto;
            padding: 20px;
            background: #F5F7FA;
            min-height: 100vh;
        }

        .bmw-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 2px solid #E5E7EB;
        }

        .logo-area { display: flex; align-items: center; gap: 12px; }
        .bmw-ring {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #003399, #0066CC);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .bmw-ring i { font-size: 26px; color: white; }
        .logo-area h1 { font-size: 20px; color: #1A2C3E; }
        .logo-area h1 span { color: #003399; font-weight: 500; }
        .user-area {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            padding: 8px 12px;
            border-radius: 30px;
            background: white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .user-area i { font-size: 22px; color: #003399; }
        .user-area span { font-size: 13px; color: #4B5563; }

        .vehicle-hero {
            background: white;
            border-radius: 32px;
            padding: 24px;
            text-align: center;
            margin-bottom: 24px;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }
        .car-image i { font-size: 80px; color: #003399; animation: carFloat 3s ease-in-out infinite; }
        @keyframes carFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .car-details h2 { font-size: 24px; color: #1A2C3E; margin-top: 12px; }
        .car-details p { color: #6B7280; font-size: 14px; }

        .stats-row { display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
        .stat-card {
            flex: 1;
            background: white;
            border-radius: 24px;
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 14px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .stat-card i { font-size: 32px; color: #003399; }
        .stat-label { font-size: 11px; color: #9CA3AF; display: block; }
        .stat-value { font-size: 20px; font-weight: 700; color: #1A2C3E; }
        .progress-bar { width: 100%; height: 4px; background: #E5E7EB; border-radius: 10px; margin-top: 8px; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #003399, #0066CC); border-radius: 10px; }

        .tabs-menu {
            display: flex;
            gap: 8px;
            background: white;
            padding: 8px;
            border-radius: 40px;
            margin-bottom: 24px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            flex-wrap: wrap;
        }
        .tab-btn {
            flex: 1;
            background: transparent;
            border: none;
            padding: 10px;
            border-radius: 32px;
            font-size: 12px;
            font-weight: 500;
            color: #6B7280;
            cursor: pointer;
            transition: all 0.2s;
            font-family: 'Inter', sans-serif;
        }
        .tab-btn i { margin-right: 6px; }
        .tab-btn.active { background: linear-gradient(135deg, #003399, #0066CC); color: white; }

        .tab-panel { display: none; animation: fadeIn 0.3s; }
        .tab-panel.active { display: block; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .panel-card {
            background: white;
            border-radius: 28px;
            padding: 24px;
            margin-bottom: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .panel-card h3 { font-size: 18px; color: #1A2C3E; margin-bottom: 20px; }
        .panel-card h3 i { color: #003399; margin-right: 10px; }

        .temp-controls { display: flex; align-items: center; justify-content: center; gap: 30px; margin-bottom: 24px; }
        .temp-btn {
            width: 56px;
            height: 56px;
            background: #F3F4F6;
            border: none;
            border-radius: 30px;
            font-size: 32px;
            font-weight: 600;
            color: #003399;
            cursor: pointer;
        }
        .temp-btn:hover { background: #003399; color: white; }
        .temp-display { font-size: 48px; font-weight: 700; color: #1A2C3E; }

        .btn-primary {
            background: linear-gradient(135deg, #003399, #0066CC);
            color: white;
            border: none;
            padding: 14px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            transition: transform 0.2s;
        }
        .btn-primary:hover { transform: translateY(-2px); }
        .btn-secondary {
            background: #F3F4F6;
            color: #1A2C3E;
            border: 1px solid #E5E7EB;
            padding: 14px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            flex: 1;
        }
        .btn-outline {
            background: transparent;
            border: 1px solid #E5E7EB;
            padding: 12px 16px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 500;
            color: #1A2C3E;
            cursor: pointer;
        }
        .btn-outline:hover { border-color: #003399; background: rgba(0,51,153,0.05); }
        .btn-small { background: #F3F4F6; border: none; padding: 8px 16px; border-radius: 30px; font-size: 12px; cursor: pointer; }
        .button-group { display: flex; gap: 12px; margin-bottom: 16px; }
        .button-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }

        .alarm-warning {
            background: linear-gradient(135deg, #f44336, #d32f2f);
            color: white;
            padding: 16px;
            border-radius: 20px;
            text-align: center;
            margin-top: 16px;
            animation: alarmPulse 0.5s infinite;
        }
        @keyframes alarmPulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.02); } }

        .security-status { display: flex; flex-direction: column; gap: 12px; }
        .security-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #E5E7EB; }
        .status-good { color: #4caf50; font-weight: 600; }

        .maintenance-item { margin-bottom: 20px; }
        .maintenance-item span:first-child { display: block; margin-bottom: 8px; font-size: 14px; }
        .tires-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; margin-bottom: 16px; }
        .tire-item { display: flex; align-items: center; gap: 10px; font-size: 12px; }
        .tire-item .progress-bar { flex: 1; }

        .profiles-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 24px; }
        .profile-card {
            background: linear-gradient(135deg, #F3F4F6, #fff);
            border-radius: 24px;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;
            border: 2px solid transparent;
        }
        .profile-card:hover { border-color: #003399; transform: translateY(-4px); }
        .profile-card i { font-size: 48px; color: #003399; margin-bottom: 12px; }
        .profile-card h4 { margin-bottom: 4px; }
        .profile-card p { font-size: 12px; color: #6B7280; }
        .profile-badge { font-size: 10px; background: #E8F0FE; padding: 4px 8px; border-radius: 20px; display: inline-block; margin-top: 8px; }
        .usage-list { max-height: 200px; overflow-y: auto; }
        .usage-item { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #E5E7EB; font-size: 13px; }

        .driving-modes { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; margin-bottom: 24px; }
        .mode-card {
            background: linear-gradient(135deg, #1A2C3E, #0F1A2A);
            border-radius: 24px;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;
            color: white;
        }
        .mode-card:hover { transform: translateY(-4px); background: #003399; }
        .mode-card i { font-size: 36px; margin-bottom: 12px; }
        .mode-card h4 { margin-bottom: 4px; }
        .mode-card p { font-size: 11px; opacity: 0.8; }
        .mode-badge { font-size: 10px; background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 20px; display: inline-block; margin-top: 8px; }
        .current-mode { background: #E8F0FE; padding: 12px; border-radius: 16px; text-align: center; }

        .music-player { text-align: center; }
        .album-art { width: 120px; height: 120px; background: linear-gradient(135deg, #0066CC, #003399); border-radius: 60px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .album-art i { font-size: 50px; color: white; }
        .song-info h4 { font-size: 18px; margin-bottom: 4px; }
        .song-info p { color: #6B7280; margin-bottom: 20px; }
        .music-controls { display: flex; justify-content: center; gap: 30px; margin-bottom: 24px; }
        .music-btn { width: 50px; height: 50px; background: #F3F4F6; border: none; border-radius: 50%; font-size: 18px; cursor: pointer; }
        .playlist { text-align: left; }
        .playlist ul { list-style: none; padding: 0; }
        .playlist li { padding: 10px; border-bottom: 1px solid #E5E7EB; cursor: pointer; font-size: 13px; }
        .playlist li.active { color: #003399; font-weight: 600; }

        .camaras-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 20px; }
        .camara-card.full-width { grid-column: span 2; }
        .camara-preview { background: linear-gradient(135deg, #1A2C3E, #0F1A2A); border-radius: 20px; padding: 20px; text-align: center; color: white; cursor: pointer; transition: all 0.2s; }
        .camara-preview i { font-size: 48px; margin-bottom: 12px; display: block; color: #0066CC; }
        .camara-card:hover .camara-preview { transform: scale(1.02); background: #003399; }
        .camara-subtitle { color: #6B7280; font-size: 13px; margin-bottom: 16px; }

        .report-period { display: flex; gap: 12px; margin-bottom: 20px; }
        .period-btn { flex: 1; background: #F3F4F6; border: none; padding: 10px; border-radius: 24px; font-size: 14px; font-weight: 500; cursor: pointer; }
        .period-btn.active { background: linear-gradient(135deg, #003399, #0066CC); color: white; }
        .score-card { text-align: center; }
        .score-circle { position: relative; width: 140px; height: 140px; margin: 0 auto; }
        .score-circle canvas { position: absolute; top: 0; left: 0; }
        .score-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 32px; font-weight: 800; color: #003399; }
        .score-label { margin-top: 16px; font-size: 14px; color: #6B7280; }
        .score-label span { display: block; font-size: 18px; font-weight: 700; color: #1A2C3E; margin-top: 6px; }
        .stats-report-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 20px; }
        .stat-report-card { background: white; border-radius: 20px; padding: 16px; text-align: center; }
        .stat-report-card i { font-size: 28px; color: #003399; margin-bottom: 8px; display: block; }
        .stat-report-label { font-size: 11px; color: #9CA3AF; display: block; }
        .stat-report-value { font-size: 18px; font-weight: 700; color: #1A2C3E; display: block; margin-top: 4px; }
        .events-list { display: flex; flex-direction: column; gap: 16px; }
        .event-item { display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid #E5E7EB; }
        .event-item i { width: 32px; font-size: 18px; color: #003399; }
        .event-info { flex: 1; display: flex; justify-content: space-between; }
        .event-value { font-weight: 700; color: #ff9800; }

        .parking-360-view { background: linear-gradient(135deg, #1A2C3E, #0F1A2A); border-radius: 28px; padding: 30px; margin-bottom: 24px; }
        .car-360-container { position: relative; display: flex; justify-content: center; align-items: center; min-height: 250px; }
        .car-center { background: #003399; width: 100px; height: 100px; border-radius: 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px rgba(0,51,153,0.5); }
        .car-center i { font-size: 50px; color: white; }
        .sensor { position: absolute; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .sensor-wave { width: 100%; height: 100%; border-radius: 50%; animation: pulseSensor 2s infinite; }
        .sensor-front { top: -30px; left: 50%; transform: translateX(-50%); }
        .sensor-rear { bottom: -30px; left: 50%; transform: translateX(-50%); }
        .sensor-left-front { top: 20px; left: -30px; }
        .sensor-right-front { top: 20px; right: -30px; }
        .sensor-left-rear { bottom: 20px; left: -30px; }
        .sensor-right-rear { bottom: 20px; right: -30px; }
        .sensor-distance { position: absolute; bottom: -25px; font-size: 10px; background: rgba(0,0,0,0.7); padding: 2px 6px; border-radius: 12px; color: white; white-space: nowrap; }
        @keyframes pulseSensor { 0% { transform: scale(0.8); opacity: 0.8; } 100% { transform: scale(1.4); opacity: 0; } }
        .sensor.danger .sensor-wave { background: radial-gradient(circle, rgba(244,67,54,0.6), transparent); }
        .sensor.warning .sensor-wave { background: radial-gradient(circle, rgba(255,152,0,0.6), transparent); }
        .sensor.safe .sensor-wave { background: radial-gradient(circle, rgba(76,175,80,0.4), transparent); }
        .proximity-bar-container { margin-bottom: 24px; }
        .proximity-label { font-size: 12px; color: #6B7280; margin-bottom: 8px; }
        .proximity-bar { height: 12px; background: #E5E7EB; border-radius: 20px; overflow: hidden; margin-bottom: 8px; }
        .proximity-fill { height: 100%; background: linear-gradient(90deg, #4caf50, #ff9800, #f44336); border-radius: 20px; transition: width 0.3s ease; }
        .parking-controls { display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; }
        .trajectory-lines { margin-top: 20px; padding-top: 20px; border-top: 1px solid #E5E7EB; }
        .trajectory-visual { display: flex; justify-content: center; gap: 8px; margin: 16px 0; }
        .trajectory { width: 50px; height: 4px; background: #E5E7EB; border-radius: 4px; transition: all 0.3s; }
        .trajectory.active { background: #003399; transform: scaleX(1.5); }

        .dealers-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
        .dealer-card { background: #F3F4F6; border-radius: 20px; padding: 16px; display: flex; gap: 15px; cursor: pointer; transition: all 0.2s; border: 1px solid #E5E7EB; }
        .dealer-card:hover { background: white; border-color: #003399; transform: translateX(5px); }
        .dealer-card i { font-size: 40px; color: #003399; }
        .dealer-info h4 { font-size: 16px; color: #1A2C3E; margin-bottom: 6px; }
        .dealer-info p { font-size: 12px; color: #6B7280; margin-bottom: 4px; }
        .appointment-form { display: flex; flex-direction: column; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-size: 13px; font-weight: 500; color: #1A2C3E; }
        .form-group select, .form-group input { padding: 12px; border: 1px solid #E5E7EB; border-radius: 16px; font-size: 14px; font-family: 'Inter', sans-serif; background: #F9FAFB; }

        .gps-box { background: #F3F4F6; border-radius: 20px; padding: 20px; text-align: center; }
        .gps-box i { font-size: 40px; color: #003399; margin-bottom: 12px; }
        .status-list { display: flex; flex-direction: column; gap: 14px; }
        .status-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #E5E7EB; }
        .charging-status { background: #F3F4F6; border-radius: 20px; padding: 20px; display: flex; align-items: center; gap: 18px; margin-bottom: 20px; }
        .charging-status i { font-size: 40px; color: #003399; }
        .slider-group { margin: 20px 0; }
        .slider-group input { width: 100%; margin-top: 10px; height: 6px; border-radius: 10px; background: #E5E7EB; -webkit-appearance: none; }
        .slider-group input::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; background: #003399; border-radius: 50%; cursor: pointer; }

        .climate-animation-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); backdrop-filter: blur(10px); z-index: 2000; display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; transition: all 0.3s ease; }
        .climate-animation-overlay.active { opacity: 1; visibility: visible; }
        .climate-animation-content { text-align: center; position: relative; width: 300px; height: 300px; display: flex; align-items: center; justify-content: center; flex-direction: column; }
        .snowflakes { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; display: none; }
        .snowflakes.active { display: block; }
        .snowflakes i { position: absolute; color: white; font-size: 20px; animation: snowFall 2s linear infinite; }
        @keyframes snowFall { 0% { transform: translateY(-50px) rotate(0deg); opacity: 1; } 100% { transform: translateY(250px) rotate(360deg); opacity: 0; } }
        .heat-waves { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; display: none; }
        .heat-waves.active { display: block; }
        .heat-waves::before { content: ''; position: absolute; top: 50%; left: 50%; width: 200px; height: 200px; background: radial-gradient(circle, rgba(255,100,0,0.6), transparent); border-radius: 50%; transform: translate(-50%, -50%); animation: heatPulse 0.5s ease-out; }
        @keyframes heatPulse { 0% { transform: translate(-50%, -50%) scale(0); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(3); opacity: 0; } }
        .climate-status-text { position: relative; z-index: 10; color: white; font-size: 24px; font-weight: 700; text-shadow: 0 0 10px rgba(0,102,255,0.5); animation: textPulse 1s ease-in-out infinite; }
        @keyframes textPulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.8; } }

        .toast-notification { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: #1A2C3E; color: white; padding: 12px 24px; border-radius: 50px; font-size: 14px; opacity: 0; transition: opacity 0.3s; pointer-events: none; z-index: 1000; white-space: nowrap; }
        .toast-notification.show { opacity: 1; }

        /* ========== ESTILOS CRM ========== */
        .search-box { margin-bottom: 20px; }
        .search-box input { width: 100%; padding: 14px; border-radius: 30px; border: 1px solid #E5E7EB; font-size: 14px; outline: none; background: #F9FAFB; }
        .filter-group { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
        .filter-btn { background: #F3F4F6; border: none; padding: 8px 16px; border-radius: 30px; font-size: 12px; cursor: pointer; }
        .filter-btn.active { background: #003399; color: white; }
        .clients-list { max-height: 400px; overflow-y: auto; }
        .client-card {
            background: #F9FAFB; border-radius: 20px; padding: 16px; margin-bottom: 12px;
            cursor: pointer; transition: all 0.2s; border: 1px solid #E5E7EB;
        }
        .client-card:hover { background: white; border-color: #003399; transform: translateX(5px); }
        .client-name { font-size: 16px; font-weight: 700; color: #1A2C3E; }
        .client-car { font-size: 13px; color: #003399; margin-top: 4px; }
        .client-date { font-size: 11px; color: #9CA3AF; margin-top: 4px; }
        .client-badge { display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: 10px; margin-top: 8px; font-weight: 600; }
        .badge-premium { background: #FFD700; color: #1A2C3E; }
        .badge-regular { background: #E5E7EB; color: #6B7280; }
        .badge-nuevo { background: #4caf50; color: white; }
        .modal {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.8); backdrop-filter: blur(5px);
            display: flex; align-items: center; justify-content: center; z-index: 2000;
            visibility: hidden; opacity: 0; transition: all 0.3s;
        }
        .modal.active { visibility: visible; opacity: 1; }
        .modal-content {
            background: white; border-radius: 32px; padding: 28px; width: 90%; max-width: 450px;
            max-height: 80vh; overflow-y: auto;
        }
        .modal-content h3 { margin-bottom: 20px; }
        .client-detail-item { padding: 12px 0; border-bottom: 1px solid #E5E7EB; display: flex; justify-content: space-between; }
        .client-detail-item .label { font-weight: 600; color: #6B7280; }
        .recomendacion { background: #E8F0FE; padding: 16px; border-radius: 20px; margin-top: 20px; }
        .recomendacion i { color: #003399; margin-right: 8px; }
        .close-modal { background: #E5E7EB; border: none; padding: 12px; border-radius: 20px; width: 100%; margin-top: 20px; cursor: pointer; }
        .stats-crm { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; margin-bottom: 20px; }
        .stat-crm-card { background: #F3F4F6; border-radius: 20px; padding: 16px; text-align: center; }
        .stat-crm-card i { font-size: 28px; color: #003399; margin-bottom: 8px; }
        .stat-crm-card .number { font-size: 24px; font-weight: 700; }

        @media (max-width: 550px) {
            .app-container { padding: 16px; }
            .stats-row { flex-direction: column; }
            .button-group { flex-direction: column; }
            .button-grid { grid-template-columns: 1fr; }
            .toast-notification { white-space: normal; max-width: 90%; text-align: center; }
            .tabs-menu { overflow-x: auto; flex-wrap: nowrap; }
            .tab-btn { white-space: nowrap; }
            .camaras-grid { grid-template-columns: 1fr; }
            .camara-card.full-width { grid-column: span 1; }
            .profiles-grid { grid-template-columns: 1fr; }
            .driving-modes { grid-template-columns: 1fr; }
            .filter-group { flex-wrap: wrap; }
        }
    </style>
</head>
<body>

<!-- Login -->
<div class="login-container" id="loginContainer">
    <div class="login-card">
        <div class="bmw-login-ring"><i class="fab fa-bmw"></i></div>
        <h2>BMW<span style="color:#003399;">ConnectedDrive</span></h2>
        <p>Accede a tu vehículo</p>
        <div class="input-group"><i class="fas fa-envelope"></i><input type="email" id="loginEmail" placeholder="correo@ejemplo.com" value="admin@bmw.com"></div>
        <div class="input-group"><i class="fas fa-lock"></i><input type="password" id="loginPassword" placeholder="Contraseña" value="123"></div>
        <button class="login-btn" onclick="doLogin()">Iniciar Sesión</button>
        <p class="login-demo">Demo: cualquier email/contraseña</p>
    </div>
</div>

<!-- App Principal -->
<div class="app-container" id="appContainer" style="display:none;">
    <!-- Header -->
    <div class="bmw-header">
        <div class="logo-area"><div class="bmw-ring"><i class="fab fa-bmw"></i></div><h1>BMW <span>ConnectedDrive</span></h1></div>
        <div class="user-area" onclick="logout()"><i class="fas fa-user-circle"></i> Cerrar sesión</div>
    </div>

    <!-- Hero -->
    <div class="vehicle-hero"><div class="car-image"><i class="fas fa-car-side"></i></div><div class="car-details"><h2>BMW i7 M70</h2><p>Electric • 659 HP • AWD</p></div></div>

    <!-- Stats -->
    <div class="stats-row">
        <div class="stat-card"><i class="fas fa-battery-full"></i><div><span class="stat-label">Batería</span><span class="stat-value" id="batteryValue">87%</span><div class="progress-bar"><div class="progress-fill" id="batteryFill" style="width:87%"></div></div></div></div>
        <div class="stat-card"><i class="fas fa-road"></i><div><span class="stat-label">Autonomía</span><span class="stat-value" id="rangeValue">420 km</span></div></div>
        <div class="stat-card"><i class="fas fa-tachometer-alt"></i><div><span class="stat-label">Kilometraje</span><span class="stat-value">12,450 km</span></div></div>
    </div>

    <!-- Tabs -->
    <div class="tabs-menu">
        <button class="tab-btn" data-tab="crm"><i class="fas fa-database"></i> Clientes</button>
        <button class="tab-btn active" data-tab="clima"><i class="fas fa-temperature-low"></i> Clima</button>
        <button class="tab-btn" data-tab="accesos"><i class="fas fa-key"></i> Accesos</button>
        <button class="tab-btn" data-tab="seguridad"><i class="fas fa-shield-alt"></i> Seguridad</button>
        <button class="tab-btn" data-tab="mantenimiento"><i class="fas fa-wrench"></i> Mantenimiento</button>
        <button class="tab-btn" data-tab="perfiles"><i class="fas fa-users"></i> Perfiles</button>
        <button class="tab-btn" data-tab="modos"><i class="fas fa-flag-checkered"></i> Modos</button>
        <button class="tab-btn" data-tab="entretenimiento"><i class="fas fa-music"></i> Música</button>
        <button class="tab-btn" data-tab="camaras"><i class="fas fa-video"></i> Cámaras</button>
        <button class="tab-btn" data-tab="reportes"><i class="fas fa-chart-line"></i> Reportes</button>
        <button class="tab-btn" data-tab="parking"><i class="fas fa-parking"></i> Parking</button>
        <button class="tab-btn" data-tab="monitoreo"><i class="fas fa-chart-simple"></i> Monitoreo</button>
        <button class="tab-btn" data-tab="carga"><i class="fas fa-charging-station"></i> Carga</button>
        <button class="tab-btn" data-tab="concesionarios"><i class="fas fa-building"></i> Talleres</button>
    </div>

    <!-- ========== Datos del cliente ========== -->
    <div class="tab-panel" id="crm">
        <div class="panel-card">
            <h3><i class="fas fa-database"></i> Datos de Clientes</h3>
            <div class="search-box"><input type="text" id="searchClient" placeholder="🔍 Buscar cliente por nombre..." onkeyup="filterClients()"></div>
            <div class="filter-group">
                <button class="filter-btn active" onclick="filterByModel('todos')">Todos</button>
                <button class="filter-btn" onclick="filterByModel('i7')">BMW i7</button>
                <button class="filter-btn" onclick="filterByModel('X5')">BMW X5</button>
                <button class="filter-btn" onclick="filterByModel('M3')">BMW M3</button>
                <button class="filter-btn" onclick="filterByModel('i4')">BMW i4</button>
                <button class="filter-btn" onclick="filterByModel('X3')">BMW X3</button>
                <button class="filter-btn" onclick="filterByModel('330i')">BMW 330i</button>
            </div>
            <div class="clients-list" id="clientsList"></div>
        </div>
        <div class="panel-card">
            <h3><i class="fas fa-chart-pie"></i> Estadísticas CRM</h3>
            <div class="stats-crm">
                <div class="stat-crm-card"><i class="fas fa-car"></i><div class="number" id="totalClientsCRM">0</div><div>Clientes</div></div>
                <div class="stat-crm-card"><i class="fas fa-trophy"></i><div class="number" id="premiumCount">0</div><div>Premium</div></div>
                <div class="stat-crm-card"><i class="fas fa-chart-line"></i><div class="number" id="monthlySalesCRM">0</div><div>Ventas mes</div></div>
                <div class="stat-crm-card"><i class="fas fa-gift"></i><div class="number" id="incentivesCount">0</div><div>Incentivos</div></div>
            </div>
        </div>
    </div>

    <!-- ========== PANEL CLIMA ========== -->
    <div class="tab-panel active" id="clima">
        <div class="panel-card"><h3><i class="fas fa-thermometer-half"></i> Temperatura</h3><div class="temp-controls"><button class="temp-btn" onclick="changeTemp(-1)">−</button><div class="temp-display"><span id="tempValue">22</span>°C</div><button class="temp-btn" onclick="changeTemp(1)">+</button></div><button class="btn-primary" onclick="toggleClimate()" id="climateBtn">🔥 Encender Clima</button></div>
        <div class="panel-card"><h3><i class="fas fa-chair"></i> Asientos y Volante</h3><div class="button-grid"><button class="btn-outline" onclick="showNotification('Asientos delanteros calientes 🔥')">Asientos Del.</button><button class="btn-outline" onclick="showNotification('Asientos traseros calientes 🔥')">Asientos Tras.</button><button class="btn-outline" onclick="showNotification('Asientos ventilados 💨')">Ventilados</button><button class="btn-outline" onclick="showNotification('Volante caliente 🔥')">Volante Caliente</button><button class="btn-outline" onclick="showNotification('Descongelando luneta ❄️')">Descongelar</button><button class="btn-outline" onclick="showNotification('Modo Perro activado 🐕')">Modo Perro</button></div></div>
    </div>

    <!-- ========== PANEL ACCESOS ========== -->
    <div class="tab-panel" id="accesos">
        <div class="panel-card"><h3><i class="fas fa-door-open"></i> Puertas</h3><div class="button-group"><button class="btn-primary" onclick="lockDoors()">🔒 Cerrar Todo</button><button class="btn-secondary" onclick="unlockDoors()">🔓 Abrir Todo</button></div><div class="button-group"><button class="btn-outline" onclick="showNotification('Cajuela abierta 📦')">Cajuela</button><button class="btn-outline" onclick="showNotification('Frunk abierto 📦')">Frunk</button></div></div>
        <div class="panel-card"><h3><i class="fas fa-hand-peace"></i> Manijas de Puerta</h3><button class="btn-outline" onclick="triggerDoorHandleAlarm()">Simular apertura de manija</button><div id="alarmAlert" class="alarm-warning" style="display:none;">🚨 ¡ALERTA! Intrusión detectada en manija</div></div>
        <div class="panel-card"><h3><i class="fas fa-window-maximize"></i> Ventanas</h3><div class="button-group"><button class="btn-outline" onclick="windowsUp()">⬆️ Subir Todo</button><button class="btn-outline" onclick="windowsDown()">⬇️ Bajar Todo</button></div></div>
        <div class="panel-card"><h3><i class="fas fa-location-dot"></i> Localizar Vehículo</h3><div class="button-group"><button class="btn-outline" onclick="showNotification('Luces encendidas 💡')">Luces</button><button class="btn-outline" onclick="showNotification('Bocina activada 📢')">Bocina</button><button class="btn-outline" onclick="findMyCar()">Encontrar Auto</button></div></div>
    </div>

    <!-- ========== PANEL SEGURIDAD ========== -->
    <div class="tab-panel" id="seguridad">
        <div class="panel-card"><h3><i class="fas fa-tint"></i> Luces de Lluvia</h3><div class="security-status"><div class="security-item"><span>Sensor de lluvia:</span><span class="status-good">Activo</span></div><div class="security-item"><span>Luces automáticas:</span><span class="status-good">Encendidas</span></div><div class="security-item"><span>Nivelación de luces:</span><span class="status-good">Autonivelado</span></div></div><button class="btn-primary" onclick="testRainSensor()">🌧️ Simular lluvia</button></div>
        <div class="panel-card"><h3><i class="fas fa-car-crash"></i> Frenado de Emergencia</h3><div class="security-status"><div class="security-item"><span>Frenado autónomo:</span><span class="status-good">Activo</span></div><div class="security-item"><span>Detección peatones:</span><span class="status-good">Activo</span></div></div></div>
    </div>

    <!-- ========== PANEL MANTENIMIENTO ========== -->
    <div class="tab-panel" id="mantenimiento">
        <div class="panel-card"><h3><i class="fas fa-car-brake"></i> Estado de Frenos</h3><div class="maintenance-item"><span>Pastillas de freno (balatas):</span><div class="progress-bar"><div class="progress-fill" id="brakePads" style="width:75%"></div></div><span id="brakePadsText">75% de vida útil</span></div><div class="maintenance-item"><span>Discos hiperventilados:</span><div class="progress-bar"><div class="progress-fill" id="brakeDiscs" style="width:82%"></div></div><span id="brakeDiscsText">82% - Buen estado</span></div><div class="maintenance-item"><span>Líquido de frenos:</span><div class="progress-bar"><div class="progress-fill" id="brakeFluid" style="width:90%"></div></div><span id="brakeFluidText">90% - Nivel óptimo</span></div></div>
        <div class="panel-card"><h3><i class="fas fa-oil-can"></i> Motor y Aceite</h3><div class="maintenance-item"><span>Nivel de aceite:</span><div class="progress-bar"><div class="progress-fill" id="oilLevel" style="width:85%"></div></div><span id="oilLevelText">85% - Cambio en 3,000 km</span></div></div>
        <div class="panel-card"><h3><i class="fas fa-car-battery"></i> Batería</h3><div class="maintenance-item"><span>Salud de batería:</span><div class="progress-bar"><div class="progress-fill" id="batteryHealth" style="width:92%"></div></div><span id="batteryHealthText">92% - Excelente</span></div></div>
        <div class="panel-card"><h3><i class="fas fa-circle"></i> Llantas</h3><div class="tires-grid"><div class="tire-item"><span>Delantera Izq:</span><div class="progress-bar"><div class="progress-fill" style="width:78%"></div></div><span>78%</span></div><div class="tire-item"><span>Delantera Der:</span><div class="progress-bar"><div class="progress-fill" style="width:76%"></div></div><span>76%</span></div><div class="tire-item"><span>Trasera Izq:</span><div class="progress-bar"><div class="progress-fill" style="width:72%"></div></div><span>72%</span></div><div class="tire-item"><span>Trasera Der:</span><div class="progress-bar"><div class="progress-fill" style="width:74%"></div></div><span>74%</span></div></div></div>
    </div>

    <!-- ========== PANEL PERFILES ========== -->
    <div class="tab-panel" id="perfiles">
        <div class="panel-card"><h3><i class="fas fa-users"></i> Perfiles de Conductor</h3><div class="profiles-grid"><div class="profile-card" onclick="selectProfile('Leonel')"><i class="fas fa-user-circle"></i><h4>Leonel</h4><p>Modo: Sport</p><span class="profile-badge">Último uso: Hoy</span></div><div class="profile-card" onclick="selectProfile('Carlos')"><i class="fas fa-user-circle"></i><h4>Carlos</h4><p>Modo: Eco Pro</p><span class="profile-badge">Último uso: Ayer</span></div><div class="profile-card" onclick="selectProfile('Nelly')"><i class="fas fa-user-circle"></i><h4>Nelly</h4><p>Modo: Comfort</p><span class="profile-badge">Último uso: Hace 2 días</span></div></div><div class="usage-list"><div class="usage-item"><span>Leonel</span><span>15/05/2026 - 08:30 AM</span></div><div class="usage-item"><span>Carlos</span><span>14/05/2026 - 06:45 PM</span></div><div class="usage-item"><span>Nelly</span><span>13/05/2026 - 09:00 AM</span></div></div></div>
    </div>

    <!-- ========== PANEL MODOS DE MANEJO ========== -->
    <div class="tab-panel" id="modos">
        <div class="panel-card"><h3><i class="fas fa-flag-checkered"></i> Modos de Conducción</h3><div class="driving-modes"><div class="mode-card" onclick="selectDrivingMode('Eco Pro')"><i class="fas fa-leaf"></i><h4>Eco Pro</h4><p>Ahorro de energía</p></div><div class="mode-card" onclick="selectDrivingMode('Comfort')"><i class="fas fa-couch"></i><h4>Comfort</h4><p>Suspensión suave</p></div><div class="mode-card" onclick="selectDrivingMode('Sport')"><i class="fas fa-tachometer-alt"></i><h4>Sport</h4><p>Respuesta rápida</p></div><div class="mode-card" onclick="selectDrivingMode('Sport++')"><i class="fas fa-rocket"></i><h4>Sport ++</h4><p>Máximo rendimiento</p></div><div class="mode-card" onclick="selectDrivingMode('Todo Terreno')"><i class="fas fa-mountain"></i><h4>Todo Terreno</h4><p>Tracción total</p></div><div class="mode-card" onclick="selectDrivingMode('Personalizado')"><i class="fas fa-sliders-h"></i><h4>Personalizado</h4><p>Configurable</p></div></div><div class="current-mode"><i class="fas fa-check-circle"></i> Modo actual: <strong id="currentMode">Comfort</strong></div></div>
    </div>

    <!-- ========== PANEL ENTRETENIMIENTO ========== -->
    <div class="tab-panel" id="entretenimiento">
        <div class="panel-card"><h3><i class="fab fa-apple"></i> Apple Music</h3><div class="music-player"><div class="album-art"><i class="fas fa-music"></i></div><div class="song-info"><h4 id="currentSong">BLINDING LIGHTS</h4><p id="currentArtist">The Weeknd</p></div><div class="music-controls"><button class="music-btn" onclick="prevSong()"><i class="fas fa-backward"></i></button><button class="music-btn" onclick="playPause()"><i class="fas fa-play" id="playPauseIcon"></i></button><button class="music-btn" onclick="nextSong()"><i class="fas fa-forward"></i></button></div><div class="playlist"><ul><li class="active" onclick="playSong(0)">BLINDING LIGHTS - The Weeknd</li><li onclick="playSong(1)">INDUSTRY BABY - Lil Nas X</li><li onclick="playSong(2)">STAY - The Kid LAROI</li><li onclick="playSong(3)">AS IT WAS - Harry Styles</li><li onclick="playSong(4)">BAD HABITS - Ed Sheeran</li></ul></div></div></div>
    </div>

    <!-- ========== PANEL CÁMARAS ========== -->
    <div class="tab-panel" id="camaras">
        <div class="panel-card"><h3><i class="fas fa-video"></i> Cámaras 360°</h3><div class="camaras-grid"><div class="camara-card" onclick="showNotification('Cámara Delantera activada')"><div class="camara-preview"><i class="fas fa-video"></i><span>Frontal</span></div></div><div class="camara-card" onclick="showNotification('Cámara Trasera activada')"><div class="camara-preview"><i class="fas fa-video"></i><span>Trasera</span></div></div><div class="camara-card" onclick="showNotification('Cámara Izquierda activada')"><div class="camara-preview"><i class="fas fa-video"></i><span>Izquierda</span></div></div><div class="camara-card" onclick="showNotification('Cámara Derecha activada')"><div class="camara-preview"><i class="fas fa-video"></i><span>Derecha</span></div></div><div class="camara-card full-width" onclick="showNotification('Vista 360° activada')"><div class="camara-preview"><i class="fas fa-satellite-dish"></i><span>Vista 360°</span></div></div></div><button class="btn-primary" onclick="refreshCameras()">Actualizar cámaras</button></div>
    </div>

    <!-- ========== PANEL REPORTES ========== -->
    <div class="tab-panel" id="reportes">
        <div class="panel-card"><h3><i class="fas fa-chart-line"></i> Reporte de Manejo</h3><div class="report-period"><button class="period-btn active" onclick="changeReportPeriod('week')">Semana</button><button class="period-btn" onclick="changeReportPeriod('month')">Mes</button><button class="period-btn" onclick="changeReportPeriod('year')">Año</button></div></div>
        <div class="panel-card score-card"><div class="score-circle"><canvas id="scoreCanvas" width="120" height="120"></canvas><div class="score-text" id="scoreValue">92</div></div><div class="score-label"><i class="fas fa-leaf"></i> Puntuación Eco-Friendly<span id="scoreRating">Excelente</span></div></div>
        <div class="stats-report-grid"><div class="stat-report-card"><i class="fas fa-tachometer-alt"></i><span id="avgSpeed">45 km/h</span></div><div class="stat-report-card"><i class="fas fa-charging-station"></i><span id="efficiency">18.5 kWh/100km</span></div><div class="stat-report-card"><i class="fas fa-road"></i><span id="totalDistance">342 km</span></div><div class="stat-report-card"><i class="fas fa-clock"></i><span id="totalTime">8.5 h</span></div></div>
        <div class="panel-card"><h3><i class="fas fa-exclamation-triangle"></i> Eventos</h3><div class="events-list"><div class="event-item"><span>Aceleraciones Fuertes</span><span id="hardAccel">12</span></div><div class="event-item"><span>Frenadas Bruscas</span><span id="hardBrake">8</span></div><div class="event-item"><span>Excesos de Velocidad</span><span id="speeding">3</span></div></div></div>
        <div class="panel-card"><h3><i class="fas fa-chart-bar"></i> Consumo</h3><canvas id="consumptionChart" width="400" height="200"></canvas></div>
    </div>

    <!-- ========== PANEL PARKING ========== -->
    <div class="tab-panel" id="parking">
        <div class="panel-card"><h3><i class="fas fa-parking"></i> Parking Assist 360°</h3><div class="parking-360-view"><div class="car-360-container"><div class="car-center"><i class="fas fa-car-side"></i></div><div class="sensor sensor-front" id="sensorFront"><div class="sensor-wave"></div><span class="sensor-distance" id="frontDist">120 cm</span></div><div class="sensor sensor-rear" id="sensorRear"><div class="sensor-wave"></div><span class="sensor-distance" id="rearDist">150 cm</span></div><div class="sensor sensor-left-front"><div class="sensor-wave"></div></div><div class="sensor sensor-right-front"><div class="sensor-wave"></div></div><div class="sensor sensor-left-rear"><div class="sensor-wave"></div></div><div class="sensor sensor-right-rear"><div class="sensor-wave"></div></div></div></div>
        <div class="proximity-bar-container"><div class="proximity-label">Distancia obstáculo más cercano</div><div class="proximity-bar"><div class="proximity-fill" id="proximityFill" style="width:30%"></div></div><div class="proximity-colors"><span class="safe">Seguro</span><span class="warning">Atención</span><span class="danger">Peligro</span></div></div>
        <div class="parking-controls"><button class="btn-primary" onclick="startParkingAssist()">Activar Parking Assist</button><button class="btn-outline" onclick="simulateObstacle()">Simular obstáculo</button><button class="btn-outline" onclick="toggleParkingSound()">🔊 <span id="soundStatus">Sonido activado</span></button></div></div>
    </div>

    <!-- ========== PANEL MONITOREO ========== -->
    <div class="tab-panel" id="monitoreo">
        <div class="panel-card"><h3><i class="fas fa-map-marked-alt"></i> Ubicación GPS</h3><div class="gps-box"><i class="fas fa-map-marker-alt"></i><p id="locationText">Av. Siempre Viva 742</p><button class="btn-small" onclick="updateLocation()">Actualizar</button></div></div>
        <div class="panel-card"><h3><i class="fas fa-info-circle"></i> Estado</h3><div class="status-list"><div class="status-item"><span>Puertas:</span><span id="doorStatus">🔒 Cerradas</span></div><div class="status-item"><span>Ventanas:</span><span id="windowStatus">⬆️ Cerradas</span></div><div class="status-item"><span>Neumáticos:</span><span id="tirePressure">2.4 bar</span></div></div></div>
    </div>

    <!-- ========== PANEL CARGA ========== -->
    <div class="tab-panel" id="carga">
        <div class="panel-card"><h3><i class="fas fa-charging-station"></i> Control de Carga</h3><div class="charging-status"><i class="fas fa-plug"></i><div><h4 id="chargingText">Desconectado</h4><p>Batería: <span id="batteryValue2">87%</span></p></div></div><div class="button-group"><button class="btn-primary" onclick="startCharging()">Iniciar Carga</button><button class="btn-secondary" onclick="stopCharging()">Detener</button></div><div class="slider-group"><label>Límite de carga: <span id="limitValue">80</span>%</label><input type="range" id="chargeLimit" min="50" max="100" value="80"></div></div>
    </div>

    <!-- ========== PANEL TALLERES ========== -->
    <div class="tab-panel" id="concesionarios">
        <div class="panel-card"><h3><i class="fas fa-map-marker-alt"></i> Talleres Cercanos</h3><div class="dealers-list"><div class="dealer-card" onclick="showDealerInfo('BMW Centro', 'Av. Reforma 123', '55 1234 5678')"><i class="fas fa-car"></i><div><h4>BMW Centro CDMX</h4><p>📞 55 1234 5678</p></div></div><div class="dealer-card" onclick="showDealerInfo('BMW Satélite', 'Blvd. Manuel Ávila Camacho 456', '55 8765 4321')"><i class="fas fa-car"></i><div><h4>BMW Satélite</h4><p>📞 55 8765 4321</p></div></div></div></div>
        <div class="panel-card"><h3><i class="fas fa-calendar-check"></i> Agendar Cita</h3><div class="appointment-form"><select id="dealerSelect"><option>BMW Centro</option><option>BMW Satélite</option></select><input type="date" id="appointmentDate"><select id="serviceType"><option>Mantenimiento</option><option>Revisión General</option></select><button class="btn-primary" onclick="scheduleAppointment()">Agendar</button></div></div>
    </div>

    <div class="toast-notification" id="toast"></div>
</div>

<!-- Modal Detalle Cliente -->
<div class="modal" id="clientModal">
    <div class="modal-content">
        <h3 id="modalTitle">Detalle Cliente</h3>
        <div id="modalBody"></div>
        <button class="close-modal" onclick="closeModal()">Cerrar</button>
    </div>
</div>

<script>
    // ========== BASE DE DATOS DE CLIENTES ==========
    let clients = [
        { id: 1, nombre: "Carlos Méndez", email: "carlos@email.com", telefono: "55 1234 5678", auto: "BMW i7 M70", fechaCompra: "2025-03-15", kilometraje: 8500, incentivos: "2 años mantenimiento gratis + alfombras premium", tipo: "Premium", estadoAuto: "Excelente" },
        { id: 2, nombre: "Laura Gutiérrez", email: "laura@email.com", telefono: "55 2345 6789", auto: "BMW X5", fechaCompra: "2024-07-22", kilometraje: 18500, incentivos: "10% descuento + polarizado", tipo: "Premium", estadoAuto: "Excelente" },
        { id: 3, nombre: "Roberto Díaz", email: "roberto@email.com", telefono: "55 3456 7890", auto: "BMW M3 Competition", fechaCompra: "2023-11-05", kilometraje: 32400, incentivos: "Rines deportivos + seguro 1 año", tipo: "Premium", estadoAuto: "Bueno" },
        { id: 4, nombre: "Ana Ramírez", email: "ana@email.com", telefono: "55 4567 8901", auto: "BMW i4", fechaCompra: "2025-01-10", kilometraje: 4200, incentivos: "Cargador rápido gratis + instalación", tipo: "Regular", estadoAuto: "Excelente" },
        { id: 5, nombre: "Fernanda López", email: "fernanda@email.com", telefono: "55 5678 9012", auto: "BMW X3", fechaCompra: "2024-09-18", kilometraje: 11200, incentivos: "Tapetes personalizados + seguro 6 meses", tipo: "Regular", estadoAuto: "Excelente" },
        { id: 6, nombre: "Ricardo Ponce", email: "ricardo@email.com", telefono: "55 6789 0123", auto: "BMW 330i", fechaCompra: "2023-12-03", kilometraje: 28900, incentivos: "Mantenimiento premium 3 años", tipo: "Premium", estadoAuto: "Bueno" },
        { id: 7, nombre: "Mariana Soto", email: "mariana@email.com", telefono: "55 7890 1234", auto: "BMW i7 M70", fechaCompra: "2025-02-20", kilometraje: 3100, incentivos: "Descuento 15% + accesorios", tipo: "Nuevo", estadoAuto: "Excelente" },
        { id: 8, nombre: "Javier Ruiz", email: "javier@email.com", telefono: "55 8901 2345", auto: "BMW X5", fechaCompra: "2024-05-14", kilometraje: 15600, incentivos: "Extensión de garantía", tipo: "Regular", estadoAuto: "Excelente" },
        { id: 9, nombre: "Patricia Vega", email: "patricia@email.com", telefono: "55 9012 3456", auto: "BMW i4", fechaCompra: "2025-04-01", kilometraje: 1800, incentivos: "Cargador portátil + láminas", tipo: "Nuevo", estadoAuto: "Excelente" }
    ];

    let currentFilter = "todos";
    let currentPeriod = 'week';
    let consumptionChart = null;
    let isPlaying = false;
    let currentSongIndex = 0;
    let parkingActive = false;
    let parkingSoundEnabled = true;
    let parkingInterval = null;
    let currentObstacleDistance = 150;
    let carState = { climateOn: false, temperature: 22, doorsLocked: true, windowsOpen: false, charging: false, battery: 87, chargeLimit: 80 };
    let chargingInterval = null;
    let cameraInterval = null;
    let songList = [
        {title: 'BLINDING LIGHTS', artist: 'The Weeknd'},
        {title: 'INDUSTRY BABY', artist: 'Lil Nas X'},
        {title: 'STAY', artist: 'The Kid LAROI'},
        {title: 'AS IT WAS', artist: 'Harry Styles'},
        {title: 'BAD HABITS', artist: 'Ed Sheeran'}
    ];
    const drivingData = {
        week: { avgSpeed: 42, efficiency: 19.2, totalDistance: 342, totalTime: 8.5, hardAccel: 12, hardBrake: 8, speeding: 3, score: 89, consumption: [18.5,19.2,17.8,20.1,18.2,17.5,19.0] },
        month: { avgSpeed: 44, efficiency: 18.5, totalDistance: 1450, totalTime: 36, hardAccel: 48, hardBrake: 32, speeding: 14, score: 92, consumption: [18.2,19.0,17.5,18.8,19.5,17.2,18.0,18.9,17.8,19.1,18.3,17.9,18.6,19.3] },
        year: { avgSpeed: 46, efficiency: 18.2, totalDistance: 12450, totalTime: 310, hardAccel: 420, hardBrake: 280, speeding: 120, score: 94, consumption: [18.5,18.2,17.8,18.0,19.0,18.3,17.5,18.1,17.9,18.4,18.0,17.7] }
    };

    // Funciones generales
    function doLogin() { let e=document.getElementById('loginEmail').value; let p=document.getElementById('loginPassword').value; if(e&&p){ document.getElementById('loginContainer').style.display='none'; document.getElementById('appContainer').style.display='block'; showNotification('Bienvenido al sistema BMW 🚗'); startCameraSimulation(); initReportCharts(); renderClients(); initCharts(); } else showNotification('Ingresa tus datos'); }
    function logout() { if(cameraInterval) clearInterval(cameraInterval); document.getElementById('loginContainer').style.display='flex'; document.getElementById('appContainer').style.display='none'; showNotification('Sesión cerrada'); }
    function showNotification(msg) { let t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2500); }

    // Funciones Clima
    function changeTemp(delta) { let n=carState.temperature+delta; if(n>=16&&n<=30){ carState.temperature=n; updateUI(); showNotification(`🌡️ ${carState.temperature}°C`); } }
    function toggleClimate() { carState.climateOn=!carState.climateOn; updateUI(); showNotification(carState.climateOn?`❄️ Clima a ${carState.temperature}°C`:'🔴 Clima apagado'); }

    // Funciones Accesos
    function lockDoors() { carState.doorsLocked=true; updateUI(); showNotification('🔒 Puertas cerradas'); }
    function unlockDoors() { carState.doorsLocked=false; updateUI(); showNotification('🔓 Puertas abiertas'); }
    function windowsUp() { carState.windowsOpen=false; updateUI(); showNotification('⬆️ Ventanas subidas'); }
    function windowsDown() { carState.windowsOpen=true; updateUI(); showNotification('⬇️ Ventanas bajadas'); }
    function findMyCar() { showNotification('📍 Auto a 50 metros al noreste'); }
    function triggerDoorHandleAlarm() { let div=document.getElementById('alarmAlert'); div.style.display='block'; showNotification('🚨 ¡ALERTA! Intento de apertura'); setTimeout(()=>div.style.display='none',5000); }

    // Funciones Seguridad
    function testRainSensor() { showNotification('🌧️ Simulando lluvia - Luces activadas'); }

    // Funciones Perfiles y Modos
    function selectProfile(p) { showNotification(`👤 Perfil: ${p}`); if(p==='Leonel') selectDrivingMode('Sport'); else if(p==='Carlos') selectDrivingMode('Eco Pro'); else if(p==='Nelly') selectDrivingMode('Comfort'); }
    function selectDrivingMode(m) { document.getElementById('currentMode').innerHTML=m; showNotification(`🏁 Modo: ${m}`); }

    // Funciones Música
    function updateSongDisplay() { document.getElementById('currentSong').innerHTML=songList[currentSongIndex].title; document.getElementById('currentArtist').innerHTML=songList[currentSongIndex].artist; let items=document.querySelectorAll('#playlist li'); items.forEach((item,idx)=>{ if(idx===currentSongIndex) item.classList.add('active'); else item.classList.remove('active'); }); }
    function playSong(i) { currentSongIndex=i; updateSongDisplay(); if(isPlaying) playPause(); playPause(); }
    function playPause() { isPlaying=!isPlaying; let icon=document.getElementById('playPauseIcon'); if(isPlaying){ icon.className='fas fa-pause'; showNotification(`🎵 Reproduciendo: ${songList[currentSongIndex].title}`); }else{ icon.className='fas fa-play'; } }
    function nextSong() { currentSongIndex=(currentSongIndex+1)%songList.length; updateSongDisplay(); if(isPlaying) showNotification(`⏭️ Siguiente: ${songList[currentSongIndex].title}`); }
    function prevSong() { currentSongIndex=(currentSongIndex-1+songList.length)%songList.length; updateSongDisplay(); if(isPlaying) showNotification(`⏮️ Anterior: ${songList[currentSongIndex].title}`); }

    // Funciones Cámaras
    function startCameraSimulation() { if(cameraInterval) clearInterval(cameraInterval); cameraInterval=setInterval(()=>{ document.querySelectorAll('.camara-preview').forEach(cam=>{ let icon=cam.querySelector('i'); if(icon){ icon.style.opacity='0.7'; setTimeout(()=>icon.style.opacity='1',200); } }); },3000); }
    function refreshCameras() { showNotification('📷 Actualizando cámaras...'); setTimeout(()=>showNotification('✅ Cámaras actualizadas'),1000); }

    // Funciones Reportes
    function initReportCharts() { let ctx=document.getElementById('consumptionChart').getContext('2d'); consumptionChart=new Chart(ctx,{type:'line',data:{labels:['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],datasets:[{label:'Consumo',data:drivingData.week.consumption,borderColor:'#003399',fill:true}]},options:{responsive:true}}); drawScoreCircle(89); updateReportUI(); }
    function drawScoreCircle(s) { let c=document.getElementById('scoreCanvas'); if(!c) return; let ctx=c.getContext('2d'); ctx.clearRect(0,0,120,120); ctx.beginPath(); ctx.arc(60,60,50,0,2*Math.PI); ctx.strokeStyle='#E5E7EB'; ctx.lineWidth=8; ctx.stroke(); ctx.beginPath(); ctx.arc(60,60,50,-Math.PI/2,(s/100)*2*Math.PI-Math.PI/2); ctx.strokeStyle=s>=80?'#4caf50':s>=60?'#ff9800':'#f44336'; ctx.stroke(); document.getElementById('scoreValue').innerHTML=s; document.getElementById('scoreRating').innerHTML=s>=90?'Excelente':s>=70?'Bueno':s>=50?'Regular':'Mejorable'; }
    function changeReportPeriod(p) { currentPeriod=p; document.querySelectorAll('.period-btn').forEach(b=>b.classList.remove('active')); event.target.classList.add('active'); updateReportUI(); }
    function updateReportUI() { let d=drivingData[currentPeriod]; document.getElementById('avgSpeed').innerHTML=d.avgSpeed+' km/h'; document.getElementById('efficiency').innerHTML=d.efficiency+' kWh/100km'; document.getElementById('totalDistance').innerHTML=d.totalDistance+' km'; document.getElementById('totalTime').innerHTML=d.totalTime+' h'; document.getElementById('hardAccel').innerHTML=d.hardAccel; document.getElementById('hardBrake').innerHTML=d.hardBrake; document.getElementById('speeding').innerHTML=d.speeding; drawScoreCircle(d.score); if(consumptionChart){ consumptionChart.data.datasets[0].data=d.consumption; consumptionChart.update(); } }

    // Funciones Parking
    function playBeep(f,d) { if(!parkingSoundEnabled) return; try{ let ctx=new(window.AudioContext||window.webkitAudioContext)(); let o=ctx.createOscillator(); let g=ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.frequency.value=f; g.gain.value=0.3; o.start(); g.gain.exponentialRampToValueAtTime(0.00001,ctx.currentTime+d); o.stop(ctx.currentTime+d); ctx.resume(); } catch(e){} }
    function startParkingAssist() { if(parkingActive){ stopParkingAssist(); return; } parkingActive=true; document.querySelector('#parking .btn-primary').innerHTML='Detener'; showNotification('🅿️ Parking Assist activado'); if(parkingInterval) clearInterval(parkingInterval); parkingInterval=setInterval(updateParkingSensors,500); }
    function stopParkingAssist() { parkingActive=false; document.querySelector('#parking .btn-primary').innerHTML='Activar'; showNotification('Parking Assist desactivado'); if(parkingInterval) clearInterval(parkingInterval); }
    function updateParkingSensors() { let fd=Math.max(20,Math.min(200,currentObstacleDistance+(Math.random()*10-5))); let rd=Math.max(20,Math.min(200,150+(Math.random()*20-10))); let ld=Math.max(20,Math.min(200,100+(Math.random()*30-15))); let rtd=Math.max(20,Math.min(200,100+(Math.random()*30-15))); document.getElementById('frontDist').innerHTML=Math.round(fd)+' cm'; document.getElementById('rearDist').innerHTML=Math.round(rd)+' cm'; let minDist=Math.min(fd,rd,ld,rtd); let pct=Math.min(100,Math.max(0,((200-minDist)/200)*100)); document.getElementById('proximityFill').style.width=pct+'%'; if(minDist<40){ if(parkingActive&&parkingSoundEnabled) playBeep(880,0.2); }else if(minDist<80){ if(parkingActive&&parkingSoundEnabled) playBeep(660,0.3); } }
    function simulateObstacle() { currentObstacleDistance=35; showNotification('⚠️ Obstáculo a 35 cm'); setTimeout(()=>{ currentObstacleDistance=150; showNotification('Obstáculo removido'); },3000); updateParkingSensors(); }
    function toggleParkingSound() { parkingSoundEnabled=!parkingSoundEnabled; let s=document.getElementById('soundStatus'); if(s) s.innerHTML=parkingSoundEnabled?'Sonido activado':'Sonido desactivado'; showNotification(parkingSoundEnabled?'🔊 Sonido activado':'🔇 Sonido desactivado'); }

    // Funciones Monitoreo
    function updateLocation() { let locs=['Av. Reforma 123, CDMX','Blvd. Miguel de Cervantes 456','Paseo de la Reforma 789']; document.getElementById('locationText').innerHTML=locs[Math.floor(Math.random()*locs.length)]; showNotification('📍 Ubicación actualizada'); }

    // Funciones Carga
    function startCharging() { if(carState.battery>=carState.chargeLimit){ showNotification('✅ Batería en límite'); return; } carState.charging=true; document.getElementById('chargingText').innerHTML='⚡ Cargando...'; showNotification('🔌 Carga iniciada'); if(chargingInterval) clearInterval(chargingInterval); chargingInterval=setInterval(()=>{ if(carState.charging&&carState.battery<carState.chargeLimit){ carState.battery=Math.min(carState.battery+1,carState.chargeLimit); updateUI(); if(carState.battery>=carState.chargeLimit){ stopCharging(); showNotification(`✅ Carga completada`); } } },400); }
    function stopCharging() { carState.charging=false; if(chargingInterval) clearInterval(chargingInterval); document.getElementById('chargingText').innerHTML='⭕ Desconectado'; showNotification('⏹️ Carga detenida'); }

    // Funciones Talleres
    function showDealerInfo(n,a,p) { showNotification(`📞 ${n} - ${p}`); }
    function scheduleAppointment() { let d=document.getElementById('appointmentDate').value; if(!d){ showNotification('⚠️ Selecciona fecha'); return; } showNotification(`✅ Cita agendada para ${d}`); document.getElementById('appointmentDate').value=''; }

    // Funciones UI
    function updateUI() { document.getElementById('tempValue').innerHTML=carState.temperature; document.getElementById('batteryValue').innerHTML=carState.battery+'%'; document.getElementById('batteryValue2').innerHTML=carState.battery+'%'; document.getElementById('batteryFill').style.width=carState.battery+'%'; document.getElementById('rangeValue').innerHTML=Math.floor(carState.battery*4.8)+' km'; let btn=document.getElementById('climateBtn'); if(carState.climateOn) btn.innerHTML='❄️ Apagar Clima'; else btn.innerHTML='🔥 Encender Clima'; document.getElementById('doorStatus').innerHTML=carState.doorsLocked?'🔒 Cerradas':'🔓 Abiertas'; document.getElementById('windowStatus').innerHTML=carState.windowsOpen?'⬇️ Abiertas':'⬆️ Cerradas'; }

    // Funciones CRM
    function getRecomendacion(fechaCompra, kilometraje) {
        let fecha = new Date(fechaCompra);
        let hoy = new Date();
        let meses = (hoy.getFullYear() - fecha.getFullYear()) * 12 + (hoy.getMonth() - fecha.getMonth());
        if (meses < 3) return "🚗 Evita acelerar a fondo hasta los 5,000 km. Disfruta tu nuevo BMW.";
        if (meses < 6) return "⚡ Ya puedes exprimir el motor, pero revisa presión de llantas cada 15 días.";
        if (meses < 12) return "🔧 Primer servicio mayor recomendado. Revisión de frenos y filtros.";
        if (meses < 24) return "🛢️ Cambio de aceite y revisión de batería. Todo está en orden.";
        if (meses < 36) return "🛞 Considera cambiar neumáticos y revisar suspensión.";
        return "✅ Revisión completa, cambio de líquido de frenos y afinación mayor.";
    }
    function getBadgeClass(tipo) { if (tipo === "Premium") return "badge-premium"; if (tipo === "Nuevo") return "badge-nuevo"; return "badge-regular"; }
    function renderClients() {
        let filtered = clients.filter(c => { if (currentFilter !== "todos" && !c.auto.toLowerCase().includes(currentFilter.toLowerCase())) return false; let search = document.getElementById("searchClient")?.value.toLowerCase() || ""; if (search && !c.nombre.toLowerCase().includes(search)) return false; return true; });
        document.getElementById("totalClientsCRM").innerHTML = clients.length;
        document.getElementById("premiumCount").innerHTML = clients.filter(c => c.tipo === "Premium").length;
        document.getElementById("monthlySalesCRM").innerHTML = clients.filter(c => c.fechaCompra.startsWith("2025")).length;
        document.getElementById("incentivesCount").innerHTML = clients.length;
        let html = "";
        filtered.forEach(c => { html += `<div class="client-card" onclick="showClientDetail(${c.id})"><div class="client-name">${c.nombre}</div><div class="client-car">${c.auto}</div><div class="client-date">📅 Compra: ${c.fechaCompra} | 📍 ${c.kilometraje} km</div><span class="client-badge ${getBadgeClass(c.tipo)}">${c.tipo}</span></div>`; });
        document.getElementById("clientsList").innerHTML = html || "<p style='text-align:center'>No se encontraron clientes</p>";
    }
    function showClientDetail(id) { let c = clients.find(c => c.id === id); if (!c) return; let meses = Math.floor((new Date() - new Date(c.fechaCompra)) / (1000 * 60 * 60 * 24 * 30)); let recomendacion = getRecomendacion(c.fechaCompra, c.kilometraje); let html = `<div class="client-detail-item"><span class="label">Nombre:</span><span>${c.nombre}</span></div><div class="client-detail-item"><span class="label">Email:</span><span>${c.email}</span></div><div class="client-detail-item"><span class="label">Teléfono:</span><span>${c.telefono}</span></div><div class="client-detail-item"><span class="label">Auto:</span><span>${c.auto}</span></div><div class="client-detail-item"><span class="label">Fecha compra:</span><span>${c.fechaCompra}</span></div><div class="client-detail-item"><span class="label">Kilometraje:</span><span>${c.kilometraje.toLocaleString()} km</span></div><div class="client-detail-item"><span class="label">Tiempo con auto:</span><span>${meses} meses</span></div><div class="client-detail-item"><span class="label">Tipo cliente:</span><span>${c.tipo}</span></div><div class="client-detail-item"><span class="label">Estado auto:</span><span>${c.estadoAuto}</span></div><div class="client-detail-item"><span class="label">Incentivos:</span><span>${c.incentivos}</span></div><div class="recomendacion"><i class="fas fa-lightbulb"></i> <strong>Recomendación:</strong><br>${recomendacion}</div>`; document.getElementById("modalTitle").innerHTML = `📋 ${c.nombre}`; document.getElementById("modalBody").innerHTML = html; document.getElementById("clientModal").classList.add("active"); }
    function closeModal() { document.getElementById("clientModal").classList.remove("active"); }
    function filterClients() { renderClients(); }
    function filterByModel(modelo) { currentFilter = modelo; document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active")); event.target.classList.add("active"); renderClients(); }
    function initCharts() {
        let ctx = document.getElementById("consumptionChart")?.getContext('2d');
        if(ctx && !consumptionChart) { consumptionChart = new Chart(ctx, {type:'line', data:{labels:['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'], datasets:[{label:'Consumo', data:drivingData.week.consumption, borderColor:'#003399', fill:true}]}, options:{responsive:true}}); }
    }

    function setupTabs() { let tabs=document.querySelectorAll('.tab-btn'), panels=document.querySelectorAll('.tab-panel'); tabs.forEach(t=>{ t.addEventListener('click',()=>{ let id=t.getAttribute('data-tab'); tabs.forEach(btn=>btn.classList.remove('active')); t.classList.add('active'); panels.forEach(p=>p.classList.remove('active')); document.getElementById(id).classList.add('active'); }); }); }

    setInterval(()=>{ let p=(2.3+Math.random()*0.3).toFixed(1); let tp=document.getElementById('tirePressure'); if(tp) tp.innerHTML=p+' bar'; },15000);
    setInterval(()=>{ let bp=75-Math.floor(Math.random()*2); let bd=82-Math.floor(Math.random()*2); let ol=85-Math.floor(Math.random()*2); let bh=92-Math.floor(Math.random()*1); if(document.getElementById('brakePads')){ document.getElementById('brakePads').style.width=bp+'%'; document.getElementById('brakePadsText').innerHTML=bp+'%'; document.getElementById('brakeDiscs').style.width=bd+'%'; document.getElementById('brakeDiscsText').innerHTML=bd+'%'; document.getElementById('oilLevel').style.width=ol+'%'; document.getElementById('oilLevelText').innerHTML=ol+'% - '+(100-ol)*200+' km'; document.getElementById('batteryHealth').style.width=bh+'%'; document.getElementById('batteryHealthText').innerHTML=bh+'%'; } },30000);

    document.addEventListener('DOMContentLoaded',()=>{ setupTabs(); updateUI(); let dateInput=document.getElementById('appointmentDate'); if(dateInput){ let tomorrow=new Date(); tomorrow.setDate(tomorrow.getDate()+1); dateInput.min=tomorrow.toISOString().split('T')[0]; } initReportCharts(); renderClients(); });
</script>
</body>
</html>
