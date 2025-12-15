// pantallachat.js

// Datos de proveedores (los mismos que en el mapa)
const proveedores = [
    {
        id: 1,
        nombre: "Beneficio Café La Estrella",
        residuo: "Cáscaras de café secas",
        imagen: "imagenes/cascaracafe.jpg", // ¡Usamos el nombre que ya tienes!
        ubicacion: "Boquete, Chiriquí",
        telefono: "+507 6123 4567"
    },
    {
        id: 2,
        nombre: "Empacadora Tropical Fruit",
        residuo: "Cáscaras de plátano y piña",
        imagen: "imagenes/cascaras.png", // ¡Usamos el nombre que ya tienes!
        ubicacion: "David, Chiriquí",
        telefono: "+507 6234 5678"
    },
    {
        id: 3,
        nombre: "Rastro Municipal de David",
        residuo: "Huesos y tejidos no comestibles",
        imagen: "imagenes/residuocarne.png", // ¡Usamos el nombre que ya tienes!
        ubicacion: "David, Chiriquí",
        telefono: "+507 6345 6789"
    },
    {
        id: 4,
        nombre: "Quesería Don Chepe",
        residuo: "Suero lácteo",
        imagen: "imagenes/suerolacteo.jpg", // ¡Usamos el nombre que ya tienes!
        ubicacion: "Dolega, Chiriquí",
        telefono: "+507 6456 7890"
    },
    {
        id: 5,
        nombre: "Aserradero Maderas del Valle",
        residuo: "Aserrín y viruta de madera",
        imagen: "imagenes/serrinmadera.jpg", // ¡Usamos el nombre que ya tienes!
        ubicacion: "Bugaba, Chiriquí",
        telefono: "+507 6567 8901"
    },
    {
        id: 6,
        nombre: "Hotel Hacienda La Concepción",
        residuo: "Aceite de cocina usado",
        imagen: "imagenes/aceitedecosina.jpg", // ¡Usamos el nombre que ya tienes!
        ubicacion: "David, Chiriquí",
        telefono: "+507 6678 9012"
    }
];

// Estado del chat actual
let currentProviderId = null;

// Cargar contactos en el sidebar
function loadContacts() {
    const contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = proveedores.map(proveedor => `
        <div class="contact-item" onclick="selectProvider(${proveedor.id})">
            <img src="${proveedor.imagen}" alt="${proveedor.nombre}" class="contact-avatar">
            <div class="contact-info">
                <div class="contact-name">${proveedor.nombre}</div>
                <div class="contact-preview">${proveedor.residuo} • ${proveedor.ubicacion}</div>
            </div>
        </div>
    `).join('');
}

// Seleccionar un proveedor
function selectProvider(providerId) {
    currentProviderId = providerId;
    const proveedor = proveedores.find(p => p.id === providerId);

    // Actualizar header del chat
    document.getElementById('chatAvatar').src = proveedor.imagen;
    document.getElementById('chatName').textContent = proveedor.nombre;
    document.getElementById('chatStatus').textContent = proveedor.residuo + " • " + proveedor.ubicacion;

    // Habilitar el input
    document.getElementById('messageInput').disabled = false;
    document.getElementById('messageInput').focus();

    // Limpiar mensajes anteriores
    document.getElementById('chatMessages').innerHTML = '';

    // Mostrar mensaje de bienvenida
    addMessage("system", "¡Hola! Has iniciado chat con " + proveedor.nombre + ". Puedes escribir tu mensaje.");
}

// Enviar mensaje
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();

    if (!message || !currentProviderId) return;

    // Añadir mensaje enviado
    addMessage("sent", message);

    // Simular respuesta del proveedor después de 1 segundo
    setTimeout(() => {
        const proveedor = proveedores.find(p => p.id === currentProviderId);
        const respuestas = [
            "Gracias por contactarnos. ¿En qué podemos ayudarte?",
            "Tenemos stock disponible. ¿Cuánto necesitas?",
            "Puedes recogerlo en nuestras instalaciones. ¿Te sirve mañana?",
            "¿Quieres que te enviemos más información por correo?",
            "Estamos disponibles de lunes a viernes, 8am a 5pm."
        ];
        const randomResponse = respuestas[Math.floor(Math.random() * respuestas.length)];
        addMessage("received", randomResponse);
    }, 1000);

    // Limpiar input
    input.value = '';
}

// Añadir mensaje al chat
function addMessage(type, text) {
    const messagesContainer = document.getElementById('chatMessages');
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const messageElement = document.createElement('div');
    messageElement.className = `message message-${type}`;
    messageElement.innerHTML = `
        ${type === 'sent' ? '' : `<img src="${proveedores.find(p => p.id === currentProviderId)?.imagen}" alt="Proveedor" class="message-avatar">`}
        <div class="message-content">${text}</div>
        <div class="message-time">${timeString}</div>
    `;

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadContacts();

    // Si se llega desde el mapa con un proveedor seleccionado
    const urlParams = new URLSearchParams(window.location.search);
    const providerId = urlParams.get('provider');
    if (providerId) {
        selectProvider(parseInt(providerId));
    }
}); 