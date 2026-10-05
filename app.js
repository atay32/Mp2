// Función para mostrar notificaciones personalizadas
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Agregar nueva transferencia
document.getElementById('addTransfer').addEventListener('click', function() {
    const transferList = document.getElementById('transferList');
    const newTransfer = document.createElement('div');
    newTransfer.className = 'transfer-item';
    newTransfer.innerHTML = `
        <span>Transferencia de <input class="editable" value="Nombre" /></span>
        <span>$ <input class="editable transfer-amount" value="500.00" /></span>
    `;
    
    transferList.appendChild(newTransfer);
    showNotification('Nueva transferencia agregada');
});

// Hacer que todos los campos editables guarden los cambios
document.querySelectorAll('.editable').forEach(field => {
    field.addEventListener('blur', function() {
        showNotification('Datos guardados correctamente');
    });
});

// Service Worker para funcionalidad offline y notificaciones push
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(registration => {
        console.log('Service Worker registrado');
    }).catch(error => {
        console.error('Error al registrar Service Worker:', error);
    });
}

// Función para simular notificaciones push
function sendPushNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body: body });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification(title, { body: body });
            }
        });
    }
}
