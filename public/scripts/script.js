$(function() {

    $('.toast').toast('show');

    $('.nav-item.dropdown').mouseenter(function() {
        $(this).addClass('show');
        $(this).children('.dropdown-menu').addClass('show');
        $(this).children('.dropdown-toggle').attr('aria-expanded', 'true');
    }).mouseleave(function() {
        $(this).removeClass('show');
        $(this).children('.dropdown-menu').removeClass('show');
        $(this).children('.dropdown-toggle').attr('aria-expanded', 'false');
    });

    $('.img-small').on('mouseenter click', function() {
        var src = $(this).data('src');
        $('.img-large').css("background-image", "url('"+src+"')");
    });

    var imgLarge = $('.img-large');

    imgLarge.mousemove(function(event) {
        var relX = event.pageX - $(this).offset().left;
        var relY = event.pageY - $(this).offset().top;
        var width = $(this).width();
        var height = $(this).height();
        var x = (relX / width) * 100;
        var y = (relY / height) * 100;
        $(this).css("background-position", x+"% "+y+"%");
    });

    imgLarge.mouseout(function() {
        $(this).css("background-position", "center");
    });

    $( window ).resize(function() {
        setImgLarge();
        setImgSmall();
    });

    setImgLarge();
    setImgSmall();

});

function setImgLarge() {
    var imgLarge = $('.img-large');
    var width = imgLarge.width();
    imgLarge.height(width * 2/3);
}

function setImgSmall() {
    var imgSmall = $('.img-small');
    var width = imgSmall.width();
    imgSmall.height(width);
}

// Variable para almacenar el número de productos en el carrito
let cantidadCarrito = 0;

// Función para actualizar el contador en el carrito
function actualizarContador() {
  // Actualiza el contenido del contador en el ícono del carrito
  document.getElementById('cart-count').textContent = cantidadCarrito;
}

// Asignar eventos a los botones de "Agregar al carrito"
document.addEventListener('DOMContentLoaded', () => {
  // Buscar todos los botones de "Agregar al carrito"
  const botonesAgregar = document.querySelectorAll('.btn-agregar');

  // Agregar el evento click a cada botón
  botonesAgregar.forEach((boton) => {
    boton.addEventListener('click', () => {
      // Incrementar la cantidad de productos en el carrito
      cantidadCarrito++;

      // Actualizar el contador en el carrito
      actualizarContador();
    });
  });
});
// Simulación de productos en el carrito
const cart = [
    { id: 1, name: "Martillo", price: 500 },
    { id: 2, name: "Destornillador", price: 300 },
    { id: 3, name: "Taladro", price: 1500 },
];

// Elementos DOM
const cartIcon = document.getElementById("cart-icon");
const cartModal = document.getElementById("cart-modal");
const closeModal = document.getElementById("close-cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

// Función para renderizar el carrito
function renderCartItems() {
    cartItemsContainer.innerHTML = ""; // Limpiar contenido previo
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">$${item.price.toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = cart.length; // Actualizar contador del carrito
}

// Mostrar el modal
cartIcon.addEventListener("click", () => {
    renderCartItems();
    cartModal.style.display = "block";
});

// Cerrar el modal
closeModal.addEventListener("click", () => {
    cartModal.style.display = "none";
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener("click", (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

// Manejar el botón de finalizar compra
document.getElementById("checkout-button").addEventListener("click", () => {
    alert("¡Gracias por tu compra!");
    cartModal.style.display = "none";
});
