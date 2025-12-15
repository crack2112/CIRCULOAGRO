// 
// js/pantallamapa.js

// Proveedores de RESIDUOS en Chiriquí, Panamá
const proveedores = [
    {
        id: 1,
        nombre: "Beneficio Café La Estrella",
        lat: 8.7950,
        lng: -82.3980,
        residuo: "Cáscaras de café secas",
        imagen: "imagenes/cascaracafe.jpg", // Usa una imagen real o placeholder
        descripcion: "Disponemos de 200 kg semanales de cáscaras de café 100% orgánicas. Ideal para compostaje, briquetas o cosméticos naturales.",
        contacto: "beneficiocafe@example.com",
        telefono: "+507 6123 4567",
        ubicacion: "Boquete, Chiriquí"
    },
    {
        id: 2,
        nombre: "Empacadora Tropical Fruit",
        lat: 8.5100,
        lng: -82.4050,
        residuo: "Cáscaras de plátano y piña",
        imagen: "imagenes/cascaras.png",
        descripcion: "Residuos frescos de empaque diario: 300 kg de cáscaras de plátano y piña. Apto para bioplásticos, compostaje o alimentación animal controlada.",
        contacto: "tropicalfruit@example.com",
        telefono: "+507 6234 5678",
        ubicacion: "David, Chiriquí"
    },
    {
        id: 3,
        nombre: "Rastro Municipal de David",
        lat: 8.4980,
        lng: -82.4100,
        residuo: "Huesos y tejidos no comestibles",
        imagen: "imagenes/residuocarne.png",
        descripcion: "Residuos cárnicos esterilizados. Ideal para producción de harina de hueso o fertilizantes orgánicos. Recolección coordinada.",
        contacto: "rastromunicipal@example.com",
        telefono: "+507 6345 6789",
        ubicacion: "David, Chiriquí"
    },
    {
        id: 4,
        nombre: "Quesería Don Chepe",
        lat: 8.4500,
        lng: -82.4600,
        residuo: "Suero lácteo",
        imagen: "imagenes/suerolacteo.jpg",
        descripcion: "50 litros diarios de suero de queso fresco. Excelente para alimento animal, producción de biogás o derivados lácteos.",
        contacto: "queseriadonchepe@example.com",
        telefono: "+507 6456 7890",
        ubicacion: "Dolega, Chiriquí"
    },
    {
        id: 5,
        nombre: "Aserradero Maderas del Valle",
        lat: 8.5200,
        lng: -82.3800,
        residuo: "Aserrín y viruta de madera",
        imagen: "imagenes/serrinmadera.jpg",
        descripcion: "Residuos limpios de madera dura y blanda. Perfecto para cultivo de hongos (shiitake), compostaje o briquetas ecológicas.",
        contacto: "maderasdelvalle@example.com",
        telefono: "+507 6567 8901",
        ubicacion: "Bugaba, Chiriquí"
    },
    {
        id: 6,
        nombre: "Hotel Hacienda La Concepción",
        lat: 8.4800,
        lng: -82.3900,
        residuo: "Aceite de cocina usado",
        imagen: "imagenes/aceitedecosina.jpg", 
        descripcion: "20 litros semanales de aceite vegetal usado (no mezclado). Ideal para producción de biodiesel o jabones artesanales.",
        contacto: "haciendalaconcepcion@example.com",
        telefono: "+507 6678 9012",
        ubicacion: "David, Chiriquí"
    }
];

// Inicializar el mapa
document.addEventListener('DOMContentLoaded', function() {
    // Centrar en Chiriquí (promedio de David, Boquete, Dolega)
    const map = L.map('map').setView([8.5500, -82.4200], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    proveedores.forEach(proveedor => {
        const marker = L.marker([proveedor.lat, proveedor.lng]).addTo(map);

        const popupContent = `
            <div class="popup-content">
                <img src="${proveedor.imagen}" alt="${proveedor.residuo}" class="popup-image">
                <div class="popup-title">${proveedor.nombre}</div>
                <div class="popup-description"><strong>Residuo:</strong> ${proveedor.residuo}</div>
                <div class="popup-description">${proveedor.descripcion}</div>
                <div class="popup-description"><strong>Ubicación:</strong> ${proveedor.ubicacion}</div>
                <div class="popup-description"><strong>Teléfono:</strong> ${proveedor.telefono}</div>
                <button class="popup-contact-btn" onclick="iniciarChat(${proveedor.id})">💬 Contactar</button>
            </div>
        `;

        marker.bindPopup(popupContent);
    });

    // Función de contacto (simulada)
       window.iniciarChat = function(proveedorId) {
       const proveedor = proveedores.find(p => p.id === proveedorId);
       if (!proveedor) return;

       // Redirigir a la página de chat con el ID del proveedor
       window.location.href = `modulochat.html?provider=${proveedorId}`;
     };


}); 