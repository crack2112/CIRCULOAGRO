// js/pantallamarketplace.js

// Datos de productos
const products = [
    {
        id: 1,
        title: "Compost Orgánico",
        description: "Abono natural hecho con residuos vegetales, ideal para jardines y cultivos.",
        price: 15.00,
       image: "imagenes/abonoorganico.png"

    },
    {
        id: 2,
        title: "Macetas Recicladas",
        description: "Macetas hechas con plástico reciclado, duraderas y ecológicas.",
        price: 8.00,
        image: "imagenes/macetaplastico.jpg"
    },
    {
        id: 3,
        title: "Fertilizante Líquido",
        description: "Fertilizante líquido a base de residuos orgánicos, fácil de aplicar.",
        price: 12.00,
        image: "imagenes/fertilizanteorganico.jpg"
    },
    {
        id: 4,
        title: "Muebles de Palets",
        description: "Muebles rústicos hechos con palets reciclados, únicos y sostenibles.",
        price: 45.00,
        image: "imagenes/mueblesconpalets.jpg"
    },
    {
        id: 5,
        title: "Tejidos Reciclados",
        description: "Textiles hechos con fibras recicladas, suaves y resistentes.",
        price: 22.00,
        image: "imagenes/textiles.jpg"
    },
    {
        id: 6,
        title: "Adobes Ecológicos",
        description: "Adobes hechos con residuos agrícolas, ideales para construcción sostenible.",
        price: 7.00,
        image: "imagenes/adobe.jpg" 
    }
];

// Estado del carrito
let cart = [];
// Comisión aplicada a transacciones (7%)
const FEE_RATE = 0.07;

// Renderiza la cuadrícula de productos
function renderProducts() {

    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map(product => `
        <div class="product-card" onclick="showProductDetails(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h3>${product.title}</h3>
                <p>${product.description.substring(0, 60)}...</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
            </div>
        </div>
    `).join('');
}

//-----------------------------


    // Filtrar productos por nombre o descripción
function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (searchTerm === '') {
        renderProducts(); // Mostrar todos los productos
        return;
    }

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm) || 
    product.description.toLowerCase().includes(searchTerm) ||
    product.price.toString().includes(searchTerm)
); 
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="showProductDetails(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h3>${product.title}</h3>
                <p>${product.description.substring(0, 60)}...</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
            </div>
        </div>
    `).join('');

    if (filteredProducts.length === 0) {
        grid.innerHTML = '<p style="text-align: center; padding: 20px; color: #666;">No se encontraron productos.</p>';
    }
} //-----------------------  

// Renderiza el botón de carrito en el header
function initHeaderCartButton() {
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        const cartButton = document.createElement('button');
        cartButton.className = 'btn btn-outline cart-button';
        cartButton.innerHTML = '<span>🛒</span> Carrito';
        cartButton.onclick = showCart;
        authButtons.appendChild(cartButton);
    }
}

// Mostrar detalle de producto
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('detailImage').src = product.image;
    document.getElementById('detailTitle').textContent = product.title;
    document.getElementById('detailDescription').textContent = product.description;
    document.getElementById('detailPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('quantity').value = 1;
    document.getElementById('productDetailModal').style.display = 'flex';
}

function closeProductDetail() {
    document.getElementById('productDetailModal').style.display = 'none';
}

function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const title = document.getElementById('detailTitle').textContent;
    const product = products.find(p => p.title === title);
    
    if (!product) return;

    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    updateCart();
    closeProductDetail();
    alert(`Se agregaron ${quantity} unidades de ${product.title} al carrito.`);
}

function updateCart() {
    const container = document.getElementById('cartItems');
    const subtotalEl = document.getElementById('cartSubtotal');
    const feeEl = document.getElementById('cartFee');
    const totalEl = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        container.innerHTML = '<p>Tu carrito está vacío.</p>';
        subtotalEl.textContent = '$0.00';
        feeEl.textContent = '$0.00';
        totalEl.textContent = '$0.00';
        return;
    }

    let html = '';
    let subtotal = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <button onclick="removeFromCart(${item.id})">Eliminar</button>
                </div>
            </div>
        `;
    });
    const fee = subtotal * FEE_RATE;
    const total = subtotal + fee;
    container.innerHTML = html;
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    feeEl.textContent = `$${fee.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function showCart() {
    updateCart();
    document.getElementById('cartModal').style.display = 'flex';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function showCheckoutForm() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }
    document.getElementById('checkoutModal').style.display = 'flex';
}

function closeCheckout() {
    document.getElementById('checkoutModal').style.display = 'none';
}

function processCheckout(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    // Calcular totales actuales
    let subtotal = 0;
    cart.forEach(item => subtotal += item.price * item.quantity);
    const fee = subtotal * FEE_RATE;
    const total = subtotal + fee;

    console.log('Pedido enviado:', { cart, form: Object.fromEntries(formData.entries()), subtotal, fee, total });
    // Limpiar carrito y actualizar UI
    cart = [];
    updateCart();
    document.getElementById('checkoutModal').style.display = 'none';
    const summaryEl = document.getElementById('successSummary');
    if (summaryEl) {
        summaryEl.textContent = `Total pagado: $${total.toFixed(2)} (incluye $${fee.toFixed(2)} de comisión del ${ (FEE_RATE*100).toFixed(0) }%).`;
    }
    document.getElementById('successModal').style.display = 'flex';
}

function closeSuccess() {
    document.getElementById('successModal').style.display = 'none';
}

// Cierre de modales al hacer clic fuera
window.onclick = function(event) {
    const modals = [
        { id: 'productDetailModal', close: closeProductDetail },
        { id: 'cartModal', close: closeCart },
        { id: 'checkoutModal', close: closeCheckout },
        { id: 'successModal', close: closeSuccess }
    ];
    modals.forEach(m => {
        const el = document.getElementById(m.id);
        if (event.target === el) m.close();
    });
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initHeaderCartButton();
    document.getElementById('checkoutForm')?.addEventListener('submit', processCheckout);
}); 