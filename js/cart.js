console.log("Cart JS cargado");

document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("cart-container");
    const subtotalSpan = document.getElementById("cart-subtotal");
    const totalSpan = document.getElementById("cart-total");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    function renderCarrito() {

        container.innerHTML = "";

        let subtotal = 0;

        carrito.forEach((producto, index) => {

            const itemSubtotal = producto.precio * producto.cantidad;
            subtotal += itemSubtotal;

            const div = document.createElement("div");
            div.classList.add("cart-item");

            div.innerHTML = `
                <div class="cart-info">
                    <h3>${producto.nombre}</h3>
                    <p>$${producto.precio}</p>
                </div>

                <div class="cart-quantity">
                    <button class="qty-btn" data-index="${index}" data-change="-1">−</button>
                    <span>${producto.cantidad}</span>
                    <button class="qty-btn" data-index="${index}" data-change="1">+</button>
                </div>

                <div class="cart-subtotal">
                    $${itemSubtotal}
                </div>
            `;

            container.appendChild(div);
        });

        subtotalSpan.textContent = subtotal;
        totalSpan.textContent = subtotal;
    }

    container.addEventListener("click", (e) => {

        if (e.target.classList.contains("qty-btn")) {

            const index = e.target.dataset.index;
            const change = parseInt(e.target.dataset.change);

            carrito[index].cantidad += change;

            if (carrito[index].cantidad <= 0) {
                carrito.splice(index, 1);
            }

            guardarCarrito();
            renderCarrito();
        }

    });

    renderCarrito();
});